import React from 'react';
import { Award, Download, Share2 } from 'lucide-react';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  accuracy: number;
  isDark: boolean;
  onDownload: () => void;
  onShare: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({
  studentName,
  courseName,
  completionDate,
  accuracy,
  isDark,
  onDownload,
  onShare
}) => {
  return (
    <div className={`
      max-w-2xl mx-auto p-8 rounded-2xl shadow-2xl border-4
      ${isDark 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500' 
        : 'bg-gradient-to-br from-white to-gray-50 border-yellow-400'
      }
      relative overflow-hidden
    `}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-4 left-4 w-16 h-16 border-4 border-yellow-500 rounded-full" />
        <div className="absolute top-4 right-4 w-16 h-16 border-4 border-yellow-500 rounded-full" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-4 border-yellow-500 rounded-full" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-yellow-500 rounded-full" />
      </div>

      <div className="relative z-10 text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Award size={64} className="mx-auto text-yellow-500" />
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Certificate of Achievement
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            This certifies that
          </p>
          
          <h2 className={`text-4xl font-bold text-yellow-600 dark:text-yellow-400`}>
            {studentName}
          </h2>
          
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            has successfully completed
          </p>
          
          <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {courseName}
          </h3>
          
          <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            with an accuracy of <span className="font-bold text-green-600">{accuracy}%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-4 pt-6 border-t border-gray-300 dark:border-gray-600">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Completed on {completionDate}
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
            
            <button
              onClick={onShare}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                ${isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }
              `}
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};