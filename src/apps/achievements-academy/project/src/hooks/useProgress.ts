import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface UserProgress {
  lessonId: string;
  subjectId: string;
  yearLevel: number;
  completed: boolean;
  completedAt: string | null;
}

export interface ExamScore {
  subjectId: string;
  yearLevel: number;
  score: number;
  totalMarks: number;
  percentage: number;
  completedAt: string;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [examScores, setExamScores] = useState<ExamScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
      fetchExamScores();
    } else {
      setProgress([]);
      setExamScores([]);
      setLoading(false);
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedProgress: UserProgress[] = data.map(item => ({
        lessonId: item.lesson_id,
        subjectId: item.subject_id,
        yearLevel: item.year_level,
        completed: item.completed,
        completedAt: item.completed_at,
      }));

      setProgress(formattedProgress);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const fetchExamScores = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('exam_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      const formattedScores: ExamScore[] = data.map(item => ({
        subjectId: item.subject_id,
        yearLevel: item.year_level,
        score: item.score,
        totalMarks: item.total_marks,
        percentage: item.percentage,
        completedAt: item.completed_at,
      }));

      setExamScores(formattedScores);
    } catch (error) {
      console.error('Error fetching exam scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string, subjectId: string, yearLevel: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert([
          {
            user_id: user.id,
            lesson_id: lessonId,
            subject_id: subjectId,
            year_level: yearLevel,
            completed: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ], {
          onConflict: 'user_id,lesson_id',
        });

      if (error) throw error;

      // Update local state
      setProgress(prev => {
        const existing = prev.find(p => p.lessonId === lessonId);
        if (existing) {
          return prev.map(p =>
            p.lessonId === lessonId
              ? { ...p, completed: true, completedAt: new Date().toISOString() }
              : p
          );
        } else {
          return [
            ...prev,
            {
              lessonId,
              subjectId,
              yearLevel,
              completed: true,
              completedAt: new Date().toISOString(),
            },
          ];
        }
      });
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const saveExamScore = async (
    subjectId: string,
    yearLevel: number,
    score: number,
    totalMarks: number
  ) => {
    if (!user) return;

    const percentage = Math.round((score / totalMarks) * 100);

    try {
      const { error } = await supabase
        .from('exam_scores')
        .insert([
          {
            user_id: user.id,
            subject_id: subjectId,
            year_level: yearLevel,
            score,
            total_marks: totalMarks,
            percentage,
            completed_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      // Update local state
      const newScore: ExamScore = {
        subjectId,
        yearLevel,
        score,
        totalMarks,
        percentage,
        completedAt: new Date().toISOString(),
      };

      setExamScores(prev => [newScore, ...prev]);
    } catch (error) {
      console.error('Error saving exam score:', error);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(p => p.lessonId === lessonId && p.completed);
  };

  const getSubjectProgress = (subjectId: string, yearLevel: number) => {
    const subjectProgress = progress.filter(
      p => p.subjectId === subjectId && p.yearLevel === yearLevel && p.completed
    );
    return subjectProgress.length;
  };

  const getExamScore = (subjectId: string, yearLevel: number) => {
    return examScores.find(s => s.subjectId === subjectId && s.yearLevel === yearLevel);
  };

  return {
    progress,
    examScores,
    loading,
    markLessonComplete,
    saveExamScore,
    isLessonCompleted,
    getSubjectProgress,
    getExamScore,
    refetch: () => {
      fetchProgress();
      fetchExamScores();
    },
  };
};