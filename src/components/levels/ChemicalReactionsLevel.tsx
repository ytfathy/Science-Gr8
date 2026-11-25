/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Quarter 2 — Level 1: Chemical Reactions & Properties of Matter
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  FlaskConical,
  ShieldAlert,
  Scale,
  Flame,
  Play,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  NotebookPen,
} from 'lucide-react';
import {
  Q2_LEVEL_1_QUIZ,
} from '../../data/chemistryData.js';
import { compareSubstanceSamples } from '../../game/chemistryRules.js';
import { evaluateMastery } from '../../game/rules.js';
import { soundFx, shuffleArray } from '../../utils/audio.js';
import { LessonVideoModal } from '../LessonVideoModal.js';
import { Lesson3DExplainer } from '../Lesson3DExplainerLazy.js';
import { Q2SummaryInfographic } from '../Q2SummaryInfographic.js';
import { LessonHeader } from '../LessonHeader.js';

interface ChemicalReactionsLevelProps {
  onAwardPoints: (pts: number) => void;
  onCompleteQuiz: (levelNum: number, score: number, passed: boolean) => void;
  onNarrate: (text: string) => void;
  onSimulationComplete: () => void;
}

export const ChemicalReactionsLevel: React.FC<ChemicalReactionsLevelProps> = ({
  onAwardPoints,
  onCompleteQuiz,
  onNarrate,
  onSimulationComplete,
}) => {
  const [activeTab, setActiveTab] = useState<
    'anchor_safety' | 'density_lab' | 'changes_lab' | 'mix_it_up' | 'summary' | 'quiz'
  >('anchor_safety');

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Safety checklist state
  const [checkedSafety, setCheckedSafety] = useState<Record<string, boolean>>({});

  // Density & Multi-Property Lab state (defaults match PDF Exploration 1 Q4–Q7)
  const [massA, setMassA] = useState(5.5);
  const [volA, setVolA] = useState(5.5);
  const [freezeA, setFreezeA] = useState(0);
  const [massB, setMassB] = useState(10.4);
  const [volB, setVolB] = useState(7.0);
  const [freezeB, setFreezeB] = useState(75);

  const sampleComparison = compareSubstanceSamples(
    { massG: massA, volumeMl: volA, freezingPointC: freezeA, boilingPointC: 100 },
    { massG: massB, volumeMl: volB, freezingPointC: freezeB, boilingPointC: 100 }
  );

  // Physical vs Chemical Classifier state
  const changeScenarios = [
    {
      id: 'c1',
      label: 'Burning Firewood at a Campsite',
      expected: 'chemical',
      detail: 'Combustion with oxygen produces ash, water vapor, and CO₂—brand-new substances.',
    },
    {
      id: 'c2',
      label: 'Sawing Wood / Chopping Firewood',
      expected: 'physical',
      detail: 'Size and shape change, but cellulose molecules and substance identity remain identical.',
    },
    {
      id: 'c3',
      label: 'Rusting Bicycle Chain & Weathered Bucket',
      expected: 'chemical',
      detail: 'Iron reacts chemically with oxygen and moisture to form dark reddish iron (III) oxide.',
    },
    {
      id: 'c4',
      label: 'Breaking Glass & Melting Candle Wax',
      expected: 'physical',
      detail: 'Mechanical fracture and solid-to-liquid melting alter form/state without breaking internal molecular bonds.',
    },
    {
      id: 'c5',
      label: 'Fried Egg vs. Whisked Raw Egg (Fried Egg)',
      expected: 'chemical',
      detail: 'Heat permanently denatures egg proteins and forms new chemical bonds (whisking raw is physical).',
    },
    {
      id: 'c6',
      label: 'Automobile Airbag Inflation (Sodium Azide NaN₃)',
      expected: 'chemical',
      detail: 'Solid NaN₃ rapidly decomposes in <50 ms into a huge volume of non-toxic nitrogen gas (N₂).',
    },
  ];
  const [changeGuesses, setChangeGuesses] = useState<Record<string, 'physical' | 'chemical'>>({});

  // Hands-On Lab: Mix It Up! (Bag 1 vs Bag 2)
  const [bag1Mixed, setBag1Mixed] = useState(false);
  const [bag2Mixed, setBag2Mixed] = useState(false);
  const [airbagTriggered, setAirbagTriggered] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempt, setQuizAttempt] = useState(1);
  const [shuffledOptions, setShuffledOptions] = useState<
    Record<string, { text: string; originalIndex: number }[]>
  >({});

  useEffect(() => {
    const map: Record<string, { text: string; originalIndex: number }[]> = {};
    Q2_LEVEL_1_QUIZ.forEach((q) => {
      map[q.id] = shuffleArray(q.options.map((text, idx) => ({ text, originalIndex: idx })));
    });
    setShuffledOptions(map);
  }, [quizAttempt]);

  const handleClassifyChange = (id: string, guess: 'physical' | 'chemical', expected: string) => {
    soundFx.playClick();
    setChangeGuesses((prev) => ({ ...prev, [id]: guess }));
    if (guess === expected) {
      soundFx.playCorrect();
      onAwardPoints(10);
    } else {
      soundFx.playIncorrect();
    }
  };

  const handleSubmitQuiz = () => {
    soundFx.playClick();
    let score = 0;
    Q2_LEVEL_1_QUIZ.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) score++;
    });
    setQuizScore(score);
    setSubmittedQuiz(true);
    const mastery = evaluateMastery(score, Q2_LEVEL_1_QUIZ.length);
    if (mastery.passed) {
      soundFx.playFanfare();
      onAwardPoints(score * 20 + 50);
    } else {
      soundFx.playIncorrect();
    }
    onCompleteQuiz(1, mastery.percentage, mastery.passed);
    onNarrate(
      `Quarter 2 Level 1 quiz complete. You scored ${score} out of ${Q2_LEVEL_1_QUIZ.length}, or ${mastery.percentage} percent.`
    );
  };

  const safetyProtocols = [
    {
      id: 'ppe',
      domain: 'Dress Code & PPE',
      rule: 'Wear safety goggles, non-latex gloves, and lab apron. No contact lenses, open-toed shoes, sandals, or canvas shoes; tie back long hair.',
    },
    {
      id: 'wafting',
      domain: 'Chemical Safety & Wafting',
      rule: 'Never inhale vapors directly—gently waft fumes toward your nose. Rinse chemical splashes immediately for at least 15 minutes.',
    },
    {
      id: 'heat',
      domain: 'Heating, Electrical & Fire',
      rule: 'Never leave a hot plate unattended. Use tongs for heated glassware, use GFI-protected outlets, and know fire extinguisher/blanket locations.',
    },
    {
      id: 'glass',
      domain: 'Glassware & Lab Cleanup',
      rule: 'Notify teacher if glass breaks—never use bare hands. Dispose of reacted bags strictly as directed and wash hands with soap and warm water.',
    },
  ];

  const tabs = [
    { id: 'anchor_safety', label: '1. Anchor & Safety', icon: ShieldAlert },
    { id: 'density_lab', label: '2. Density & Properties', icon: Scale },
    { id: 'changes_lab', label: '3. Physical vs. Chemical', icon: Flame },
    { id: 'mix_it_up', label: '4. Mix It Up! & Airbags', icon: FlaskConical },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Lesson Header: title, actions, steps */}
      <LessonHeader
        accent="violet"
        kicker={["Quarter 2 · Level 1 Expedition","Physical Science"]}
        title="Chemical Reactions & Properties of Matter"
        description="Investigate the Thermite anchor phenomenon, identify pure substances by density and characteristic properties, distinguish physical changes from chemical reactions, and run the Mix It Up! bag experiment."
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
            label: 'Take Level 1 Quiz',
            hint: `${Q2_LEVEL_1_QUIZ.length} questions`,
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

      {/* TAB 1: ANCHOR PHENOMENON & LAB SAFETY */}
      {activeTab === 'anchor_safety' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Anchor Phenomenon • Tracing Matter & Energy
            </div>
            <h2 className="text-xl font-extrabold text-white">
              The Thermite Reaction: Fe₂O₃ + 2Al → 2Fe + Al₂O₃
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              When powdered iron (III) oxide (Fe₂O₃) and powdered aluminum metal (Al) receive activation energy, a violent exothermic reaction exceeds <strong className="text-amber-300">2,500 °C</strong>—producing blinding light, sparks, aluminum oxide, and <strong className="text-white">molten liquid iron</strong> (iron melts at 1,538 °C and boils at 2,862 °C).
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-violet-500/30 space-y-2">
              <div className="text-xs font-bold text-violet-300 uppercase tracking-wider">
                Core Scientific Through-Line
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Despite the dramatic release of thermal and electromagnetic energy, <strong>total mass stays strictly constant</strong> in a closed system (213.85 g before = 213.85 g after; Δm = 0.00 g). Every iron, oxygen, and aluminum atom is conserved—only rearranged!
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-lg font-black text-amber-400 tabular-nums">&gt;2,500 °C</div>
                <div className="text-[11px] text-slate-400">Reaction Temp</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-lg font-black text-emerald-400 tabular-nums">Liquid Fe</div>
                <div className="text-[11px] text-slate-400">MP 1,538 °C</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-lg font-black text-violet-300 tabular-nums">Δm = 0.00 g</div>
                <div className="text-[11px] text-slate-400">Closed System</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Mandatory Pre-Lab Verification
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  Laboratory Safety Protocols
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-300 tabular-nums">
                {Object.values(checkedSafety).filter(Boolean).length} / {safetyProtocols.length} Verified
              </span>
            </div>

            <div className="space-y-3">
              {safetyProtocols.map((item) => {
                const checked = Boolean(checkedSafety[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setCheckedSafety((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                      if (!checked) onAwardPoints(5);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                      checked
                        ? 'bg-emerald-950/30 border-emerald-500/40'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        checked ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{item.domain}</div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.rule}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DENSITY & MULTI-PROPERTY LAB */}
      {activeTab === 'density_lab' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Exploration 1 • Do the Math (Page 3)
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Density & Multi-Property Substance Analyzer
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Both samples are colorless, odorless, and boil at 100 °C. Adjust mass, volume, and freezing point to verify why scientists inspect multiple characteristic properties.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setMassA(5.5);
                setVolA(5.5);
                setFreezeA(0);
                setMassB(10.4);
                setVolB(7.0);
                setFreezeB(75);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset PDF Values</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sample A */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">Sample A</h3>
                <span className="text-sm font-mono font-bold text-white tabular-nums">
                  Density: {sampleComparison.densityA} g/mL
                </span>
              </div>
              <label className="block text-xs text-slate-300">
                Mass: <strong className="text-white tabular-nums">{massA.toFixed(1)} g</strong>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={massA}
                  onChange={(e) => setMassA(parseFloat(e.target.value))}
                  className="w-full mt-1 accent-cyan-400"
                />
              </label>
              <label className="block text-xs text-slate-300">
                Volume: <strong className="text-white tabular-nums">{volA.toFixed(1)} mL</strong>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={volA}
                  onChange={(e) => setVolA(parseFloat(e.target.value))}
                  className="w-full mt-1 accent-cyan-400"
                />
              </label>
              <label className="block text-xs text-slate-300">
                Freezing Point: <strong className="text-white tabular-nums">{freezeA} °C</strong>
                <input
                  type="range"
                  min={-20}
                  max={100}
                  step={5}
                  value={freezeA}
                  onChange={(e) => setFreezeA(parseInt(e.target.value, 10))}
                  className="w-full mt-1 accent-cyan-400"
                />
              </label>
            </div>

            {/* Sample B */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-violet-300">Sample B</h3>
                <span className="text-sm font-mono font-bold text-white tabular-nums">
                  Density: {sampleComparison.densityB} g/mL
                </span>
              </div>
              <label className="block text-xs text-slate-300">
                Mass: <strong className="text-white tabular-nums">{massB.toFixed(1)} g</strong>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={massB}
                  onChange={(e) => setMassB(parseFloat(e.target.value))}
                  className="w-full mt-1 accent-violet-400"
                />
              </label>
              <label className="block text-xs text-slate-300">
                Volume: <strong className="text-white tabular-nums">{volB.toFixed(1)} mL</strong>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={volB}
                  onChange={(e) => setVolB(parseFloat(e.target.value))}
                  className="w-full mt-1 accent-violet-400"
                />
              </label>
              <label className="block text-xs text-slate-300">
                Freezing Point: <strong className="text-white tabular-nums">{freezeB} °C</strong>
                <input
                  type="range"
                  min={-20}
                  max={100}
                  step={5}
                  value={freezeB}
                  onChange={(e) => setFreezeB(parseInt(e.target.value, 10))}
                  className="w-full mt-1 accent-violet-400"
                />
              </label>
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              sampleComparison.areSameSubstance
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
            }`}
          >
            {sampleComparison.areSameSubstance ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              <strong className="text-sm block mb-0.5">
                Verdict: {sampleComparison.areSameSubstance ? 'Consistent with SAME Substance' : 'DIFFERENT Substances'}
              </strong>
              {sampleComparison.reason}
            </div>
          </div>

          {/* Iron Pyrite vs Real Gold Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-amber-300 mb-1">Real Gold (Au)</div>
              <p className="text-xs text-slate-300">
                Density ≈ <strong>19.3 g/cm³</strong> • Soft & malleable • Leaves a <strong>yellow-gold</strong> streak.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-slate-300 mb-1">Iron Pyrite ("Fool's Gold", FeS₂)</div>
              <p className="text-xs text-slate-300">
                Density ≈ <strong>5.0 g/cm³</strong> • Hard & brittle • Leaves a <strong>greenish-black</strong> streak.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PHYSICAL VS CHEMICAL CLASSIFIER */}
      {activeTab === 'changes_lab' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Exploration 2 • Identifying Molecular Changes
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Physical Change vs. Chemical Reaction Classifier
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Physical changes preserve atomic identity; chemical reactions break and reform bonds to produce brand-new substances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {changeScenarios.map((sc) => {
              const guess = changeGuesses[sc.id];
              const isCorrect = guess === sc.expected;
              return (
                <div
                  key={sc.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
                >
                  <div className="text-sm font-bold text-white">{sc.label}</div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleClassifyChange(sc.id, 'physical', sc.expected)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        guess === 'physical'
                          ? isCorrect
                            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                            : 'bg-rose-600/30 border-rose-400 text-rose-200'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      Physical Change
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClassifyChange(sc.id, 'chemical', sc.expected)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        guess === 'chemical'
                          ? isCorrect
                            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                            : 'bg-rose-600/30 border-rose-400 text-rose-200'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      Chemical Reaction
                    </button>
                  </div>
                  {guess && (
                    <div
                      className={`text-xs p-2.5 rounded-xl flex items-start gap-2 ${
                        isCorrect
                          ? 'bg-emerald-950/40 text-emerald-200'
                          : 'bg-rose-950/40 text-rose-200'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                      )}
                      <span>{sc.detail}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: MIX IT UP! HANDS-ON LAB & AIRBAGS */}
      {activeTab === 'mix_it_up' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bag 1 */}
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Hands-On Lab • Bag 1
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Baking Soda + Powdered Sugar
              </h3>
              <p className="text-xs text-slate-300">
                Two dry white solid powders sealed inside Bag 1. Shake to mix thoroughly and record observations.
              </p>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setBag1Mixed(true);
                  onNarrate('Bag 1 mixed: no temperature change, no bubbling, and no new substances. This is only a physical mixture.');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition cursor-pointer"
              >
                {bag1Mixed ? 'Bag 1 Mixed — Inspect Results' : 'Shake & Mix Bag 1'}
              </button>
              {bag1Mixed && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-slate-200">Result: Physical Mixture Only</div>
                  <div>• Temperature: 21.0 °C (Unchanged)</div>
                  <div>• Gas / Bubbles: None</div>
                  <div>• Precipitate: None — solids remain separate unchanged powders.</div>
                </div>
              )}
            </div>

            {/* Bag 2 */}
            <div className="rounded-3xl bg-slate-900/80 border border-violet-500/30 p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Hands-On Lab • Bag 2
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Baking Soda + Calcium Chloride + Water
              </h3>
              <p className="text-xs text-slate-300">
                Seal the bag, rupture the inner water pouch, and monitor temperature, gas evolution, and precipitate formation.
              </p>
              <button
                type="button"
                onClick={() => {
                  soundFx.playCorrect();
                  setBag2Mixed(true);
                  onSimulationComplete();
                  onAwardPoints(15);
                  onNarrate('Chemical reaction confirmed in Bag 2! Vigorous carbon dioxide fizzing, exothermic heat release, and a milky white calcium carbonate precipitate formed.');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition cursor-pointer shadow-md"
              >
                {bag2Mixed ? 'Reaction Active in Bag 2!' : 'Mix & React Bag 2'}
              </button>
              {bag2Mixed && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 space-y-1.5">
                  <div className="font-bold text-emerald-300">Result: Chemical Reaction Confirmed!</div>
                  <div>• Temperature: Rose sharply (Exothermic release of heat)</div>
                  <div>• Gas / Bubbles: Vigorous CO₂ fizzing inflates the sealed bag</div>
                  <div>• Precipitate: Milky white insoluble calcium carbonate (CaCO₃) formed!</div>
                </div>
              )}
            </div>
          </div>

          {/* Engineering in Action: Automobile Airbags */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Take It Further • Chemistry & Engineering
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Automobile Airbags: Rapid Decomposition of Sodium Azide (NaN₃)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upon crash-sensor activation, a tiny mass of solid sodium azide decomposes in under <strong>50 milliseconds</strong> into sodium metal and a massive volume of non-toxic <strong>nitrogen gas (N₂)</strong>—meeting strict design criteria for inflation speed, gas volume, non-toxicity, and shelf stability.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFx.playStep();
                setAirbagTriggered((v) => !v);
                onAwardPoints(10);
              }}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              {airbagTriggered ? 'Reset Crash Sensor (Inflated in 38 ms)' : 'Test Crash Sensor (<50 ms N₂ Gas)'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: LEVEL 1 MASTERY QUIZ */}
      {/* SUMMARY INFOGRAPHIC */}
      {activeTab === 'summary' && <Q2SummaryInfographic lesson={1} />}

      {activeTab === 'quiz' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Quarter 2 · Level 1 Mastery Check (Target: 80%)
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Chemical Reactions Assessment
              </h2>
            </div>
            {submittedQuiz && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-emerald-400 tabular-nums">
                  Score: {quizScore}/{Q2_LEVEL_1_QUIZ.length} ({Math.round((quizScore / Q2_LEVEL_1_QUIZ.length) * 100)}%)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({});
                    setSubmittedQuiz(false);
                    setQuizAttempt((a) => a + 1);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 cursor-pointer"
                >
                  Retry (Reshuffle)
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {Q2_LEVEL_1_QUIZ.map((q, idx) => {
              const opts = shuffledOptions[q.id] || q.options.map((text, i) => ({ text, originalIndex: i }));
              const selected = quizAnswers[q.id];
              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="text-sm font-bold text-white">
                    {idx + 1}. {q.question}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {opts.map((opt) => {
                      const isChosen = selected === opt.originalIndex;
                      const isRight = opt.originalIndex === q.correctAnswer;
                      let cls = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-violet-400';
                      if (submittedQuiz) {
                        if (isRight) cls = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                        else if (isChosen) cls = 'bg-rose-950/50 border-rose-500 text-rose-200';
                      } else if (isChosen) {
                        cls = 'bg-violet-600/25 border-violet-400 text-white';
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
                          className={`text-left px-4 py-2.5 rounded-xl border text-xs font-medium transition cursor-pointer ${cls}`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                  {submittedQuiz && (
                    <div className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <strong className="text-violet-300">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submittedQuiz && (
            <button
              type="button"
              disabled={Object.keys(quizAnswers).length < Q2_LEVEL_1_QUIZ.length}
              onClick={handleSubmitQuiz}
              className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm transition cursor-pointer"
            >
              Submit Level 1 Mastery Assessment ({Object.keys(quizAnswers).length}/{Q2_LEVEL_1_QUIZ.length} Answered)
            </button>
          )}
        </div>
      )}

      {/* Lesson Video Modal */}
      <LessonVideoModal
        explainer={<Lesson3DExplainer lesson={1} />}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Chemical Processes & Equations: Tracing Matter and Energy"
        topic="Physical vs. Chemical Changes, Equations & Conservation"
        levelNumber={1}
        quarterLabel="Quarter 2 • Physical Science"
        accentColor="violet"
        description="Watch the full unit explanation covering physical vs. chemical changes, observable reaction evidence, chemical formulas, balanced equations, conservation of matter, and thermal energy transfer."
        keyTopics={[
          'Physical vs. Chemical Changes',
          'Five Observable Signs',
          'Subscripts vs. Coefficients',
          'Law of Conservation of Matter',
        ]}
        onGoToQuiz={() => setActiveTab('quiz')}
      />
    </div>
  );
};
