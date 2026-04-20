import { XP_PER_LEVEL } from './evolutionRules';

export function xpToLevel(xp) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function levelToStage(level) {
    if (level < 2) return 1;
    if (level < 5) return 2;
    if (level < 10) return 3;
    if (level < 20) return 4;
    return 5;
}

export function xpToStage(xp) {
    return levelToStage(xpToLevel(xp));
}

export function nextMilestone(xp) {
    const currentLevel = xpToLevel(xp);
    const nextLevelXp = currentLevel * XP_PER_LEVEL;
    return nextLevelXp - xp;
}
