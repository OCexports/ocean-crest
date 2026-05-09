"use client";

import { useEffect, useRef, useState } from "react";
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
  /**
   * Externally controlled hover state. When provided, the parent owns the
   * play/pause signal — useful when you want the entire card (image + title
   * + description) to act as the hover target instead of just the image.
   * When omitted, the component falls back to its own internal mouseenter /
   * mouseleave handlers on the image area only.
   */
  isHovered?: boolean;
}

/**
 * Renders a product still that swaps to a muted, looping clip on hover.
 * Video uses preload="metadata" so the first frame is ready without
 * downloading the full file until the user hovers.
 */
export function HoverVideoMedia({
  src,
  video,
  alt,
  sizes,
  interactive = true,
  isHovered,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalPlaying, setInternalPlaying] = useState(false);

  // External-control mode: react to the isHovered prop from the parent.
  useEffect(() => {
    if (isHovered === undefined) return; // fall back to internal handlers
    if (!video || !interactive) return;
    const el = videoRef.current;
    if (!el) return;
    if (isHovered) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isHovered, video, interactive]);

  // Effective playing state — driven by the prop when controlled, otherwise local.
  const isPlaying = isHovered !== undefined ? isHovered : internalPlaying;

  const onEnter = () => {
    if (isHovered !== undefined) return; // controlled by parent
    if (!video || !interactive) return;
    const el = videoRef.current;
    if (!el) return;
    setInternalPlaying(true);
    el.play().catch(() => setInternalPlaying(false));
  };

  const onLeave = () => {
    if (isHovered !== undefined) return; // controlled by parent
    if (!video || !interactive) return;
    const el = videoRef.current;
    setInternalPlaying(false);
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
