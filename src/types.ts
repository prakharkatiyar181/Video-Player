export interface Video {
    title: string;
    mediaUrl: string;
    mediaType: 'YOUTUBE' | 'mp4' | string;
    thumbnailUrl: string;
    slug: string;
    duration?: string; // Enhanced property for UI
}

export interface Category {
    slug: string;
    name: string;
    iconUrl: string;
}

export interface CategoryData {
    category: Category;
    contents: Video[];
}

export interface RootData {
    categories: CategoryData[];
}
