"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, User, Github, Twitter } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import HeroVisual from '../../components/landing/HeroVisual';

import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleLogin, error } = useAuth();
    const router = useRouter();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                await googleLogin(tokenResponse);
                router.push('/user/dashboard');
            } catch (err) {
                console.error("Google Login failed", err);
            }
        },
        onError: () => console.log('Google Login Failed'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/user/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#E2852E] relative overflow-hidden">
            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] rounded-full border-2 border-white/10 border-dashed"
                />
            </div>

            {/* Left Column: Visual */}
            <div className="hidden lg:flex items-center justify-center bg-white/5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent" />
                <HeroVisual />
            </div>

            {/* Right Column: Form */}
            <div className="flex items-center justify-center p-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20"
                >
                    {/* ... (Header) */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-2">
                            <span className="text-3xl filter drop-shadow-md">👾</span>
                            <span className="drop-shadow-md">Monstrack</span>
                        </Link>
                        <h2 className="text-xl text-white/90 font-medium">Welcome Back!</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ... (Email/Password fields) ... */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-white text-[#E2852E] font-bold py-3 rounded-xl shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                        >
                            Sign In <ArrowRight className="h-5 w-5" />
                        </motion.button>
                        {error && (
                            <p className="text-sm text-red-300 text-center mt-3">
                                {error}
                            </p>
                        )}
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-white/50">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white">
                                <Github className="h-5 w-5" />
                                <span className="text-sm font-medium">GitHub</span>
                            </button>
                            <button
                                onClick={() => loginWithGoogle()}
                                type="button"
                                className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                            >
                                {/* Google SVG Icon */}
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                </svg>
                                <span className="text-sm font-medium">Google</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-white/60">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium text-white hover:underline decoration-2 underline-offset-4">
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}