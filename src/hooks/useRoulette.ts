import { useEffect, useMemo, useRef, useState } from 'react';
import { calculateOffset, validateWinningIndex } from '../utils/calculations';
import type { Prize, Orientation } from '../types';

interface UseRouletteOptions {
  prizes: readonly Prize[];
  winningIndex: number;
  isSpinning: boolean;
  duration: number;
  orientation: Orientation;
  prizeSize: number;
  onComplete?: (() => void) | undefined;
  onSpinStart?: (() => void) | undefined;
  minSpins?: number;
}

interface UseRouletteReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  offset: number;
  isAnimating: boolean;
}

/**
 * Core hook for managing roulette state and animations
 * Handles offset calculation, animation timing, and callbacks
 */

export const useRoulette = ({
  prizes,
  winningIndex,
  isSpinning,
  duration,
  orientation,
  prizeSize,
  onComplete,
  onSpinStart,
  minSpins,
}: UseRouletteOptions): UseRouletteReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();
  const callbackFiredRef = useRef(false);

  // Calculate optimal spins if not provided
  const effectiveSpins = useMemo(() => {
    if (minSpins !== undefined) return minSpins;
    // Auto-calculate based on prize count and duration
    const durationFactor = duration / 5000; // 5000ms baseline
    const prizeFactor = Math.max(1, 10 / prizes.length);
    const optimal = Math.ceil(2 * durationFactor * prizeFactor);
    return Math.min(Math.max(optimal, 2), 6); // 2-6 spins
  }, [minSpins, duration, prizes.length]);

  // Validate winning index whenever it changes
  useEffect(() => {
    validateWinningIndex(winningIndex, prizes.length);
  }, [winningIndex, prizes.length]);

  // Handle spinning state changes
  useEffect(() => {
    // Clear any pending timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    if (!isSpinning) {
      // Don't reset offset - keep the final position
      // This prevents the visual "jump" back to start
      setIsAnimating(false);
      callbackFiredRef.current = false;
      return;
    }

    // Reset to start position for new spin (without animation)
    setOffset(0);
    setIsAnimating(false);
    callbackFiredRef.current = false;

    // Fire onSpinStart callback
    if (onSpinStart) {
      onSpinStart();
    }

    // Use requestAnimationFrame to ensure the reset happens before animation starts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Get container size for centering calculation
        const containerSize = containerRef.current
          ? orientation === 'horizontal'
            ? containerRef.current.clientWidth
            : containerRef.current.clientHeight
          : prizeSize;

        // Calculate final offset using the provided winning index
        // (SpinRoulette component already handles smart sampling)
        const finalOffset = calculateOffset(
          prizeSize,
          winningIndex,
          containerSize,
          prizes.length,
          effectiveSpins
        );

        // Start animation
        setIsAnimating(true);
        setOffset(finalOffset);

        // Set timeout for animation completion
        animationTimeoutRef.current = setTimeout(() => {
          setIsAnimating(false);

          // Fire onComplete callback only once
          if (onComplete && !callbackFiredRef.current) {
            callbackFiredRef.current = true;
            onComplete();
          }
        }, duration);
      });
    });

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [
    isSpinning,
    winningIndex,
    prizeSize,
    duration,
    orientation,
    onComplete,
    onSpinStart,
    prizes.length,
    effectiveSpins,
  ]);

  return {
    containerRef,
    offset,
    isAnimating,
  };
};
