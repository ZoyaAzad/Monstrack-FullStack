'use client';

import Hero from '../components/landing/Hero';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import DashboardPreview from '../components/dashboard/DashboardPreview';
import { demoUser } from '../lib/mockData';

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturesSection />
            <HowItWorks />

            <section className="bg-[#6366F1] py-24 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                </div>

                <div className="container-center relative z-10">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-md">
                            See Your Progress
                        </h2>
                        <p className="mt-4 text-lg text-white/90 font-medium">
                            Visualize your growth and keep your monster happy.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 overflow-hidden">
                        <DashboardPreview user={demoUser} />
                    </div>
                </div>
            </section>
        </>
    );
}
