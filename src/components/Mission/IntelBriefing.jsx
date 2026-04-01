import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Play } from 'lucide-react';

const IntelBriefing = ({ mission, onComplete }) => {
    const [typedTheory, setTypedTheory] = useState([]);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            if (current < mission.theory.details.length) {
                setTypedTheory(prev => [...prev, mission.theory.details[current]]);
                current++;
            } else {
                clearInterval(interval);
            }
        }, 300);
        return () => clearInterval(interval);
    }, [mission]);

    return (
        <div className="intel-container">
            <div className="briefing-header panel">
                <p>Welcome to the {mission.title} module. Review the technical specifications below to prepare for the field challenges.</p>
            </div>
            <div className="intel-text-panel panel">
                <div className="intel-header-meta">
                    <span className="status-tag pulse">SYSTEM_READY</span>
                    <span className="intel-id">REPORT_240-B</span>
                </div>
                <h2><Info size={24} /> OPERATIONAL INTELLIGENCE</h2>
                <div className="intel-objective">
                    <label>OBJECTIVE</label>
                    <p>{mission.theory.goal}</p>
                </div>
                
                <div className="intel-details">
                    <label>TECHNICAL SPECIFICATIONS</label>
                    <ul className="theory-list">
                        {typedTheory.map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="list-dot"></span> {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="code-block-container">
                    <div className="code-header">
                        <span>IMPLEMENTATION_TEMPLATE.PY</span>
                    </div>
                    <div className="code-block">
                        <pre>{mission.theory.code}</pre>
                    </div>
                </div>

                <div className="intel-actions">
                    <button className="primary-cta-btn" onClick={onComplete}>
                        BEGIN FIELD CHALLENGES <Play size={18} fill="currentColor" />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .intel-header-meta { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
                .status-tag { font-size: 0.6rem; color: var(--neon-green); font-weight: 900; background: rgba(16, 185, 129, 0.1); padding: 2px 8px; border-radius: 4px; }
                .intel-id { font-size: 0.6rem; color: #444; font-family: var(--font-code); }
                .intel-objective { margin-bottom: 2rem; background: rgba(15, 23, 42, 0.4); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--hud-blue); }
                .intel-objective label { display: block; font-size: 0.65rem; color: var(--hud-blue); font-weight: 800; margin-bottom: 0.5rem; letter-spacing: 2px; }
                .intel-objective p { font-size: 0.95rem; color: #e2e8f0; line-height: 1.4; }
                .intel-details label { display: block; font-size: 0.65rem; color: #64748b; font-weight: 700; margin-bottom: 1rem; letter-spacing: 1px; }
                .theory-list { margin-bottom: 2rem; }
                .theory-list li { display: flex; align-items: flex-start; gap: 0.8rem; padding: 0.5rem 0; font-size: 0.9rem; color: #cbd5e1; border: none; background: none; }
                .list-dot { width: 6px; height: 6px; background: var(--accent-purple); border-radius: 50%; margin-top: 6px; box-shadow: 0 0 8px var(--accent-purple); flex-shrink: 0; }
                .code-block-container { margin-bottom: 2rem; }
                .code-header { background: rgba(15, 23, 42, 0.8); padding: 0.6rem 1rem; border-radius: 8px 8px 0 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 0.65rem; color: #94a3b8; font-family: var(--font-code); }
                .code-block { margin: 0; border-radius: 0 0 8px 8px; background: #000; border-top: none; }
                .intel-actions { display: flex; justify-content: center; margin-top: 1rem; }
                .primary-cta-btn { width: 100%; justify-content: center; gap: 1rem; }
            `}</style>
        </div>
    );
};

export default IntelBriefing;
