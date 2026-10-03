'use client';

import { useState, useEffect } from 'react';
import { QRType, WiFiPayload, EmailPayload, PhonePayload } from '@/types/qr';
import {
  buildWifiPayload,
  buildEmailPayload,
  buildPhonePayload,
  normalizeUrlPayload,
} from '@/lib/qr/payloads';

interface GeneratorFormProps {
  type: QRType;
  onPayloadChange: (payload: string) => void;
}

export function GeneratorForm({ type, onPayloadChange }: GeneratorFormProps) {
  // Local Form States
  const [url, setUrl] = useState('https://drqr.app');
  const [text, setText] = useState('');
  
  const [wifi, setWifi] = useState<WiFiPayload>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });

  const [email, setEmail] = useState<EmailPayload>({
    address: '',
    subject: '',
    body: '',
  });

  const [phone, setPhone] = useState<PhonePayload>({
    number: '',
  });

  // Re-compute formatted string whenever inputs change
  useEffect(() => {
    switch (type) {
      case 'url':
        onPayloadChange(url ? normalizeUrlPayload(url) : '');
        break;
      case 'text':
        onPayloadChange(text);
        break;
      case 'wifi':
        onPayloadChange(wifi.ssid ? buildWifiPayload(wifi) : '');
        break;
      case 'email':
        onPayloadChange(email.address ? buildEmailPayload(email) : '');
        break;
      case 'phone':
        onPayloadChange(phone.number ? buildPhonePayload(phone) : '');
        break;
    }
  }, [type, url, text, wifi, email, phone, onPayloadChange]);

  return (
    <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
      {/* 1. URL Form */}
      {type === 'url' && (
        <div className="space-y-2">
          <label htmlFor="url-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Target URL
          </label>
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
          <p className="text-xs text-neutral-500">Automatically adds https:// if protocol is omitted.</p>
        </div>
      )}

      {/* 2. Plain Text Form */}
      {type === 'text' && (
        <div className="space-y-2">
          <label htmlFor="text-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Plain Text Content
          </label>
          <textarea
            id="text-input"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter any note, code, or message..."
            className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>
      )}

      {/* 3. Wi-Fi Form */}
      {type === 'wifi' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="wifi-ssid" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Network Name (SSID) *
            </label>
            <input
              id="wifi-ssid"
              type="text"
              value={wifi.ssid}
              onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
              placeholder="e.g. Home_WiFi"
              className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="wifi-password" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Password
              </label>
              <input
                id="wifi-password"
                type="password"
                value={wifi.password}
                onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                placeholder="Network password"
                disabled={wifi.encryption === 'nopass'}
                className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-600 disabled:opacity-50 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="wifi-encryption" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Security Type
              </label>
              <select
                id="wifi-encryption"
                value={wifi.encryption}
                onChange={(e) => setWifi({ ...wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
                className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 4. Email Form */}
      {type === 'email' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Recipient Email Address *
            </label>
            <input
              id="email-address"
              type="email"
              value={email.address}
              onChange={(e) => setEmail({ ...email, address: e.target.value })}
              placeholder="contact@example.com"
              className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email-subject" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Subject Line (Optional)
            </label>
            <input
              id="email-subject"
              type="text"
              value={email.subject}
              onChange={(e) => setEmail({ ...email, subject: e.target.value })}
              placeholder="Inquiry regarding..."
              className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>
        </div>
      )}

      {/* 5. Phone Form */}
      {type === 'phone' && (
        <div className="space-y-2">
          <label htmlFor="phone-number" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Phone Number *
          </label>
          <input
            id="phone-number"
            type="tel"
            value={phone.number}
            onChange={(e) => setPhone({ ...phone, number: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>
      )}
    </div>
  );
}