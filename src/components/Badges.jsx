import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Eye, Camera, Award } from 'lucide-react';

const Badges = () => {
    const badges = [
        { id: 1, name: "First Frame", icon: <Camera />, desc: "Complete your first mission", unlocked: true },
        { id: 2, name: "Edge Lord", icon: <Zap />, desc: "Master Canny edge detection", unlocked: false },
        { id: 3, name: "Color Wizard", icon: <Target />, desc: "Convert 10 images to HSV", unlocked: false },
        { id: 4, name: "Face Hunter", icon: <Eye />, desc: "Detect 50 faces in a stream", unlocked: false },
        { id: 5, name: "Vision Architect", icon: <Shield />, desc: "Unlock all level 10 modules", unlocked: false },
        { id: 6, name: "Speed Runner", icon: <Award />, desc: "Complete a mission in < 2 mins", unlocked: false },
    ];

    return (
        <div className="badges-page panel">
            <h1 className="glow-text">ACHIEVEMENT VAULT</h1>
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
        .badges-page { margin: 2rem; padding: 3rem; }
        .badges-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .badge-item { 
          background: rgba(255, 255, 255, 0.03); 
          border: 1px solid var(--hud-blue-low); 
          padding: 2rem; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .badge-item.unlocked { border-color: var(--hud-blue); box-shadow: 0 0 15px var(--hud-blue-low); }
        .badge-item.locked { opacity: 0.4; filter: grayscale(1); }
        .badge-icon { font-size: 2.5rem; color: var(--hud-blue); margin-bottom: 1rem; display: flex; justify-content: center; }
        .badge-item h3 { font-size: 0.9rem; margin-bottom: 0.5rem; }
        .badge-item p { font-size: 0.7rem; color: #888; }
        .lock-tag { position: absolute; top: 10px; right: -25px; background: #ff3535; color: white; padding: 2px 30px; transform: rotate(45deg); font-size: 0.6rem; font-weight: 900; }
      `}</style>
        </div>
    );
};

export default Badges;
