import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { SpinRoulette } from './SpinRoulette';
import type { Prize } from '../types';

const mockPrizes: Prize[] = [
  { id: '1', label: 'Prize 1' },
  { id: '2', label: 'Prize 2' },
  { id: '3', label: 'Prize 3' },
  { id: '4', label: 'Prize 4' },
];

describe('SpinRoulette', () => {
  it('renders without crashing', () => {
    render(<SpinRoulette prizes={mockPrizes} winningIndex={0} isSpinning={false} />);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders all prizes', () => {
    render(<SpinRoulette prizes={mockPrizes} winningIndex={0} isSpinning={false} />);

    // Prizes are duplicated for the spinning effect, so use getAllByLabelText
    mockPrizes.forEach((prize) => {
      const elements = screen.getAllByLabelText(prize.label);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('throws error for empty prizes array', () => {
    expect(() => {
      render(<SpinRoulette prizes={[]} winningIndex={0} isSpinning={false} />);
    }).toThrow('prizes array cannot be empty');
  });

  it('applies custom className', () => {
    const { container } = render(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={false}
        className="custom-class"
      />
    );

    const roulette = container.querySelector('.custom-class');
    expect(roulette).toBeInTheDocument();
  });

  it('applies custom prizeClassName to all prizes', () => {
    render(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={false}
        prizeClassName="custom-prize"
      />
    );

    const prizes = screen.getAllByRole('option');
    prizes.forEach((prize) => {
      expect(prize).toHaveClass('custom-prize');
    });
  });

  it('uses custom renderPrize function', () => {
    const renderPrize = (prize: Prize) => (
      <div data-testid={`custom-${prize.id}`}>{prize.label.toUpperCase()}</div>
    );

    render(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={false}
        renderPrize={renderPrize}
      />
    );

    // Prizes are duplicated for the spinning effect, so use getAllByTestId
    mockPrizes.forEach((prize) => {
      const elements = screen.getAllByTestId(`custom-${prize.id}`);
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0]).toHaveTextContent(prize.label.toUpperCase());
    });
  });

  it('renders prize images when provided', () => {
    const prizesWithImages: Prize[] = [
      { id: '1', label: 'Prize 1', image: '/image1.png' },
      { id: '2', label: 'Prize 2', image: '/image2.png' },
    ];

    render(
      <SpinRoulette prizes={prizesWithImages} winningIndex={0} isSpinning={false} />
    );

    const images = screen.getAllByRole('img');
    // Images are duplicated for the spinning effect, so there will be more than 2
    expect(images.length).toBeGreaterThan(0);
    // Check that the images have the correct src attributes
    const image1Elements = images.filter(
      (img) => img.getAttribute('src') === '/image1.png'
    );
    const image2Elements = images.filter(
      (img) => img.getAttribute('src') === '/image2.png'
    );
    expect(image1Elements.length).toBeGreaterThan(0);
    expect(image2Elements.length).toBeGreaterThan(0);
  });

  it('calls onSpinStart when spinning starts', () => {
    const onSpinStart = vi.fn();

    const { rerender } = render(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={false}
        onSpinStart={onSpinStart}
      />
    );

    expect(onSpinStart).not.toHaveBeenCalled();

    rerender(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={true}
        onSpinStart={onSpinStart}
      />
    );

    expect(onSpinStart).toHaveBeenCalledTimes(1);
  });

  it('calls onComplete after animation duration', async () => {
    const onComplete = vi.fn();
    const duration = 100; // Use shorter duration for tests

    const { rerender } = render(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={false}
        onComplete={onComplete}
        duration={duration}
      />
    );

    rerender(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={true}
        onComplete={onComplete}
        duration={duration}
      />
    );

    expect(onComplete).not.toHaveBeenCalled();

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      },
      { timeout: 500 }
    );
  });

  it('sets aria-busy attribute when spinning', async () => {
    const { rerender } = render(
      <SpinRoulette prizes={mockPrizes} winningIndex={0} isSpinning={false} />
    );

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-busy', 'false');

    rerender(<SpinRoulette prizes={mockPrizes} winningIndex={0} isSpinning={true} />);

    // Wait for the animation to start (requestAnimationFrame)
    await waitFor(() => {
      expect(listbox).toHaveAttribute('aria-busy', 'true');
    });
  });

  it('renders horizontal orientation by default', () => {
    render(<SpinRoulette prizes={mockPrizes} winningIndex={0} isSpinning={false} />);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    // Horizontal is the default, so no need to specify
  });

  it('renders vertical orientation when specified', () => {
    render(
      <SpinRoulette
        prizes={mockPrizes}
        winningIndex={0}
        isSpinning={false}
        orientation="vertical"
      />
    );

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
  });

  it('applies individual prize styles', () => {
    const prizesWithStyles: Prize[] = [
      {
        id: '1',
        label: 'Prize 1',
        style: { backgroundColor: 'red' },
      },
      {
        id: '2',
        label: 'Prize 2',
        style: { backgroundColor: 'blue' },
      },
    ];

    render(
      <SpinRoulette prizes={prizesWithStyles} winningIndex={0} isSpinning={false} />
    );

    const prizes = screen.getAllByRole('option');
    // Check that the style prop is passed to the element
    expect(prizes[0]).toHaveAttribute('style');
    expect(prizes[1]).toHaveAttribute('style');
  });
});
