// import React, { useEffect } from 'react';
// import { MathComponent } from 'mathjax-react';

// const Result = ({ questions, selectedAnswers }) => {
//   const totalMarks = questions.reduce((sum, question) => sum + question.marksAllocated, 0);
//   const scoredMarks = questions.reduce((sum, question, index) => {
//     return selectedAnswers[index] === question.correctOption ? sum + question.marksAllocated : sum;
//   }, 0);
  
//   const scorePercentage = (scoredMarks / totalMarks) * 100;

//   // Function to determine the emoji based on the score percentage
//   const getEmoji = (percentage) => {
//     if (percentage >= 80) {
//       return '🎉'; // Celebration emoji for high scores
//     } else if (percentage >= 50) {
//       return '😊'; // Happy face for average scores
//     } else {
//       return '😢'; // Sad face for low scores
//     }
//   };

//   useEffect(() => {
//     // Ensure MathJax processes the math components
//     if (window.MathJax) {
//       window.MathJax.typeset();
//     }
//   }, [questions, selectedAnswers]);

//   // Function to color difficulty level based on value
//   const getDifficultyColor = (difficulty) => {
//     if (difficulty === 'Easy') return 'text-green-500';
//     if (difficulty === 'Medium') return 'text-yellow-500';
//     if (difficulty === 'Hard') return 'text-red-500';
//     return 'text-gray-500'; // Default if difficulty is unknown
//   };

//   return (
//     <div className="text-center text-black p-6">
//       <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
//       <p>Total Questions: {questions.length}</p>
//       <p>Total Marks: {totalMarks}</p>
//       <p>Your Score: {scoredMarks}</p>
//       <p>Percentage: {scorePercentage.toFixed(2)}%</p>
      
//       {/* Display emoji based on score percentage */}
//       <h2 className="text-4xl mb-4">{getEmoji(scorePercentage)}</h2>

//       <h3 className="text-xl font-semibold mt-4">Correct Answers:</h3>
      
//       {/* Scrollable container for questions and answers with horizontal scroll */}
//       <div className="overflow-x-auto mx-auto w-full max-w-2xl border rounded-lg p-4 bg-gray-100">
//         <div className="w-full min-w-max">
//           {questions.map((question, index) => (
//             <div key={question.id} className="mb-4">
//               {/* Question Text */}
//               <div className="mb-2">
//                 <p className="font-semibold inline-block">
//                   <MathComponent tex={`{${question.questionText.replace(/ /g, '\\,')}}`} />
//                 </p>
//               </div>
              
//               {/* Inline Answers with Centering */}
//               <div className="flex justify-center mb-1">
//                 <span className="font-semibold">Your Answer: </span>
//                 <span className="ml-2 inline-block">
//                   {selectedAnswers[index] ? (
//                     <MathComponent tex={`{${selectedAnswers[index].replace(/ /g, '\\,')}}`} display={false} />
//                   ) : 'Not answered'}
//                 </span>
//               </div>
//               <div className="flex justify-center">
//                 <span className="font-semibold">Correct Answer: </span>
//                 <span className="ml-2 inline-block text-green-700">
//                   <MathComponent tex={`{${question.correctOption.replace(/ /g, '\\,')}}`} display={false} />
//                 </span>
//               </div>

//               {/* Difficulty Level with Dynamic Color */}
//               <p className={`mt-2 ${getDifficultyColor(question.difficulty)} text-center`}>
//                 Difficulty: {question.difficulty}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Result;


import React from 'react';
import { MathComponent } from 'mathjax-react';

const Result = ({ questions, totalQuestions, totalScore, resetQuiz }) => {
  const totalMarks = questions.reduce((sum, question) => sum + question.marksAllocated, 0);
  const scorePercentage = (totalScore / totalMarks) * 100;

  const getEmoji = (percentage) => {
    if (percentage >= 80) {
      return '🎉'; // Celebration emoji for high scores
    } else if (percentage >= 50) {
      return '😊'; // Happy face for average scores
    } else {
      return '😢'; // Sad face for low scores
    }
  };

  return (
    <div className="text-center text-black p-6">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p>Total Questions Attempted: {questions.length} / {totalQuestions}</p>
      <p>Total Marks: {totalMarks}</p>
      <p>Your Score: {totalScore}</p>
      <p>Percentage: {scorePercentage.toFixed(2)}%</p>
      
      <h2 className="text-4xl mb-4">{getEmoji(scorePercentage)}</h2>

      <h3 className="text-xl font-semibold mt-4">Review Your Answers:</h3>
      <div className="overflow-x-auto mx-auto w-full max-w-2xl border rounded-lg p-4 bg-gray-100">
        <div className="w-full min-w-max">
          {questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <div className="mb-2">
                <p className="font-semibold inline-block">
                  <MathComponent tex={`{${question.questionText.replace(/ /g, '\\,')}}`} />
                </p>
              </div>
              <div className="flex justify-center mb-1">
                <span className="font-semibold">Your Answer: </span>
                <span className="ml-2 inline-block">
                  {question.userAnswer ? (
                    <MathComponent tex={`{${question.userAnswer.replace(/ /g, '\\,')}}`} display={false} />
                  ) : 'Not answered'}
                </span>
              </div>
              <div className="flex justify-center">
                <span className="font-semibold">Correct Answer: </span>
                <span className="ml-2 inline-block text-green-700">
                  <MathComponent tex={`{${question.correctOption.replace(/ /g, '\\,')}}`} display={false} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={resetQuiz} className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;

