import React from 'react';
import { FamilyDashboard } from '../FamilyDashboard';
import { StudentRecord } from '../../types/student';

interface DashboardViewProps {
  students: StudentRecord[];
  isDark: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  isDark
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <FamilyDashboard students={students} isDark={isDark} />
    </div>
  );
};