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
    // Don't use fake timers globally - will use where needed
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
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

  it('calculates offset when spinning starts', async () => {
    // Don't use fake timers for requestAnimationFrame tests
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

    // Wait for requestAnimationFrame to complete
    await waitFor(
      () => {
        expect(result.current.isAnimating).toBe(true);
        expect(result.current.offset).toBeGreaterThan(0);
      },
      { timeout: 1000 }
    );
  }, 10000);

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
    const duration = 100; // Use shorter duration for tests

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

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      },
      { timeout: 500 }
    );
  });

  it('resets state when spinning stops', async () => {
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

    // Wait for animation to start
    await waitFor(
      () => {
        expect(result.current.isAnimating).toBe(true);
      },
      { timeout: 1000 }
    );

    // Stop spinning
    rerender({ isSpinning: false });

    // After stopping, isAnimating should be false
    // Note: offset stays at last position (doesn't reset to 0)
    expect(result.current.isAnimating).toBe(false);
  }, 10000);

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

  it('handles vertical orientation', async () => {
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

    // Wait for requestAnimationFrame to complete
    await waitFor(
      () => {
        expect(result.current.offset).toBeGreaterThan(0);
        expect(result.current.isAnimating).toBe(true);
      },
      { timeout: 1000 }
    );
  }, 10000);

  it('cleans up timeout on unmount', async () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

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

    // Wait for animation to start (timeout to be set)
    await waitFor(
      () => {
        // Give time for requestAnimationFrame to set the timeout
      },
      { timeout: 100 }
    );

    unmount();

    // clearTimeout should have been called when unmounting
    await waitFor(() => {
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    clearTimeoutSpy.mockRestore();
  });
});
