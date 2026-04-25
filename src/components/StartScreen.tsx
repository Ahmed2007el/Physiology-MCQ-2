import { motion } from 'motion/react';
import { Stethoscope, Activity, ArrowRight } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

export default function StartScreen({ onStart, totalQuestions }: StartScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center w-full" dir="rtl">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-slate-900/80 p-10 md:p-14 rounded-3xl shadow-xl shadow-black/20 max-w-2xl w-full border border-slate-800"
      >
        <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-8 isolate relative">
          <Stethoscope size={40} className="relative z-10" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-indigo-500/20 rounded-2xl -z-10"
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-slate-100 mb-4 tracking-tight">
          امتحان الفسيولوجيا الشامل
        </h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg mx-auto">
          اختبر معلوماتك الطبية في علم وظائف الأعضاء مع هذا الاختبار التفاعلي الذي يشمل جميع أجهزة الجسم.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 border border-slate-700/50 rounded-lg text-slate-300 font-medium">
            <Activity size={20} className="text-indigo-400" />
            <span>{totalQuestions} سؤال (MCQ)</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm uppercase tracking-widest font-medium px-10 py-4 rounded-xl flex items-center gap-3 mx-auto transition-colors shadow-lg shadow-indigo-900/50"
        >
          <span>ابدأ الامتحان الآن</span>
          <ArrowRight size={24} className="rotate-180" />
        </motion.button>
      </motion.div>
    </div>
  );
}
