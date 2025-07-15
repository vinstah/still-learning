# Theme System

The Achievements Academy uses a comprehensive theme system that provides consistent styling across all components while maintaining the fantasy learning adventure aesthetic.

## 🎨 Theme Architecture

### Core Design Principles

1. **Consistency** - All components use the same color palette and design tokens
2. **Accessibility** - All color combinations meet WCAG contrast requirements
3. **Flexibility** - Easy to switch themes and customize colors
4. **Performance** - CSS-in-JS with optimized class generation

### Theme Structure

```typescript
interface ColorTheme {
  colors: {
    primary: string[];    // 10 shades of primary color
    secondary: string[];  // 10 shades of secondary color
    accent: string[];     // 10 shades of accent color
    success: string[];    // 10 shades of success color
    warning: string[];    // 10 shades of warning color
    error: string[];      // 10 shades of error color
    neutral: string[];    // 10 shades of neutral color
  };
  gradients: {
    primary: string;      // Primary gradient
    secondary: string;    // Secondary gradient
    accent: string;       // Accent gradient
    background: string;   // Background gradient
    header: string;       // Header gradient
    card: string;         // Card gradient
    button: string;       // Button gradient
  };
  subjects: {
    mathematics: SubjectTheme;
    english: SubjectTheme;
  };
}
```

## 🌈 Available Themes

### 1. Fantasy Adventure (Default)
```typescript
export const fantasyTheme: ColorTheme = {
  colors: {
    primary: ['#1e3a8a', '#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#eff6ff'],
    secondary: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#f3f4f6'],
    // ... other colors
  },
  gradients: {
    primary: 'from-blue-600 to-purple-600',
    background: 'from-blue-50 to-indigo-100',
    // ... other gradients
  }
};
```

### 2. Ocean Adventure
```typescript
export const oceanTheme: ColorTheme = {
  colors: {
    primary: ['#0e7490', '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#cffafe', '#ecfeff'],
    secondary: ['#0f766e', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1', '#f0fdfa'],
    // ... other colors
  }
};
```

### 3. Forest Quest
```typescript
export const forestTheme: ColorTheme = {
  colors: {
    primary: ['#166534', '#16a34a', '#22c55e', '#4ade80', '#86efac', '#dcfce7', '#f0fdf4'],
    secondary: ['#15803d', '#16a34a', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7', '#f0fdf4'],
    // ... other colors
  }
};
```

### 4. Sunset Magic
```typescript
export const sunsetTheme: ColorTheme = {
  colors: {
    primary: ['#be185d', '#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fdf2f8'],
    secondary: ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5', '#fff7ed'],
    // ... other colors
  }
};
```

## 🎯 Subject-Specific Theming

### Mathematics Theme
```typescript
subjects: {
  mathematics: {
    gradient: 'from-blue-500 to-purple-600',
    headerGradient: 'from-blue-600 to-indigo-700',
    border: 'border-blue-200',
    emoji: '🧮',
    title: 'Mathematics Realm'
  }
}
```

### English Theme
```typescript
subjects: {
  english: {
    gradient: 'from-green-500 to-emerald-600',
    headerGradient: 'from-green-600 to-teal-700',
    border: 'border-green-200',
    emoji: '📚',
    title: 'English Literature'
  }
}
```

## 🔧 Implementation Patterns

### Using Theme Colors

```typescript
// In components
const Card = styled.div`
  background: ${props => props.theme.gradients.card};
  border: 2px solid ${props => props.theme.colors.primary[2]};
  color: ${props => props.theme.colors.neutral[8]};
`;

// With Tailwind classes
<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
  Content
</div>
```

### Theme Switching

```typescript
// In ThemeContext
const [currentTheme, setCurrentTheme] = useState(fantasyTheme);

const switchTheme = (themeName: string) => {
  switch (themeName) {
    case 'ocean':
      setCurrentTheme(oceanTheme);
      break;
    case 'forest':
      setCurrentTheme(forestTheme);
      break;
    case 'sunset':
      setCurrentTheme(sunsetTheme);
      break;
    default:
      setCurrentTheme(fantasyTheme);
  }
};
```

### Responsive Theming

