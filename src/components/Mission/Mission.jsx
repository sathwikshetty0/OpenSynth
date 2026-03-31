import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContext } from '../../App';
import { missions } from '../../data/missions';
import { ChevronRight, ChevronLeft, Info, Terminal, Award, Eye } from 'lucide-react';
import IntelBriefing from './IntelBriefing';
import FieldChallenge from './FieldChallenge';
import MissionDebrief from './MissionDebrief';
import ConceptVisualizer from './ConceptVisualizer';
import './Mission.css';

const Mission = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const { state, addXp, completeModule, unlockModule } = useContext(GameContext);

    const mission = missions.find(m => m.id === moduleId);
    const [phase, setPhase] = useState(1); // 1: Intel, 2: Challenges, 3: Debrief
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [hintsUsedCount, setHintsUsedCount] = useState(0);
    const [earnedXp, setEarnedXp] = useState(0);

    if (!mission) return <div className="mission-error">MISSION NOT FOUND</div>;

    const handleIntelComplete = () => setPhase(2);

    const handleChallengeComplete = (isCorrect, wasHintUsed) => {
        if (!isCorrect) return; // Stay on the current challenge if wrong

        setScore(s => s + 1);
        if (wasHintUsed) setHintsUsedCount(h => h + 1);

        if (currentChallengeIndex < mission.challenges.length - 1) {
            setCurrentChallengeIndex(c => c + 1);
        } else {
            setPhase(3);
            // Award XP and complete
            // Initial score calculation based on first-try correctness could be complex, 
            // but for now, we just proceed when they get it right.
            let calculatedXp = mission.xpReward;
            
            // Penalty for hints used across all challenges
            if (hintsUsedCount > 0 || wasHintUsed) {
                calculatedXp = Math.floor(calculatedXp * 0.7);
            }

            setEarnedXp(calculatedXp);
            addXp(calculatedXp);
            completeModule(mission.id);
            mission.nextModules?.forEach(m => unlockModule(m));
        }
    };

    return (
        <div className="mission-page">
            <header className="mission-nav-header">
                <button onClick={() => navigate('/skill-tree')} className="back-btn">
                    <ChevronLeft size={16} /> ABORT MISSION
                </button>
                <div className="mission-progress-indicator">
                    <div className={`step ${phase === 1 ? 'active' : ''}`}>INTEL</div>
                    <div className="step-line"></div>
                    <div className={`step ${phase === 2 ? 'active' : ''}`}>CHALLENGE</div>
                    <div className="step-line"></div>
                    <div className={`step ${phase === 3 ? 'active' : ''}`}>DEBRIEF</div>
                </div>
                <div className="mission-title-area">
                    <span className="id">MOD-{mission.id.toUpperCase()}</span>
                    <h2>{mission.title}</h2>
                </div>
            </header>

            <main className="mission-content">
                <AnimatePresence mode="wait">
                    {phase === 1 && (
                        <motion.div
                            key="intel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="intel-phase-layout"
                        >
                            <div className="intel-info-side">
                                <IntelBriefing mission={mission} onComplete={handleIntelComplete} />
                            </div>
                            <div className="intel-visual-side">
                                <ConceptVisualizer moduleId={mission.id} />
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && (
                        <motion.div
                            key="challenge"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <FieldChallenge
                                challenge={mission.challenges[currentChallengeIndex]}
                                onComplete={handleChallengeComplete}
                                index={currentChallengeIndex}
                                total={mission.challenges.length}
                            />
                        </motion.div>
                    )}

                    {phase === 3 && (
                        <motion.div
                            key="debrief"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <MissionDebrief mission={mission} earnedXp={earnedXp} onFinish={() => navigate('/skill-tree')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Mission;
