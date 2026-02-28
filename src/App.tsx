/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, HelpCircle, Sparkles, XCircle, CheckCircle2, Play } from 'lucide-react';

type Word = {
  en: string;
  ar: string;
  tr: string;
  ph: string;
  emoji: string;
};

type SubCategory = {
  id: string;
  name: string;
  words: Word[];
};

type MainCategory = {
  id: string;
  name: string;
  icon: string;
  bg: string;
  btn: string;
  subCategories: SubCategory[];
};

const CATEGORIES: Record<string, MainCategory> = {
  BASICS: {
    id: 'basics',
    name: 'Basics',
    icon: '✨',
    bg: 'bg-[#FFF9C4]', // Light Yellow
    btn: 'bg-yellow-500',
    subCategories: [
      {
        id: 'greetings',
        name: 'Greetings',
        words: [
          { en: 'Hello', ar: 'مَرْحَبًا', tr: 'Marhaban', ph: '(mar-ha-ban)', emoji: '👋' },
          { en: 'Thank you', ar: 'شُكْرًا', tr: 'Shukran', ph: '(shook-rahn)', emoji: '🙏' },
          { en: 'Please', ar: 'مِنْ فَضْلِكِ', tr: 'Min fadlik', ph: '(min fad-lik)', emoji: '✨' },
          { en: 'Friend', ar: 'صَدِيقٌ', tr: 'Sadiq', ph: '(sa-deeq)', emoji: '👫' },
        ]
      },
      {
        id: 'numbers',
        name: 'Numbers',
        words: [
          { en: 'One', ar: 'وَاحِدٌ', tr: 'Wahid', ph: '(waa-hid)', emoji: '1️⃣' },
          { en: 'Two', ar: 'اِثْنَانِ', tr: 'Ithnan', ph: '(ith-naan)', emoji: '2️⃣' },
          { en: 'Three', ar: 'ثَلَاثَةٌ', tr: 'Thalatha', ph: '(tha-laa-tha)', emoji: '3️⃣' },
          { en: 'Four', ar: 'أَرْبَعَةٌ', tr: 'Arba\'a', ph: '(ar-ba-a)', emoji: '4️⃣' },
          { en: 'Five', ar: 'خَمْسَةٌ', tr: 'Khamsa', ph: '(kham-sa)', emoji: '5️⃣' },
        ]
      }
    ]
  },
  PEOPLE: {
    id: 'people',
    name: 'People & Home',
    icon: '🏠',
    bg: 'bg-[#FFCCBC]', // Soft Peach
    btn: 'bg-orange-500',
    subCategories: [
      {
        id: 'family',
        name: 'My Family',
        words: [
          { en: 'Dad', ar: 'بَابَا', tr: 'Baba', ph: '(baa-baa)', emoji: '👨' },
          { en: 'Mom', ar: 'مَامَا', tr: 'Mama', ph: '(maa-maa)', emoji: '👩' },
          { en: 'Brother', ar: 'أَخٌ', tr: 'Akh', ph: '(akh)', emoji: '👦' },
          { en: 'Sister', ar: 'أُخْتٌ', tr: 'Ukht', ph: '(ookht)', emoji: '👧' },
          { en: 'Grandpa', ar: 'جَدٌّ', tr: 'Jadd', ph: '(jadd)', emoji: '👴' },
          { en: 'Grandma', ar: 'جَدَّةٌ', tr: 'Jadda', ph: '(jad-da)', emoji: '👵' },
          { en: 'I love you', ar: 'أُحِبُّكِ', tr: 'Uhibbuki', ph: '(oo-hib-boo-kee)', emoji: '❤️' },
        ]
      },
      {
        id: 'daily',
        name: 'Daily Fun',
        words: [
          { en: "Let's play", ar: 'هَيَّا نَلْعَبُ', tr: 'Hayya nal\'ab', ph: '(hay-ya nal-ab)', emoji: '🎮' },
          { en: 'School', ar: 'مَدْرَسَةٌ', tr: 'Madrasa', ph: '(mad-ra-sa)', emoji: '🏫' },
          { en: 'Book', ar: 'كِتَابٌ', tr: 'Kitab', ph: '(ki-taab)', emoji: '📚' },
          { en: 'Apple', ar: 'تُفَّاحَةٌ', tr: 'Tuffaha', ph: '(toof-fa-ha)', emoji: '🍎' },
          { en: 'Home', ar: 'بَيْتٌ', tr: 'Bayt', ph: '(bayt)', emoji: '🏠' }
        ]
      }
    ]
  },
  ACTIVITIES: {
    id: 'activities',
    name: 'Activities',
    icon: '⛷️',
    bg: 'bg-[#B3E5FC]', // Icy Blue
    btn: 'bg-blue-500',
    subCategories: [
      {
        id: 'sports',
        name: 'Winter Sports',
        words: [
          { en: 'Ice Skating', ar: 'التَّزَلُّجُ', tr: 'At-tazalluj', ph: '(at-ta-zal-looj)', emoji: '⛸️' },
          { en: 'Skiing', ar: 'التَّزَلُّجُ عَلَى الْجَلِيدِ', tr: 'At-tazalluj \'ala al-jalid', ph: '(at-ta-zal-looj a-la al-ja-leed)', emoji: '⛷️' },
        ]
      },
      {
        id: 'winter_fun',
        name: 'Winter Fun',
        words: [
          { en: 'Snow', ar: 'ثَلْجٌ', tr: 'Thalj', ph: '(thalj)', emoji: '❄️' },
          { en: 'Snowman', ar: 'رَجُلُ ثَلْجٍ', tr: 'Rajul thalj', ph: '(ra-jool thalj)', emoji: '☃️' },
          { en: 'Penguin', ar: 'بَطْرِيقٌ', tr: 'Batriq', ph: '(bat-reeq)', emoji: '🐧' },
          { en: 'Cold', ar: 'بَارِدٌ', tr: 'Barid', ph: '(baa-rid)', emoji: '🥶' },
          { en: 'Hot Chocolate', ar: 'شُوكُولَاتَةٌ سَاخِنَةٌ', tr: 'Shukulata sakhina', ph: '(shoo-koo-laa-ta saa-khi-na)', emoji: '☕' },
          { en: 'Gloves', ar: 'قُفَّازَاتٌ', tr: 'Quffazat', ph: '(qoof-faa-zaat)', emoji: '🧤' }
        ]
      }
    ]
  }
};

