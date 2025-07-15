# Data Layer Architecture

The data layer is responsible for managing lesson content, user progress, and exam data. It follows a modular approach with clear separation between data structure, loading logic, and business rules.

## 📊 Data Structure

### Core Types

```typescript
interface Lesson {
  id: string;           // Unique identifier (e.g., 'math-y3-l1')
  title: string;        // Display title
  description: string;  // Lesson description
  content: LessonContent[]; // Interactive content
  duration: number;     // Estimated time in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;  // User progress tracking
}

interface LessonContent {
  type: 'text' | 'question' | 'exercise' | 'video' | 'interactive';
  content: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
}

interface Subject {
  id: string;           // 'mathematics' | 'english'
  name: string;         // Display name
  color: string;        // Tailwind color class
  icon: string;         // Icon component name
  description: string;  // Subject description
}
```

### Lesson Organization

Lessons are organized by subject and year level:

```
lessons/
├── arithmetic.ts           # Basic math operations
├── multiplicationDivision.ts # Times tables and division
├── fractions.ts           # Fraction concepts
├── geometry.ts            # Shapes and measurements
├── decimalsPercentages.ts # Decimal and percentage math
├── ratiosProportions.ts   # Ratio and proportion concepts
├── algebra.ts             # Algebraic expressions
├── linearEquations.ts     # Solving equations
├── quadratics.ts          # Quadratic functions
├── trigonometry.ts        # Trigonometry concepts
└── calculus.ts            # Advanced calculus topics
```

## 🔄 Data Loading Patterns

### 1. Subject-Based Loading

```typescript
// Load all lessons for a specific subject and year
export const getAllLessonsBySubjectAndYear = (
  subject: string, 
  year: number
): Lesson[] => {
  if (subject === 'mathematics') {
    const yearPattern = new RegExp(`-y${year}-l`);
    return allMathLessons.filter(lesson => yearPattern.test(lesson.id));
  } else if (subject === 'english') {
    return createEnglishLessons(year);
  }
  return [];
};
```

### 2. Lesson ID Pattern

Lesson IDs follow a consistent pattern:
- `math-y3-l1` = Mathematics, Year 3, Lesson 1
- `eng-y2-l2` = English, Year 2, Lesson 2

This pattern enables:
- Easy filtering by year
- Consistent lesson ordering
- Clear subject identification

### 3. Exam Question Loading

```typescript
// Load exam questions for a specific subject and year
const currentYearData = {
  year: navigationState.currentYear,
  lessons: currentLessons,
  examQuestions: navigationState.currentSubject === 'mathematics'
    ? createMathExamQuestions(navigationState.currentYear)
    : navigationState.currentSubject === 'english'
      ? createEnglishExamQuestions(navigationState.currentYear)
      : [],
  progress: 0
};
```

## 📚 Lesson Content Structure

### Content Types

1. **Text Content** - Explanatory text and instructions
2. **Interactive Content** - Hands-on learning activities
3. **Question Content** - Multiple choice and assessment questions
4. **Exercise Content** - Practice problems and activities
5. **Video Content** - Multimedia learning resources

### Example Lesson Structure

```typescript
{
  id: 'math-y3-l1',
  title: 'Multiplication Tables',
  description: 'Learning the 2, 5, and 10 times tables',
  duration: 45,
  difficulty: 'beginner',
  content: [
    {
      type: 'text',
      content: 'Multiplication is repeated addition...'
    },
    {
      type: 'question',
      content: 'What is 5 × 6?',
      options: ['25', '30', '35', '40'],
      correctAnswer: '30',
      explanation: '5 × 6 means 5 added six times...'
    }
  ]
}
```

## 🎯 Design Decisions

### 1. **Topic-Based Organization**
- Lessons are grouped by mathematical topics rather than year-specific content
- This allows for flexible curriculum adaptation
- Easy to reuse lessons across different year levels

### 2. **Year-Based Filtering**
- Lessons are filtered by year using ID patterns
- Maintains curriculum progression while allowing topic flexibility
- Clear separation between lesson content and year-level organization

### 3. **Subject Independence**
- Each subject has its own lesson structure and loading logic
- Easy to add new subjects without affecting existing ones
- Consistent interface across different subjects

### 4. **Content Flexibility**
- Rich content structure supports various learning activities
- Easy to add new content types
- Supports multimedia and interactive learning

## 🔧 Implementation Patterns

### Adding New Subjects

1. **Define Subject**
```typescript
export const subjects: Subject[] = [
  // ... existing subjects
  {
    id: 'science',
    name: 'Science',
    color: 'bg-green-500',
    icon: 'Flask',
    description: 'Scientific exploration and discovery'
  }
];
```

2. **Create Lesson Loader**
```typescript
const createScienceLessons = (year: number): Lesson[] => {
  // Implement science lesson logic
};

export const getAllLessonsBySubjectAndYear = (
  subject: string, 
  year: number
): Lesson[] => {
  // ... existing logic
  if (subject === 'science') {
    return createScienceLessons(year);
  }
  return [];
};
```

3. **Add Exam Questions**
```typescript
const createScienceExamQuestions = (year: number): ExamQuestion[] => {
  // Implement science exam questions
};

// Export for use in App.tsx
export { createScienceExamQuestions };
```

### Adding New Content Types

1. **Update Type Definition**
```typescript
interface LessonContent {
  type: 'text' | 'question' | 'exercise' | 'video' | 'interactive' | 'newType';
  // ... existing properties
}
```

2. **Update Component Logic**
```typescript
const renderContent = (content: LessonContent) => {
  switch (content.type) {
    // ... existing cases
    case 'newType':
      return <NewTypeComponent content={content} />;
  }
};
```

## 📈 Performance Considerations

### 1. **Lazy Loading**
- Lessons are loaded only when needed
- Exam questions are generated on-demand
- Reduces initial bundle size

### 2. **Caching Strategy**
- Lesson data is cached in memory
- Progress data is persisted to database
- Reduces redundant API calls

### 3. **Efficient Filtering**
- Year-based filtering uses regex patterns
- No need to load all lessons upfront
- Scales well with large lesson libraries

## 🔗 Related Documentation

- [State Management](./state-management.md) - How data flows through the application
- [Component Architecture](./components.md) - How components consume data
- [Performance](./../performance/data-loading.md) - Data loading optimization 