"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  /** Still image rendered by default and on touch devices. */
  src: string;
  /** Optional video clip. Plays on hover, paused/reset on leave. */
  video?: string;
  alt: string;
  /** Tailwind sizes attribute passed to the underlying Image. */
  sizes?: string;
  /** When true, hover / playback handlers are wired up. */
  interactive?: boolean;
}

/**
 * Renders a product still that swaps to a muted, looping clip on hover.
 * Video uses preload="none" so the file is only downloaded once a user
 * actually intends to view it — no bandwidth cost on initial load.
 *
 * On touch devices (no hover) the still image is the only thing rendered,
 * so we never autoplay 5 MB of video on a mobile data plan.
 */
export function HoverVideoMedia({
  src,
  video,
  alt,
  sizes,
  interactive = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onEnter = () => {
    if (!video || !interactive) return;
    const el = videoRef.current;
    if (!el) return;
    setIsPlaying(true);
    // play() can reject if interrupted; ignore — UI state will heal on next event.
    el.play().catch(() => setIsPlaying(false));
  };

  const onLeave = () => {
    if (!video || !interactive) return;
    const el = videoRef.current;
    setIsPlaying(false);
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover transition-opacity duration-200",
          isPlaying ? "opacity-0" : "opacity-100",
        )}
      />
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-200 pointer-events-none",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
