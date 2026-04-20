import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDonut({ data, labels, title, colors }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors || [
                    '#6366F1', // Indigo
                    '#E2852E', // Orange
                    '#10B981', // Emerald
                    '#F59E0B', // Amber
                ],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        cutout: '75%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 11
                    },
                    color: '#6B7280'
                }
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: '#1F2937',
                bodyColor: '#1F2937',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                usePointStyle: true,
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-gray-100 flex flex-col items-center h-full relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -z-1" />

            <h3 className="text-lg font-bold text-gray-900 w-full mb-4 z-10">{title}</h3>

            <div className="flex-1 w-full min-h-[200px] relative">
                <Doughnut data={chartData} options={options} />
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                    <span className="text-3xl font-extrabold text-gray-900">{data.reduce((a, b) => a + b, 0)}</span>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wide">Total</span>
                </div>
            </div>
        </div>
    );
}
