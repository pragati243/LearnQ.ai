


import React from 'react';
import { MathComponent } from 'mathjax-react';

const Question = ({ question, onAnswerSelect, selectedAnswer }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-200';
      case 'Medium':
        return 'bg-yellow-200';
      case 'Hard':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  // Function to add space between words
  const addSpacesBetweenWords = (text) => {
    return text.split(' ').join('\u00A0'); // Using non-breaking space
  };

  const formatText = (text) => {
    return text.replace(/ /g, '\\,'); // Replace spaces with LaTeX non-breaking spaces
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-white transition-all" 
      style={{ maxWidth: '400px', width: '100%', maxHeight: '400px' }} // Keep it centered
    >
      {/* Difficulty level badge */}
      <span className={`absolute top-0 left-0 mt-2 ml-2 px-2 py-1 text-sm rounded-lg text-black font-bold ${getDifficultyColor(question.difficulty)}`}>
        {question.difficulty}
      </span>

      {/* Scrollable Question Text */}
      <div className="mb-4 text-center" style={{ maxHeight: '100px', overflowY: 'auto', width: '100%' }}>
        <h3 className="text-xl font-semibold break-words text-black" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', lineHeight: '1.2em' }}>
          <MathComponent tex={`\{${question.questionText.replace(/ /g, '\\  ')}}`} />
        </h3>
      </div>

      {/* Scrollable Answer Options */}
      <div 
        className="flex flex-col items-center w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow-lg transition-all text-black" 
        style={{ borderRadius: '8px', marginTop: '1rem', maxHeight: '150px', overflowY: 'auto' }} // Fixed max height with overflow
      >
        {
        question.options.map((option, index) => (
          <label 
            key={index} 
            className="flex items-center w-full mb-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition text-black"
          >
            <input 
              type="radio" 
              name="answer" 
              checked={selectedAnswer === option} 
              onChange={() => onAnswerSelect(option)} 
              className="mr-4"
            />
            <span className='text-black'><MathComponent tex={`{${formatText(option)}}`} /></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;



