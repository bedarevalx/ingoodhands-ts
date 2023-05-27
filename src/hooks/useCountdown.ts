import { useState, useEffect } from 'react';

let timer: NodeJS.Timer | null = null;

export default function useCountdown(time?: number) {
  const [timeLeft, setTimeLeft] = useState(time || 0);
  const [isActive, setIsActive] = useState(false);

  const startTimer = (time: number) => {
    setIsActive(true);
    setTimeLeft(time);
  };

  useEffect(() => {
    timer && clearInterval(timer);
    isActive && countDown();
    return () => {
      timer && clearInterval(timer);
    };
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      timer && clearInterval(timer);
      setIsActive(false);
    }
  }, [timeLeft]);

  const countDown = () => {
    timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  };

  return { timeLeft, startTimer };
}
