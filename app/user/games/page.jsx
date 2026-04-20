"use client";
import { useState } from 'react';
import { useGame } from '../../../context/GameContext';
import { Brain, Sparkles, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GAMES = [
    {
        id: 'mood-check',
        title: 'Mood & Anxiety Check',
        description: 'Understand your current emotional state.',
        color: 'bg-blue-100 text-blue-600',
        questions: [
            { q: "How often do you feel overwhelmed?", options: ["Rarely", "Sometimes", "Often", "Always"], correct: 0 },
            { q: "Do you find it hard to relax?", options: ["No, easy", "Sometimes", "Yes, often", "Always"], correct: 0 },
            { q: "When stressed, you usually:", options: ["Exercise/Talk", "Ignore it", "Overeat", "Panic"], correct: 0 },
            { q: "Are you enjoying your daily activities?", options: ["Yes, mostly", "Somewhat", "Not really", "Not at all"], correct: 0 },
        ]
    },
    {
        id: 'social-connection',
        title: 'Social Connection',
        description: 'Assess your social well-being and support.',
        color: 'bg-purple-100 text-purple-600',
        questions: [
            { q: "How often do you talk to friends/family?", options: ["Daily", "Weekly", "Rarely", "Never"], correct: 0 },
            { q: "Do you feel lonely even when with others?", options: ["Never", "Rarely", "Sometimes", "Often"], correct: 0 },
            { q: "Can you share your feelings with someone?", options: ["Yes, easily", "Maybe one person", "Hard to say", "No one"], correct: 0 },
            { q: "Do you feel supported by your peers?", options: ["Very supported", "Somewhat", "Not much", "Not at all"], correct: 0 },
        ]
    },
    {
        id: 'sleep-energy',
        title: 'Sleep & Energy',
        description: 'Check your rest patterns and vitality.',
        color: 'bg-indigo-100 text-indigo-600',
        questions: [
            { q: "How many hours of sleep do you average?", options: ["7-9 hours", "5-6 hours", "< 5 hours", "> 10 hours"], correct: 0 },
            { q: "Do you wake up feeling rested?", options: ["Yes", "Usually", "Rarely", "Never"], correct: 0 },
            { q: "Do you rely on caffeine to function?", options: ["No", "A little", "Heavily", "Can't live without"], correct: 0 },
            { q: "How is your energy level by mid-day?", options: ["High", "Moderate", "Low", "Crashed"], correct: 0 },
        ]
    },
    {
        id: 'self-worth',
        title: 'Self-Worth & Positivity',
        description: 'Reflect on your self-image and outlook.',
        color: 'bg-yellow-100 text-yellow-600',
        questions: [
            { q: "I feel proud of my achievements.", options: ["Often", "Sometimes", "Rarely", "Never"], correct: 0 },
            { q: "When I fail, I tell myself:", options: ["I'll try again", "It's okay", "I'm stupid", "I give up"], correct: 0 },
            { q: "I deserve happiness.", options: ["True", "Maybe", "Unsure", "False"], correct: 0 },
            { q: "I compare myself to others:", options: ["Rarely", "Sometimes", "Often", "Constantly"], correct: 0 },
        ]
    },
    {
        id: 'focus-flow',
        title: 'Focus & Productivity',
        description: 'Evaluate your concentration and drive.',
        color: 'bg-green-100 text-green-600',
        questions: [
            { q: "Can you focus on a task for 30 mins?", options: ["Yes, easily", "With effort", "Hardly", "Impossible"], correct: 0 },
            { q: "How organized is your daily schedule?", options: ["Very", "Somewhat", "Chaotic", "Non-existent"], correct: 0 },
            { q: "Do you set clear goals for the day?", options: ["Yes", "Sometimes", "Rarely", "Never"], correct: 0 },
            { q: "Distractions affect me:", options: ["Little", "Moderately", "A lot", "Severely"], correct: 0 },
        ]
    }
];

export default function GamesPage() {
    const { submitQuizResult } = useGame();
    const [activeGame, setActiveGame] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleSelectGame = (game) => {
        setActiveGame(game);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };

    const handleAnswer = (optionIndex) => {
        const isCorrect = optionIndex === activeGame.questions[currentQuestion].correct;
        if (isCorrect) setScore(s => s + 1);

        if (currentQuestion + 1 < activeGame.questions.length) {
            setCurrentQuestion(curr => curr + 1);
        } else {
            // Finish
            const finalScore = isCorrect ? score + 1 : score;
            // Submit to Context
            // Calculate a normalized score out of 100 for the context logic
            // Assuming max score is questions.length
            const normalizedScore = (finalScore / activeGame.questions.length) * 100;
            submitQuizResult(normalizedScore, 100);

            setShowResult(true);
        }
    };

    const reset = () => {
        setActiveGame(null);
        setShowResult(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        Arcade Area
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Train your mind to level up your monster.
                    </p>
                </div>
            </header>

            {!activeGame ? (
                <div className="grid gap-6 md:grid-cols-2">
                    {GAMES.map(game => (
                        <motion.button
                            key={game.id}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelectGame(game)}
                            className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 text-left hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            {/* Decorative Background Blob */}
                            <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 ${game.color.split(' ')[0]}`} />

                            <div className={`h-14 w-14 rounded-2xl ${game.color} flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform ring-4 ring-opacity-50 ring-white shadow-sm`}>
                                <Brain />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">{game.description}</p>
                            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-gray-300 group-hover:text-gray-900 transition-colors uppercase tracking-widest">
                                Start Quiz <span>→</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-6 lg:p-8 relative">
                    <button onClick={reset} className="absolute top-4 right-4 lg:top-6 lg:right-6 text-gray-400 hover:text-gray-600">
                        <XCircle size={28} />
                    </button>

                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full max-w-lg text-center"
                            >
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                                    Question {currentQuestion + 1} / {activeGame.questions.length}
                                </span>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                    {activeGame.questions[currentQuestion].q}
                                </h2>
                                <div className="grid gap-4">
                                    {activeGame.questions[currentQuestion].options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="w-full bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border border-transparent p-4 rounded-xl font-medium transition-all text-left"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <Sparkles size={40} />
                                </div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Quiz Complete!</h2>
                                <p className="text-gray-500 mb-8">You scored {score} out of {activeGame.questions.length}</p>

                                <button
                                    onClick={reset}
                                    className="px-8 py-3 bg-[#E2852E] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/30"
                                >
                                    Back to Arcade
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
