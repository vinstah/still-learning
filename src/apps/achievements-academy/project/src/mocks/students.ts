import { StudentProgressSummary } from "../types";

  // Mock student data - in real app, this would come from the database
 
const mockStudents: StudentProgressSummary[] = [
      {
        studentId: '1',
        studentName: 'Emma Johnson',
        studentEmail: 'emma.j@email.com',
        totalLessonsCompleted: 15,
        totalExamsTaken: 3,
        averageExamScore: 85,
        lastActivity: '2024-01-15T10:30:00Z',
        subjectProgress: {
          mathematics: {
            lessonsCompleted: 8,
            totalLessons: 13,
            averageScore: 82,
            lastActivity: '2024-01-15T10:30:00Z'
          },
          english: {
            lessonsCompleted: 7,
            totalLessons: 13,
            averageScore: 88,
            lastActivity: '2024-01-14T14:20:00Z'
          }
        }
      },
      {
        studentId: '2',
        studentName: 'Liam Smith',
        studentEmail: 'liam.s@email.com',
        totalLessonsCompleted: 12,
        totalExamsTaken: 2,
        averageExamScore: 78,
        lastActivity: '2024-01-14T16:45:00Z',
        subjectProgress: {
          mathematics: {
            lessonsCompleted: 6,
            totalLessons: 13,
            averageScore: 75,
            lastActivity: '2024-01-14T16:45:00Z'
          },
          english: {
            lessonsCompleted: 6,
            totalLessons: 13,
            averageScore: 81,
            lastActivity: '2024-01-13T11:15:00Z'
          }
        }
      },
      {
        studentId: '3',
        studentName: 'Sophia Davis',
        studentEmail: 'sophia.d@email.com',
        totalLessonsCompleted: 20,
        totalExamsTaken: 4,
        averageExamScore: 92,
        lastActivity: '2024-01-15T09:15:00Z',
        subjectProgress: {
          mathematics: {
            lessonsCompleted: 11,
            totalLessons: 13,
            averageScore: 90,
            lastActivity: '2024-01-15T09:15:00Z'
          },
          english: {
            lessonsCompleted: 9,
            totalLessons: 13,
            averageScore: 94,
            lastActivity: '2024-01-14T13:30:00Z'
          }
        }
      }
    ];

export default mockStudents;
