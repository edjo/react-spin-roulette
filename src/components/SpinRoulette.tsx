import { useMemo } from 'react';
import { useRoulette } from '../hooks/useRoulette';
import { cn } from '../utils/classNames';
import type { SpinRouletteProps, Prize } from '../types';

// Default values
const DEFAULT_DURATION = 5000;
const DEFAULT_EASING = 'cubic-bezier(0.25, 0.1, 0.25, 1)';
const DEFAULT_ORIENTATION = 'horizontal';
const DEFAULT_PRIZE_SIZE = 150;
const DEFAULT_MIN_SPINS = 5;

// Performance optimization: Thresholds for smart sampling
const SMALL_DATASET_THRESHOLD = 100; // Below this, render all items normally
const SAMPLE_SIZE = 50; // Number of unique items to sample for large datasets

/**
 * Smart sampling strategy for large datasets
 * Instead of rendering thousands of items, we create a representative sample
 * that provides the visual effect of a real lottery while maintaining performance
 *
 * @param prizes - Original prize array
 * @param winningIndex - Index of the winning prize in original array
 * @param minSpins - Number of complete spins
 * @returns Sampled array and adjusted winning index
 */
const createSmartSample = <T extends Prize>(
  prizes: readonly T[],
  winningIndex: number,
  minSpins: number
): { sampledPrizes: T[]; adjustedWinningIndex: number } => {
  // For small datasets, use all prizes
  if (prizes.length <= SMALL_DATASET_THRESHOLD) {
    const repetitions = minSpins + 2;
    const repeated = Array(repetitions).fill(prizes).flat() as T[];
    return {
      sampledPrizes: repeated,
      adjustedWinningIndex: prizes.length * minSpins + winningIndex,
    };
  }

  // For large datasets: intelligent sampling
  // console.log('🎰 Large dataset detected. Using smart sampling strategy...');

  // Step 1: Create a sample pool (first N items + winning item if not included)
  const sampleSize = Math.min(SAMPLE_SIZE, prizes.length);
  const samplePool: T[] = [];

  // Add first N items
  for (let i = 0; i < sampleSize; i++) {
    const prize = prizes[i];
    if (prize) samplePool.push(prize);
  }

  // Ensure winning item is in the pool
  const winningPrize = prizes[winningIndex];
  if (winningPrize && !samplePool.includes(winningPrize)) {
    samplePool.push(winningPrize);
  }

  // Step 2: Build spinning animation with repeated samples
  const sampledPrizes: T[] = [];

  // Add multiple rotations of the sample (creates the "spinning" effect)
  for (let spin = 0; spin < minSpins; spin++) {
    // Cycle through sample pool
    for (let i = 0; i < sampleSize; i++) {
      const prize = samplePool[i % samplePool.length];
      if (prize) sampledPrizes.push(prize);
    }
  }

  // Step 3: Add final rotation that ends with the winning prize
  // Calculate where to place the winner in this final rotation
  const finalRotationSize = sampleSize;
  const winnerPositionInFinalRotation = Math.floor(finalRotationSize / 2); // Middle of final rotation

  // Fill final rotation
  for (let i = 0; i < finalRotationSize; i++) {
    if (i === winnerPositionInFinalRotation && winningPrize) {
      sampledPrizes.push(winningPrize);
    } else {
      // Fill with random samples
      const prize = samplePool[i % samplePool.length];
      if (prize) sampledPrizes.push(prize);
    }
  }

  // Add buffer items after winner
  const bufferSize = 10;
  for (let i = 0; i < bufferSize; i++) {
    const prize = samplePool[i % samplePool.length];
    if (prize) sampledPrizes.push(prize);
  }

  // Adjusted winning index is where we placed the winner
  const adjustedWinningIndex =
    sampledPrizes.length -
    bufferSize -
    (finalRotationSize - winnerPositionInFinalRotation);

  // console.log('✅ Smart sampling complete:', {
  //   originalSize: prizes.length,
  //   sampledSize: sampledPrizes.length,
  //   originalWinningIndex: winningIndex,
  //   adjustedWinningIndex,
  //   winningPrize: winningPrize?.label,
  // });

  return { sampledPrizes, adjustedWinningIndex };
};

