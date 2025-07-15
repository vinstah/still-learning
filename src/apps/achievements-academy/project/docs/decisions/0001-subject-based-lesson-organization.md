# [ADR-0001] Subject-Based Lesson Organization

## Status

Accepted

## Context

The application needs to support multiple subjects (mathematics, english, etc.) with different lesson structures and content types. We need a flexible system that allows:

- Easy addition of new subjects
- Consistent lesson loading patterns
- Subject-specific content organization
- Year-based curriculum progression

## Decision

We will organize lessons by subject and year using a modular approach:

1. **Subject-Based Structure**: Each subject has its own lesson organization and loading logic
2. **Year-Based Filtering**: Lessons are filtered by year using ID patterns (e.g., `math-y3-l1`)
3. **Topic-Based Content**: Mathematics lessons are organized by mathematical topics rather than year-specific content
4. **Consistent Interface**: All subjects use the same `getAllLessonsBySubjectAndYear(subject, year)` interface

## Consequences

### Positive

- **Easy to add new subjects**: Just add subject definition and lesson loader
- **Flexible curriculum**: Topics can be reused across different year levels
- **Consistent interface**: All subjects use the same loading pattern
- **Type safety**: Full TypeScript support for all lesson structures
- **Scalable**: System handles large lesson libraries efficiently

### Negative

- **Subject-specific logic**: Each subject may need custom lesson creation logic
- **ID pattern dependency**: Relies on consistent lesson ID patterns
- **Initial complexity**: More complex than a simple array-based approach

## Implementation Notes

- Lesson IDs follow pattern: `{subject}-y{year}-l{lesson}`
- Mathematics uses topic-based organization with year filtering
- English uses year-specific lesson creation
- All subjects must implement the same lesson interface
- Exam questions are subject-specific and year-based

## References

- [Data Layer Architecture](../architecture/data-layer.md)
- [Lesson Loading Patterns](../architecture/data-layer.md#data-loading-patterns) 