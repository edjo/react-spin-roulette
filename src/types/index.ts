import { CSSProperties, ReactNode } from 'react';

/**
 * Orientation of the roulette spinner
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Prize item configuration
 */
export interface Prize {
  /** Unique identifier for the prize */
  id: string;

  /** Display label/text */
  label: string;

  /** Optional image URL */
  image?: string;

  /** Optional value/data associated with the prize */
  value?: unknown;

  /** Optional CSS class for this specific prize */
  className?: string;

  /** Optional inline styles for this prize */
  style?: CSSProperties;
}

/**
 * Main props for SpinRoulette component
 */
export interface SpinRouletteProps {
  /** Array of prizes to display */
  prizes: readonly Prize[];

  /** Index of the prize that should win (must be within prizes array bounds) */
  winningIndex: number;

  /** Whether the roulette is currently spinning */
  isSpinning: boolean;

  /** Callback fired when spin completes */
  onComplete?: () => void;

  /** Callback fired when spin starts */
  onSpinStart?: () => void;

  /** Duration of the spin animation in milliseconds */
  duration?: number;

  /** CSS easing function for the animation */
  easing?: string;

  /** Orientation of the roulette */
  orientation?: Orientation;

  /** Size of each prize item (width for horizontal, height for vertical) in pixels */
  prizeSize?: number;

  /** CSS class name for the container */
  className?: string;

  /** CSS class name for each prize item */
  prizeClassName?: string;

  /** CSS class name for the center indicator/pointer */
  indicatorClassName?: string;

  /** Custom render function for prize items */
  renderPrize?: (prize: Prize) => ReactNode;

  /** Custom render function for the center indicator/pointer */
  renderIndicator?: () => ReactNode;

  /** Number of complete spins before landing on winner (default: 5) */
  minSpins?: number;
}

/**
 * Internal state for managing animation
 */
export interface RouletteState {
  offset: number;
  isAnimating: boolean;
}
