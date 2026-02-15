import React from 'react';

const HabitCard = ({ habit, onComplete }) => {
    return (
        <div
            className="glass-card p-4 flex items-center justify-between group"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem',
                marginBottom: '1rem',
                cursor: 'default'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="glass" style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)'
                }}>
                    <span style={{ fontSize: '1.25rem' }}>✨</span>
                </div>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{habit.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{habit.category} • +{habit.xp} XP</p>
                </div>
            </div>

            <button
                onClick={() => onComplete(habit)}
                className="glow"
                style={{
                    background: 'var(--primary)',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%'
                }}
            >
                ✓
            </button>
        </div>
    );
};

export default HabitCard;
