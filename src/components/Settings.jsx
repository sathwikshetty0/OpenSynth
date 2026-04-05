import { useState, useContext } from 'react';
import { GameContext } from '../App';
import { RefreshCw, ShieldAlert, Cpu, HardDrive, Volume2, VolumeX, User } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled } from '../utils/soundEffects';

const Settings = () => {
    const { state, setProfile, reset } = useContext(GameContext);
    const { player } = state;

    const [codename, setCodename] = useState(player.codename);
    const [codenameMsg, setCodenameMsg] = useState('');
    const [soundOn, setSoundOn] = useState(isSoundEnabled());

    const handleCodenameSubmit = (e) => {
        e.preventDefault();
        const trimmed = codename.trim();
        if (!trimmed || trimmed === player.codename) return;
        setProfile({ codename: trimmed });
        setCodenameMsg('Codename updated.');
        setTimeout(() => setCodenameMsg(''), 2500);
    };

    const handleSoundToggle = () => {
        const next = !soundOn;
        setSoundOn(next);
        setSoundEnabled(next);
    };

    const handleReset = () => {
        if (window.confirm('CRITICAL: ALL MISSION PROGRESS WILL BE WIPED. PROCEED?')) {
            reset();
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className="settings-page panel">
            <h1 className="glow-text">SYSTEM CONFIGURATION</h1>

            <div className="settings-grid">

                {/* ── Operator Identity ── */}
                <section className="settings-section panel">
                    <h3><User size={18} /> OPERATOR IDENTITY</h3>
                    <p className="description">Update your codename. Stats and progress are preserved.</p>
                    <form onSubmit={handleCodenameSubmit} className="codename-form">
                        <input
                            className="terminal-input codename-input"
                            value={codename}
                            onChange={(e) => setCodename(e.target.value)}
                            maxLength={24}
                            placeholder="Enter new codename"
                            autoComplete="off"
                        />
                        <button type="submit" disabled={!codename.trim() || codename.trim() === player.codename}>
                            APPLY
                        </button>
                    </form>
                    {codenameMsg && <p className="success-msg">{codenameMsg}</p>}
                </section>

                {/* ── Audio ── */}
                <section className="settings-section panel">
                    <h3><Cpu size={18} /> INTERFACE SETTINGS</h3>
                    <div className="setting-item">
                        <span>Sound Effects</span>
                        <button
                            className={`toggle-btn ${soundOn ? 'active' : ''}`}
                            onClick={handleSoundToggle}
                            aria-label={soundOn ? 'Disable sound' : 'Enable sound'}
                        >
                            {soundOn ? <><Volume2 size={14} /> ON</> : <><VolumeX size={14} /> OFF</>}
                        </button>
                    </div>
                    <div className="setting-item">
                        <span>System Version</span>
                        <span className="terminal-text">v1.3.0-STABLE</span>
                    </div>
                </section>

                {/* ── Data Management ── */}
                <section className="settings-section panel">
                    <h3><HardDrive size={18} /> DATA MANAGEMENT</h3>
                    <p className="description">Erase all local progress and start fresh.</p>
                    <button className="reset-btn" onClick={handleReset}>
                        <ShieldAlert size={16} /> FACTORY RESET SYSTEM
                    </button>
                </section>

                {/* ── Status ── */}
                <section className="settings-section panel">
                    <h3><RefreshCw size={18} /> STATUS</h3>
                    <div className="status-log terminal-text">
                        <div>[OK] Boot sequence verified.</div>
                        <div>[OK] LocalStorage connection established.</div>
                        <div>[OK] Operator: {player.codename}</div>
                        <div>[OK] Modules completed: {state.modulesCompleted.length}</div>
                        <div>[{soundOn ? 'OK' : '--'}] Audio system: {soundOn ? 'ACTIVE' : 'MUTED'}</div>
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
                .status-log { font-family: var(--font-code); font-size: 0.75rem; background: rgba(0,0,0,0.3); padding: 1rem; border: 1px solid #222; line-height: 1.8; }
                .codename-form { display: flex; gap: 0.75rem; align-items: center; }
                .codename-input { flex: 1; padding: 0.6rem 0.9rem; font-size: 0.85rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(6,182,212,0.3); color: #f0f0ee; border-radius: 6px; font-family: var(--font-code); }
                .codename-input:focus { outline: none; border-color: var(--hud-blue); }
                .codename-form button { padding: 0.6rem 1.2rem; font-size: 0.75rem; white-space: nowrap; }
                .success-msg { color: var(--neon-green); font-size: 0.8rem; margin-top: 0.75rem; font-family: var(--font-code); }
                .toggle-btn { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 1rem; font-size: 0.75rem; border: 1px solid rgba(255,255,255,0.15); color: #64748b; border-radius: 4px; cursor: pointer; background: transparent; transition: all 0.2s; }
                .toggle-btn.active { border-color: var(--neon-green); color: var(--neon-green); }
            `}</style>
        </div>
    );
};

export default Settings;
