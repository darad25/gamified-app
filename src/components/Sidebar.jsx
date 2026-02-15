import React from 'react';

const Sidebar = ({ currentView, setView, gems, hearts }) => {
    const menuItems = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'map', icon: '🗺️', label: 'Daily Path' },
        { id: 'shop', icon: '🛍️', label: 'Shop' },
        { id: 'profile', icon: '👤', label: 'Profile' }
    ];

    return (
        <div className="glass" style={{
            width: '240px',
            height: 'calc(100vh - 40px)',
            position: 'fixed',
            left: '20px',
            top: '20px',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10
        }}>
            <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                    <span style={{ color: 'var(--primary)' }}>DAILY</span> PATH
                </h1>
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: currentView === item.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                            color: currentView === item.id ? 'var(--primary)' : 'var(--text-muted)',
                            marginBottom: '0.5rem',
                            borderRadius: '1rem',
                            textAlign: 'left',
                            border: 'none'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        <span style={{ fontWeight: '600' }}>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span>❤️</span>
                    <span style={{ fontWeight: '700' }}>{hearts}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hearts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span>💎</span>
                    <span style={{ fontWeight: '700' }}>{gems}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gems</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
