"use client";
import { useState, useEffect } from 'react';
import { Settings, User, Bell, Shield, Moon, Save, X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

export default function SettingsPage() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
            <header className="mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm lg:text-base text-gray-500">Manage your profile and preferences.</p>
            </header>

            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 lg:p-8 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-md text-white shrink-0">
                                {user?.avatarEmoji || '👾'}
                            </div>

                            {!isEditing && (
                                <div className="md:hidden">
                                    <h2 className="text-lg font-bold text-gray-900">{user?.name || 'Hunter Profile'}</h2>
                                    <p className="text-sm text-gray-500 truncate max-w-[150px]">{user?.email || 'hunter@monstrack.com'}</p>
                                </div>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="flex-1 space-y-3 w-full max-w-sm">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Display Name"
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Email Address"
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Hunter Profile'}</h2>
                                <p className="text-gray-500">{user?.email || 'hunter@monstrack.com'}</p>
                            </div>
                        )}

                        <div className="md:ml-auto flex gap-2 w-full md:w-auto">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white font-bold rounded-xl text-sm hover:bg-green-600 transition flex items-center justify-center gap-2"
                                    >
                                        <Save size={16} /> Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 md:flex-none px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <X size={16} /> Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full md:w-auto px-4 py-2 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <SettingItem icon={User} title="Account Information" description="Update your name and email." />
                    <SettingItem icon={Bell} title="Notifications" description="Choose what we update you on." />
                    <SettingItem icon={Shield} title="Privacy & Security" description="Password and authentication." />
                    <SettingItem icon={Moon} title="Appearance" description="Dark mode and theme customization." />
                </div>
            </div>
        </div>
    );
}

function SettingItem({ icon: Icon, title, description }) {
    return (
        <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all group text-left">
            <div className="h-10 w-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="text-gray-300">→</div>
        </button>
    );
}
