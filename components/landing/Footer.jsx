import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-[#ABE0F0] py-12">
            <div className="container-center grid gap-8 md:grid-cols-4">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                        <span className="text-2xl">👾</span> Monstrack
                    </Link>
                    <p className="text-sm text-gray-700 font-medium">
                        Gamify your life. Evolve your monster. Achieve your goals.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Product</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><Link href="/user/dashboard" className="hover:text-primary">Dashboard</Link></li>
                        <li><Link href="/tasks" className="hover:text-primary">Tasks</Link></li>
                        <li><Link href="/demo" className="hover:text-primary">Demo</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><Link href="/about" className="hover:text-primary">About</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Connect</h3>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-600 hover:text-primary">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="mailto:hello@monstrack.com" className="text-gray-600 hover:text-primary">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container-center mt-12 border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Monstrack. All rights reserved.
            </div>
        </footer>
    );
}
