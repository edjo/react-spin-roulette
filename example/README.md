# React Spin Roulette - Example

Interactive demo application showcasing the `react-spin-roulette` component.

## 🌐 Live Demo

🎮 **[View Live Examples](https://react-spin-roulette.pages.dev/)** - Try all demos in your browser!

📂 **[View Source Code on GitHub](https://github.com/edjo/react-spin-roulette/tree/main/example)** - Browse the code

## 🚀 Quick Start

### 1. Install Dependencies

First, make sure the parent package is built:

```bash
# From the react-spin-roulette root directory
cd ..
npm run build
```

Then install example dependencies:

```bash
# From the example directory
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## 🎨 What's Included

The demo showcases 4 different examples:

### 1. **Basic Horizontal Roulette**

- Default horizontal orientation
- 8 colored prizes
- 4-second spin duration
- Winner announcement

### 2. **Vertical Roulette**

- Vertical orientation
- 6 prizes
- 5-second slower animation
- Different prize size

### 3. **Custom Prize Rendering**

- Custom `renderPrize` function
- Emoji-based prizes
- Point values displayed
- Gradient backgrounds

### 4. **Fast Spin Mode**

- Quick 2-second spins
- 10 prizes
- Custom easing function
- Pulsing button animation

## 📁 Project Structure

```
example/
├── src/
│   ├── App.tsx           # Main demo component
│   ├── App.css           # Styling
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 💡 Key Features Demonstrated

- **Headless UI**: Complete control over styling
- **Multiple Orientations**: Horizontal and vertical
- **Custom Rendering**: Flexible prize display
- **Different Durations**: From 2s to 5s animations
- **Custom Easing**: Different animation curves
- **Winner Detection**: Complete callback handling
- **Responsive Design**: Works on mobile and desktop

## 🎯 Code Examples

### Basic Usage

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  onComplete={() => setIsSpinning(false)}
/>
```

### Vertical with Custom Size

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  orientation="vertical"
  prizeSize={100}
  duration={5000}
/>
```

### Custom Prize Rendering

```tsx
<SpinRoulette
  prizes={prizes}
  winningIndex={winningIndex}
  isSpinning={isSpinning}
  renderPrize={(prize) => (
    <div>
      <span>{prize.label}</span>
      <span>{prize.value} pts</span>
    </div>
  )}
/>
```

## 🎨 Customization

All styling is done via CSS. You can:

1. **Modify `App.css`** to change the look
2. **Add Tailwind** for utility classes
3. **Use CSS-in-JS** libraries
4. **Apply your design system**

## 📦 Using in Your Project

To use this component in your own project:

```bash
npm install react-spin-roulette
```

Then import and use:

```tsx
import { SpinRoulette } from 'react-spin-roulette';
import type { Prize } from 'react-spin-roulette';
```

## 🐛 Troubleshooting

### Component not rendering?

- Make sure parent package is built: `cd .. && npm run build`
- Check that dependencies are installed: `npm install`

### Types not working?

- Ensure TypeScript is configured correctly
- Check that `react-spin-roulette` is properly installed

### Styling issues?

- Verify CSS is loaded
- Check browser console for errors

## 📚 Learn More

- [Main README](../README.md) - Full documentation
- [API Reference](../README.md#api-reference) - Props and types
- [Contributing Guide](../CONTRIBUTING.md) - Development guidelines

---

Made with ❤️ using React Spin Roulette
