# Achievements Academy - Developer Documentation

Welcome to the Achievements Academy developer documentation. This documentation is organized by design decisions and architectural patterns to help developers understand the codebase structure and contribute effectively.

## 📚 Documentation Sections

### [🏗️ Architecture](./architecture/README.md)
- [Data Layer](./architecture/data-layer.md) - How lessons, subjects, and progress are managed
- [State Management](./architecture/state-management.md) - Context providers, hooks, and data flow
- [Component Architecture](./architecture/components.md) - Component hierarchy and design patterns
- [Authentication & Authorization](./architecture/auth.md) - User roles, permissions, and security

### [🎨 UI/UX Design](./design/README.md)
- [Theme System](./design/theme-system.md) - Color themes, gradients, and styling
- [Component Design](./design/components.md) - Reusable components and design patterns
- [Responsive Design](./design/responsive.md) - Mobile-first approach and breakpoints
- [Accessibility](./design/accessibility.md) - ARIA labels, keyboard navigation, and inclusive design

### [⚡ Performance](./performance/README.md)
- [Code Splitting](./performance/code-splitting.md) - Lazy loading and bundle optimization
- [Data Loading](./performance/data-loading.md) - Efficient lesson and exam data fetching
- [Caching Strategy](./performance/caching.md) - Progress caching and offline support

### [🧪 Testing](./testing/README.md)
- [Test Strategy](./testing/strategy.md) - Unit, integration, and E2E testing approach
- [Component Testing](./testing/components.md) - Testing React components and hooks
- [Data Testing](./testing/data.md) - Testing lesson loaders and data transformations

### [🚀 Deployment](./deployment/README.md)
- [Build Process](./deployment/build.md) - Vite configuration and optimization
- [Database Setup](./deployment/database.md) - Supabase migrations and schema
- [Environment Configuration](./deployment/environment.md) - Environment variables and secrets

## 🛠️ Quick Start

1. **Setup Development Environment**
   ```bash
   cd src/apps/achievements-academy/project
   npm install
   npm run dev
   ```

2. **Database Setup**
   ```bash
   # Apply Supabase migrations
   npx supabase db push
   ```

3. **Key Files to Understand**
   - `src/App.tsx` - Main application component and routing
   - `src/data/lessons.ts` - Lesson data structure and loaders
   - `src/contexts/AuthContext.tsx` - Authentication and user management
   - `src/components/Dashboard.tsx` - Main dashboard interface

## 📖 Contributing

When contributing to this project:

1. **Read the relevant documentation sections** before making changes
2. **Follow the established patterns** for components, data loading, and state management
3. **Update documentation** when adding new features or changing architecture
4. **Write tests** for new functionality
5. **Consider performance implications** of your changes

## 🔗 Related Documentation

- [User Guide](../READEME.md) - End-user documentation
- [Achievement System](../ACHIEVEMENT_SYSTEM.md) - Achievement mechanics
- [Theme Integration](../THEME_INTEGRATION_GUIDE.md) - Theme customization
- [Database Setup](../REAL_STUDENT_DATA_SETUP.md) - Database configuration

---

*This documentation is maintained alongside the codebase. Please keep it updated when making architectural changes.* 