# [ADR-0002] Context-Based State Management

## Status

Accepted

## Context

The application needs to manage various types of state across components:
- User authentication and roles
- Theme preferences and styling
- Navigation state and routing
- Progress tracking and lesson completion
- Real-time data synchronization

We need a state management solution that:
- Provides global access to shared state
- Supports real-time updates
- Maintains type safety
- Scales with application complexity
- Integrates well with React patterns

## Decision

We will use React Context API for global state management with custom hooks for specific concerns:

1. **AuthContext**: Manages user authentication, roles, and permissions
2. **ThemeContext**: Handles theme switching and styling preferences
3. **Local State**: Navigation and UI state managed in App component
4. **Custom Hooks**: Progress tracking and data fetching logic

## Consequences

### Positive

- **Type Safety**: Full TypeScript support with strict typing
- **React Integration**: Native React patterns, no external dependencies
- **Developer Experience**: Familiar Context API, easy to understand
- **Performance**: Context optimization with useMemo and useCallback
- **Testing**: Easy to mock and test individual contexts
- **Scalability**: Can add new contexts without affecting existing ones

### Negative

- **Context Nesting**: Deep component trees may have multiple context providers
- **Re-renders**: Context changes can cause unnecessary re-renders if not optimized
- **Complexity**: Multiple contexts can make component tree complex
- **Debugging**: Context values can be harder to debug than Redux DevTools

## Implementation Notes

- All contexts are wrapped in a single provider hierarchy in App.tsx
- Custom hooks provide type-safe access to context values
- Context values are memoized to prevent unnecessary re-renders
- Error boundaries handle context usage outside providers
- Progress tracking uses custom hooks for data fetching and caching

## References

- [State Management Architecture](../architecture/state-management.md)
- [Authentication & Authorization](../architecture/auth.md)
- [React Context API Documentation](https://react.dev/reference/react/createContext) 