import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const HabitCard = ({ habit, onComplete, isCustom, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, background: 'rgba(255, 255, 255, 0.05)' }}
            className="glass-card"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                marginBottom: '0.75rem',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div className="glass" style={{
                    width: '52px',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    {isCustom ? <Sparkles size={24} color="var(--primary)" /> : <span style={{ fontSize: '1.5rem' }}>✨</span>}
                </div>
                <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text)', marginBottom: '0.2rem' }}>{habit.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', color: 'var(--text-muted)' }}>
                            {habit.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)' }}>
                            +{habit.xp} XP
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {isCustom && (
                    <button
                        onClick={() => onDelete(habit.id)}
                        style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '0.5rem' }}
                    >
                        Remove
                    </button>
                )}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onComplete(habit)}
                    className="glow"
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '14px',
                        boxShadow: '0 8px 16px var(--primary-glow)'
                    }}
                >
                    <Check size={22} strokeWidth={3} />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default HabitCard;
