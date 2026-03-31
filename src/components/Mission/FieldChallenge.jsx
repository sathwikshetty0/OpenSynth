import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FieldChallenge = ({ challenge, onComplete, index, total }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showHint, setShowHint] = useState(false);

    const handleMcqSelect = (option) => {
        setSelectedOption(option);
        const correct = option === challenge.correctAnswer;
        setIsCorrect(correct);
        setTimeout(() => {
            onComplete(correct, showHint);
            setSelectedOption(null);
            setIsCorrect(null);
            setShowHint(false);
        }, 1500);
    };

    const handleFillSubmit = (e) => {
        e.preventDefault();
        const correct = inputValue.trim().toLowerCase() === challenge.answer.toLowerCase();
        setIsCorrect(correct);
        setTimeout(() => {
            onComplete(correct, showHint);
            setInputValue('');
            setIsCorrect(null);
            setShowHint(false);
        }, 1500);
    };

    return (
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
                            }, 1500);
                        }}>CALIBRATE SENSOR</button>
                    </div>
                </div>
            )}

            {challenge.hint && (
                <div className="hint-area">
                    {showHint ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hint-text panel">
                            <span className="terminal-text">HINT:</span> {challenge.hint}
                        </motion.div>
                    ) : (
                        <button className="hint-btn" onClick={() => setShowHint(true)}>REQUEST INTEL ASSISTANCE (-30% XP)</button>
                    )}
                </div>
            )}

            {isCorrect === true && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="feedback correct">ACCESS GRANTED</motion.div>}
            {isCorrect === false && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="feedback wrong">ACCESS DENIED - RETRYING</motion.div>}
        </div>
    );
};

export default FieldChallenge;
