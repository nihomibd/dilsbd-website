import QRCode from 'qrcode';

// Audio pronunciation using Web Speech Synthesis API
export function playPronunciation(text: string, lang: 'ja-JP' | 'de-DE' | 'en-US' | 'ko-KR' | 'fr-FR' = 'ja-JP') {
  if (typeof window === 'undefined') return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop prior speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // Slightly slower for language learners
    
    // Find matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
    if (match) utterance.voice = match;

    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported on this browser');
  }
}

// Generate data URL QR Code
export async function generateQrDataUrl(dataString: string): Promise<string> {
  try {
    return await QRCode.toDataURL(dataString, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 200,
      color: {
        dark: '#020617',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
}
