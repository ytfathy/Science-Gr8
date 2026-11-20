/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  Play,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  Clock,
  Dna,
  PawPrint,
  Sprout,
  Flame,
  Atom,
  Thermometer,
} from 'lucide-react';
import { soundFx } from '../utils/audio.js';
import {
  QuarterId,
  getQuarterById,
  getQuarterProgressSummary,
} from '../data/quartersData.js';
import { QuarterTabsBar } from './QuarterTabsBar.js';

interface MainMenuProps {
  activeQuarter: QuarterId;
  onSelectQuarter: (quarter: QuarterId) => void;
  onStartLevel: (levelNum: number) => void;
  levelMastery: Record<number, boolean>;
  levelScores: Record<number, number>;
  q2LevelMastery: Record<number, boolean>;
  q2LevelScores: Record<number, number>;
  totalPoints: number;
  unlockedBadgesCount: number;
  onOpenNotebook: () => void;
  onOpenCertificate: () => void;
  onOpenMasterQuiz: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  activeQuarter,
  onSelectQuarter,
  onStartLevel,
  levelMastery,
  levelScores,
  q2LevelMastery,
  q2LevelScores,
  unlockedBadgesCount,
  onOpenNotebook,
  onOpenCertificate,
  onOpenMasterQuiz,
}) => {
  // Global keyboard shortcuts for active quarters (Quarter 1 & Quarter 2)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement
      ) {
        return;
      }
      if (activeQuarter === 1 || activeQuarter === 2) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          soundFx.playClick();
          onStartLevel(1);
        } else if (e.key === '1') {
          soundFx.playClick();
          onStartLevel(1);
        } else if (e.key === '2') {
          soundFx.playClick();
          onStartLevel(2);
        } else if (e.key === '3') {
          soundFx.playClick();
          onStartLevel(3);
        } else if (e.key.toLowerCase() === 'q' && activeQuarter === 1) {
          soundFx.playClick();
          onOpenMasterQuiz();
        } else if (e.key.toLowerCase() === 'n') {
          soundFx.playClick();
          onOpenNotebook();
        }
      }
      if (e.key.toLowerCase() === 'd') {
        soundFx.playClick();
        onOpenCertificate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeQuarter, onStartLevel, onOpenNotebook, onOpenCertificate, onOpenMasterQuiz]);

  const currentQuarter = getQuarterById(activeQuarter);
  const progressSummary = getQuarterProgressSummary(activeQuarter, levelMastery, q2LevelMastery);

  const q1Levels = [
    {
      num: 1,
      badge: 'Level 1: Botany',
      icon: <Sprout className="w-6 h-6 text-emerald-400" />,
      borderColor: 'hover:border-emerald-500/70',
      title: 'Plant Reproduction, Dispersal & Survival',
      subtitle: 'From flower anatomy and bee pollination to seed dispersal and extreme environmental stress.',
      imagePath: '/assets/aistudio/Botanical_Guide_to_Plant_Reproduction_Infographic_6c1a228e.png',
      topics: [
        'Sexual vs. Asexual (Tubers, Plantlets, Aspen)',
        'Detailed Flower Model: Stamen vs. Pistil/Carpel',
        'Bee Pollination & Crop Economics ($15 Billion)',
        'Wind, Water, Ingestion, & Hitchhiking Dispersal',
        'Germination Cues vs. Seedling Growth Resources',
      ],
    },
    {
      num: 2,
      badge: 'Level 2: Genetics',
      icon: <Dna className="w-6 h-6 text-cyan-400" />,
      borderColor: 'hover:border-cyan-500/70',
      title: 'DNA, Inheritance & Genetic Diversity',
      subtitle: 'Cellular deep zoom, Mendelian dominant/recessive alleles, and interactive Punnett squares.',
      imagePath: '/assets/aistudio/Guide_to_Genetics_and_Inheritance_Infographic_4291fda0.png',
      topics: [
        'Two Paths: Binary Fission & Budding vs. Sexual',
        'Deep Zoom: Organism → Cell → Nucleus → DNA → Gene',
        'Genotype (SS, Ss, ss) vs. Phenotype (Fur Length)',
        'Punnett Square Studio: Ss × Ss (3:1 Phenotype Ratio)',
        'Probability vs. Reality in Random Litters',
      ],
    },
    {
      num: 3,
      badge: 'Level 3: Zoology',
      icon: <PawPrint className="w-6 h-6 text-amber-400" />,
      borderColor: 'hover:border-amber-500/70',
      title: 'Animal Reproduction, Behavior & Survival',
      subtitle: 'Courtship displays, guppy mate-preference virtual lab, parenting sacrifices, and genetics vs. environment.',
      imagePath: '/assets/aistudio/Animal_Reproduction_and_Growth_Infographic_23a0eaba.png',
      topics: [
        'Sexual, Asexual & Dual Strategies (Aggregating Anemones)',
        'Courtship Displays: Peacocks, Weavers & Antler Combat',
        'Virtual Guppy Choice Lab: Large Tail Selection (78%)',
        'Parenting Sacrifices: Penguin & Octopus Marathon Care',
        'Livestock Growth Lab: Liebig Bottleneck on Genetics',
      ],
    },
  ];

  const q2Levels = [
    {
      num: 1,
      badge: 'Level 1: Reactions',
      icon: <Flame className="w-6 h-6 text-violet-400" />,
      borderColor: 'hover:border-violet-500/70',
      title: 'Chemical Reactions & Properties of Matter',
      subtitle: 'Investigate the Thermite phenomenon, lab safety protocols, multi-property density analysis, and Mix It Up! reactions.',
      bannerGradient: 'from-violet-950 via-purple-950/80 to-slate-950',
      formulaSnippet: 'Fe₂O₃ + 2Al → 2Fe + Al₂O₃',
      visualCaption: 'Thermite Anchor · >2,500 °C',
      topics: [
        'HMH Lab Safety Protocols, PPE & Proper Wafting',
        'Multi-Property ID: Density (1.0 vs 1.49 g/mL) & Freezing Pt',
        'Physical Changes vs. Chemical Reactions Classifier',
        'Mix It Up! Bag 1 vs. Bag 2 + NaN₃ Airbag Chemistry',
        'Five Observable Signs vs. Definite Property Evidence',
      ],
    },
    {
      num: 2,
      badge: 'Level 2: Equations',
      icon: <Atom className="w-6 h-6 text-cyan-400" />,
      borderColor: 'hover:border-cyan-500/70',
      title: 'Chemical Equations & Conservation of Matter',
      subtitle: 'Decode chemical formulas with parentheses, balance 5 curriculum equations, and model closed vs. open 55 g flasks.',
      bannerGradient: 'from-cyan-950 via-slate-900 to-slate-950',
      formulaSnippet: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      visualCaption: 'Conservation · 1 C, 4 H, 4 O',
      topics: [
        'Subscripts (Identity) vs. Coefficients (Quantity)',
        'Live Formula Atom Counter: (CH₃)₂N, Al₂(SO₄)₃, 4K₄(Fe(CN)₆)',
        'Interactive 5-Equation Balancing Studio (CH₄, C₃H₈, Rust)',
        'Closed Balloon Flask (55 g) vs. Open System CO₂ Escape',
        'W2 HW1D4U4L2 Atom-Counting Homework (10 Qs)',
      ],
    },
    {
      num: 3,
      badge: 'Level 3: Thermal Energy',
      icon: <Thermometer className="w-6 h-6 text-amber-400" />,
      borderColor: 'hover:border-amber-500/70',
      title: 'Thermal Energy, Rates & Engineering Design',
      subtitle: 'Explore heat transfer mechanisms, test 4 instant cold-pack pairs, simulate collision rates, and design a turtle egg warmer.',
      bannerGradient: 'from-amber-950 via-orange-950/70 to-slate-950',
      formulaSnippet: '27–33 °C · NH₄Cl vs. Fe + Salt',
      visualCaption: 'Exothermic & Endothermic Lab',
      topics: [
        'Conduction, Convection & Space Vacuum Radiation',
        'Reaction to the Rescue: 4-Pair Cold Pack Engineering',
        'Reaction Rate Lab: 18 °C (71 s) → 34 °C → 68 °C (21 s)',
        'Save the Sea Turtle Eggs! Incubator Decision Matrix',
        'Haber–Bosch Cooling Jackets (N₂ + 3H₂ → 2NH₃)',
      ],
    },
  ];

  const isQuarter1 = activeQuarter === 1;
  const isQuarter2 = activeQuarter === 2;

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-slate-950 text-white overflow-hidden flex flex-col justify-between">
      {/* Background science graphic elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isQuarter2 ? 'bg-violet-600/30' : 'bg-emerald-600/30'
          }`}
        />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-amber-600/30 rounded-full blur-3xl" />
      </div>

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 w-full flex-1 flex flex-col justify-center">
        {/* Title lockup */}
        <div className="text-center max-w-3xl mx-auto mb-7">
          <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next Generation Science Standards (NGSS)</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-300">Grade 8 Science · Quarters 1–4</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            SCIENCE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              EXPLORER
            </span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Select an academic quarter below to access its interactive labs, field notebook, explanation videos, and curriculum quiz.
          </p>

          <div className="mt-5 flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onOpenCertificate();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
            >
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mastery Diploma ({unlockedBadgesCount} Badges)</span>
            </button>
          </div>
        </div>

        {/* Quarter Selection Tabs (Quarter 1 – Quarter 4) */}
        <section aria-label="Grade 8 Science Quarters" className="mb-8">
          <QuarterTabsBar
            activeQuarter={activeQuarter}
            onSelectQuarter={onSelectQuarter}
            levelMastery={levelMastery}
            q2LevelMastery={q2LevelMastery}
          />
        </section>

        {/* Active Quarter Panel */}
        <section
          role="tabpanel"
          id={`quarter-panel-${activeQuarter}`}
          aria-labelledby={`quarter-tab-${activeQuarter}`}
          className="space-y-8"
        >
          {/* QUARTER 1 ACTIVE PANEL */}
          {isQuarter1 && (
            <>
              <div className="space-y-5 pb-5 border-b border-slate-800/80">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-bold text-slate-200">{currentQuarter.label}</span>
                      {currentQuarter.strand && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{currentQuarter.strand}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {currentQuarter.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                      {currentQuarter.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300 tabular-nums shrink-0">
                    <span className="font-semibold">{progressSummary.label}</span>
                  </div>
                </div>

                {/* Quarter 1 Tools: Launch Lab, Quiz & Field Notebook */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onStartLevel(1);
                    }}
                    className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-white shrink-0" />
                    <span>Launch Quarter 1 Lab</span>
                    <span className="hidden sm:inline text-[11px] bg-emerald-700/80 px-2 py-0.5 rounded-md font-mono">
                      Space
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onOpenMasterQuiz();
                    }}
                    className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
                  >
                    <Award className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>Quarter 1 QUIZ (96 Qs)</span>
                    <span className="hidden sm:inline text-[11px] bg-slate-950/20 px-2 py-0.5 rounded-md font-mono text-slate-950 font-extrabold">
                      Q
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onOpenNotebook();
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold text-sm flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Quarter 1 Field Notebook</span>
                    <span className="hidden sm:inline text-[11px] bg-slate-900/90 text-slate-300 px-2 py-0.5 rounded-md font-mono border border-slate-700">
                      N
                    </span>
                  </button>
                </div>
              </div>

              {/* Quarter 1: All 3 Interactive Level Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {q1Levels.map((lvl) => {
                  const isMastered = levelMastery[lvl.num];
                  const score = levelScores[lvl.num] || 0;

                  return (
                    <div
                      key={lvl.num}
                      className={`group relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-slate-900 ${lvl.borderColor}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition">
                              {lvl.icon}
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                {lvl.badge}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {isMastered ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold tabular-nums">
                                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-950" />
                                    <span>Mastered ({score}%)</span>
                                  </span>
                                ) : score > 0 ? (
                                  <span className="text-amber-400 text-xs font-bold tabular-nums">
                                    In Progress ({score}%)
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-xs font-medium">Ready to explore</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-2xl font-black text-slate-800 group-hover:text-slate-700 transition font-mono tabular-nums">
                            0{lvl.num}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition line-clamp-2 leading-snug">
                          {lvl.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{lvl.subtitle}</p>

                        <div className="my-4 relative rounded-xl overflow-hidden border border-slate-800 h-28 bg-slate-950 group-hover:border-slate-700 transition">
                          <img
                            src={lvl.imagePath}
                            alt={lvl.title}
                            className="w-full h-full object-cover object-top opacity-75 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-medium text-slate-300">
                            <span className="bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-700">
                              Official Infographic
                            </span>
                            <span className="text-emerald-300 flex items-center gap-1">
                              🎬 Video &amp; 3D Lab
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1.5 mt-2">
                          {lvl.topics.map((t, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <span className="text-emerald-400 text-sm leading-none">•</span>
                              <span className="leading-snug">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            onStartLevel(lvl.num);
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                            isMastered
                              ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                          }`}
                        >
                          <span>{isMastered ? `Review Level ${lvl.num}` : `Start Level ${lvl.num} Quest`}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quarter 1 Dedicated Master Assessment Card */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center lg:text-left">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-amber-300 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Quarter 1 Master Examination</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">100% Source-Extracted</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Comprehensive Grade 8 Life Science Quiz
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      All 96 questions and exercises extracted directly from the official Quarter 1 curriculum documentation. Covers all 11 scientific modules: Monohybrid Punnett squares, flower morphology, plantlet cloning, bee economics, seed dispersal vectors, guppy mate-choice, and selective crop engineering.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400 justify-center lg:justify-start">
                      <span>11 Modules (M1–M11)</span>
                      <span aria-hidden="true">·</span>
                      <span>Fisher–Yates Choice Randomization</span>
                      <span aria-hidden="true">·</span>
                      <span>Instructor Audio Narration</span>
                      <span aria-hidden="true">·</span>
                      <span>Instant Feedback &amp; Keys</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onOpenMasterQuiz();
                    }}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center gap-3 transition transform hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 whitespace-nowrap"
                  >
                    <span>Launch Master Quiz (96 Qs)</span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* QUARTER 2 ACTIVE PANEL — EXACT SAME STRUCTURE AS QUARTER 1 */}
          {isQuarter2 && (
            <>
              <div className="space-y-5 pb-5 border-b border-slate-800/80">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-bold text-violet-300">{currentQuarter.label}</span>
                      {currentQuarter.strand && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{currentQuarter.strand}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {currentQuarter.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                      {currentQuarter.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300 tabular-nums shrink-0">
                    <span className="font-semibold">{progressSummary.label}</span>
                  </div>
                </div>

                {/* Quarter 2 Tools: Launch Lab & Field Notebook */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onStartLevel(1);
                    }}
                    className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-violet-500/20 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-white shrink-0" />
                    <span>Launch Quarter 2 Lab</span>
                    <span className="hidden sm:inline text-[11px] bg-violet-700/80 px-2 py-0.5 rounded-md font-mono">
                      Space
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onOpenNotebook();
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold text-sm flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>Quarter 2 Field Notebook</span>
                    <span className="hidden sm:inline text-[11px] bg-slate-900/90 text-slate-300 px-2 py-0.5 rounded-md font-mono border border-slate-700">
                      N
                    </span>
                  </button>
                </div>
              </div>

              {/* Quarter 2: All 3 Interactive Level Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {q2Levels.map((lvl) => {
                  const isMastered = q2LevelMastery[lvl.num];
                  const score = q2LevelScores[lvl.num] || 0;

                  return (
                    <div
                      key={lvl.num}
                      className={`group relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-slate-900 ${lvl.borderColor}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition">
                              {lvl.icon}
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                {lvl.badge}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {isMastered ? (
                                  <span className="inline-flex items-center gap-1 text-violet-300 text-xs font-bold tabular-nums">
                                    <CheckCircle2 className="w-3.5 h-3.5 fill-violet-950" />
                                    <span>Mastered ({score}%)</span>
                                  </span>
                                ) : score > 0 ? (
                                  <span className="text-amber-400 text-xs font-bold tabular-nums">
                                    In Progress ({score}%)
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-xs font-medium">Ready to explore</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-2xl font-black text-slate-800 group-hover:text-slate-700 transition font-mono tabular-nums">
                            0{lvl.num}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition line-clamp-2 leading-snug">
                          {lvl.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{lvl.subtitle}</p>

                        {/* Chemistry Visual Lab Preview Banner */}
                        <div
                          className={`my-4 relative rounded-xl overflow-hidden border border-slate-800 h-28 bg-gradient-to-br ${lvl.bannerGradient} group-hover:border-slate-700 transition flex flex-col items-center justify-center p-3`}
                        >
                          <div className="font-mono text-sm sm:text-base font-extrabold text-white/95 tracking-wide text-center">
                            {lvl.formulaSnippet}
                          </div>
                          <div className="text-[11px] text-slate-300/80 mt-1">{lvl.visualCaption}</div>
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-medium text-slate-300">
                            <span className="bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-700">
                              Unit 4 Study Guide
                            </span>
                            <span className="text-violet-300 flex items-center gap-1">
                              🎬 Video &amp; Virtual Lab
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1.5 mt-2">
                          {lvl.topics.map((t, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <span className="text-violet-400 text-sm leading-none">•</span>
                              <span className="leading-snug">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            onStartLevel(lvl.num);
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                            isMastered
                              ? 'bg-slate-800 hover:bg-slate-700 text-violet-300 border border-violet-500/30'
                              : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/30'
                          }`}
                        >
                          <span>{isMastered ? `Review Level ${lvl.num}` : `Start Level ${lvl.num} Quest`}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* QUARTERS 3 & 4: STRICTLY COMING SOON (NO INVENTED LESSONS) */}
          {!isQuarter1 && !isQuarter2 && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 backdrop-blur-md shadow-xl space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-slate-300" />
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {currentQuarter.label}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentQuarter.label} — Coming Soon
                </h2>

                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {currentQuarter.description}
                </p>
              </div>

              {/* Quarter-Scoped Launch Lab, Quiz & Field Notebook Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5 text-left opacity-75 cursor-not-allowed flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                      <Play className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">Coming Soon</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">
                      Launch {currentQuarter.label} Lab
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Interactive labs will appear here once added.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5 text-left opacity-75 cursor-not-allowed flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                      <Award className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">Coming Soon</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">
                      {currentQuarter.label} Quiz
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Curriculum quiz will appear here once added.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5 text-left opacity-75 cursor-not-allowed flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">Coming Soon</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">
                      {currentQuarter.label} Field Notebook
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Quarter notes will appear here once added.
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onSelectQuarter(1);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Go to Quarter 1</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onSelectQuarter(2);
                  }}
                  className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Go to Quarter 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Perimeter Status Bar & Control Hints */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-3 px-6 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mastery Target: 80% per Level</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">Grade 8 Science Curriculum · Quarters 1–4</span>
        </div>

        {/* Hotkey hint bar */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">1-3</span>{' '}
          Levels
          {isQuarter1 && (
            <>
              <span className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 font-bold">
                Q
              </span>{' '}
              Quiz
            </>
          )}
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">Space</span>{' '}
          Start
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">N</span>{' '}
          Notebook
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">D</span>{' '}
          Diploma
        </div>
      </footer>
    </div>
  );
};