/**
 * SpinRoulette - A headless linear roulette/spinner component
 *
 * Provides a customizable linear spinner that scrolls horizontally or vertically
 * to land on a winning prize. Fully headless for maximum styling flexibility.
 *
 * @example
 * ```tsx
 * <SpinRoulette
 *   prizes={prizes}
 *   winningIndex={3}
 *   isSpinning={isSpinning}
 *   onComplete={() => console.log('Done!')}
 *   orientation="horizontal"
 * />
 * ```
 */
export const SpinRoulette = ({
  prizes,
  winningIndex,
  isSpinning,
  onComplete,
  onSpinStart,
  duration = DEFAULT_DURATION,
  easing = DEFAULT_EASING,
  orientation = DEFAULT_ORIENTATION,
  prizeSize = DEFAULT_PRIZE_SIZE,
  className,
  prizeClassName,
  indicatorClassName,
  renderPrize,
  renderIndicator,
  minSpins = DEFAULT_MIN_SPINS,
}: SpinRouletteProps) => {
  // Validate props
  if (prizes.length === 0) {
    throw new Error('SpinRoulette: prizes array cannot be empty');
  }

  // Apply smart sampling strategy
  const { sampledPrizes, adjustedWinningIndex } = useMemo(
    () => createSmartSample(prizes, winningIndex, minSpins),
    [prizes, winningIndex, minSpins]
  );

  // Use the roulette hook for state management with sampled data
  // IMPORTANT: minSpins is set to 0 because createSmartSample already applied the rotations
  const { containerRef, offset, isAnimating } = useRoulette({
    prizes: sampledPrizes,
    winningIndex: adjustedWinningIndex,
    isSpinning,
    duration,
    orientation,
    prizeSize,
    onComplete,
    onSpinStart,
    minSpins: 0, // Already applied in createSmartSample
  });

  // Memoize inline styles for the prize list container
  const listStyle = useMemo(() => {
    const transform =
      orientation === 'horizontal'
        ? `translate3d(-${offset}px, 0, 0)`
        : `translate3d(0, -${offset}px, 0)`;

    return {
      display: 'flex',
      flexDirection:
        orientation === 'horizontal' ? ('row' as const) : ('column' as const),
      transition: isAnimating ? `transform ${duration}ms ${easing}` : 'none',
      transform,
      willChange: 'transform',
    };
  }, [offset, isAnimating, duration, easing, orientation]);

  // Memoize prize items rendering (now using pre-optimized sampledPrizes)
  const prizeItems = useMemo(() => {
    return sampledPrizes.map((prize, globalIndex) => {
      const prizeStyle = {
        flexShrink: 0,
        width: orientation === 'horizontal' ? `${prizeSize}px` : '100%',
        height: orientation === 'vertical' ? `${prizeSize}px` : '100%',
        ...prize.style,
      };

      const combinedPrizeClassName = cn(prizeClassName, prize.className);

      return (
        <div
          key={`${prize.id}-rep-${globalIndex}`}
          className={combinedPrizeClassName}
          style={prizeStyle}
          role="option"
          aria-label={prize.label}
        >
          {renderPrize ? (
            renderPrize(prize as Prize)
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                padding: '1rem',
              }}
            >
              {prize.image && (
                <img
                  src={prize.image}
                  alt={prize.label}
                  style={{
                    maxWidth: '80%',
                    maxHeight: '60%',
                    objectFit: 'contain',
                  }}
                />
              )}
              <span
                style={{
                  marginTop: prize.image ? '0.5rem' : 0,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {prize.label}
              </span>
            </div>
          )}
        </div>
      );
    });
  }, [sampledPrizes, prizeSize, orientation, prizeClassName, renderPrize]);

  // Default indicator styles
  const defaultIndicatorStyle = {
    position: 'absolute' as const,
    pointerEvents: 'none' as const,
    zIndex: 10,
    ...(orientation === 'horizontal'
      ? {
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '100%',
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
        }
      : {
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '2px',
          width: '100%',
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
        }),
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
      role="listbox"
      aria-label="Prize roulette"
      aria-busy={isAnimating}
    >
      {/* Center indicator/pointer */}
      {renderIndicator ? (
        renderIndicator()
      ) : (
        <div
          className={indicatorClassName}
          style={indicatorClassName ? undefined : defaultIndicatorStyle}
          aria-hidden="true"
        />
      )}

      {/* Prize list */}
      <div style={listStyle}>{prizeItems}</div>
    </div>
  );
};

SpinRoulette.displayName = 'SpinRoulette';
