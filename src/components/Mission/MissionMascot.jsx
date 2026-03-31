import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Zap, Radio, ShieldCheck, Heart } from 'lucide-react';

const MissionMascot = ({ message, type = 'info', isProactive = false, emotion = 'happy' }) => {
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
        }, 25);
        return () => clearInterval(interval);
    }, [message]);

    const getAvatarUrl = () => {
        const base = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=NEO&backgroundColor=06b6d4";
        const emotions = {
            happy: "&eyes=eyes12&mouth=mouth01",
            thinking: "&eyes=eyes01&mouth=mouth03",
            surprised: "&eyes=eyes08&mouth=mouth05",
            excited: "&eyes=eyes10&mouth=mouth02",
            stern: "&eyes=eyes04&mouth=mouth01"
        };
        return base + (emotions[emotion] || emotions.happy);
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <ShieldCheck size={18} className="mascot-icon-svg success" />;
            case 'error': return <Zap size={18} className="mascot-icon-svg error" />;
            case 'system': return <Cpu size={18} className="mascot-icon-svg system" />;
            default: return <Heart size={18} className="mascot-icon-svg info pulsing" />;
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`mascot-bubble-container ${isProactive ? 'proactive' : ''}`}
        >
            <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mascot-avatar-frame"
            >
                <img src={getAvatarUrl()} alt="NEO AI" />
                <div className="status-dot"></div>
                
                {/* Floating energy particles */}
                <div className="energy-ring"></div>
            </motion.div>
            
            <div className="mascot-content">
                <div className="mascot-header">
                    <span className="mascot-name">PET_PROTO_NEO</span>
                    <div className="mascot-type-icon">{getIcon()}</div>
                </div>
                <div className="mascot-text-box">
                    <p>{currentMsg}</p>
                    {isTyping && <span className="cursor-blink">|</span>}
                </div>
            </div>

            <style jsx>{`
                .mascot-bubble-container {
                    display: flex;
                    gap: 1rem;
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(6, 182, 212, 0.3);
                    padding: 1rem;
                    border-radius: 12px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 0 25px rgba(6, 182, 212, 0.1);
                    position: relative;
                    max-width: 100%;
                    min-height: 100px;
                }
                .mascot-bubble-container.proactive {
                    border-color: var(--accent-purple);
                    box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);
                }
                .mascot-avatar-frame {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2));
                    padding: 6px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .energy-ring {
                    position: absolute;
                    inset: -4px;
                    border: 2px dashed rgba(6, 182, 212, 0.3);
                    border-radius: 50%;
                    animation: rotate 10s linear infinite;
                }
                @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .mascot-avatar-frame img { width: 90%; height: 90%; z-index: 2; }
                .status-dot {
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    width: 12px;
                    height: 12px;
                    background: var(--neon-green);
                    border-radius: 50%;
                    border: 2px solid #000;
                    box-shadow: 0 0 10px var(--neon-green);
                    z-index: 3;
                }
                .mascot-content { flex: 1; min-width: 0; }
                .mascot-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
                .mascot-name { font-size: 0.6rem; font-family: var(--font-code); color: var(--hud-blue); font-weight: 800; letter-spacing: 3px; }
                .mascot-text-box p { font-size: 0.8rem; color: #f8fafc; line-height: 1.4; margin: 0; font-family: 'Outfit', sans-serif; }
                .cursor-blink { color: var(--hud-blue); animation: blink 0.8s infinite; font-weight: bold; }
                @keyframes blink { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
                .mascot-icon-svg { stroke-width: 3px; }
                .mascot-icon-svg.info { color: var(--hud-blue); }
                .mascot-icon-svg.success { color: var(--neon-green); }
                .mascot-icon-svg.error { color: #ff3535; }
                .pulsing { animation: pulse 2s ease-in-out infinite; }
                @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
            `}</style>
        </motion.div>
    );
};

export default MissionMascot;
