import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LevelBar from './components/LevelBar';
import HabitCard from './components/HabitCard';
import QuestMap from './components/QuestMap';
import Shop from './components/Shop';
import { useGamification } from './hooks/useGamification';
import { initialHabits } from './data/initialHabits';

function App() {
  const {
    xp, level, gems, hearts, streak, xpToNextLevel,
    showLevelUp, setShowLevelUp,
    currentView, setCurrentView,
    addXp, useHeart, buyItem
  } = useGamification();

  const [habits, setHabits] = useState(initialHabits);

  const handleComplete = (habit) => {
    addXp(habit.xp);
  };

  const handleBuy = (price) => {
    const success = buyItem(price);
    if (!success) {
      alert("Not enough Gems!");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'map':
        return <QuestMap level={level} onStartQuest={() => setCurrentView('home')} />;
      case 'shop':
        return <Shop gems={gems} onBuy={handleBuy} />;
      case 'profile':
        return (
          <div className="glass p-8 text-center">
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '800' }}>Wayfinder Profile</h2>
            <p style={{ color: 'var(--text-muted)' }}>Level {level} Path Master</p>
          </div>
        );
      default:
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <LevelBar level={level} xp={xp} xpToNextLevel={xpToNextLevel} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>⚡</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Focus Score</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>92%</p>
              </div>
              <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>🏆</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Achievements</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>14</p>
              </div>
            </div>
            <section>
              <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                  <span style={{ color: 'var(--primary)' }}>DAILY</span> PATH
                </h1>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {habits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} onComplete={handleComplete} />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'red', color: 'white', zIndex: 9999, padding: '5px', textAlign: 'center', fontSize: '10px' }}>
        DAILY PATH DEBUG MODE - IF YOU SEE THIS, REACT IS RENDERING
      </div>
      <Sidebar
        currentView={currentView}
        setView={setCurrentView}
        gems={gems}
        hearts={hearts}
      />

      <main className="main-content">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div className="glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '1rem' }}>
            <span>🔥</span>
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{streak} Day Streak</span>
          </div>
        </header>

        <div key={currentView}>
          {renderView()}
        </div>
      </main>

      {showLevelUp && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.9)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '2rem'
          }}
          onClick={() => setShowLevelUp(false)}
        >
          <div
            className="glass"
            style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>LEVEL UP!</h2>
            <p style={{ marginBottom: '1.5rem' }}>You've reached Level {level}! Your path continues...</p>
            <div className="glass-card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>💎</span>
              <span style={{ fontWeight: '700' }}>+25 Gems Earned!</span>
            </div>
            <button
              onClick={() => setShowLevelUp(false)}
              style={{
                background: 'var(--primary)', color: 'white', padding: '1rem 2rem',
                width: '100%', fontSize: '1.1rem', boxShadow: '0 0 20px var(--primary-glow)'
              }}
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
