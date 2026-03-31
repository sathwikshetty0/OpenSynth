import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MissionMascot from './MissionMascot';

const FieldChallenge = ({ challenge, onComplete, index, total }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [mascotMsg, setMascotMsg] = useState('');

    useEffect(() => {
        setMascotMsg(`Challenge ${index + 1} initialized. Objective: ${challenge.type.toUpperCase()}. Awaiting your command input.`);
    }, [challenge, index]);

    useEffect(() => {
        if (isCorrect === true) {
            setMascotMsg("Command verified. Biological logic confirmed. Access level rising.");
        } else if (isCorrect === false) {
            setMascotMsg("Access denied. That logic pattern is incompatible with OpenCV standards. Try again.");
        }
    }, [isCorrect]);

    const handleMcqSelect = (option) => {
        setSelectedOption(option);
        const correct = option === challenge.correctAnswer;
        setIsCorrect(correct);
        setTimeout(() => {
            onComplete(correct, showHint);
            setSelectedOption(null);
            setIsCorrect(null);
            setShowHint(false);
        }, 2000);
    };

    const handleFillSubmit = (e) => {
        e.preventDefault();
        const expected = challenge.answer || challenge.correctCode;
        if (!expected) return;

        const correct = inputValue.trim().toLowerCase() === expected.toLowerCase();
        setIsCorrect(correct);
        setTimeout(() => {
            onComplete(correct, showHint);
            setInputValue('');
            setIsCorrect(null);
            setShowHint(false);
        }, 2000);
    };

    return (
        <div className="challenge-phase-layout">
            <div className="challenge-mascot-side">
                <MissionMascot 
                    message={mascotMsg} 
                    type={isCorrect === true ? 'success' : isCorrect === false ? 'error' : 'info'}
                    isProactive={isCorrect === false}
                />
                
                {showHint && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <MissionMascot 
                            message={`HINT_DATA: ${challenge.hint}`}
                            type="system"
                        />
                    </motion.div>
                )}
            </div>

            <div className="challenge-container panel">
                <div className="challenge-header">
                    <span className="terminal-text">CHALLENGE {index + 1} OF {total}</span>
                    <span className="type-tag">{challenge.type.toUpperCase()}</span>
                </div>

                <h3 className="challenge-question">{challenge.question}</h3>

                {challenge.type === 'mcq' && (
                    <div className="options-grid">
                        {challenge.options.map(option => (
                            <button
                                key={option}
                                className={`option-btn ${selectedOption === option ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                                onClick={() => !selectedOption && handleMcqSelect(option)}
                                disabled={selectedOption !== null}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {challenge.type === 'fill' && (
                    <form onSubmit={handleFillSubmit} className="fill-challenge">
                        <div className="code-block">
                            {challenge.code.split('____').map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <input
                                            type="text"
                                            className={`terminal-input ${isCorrect === false ? 'wrong' : isCorrect === true ? 'correct' : ''}`}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            autoFocus
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <button type="submit" disabled={!inputValue}>VALIDATE COMMAND</button>
                    </form>
                )}

                {challenge.type === 'bug' && (
                    <div className="bug-challenge">
                        <div className="code-block wrong-code">
                            {challenge.code}
                        </div>
                        <p className="hint">TYPE THE CORRECTED LINE:</p>
                        <form onSubmit={handleFillSubmit}>
                            <input
                                type="text"
                                className="terminal-input full-width"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="cv2.method(arg1, arg2)..."
                                autoComplete="off"
                            />
                            <button type="submit" disabled={!inputValue}>FIX SYSTEM BUG</button>
                        </form>
                    </div>
                )}

                {challenge.type === 'slider' && (
                    <div className="slider-challenge">
                        <div className="visual-feedback" style={{ filter: `blur(${(inputValue || challenge.initial) * 2}px)` }}>
                            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400" alt="Target" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        </div>
                        <div className="slider-controls">
                            <input
                                type="range"
                                min={challenge.min}
                                max={challenge.max}
                                step={challenge.step}
                                value={inputValue || challenge.initial}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <div className="param-display">CURRENT KERNEL: {inputValue || challenge.initial}x{inputValue || challenge.initial}</div>
                            <button onClick={() => {
                                const correct = parseInt(inputValue || challenge.initial) === challenge.target;
                                setIsCorrect(correct);
                                setTimeout(() => {
                                    onComplete(correct, showHint);
                                    setInputValue('');
                                    setIsCorrect(null);
                                    setShowHint(false);
                                }, 2000);
                            }}>CALIBRATE SENSOR</button>
                        </div>
                    </div>
                )}

                {!showHint && challenge.hint && (
                    <div className="hint-area">
                        <button className="hint-btn" onClick={() => setShowHint(true)}>REQUEST INTEL ASSISTANCE (-30% XP)</button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .challenge-phase-layout {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 1000px) {
                    .challenge-phase-layout {
                        grid-template-columns: 1fr;
                    }
                }
                .challenge-mascot-side {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    position: sticky;
                    top: 2rem;
                }
                .challenge-container {
                    margin: 0 !important;
                }
            `}</style>
        </div>
    );
};

export default FieldChallenge;
