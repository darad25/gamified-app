import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Zap, Sparkles, Gem as GemIcon } from 'lucide-react';

const ShopItem = ({ icon: Icon, title, desc, price, color, onBuy }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="glass-card"
        style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '2rem' }}
    >
        <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '1.25rem',
            background: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${color}30`,
            boxShadow: `0 8px 16px ${color}10`
        }}>
            <Icon size={32} color={color} />
        </div>
        <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{desc}</p>
        </div>
        <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBuy(price)}
            style={{
                padding: '0.85rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '1rem'
            }}
        >
            <GemIcon size={18} color="#06b6d4" fill="#06b6d4" />
            <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{price}</span>
        </motion.button>
    </motion.div>
);

const Shop = ({ gems, onBuy }) => {
    const items = [
        { icon: Heart, title: 'Heart Refill', desc: 'Regain full health instantly to stay on your path.', price: 50, color: '#ef4444' },
        { icon: Shield, title: 'Streak Freeze', desc: 'Protects your streak if you miss a day. Must-have for consistency.', price: 100, color: '#3b82f6' },
        { icon: Zap, title: 'XP Booster', desc: 'Earn double XP for the next 15 minutes of activity.', price: 150, color: '#eab308' },
        { icon: Sparkles, title: 'Path Radiance', desc: 'A premium cosmetic glow that signifies your dedication.', price: 200, color: '#a855f7' },
    ];

    return (
        <div style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em' }} className="text-gradient">Path Emporium</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Invest your gems in tools that secure your journey.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {items.map((item, idx) => (
                    <ShopItem key={idx} {...item} onBuy={onBuy} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
