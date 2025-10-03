import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock crypto.randomUUID for testing environments
if (typeof crypto === 'undefined') {
  global.crypto = {
    randomUUID: () => {
      return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    },
  } as Crypto;
}
