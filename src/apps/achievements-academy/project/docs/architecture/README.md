# Architecture Overview

The Achievements Academy follows a component-based architecture with clear separation of concerns, focusing on maintainability, scalability, and developer experience.

## 🏗️ System Architecture

### Core Principles

1. **Component-First Design** - UI is built from reusable, composable components
2. **Data-Driven State** - Application state flows from data layer through contexts
3. **Type Safety** - Full TypeScript coverage for better developer experience
4. **Progressive Enhancement** - Core functionality works without JavaScript
5. **Performance by Default** - Lazy loading, code splitting, and efficient data fetching

### Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  Components, Pages, UI Logic, User Interactions           │
├─────────────────────────────────────────────────────────────┤
│                    State Management                        │
│  Contexts, Hooks, Local State, Navigation State          │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                              │
│  Lesson Loaders, Progress Tracking, Authentication        │
├─────────────────────────────────────────────────────────────┤
│                    External Services                       │
│  Supabase Database, File Storage, Real-time Updates       │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.tsx   # Main dashboard interface
│   ├── LessonPage.tsx  # Lesson display and interaction
│   └── modals/         # Modal components
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme management
├── data/              # Data layer and business logic
│   ├── lessons.ts     # Lesson data and loaders
│   └── lessons/       # Topic-based lesson organization
├── hooks/             # Custom React hooks
│   ├── useAuth.ts     # Authentication utilities
│   └── useProgress.ts # Progress tracking
├── services/          # External service integrations
│   └── supabase.ts    # Database client
├── types/             # TypeScript type definitions
├── styles/            # Theme and styling
└── lib/               # Utility functions
```

## 🔄 Data Flow

### 1. Lesson Loading Flow
```
User selects subject/year → getAllLessonsBySubjectAndYear() → 
Filter lessons by year → Display in YearPage component
```

### 2. Progress Tracking Flow
```
User completes lesson → Progress hook updates → 
Supabase database → Real-time sync across devices
```

### 3. Authentication Flow
```
User signs in → AuthContext updates → 
Role-based routing → Teacher/Student dashboard
```

## 🎯 Key Design Decisions

### 1. **Subject-Based Lesson Organization**
- Lessons are organized by subject (mathematics, english) and year
- Each subject has its own lesson structure and exam questions
- Easy to add new subjects without changing existing code

### 2. **Context-Based State Management**
- Authentication state managed by AuthContext
- Theme preferences managed by ThemeContext
- Navigation state managed locally in App component
- Progress state managed by custom hooks

### 3. **Component Composition**
- Small, focused components with single responsibilities
- Props-based communication between components
- Modal components for complex interactions
- Consistent component interfaces

### 4. **Type Safety**
- Comprehensive TypeScript coverage
- Strict type checking for all data structures
- Interface-first design for components
- Type-safe API interactions

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build Configuration
- Vite for fast development and optimized builds
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality

## 📈 Scalability Considerations

### Adding New Subjects
1. Add subject to `subjects` array in `lessons.ts`
2. Create lesson data structure
3. Add exam question creators
4. Update `getAllLessonsBySubjectAndYear` function

### Adding New Features
1. Create component in appropriate directory
2. Add to navigation state if needed
3. Update types if data structures change
4. Add tests for new functionality

### Performance Optimization
1. Lazy load components and routes
2. Implement virtual scrolling for large lists
3. Cache frequently accessed data
4. Optimize bundle size with code splitting

## 🔗 Related Documentation

- [Data Layer](./data-layer.md) - Detailed data management patterns
- [State Management](./state-management.md) - Context and hook patterns
- [Component Architecture](./components.md) - Component design patterns
- [Authentication & Authorization](./auth.md) - Security and user management 