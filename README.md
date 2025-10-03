# 🎰 React Spin Roulette

A lightweight, performant, and fully type-safe **linear roulette/spinner** component for React with **headless UI** support.

[![npm version](https://img.shields.io/npm/v/react-spin-roulette.svg?style=flat-square)](https://www.npmjs.com/package/react-spin-roulette)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-spin-roulette?style=flat-square)](https://bundlephobia.com/package/react-spin-roulette)

<div align="center">
  
### 🎮 [**Try Interactive Examples →**](https://react-spin-roulette.pages.dev/)

**[react-spin-roulette.pages.dev](https://react-spin-roulette.pages.dev/)** - Play with live demos and copy code snippets!

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [How It Works](#-how-it-works)
- [Live Demo](#-live-demo)
- [Styling](#-styling)
- [API Reference](#-api-reference)
- [Advanced Examples](#-advanced-examples)
- [Performance](#-configuration)
- [FAQ](#-faq)
- [Contributing](#-contributing)

---

## 🎯 Use Cases

Perfect for creating engaging interactive experiences:

- 🎁 **Prize Wheels** - Raffle draws, giveaways, contests
- 🎰 **Slot Machines** - Game mechanics, gambling simulations
- 🏆 **Lottery Systems** - Number pickers, random selections
- 🎮 **Game Elements** - Rewards, loot boxes, item drops
- 📱 **Marketing** - Promotional campaigns, discount wheels
- 🎓 **Education** - Random student selector, quiz games

## ✨ Features

- 🎨 **Headless UI** - Full control over styling (Tailwind, CSS-in-JS, or plain CSS)
- 📐 **Horizontal & Vertical** - Support for both orientations
- ⚡ **Performance First** - Handles 30,000+ items with smart sampling
- 🛡️ **100% Type-Safe** - Built with TypeScript strict mode
- 🪶 **Lightweight** - Zero dependencies (except React)
- 🎯 **Custom Indicators** - Add your own pointer/marker design
- 🔄 **Auto Spin Control** - Intelligent rotation calculation
- ♿ **Accessible** - ARIA labels and semantic HTML
- 🧪 **Well Tested** - Comprehensive test coverage
- 📦 **Tree-Shakeable** - Import only what you need
- 🚀 **Easy to Use** - Simple API with smart defaults

## 📦 Installation

```bash
# npm
npm install react-spin-roulette

# yarn
yarn add react-spin-roulette

# pnpm
pnpm add react-spin-roulette
```

> **Requirements:** React 17+ or 18+

## 🚀 Quick Start

### Basic Example

```tsx
import { SpinRoulette } from 'react-spin-roulette';

const prizes = [
  { id: '1', label: 'Prize 1', image: '/prize1.png' },
  { id: '2', label: 'Prize 2', image: '/prize2.png' },
  { id: '3', label: 'Prize 3', image: '/prize3.png' },
  { id: '4', label: 'Prize 4', image: '/prize4.png' },
];

function App() {
  const [winningIndex, setWinningIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    // Generate random winning index
    const randomIndex = Math.floor(Math.random() * prizes.length);
    setWinningIndex(randomIndex);
    setIsSpinning(true);
  };

  const handleComplete = () => {
    setIsSpinning(false);
    console.log('Winner:', prizes[winningIndex]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SpinRoulette
        prizes={prizes}
        winningIndex={winningIndex}
        isSpinning={isSpinning}
        onComplete={handleComplete}
        orientation="horizontal"
        className="w-full h-32 border-2 border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        {isSpinning ? 'Spinning...' : 'Spin!'}
      </button>
    </div>
  );
}
```

### With Custom Styling

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  className="w-full h-40 bg-gray-900 rounded-2xl"
  prizeClassName="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold border-r-2 border-white/20"
  duration={3000}
  minSpins={3}
/>
```

## 🎨 How It Works

Unlike circular wheel spinners, **React Spin Roulette** works like a **slot machine** or **linear slider**:

- Prizes scroll **horizontally** (left/right) or **vertically** (up/down)
- The winning prize stops in the center viewport
- Multiple complete rotations before landing (like a real lottery)
- Smart sampling automatically handles huge datasets (30k+ items)
- Smooth CSS transform-based animations with GPU acceleration

## 🎬 Live Demo & Examples

🌟 **[Try Interactive Examples →](https://react-spin-roulette.pages.dev/)** 🌟

Visit [**react-spin-roulette.pages.dev**](https://react-spin-roulette.pages.dev/) to:

- 🎮 **Test all features** - Interactive playground with live examples
- 🎨 **See styling options** - Horizontal/Vertical orientations, custom styles
- 🎯 **Try custom indicators** - Different pointer designs
- 📊 **Performance demos** - Test with small and large datasets
- 💡 **Copy code snippets** - Ready-to-use examples for your project

📂 **[View Example Source Code →](https://github.com/edjo/react-spin-roulette/tree/main/example)** - Complete example app with all demos

## 🎨 Styling

### With Tailwind CSS

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  orientation="horizontal"
  className="w-full h-32 border-2 border-gray-300 rounded-lg overflow-hidden"
  prizeClassName="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
  indicatorClassName="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-red-500"
/>
```

### With Custom CSS

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  orientation="vertical"
  className="custom-roulette"
  prizeClassName="custom-prize"
/>
```

```css
.custom-roulette {
  width: 300px;
  height: 400px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.custom-prize {
  display: flex;
  align-items: center;
  justify-center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 1rem;
}
```

## 📖 API Reference

### SpinRoulette Props

| Prop                 | Type                          | Required | Default                            | Description                                                                   |
| -------------------- | ----------------------------- | -------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| `prizes`             | `Prize[]`                     | ✅       | -                                  | Array of prize objects                                                        |
| `winningIndex`       | `number`                      | ✅       | -                                  | Index of the winning prize (must be valid)                                    |
| `isSpinning`         | `boolean`                     | ✅       | -                                  | Whether the roulette is currently spinning                                    |
| `onComplete`         | `() => void`                  | ❌       | `undefined`                        | Callback when spin animation completes                                        |
| `onSpinStart`        | `() => void`                  | ❌       | `undefined`                        | Callback when spin animation starts                                           |
| `duration`           | `number`                      | ❌       | `5000`                             | Spin duration in milliseconds                                                 |
| `easing`             | `string`                      | ❌       | `cubic-bezier(0.25, 0.1, 0.25, 1)` | CSS easing function                                                           |
| `orientation`        | `'horizontal' \| 'vertical'`  | ❌       | `'horizontal'`                     | Scroll direction                                                              |
| `prizeSize`          | `number`                      | ❌       | `150`                              | Size of each prize item (width for horizontal, height for vertical) in pixels |
| `minSpins`           | `number`                      | ❌       | `5`                                | Number of complete rotations before landing on winner                         |
| `className`          | `string`                      | ❌       | `undefined`                        | CSS class for the container                                                   |
| `prizeClassName`     | `string`                      | ❌       | `undefined`                        | CSS class for each prize item                                                 |
| `indicatorClassName` | `string`                      | ❌       | `undefined`                        | CSS class for the center indicator/pointer                                    |
| `renderPrize`        | `(prize: Prize) => ReactNode` | ❌       | `undefined`                        | Custom prize renderer                                                         |
| `renderIndicator`    | `() => ReactNode`             | ❌       | `undefined`                        | Custom indicator/marker renderer                                              |

### Prize Type

```typescript
interface Prize {
  id: string; // Unique identifier (required)
  label: string; // Display text (required)
  image?: string; // Optional image URL
  value?: any; // Optional value associated with the prize
  className?: string; // Optional CSS class for this specific prize
  style?: CSSProperties; // Optional inline styles for this prize
}
```

## 🎯 Advanced Examples

### Custom Prize Rendering

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  renderPrize={(prize) => (
    <div className="flex flex-col items-center p-4 gap-2">
      <img
        src={prize.image}
        alt={prize.label}
        className="w-16 h-16 rounded-full object-cover"
      />
      <span className="text-sm font-bold text-center">{prize.label}</span>
      {prize.value && <span className="text-xs text-gray-500">{prize.value} points</span>}
    </div>
  )}
/>
```

### Vertical Orientation

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  orientation="vertical"
  prizeSize={120}
  className="w-64 h-96"
/>
```

### Custom Indicator/Marker

Create your own pointer design:

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  renderIndicator={() => (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
        zIndex: 20,
      }}
    >
      {/* Custom arrow pointing down */}
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
/>
```

### Control Spin Rotations

Customize how many times the roulette spins before stopping:

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  minSpins={3} // 3 complete rotations (default: 5)
  duration={3000} // Faster 3-second spin
/>
```

### With Sound Effects

```tsx
import useSound from 'use-sound';

function App() {
  const [playSpinSound] = useSound('/sounds/spin.mp3');
  const [playWinSound] = useSound('/sounds/win.mp3');

  const handleSpinStart = () => {
    playSpinSound();
  };

  const handleComplete = () => {
    playWinSound();
    setIsSpinning(false);
  };

  return (
    <SpinRoulette
      prizes={prizes}
      winningIndex={winningIndex}
      isSpinning={isSpinning}
      onSpinStart={handleSpinStart}
      onComplete={handleComplete}
    />
  );
}
```

### Huge Datasets - Performance Optimization

**React Spin Roulette** automatically handles massive datasets efficiently! ✨

```tsx
// Works perfectly with 30,000+ items!
const hugePrizes = Array.from({ length: 30000 }, (_, i) => ({
  id: `prize-${i}`,
  label: `Item ${i + 1}`,
}));

<SpinRoulette
  prizes={hugePrizes} // 🚀 No performance issues!
  winningIndex={randomIndex}
  isSpinning={isSpinning}
  onComplete={handleComplete}
  duration={5000}
  minSpins={3}
/>;
```

**How it works:**

- 🎯 **Smart Sampling**: Automatically creates a visual subset for large datasets
- 💡 **Intelligent Rendering**: Only renders what's needed for the animation
- ⚡ **Zero Lag**: Maintains smooth 60fps animation
- 🧠 **Automatic Detection**: Kicks in seamlessly for datasets > 100 items
- 🎲 **Accurate Results**: Always lands on the correct winning item

## ⚙️ Configuration

### TypeScript

This package is written in TypeScript and provides full type definitions out of the box. No need for `@types/*` packages!

```typescript
import type { Prize, SpinRouletteProps } from 'react-spin-roulette';
```

### Performance Tips

1. **Memoize prize arrays**: Use `useMemo` to prevent re-creating the prize array
2. **Large datasets**: Works seamlessly with 30k+ items (auto-optimization)
3. **GPU acceleration**: Uses `translate3d()` for hardware-accelerated animations
4. **Avoid inline styles**: Use `className` props for better performance
5. **Consistent spin duration**: Animation timing is precise regardless of dataset size

```tsx
// ✅ Good - memoized
const prizes = useMemo(() => generatePrizes(), []);

// ❌ Bad - recreated every render
const prizes = generatePrizes();
```

### Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ React 17+, 18+
- ✅ Modern mobile browsers (iOS Safari, Chrome Mobile)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## ❓ FAQ

<details>
<summary><b>How do I handle thousands of prizes?</b></summary>

No problem! The component automatically optimizes rendering for large datasets (30k+ items tested). Just pass your array normally:

```tsx
const prizes = Array.from({ length: 10000 }, (_, i) => ({
  id: `prize-${i}`,
  label: `Prize ${i + 1}`,
}));

<SpinRoulette prizes={prizes} {...otherProps} />;
```

</details>

<details>
<summary><b>Can I style it with plain CSS instead of Tailwind?</b></summary>

Absolutely! The component is headless - use any styling solution:

```tsx
<SpinRoulette
  className="my-custom-roulette"
  prizeClassName="my-custom-prize"
  {...props}
/>
```

</details>

<details>
<summary><b>How do I make the spin faster/slower?</b></summary>

Use the `duration` and `minSpins` props:

```tsx
<SpinRoulette
  duration={2000} // 2 seconds (faster)
  minSpins={3} // 3 rotations instead of 5
  {...otherProps}
/>
```

</details>

<details>
<summary><b>Can I use it with server-side rendering (SSR)?</b></summary>

Yes! The component is SSR-friendly and works with Next.js, Remix, etc.

</details>

<details>
<summary><b>How do I trigger the spin programmatically?</b></summary>

Control the `isSpinning` prop from your state:

```tsx
const [isSpinning, setIsSpinning] = useState(false);

const triggerSpin = () => {
  setWinningIndex(Math.floor(Math.random() * prizes.length));
  setIsSpinning(true);
};

<SpinRoulette
  isSpinning={isSpinning}
  onComplete={() => setIsSpinning(false)}
  {...otherProps}
/>;
```

</details>

## 🛠️ Troubleshooting

**Prizes not rendering?**

- Ensure each prize has a unique `id`
- Check that `prizes` array is not empty
- Verify container has width/height

**Animation is jumpy?**

- Make sure `prizes` array is memoized with `useMemo`
- Avoid changing `winningIndex` while spinning

**TypeScript errors?**

- Update to React 17+ and TypeScript 4.5+
- Ensure `@types/react` is installed

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build library
npm run build

# Run example app
cd example && npm install && npm run dev
```

## 📄 License

MIT © [Your Name]

## 💡 Why Choose React Spin Roulette?

| Feature             | React Spin Roulette | Other Libraries       |
| ------------------- | ------------------- | --------------------- |
| 🎨 Headless UI      | ✅ Full control     | ❌ Fixed styles       |
| 📊 Large Datasets   | ✅ 30k+ items       | ❌ Performance issues |
| 🛡️ TypeScript       | ✅ 100% strict      | ⚠️ Partial or none    |
| 🧪 Tests            | ✅ Comprehensive    | ⚠️ Limited            |
| 📦 Bundle Size      | ✅ ~5KB gzipped     | ❌ 15-50KB+           |
| 🎯 Custom Indicator | ✅ Yes              | ❌ No                 |
| 🔄 Spin Control     | ✅ Configurable     | ⚠️ Fixed              |
| ⚡ Performance      | ✅ GPU-accelerated  | ⚠️ Varies             |

## 🙏 Acknowledgments

Inspired by [react-roulette-pro](https://github.com/IvanAdmaers/react-roulette-pro) by [@IvanAdmaers](https://github.com/IvanAdmaers).

This project is a **complete ground-up rewrite** focusing on:

- ✨ **Headless UI** architecture for complete styling flexibility
- 🛡️ **100% TypeScript** with strict mode and comprehensive type safety
- ⚡ **Performance-first** implementation with smart sampling for huge datasets
- 🧪 **Test-driven** development with comprehensive coverage
- 📦 **Zero dependencies** (except React peer dependency)
- 🎯 **Clean, maintainable code** with extensive English documentation
- 🚀 **Modern React patterns** (hooks, memoization, GPU acceleration)

While inspired by the original concept, this is a completely independent implementation with significant architectural improvements.

## 🔗 Links

- 🎮 [**Interactive Examples**](https://react-spin-roulette.pages.dev/) - Try it live!
- 📂 [**Example Source Code**](https://github.com/edjo/react-spin-roulette/tree/main/example) - View complete example app
- 📦 [NPM Package](https://www.npmjs.com/package/react-spin-roulette)
- 💻 [GitHub Repository](https://github.com/edjo/react-spin-roulette)
- 🐛 [Issue Tracker](https://github.com/edjo/react-spin-roulette/issues)
- 📝 [Changelog](CHANGELOG.md)

## 📊 Stats

![npm downloads](https://img.shields.io/npm/dm/react-spin-roulette?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/edjo/react-spin-roulette?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/edjo/react-spin-roulette?style=flat-square)

---

<div align="center">
  
**Made with ❤️ and TypeScript**

If you find this library helpful, please ⭐ star it on [GitHub](https://github.com/edjo/react-spin-roulette)!

</div>
