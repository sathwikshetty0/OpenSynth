const SOUND_KEY = 'opencv_quest_sound';

export const isSoundEnabled = () => localStorage.getItem(SOUND_KEY) !== 'false';

export const setSoundEnabled = (enabled) =>
    localStorage.setItem(SOUND_KEY, enabled ? 'true' : 'false');

function tone(frequency, duration, type = 'sine', volume = 0.25, startOffset = 0) {
    if (!isSoundEnabled()) return;
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.value = frequency;
        const start = ctx.currentTime + startOffset;
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.start(start);
        osc.stop(start + duration + 0.05);
    } catch (_) {
        // Silently ignore if audio context is unavailable
    }
}

export const playSound = {
    correct: () => {
        tone(660, 0.12);
        tone(880, 0.18, 'sine', 0.2, 0.12);
    },
    wrong: () => {
        tone(200, 0.3, 'sawtooth', 0.15);
    },
    xpGain: () => {
        tone(440, 0.08);
        tone(550, 0.08, 'sine', 0.2, 0.09);
        tone(660, 0.15, 'sine', 0.2, 0.18);
    },
    missionComplete: () => {
        tone(523, 0.1);
        tone(659, 0.1, 'sine', 0.25, 0.14);
        tone(784, 0.1, 'sine', 0.25, 0.28);
        tone(1047, 0.4, 'sine', 0.3, 0.42);
    },
    badgeUnlock: () => {
        tone(880, 0.06, 'sine', 0.2);
        tone(1100, 0.06, 'sine', 0.2, 0.07);
        tone(1320, 0.25, 'sine', 0.3, 0.14);
    },
    click: () => {
        tone(400, 0.05, 'square', 0.1);
    },
};
