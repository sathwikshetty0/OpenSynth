import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, Play } from 'lucide-react';

const IntelBriefing = ({ mission, onComplete }) => {
    const [typedTheory, setTypedTheory] = useState([]);

    useEffect(() => {
        // Basic typewriter effect for the bullet points
        let current = 0;
        const interval = setInterval(() => {
            if (current < mission.theory.details.length) {
                setTypedTheory(prev => [...prev, mission.theory.details[current]]);
                current++;
            } else {
                clearInterval(interval);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [mission]);

    return (
        <div className="intel-container">
            <div className="intel-text-panel panel">
                <h2><Info size={24} /> MISSION INTEL</h2>
                <p className="terminal-text">OBJECTIVE: {mission.theory.goal}</p>

                <ul className="theory-list">
                    {typedTheory.map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>

                <div className="code-block">
                    <div className="code-header">CODE_SNIPPET.PY</div>
                    <pre>{mission.theory.code}</pre>
                </div>

                <div className="intel-actions">
                    <button onClick={onComplete}>
                        INITIALIZE CHALLENGES <Play size={16} />
                    </button>
                </div>
            </div>

            <div className="visual-demo-panel">
                <div className="panel">
                    <h3 className="glow-text">VISUAL REPRESENTATION</h3>
                    <div className="ascii-visual">
                        <pre className="terminal-text">
                            {`
Original Image        Processed Result

███████████           ░░░░░░░░░░
████  █████           ░░░  ░░░░░
███████████    →      ░░░░░░░░░░
`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntelBriefing;
