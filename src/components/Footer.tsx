import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t border-white/10 bg-[#0f0f0f] py-8 pb-8 md:pb-8 mt-5">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <p className="text-sm text-gray-400">
                        &copy; 2026 StreamFlow. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Github className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
