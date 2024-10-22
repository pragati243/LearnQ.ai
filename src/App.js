import React, { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [difficulty, setDifficulty] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-black"> Quiz</h1>
        {!difficulty ? (  
          <div>
            <h2 className="text-lg mb-4 text-center  text-black">Select Difficulty Level:</h2>
            {['Easy', 'Medium', 'Hard', 'Any'].map(level => (
              <button 
                key={level} 
                onClick={() => setDifficulty(level)}
                className="w-full py-2 mb-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                {level}
              </button>
            ))}
          </div>
        ) : (
          <Quiz difficulty={difficulty} setDifficulty={setDifficulty} />
        )}
      </div>
    </div>
  );
}

export default App;
