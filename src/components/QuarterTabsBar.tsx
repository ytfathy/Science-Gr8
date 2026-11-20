/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { CheckCircle2, Layers, Clock } from 'lucide-react';
import { QUARTERS_DATA, QuarterId } from '../data/quartersData.js';
import { soundFx } from '../utils/audio.js';

interface QuarterTabsBarProps {
  activeQuarter: QuarterId;
  onSelectQuarter: (quarter: QuarterId) => void;
  levelMastery: Record<number, boolean>;
  q2LevelMastery?: Record<number, boolean>;
  compact?: boolean;
}

export const QuarterTabsBar: React.FC<QuarterTabsBarProps> = ({
  activeQuarter,
  onSelectQuarter,
  levelMastery,
  q2LevelMastery = {},
  compact = false,
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const q1MasteredCount = [1, 2, 3].filter((lvl) => Boolean(levelMastery[lvl])).length;
  const q2MasteredCount = [1, 2, 3].filter((lvl) => Boolean(q2LevelMastery[lvl])).length;

  const getActiveClasses = (id: QuarterId) => {
    switch (id) {
      case 1:
        return 'bg-emerald-500/15 border-emerald-400/70 text-white shadow-md shadow-emerald-950/50';
      case 2:
        return 'bg-violet-500/15 border-violet-400/70 text-white shadow-md shadow-violet-950/50';
      case 3:
        return 'bg-sky-500/15 border-sky-400/70 text-white shadow-md shadow-sky-950/50';
      case 4:
        return 'bg-amber-500/15 border-amber-400/70 text-white shadow-md shadow-amber-950/50';
    }
  };

  const getAccentText = (id: QuarterId) => {
    switch (id) {
      case 1:
        return 'text-emerald-300';
      case 2:
        return 'text-violet-300';
      case 3:
        return 'text-sky-300';
      case 4:
        return 'text-amber-300';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (idx + 1) % QUARTERS_DATA.length;
      const nextQuarter = QUARTERS_DATA[nextIdx].id;
      soundFx.playClick();
      onSelectQuarter(nextQuarter);
      tabRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (idx - 1 + QUARTERS_DATA.length) % QUARTERS_DATA.length;
      const prevQuarter = QUARTERS_DATA[prevIdx].id;
      soundFx.playClick();
      onSelectQuarter(prevQuarter);
      tabRefs.current[prevIdx]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Academic Quarters"
      className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 ${
        compact
          ? 'p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl'
          : 'p-2 bg-slate-900/85 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-md'
      }`}
    >
      {QUARTERS_DATA.map((quarter, idx) => {
        const isSelected = activeQuarter === quarter.id;
        const Icon = quarter.status === 'active' ? Layers : Clock;
        const masteredCount = quarter.id === 1 ? q1MasteredCount : quarter.id === 2 ? q2MasteredCount : 0;
        const sublabel =
          quarter.status === 'active'
            ? `3 Active Labs · ${masteredCount}/3 Mastered`
            : 'Lessons coming soon';

        return (
          <button
            key={quarter.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            id={`quarter-tab-${quarter.id}`}
            role="tab"
            type="button"
            aria-selected={isSelected}
            aria-controls={`quarter-panel-${quarter.id}`}
            tabIndex={isSelected ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onClick={() => {
              soundFx.playClick();
              onSelectQuarter(quarter.id);
            }}
            className={`group text-left rounded-xl border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              compact ? 'px-3.5 py-2.5' : 'px-4 py-3.5'
            } ${
              isSelected
                ? getActiveClasses(quarter.id)
                : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? getAccentText(quarter.id) : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="font-bold text-sm whitespace-nowrap shrink-0">
                  {quarter.label}
                </span>
              </div>

              {quarter.status === 'active' && masteredCount === 3 ? (
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${
                    quarter.id === 2 ? 'text-violet-400' : 'text-emerald-400'
                  }`}
                  aria-label={`${quarter.label} Complete`}
                />
              ) : (
                <span
                  className={`hidden sm:inline text-[11px] font-semibold whitespace-nowrap shrink-0 tabular-nums ${
                    isSelected ? getAccentText(quarter.id) : 'text-slate-500'
                  }`}
                >
                  {quarter.status === 'active' ? 'Active' : 'Coming Soon'}
                </span>
              )}
            </div>

            {!compact && (
              <div className="mt-1.5 space-y-0.5">
                <div
                  className={`text-xs font-medium truncate ${
                    quarter.status === 'active' ? 'text-slate-200' : 'text-slate-300'
                  }`}
                >
                  {quarter.title}
                </div>
                <div className="text-[11px] text-slate-400 truncate tabular-nums">
                  {sublabel}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
