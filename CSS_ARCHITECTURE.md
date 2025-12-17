# CSS Architecture Documentation

## Overview
This project uses a modular CSS architecture with Tailwind CSS, organized for maintainability and scalability. The structure follows industry best practices for professional frontend development.

## Technology Stack
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool
- **Custom CSS Modules** - Component-specific styling

## File Structure

```
frontend/src/
├── index.css              # Main entry point
└── styles/
    ├── variables.css      # Design tokens & CSS custom properties
    ├── base.css           # Base styles, resets, layout foundation
    ├── navbar.css         # Navigation component styles
    ├── components.css     # Reusable UI component styles
    └── footer.css         # Footer component styles
```

## Architecture Pattern

### 1. **index.css** - Main Entry Point
The central stylesheet that imports Tailwind CSS and all custom modules using Tailwind's `@layer` directive for proper cascade control.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @import './styles/variables.css';
  @import './styles/base.css';
}

@layer components {
  @import './styles/navbar.css';
  @import './styles/components.css';
  @import './styles/footer.css';
}
```

### 2. **variables.css** - Design System Tokens
Contains all design tokens including:
- **Brand Colors** - Official Speedcubing Finland brand colors
- **Typography** - Font sizes, weights, families
- **Spacing** - Consistent spacing scale
- **Transitions** - Animation durations
- **Shadows** - Box shadow tokens
- **Component Dimensions** - Layout measurements

**Benefits:**
- Single source of truth for design values
- Easy theming and brand updates
- Consistent design across the application

### 3. **base.css** - Foundation Styles
Global resets and layout foundation:
- Box-sizing normalization
- Typography defaults
- Flexbox sticky footer pattern
- Root layout structure

### 4. **navbar.css** - Navigation Component
Dedicated styles for the navigation bar including:
- Fixed positioning and z-index management
- Logo placement and sizing
- Desktop navigation layout
- Mobile responsive hamburger menu
- Smooth transitions and animations

**Mobile-First Responsive:**
- Desktop: Centered horizontal navigation
- Mobile (<768px): Collapsible dropdown menu

### 5. **components.css** - UI Components
Reusable component styles:
- **Buttons** - Primary CTA buttons with hover states
- **Event Tags** - Event type indicators
- **Info Sections** - Content layout patterns
- **Paragraph Boxes** - Text content containers

All components follow BEM-like naming and are fully responsive.

### 6. **footer.css** - Footer Component
Site footer styles with:
- Sticky footer positioning (margin-top: auto)
- Typography and link styles
- Responsive padding

## Styling Strategy

### Tailwind Layers
We use Tailwind's `@layer` directive to control CSS specificity:

1. **@layer base** - Variables and foundational styles
2. **@layer components** - Component-specific classes
3. **@layer utilities** - Tailwind utilities (highest specificity)

This ensures proper cascade order and prevents specificity conflicts.

### Component Naming Convention
- **Descriptive BEM-style names**: `.navbar`, `.navbar-logo`, `.navbar-links`
- **State modifiers**: `.navbar-links-open`
- **Responsive prefixes**: Handled via media queries

### Responsive Design
- **Mobile-First Approach**: Base styles for mobile, enhanced for desktop
- **Breakpoint**: 768px (tablet/mobile boundary)
- **Flexible Layouts**: Flexbox for responsive components

## Brand Guidelines Integration

### Official Colors
From Speedcubing Finland Brand Guidelines:
- **Primary**: RGB(21, 47, 84) - Dark Blue
- **Secondary**: RGB(0, 61, 147) - Medium Blue

These are defined as CSS custom properties in `variables.css`:
```css
--brand-primary: rgb(21, 47, 84);
--brand-secondary: rgb(0, 61, 147);
```

### Logo Assets
- **Format**: SVG for crisp rendering at any size
- **Location**: `src/assets/LOGO_H2.svg`
- **Usage**: Horizontal logo in navigation bar

## Performance Optimizations

1. **CSS Custom Properties**: Runtime color changes without recompiling
2. **Modular Architecture**: Only import what you need
3. **PostCSS Processing**: Automatic vendor prefixing
4. **Tailwind JIT**: Just-In-Time compilation for minimal bundle size

## Development Workflow

### Adding New Components
1. Create component-specific styles in appropriate file (or new file)
2. Use CSS custom properties from `variables.css`
3. Follow existing naming conventions
4. Test responsiveness at mobile and desktop sizes

### Modifying Brand Colors
1. Update values in `variables.css`
2. Changes propagate throughout entire application
3. No need to update individual components

### Debugging Styles
- Use browser DevTools to inspect CSS custom properties
- Check Tailwind layer in the compiled CSS
- Verify import order in `index.css`

## Future Enhancements

### Potential Improvements
- [ ] Add dark mode support via CSS custom properties
- [ ] Implement CSS-in-JS for dynamic theming
- [ ] Add print stylesheets
- [ ] Enhance accessibility (focus states, high contrast mode)
- [ ] Add animation library integration

### Scalability Considerations
As the application grows:
- Consider splitting `components.css` by feature (buttons.css, forms.css, etc.)
- Implement CSS Modules for component-scoped styles
- Add Storybook for component documentation
- Implement visual regression testing

## Best Practices Followed

✅ **Separation of Concerns**: Design tokens separate from implementation  
✅ **DRY Principle**: Reusable components and utility classes  
✅ **Maintainability**: Clear file structure and naming  
✅ **Performance**: Optimized with Tailwind JIT  
✅ **Responsiveness**: Mobile-first design  
✅ **Accessibility**: Semantic HTML and focus states  
✅ **Documentation**: Inline comments and this README  

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

CSS Custom Properties are supported in all modern browsers (IE11 not supported).

## Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostCSS Documentation](https://postcss.org/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [BEM Methodology](http://getbem.com/)

---

**Maintained by**: Speedcubing Finland Development Team  
**Last Updated**: December 2025
