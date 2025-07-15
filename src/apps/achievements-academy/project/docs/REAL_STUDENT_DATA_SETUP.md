# Real Student Data Setup Guide

This guide explains how to get real student data instead of using mock data in the Teacher Dashboard.

## Overview

The Teacher Dashboard now supports real student data from your Supabase database. Here's how the system works:

### Database Tables Used

1. **`user_roles`** - Identifies teachers and students
2. **`student_connections`** - Links teachers with their students
3. **`user_profiles`** - Stores student names and information
4. **`user_progress`** - Tracks lesson completion
5. **`exam_scores`** - Stores exam results

### Data Flow

1. Teachers connect with students through connection requests
2. Students accept connection requests
3. Teacher dashboard fetches real progress data for connected students
4. Progress is calculated from actual lesson completions and exam scores

## Setup Steps

### 1. Database Setup

Make sure your Supabase database has all the required tables. Run these migrations:

```sql
-- Migration 1: User roles and connections
-- File: supabase/migrations/20250629090345_amber_peak.sql

-- Migration 2: Progress and exam scores
-- File: supabase/migrations/20250629094125_pink_oasis.sql
```

### 2. User Registration and Role Assignment

#### For Teachers:
1. Register as a new user
2. Set role to 'teacher' using the role selector
3. Complete profile setup

#### For Students:
1. Register as a new user
2. Set role to 'student' (default)
3. Complete profile setup with full name

### 3. Connecting Teachers and Students

#### Option A: Using the Add Student Modal
1. Teacher clicks "Add Student" button in dashboard
2. Searches for student by name or email
3. Sends connection request
4. Student receives notification and accepts

#### Option B: Direct Database Connection
```sql
-- Insert a connection request
INSERT INTO student_connections (
  teacher_id, 
  student_id, 
  relationship, 
  status
) VALUES (
  'teacher-user-id', 
  'student-user-id', 
  'teacher', 
  'accepted'
);
```

### 4. Student Activity

For real data to appear, students need to:
1. Complete lessons (creates records in `user_progress`)
2. Take exams (creates records in `exam_scores`)

## Code Implementation

### New Components Created

1. **`useTeacherStudents` Hook** (`src/hooks/useTeacherStudents.ts`)
   - Fetches real student data for teachers
   - Handles loading and error states
   - Aggregates progress data

2. **`teacherService`** (`src/services/teacherService.ts`)
   - Manages student connections
   - Handles connection requests
   - Provides data aggregation functions

3. **`AddStudentModal`** (`src/components/AddStudentModal.tsx`)
   - UI for adding students
   - Search functionality
   - Connection request handling

### Updated Components

1. **`TeacherDashboard`** (`src/components/TeacherDashboard.tsx`)
   - Now uses real data instead of mock data
   - Includes loading and error states
   - Has "Add Student" functionality

## Data Structure

### Student Progress Summary
```typescript
interface StudentProgressSummary {
  studentId: string;
  studentName: string;
  studentEmail: string;
  totalLessonsCompleted: number;
  totalExamsTaken: number;
  averageExamScore: number;
  lastActivity: string;
  subjectProgress: {
    [subjectId: string]: {
      lessonsCompleted: number;
      totalLessons: number;
      averageScore: number;
      lastActivity: string;
    };
  };
}
```

### Database Queries

The system performs these queries to build student data:

1. **Get Connected Students**
```sql
SELECT student_id FROM student_connections 
WHERE teacher_id = ? AND status = 'accepted'
```

2. **Get Student Profiles**
```sql
SELECT * FROM user_profiles 
WHERE user_id IN (student_ids)
```

3. **Get Progress Data**
```sql
SELECT * FROM user_progress 
WHERE user_id IN (student_ids)
```

4. **Get Exam Scores**
```sql
SELECT * FROM exam_scores 
WHERE user_id IN (student_ids)
```

## Testing Real Data

### 1. Create Test Students
```sql
-- Create test student profiles
INSERT INTO user_profiles (user_id, full_name) VALUES
('student-1', 'Emma Johnson'),
('student-2', 'Liam Smith'),
('student-3', 'Sophia Davis');
```

### 2. Create Test Progress
```sql
-- Add some completed lessons
INSERT INTO user_progress (user_id, subject_id, year_level, lesson_id, completed, completed_at) VALUES
('student-1', 'mathematics', 1, 'math-lesson-1', true, NOW()),
('student-1', 'mathematics', 1, 'math-lesson-2', true, NOW()),
('student-2', 'english', 1, 'english-lesson-1', true, NOW());
```

### 3. Create Test Exam Scores
```sql
-- Add some exam scores
INSERT INTO exam_scores (user_id, subject_id, year_level, score, total_marks, percentage) VALUES
('student-1', 'mathematics', 1, 85, 100, 85),
('student-2', 'english', 1, 92, 100, 92);
```

## Troubleshooting

### Common Issues

1. **No students showing up**
   - Check if teacher has accepted connections
   - Verify student_connections table has correct data
   - Ensure students have completed some activities

2. **Loading state stuck**
   - Check browser console for errors
   - Verify Supabase connection
   - Check RLS policies

3. **Permission errors**
   - Ensure RLS policies are correctly set
   - Verify user authentication
   - Check user roles are properly assigned

### Debug Queries

```sql
-- Check teacher's connections
SELECT * FROM student_connections WHERE teacher_id = 'your-teacher-id';

-- Check student progress
SELECT * FROM user_progress WHERE user_id = 'student-id';

-- Check exam scores
SELECT * FROM exam_scores WHERE user_id = 'student-id';
```

## Performance Considerations

1. **Indexing**: Ensure proper indexes on frequently queried columns
2. **Pagination**: For large student lists, implement pagination
3. **Caching**: Consider caching student data for better performance
4. **Real-time updates**: Use Supabase real-time subscriptions for live updates

## Security

1. **Row Level Security (RLS)**: All tables have RLS enabled
2. **User isolation**: Users can only access their own data
3. **Connection validation**: Only accepted connections are shown
4. **Input validation**: All user inputs are validated

## Next Steps

1. **Real-time updates**: Implement live updates when students complete activities
2. **Advanced filtering**: Add more filter options (date ranges, subject-specific)
3. **Export functionality**: Allow teachers to export student data
4. **Bulk operations**: Support bulk actions on multiple students
5. **Analytics**: Add detailed analytics and reporting features

## Environment Variables

Make sure these are set in your `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Mock Data Mode

For development and testing, you can use mock student data instead of real database connections:

```
VITE_USE_MOCK_STUDENTS=true
```

When `VITE_USE_MOCK_STUDENTS=true`:
- The Teacher Dashboard will use mock data from `src/mocks/students.ts`
- No Supabase connections will be made
- The "Add Student" modal will work in mock mode
- Perfect for development without database setup

When `VITE_USE_MOCK_STUDENTS=false` (default):
- Real data will be fetched from Supabase
- All database operations will work normally
- Use this for production or when you have real student data

This setup provides a complete real-time student data system for the Teacher Dashboard! 