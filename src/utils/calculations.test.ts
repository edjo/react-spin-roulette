import { describe, it, expect } from 'vitest';
import {
  calculateOffset,
  validateWinningIndex,
  generateId,
  clamp,
} from './calculations';

describe('calculateOffset', () => {
  it('calculates correct offset for first prize', () => {
    const offset = calculateOffset(100, 0, 500);
    // First prize (index 0) should be centered: 0 - (500-100)/2 = -200
    expect(offset).toBe(-200);
  });

  it('calculates correct offset for middle prize', () => {
    const offset = calculateOffset(100, 5, 500);
    // Fifth prize: (100 * 5) - (500-100)/2 = 500 - 200 = 300
    expect(offset).toBe(300);
  });

  it('handles different prize sizes', () => {
    const offset = calculateOffset(150, 3, 600);
    // (150 * 3) - (600-150)/2 = 450 - 225 = 225
    expect(offset).toBe(225);
  });

  it('handles edge case with single prize', () => {
    const offset = calculateOffset(200, 0, 200);
    // (200 * 0) - (200-200)/2 = 0 - 0 = 0
    expect(offset).toBe(0);
  });
});

describe('validateWinningIndex', () => {
  it('accepts valid index', () => {
    expect(() => validateWinningIndex(0, 5)).not.toThrow();
    expect(() => validateWinningIndex(4, 5)).not.toThrow();
    expect(() => validateWinningIndex(10, 20)).not.toThrow();
  });

  it('throws on negative index', () => {
    expect(() => validateWinningIndex(-1, 5)).toThrow(
      'winningIndex must be non-negative'
    );
  });

  it('throws on index out of bounds', () => {
    expect(() => validateWinningIndex(5, 5)).toThrow(
      'winningIndex (5) is out of bounds'
    );
    expect(() => validateWinningIndex(10, 5)).toThrow(
      'winningIndex (10) is out of bounds'
    );
  });

  it('throws on non-integer index', () => {
    expect(() => validateWinningIndex(1.5, 5)).toThrow(
      'winningIndex must be an integer'
    );
    expect(() => validateWinningIndex(NaN, 5)).toThrow(
      'winningIndex must be an integer'
    );
  });
});

describe('generateId', () => {
  it('generates unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('generates string IDs', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('generates IDs without spaces', () => {
    const id = generateId();
    expect(id).not.toContain(' ');
  });
});

describe('clamp', () => {
  it('returns value if within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, -5, 5)).toBe(0);
  });

  it('clamps to min value', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(-100, -10, 10)).toBe(-10);
  });

  it('clamps to max value', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(100, -10, 10)).toBe(10);
  });

  it('handles equal min and max', () => {
    expect(clamp(5, 10, 10)).toBe(10);
    expect(clamp(15, 10, 10)).toBe(10);
  });
});

