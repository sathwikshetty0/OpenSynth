import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Zap, Radio, ShieldCheck } from 'lucide-react';

const MissionMascot = ({ message, type = 'info', isProactive = false }) => {
    const [currentMsg, setCurrentMsg] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setIsTyping(true);
        let current = 0;
        const interval = setInterval(() => {
            if (current <= message.length) {
                setCurrentMsg(message.slice(0, current));
                current++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [message]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <ShieldCheck size={20} className="mascot-icon-svg success" />;
            case 'error': return <Zap size={20} className="mascot-icon-svg error" />;
            case 'system': return <Cpu size={20} className="mascot-icon-svg system" />;
            default: return <Radio size={20} className="mascot-icon-svg info pulsing" />;
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className={`mascot-bubble-container ${isProactive ? 'proactive' : ''}`}
        >
            <div className="mascot-avatar-frame">
                <img src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=NEO&backgroundColor=06b6d4&eyes=eyes12&mouth=mouth01" alt="NEO AI" />
                <div className="status-dot"></div>
            </div>
            
            <div className="mascot-content">
                <div className="mascot-header">
                    <span className="mascot-name">NEO [AI_CORE]</span>
                    <div className="mascot-type-icon">{getIcon()}</div>
                </div>
                <div className="mascot-text-box">
                    <p className={isTyping ? 'typing' : ''}>{currentMsg}</p>
                    {isTyping && <span className="cursor-blink">_</span>}
                </div>
            </div>

            <style jsx>{`
                .mascot-bubble-container {
                    display: flex;
                    gap: 1.2rem;
                    background: rgba(7, 9, 19, 0.8);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(6, 182, 212, 0.2);
                    padding: 1.2rem;
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(6, 182, 212, 0.05);
                    position: relative;
                    max-width: 450px;
                    margin: 1rem 0;
                }
                .mascot-bubble-container.proactive {
                    border-color: var(--accent-purple);
                    box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
                }
                .mascot-avatar-frame {
                    width: 60px;
                    height: 60px;
                    border-radius: 12px;
                    background: rgba(15, 23, 42, 0.8);
                    padding: 4px;
                    border: 1px solid rgba(6, 182, 212, 0.3);
                    position: relative;
                    flex-shrink: 0;
                }
                .mascot-avatar-frame img { width: 100%; height: 100%; }
                .status-dot {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 10px;
                    height: 10px;
                    background: var(--neon-green);
                    border-radius: 50%;
                    border: 2px solid #000;
                    box-shadow: 0 0 8px var(--neon-green);
                }
                .mascot-content { flex: 1; min-width: 0; }
                .mascot-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                .mascot-name {
                    font-size: 0.65rem;
                    font-family: var(--font-code);
                    color: var(--hud-blue);
                    font-weight: 800;
                    letter-spacing: 2px;
                }
                .mascot-text-box p {
                    font-size: 0.85rem;
                    color: #e2e8f0;
                    line-height: 1.5;
                    margin: 0;
                }
                .cursor-blink { color: var(--hud-blue); animation: blink 1s infinite; }
                @keyframes blink { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
                .mascot-icon-svg.info { color: var(--hud-blue); }
                .mascot-icon-svg.success { color: var(--neon-green); }
                .mascot-icon-svg.error { color: #ff3535; }
                .pulsing { animation: pulse 2s ease-in-out infinite; }
                @keyframes pulse { 
                    0%, 100% { transform: scale(1); opacity: 0.7; } 
                    50% { transform: scale(1.1); opacity: 1; } 
                }
            `}</style>
        </motion.div>
    );
};

export default MissionMascot;