export default function App() {
  const [activeMain, setActiveMain] = useState('BASICS');
  const [activeSubIdx, setActiveSubIdx] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [difficulty, setDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY');
  const [quizTarget, setQuizTarget] = useState<Word | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);

  const currentMain = CATEGORIES[activeMain];
  const currentSub = currentMain.subCategories[activeSubIdx];

  const scramble = (str: string) => {
    const chars = str.replace(/\s/g, '').split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join(' ');
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arVoice) utterance.voice = arVoice;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (type: 'correct' | 'wrong') => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    }

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  };

  const startQuizRound = useCallback(() => {
    const words = currentSub.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setQuizTarget(randomWord);
    setTimeout(() => speak(randomWord.ar), 600);
  }, [currentSub]);

  useEffect(() => {
    if (quizMode) {
      startQuizRound();
    } else {
      setQuizTarget(null);
      setFeedback(null);
    }
  }, [quizMode, activeMain, activeSubIdx, startQuizRound, difficulty]);

  const handleCardClick = (word: Word) => {
    setAnimatingCard(word.ar);
    setTimeout(() => setAnimatingCard(null), 400);

    if (quizMode && quizTarget) {
      if (word.ar === quizTarget.ar) {
        setFeedback('correct');
        playSound('correct');
        setTimeout(() => {
          setFeedback(null);
          startQuizRound();
        }, 1500);
      } else {
        setFeedback('wrong');
        playSound('wrong');
        speak(word.ar);
        setTimeout(() => setFeedback(null), 800);
      }
    } else {
      speak(word.ar);
    }
  };

  const handleMainChange = (key: string) => {
    setActiveMain(key);
    setActiveSubIdx(0);
  };

  return (
    <div className={`min-h-screen max-w-md mx-auto transition-colors duration-1000 ease-in-out flex flex-col font-sans ${currentMain.bg}`}>
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg p-4 rounded-b-[2.5rem] border-b border-white/20">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800">Salam, Princess! ✨</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Arabic Adventure</p>
          </div>
          <button 
            onClick={() => setQuizMode(!quizMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all transform active:scale-90 shadow-md ${
              quizMode 
                ? 'bg-pink-500 text-white ring-4 ring-pink-200' 
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {quizMode ? <Sparkles size={18} /> : <HelpCircle size={18} />}
            {quizMode ? 'Quiz On!' : 'Quiz Me?'}
          </button>
        </div>

        {/* Main Categories */}
        <div className="flex gap-2 mb-4 px-1">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleMainChange(key)}
              className={`flex-1 flex flex-col items-center py-2 rounded-2xl transition-all duration-300 border-2 ${
                activeMain === key 
                  ? `${cat.btn} text-white border-transparent shadow-lg scale-105` 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
              }`}
            >
              <span className="text-xl mb-1">{cat.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Subcategories */}
        <nav className="flex gap-2 p-1 bg-slate-100/50 rounded-2xl">
          {currentMain.subCategories.map((sub, idx) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubIdx(idx)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeSubIdx === idx 
                  ? 'bg-white text-slate-800 shadow-sm scale-[1.02]' 
                  : 'text-slate-500 hover:bg-white/30'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </nav>

        {quizMode && (
          <div className="flex gap-2 mt-4 px-2">
            {(['EASY', 'MEDIUM', 'HARD'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`flex-1 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  difficulty === lvl 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        
        {/* Quiz Prompt */}
        <AnimatePresence mode="wait">
          {quizMode && quizTarget && (
            <motion.div 
              key={`${difficulty}-${quizTarget.ar}`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white/90 p-6 rounded-[2rem] text-center shadow-xl border-2 border-dashed border-pink-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-pink-200/50" />
              <p className="text-slate-500 font-bold text-sm mb-2 uppercase tracking-tighter">
                {difficulty === 'EASY' && 'Find the English for...'}
                {difficulty === 'MEDIUM' && 'Find the Arabic for...'}
                {difficulty === 'HARD' && 'Unscramble this word...'}
              </p>
              <button 
                onClick={() => speak(quizTarget.ar)}
                className="group flex flex-col items-center justify-center gap-3 mx-auto p-2"
              >
                <div className="bg-pink-100 p-3 rounded-2xl group-active:scale-90 transition-transform">
                  <Volume2 className="text-pink-600" size={28} />
                </div>
                <span className={`font-arabic text-pink-600 pt-2 leading-none ${difficulty === 'HARD' ? 'text-2xl tracking-[0.2em]' : 'text-4xl'}`}>
                  {difficulty === 'EASY' && quizTarget.ar}
                  {difficulty === 'MEDIUM' && <span className="font-sans font-bold uppercase text-2xl">{quizTarget.en}</span>}
                  {difficulty === 'HARD' && scramble(quizTarget.ar)}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 gap-6 pb-12">
          {currentSub.words.map((word, idx) => (
            <motion.div
              key={word.ar}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleCardClick(word)}
              className={`
                relative bg-white rounded-[2.5rem] p-6 shadow-xl cursor-pointer
                transition-all duration-300 transform active:scale-95
                ${feedback === 'correct' && quizTarget?.ar === word.ar ? 'ring-8 ring-green-400' : ''}
                ${feedback === 'wrong' && animatingCard === word.ar ? 'ring-8 ring-red-400' : ''}
              `}
              whileTap={{ scale: 0.92 }}
            >
              <div className="flex items-center gap-6">
                <div className="text-6xl bg-slate-50 w-24 h-24 flex items-center justify-center rounded-[2rem] shadow-inner border border-slate-100">
                  {word.emoji}
                </div>
                <div className="flex-1">
                  {(!quizMode || difficulty === 'EASY') && (
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{word.en}</p>
                  )}
                  
                  {(!quizMode || difficulty !== 'EASY') && (
                    <h2 className="text-4xl font-arabic text-slate-800 leading-tight mb-1" dir="rtl">
                      {word.ar}
                    </h2>
                  )}

                  {difficulty === 'EASY' && quizMode && (
                    <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-1 uppercase">
                      {word.en}
                    </h2>
                  )}

                  {(!quizMode) && (
                    <>
                      <p className="text-pink-400 font-bold text-sm italic tracking-wide">{word.tr}</p>
                      <p className="text-slate-400 text-[10px] font-medium mt-0.5">{word.ph}</p>
                    </>
                  )}
                </div>
                <div className="text-slate-200">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>

              {/* Feedback Icons */}
              <AnimatePresence>
                {feedback === 'correct' && quizTarget?.ar === word.ar && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-green-500/10 rounded-[2.5rem] pointer-events-none"
                  >
                    <CheckCircle2 size={80} className="text-green-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="star-animation text-4xl">⭐</div>
                      <div className="star-animation text-4xl [animation-delay:0.2s]">✨</div>
                      <div className="star-animation text-4xl [animation-delay:0.4s]">🌟</div>
                    </div>
                  </motion.div>
                )}
                {feedback === 'wrong' && animatingCard === word.ar && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-red-500/10 rounded-[2.5rem] pointer-events-none"
                  >
                    <XCircle size={80} className="text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Learning Mode Active
          </span>
        </div>
      </footer>

      {/* Success Overlay */}
      <AnimatePresence>
        {feedback === 'correct' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-green-500/20 backdrop-blur-sm pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1.1, rotate: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl border-8 border-green-400 flex flex-col items-center gap-4"
            >
              <div className="text-7xl">🎉</div>
              <p className="text-2xl font-bold text-slate-800">Mumtaz! (Excellent)</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
