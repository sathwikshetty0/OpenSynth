import React, { useContext } from 'react';
import { GameContext } from '../App';
import { RefreshCw, ShieldAlert, Cpu, HardDrive } from 'lucide-react';

const Settings = () => {
    const { state, updateStats } = useContext(GameContext);

    const handleReset = () => {
        if (window.confirm("CRITICAL: ALL MISSION PROGRESS WILL BE WIPED. PROCEED?")) {
            localStorage.removeItem('opencv_quest_state');
            window.location.reload();
        }
    };

    return (
        <div className="settings-page panel">
            <h1 className="glow-text">SYSTEM CONFIGURATION</h1>

            <div className="settings-grid">
                <section className="settings-section panel">
                    <h3><Cpu size={18} /> INTERFACE SETTINGS</h3>
                    <div className="setting-item">
                        <span>Theme Brightness</span>
                        <input type="range" min="0" max="100" defaultValue="70" />
                    </div>
                    <div className="setting-item">
                        <span>UI Density</span>
                        <input type="range" min="0" max="100" defaultValue="50" />
                    </div>
                    <div className="setting-item">
                        <span>System Version</span>
                        <span className="terminal-text">v1.2.0-STABLE</span>
                    </div>
                </section>

                <section className="settings-section panel">
                    <h3><HardDrive size={18} /> DATA MANAGEMENT</h3>
                    <p className="description">Manage local persistence storage.</p>
                    <button className="reset-btn" onClick={handleReset}>
                        <ShieldAlert size={16} /> FACTORY RESET SYSTEM
                    </button>
                </section>

                <section className="settings-section panel">
                    <h3><RefreshCw size={18} /> STATUS</h3>
                    <div className="status-log terminal-text">
                        <div>[OK] Boot sequence verified.</div>
                        <div>[OK] LocalStorage connection established.</div>
                        <div>[OK] OpenCV 4.x simulated assets loaded.</div>
                    </div>
                </section>
            </div>

            <style jsx>{`
        .settings-page { margin: 2rem; padding: 3rem; }
        .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem; }
        .settings-section h3 { color: var(--hud-blue); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .setting-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.9rem; }
        .description { font-size: 0.8rem; color: #888; margin-bottom: 1.5rem; }
        .reset-btn { border-color: #ff3535; color: #ff3535; width: 100%; border-style: dashed; }
        .reset-btn:hover { background: #ff3535; color: white; border-style: solid; }
        .status-log { font-family: var(--font-code); font-size: 0.75rem; background: rgba(0,0,0,0.3); padding: 1rem; border: 1px solid #222; }
      `}</style>
        </div>
    );
};

export default Settings;
