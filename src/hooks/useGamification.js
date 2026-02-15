import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useGamification = () => {
  const [xp, setXp] = useState(() => Number(localStorage.getItem('user_xp')) || 0);
  const [level, setLevel] = useState(() => Number(localStorage.getItem('user_level')) || 1);
  const [gems, setGems] = useState(() => Number(localStorage.getItem('user_gems')) || 50);
  const [hearts, setHearts] = useState(() => Number(localStorage.getItem('user_hearts')) || 5);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('user_streak')) || 0);

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const xpToNextLevel = level * 100;

  useEffect(() => {
    localStorage.setItem('user_xp', xp);
    localStorage.setItem('user_level', level);
    localStorage.setItem('user_gems', gems);
    localStorage.setItem('user_hearts', hearts);
    localStorage.setItem('user_streak', streak);

    if (xp >= xpToNextLevel) {
      handleLevelUp();
    }
  }, [xp, level, gems, hearts, streak, xpToNextLevel]);

  const handleLevelUp = () => {
    setXp(xp - xpToNextLevel);
    setLevel(prev => prev + 1);
    setGems(prev => prev + 25); // Level up reward
    setShowLevelUp(true);

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const addXp = (amount) => {
    setXp(prev => prev + amount);
    setGems(prev => prev + Math.floor(amount / 5)); // Extra gems for actions
  };

  const useHeart = () => {
    if (hearts > 0) {
      setHearts(prev => prev - 1);
      return true;
    }
    return false;
  };

  const buyItem = (cost) => {
    if (gems >= cost) {
      setGems(prev => prev - cost);
      return true;
    }
    return false;
  };

  return {
    xp, level, gems, hearts, streak, xpToNextLevel,
    showLevelUp, setShowLevelUp,
    currentView, setCurrentView,
    addXp, useHeart, buyItem
  };
};

