import React from 'react';
import { X, Clock, RotateCcw } from 'lucide-react';
import { CardVersion } from '../../types';
import { Button } from '../ui/Button';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  versions: CardVersion[];
  onRollback: (version: number) => void;
  cardTitle: string;
}

export function VersionHistoryModal({ 
  isOpen, 
  onClose, 
  versions, 
  onRollback, 
  cardTitle 
}: VersionHistoryModalProps) {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedVersions = [...versions].sort((a, b) => b.version - a.version);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Version History
              </h2>
              <p className="text-sm text-gray-600">{cardTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {sortedVersions.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No version history available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedVersions.map((version, index) => (
                <div
                  key={version.version}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          v{version.version}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(version.timestamp)}
                        </span>
                        {index === 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">
                        {version.changes}
                      </p>
                      
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
                        <strong>Content preview:</strong> {version.content.explanation.substring(0, 100)}...
                      </div>
                    </div>
                    
                    {index !== 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRollback(version.version)}
                        className="ml-4"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Rollback
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}