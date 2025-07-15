import { supabase } from '../lib/supabase';
import { StudentProgressSummary } from '../types';
import mockStudents from '../mocks/students';
import { studentQueryService } from './studentQueryService';
import { studentDataService } from './studentDataService';

export interface StudentConnection {
  id: string;
  teacherId: string;
  studentId: string;
  relationship: 'teacher' | 'parent' | 'tutor' | 'guardian';
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  acceptedAt?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export const teacherService = {
  // Get all students connected to a teacher
  async getConnectedStudents(teacherId: string): Promise<StudentProgressSummary[]> {
    // Check if we should use mock data
    const useMockData = import.meta.env.VITE_USE_MOCK_STUDENTS === 'true';
    
    if (useMockData) {
      // Return mock data instead of fetching from Supabase
      return mockStudents;
    }

    try {
      // Use the new services to fetch and process data
      const studentData = await studentQueryService.getConnectedStudents(teacherId);
      return studentDataService.processStudentData(studentData);
    } catch (error) {
      console.error('Error fetching connected students:', error);
      throw error;
    }
  },

  // Send connection request to a student
  async sendConnectionRequest(
    teacherId: string, 
    studentId: string, 
    relationship: 'teacher' | 'parent' | 'tutor' | 'guardian' = 'teacher'
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('student_connections')
        .insert({
          teacher_id: teacherId,
          student_id: studentId,
          relationship,
          status: 'pending'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending connection request:', error);
      throw error;
    }
  },

  // Get pending connection requests for a teacher
  async getPendingConnections(teacherId: string): Promise<StudentConnection[]> {
    try {
      const { data, error } = await supabase
        .from('student_connections')
        .select('*')
        .eq('teacher_id', teacherId)
        .eq('status', 'pending');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching pending connections:', error);
      throw error;
    }
  },

  // Accept a connection request (called by student)
  async acceptConnection(connectionId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('student_connections')
        .update({
          status: 'accepted',
          accepted_at: new Date().toISOString()
        })
        .eq('id', connectionId);

      if (error) throw error;
    } catch (error) {
      console.error('Error accepting connection:', error);
      throw error;
    }
  },

  // Decline a connection request (called by student)
  async declineConnection(connectionId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('student_connections')
        .update({
          status: 'declined'
        })
        .eq('id', connectionId);

      if (error) throw error;
    } catch (error) {
      console.error('Error declining connection:', error);
      throw error;
    }
  },

  // Remove a connection
  async removeConnection(connectionId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('student_connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing connection:', error);
      throw error;
    }
  }
}; 