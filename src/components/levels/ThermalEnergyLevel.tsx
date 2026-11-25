/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Quarter 2 — Level 3: Thermal Energy, Reaction Rates & Chemical Engineering
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Flame,
  Snowflake,
  Gauge,
  Wrench,
  Play,
  ArrowRight,
  RotateCcw,
  Thermometer,
  AlertTriangle,
  ShieldCheck,
  NotebookPen,
} from 'lucide-react';
import {
  Q2_LEVEL_3_QUIZ,
  COLD_PACK_PAIRS,
} from '../../data/chemistryData.js';
import {
  simulateReactionRate,
  evaluateTurtleEggWarmer,
  TurtleWarmerOptionId,
} from '../../game/chemistryRules.js';
import { evaluateMastery } from '../../game/rules.js';
import { soundFx, shuffleArray } from '../../utils/audio.js';
import { LessonVideoModal } from '../LessonVideoModal.js';
import { Lesson3DExplainer } from '../Lesson3DExplainerLazy.js';
import { Q2SummaryInfographic } from '../Q2SummaryInfographic.js';
import { LessonHeader } from '../LessonHeader.js';

interface ThermalEnergyLevelProps {
  onAwardPoints: (pts: number) => void;
  onCompleteQuiz: (levelNum: number, score: number, passed: boolean) => void;
  onNarrate: (text: string) => void;
  onSimulationComplete: () => void;
}

