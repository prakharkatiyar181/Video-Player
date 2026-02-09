import React from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Minimize2 } from 'lucide-react';

interface PlayerControlsProps {
    isPlaying: boolean;
    progress: number;
    duration: number;
    onTogglePlay: () => void;
    onSeek: (time: number) => void;
    onSkip: (seconds: number) => void;
    onMinimize: () => void;
    onClose: () => void;
    title: string;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
    isPlaying,
    progress,
    duration,
    onTogglePlay,
    onSeek,
    onSkip,
    onMinimize,
    onClose,
    title,
}) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="absolute inset-0 flex flex-col justify-between bg-black/40 p-4 transition-opacity duration-300 hover:opacity-100 opacity-0 md:opacity-100">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
                <button onClick={onMinimize} className="rounded-full p-2 hover:bg-white/20 text-white">
                    <Minimize2 className="h-6 w-6" />
                </button>
                <h2 className="flex-1 text-center font-medium text-white line-clamp-1 px-4">{title}</h2>
                <button onClick={onClose} className="rounded-full p-2 hover:bg-white/20 text-white">
                    <X className="h-6 w-6" />
                </button>
            </div>

            {/* Center Controls */}
            <div className="flex items-center justify-center gap-8">
                <button onClick={() => onSkip(-10)} className="p-2 hover:bg-white/20 rounded-full text-white">
                    <SkipBack className="h-8 w-8" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onTogglePlay();
                    }}
                    className="p-4 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm text-white"
                >
                    {isPlaying ? <Pause className="h-10 w-10 fill-white" /> : <Play className="h-10 w-10 fill-white" />}
                </button>
                <button onClick={() => onSkip(10)} className="p-2 hover:bg-white/20 rounded-full text-white">
                    <SkipForward className="h-8 w-8" />
                </button>
            </div>

            {/* Bottom Progress */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={progress}
                    onChange={(e) => onSeek(Number(e.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/30 accent-red-600 hover:bg-white/50"
                />
            </div>
        </div>
    );
};
