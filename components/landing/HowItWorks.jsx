import { motion } from 'framer-motion';
import { PlusCircle, CheckCircle, TrendingUp, Sparkles, Trophy } from 'lucide-react';

const steps = [
    {
        icon: <PlusCircle className="h-6 w-6 text-white" />,
        title: 'Create Task',
        description: 'Set your goals and deadlines.',
        color: 'bg-blue-500',
    },
    {
        icon: <CheckCircle className="h-6 w-6 text-white" />,
        title: 'Complete & Verify',
        description: 'Finish tasks and prove it.',
        color: 'bg-green-500',
    },
    {
        icon: <TrendingUp className="h-6 w-6 text-white" />,
        title: 'Earn XP',
        description: 'Get rewarded for your effort.',
        color: 'bg-accent',
    },
    {
        icon: <Sparkles className="h-6 w-6 text-white" />,
        title: 'Evolve Monster',
        description: 'Unlock new forms and abilities.',
        color: 'bg-primary',
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-[#FFEE91] py-24">
            <div className="container-center">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How It Works
                    </h2>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 bg-gray-900/10 lg:block" />

                    <div className="grid gap-8 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex flex-col items-center text-center">
                                <div className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full ${step.color} shadow-lg ring-4 ring-[#FFEE91]`}>
                                    {step.icon}
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                                <p className="text-sm text-gray-800 font-medium">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Animated Demo Section */}
                <div className="mt-16 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5 relative h-96 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="relative w-full max-w-lg aspect-video flex items-center justify-center">
                        {/* Task Card Animation */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="absolute left-8 top-1/2 -translate-y-1/2 w-48 bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-10"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <div className="h-2 w-20 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-2 w-12 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <motion.div
                                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
                                    animate={{ backgroundColor: ["#F9FAFB", "#DCFCE7", "#F9FAFB"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    <motion.div
                                        className="h-4 w-4 rounded-full border-2 border-gray-300 flex items-center justify-center"
                                        animate={{
                                            borderColor: ["#D1D5DB", "#22C55E", "#D1D5DB"],
                                            backgroundColor: ["transparent", "#22C55E", "transparent"]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                        >
                                            <CheckCircle size={10} className="text-white" />
                                        </motion.div>
                                    </motion.div>
                                    <div className="h-2 w-24 bg-gray-200 rounded"></div>
                                </motion.div>
                            </div>

                            {/* Floating XP Text */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 font-bold px-2 py-1 rounded-full text-xs shadow-md"
                                initial={{ opacity: 0, scale: 0, y: 0 }}
                                animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0], y: [0, -20, -30, -40] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, times: [0, 0.2, 0.5, 1] }}
                            >
                                +50 XP
                            </motion.div>
                        </motion.div>

                        {/* Connecting Arrow */}
                        <motion.div
                            className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden mx-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="h-full bg-blue-500 w-1/2"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>

                        {/* Monster Card Evolution */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-2 rounded-xl shadow-xl border-4 border-yellow-400 w-40 relative z-10"
                        >
                            <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden relative">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                    className="text-4xl"
                                >
                                    👾
                                </motion.div>

                                <motion.div
                                    className="absolute inset-0 bg-white"
                                    animate={{ opacity: [0, 0.8, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, times: [0.4, 0.5, 0.6] }}
                                />
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-500"
                                    animate={{ width: ["10%", "80%", "10%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                />
                            </div>
                            <div className="mt-1 flex justify-between text-xs text-gray-500 font-bold">
                                <span>Lvl 3</span>
                                <motion.span
                                    animate={{ color: ["#6B7280", "#EAB308", "#6B7280"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    Level Up!
                                </motion.span>
                            </div>

                            {/* Trophy Popup */}
                            <motion.div
                                className="absolute -top-6 left-1/2 -translate-x-1/2"
                                animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
                            >
                                <Trophy className="text-yellow-500 fill-yellow-400 h-8 w-8 drop-shadow-md" />
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-4 text-center w-full text-gray-400 text-sm font-medium">
                        Complete tasks to evolve your companion
                    </div>
                </div>

            </div>
        </section>
    );
}
