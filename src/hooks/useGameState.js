import { useReducer, useEffect } from 'react';

const INITIAL_STATE = {
    player: {
        codename: "Operator-17",
        avatar: "robot.png",
        level: 1,
        xp: 0,
        streak: 0,
        imagesProcessed: 0,
        filtersApplied: 0,
        objectsDetected: 0,
        hasSetProfile: false
    },
    modulesCompleted: [],
    badges: [],
    hintsUsed: {},
    missionHistory: [],
    unlockedModules: ["images_pixels"]
};

const ACTION_TYPES = {
    ADD_XP: 'ADD_XP',
    SET_PROFILE: 'SET_PROFILE',
    COMPLETE_MODULE: 'COMPLETE_MODULE',
    UNLOCK_MODULE: 'UNLOCK_MODULE',
    AWARD_BADGE: 'AWARD_BADGE',
    UPDATE_STATS: 'UPDATE_STATS',
    USE_HINT: 'USE_HINT',
    RESET: 'RESET'
};

const xpToLevel = (xp) => {
    if (xp < 100) return 1;
    if (xp < 250) return 2;
    if (xp < 450) return 3;
    if (xp < 700) return 4;
    if (xp < 1000) return 5;
    if (xp < 1500) return 6;
    if (xp < 2100) return 7;
    if (xp < 2800) return 8;
    if (xp < 3600) return 9;
    if (xp < 4500) return 10;
    return Math.floor(xp / 500) + 1;
};

const getLevelXp = (level) => {
    const levels = [0, 100, 250, 450, 700, 1000, 1500, 2100, 2800, 3600, 4500];
    if (level < levels.length) return levels[level];
    return 4500 + (level - 10) * 500;
};

const getRank = (level) => {
    if (level >= 20) return "Master Visionary";
    if (level >= 12) return "Lead Architect";
    if (level >= 8) return "Vision Engineer";
    if (level >= 5) return "Image Analyst";
    if (level >= 3) return "Junior Practitioner";
    return "Vision Student";
};

function gameReducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.ADD_XP: {
            const newXp = state.player.xp + action.payload;
            const newLevel = xpToLevel(newXp);
            return {
                ...state,
                player: {
                    ...state.player,
                    xp: newXp,
                    level: newLevel
                }
            };
        }
        case ACTION_TYPES.SET_PROFILE:
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.payload,
                    hasSetProfile: true
                }
            };
        case ACTION_TYPES.COMPLETE_MODULE:
            if (state.modulesCompleted.includes(action.payload)) return state;
            return {
                ...state,
                modulesCompleted: [...state.modulesCompleted, action.payload]
            };
        case ACTION_TYPES.UNLOCK_MODULE:
            if (state.unlockedModules.includes(action.payload)) return state;
            return {
                ...state,
                unlockedModules: [...state.unlockedModules, action.payload]
            };
        case ACTION_TYPES.AWARD_BADGE:
            if (state.badges.includes(action.payload)) return state;
            return {
                ...state,
                badges: [...state.badges, action.payload]
            };
        case ACTION_TYPES.UPDATE_STATS:
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.payload
                }
            };
        case ACTION_TYPES.USE_HINT:
            const { moduleId, challengeId } = action.payload;
            const moduleHints = state.hintsUsed[moduleId] || [];
            if (moduleHints.includes(challengeId)) return state;
            return {
                ...state,
                hintsUsed: {
                    ...state.hintsUsed,
                    [moduleId]: [...moduleHints, challengeId]
                }
            };
        case ACTION_TYPES.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export function useGameState() {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, (initial) => {
        const saved = localStorage.getItem('opencv_quest_state');
        if (!saved) return initial;
        try {
            const parsed = JSON.parse(saved);
            // Deep merge or validation could be added here if needed
            return { ...initial, ...parsed, player: { ...initial.player, ...parsed.player } };
        } catch (e) {
            console.error("Failed to load game state:", e);
            return initial;
        }
    });

    useEffect(() => {
        localStorage.setItem('opencv_quest_state', JSON.stringify(state));
    }, [state]);

    const addXp = (amount) => dispatch({ type: ACTION_TYPES.ADD_XP, payload: amount });
    const setProfile = (profile) => dispatch({ type: ACTION_TYPES.SET_PROFILE, payload: profile });
    const completeModule = (moduleId) => dispatch({ type: ACTION_TYPES.COMPLETE_MODULE, payload: moduleId });
    const unlockModule = (moduleId) => dispatch({ type: ACTION_TYPES.UNLOCK_MODULE, payload: moduleId });
    const awardBadge = (badgeId) => dispatch({ type: ACTION_TYPES.AWARD_BADGE, payload: badgeId });
    const updateStats = (stats) => dispatch({ type: ACTION_TYPES.UPDATE_STATS, payload: stats });
    const useHint = (moduleId, challengeId) => dispatch({ type: ACTION_TYPES.USE_HINT, payload: { moduleId, challengeId } });

    return {
        state,
        addXp,
        setProfile,
        completeModule,
        unlockModule,
        awardBadge,
        updateStats,
        useHint,
        rank: getRank(state.player.level),
        nextLevelXp: getLevelXp(state.player.level)
    };
}
