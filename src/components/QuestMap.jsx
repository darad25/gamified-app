import React from 'react';

const QuestNode = ({ node, status, onSelect }) => {
    const getColors = () => {
        switch (status) {
            case 'completed': return { bg: 'var(--accent)', icon: '✓' };
            case 'active': return { bg: 'var(--primary)', icon: '▶️', glow: true };
            default: return { bg: '#334155', icon: '🔒' };
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
            <button
                onClick={() => status !== 'locked' && onSelect(node)}
                style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: glow ? '0 0 25px var(--primary-glow)' : 'none',
                    cursor: status === 'locked' ? 'not-allowed' : 'pointer',
                    zIndex: 2,
                    fontSize: '1.5rem'
                }}
            >
                {icon}
            </button>
            <div style={{
                marginTop: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                color: status === 'locked' ? 'var(--text-muted)' : 'var(--text)'
            }}>
                {node.title}
            </div>
        </div>
    );
};

const QuestMap = ({ level, onStartQuest }) => {
    const nodes = [
        { id: 1, title: 'Basics 1', offset: 0 },
        { id: 2, title: 'Greetings', offset: 40 },
        { id: 3, title: 'Schedule', offset: -30 },
        { id: 4, title: 'Routines', offset: 20 },
        { id: 5, title: 'Challenge', offset: 0 },
        { id: 6, title: 'Travel', offset: -40 },
        { id: 7, title: 'Dining', offset: 30 },
    ];

    return (
        <div style={{
            padding: '4rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")'
        }}>
            {nodes.map((node, index) => {
                let status = 'locked';
                if (index < level - 1) status = 'completed';
                else if (index === level - 1) status = 'active';

                return (
                    <React.Fragment key={node.id}>
                        <QuestNode
                            node={node}
                            status={status}
                            onSelect={onStartQuest}
                        />
                        {index < nodes.length - 1 && (
                            <div style={{
                                width: '4px',
                                height: '4rem',
                                background: index < level - 1 ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                                margin: '0.5rem 0',
                                position: 'relative',
                                left: `${(nodes[index].offset + nodes[index + 1].offset) / 2}px`,
                                zIndex: 1
                            }} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default QuestMap;
