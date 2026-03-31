import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GameContext } from '../../App';
import { Camera, Zap, Target, Layers, Activity, Play } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const { state, rank, nextLevelXp } = useContext(GameContext);
    const { player } = state;

    const stats = [
        { label: "Images Analyzed", value: player.imagesProcessed, icon: <Camera size={24} /> },
        { label: "Edges Detected", value: player.objectsDetected * 12, icon: <Zap size={24} /> },
        { label: "Contours Found", value: player.objectsDetected * 8, icon: <Target size={24} /> },
        { label: "Filters Applied", value: player.filtersApplied, icon: <Layers size={24} /> }
    ];

    const progress = (player.xp / nextLevelXp) * 100;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="player-profile"
                >
                    <div className="avatar-frame">
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.codename}`} alt="Avatar" />
                    </div>
                    <div className="profile-info">
                        <h1>{player.codename}</h1>
                        <p className="rank-text">{rank}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="level-badge"
                >
                    <span className="level-label">OP. LEVEL</span>
                    <span className="level-value">{player.level}</span>
                </motion.div>
            </header>

            <section className="xp-section">
                <div className="xp-header">
                    <span>NEURAL LINK XP</span>
                    <span>{player.xp} / {nextLevelXp} XP</span>
                </div>
                <div className="xp-bar-container">
                    <motion.div
                        className="xp-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </div>
            </section>

            <motion.div 
                className="action-center-panel panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="action-content">
                    <h2>SYSTEM READY</h2>
                    <p>Your neural-link is stable. Awaiting commands for the next vision training module.</p>
                </div>
                <Link to="/skill-tree" style={{ textDecoration: 'none' }}>
                    <button className="primary-cta-btn">
                        <Play size={20} fill="currentColor" /> ENTER SIMULATION
                    </button>
                </Link>
            </motion.div>

            <div className="dashboard-grid">
                <section className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="stat-card panel"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </section>

                <section className="activity-feed panel">
                    <h2 className="section-title"><Activity size={20} /> ACTIVITY LOGS</h2>
                    <div className="feed-items">
                        <div className="feed-item terminal-text">
                            <span className="feed-time">[SYSTEM]</span>
                            <span className="feed-msg">Biometrics synchronized. Welcome back.</span>
                        </div>
                        {state.missionHistory.length === 0 ? (
                            <p className="empty-feed">NO MISSION COMPLETED. AWAITING FIRST DEPLOYMENT.</p>
                        ) : (
                            state.missionHistory.slice(-5).reverse().map((log, i) => (
                                <div key={i} className="feed-item">
                                    <span className="feed-time">[{new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                                    <span className="feed-msg">{log.message}</span>
                                </div>
                            ))
                        )}
                        <div className="feed-item terminal-text">
                            <span className="feed-time">[AWAIT]</span>
                            <span className="feed-msg blink">_</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
