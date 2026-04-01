import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';

// Components
import HUDNavigation from './components/HUD/HUDNavigation';
import Dashboard from './components/Dashboard/Dashboard';
import SkillTree from './components/SkillTree/SkillTree';
import Mission from './components/Mission/Mission';
import Leaderboard from './components/Leaderboard';
import Badges from './components/Badges';
import Settings from './components/Settings';
import Certification from './components/Certification/Certification';
import WelcomeModal from './components/WelcomeModal';

// Context
export const GameContext = createContext();

function App() {
    const { state, setProfile, rank } = useGameState();
    const { player } = state;

    return (
        <GameContext.Provider value={{ state, setProfile, rank }}>
            <Router>
                <div className="app-container">
                    <AnimatePresence>
                        {!player.hasSetProfile && (
                            <WelcomeModal 
                                onComplete={(data) => setProfile(data)} 
                                defaultCodename={player.codename}
                            />
                        )}
                    </AnimatePresence>

                    <main className="content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/skill-tree" element={<SkillTree />} />
                            <Route path="/mission/:moduleId" element={<Mission />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            <Route path="/badges" element={<Badges />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/certification" element={
                                <Certification 
                                    player={player} 
                                    rank={rank} 
                                    onBack={() => window.location.href = '/badges'} 
                                />
                            } />
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </main>

                    <HUDNavigation />
                </div>
            </Router>
        </GameContext.Provider>
    );
}

export default App;
