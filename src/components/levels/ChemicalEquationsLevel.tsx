/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Quarter 2 — Level 2: Chemical Equations & Conservation of Matter
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Scale,
  Atom,
  FlaskConical,
  Play,
  ArrowRight,
  Plus,
  Minus,
  RotateCcw,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  XCircle,
} from 'lucide-react';
import {
  Q2_VIDEO_URL,
  Q2_VIDEO_CHAPTERS,
  Q2_LEVEL_2_QUIZ,
  Q2_L2_HW1_QUESTIONS,
  BALANCING_CHALLENGES,
  FORMULA_PRESETS,
} from '../../data/chemistryData.js';
import {
  parseChemicalFormula,
  evaluateChemicalEquationBalance,
} from '../../game/chemistryRules.js';
import { evaluateMastery } from '../../game/rules.js';
import { soundFx, shuffleArray } from '../../utils/audio.js';
import { LessonVideoModal } from '../LessonVideoModal.js';
import { Quarter2VideoPlayer } from '../Quarter2VideoPlayer.js';

interface ChemicalEquationsLevelProps {
  onAwardPoints: (pts: number) => void;
  onCompleteQuiz: (levelNum: number, score: number, passed: boolean) => void;
  onNarrate: (text: string) => void;
  onSimulationComplete: () => void;
}

