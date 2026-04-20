
import { motion } from 'framer-motion';
import MonsterCard from '../dashboard/MonsterCard';

export default function HeroVisual() {
    return (
        <div className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center items-center h-full min-h-[500px]">
            {/* Holographic Platform Effect */}
            <div className="absolute bottom-1/4 w-64 h-12 bg-black/20 blur-xl rounded-[100%]" />

            <div className="relative z-10 transform transition-transform hover:scale-105 duration-500">
                <div className="relative">
                    {/* Glowing Ring Background */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-8 rounded-full border-2 border-dashed border-white/30"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 rounded-full border border-white/20"
                    />

                    <MonsterCard stage={4} xp={75} level={12} name="Preview Monster" variant="classic" />

                    {/* Scanning Effect */}
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-cyan-400/50 blur-sm z-20"
                        style={{ top: '0%' }}
                    />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Floating XP Bubbles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-[#E2852E] shadow-lg border-2 border-[#E2852E]/20"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                        y: [100, -100],
                        opacity: [0, 1, 0],
                        x: Math.random() * 100 - 50,
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                    style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: '80%'
                    }}
                >
                    XP
                </motion.div>
            ))}
        </div>
    );
}
