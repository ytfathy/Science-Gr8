import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, Sparkles, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { Quarter2VideoPlayer } from './Quarter2VideoPlayer.js';

export interface VideoChapterMark {
  label: string;
  timeSeconds: number;
  timeDisplay: string;
}

export interface LessonVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  topic: string;
  videoId?: string;
  videoSrc?: string;
  chapters?: VideoChapterMark[];
  initialTimeSeconds?: number;
  quarterLabel?: string;
  levelNumber: number;
  accentColor?: 'emerald' | 'cyan' | 'amber' | 'violet';
  description?: string;
  keyTopics?: string[];
  onGoToQuiz?: () => void;
}

export const LessonVideoModal: React.FC<LessonVideoModalProps> = ({
  isOpen,
  onClose,
  title,
  videoId,
  videoSrc,
  chapters = [],
  initialTimeSeconds = 0,
  quarterLabel = 'Grade 8 Science',
  levelNumber,
  accentColor = 'emerald',
  description,
  keyTopics = [],
  onGoToQuiz,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Sync active chapter index when opened with initialTimeSeconds
  useEffect(() => {
    if (!isOpen || !chapters.length) return;
    const matchIdx = chapters.findIndex((c) => c.timeSeconds === initialTimeSeconds);
    setActiveChapterIdx(matchIdx >= 0 ? matchIdx : 0);
  }, [isOpen, initialTimeSeconds, chapters]);

  if (!isOpen) return null;

  const colorThemes = {
    emerald: {
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-950/50',
      accentText: 'text-emerald-400',
      button: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      chapterActive: 'bg-emerald-600/25 border-emerald-400/70 text-emerald-200',
    },
    cyan: {
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-950/50',
      accentText: 'text-cyan-400',
      button: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      chapterActive: 'bg-cyan-600/25 border-cyan-400/70 text-cyan-200',
    },
    amber: {
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-950/50',
      accentText: 'text-amber-400',
      button: 'bg-amber-600 hover:bg-amber-500 text-white',
      chapterActive: 'bg-amber-600/25 border-amber-400/70 text-amber-200',
    },
    violet: {
      badge: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      border: 'border-violet-500/30',
      glow: 'shadow-violet-950/50',
      accentText: 'text-violet-300',
      button: 'bg-violet-600 hover:bg-violet-500 text-white',
      chapterActive: 'bg-violet-600/25 border-violet-400/70 text-violet-200',
    },
  };

  const theme = colorThemes[accentColor];
  const isLocalVideo = Boolean(videoSrc);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : '';
  const directUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';

  const handleJumpChapter = (idx: number, seconds: number) => {
    soundFx.playClick();
    setActiveChapterIdx(idx);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className={`relative w-full max-w-4xl bg-slate-900 border ${theme.border} rounded-3xl shadow-2xl ${theme.glow} flex flex-col overflow-hidden my-auto max-h-[94vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner text-xl">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${theme.badge}`}>
                  Level {levelNumber} Video Lesson
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• {quarterLabel}</span>
              </div>
              <h2 id="video-modal-title" className="text-base sm:text-lg font-bold text-white leading-snug">
                {title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            aria-label="Close Video"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold border border-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close Video</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Learning Pathway Hint */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              Learning Order:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px]">
              <span className="text-slate-400">1. Interactive Lab</span>
              <span className="text-slate-600">➔</span>
              <span className={`font-bold ${theme.accentText}`}>2. Watch Video (Current)</span>
              <span className="text-slate-600">➔</span>
              <span className="text-slate-400">3. Level Quiz</span>
            </div>
          </div>

          {/* 16:9 Responsive Video Container (Local MP4 or YouTube Embed, zero autoplay) */}
          {isLocalVideo && videoSrc ? (
            <Quarter2VideoPlayer
              defaultSrc={videoSrc}
              title={title}
              initialTimeSeconds={initialTimeSeconds}
              videoRef={videoRef}
            />
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 group">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src={embedUrl}
                title={`${title} - Lesson Explanation`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          )}

          {/* Chapter Jump Controls for Local Video */}
          {isLocalVideo && chapters.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                Video Chapters (Click to Seek — Press Play Anytime):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {chapters.map((chapter, idx) => (
                  <button
                    key={chapter.label}
                    type="button"
                    onClick={() => handleJumpChapter(idx, chapter.timeSeconds)}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-left text-xs font-medium transition cursor-pointer ${
                      activeChapterIdx === idx
                        ? theme.chapterActive
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{chapter.label}</span>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 shrink-0 tabular-nums">
                      {chapter.timeDisplay}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description & Key Topics */}
          {description && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              {description}
            </p>
          )}

          {keyTopics.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Key Concepts Covered in Video:
              </div>
              <div className="flex flex-wrap gap-2">
                {keyTopics.map((topicItem, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {topicItem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Friendly Fallback / Source Notice */}
          {isLocalVideo ? (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-base">ℹ️</span>
                <span>
                  Embedded Quarter 2 Unit 4 explainer video (6:22) — press Play in the player controls above to begin.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-base">ℹ️</span>
                <span>
                  If video playback is blocked by your browser or school network filter:
                </span>
              </div>
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition font-medium border border-slate-700/80 cursor-pointer text-xs"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3.5 border-t border-slate-800 bg-slate-900/90">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700 cursor-pointer"
          >
            Return to Lesson
          </button>

          {onGoToQuiz && (
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
                onGoToQuiz();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer ${theme.button}`}
            >
              <span>Continue to Level {levelNumber} Quiz</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
