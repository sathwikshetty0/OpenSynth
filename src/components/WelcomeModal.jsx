import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Zap, ChevronRight } from 'lucide-react';

const WelcomeModal = ({ onComplete, defaultCodename }) => {
    const [codename, setCodename] = useState(defaultCodename || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!codename.trim()) return;
        setIsSubmitting(true);
        setTimeout(() => {
            onComplete({ codename });
        }, 1500);
    };

    return (
        <div className="modal-overlay">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="welcome-card panel"
            >
                <div className="welcome-header">
                    <div className="shield-icon">
                        <Shield size={32} />
                    </div>
                    <div className="welcome-title">
                        <span className="terminal-text">SYSTEM_READY</span>
                        <h1>CV LAB INITIALIZATION</h1>
                    </div>
                </div>

                <div className="welcome-body">
                    <div className="neo-msg">
                        <p>Welcome to the OpenCV Learning Environment. Please enter your preferred name to start the training modules.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="codename-form">
                        <div className="input-field">
                            <label>OPERATOR_NAME</label>
                            <div className="input-wrapper">
                                <Terminal size={18} className="input-icon" />
                                <input 
                                    type="text" 
                                    value={codename}
                                    onChange={(e) => setCodename(e.target.value)}
                                    placeholder="Enter your name..."
                                    autoFocus
                                    maxLength={20}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="start-btn" 
                            disabled={!codename.trim() || isSubmitting}
                        >
                            {isSubmitting ? 'STARTING SESSION...' : 'START LEARNING'} 
                            {!isSubmitting && <ChevronRight size={18} />}
                        </button>
                    </form>
                </div>

                <div className="welcome-footer">
                    <div className="security-status">
                        <Zap size={12} />
                        <span>ENCRYPTION_LAYER: ACTIVE [ECC-256]</span>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(4, 7, 18, 0.9);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 2rem;
                }
                .welcome-card {
                    max-width: 550px;
                    width: 100%;
                    padding: 3rem;
                    border-color: rgba(6, 182, 212, 0.3);
                    box-shadow: 0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(6, 182, 212, 0.1);
                }
                .welcome-header {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                    margin-bottom: 2.5rem;
                }
                .shield-icon {
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(6, 182, 212, 0.1);
                    color: #06b6d4;
                    border-radius: 12px;
                    border: 1px solid rgba(6, 182, 212, 0.2);
                }
                .welcome-title h1 {
                    font-size: 1.5rem;
                    margin: 0;
                    letter-spacing: 2px;
                    color: #f8fafc;
                }
                .neo-msg {
                    display: flex;
                    gap: 1.2rem;
                    background: rgba(15, 23, 42, 0.5);
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-bottom: 2.5rem;
                    border: 1px solid rgba(255,255,255,0.03);
                }
                .mini-neo {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: rgba(6, 182, 212, 0.1);
                    padding: 5px;
                    flex-shrink: 0;
                }
                .neo-msg p {
                    font-size: 0.9rem;
                    color: #cbd5e1;
                    line-height: 1.5;
                    margin: 0;
                    font-style: italic;
                }
                .codename-form {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .input-field label {
                    display: block;
                    font-size: 0.65rem;
                    color: #06b6d4;
                    font-weight: 800;
                    margin-bottom: 0.8rem;
                    letter-spacing: 3px;
                }
                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .input-icon {
                    position: absolute;
                    left: 1rem;
                    color: #475569;
                }
                .input-wrapper input {
                    width: 100%;
                    background: #000;
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 1rem 1rem 1rem 3rem;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 1.1rem;
                    font-family: var(--font-code);
                    transition: border-color 0.3s;
                }
                .input-wrapper input:focus {
                    outline: none;
                    border-color: #06b6d4;
                    box-shadow: 0 0 15px rgba(6, 182, 212, 0.1);
                }
                .start-btn {
                    width: 100%;
                    padding: 1.2rem;
                    background: #06b6d4;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    font-weight: 800;
                    font-size: 1rem;
                    font-family: var(--font-code);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    transition: all 0.3s;
                }
                .start-btn:hover:not(:disabled) {
                    background: #08d9fd;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(6, 182, 212, 0.2);
                }
                .start-btn:disabled {
                    opacity: 0.1;
                    filter: grayscale(1);
                    cursor: not-allowed;
                }
                .welcome-footer {
                    margin-top: 3rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255,255,255,0.03);
                }
                .security-status {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    color: #475569;
                    font-size: 0.6rem;
                    font-family: var(--font-code);
                    letter-spacing: 1px;
                }
            `}</style>
        </div>
    );
};

export default WelcomeModal;
