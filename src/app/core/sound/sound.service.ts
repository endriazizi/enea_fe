// 🔊 SoundService — gestisce il ping audio per nuovi ordini.
// - Precarica l’audio
// - Toggle ON/OFF con persistenza (localStorage)
// - Sblocco al primo gesto utente (autoplay policy)
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private audio?: HTMLAudioElement;
  private unlocked = false;
  private readonly KEY = 'orders:audioEnabled';
  private enabledSig = signal<boolean>(this.readPref()); // default ON

  enabled(): boolean { return this.enabledSig(); }

  setEnabled(on: boolean) {
    this.enabledSig.set(on);
    try { localStorage.setItem(this.KEY, on ? '1' : '0'); } catch {}
    if (on) this.tryUnlock();
  }

  preload(src: string) {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.src = src;
      this.audio.preload = 'auto';
    }
    this.attachUnlockOnce();
  }

  async playPing() {
    if (!this.enabledSig() || !this.audio) return;
    try {
      this.audio.currentTime = 0;
      await this.audio.play();
    } catch {
      this.attachUnlockOnce(); // se ancora bloccato, riprovo
    }
  }

  // -- internals --------------------------------------------------------------
  private readPref(): boolean {
    try { return (localStorage.getItem(this.KEY) ?? '1') === '1'; } catch { return true; }
  }

  private tryUnlock() {
    if (!this.audio || this.unlocked) return;
    this.audio.play().then(() => {
      this.audio?.pause();
      if (this.audio) this.audio.currentTime = 0;
      this.unlocked = true;
      this.removeUnlockListeners();
    }).catch(() => {/* tengo i listener */});
  }

  private clickUnlock = () => this.tryUnlock();
  private keyUnlock   = () => this.tryUnlock();
  private touchUnlock = () => this.tryUnlock();

  private attachUnlockOnce() {
    if (this.unlocked) return;
    document.addEventListener('click', this.clickUnlock, true);
    document.addEventListener('keydown', this.keyUnlock, true);
    document.addEventListener('touchstart', this.touchUnlock, true);
  }
  private removeUnlockListeners() {
    document.removeEventListener('click', this.clickUnlock, true);
    document.removeEventListener('keydown', this.keyUnlock, true);
    document.removeEventListener('touchstart', this.touchUnlock, true);
  }
}
