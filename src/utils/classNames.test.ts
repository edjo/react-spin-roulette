import { describe, it, expect } from 'vitest';
import { cn } from './classNames';

describe('cn (classNames utility)', () => {
  it('combines multiple class names', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('filters out undefined values', () => {
    expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
  });

  it('filters out null values', () => {
    expect(cn('class1', null, 'class2')).toBe('class1 class2');
  });

  it('filters out false values', () => {
    expect(cn('class1', false, 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe(
      'base active'
    );
  });

  it('returns empty string for no valid classes', () => {
    expect(cn()).toBe('');
    expect(cn(undefined, null, false)).toBe('');
  });

  it('handles single class', () => {
    expect(cn('single')).toBe('single');
  });

  it('trims and combines properly', () => {
    expect(cn('  class1  ', 'class2')).toBe('  class1   class2');
  });
});

