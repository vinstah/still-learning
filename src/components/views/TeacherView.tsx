import React from 'react';
import { TeacherDashboard } from '../TeacherDashboard';
import { StudentRecord } from '../../types/student';

interface TeacherViewProps {
  students: StudentRecord[];
  isDark: boolean;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  students,
  isDark
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <TeacherDashboard students={students} isDark={isDark} />
    </div>
  );
};