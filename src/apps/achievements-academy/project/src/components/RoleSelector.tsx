import React, { useState } from 'react';
import { Users, GraduationCap, Heart, BookOpen, X } from 'lucide-react';
import { useRoles } from '../hooks/useRoles';

interface RoleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ isOpen, onClose }) => {
  const { setUserRole } = useRoles();
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'student' as const,
      name: 'Student',
      description: 'I want to learn and take lessons',
      icon: GraduationCap,
      color: 'bg-blue-500',
      features: ['Take interactive lessons', 'Complete exams', 'Track progress', 'Earn achievements']
    },
    {
      id: 'teacher' as const,
      name: 'Teacher',
      description: 'I want to monitor and help students',
      icon: Users,
      color: 'bg-purple-500',
      features: ['Monitor student progress', 'Create custom questions', 'Generate AI questions', 'Manage assignments']
    },
    {
      id: 'parent' as const,
      name: 'Parent/Guardian',
      description: 'I want to track my child\'s progress',
      icon: Heart,
      color: 'bg-green-500',
      features: ['View child progress', 'Communicate with teachers', 'Support learning', 'Track achievements']
    },
    {
      id: 'tutor' as const,
      name: 'Tutor',
      description: 'I provide personalized learning support',
      icon: BookOpen,
      color: 'bg-orange-500',
      features: ['Create custom lessons', 'Generate practice questions', 'Track student progress', 'Provide feedback']
    }
  ];

  const handleRoleSelect = async (roleId: 'student' | 'teacher' | 'parent' | 'tutor') => {
    setLoading(true);
    try {
      await setUserRole(roleId);
      onClose();
    } catch (error) {
      console.error('Error setting role:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-4xl max-h-[90vh] border-2 sm:border-4 border-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-8 border-b-2 sm:border-b-4 border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-3xl font-bold text-gray-900">Choose Your Role</h2>
            <p className="text-gray-600 text-sm sm:text-base">Select how you'll be using the learning platform</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Role Options */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {roles.map((role) => {
              const IconComponent = role.icon;
              
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  disabled={loading}
                  className="text-left p-4 sm:p-6 border-2 sm:border-4 border-gray-200 rounded-xl sm:rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <div className={`${role.color} p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900">{role.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{role.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <h4 className="font-medium text-gray-900 text-xs sm:text-sm">What you can do:</h4>
                    <ul className="space-y-1">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 sm:p-8 border-t-2 sm:border-t-4 border-gray-200">
          <div className="bg-blue-50 border border-blue-200 sm:border-2 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <p className="text-blue-800 text-xs sm:text-sm">
              <span className="font-medium">Note:</span> You can change your role later in your account settings. 
              Choose the role that best describes how you'll primarily use the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;