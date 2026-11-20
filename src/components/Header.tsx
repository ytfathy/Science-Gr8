/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BookOpen,
  Award,
  Volume2,
  VolumeX,
  RotateCcw,
  Home,
  Sparkles,
  CheckCircle2,
  Mic,
  MicOff,
} from 'lucide-react';
import { soundFx } from '../utils/audio.js';
import { QuarterId } from '../data/quartersData.js';

interface HeaderProps {
  activeQuarter: QuarterId;
  currentLevel: number; // 0 = Home, 1..3 = Active Quarter Levels
  onSelectLevel: (lvl: number) => void;
  totalPoints: number;
  levelScores: Record<number, number>;
  levelMastery: Record<number, boolean>;
  q2LevelMastery?: Record<number, boolean>;
  onOpenNotebook: () => void;
  onOpenCertificate: () => void;
  onOpenMasterQuiz: () => void;
  onResetProgress: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  unlockedBadgesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeQuarter,
  currentLevel,
  onSelectLevel,
  totalPoints,
  levelMastery,
  q2LevelMastery = {},
  onOpenNotebook,
  onOpenCertificate,
  onOpenMasterQuiz,
  onResetProgress,
  soundEnabled,
  onToggleSound,
  voiceEnabled,
  onToggleVoice,
  unlockedBadgesCount,
}) => {
  const isQuarter2 = activeQuarter === 2;
  const activeMastery = isQuarter2 ? q2LevelMastery : levelMastery;

  const levels = isQuarter2
    ? [
        { num: 1, title: 'Chemical Reactions', short: 'L1: Reactions' },
        { num: 2, title: 'Chemical Equations', short: 'L2: Equations' },
        { num: 3, title: 'Thermal Energy & Processes', short: 'L3: Thermal' },
      ]
    : [
        { num: 1, title: 'Plant Reproduction', short: 'L1: Plants' },
        { num: 2, title: 'Genetics & Inheritance', short: 'L2: Genetics' },
        { num: 3, title: 'Animal Reproduction & Growth', short: 'L3: Animals' },
      ];

  const showMasterQuiz = activeQuarter === 1;
  const quizCount = 96;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/80 text-white shadow-lg overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand / Title lockup */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectLevel(0);
            }}
            className="flex items-center gap-2 group text-left cursor-pointer transition focus:outline-none min-w-0"
            aria-label="Return to Main Menu"
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr flex items-center justify-center shadow-md group-hover:scale-105 transition shrink-0 ${
                isQuarter2
                  ? 'from-violet-500 via-purple-500 to-cyan-500 shadow-violet-500/20'
                  : 'from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/20'
              }`}
            >
              <span className="text-lg sm:text-xl">{isQuarter2 ? '⚗️' : '🔬'}</span>
            </div>
            <div className="min-w-0">
              <div
                className={`hidden sm:block text-xs uppercase tracking-wider font-bold whitespace-nowrap ${
                  isQuarter2 ? 'text-violet-300' : 'text-emerald-400'
                }`}
              >
                {isQuarter2 ? 'Quarter 2 · Physical Science' : 'Grade 8 Science'}
              </div>
              <h1 className="text-sm sm:text-lg font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition whitespace-nowrap truncate">
                Science Explorer
              </h1>
            </div>
          </button>
        </div>

        {/* Level Navigation Tabs */}
        <nav
          className="hidden md:flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0"
          aria-label="Level navigation"
        >
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectLevel(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              currentLevel === 0
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {levels.map((lvl) => {
            const isMastered = activeMastery[lvl.num];
            const isActive = currentLevel === lvl.num;
            return (
              <button
                key={lvl.num}
                onClick={() => {
                  soundFx.playClick();
                  onSelectLevel(lvl.num);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isQuarter2
                      ? 'bg-violet-600 text-white shadow-sm shadow-violet-600/30'
                      : 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>{lvl.short}</span>
                {isMastered && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 fill-emerald-950" />
                )}
              </button>
            );
          })}

          {showMasterQuiz && (
            <>
              <div className="w-px h-5 bg-slate-700 mx-1" />

              {/* Dedicated QUIZ Button (Quarter 1 Only) */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenMasterQuiz();
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-md shadow-amber-500/25 transition cursor-pointer transform hover:scale-105 active:scale-95 whitespace-nowrap"
                title={`Open Quarter 1 Master ${quizCount}-Question Quiz`}
              >
                <span className="tracking-wide">QUIZ</span>
                <span className="bg-slate-950/20 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black tabular-nums">
                  {quizCount} Qs
                </span>
              </button>
            </>
          )}
        </nav>

        {/* Right utility cluster: Points, Mobile Quiz, Notebook, Certificate, Audio, Reset */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Quick QUIZ Button (Quarter 1 Only) */}
          {showMasterQuiz && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenMasterQuiz();
              }}
              className="md:hidden flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 px-2 py-1 rounded-lg text-xs font-black shadow-md transition cursor-pointer whitespace-nowrap"
              title={`Open ${quizCount}-Question Master Quiz`}
            >
              <span>QUIZ</span>
              <span className="bg-slate-950/20 text-slate-950 px-1 rounded text-[10px] tabular-nums">
                {quizCount}
              </span>
            </button>
          )}

          {/* Points Counter */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold tabular-nums whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{totalPoints} XP</span>
          </div>

          {/* Field Notebook Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenNotebook();
            }}
            className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap"
            title="Open Science Field Notebook"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Notebook</span>
          </button>

          {/* Certificate of Achievement Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCertificate();
            }}
            className="hidden sm:flex items-center gap-1.5 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap"
            title="View Science Certificate & Badges"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Diploma</span>
            <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums">
              {unlockedBadgesCount}
            </span>
          </button>

          {/* Sound Effect Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 rounded-lg border text-xs transition cursor-pointer ${
              soundEnabled
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-red-950/40 border-red-800/50 text-red-300 hover:bg-red-900/60'
            }`}
            title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Voice Narration Toggle */}
          <button
            onClick={onToggleVoice}
            className={`hidden sm:inline-flex p-1.5 rounded-lg border text-xs transition cursor-pointer ${
              voiceEnabled
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-red-950/40 border-red-800/50 text-red-300 hover:bg-red-900/60'
            }`}
            title={voiceEnabled ? 'Mute voice narration' : 'Enable voice narration'}
            aria-label={voiceEnabled ? 'Mute voice narration' : 'Enable voice narration'}
          >
            {voiceEnabled ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Reset Progress */}
          <button
            onClick={onResetProgress}
            className="hidden sm:inline-flex p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            title="Restart Expedition / Reset Data"
            aria-label="Restart Expedition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
