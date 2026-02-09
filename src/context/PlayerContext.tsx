import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Video } from '../types';

interface PlayerContextType {
    activeVideo: Video | null;
    isPlaying: boolean;
    isMinimized: boolean;
    isExpanded: boolean;
    playVideo: (video: Video) => void;
    togglePlay: () => void;
    minimizePlayer: () => void;
    maximizePlayer: () => void;
    closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeVideo, setActiveVideo] = useState<Video | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // isExpanded is true whenever there is an active video, regardless of minimization
    const isExpanded = !!activeVideo;

    const playVideo = (video: Video) => {
        setActiveVideo(video);
        setIsPlaying(true);
        setIsMinimized(false);
    };

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const minimizePlayer = () => {
        setIsMinimized(true);
    };

    const maximizePlayer = () => {
        setIsMinimized(false);
    };

    const closePlayer = () => {
        setActiveVideo(null);
        setIsPlaying(false);
        setIsMinimized(false);
    };

    return (
        <PlayerContext.Provider
            value={{
                activeVideo,
                isPlaying,
                isMinimized,
                isExpanded,
                playVideo,
                togglePlay,
                minimizePlayer,
                maximizePlayer,
                closePlayer,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};
