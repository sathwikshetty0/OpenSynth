import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, ArrowRight } from 'lucide-react';

const MissionDebrief = ({ mission, earnedXp, onFinish }) => {
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00fff5', '#39ff14', '#ffffff']
        });
    }, []);

    return (
        <div className="debrief-panel panel">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
            >
                <Award size={80} color="var(--hud-blue)" />
            </motion.div>

            <h1>MISSION SUCCESS</h1>
            <p className="terminal-text">Subject has successfully assimilated {mission.title} protocols.</p>

            <div className="stat-increases">
                <div className="stat-inc">
                    <span className="val">+{earnedXp}</span>
                    <span className="lab">XP EARNED</span>
                </div>
                <div className="stat-inc">
                    <span className="val">+1</span>
                    <span className="lab">NODE UNLOCKED</span>
                </div>
            </div>

            <div className="badge-notification panel">
                <span className="glow-text">NEW BADGE UNLOCKED:</span>
                <h3>VISION RECRUIT</h3>
            </div>

            <button onClick={onFinish} className="large-btn">
                RETURN TO CONTROL CENTER <ArrowRight size={18} />
            </button>
        </div>
    );
};

export default MissionDebrief;
