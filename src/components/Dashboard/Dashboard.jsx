import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../App';
import { Camera, Zap, Target, Layers, Activity } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const { state, rank, nextLevelXp } = useContext(GameContext);
    const { player } = state;

    const stats = [
        { label: "Images Processed", value: player.imagesProcessed, icon: <Camera size={18} /> },
        { label: "Edges Detected", value: player.objectsDetected * 12, icon: <Zap size={18} /> },
        { label: "Contours Found", value: player.objectsDetected * 8, icon: <Target size={18} /> },
        { label: "Frames Analyzed", value: player.imagesProcessed * 4, icon: <Activity size={18} /> },
        { label: "Filters Applied", value: player.filtersApplied, icon: <Layers size={18} /> }
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
                        <h1 className="glow-text">{player.codename}</h1>
                        <p className="rank-text">{rank}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="level-badge"
                >
                    <span className="level-label">LEVEL</span>
                    <span className="level-value">{player.level}</span>
                </motion.div>
            </header>

            <section className="xp-section">
                <div className="xp-header">
                    <span>XP PROGRESS</span>
                    <span>{player.xp} / {nextLevelXp}</span>
                </div>
                <div className="xp-bar-container">
                    <motion.div
                        className="xp-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </section>

            <div className="dashboard-grid">
                <section className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="stat-card panel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </section>

                <section className="activity-feed panel">
                    <h2 className="section-title"><Activity size={16} /> RECENT LOGS</h2>
                    <div className="feed-items">
                        {state.missionHistory.length === 0 ? (
                            <p className="empty-feed">NO MISSION COMPLETED. START TRAINING IN THE NODES PANEL.</p>
                        ) : (
                            state.missionHistory.slice(-5).map((log, i) => (
                                <div key={i} className="feed-item">
                                    <span className="feed-time">[{new Date(log.date).toLocaleTimeString()}]</span>
                                    <span className="feed-msg">{log.message}</span>
                                </div>
                            ))
                        )}
                        <div className="feed-item terminal-text">
                            <span className="feed-time">[SYS]</span>
                            <span className="feed-msg">System initialized. Connection stable.</span>
                        </div>
                        <div className="feed-item terminal-text">
                            <span className="feed-time">[SYS]</span>
                            <span className="feed-msg blink">_</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
