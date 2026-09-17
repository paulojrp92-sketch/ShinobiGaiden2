/** All gameplay advances at 60 Hz. Render frequency never changes frame data. */
export class FixedClock {
  readonly stepMs = 1000 / 60;
  private accumulator = 0;
  advance(deltaMs: number, step: () => void): void {
    this.accumulator += Math.min(Math.max(deltaMs, 0), 100);
    while (this.accumulator + 1e-7 >= this.stepMs) {
      step();
      this.accumulator -= this.stepMs;
    }
  }
  reset(): void { this.accumulator = 0; }
}
