/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Quarter-Aware Complete File-Based Master Assessment Quiz
 * - Quarter 1: biological_reproduction_quiz_qa_c86aff08.pdf (17 Pages, 11 Modules, 96 Questions)
 * - Quarter 2: chemical-processes-grade-6-study-guide_22b91fa8.pdf (10 Pages, 4 Modules, 61 Questions)
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Layers,
  BookOpen,
  Filter,
  Check,
} from 'lucide-react';
import { MASTER_MODULES, MASTER_QUIZ_QUESTIONS } from '../data/masterQuizData.js';
import { Q2_MASTER_MODULES, Q2_MASTER_QUIZ_QUESTIONS } from '../data/quarter2MasterQuizData.js';
import { evaluateMasterAnswer, evaluateMastery } from '../game/rules.js';
import { soundFx, shuffleArray } from '../utils/audio.js';
import confetti from 'canvas-confetti';

interface MasterQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardPoints: (pts: number) => void;
  onNarrate: (text: string) => void;
  quarter?: 1 | 2;
}

export const MasterQuizModal: React.FC<MasterQuizModalProps> = ({
  isOpen,
  onClose,
  onAwardPoints,
  onNarrate,
  quarter = 1,
}) => {
  const isQuarter2 = quarter === 2;
  const activeModules = isQuarter2 ? Q2_MASTER_MODULES : MASTER_MODULES;
  const activeQuestions = isQuarter2 ? Q2_MASTER_QUIZ_QUESTIONS : MASTER_QUIZ_QUESTIONS;
  const totalPages = isQuarter2 ? 10 : 17;

  // Navigation & Filtering
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<number>(0); // 0 = All Questions
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);

  // Student Responses: QuestionId -> Answer
  const [studentAnswers, setStudentAnswers] = useState<Record<string, any>>({});
  // QuestionId -> Submitted status
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  // Randomized option orders: QuestionId -> Shuffled options array
  const [randomizedOptions, setRandomizedOptions] = useState<Record<string, string[]>>({});

  // Final Results view
  const [showResults, setShowResults] = useState<boolean>(false);
  const [attemptSeed, setAttemptSeed] = useState<number>(1);

  // Filtered question set
  const filteredQuestions = useMemo(() => {
    if (selectedModuleFilter === 0) return activeQuestions;
    return activeQuestions.filter((q) => q.moduleNumber === selectedModuleFilter);
  }, [selectedModuleFilter, activeQuestions]);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Initialize/reshuffle options independently per question attempt using Fisher-Yates
  useEffect(() => {
    const newShuffled: Record<string, string[]> = {};
    activeQuestions.forEach((q) => {
      if (q.options && q.options.length > 0) {
        newShuffled[q.id] = shuffleArray(q.options);
      }
    });
    setRandomizedOptions(newShuffled);
  }, [attemptSeed, activeQuestions]);

  // Read current question with calm male instructor voice
  const handleReadQuestion = () => {
    if (!currentQ) return;
    const textToRead = `${currentQ.question}. ${
      currentQ.options ? 'Options are: ' + (randomizedOptions[currentQ.id] || currentQ.options).join(', ') : ''
    }`;
    soundFx.speak(textToRead);
    onNarrate(currentQ.question);
  };

  const handleSelectAnswer = (ans: any) => {
    if (submittedQuestions[currentQ.id]) return;
    soundFx.playClick();
    setStudentAnswers((prev) => ({ ...prev, [currentQ.id]: ans }));
  };

  const handleSubmitCurrentAnswer = () => {
    if (studentAnswers[currentQ.id] === undefined) return;
    soundFx.playClick();
    setSubmittedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));

    const evalResult = evaluateMasterAnswer(
      currentQ.type,
      currentQ.correctAnswer,
      studentAnswers[currentQ.id],
      currentQ.points
    );

    if (evalResult.isCorrect) {
      soundFx.playCorrect();
      onAwardPoints(evalResult.scoreAwarded);
    } else {
      soundFx.playIncorrect();
    }

    if (currentQ.explanation) {
      onNarrate(currentQ.explanation);
    }
  };

  // Multiple Select toggle
  const handleToggleMultipleSelect = (opt: string) => {
    if (submittedQuestions[currentQ.id]) return;
    soundFx.playClick();
    const currentList: string[] = studentAnswers[currentQ.id] || [];
    const updated = currentList.includes(opt)
      ? currentList.filter((x) => x !== opt)
      : [...currentList, opt];
    setStudentAnswers((prev) => ({ ...prev, [currentQ.id]: updated }));
  };

  // Multi Yes/No toggle
  const handleSetYesNo = (feature: string, val: string) => {
    if (submittedQuestions[currentQ.id]) return;
    soundFx.playClick();
    const currentObj = studentAnswers[currentQ.id] || {};
    setStudentAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { ...currentObj, [feature]: val },
    }));
  };

  // Matching selection
  const handleSetMatch = (term: string, letter: string) => {
    if (submittedQuestions[currentQ.id]) return;
    soundFx.playClick();
    const currentObj = studentAnswers[currentQ.id] || {};
    setStudentAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { ...currentObj, [term]: letter },
    }));
  };

  // Ordering step swap
  const handleMoveOrder = (fromIdx: number, toIdx: number) => {
    if (submittedQuestions[currentQ.id]) return;
    soundFx.playClick();
    const currentSeq: number[] = studentAnswers[currentQ.id] || [1, 2, 3, 4];
    const updated = [...currentSeq];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setStudentAnswers((prev) => ({ ...prev, [currentQ.id]: updated }));
  };

  // Restart quiz with fresh Fisher-Yates shuffle
  const handleRestartQuiz = () => {
    soundFx.playClick();
    setStudentAnswers({});
    setSubmittedQuestions({});
    setShowResults(false);
    setCurrentIndex(0);
    setAttemptSeed((prev) => prev + 1);
  };

  // Calculate overall performance
  const performanceStats = useMemo(() => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    let correctCount = 0;
    let answeredCount = 0;

    activeQuestions.forEach((q) => {
      maxPossibleScore += q.points;
      const ans = studentAnswers[q.id];
      if (ans !== undefined) {
        answeredCount++;
        const evalResult = evaluateMasterAnswer(q.type, q.correctAnswer, ans, q.points);
        totalScore += evalResult.scoreAwarded;
        if (evalResult.isCorrect) correctCount++;
      }
    });

    const percent = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    const mastery = evaluateMastery(correctCount, activeQuestions.length);

    return {
      totalScore,
      maxPossibleScore,
      correctCount,
      answeredCount,
      percent,
      mastery,
    };
  }, [studentAnswers, activeQuestions]);

  const handleFinishQuiz = () => {
    soundFx.playFanfare();
    setShowResults(true);
    if (performanceStats.percent >= 80) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  if (!isOpen || !currentQ) return null;

  const isCurrentSubmitted = submittedQuestions[currentQ.id] || false;
  const currentAnswer = studentAnswers[currentQ.id];
  const currentEval = evaluateMasterAnswer(
    currentQ.type,
    currentQ.correctAnswer,
    currentAnswer,
    currentQ.points
  );

  // Deduplicated letters and definitions for matching questions (supports 2, 3, or 4+ letters cleanly)
  const matchingLetters = currentQ.matchingPairs
    ? Array.from(new Set(currentQ.matchingPairs.map((p) => p.matchLetter))).sort()
    : [];

  const uniqueDefinitions = currentQ.matchingPairs
    ? matchingLetters.map((letter) => {
        const matchesForLetter = currentQ.matchingPairs!.filter((p) => p.matchLetter === letter);
        const rawDef = matchesForLetter[0]?.definition || '';
        const cleanDef =
          matchesForLetter.length > 1
            ? rawDef.replace(/\s*\([^)]*\)\s*$/, '').trim() || rawDef
            : rawDef;
        return { letter, definition: cleanDef };
      })
    : [];

  const accentBorder = isQuarter2 ? 'border-violet-500/40' : 'border-emerald-500/40';
  const accentBtn = isQuarter2
    ? 'bg-violet-600 hover:bg-violet-500 text-white'
    : 'bg-emerald-600 hover:bg-emerald-500 text-white';
  const accentChip = isQuarter2
    ? 'bg-violet-500/20 text-violet-300 border-violet-500/40'
    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  const accentActiveTab = isQuarter2
    ? 'bg-violet-600 text-white shadow-sm'
    : 'bg-emerald-600 text-white shadow-sm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`bg-slate-900 border ${accentBorder} rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-white`}
      >
        {/* Header Bar */}
        <div className="px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl bg-gradient-to-tr flex items-center justify-center font-bold text-lg shadow-md ${
                isQuarter2
                  ? 'from-violet-500 to-purple-600 shadow-violet-600/20'
                  : 'from-emerald-500 to-teal-600 shadow-emerald-600/20'
              }`}
            >
              {isQuarter2 ? '⚗️' : '📝'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  {isQuarter2
                    ? 'Quarter 2: Chemical Processes & Equations Quiz'
                    : 'Biological Reproduction Assessment Quiz'}
                </h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border tabular-nums ${accentChip}`}>
                  All {activeQuestions.length} Questions • {totalPages} Pages
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isQuarter2 ? (
                  <>
                    Extracted from{' '}
                    <code className="text-violet-300">chemical-processes-grade-6-study-guide_22b91fa8.pdf</code> (HMH
                    Unit 4 Study Guide &amp; Master Answer Key)
                  </>
                ) : (
                  <>
                    Extracted from{' '}
                    <code className="text-emerald-400">biological_reproduction_quiz_qa_c86aff08.pdf</code> (Sources
                    S1.jpeg – S33.jpeg)
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuestionGrid(!showQuestionGrid)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                showQuestionGrid
                  ? isQuarter2
                    ? 'bg-violet-600 text-white border-violet-500'
                    : 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Show Question Navigator Grid"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline tabular-nums">Questions ({activeQuestions.length})</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="p-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Restart Master Quiz & Reshuffle Choices"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close Quiz"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Module Selector Toolbar */}
        <div className="px-6 py-2.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3 overflow-x-auto flex-shrink-0 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Module:
            </span>
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedModuleFilter(0);
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedModuleFilter === 0
                  ? accentActiveTab
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All {activeQuestions.length} Qs
            </button>
            {activeModules.map((m) => (
              <button
                key={m.num}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedModuleFilter(m.num);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedModuleFilter === m.num
                    ? accentActiveTab
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={`${m.title} (${m.pages})`}
              >
                M{m.num} ({m.questionCount})
              </button>
            ))}
          </div>

          <div
            className={`text-[11px] font-mono font-bold whitespace-nowrap tabular-nums ${
              isQuarter2 ? 'text-violet-300' : 'text-emerald-400'
            }`}
          >
            Answered: {Object.keys(submittedQuestions).length} / {activeQuestions.length}
          </div>
        </div>

        {/* Question Navigator Grid Drawer */}
        {showQuestionGrid && (
          <div className="p-4 bg-slate-950 border-b border-slate-800 max-h-48 overflow-y-auto flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Question Index Navigator (Click to Jump)
              </span>
              <span className="text-[11px] text-slate-500">
                Green = Submitted • Blue = Draft Answer • Gray = Unanswered
              </span>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-1.5">
              {filteredQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isSub = submittedQuestions[q.id];
                const hasDraft = studentAnswers[q.id] !== undefined;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      soundFx.playStep();
                      setCurrentIndex(idx);
                      setShowQuestionGrid(false);
                    }}
                    className={`h-7 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center border cursor-pointer ${
                      isCurrent ? 'ring-2 ring-emerald-400 border-white' : ''
                    } ${
                      isSub
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                        : hasDraft
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                    title={`${q.moduleTitle} — Q${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Quiz Body */}
        {!showResults ? (
          <div className="p-6 overflow-y-auto flex-1 space-y-5">
            {/* Question Header Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                      isQuarter2
                        ? 'text-violet-300 bg-violet-950/80 border-violet-800/40'
                        : 'text-emerald-400 bg-emerald-950/80 border-emerald-800/40'
                    }`}
                  >
                    {currentQ.moduleTitle}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    PDF Page {currentQ.page} of {totalPages} • {currentQ.sourceDoc}
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/40">
                    {currentQ.points} Pts
                  </span>
                </div>
                <div className="text-xs text-slate-400 tabular-nums">
                  Question <strong className="text-white">{currentIndex + 1}</strong> of{' '}
                  <strong className="text-white">{filteredQuestions.length}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReadQuestion}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
                  title="Read question using calm instructor voice"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Listen</span>
                </button>
              </div>
            </div>

            {/* Visual Attachment / Image Reference */}
            {currentQ.imageNote && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 flex items-center gap-2">
                <span className="text-lg">📷</span>
                <span>
                  <strong>Visual Reference from Source Document:</strong> {currentQ.imageNote}
                </span>
              </div>
            )}

            {/* Question Text */}
            <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </div>

            {/* 1. Multiple Choice / Fill Blank / Flowchart / Crop Engineering / Punnett Practice */}
            {(currentQ.type === 'multiple_choice' ||
              currentQ.type === 'fill_blank' ||
              currentQ.type === 'flowchart' ||
              currentQ.type === 'crop_engineering' ||
              currentQ.type === 'punnett_practice') && (
              <div className="space-y-2.5">
                {(randomizedOptions[currentQ.id] || currentQ.options || []).map((opt, optIdx) => {
                  const isSelected = currentAnswer === opt;
                  const isCorrect = opt === currentQ.correctAnswer;

                  let style =
                    'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';
                  if (isCurrentSubmitted) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-white font-bold ring-1 ring-emerald-500/50';
                    } else if (isSelected) {
                      style = 'bg-red-950/80 border-red-500 text-red-200 ring-1 ring-red-500/50';
                    } else {
                      style = 'bg-slate-950/50 border-slate-900 text-slate-500';
                    }
                  } else if (isSelected) {
                    style = isQuarter2
                      ? 'bg-violet-900/60 border-violet-400 text-white font-bold ring-1 ring-violet-400'
                      : 'bg-emerald-900/60 border-emerald-500 text-white font-bold ring-1 ring-emerald-500';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isCurrentSubmitted}
                      onClick={() => handleSelectAnswer(opt)}
                      className={`w-full p-4 rounded-2xl text-xs sm:text-sm text-left border flex items-center justify-between gap-3 transition cursor-pointer ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isCurrentSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {isCurrentSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. True or False */}
            {currentQ.type === 'true_false' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(currentQ.options || ['The whole statement is true.', 'Some of the statement is false.']).map(
                  (opt, i) => {
                    const isSelected = currentAnswer === opt;
                    const isCorrect = opt === currentQ.correctAnswer;

                    let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800';
                    if (isCurrentSubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-950/80 border-emerald-500 text-white font-bold';
                      } else if (isSelected) {
                        style = 'bg-red-950/80 border-red-500 text-red-200';
                      }
                    } else if (isSelected) {
                      style = isQuarter2
                        ? 'bg-violet-900/60 border-violet-400 text-white font-bold'
                        : 'bg-emerald-900/60 border-emerald-500 text-white font-bold';
                    }

                    return (
                      <button
                        key={i}
                        disabled={isCurrentSubmitted}
                        onClick={() => handleSelectAnswer(opt)}
                        className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {isCurrentSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  }
                )}
              </div>
            )}

            {/* 3. Multiple Select */}
            {currentQ.type === 'multiple_select' && (
              <div className="space-y-2.5">
                <div className="text-xs text-amber-300 font-semibold mb-2">Select all choices that apply:</div>
                {currentQ.options?.map((opt, idx) => {
                  const selectedList: string[] = currentAnswer || [];
                  const isChecked = selectedList.includes(opt);
                  const correctList: string[] = (currentQ.correctAnswer as string[]) || [];
                  const isActuallyCorrect = correctList.includes(opt);

                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';
                  if (isCurrentSubmitted) {
                    if (isActuallyCorrect && isChecked) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-white font-bold';
                    } else if (!isActuallyCorrect && isChecked) {
                      style = 'bg-red-950/80 border-red-500 text-red-200';
                    } else if (isActuallyCorrect && !isChecked) {
                      style = 'bg-amber-950/40 border-amber-600/60 text-amber-200';
                    }
                  } else if (isChecked) {
                    style = isQuarter2
                      ? 'bg-violet-900/50 border-violet-400 text-white font-bold'
                      : 'bg-emerald-900/50 border-emerald-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isCurrentSubmitted}
                      onClick={() => handleToggleMultipleSelect(opt)}
                      className={`w-full p-4 rounded-2xl text-xs sm:text-sm text-left border flex items-center justify-between gap-3 transition cursor-pointer ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? isQuarter2
                                ? 'bg-violet-500 border-violet-400 text-white'
                                : 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span>{opt}</span>
                      </div>
                      {isCurrentSubmitted && isActuallyCorrect && (
                        <span className="text-[10px] text-emerald-400 font-bold uppercase shrink-0">Required</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. Multi-Item Yes/No Table */}
            {currentQ.type === 'multi_yes_no' && currentQ.subItems && (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
                      <th className="p-3">Item / Feature</th>
                      <th className="p-3">{isQuarter2 ? 'Scientific Context' : 'Botanical Context'}</th>
                      <th className="p-3">Your Selection</th>
                      {isCurrentSubmitted && <th className="p-3">Verified Status</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {currentQ.subItems.map((item) => {
                      const ansMap = currentAnswer || {};
                      const selectedVal = ansMap[item.feature];

                      return (
                        <tr key={item.feature}>
                          <td className="p-3 font-bold text-white">{item.feature}</td>
                          <td className="p-3 text-slate-300">{item.description}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              {['YES', 'NO'].map((v) => (
                                <button
                                  key={v}
                                  disabled={isCurrentSubmitted}
                                  onClick={() => handleSetYesNo(item.feature, v)}
                                  className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer border ${
                                    selectedVal === v
                                      ? isQuarter2
                                        ? 'bg-violet-600 text-white border-violet-500'
                                        : 'bg-emerald-600 text-white border-emerald-500'
                                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                                  }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </td>
                          {isCurrentSubmitted && (
                            <td className="p-3 font-mono font-bold text-emerald-400">{item.expected}</td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* 5. Matching */}
            {currentQ.type === 'matching' && currentQ.matchingPairs && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400">
                  Match each item to the appropriate letter ({matchingLetters.join(', ')}):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Terms */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Items to Match</h4>
                    {currentQ.matchingPairs.map((p) => {
                      const cleanTerm = p.term.replace(/^\d+\.\s*/, '');
                      const matchMap = currentAnswer || {};
                      const currentSelection = matchMap[cleanTerm];

                      return (
                        <div
                          key={p.term}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2"
                        >
                          <span className="text-xs font-bold text-white">{p.term}</span>
                          <div className="flex gap-1.5 shrink-0">
                            {matchingLetters.map((letter) => (
                              <button
                                key={letter}
                                disabled={isCurrentSubmitted}
                                onClick={() => handleSetMatch(cleanTerm, letter)}
                                className={`w-7 h-7 rounded-lg font-bold text-xs border transition cursor-pointer ${
                                  currentSelection === letter
                                    ? isQuarter2
                                      ? 'bg-violet-600 text-white border-violet-500'
                                      : 'bg-emerald-600 text-white border-emerald-500'
                                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                                }`}
                              >
                                {letter}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Unique Definitions */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Choices from Document
                    </h4>
                    {uniqueDefinitions.map((item) => (
                      <div
                        key={item.letter}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-start gap-2.5"
                      >
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${accentChip}`}
                        >
                          {item.letter}
                        </span>
                        <span className="text-slate-300">{item.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. Ordering / Sequencing */}
            {currentQ.type === 'ordering' && currentQ.orderingSteps && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400">
                  Arrange events in the correct sequence (use up/down buttons):
                </div>
                {(() => {
                  const seq: number[] = studentAnswers[currentQ.id] || [1, 2, 3, 4];
                  return (
                    <div className="space-y-2">
                      {seq.map((stepId, orderIdx) => {
                        const stepData = currentQ.orderingSteps!.find((s) => s.stepNum === stepId);
                        return (
                          <div
                            key={stepId}
                            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-14 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold font-mono shrink-0">
                                Step {orderIdx + 1}
                              </span>
                              <span className="text-slate-200">{stepData?.text}</span>
                            </div>

                            {!isCurrentSubmitted && (
                              <div className="flex items-center gap-1">
                                {orderIdx > 0 && (
                                  <button
                                    onClick={() => handleMoveOrder(orderIdx, orderIdx - 1)}
                                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                                    title="Move Up"
                                  >
                                    ▲
                                  </button>
                                )}
                                {orderIdx < seq.length - 1 && (
                                  <button
                                    onClick={() => handleMoveOrder(orderIdx, orderIdx + 1)}
                                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                                    title="Move Down"
                                  >
                                    ▼
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 7. Short Answer / Written Response */}
            {currentQ.type === 'short_answer' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Write Your Response:
                </label>
                <textarea
                  disabled={isCurrentSubmitted}
                  rows={4}
                  value={currentAnswer || ''}
                  onChange={(e) => setStudentAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))}
                  placeholder="Type your scientific explanation here..."
                  className={`w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none leading-relaxed ${
                    isQuarter2 ? 'focus:border-violet-500' : 'focus:border-emerald-500'
                  }`}
                />
              </div>
            )}

            {/* Feedback & Verified Answer Section */}
            {isCurrentSubmitted && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentEval?.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-sm font-bold text-white">
                      {currentEval?.feedback} (+{currentEval?.scoreAwarded} / {currentQ.points} pts)
                    </span>
                  </div>
                </div>

                {currentQ.verifiedAnswerKey && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs space-y-1">
                    <div className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">
                      Verified Answer Key from Document:
                    </div>
                    <p className="text-emerald-100 leading-relaxed font-medium">{currentQ.verifiedAnswerKey}</p>
                  </div>
                )}

                {currentQ.studentResponse && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 italic">
                    <span className="font-semibold text-slate-300 not-italic">Source Worksheet Response: </span>
                    {currentQ.studentResponse}
                  </div>
                )}

                {currentQ.explanation && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400">Scientific Context: </strong>
                    {currentQ.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Final Results & Performance Review Screen */
          <div className="p-8 overflow-y-auto flex-1 space-y-6 text-center">
            <div className="max-w-xl mx-auto space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500 text-3xl mx-auto">
                🏆
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Assessment Complete!</h3>

              <p className="text-xs sm:text-sm text-slate-300">
                {isQuarter2
                  ? 'You have completed questions from the 10-page Quarter 2 Chemical Processes & Equations Assessment.'
                  : 'You have completed questions from the 17-page Biological Reproduction Assessment.'}
              </p>

              {/* Performance Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Score Awarded</div>
                  <div className="text-2xl font-black font-mono text-emerald-400 mt-1 tabular-nums">
                    {performanceStats.totalScore}
                  </div>
                  <div className="text-[10px] text-slate-500">/ {performanceStats.maxPossibleScore} pts</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Accuracy</div>
                  <div className="text-2xl font-black font-mono text-cyan-400 mt-1 tabular-nums">
                    {performanceStats.percent}%
                  </div>
                  <div className="text-[10px] text-slate-500">Target: 80%</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Correct Qs</div>
                  <div className="text-2xl font-black font-mono text-amber-400 mt-1 tabular-nums">
                    {performanceStats.correctCount}
                  </div>
                  <div className="text-[10px] text-slate-500">/ {activeQuestions.length} Total</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Mastery Grade</div>
                  <div className="text-sm font-bold text-white mt-2 leading-tight">
                    {performanceStats.mastery.gradeLabel}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {performanceStats.mastery.message}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Review All Questions &amp; Verified Keys</span>
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg ${accentBtn}`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Start New Attempt (Reshuffle Choices)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar */}
        {!showResults && (
          <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                soundFx.playStep();
                setCurrentIndex((i) => Math.max(0, i - 1));
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {!isCurrentSubmitted ? (
                <button
                  disabled={studentAnswers[currentQ.id] === undefined}
                  onClick={handleSubmitCurrentAnswer}
                  className={`px-6 py-2.5 disabled:opacity-50 rounded-xl text-xs font-bold transition shadow-md cursor-pointer ${accentBtn}`}
                >
                  Submit Answer
                </button>
              ) : currentIndex < filteredQuestions.length - 1 ? (
                <button
                  onClick={() => {
                    soundFx.playStep();
                    setCurrentIndex((i) => i + 1);
                  }}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${accentBtn}`}
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold rounded-xl text-xs transition shadow-md cursor-pointer"
                >
                  Finish &amp; View Results
                </button>
              )}
            </div>

            <button
              disabled={currentIndex >= filteredQuestions.length - 1}
              onClick={() => {
                soundFx.playStep();
                setCurrentIndex((i) => Math.min(filteredQuestions.length - 1, i + 1));
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
