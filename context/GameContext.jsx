"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const GameContext = createContext();

export function GameProvider({ children }) {
    const { user, updateProfile } = useAuth();

    // Game State initialized with defaults, but updated via useEffect 
    const [stats, setStats] = useState({
        totalXP: 0,
        level: 1,
        quizzesTaken: 0,
        averageScore: 0,
        characterState: 'neutral',
        history: []
    });

    // Sync with User from DB
    useEffect(() => {
        if (user) {
            setStats(prev => ({
                ...prev,
                totalXP: user.xp || 0,
                level: user.level || 1,
                // Sync new fields if they exist, else default
                averageScore: user.averageScore || 0,
                quizzesTaken: user.quizzesTaken || 0,
                history: user.history || [],
            }));
        }
    }, [user]);
    const calculateCharacterState = (avgScore) => {
        if (avgScore === 0 && stats.quizzesTaken === 0) return 'neutral';
        if (avgScore >= 70) return 'handsome';
        if (avgScore < 50) return 'ugly';
        return 'neutral';
    };

    const submitQuizResult = async (score, maxScore) => {
        const percentage = (score / maxScore) * 100;
        const xpGained = Math.floor(percentage / 2); // 50 XP max per quiz

        // Calculate new values based on current stats
        const newQuizzesTaken = stats.quizzesTaken + 1;
        const newAverageScore = ((stats.averageScore * stats.quizzesTaken) + percentage) / newQuizzesTaken;
        const newTotalXP = stats.totalXP + xpGained;
        const newLevel = Math.floor(newTotalXP / 100) + 1;

        // Need to calculate history outside setStats to pass it to updateProfile
        const newHistory = [
            ...stats.history,
            { date: new Date().toLocaleDateString(), xp: xpGained, score: percentage }
        ].slice(-10);

        // Optimistic Update
        setStats(prev => {
            return {
                ...prev,
                totalXP: newTotalXP,
                quizzesTaken: newQuizzesTaken,
                averageScore: newAverageScore,
                characterState: calculateCharacterState(newAverageScore),
                history: newHistory,
                level: newLevel
            };
        });

        // Persist to Backend
        try {
            if (updateProfile) {
                await updateProfile({
                    xp: newTotalXP,
                    level: newLevel,
                    averageScore: newAverageScore,
                    quizzesTaken: newQuizzesTaken,
                    history: newHistory
                });
            }
        } catch (e) {
            console.error("Failed to save quiz result", e);
        }
    };

    return (
        <GameContext.Provider value={{ stats, submitQuizResult }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}
