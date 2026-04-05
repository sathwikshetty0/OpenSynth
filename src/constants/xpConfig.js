// XP thresholds for each level boundary (index = level, value = XP needed to reach that level)
export const LEVEL_XP_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1500, 2100, 2800, 3600, 4500];

// After level 10, each level costs this much additional XP
export const XP_PER_LEVEL_ABOVE_10 = 500;

// XP penalty multiplier when hints are used
export const HINT_PENALTY_MULTIPLIER = 0.7;

// Rank labels keyed by minimum level
export const RANKS = [
    { minLevel: 20, title: "Vision Specialist" },
    { minLevel: 12, title: "Lead Architect" },
    { minLevel: 8,  title: "Vision Engineer" },
    { minLevel: 5,  title: "Image Analyst" },
    { minLevel: 3,  title: "Junior Practitioner" },
    { minLevel: 0,  title: "Vision Student" },
];

export const xpToLevel = (xp) => {
    for (let lvl = LEVEL_XP_THRESHOLDS.length - 1; lvl >= 1; lvl--) {
        if (xp >= LEVEL_XP_THRESHOLDS[lvl]) return lvl;
    }
    if (xp >= LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1]) {
        return (
            LEVEL_XP_THRESHOLDS.length - 1 +
            Math.floor((xp - LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1]) / XP_PER_LEVEL_ABOVE_10)
        );
    }
    return 1;
};

export const getLevelXp = (level) => {
    if (level < LEVEL_XP_THRESHOLDS.length) return LEVEL_XP_THRESHOLDS[level];
    return (
        LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1] +
        (level - (LEVEL_XP_THRESHOLDS.length - 1)) * XP_PER_LEVEL_ABOVE_10
    );
};

export const getRank = (level) => {
    for (const rank of RANKS) {
        if (level >= rank.minLevel) return rank.title;
    }
    return RANKS[RANKS.length - 1].title;
};
