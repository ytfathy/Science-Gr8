/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared Quarter 2 lesson header: title block, one row of equal-size actions, and a numbered step bar.
 */

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { soundFx } from '../utils/audio.js';

type Accent = 'violet' | 'cyan' | 'amber';

const ACCENTS: Record<Accent, { card: string; badge: string; stepOn: string; num: string; primary: string }> = {
  violet: {
    card: 'from-violet-950/90 border-violet-500/30',
    badge: 'bg-violet-500/15 border-violet-400/30 text-violet-300',
    stepOn: 'bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-900/50',
    num: 'bg-violet-500/20 text-violet-200',
    primary: 'bg-violet-600 hover:bg-violet-500 border-violet-400/50 text-white',
  },
  cyan: {
    card: 'from-cyan-950/90 border-cyan-500/30',
    badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
    stepOn: 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-900/50',
    num: 'bg-cyan-500/20 text-cyan-200',
    primary: 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400/50 text-white',
  },
  amber: {
    card: 'from-amber-950/90 border-amber-500/30',
    badge: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
    stepOn: 'bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-900/50',
    num: 'bg-amber-500/20 text-amber-200',
    primary: 'bg-amber-500 hover:bg-amber-400 border-amber-300/60 text-slate-950',
  },
};

export interface LessonAction {
  label: string;
  hint: string;
  icon: LucideIcon;
  onClick: () => void;
  tone: 'summary' | 'video' | 'primary';
  pressed?: boolean;
}

export interface LessonTab<T extends string> {
  id: T;
  label: string;
  icon: LucideIcon;
}

interface Props<T extends string> {
  accent: Accent;
  kicker: string[];
  title: string;
  description: string;
  actions: LessonAction[];
  tabs: readonly LessonTab<T>[];
  activeTab: string;
  onSelectTab: (id: T) => void;
}

export function LessonHeader<T extends string>({ accent, kicker, title, description, actions, tabs, activeTab, onSelectTab }: Props<T>) {
  const a = ACCENTS[accent];
  const toneClass = (tone: LessonAction['tone'], pressed?: boolean) =>
    `${
      tone === 'summary'
        ? 'bg-amber-50 hover:bg-white border-slate-800 text-slate-900'
        : tone === 'video'
          ? 'bg-rose-600 hover:bg-rose-500 border-rose-400/50 text-white'
          : a.primary
    } ${pressed ? 'ring-4 ring-white/60' : ''}`;

  return (
    <section className={`rounded-3xl bg-gradient-to-br via-slate-900 to-slate-950 border p-5 sm:p-8 shadow-xl ${a.card}`}>
      <div className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-1 rounded-full border text-xs font-bold ${a.badge}`}>
        {kicker.map((k, i) => (
          <React.Fragment key={k}>
            {i > 0 && <span aria-hidden="true">•</span>}
            <span>{k}</span>
          </React.Fragment>
        ))}
      </div>
      <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
      <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">{description}</p>

      {/* Actions: one row of equal-size buttons (compact icon tiles on phones) */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3 max-w-4xl">
        {actions.map(({ label, hint, icon: Icon, onClick, tone, pressed }) => (
          <button
            key={label}
            type="button"
            aria-pressed={pressed}
            onClick={() => {
              soundFx.playClick();
              onClick();
            }}
            className={`flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 text-center sm:text-left transition cursor-pointer ${toneClass(tone, pressed)}`}
            style={tone === 'summary' ? { fontFamily: '"Patrick Hand", cursive' } : undefined}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone === 'summary' ? 'bg-amber-200' : 'bg-black/20'}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className={`block font-bold leading-tight ${tone === 'summary' ? 'text-sm sm:text-lg' : 'text-xs sm:text-sm'}`}>{label}</span>
              <span className={`hidden sm:block text-xs leading-tight opacity-80 ${tone === 'summary' ? 'text-sm' : ''}`}>{hint}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Lesson steps: one row, scrolls sideways on small screens instead of wrapping */}
      <nav aria-label="Lesson steps" className="mt-6 pt-5 border-t border-white/10">
        <ol className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 lg:grid lg:grid-flow-col lg:auto-cols-fr lg:overflow-visible">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <li key={tab.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  aria-current={active ? 'step' : undefined}
                  onClick={() => {
                    soundFx.playClick();
                    onSelectTab(tab.id);
                  }}
                  className={`h-full w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                    active ? a.stepOn : 'bg-slate-900/70 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] ${active ? 'bg-black/20' : a.num}`}>{i + 1}</span>
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap lg:whitespace-normal leading-tight">{tab.label.replace(/^\d+\.\s*(🎬\s*)?/, '')}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}
