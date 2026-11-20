/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Award, Printer, CheckCircle2, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BADGES } from '../data/badgesData.js';
import { soundFx } from '../utils/audio.js';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  totalPoints: number;
  levelMastery: Record<number, boolean>;
  levelScores: Record<number, number>;
  unlockedBadges: string[];
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  onUpdateStudentName,
  totalPoints,
  levelMastery,
  levelScores,
  unlockedBadges
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(studentName);

  const masteredCount = Object.values(levelMastery).filter(Boolean).length;
  const isAllMastered = masteredCount === 3;

  useEffect(() => {
    if (isOpen) {
      if (isAllMastered) {
        soundFx.playFanfare();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        soundFx.playStep();
      }
    }
  }, [isOpen, isAllMastered]);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateStudentName(nameInput.trim());
    }
    setIsEditingName(false);
  };

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header toolbar */}
        <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Academic Achievement & Badges</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Diploma</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close Certificate"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area (Printable) */}
        <div className="p-6 overflow-y-auto flex-1">
          <div 
            id="printable-certificate"
            className="relative bg-gradient-to-br from-amber-50/95 via-stone-50 to-amber-100/90 text-stone-900 p-8 sm:p-10 rounded-2xl border-8 border-double border-amber-700/60 shadow-xl print:m-0 print:border-4"
          >
            {/* Subtle vintage parchment corner ornaments */}
            <div className="absolute top-2 left-2 text-amber-600/40 text-xl font-serif">❖</div>
            <div className="absolute top-2 right-2 text-amber-600/40 text-xl font-serif">❖</div>
            <div className="absolute bottom-2 left-2 text-amber-600/40 text-xl font-serif">❖</div>
            <div className="absolute bottom-2 right-2 text-amber-600/40 text-xl font-serif">❖</div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-600/10 border-2 border-amber-600 text-amber-700 mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-extrabold text-amber-800">
                  Google AI Studio Life Sciences Academy
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight mt-1">
                  Certificate of Scientific Mastery
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 italic">
                  Grade 8 Interactive Life Science & Evolutionary Biology
                </p>
              </div>

              <div className="py-2">
                <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  This certifies that
                </p>

                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center justify-center gap-2 mt-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="text-lg font-bold font-serif text-stone-900 border-b-2 border-amber-600 bg-transparent px-3 py-1 text-center focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-amber-700 text-white text-xs font-semibold rounded-lg"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <div className="mt-1 flex items-center justify-center gap-2 group">
                    <span 
                      onClick={() => setIsEditingName(true)}
                      className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-900 underline decoration-amber-400 decoration-wavy cursor-pointer hover:text-amber-700 transition"
                      title="Click to edit name"
                    >
                      {studentName}
                    </span>
                    <span className="text-[10px] text-stone-400 group-hover:text-stone-600">(edit)</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-stone-700 max-w-lg mx-auto mt-2 leading-relaxed">
                  has demonstrated rigorous Grade 8 scientific competencies in Plant Reproductive Anatomy, Mendelian Genetics & Inheritance Probability, and Animal Courtship, Parenting, and Environmental Growth Interactions.
                </p>
              </div>

              {/* Mastered Branches Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-amber-800/20 text-left">
                <div className={`p-3 rounded-xl border ${levelMastery[1] ? 'bg-emerald-50 border-emerald-300' : 'bg-stone-100/60 border-stone-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-800">1. Botany</span>
                    {levelMastery[1] ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] text-stone-400">In Progress</span>}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Score: {levelScores[1] || 0}%
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    Flowers, Seeds, Dispersal & Stress
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${levelMastery[2] ? 'bg-emerald-50 border-emerald-300' : 'bg-stone-100/60 border-stone-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-800">2. Genetics</span>
                    {levelMastery[2] ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] text-stone-400">In Progress</span>}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Score: {levelScores[2] || 0}%
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    DNA, Genes, Punnett Squares
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${levelMastery[3] ? 'bg-emerald-50 border-emerald-300' : 'bg-stone-100/60 border-stone-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-800">3. Zoology</span>
                    {levelMastery[3] ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] text-stone-400">In Progress</span>}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Score: {levelScores[3] || 0}%
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    Courtship, Care & Environment
                  </div>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-4 flex items-center justify-between text-xs text-stone-600 border-t border-amber-800/20">
                <div className="text-left">
                  <div className="font-serif font-bold text-stone-800 text-sm italic">Dr. Linnea & Finch</div>
                  <div className="text-[10px] text-stone-500">Chief Science Instructors</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-700 bg-amber-600/10 flex items-center justify-center font-bold text-amber-800 text-[10px] text-center leading-tight">
                    OFFICIAL<br/>SEAL
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-medium text-stone-800">{currentDate}</div>
                  <div className="text-[10px] text-stone-500">Date Issued • {totalPoints} XP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges Cabinet */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span>Earned Science Badges ({unlockedBadges.length} / {BADGES.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {BADGES.map((b) => {
                const isUnlocked = unlockedBadges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-2xl border transition ${
                      isUnlocked
                        ? 'bg-slate-800/80 border-amber-500/40 text-white'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-2xl">{b.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{b.name}</div>
                        <div className="text-[10px] text-amber-400 font-medium">{b.title}</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {b.description}
                    </p>
                    <div className="mt-1.5 text-[10px] text-slate-500 font-mono">
                      {isUnlocked ? '✓ Unlocked' : `Requirement: ${b.conditionDescription}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
