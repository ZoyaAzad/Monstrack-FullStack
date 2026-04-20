"use client";
import { usePathname } from 'next/navigation';
import LandingHeader from './landing/LandingHeader';
import Header from './landing/Header';
import Footer from './landing/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const isLandingPage = pathname === '/';
    const isDashboard = pathname.startsWith('/user');

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE"}>
            {!isAuthPage && !isDashboard && (isLandingPage ? <LandingHeader /> : <Header />)}
            <main className="flex-grow">
                {children}
            </main>
            {!isAuthPage && !isDashboard && <Footer />}
        </GoogleOAuthProvider>
    );
}
