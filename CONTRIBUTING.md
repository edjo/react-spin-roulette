# Contributing to React Spin Roulette

First off, thank you for considering contributing to React Spin Roulette! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, Node version, React version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List examples of how it would be used**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our coding standards
4. **Add tests** for your changes
5. **Run the test suite**: `npm test`
6. **Run linting**: `npm run lint`
7. **Run type checking**: `npm run type-check`
8. **Update documentation** if needed
9. **Commit your changes** with a clear commit message
10. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/react-spin-roulette.git
cd react-spin-roulette

# Install dependencies
npm install

# Run tests in watch mode
npm run test:watch

# Run dev build
npm run dev

# Build for production
npm run build
```

## Coding Standards

### TypeScript

- **Use strict TypeScript** - no `any` types unless absolutely necessary
- **Export all public types** - make the package fully type-safe
- **Document with JSDoc** - add comments for public APIs
- **Validate props** - add runtime validation where appropriate

### React

- **Use functional components** - no class components
- **Use hooks properly** - follow React hooks rules
- **Memoize when appropriate** - use `useMemo` and `useCallback` for performance
- **Keep components small** - single responsibility principle

### Code Style

- **Follow the existing code style** - we use Prettier and ESLint
- **Write clear variable names** - prefer descriptive over short
- **Add comments for complex logic** - explain the "why", not the "what"
- **Keep functions small** - ideally under 50 lines

### Testing

- **Write tests for new features** - aim for high coverage
- **Test edge cases** - not just the happy path
- **Use descriptive test names** - `it('should do X when Y happens')`
- **Mock external dependencies** - keep tests fast and isolated

### Commit Messages

Follow the conventional commits specification:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(roulette): add support for custom easing functions
fix(hooks): resolve memory leak in useRoulette
docs(readme): update installation instructions
```

## Project Structure

```
react-spin-roulette/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── test/           # Test setup
│   └── index.ts        # Main entry point
├── dist/               # Build output (generated)
└── ...
```

## Testing Guidelines

### Unit Tests

- Test individual functions and utilities
- Mock external dependencies
- Cover edge cases and error conditions

### Component Tests

- Test component rendering
- Test user interactions
- Test prop changes
- Test callback invocations

### Integration Tests

- Test component behavior with real hooks
- Test complete user workflows
- Test accessibility features

## Documentation

- Update README.md for new features
- Add JSDoc comments to public APIs
- Include code examples in documentation
- Update CHANGELOG.md

## Performance Considerations

- Use `useMemo` for expensive calculations
- Use `useCallback` for callback functions passed to children
- Avoid unnecessary re-renders
- Use CSS transforms for animations (GPU acceleration)
- Keep bundle size small

## Accessibility

- Use semantic HTML
- Include ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers

## Questions?

Feel free to open an issue with the `question` label if you have any questions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to React Spin Roulette! 🎰✨