```typescript
// Mobile-first approach
const Button = styled.button`
  padding: 0.75rem 1.5rem;  // Mobile
  font-size: 0.875rem;      // Mobile
  
  @media (min-width: 640px) {
    padding: 1rem 2rem;      // Tablet
    font-size: 1rem;         // Tablet
  }
  
  @media (min-width: 1024px) {
    padding: 1.25rem 2.5rem; // Desktop
    font-size: 1.125rem;     // Desktop
  }
`;
```

## 🎨 Component Theming

### Card Components
```typescript
const LessonCard = ({ lesson, theme }) => (
  <div className={`
    bg-gradient-to-br ${theme.gradients.card}
    border-2 ${theme.subjects.mathematics.border}
    rounded-lg p-4 shadow-lg
    hover:shadow-xl transition-shadow
  `}>
    <h3 className="text-lg font-bold text-gray-800">
      {lesson.title}
    </h3>
    <p className="text-gray-600 mt-2">
      {lesson.description}
    </p>
  </div>
);
```

### Button Components
```typescript
const PrimaryButton = ({ children, theme }) => (
  <button className={`
    bg-gradient-to-r ${theme.gradients.button}
    text-white font-semibold py-2 px-4
    rounded-lg shadow-md hover:shadow-lg
    transition-all duration-200
    transform hover:scale-105
  `}>
    {children}
  </button>
);
```

### Modal Components
```typescript
const Modal = ({ isOpen, onClose, children, theme }) => (
  <div className={`
    fixed inset-0 bg-black bg-opacity-50
    flex items-center justify-center z-50
  `}>
    <div className={`
      bg-white rounded-lg shadow-2xl
      max-w-md w-full mx-4 max-h-[90vh]
      overflow-y-auto
    `}>
      <div className={`
        bg-gradient-to-r ${theme.gradients.header}
        text-white p-4 rounded-t-lg
      `}>
        <h2 className="text-xl font-bold">Modal Title</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);
```

## 🎯 Design Decisions

### 1. **Gradient-First Approach**
- All major UI elements use gradients
- Creates depth and visual interest
- Maintains fantasy aesthetic

### 2. **Color Consistency**
- 10-shade color palettes for each color
- Consistent naming across themes
- Easy to maintain and extend

### 3. **Subject Differentiation**
- Each subject has unique visual identity
- Maintains overall theme consistency
- Helps users navigate between subjects

### 4. **Accessibility Focus**
- All color combinations tested for contrast
- High contrast mode support
- Keyboard navigation friendly

## 🔧 Customization

### Adding New Themes

1. **Define Theme Colors**
```typescript
export const newTheme: ColorTheme = {
  colors: {
    primary: ['#...', '#...', '#...'], // 10 shades
    secondary: ['#...', '#...', '#...'], // 10 shades
    // ... other colors
  },
  gradients: {
    primary: 'from-color-500 to-color-600',
    // ... other gradients
  },
  subjects: {
    mathematics: { /* subject theme */ },
    english: { /* subject theme */ }
  }
};
```

2. **Add to Theme Context**
```typescript
const switchTheme = (themeName: string) => {
  switch (themeName) {
    // ... existing cases
    case 'newTheme':
      setCurrentTheme(newTheme);
      break;
  }
};
```

### Adding New Subjects

1. **Define Subject Theme**
```typescript
subjects: {
  mathematics: { /* existing */ },
  english: { /* existing */ },
  science: {
    gradient: 'from-green-500 to-teal-600',
    headerGradient: 'from-green-600 to-emerald-700',
    border: 'border-green-200',
    emoji: '🧪',
    title: 'Science Lab'
  }
}
```

## 📈 Performance Considerations

### 1. **CSS Optimization**
- Tailwind CSS for utility-first styling
- PurgeCSS to remove unused styles
- Optimized class generation

### 2. **Theme Switching**
- Instant theme switching without page reload
- Smooth transitions between themes
- Cached theme preferences

### 3. **Bundle Size**
- Only active theme colors in bundle
- Lazy loading of theme assets
- Minimal CSS overhead

## 🔗 Related Documentation

- [Component Design](./components.md) - How components use themes
- [Responsive Design](./responsive.md) - Theme adaptation across devices
- [Accessibility](./accessibility.md) - Theme accessibility considerations 