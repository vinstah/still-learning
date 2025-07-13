import React from 'react';
import { Users, Settings } from 'lucide-react';

interface RoleToggleProps {
  currentRole: 'manager' | 'learner';
  onRoleChange: (role: 'manager' | 'learner') => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onRoleChange('learner')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentRole === 'learner'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Users className="h-4 w-4" />
        <span className="hidden sm:inline">Learner</span>
      </button>
      <button
        onClick={() => onRoleChange('manager')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentRole === 'manager'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">Manager</span>
      </button>
    </div>
  );
};

export default RoleToggle;