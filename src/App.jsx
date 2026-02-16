import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import LevelBar from './components/LevelBar';
import HabitCard from './components/HabitCard';
import QuestMap from './components/QuestMap';
import Shop from './components/Shop';
import AddHabitModal from './components/AddHabitModal';
import { useGamification } from './hooks/useGamification';
import { initialHabits } from './data/initialHabits';
import { Zap, Trophy, Flame, Plus, ArrowRight, User } from 'lucide-react';

function App() {
  const {
    xp, level, gems, hearts, streak, completedNodes, customHabits, xpToNextLevel,
    showMasteryUp, setShowMasteryUp,
    currentView, setCurrentView,
    addXp, completeQuestNode, unlockNextNode, useHeart, buyItem, addHabit, deleteHabit
  } = useGamification();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleComplete = (habit) => {
    addXp(habit.xp);
  };

  const handleBuy = (price) => {
    const success = buyItem(price);
    if (!success) {
      alert("Not enough Gems!");
    }
  };

  const handleCompleteQuest = (nodeId) => {
    completeQuestNode(nodeId);
  };

  const renderView = () => {
    const currentHabitsList = [...initialHabits, ...customHabits];
    const totalPlannedXp = currentHabitsList.reduce((acc, h) => acc + h.xp, 0);

    switch (currentView) {
      case 'map':
        return <QuestMap xp={xp} level={level} completedNodes={completedNodes} onCompleteQuest={handleCompleteQuest} plannedXp={totalPlannedXp} />;
      case 'shop':
        return <Shop gems={gems} onBuy={handleBuy} />;
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ padding: '4rem 2rem', textAlign: 'center' }}
          >
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <User size={60} color="white" />
            </div>
            <h2 className="text-gradient" style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem' }}>Wayfinder</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>Path Mastery {level}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GEMS</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>{gems}</p>
              </div>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>STREAK</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>{streak}d</p>
              </div>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>MASTERY</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>{completedNodes.length}</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <LevelBar level={level} xp={xp} xpToNextLevel={xpToNextLevel} plannedXp={totalPlannedXp} />

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '3rem' }}>
              <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid var(--primary)' }}>
                <Zap size={28} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>MASTERY {level} PROJECTION</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>
                  {xp === 0 && totalPlannedXp > 0 ? (
                    <span style={{ color: 'var(--primary)', opacity: 0.8 }}>{totalPlannedXp}</span>
                  ) : (
                    <>
                      {xp} {totalPlannedXp > 0 && <span style={{ color: 'var(--primary)', opacity: 0.8 }}>+ {totalPlannedXp}</span>}
                    </>
                  )} <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>/ 100</span>
                </p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid var(--accent)' }}>
                <Trophy size={28} color="var(--accent)" style={{ marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL PROJECTED XP</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>{(level - 1) * 100 + xp + totalPlannedXp}</p>
              </motion.div>
            </div>

            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Today's Quest</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Complete tasks to unlock the next path node</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'var(--primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    boxShadow: '0 8px 16px var(--primary-glow)'
                  }}
                >
                  <Plus size={18} />
                  Add Task
                </motion.button>
              </div>

              {currentHabitsList.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Potential Mastery Progress
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--primary)' }}>
                      {totalPlannedXp} XP PLANNED
                    </span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((totalPlannedXp / 100) * 100, 100)}%` }}
                      style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <AnimatePresence>
                  {currentHabitsList.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onComplete={handleComplete}
                      isCustom={customHabits.some(h => h.id === habit.id)}
                      onDelete={deleteHabit}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {currentHabitsList.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
                  >
                    ✨
                  </motion.div>
                  <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text)' }}>Your path is clear!</p>
                  <p style={{ marginTop: '0.5rem' }}>Add your first task to start earning Path Mastery XP.</p>
                </div>
              )}
            </section>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        setView={setCurrentView}
        gems={gems}
        hearts={hearts}
      />

      <main className="main-content">
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', opacity: 0.8 }}>
              {currentView.toUpperCase()}
            </h2>
          </div>
          <div className="glass" style={{ padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '1.5rem' }}>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Flame size={20} color="var(--secondary)" fill="var(--secondary)" />
            </motion.div>
            <span style={{ fontWeight: '800', fontSize: '1rem' }}>{streak} Day Streak</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addHabit}
      />

      <AnimatePresence>
        {showMasteryUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(15, 23, 42, 0.95)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem',
              backdropFilter: 'blur(15px)'
            }}
            onClick={() => setShowMasteryUp(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -15, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="glass"
              style={{ padding: '4rem', textAlign: 'center', maxWidth: '450px', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ fontSize: '6rem', marginBottom: '2rem' }}
              >
                🏆
              </motion.div>
              <h2 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: '950', marginBottom: '1rem', letterSpacing: '-0.04em' }}>MASTERY UP!</h2>
              <p style={{ marginBottom: '2.5rem', fontSize: '1.25rem', color: 'var(--text-muted)' }}>You've reached Path Mastery {level}! Your journey expands.</p>

              <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <Zap size={24} color="#06b6d4" fill="#06b6d4" />
                <span style={{ fontWeight: '900', fontSize: '1.25rem', color: '#06b6d4' }}>+25 GEMS EARNED</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMasteryUp(false)}
                style={{
                  background: 'var(--primary)', color: 'white', padding: '1.25rem 2.5rem',
                  width: '100%', fontSize: '1.2rem', fontWeight: '900', boxShadow: '0 15px 30px var(--primary-glow)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                }}
              >
                Continue Journey
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
