import React from 'react';
import { BookOpen, Edit3 } from 'lucide-react';

interface HeaderProps {
  mode: 'manage' | 'practice';
  onModeChange: (mode: 'manage' | 'practice') => void;
}

const Header: React.FC<HeaderProps> = ({ mode, onModeChange }) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center mt-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Vocabulary Trainer
      </h1>
      
      <div className="bg-white rounded-full p-1 shadow-lg">
        <div className="flex items-center">
          <button
            onClick={() => onModeChange('manage')}
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              mode === 'manage'
                ? 'bg-blue-600 text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Edit3 size={18} className="mr-2" />
            <span className="font-medium">Manage</span>
          </button>
          
          <button
            onClick={() => onModeChange('practice')}
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              mode === 'practice'
                ? 'bg-green-600 text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BookOpen size={18} className="mr-2" />
            <span className="font-medium">Practice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;