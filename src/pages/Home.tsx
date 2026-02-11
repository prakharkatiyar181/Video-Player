import React from 'react';
import { DATASET } from '../data/mockData';
import { VideoCard } from '../components/VideoCard';
export const Home: React.FC = () => {
    return (
        <div className="min-h-screen pt-4 px-4 md:px-8 max-w-7xl mx-auto">

            <div className="space-y-8">
                {DATASET.categories.map((categoryData) => (
                    <section key={categoryData.category.slug} className="space-y-4">
                        <div className="flex items-center gap-3">
                            {categoryData.category.iconUrl && (
                                <img
                                    src={categoryData.category.iconUrl}
                                    alt=""
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                            )}
                            <h2 className="text-xl font-semibold text-white">
                                {categoryData.category.name}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {categoryData.contents.map((video) => (
                                <VideoCard key={video.slug} video={video} category={categoryData.category.name} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
