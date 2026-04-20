import { GameProvider } from '../../context/GameContext';
import Sidebar from '../../components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <GameProvider>
            <div className="min-h-screen bg-gray-50/50">
                <Sidebar />
                <main className="pl-20 lg:pl-72 min-h-screen transition-all duration-300">
                    <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </GameProvider>
    );
}
