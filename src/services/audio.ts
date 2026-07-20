class AudioEngine {
  private ctx: AudioContext | null = null;
  private _enabled = true;

  get enabled() {
    return this._enabled;
  }

  setEnabled(v: boolean) {
    this._enabled = v;
  }

  private getCtx(): AudioContext {
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  private tone(
    freq: number,
    endFreq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainVal = 0.15,
    startTime = 0
  ) {
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    osc.frequency.linearRampToValueAtTime(endFreq, ctx.currentTime + startTime + duration);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration + 0.01);
  }

  play(sound: 'click' | 'open' | 'close' | 'notification' | 'hover') {
    if (!this._enabled) return;
    switch (sound) {
      case 'click':
        this.tone(800, 0, 0.04, 'sine', 0.12);
        break;
      case 'open':
        this.tone(300, 800, 0.08, 'sine', 0.1);
        break;
      case 'close':
        this.tone(500, 200, 0.06, 'sine', 0.1);
        break;
      case 'notification':
        this.tone(523, 523, 0.15, 'sine', 0.12, 0);
        this.tone(659, 659, 0.15, 'sine', 0.12, 0.15);
        break;
      case 'hover':
        this.tone(1200, 1200, 0.015, 'sine', 0.06);
        break;
    }
  }

  dispose() {
    this.ctx?.close();
    this.ctx = null;
  }
}

export const audioEngine = new AudioEngine();
