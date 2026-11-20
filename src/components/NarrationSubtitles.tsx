/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, X } from 'lucide-react';

interface NarrationSubtitlesProps {
  subtitleText: string | null;
  onClose: () => void;
  onReplayAudio: () => void;
  speakerName?: string;
}

export const NarrationSubtitles: React.FC<NarrationSubtitlesProps> = ({
  subtitleText,
  onClose,
  onReplayAudio,
  speakerName = 'Dr. Linnea (Field Botanist & Geneticist)'
}) => {
  if (!subtitleText) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl">
      <div className="bg-slate-900/95 text-slate-100 border border-emerald-500/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex-shrink-0 flex items-center justify-center text-lg">
          🧑‍🔬
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              {speakerName}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={onReplayAudio}
                className="p-1 rounded text-slate-400 hover:text-emerald-300 transition"
                title="Replay Voice Audio"
                aria-label="Replay Voice Audio"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-slate-200 transition"
                title="Dismiss Subtitle"
                aria-label="Dismiss Subtitle"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
            "{subtitleText}"
          </p>
        </div>
      </div>
    </div>
  );
};
