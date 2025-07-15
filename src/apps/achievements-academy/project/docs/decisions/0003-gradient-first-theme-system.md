# [ADR-0003] Gradient-First Theme System

## Status

Accepted

## Context

The application needs a comprehensive theme system that:
- Maintains the fantasy learning adventure aesthetic
- Provides consistent styling across all components
- Supports multiple color schemes and themes
- Ensures accessibility and readability
- Scales with new subjects and features

We need to decide on a styling approach that balances visual appeal with maintainability and performance.

## Decision

We will implement a gradient-first theme system using Tailwind CSS with the following characteristics:

1. **Gradient-First Design**: All major UI elements use gradients for depth and visual interest
2. **Subject-Specific Theming**: Each subject has unique visual identity while maintaining overall consistency
3. **Color Palette System**: 10-shade color palettes for each color category
4. **Theme Switching**: Instant theme switching without page reload
5. **Accessibility Focus**: All color combinations meet WCAG contrast requirements

## Consequences

### Positive

- **Visual Appeal**: Gradients create depth and maintain fantasy aesthetic
- **Consistency**: Centralized theme system ensures consistent styling
- **Flexibility**: Easy to add new themes and subjects
- **Performance**: Tailwind CSS provides optimized class generation
- **Accessibility**: Built-in contrast checking and high contrast support
- **Developer Experience**: Type-safe theme access and IntelliSense support

### Negative

- **Bundle Size**: Multiple color palettes increase CSS bundle size
- **Complexity**: More complex than simple color variables
- **Design Dependencies**: Relies on consistent gradient usage across components
- **Theme Switching**: Requires careful optimization to prevent layout shifts

## Implementation Notes

- All gradients use Tailwind's gradient utilities for consistency
- Color palettes are generated using design system principles
- Theme switching is handled by ThemeContext with memoized values
- Subject themes are applied dynamically based on current subject
- Accessibility is tested using automated tools and manual verification
- Performance is optimized through CSS purging and lazy loading

## References

- [Theme System Documentation](../design/theme-system.md)
- [Component Design Patterns](../design/components.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum) 