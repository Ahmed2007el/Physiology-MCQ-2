import { useEffect, useState } from 'react';
import { ALL_QUESTIONS } from './data/parser';
import { QuizState, Answers } from './types';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

export default function App() {
  const [quizState, setQuizState] = useState<QuizState>(() => {
    const saved = localStorage.getItem('quizState');
    return (saved as QuizState) || 'start';
  });
  
  const [answers, setAnswers] = useState<Answers>(() => {
    const saved = localStorage.getItem('quizAnswers');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('quizCurrentIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('quizState', quizState);
  }, [quizState]);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('quizCurrentIndex', currentIndex.toString());
  }, [currentIndex]);

  const startQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setQuizState('playing');
  };

  const finishQuiz = () => {
    setQuizState('results');
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setQuizState('start');
  };

  const updateAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30 flex flex-col">
      <main className="w-full flex-1 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col">
        {quizState === 'start' && <StartScreen onStart={startQuiz} totalQuestions={ALL_QUESTIONS.length} />}
        {quizState === 'playing' && (
          <QuizScreen 
            questions={ALL_QUESTIONS} 
            answers={answers} 
            onAnswer={updateAnswer} 
            onFinish={finishQuiz}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
        {quizState === 'results' && (
          <ResultsScreen 
            questions={ALL_QUESTIONS} 
            answers={answers} 
            onRestart={restartQuiz} 
          />
        )}
      </main>
    </div>
  );
}
