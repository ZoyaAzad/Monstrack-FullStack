import { CheckSquare, Zap, ShieldCheck, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <CheckSquare className="h-8 w-8 text-primary" />,
        title: 'Task Creation',
        description: 'Easily create and organize tasks across different domains like Fitness, Learning, and Work.',
    },
    {
        icon: <Zap className="h-8 w-8 text-accent" />,
        title: 'Gamified Evolution',
        description: 'Earn XP for every completed task and watch your unique monster evolve through 5 stages.',
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
        title: 'Verification Quizzes',
        description: 'Verify your hard tasks with quick quizzes or proof uploads to ensure honest progress.',
    },
    {
        icon: <Layers className="h-8 w-8 text-cool" />,
        title: 'Multi-Domain Tracking',
        description: 'Track your growth across multiple areas of life and see where you excel the most.',
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-[#F5C857] py-24">
            <div className="container-center">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Level Up Your Life
                    </h2>
                    <p className="mt-4 text-lg text-gray-900 font-medium">
                        Everything you need to stay motivated and consistent.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="rounded-2xl bg-white p-8 shadow-md transition-shadow hover:shadow-xl"
                        >
                            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
