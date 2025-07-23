'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TiMediaFastForwardOutline, TiMediaRewindOutline } from 'react-icons/ti';

const TIMER_OPTIONS = {
    work: 1 * 60,
    break: 1 * 60,
};

const workGIFS = [
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExajYxNzA5dGJ0dWg3MHNocXJwZXNkc2IzeGRoemRpZGQ4cHY3YnV6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3mJEekHXkjSCnWGTym/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzg3ZHpwMTR2a24yZG1pNGZtaW1vemZ4YmF2NWtwZzF6bHliZnZkcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PVaSEpyzGhjfJTss9b/giphy.gif',    
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlsMTN0cmtzaGM3M3Z0Z3EyNjRhaXRtem8waHpocmkxNWtjaWl3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H4VsPRumdfKAcUGddr/giphy.gif',
];

const breakGIFS = [
    'https://media.giphy.com/media/zZ93Wx8zrX2XAQVTiy/giphy.gif?cid=790b76112771346a936c80a166cf7324451877af9d48165f&ep=v1_user_favorites&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnRpOWFqNmM2OXJ5aGVob3FucnBrbGwycW9vYmhyNnpjc29taWppNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SeFRMluv8ESbu/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eDc4dTczcXI4Y2QybTdudnNmcGw2azIxcmMyczdodjc5emNuOXBvdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/U6Xgx1pCLMPFaO0Uw3/giphy.gif',
];

const timePage = () => {
    const [mode, setMode ] = useState('work');
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
      gsap.to(gifRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
        setGifIndex(newIndex)
        gsap.to(gifRef.current, { opacity: 1, duration: 0.3 })
      }})
    }
    const prevGIF = () => changeGIF((gifIndex - 1 + gifs.length) % gifs.length)
    const nextGIF = () => changeGIF((gifIndex + 1) % gifs.length)
  
    const formatTime = sec => `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`
  

    return (
        <div className='min-h-screen m-0 p-0 flex flex-col items-center justify-center bg-black text-white'>
          <div className='mb-6 text-7xl font-bold items-center cursor-default'>{formatTime(timeLeft)}</div>
          <h1 className='text-4xl font-bold mb-8 text-center cursor-default'>{mode === 'work' ? 'Hora de trabajar 💻' : 'Descanso ☕'}</h1>
            <button onClick={prevGIF} className="absolute mt-16 left-104 text-6xl rounded bg-green-500 hover:bg-green-600 hover:animate-pulse transition-ease-in-out duration-300 cursor-pointer reverse">
                <TiMediaRewindOutline />
            </button>
          <div className="relative w-72 h-72 mb-6 flex items-center justify-center">
            <img
                ref={gifRef}
                src={currentGIF}
                alt="GIF"
                className="w-full h-full object-cover rounded-lg shadow-xl"
                />
            </div>
            <button onClick={nextGIF} className="absolute mt-16 right-104 text-6xl rounded bg-green-500 hover:animate-pulse transition-ease duration-300 cursor-pointer reverse">
                <TiMediaFastForwardOutline /> 
            </button>
            <div className='flex gap-4'>
              <button onClick={toggleTimer} className="cursor-pointer text-center text-white bg-green-500 hover:bg-green-600 p-2 hover:animate-pulse rounded-2xl">
              {isActive ? '⏸ Pausar' : '▶ Iniciar'} </button>
              <button onClick={resetTimer} className="cursor-pointer text-center text-white bg-green-500 hover:bg-red-600 p-2 hover:animate-pulse rounded-2xl">
                 Resetear 
              </button>
            </div>
        </div>
    );
};

export default timePage;
