import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PatchNotesProps {
  onViewChange: (view: 'library' | 'patchNotes' | 'gameDetails') => void;
}

export const PatchNotes: React.FC<PatchNotesProps> = ({ onViewChange }) => {
  return (
    <div className="container mx-auto px-6 py-8">
      <button
        onClick={() => onViewChange('library')}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Library</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Patch Notes</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Version 2.0 - Phantom Liberty
            </h3>
            <div className="prose dark:prose-invert">
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Added new Dogtown district</li>
                <li>Completely revamped police system</li>
                <li>New vehicle combat mechanics</li>
                <li>Redesigned skill trees and perks</li>
                <li>Enhanced AI behavior</li>
                <li>New dynamic events system</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Version 1.6 - Edgerunners Update
            </h3>
            <div className="prose dark:prose-invert">
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Added cross-platform progression</li>
                <li>New weapons and cyberware</li>
                <li>Improved graphics and performance</li>
                <li>Bug fixes and stability improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};