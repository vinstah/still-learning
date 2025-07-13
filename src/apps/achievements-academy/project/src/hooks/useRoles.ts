import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

export const useRoles = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setUserRole(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      if (data) {
        setUserRole({
          id: data.id,
          userId: data.user_id,
          role: data.role,
          permissions: data.permissions || [],
          createdAt: data.created_at,
        });
      } else {
        // Default to student role if no role is set
        await updateUserRole('student');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (role: 'student' | 'teacher' | 'parent' | 'tutor') => {
    if (!user) return;

    const permissions = getDefaultPermissions(role);

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .upsert([
          {
            user_id: user.id,
            role,
            permissions,
            updated_at: new Date().toISOString(),
          },
        ], {
          onConflict: 'user_id',
        })
        .select()
        .single();

      if (error) throw error;

      setUserRole({
        id: data.id,
        userId: data.user_id,
        role: data.role,
        permissions: data.permissions || [],
        createdAt: data.created_at,
      });
    } catch (error) {
      console.error('Error setting user role:', error);
    }
  };

  const getDefaultPermissions = (role: string): string[] => {
    switch (role) {
      case 'student':
        return ['view_lessons', 'take_exams', 'view_progress'];
      case 'teacher':
        return [
          'view_lessons', 'edit_lessons', 'create_questions', 'view_student_progress',
          'manage_students', 'create_assignments'
        ];
      case 'parent':
        return ['view_child_progress', 'view_lessons', 'communicate_teacher'];
      case 'tutor':
        return [
          'view_lessons', 'edit_lessons', 'create_questions', 'view_student_progress',
          'create_assignments'
        ];
      default:
        return ['view_lessons'];
    }
  };

  const hasPermission = (permission: string): boolean => {
    return userRole?.permissions.includes(permission) || false;
  };

  const isRole = (role: string): boolean => {
    return userRole?.role === role;
  };

  return {
    userRole,
    loading,
    setUserRole: updateUserRole,
    hasPermission,
    isRole,
    refetch: fetchUserRole,
  };
};