
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question';
import Result from './Result';

const Quiz = ({ difficulty, setDifficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/data.json'); // Ensure this path is correct
        let filteredQuestions = response.data;

        if (difficulty !== 'Any') {
          filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
        }

        const randomQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, 4);
        setQuestions(randomQuestions);
      } catch (error) {
        console.error('Could not fetch questions', error);
      }
    };

    if (difficulty) {
      fetchQuestions();
    }
  }, [difficulty]);

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const nextQuestion = () => {
    if (!selectedAnswers[currentQuestionIndex]) { // Check if an option is selected
      alert('Please choose an option before proceeding to the next question.');
      return; // Prevent moving to the next question
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const submitQuiz = () => {
    setQuizFinished(true);
  };

  const resetQuiz = () => {
    setDifficulty('');
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setQuestions([]);
  };

  if (quizFinished) {
    return (
      <div>
        <Result questions={questions} selectedAnswers={selectedAnswers} />
        <button onClick={resetQuiz} className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Restart Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <p className="text-center">Loading questions...</p>;

  return (
    <div className="flex flex-col items-center">
      
      
      {/* Modern and wider question box */}
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <Question 
          question={questions[currentQuestionIndex]} 
          onAnswerSelect={handleAnswerSelect} 
          selectedAnswer={selectedAnswers[currentQuestionIndex]} 
        />
      </div>

      <div className="mt-4 flex space-x-4">
        {currentQuestionIndex > 0 && (
          <button onClick={previousQuestion} className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400">
            Previous
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={nextQuestion} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Next
          </button>
        ) : (
          <button onClick={submitQuiz} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;





