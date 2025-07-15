# Theme Integration Guide

This guide explains how to integrate and use the comprehensive theme system in your Learning Quest Academy application.

## 🎨 Available Themes

The application includes 4 beautifully crafted themes:

### 1. **Fantasy Adventure** (Default)
- **Colors**: Blue and purple gradients
- **Mood**: Magical and adventurous
- **Best for**: Engaging young learners with fantasy elements

### 2. **Ocean Adventure**
- **Colors**: Cyan and teal gradients  
- **Mood**: Calming and peaceful
- **Best for**: Focused learning sessions

### 3. **Forest Quest**
- **Colors**: Green and lime gradients
- **Mood**: Natural and organic
- **Best for**: Environmental and nature-themed learning

### 4. **Sunset Magic**
- **Colors**: Pink and orange gradients
- **Mood**: Warm and inspiring
- **Best for**: Creative and artistic subjects

## 🚀 How to Use Themes

### 1. **Theme Selector**
- Click the **🎨 palette icon** in the bottom-right corner of any page
- Choose from the 4 available themes
- Your selection is automatically saved to localStorage

### 2. **Automatic Theme Application**
Themes are automatically applied to:
- **Background gradients** - Each theme has unique background patterns
- **Subject-specific styling** - Mathematics and English have different color schemes
- **Headers and borders** - Consistent theming across all components
- **Interactive elements** - Buttons, cards, and progress bars

### 3. **Subject-Specific Themes**
Each subject (Mathematics, English) has its own themed elements:
- **Mathematics**: Blue/cyan gradients with 🔢 emoji
- **English**: Green/emerald gradients with 📚 emoji

## 🛠️ Technical Implementation

### Theme Context
```typescript
// Access the current theme
const { currentTheme, setTheme, availableThemes } = useTheme();

// Change theme
setTheme('ocean'); // 'fantasy', 'ocean', 'forest', 'sunset'
```

### CSS Custom Properties Integration
The theme system now integrates with Tailwind CSS using CSS custom properties:

```css
/* CSS custom properties are automatically updated */
:root {
  --theme-primary-500: #ec4899; /* Sunset theme */
  --theme-secondary-500: #f97316;
  --theme-accent-500: #eab308;
  /* ... more colors */
}
```

### Tailwind Integration
Tailwind is configured to use these CSS custom properties:

```javascript
// tailwind.config.js
colors: {
  theme: {
    primary: {
      500: 'var(--theme-primary-500)',
      // ... all shades
    },
    secondary: {
      500: 'var(--theme-secondary-500)',
      // ... all shades
    },
    // ... more color categories
  }
}
```

### Theme Structure
```typescript
interface ColorTheme {
  name: string;
  colors: {
    primary: { 50: string; 100: string; /* ... */ };
    secondary: { 50: string; 100: string; /* ... */ };
    accent: { 50: string; 100: string; /* ... */ };
    success: { 50: string; 100: string; /* ... */ };
    warning: { 50: string; 100: string; /* ... */ };
    error: { 50: string; 100: string; /* ... */ };
    neutral: { 50: string; 100: string; /* ... */ };
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    header: string;
  };
  subjects: {
    mathematics: {
      gradient: string;
      headerGradient: string;
      border: string;
      emoji: string;
      title: string;
    };
    english: {
      gradient: string;
      headerGradient: string;
      border: string;
      emoji: string;
      title: string;
    };
  };
}
```

### Using Themes in Components

#### 1. **Import Theme Context**
```typescript
import { useTheme } from '../contexts/ThemeContext';
```

#### 2. **Access Current Theme**
```typescript
const { currentTheme } = useTheme();
```

#### 3. **Apply Theme Colors**

**Option A: Using Theme Context (Current Approach)**
```typescript
// Background gradients
<div className={`bg-gradient-to-b ${currentTheme.gradients.background}`}>

// Subject-specific themes
const subjectTheme = currentTheme.subjects[subjectId] || currentTheme.subjects.mathematics;
<div className={`bg-gradient-to-b ${subjectTheme.gradient}`}>
```

**Option B: Using Theme-Aware Tailwind Classes (Recommended)**
```typescript
// Background colors
<div className="bg-theme-primary-500">Primary Background</div>
<div className="bg-theme-secondary-300">Secondary Light Background</div>

// Text colors
<div className="text-theme-primary-600">Primary Text</div>
<div className="text-theme-accent-700">Accent Text</div>

// Border colors
<div className="border-2 border-theme-success-400">Success Border</div>
<div className="border-4 border-theme-warning-500">Warning Border</div>

// Gradients (using custom CSS classes)
<div className="theme-gradient-primary">Primary Gradient</div>
<div className="theme-subject-mathematics">Mathematics Theme</div>
```

#### 4. **Add Theme Selector**
```typescript
import ThemeSelector from './ThemeSelector';

// Add to component JSX
<ThemeSelector />
```

## 📱 Component Integration Examples

