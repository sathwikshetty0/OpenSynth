import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Target, Eye, Camera, Award, FileCheck, Terminal } from 'lucide-react';
import { GameContext } from '../App';
import { Link } from 'react-router-dom';

const Badges = () => {
    const { state, rank } = useContext(GameContext);
    const { player, modulesCompleted } = state;

    const badges = [
        { id: 1, name: "First Frame", icon: <Camera />, desc: "Complete your first mission", unlocked: modulesCompleted.length > 0 },
        { id: 2, name: "Edge Lord", icon: <Zap />, desc: "Learn Canny edge detection", unlocked: modulesCompleted.includes('edge_detection') },
        { id: 3, name: "Color Wizard", icon: <Target />, desc: "Calibrate HSV spectral ranges", unlocked: modulesCompleted.includes('color_spaces') },
        { id: 4, name: "Vision Analyst", icon: <Eye />, desc: "Identify contours in a live stream", unlocked: modulesCompleted.includes('contours') },
        { id: 5, name: "System Engineer", icon: <Shield />, desc: "Complete 5 or more modules", unlocked: modulesCompleted.length >= 5 },
        { id: 6, name: "Vision Architect", icon: <Award />, desc: "Complete all curriculum modules", unlocked: modulesCompleted.length >= 6 },
    ];

    const canCertify = modulesCompleted.length >= 3; // Allow certification after 3 modules

    return (
        <div className="badges-page panel">
            <div className="operator-header">
                <div className="operator-profile">
                    <img src={`https://robohash.org/${player.codename}?set=set1`} alt="Operator" className="operator-avatar" />
                    <div className="operator-info">
                        <span className="terminal-text">ID: {player.codename}</span>
                        <h1 className="glow-text">OPERATOR_DOSSIER</h1>
                        <div className="operator-stats">
                            <div className="stat-pill"><Terminal size={14} /> RANK: {rank}</div>
                            <div className="stat-pill"><Zap size={14} /> LEVEL: {player.level}</div>
                        </div>
                    </div>
                </div>

                {canCertify && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <Link to="/certification" className="cert-cta-btn">
                            <FileCheck size={20} /> GENERATE OFFICIAL CERTIFICATION
                        </Link>
                    </motion.div>
                )}
            </div>

            <div className="badges-grid">
                {badges.map((badge, i) => (
                    <motion.div
                        key={badge.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`}
                    >
                        <div className="badge-icon">{badge.icon}</div>
                        <h3>{badge.name}</h3>
                        <p>{badge.desc}</p>
                        {!badge.unlocked && <div className="lock-tag">LOCKED</div>}
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .badges-page { margin: 2rem; padding: 3rem; background: rgba(7, 9, 19, 0.4); border-color: rgba(6, 182, 212, 0.1); }
        .operator-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2rem; }
        .operator-profile { display: flex; gap: 2rem; align-items: center; }
        .operator-avatar { width: 100px; height: 100px; border-radius: 50%; border: 2px solid var(--hud-blue); background: rgba(6, 182, 212, 0.1); padding: 10px; }
        .operator-stats { display: flex; gap: 1rem; margin-top: 1rem; }
        .stat-pill { background: rgba(6, 182, 212, 0.1); color: var(--hud-blue); padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; border: 1px solid rgba(6, 182, 212, 0.2); }
        
        .cert-cta-btn { 
          display: flex; align-items: center; gap: 1rem; 
          background: #000; color: #06b6d4; border: 1px solid #06b6d4; 
          padding: 1.2rem 2rem; border-radius: 8px; font-family: var(--font-code); 
          font-weight: 800; text-decoration: none; font-size: 0.9rem; 
          transition: all 0.3s; box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);
        }
        .cert-cta-btn:hover { background: #06b6d4; color: #fff; box-shadow: 0 0 40px rgba(6, 182, 212, 0.4); transform: translateY(-2px); }

        .badges-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2rem; }
        .badge-item { 
          background: rgba(15, 23, 42, 0.4); 
          border: 1px solid rgba(255,255,255,0.05); 
          padding: 2rem; 
          text-align: center; 
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }
        .badge-item.unlocked { border-color: rgba(6, 182, 212, 0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .badge-item.locked { opacity: 0.3; filter: grayscale(1); }
        .badge-icon { font-size: 2.5rem; color: var(--hud-blue); margin-bottom: 1rem; display: flex; justify-content: center; }
        .badge-item h3 { font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 800; color: #f8fafc; }
        .badge-item p { font-size: 0.7rem; color: #94a3b8; }
        .lock-tag { position: absolute; top: 12px; right: -25px; background: #64748b; color: white; padding: 2px 30px; transform: rotate(45deg); font-size: 0.55rem; font-weight: 900; letter-spacing: 1px; }
      `}</style>
        </div>
    );
};

export default Badges;
