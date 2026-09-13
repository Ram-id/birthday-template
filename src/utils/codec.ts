import { CommercialGiftData, defaultCommercialGift } from '../config/commercial.config';

/**
 * URL-Safe Unicode Base64 Encoder & Decoder
 * Mengemas data kustomisasi kado ke dalam URL parameter yang bisa dibuka selamanya tanpa database!
 */

export function encodeGiftData(data: CommercialGiftData): string {
  try {
    const jsonStr = JSON.stringify(data);
    // encodeURIComponent + unescape ensures proper UTF-8 handling for emoji & non-latin chars
    const base64 = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
    return encodeURIComponent(base64);
  } catch (err) {
    console.error('Failed to encode gift data:', err);
    return '';
  }
}

export function decodeGiftData(encodedStr: string): CommercialGiftData | null {
  try {
    const rawBase64 = decodeURIComponent(encodedStr);
    const decodedStr = decodeURIComponent(
      Array.prototype.map
        .call(atob(rawBase64), (c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const parsed = JSON.parse(decodedStr);
    if (parsed && parsed.recipientName) {
      return {
        ...defaultCommercialGift,
        ...parsed,
      };
    }
    return null;
  } catch (err) {
    console.error('Failed to decode gift data:', err);
    return null;
  }
}
