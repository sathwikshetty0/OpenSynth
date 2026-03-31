import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Network, Trophy, ShieldCheck, Settings } from 'lucide-react';
import './HUD.css';

const HUDNavigation = () => {
    return (
        <nav className="hud-nav">
            <div className="hud-nav-inner">
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <LayoutDashboard size={20} />
                    <span>Control</span>
                </NavLink>
                <NavLink to="/skill-tree" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Network size={20} />
                    <span>Nodes</span>
                </NavLink>
                <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Trophy size={20} />
                    <span>Intel</span>
                </NavLink>
                <NavLink to="/badges" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <ShieldCheck size={20} />
                    <span>Medals</span>
                </NavLink>
                <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Settings size={20} />
                    <span>Sys</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default HUDNavigation;
