export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export interface WiFiPayload {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface EmailPayload {
  address: string;
  subject?: string;
  body?: string;
}

export interface PhonePayload {
  number: string;
}

export interface QROptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

export interface DecodeResult {
  text: string;
  format?: string;
  timestamp: number;
}

// Exported alias to fix TS2305 for existing components
export type QRScanResult = DecodeResult;

export type ScannerStatus = 'idle' | 'requesting' | 'scanning' | 'paused' | 'error' | 'unsupported';