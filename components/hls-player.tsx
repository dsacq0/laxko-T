'use client';

import React, { useEffect, useRef } from "react";

type HlsPlayerProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
};

export function HlsPlayer({ src, poster, autoPlay = false }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let hls: any | null = null;

    async function setupPlayer() {
      if (!videoRef.current) return;

      const video = videoRef.current;

      // Safari (native HLS)
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        if (autoPlay) {
          video.autoplay = true;
          try {
            await video.play();
          } catch {
            // ignore autoplay block
          }
        }
        return;
      }

      const HlsModule = await import("hls.js");
      const Hls = HlsModule.default;

      if (Hls && Hls.isSupported()) {
        hls = new Hls();
        hls.on(Hls.Events.MANIFEST_PARSED, async () => {
          if (!autoPlay) return;
          try {
            await video.play();
          } catch {
            // ignore autoplay block
          }
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        if (autoPlay) {
          video.autoplay = true;
          try {
            await video.play();
          } catch {
            // ignore autoplay block
          }
        }
      } else {
        console.warn("HLS is not supported in this browser.");
      }
    }

    setupPlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="aspect-video w-full bg-black"
      controls
      autoPlay={autoPlay}
      poster={poster}
      playsInline
    />
  );
}

