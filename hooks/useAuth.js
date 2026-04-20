"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import apiClient from '../lib/apiClient';
import { demoUser } from '../lib/mockData';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDemo, setIsDemo] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const updateUser = (newUser) => {
        setUser(prev => ({ ...prev, ...newUser }));
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('monstrack_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // LOGIN
    const login = async (email, password) => {
        setError(null);
        try {
            const res = await apiClient.post('/auth/login', {
                email,
                password,
            });

            const userData = {
                id: res.data.userId,
                email: res.data.email,
                level: res.data.level,
                xp: res.data.xp,
                name: res.data.name || res.data.email.split('@')[0],
                averageScore: res.data.averageScore || 0,
                quizzesTaken: res.data.quizzesTaken || 0,
                history: res.data.history || [],
            };

            setUser(userData);
            localStorage.setItem('monstrack_user', JSON.stringify(userData));

            return userData;
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('Server error. Please try again.');
            }
            throw err;
        }
    };
    // REAL SIGNUP
    const signup = async (name, email, password) => {
        setError(null);
        try {
            const res = await apiClient.post('/auth/signup', {
                name,
                email,
                password,
            });

            //  auto-login after signup
            const userData = {
                id: res.data.id,
                email: res.data.email,
                level: res.data.level,
                xp: res.data.xp,
                name: name, // We have the name from input
            };


            setUser(userData);
            localStorage.setItem('monstrack_user', JSON.stringify(userData));

            return userData;
        } catch (err) {
            console.error('FULL SIGNUP ERROR:', err.response?.data);
            console.log('Error details:', err.toJSON());
            alert(`Signup Failed: ${JSON.stringify(err.response?.data?.message || err.message)}`);
            setError(err.response?.data?.message || 'Signup failed');
            throw err;
        }
    };


    // DEMO LOGIN
    const loginDemo = () => {
        setIsDemo(true);
        setUser(demoUser);
        localStorage.setItem('monstrack_demo', 'true');
    };

    const logout = () => {
        setUser(null);
        setIsDemo(false);
        localStorage.removeItem('monstrack_user');
        localStorage.removeItem('monstrack_demo');
        router.push('/')
    };

    const updateProfile = async (data) => {
        try {
            if (!user?.id) return;
            // Call backend
            const res = await apiClient.patch(`/auth/${user.id}`, data);

            // Update local state and storage with result from backend
            const updatedUser = { ...user, ...res.data };

            // Backend might return the full entity, let's ensure we map it correctly
            // backend 'name' -> frontend 'name'
            if (res.data.name) updatedUser.name = res.data.name;
            if (res.data.email) updatedUser.email = res.data.email;

            setUser(updatedUser);
            localStorage.setItem('monstrack_user', JSON.stringify(updatedUser));
            alert('Profile updated successfully!');
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update profile');
        }
    };

    const setLocalUser = (userData) => {
        setUser(userData);
        localStorage.setItem('monstrack_user', JSON.stringify(userData));
    };

    const googleLogin = async (tokenResponse) => {
        setError(null);
        try {
            // useGoogleLogin hook returns access_token, not credential
            const token = tokenResponse.access_token || tokenResponse.credential;

            const res = await apiClient.post('/auth/google-login', {
                token: token
            });
            const userData = {
                id: res.data.userId,
                email: res.data.email,
                level: res.data.level,
                xp: res.data.xp,
                name: res.data.name,
                averageScore: res.data.averageScore || 0,
                quizzesTaken: res.data.quizzesTaken || 0,
                history: res.data.history || [],
            };
            setUser(userData);
            localStorage.setItem('monstrack_user', JSON.stringify(userData));
            return userData;
        } catch (err) {
            console.error('Google login error', err);
            setError('Google Login Failed');
            throw err;
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, error, isDemo, login, signup, loginDemo, logout, updateProfile, setLocalUser, googleLogin, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
