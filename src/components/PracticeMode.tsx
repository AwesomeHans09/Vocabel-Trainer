import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, Home } from 'lucide-react';
import { VocabItem } from '../types';
import FeedbackMessage from './FeedbackMessage';
import { getRandomMotivationalMessage } from '../utils/motivationalMessages';

interface PracticeModeProps {
  vocabulary: VocabItem[];
  incorrectItems: VocabItem[];
  score: number;
  onCorrectAnswer: (item: VocabItem) => void;
  onIncorrectAnswer: (item: VocabItem) => void;
  onFinish: () => void;
}

const PracticeMode: React.FC<PracticeModeProps> = ({
  vocabulary,
  incorrectItems,
  score,
  onCorrectAnswer,
  onIncorrectAnswer,
  onFinish,
}) => {
  const [currentItem, setCurrentItem] = useState<VocabItem | null>(null);
  const [answer, setAnswer] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [askTranslation, setAskTranslation] = useState(true);
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [bgColor, setBgColor] = useState('bg-white');

  useEffect(() => {
    getNextQuestion();
  }, [vocabulary, incorrectItems]);

  const getNextQuestion = () => {
    setIsChecked(false);
    setAnswer('');
    setBgColor('bg-white');
    
    // First try items from incorrectItems, then from vocabulary
    let nextItem: VocabItem | null = null;
    
    if (incorrectItems.length > 0) {
      nextItem = incorrectItems[0];
      // For incorrect items, always ask for translation
      setAskTranslation(true);
    } else if (vocabulary.length > 0) {
      const randomIndex = Math.floor(Math.random() * vocabulary.length);
      nextItem = vocabulary[randomIndex];
      // For regular vocabulary, randomly choose direction
      setAskTranslation(Math.random() < 0.5);
    }
    
    setCurrentItem(nextItem);
  };

  const checkAnswer = () => {
    if (!currentItem) return;
    
    const correctAnswer = askTranslation 
      ? currentItem.translation.toLowerCase()
      : currentItem.word.toLowerCase();
      
    const userAnswer = answer.trim().toLowerCase();
    const correct = userAnswer === correctAnswer;
    
    setIsChecked(true);
    setIsCorrect(correct);
    
    if (correct) {
      setBgColor('bg-green-100');
      onCorrectAnswer(currentItem);
      
      // Show motivational message
      setMotivationalMessage(getRandomMotivationalMessage(true));
      setShowMotivationalMessage(true);
      
      setTimeout(() => {
        setShowMotivationalMessage(false);
        
        // Give time for animation to complete before moving on
        setTimeout(() => {
          // Check if we're done
          if (vocabulary.length === 0 && incorrectItems.length <= 1) {
            // We're on the last item
          } else {
            getNextQuestion();
          }
        }, 300);
      }, 2000);
    } else {
      setBgColor('bg-red-100');
      onIncorrectAnswer(currentItem);
      
      // Show motivational message for incorrect answer
      setMotivationalMessage(getRandomMotivationalMessage(false));
      setShowMotivationalMessage(true);
      
      setTimeout(() => {
        setShowMotivationalMessage(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isChecked) {
      checkAnswer();
    }
  };

  const handleNext = () => {
    if (vocabulary.length === 0 && incorrectItems.length === 0) {
      // All done!
      onFinish();
    } else {
      getNextQuestion();
    }
  };

  if (!currentItem && vocabulary.length === 0 && incorrectItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Great job! 🎉</h2>
        <p className="text-lg text-gray-600 mb-6">You've completed all vocabulary items!</p>
        <p className="text-xl font-semibold text-blue-600 mb-8">Final score: {score}</p>
        
        <button
          onClick={onFinish}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Home size={16} className="mr-2" />
          Return to Manage Mode
        </button>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-500 p-6 rounded-lg ${bgColor}`}>
      <div className="relative">
        {/* Score display */}
        <div className="absolute top-0 right-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Score: {score}
          </span>
        </div>
        
        {currentItem && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {askTranslation ? 'Translate:' : 'What is the translation of:'}
            </h2>
            
            <div className="text-3xl font-bold text-blue-700 mb-8 text-center">
              {askTranslation ? currentItem.word : currentItem.translation}
            </div>
            
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isChecked}
              placeholder="Your answer"
              className="w-full max-w-md p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
              autoFocus
            />
            
            <div className="flex space-x-3">
              {!isChecked ? (
                <button
                  onClick={checkAnswer}
                  disabled={!answer.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check size={16} className="mr-2" />
                  Check
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <ArrowRight size={16} className="mr-2" />
                  {vocabulary.length === 0 && incorrectItems.length <= 1 ? 'Finish' : 'Next'}
                </button>
              )}
            </div>
            
            {isChecked && !isCorrect && (
              <div className="mt-6 p-3 bg-white rounded-md shadow border border-red-200 animate-fade-in">
                <p className="text-center">
                  <span className="font-medium">Correct answer: </span>
                  <span className="text-green-700 font-bold">
                    {askTranslation ? currentItem.translation : currentItem.word}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Motivational message overlay */}
        {showMotivationalMessage && (
          <FeedbackMessage 
            message={motivationalMessage} 
            isCorrect={isCorrect} 
          />
        )}
      </div>
    </div>
  );
};

export default PracticeMode;