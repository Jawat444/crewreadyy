import { describe, expect, it } from 'vitest';
import { TWINKLE_SLANG, twinkleLine } from './Twinkle';

describe('twinkleLine', () => {
  it('picks a line from the pool that matches the reaction', () => {
    expect(TWINKLE_SLANG.good.map((l) => l.en)).toContain(twinkleLine('good', 'en', 0));
    expect(TWINKLE_SLANG['big-loss'].map((l) => l.bn)).toContain(twinkleLine('big-loss', 'bn', 3));
  });

  it('gives the same line for the same seed', () => {
    expect(twinkleLine('small-loss', 'en', 12)).toBe(twinkleLine('small-loss', 'en', 12));
  });

  it('keeps every line short enough for the ribbon, with a Bangla version', () => {
    for (const pool of Object.values(TWINKLE_SLANG)) {
      for (const line of pool) {
        expect(line.en.length).toBeLessThanOrEqual(20);
        expect(line.bn.length).toBeGreaterThan(0);
      }
    }
  });
});
