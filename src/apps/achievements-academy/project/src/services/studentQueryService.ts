import { supabase } from '../lib/supabase';
import { StudentData } from '../types/student';

export const studentQueryService = {
  /**
   * Get all students connected to a teacher
   */
  async getConnectedStudents(teacherId: string): Promise<StudentData[]> {
    // Get all accepted connections (simplified query without join)
    const { data: connections, error: connectionsError } = await supabase
      .from('student_connections')
      .select('student_id, status')
      .eq('teacher_id', teacherId)
      .eq('status', 'accepted');

    if (connectionsError) throw connectionsError;

    if (!connections || connections.length === 0) {
      return [];
    }

    const studentIds = connections.map(conn => conn.student_id);

    // Get all related data in parallel
    const [profiles, progress, exams] = await Promise.all([
      this.getStudentProfiles(studentIds),
      this.getStudentProgress(studentIds),
      this.getStudentExams(studentIds)
    ]);

    // Combine the data
    return studentIds.map(studentId => ({
      studentId,
      profile: profiles.find(p => p.user_id === studentId),
      progress: progress.filter(p => p.user_id === studentId),
      exams: exams.filter(e => e.user_id === studentId)
    }));
  },

  /**
   * Get student profiles
   */
  async getStudentProfiles(studentIds: string[]) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .in('user_id', studentIds);

    if (error) throw error;
    return data || [];
  },

  /**
   * Get student progress data
   */
  async getStudentProgress(studentIds: string[]) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .in('user_id', studentIds);

    if (error) throw error;
    return data || [];
  },

  /**
   * Get student exam scores
   */
  async getStudentExams(studentIds: string[]) {
    const { data, error } = await supabase
      .from('exam_scores')
      .select('*')
      .in('user_id', studentIds);

    if (error) throw error;
    return data || [];
  }
}; 