import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, Mouse } from 'lucide-react';
import MonsterCard from '../dashboard/MonsterCard';

export default function Hero() {
    const scrollToExplore = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center bg-[#E2852E] pt-16">
            <div className="container-center grid gap-12 lg:grid-cols-2 lg:items-center relative z-10">

                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-sm">
                        Turn your <span className="text-yellow-300">Habits</span> into <span className="text-cyan-300">Monsters</span>
                    </h1>
                    <p className="mt-6 text-lg text-white/90 font-medium">
                        Monstrack gamifies your life. Complete tasks, earn XP, and watch your personal monster evolve.
                        Level up your productivity today.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-bold text-[#E2852E] shadow-lg transition-transform hover:scale-105 hover:bg-gray-100"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/20"
                        >
                            Explore Demo
                        </Link>
                    </div>
                </motion.div>

                {/* Right Column: Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center"
                >
                    {/* Holographic Platform Effect */}
                    <div className="absolute bottom-0 w-64 h-12 bg-black/20 blur-xl rounded-[100%]" />

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
                    <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

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
                </motion.div>
            </div>

            {/* Scroll To Explore Button */}
            <motion.button
                onClick={scrollToExplore}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: 5 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer z-20"
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Mouse className="h-6 w-6 drop-shadow-md" />
                </motion.div>
                <span className="text-sm font-bold tracking-widest uppercase drop-shadow-md">Scroll to Explore</span>
                <ArrowDown className="h-4 w-4 animate-bounce drop-shadow-md" />
            </motion.button>
        </section>
    );
}
