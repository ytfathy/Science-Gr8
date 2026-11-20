/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Info, 
  Layers, 
  ArrowRight,
  Eye,
  AlertTriangle,
  ZoomIn,
  RefreshCw,
  Sun,
  Droplets,
  Wind
} from 'lucide-react';
import { 
  PLANT_INFOGRAPHIC_URL, 
  PLANT_HOTSPOTS, 
  FLOWER_PARTS, 
  DISPERSAL_ITEMS, 
  LEVEL_1_QUIZ, 
  Hotspot 
} from '../../data/plantData.js';
import { evaluateGermination, verifyDispersalMatch, evaluateMastery } from '../../game/rules.js';
import { soundFx, shuffleArray } from '../../utils/audio.js';
import { LessonVideoModal } from '../LessonVideoModal.js';

interface PlantReproductionLevelProps {
  onAwardPoints: (pts: number) => void;
  onCompleteQuiz: (levelNum: number, score: number, passed: boolean) => void;
  onNarrate: (text: string) => void;
  onInspectHotspot: () => void;
  onSimulationComplete: () => void;
}

export const PlantReproductionLevel: React.FC<PlantReproductionLevelProps> = ({
  onAwardPoints,
  onCompleteQuiz,
  onNarrate,
  onInspectHotspot,
  onSimulationComplete,
}) => {
  // Navigation tabs within Level 1
  const [activeTab, setActiveTab] = useState<
    'infographic' | 'reproduction_types' | 'flower_model' | 'dispersal' | 'germination' | 'stress_adaptation' | 'video_lesson' | 'quiz'
  >('infographic');

  // Lesson explanation video modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Infographic hotspot inspector
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(PLANT_HOTSPOTS[0]);

  // Flower Model state
  const [selectedFlowerPart, setSelectedFlowerPart] = useState<string>('petal');
  const [pollinationStep, setPollinationStep] = useState<number>(0);
  const [isPollinating, setIsPollinating] = useState<boolean>(false);
  const [magnifyFlower, setMagnifyFlower] = useState<boolean>(false);

  // Dispersal sorting challenge state
  const [dispersalMatches, setDispersalMatches] = useState<Record<string, string>>({});
  const [dispersalFeedback, setDispersalFeedback] = useState<Record<string, boolean | null>>({});

  // Germination simulation state
  const [germWater, setGermWater] = useState<boolean>(true);
  const [germOxygen, setGermOxygen] = useState<boolean>(true);
  const [germTemp, setGermTemp] = useState<number>(22);
  const [germLight, setGermLight] = useState<boolean>(false);
  const [germSoil, setGermSoil] = useState<boolean>(true);

  // Environmental stress simulator state
  const [stressCondition, setStressCondition] = useState<'normal' | 'drought' | 'excess_rain' | 'extreme_temp' | 'depleted_soil'>('normal');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAttempt, setQuizAttempt] = useState<number>(1);
  const [shuffledOptions, setShuffledOptions] = useState<Record<string, { text: string; originalIndex: number }[]>>({});

  // Randomize answer choices per quiz attempt
  React.useEffect(() => {
    const map: Record<string, { text: string; originalIndex: number }[]> = {};
    LEVEL_1_QUIZ.forEach((q) => {
      if (q.options) {
        const items = q.options.map((text, idx) => ({ text, originalIndex: idx }));
        map[q.id] = shuffleArray(items);
      }
    });
    setShuffledOptions(map);
  }, [quizAttempt]);

  // Pollination step captions
  const pollinationSteps = [
    {
      title: 'Step 1: Flower Bud Opens',
      desc: 'Sepals peel back and petals expand, displaying vibrant colors and scent to signal pollinators.',
      narrate: 'Sepals peel back to reveal bright petals and expose the reproductive organs.'
    },
    {
      title: 'Step 2: Reproductive Organs Exposed',
      desc: 'Stamens elevate anthers laden with pollen; the central pistil elevates its receptive, sticky stigma.',
      narrate: 'The male anthers and female stigma are positioned for optimal pollinator interaction.'
    },
    {
      title: 'Step 3: Honeybee Forages for Nectar',
      desc: 'A foraging honeybee lands on the petals, guided by floral nectar guides invisible to the human eye.',
      narrate: 'A honeybee enters the blossom seeking sugary nectar at the base of the petals.'
    },
    {
      title: 'Step 4: Pollen Grains Cling to Bee',
      desc: 'Microscopic barbed pollen grains from the ripe anthers adhere electrostatically to the bee\'s fuzzy branched hairs.',
      narrate: 'Pollen grains from the anther attach securely to the bee\'s fuzzy coat.'
    },
    {
      title: 'Step 5: Transfer to Compatible Stigma',
      desc: 'The bee visits another flower; pollen brushes onto the sticky, sugary surface of the female stigma (cross-pollination).',
      narrate: 'The bee transfers pollen onto the sticky stigma of a compatible flower.'
    },
    {
      title: 'Step 6: Pollen Tube Germination & Fertilization',
      desc: 'The pollen grain hydrates, sprouts a pollen tube down through the style, and delivers sperm nuclei to fertilize the ovules inside the ovary.',
      narrate: 'The pollen tube digests through the style to fertilize an egg inside an ovule.'
    },
    {
      title: 'Step 7: Seed & Fruit Development',
      desc: 'Fertilized ovules develop tough seed coats and embryos; the surrounding ovary tissue swells into a protective, nutrient-rich fruit!',
      narrate: 'The ovule becomes a seed, and the ovary ripens into a fruit.'
    }
  ];

  const handleNextPollinationStep = () => {
    soundFx.playStep();
    const next = (pollinationStep + 1) % pollinationSteps.length;
    setPollinationStep(next);
    onNarrate(pollinationSteps[next].narrate);
    if (next === pollinationSteps.length - 1) {
      onSimulationComplete();
      onAwardPoints(15);
    }
  };

  const handleDispersalMatch = (itemId: string, vectorId: string) => {
    soundFx.playClick();
    const isCorrect = verifyDispersalMatch(itemId, vectorId);
    setDispersalMatches((prev) => ({ ...prev, [itemId]: vectorId }));
    setDispersalFeedback((prev) => ({ ...prev, [itemId]: isCorrect }));

    if (isCorrect) {
      soundFx.playCorrect();
      onAwardPoints(10);
    } else {
      soundFx.playIncorrect();
    }
  };

  const germinationResult = evaluateGermination(
    germWater,
    germOxygen,
    germTemp,
    germLight,
    germSoil
  );

  const handleQuizAnswer = (qId: string, optIndex: number) => {
    if (submittedQuiz) return;
    soundFx.playClick();
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    soundFx.playClick();
    let score = 0;
    LEVEL_1_QUIZ.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    setQuizScore(score);
    setSubmittedQuiz(true);
    const mastery = evaluateMastery(score, LEVEL_1_QUIZ.length);

    if (mastery.passed) {
      soundFx.playFanfare();
      onAwardPoints(score * 20 + 50);
    } else {
      soundFx.playIncorrect();
    }

    onCompleteQuiz(1, mastery.percentage, mastery.passed);
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
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/40">
              <span>Level 1 Expedition</span>
              <span>•</span>
              <span>Botanical Science</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Plant Reproduction, Dispersal & Survival
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              Explore floral anatomy, observe bee-driven cross-pollination, test seed dispersal adaptations, and simulate germination under environmental stresses.
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
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-700/20 cursor-pointer"
            >
              <span>Take Level 1 Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Level Sub-navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: 'infographic', label: '1. Infographic Explorer', icon: Layers },
            { id: 'reproduction_types', label: '2. Sexual vs. Asexual', icon: Info },
            { id: 'flower_model', label: '3. Flower Model & Pollination', icon: Eye },
            { id: 'dispersal', label: '4. Seed Dispersal Lab', icon: Wind },
            { id: 'germination', label: '5. Germination Simulator', icon: Droplets },
            { id: 'stress_adaptation', label: '6. Environmental Stress', icon: Sun },
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
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
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
          {/* Infographic Viewer with Hotspots */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Interactive Botanical Infographic</h2>
              </div>
              <span className="text-[11px] text-slate-400">Click any pulsing marker to inspect</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-stone-950 flex-1">
              <img
                src={PLANT_INFOGRAPHIC_URL}
                alt="Botanical Guide to Plant Reproduction Infographic"
                className="w-full h-auto object-contain max-h-[750px] mx-auto select-none"
              />

              {/* Pulsing Hotspots overlay */}
              {PLANT_HOTSPOTS.map((spot) => {
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
                        : 'bg-emerald-500 text-white ring-2 ring-white/60 hover:bg-emerald-400 z-10 animate-pulse'
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

          {/* Hotspot Scientific Inspector Drawer */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/40">
                  {selectedHotspot.category.toUpperCase()} • FIELD DATA
                </span>
                <span className="text-xs text-slate-500">ID: {selectedHotspot.id}</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedHotspot.title}
              </h3>

              <p className="text-xs text-emerald-300 font-semibold leading-relaxed bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/50">
                "{selectedHotspot.shortText}"
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Detailed Scientific Analysis
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {selectedHotspot.detail}
                </p>
              </div>

              {/* Scientific Fact Callout */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Botanical Principle</span>
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
                    setActiveTab('flower_model');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Explore Flower Model</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Hotspot Directory List */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
              <h4 className="text-xs font-bold text-slate-300 mb-3 px-2">
                All Guide Highlights ({PLANT_HOTSPOTS.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PLANT_HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedHotspot(spot);
                      onInspectHotspot();
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs transition border cursor-pointer ${
                      selectedHotspot.id === spot.id
                        ? 'bg-emerald-950/70 border-emerald-500 text-white font-bold'
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

      {/* SECTION 2: SEXUAL VS ASEXUAL REPRODUCTION */}
      {activeTab === 'reproduction_types' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sexual Reproduction Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-xl">
                  🌸
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sexual Reproduction in Plants</h3>
                  <span className="text-xs text-pink-400 font-semibold">2 Parents • High Genetic Diversity</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Pollen grains from one plant fertilize the ovules of another. The resulting seeds carry a 50/50 blend of genetic material, creating unique offspring with diverse traits.
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Advantage:</span>
                  <span className="text-emerald-400">Survival in changing environments</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If a novel bacterial blight or severe drought strikes, genetic diversity ensures that certain individuals carry resistant alleles, preventing extinction of the whole population.
                </p>
                <div className="text-xs font-bold text-white flex items-center gap-2 pt-2 border-t border-slate-800">
                  <span>Seeds vs. Spores:</span>
                  <span className="text-cyan-400">Embryo in protective shell</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Seed plants package the embryo with a rich food supply (cotyledon/endosperm) in a resilient seed coat, shielding it from desiccation.
                </p>
              </div>
            </div>

            {/* Asexual Reproduction Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">
                  🥔
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Asexual Reproduction & Cloning</h3>
                  <span className="text-xs text-emerald-400 font-semibold">1 Parent • Exact Genetic Clones</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Vegetative propagation creates new individuals directly from stems, roots, or leaves without flowers, pollination, or fertilization. All daughter plants are genetic clones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg mb-1">🥔</div>
                  <div className="text-xs font-bold text-white">Potato Tubers</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Underground stem tubers develop "eyes" (auxiliary buds) that sprout identical plants.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg mb-1">🪴</div>
                  <div className="text-xs font-bold text-white">Spider Plant</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Produces horizontal runners (stolons) with miniature plantlets that take root.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg mb-1">🌲</div>
                  <div className="text-xs font-bold text-white">Aspen Roots</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Extensive root suckers sprout thousands of cloned trees sharing one root network (Pando).
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-200">
                <span className="font-bold">Trade-Off:</span> Asexual cloning is rapid and energetically inexpensive in stable conditions, but leaving the whole clone army vulnerable to a single virulent pathogen.
              </div>
            </div>
          </div>

          {/* Fern Spores Deep-Dive */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold">
                <span>Seedless Plants</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Fern Spores & The Moisture Requirement
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ferns do not produce seeds or flowers. Instead, clusters of sporangia on the underside of fronds release microscopic single-celled spores. To achieve fertilization, the tiny gametophyte requires a continuous film of liquid water so its flagellated sperm can swim to the egg!
              </p>
            </div>
            <div className="w-full md:w-auto p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center min-w-[200px]">
              <div className="text-3xl mb-1">💧🌿</div>
              <div className="text-xs font-bold text-emerald-400">Moisture Dependent</div>
              <div className="text-[11px] text-slate-400 mt-1">Cannot fertilize in arid deserts</div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DETAILED INTERACTIVE FLOWER MODEL & POLLINATION SEQUENCE */}
      {activeTab === 'flower_model' && (
        <div className="space-y-6">
          {/* Animated 7-step Pollination Sequencer */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Step-by-Step Animated Process
                </span>
                <h3 className="text-xl font-bold text-white">
                  {pollinationSteps[pollinationStep].title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setPollinationStep(0);
                    onNarrate(pollinationSteps[0].narrate);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  title="Reset to Step 1"
                  aria-label="Reset pollination sequence"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPollinationStep}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md shadow-emerald-700/20 cursor-pointer"
                >
                  <span>Next Step ({pollinationStep + 1} / {pollinationSteps.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step progress pills */}
            <div className="grid grid-cols-7 gap-1.5 pt-2">
              {pollinationSteps.map((st, i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundFx.playStep();
                    setPollinationStep(i);
                    onNarrate(st.narrate);
                  }}
                  className={`h-2 rounded-full transition cursor-pointer ${
                    i === pollinationStep
                      ? 'bg-emerald-400 ring-2 ring-emerald-400/40'
                      : i < pollinationStep
                      ? 'bg-emerald-700'
                      : 'bg-slate-800'
                  }`}
                  title={st.title}
                  aria-label={`Jump to ${st.title}`}
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 leading-relaxed font-medium">
              {pollinationSteps[pollinationStep].desc}
            </p>
          </div>

          {/* Interactive Flower Anatomy SVG Model */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Interactive Flower Model</h3>
                  <p className="text-xs text-slate-400">Click any organ or label to inspect anatomy and function</p>
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setMagnifyFlower(!magnifyFlower);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
                    magnifyFlower
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{magnifyFlower ? 'Standard View' : 'Magnified Cutaway'}</span>
                </button>
              </div>

              {/* Bespoke Interactive Flower SVG */}
              <div className="relative w-full max-w-md aspect-square bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 500 500"
                  className={`w-full h-full transition-transform duration-500 ${
                    magnifyFlower ? 'scale-125 translate-y-4' : 'scale-100'
                  }`}
                >
                  <defs>
                    <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FB7185" />
                      <stop offset="100%" stopColor="#E11D48" />
                    </linearGradient>
                    <linearGradient id="pistilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C084FC" />
                      <stop offset="100%" stopColor="#7E22CE" />
                    </linearGradient>
                    <linearGradient id="stamenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>

                  {/* Stem / Pedicel */}
                  <g 
                    onClick={() => { soundFx.playClick(); setSelectedFlowerPart('pedicel'); }}
                    className="cursor-pointer group"
                  >
                    <rect x="242" y="380" width="16" height="90" rx="6" fill={selectedFlowerPart === 'pedicel' ? '#84CC16' : '#4D7C0F'} />
                  </g>

                  {/* Receptacle */}
                  <g 
                    onClick={() => { soundFx.playClick(); setSelectedFlowerPart('receptacle'); }}
                    className="cursor-pointer group"
                  >
                    <ellipse cx="250" cy="380" rx="36" ry="18" fill={selectedFlowerPart === 'receptacle' ? '#A3E635' : '#65A30D'} />
                  </g>

                  {/* Sepals */}
                  <g 
                    onClick={() => { soundFx.playClick(); setSelectedFlowerPart('sepal'); }}
                    className="cursor-pointer group"
                  >
                    <path d="M 215 375 Q 170 385 155 350 Q 185 365 220 375 Z" fill={selectedFlowerPart === 'sepal' ? '#4ADE80' : '#16A34A'} />
                    <path d="M 285 375 Q 330 385 345 350 Q 315 365 280 375 Z" fill={selectedFlowerPart === 'sepal' ? '#4ADE80' : '#16A34A'} />
                  </g>

                  {/* Petals (Left and Right wings) */}
                  <g 
                    onClick={() => { soundFx.playClick(); setSelectedFlowerPart('petal'); }}
                    className="cursor-pointer group transition hover:opacity-95"
                  >
                    <path d="M 220 365 C 130 320 80 200 110 140 C 160 140 210 240 230 350 Z" fill="url(#petalGrad)" opacity={selectedFlowerPart === 'petal' ? 1 : 0.85} stroke={selectedFlowerPart === 'petal' ? '#FFE4E6' : 'none'} strokeWidth="3" />
                    <path d="M 280 365 C 370 320 420 200 390 140 C 340 140 290 240 270 350 Z" fill="url(#petalGrad)" opacity={selectedFlowerPart === 'petal' ? 1 : 0.85} stroke={selectedFlowerPart === 'petal' ? '#FFE4E6' : 'none'} strokeWidth="3" />
                    <path d="M 250 360 C 200 240 170 120 250 80 C 330 120 300 240 250 360 Z" fill="#F43F5E" opacity={selectedFlowerPart === 'petal' ? 1 : 0.9} stroke={selectedFlowerPart === 'petal' ? '#FFE4E6' : 'none'} strokeWidth="3" />
                  </g>

                  {/* Left Stamen (Filament + Anther) */}
                  <g 
                    onClick={() => { soundFx.playClick(); setSelectedFlowerPart('anther'); }}
                    className="cursor-pointer"
                  >
                    <path d="M 230 360 Q 185 280 180 190" stroke="#FBBF24" strokeWidth="4" fill="none" />
                    <ellipse cx="180" cy="180" rx="14" ry="9" fill={selectedFlowerPart === 'anther' ? '#FEF08A' : '#F59E0B'} stroke="#78350F" strokeWidth="1.5" />
                  </g>

                  {/* Right Stamen (Filament + Anther) */}
                  <g 
                    onClick={() => { soundFx.playClick(); setSelectedFlowerPart('anther'); }}
                    className="cursor-pointer"
                  >
                    <path d="M 270 360 Q 315 280 320 190" stroke="#FBBF24" strokeWidth="4" fill="none" />
                    <ellipse cx="320" cy="180" rx="14" ry="9" fill={selectedFlowerPart === 'anther' ? '#FEF08A' : '#F59E0B'} stroke="#78350F" strokeWidth="1.5" />
                  </g>

                  {/* Center Pistil: Ovary, Style, Stigma */}
                  <g 
                    onClick={() => { soundFx.playClick(); setSelectedFlowerPart('stigma'); }}
                    className="cursor-pointer"
                  >
                    {/* Ovary swollen chamber */}
                    <ellipse cx="250" cy="340" rx="30" ry="34" fill={selectedFlowerPart === 'ovary' ? '#C084FC' : '#9333EA'} stroke="#581C87" strokeWidth="2" />

                    {/* Ovules inside ovary */}
                    <circle cx="242" cy="335" r="5" fill="#FAF5FF" stroke="#7E22CE" strokeWidth="1.5" />
                    <circle cx="258" cy="335" r="5" fill="#FAF5FF" stroke="#7E22CE" strokeWidth="1.5" />
                    <circle cx="250" cy="350" r="5" fill="#FAF5FF" stroke="#7E22CE" strokeWidth="1.5" />

                    {/* Style neck */}
                    <rect x="245" y="190" width="10" height="120" rx="4" fill={selectedFlowerPart === 'style' ? '#E9D5FF' : '#A855F7'} />

                    {/* Stigma landing pad */}
                    <ellipse cx="250" cy="185" rx="18" ry="10" fill={selectedFlowerPart === 'stigma' ? '#F3E8FF' : '#7E22CE'} stroke="#3B0764" strokeWidth="2" />
                  </g>

                  {/* Pollination Animation Visual (Honeybee) */}
                  {pollinationStep >= 2 && pollinationStep <= 4 && (
                    <g className="transition-all duration-700 animate-bounce" transform="translate(280, 150)">
                      <ellipse cx="0" cy="0" rx="14" ry="9" fill="#EAB308" stroke="#000" strokeWidth="2" />
                      <line x1="-5" y1="-9" x2="-5" y2="9" stroke="#000" strokeWidth="3" />
                      <line x1="3" y1="-9" x2="3" y2="9" stroke="#000" strokeWidth="3" />
                      <ellipse cx="-4" cy="-10" rx="8" ry="5" fill="#E0F2FE" opacity="0.8" />
                      <circle cx="12" cy="-2" r="2" fill="#000" />
                    </g>
                  )}

                  {/* Pollen Tube Animation on Step 5-6 */}
                  {pollinationStep >= 5 && (
                    <path
                      d="M 250 185 L 250 330"
                      stroke="#FACC15"
                      strokeWidth="3"
                      strokeDasharray="4 2"
                      className="animate-pulse"
                    />
                  )}
                </svg>
              </div>

              {/* Part selector chips */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                {FLOWER_PARTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedFlowerPart(p.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border cursor-pointer ${
                      selectedFlowerPart === p.id
                        ? 'bg-white text-slate-950 border-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Flower Part Details Drawer */}
            <div className="lg:col-span-5 space-y-4">
              {(() => {
                const part = FLOWER_PARTS.find((p) => p.id === selectedFlowerPart) || FLOWER_PARTS[0];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/40">
                        {part.system}
                      </span>
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: part.color }} />
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {part.name}
                    </h3>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Biological Function
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        {part.function}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 text-xs">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Microscopic & Anatomical Insight</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {part.magnifiedInfo}
                      </p>
                    </div>

                    {/* Scientific Accuracy Box: Stamen vs Pistil */}
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-200 leading-snug">
                      <span className="font-bold">Botanical Rule:</span> Always distinguish the complete stamen (anther + filament) from pollen grains. Never label the entire male structure as "pollen"!
                    </div>
                  </div>
                );
              })()}

              {/* Honeybee Pollinator Economics Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🐝</span>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Pollinator Economics: $15 Billion / Year
                    </h4>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    USDA Data
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In the United States, bee cross-pollination adds over $15 billion annually in harvest value. Crops relying directly on honeybees include apples, almonds, blueberries, and cucumbers.
                </p>
                <div className="text-[11px] text-red-300 bg-red-950/40 p-2.5 rounded-xl border border-red-900/40 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Colony Collapse Stressors:</strong> Varroa mite parasites, bacterial pathogens (foulbrood), habitat destruction, harsh weather, and queen loss.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SEED & SPORE DISPERSAL LAB */}
      {activeTab === 'dispersal' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">Seed & Spore Dispersal Vector Sorter</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Match each botanical seed or spore to its evolutionary dispersal mechanism. Dispersal reduces sibling competition and colonizes new habitats.
                </p>
              </div>
              <div className="text-xs text-emerald-300 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/50">
                Matches: {Object.values(dispersalFeedback).filter(Boolean).length} / {DISPERSAL_ITEMS.length} Correct
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {DISPERSAL_ITEMS.map((item) => {
                const currentMatch = dispersalMatches[item.id];
                const feedback = dispersalFeedback[item.id];

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl bg-slate-950 border transition ${
                      feedback === true
                        ? 'border-emerald-500 bg-emerald-950/20'
                        : feedback === false
                        ? 'border-red-500/80 bg-red-950/20'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{item.name}</span>
                      <span className="text-[10px] text-amber-400 font-mono">{item.imageHint}</span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Vector selection buttons */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Select Vector:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'wind', label: 'Wind / Air' },
                          { id: 'water', label: 'Water Float' },
                          { id: 'animal_ingestion', label: 'Ingestion' },
                          { id: 'animal_hitchhiking', label: 'Hitchhiking' },
                          { id: 'animal_cache', label: 'Animal Cache' },
                          { id: 'water_moisture', label: 'Moist Soil Spore' },
                        ].map((vec) => (
                          <button
                            key={vec.id}
                            onClick={() => handleDispersalMatch(item.id, vec.id)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition border cursor-pointer ${
                              currentMatch === vec.id
                                ? feedback === true
                                  ? 'bg-emerald-600 text-white border-emerald-500'
                                  : 'bg-red-700 text-white border-red-600'
                                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                            }`}
                          >
                            {vec.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {feedback === true && (
                      <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correct! {item.vectorLabel}</span>
                      </div>
                    )}
                    {feedback === false && (
                      <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1 font-semibold">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Incorrect vector. Review its adaptations!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: GERMINATION VS. GROWTH SIMULATOR */}
      {activeTab === 'germination' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-2">
                <span>Grade 8 Science Distinction</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Germination vs. Seedling Growth Simulator
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                Adjust environmental variables to observe seed response. Notice the crucial scientific difference: <strong>Germination</strong> only requires water, oxygen, and temperature; <strong>continued growth</strong> requires light and soil minerals!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Environmental Variables
                </h4>

                {/* Water Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Water Availability</div>
                      <div className="text-[10px] text-slate-400">Triggers imbibition and activates enzymes</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setGermWater(!germWater);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      germWater ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {germWater ? 'Present' : 'Dry'}
                  </button>
                </div>

                {/* Oxygen Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Oxygen (Aeration)</div>
                      <div className="text-[10px] text-slate-400">Required for cellular respiration</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setGermOxygen(!germOxygen);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      germOxygen ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {germOxygen ? 'Present' : 'Depleted'}
                  </button>
                </div>

                {/* Temperature Slider */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Temperature: {germTemp}°C</span>
                    <span className="text-[10px] text-amber-400">
                      {germTemp < 5 ? 'Freezing' : germTemp > 45 ? 'Extreme Heat' : 'Optimal'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={germTemp}
                    onChange={(e) => setGermTemp(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0°C</span>
                    <span>22°C (Room)</span>
                    <span>50°C</span>
                  </div>
                </div>

                {/* Light Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Sunlight (Photosynthesis)</div>
                      <div className="text-[10px] text-slate-400">Needed for sustained leaf growth</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setGermLight(!germLight);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      germLight ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {germLight ? 'Sunlight On' : 'Darkness (Soil)'}
                  </button>
                </div>

                {/* Soil Nutrients Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🧪</span>
                    <div>
                      <div className="text-xs font-bold text-white">Soil Minerals (N, P, K)</div>
                      <div className="text-[10px] text-slate-400">Needed for cell growth & chlorophyll</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setGermSoil(!germSoil);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      germSoil ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {germSoil ? 'Rich Soil' : 'Depleted'}
                  </button>
                </div>
              </div>

              {/* Seed Visualization & Simulation Stage */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Biological Stage:
                  </span>
                  <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                    germinationResult.stage === 'growing_seedling'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : germinationResult.stage === 'sprouted'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : germinationResult.stage === 'swollen'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {germinationResult.stage.replace('_', ' ')}
                  </span>
                </div>

                {/* Visual SVG Stage */}
                <div className="my-6 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center relative overflow-hidden shadow-inner">
                    {/* Soil Horizon */}
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-amber-950/80 border-t border-amber-800/40" />

                    {/* Seed Stage Graphic */}
                    {germinationResult.stage === 'dormant' && (
                      <div className="w-10 h-14 rounded-full bg-amber-700 border-2 border-amber-900 z-10 flex items-center justify-center text-xs font-bold text-amber-200">
                        Seed
                      </div>
                    )}

                    {germinationResult.stage === 'swollen' && (
                      <div className="w-14 h-18 rounded-full bg-amber-600 border-2 border-amber-800 z-10 flex items-center justify-center text-xs font-bold text-amber-100 shadow-md animate-pulse">
                        Swollen
                      </div>
                    )}

                    {germinationResult.stage === 'sprouted' && (
                      <div className="z-10 flex flex-col items-center">
                        <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                        <div className="w-12 h-14 rounded-full bg-amber-600 border border-amber-800" />
                        <div className="w-1.5 h-10 bg-amber-200 rounded-full" />
                      </div>
                    )}

                    {germinationResult.stage === 'growing_seedling' && (
                      <div className="z-10 flex flex-col items-center animate-in zoom-in-75 duration-500">
                        {/* Leaves */}
                        <div className="flex gap-2 -mb-2">
                          <div className="w-7 h-4 bg-emerald-400 rounded-full transform -rotate-45 shadow-sm" />
                          <div className="w-7 h-4 bg-emerald-400 rounded-full transform rotate-45 shadow-sm" />
                        </div>
                        {/* Stem */}
                        <div className="w-3 h-16 bg-emerald-600 rounded-full" />
                        {/* Cotyledon remnant */}
                        <div className="w-8 h-8 rounded-full bg-amber-700 border border-amber-800 -my-1" />
                        {/* Root system */}
                        <div className="w-2 h-14 bg-amber-200 rounded-full flex flex-col items-center">
                          <div className="w-10 h-0.5 bg-amber-300 mt-3" />
                          <div className="w-8 h-0.5 bg-amber-300 mt-3" />
                        </div>
                      </div>
                    )}

                    {germinationResult.stage === 'failed' && (
                      <div className="w-10 h-10 rounded-full bg-stone-700 border border-stone-800 z-10 flex items-center justify-center text-lg">
                        💀
                      </div>
                    )}
                  </div>
                </div>

                {/* Explanation text */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs leading-relaxed text-slate-200">
                  <span className="font-bold text-emerald-400">Result Analysis: </span>
                  {germinationResult.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: ENVIRONMENTAL STRESS & ADAPTATIONS */}
      {activeTab === 'stress_adaptation' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white">
              Environmental Stress & Botanical Adaptations
            </h3>
            <p className="text-xs text-slate-300">
              Observe how distinct plant species adapt to environmental fluctuations or suffer disruption in their life cycles.
            </p>

            {/* Condition selector pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {[
                { id: 'normal', label: 'Balanced Habitat' },
                { id: 'drought', label: 'Severe Drought' },
                { id: 'excess_rain', label: 'Flooding / Saturated' },
                { id: 'extreme_temp', label: 'Temperature Extremes' },
                { id: 'depleted_soil', label: 'Depleted Rocky Soil' },
              ].map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => {
                    soundFx.playClick();
                    setStressCondition(cond.id as typeof stressCondition);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    stressCondition === cond.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>

            {/* 3 Organism Response Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
              {/* Fern */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <div className="text-xs font-bold text-white">Forest Fern</div>
                    <div className="text-[10px] text-emerald-400">Shade & Moisture Specialist</div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stressCondition === 'drought'
                    ? 'Fronds desiccate and flagellated sperm cannot swim; fertilization is halted.'
                    : stressCondition === 'excess_rain'
                    ? 'Thrives! Saturated film permits vigorous sperm motility across gametophytes.'
                    : 'Grows steadily under the shaded canopy with moderate moisture.'}
                </p>
              </div>

              {/* Cactus */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌵</span>
                  <div>
                    <div className="text-xs font-bold text-white">Desert Saguaro Cactus</div>
                    <div className="text-[10px] text-amber-400">Xerophyte / Water Storage</div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stressCondition === 'drought'
                    ? 'Accordion pleats expand and contract; waxy cuticle and spines prevent water loss.'
                    : stressCondition === 'excess_rain'
                    ? 'Risk of root rot if soil remains waterlogged without drainage.'
                    : 'Stores thousands of liters of water in succulent stems; flowers bloom at night.'}
                </p>
              </div>

              {/* Dandelion */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌼</span>
                  <div>
                    <div className="text-xs font-bold text-white">Common Dandelion</div>
                    <div className="text-[10px] text-yellow-400">Extreme Environmental Generalist</div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stressCondition === 'depleted_soil'
                    ? 'Deep taproot penetrates compacted soil to access deep minerals; still produces hundreds of parachute seeds!'
                    : stressCondition === 'extreme_temp'
                    ? 'Tolerates sub-zero frosts and scorching summer pavements with ease.'
                    : 'Rapid life cycle from yellow blossom to windborne white seed globe in days.'}
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1 border border-emerald-500/40">
                <span>🎬 Video Explanation</span>
                <span>•</span>
                <span>Step 2 of Learning Flow</span>
              </div>
              <h3 className="text-xl font-bold text-white">Plant Reproduction, Floral Anatomy & Dispersal</h3>
              <p className="text-xs text-slate-300 mt-1">
                Watch this audio-visual breakdown of floral structures, cross-pollination dynamics, and seed transport adaptations before taking the quiz.
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quiz');
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-700/20 cursor-pointer"
            >
              <span>Proceed to Level 1 Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 16:9 YouTube Video Embed Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/6yGLtYDc43s?rel=0"
              title="Plant Reproduction - Lesson Explanation"
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
              href="https://www.youtube.com/watch?v=6yGLtYDc43s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition font-medium border border-slate-700/80 cursor-pointer"
            >
              <span>Watch on YouTube ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* SECTION 8: COMPREHENSIVE LEVEL 1 QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1">
                <span>Comprehensive Evaluation</span>
                <span>•</span>
                <span>Target: 80% (8/10)</span>
              </div>
              <h3 className="text-xl font-bold text-white">Level 1 Science Mastery Quiz</h3>
            </div>

            {submittedQuiz && (
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-2xl text-xs font-bold border ${
                  quizScore >= 8
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : 'bg-red-950/80 border-red-500 text-red-300'
                }`}>
                  Score: {quizScore} / {LEVEL_1_QUIZ.length} ({Math.round((quizScore / LEVEL_1_QUIZ.length) * 100)}%)
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
            {LEVEL_1_QUIZ.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition ${
                    submittedQuiz
                      ? isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/50'
                        : 'bg-red-950/30 border-red-500/50'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Question {idx + 1}
                    </div>
                    {submittedQuiz && (
                      <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span>{isCorrect ? 'Correct' : 'Needs Review'}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white mb-4 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2">
                    {(shuffledOptions[q.id] || q.options?.map((text, idx) => ({ text, originalIndex: idx })) || []).map((optObj, optIdx) => {
                      const isOptionSelected = selectedOpt === optObj.originalIndex;
                      const isOptionCorrect = q.correctAnswer === optObj.originalIndex;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                      if (submittedQuiz) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-red-700 text-white border-red-600';
                        } else {
                          btnStyle = 'bg-slate-900/50 text-slate-500 border-slate-900';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
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
                            <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback explanation upon submission */}
                  {submittedQuiz && (
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-emerald-300">Scientific Explanation: </strong>
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

          {/* Submit Action */}
          {!submittedQuiz ? (
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Answer all questions, then submit for instant scoring and mastery evaluation.
              </span>
              <button
                disabled={Object.keys(quizAnswers).length < LEVEL_1_QUIZ.length}
                onClick={handleSubmitQuiz}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                Submit Answers ({Object.keys(quizAnswers).length} / {LEVEL_1_QUIZ.length})
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <h4 className="text-lg font-bold text-white">
                {quizScore >= 8 ? '🎉 Level 1 Mastery Achieved!' : '📚 Review Needed'}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                {evaluateMastery(quizScore, LEVEL_1_QUIZ.length).message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Lesson Video Modal */}
      <LessonVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Plant Reproduction, Floral Anatomy & Dispersal"
        topic="Plant Reproduction"
        videoId="6yGLtYDc43s"
        levelNumber={1}
        accentColor="emerald"
        description="Comprehensive video breakdown covering flower anatomy (pistil vs stamen), insect pollination vectors, seed dispersal adaptations, and environmental factors controlling germination."
        keyTopics={[
          'Flower Anatomy: Pistil (Female) & Stamen (Male)',
          'Self-Pollination vs. Cross-Pollination Vectors',
          'Seed Dispersal Adaptations (Wind, Water, Animal, Explosion)',
          'Environmental Triggers for Germination (Moisture, Temp, O₂)',
        ]}
        onGoToQuiz={() => setActiveTab('quiz')}
      />
    </div>
  );
};
