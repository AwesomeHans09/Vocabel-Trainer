import React from 'react';

interface FeedbackMessageProps {
  message: string;
  isCorrect: boolean;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message, isCorrect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div 
        className={`
          ${isCorrect ? 'bg-green-50 text-green-800 border-green-200' : 'bg-blue-50 text-blue-800 border-blue-200'} 
          px-8 py-6 rounded-lg shadow-xl border-2 text-center
          transform transition-all duration-300 animate-bounce-in
        `}
      >
        <p className="text-3xl font-bold">{message}</p>
      </div>
    </div>
  );
};

export default FeedbackMessage;