export const ChemicalEquationsLevel: React.FC<ChemicalEquationsLevelProps> = ({
  onAwardPoints,
  onCompleteQuiz,
  onNarrate,
  onSimulationComplete,
}) => {
  const [activeTab, setActiveTab] = useState<
    'subscripts' | 'formula_counter' | 'balancer' | 'closed_system' | 'homework' | 'video_lesson' | 'quiz'
  >('subscripts');

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);

  // Formula Atom Counter state
  const [formulaInput, setFormulaInput] = useState('(CH3)2N');
  const parsedAtoms = parseChemicalFormula(formulaInput);
  const totalAtomsInFormula = Object.values(parsedAtoms).reduce((acc, n) => acc + n, 0);

  // Equation Balancer state
  const [challengeIdx, setChallengeIdx] = useState(0);
  const challenge = BALANCING_CHALLENGES[challengeIdx];
  const [rCoeffs, setRCoeffs] = useState<number[]>(() => challenge.reactants.map(() => 1));
  const [pCoeffs, setPCoeffs] = useState<number[]>(() => challenge.products.map(() => 1));
  const [solvedEquations, setSolvedEquations] = useState<Record<string, boolean>>({});

  const balanceResult = evaluateChemicalEquationBalance(
    challenge.reactants,
    challenge.products,
    rCoeffs,
    pCoeffs
  );

  useEffect(() => {
    if (balanceResult.isBalanced && !solvedEquations[challenge.id]) {
      setSolvedEquations((prev) => ({ ...prev, [challenge.id]: true }));
      soundFx.playCorrect();
      onAwardPoints(20);
      onSimulationComplete();
      onNarrate(`${challenge.title} is perfectly balanced! Every element is conserved across reactants and products.`);
    }
  }, [balanceResult.isBalanced, challenge.id, challenge.title, solvedEquations, onAwardPoints, onSimulationComplete, onNarrate]);

  const selectChallenge = (idx: number) => {
    soundFx.playClick();
    setChallengeIdx(idx);
    const next = BALANCING_CHALLENGES[idx];
    setRCoeffs(next.reactants.map(() => 1));
    setPCoeffs(next.products.map(() => 1));
  };

  // Closed vs Open Flask state (PDF Lesson 2 Phenomenon: 55 g sealed vs open)
  const [flaskReacted, setFlaskReacted] = useState(false);
  const [balloonSealed, setBalloonSealed] = useState(true);

  const measuredMassG = !flaskReacted ? 55.0 : balloonSealed ? 55.0 : 50.8;

  // W2 HW1D4U4L2 Homework state (10 source-extracted questions)
  const [hwIndex, setHwIndex] = useState(0);
  const [hwSelections, setHwSelections] = useState<Record<string, number>>({});
  const [hwSubmitted, setHwSubmitted] = useState<Record<string, boolean>>({});
  const [hwAwardedBonus, setHwAwardedBonus] = useState(false);

  const currentHw = Q2_L2_HW1_QUESTIONS[hwIndex];
  const hwSubmittedCount = Object.keys(hwSubmitted).length;
  const hwCorrectCount = Q2_L2_HW1_QUESTIONS.filter(
    (q) => hwSubmitted[q.id] && hwSelections[q.id] === q.correctAnswer
  ).length;
  const hwAllSubmitted = hwSubmittedCount === Q2_L2_HW1_QUESTIONS.length;
  const currentHwBreakdown = parseChemicalFormula(currentHw.formula);

  const handleSubmitHwQuestion = () => {
    const chosen = hwSelections[currentHw.id];
    if (chosen === undefined || hwSubmitted[currentHw.id]) return;
    const isCorrect = chosen === currentHw.correctAnswer;
    const nextSubmitted = { ...hwSubmitted, [currentHw.id]: true };
    setHwSubmitted(nextSubmitted);
    if (isCorrect) {
      soundFx.playCorrect();
      onAwardPoints(10);
    } else {
      soundFx.playIncorrect();
    }

    const totalDone = Object.keys(nextSubmitted).length;
    if (totalDone === Q2_L2_HW1_QUESTIONS.length && !hwAwardedBonus) {
      const totalRight = Q2_L2_HW1_QUESTIONS.filter(
        (q) => nextSubmitted[q.id] && hwSelections[q.id] === q.correctAnswer
      ).length;
      if (totalRight >= 8) {
        setHwAwardedBonus(true);
        soundFx.playFanfare();
        onAwardPoints(30);
        onSimulationComplete();
      }
      onNarrate(
        `W2 Homework complete! You scored ${totalRight} out of ${Q2_L2_HW1_QUESTIONS.length} on counting atoms in chemical formulas.`
      );
    }
  };

  const handleResetHomework = () => {
    soundFx.playClick();
    setHwIndex(0);
    setHwSelections({});
    setHwSubmitted({});
  };

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
    Q2_LEVEL_2_QUIZ.forEach((q) => {
      map[q.id] = shuffleArray(q.options.map((text, idx) => ({ text, originalIndex: idx })));
    });
    setShuffledOptions(map);
  }, [quizAttempt]);

  const handleSubmitQuiz = () => {
    soundFx.playClick();
    let score = 0;
    Q2_LEVEL_2_QUIZ.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) score++;
    });
    setQuizScore(score);
    setSubmittedQuiz(true);
    const mastery = evaluateMastery(score, Q2_LEVEL_2_QUIZ.length);
    if (mastery.passed) {
      soundFx.playFanfare();
      onAwardPoints(score * 20 + 50);
    } else {
      soundFx.playIncorrect();
    }
    onCompleteQuiz(2, mastery.percentage, mastery.passed);
    onNarrate(
      `Quarter 2 Level 2 quiz complete. You scored ${score} out of ${Q2_LEVEL_2_QUIZ.length}, or ${mastery.percentage} percent.`
    );
  };

  const tabs = [
    { id: 'subscripts', label: '1. Subscripts vs. Coefficients', icon: Atom },
    { id: 'formula_counter', label: '2. Formula Atom Counter', icon: FlaskConical },
    { id: 'balancer', label: '3. Equation Balancer', icon: Scale },
    { id: 'closed_system', label: '4. Closed vs. Open Flask', icon: Sparkles },
    { id: 'homework', label: '5. W2 Homework (10 Qs)', icon: ClipboardCheck },
    { id: 'video_lesson', label: '6. 🎬 Lesson Video', icon: Play },
    { id: 'quiz', label: '7. Mastery Assessment', icon: CheckCircle2 },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-32 space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-cyan-950/90 via-slate-900 to-slate-950 border border-cyan-500/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
              <span>Quarter 2 · Level 2 Expedition</span>
              <span>•</span>
              <span>Chemical Equations & Conservation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Chemical Formulas, Balancing & Conservation of Matter
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Decode subscripts and parentheses in complex formulas, balance chemical equations using coefficients only, and verify why sealed systems keep total mass constant.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('homework');
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-900/30 flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>W2 Homework (10 Qs)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setIsVideoModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-900/40 flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
            >
              <span>🎬 Watch Lesson Explanation</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quiz');
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-900/40 flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
            >
              <span>Take Level 2 Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  active
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: SUBSCRIPTS VS COEFFICIENTS */}
      {activeTab === 'subscripts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-slate-900/80 border border-amber-500/30 p-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Subscript = Identity (What it is)
            </div>
            <div className="text-4xl font-black text-white font-mono">
              O<sub className="text-amber-400">2</sub>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              The small number written below and to the right of an element symbol dictates molecular identity: <strong>2 oxygen atoms bonded permanently into 1 molecule</strong>.
            </p>
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
              <strong>Golden Rule:</strong> Never change, add, or remove subscripts when balancing an equation—changing H₂O to H₂O₂ turns water into hydrogen peroxide!
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Coefficient = Quantity (How many)
            </div>
            <div className="text-4xl font-black text-white font-mono">
              <span className="text-cyan-400">2</span>O<sub>2</sub>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              The large whole number placed in front of a formula scales the quantity of molecules participating—<strong>2 separate O₂ molecules = 4 oxygen atoms total</strong>.
            </p>
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
              <strong>Example from Lesson 2 Q9:</strong> In H₂ + Cl₂ → <strong>2</strong>HCl, the coefficient 2 applies to the entire compound, yielding 2 H atoms and 2 Cl atoms.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FORMULA ATOM COUNTER */}
      {activeTab === 'formula_counter' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Exploration 1 • Interactive Parser (Pages 4–6)
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Chemical Formula & Parentheses Atom Counter
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Click any official Unit 4 preset or type a formula with parentheses and coefficients (like <code className="text-cyan-300">2Fe(OH)3</code> or <code className="text-cyan-300">Ca3Al2(SiO4)3</code>).
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FORMULA_PRESETS.map((preset) => (
              <button
                key={preset.formula}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setFormulaInput(preset.formula);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                  formulaInput === preset.formula
                    ? 'bg-cyan-600/30 border-cyan-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                {preset.formula} <span className="font-sans font-normal text-slate-400">({preset.name})</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <label htmlFor="formula-input" className="text-xs font-bold text-slate-300 block">
                Chemical Formula Input
              </label>
              <input
                id="formula-input"
                type="text"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                placeholder="e.g. Al2(SO4)3 or 2Fe(OH)3"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
              />
              {FORMULA_PRESETS.find((p) => p.formula === formulaInput) && (
                <p className="text-xs text-cyan-300">
                  Source Note: {FORMULA_PRESETS.find((p) => p.formula === formulaInput)?.note}
                </p>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Atom Inventory
                </span>
                <span className="text-xs font-bold text-emerald-400 tabular-nums">
                  Total Atoms: {totalAtomsInFormula}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.entries(parsedAtoms).map(([el, count]) => (
                  <div
                    key={el}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                  >
                    <span className="font-mono font-black text-cyan-300 text-base">{el}</span>
                    <span className="font-mono font-bold text-white text-base tabular-nums">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE EQUATION BALANCING STUDIO */}
      {activeTab === 'balancer' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Interactive Stoichiometry Studio
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Balance Chemical Equations (Coefficients Only)
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-400 tabular-nums">
              {Object.keys(solvedEquations).length} / {BALANCING_CHALLENGES.length} Balanced
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {BALANCING_CHALLENGES.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => selectChallenge(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                  idx === challengeIdx
                    ? 'bg-cyan-600/30 border-cyan-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                {solvedEquations[ch.id] && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{ch.title}</span>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>{challenge.context}</span>
              <span className="font-mono text-slate-500">{challenge.pdfReference}</span>
            </div>

            {/* Interactive Equation Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 py-4">
              {challenge.reactants.map((sp, idx) => (
                <React.Fragment key={`r-${sp.formula}`}>
                  {idx > 0 && <span className="text-xl font-black text-slate-500">+</span>}
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-2xl px-3 py-2">
                    <button
                      type="button"
                      aria-label={`Decrease coefficient for ${sp.formula}`}
                      onClick={() => {
                        soundFx.playClick();
                        setRCoeffs((prev) => prev.map((v, i) => (i === idx ? Math.max(1, v - 1) : v)));
                      }}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-center min-w-[68px]">
                      <div className="font-mono text-lg font-black text-white">
                        <span className="text-cyan-400">{rCoeffs[idx]}</span> {sp.formula}
                      </div>
                      <div className="text-[10px] text-slate-400">{sp.name}</div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Increase coefficient for ${sp.formula}`}
                      onClick={() => {
                        soundFx.playClick();
                        setRCoeffs((prev) => prev.map((v, i) => (i === idx ? Math.min(8, v + 1) : v)));
                      }}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </React.Fragment>
              ))}

              <span className="text-2xl font-black text-amber-400 px-2">→</span>

              {challenge.products.map((sp, idx) => (
                <React.Fragment key={`p-${sp.formula}`}>
                  {idx > 0 && <span className="text-xl font-black text-slate-500">+</span>}
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-2xl px-3 py-2">
                    <button
                      type="button"
                      aria-label={`Decrease coefficient for ${sp.formula}`}
                      onClick={() => {
                        soundFx.playClick();
                        setPCoeffs((prev) => prev.map((v, i) => (i === idx ? Math.max(1, v - 1) : v)));
                      }}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-center min-w-[68px]">
                      <div className="font-mono text-lg font-black text-white">
                        <span className="text-amber-400">{pCoeffs[idx]}</span> {sp.formula}
                      </div>
                      <div className="text-[10px] text-slate-400">{sp.name}</div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Increase coefficient for ${sp.formula}`}
                      onClick={() => {
                        soundFx.playClick();
                        setPCoeffs((prev) => prev.map((v, i) => (i === idx ? Math.min(8, v + 1) : v)));
                      }}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Live Atom Tally Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {balanceResult.elementStatus.map((row) => (
                <div
                  key={row.element}
                  className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                    row.balanced
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/25 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <span className="font-black text-sm">{row.element}</span>
                  <span className="tabular-nums">
                    Reactants: <strong>{row.reactants}</strong> {row.balanced ? '=' : '≠'} Products: <strong>{row.products}</strong>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div
                className={`text-xs font-bold flex items-center gap-2 ${
                  balanceResult.isBalanced ? 'text-emerald-400' : 'text-amber-300'
                }`}
              >
                {balanceResult.isBalanced ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>LAW OF CONSERVATION OF MATTER VERIFIED — PERFECTLY BALANCED!</span>
                  </>
                ) : (
                  <span>Adjust coefficients until Reactant atoms equal Product atoms for every element.</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setRCoeffs([...challenge.solutionReactants]);
                  setPCoeffs([...challenge.solutionProducts]);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer"
              >
                Show Balanced Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CLOSED VS OPEN FLASK CONSERVATION LAB */}
      {activeTab === 'closed_system' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Lesson 2 Phenomenon • Page 6
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Closed System vs. Open System Digital Balance Lab
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Equation: <code className="text-cyan-300">NaHCO₃ + C₂H₄O₂ → NaC₂H₃O₂ + H₂O + CO₂(g)</code>. Compare total mass when the balloon seals the flask versus when the balloon is removed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Digital Lab Balance Readout
              </div>
              <div className="inline-block px-8 py-4 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 font-mono text-4xl font-black text-emerald-400 tabular-nums">
                {measuredMassG.toFixed(1)} g
              </div>
              <div className="text-xs text-slate-300">
                System Boundary:{' '}
                <strong className={balloonSealed ? 'text-emerald-300' : 'text-amber-300'}>
                  {balloonSealed ? 'CLOSED (Balloon Sealed)' : 'OPEN (Balloon Removed)'}
                </strong>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playStep();
                    setFlaskReacted(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
                >
                  {flaskReacted ? 'Reaction Running (CO₂ Formed)' : 'Drop 8 g Baking Soda into Vinegar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setBalloonSealed((b) => !b);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold cursor-pointer"
                >
                  {balloonSealed ? 'Remove Balloon (Open System)' : 'Seal with Balloon (Closed System)'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setFlaskReacted(false);
                    setBalloonSealed(true);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 text-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                <strong className="text-emerald-300 block mb-1">Closed System (55.0 g → 55.0 g)</strong>
                The balloon traps every molecule of gaseous CO₂ produced. Because no atoms enter or escape, total mass remains mathematically identical.
              </div>
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                <strong className="text-amber-300 block mb-1">Open System (55.0 g → 50.8 g)</strong>
                When the balloon is removed, 4.2 g of carbon dioxide gas diffuses into room air. No atoms were destroyed—they simply crossed the system boundary!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: W2 HW1D4U4L2 HOMEWORK (10 SOURCE-EXTRACTED QUESTIONS) */}
      {activeTab === 'homework' && (
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/30 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <span>W2 HW1D4U4L2</span>
                <span aria-hidden="true">•</span>
                <span className="text-slate-300">Unit 4, Lesson 2 Homework</span>
                <span aria-hidden="true">•</span>
                <span className="text-cyan-300">10 Source Questions</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Counting Atoms in Chemical Formulas Practice
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right text-xs tabular-nums">
                <div className="font-bold text-white">
                  {hwCorrectCount} / {Q2_L2_HW1_QUESTIONS.length} Correct
                </div>
                <div className="text-slate-400">
                  {hwSubmittedCount} of {Q2_L2_HW1_QUESTIONS.length} Submitted
                </div>
              </div>
              {hwSubmittedCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetHomework}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator Strip (1 of 10 .. 10 of 10) */}
          <div className="flex flex-wrap items-center gap-2" aria-label="Homework question navigator">
            {Q2_L2_HW1_QUESTIONS.map((q, idx) => {
              const isCurrent = idx === hwIndex;
              const isSub = !!hwSubmitted[q.id];
              const isRight = isSub && hwSelections[q.id] === q.correctAnswer;
              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600';
              if (isCurrent) {
                btnStyle = 'bg-amber-500 border-amber-400 text-slate-950 font-black shadow-md';
              } else if (isSub && isRight) {
                btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
              } else if (isSub && !isRight) {
                btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-300';
              }
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setHwIndex(idx);
                  }}
                  className={`w-9 h-9 rounded-xl border text-xs font-bold tabular-nums transition cursor-pointer ${btnStyle}`}
                >
                  {q.questionNumber}
                </button>
              );
            })}
          </div>

          {/* Active Question Card */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-amber-300 tabular-nums">
                {currentHw.assignmentCode} · {currentHw.questionNumber} of {Q2_L2_HW1_QUESTIONS.length}
              </span>
              <span className="text-slate-400 font-mono">
                PDF Page {currentHw.pdfPage} of 10
              </span>
            </div>

            <div className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentHw.question}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentHw.options.map((opt, optIdx) => {
                const isSelected = hwSelections[currentHw.id] === optIdx;
                const isSubmitted = !!hwSubmitted[currentHw.id];
                const isCorrectOpt = optIdx === currentHw.correctAnswer;

                let optClass =
                  'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-400/70';
                if (isSubmitted) {
                  if (isCorrectOpt) {
                    optClass = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    optClass = 'bg-rose-950/50 border-rose-500 text-rose-200';
                  } else {
                    optClass = 'bg-slate-900/50 border-slate-800 text-slate-500';
                  }
                } else if (isSelected) {
                  optClass = 'bg-amber-500/20 border-amber-400 text-white font-bold';
                }

                return (
                  <button
                    key={`${currentHw.id}-${opt}`}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => {
                      soundFx.playClick();
                      setHwSelections((prev) => ({ ...prev, [currentHw.id]: optIdx }));
                    }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-left text-sm transition cursor-pointer ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400 text-slate-950'
                            : 'border-slate-600 text-slate-400'
                        }`}
                      >
                        {isSelected ? '●' : ''}
                      </span>
                      <span className="font-mono text-base">{opt}</span>
                    </div>
                    {isSubmitted && isCorrectOpt && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrectOpt && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Live Atom Breakdown (revealed ONLY after Submit Answer) */}
            {hwSubmitted[currentHw.id] && (
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  hwSelections[currentHw.id] === currentHw.correctAnswer
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : 'bg-rose-950/30 border-rose-500/40'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`text-xs font-extrabold uppercase tracking-wider ${
                      hwSelections[currentHw.id] === currentHw.correctAnswer
                        ? 'text-emerald-300'
                        : 'text-rose-300'
                    }`}
                  >
                    {hwSelections[currentHw.id] === currentHw.correctAnswer
                      ? 'Correct (+10 XP)'
                      : `Incorrect — Verified Answer: ${currentHw.options[currentHw.correctAnswer]}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setFormulaInput(currentHw.formula);
                      setActiveTab('formula_counter');
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-semibold text-cyan-300 cursor-pointer"
                  >
                    Inspect {currentHw.formula} in Formula Counter →
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentHw.explanation}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Full Atom Count ({currentHw.formula}):
                  </span>
                  {Object.entries(currentHwBreakdown).map(([el, cnt]) => (
                    <span
                      key={el}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border tabular-nums ${
                        el === currentHw.targetElement
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      {el}: {cnt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation & Submit Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                disabled={hwIndex === 0}
                onClick={() => {
                  soundFx.playClick();
                  setHwIndex((i) => Math.max(0, i - 1));
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {!hwSubmitted[currentHw.id] ? (
                <button
                  type="button"
                  disabled={hwSelections[currentHw.id] === undefined}
                  onClick={handleSubmitHwQuestion}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm transition cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : (
                <span className="text-xs font-semibold text-slate-400">
                  Answer recorded · Use Next or jump strip to continue
                </span>
              )}

              <button
                type="button"
                disabled={hwIndex === Q2_L2_HW1_QUESTIONS.length - 1}
                onClick={() => {
                  soundFx.playClick();
                  setHwIndex((i) => Math.min(Q2_L2_HW1_QUESTIONS.length - 1, i + 1));
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Final Homework Completion Summary */}
          {hwAllSubmitted && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  W2 HW1D4U4L2 Complete
                </div>
                <div className="text-lg font-extrabold text-white mt-0.5 tabular-nums">
                  Final Score: {hwCorrectCount} / {Q2_L2_HW1_QUESTIONS.length} (
                  {Math.round((hwCorrectCount / Q2_L2_HW1_QUESTIONS.length) * 100)}%)
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Click any question number above to review your answers and full atom breakdowns.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetHomework}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white cursor-pointer"
              >
                Practice Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: INLINE VIDEO LESSON */}
      {activeTab === 'video_lesson' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Unit 4 Narrated Video Explainer • Jump to 1:54 or 3:01
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Chemical Equations, Subscripts & Conservation of Matter
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {Q2_VIDEO_CHAPTERS.map((ch) => (
                <button
                  key={ch.label}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    if (inlineVideoRef.current) {
                      inlineVideoRef.current.currentTime = ch.timeSeconds;
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold text-slate-200 cursor-pointer"
                >
                  {ch.timeDisplay} · {ch.label}
                </button>
              ))}
            </div>
          </div>

          <Quarter2VideoPlayer
            defaultSrc={Q2_VIDEO_URL}
            title="Chemical Equations, Subscripts & Conservation of Matter"
            initialTimeSeconds={114}
            videoRef={inlineVideoRef}
          />
        </div>
      )}

      {/* TAB 6: LEVEL 2 MASTERY QUIZ */}
      {activeTab === 'quiz' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Quarter 2 · Level 2 Mastery Check (Target: 80%)
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Chemical Equations & Conservation Assessment
              </h2>
            </div>
            {submittedQuiz && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-emerald-400 tabular-nums">
                  Score: {quizScore}/{Q2_LEVEL_2_QUIZ.length} ({Math.round((quizScore / Q2_LEVEL_2_QUIZ.length) * 100)}%)
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
            {Q2_LEVEL_2_QUIZ.map((q, idx) => {
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
                      let cls = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-400';
                      if (submittedQuiz) {
                        if (isRight) cls = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                        else if (isChosen) cls = 'bg-rose-950/50 border-rose-500 text-rose-200';
                      } else if (isChosen) {
                        cls = 'bg-cyan-600/25 border-cyan-400 text-white';
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
                      <strong className="text-cyan-300">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submittedQuiz && (
            <button
              type="button"
              disabled={Object.keys(quizAnswers).length < Q2_LEVEL_2_QUIZ.length}
              onClick={handleSubmitQuiz}
              className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm transition cursor-pointer"
            >
              Submit Level 2 Mastery Assessment ({Object.keys(quizAnswers).length}/{Q2_LEVEL_2_QUIZ.length} Answered)
            </button>
          )}
        </div>
      )}

      {/* Lesson Video Modal */}
      <LessonVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Chemical Equations & Conservation of Matter"
        topic="Subscripts, Coefficients, Methane & Propane Atom Tallies"
        videoSrc={Q2_VIDEO_URL}
        chapters={Q2_VIDEO_CHAPTERS}
        initialTimeSeconds={114}
        levelNumber={2}
        quarterLabel="Quarter 2 • Physical Science"
        accentColor="cyan"
        description="Explore how chemical equations map molecular rearrangements, why subscripts cannot be altered when balancing, and how atom tallies prove the Law of Conservation of Matter."
        keyTopics={[
          'Reactants → Products',
          'Subscripts vs. Coefficients',
          'CH₄ + 2O₂ → CO₂ + 2H₂O',
          'Propane & Closed Systems',
        ]}
        onGoToQuiz={() => setActiveTab('quiz')}
      />
    </div>
  );
};
