import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useRoulette } from './useRoulette';
import type { Prize } from '../types';

const mockPrizes: Prize[] = [
  { id: '1', label: 'Prize 1' },
  { id: '2', label: 'Prize 2' },
  { id: '3', label: 'Prize 3' },
  { id: '4', label: 'Prize 4' },
];

describe('useRoulette', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with zero offset and not animating', () => {
    const { result } = renderHook(() =>
      useRoulette({
        prizes: mockPrizes,
        winningIndex: 0,
        isSpinning: false,
        duration: 1000,
        orientation: 'horizontal',
        prizeSize: 100,
      })
    );

    expect(result.current.offset).toBe(0);
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.containerRef.current).toBeNull();
  });

  it('calculates offset when spinning starts', () => {
    const { result, rerender } = renderHook(
      ({ isSpinning }) =>
        useRoulette({
          prizes: mockPrizes,
          winningIndex: 2,
          isSpinning,
          duration: 1000,
          orientation: 'horizontal',
          prizeSize: 100,
        }),
      {
        initialProps: { isSpinning: false },
      }
    );

    expect(result.current.offset).toBe(0);

    // Start spinning
    rerender({ isSpinning: true });

    expect(result.current.isAnimating).toBe(true);
    expect(result.current.offset).toBeGreaterThan(0);
  });

  it('calls onSpinStart callback when spinning starts', () => {
    const onSpinStart = vi.fn();
    const { rerender } = renderHook(
      ({ isSpinning }) =>
        useRoulette({
          prizes: mockPrizes,
          winningIndex: 0,
          isSpinning,
          duration: 1000,
          orientation: 'horizontal',
          prizeSize: 100,
          onSpinStart,
        }),
      {
        initialProps: { isSpinning: false },
      }
    );

    expect(onSpinStart).not.toHaveBeenCalled();

    rerender({ isSpinning: true });

    expect(onSpinStart).toHaveBeenCalledTimes(1);
  });

  it('calls onComplete callback after duration', async () => {
    const onComplete = vi.fn();
    const duration = 1000;

    const { rerender } = renderHook(
      ({ isSpinning }) =>
        useRoulette({
          prizes: mockPrizes,
          winningIndex: 0,
          isSpinning,
          duration,
          orientation: 'horizontal',
          prizeSize: 100,
          onComplete,
        }),
      {
        initialProps: { isSpinning: false },
      }
    );

    rerender({ isSpinning: true });

    expect(onComplete).not.toHaveBeenCalled();

    // Fast-forward time
    await act(async () => {
      await vi.advanceTimersByTimeAsync(duration);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('resets state when spinning stops', () => {
    const { result, rerender } = renderHook(
      ({ isSpinning }) =>
        useRoulette({
          prizes: mockPrizes,
          winningIndex: 2,
          isSpinning,
          duration: 1000,
          orientation: 'horizontal',
          prizeSize: 100,
        }),
      {
        initialProps: { isSpinning: true },
      }
    );

    expect(result.current.isAnimating).toBe(true);

    // Stop spinning
    rerender({ isSpinning: false });

    expect(result.current.offset).toBe(0);
    expect(result.current.isAnimating).toBe(false);
  });

  it('throws error for invalid winningIndex', () => {
    expect(() => {
      renderHook(() =>
        useRoulette({
          prizes: mockPrizes,
          winningIndex: 10, // Out of bounds
          isSpinning: false,
          duration: 1000,
          orientation: 'horizontal',
          prizeSize: 100,
        })
      );
    }).toThrow();
  });

  it('handles vertical orientation', () => {
    const { result, rerender } = renderHook(
      ({ isSpinning }) =>
        useRoulette({
          prizes: mockPrizes,
          winningIndex: 1,
          isSpinning,
          duration: 1000,
          orientation: 'vertical',
          prizeSize: 100,
        }),
      {
        initialProps: { isSpinning: false },
      }
    );

    rerender({ isSpinning: true });

    expect(result.current.offset).toBeGreaterThan(0);
    expect(result.current.isAnimating).toBe(true);
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = renderHook(() =>
      useRoulette({
        prizes: mockPrizes,
        winningIndex: 0,
        isSpinning: true,
        duration: 1000,
        orientation: 'horizontal',
        prizeSize: 100,
      })
    );

    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
