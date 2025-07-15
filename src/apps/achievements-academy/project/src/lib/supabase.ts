import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string;
          year_level: number;
          lesson_id: string;
          completed: boolean;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id: string;
          year_level: number;
          lesson_id: string;
          completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string;
          year_level?: number;
          lesson_id?: string;
          completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      exam_scores: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string;
          year_level: number;
          score: number;
          total_marks: number;
          percentage: number;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id: string;
          year_level: number;
          score: number;
          total_marks: number;
          percentage: number;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string;
          year_level?: number;
          score?: number;
          total_marks?: number;
          percentage?: number;
          completed_at?: string;
          created_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: 'student' | 'teacher' | 'parent' | 'tutor';
          permissions: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'student' | 'teacher' | 'parent' | 'tutor';
          permissions?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'student' | 'teacher' | 'parent' | 'tutor';
          permissions?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      student_connections: {
        Row: {
          id: string;
          teacher_id: string;
          student_id: string;
          relationship: 'teacher' | 'parent' | 'tutor' | 'guardian';
          status: 'pending' | 'accepted' | 'declined';
          created_at: string;
          accepted_at: string | null;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          student_id: string;
          relationship: 'teacher' | 'parent' | 'tutor' | 'guardian';
          status?: 'pending' | 'accepted' | 'declined';
          created_at?: string;
          accepted_at?: string | null;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          student_id?: string;
          relationship?: 'teacher' | 'parent' | 'tutor' | 'guardian';
          status?: 'pending' | 'accepted' | 'declined';
          created_at?: string;
          accepted_at?: string | null;
        };
      };
    };
  };
};