export const ThermalEnergyLevel: React.FC<ThermalEnergyLevelProps> = ({
  onAwardPoints,
  onCompleteQuiz,
  onNarrate,
  onSimulationComplete,
}) => {
  const [activeTab, setActiveTab] = useState<
    'heat_transfer' | 'cold_pack' | 'rate_lab' | 'turtle_engineering' | 'summary' | 'quiz'
  >('heat_transfer');

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Heat transfer interactive focus
  const [selectedTransfer, setSelectedTransfer] = useState<'conduction' | 'convection' | 'radiation'>('conduction');

  // Cold pack lab (Reaction to the Rescue — 4 pairs)
  const [testedPairs, setTestedPairs] = useState<Record<string, boolean>>({});
  const [selectedColdPackChoice, setSelectedColdPackChoice] = useState<string | null>(null);
  const [coldPackAwarded, setColdPackAwarded] = useState(false);

  const handleTestPair = (pairId: string) => {
    soundFx.playClick();
    const pair = COLD_PACK_PAIRS.find((p) => p.id === pairId);
    setTestedPairs((prev) => ({ ...prev, [pairId]: true }));
    if (pair) {
      onNarrate(
        `${pair.label}: temperature shifted from ${pair.tempStartC} to ${pair.tempEndC} degrees Celsius. ${pair.observation}`
      );
    }
  };

  const handleSelectColdPackWinner = (pairId: string) => {
    soundFx.playClick();
    setSelectedColdPackChoice(pairId);
    if (pairId === 'pair4') {
      soundFx.playCorrect();
      if (!coldPackAwarded) {
        setColdPackAwarded(true);
        onAwardPoints(25);
        onSimulationComplete();
      }
      onNarrate(
        'Correct! Water plus ammonium chloride strongly absorbs heat without producing dangerous carbon dioxide gas pressure.'
      );
    } else {
      soundFx.playIncorrect();
      const pair = COLD_PACK_PAIRS.find((p) => p.id === pairId);
      if (pair) onNarrate(pair.observation);
    }
  };

  // Reaction Rate Lab (PDF tablet data: 18°C=71s, 34°C=31.5s, 68°C=21s)
  const [tempC, setTempC] = useState<number>(34);
  const [surfaceArea, setSurfaceArea] = useState<'whole' | 'crushed'>('whole');
  const [concentration, setConcentration] = useState<'low' | 'medium' | 'high'>('medium');
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [rateExperimentLogged, setRateExperimentLogged] = useState(false);

  const rateResult = simulateReactionRate({
    temperatureC: tempC,
    surfaceArea,
    concentration,
    hasCatalyst,
  });

  // Turtle Egg Warmer Engineering Performance Task
  const [selectedWarmer, setSelectedWarmer] = useState<TurtleWarmerOptionId>('iron_powder_salt');
  const [submittedWarmer, setSubmittedWarmer] = useState<TurtleWarmerOptionId | null>(null);
  const [warmerAwarded, setWarmerAwarded] = useState(false);
  const activeWarmerEval = evaluateTurtleEggWarmer(selectedWarmer);

  const handleConfirmWarmer = () => {
    soundFx.playClick();
    setSubmittedWarmer(selectedWarmer);
    if (activeWarmerEval.meetsCriteria) {
      soundFx.playCorrect();
      if (!warmerAwarded) {
        setWarmerAwarded(true);
        onAwardPoints(30);
        onSimulationComplete();
      }
    } else {
      soundFx.playIncorrect();
    }
    onNarrate(`${activeWarmerEval.name}: ${activeWarmerEval.verdict}. ${activeWarmerEval.explanation}`);
  };

  // Level 3 Mastery Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempt, setQuizAttempt] = useState(1);
  const [shuffledOptions, setShuffledOptions] = useState<
    Record<string, { text: string; originalIndex: number }[]>
  >({});

  useEffect(() => {
    const map: Record<string, { text: string; originalIndex: number }[]> = {};
    Q2_LEVEL_3_QUIZ.forEach((q) => {
      map[q.id] = shuffleArray(q.options.map((text, idx) => ({ text, originalIndex: idx })));
    });
    setShuffledOptions(map);
  }, [quizAttempt]);

  const handleSubmitQuiz = () => {
    soundFx.playClick();
    let score = 0;
    Q2_LEVEL_3_QUIZ.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) score++;
    });
    setQuizScore(score);
    setSubmittedQuiz(true);
    const mastery = evaluateMastery(score, Q2_LEVEL_3_QUIZ.length);
    if (mastery.passed) {
      soundFx.playFanfare();
      onAwardPoints(score * 20 + 50);
    } else {
      soundFx.playIncorrect();
    }
    onCompleteQuiz(3, mastery.percentage, mastery.passed);
    onNarrate(
      `Quarter 2 Level 3 quiz complete. You scored ${score} out of ${Q2_LEVEL_3_QUIZ.length}, or ${mastery.percentage} percent.`
    );
  };

  const tabs = [
    { id: 'heat_transfer', label: '1. Heat Transfer & Systems', icon: Flame },
    { id: 'cold_pack', label: '2. Cold Pack Lab', icon: Snowflake },
    { id: 'rate_lab', label: '3. Reaction Rate Lab', icon: Gauge },
    { id: 'turtle_engineering', label: '4. Sea Turtle Egg Warmer', icon: Wrench },
  ] as const;

  const transferDetails = {
    conduction: {
      title: 'Conduction (Direct Contact)',
      medium: 'Solids (and touching surfaces)',
      icon: '🍳',
      example: 'A metal spoon warming in hot soup, or heat flowing from a stove burner directly into a skillet.',
      rule: 'Faster-moving particles in the warmer region collide directly with neighboring particles in the cooler region, transferring kinetic energy.',
    },
    convection: {
      title: 'Convection (Fluid Currents)',
      medium: 'Liquids & Gases (Fluids)',
      icon: '🌊',
      example: 'Warm water rising and cooler water sinking in a boiling pot, or warm air circulating above a heater.',
      rule: 'Warmer fluid expands, becomes less dense, and rises while cooler, denser fluid sinks to replace it—forming continuous circulation currents.',
    },
    radiation: {
      title: 'Radiation (Electromagnetic Waves)',
      medium: 'Travels through empty space (vacuum) or transparent media',
      icon: '☀️',
      example: 'Sunlight warming Earth across space, or infrared warmth felt from a campfire or molten thermite.',
      rule: 'Why do hot objects cool slowly in outer space? Because a vacuum has NO matter for conduction or convection—heat can ONLY leave via radiation!',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Lesson Header: title, actions, steps */}
      <LessonHeader
        accent="amber"
        kicker={["Quarter 2 · Level 3 Expedition","Thermal Energy & Chemical Processes"]}
        title="Thermal Energy, Reaction Rates & Engineering Design"
        description="Trace energy flow through exothermic and endothermic systems, test four cold-pack chemical pairs, measure how temperature and catalysts change collision rates, and engineer a portable sea turtle egg incubator."
        actions={[
          {
            label: 'Summary Infographic',
            hint: 'One-page handwritten notes',
            icon: NotebookPen,
            tone: 'summary',
            pressed: activeTab === 'summary',
            onClick: () => setActiveTab('summary'),
          },
          { label: 'Watch Lesson', hint: 'Narrated 3D explainer', icon: Play, tone: 'video', onClick: () => setIsVideoModalOpen(true) },
          {
            label: 'Take Level 3 Quiz',
            hint: `${Q2_LEVEL_3_QUIZ.length} questions`,
            icon: ArrowRight,
            tone: 'primary',
            pressed: activeTab === 'quiz',
            onClick: () => setActiveTab('quiz'),
          },
        ]}
        tabs={tabs}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* TAB 1: HEAT TRANSFER & SYSTEMS */}
      {activeTab === 'heat_transfer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-5">
            <div>
              <h2 className="text-xl font-extrabold text-white">Three Mechanisms of Thermal Energy Transfer</h2>
              <p className="text-xs text-slate-400 mt-1">
                Thermal energy always flows spontaneously from warmer regions to cooler regions until thermal equilibrium is reached.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {(['conduction', 'convection', 'radiation'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedTransfer(mode);
                    onNarrate(transferDetails[mode].rule);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    selectedTransfer === mode
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{transferDetails[mode].icon}</div>
                  <div className="text-xs sm:text-sm font-bold capitalize">{mode}</div>
                </button>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-extrabold text-amber-300">
                  {transferDetails[selectedTransfer].title}
                </h3>
                <span className="text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                  Medium: {transferDetails[selectedTransfer].medium}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {transferDetails[selectedTransfer].rule}
              </p>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <strong className="text-white">Real-World Example: </strong>
                {transferDetails[selectedTransfer].example}
              </div>
            </div>

            {/* Exothermic vs Endothermic Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-orange-950/25 border border-orange-500/30 space-y-2">
                <div className="flex items-center gap-2 text-orange-300 font-extrabold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Exothermic Process</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Releases</strong> thermal energy into the surroundings (temperature rises). Examples: Thermite reaction (&gt;2,500 °C), burning fuel, sodium acetate hand warmer (50.1 °C), rusting steel wool (20.6 → 26.5 °C).
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-950/25 border border-sky-500/30 space-y-2">
                <div className="flex items-center gap-2 text-sky-300 font-extrabold text-sm">
                  <Snowflake className="w-4 h-4" />
                  <span>Endothermic Process</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Absorbs</strong> thermal energy from the surroundings (temperature drops). Examples: Instant ammonium chloride cold pack, dissolving rock salt in ice water (−0.8 → −8.0 °C), photosynthesis.
                </p>
              </div>
            </div>
          </div>

          {/* System Analysis Sidebar */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                System Boundaries · Lesson 3
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Tracing Energy in a Chemical System
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">1. Input</div>
                  Chemical potential energy stored in reactant bonds (e.g., Fe₂O₃ + 2Al or supersaturated sodium acetate).
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">2. Chemical Process</div>
                  Bonds break and reform; energy transforms between chemical potential energy and thermal energy.
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">3. Output to Surroundings</div>
                  Thermal energy transfers out (exothermic) or flows in from surroundings (endothermic). Energy is conserved, never destroyed.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('cold_pack');
              }}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Next: Cold Pack Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: REACTION TO THE RESCUE (COLD PACK LAB) */}
      {activeTab === 'cold_pack' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Hands-On Lab · Reaction to the Rescue (Page 7)
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Test Four Chemical Pairs to Engineer a Safe Instant Cold Pack
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Criteria: Must cool rapidly (endothermic) for sports injuries. Constraints: Must NOT generate gas that could burst a sealed pouch, and must remain safe to handle.
              </p>
            </div>
            <div className="text-xs font-mono text-sky-300 bg-sky-950/60 border border-sky-700/50 px-3 py-1.5 rounded-xl tabular-nums">
              Tested: {Object.keys(testedPairs).length} / {COLD_PACK_PAIRS.length} Pairs
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLD_PACK_PAIRS.map((pair) => {
              const tested = Boolean(testedPairs[pair.id]);
              const delta = Math.round((pair.tempEndC - pair.tempStartC) * 10) / 10;
              const isSelected = selectedColdPackChoice === pair.id;

              return (
                <div
                  key={pair.id}
                  className={`p-5 rounded-2xl border transition space-y-3 ${
                    isSelected && pair.suitableForColdPack
                      ? 'bg-emerald-950/30 border-emerald-500'
                      : isSelected && !pair.suitableForColdPack
                      ? 'bg-red-950/30 border-red-500'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-extrabold text-white">{pair.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{pair.reactants}</p>
                    </div>
                    {tested && (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                          pair.processType === 'Endothermic'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                            : 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                        }`}
                      >
                        {pair.processType}
                      </span>
                    )}
                  </div>

                  {!tested ? (
                    <button
                      type="button"
                      onClick={() => handleTestPair(pair.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
                    >
                      Mix &amp; Measure Temperature
                    </button>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">Start Temp</div>
                          <div className="text-sm font-mono font-bold text-slate-200 tabular-nums">
                            {pair.tempStartC} °C
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">Final Temp</div>
                          <div
                            className={`text-sm font-mono font-bold tabular-nums ${
                              delta < 0 ? 'text-sky-300' : 'text-orange-300'
                            }`}
                          >
                            {pair.tempEndC} °C ({delta > 0 ? `+${delta}` : delta})
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">Gas Risk</div>
                          <div
                            className={`text-xs font-bold mt-0.5 ${
                              pair.gasProduced ? 'text-red-400' : 'text-emerald-400'
                            }`}
                          >
                            {pair.gasProduced ? 'CO₂ Rupture!' : 'None'}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{pair.observation}</p>

                      <button
                        type="button"
                        onClick={() => handleSelectColdPackWinner(pair.id)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                          isSelected
                            ? pair.suitableForColdPack
                              ? 'bg-emerald-600 text-white'
                              : 'bg-red-600 text-white'
                            : 'bg-sky-600/20 hover:bg-sky-600/35 text-sky-200 border border-sky-500/40'
                        }`}
                      >
                        {isSelected
                          ? pair.suitableForColdPack
                            ? '✓ Selected Optimal Cold Pack (+25 XP)'
                            : '✗ Violates Engineering Criteria'
                          : 'Recommend This Pair for Cold Pack'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: REACTION RATE & COLLISION SIMULATOR */}
      {activeTab === 'rate_lab' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Reaction Rate Factors · PDF Graph Benchmarks
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Effervescent Tablet Collision &amp; Rate Simulator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Calibrated directly to the Lesson 3 water temperature lab data: <strong>18 °C = 71 s</strong>, <strong>34 °C = 31.5 s</strong>, and <strong>68 °C = 21 s</strong>.
              </p>
            </div>

            {/* Temperature Slider + Presets */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-amber-400" />
                  Water Temperature
                </span>
                <span className="font-mono font-bold text-amber-300 tabular-nums">{tempC} °C</span>
              </div>
              <input
                type="range"
                min={18}
                max={68}
                value={tempC}
                onChange={(e) => setTempC(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
                aria-label="Water temperature in degrees Celsius"
              />
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Cold (18 °C · 71 s)', val: 18 },
                  { label: 'Warm (34 °C · 31.5 s)', val: 34 },
                  { label: 'Hot (68 °C · 21 s)', val: 68 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setTempC(preset.val);
                      setSurfaceArea('whole');
                      setConcentration('medium');
                      setHasCatalyst(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                      tempC === preset.val && surfaceArea === 'whole' && concentration === 'medium' && !hasCatalyst
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface Area, Concentration & Catalyst Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200">Surface Area</div>
                <div className="flex gap-1.5">
                  {(['whole', 'crushed'] as const).map((sa) => (
                    <button
                      key={sa}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setSurfaceArea(sa);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize border transition cursor-pointer ${
                        surfaceArea === sa
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {sa}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200">Concentration</div>
                <div className="flex gap-1">
                  {(['low', 'medium', 'high'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setConcentration(c);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold capitalize border transition cursor-pointer ${
                        concentration === c
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200">Catalyst (e.g., Salt)</div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setHasCatalyst((prev) => !prev);
                  }}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    hasCatalyst
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {hasCatalyst ? 'Catalyst Active' : 'No Catalyst'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Readout Panel */}
          <div className="lg:col-span-2 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Live Kinetic Readout
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Reaction Time</div>
                  <div className="text-3xl font-black font-mono text-amber-400 mt-1 tabular-nums">
                    {rateResult.estimatedSeconds}s
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Collision Index</div>
                  <div className="text-3xl font-black font-mono text-cyan-400 mt-1 tabular-nums">
                    {rateResult.collisionIndex}%
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Slow Collisions</span>
                  <span>Rapid Collisions</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 via-amber-400 to-orange-500 transition-all duration-300"
                    style={{ width: `${rateResult.collisionIndex}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {rateResult.summary}
              </p>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <strong>Key Law:</strong> Faster reaction rates transform energy <em>more quickly per second</em>, but do <strong>NOT</strong> increase the total energy stored in the reactants.
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFx.playCorrect();
                if (!rateExperimentLogged) {
                  setRateExperimentLogged(true);
                  onAwardPoints(20);
                  onSimulationComplete();
                }
                onNarrate(
                  `Logged reaction time of ${rateResult.estimatedSeconds} seconds at ${tempC} degrees Celsius. ${rateResult.summary}`
                );
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer"
            >
              {rateExperimentLogged ? '✓ Lab Trial Logged (+20 XP)' : 'Log Kinetic Trial Data (+20 XP)'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: SAVE THE SEA TURTLE EGGS ENGINEERING DESIGN */}
      {activeTab === 'turtle_engineering' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Unit 4 Performance Task · Page 10
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  🐢 Save the Sea Turtle Eggs! Portable Incubator Decision Matrix
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Evaluate three chemical systems against strict biological criteria: maintain <strong>27–33 °C</strong> steadily for <strong>≥30 minutes</strong>, never exceed <strong>35 °C</strong>, produce zero toxic fumes, and provide flexible cushioning during emergency beach relocation.
                </p>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 font-semibold">
                Safe Hatching Window: 27–33 °C
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['ammonium_nitrate', 'iron_powder_salt', 'sodium_acetate'] as const).map((optId) => {
                const info = evaluateTurtleEggWarmer(optId);
                const selected = selectedWarmer === optId;
                return (
                  <button
                    key={optId}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedWarmer(optId);
                    }}
                    className={`p-5 rounded-2xl border text-left transition cursor-pointer space-y-3 ${
                      selected
                        ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-sm font-extrabold text-white">{info.name}</div>
                    <div className="text-[11px] font-semibold text-slate-400">{info.reactionType}</div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Peak Temp</div>
                        <div className="text-sm font-mono font-bold text-white tabular-nums">
                          {info.peakTempC} °C
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Duration</div>
                        <div className="text-sm font-mono font-bold text-white tabular-nums">
                          {info.durationMin} min
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="space-y-1 max-w-2xl">
                <div className="text-xs text-slate-400">Selected Candidate Prototype</div>
                <div className="text-base font-extrabold text-white">{activeWarmerEval.name}</div>
                {submittedWarmer === selectedWarmer && (
                  <div
                    className={`mt-2 p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                      activeWarmerEval.meetsCriteria
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-red-950/40 border-red-500/40 text-red-200'
                    }`}
                  >
                    {activeWarmerEval.meetsCriteria ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong>{activeWarmerEval.verdict}: </strong>
                      {activeWarmerEval.explanation}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleConfirmWarmer}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer shrink-0"
              >
                Evaluate Prototype Decision
              </button>
            </div>
          </div>

          {/* Haber-Bosch Engineering Spotlight */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Real-World Chemical Engineering · Page 7
              </div>
              <h3 className="text-base font-extrabold text-white">
                Carl Bosch &amp; Industrial Ammonia Synthesis (N₂ + 3H₂ → 2NH₃)
              </h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                Industrial ammonia production for fertilizer is strongly exothermic. Without thermal control, excess heat would damage pressurized steel reactors. Carl Bosch engineered circulating cooling water jackets around the reaction chambers—removing excess thermal energy safely while maintaining steady yield.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setIsVideoModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 transition cursor-pointer shrink-0"
            >
              <span>Next: Watch Video</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: LEVEL 3 MASTERY QUIZ */}
      {/* SUMMARY INFOGRAPHIC */}
      {activeTab === 'summary' && <Q2SummaryInfographic lesson={3} />}

      {activeTab === 'quiz' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Quarter 2 · Level 3 Mastery Checkpoint
              </span>
              <h2 className="text-xl font-extrabold text-white mt-0.5">
                Thermal Energy &amp; Engineering Assessment (5 Questions)
              </h2>
            </div>
            <div className="text-xs text-slate-400">Target Mastery: 80% (4/5)</div>
          </div>

          <div className="space-y-5">
            {Q2_LEVEL_3_QUIZ.map((q, idx) => {
              const options = shuffledOptions[q.id] || q.options.map((text, i) => ({ text, originalIndex: i }));
              const selected = quizAnswers[q.id];
              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-sm font-bold text-white">
                    {idx + 1}. {q.question}
                  </div>
                  <div className="space-y-2">
                    {options.map((opt, optIdx) => {
                      const isPicked = selected === opt.originalIndex;
                      const isRight = opt.originalIndex === q.correctAnswer;
                      let btnStyle =
                        'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';
                      if (submittedQuiz) {
                        if (isRight) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-white font-bold';
                        else if (isPicked) btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
                        else btnStyle = 'bg-slate-950 border-slate-900 text-slate-500';
                      } else if (isPicked) {
                        btnStyle = 'bg-amber-500/20 border-amber-400 text-white font-bold';
                      }

                      return (
                        <button
                          key={opt.originalIndex}
                          type="button"
                          disabled={submittedQuiz}
                          onClick={() => {
                            soundFx.playClick();
                            setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.originalIndex }));
                          }}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer flex items-center gap-3 ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  {submittedQuiz && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-300">Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
            {!submittedQuiz ? (
              <button
                type="button"
                disabled={Object.keys(quizAnswers).length < Q2_LEVEL_3_QUIZ.length}
                onClick={handleSubmitQuiz}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-extrabold text-sm transition cursor-pointer"
              >
                Submit Level 3 Assessment ({Object.keys(quizAnswers).length}/{Q2_LEVEL_3_QUIZ.length} Answered)
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-between w-full gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-extrabold text-white">
                    Score: {quizScore} / {Q2_LEVEL_3_QUIZ.length} ({Math.round((quizScore / Q2_LEVEL_3_QUIZ.length) * 100)}%)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setQuizAnswers({});
                    setSubmittedQuiz(false);
                    setQuizAttempt((a) => a + 1);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry with Reshuffled Choices</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lesson Video Modal */}
      <LessonVideoModal
        explainer={<Lesson3DExplainer lesson={3} />}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Thermal Energy, Exothermic vs. Endothermic & Thermite"
        topic="Thermal Energy & Chemical Processes"
        quarterLabel="Quarter 2 · Unit 4"
        levelNumber={3}
        accentColor="amber"
        description="Explore how thermal energy moves through chemical systems via conduction, convection, and radiation, why exothermic processes release heat while endothermic ones absorb heat, and how engineers design thermal packs."
        keyTopics={[
          'Conduction, Convection & Radiation',
          'Exothermic vs. Endothermic',
          'Reaction Rate & Collisions',
          'NH₄Cl Cold Pack vs. Iron Warmer',
        ]}
        onGoToQuiz={() => setActiveTab('quiz')}
      />
    </div>
  );
};