### Dashboard Component
```typescript
const Dashboard: React.FC = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentTheme.gradients.background}`}>
      {/* Content */}
      <ThemeSelector />
    </div>
  );
};
```

### Subject Page Component (Using Theme-Aware Classes)
```typescript
const SubjectPage: React.FC = ({ subject }) => {
  const { currentTheme } = useTheme();
  const subjectTheme = currentTheme.subjects[subject.id] || currentTheme.subjects.mathematics;
  
  return (
    <div className={`min-h-screen bg-gradient-to-b ${subjectTheme.gradient}`}>
      <header className={`bg-gradient-to-r ${subjectTheme.headerGradient}`}>
        <h1>{subjectTheme.emoji} {subjectTheme.title}</h1>
      </header>
      <ThemeSelector />
    </div>
  );
};
```

### Using Theme-Aware Tailwind Classes
```typescript
const ModernComponent: React.FC = () => {
  return (
    <div className="bg-theme-primary-50 min-h-screen">
      <header className="bg-theme-primary-600 text-white">
        <h1 className="text-theme-accent-100">Title</h1>
      </header>
      
      <main className="p-6">
        <div className="bg-theme-secondary-100 border-2 border-theme-secondary-300 rounded-lg p-4">
          <h2 className="text-theme-primary-700 font-bold">Content</h2>
          <p className="text-theme-neutral-600">Description</p>
        </div>
        
        <button className="bg-theme-success-500 hover:bg-theme-success-600 text-white px-4 py-2 rounded">
          Action Button
        </button>
      </main>
    </div>
  );
};
```

## 🎯 Best Practices

### 1. **Consistent Theming**
- Always use theme colors instead of hardcoded values
- Use the `useTheme()` hook in all components
- Apply subject-specific themes for different subjects
- **Prefer theme-aware Tailwind classes** (`bg-theme-primary-500`) over dynamic classes

### 2. **Performance**
- Theme changes are optimized and don't cause re-renders
- Theme selection is persisted in localStorage
- Theme context is lightweight and efficient

### 3. **Accessibility**
- All themes maintain good contrast ratios
- Color combinations are tested for accessibility
- Theme changes don't affect functionality

### 4. **Responsive Design**
- All themes work across different screen sizes
- Mobile-first approach maintained
- Touch-friendly theme selector

## 🔧 Customization

### Adding New Themes
1. **Define the theme** in `src/styles/themes.ts`:
```typescript
export const newTheme: ColorTheme = {
  name: 'New Theme',
  colors: { /* color palette */ },
  gradients: { /* gradient definitions */ },
  subjects: { /* subject-specific themes */ }
};
```

2. **Add to themes object**:
```typescript
export const themes = {
  fantasy: fantasyTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
  newTheme: newTheme, // Add here
};
```

3. **Update ThemeSelector** component to include the new theme option.

### Modifying Existing Themes
- Edit the theme definitions in `src/styles/themes.ts`
- Changes are immediately reflected in the application
- No additional configuration required

## 🎨 Theme Features

### Color Palettes
Each theme includes:
- **Primary colors** (10 shades: 50-900)
- **Secondary colors** (10 shades: 50-900)
- **Accent colors** (10 shades: 50-900)
- **Status colors** (success, warning, error)
- **Neutral colors** (10 shades: 50-900)

### Available Tailwind Classes
```css
/* Background colors */
bg-theme-primary-{50-900}
bg-theme-secondary-{50-900}
bg-theme-accent-{50-900}
bg-theme-success-{50-900}
bg-theme-warning-{50-900}
bg-theme-error-{50-900}
bg-theme-neutral-{50-900}

/* Text colors */
text-theme-primary-{50-900}
text-theme-secondary-{50-900}
text-theme-accent-{50-900}
text-theme-success-{50-900}
text-theme-warning-{50-900}
text-theme-error-{50-900}
text-theme-neutral-{50-900}

/* Border colors */
border-theme-primary-{50-900}
border-theme-secondary-{50-900}
border-theme-accent-{50-900}
border-theme-success-{50-900}
border-theme-warning-{50-900}
border-theme-error-{50-900}
border-theme-neutral-{50-900}

/* Custom gradient classes */
theme-gradient-primary
theme-gradient-secondary
theme-gradient-accent
theme-gradient-success
theme-gradient-warning
theme-gradient-error
theme-gradient-background
theme-gradient-header
theme-subject-mathematics
theme-subject-english
```

### Gradient Combinations
- **Primary gradients** for main elements
- **Secondary gradients** for supporting elements
- **Background gradients** for page backgrounds
- **Header gradients** for navigation headers
- **Subject-specific gradients** for different subjects

### Subject Themes
Each subject has:
- **Custom gradient** for subject pages
- **Header gradient** for subject headers
- **Border styling** for decorative elements
- **Emoji** for visual identification
- **Title** for branding

## 🚀 Getting Started

1. **Theme is already integrated** - No setup required!
2. **Test theme switching** - Click the palette icon
3. **Explore different subjects** - See how themes adapt
4. **Customize as needed** - Modify themes in `themes.ts`

## 📝 Notes

- **Default theme**: Sunset Magic (warm and inspiring)
- **Persistence**: Theme selection is saved automatically
- **Performance**: Theme changes are instant and smooth
- **Compatibility**: Works with all existing components
- **Extensibility**: Easy to add new themes or modify existing ones

The theme system provides a rich, customizable experience that enhances the learning environment while maintaining excellent performance and accessibility standards. 