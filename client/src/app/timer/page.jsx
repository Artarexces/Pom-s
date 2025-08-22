'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";
import { LuRefreshCcw } from "react-icons/lu";

const TIMER_OPTIONS = {
  work: 30 * 60,
  break: 10 * 60,
};

const workGIFS = [
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExajYxNzA5dGJ0dWg3MHNocXJwZXNkc2IzeGRoemRpZGQ4cHY3YnV6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3mJEekHXkjSCnWGTym/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzg3ZHpwMTR2a24yZG1pNGZtaW1vemZ4YmF2NWtwZzF6bHliZnZkcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PVaSEpyzGhjfJTss9b/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlsMTN0cmtzaGM3M3Z0Z3EyNjRhaXRtem8waHpocmkxNWtjaWl3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H4VsPRumdfKAcUGddr/giphy.gif',
];

const breakGIFS = [
  'https://media.giphy.com/media/zZ93Wx8zrX2XAQVTiy/giphy.gif?cid=790b76112771346a936c80a166cf7324451877af9d48165f&ep=v1_user_favorites&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnRpOWFqNmM2OXJ5aGVob3FucnBrbGwycW9vYmhyNnpjc29taWppNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SeFRMluv8ESbu/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eGQ1eXJxdHRzZzkxNDRpaTNsbjl5YWdzMzZmNjhzbnA2ejQ1NjNidiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nM2LLy0AeecUOEjEMZ/giphy.gif',
];

const timePage = () => {
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS.work);
  const [isActive, setIsActive] = useState(false);
  const [gifIndex, setGifIndex] = useState(0);
  const gifRef = useRef(null);

  const gifs = mode === 'work' ? workGIFS : breakGIFS;
  const currentGIF = gifs[gifIndex];

  useEffect(() => {
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
  }, [isActive, timeLeft, mode]);

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


  return (
    <div className="min-h-screen m-0 p-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-700 text-white">
      <div className="mb-6 mr-2 text-5xl sm:text-6xl md:text-7xl font-bold text-center cursor-default">
        {formatTime(timeLeft)}
      </div>
      <h1 className="text-2xl ml-1.5 sm:text-3xl md:text-4xl font-bold mb-8 text-center cursor-default">
        {mode === 'work' ? 'Work work work 💻' : 'Descanso ☕'}
      </h1>
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg flex items-center justify-center mb-6">
        <button
          onClick={prevGIF}
          className="text-4xl sm:text-5xl md:text-6xl rounded bg-gradient-to-l from-slate-800 to-slate-700 hover:scale-115 transition-all duration-300 cursor-pointer mr-2"
          aria-label="Anterior"
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
              className="w-full h-full object-cover rounded-full shadow-xl"
            />
          </picture>
        </div>
        <button
          onClick={nextGIF}
          className="text-4xl sm:text-5xl md:text-6xl rounded bg-gradient-to-r from-slate-700 to-slate-800 hover:scale-115 transition-all duration-300 cursor-pointer ml-2"
          aria-label="Siguiente"
        >
          <TbArrowBigRightLines />
        </button>
      </div>
      <div className="flex mb-2 w-60 max-w-xs sm:max-w-md md:max-w-lg justify-center">
        <button
          onClick={toggleTimer}
          className="flex-1 cursor-pointer items-center justify-center text-center text-white bg-gradient-to-b from-slate-700 to-slate-900 px-4 py-2 rounded-2xl hover:scale-105 transition-all duration-300"
        >
          {isActive ? 'Pausa' : 'Inicio'}
        </button>
      </div>
      <div className="flex mb-2 w-50 max-w-xs sm:max-w-md md:max-w-lg justify-center">
        <button
          onClick={resetTimer}
          className="cursor-pointer p-2 items-center justify-center text-center text-white bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl hover:scale-105 transition-all duration-300"
        >
          <LuRefreshCcw className="text-xl sm:text-2xl md:text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default timePage;
