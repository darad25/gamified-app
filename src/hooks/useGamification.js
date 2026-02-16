import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useGamification = () => {
  const [xp, setXp] = useState(() => Number(localStorage.getItem('user_xp')) || 0);
  const [level, setLevel] = useState(() => Number(localStorage.getItem('user_level')) || 1);
  const [gems, setGems] = useState(() => {
    const saved = localStorage.getItem('user_gems');
    return saved !== null ? Number(saved) : 50;
  });
  const [hearts, setHearts] = useState(() => {
    const saved = localStorage.getItem('user_hearts');
    return saved !== null ? Number(saved) : 5;
  });
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('user_streak')) || 0);

  const [completedNodes, setCompletedNodes] = useState(() => {
    const saved = localStorage.getItem('user_completed_nodes');
    return saved ? JSON.parse(saved) : [1];
  });

  const [customHabits, setCustomHabits] = useState(() => {
    const saved = localStorage.getItem('user_custom_habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [showMasteryUp, setShowMasteryUp] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const xpToNextLevel = 100;

  useEffect(() => {
    localStorage.setItem('user_xp', xp);
    localStorage.setItem('user_level', level);
    localStorage.setItem('user_gems', gems);
    localStorage.setItem('user_hearts', hearts);
    localStorage.setItem('user_streak', streak);
    localStorage.setItem('user_completed_nodes', JSON.stringify(completedNodes));
    localStorage.setItem('user_custom_habits', JSON.stringify(customHabits));

    if (xp >= xpToNextLevel) {
      handleMasteryUp();
    }
  }, [xp, level, gems, hearts, streak, completedNodes, customHabits, xpToNextLevel]);

  const handleMasteryUp = () => {
    const overflowXp = xp - xpToNextLevel;
    setXp(overflowXp > 0 ? overflowXp : 0);
    setLevel(prev => prev + 1);
    setGems(prev => prev + 25);
    setShowMasteryUp(true);

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
    setGems(prev => prev + Math.floor(amount / 5));
  };

  const completeQuestNode = (nodeId) => {
    if (!completedNodes.includes(nodeId)) {
      setCompletedNodes(prev => [...prev, nodeId]);
      addXp(50);
      setGems(prev => prev + 10);

      // Update streak upon quest completion
      const today = new Date().toDateString();
      const lastCheckIn = localStorage.getItem('user_last_streak_update');

      if (lastCheckIn !== today) {
        setStreak(prev => prev + 1);
        localStorage.setItem('user_last_streak_update', today);
      }
      return true;
    }
    return false;
  };

  const unlockNextNode = (currentNodeId) => {
    const nextId = currentNodeId + 1;
    if (!completedNodes.includes(nextId)) {
      setCompletedNodes(prev => [...prev, nextId]);
      return true;
    }
    return false;
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

  const addHabit = (habit) => {
    setCustomHabits(prev => [...prev, { ...habit, id: Date.now() }]);
  };

  const deleteHabit = (id) => {
    setCustomHabits(prev => prev.filter(h => h.id !== id));
  };

  return {
    xp, level, gems, hearts, streak, completedNodes, customHabits, xpToNextLevel,
    showMasteryUp, setShowMasteryUp,
    currentView, setCurrentView,
    addXp, completeQuestNode, unlockNextNode, useHeart, buyItem, addHabit, deleteHabit
  };
};

