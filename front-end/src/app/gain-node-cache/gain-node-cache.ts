export class GainNodeCache {
  private audioContext: AudioContext;
  private cache: { [key: string]: GainNode } = {};

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
  }

  private create(key: string) {
    const gainNode = this.audioContext.createGain();
    this.cache[key] = gainNode;
  }

  get(key: string) {
    if (!this.cache[key]) {
      this.create(key);
    }
    return this.cache[key];
  }
}
