/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Resilient Quarter 2 Video Player:
 * - Plays the bundled local MP4 when present in public/assets/aistudio/
 * - Detects missing/unplayable MP4 cleanly (no silent black box)
 * - Lets students/teachers load a local MP4 file from device OR paste a YouTube link
 *   (shared across all Quarter 2 levels and modal; strictly zero autoplay).
 */

import React, { useEffect, useRef, useState } from 'react';
import { Upload, Link2, AlertCircle, RotateCcw, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/audio.js';

const STORAGE_YT_KEY = 'science_q2_youtube_video_id';

// Shared in-memory session store so a loaded local MP4 or YouTube link works across L1, L2, L3 & modal
let sharedBlobUrl: string | null = null;
let sharedBlobName: string | null = null;
let sharedYoutubeId: string | null = (() => {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem(STORAGE_YT_KEY) : null;
  } catch {
    return null;
  }
})();

const listeners = new Set<() => void>();
function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function extractYouTubeVideoId(raw: string): string | null {
  const input = raw.trim();
  if (!input) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace(/^\//, '').split('/')[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = url.pathname.split('/').filter(Boolean);
      const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'live');
      if (embedIdx >= 0 && parts[embedIdx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[embedIdx + 1])) {
        return parts[embedIdx + 1];
      }
    }
  } catch {
    return null;
  }
  return null;
}

export interface Quarter2VideoPlayerProps {
  defaultSrc: string;
  title: string;
  initialTimeSeconds?: number;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}

export const Quarter2VideoPlayer: React.FC<Quarter2VideoPlayerProps> = ({
  defaultSrc,
  title,
  initialTimeSeconds = 0,
  videoRef: externalVideoRef,
}) => {
  const internalVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeVideoRef = externalVideoRef || internalVideoRef;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [, setVersion] = useState(0);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [ytInput, setYtInput] = useState('');
  const [ytError, setYtError] = useState<string | null>(null);

  useEffect(() => {
    const onChange = () => {
      setHasLoadError(false);
      setVersion((v) => v + 1);
    };
    listeners.add(onChange);
    return () => {
      listeners.delete(onChange);
    };
  }, []);

  const effectiveSrc = sharedBlobUrl || defaultSrc;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (sharedBlobUrl) {
      URL.revokeObjectURL(sharedBlobUrl);
    }
    sharedBlobUrl = URL.createObjectURL(file);
    sharedBlobName = file.name;
    sharedYoutubeId = null;
    try {
      localStorage.removeItem(STORAGE_YT_KEY);
    } catch {
      // ignore storage errors
    }
    setHasLoadError(false);
    setYtError(null);
    notifyListeners();
  };

  const handleLoadYoutube = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeVideoId(ytInput);
    if (!id) {
      setYtError('Please paste a valid YouTube link (e.g. https://www.youtube.com/watch?v=...).');
      return;
    }
    soundFx.playClick();
    sharedYoutubeId = id;
    try {
      localStorage.setItem(STORAGE_YT_KEY, id);
    } catch {
      // ignore storage errors
    }
    setYtError(null);
    setYtInput('');
    notifyListeners();
  };

  const handleClearOverride = () => {
    soundFx.playClick();
    if (sharedBlobUrl) {
      URL.revokeObjectURL(sharedBlobUrl);
      sharedBlobUrl = null;
      sharedBlobName = null;
    }
    sharedYoutubeId = null;
    try {
      localStorage.removeItem(STORAGE_YT_KEY);
    } catch {
      // ignore storage errors
    }
    setHasLoadError(false);
    notifyListeners();
  };

  // Mode 1: User-provided YouTube embed (no autoplay)
  if (sharedYoutubeId) {
    const embedUrl = `https://www.youtube.com/embed/${sharedYoutubeId}?rel=0${
      initialTimeSeconds > 0 ? `&start=${Math.floor(initialTimeSeconds)}` : ''
    }`;
    const watchUrl = `https://www.youtube.com/watch?v=${sharedYoutubeId}`;
    return (
      <div className="space-y-2">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            src={embedUrl}
            title={`${title} - Lesson Explanation`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 px-1">
          <span>Playing linked Quarter 2 YouTube lesson video</span>
          <div className="flex items-center gap-2">
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={handleClearOverride}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Change Video</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mode 2: Missing/unplayable local MP4 fallback UI
  if (hasLoadError) {
    return (
      <div className="relative w-full min-h-[300px] sm:aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/40 p-5 sm:p-8 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-amber-400" />
        </div>

        <div className="max-w-lg space-y-1.5">
          <h3 className="text-base sm:text-lg font-extrabold text-white">
            Quarter 2 Video File Needs Re-Linking
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The uploaded MP4 file is no longer in workspace storage after the server restart. Load the MP4 from your device or paste a YouTube link below to watch immediately.
          </p>
        </div>

        <div className="w-full max-w-md space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Choose Quarter 2 MP4 video file"
          />
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              fileInputRef.current?.click();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Load Quarter 2 MP4 Video from Device</span>
          </button>

          <form onSubmit={handleLoadYoutube} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={ytInput}
                onChange={(e) => {
                  setYtInput(e.target.value);
                  setYtError(null);
                }}
                placeholder="Or paste YouTube link (https://youtube.com/watch?v=...)"
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-100 transition cursor-pointer whitespace-nowrap"
            >
              Load YouTube
            </button>
          </form>

          {ytError && <p className="text-xs text-rose-400">{ytError}</p>}
        </div>
      </div>
    );
  }

  // Mode 3: Native HTML5 MP4 video player (strictly zero autoplay)
  return (
    <div className="space-y-2">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
        <video
          key={effectiveSrc}
          ref={activeVideoRef}
          src={effectiveSrc}
          controls
          preload="metadata"
          playsInline
          onLoadedMetadata={() => {
            if (activeVideoRef.current && initialTimeSeconds > 0) {
              activeVideoRef.current.currentTime = initialTimeSeconds;
            }
          }}
          onError={() => {
            setHasLoadError(true);
          }}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          aria-label={`${title} - Lesson Explanation Video`}
        />
      </div>
      {sharedBlobName && (
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Loaded local file: {sharedBlobName}</span>
          <button
            type="button"
            onClick={handleClearOverride}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Change Video</span>
          </button>
        </div>
      )}
    </div>
  );
};
