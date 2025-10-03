/**
 * Utility to combine class names conditionally
 * Similar to clsx/classnames but lightweight and type-safe
 * 
 * @param classes - Array of class names (strings, undefined, null, false)
 * @returns Combined class name string
 * 
 * @example
 * cn('base', isActive && 'active', undefined, 'extra')
 * // => 'base active extra'
 */
export const cn = (
  ...classes: Array<string | undefined | null | false>
): string => {
  return classes.filter(Boolean).join(' ');
};

