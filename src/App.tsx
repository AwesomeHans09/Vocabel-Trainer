import React, { useState } from 'react';
import VocabManager from './components/VocabManager';
import PracticeMode from './components/PracticeMode';
import Header from './components/Header';
import { VocabItem } from './types';
import { defaultVocabulary } from './data/defaultVocabulary';

function App() {
  const [mode, setMode] = useState<'manage' | 'practice'>('manage');
  const [vocabulary, setVocabulary] = useState<VocabItem[]>(defaultVocabulary);
  const [incorrectItems, setIncorrectItems] = useState<VocabItem[]>([]);
  const [score, setScore] = useState(0);

  const handleModeChange = (newMode: 'manage' | 'practice') => {
    setMode(newMode);
    if (newMode === 'practice') {
      setScore(0);
      setIncorrectItems([]);
    }
  };

  const handleAddVocab = (word: string, translation: string) => {
    if (word.trim() && translation.trim()) {
      setVocabulary([...vocabulary, { word, translation }]);
    }
  };

  const handleRemoveVocab = (index: number) => {
    const newVocabulary = [...vocabulary];
    newVocabulary.splice(index, 1);
    setVocabulary(newVocabulary);
  };

  const handleCorrectAnswer = (item: VocabItem) => {
    setScore(score + 1);
    // Remove from vocabulary and incorrect items
    const newVocabulary = vocabulary.filter(v => v !== item);
    setVocabulary(newVocabulary);
    
    const newIncorrectItems = incorrectItems.filter(v => v !== item);
    setIncorrectItems(newIncorrectItems);
  };

  const handleIncorrectAnswer = (item: VocabItem) => {
    // Add to incorrect items if not already there
    if (!incorrectItems.includes(item)) {
      setIncorrectItems([...incorrectItems, item]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center p-4 md:p-8">
      <Header mode={mode} onModeChange={handleModeChange} />
      
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 mt-8 transition-all duration-300">
        {mode === 'manage' ? (
          <VocabManager 
            vocabulary={vocabulary} 
            onAddVocab={handleAddVocab} 
            onRemoveVocab={handleRemoveVocab} 
          />
        ) : (
          <PracticeMode 
            vocabulary={vocabulary}
            incorrectItems={incorrectItems}
            score={score}
            onCorrectAnswer={handleCorrectAnswer}
            onIncorrectAnswer={handleIncorrectAnswer}
            onFinish={() => setMode('manage')}
          />
        )}
      </div>
    </div>
  );
}

export default App;