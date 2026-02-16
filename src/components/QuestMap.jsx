import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Play, Trophy, Star, ShieldAlert } from 'lucide-react';

const QuestNode = ({ node, status, onSelect, xpRequired, currentXp }) => {
    const getColors = () => {
        switch (status) {
            case 'completed': return { bg: 'var(--accent)', icon: <Check size={28} />, glow: false };
            case 'active': return { bg: 'var(--primary)', icon: <Play size={28} fill="white" />, glow: true };
            default: return { bg: '#334155', icon: <Lock size={24} />, glow: false };
        }
    };

    const { bg, icon, glow } = getColors();

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            left: `${node.offset}px`
        }}>
            <motion.button
                whileHover={status !== 'locked' ? { scale: 1.1, translateY: -5 } : {}}
                whileTap={status !== 'locked' ? { scale: 0.9 } : {}}
                onClick={() => onSelect(node, status)}
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    border: '6px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: glow ? '0 0 30px var(--primary-glow)' : 'none',
                    cursor: status === 'locked' ? 'help' : 'pointer',
                    zIndex: 2,
                    position: 'relative'
                }}
            >
                {glow && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px solid var(--primary)',
                            zIndex: -1
                        }}
                    />
                )}
                {icon}
            </motion.button>
            <div style={{
                marginTop: '1rem',
                fontSize: '1rem',
                fontWeight: '800',
                color: status === 'locked' ? 'var(--text-muted)' : 'var(--text)',
                textShadow: status === 'active' ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none',
                textAlign: 'center'
            }}>
                {node.title}
                {status === 'locked' && (
                    <div style={{ fontSize: '0.7rem', fontWeight: '400', color: 'var(--secondary)', marginTop: '0.25rem' }}>
                        {xpRequired} XP Required
                    </div>
                )}
            </div>
        </div>
    );
};

const QuestMap = ({ xp, level, completedNodes, onCompleteQuest, plannedXp = 0 }) => {
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [showLockedMessage, setShowLockedMessage] = useState(null);

    // Total XP calculation includes both EARNED and PLANNED XP
    const totalXp = (level - 1) * 100 + xp + plannedXp;

    const nodes = [
        { id: 1, title: 'Basics 1', offset: 0, xpRequired: 0, description: 'Learn the fundamentals of your new routine.' },
        { id: 2, title: 'Greetings', offset: 50, xpRequired: 100, description: 'Master the art of positive daily check-ins.' },
        { id: 3, title: 'Schedule', offset: -40, xpRequired: 250, description: 'Align your energy with your calendar.' },
        { id: 4, title: 'Routines', offset: 30, xpRequired: 450, description: 'Build unbreakable habits that stick.' },
        { id: 5, title: 'Challenge', offset: 0, xpRequired: 700, description: 'The ultimate test of your new path.' },
        { id: 6, title: 'Travel', offset: -50, xpRequired: 1000, description: 'Maintain your path even on the go.' },
        { id: 7, title: 'Dining', offset: 40, xpRequired: 1400, description: 'Fuel your body for the journey ahead.' },
    ];

    const handleSelectNode = (node, status) => {
        if (status === 'locked') {
            setShowLockedMessage(node);
            setTimeout(() => setShowLockedMessage(null), 3000);
            return;
        }
        setSelectedQuest(node);
    };

    const handleFinishQuest = () => {
        onCompleteQuest(selectedQuest.id);
        setSelectedQuest(null);
    };

    return (
        <div style={{
            padding: '4rem 2rem 10rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '5rem',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}>
            {/* XP Status Header for the Map */}
            <div className="glass" style={{ padding: '1rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800' }}>TOTAL JOURNEY XP</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' }}>{totalXp}</p>
                </div>
            </div>

            {nodes.map((node, index) => {
                const isCompleted = completedNodes.includes(node.id);
                const prevNodeCompleted = index === 0 || completedNodes.includes(nodes[index - 1].id);
                const hasEnoughXp = totalXp >= node.xpRequired;

                const isUnlocked = prevNodeCompleted && hasEnoughXp;
                const status = isCompleted ? 'completed' : (isUnlocked ? 'active' : 'locked');

                return (
                    <React.Fragment key={node.id}>
                        <QuestNode
                            node={node}
                            status={status}
                            onSelect={handleSelectNode}
                            xpRequired={node.xpRequired}
                            currentXp={totalXp}
                        />
                        {index < nodes.length - 1 && (
                            <div style={{
                                width: '6px',
                                height: '5rem',
                                background: completedNodes.includes(nodes[index].id) ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                                margin: '0.5rem 0',
                                position: 'relative',
                                left: `${(nodes[index].offset + nodes[index + 1].offset) / 2}px`,
                                zIndex: 1,
                                borderRadius: '3px'
                            }} />
                        )}
                    </React.Fragment>
                );
            })}

            <AnimatePresence>
                {showLockedMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="glass"
                        style={{
                            position: 'fixed', bottom: '2rem', padding: '1rem 2rem',
                            background: 'var(--secondary)', color: 'white', fontWeight: '700',
                            display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1000
                        }}
                    >
                        <ShieldAlert size={20} />
                        You need {showLockedMessage.xpRequired} XP and to complete previous nodes!
                    </motion.div>
                )}

                {selectedQuest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                        }}
                        onClick={() => setSelectedQuest(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.9 }}
                            className="glass"
                            style={{ padding: '3rem', maxWidth: '450px', width: '90%', textAlign: 'center' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)',
                                margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 20px var(--primary-glow)'
                            }}>
                                <Star size={40} color="white" fill="white" />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>{selectedQuest.title}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                {selectedQuest.description}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setSelectedQuest(null)}
                                    style={{ flex: 1, padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text)' }}
                                >
                                    Maybe Later
                                </button>
                                <button
                                    onClick={handleFinishQuest}
                                    style={{ flex: 2, padding: '1rem', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                >
                                    <Trophy size={20} />
                                    Start Quest
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuestMap;
