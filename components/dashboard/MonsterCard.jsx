import { motion } from 'framer-motion';
import { STAGES } from '../../utils/evolutionRules';
import { Sparkles, Zap } from 'lucide-react';
import DuckIcon from './icons/DuckIcon';

export default function MonsterCard({ stage = 1, xp = 0, level = 1, name = 'Unknown', variant = 'modern' }) {
    const stageInfo = STAGES[stage] || STAGES[1];

    if (variant === 'classic') {
        // Classic SVG Monster Render
        const renderClassicMonster = () => {
            switch (stage) {
                case 1: // Egg
                    return (
                        <motion.svg viewBox="0 0 100 100" className="w-32 h-32" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <circle cx="50" cy="50" r="40" fill="#FFEE91" stroke="#E2852E" strokeWidth="3" />
                            <path d="M30 40 Q50 60 70 40" fill="none" stroke="#E2852E" strokeWidth="2" opacity="0.5" />
                        </motion.svg>
                    );
                case 2: // Hatchling
                    return (
                        <motion.svg viewBox="0 0 100 100" className="w-32 h-32" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                            <circle cx="50" cy="50" r="35" fill="#F5C857" />
                            <circle cx="40" cy="45" r="5" fill="black" />
                            <circle cx="60" cy="45" r="5" fill="black" />
                            <path d="M45 60 Q50 65 55 60" fill="none" stroke="black" strokeWidth="2" />
                        </motion.svg>
                    );
                default: // Rookie and above
                    return (
                        <motion.svg viewBox="0 0 100 100" className="w-40 h-40" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                            <rect x="25" y="25" width="50" height="50" rx="10" fill="#E2852E" />
                            <circle cx="40" cy="45" r="5" fill="white" />
                            <circle cx="40" cy="45" r="2" fill="black" />
                            <circle cx="60" cy="45" r="5" fill="white" />
                            <circle cx="60" cy="45" r="2" fill="black" />
                            <path d="M40 65 Q50 75 60 65" fill="none" stroke="white" strokeWidth="3" />
                            <path d="M20 50 L10 40" stroke="#E2852E" strokeWidth="5" strokeLinecap="round" />
                            <path d="M80 50 L90 40" stroke="#E2852E" strokeWidth="5" strokeLinecap="round" />
                        </motion.svg>
                    );
            }
        }

        return (
            <motion.div
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-br from-accent to-primary opacity-20 blur-2xl" />

                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 relative">
                        {renderClassicMonster()}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-sm font-medium text-primary">{stageInfo.name} Stage</p>

                    <div className="mt-4 w-full">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Level {level}</span>
                            <span>{xp} XP</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/50 border border-gray-100">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${(xp % 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Modern 3D Emojis based on stage
const renderMonster = () => {
    switch (stage) {
        case 1: // Egg
            return (
                <motion.div
                    className="text-8xl filter drop-shadow-2xl"
                    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    🥚
                </motion.div>
            );

        case 2: // Hatchling
            return (
                <div className="relative">
                    <motion.div
                        className="text-8xl filter drop-shadow-2xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        🐣
                    </motion.div>
                    <motion.div
                        className="absolute -top-2 -right-2 text-yellow-300"
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles size={24} fill="currentColor" />
                    </motion.div>
                </div>
            );

        default: // Rookie and above
            return (
                <div className="relative">
                    <motion.div
                        className="text-8xl filter drop-shadow-2xl"
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        👾
                    </motion.div>
                    <motion.div
                        className="absolute -top-4 -right-4 text-cyan-300"
                        animate={{ opacity: [0, 1, 0], rotate: [0, 90, 180] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Zap size={28} fill="currentColor" />
                    </motion.div>
                </div>
            );
    }
};

    return (
        <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 shadow-2xl h-full flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-center">
                <div className="mb-6 relative">
                    <motion.div
                        className="absolute inset-0 bg-white/30 blur-[60px] rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    {renderMonster()}
                </div>

                <div className="space-y-1 mb-6">
                    <h3 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">{name}</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white/90 text-xs font-bold uppercase tracking-wider">
                        {stageInfo.name} Stage
                    </div>
                </div>

                <div className="w-full bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-white/70 text-xs font-bold uppercase">Level {level}</span>
                        <span className="text-white font-mono text-sm">{xp} <span className="text-white/50 text-xs">/ 100 XP</span></span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-900/50 ring-1 ring-white/10">
                        <motion.div
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp % 100)}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
