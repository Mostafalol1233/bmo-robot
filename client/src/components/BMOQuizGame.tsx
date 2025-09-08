import { useState, useEffect } from 'react';

// Import character images for quiz
import finnMainImg from '@assets/characters/finn_main.jpg';
import jakeMainImg from '@assets/characters/jake_main.jpg';
import princessBubblegumMainImg from '@assets/characters/princess_bubblegum_main.jpg';
import marcelineMainImg from '@assets/characters/marceline_main.jpg';
import bmoMainImg from '@assets/characters/bmo_main.jpg';

interface QuizQuestion {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    image: finnMainImg,
    correctAnswer: 'Finn',
    options: ['Finn', 'Jake', 'BMO', 'Marceline']
  },
  {
    id: 2,
    image: jakeMainImg,
    correctAnswer: 'Jake',
    options: ['Finn', 'Jake', 'Princess Bubblegum', 'BMO']
  },
  {
    id: 3,
    image: princessBubblegumMainImg,
    correctAnswer: 'Princess Bubblegum',
    options: ['Marceline', 'Princess Bubblegum', 'Finn', 'Jake']
  },
  {
    id: 4,
    image: marcelineMainImg,
    correctAnswer: 'Marceline',
    options: ['Marceline', 'Princess Bubblegum', 'BMO', 'Finn']
  },
  {
    id: 5,
    image: bmoMainImg,
    correctAnswer: 'BMO',
    options: ['Jake', 'Finn', 'BMO', 'Marceline']
  }
];

interface BMOQuizGameProps {
  onBack: () => void;
}

export default function BMOQuizGame({ onBack }: BMOQuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
    return QUIZ_QUESTIONS[randomIndex];
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setQuestionsAnswered(0);
    setShowResult(false);
    setCurrentQuestion(getRandomQuestion());
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (answer === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const newQuestionsAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newQuestionsAnswered);
      
      if (newQuestionsAnswered >= 5) {
        setShowResult(true);
        setGameStarted(false);
      } else {
        setCurrentQuestion(getRandomQuestion());
        setSelectedAnswer('');
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowResult(false);
    setCurrentQuestion(null);
    setSelectedAnswer('');
  };

  if (!gameStarted && !showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-teal-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">BMO Character Quiz</h2>
          <p className="text-gray-600 mb-6">من الشخصية دي؟ هختبرك في شخصيات Adventure Time!</p>
          <button
            onClick={startGame}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            data-testid="start-quiz-button"
          >
            ابدأ اللعبة
          </button>
        </div>
        <button
          onClick={onBack}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
          data-testid="back-to-games"
        >
          ← الرجوع للألعاب
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-teal-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score >= 4 ? '🎉' : score >= 2 ? '😊' : '😅'}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">انتهت اللعبة!</h2>
          <p className="text-xl text-gray-700 mb-4">
            النتيجة: {score} من 5
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 4 ? 'ممتاز! انت عارف Adventure Time كويس!' : 
             score >= 2 ? 'مش وحش! تحتاج تتفرج أكتر على Adventure Time' : 
             'تحتاج تتفرج على Adventure Time أكتر 😄'}
          </p>
          <div className="space-x-4">
            <button
              onClick={startGame}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              data-testid="play-again-button"
            >
              العب تاني
            </button>
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              data-testid="back-to-menu"
            >
              القائمة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 text-sm"
          data-testid="back-button"
        >
          ← رجوع
        </button>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">BMO Quiz</h3>
          <p className="text-sm text-gray-600">السؤال {questionsAnswered + 1} من 5</p>
        </div>
        <div className="text-sm text-gray-600">
          النقاط: {score}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
          مين ده؟
        </h2>
        
        {/* Character Image */}
        <div className="mb-8">
          <img
            src={currentQuestion?.image}
            alt="Adventure Time Character"
            className="w-32 h-32 object-cover rounded-full border-4 border-teal-400 shadow-lg"
            data-testid="quiz-character-image"
          />
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== ''}
              className={`p-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
                selectedAnswer === option
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : selectedAnswer === '' 
                    ? 'bg-white hover:bg-teal-50 text-gray-800 border-2 border-teal-200'
                    : option === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-500'
              }`}
              data-testid={`answer-option-${index}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}