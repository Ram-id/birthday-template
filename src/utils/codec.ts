import { GiftExperience } from '../types/gift';
import { defaultGiftExperiences } from '../config/presets';

/**
 * URL-Safe Unicode Base64 Encoder & Decoder
 * Packs the complete bespoke GiftExperience into a permanent URL parameter without requiring an external DB!
 */

export function encodeGiftData(data: GiftExperience | any): string {
  try {
    const jsonStr = JSON.stringify(data);
    const base64 = btoa(
      encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
    return encodeURIComponent(base64);
  } catch (err) {
    console.error('Failed to encode gift data:', err);
    return '';
  }
}

export function decodeGiftData(encodedStr: string): GiftExperience | null {
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
    if (parsed && (parsed.recipientName || parsed.occasion || parsed.letterTitle)) {
      const occasion = parsed.occasion || 'birthday';
      const fallback = defaultGiftExperiences[occasion as keyof typeof defaultGiftExperiences] || defaultGiftExperiences.birthday;
      return {
        ...fallback,
        ...parsed,
      };
    }
    return null;
  } catch (err) {
    console.error('Failed to decode gift data:', err);
    return null;
  }
}
