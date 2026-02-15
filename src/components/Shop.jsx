import React from 'react';

const ShopItem = ({ icon, title, desc, price, color, onBuy }) => (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '1rem',
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        }}>
            {icon}
        </div>
        <div style={{ flex: 1 }}>
            <h3 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>{title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</p>
        </div>
        <button
            onClick={() => onBuy(price)}
            style={{
                padding: '0.75rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}
        >
            <span>💎</span>
            <span style={{ fontWeight: '700' }}>{price}</span>
        </button>
    </div>
);

const Shop = ({ gems, onBuy }) => {
    const items = [
        { icon: '❤️', title: 'Heart Refill', desc: 'Regain full health instantly.', price: 50, color: '#ef4444' },
        { icon: '🛡️', title: 'Streak Freeze', desc: 'Protects your streak if you miss a day.', price: 100, color: '#3b82f6' },
        { icon: '⚡', title: 'XP Booster', desc: 'Earn double XP for the next 15 minutes.', price: 150, color: '#eab308' },
        { icon: '✨', title: 'Path Radiance', desc: 'A purely cosmetic glow for your profile.', price: 200, color: '#a855f7' },
    ];

    return (
        <div style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Path Emporium</h2>
                <p style={{ color: 'var(--text-muted)' }}>Use your earned gems to buy powerful items for your journey.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map((item, idx) => (
                    <ShopItem key={idx} {...item} onBuy={onBuy} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
