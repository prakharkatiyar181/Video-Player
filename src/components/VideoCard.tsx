import { Play } from 'lucide-react';
import type { Video } from '../types';
import { usePlayer } from '../context/PlayerContext';

interface VideoCardProps {
    video: Video;
    compact?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, compact = false }) => {
    const { playVideo, activeVideo } = usePlayer();
    const isActive = activeVideo?.slug === video.slug;

    return (
        <div
            className={`group relative cursor-pointer overflow-hidden rounded-xl bg-gray-900/50 transition-all hover:bg-gray-900/80 ${compact ? 'flex gap-3' : 'flex flex-col'}`}
            onClick={() => playVideo(video)}
        >
            {/* Thumbnail Container */}
            <div className={`relative shrink-0 overflow-hidden ${compact ? 'h-20 w-36 rounded-lg' : 'aspect-video w-full rounded-xl'}`}>
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay / Duration */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="h-5 w-5 fill-white text-white" />
                    </div>
                </div>

                <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white backdrop-blur-md">
                    {video.duration || '0:00'}
                </div>
            </div>

            {/* Content */}
            <div className={`flex flex-col ${compact ? 'justify-center py-1' : 'p-3'}`}>
                <h3 className={`font-semibold text-white line-clamp-2 ${compact ? 'text-sm' : 'text-base'} ${isActive ? 'text-blue-400' : ''}`}>
                    {video.title}
                </h3>
                {!compact && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                        <span>Video • {video.mediaType}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
