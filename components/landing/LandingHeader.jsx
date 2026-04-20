"use client";
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

export default function LandingHeader() {
    const { user, logout, loginDemo } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            controls.start("open");
        } else {
            controls.start("closed");
        }
    }, [isMenuOpen, controls]);

    const path01Variants = {
        open: { d: "M3.06061 2.99999L21.0606 21", transition: { duration: 0.3 } },
        closed: { d: "M0 9.5L24 9.5", transition: { duration: 0.3 } }
    };

    const path02Variants = {
        open: { d: "M3.00006 21.0607L21 3.06064", transition: { duration: 0.3 } },
        closed: { d: "M0 14.5L24 14.5", transition: { duration: 0.3 } }
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-black/10 backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container-center flex h-20 items-center justify-between relative">
                {/* Logo - Left */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white z-20 drop-shadow-md">
                    <img src="/monstrack-logo1.jpg" alt="Monstrack" className="h-10 w-10 rounded-xl" />
                    <span className="drop-shadow-md">Monstrack</span>
                </Link>

                {/* Desktop Nav - Center */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    <Link href="/" className="text-sm font-bold text-white hover:text-white/80 transition-colors drop-shadow-md">Home</Link>
                    {user && (
                        <>
                            <Link href="/user/dashboard" className="text-sm font-bold text-white hover:text-white/80 transition-colors drop-shadow-md">Dashboard</Link>
                            <Link href="/user/games" className="text-sm font-bold text-white hover:text-white/80 transition-colors drop-shadow-md">Tasks</Link>
                        </>
                    )}
                </nav>

                {/* Auth Buttons - Right */}
                <div className="hidden md:flex items-center gap-4 z-20">
                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition-colors drop-shadow-md">
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-white/50" />
                                <span className="drop-shadow-md">{user.name}</span>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none hidden group-hover:block">
                                <button onClick={logout} className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <LogOut className="h-4 w-4" /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button onClick={loginDemo} className="text-sm font-bold text-white hover:text-white/80 transition-colors drop-shadow-md">
                                Try Demo
                            </button>
                            <Link href="/login" className="rounded-full bg-white px-6 py-2 text-sm font-bold text-[#E2852E] hover:bg-gray-100 transition-colors shadow-lg">
                                Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle with Animation */}
                {/* Mobile Menu Toggle with Animation */}
                <button
                    className="md:hidden p-2 text-white z-20 drop-shadow-md focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path
                            initial="closed"
                            animate={isMenuOpen ? "open" : "closed"}
                            variants={{
                                closed: { d: "M4 6L20 6" },
                                open: { d: "M6 18L18 6" }
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.path
                            initial="closed"
                            animate={isMenuOpen ? "open" : "closed"}
                            variants={{
                                closed: { opacity: 1, d: "M4 12L20 12" },
                                open: { opacity: 0, d: "M4 12L20 12" }
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.path
                            initial="closed"
                            animate={isMenuOpen ? "open" : "closed"}
                            variants={{
                                closed: { d: "M4 18L20 18" },
                                open: { d: "M6 6L18 18" }
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden bg-[#E2852E] border-b border-white/10 absolute top-full left-0 w-full shadow-xl overflow-hidden"
                    >
                        <div className="container-center py-6 flex flex-col gap-6">
                            <motion.div variants={itemVariants}>
                                <Link href="/" className="text-lg font-bold text-white hover:text-white/80" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            </motion.div>
                            {user ? (
                                <>
                                    <motion.div variants={itemVariants}>
                                        <Link href="/user/dashboard" className="text-lg font-bold text-white hover:text-white/80" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <Link href="/user/games" className="text-lg font-bold text-white hover:text-white/80" onClick={() => setIsMenuOpen(false)}>Tasks</Link>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-lg font-bold text-left text-white hover:text-white/80 flex items-center gap-2">
                                            <LogOut className="h-5 w-5" /> Logout
                                        </button>
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <motion.div variants={itemVariants}>
                                        <button onClick={() => { loginDemo(); setIsMenuOpen(false); }} className="text-lg font-bold text-left text-white hover:text-white/80">Try Demo</button>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <Link href="/login" className="text-lg font-bold text-white hover:text-white/80" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
