'use client';

import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
    const { loginDemo } = useAuth();
    const router = useRouter();

    useEffect(() => {
        loginDemo();
        router.push('user/dashboard');
    }, [loginDemo, router]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Setting up Demo Mode...</h1>
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            </div>
        </div>
    );
}
