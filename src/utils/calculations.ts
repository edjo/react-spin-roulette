/**
 * Calculate optimal number of spins based on prize count and duration
 * More prizes = fewer spins to avoid very long animations
 * Shorter duration = fewer spins for better performance
 *
 * @param prizesLength - Total number of prizes
 * @param duration - Animation duration in milliseconds
 * @returns Optimal number of complete spins
 */
export const calculateOptimalSpins = (prizesLength: number, duration: number): number => {
  // Base calculation: longer duration and fewer prizes = more spins
  const durationFactor = duration / 5000; // 5000ms is baseline
  const prizeFactor = Math.max(1, 10 / prizesLength); // Fewer prizes = more spins

  const optimalSpins = Math.ceil(2 * durationFactor * prizeFactor);

  // Clamp between 2 and 8 spins
  return Math.min(Math.max(optimalSpins, 2), 8);
};

/**
 * Calculate the offset needed to position the winning prize in the center
 * Includes multiple full rotations for a realistic lottery/roulette effect
 *
 * @param prizeSize - Size of each prize item (width or height depending on orientation)
 * @param winningIndex - Index of the winning prize
 * @param containerSize - Size of the container viewport
 * @param prizesLength - Total number of prizes in the array
 * @param minSpins - Minimum number of complete spins before landing (default: 5)
 * @returns Offset in pixels
 */
export const calculateOffset = (
  prizeSize: number,
  winningIndex: number,
  containerSize: number,
  prizesLength: number,
  minSpins: number = 5
): number => {
  // Calculate one complete rotation distance
  const oneCompleteRotation = prizeSize * prizesLength;

  // Add multiple full rotations for the spinning effect
  const spinningDistance = oneCompleteRotation * minSpins;

  // Calculate the position of the winning prize
  const prizePosition = prizeSize * winningIndex;

  // Center offset: position the prize in the middle of the viewport
  const centerOffset = (containerSize - prizeSize) / 2;

  // Final offset: spinning distance + prize position - center offset
  // This makes it spin multiple times before stopping at the winner
  return spinningDistance + prizePosition - centerOffset;
};

/**
 * Validate that the winning index is within bounds
 *
 * @param winningIndex - Index to validate
 * @param prizesLength - Total number of prizes
 * @throws Error if index is invalid
 */
export const validateWinningIndex = (
  winningIndex: number,
  prizesLength: number
): void => {
  if (!Number.isInteger(winningIndex)) {
    throw new Error(`winningIndex must be an integer, received: ${winningIndex}`);
  }

  if (winningIndex < 0) {
    throw new Error(`winningIndex must be non-negative, received: ${winningIndex}`);
  }

  if (winningIndex >= prizesLength) {
    throw new Error(
      `winningIndex (${winningIndex}) is out of bounds. Must be less than prizes.length (${prizesLength})`
    );
  }
};

/**
 * Generate a unique ID for React keys
 * Uses crypto.randomUUID if available, falls back to timestamp + random
 *
 * @returns Unique string ID
 */
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Clamp a number between min and max values
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
