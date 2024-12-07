
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Question from './Question';
// import Result from './Result';

// const Quiz = ({ difficulty, setDifficulty }) => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [quizFinished, setQuizFinished] = useState(false);

//   const [currentDiificulty,setCurrentDiffulty] = useState("Easy");
//   const [filteredQuestions,setFillteredQuestion] = useState([]);




//   // useEffect(() => {
//   //  const fetch
//   // })

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('/data.json'); // Ensure this path is correct
//         let filteredQuestions = response.data;

//         if (difficulty !== 'Any') {
//           filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
//         }

//         const randomQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, 4);
//         setQuestions(randomQuestions);
//       } catch (error) {
//         console.error('Could not fetch questions', error);
//       }
//     };

//     if (difficulty) {
//       fetchQuestions();
//     }
//   }, [difficulty]);

//   const handleAnswerSelect = (answer) => {
//     const newSelectedAnswers = [...selectedAnswers];
//     newSelectedAnswers[currentQuestionIndex] = answer;
//     setSelectedAnswers(newSelectedAnswers);
//   };

//   const nextQuestion = () => {
//     if (!selectedAnswers[currentQuestionIndex]) { // Check if an option is selected
//       alert('Please choose an option before proceeding to the next question.');
//       return; // Prevent moving to the next question
//     }
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//   };

//   const previousQuestion = () => {
//     setCurrentQuestionIndex(prevIndex => prevIndex - 1);
//   };

//   const submitQuiz = () => {
//     setQuizFinished(true);
//   };

//   const resetQuiz = () => {
//     setDifficulty('');
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers([]);
//     setQuizFinished(false);
//     setQuestions([]);
//   };

//   if (quizFinished) {
//     return (
//       <div>
//         <Result questions={questions} selectedAnswers={selectedAnswers} />
//         <button onClick={resetQuiz} className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//           Restart Quiz
//         </button>
//       </div>
//     );
//   }

//   if (questions.length === 0) return <p className="text-center">Loading questions...</p>;

//   return (
//     <div className="flex flex-col items-center">
      
      
//       {/* Modern and wider question box */}
//       <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
//         <Question 
//           question={questions[currentQuestionIndex]} 
//           onAnswerSelect={handleAnswerSelect} 
//           selectedAnswer={selectedAnswers[currentQuestionIndex]} 
//         />
//       </div>

//       <div className="mt-4 flex space-x-4">
//         {currentQuestionIndex > 0 && (
//           <button onClick={previousQuestion} className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400">
//             Previous
//           </button>
//         )}
//         {currentQuestionIndex < questions.length - 1 ? (
//           <button onClick={nextQuestion} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//             Next
//           </button>
//         ) : (
//           <button onClick={submitQuiz} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question';
import Result from './Result';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState('Easy'); // Start with Easy
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answers and questions

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/data.json'); // Ensure this path is correct
        setQuestions(response.data);
      } catch (error) {
        console.error('Could not fetch questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    loadQuestion('Easy');
  };

  const loadQuestion = (difficulty) => {
    const filteredQuestions = questions.filter((q) => q.difficulty === difficulty);
    if (filteredQuestions.length > 0) {
      const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      setCurrentQuestion(randomQuestion);
      setCurrentDifficulty(difficulty);
    } else {
      setQuizFinished(true); // End the quiz if no more questions are available
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      alert('Please select an answer before proceeding.');
      return;
    }

    // Update the answered questions for results
    setAnsweredQuestions((prev) => [
      ...prev,
      {
        ...currentQuestion,
        userAnswer: selectedAnswer,
      },
    ]);

    // Check if the selected answer is correct
    if (selectedAnswer === currentQuestion.correctOption) {
      setScore((prevScore) => prevScore + currentQuestion.marksAllocated);
      // Move to the next difficulty
      if (currentDifficulty === 'Easy') {
        loadQuestion('Medium');
      } else if (currentDifficulty === 'Medium') {
        loadQuestion('Hard');
      } else {
        setQuizFinished(true); // End quiz after Hard question is answered correctly
      }
    } else {
      // Stay on the current difficulty level
      loadQuestion(currentDifficulty);
    }

    // Reset the selected answer
    setSelectedAnswer(null);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestion(null);
    setCurrentDifficulty('Easy');
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions([]);
  };

  if (!quizStarted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button onClick={startQuiz} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div>
        <Result 
          questions={answeredQuestions} 
          totalQuestions={questions.length} 
          totalScore={score} 
          resetQuiz={resetQuiz} 
        />
      </div>
    );
  }

  if (!currentQuestion) return <p className="text-center">Loading question...</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <Question 
          question={currentQuestion} 
          onAnswerSelect={setSelectedAnswer} 
          selectedAnswer={selectedAnswer} 
        />
      </div>

      <div className="mt-4">
        <button onClick={handleNext} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {currentDifficulty === 'Hard' && selectedAnswer === currentQuestion.correctOption ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
