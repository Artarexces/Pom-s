'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TIMER_OPTIONS = {
    workTime: 25 * 60,
    breakTime: 5 * 60,
    breakTimeLong: 15 * 60,
    workTimeLong: 30 * 60,
    cycles: 4,
};

const workGIFS = [
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExajYxNzA5dGJ0dWg3MHNocXJwZXNkc2IzeGRoemRpZGQ4cHY3YnV6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3mJEekHXkjSCnWGTym/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemhrbGd4a2k3ZHE4YWM3YmRzNmR5cW53eTk1MXhoOWVxdzlla3ZkeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/utFF9A5SqkhnIJg4pI/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzg3ZHpwMTR2a24yZG1pNGZtaW1vemZ4YmF2NWtwZzF6bHliZnZkcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PVaSEpyzGhjfJTss9b/giphy.gif',    
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlsMTN0cmtzaGM3M3Z0Z3EyNjRhaXRtem8waHpocmkxNWtjaWl3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H4VsPRumdfKAcUGddr/giphy.gif',
];

const breakGIFS = [
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW90NzA3enVka3k5bTRkOWk3bjFhMDF1bTRxOWw2eXJ6MTZ3ZzhkNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qMTbdqgahcJIoMJd9b/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHZtMGl0OTN2N2xsMWxyNGlmbXBuMmdtNzh2Nm13ODk2dmozbHJ2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41JJ4quNAg8QfNHa/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eDc4dTczcXI4Y2QybTdudnNmcGw2azIxcmMyczdodjc5emNuOXBvdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/U6Xgx1pCLMPFaO0Uw3/giphy.gif',
];

const timePage = () => {
    const [mode, setMode ] = useState( 'work' | 'workLong' | 'break' | 'longBreak' );
    const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS.workTime);
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
        setTimeLeft(newMode === 'work' ? TIMER_OPTIONS.workTime : TIMER_OPTIONS.breakTime);
        setGifIndex(0);
      }
      return () => clearInterval(timer);  
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'work' ? TIMER_OPTIONS.workTime : TIMER_OPTIONS.breakTime);
        setGifIndex(0);
    };

    const nextGIF = () => {
        gsap.to(gifRef.current, {
            duration: 1,
            opacity: 0,
            onComplete: () => {
                setGifIndex((prev) => (prev + 1) % gifs.length);
                gsap.to(gifRef.current, {
                    duration: 1,
                    opacity: 1,
                });
            },
        });
    }

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">{mode}</h1>
            <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
            <button onClick={toggleTimer} className="bg-blue-500 text-white px-4 py-2 rounded">
                {isActive ? 'Pausar' : 'Iniciar'}
            </button>
            <button onClick={resetTimer} className="bg-red-500 text-white px-4 py-2 rounded">
                Resetear
            </button>
            <img ref={gifRef} src={currentGIF} alt="GIF" className="mt-4" />
        </div>
    );
};

export default timePage;
