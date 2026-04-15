class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  setEnabled(val) {
    this.enabled = val;
  }

  playBeep(freq = 440, type = 'sine', duration = 0.1, volume = 0.1) {
    if (!this.enabled || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playAlert() {
    this.playBeep(880, 'square', 0.2, 0.05);
    setTimeout(() => this.playBeep(660, 'square', 0.2, 0.05), 100);
  }

  playSuccess() {
    this.playBeep(523.25, 'sine', 0.1, 0.1);
    setTimeout(() => this.playBeep(659.25, 'sine', 0.1, 0.1), 80);
    setTimeout(() => this.playBeep(783.99, 'sine', 0.1, 0.1), 160);
  }

  playClick() {
    this.playBeep(1200, 'sine', 0.05, 0.02);
  }
}

export const sounds = new SoundManager();
