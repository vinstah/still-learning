import React from 'react';
import { User, GraduationCap, Users, BookOpen } from 'lucide-react';
import { User as UserType } from '../types';

interface RoleToggleProps {
  currentRole: UserType['role'];
  onRoleChange: (role: UserType['role']) => void;
}

export default function RoleToggle({ currentRole, onRoleChange }: RoleToggleProps) {
  const roles = [
    { id: 'Student', icon: User, label: 'Student', color: 'bg-blue-500' },
    { id: 'Individual', icon: BookOpen, label: 'Individual', color: 'bg-green-500' },
    { id: 'Parent', icon: Users, label: 'Parent', color: 'bg-purple-500' },
    { id: 'Teacher', icon: GraduationCap, label: 'Teacher', color: 'bg-orange-500' },
  ] as const;

  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
      {roles.map((role) => {
        const IconComponent = role.icon;
        const isActive = currentRole === role.id;
        
        return (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
              isActive
                ? `${role.color} text-white shadow-md`
                : 'text-gray-600 hover:bg-white hover:shadow-sm'
            }`}
          >
            <IconComponent className="h-4 w-4" />
            <span className="hidden sm:inline">{role.label}</span>
          </button>
        );
      })}
    </div>
  );
}