import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { VocabItem } from '../types';

interface VocabManagerProps {
  vocabulary: VocabItem[];
  onAddVocab: (word: string, translation: string) => void;
  onRemoveVocab: (index: number) => void;
}

const VocabManager: React.FC<VocabManagerProps> = ({ 
  vocabulary, 
  onAddVocab, 
  onRemoveVocab 
}) => {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (word.trim() && translation.trim()) {
      onAddVocab(word, translation);
      setWord('');
      setTranslation('');
      setFeedback({ 
        message: 'Vocabulary added successfully!', 
        type: 'success' 
      });
      
      setTimeout(() => {
        setFeedback({ message: '', type: '' });
      }, 3000);
    } else {
      setFeedback({ 
        message: 'Please enter both word and translation', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Vocabulary</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="word" className="block text-sm font-medium text-gray-700">
              Word
            </label>
            <input
              type="text"
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
              placeholder="Enter word"
            />
          </div>
          
          <div>
            <label htmlFor="translation" className="block text-sm font-medium text-gray-700">
              Translation
            </label>
            <input
              type="text"
              id="translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
              placeholder="Enter translation"
            />
          </div>
          
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Add Vocabulary
          </button>
        </form>
        
        {feedback.message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              feedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            } animate-fade-in-out`}
          >
            {feedback.message}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vocabulary List</h2>
        
        {vocabulary.length === 0 ? (
          <p className="text-gray-500 italic">No vocabulary items yet. Add some above!</p>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {vocabulary.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-1 mr-4">
                  <span className="font-medium text-gray-800">{item.word}</span>
                  <span className="text-gray-500 mx-2">-</span>
                  <span className="text-gray-700">{item.translation}</span>
                </div>
                <button
                  onClick={() => onRemoveVocab(index)}
                  className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                  aria-label="Remove"
                >
                  <Trash size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VocabManager;