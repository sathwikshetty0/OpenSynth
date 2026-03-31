import React from 'react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
    const players = [
        { rank: 1, name: "Neural_Ghost", level: 42, xp: 24500, images: 1204 },
        { rank: 2, name: "Bit_Striker", level: 38, xp: 19200, images: 850 },
        { rank: 3, name: "Pixel_Hunter", level: 35, xp: 15600, images: 720 },
        { rank: 4, name: "Operator-17", level: 5, xp: 1120, images: 41, isPlayer: true },
        { rank: 5, name: "Void_Walker", level: 32, xp: 12400, images: 502 },
    ].sort((a, b) => b.xp - a.xp);

    return (
        <div className="leaderboard-page panel">
            <h1 className="glow-text">GLOBAL OPERATIVE RANKINGS</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>RANK</th>
                        <th>CODENAME</th>
                        <th>LEVEL</th>
                        <th>XP</th>
                        <th>IMAGES</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((p, i) => (
                        <motion.tr
                            key={p.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={p.isPlayer ? 'player-row' : ''}
                        >
                            <td>#{p.rank}</td>
                            <td className="glow-text">{p.name}</td>
                            <td>LVL {p.level}</td>
                            <td>{p.xp.toLocaleString()}</td>
                            <td>{p.images}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
        .leaderboard-page { margin: 2rem; padding: 3rem; }
        .leaderboard-table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
        th { text-align: left; padding: 1rem; color: var(--hud-blue); font-size: 0.8rem; border-bottom: 1px solid var(--hud-blue-low); }
        td { padding: 1.2rem 1rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .player-row { background: var(--hud-blue-low); }
      `}</style>
        </div>
    );
};

export default Leaderboard;
