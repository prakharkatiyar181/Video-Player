import React from 'react';
import { PlayCircle, Search, Bell, User } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-3">
                    <PlayCircle className="h-8 w-8 text-blue-500" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-2xl">
                        StreamFlow
                    </h1>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-white transition-colors">
                        <Search className="h-6 w-6" />
                    </button>
                    <button className="hover:text-white transition-colors relative">
                        <Bell className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                            2
                        </span>
                    </button>
                    <button className="hover:text-white transition-colors">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                            PK
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};
