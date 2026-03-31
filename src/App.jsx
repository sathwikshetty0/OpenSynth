import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGameState } from './hooks/useGameState';

// Components
import HUDNavigation from './components/HUD/HUDNavigation';
import Dashboard from './components/Dashboard/Dashboard';
import SkillTree from './components/SkillTree/SkillTree';
import Mission from './components/Mission/Mission';
import Leaderboard from './components/Leaderboard';
import Badges from './components/Badges';
import Settings from './components/Settings';

// Context
export const GameContext = createContext();

function App() {
    const gameState = useGameState();

    return (
        <GameContext.Provider value={gameState}>
            <Router>
                <div className="app-container">
                    {/* Visual Layers */}
                    <div className="hud-grid"></div>
                    <div className="hud-scanlines"></div>
                    <div className="hud-noise"></div>
                    <div className="crt-overlay"></div>

                    <main className="content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/skill-tree" element={<SkillTree />} />
                            <Route path="/mission/:moduleId" element={<Mission />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            <Route path="/badges" element={<Badges />} />
                            <Route path="/settings" element={<Settings />} />
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
