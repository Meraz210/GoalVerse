"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import {
  FiMaximize,
  FiPause,
  FiPlay,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

type VideoPlayerProps = {
  src: string;
  title: string;
};

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [levels, setLevels] = useState<{ height: number; index: number }[]>([]);
  const [quality, setQuality] = useState(-1);
  const [error, setError] = useState("");

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !src) {
      return;
    }

    setError("");

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (!Hls.isSupported()) {
      setError("This browser does not support HLS playback.");
      return;
    }

    const hls = new Hls({
      maxMaxBufferLength: 60,
      liveSyncDuration: 6,
      liveMaxLatencyDuration: 18,
    });
    hlsRef.current = hls;

    hls.loadSource(src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
      setLevels(
        data.levels
          .map((level, index) => ({ height: level.height, index }))
          .filter((level) => level.height > 0),
      );
    });
    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        setError("Unable to load this stream. Check the channel URL or proxy.");
      }
    });

    return () => {
      hls.destroy();
      hlsRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  function togglePlay() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  function updateQuality(nextQuality: number) {
    setQuality(nextQuality);

    const hls = hlsRef.current;

    if (!hls) {
      return;
    }

    hls.currentLevel = nextQuality;
  }

  function requestFullscreen() {
    videoRef.current?.requestFullscreen();
  }

  return (
    <section className="overflow-hidden rounded border border-border bg-black">
      <div className="relative aspect-video bg-black">
        {src ? (
          <video
            ref={videoRef}
            className="h-full w-full"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="grid h-full place-items-center px-6 text-center">
            <div>
              <p className="font-display text-2xl font-black text-white">
                No stream selected
              </p>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Connect a licensed backend through SERVER_URL and return
                channelUrl values to enable playback.
              </p>
            </div>
          </div>
        )}

        {error ? (
          <div className="absolute inset-x-4 bottom-20 rounded bg-danger/90 p-3 text-sm font-bold text-white">
            {error}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border bg-panel p-3">
        <button
          type="button"
          onClick={togglePlay}
          className="grid size-10 place-items-center rounded bg-accent text-background"
          aria-label={isPlaying ? "Pause stream" : "Play stream"}
          disabled={!src}
        >
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>
        <button
          type="button"
          onClick={() => setIsMuted((current) => !current)}
          className="grid size-10 place-items-center rounded border border-border text-white"
          aria-label={isMuted ? "Unmute stream" : "Mute stream"}
          disabled={!src}
        >
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="h-2 w-28 accent-accent"
          aria-label="Volume"
          disabled={!src}
        />
        <select
          value={quality}
          onChange={(event) => updateQuality(Number(event.target.value))}
          className="min-h-10 rounded border border-border bg-background px-3 text-sm font-bold text-white"
          disabled={!src || levels.length === 0}
          aria-label="Stream quality"
        >
          <option value={-1}>Auto</option>
          {levels.map((level) => (
            <option key={level.index} value={level.index}>
              {level.height}p
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={requestFullscreen}
          className="ml-auto grid size-10 place-items-center rounded border border-border text-white"
          aria-label="Fullscreen"
          disabled={!src}
        >
          <FiMaximize />
        </button>
        <span className="w-full truncate text-xs font-bold uppercase tracking-[0.12em] text-muted">
          {title}
        </span>
      </div>
    </section>
  );
}
