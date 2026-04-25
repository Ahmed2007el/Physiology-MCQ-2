import { motion } from 'motion/react';
import { Question, Answers } from '../types';
import { Trophy, RotateCcw, XCircle, CheckCircle2 } from 'lucide-react';

interface ResultsScreenProps {
  questions: Question[];
  answers: Answers;
  onRestart: () => void;
}

export default function ResultsScreen({ questions, answers, onRestart }: ResultsScreenProps) {
  let score = 0;
  questions.forEach(q => {
    if (answers[q.id] === q.correctAnswer) {
      score++;
    }
  });

  const percentage = Math.round((score / questions.length) * 100);
  const isPassing = percentage >= 60;

  return (
    <div className="max-w-4xl mx-auto w-full flex-1" dir="rtl">
      {/* Score Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900/80 rounded-3xl p-8 md:p-12 shadow-xl shadow-black/20 border border-slate-800 text-center mb-8 relative overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-2 ${isPassing ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
        
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${isPassing ? 'bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-500' : 'bg-rose-500/10 border-2 border-rose-500/30 text-rose-500'}`}>
          <Trophy size={48} />
        </div>
        
        <h2 className="text-3xl font-sans font-bold text-slate-100 mb-2">النتيجة النهائية</h2>
        <p className="text-slate-400 mb-8">لقد أكملت الامتحان الشامل في الفسيولوجيا</p>
        
        <div className="flex justify-center items-end gap-2 mb-8" dir="ltr">
          <span className={`text-7xl font-sans font-black tracking-tighter ${isPassing ? 'text-emerald-500' : 'text-rose-500'}`}>
            {percentage}%
          </span>
          <span className="text-2xl font-bold text-slate-600 mb-2">/ 100</span>
        </div>

        <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-slate-300 border border-slate-700/50">
            الإجابات الصحيحة: <strong className="text-emerald-400 ml-1">{score}</strong>
          </div>
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-slate-300 border border-slate-700/50">
            الإجابات الخاطئة: <strong className="text-rose-400 ml-1">{questions.length - score}</strong>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-3 mx-auto transition-colors"
        >
          <RotateCcw size={16} />
          <span>إعادة الامتحان</span>
        </button>
      </motion.div>

      {/* Review Section */}
      <div className="bg-slate-900/50 rounded-3xl p-6 md:p-10 shadow-xl shadow-black/20 border border-slate-800">
        <h3 className="text-2xl font-sans font-bold text-slate-100 mb-8 pb-4 border-b border-slate-800">مراجعة الإجابات</h3>
        
        <div className="space-y-8">
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div key={q.id} className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCorrect ? (
                      <CheckCircle2 className="text-emerald-500" size={24} />
                    ) : (
                      <XCircle className="text-rose-500" size={24} />
                    )}
                  </div>
                  <div dir="ltr" className="flex-1">
                    <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest mr-2 block mb-2 opacity-80">Question {q.id}</span>
                    <h4 className="text-lg font-serif text-slate-200">
                      {q.text}
                    </h4>
                  </div>
                </div>
                
                <div className="space-y-2 mr-10" dir="ltr">
                  {q.options.map(opt => {
                    const isSelected = userAnswer === opt.id;
                    const isTruth = q.correctAnswer === opt.id;
                    
                    let bgClass = "bg-slate-900/50 border-slate-800/50 text-slate-400";
                    if (isTruth) {
                      bgClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                    } else if (isSelected && !isCorrect) {
                      bgClass = "bg-rose-500/10 border-rose-500/30 text-rose-400";
                    }

                    return (
                      <div key={opt.id} className={`p-4 rounded-xl border ${bgClass} flex items-start gap-3`}>
                        <div className="font-bold w-6 font-mono">{opt.id})</div>
                        <div className="flex-1">{opt.text}</div>
                        {isTruth && <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />}
                        {isSelected && !isCorrect && <XCircle className="text-rose-500 flex-shrink-0" size={20} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
