import { useState } from 'react';
import { SpinRoulette } from 'react-spin-roulette';
import type { Prize } from 'react-spin-roulette';

// Sample prizes data
const createPrizes = (count: number): Prize[] => {
  const colors = [
    'bg-red-500',
    'bg-teal-500',
    'bg-blue-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-cyan-500',
    'bg-amber-500',
    'bg-emerald-500',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `prize-${i}`,
    label: `Prize ${i + 1}`,
    className: `${colors[i % colors.length]} text-white font-bold`,
  }));
};

function App() {
  // Basic Example State
  const [basicPrizes] = useState<Prize[]>(createPrizes(8));
  const [basicWinningIndex, setBasicWinningIndex] = useState(0);
  const [isBasicSpinning, setIsBasicSpinning] = useState(false);
  const [basicWinner, setBasicWinner] = useState<string>('');

  // Vertical Example State
  const [verticalPrizes] = useState<Prize[]>(createPrizes(6));
  const [verticalWinningIndex, setVerticalWinningIndex] = useState(0);
  const [isVerticalSpinning, setIsVerticalSpinning] = useState(false);
  const [verticalWinner, setVerticalWinner] = useState<string>('');

  // Custom Render Example State
  const [customPrizes] = useState<Prize[]>([
    { id: '1', label: '🎁 Mystery Box', value: 100 },
    { id: '2', label: '💎 Diamond', value: 500 },
    { id: '3', label: '🏆 Trophy', value: 1000 },
    { id: '4', label: '🎉 Party', value: 250 },
    { id: '5', label: '⭐ Star', value: 750 },
    { id: '6', label: '🚀 Rocket', value: 2000 },
  ]);
  const [customWinningIndex, setCustomWinningIndex] = useState(0);
  const [isCustomSpinning, setIsCustomSpinning] = useState(false);
  const [customWinner, setCustomWinner] = useState<string>('');

  // Fast Example State
  const [fastPrizes] = useState<Prize[]>(createPrizes(10));
  const [fastWinningIndex, setFastWinningIndex] = useState(0);
  const [isFastSpinning, setIsFastSpinning] = useState(false);

  // Huge Dataset Example State (30k items for performance testing)
  const [hugePrizes] = useState<Prize[]>(() => {
    // console.time('Creating 30k prizes');
    const prizes = Array.from({ length: 30000 }, (_, i) => ({
      id: `huge-prize-${i}`,
      label: `Item ${i + 1}`,
      className: `${
        ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'][
          i % 5
        ]
      } text-white font-bold text-sm`,
    }));
    // console.timeEnd('Creating 30k prizes');
    // console.log('✅ Created prizes:', prizes.length);
    return prizes;
  });
  const [hugeWinningIndex, setHugeWinningIndex] = useState(0);
  const [isHugeSpinning, setIsHugeSpinning] = useState(false);
  const [hugeSpinStartTime, setHugeSpinStartTime] = useState<number>(0);
  const [hugeSpinEndTime, setHugeSpinEndTime] = useState<number>(0);

  // Handlers
  const handleBasicSpin = () => {
    const randomIndex = Math.floor(Math.random() * basicPrizes.length);
    setBasicWinningIndex(randomIndex);
    setIsBasicSpinning(true);
    setBasicWinner('');
  };

  const handleBasicComplete = () => {
    setIsBasicSpinning(false);
    setBasicWinner(basicPrizes[basicWinningIndex]?.label || '');
  };

  const handleVerticalSpin = () => {
    const randomIndex = Math.floor(Math.random() * verticalPrizes.length);
    setVerticalWinningIndex(randomIndex);
    setIsVerticalSpinning(true);
    setVerticalWinner('');
  };

  const handleVerticalComplete = () => {
    setIsVerticalSpinning(false);
    setVerticalWinner(verticalPrizes[verticalWinningIndex]?.label || '');
  };

  const handleCustomSpin = () => {
    const randomIndex = Math.floor(Math.random() * customPrizes.length);
    setCustomWinningIndex(randomIndex);
    setIsCustomSpinning(true);
    setCustomWinner('');
  };

  const handleCustomComplete = () => {
    setIsCustomSpinning(false);
    setCustomWinner(customPrizes[customWinningIndex]?.label || '');
  };

  const handleFastSpin = () => {
    const randomIndex = Math.floor(Math.random() * fastPrizes.length);
    setFastWinningIndex(randomIndex);
    setIsFastSpinning(true);
  };

  const handleHugeSpin = () => {
    const randomIndex = Math.floor(Math.random() * hugePrizes.length);
    setHugeWinningIndex(randomIndex);
    setHugeSpinStartTime(performance.now());
    setIsHugeSpinning(true);
  };

  const handleHugeComplete = () => {
    const endTime = performance.now();
    setHugeSpinEndTime(endTime);
    setIsHugeSpinning(false);
    // const actualDuration = endTime - hugeSpinStartTime;
    // console.log(`🎰 Huge dataset spin completed!`);
    // console.log(`Expected: 5000ms | Actual: ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="text-center py-16 px-4 border-b border-gray-800">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">🎰 React Spin Roulette</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
          A lightweight, headless React component for linear roulette/spinner animations
        </p>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-500 mb-8">
          <span className="px-3 py-1 bg-gray-800 rounded-full">TypeScript</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full">React 18</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full">Headless UI</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full">Zero Dependencies</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="https://github.com/edjo/react-spin-roulette"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
          <a
            href="https://github.com/edjo/react-spin-roulette/tree/main/example"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg transition-colors text-white font-medium border-2 border-primary/50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            View Source Code
          </a>
          <a
            href="https://www.npmjs.com/package/react-spin-roulette"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
            </svg>
            npm
          </a>
        </div>

        {/* Installation */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-left">📦 Installation</h3>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-900 rounded-lg px-4 py-3 font-mono text-sm text-left">
                <span className="text-gray-500"># npm</span>
                <br />
                <span className="text-green-400">npm install</span>{' '}
                <span className="text-blue-400">react-spin-roulette</span>
              </div>
              <div className="bg-gray-900 rounded-lg px-4 py-3 font-mono text-sm text-left">
                <span className="text-gray-500"># yarn</span>
                <br />
                <span className="text-green-400">yarn add</span>{' '}
                <span className="text-blue-400">react-spin-roulette</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-left">
              ℹ️ <strong>Note:</strong> This component is headless and has no styling
              dependencies. Tailwind CSS is used in these examples for convenience, but
              you can style it however you want with plain CSS or any CSS framework.
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4 text-sm">
            <a
              href="#basic"
              className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium whitespace-nowrap transition-colors"
            >
              Basic Horizontal
            </a>
            <a
              href="#custom"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 font-medium whitespace-nowrap transition-colors"
            >
              Custom Layout
            </a>
            <a
              href="#vertical"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 font-medium whitespace-nowrap transition-colors"
            >
              Vertical
            </a>

            <a
              href="#fast"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 font-medium whitespace-nowrap transition-colors"
            >
              Fast Spin
            </a>
            <a
              href="#performance"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 font-medium whitespace-nowrap transition-colors"
            >
              Performance Test
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-16 pt-8 space-y-16">
        {/* Basic Horizontal Example */}
        <section
          id="basic"
          className="scroll-mt-20 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Basic Horizontal Roulette
            </h2>
            <p className="text-gray-400 mb-4">
              Default horizontal spinner with Tailwind colored prizes
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-full max-w-3xl ">
              <SpinRoulette
                prizes={basicPrizes}
                winningIndex={basicWinningIndex}
                isSpinning={isBasicSpinning}
                onComplete={handleBasicComplete}
                className="w-full h-full border-3 border-primary/50 rounded-xl bg-gray-900/50 shadow-xl"
                prizeClassName="flex items-center justify-center border-r-2 border-white/20 transition-transform hover:scale-105"
                duration={5000}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleBasicSpin}
              disabled={isBasicSpinning}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isBasicSpinning ? '🎲 Spinning...' : '🎲 Spin Now!'}
            </button>

            {basicWinner && (
              <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg animate-pulse">
                🎉 Winner: {basicWinner}
              </div>
            )}
          </div>

          {/* Code Example */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700">
            <pre className="overflow-x-auto text-sm">
              <code className="text-gray-300">
                {`import { SpinRoulette } from 'react-spin-roulette';

<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  className="w-full h-32"
  duration={5000}
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Custom Render Example */}
        <section
          id="custom"
          className="scroll-mt-20 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gradient mb-2">Custom Layout</h2>
            <p className="text-gray-400 mb-4">
              Items separated with custom marker and card design
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="w-full h-44 relative">
              <SpinRoulette
                prizes={customPrizes}
                winningIndex={customWinningIndex}
                isSpinning={isCustomSpinning}
                onComplete={handleCustomComplete}
                className="w-full h-full bg-gray-700 rounded-2xl shadow-2xl"
                prizeClassName="flex items-center justify-center"
                prizeSize={192}
                renderPrize={(prize) => (
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 h-40 w-46 mt-2 shadow-xl border-2 border-white/10 flex flex-col items-center justify-center gap-3 transform transition-transform hover:scale-105">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center flex-shrink-0 justify-center text-4xl shadow-lg">
                      {prize.label.split(' ')[0]}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">
                        {prize.label.split(' ').slice(1).join(' ')}
                      </div>
                      {prize.value !== undefined && (
                        <div className="text-xs text-white/70 font-medium mt-1">
                          {String(prize.value)} points
                        </div>
                      )}
                    </div>
                  </div>
                )}
                renderIndicator={() => (
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '0',
                      transform: 'translateX(-50%)',
                      zIndex: 20,
                      pointerEvents: 'none',
                    }}
                    aria-hidden="true"
                  >
                    {/* Arrow pointing down */}
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '24px solid transparent',
                        borderRight: '24px solid transparent',
                        borderTop: '36px solid #f97316',
                        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
                      }}
                    />
                  </div>
                )}
                duration={4500}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleCustomSpin}
              disabled={isCustomSpinning}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isCustomSpinning ? '🎲 Spinning...' : '🎲 Spin Custom!'}
            </button>

            {customWinner && (
              <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg animate-pulse">
                🎉 Winner: {customWinner}
              </div>
            )}
          </div>

          {/* Code Example */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700">
            <pre className="overflow-x-auto text-sm">
              <code className="text-gray-300">
                {`<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  prizeSize={200}  // 👈 Larger size for cards
  prizeClassName="mx-2"  // 👈 Adds horizontal spacing
  renderPrize={(prize) => (
    <div className="bg-purple-600 rounded-2xl p-6 h-40 w-44">
      <div className="w-16 h-16 rounded-full bg-white/20">
        {prize.label}
      </div>
      <div className="text-sm font-bold">{prize.value} pts</div>
    </div>
  )}
  renderIndicator={() => (  // 👈 Custom arrow marker
    <div style={{ ... }}>
      <div style={{ borderTop: '36px solid #f97316' }} />
    </div>
  )}
  duration={4500}
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Vertical Example */}
        <section
          id="vertical"
          className="scroll-mt-20 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-secondary mb-2">Vertical Roulette</h2>
            <p className="text-gray-400 mb-4">
              Vertical orientation with slower animation
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-full h-[300px]">
              <SpinRoulette
                prizes={verticalPrizes}
                winningIndex={verticalWinningIndex}
                isSpinning={isVerticalSpinning}
                onComplete={handleVerticalComplete}
                orientation="vertical"
                className="w-full h-full border-3 border-secondary/50 rounded-xl bg-gray-900/50 shadow-xl"
                prizeClassName="flex items-center justify-center border-b-2 border-white/20 transition-transform hover:scale-105"
                duration={5000}
                prizeSize={80}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleVerticalSpin}
              disabled={isVerticalSpinning}
              className="px-8 py-4 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isVerticalSpinning ? '🎲 Spinning...' : '🎲 Spin Vertical!'}
            </button>

            {verticalWinner && (
              <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg animate-pulse">
                🎉 Winner: {verticalWinner}
              </div>
            )}
          </div>

          {/* Code Example */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700">
            <pre className="overflow-x-auto text-sm">
              <code className="text-gray-300">
                {`<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  orientation="vertical"  // 👈 Set to vertical
  className="w-80 h-[300px]"
  prizeSize={80}
  duration={5000}
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Fast Spin Example */}
        <section
          id="fast"
          className="scroll-mt-20 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-2">
              Fast Spin Mode ⚡
            </h2>
            <p className="text-gray-400 mb-4">Quick 2-second spin with more prizes</p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="w-full ">
              <SpinRoulette
                prizes={fastPrizes}
                winningIndex={fastWinningIndex}
                isSpinning={isFastSpinning}
                onComplete={() => setIsFastSpinning(false)}
                className="w-full h-full border-3 border-pink-500/50 rounded-xl bg-gray-900/50 shadow-xl"
                prizeClassName="flex items-center justify-center border-r-2 border-white/20 transition-transform hover:scale-105"
                duration={2000}
                easing="cubic-bezier(0.17, 0.67, 0.12, 0.99)"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleFastSpin}
              disabled={isFastSpinning}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-slow"
            >
              {isFastSpinning ? '⚡ Fast Spinning!' : '⚡ Fast Spin!'}
            </button>
          </div>

          {/* Code Example */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700">
            <pre className="overflow-x-auto text-sm">
              <code className="text-gray-300">
                {`<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  duration={2000}  // 👈 Faster animation (2 seconds)
  easing="cubic-bezier(0.17, 0.67, 0.12, 0.99)"
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Huge Dataset Performance Test */}
        <section
          id="performance"
          className="scroll-mt-20 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-yellow-500/50 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
              🚀 Performance Test - 30,000 Items
            </h2>
            <p className="text-gray-400 mb-2">
              Testing with massive dataset to ensure consistent performance
            </p>
            <div className="text-sm text-yellow-400 bg-yellow-900/20 p-3 rounded-lg mb-4">
              💡 This tests: Memory management, rendering performance, and timing accuracy
              with {hugePrizes.length.toLocaleString()} items
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="w-full">
              <SpinRoulette
                prizes={hugePrizes}
                winningIndex={hugeWinningIndex}
                isSpinning={isHugeSpinning}
                onComplete={handleHugeComplete}
                className="w-full h-full border-3 border-yellow-500/50 rounded-xl bg-gray-900/50 shadow-xl"
                prizeClassName="flex items-center justify-center border-r-2 border-white/20"
                duration={5000}
                prizeSize={150}
                minSpins={3}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleHugeSpin}
              disabled={isHugeSpinning}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isHugeSpinning ? '⚡ Spinning 30K Items...' : '⚡ Test 30K Items!'}
            </button>

            {hugeSpinEndTime > 0 && !isHugeSpinning && (
              <div className="text-center space-y-2">
                <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg">
                  ✅ Winner: Item {hugeWinningIndex + 1} of{' '}
                  {hugePrizes.length.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  <span className="font-semibold">Actual Duration:</span>{' '}
                  <span
                    className={
                      Math.abs(hugeSpinEndTime - hugeSpinStartTime - 5000) < 100
                        ? 'text-green-400'
                        : 'text-yellow-400'
                    }
                  >
                    {(hugeSpinEndTime - hugeSpinStartTime).toFixed(2)}ms
                  </span>{' '}
                  (Expected: 5000ms)
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 text-center max-w-md">
              <p>📊 Check browser console for performance metrics</p>
              <p>🔍 Monitor: DevTools Performance tab for frame drops</p>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700">
            <pre className="overflow-x-auto text-sm">
              <code className="text-gray-300">
                {`// Works perfectly with huge datasets!
const hugePrizes = Array.from({ length: 30000 }, (_, i) => ({
  id: \`prize-\${i}\`,
  label: \`Item \${i + 1}\`
}));

<SpinRoulette
  prizes={hugePrizes}  // 👈 30k items, no performance issues
  winningIndex={randomIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  duration={5000}
  minSpins={3}
/>`}
              </code>
            </pre>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-gray-800">
        <p className="text-gray-400 mb-4">
          Made with ❤️ using{' '}
          <span className="font-bold text-primary">react-spin-roulette</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <a
            href="https://github.com/edjo/react-spin-roulette"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            📦 GitHub Repository
          </a>
          <span className="text-gray-700">•</span>
          <a
            href="https://github.com/edjo/react-spin-roulette/tree/main/example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors font-semibold"
          >
            📂 View Source Code
          </a>
          <span className="text-gray-700">•</span>
          <a
            href="https://www.npmjs.com/package/react-spin-roulette"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            📥 npm Package
          </a>
          <span className="text-gray-700">•</span>
          <a
            href="https://github.com/IvanAdmaers/react-roulette-pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✨ Inspired by react-roulette-pro
          </a>
        </div>

        <p className="text-sm text-gray-600">
          TypeScript • React 18 • Headless UI • Zero Dependencies
        </p>
      </footer>
    </div>
  );
}

export default App;
