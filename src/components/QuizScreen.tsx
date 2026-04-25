import { Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, Answers } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  answers: Answers;
  onAnswer: (qId: number, aId: string) => void;
  onFinish: () => void;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export default function QuizScreen({ questions, answers, onAnswer, onFinish, currentIndex, setCurrentIndex }: QuizScreenProps) {
  const question = questions[currentIndex];
  
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleNext = () => !isLast && setCurrentIndex(i => i + 1);
  const handlePrev = () => !isFirst && setCurrentIndex(i => i - 1);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto" dir="rtl">
      {/* Main Quiz Area */}
      <div className="flex-1 min-w-0">
        {/* Progress header */}
        <div className="bg-slate-900/50 rounded-2xl p-6 shadow-sm border border-slate-800 mb-6 sticky top-4 z-10">
          <div className="flex justify-between items-center mb-4 text-[10px] uppercase tracking-widest text-slate-400">
            <span>Progress</span>
            <span className="text-sm font-medium text-slate-200">{answeredCount} / {questions.length}</span>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              key={progress}
              className="h-full bg-indigo-500 transition-all duration-300 ease-out" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-900/50 rounded-3xl p-6 md:p-10 border border-slate-800 mb-6 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <span className="text-indigo-400 font-mono text-sm mb-4 block" dir="ltr">Question {question.id} of {questions.length}</span>
              <h2 className="text-xl md:text-3xl font-serif leading-snug mb-12 text-slate-100" dir="ltr">
                {question.text}
              </h2>

              <div className="space-y-4 mt-auto">
                {question.options.map((opt) => {
                  const isAnswered = !!answers[question.id];
                  const isSelected = answers[question.id] === opt.id;
                  const isCorrect = question.correctAnswer === opt.id;
                  
                  let btnClass = 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300';
                  let letterColorClass = 'text-slate-500 group-hover:text-indigo-400';
                  
                  if (isAnswered) {
                    if (isCorrect) {
                      btnClass = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
                      letterColorClass = 'text-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      btnClass = 'border-rose-500/30 bg-rose-500/10 text-rose-400';
                      letterColorClass = 'text-rose-500';
                    } else {
                      btnClass = 'border-slate-800 text-slate-500 opacity-50 cursor-not-allowed';
                      letterColorClass = 'text-slate-600';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isAnswered && onAnswer(question.id, opt.id)}
                      disabled={isAnswered}
                      className={`w-full text-left p-6 border transition-all flex items-center group ${btnClass}`}
                      dir="ltr"
                    >
                      <div className="font-medium text-base md:text-lg flex flex-1 items-center">
                        <span className={`w-8 font-mono transition-colors ${letterColorClass}`}>{opt.id}</span>
                        <span>{opt.text}</span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {isAnswered && isCorrect ? (
                          <CheckCircle2 className="text-emerald-500" size={20} />
                        ) : isAnswered && isSelected && !isCorrect ? (
                          <XCircle className="text-rose-500" size={20} />
                        ) : (
                          <div className={`w-5 h-5 rounded-full border ${isAnswered ? 'border-slate-800' : 'border-slate-700'}`}></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm uppercase tracking-widest disabled:opacity-30 transition-colors rounded-xl"
          >
            السابق
          </button>
          
          {!isLast ? (
            <button
              onClick={handleNext}
              className="px-12 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm uppercase tracking-widest font-medium shadow-lg shadow-indigo-500/20 transition-all rounded-xl"
            >
              التالي
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="px-12 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs uppercase tracking-widest transition-colors rounded-xl"
            >
              إنهاء الامتحان
            </button>
          )}
        </div>
      </div>

      {/* Grid Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0 order-first lg:order-last mb-6 lg:mb-0">
        <div className="bg-slate-900/50 border border-slate-800 p-6 lg:sticky lg:top-4 max-h-[40vh] lg:max-h-[85vh] flex flex-col rounded-2xl">
          <div className="flex justify-between items-end mb-4 border-b border-slate-800 pb-4">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Progress</span>
            <span className="text-sm font-medium text-slate-200">{answeredCount} / {questions.length}</span>
          </div>
          
          <div className="overflow-y-auto flex-1 pr-2 mt-4 custom-scrollbar">
            <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-2" dir="ltr">
              {questions.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = currentIndex === idx;
                
                let btnClass = "aspect-square flex items-center justify-center text-[9px] font-bold transition-all rounded-md ";
                if (isCurrent) {
                  btnClass += "bg-slate-200 text-slate-900 ring-2 ring-slate-400/50 ring-offset-2 ring-offset-slate-950 relative z-10";
                } else if (isAnswered) {
                  const isCorrect = answers[q.id] === q.correctAnswer;
                  if (isCorrect) {
                     btnClass += "bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/30";
                  } else {
                     btnClass += "bg-rose-500/20 border border-rose-500/30 text-rose-500 hover:bg-rose-500/30";
                  }
                } else {
                  btnClass += "bg-slate-800/50 border border-slate-800 text-slate-500 hover:bg-slate-800";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={btnClass}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-950/50 border border-slate-800/50 text-slate-400 rounded-xl">
            <div className="flex items-center gap-3 text-[10px] mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> إجابة صحيحة
            </div>
            <div className="flex items-center gap-3 text-[10px] mb-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div> إجابة خاطئة
            </div>
            <div className="flex items-center gap-3 text-[10px] mb-2">
              <div className="w-2 h-2 bg-slate-200 rounded-full"></div> الحالي
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <div className="w-2 h-2 bg-slate-700 rounded-full"></div> غير مجاب
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
