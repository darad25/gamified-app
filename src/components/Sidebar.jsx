import React from 'react';
import { Home, Map, ShoppingBag, User, Heart, Gem } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ currentView, setView, gems, hearts }) => {
    const menuItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'map', icon: Map, label: 'Map' },
        { id: 'shop', icon: ShoppingBag, label: 'Shop' },
        { id: 'profile', icon: User, label: 'Profile' }
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="glass desktop-sidebar" style={{
                width: '260px',
                height: 'calc(100vh - 40px)',
                position: 'fixed',
                left: '20px',
                top: '20px',
                padding: '2.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10
            }}>
                <div style={{ marginBottom: '3.5rem', padding: '0 1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
                        <span style={{ color: 'var(--primary)', textShadow: '0 0 15px var(--primary-glow)' }}>DAILY</span> PATH
                    </h1>
                </div>

                <nav style={{ flex: 1 }}>
                    {menuItems.map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setView(item.id)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.25rem',
                                background: currentView === item.id ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                                color: currentView === item.id ? 'var(--primary)' : 'var(--text-muted)',
                                marginBottom: '0.75rem',
                                borderRadius: '1.25rem',
                                textAlign: 'left',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {currentView === item.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    style={{ position: 'absolute', left: 0, width: '4px', height: '20px', background: 'var(--primary)', borderRadius: '0 4px 4px 0' }}
                                />
                            )}
                            <item.icon size={22} strokeWidth={currentView === item.id ? 2.5 : 2} />
                            <span style={{ fontWeight: '700', fontSize: '1rem' }}>{item.label}</span>
                        </motion.button>
                    ))}
                </nav>

                <div className="glass-card" style={{ marginTop: 'auto', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Heart size={20} color="#ef4444" fill="#ef4444" />
                        </motion.div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Hearts</p>
                            <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{hearts}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                            <Gem size={20} color="#06b6d4" fill="#06b6d4" />
                        </motion.div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Gems</p>
                            <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{gems}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="glass mobile-bottom-nav" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'none',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(30, 41, 59, 0.95)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid var(--glass-border)',
                zIndex: 100,
                borderRadius: 0
            }}>
                {menuItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setView(item.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.5rem 1rem',
                            background: 'transparent',
                            color: currentView === item.id ? 'var(--primary)' : 'var(--text-muted)',
                            borderRadius: '0.75rem',
                            position: 'relative',
                            minWidth: '60px'
                        }}
                    >
                        <item.icon size={24} strokeWidth={currentView === item.id ? 2.5 : 2} />
                        <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>{item.label}</span>
                        {currentView === item.id && (
                            <motion.div
                                layoutId="mobileActiveTab"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '32px',
                                    height: '3px',
                                    background: 'var(--primary)',
                                    borderRadius: '0 0 4px 4px'
                                }}
                            />
                        )}
                    </motion.button>
                ))}
            </nav>

            <style>{`
                @media (max-width: 767px) {
                    .desktop-sidebar {
                        display: none !important;
                    }
                    .mobile-bottom-nav {
                        display: flex !important;
                    }
                }
                @media (min-width: 768px) {
                    .desktop-sidebar {
                        display: flex !important;
                    }
                    .mobile-bottom-nav {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Sidebar;
