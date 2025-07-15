import { StudentProgressSummary } from '../types';
import { StudentData } from '../types/student';

export const studentDataService = {
  /**
   * Map a single StudentData object to StudentProgressSummary
   */
  mapStudentDataToSummary(student: StudentData): StudentProgressSummary {
    const { studentId, profile, progress, exams } = student;
    const subjectProgress = this.calculateSubjectProgress(progress, exams);
    const overallStats = this.calculateOverallStats(progress, exams);
    const lastActivity = this.calculateLastActivity(progress, exams);
    const studentName = profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : 'Unknown Student';
    return {
      studentId,
      studentName,
      studentEmail: profile?.email || '',
      ...overallStats,
      lastActivity,
      subjectProgress
    };
  },

  /**
   * Process raw student data into progress summaries
   */
  processStudentData(studentData: StudentData[]): StudentProgressSummary[] {
    return studentData.map(student => this.mapStudentDataToSummary(student));
  },

  /**
   * Calculate subject-specific progress
   */
  calculateSubjectProgress(progress: any[], exams: any[]) {
    const subjectProgress: { [key: string]: any } = {};
    const subjects = ['mathematics', 'english'];

    subjects.forEach(subjectId => {
      const subjectLessons = progress.filter(p => p.subject_id === subjectId);
      const subjectExams = exams.filter(e => e.subject_id === subjectId);

      const lessonsCompleted = subjectLessons.filter(l => l.completed).length;
      const totalLessons = subjectLessons.length || 13;
      const averageScore = subjectExams.length > 0 
        ? Math.round(subjectExams.reduce((sum, exam) => sum + exam.percentage, 0) / subjectExams.length)
        : 0;

      const lastActivity = subjectLessons.length > 0 
        ? subjectLessons.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]?.updated_at
        : null;

      subjectProgress[subjectId] = {
        lessonsCompleted,
        totalLessons,
        averageScore,
        lastActivity: lastActivity || new Date().toISOString()
      };
    });

    return subjectProgress;
  },

  /**
   * Calculate overall statistics
   */
  calculateOverallStats(progress: any[], exams: any[]) {
    const totalLessonsCompleted = progress.filter(p => p.completed).length;
    const totalExamsTaken = exams.length;
    const averageExamScore = totalExamsTaken > 0 
      ? Math.round(exams.reduce((sum, exam) => sum + exam.percentage, 0) / totalExamsTaken)
      : 0;

    return {
      totalLessonsCompleted,
      totalExamsTaken,
      averageExamScore
    };
  },

  /**
   * Calculate the most recent activity timestamp
   */
  calculateLastActivity(progress: any[], exams: any[]) {
    const allActivities = [
      ...progress.map(p => p.updated_at),
      ...exams.map(e => e.completed_at)
    ].filter(Boolean);

    return allActivities.length > 0
      ? allActivities.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
      : new Date().toISOString();
  }
}; 