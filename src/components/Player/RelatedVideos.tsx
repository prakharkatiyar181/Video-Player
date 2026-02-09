import React from 'react';
import type { Video } from '../../types';
import { VideoCard } from '../VideoCard';

interface RelatedVideosProps {
    videos: Video[];
    currentVideoSlug: string;
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos, currentVideoSlug }) => {
    const filteredVideos = videos.filter(v => v.slug !== currentVideoSlug);

    return (
        <div className="flex-1 overflow-y-auto bg-[#0f0f0f] p-4 pb-20 md:pb-4">
            <h3 className="mb-4 text-lg font-semibold text-white">Up Next</h3>
            <div className="space-y-4">
                {filteredVideos.map((video) => (
                    <VideoCard key={video.slug} video={video} compact={true} />
                ))}
            </div>
        </div>
    );
};
