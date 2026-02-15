import React from 'react';

const LevelBar = ({ level, xp, xpToNextLevel }) => {
    const progress = (xp / xpToNextLevel) * 100;

    return (
        <div className="glass p-6 mb-8" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
                <div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Status</p>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '700' }}>Level {level}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{xp} / {xpToNextLevel} XP</p>
                </div>
            </div>

            <div style={{ height: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                        boxShadow: '0 0 15px var(--primary-glow)',
                        transition: 'width 0.3s ease'
                    }}
                />
            </div>
        </div>
    );
};

export default LevelBar;
