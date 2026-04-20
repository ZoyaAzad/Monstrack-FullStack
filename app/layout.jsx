import '../styles/globals.css';
import { AuthProvider } from '../hooks/useAuth';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
    title: 'Monstrack - Gamify Your Life',
    description: 'Turn your habits into monsters. Track tasks, earn XP, and evolve.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
                <AuthProvider>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </AuthProvider>
            </body>
        </html>
    );
}


