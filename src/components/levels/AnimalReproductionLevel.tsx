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
  Heart,
  Shield,
  Activity,
  Droplets,
  Thermometer,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { 
  ANIMAL_INFOGRAPHIC_URL, 
  ANIMAL_HOTSPOTS, 
  COURTSHIP_CASES, 
  GUPPY_TRIALS, 
  LEVEL_3_QUIZ 
} from '../../data/animalData.js';
import { Hotspot } from '../../data/plantData.js';
import { calculateLivestockGrowth, evaluateMastery } from '../../game/rules.js';
import { soundFx, shuffleArray } from '../../utils/audio.js';
import { LessonVideoModal } from '../LessonVideoModal.js';

interface AnimalReproductionLevelProps {
  onAwardPoints: (pts: number) => void;
  onCompleteQuiz: (levelNum: number, score: number, passed: boolean) => void;
  onNarrate: (text: string) => void;
  onInspectHotspot: () => void;
  onSimulationComplete: () => void;
}

export const AnimalReproductionLevel: React.FC<AnimalReproductionLevelProps> = ({
  onAwardPoints,
  onCompleteQuiz,
  onNarrate,
  onInspectHotspot,
  onSimulationComplete,
}) => {
  const [activeTab, setActiveTab] = useState<
    'infographic' | 'modes' | 'courtship_guppy' | 'parenting_innate' | 'livestock_lab' | 'video_lesson' | 'quiz'
  >('infographic');

  // Video explanation modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Hotspots
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(ANIMAL_HOTSPOTS[0]);

  // Courtship & Guppy Experiment state
  const [selectedCourtshipCase, setSelectedCourtshipCase] = useState<string>(COURTSHIP_CASES[0].id);
  const [selectedGuppyTrial, setSelectedGuppyTrial] = useState<number>(1);
  const [tankSimulationActive, setTankSimulationActive] = useState<boolean>(false);

  // Livestock simulation state (Genetics vs Environment)
  const [cattleGenetics, setCattleGenetics] = useState<'standard' | 'high_yield'>('high_yield');
  const [feedQuality, setFeedQuality] = useState<number>(85);
  const [waterAccess, setWaterAccess] = useState<number>(90);
  const [temperatureC, setTemperatureC] = useState<number>(20);
  const [diseaseControl, setDiseaseControl] = useState<number>(85);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAttempt, setQuizAttempt] = useState<number>(1);
  const [shuffledOptions, setShuffledOptions] = useState<Record<string, { text: string; originalIndex: number }[]>>({});

  // Randomize answer choices per quiz attempt
  React.useEffect(() => {
    const map: Record<string, { text: string; originalIndex: number }[]> = {};
    LEVEL_3_QUIZ.forEach((q) => {
      if (q.options) {
        const items = q.options.map((text, idx) => ({ text, originalIndex: idx }));
        map[q.id] = shuffleArray(items);
      }
    });
    setShuffledOptions(map);
  }, [quizAttempt]);

  const livestockResult = calculateLivestockGrowth(cattleGenetics, {
    feedQuality,
    waterAccess,
    temperatureC,
    diseaseControl,
  });

  const handleRunGuppyTrial = (conditionNum: number) => {
    soundFx.playStep();
    setSelectedGuppyTrial(conditionNum);
    setTankSimulationActive(true);
    setTimeout(() => {
      setTankSimulationActive(false);
      soundFx.playCorrect();
      onAwardPoints(10);
      onSimulationComplete();
    }, 1200);
  };

  const handleQuizAnswer = (qId: string, optIndex: number) => {
    if (submittedQuiz) return;
    soundFx.playClick();
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    soundFx.playClick();
    let score = 0;
    LEVEL_3_QUIZ.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    setQuizScore(score);
    setSubmittedQuiz(true);
    const mastery = evaluateMastery(score, LEVEL_3_QUIZ.length);

    if (mastery.passed) {
      soundFx.playFanfare();
      onAwardPoints(score * 20 + 50);
    } else {
      soundFx.playIncorrect();
    }

    onCompleteQuiz(3, mastery.percentage, mastery.passed);
  };

  const handleRetryQuiz = () => {
    soundFx.playClick();
    setQuizAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(0);
    setQuizAttempt((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Level Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/40">
              <span>Level 3 Expedition</span>
              <span>•</span>
              <span>Animal Behavior & Zoology</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Driven to Survive: Animal Reproduction, Behavior & Growth
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              Investigate animal courtship displays, conduct virtual guppy mate-preference trials, witness extreme parental sacrifices, and simulate livestock growth bottlenecks.
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
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-amber-700/20 cursor-pointer"
            >
              <span>Take Level 3 Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-tab pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: 'infographic', label: '1. Infographic Explorer', icon: Layers },
            { id: 'modes', label: '2. Reproductive Strategies', icon: Heart },
            { id: 'courtship_guppy', label: '3. Courtship & Guppy Lab', icon: Activity },
            { id: 'parenting_innate', label: '4. Parenting & Instincts', icon: Shield },
            { id: 'livestock_lab', label: '5. Genetics vs. Environment', icon: Thermometer },
            { id: 'video_lesson', label: '6. 🎬 Lesson Video', icon: Play },
            { id: 'quiz', label: '7. Mastery Assessment', icon: Sparkles },
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
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
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
                <ZoomIn className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white">Interactive Zoology Infographic</h2>
              </div>
              <span className="text-[11px] text-slate-400">Click pulsing markers to investigate</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-stone-950 flex-1">
              <img
                src={ANIMAL_INFOGRAPHIC_URL}
                alt="Driven to Survive Infographic"
                className="w-full h-auto object-contain max-h-[750px] mx-auto select-none"
              />

              {ANIMAL_HOTSPOTS.map((spot) => {
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
                        ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-400/50 scale-110 z-20'
                        : 'bg-amber-500 text-white ring-2 ring-white/60 hover:bg-amber-400 z-10 animate-pulse'
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
            <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800/40">
                  ANIMAL ETHOLOGY • FIELD BRIEF
                </span>
                <span className="text-xs text-slate-500">ID: {selectedHotspot.id}</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedHotspot.title}
              </h3>

              <p className="text-xs text-amber-300 font-semibold leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-900/50">
                "{selectedHotspot.shortText}"
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Evolutionary Analysis
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {selectedHotspot.detail}
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Zoological Insight</span>
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
                    setActiveTab('courtship_guppy');
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Launch Guppy Lab</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
              <h4 className="text-xs font-bold text-slate-300 mb-3 px-2">
                All Field Observations ({ANIMAL_HOTSPOTS.length})
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {ANIMAL_HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedHotspot(spot);
                      onInspectHotspot();
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs transition border cursor-pointer ${
                      selectedHotspot.id === spot.id
                        ? 'bg-amber-950/70 border-amber-500 text-white font-bold'
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

      {/* SECTION 2: MODES OF REPRODUCTION & DUAL STRATEGIES */}
      {activeTab === 'modes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sexual Diversity */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-xl">
                🐺
              </div>
              <h3 className="text-lg font-bold text-white">Sexual Diversity</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Requires two parents. Offspring inherit a blend of maternal and paternal chromosomes, creating novel combinations that help animal populations adapt to changing climates and predators.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl text-[11px] text-slate-400">
                Examples: Wolves, deer, lions, and birds.
              </div>
            </div>

            {/* Asexual Colonization */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">
                🪸
              </div>
              <h3 className="text-lg font-bold text-white">Asexual Colonization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A single parent passes identical copies of its genes. Enables rapid population growth when mates are scarce or resources are temporarily abundant.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl text-[11px] text-slate-400">
                Examples: Hydra budding, freshwater planarian fission.
              </div>
            </div>

            {/* Aggregating Anemone Dual Strategy */}
            <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl">
                🌊
              </div>
              <h3 className="text-lg font-bold text-white">Dual Reproductive Strategy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Aggregating Sea Anemones:</strong> Clone themselves via longitudinal fission to carpet rocky tidepools, but also broadcast-spawn eggs and sperm into open water for genetic diversity and long-range ocean dispersal!
              </p>
              <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-[11px] text-cyan-200">
                Best of both worlds: Rapid local defense + broad evolutionary adaptability.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: COURTSHIP BEHAVIORS & GUPPY EXPERIMENT LAB */}
      {activeTab === 'courtship_guppy' && (
        <div className="space-y-6">
          {/* Courtship Showcase */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white">
              Courtship Signals & Demonstrations of Physical Fitness
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Courtship signals allow females to assess male genetic quality, vigor, and resource-provisioning ability.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {COURTSHIP_CASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCourtshipCase(c.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    selectedCourtshipCase === c.id
                      ? 'bg-amber-950 border-amber-400 text-white ring-2 ring-amber-400/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{c.icon}</div>
                  <div className="text-xs font-bold text-white truncate">{c.animal.split(' ')[0]}</div>
                  <div className="text-[10px] text-amber-400 uppercase font-bold">{c.behaviorType}</div>
                </button>
              ))}
            </div>

            {/* Selected case breakdown */}
            {(() => {
              const activeCase = COURTSHIP_CASES.find((c) => c.id === selectedCourtshipCase) || COURTSHIP_CASES[0];
              return (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {activeCase.animal}
                    </span>
                    <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">
                      Type: {activeCase.behaviorType.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{activeCase.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeCase.summary}</p>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                    <strong className="text-amber-300">Survival Benefit: </strong>
                    {activeCase.survivalBenefit}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* VIRTUAL GUPPY MATE-PREFERENCE EXPERIMENT */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-1">
                  <span>Controlled Behavioral Experiment</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Guppy Mate-Preference Virtual Laboratory
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Simulate controlled laboratory conditions testing female guppy choice across varying male tail sizes. Observe preferences and examine evolutionary trade-offs!
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[1, 2, 3].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => handleRunGuppyTrial(cond)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      selectedGuppyTrial === cond
                        ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Run Trial {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual Aquarium Stage */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-blue-950 via-cyan-950 to-slate-950 border border-cyan-700/50 p-6 min-h-[220px] flex items-center justify-around shadow-inner">
              {/* Swimming Guppy Animations */}
              <div className="text-center space-y-2">
                <div className={`text-4xl transition-all duration-700 ${tankSimulationActive ? 'animate-bounce' : ''}`}>
                  🐟
                </div>
                <div className="text-xs font-bold text-cyan-300">
                  {GUPPY_TRIALS[selectedGuppyTrial - 1].maleA}
                </div>
                <div className="text-sm font-black font-mono text-emerald-400">
                  {GUPPY_TRIALS[selectedGuppyTrial - 1].percentA}% Preferred
                </div>
              </div>

              <div className="text-center">
                <div className={`text-2xl transition-all duration-700 ${tankSimulationActive ? 'translate-x-3' : ''}`}>
                  🐠
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Female Guppy (Chooser)</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-3xl opacity-75 transition-all duration-700 ${tankSimulationActive ? 'animate-pulse' : ''}`}>
                  🐟
                </div>
                <div className="text-xs font-bold text-slate-300">
                  {GUPPY_TRIALS[selectedGuppyTrial - 1].maleB}
                </div>
                <div className="text-sm font-black font-mono text-slate-400">
                  {GUPPY_TRIALS[selectedGuppyTrial - 1].percentB}% Preferred
                </div>
              </div>
            </div>

            {/* Data Table Matching Infographic */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3">Experimental Trial</th>
                    <th className="p-3">Condition Comparison</th>
                    <th className="p-3">Female Preference Data</th>
                    <th className="p-3">Scientific Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {GUPPY_TRIALS.map((t) => (
                    <tr
                      key={t.condition}
                      className={`transition ${
                        selectedGuppyTrial === t.condition ? 'bg-cyan-950/40 font-semibold' : 'bg-slate-900/40'
                      }`}
                    >
                      <td className="p-3 text-white font-bold">{t.title.split(':')[0]}</td>
                      <td className="p-3 text-cyan-300">{t.maleA} vs {t.maleB}</td>
                      <td className="p-3 font-mono font-bold text-emerald-400">
                        {t.percentA}% vs {t.percentB}%
                      </td>
                      <td className="p-3 text-slate-300">{t.observation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Context Caveat Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <strong className="text-amber-300">Ecological Trade-Off Note: </strong>
              Do not mistake experimental lab results as an absolute rule for all wild guppies! In murky rivers with dense pike-cichlid predators, large-tailed males suffer dramatically higher predation mortality, favoring medium or smaller tails in high-risk zones.
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PARENTING TACTICS & INNATE BEHAVIORS */}
      {activeTab === 'parenting_innate' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parenting Tactics */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl">
                  🐧
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Parental Sacrifices & Distraction</h3>
                  <span className="text-xs text-blue-400 font-semibold">Extreme Survival Strategies</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-white">1. Emperor Penguin Marathon Fasting</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Male emperor penguins insulate a single egg on their feet under an abdominal brood pouch for up to 60-80 days without food in -40°C Antarctic blizzards.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-white">2. Octopus Maternal Dedication</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Female octopuses guard and aerate thousands of eggs in a den for months, never leaving to hunt, and perish from exhaustion as the young hatch.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-white">3. Killdeer "Broken-Wing" Distraction</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Adult killdeer birds feign an injury by dragging a "broken wing" on the ground to lure predators away from ground nests and chicks, risking their own lives.
                  </p>
                </div>
              </div>
            </div>

            {/* Innate Behaviors */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">
                  🐣
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Innate Behaviors in Offspring</h3>
                  <span className="text-xs text-emerald-400 font-semibold">Genetically Programmed Instincts</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-white">1. Gosling Imprinting</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Geese chicks imprint on the mother within hours of hatching, remaining bonded and closely following for protection and warmth.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-white">2. Begging Calls & Bright Gapes</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Baby songbirds instinctively stretch necks, emit loud begging vocalizations, and open brightly colored gapes to trigger feeding by parents.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-white">3. Antelope Freezing Reflex</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Young blackbuck antelopes freeze completely motionless in tall grass upon seeing a predator, using camouflage rather than running.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: GENETICS VS ENVIRONMENT IN LIVESTOCK GROWTH */}
      {activeTab === 'livestock_lab' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold mb-2">
                <span>Liebig\'s Law of the Minimum Simulator</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Genetics vs. Environment: Livestock Growth Simulator
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                Select Angus cattle genetics and adjust environmental variables. Observe how harsh weather, dehydration, poor feed, or parasites bottleneck growth potential!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                {/* Genetics selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider">
                    Inherited Cattle Genetics:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCattleGenetics('standard')}
                      className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        cattleGenetics === 'standard'
                          ? 'bg-amber-600 text-white border-amber-500'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      <div>Standard Angus</div>
                      <div className="text-[10px] text-amber-200 mt-0.5">Max: 500 kg</div>
                    </button>

                    <button
                      onClick={() => setCattleGenetics('high_yield')}
                      className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        cattleGenetics === 'high_yield'
                          ? 'bg-amber-600 text-white border-amber-500'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      <div>High-Yield Pedigree</div>
                      <div className="text-[10px] text-amber-200 mt-0.5">Max: 620 kg</div>
                    </button>
                  </div>
                </div>

                {/* Feed Quality Slider */}
                <div className="space-y-1 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Feed Quality (Nutrition)</span>
                    <span className="text-amber-400">{feedQuality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={feedQuality}
                    onChange={(e) => setFeedQuality(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Water Access Slider */}
                <div className="space-y-1 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Water Availability</span>
                    <span className="text-cyan-400">{waterAccess}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={waterAccess}
                    onChange={(e) => setWaterAccess(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                {/* Ambient Temperature Slider */}
                <div className="space-y-1 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Ambient Temperature</span>
                    <span className={temperatureC > 28 ? 'text-red-400' : 'text-emerald-400'}>
                      {temperatureC}°C {temperatureC > 28 ? '(Heat Stress)' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="45"
                    value={temperatureC}
                    onChange={(e) => setTemperatureC(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>

                {/* Disease & Parasite Control Slider */}
                <div className="space-y-1 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Disease & Parasite Protection</span>
                    <span className="text-emerald-400">{diseaseControl}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={diseaseControl}
                    onChange={(e) => setDiseaseControl(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* Simulation Result Box */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Growth Realization Output
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      livestockResult.limitingFactor === 'Optimal Conditions'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-red-950 text-red-300 border border-red-800'
                    }`}>
                      Bottleneck: {livestockResult.limitingFactor}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Actual Adult Mass</div>
                      <div className="text-3xl font-black font-mono text-white mt-1">
                        {livestockResult.actualWeightKg} <span className="text-sm font-normal text-slate-400">/ {livestockResult.maxPotentialKg} kg</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(livestockResult.actualWeightKg / livestockResult.maxPotentialKg) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Daily Milk Yield</div>
                      <div className="text-3xl font-black font-mono text-cyan-400 mt-1">
                        {livestockResult.milkYieldLiters} <span className="text-sm font-normal text-slate-400">Liters</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2">
                        Health Score: {livestockResult.healthPercent}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300">Core Grade 8 Science Takeaway: </strong>
                  Genetics sets the biological potential ceiling, but environmental factors dictate how much of that potential is realized. An animal with elite high-yield genetics produces no more than a standard animal if constrained by drought or heat stress!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: LESSON EXPLANATION VIDEO */}
      {activeTab === 'video_lesson' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1 border border-amber-500/40">
                <span>🎬 Video Explanation</span>
                <span>•</span>
                <span>Step 2 of Learning Flow</span>
              </div>
              <h3 className="text-xl font-bold text-white">Animal Reproduction, Courtship & Survival Strategies</h3>
              <p className="text-xs text-slate-300 mt-1">
                Watch this comprehensive guide to courtship rituals, internal vs. external fertilization, parental investment, and genetic vs. environmental growth limits.
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quiz');
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-amber-700/20 cursor-pointer"
            >
              <span>Proceed to Level 3 Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 16:9 YouTube Video Embed Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/JIddepDz-is?rel=0"
              title="Animal Reproduction - Lesson Explanation"
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
              href="https://www.youtube.com/watch?v=JIddepDz-is"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition font-medium border border-slate-700/80 cursor-pointer"
            >
              <span>Watch on YouTube ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* SECTION 7: COMPREHENSIVE LEVEL 3 QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1">
                <span>Comprehensive Animal Science Evaluation</span>
                <span>•</span>
                <span>Target: 80% (8/10)</span>
              </div>
              <h3 className="text-xl font-bold text-white">Level 3 Animal Behavior Mastery Quiz</h3>
            </div>

            {submittedQuiz && (
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-2xl text-xs font-bold border ${
                  quizScore >= 8
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                    : 'bg-red-950/80 border-red-500 text-red-300'
                }`}>
                  Score: {quizScore} / {LEVEL_3_QUIZ.length} ({Math.round((quizScore / LEVEL_3_QUIZ.length) * 100)}%)
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

          <div className="space-y-6">
            {LEVEL_3_QUIZ.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition ${
                    submittedQuiz
                      ? isCorrect
                        ? 'bg-amber-950/30 border-amber-500/50'
                        : 'bg-red-950/30 border-red-500/50'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Question {idx + 1}
                    </div>
                    {submittedQuiz && (
                      <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-amber-400' : 'text-red-400'}`}>
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
                          btnStyle = 'bg-amber-600 text-white border-amber-500 font-bold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-red-700 text-white border-red-600';
                        } else {
                          btnStyle = 'bg-slate-900/50 text-slate-500 border-slate-900';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-amber-600 text-white border-amber-500 font-bold';
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
                            <CheckCircle2 className="w-4 h-4 text-amber-200 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-amber-300">Scientific Explanation: </strong>
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
                disabled={Object.keys(quizAnswers).length < LEVEL_3_QUIZ.length}
                onClick={handleSubmitQuiz}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-amber-700/20 cursor-pointer"
              >
                Submit Answers ({Object.keys(quizAnswers).length} / {LEVEL_3_QUIZ.length})
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <h4 className="text-lg font-bold text-white">
                {quizScore >= 8 ? '🎉 Level 3 Mastery Achieved!' : '📚 Review Needed'}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                {evaluateMastery(quizScore, LEVEL_3_QUIZ.length).message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Lesson Video Modal */}
      <LessonVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Animal Reproduction, Courtship & Survival Strategies"
        topic="Animal Reproduction"
        videoId="JIddepDz-is"
        levelNumber={3}
        accentColor="amber"
        description="Comprehensive video breakdown covering specialized courtship behaviors (peafowl displays, guppy coloration), internal vs. external fertilization, parental sacrifice, and environmental bottlenecks on growth."
        keyTopics={[
          'Courtship Rituals & Sexual Selection (Peafowl displays & female mate choice)',
          'Fertilization Strategies: Internal vs. External aquatic spawning',
          'Parental Care Trade-offs: Few offspring with high care vs. millions with none',
          'Environmental vs. Genetic Limits on Organism Growth',
        ]}
        onGoToQuiz={() => setActiveTab('quiz')}
      />
    </div>
  );
};
