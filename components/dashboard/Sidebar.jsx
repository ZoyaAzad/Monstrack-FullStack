"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Gamepad2, User, LogOut, BookOpen, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/user/dashboard' },
    { name: 'My Companion', icon: User, href: '/user/character' },
    { name: 'Arcade', icon: Gamepad2, href: '/user/games' },
    { name: 'Settings', icon: Settings, href: '/user/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 lg:w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-100 flex flex-col z-50 transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Logo */}
            <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8">
                <Link href="/user/dashboard" className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-md overflow-hidden">
                        <img src="/monstrack-logo1.jpg" alt="Monstrack" className="h-full w-full object-cover" />
                    </div>
                    <span className="hidden lg:block font-black text-2xl text-gray-900 tracking-tighter">Monstrack</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                <div className="hidden lg:block px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Menu
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex items-center justify-center lg:justify-start gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'text-[#E2852E]' : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-orange-50 rounded-2xl border border-orange-100/50 shadow-sm"
                                    initial={false}
                                    transition={{ type: "spring", duration: 0.5 }}
                                />
                            )}

                            <item.icon
                                className={`h-[22px] w-[22px] relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'drop-shadow-sm' : ''}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />

                            <span className={`hidden lg:block relative z-10 font-bold tracking-tight ${isActive ? '' : 'font-medium'}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}

                {/* Promo Card (Sidebar Footer) */}
                <div className="hidden lg:block mt-8 mx-2 p-4 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg relative overflow-hidden group cursor-pointer">
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                    <h4 className="font-bold relative z-10">Pro Plan</h4>
                    <p className="text-xs text-white/80 mt-1 relative z-10">Unlock exclusive skins and stats!</p>
                </div>
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
                <button
                    onClick={logout}
                    className="flex items-center justify-center lg:justify-between gap-3 px-3 py-3 w-full text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg border border-gray-200">
                            {user?.avatarEmoji || '👤'}
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-sm font-bold text-gray-900 group-hover:text-red-500">{user?.name || 'Hunter'}</p>
                            <p className="text-xs font-medium text-gray-400">Log Out</p>
                        </div>
                    </div>
                    <LogOut className="h-5 w-5 hidden lg:block" />
                </button>
            </div>
        </aside>
    );
}
