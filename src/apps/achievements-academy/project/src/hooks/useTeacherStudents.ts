import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { StudentProgressSummary } from '../types';
import mockStudents from '../mocks/students';
import { studentQueryService } from '../services/studentQueryService';
import { studentDataService } from '../services/studentDataService';

export const useTeacherStudents = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<StudentProgressSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchTeacherStudents();
    } else {
      setStudents([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTeacherStudents = async () => {
    if (!user) return;

    const useMockData = import.meta.env.VITE_USE_MOCK_STUDENTS === 'true';
    if (useMockData) {
      setLoading(true);
      setTimeout(() => {
        setStudents(mockStudents);
        setLoading(false);
        setError(null);
      }, 500);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Use the new services to fetch and process data
      const studentData = await studentQueryService.getConnectedStudents(user.id);
      const studentSummaries = studentDataService.processStudentData(studentData);
      
      setStudents(studentSummaries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchTeacherStudents();
  };

  return {
    students,
    loading,
    error,
    refetch
  };
}; 