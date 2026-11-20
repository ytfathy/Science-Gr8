/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ZoomIn,
  RefreshCw,
  Dna,
  Shuffle
} from 'lucide-react';
import { 
  GENETICS_INFOGRAPHIC_URL, 
  GENETICS_HOTSPOTS, 
  ZOOM_STAGES, 
  LEVEL_2_QUIZ 
} from '../../data/geneticsData.js';
import { Hotspot } from '../../data/plantData.js';
import { solvePunnettSquare, simulateLitters, evaluateMastery } from '../../game/rules.js';
import { soundFx, shuffleArray } from '../../utils/audio.js';
import { LessonVideoModal } from '../LessonVideoModal.js';

interface GeneticsInheritanceLevelProps {
  onAwardPoints: (pts: number) => void;
  onCompleteQuiz: (levelNum: number, score: number, passed: boolean) => void;
  onNarrate: (text: string) => void;
  onInspectHotspot: () => void;
  onSimulationComplete: () => void;
}

export const GeneticsInheritanceLevel: React.FC<GeneticsInheritanceLevelProps> = ({
  onAwardPoints,
  onCompleteQuiz,
  onNarrate,
  onInspectHotspot,
  onSimulationComplete,
}) => {
  const [activeTab, setActiveTab] = useState<
    'infographic' | 'two_paths' | 'zoom_journey' | 'alleles_traits' | 'punnett_studio' | 'variation_evolution' | 'video_lesson' | 'quiz'
  >('infographic');

  // Video explanation modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Hotspot inspector
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(GENETICS_HOTSPOTS[0]);

  // Deep Zoom state
  const [zoomLevelIndex, setZoomLevelIndex] = useState<number>(0);

  // Punnett Square interactive state
  const [parent1Genotype, setParent1Genotype] = useState<string>('Ss');
  const [parent2Genotype, setParent2Genotype] = useState<string>('Ss');
  const [placedCells, setPlacedCells] = useState<Record<number, string>>({});

  // Litter Simulation state (Probability vs Reality)
  const [litterSize, setLitterSize] = useState<number>(4);
  const [simulatedLitter, setSimulatedLitter] = useState<{
    kittens: { genotype: string; phenotype: 'short' | 'long' }[];
    shortCount: number;
    longCount: number;
    shortPercent: number;
  } | null>(null);

  // Level 2 Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAttempt, setQuizAttempt] = useState<number>(1);
  const [shuffledOptions, setShuffledOptions] = useState<Record<string, { text: string; originalIndex: number }[]>>({});

  // Randomize answer choices per quiz attempt
  React.useEffect(() => {
    const map: Record<string, { text: string; originalIndex: number }[]> = {};
    LEVEL_2_QUIZ.forEach((q) => {
      if (q.options) {
        const items = q.options.map((text, idx) => ({ text, originalIndex: idx }));
        map[q.id] = shuffleArray(items);
      }
    });
    setShuffledOptions(map);
  }, [quizAttempt]);

  const punnettResult = solvePunnettSquare(parent1Genotype, parent2Genotype);

  const handleRunLitterSim = () => {
    soundFx.playStep();
    const result = simulateLitters(parent1Genotype, parent2Genotype, litterSize);
    setSimulatedLitter(result);
    onSimulationComplete();
    onAwardPoints(15);
  };

  const handlePlaceAllele = (cellIndex: number, genotype: string) => {
    soundFx.playClick();
    setPlacedCells((prev) => ({ ...prev, [cellIndex]: genotype }));
    if (Object.keys(placedCells).length === 3) {
      soundFx.playCorrect();
      onAwardPoints(10);
    }
  };

  const handleResetPunnett = () => {
    soundFx.playClick();
    setPlacedCells({});
    setSimulatedLitter(null);
  };

  const handleNextZoom = () => {
    soundFx.playStep();
    const next = (zoomLevelIndex + 1) % ZOOM_STAGES.length;
    setZoomLevelIndex(next);
    onNarrate(`${ZOOM_STAGES[next].name}: ${ZOOM_STAGES[next].description}`);
  };

  const handleQuizAnswer = (qId: string, optIndex: number) => {
    if (submittedQuiz) return;
    soundFx.playClick();
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    soundFx.playClick();
    let score = 0;
    LEVEL_2_QUIZ.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    setQuizScore(score);
    setSubmittedQuiz(true);
    const mastery = evaluateMastery(score, LEVEL_2_QUIZ.length);

    if (mastery.passed) {
      soundFx.playFanfare();
      onAwardPoints(score * 20 + 50);
    } else {
      soundFx.playIncorrect();
    }

    onCompleteQuiz(2, mastery.percentage, mastery.passed);
  };

  const handleRetryQuiz = () => {
    soundFx.playClick();
    setQuizAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(0);
    setQuizAttempt((prev) => prev + 1);
  };

  const currentZoomStage = ZOOM_STAGES[zoomLevelIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Level Banner */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-2 border border-cyan-500/40">
              <span>Level 2 Expedition</span>
              <span>•</span>
              <span>Genetics & Molecular Heredity</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Science of Siblings: DNA, Inheritance & Diversity
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              Embark on a microscopic zoom into chromosomes and DNA, master Mendelian dominant & recessive alleles, and test probability with interactive Punnett squares.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setIsVideoModalOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-red-700/25 cursor-pointer border border-rose-400/30"
            >
              <span>🎬 Watch Lesson Explanation</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quiz');
              }}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-cyan-700/20 cursor-pointer"
            >
              <span>Take Level 2 Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-tab pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: 'infographic', label: '1. Infographic Explorer', icon: Layers },
            { id: 'two_paths', label: '2. Two Paths to Reproduction', icon: Shuffle },
            { id: 'zoom_journey', label: '3. Microscopic Zoom Journey', icon: ZoomIn },
            { id: 'alleles_traits', label: '4. Genotypes & Phenotypes', icon: Dna },
            { id: 'punnett_studio', label: '5. Punnett Square & Probability', icon: Sparkles },
            { id: 'variation_evolution', label: '6. Sibling Diversity & Evolution', icon: Shuffle },
            { id: 'video_lesson', label: '7. 🎬 Lesson Video', icon: Play },
            { id: 'quiz', label: '8. Mastery Assessment', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: INFOGRAPHIC EXPLORER */}
      {activeTab === 'infographic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white">Interactive Genetics Infographic</h2>
              </div>
              <span className="text-[11px] text-slate-400">Click pulsing pins to inspect biological concepts</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-stone-950 flex-1">
              <img
                src={GENETICS_INFOGRAPHIC_URL}
                alt="The Science of Siblings Infographic"
                className="w-full h-auto object-contain max-h-[750px] mx-auto select-none"
              />

              {GENETICS_HOTSPOTS.map((spot) => {
                const isSelected = selectedHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedHotspot(spot);
                      onInspectHotspot();
                      onNarrate(spot.shortText);
                    }}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform hover:scale-125 focus:outline-none cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110 z-20'
                        : 'bg-cyan-500 text-white ring-2 ring-white/60 hover:bg-cyan-400 z-10 animate-pulse'
                    }`}
                    title={spot.title}
                    aria-label={`Inspect ${spot.title}`}
                  >
                    <span>✦</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/40">
                  GENETICS • RESEARCH BRIEF
                </span>
                <span className="text-xs text-slate-500">ID: {selectedHotspot.id}</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedHotspot.title}
              </h3>

              <p className="text-xs text-cyan-300 font-semibold leading-relaxed bg-cyan-950/40 p-3 rounded-xl border border-cyan-900/50">
                "{selectedHotspot.shortText}"
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Scientific Mechanism
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {selectedHotspot.detail}
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>NGSS Core Insight</span>
                </div>
                <p className="leading-snug">{selectedHotspot.scientificFact}</p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onNarrate(selectedHotspot.detail);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                >
                  <span>Read Aloud</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('zoom_journey');
                  }}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Launch Deep Zoom</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hotspots Quick Switcher */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
              <h4 className="text-xs font-bold text-slate-300 mb-3 px-2">
                Guide Chapters ({GENETICS_HOTSPOTS.length})
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {GENETICS_HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedHotspot(spot);
                      onInspectHotspot();
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs transition border cursor-pointer ${
                      selectedHotspot.id === spot.id
                        ? 'bg-cyan-950/70 border-cyan-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="truncate">{spot.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TWO PATHS TO REPRODUCTION */}
      {activeTab === 'two_paths' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asexual Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl">
                  🦠
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Asexual Reproduction</h3>
                  <span className="text-xs text-cyan-400 font-semibold">1 Parent • Genetic Clones</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                A single parent transfers an exact duplicate copy of its genetic material. Offspring are genetic clones possessing identical DNA sequences (barring rare spontaneous mutations).
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-white">1. Binary Fission (Bacteria)</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Single-celled prokaryotes duplicate their circular chromosome and pinch into two identical daughter cells in as little as 20 minutes!
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-white">2. Budding (Freshwater Hydra)</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    A small outgrowth develops through mitotic division on the body of the parent, grows tentacles, and detaches as an independent organism.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-white">3. Fragmentation (Corals & Starfish)</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Broken colony fragments or severed arms regenerate complete new clonal individuals via cellular differentiation.
                  </p>
                </div>
              </div>
            </div>

            {/* Sexual Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl">
                  🐈
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sexual Reproduction</h3>
                  <span className="text-xs text-purple-400 font-semibold">2 Parents • Unique Combinations</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Two parents each contribute half (50%) of their chromosomes via haploid gametes (egg and sperm). Fertilization yields a diploid zygote with a brand-new genetic combination.
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Evolutionary Shield:</span>
                  <span className="text-emerald-400">Survival in changing environments</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  While asexual reproduction allows rapid population growth in stable ecosystems, sexual reproduction generates diverse immune systems, metabolic variations, and physical traits that prevent an entire species from being wiped out by a single environmental shock.
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Maternal Contribution: 50%</span>
                  <span>Paternal Contribution: 50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: MICROSCOPIC ZOOM JOURNEY */}
      {activeTab === 'zoom_journey' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  The Architecture of Heredity
                </span>
                <h3 className="text-xl font-bold text-white">
                  6-Stage Deep Zoom Journey: Organism to Gene
                </h3>
              </div>

              <button
                onClick={handleNextZoom}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer"
              >
                <span>Zoom In to Next Stage ({zoomLevelIndex + 1} / {ZOOM_STAGES.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stage Selector Track */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
              {ZOOM_STAGES.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => {
                    soundFx.playStep();
                    setZoomLevelIndex(idx);
                    onNarrate(`${st.name}: ${st.description}`);
                  }}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    idx === zoomLevelIndex
                      ? 'bg-cyan-950 border-cyan-400 text-white ring-2 ring-cyan-400/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">0{idx + 1}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{st.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{st.scaleLabel}</div>
                </button>
              ))}
            </div>

            {/* Active Stage Detailed Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
              <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative min-h-[300px]">
                {/* SVG Visualizations per Stage */}
                {currentZoomStage.id === 'organism' && (
                  <div className="text-center space-y-3">
                    <div className="text-7xl animate-pulse">🐈</div>
                    <div className="text-sm font-bold text-white">Whole Eukaryotic Organism</div>
                    <div className="text-xs text-slate-400">Macroscopic Scale (~45 cm)</div>
                  </div>
                )}

                {currentZoomStage.id === 'cell' && (
                  <div className="text-center space-y-3">
                    <div className="w-44 h-44 rounded-full border-4 border-dashed border-cyan-500/70 bg-cyan-950/40 flex items-center justify-center relative shadow-lg">
                      <div className="w-20 h-20 rounded-full bg-indigo-950 border-2 border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-300">
                        Nucleus
                      </div>
                      <div className="absolute top-4 right-8 w-6 h-3 rounded-full bg-emerald-600/80 text-[8px] flex items-center justify-center text-white">
                        Mito
                      </div>
                    </div>
                    <div className="text-xs text-cyan-300 font-mono">Microscopic Cell (~20 µm)</div>
                  </div>
                )}

                {currentZoomStage.id === 'nucleus' && (
                  <div className="text-center space-y-3">
                    <div className="w-48 h-48 rounded-full border-4 border-indigo-500 bg-indigo-950/80 flex items-center justify-center p-4 relative shadow-xl">
                      <div className="text-3xl animate-bounce">🧬</div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 text-5xl">
                        ❄️
                      </div>
                    </div>
                    <div className="text-xs text-indigo-300 font-mono">Command Center (~6 µm)</div>
                  </div>
                )}

                {currentZoomStage.id === 'chromosome' && (
                  <div className="text-center space-y-3">
                    <div className="w-36 h-48 flex items-center justify-center relative">
                      <div className="text-7xl font-extrabold text-cyan-400 drop-shadow-md">
                        X
                      </div>
                    </div>
                    <div className="text-xs text-cyan-300 font-mono">38 Chromosomes (19 Pairs in Cats)</div>
                  </div>
                )}

                {currentZoomStage.id === 'dna' && (
                  <div className="text-center space-y-3">
                    <div className="flex flex-col items-center gap-1.5 py-4">
                      <div className="w-32 h-6 border-y-2 border-cyan-400 flex justify-between px-2 text-[10px] text-cyan-300 font-mono">
                        <span>A</span> • • • <span>T</span>
                      </div>
                      <div className="w-24 h-6 border-y-2 border-indigo-400 flex justify-between px-2 text-[10px] text-indigo-300 font-mono">
                        <span>C</span> • • • <span>G</span>
                      </div>
                      <div className="w-32 h-6 border-y-2 border-cyan-400 flex justify-between px-2 text-[10px] text-cyan-300 font-mono">
                        <span>T</span> • • • <span>A</span>
                      </div>
                      <div className="w-24 h-6 border-y-2 border-indigo-400 flex justify-between px-2 text-[10px] text-indigo-300 font-mono">
                        <span>G</span> • • • <span>C</span>
                      </div>
                    </div>
                    <div className="text-xs text-cyan-300 font-mono">Double Helix (~2 nm width)</div>
                  </div>
                )}

                {currentZoomStage.id === 'gene' && (
                  <div className="text-center space-y-3">
                    <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/50 space-y-2">
                      <div className="text-xs font-mono text-emerald-400">
                        [ATG] [GTC] [TTC] [AAA] [TAG]
                      </div>
                      <div className="text-xs text-slate-300">
                        Transcription → Translation → Protein Folding
                      </div>
                      <div className="text-2xl">✨ ⚙️ 🧶</div>
                    </div>
                    <div className="text-xs text-emerald-300 font-mono">Coding Gene → Keratin Fur Fiber</div>
                  </div>
                )}
              </div>

              {/* Stage Description & Scientific Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                  <span>Scale: {currentZoomStage.scaleLabel}</span>
                </div>

                <h4 className="text-2xl font-bold text-white">
                  {currentZoomStage.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {currentZoomStage.description}
                </p>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    Associated Sub-structures:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentZoomStage.structures.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200">
                  <strong className="text-cyan-300">Biochemical Fact: </strong>
                  {currentZoomStage.scientificDetail}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: GENOTYPES & PHENOTYPES */}
      {activeTab === 'alleles_traits' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white">
              Mechanics of Dominant & Recessive Traits
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Explore how underlying allele combinations (<strong>Genotype</strong>) dictate observable physical characteristics (<strong>Phenotype</strong>). Dominant alleles mask recessive alleles.
            </p>

            {/* Fur length model breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* SS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-black text-cyan-400">SS</span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">
                    Homozygous Dominant
                  </span>
                </div>
                <div className="text-3xl text-center py-2">🐱</div>
                <div className="text-xs font-bold text-white text-center">Short Fur Phenotype</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Both alleles are dominant (S). The organism expresses the short-hair phenotype and can only pass the S allele to offspring.
                </p>
              </div>

              {/* Ss */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-black text-cyan-300">Ss</span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-semibold border border-cyan-800">
                    Heterozygous Carrier
                  </span>
                </div>
                <div className="text-3xl text-center py-2">🐱</div>
                <div className="text-xs font-bold text-white text-center">Short Fur Phenotype</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  The dominant S allele completely masks the recessive s allele. The cat looks identical to an SS cat but carries the hidden long-hair gene!
                </p>
              </div>

              {/* ss */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-black text-amber-400">ss</span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">
                    Homozygous Recessive
                  </span>
                </div>
                <div className="text-3xl text-center py-2">🦁</div>
                <div className="text-xs font-bold text-white text-center">Long Fur Phenotype</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Both alleles are recessive (s). Without any dominant S allele to mask it, the recessive long-fur trait is physically expressed.
                </p>
              </div>
            </div>

            {/* Educational Disclaimer Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <strong className="text-amber-300">Scientific Model Disclaimer: </strong>
              The single-gene S/s model is an educational simplification to master Mendelian principles. In real domestic cats, coat length is influenced by mutations in the FGF5 gene alongside polygenic modifying genes and grooming habits!
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: PUNNETT SQUARE STUDIO & LITTER SIMULATOR */}
      {activeTab === 'punnett_studio' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-2">
                <span>Interactive Punnett Square Studio</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Predicting Genetic Probability (Ss × Ss Cross)
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                Select parental genotypes, place gametes into the four cross cells, and observe the expected 1:2:1 genotype and 3:1 phenotype ratios.
              </p>
            </div>

            {/* Parent Genotype Selectors */}
            <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Parent 1 Genotype:
                </label>
                <div className="flex gap-2">
                  {['SS', 'Ss', 'ss'].map((gt) => (
                    <button
                      key={gt}
                      onClick={() => {
                        soundFx.playClick();
                        setParent1Genotype(gt);
                        handleResetPunnett();
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition border cursor-pointer ${
                        parent1Genotype === gt
                          ? 'bg-cyan-600 text-white border-cyan-500'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      {gt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xl font-bold text-slate-500">×</div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Parent 2 Genotype:
                </label>
                <div className="flex gap-2">
                  {['SS', 'Ss', 'ss'].map((gt) => (
                    <button
                      key={gt}
                      onClick={() => {
                        soundFx.playClick();
                        setParent2Genotype(gt);
                        handleResetPunnett();
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition border cursor-pointer ${
                        parent2Genotype === gt
                          ? 'bg-cyan-600 text-white border-cyan-500'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      {gt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleResetPunnett}
                className="ml-auto px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Cells</span>
              </button>
            </div>

            {/* Punnett Square Grid & Ratio Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* 2x2 Grid */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="relative p-6 bg-slate-950 rounded-2xl border border-slate-800 inline-block shadow-inner">
                  {/* Top Parent Gametes */}
                  <div className="flex ml-14 mb-2 gap-4">
                    <div className="w-20 text-center font-mono font-bold text-sm text-cyan-400">
                      Gamete: {punnettResult.gametesP2[0]}
                    </div>
                    <div className="w-20 text-center font-mono font-bold text-sm text-cyan-400">
                      Gamete: {punnettResult.gametesP2[1]}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {/* Left Parent Gametes */}
                    <div className="flex flex-col justify-around font-mono font-bold text-sm text-cyan-400 w-10">
                      <div>{punnettResult.gametesP1[0]}</div>
                      <div>{punnettResult.gametesP1[1]}</div>
                    </div>

                    {/* 4 Cells */}
                    <div className="grid grid-cols-2 gap-3">
                      {punnettResult.cells.map((expected, idx) => {
                        const placed = placedCells[idx];
                        const isFilled = placed !== undefined;

                        return (
                          <div
                            key={idx}
                            onClick={() => handlePlaceAllele(idx, expected)}
                            className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition cursor-pointer ${
                              isFilled
                                ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md'
                                : 'bg-slate-900 border-dashed border-slate-700 text-slate-500 hover:border-slate-500'
                            }`}
                          >
                            {isFilled ? (
                              <>
                                <span className="font-mono text-lg font-black text-white">{placed}</span>
                                <span className="text-[10px] text-cyan-300 font-semibold mt-1">
                                  {placed === 'ss' ? 'Long Fur' : 'Short Fur'}
                                </span>
                              </>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-medium">Click to Fill</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistical Ratio Outcomes */}
              <div className="lg:col-span-6 space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Mathematical Expected Ratios
                </h4>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Genotypic Ratio:</span>
                  <span className="font-mono font-bold text-sm text-cyan-300">
                    {punnettResult.genotypeRatio}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Phenotypic Ratio:</span>
                  <span className="font-mono font-bold text-sm text-emerald-400">
                    {punnettResult.phenotypeRatio}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Expected Dominant (Short):</span>
                  <span className="font-bold text-sm text-white">
                    {Math.round((punnettResult.phenotypeCounts.short / 4) * 100)}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Expected Recessive (Long):</span>
                  <span className="font-bold text-sm text-amber-400">
                    {Math.round((punnettResult.phenotypeCounts.long / 4) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* VIRTUAL LITTER SIMULATOR (Probability vs Reality) */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Litter Simulator: Probability vs. Guaranteed Reality</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    A 3:1 ratio does <strong>not</strong> mean every litter of 4 kittens will contain exactly 3 short and 1 long! Simulate random litters to observe statistical fluctuation.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Litter Size:</span>
                  {[4, 12, 100].map((size) => (
                    <button
                      key={size}
                      onClick={() => setLitterSize(size)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition border cursor-pointer ${
                        litterSize === size
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                  <button
                    onClick={handleRunLitterSim}
                    className="ml-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl text-xs transition shadow-md cursor-pointer"
                  >
                    Simulate Litter
                  </button>
                </div>
              </div>

              {simulatedLitter && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 animate-in fade-in duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs font-bold text-white">
                      Observed Result: {simulatedLitter.shortCount} Short ({simulatedLitter.shortPercent}%) vs {simulatedLitter.longCount} Long ({100 - simulatedLitter.shortPercent}%)
                    </div>
                    <div className="text-xs text-slate-400">
                      Expected Ratio: 75% Short vs 25% Long
                    </div>
                  </div>

                  {/* Kittens visual grid */}
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 bg-slate-900 rounded-xl">
                    {simulatedLitter.kittens.map((k, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border text-center text-xs flex flex-col items-center min-w-[50px] ${
                          k.phenotype === 'short'
                            ? 'bg-cyan-950/60 border-cyan-700/60 text-cyan-200'
                            : 'bg-amber-950/60 border-amber-700/60 text-amber-200'
                        }`}
                      >
                        <span className="text-lg">{k.phenotype === 'short' ? '🐱' : '🦁'}</span>
                        <span className="font-mono font-bold text-[10px] mt-0.5">{k.genotype}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-amber-200 leading-relaxed">
                    <strong>Scientific Analysis: </strong>
                    Each fertilization is an independent event with 75% probability for short fur. Over small samples (e.g., 4 kittens), ratios fluctuate widely due to chance. As sample size grows to 100, the law of large numbers converges the observed ratio close to the predicted 75%/25%!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: SIBLING DIVERSITY & EVOLUTION */}
      {activeTab === 'variation_evolution' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white">
              Trillions of Combinations: Why Siblings Differ
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Domestic cats possess 19 chromosome pairs. During meiosis, homologous chromosomes align and segregate independently (independent assortment).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-2xl font-mono font-black text-cyan-400">2^19</div>
                <div className="text-xs font-bold text-white">524,288 Gametes per Parent</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Random alignment of 19 chromosome pairs produces over half a million distinct egg or sperm combinations per parent.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-2xl font-mono font-black text-emerald-400">&gt; 274 Billion</div>
                <div className="text-xs font-bold text-white">Combinations per Kitten</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Combining parental gametes yields hundreds of billions of unique genetic combinations before even factoring in crossing over!
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-2xl font-mono font-black text-purple-400">Environment</div>
                <div className="text-xs font-bold text-white">Twins & Clones Differ</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Identical twins or cloned animals share the same DNA sequence, yet environmental nutrition, stress, and epigenetics create observable differences.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: LESSON EXPLANATION VIDEO */}
      {activeTab === 'video_lesson' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-1 border border-cyan-500/40">
                <span>🎬 Video Explanation</span>
                <span>•</span>
                <span>Step 2 of Learning Flow</span>
              </div>
              <h3 className="text-xl font-bold text-white">Reproduction, Genetics & The Science of Siblings</h3>
              <p className="text-xs text-slate-300 mt-1">
                Watch this conceptual overview of DNA, chromosomes, Mendelian dominant vs. recessive inheritance, and Punnett square probability before testing your knowledge.
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quiz');
              }}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-cyan-700/20 cursor-pointer"
            >
              <span>Proceed to Level 2 Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 16:9 YouTube Video Embed Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/o693rPk8fbM?rel=0"
              title="Reproduction & Genetics - Lesson Explanation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Fallback Notice */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-base">ℹ️</span>
              <span>
                If the embedded video is restricted by your network or browser settings, you can open it directly:
              </span>
            </div>
            <a
              href="https://www.youtube.com/watch?v=o693rPk8fbM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition font-medium border border-slate-700/80 cursor-pointer"
            >
              <span>Watch on YouTube ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* SECTION 8: COMPREHENSIVE LEVEL 2 QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-1">
                <span>Comprehensive Genetics Evaluation</span>
                <span>•</span>
                <span>Target: 80% (8/10)</span>
              </div>
              <h3 className="text-xl font-bold text-white">Level 2 Genetics Mastery Quiz</h3>
            </div>

            {submittedQuiz && (
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-2xl text-xs font-bold border ${
                  quizScore >= 8
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                    : 'bg-red-950/80 border-red-500 text-red-300'
                }`}>
                  Score: {quizScore} / {LEVEL_2_QUIZ.length} ({Math.round((quizScore / LEVEL_2_QUIZ.length) * 100)}%)
                </div>
                <button
                  onClick={handleRetryQuiz}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>
              </div>
            )}
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {LEVEL_2_QUIZ.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition ${
                    submittedQuiz
                      ? isCorrect
                        ? 'bg-cyan-950/30 border-cyan-500/50'
                        : 'bg-red-950/30 border-red-500/50'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Question {idx + 1}
                    </div>
                    {submittedQuiz && (
                      <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-cyan-400' : 'text-red-400'}`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span>{isCorrect ? 'Correct' : 'Needs Review'}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white mb-4 leading-relaxed">
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    {(shuffledOptions[q.id] || q.options?.map((text, idx) => ({ text, originalIndex: idx })) || []).map((optObj, optIdx) => {
                      const isOptionSelected = selectedOpt === optObj.originalIndex;
                      const isOptionCorrect = q.correctAnswer === optObj.originalIndex;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                      if (submittedQuiz) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-cyan-600 text-white border-cyan-500 font-bold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-red-700 text-white border-red-600';
                        } else {
                          btnStyle = 'bg-slate-900/50 text-slate-500 border-slate-900';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-cyan-600 text-white border-cyan-500 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submittedQuiz}
                          onClick={() => handleQuizAnswer(q.id, optObj.originalIndex)}
                          className={`w-full p-3 rounded-xl text-xs text-left border flex items-center justify-between gap-3 transition cursor-pointer ${btnStyle}`}
                        >
                          <span>{optObj.text}</span>
                          {submittedQuiz && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-cyan-200 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-cyan-300">Scientific Explanation: </strong>
                        {q.explanation}
                      </p>
                      {q.misconceptionAlert && (
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                          <strong>Common Misconception: </strong>
                          {q.misconceptionAlert}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submittedQuiz ? (
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Answer all questions, then submit for scoring and mastery evaluation.
              </span>
              <button
                disabled={Object.keys(quizAnswers).length < LEVEL_2_QUIZ.length}
                onClick={handleSubmitQuiz}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-700/20 cursor-pointer"
              >
                Submit Answers ({Object.keys(quizAnswers).length} / {LEVEL_2_QUIZ.length})
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <h4 className="text-lg font-bold text-white">
                {quizScore >= 8 ? '🎉 Level 2 Mastery Achieved!' : '📚 Review Needed'}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                {evaluateMastery(quizScore, LEVEL_2_QUIZ.length).message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Lesson Video Modal */}
      <LessonVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Reproduction, Genetics & The Science of Siblings"
        topic="Reproduction & Heredity"
        videoId="o693rPk8fbM"
        levelNumber={2}
        accentColor="cyan"
        description="Comprehensive video breakdown covering asexual vs. sexual reproduction, chromosomes, DNA double helix, Mendelian dominant vs recessive traits, and Punnett square probability."
        keyTopics={[
          'Asexual Reproduction (Clones) vs Sexual Reproduction (Genetic Variation)',
          'Cell Nucleus, Chromosomes, and DNA Double Helix',
          'Genotype vs. Phenotype & Dominant vs. Recessive Alleles',
          'Punnett Square Probability & Random Gamete Assortment',
        ]}
        onGoToQuiz={() => setActiveTab('quiz')}
      />
    </div>
  );
};
