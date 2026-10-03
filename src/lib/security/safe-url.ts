const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

export interface SafeUrlResult {
  isValid: boolean;
  isExternalWeb: boolean;
  sanitizedUrl: string | null;
  protocol: string | null;
  error?: string;
}

/**
  * Sanitizes and validates untrusted URL inputs decoded from QR codes.
  * Prevents XSS, prototype pollution, and execution of unsafe pseudo-protocols.
  */
export function sanitizeAndValidateUrl(input: string): SafeUrlResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { isValid: false, isExternalWeb: false, sanitizedUrl: null, protocol: null, error: 'Empty payload' };
  }

  // Defend against obvious javascript: or data: schemes disguised with leading whitespace or control characters
  const cleanInput = trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  try {
    const parsed = new URL(cleanInput);

    if (!ALLOWED_PROTOCOLS.has(parsed.protocol.toLowerCase())) {
      return {
        isValid: false,
        isExternalWeb: false,
        sanitizedUrl: null,
        protocol: parsed.protocol,
        error: `Blocked protocol: ${parsed.protocol}`,
      };
    }

    const isExternalWeb = parsed.protocol === 'http:' || parsed.protocol === 'https:';

    return {
      isValid: true,
      isExternalWeb,
      sanitizedUrl: parsed.toString(),
      protocol: parsed.protocol,
    };
  } catch {
    // If native URL parsing fails, check if it's a bare domain/path meant for HTTP
    if (/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+/i.test(cleanInput)) {
      try {
        const fallbackUrl = new URL(`https://${cleanInput}`);
        return {
          isValid: true,
          isExternalWeb: true,
          sanitizedUrl: fallbackUrl.toString(),
          protocol: 'https:',
        };
      } catch {
        // Fallthrough
      }
    }

    return {
      isValid: false,
      isExternalWeb: false,
      sanitizedUrl: null,
      protocol: null,
      error: 'Not a valid URL structure',
    };
  }
}