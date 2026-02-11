import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, type PanInfo } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';
import { PlayerControls } from './PlayerControls';
import { RelatedVideos } from './RelatedVideos';
import { getRelatedVideos } from '../../data/mockData';
import { X, Play, Pause, Minimize2 } from 'lucide-react';

export const VideoPlayerOverlay: React.FC = () => {
    const { activeVideo, isMinimized, minimizePlayer, maximizePlayer, closePlayer, isPlaying, togglePlay } = usePlayer();
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsControls = useAnimation();

    // Video State
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    // Drag Gesture Values
    const y = useMotionValue(0);
    const opacity = useTransform(y, [0, 200], [1, 0]);
    const scale = useTransform(y, [0, 500], [1, 0.5]);

    useEffect(() => {
        if (activeVideo && videoRef.current) {
            if (progress > 0 && Math.abs(videoRef.current.currentTime - progress) > 1) {
                videoRef.current.currentTime = progress;
            }

            if (isPlaying) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [activeVideo, isPlaying, isMinimized]);

    useEffect(() => {
        // Reset controls when entering full screen
        if (!isMinimized) {
            controlsControls.start({ y: 0, opacity: 1, scale: 1 });
        }
    }, [isMinimized, controlsControls]);

    if (!activeVideo) return null;

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.y > 150 || info.velocity.y > 500) {
            minimizePlayer();
        } else {
            controlsControls.start({ y: 0, opacity: 1, scale: 1 });
        }
    };

    const onTimeUpdate = () => {
        if (videoRef.current) {
            setProgress(videoRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setProgress(time);
        }
    };

    const handleSkip = (seconds: number) => {
        if (videoRef.current) {
            const newTime = Math.min(Math.max(videoRef.current.currentTime + seconds, 0), duration);
            videoRef.current.currentTime = newTime;
            setProgress(newTime);
        }
    };

    // Mini Player View
    if (isMinimized) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed bottom-4 right-4 z-50 flex w-[90vw] max-w-sm items-center justify-between rounded-lg bg-gray-900 p-2 shadow-xl border border-gray-800"
                onClick={maximizePlayer}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    {/* We keep the video mounted but small to maintain playback state if needed, 
              or just show thumbnail for simplicity in this 'mini' view logic. 
              For seamless playback, we should actually move the video element here. 
              However, keeping it simpler: distinct modes for this MVP.*/}
                    <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded bg-black">
                        <video
                            ref={videoRef}
                            src={activeVideo.mediaType === 'mp4' ? activeVideo.mediaUrl : undefined}
                            className="h-full w-full object-cover"
                            muted // Mute in mini player or keep playing? User said "continues playing".
                        />
                        {/* If it's YouTube, we might need an iframe. For now assuming direct Video/Mock logic */}
                        <div className="absolute inset-0 bg-transparent" /> {/* Overlay to prevent interaction */}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-white">{activeVideo.title}</span>
                        <span className="text-xs text-gray-400">Playing • {activeVideo.duration}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                        className="rounded-full p-2 hover:bg-gray-800"
                    >
                        {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closePlayer(); }}
                        className="rounded-full p-2 hover:bg-gray-800"
                    >
                        <X className="h-5 w-5 text-gray-400 hover:text-white" />
                    </button>
                </div>
            </motion.div>
        );
    }

    // Full Player View
    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={controlsControls}
            style={{ y, scale, opacity }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ bottom: 0.5, top: 0 }}
            onDragEnd={handleDragEnd}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-black"
        >
            {/* Draggable Handle for Mobile cues */}
            <div className="absolute top-2 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/20 md:hidden" />

            {/* Video Container */}
            <div className="relative aspect-video w-full bg-black shadow-2xl">
                {activeVideo.mediaType === 'YOUTUBE' ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`${activeVideo.mediaUrl}?autoplay=1&enablejsapi=1`}
                        title={activeVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                    />
                ) : (
                    <video
                        ref={videoRef}
                        src={activeVideo.mediaUrl}
                        className="h-full w-full"
                        autoPlay
                        playsInline
                        onTimeUpdate={onTimeUpdate}
                        onLoadedMetadata={onLoadedMetadata}
                        onClick={togglePlay}
                    />
                )}

                {/* Custom Controls Overlay - Only for native video, YouTube has its own */}
                {activeVideo.mediaType !== 'YOUTUBE' && (
                    <PlayerControls
                        isPlaying={isPlaying}
                        progress={progress}
                        duration={duration}
                        onTogglePlay={togglePlay}
                        onSeek={handleSeek}
                        onSkip={handleSkip}
                        onMinimize={minimizePlayer}
                        onClose={closePlayer}
                        title={activeVideo.title}
                    />
                )}

                {/* Minimize Button Wrapper for YouTube (since we can't overlay easily without blocking interaction) */}
                {activeVideo.mediaType === 'YOUTUBE' && (
                    <div className="absolute top-0 right-0 p-4 flex gap-4 pointer-events-none">
                        <button onClick={minimizePlayer} className="pointer-events-auto rounded-full bg-black/50 p-2 text-white backdrop-blur-md hover:bg-black/70">
                            <Minimize2 className="h-5 w-5" />
                        </button>
                        <button onClick={closePlayer} className="pointer-events-auto rounded-full bg-black/50 p-2 text-white backdrop-blur-md hover:bg-black/70">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Metadata & Related Videos */}
            <div className="flex-1 overflow-y-auto bg-[#0f0f0f]">
                <div className="border-b border-gray-800 p-4">
                    <h1 className="text-lg font-bold text-white md:text-xl">{activeVideo.title}</h1>
                    <p className="mt-1 text-sm text-gray-400">1.2M views • 2 hours ago</p>
                    <div className="mt-4 flex items-center gap-4">
                        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200">
                            Subscribe
                        </button>
                        <button className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                            Like
                        </button>
                        <button className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                            Share
                        </button>
                    </div>
                </div>

                <RelatedVideos videos={getRelatedVideos(activeVideo.slug)} currentVideoSlug={activeVideo.slug} />
            </div>
        </motion.div>
    );
};

