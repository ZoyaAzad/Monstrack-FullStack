import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import FireIcon from './icons/FireIcon';
import RocketIcon from './icons/RocketIcon';
import StarIcon from './icons/StarIcon';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function ChartXP({ labels, data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: { size: 10, weight: '600' }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                displayColors: true,
                usePointStyle: true,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(107, 114, 128, 0.06)',
                    borderDash: [5, 5],
                },
                ticks: { display: false }, // Cleaner look
                border: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 11
                    }
                },
                border: { display: false }
            }
        },
        elements: {
            line: {
                tension: 0.4, // Smooth zig-zag
            },
            point: {
                radius: 4,
                hitRadius: 20,
                hoverRadius: 8,
            }
        }
    };

    // Generate mock target data for the "extra graph" feel
    const targetData = data.map(() => 50 + Math.random() * 40);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'XP Gained',
                data: data,
                borderColor: '#E2852E',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(226, 133, 46, 0.4)');
                    gradient.addColorStop(1, 'rgba(226, 133, 46, 0.0)');
                    return gradient;
                },
                fill: true,
                borderWidth: 3,
            },
            {
                label: 'Projected',
                data: targetData,
                borderColor: '#9CA3AF',
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderDash: [5, 5], // Dashed line
                pointRadius: 0, // No points for target
                pointHoverRadius: 0,
                tension: 0.2,
            }
        ],
    };

    // Mock data for "Weekly Vibes"
    const stats = [
        { Icon: FireIcon, label: '7 Day Streak', value: 'On Fire!' },
        { Icon: RocketIcon, label: 'Productivity', value: '+12%' },
        { Icon: StarIcon, label: 'Top Skill', value: 'Coding' },
    ];

    return (
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-gray-100 h-full flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Activity Level</h3>
                    <p className="text-sm text-gray-400 font-medium">Your daily XP gained</p>
                </div>
                <div className="flex gap-2 bg-gray-50 p-1 rounded-xl">
                    {['1W', '1M', '3M', '1Y'].map((range, i) => (
                        <button
                            key={range}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${i === 0
                                ? 'bg-white text-[#E2852E] shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-[250px] relative">
                <Line options={options} data={chartData} />
            </div>

            {/* Weekly Vibes Section */}
            <div className="mt-8 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between mb-4 px-1">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Weekly Vibes</h4>
                    <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">Updated</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: '#FFFBEB' }}
                            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse"></div>
                            </div>

                            <motion.div
                                className="h-12 w-12 mb-3"
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: idx * 0.5 // Stagger animations
                                }}
                            >
                                <stat.Icon />
                            </motion.div>

                            <span className="text-sm font-bold text-gray-900 leading-tight">{stat.value}</span>
                            <span className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wide">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
