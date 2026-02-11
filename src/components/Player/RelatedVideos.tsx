import React from 'react';
import type { Video } from '../../types';
import { VideoCard } from '../VideoCard';
import { getVideoCategory } from '../../data/mockData';

interface RelatedVideosProps {
    videos: Video[];
    currentVideoSlug: string;
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos, currentVideoSlug }) => {
    const filteredVideos = videos.filter(v => v.slug !== currentVideoSlug);
    // Assuming all related videos are from the same category as the current video (or their own category)
    // We can fetch category for each or just once if we know they are grouped.
    // Since getRelatedVideos returns videos from the *same* category logicwise, we can check the first one or current one.
    const categoryName = getVideoCategory(currentVideoSlug);

    return (
        <div className="flex-1 overflow-y-auto bg-[#0f0f0f] p-4 pb-20 md:pb-4">
            <h3 className="mb-4 text-lg font-semibold text-white">Up Next</h3>
            <div className="space-y-4">
                {filteredVideos.map((video) => (
                    <VideoCard key={video.slug} video={video} compact={true} category={categoryName} />
                ))}
            </div>
        </div>
    );
};
