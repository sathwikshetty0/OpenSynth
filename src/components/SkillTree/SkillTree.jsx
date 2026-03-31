import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../App';
import { missions } from '../../data/missions';
import { Lock, CheckCircle, Play } from 'lucide-react';
import './SkillTree.css';

const SkillTree = () => {
    const { state } = useContext(GameContext);
    const navigate = useNavigate();

    const isUnlocked = (id) => state.unlockedModules.includes(id);
    const isCompleted = (id) => state.modulesCompleted.includes(id);

    return (
        <div className="skill-tree-container">
            <h1 className="glow-text title">MISSION NODES</h1>

            <div className="nodes-grid">
                {missions.map((mission, index) => {
                    const unlocked = isUnlocked(mission.id);
                    const completed = isCompleted(mission.id);

                    return (
                        <motion.div
                            key={mission.id}
                            className={`node-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => unlocked && navigate(`/mission/${mission.id}`)}
                        >
                            <div className="node-icon">
                                {!unlocked ? <Lock size={24} /> : completed ? <CheckCircle size={24} color="var(--neon-green)" /> : <Play size={24} />}
                            </div>
                            <div className="node-content">
                                <h3>{mission.title}</h3>
                                <div className="node-meta">
                                    <span>{mission.xpReward} XP</span>
                                    <span className={`difficulty ${mission.difficulty.toLowerCase()}`}>{mission.difficulty}</span>
                                </div>
                            </div>
                            {!unlocked && <div className="locked-overlay">ACCESS DENIED</div>}
                        </motion.div>
                    );
                })}
            </div>

            <div className="background-lines">
                <svg width="100%" height="100%">
                    <line x1="10%" y1="10%" x2="90%" y2="10%" stroke="var(--hud-blue-low)" strokeWidth="1" strokeDasharray="10,5" />
                    <line x1="90%" y1="10%" x2="90%" y2="90%" stroke="var(--hud-blue-low)" strokeWidth="1" strokeDasharray="10,5" />
                    <line x1="90%" y1="90%" x2="10%" y2="90%" stroke="var(--hud-blue-low)" strokeWidth="1" strokeDasharray="10,5" />
                    <line x1="10%" y1="90%" x2="10%" y2="10%" stroke="var(--hud-blue-low)" strokeWidth="1" strokeDasharray="10,5" />
                    <line x1="30%" y1="0%" x2="30%" y2="100%" stroke="var(--hud-blue-low)" strokeWidth="0.5" />
                    <line x1="60%" y1="0%" x2="60%" y2="100%" stroke="var(--hud-blue-low)" strokeWidth="0.5" />
                    <circle cx="20%" cy="20%" r="2" fill="var(--hud-blue)" />
                    <circle cx="80%" cy="80%" r="2" fill="var(--hud-blue)" />
                </svg>
            </div>
        </div>
    );
};

export default SkillTree;
