import React from 'react';
import { motion } from 'framer-motion';

const LevelBar = ({ level, xp, xpToNextLevel, plannedXp = 0 }) => {
    const earnedProgress = (xp / xpToNextLevel) * 100;
    const projectedProgress = ((xp + plannedXp) / xpToNextLevel) * 100;

    return (
        <div className="glass" style={{ padding: '2rem', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
                <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Journey Progress</p>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>Path Mastery {level}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text)' }}>
                        {xp === 0 && plannedXp > 0 ? (
                            <span style={{ color: 'var(--primary)', opacity: 0.9 }}>{plannedXp}</span>
                        ) : (
                            <>
                                {xp} {plannedXp > 0 && <span style={{ color: 'var(--primary)', opacity: 0.9 }}>+ {plannedXp}</span>}
                            </>
                        )} <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>/ {xpToNextLevel} XP</span>
                    </p>
                </div>
            </div>

            <div style={{ height: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative' }}>
                {/* Projected XP Layer (background, lighter) */}
                {plannedXp > 0 && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(projectedProgress, 100)}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                            opacity: 0.3,
                            zIndex: 1
                        }}
                    />
                )}

                {/* Earned XP Layer (foreground, solid) */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(earnedProgress, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        position: 'relative',
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                        boxShadow: '0 0 20px var(--primary-glow)',
                        zIndex: 2
                    }}
                >
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '30%', height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default LevelBar;
