import { EmailPayload, PhonePayload, WiFiPayload } from '@/types/qr';

/**
  * Escapes special characters for Wi-Fi QR payload formatting according to ZXing specifications.
  */
function escapeWifiString(str: string): string {
  return str.replace(/([\\;:,"])/g, '\\$1');
}

export function buildWifiPayload(config: WiFiPayload): string {
  const { ssid, password = '', encryption, hidden = false } = config;
  const escapedSsid = escapeWifiString(ssid);
  const escapedPassword = escapeWifiString(password);

  return `WIFI:S:${escapedSsid};T:${encryption};P:${escapedPassword};H:${hidden ? 'true' : 'false'};;`;
}

export function buildEmailPayload(config: EmailPayload): string {
  const { address, subject = '', body = '' } = config;
  const params = new URLSearchParams();

  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);

  const queryString = params.toString();
  return `mailto:${address}${queryString ? `?${queryString}` : ''}`;
}

export function buildPhonePayload(config: PhonePayload): string {
  const cleaned = config.number.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

export function normalizeUrlPayload(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}