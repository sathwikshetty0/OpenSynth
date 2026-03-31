import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Network, Trophy, ShieldCheck, Settings } from 'lucide-react';
import './HUD.css';

const HUDNavigation = () => {
    return (
        <nav className="hud-nav">
            <div className="hud-nav-inner">
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <LayoutDashboard size={22} />
                    <span>COMMAND</span>
                </NavLink>
                <NavLink to="/skill-tree" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Network size={22} />
                    <span>MODULES</span>
                </NavLink>
                <NavLink to="/badges" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <ShieldCheck size={22} />
                    <span>OPERATOR</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default HUDNavigation;
