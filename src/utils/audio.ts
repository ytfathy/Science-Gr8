/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Web Audio API procedural sound effects, calm young adult male science instructor voice narration,
 * and Fisher-Yates answer shuffling.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  public soundEnabled = true;
  public voiceEnabled = true;
  private maleVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      this.initVoiceSelection();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoiceSelection();
      };
    }
  }

  private initVoiceSelection() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Look for a calm, natural English male instructor voice
    // Priority: English male voices (David, Daniel, Alex, Male, Natural, Google US English)
    const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
    
    const preferredMale = englishVoices.find((v) => {
      const name = v.name.toLowerCase();
      return (
        name.includes('male') ||
        name.includes('david') ||
        name.includes('daniel') ||
        name.includes('alex') ||
        name.includes('george') ||
        name.includes('guy') ||
        name.includes('tom')
      );
    });

    // Fallback to any natural/standard US/UK English voice
    const fallbackEnglish = englishVoices.find((v) => v.lang === 'en-US' || v.lang === 'en-GB') || englishVoices[0] || voices[0];
    this.maleVoice = preferredMale || fallbackEnglish || null;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playClick() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext blocked or not supported
    }
  }

  public playCorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch {}
  }

  public playIncorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  public playFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, t: 0, d: 0.15 },
        { f: 659.25, t: 0.15, d: 0.15 },
        { f: 783.99, t: 0.3, d: 0.18 },
        { f: 1046.5, t: 0.48, d: 0.45 },
      ];
      notes.forEach(({ f, t, d }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + t);
        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + t + d);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + t);
        osc.stop(this.ctx!.currentTime + t + d);
      });
    } catch {}
  }

  public playStep() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  /**
   * Calm, gentle, professional young adult male science instructor narration
   * Pacing: ~0.86x - 0.88x (comfortable teaching pace with natural pauses)
   * Pitch: ~0.95 (warm, natural male register)
   */
  public speak(text: string, onEnd?: () => void) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      // Ensure voices are initialized
      if (!this.maleVoice) {
        this.initVoiceSelection();
      }

      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Calm, comfortable teaching pace (~0.88x speed)
      utterance.rate = 0.88;
      // Warm, natural young adult male tone
      utterance.pitch = 0.95;
      utterance.lang = 'en-US';

      if (this.maleVoice) {
        utterance.voice = this.maleVoice;
      }

      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = () => onEnd();
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundFx = new SoundController();

/**
 * Fisher-Yates algorithm for randomizing answer choices
 * Returns a new shuffled array without mutating the original.
 */
export function shuffleArray<T>(array: T[], rng: () => number = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
