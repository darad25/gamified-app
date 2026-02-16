import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles, Target, Zap } from 'lucide-react';

const AddHabitModal = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Personal');
    const [xp] = useState(20);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, category, xp });
        setTitle('');
        onClose();
    };

    const categories = ['Health', 'Work', 'Personal', 'Mindset', 'Growth'];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                        padding: '1rem'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="glass"
                        style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Add New Task</h2>
                            <button onClick={onClose} style={{ background: 'transparent', padding: '0.5rem' }}>
                                <X size={20} color="var(--text-muted)" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Task Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Morning Meditation"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{
                                        width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--glass-border)', borderRadius: '0.75rem', color: 'white'
                                    }}
                                    autoFocus
                                />
                            </div>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Category</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setCategory(cat)}
                                            style={{
                                                padding: '0.5rem 1rem', fontSize: '0.85rem',
                                                background: category === cat ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                                                color: category === cat ? 'white' : 'var(--text-muted)',
                                                borderRadius: '2rem'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    fontSize: '1rem', fontWeight: '700', boxShadow: '0 10px 20px var(--primary-glow)'
                                }}
                            >
                                <Plus size={20} />
                                Create Task
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddHabitModal;
