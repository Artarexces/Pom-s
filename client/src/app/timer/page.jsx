'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";
import { LuRefreshCcw } from "react-icons/lu";

const TIMER_OPTIONS = {
  work: 1 * 60,
  break: 1 * 60,
};

const workGIFS = [
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd255cWJrcXozd2FuNDcza3cxc2drN2MyeDBjY2hpaWR4MHRpajc1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fY0jahqHsqNznkhoaL/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzg3ZHpwMTR2a24yZG1pNGZtaW1vemZ4YmF2NWtwZzF6bHliZnZkcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PVaSEpyzGhjfJTss9b/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlsMTN0cmtzaGM3M3Z0Z3EyNjRhaXRtem8waHpocmkxNWtjaWl3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H4VsPRumdfKAcUGddr/giphy.gif',
];

const breakGIFS = [
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTIwZGtleHFjZjdrNmZzZXRjYW5yc3dqOXkwNDRnNHFxMG96cmZsbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jJ5bSbIau5SnMgEPJv/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnRpOWFqNmM2OXJ5aGVob3FucnBrbGwycW9vYmhyNnpjc29taWppNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SeFRMluv8ESbu/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eGQ1eXJxdHRzZzkxNDRpaTNsbjl5YWdzMzZmNjhzbnA2ejQ1NjNidiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nM2LLy0AeecUOEjEMZ/giphy.gif',
];

const timePage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS.work);
  const [isActive, setIsActive] = useState(false);
  const [gifIndex, setGifIndex] = useState(0);
  const gifRef = useRef(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const manual = sessionStorage.getItem('manualLogin');

    if (token && manual === '1') {
      setChecked(true);
      return;
    }

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('manualLogin');
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
    } catch (e) {}

    router.push('/login');
  }, [router]);

  const gifs = mode === 'work' ? workGIFS : breakGIFS;
  const currentGIF = gifs[gifIndex];

  useEffect(() => {
    if (!checked) return;  

    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const newMode = mode === 'work' ? 'break' : 'work';
      setMode(newMode);
      setTimeLeft(newMode === 'work' ? TIMER_OPTIONS.work : TIMER_OPTIONS.break);
      setGifIndex(0);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, mode, checked]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? TIMER_OPTIONS.work : TIMER_OPTIONS.break);
    setGifIndex(0);
  };

  const changeGIF = newIndex => {
    gsap.to(gifRef.current, {
      opacity: 0, duration: 0.3, onComplete: () => {
        setGifIndex(newIndex)
        gsap.to(gifRef.current, { opacity: 1, duration: 0.3 })
      }
    })
  }
  const prevGIF = () => changeGIF((gifIndex - 1 + gifs.length) % gifs.length)
  const nextGIF = () => changeGIF((gifIndex + 1) % gifs.length)

  const formatTime = sec => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

  if (!checked) return null; 

  return (
    <div className={`min-h-screen m-0 p-0 flex flex-col items-center justify-center text-white transition-colors duration-300 ${mode === 'work' ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700' : 'bg-gradient-to-b from-orange-600 via-orange-700 to-orange-900'}`}>
      <div className="mb-6 text-5xl sm:text-6xl md:text-7xl font-bold text-center cursor-default">
        {formatTime(timeLeft)}
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 ml-4 text-center cursor-default">
        {mode === 'work' ? 'Work work work 💻' : 'Descanso ☕'}
      </h1>
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg flex items-center justify-center mb-6">
        <button
          onClick={prevGIF}
          className="text-4xl text-slate-700 hover:text-slate-200 sm:text-5xl md:text-6xl blur-3xl hover:blur-none border-none outline-none hover:scale-115 transition-all duration-300 cursor-pointer mr-3 z-10"
          label="Anterior"
        >
          <TbArrowBigLeftLines />
        </button>
        <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 flex items-center justify-center">
          <picture>
            <source media="(prefers-reduced-motion: no-preference)" srcSet={currentGIF} />
            <img
              ref={gifRef}
              src={currentGIF}
              alt="GIF" 
              onClick={toggleTimer}
              className="w-full h-full object-cover rounded-full shadow-xl cursor-pointer"
            />
          </picture>
        </div>
        <button
          onClick={nextGIF}
          className="text-4xl text-slate-700 hover:text-slate-200 sm:text-5xl md:text-6xl blur-3xl hover:blur-none border-none outline-none hover:scale-115 transition-all duration-300 cursor-pointer ml-3 z-10"
          label="Siguiente"
        >
          <TbArrowBigRightLines />
        </button>
      </div>
      <div className="flex mb-2 w-50 max-w-xs sm:max-w-md md:max-w-lg justify-center">
        <button
          onClick={toggleTimer}
          className="flex-1 cursor-pointer text-slate-700 hover:text-slate-200 text-xl sm:text-2xl md:text-3xl font-bold blur-2xl hover:blur-none items-center justify-center text-center hover:scale-105 transition-all duration-300 z-10"
        >
          {isActive ? 'Pausa' : 'Inicio'}
        </button>
      </div>
      <div className="flex mb-2 w-50 max-w-xs sm:max-w-md md:max-w-lg justify-center">
        <button
          onClick={resetTimer}
          className="cursor-pointer p-2 items-center justify-center text-center blur-2xl hover:blur-none text-slate-700 hover:text-slate-200 hover:scale-105 transition-all duration-300 z-10"
        >
          <LuRefreshCcw className="text-xl sm:text-2xl md:text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default timePage;
