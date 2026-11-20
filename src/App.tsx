/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { MainMenu } from './components/MainMenu.js';
import { PlantReproductionLevel } from './components/levels/PlantReproductionLevel.js';
import { GeneticsInheritanceLevel } from './components/levels/GeneticsInheritanceLevel.js';
import { AnimalReproductionLevel } from './components/levels/AnimalReproductionLevel.js';
import { ChemicalReactionsLevel } from './components/levels/ChemicalReactionsLevel.js';
import { ChemicalEquationsLevel } from './components/levels/ChemicalEquationsLevel.js';
import { ThermalEnergyLevel } from './components/levels/ThermalEnergyLevel.js';
import { FieldNotebookModal } from './components/FieldNotebookModal.js';
import { CertificateModal } from './components/CertificateModal.js';
import { MasterQuizModal } from './components/MasterQuizModal.js';
import { NarrationSubtitles } from './components/NarrationSubtitles.js';
import { QuarterTabsBar } from './components/QuarterTabsBar.js';
import { soundFx } from './utils/audio.js';
import { QuarterId, parseQuarterParam } from './data/quartersData.js';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  // Academic Quarter Tab: 1 = Quarter 1 (active), 2 = Quarter 2 (active), 3–4 = Coming Soon
  const [activeQuarter, setActiveQuarter] = useState<QuarterId>(() => {
    const paramQuarter = parseQuarterParam(new URLSearchParams(window.location.search).get('quarter'));
    if (paramQuarter) return paramQuarter;
    const stored = parseQuarterParam(localStorage.getItem('science_active_quarter'));
    return stored || 1;
  });

  // Navigation: 0 = Main Menu (Quarter Overview), 1..3 = Active Quarter Levels
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  // Modals
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isMasterQuizOpen, setIsMasterQuizOpen] = useState<boolean>(false);

  // Subtitles / Voice state
  const [subtitleText, setSubtitleText] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Persistent Player Progress
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('science_student_name') || 'Science Explorer Cadet';
  });

  const [totalPoints, setTotalPoints] = useState<number>(() => {
    return Number(localStorage.getItem('science_points')) || 0;
  });

  const [levelScores, setLevelScores] = useState<Record<number, number>>(() => {
    try {
      const stored = localStorage.getItem('science_level_scores');
      return stored ? JSON.parse(stored) : { 1: 0, 2: 0, 3: 0 };
    } catch {
      return { 1: 0, 2: 0, 3: 0 };
    }
  });

  const [levelMastery, setLevelMastery] = useState<Record<number, boolean>>(() => {
    try {
      const stored = localStorage.getItem('science_level_mastery');
      return stored ? JSON.parse(stored) : { 1: false, 2: false, 3: false };
    } catch {
      return { 1: false, 2: false, 3: false };
    }
  });

  const [q2LevelScores, setQ2LevelScores] = useState<Record<number, number>>(() => {
    try {
      const stored = localStorage.getItem('science_q2_level_scores');
      return stored ? JSON.parse(stored) : { 1: 0, 2: 0, 3: 0 };
    } catch {
      return { 1: 0, 2: 0, 3: 0 };
    }
  });

  const [q2LevelMastery, setQ2LevelMastery] = useState<Record<number, boolean>>(() => {
    try {
      const stored = localStorage.getItem('science_q2_level_mastery');
      return stored ? JSON.parse(stored) : { 1: false, 2: false, 3: false };
    } catch {
      return { 1: false, 2: false, 3: false };
    }
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('science_badges');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [inspectedHotspotsCount, setInspectedHotspotsCount] = useState<number>(() => {
    return Number(localStorage.getItem('science_hotspots_count')) || 0;
  });

  const [simulationsCompleted, setSimulationsCompleted] = useState<number>(() => {
    return Number(localStorage.getItem('science_sims_count')) || 0;
  });

  // Check URL autostart, quarter, and quiz params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qParam = parseQuarterParam(params.get('quarter'));
    const targetQuarter: QuarterId = qParam || 1;
    if (qParam) {
      setActiveQuarter(qParam);
    }
    if ((params.get('quiz') === '1' || params.get('quiz') === 'master') && targetQuarter === 1) {
      setIsMasterQuizOpen(true);
    }
    if (params.get('autostart') === '1' || params.get('level') === '1') {
      setActiveQuarter(targetQuarter === 2 ? 2 : 1);
      setCurrentLevel(1);
    } else if (params.get('level') === '2') {
      setActiveQuarter(targetQuarter === 2 ? 2 : 1);
      setCurrentLevel(2);
    } else if (params.get('level') === '3') {
      setActiveQuarter(targetQuarter === 2 ? 2 : 1);
      setCurrentLevel(3);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('science_active_quarter', String(activeQuarter));
    localStorage.setItem('science_student_name', studentName);
    localStorage.setItem('science_points', totalPoints.toString());
    localStorage.setItem('science_level_scores', JSON.stringify(levelScores));
    localStorage.setItem('science_level_mastery', JSON.stringify(levelMastery));
    localStorage.setItem('science_q2_level_scores', JSON.stringify(q2LevelScores));
    localStorage.setItem('science_q2_level_mastery', JSON.stringify(q2LevelMastery));
    localStorage.setItem('science_badges', JSON.stringify(unlockedBadges));
    localStorage.setItem('science_hotspots_count', inspectedHotspotsCount.toString());
    localStorage.setItem('science_sims_count', simulationsCompleted.toString());
  }, [
    activeQuarter,
    studentName,
    totalPoints,
    levelScores,
    levelMastery,
    q2LevelScores,
    q2LevelMastery,
    unlockedBadges,
    inspectedHotspotsCount,
    simulationsCompleted,
  ]);

  // Audio settings sync
  useEffect(() => {
    soundFx.soundEnabled = soundEnabled;
    soundFx.voiceEnabled = voiceEnabled;
  }, [soundEnabled, voiceEnabled]);

  const handleAwardPoints = (pts: number) => {
    setTotalPoints((prev) => prev + pts);
  };

  const handleNarrate = (text: string) => {
    setSubtitleText(text);
    if (voiceEnabled) {
      soundFx.speak(text);
    }
  };

  const handleInspectHotspot = () => {
    setInspectedHotspotsCount((prev) => {
      const updated = prev + 1;
      if (updated >= 5 && !unlockedBadges.includes('badge-inspector')) {
        soundFx.playFanfare();
        setUnlockedBadges((b) => [...b, 'badge-inspector']);
        setTotalPoints((p) => p + 30);
      }
      return updated;
    });
  };

  const handleSimulationComplete = () => {
    setSimulationsCompleted((prev) => {
      const updated = prev + 1;
      if (updated >= 3 && !unlockedBadges.includes('badge-lab-wizard')) {
        soundFx.playFanfare();
        setUnlockedBadges((b) => [...b, 'badge-lab-wizard']);
        setTotalPoints((p) => p + 40);
      }
      return updated;
    });
  };

  const handleCompleteQuiz = (levelNum: number, scorePercentage: number, passed: boolean) => {
    setLevelScores((prev) => ({ ...prev, [levelNum]: scorePercentage }));
    setLevelMastery((prev) => {
      const updated = { ...prev, [levelNum]: passed };

      // Check Level Badge unlock
      const levelBadgeMap: Record<number, string> = {
        1: 'badge-botany',
        2: 'badge-genetics',
        3: 'badge-zoology',
      };
      const badgeId = levelBadgeMap[levelNum];
      if (passed && badgeId && !unlockedBadges.includes(badgeId)) {
        setUnlockedBadges((b) => [...b, badgeId]);
      }

      // Check Grandmaster Badge unlock
      if (updated[1] && updated[2] && updated[3] && !unlockedBadges.includes('badge-grandmaster')) {
        setUnlockedBadges((b) => [...b, 'badge-grandmaster']);
      }

      return updated;
    });
  };

  const handleCompleteQ2Quiz = (levelNum: number, scorePercentage: number, passed: boolean) => {
    setQ2LevelScores((prev) => ({ ...prev, [levelNum]: scorePercentage }));
    setQ2LevelMastery((prev) => ({ ...prev, [levelNum]: passed }));
  };

  const handleSelectQuarter = (quarter: QuarterId) => {
    soundFx.stopSpeaking();
    setSubtitleText(null);
    setIsMasterQuizOpen(false);
    const wasInLevel = currentLevel !== 0;
    setActiveQuarter(quarter);
    setCurrentLevel(0);
    if (wasInLevel) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleNavigateLevel = (lvl: number) => {
    soundFx.stopSpeaking();
    setSubtitleText(null);
    if (lvl >= 1 && lvl <= 3 && activeQuarter !== 1 && activeQuarter !== 2) {
      setActiveQuarter(1);
    }
    setCurrentLevel(lvl);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all progress, scores, and badges back to zero?')) {
      soundFx.playClick();
      setActiveQuarter(1);
      setTotalPoints(0);
      setLevelScores({ 1: 0, 2: 0, 3: 0 });
      setLevelMastery({ 1: false, 2: false, 3: false });
      setQ2LevelScores({ 1: 0, 2: 0, 3: 0 });
      setQ2LevelMastery({ 1: false, 2: false, 3: false });
      setUnlockedBadges([]);
      setInspectedHotspotsCount(0);
      setSimulationsCompleted(0);
      setCurrentLevel(0);
      localStorage.clear();
    }
  };

  const modalQuarter: 1 | 2 = activeQuarter === 2 ? 2 : 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Application Header */}
      <Header
        activeQuarter={activeQuarter}
        currentLevel={currentLevel}
        onSelectLevel={handleNavigateLevel}
        totalPoints={totalPoints}
        levelScores={levelScores}
        levelMastery={levelMastery}
        q2LevelMastery={q2LevelMastery}
        onOpenNotebook={() => setIsNotebookOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenMasterQuiz={() => {
          if (activeQuarter !== 1) return;
          soundFx.stopSpeaking();
          setSubtitleText(null);
          setIsMasterQuizOpen(true);
        }}
        onResetProgress={handleResetProgress}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          soundFx.soundEnabled = next;
        }}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => {
          const next = !voiceEnabled;
          setVoiceEnabled(next);
          soundFx.voiceEnabled = next;
          if (!next) soundFx.stopSpeaking();
        }}
        unlockedBadgesCount={unlockedBadges.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentLevel === 0 && (
          <MainMenu
            activeQuarter={activeQuarter}
            onSelectQuarter={handleSelectQuarter}
            onStartLevel={handleNavigateLevel}
            levelMastery={levelMastery}
            levelScores={levelScores}
            q2LevelMastery={q2LevelMastery}
            q2LevelScores={q2LevelScores}
            totalPoints={totalPoints}
            unlockedBadgesCount={unlockedBadges.length}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenMasterQuiz={() => {
              if (activeQuarter !== 1) return;
              soundFx.stopSpeaking();
              setSubtitleText(null);
              setIsMasterQuizOpen(true);
            }}
          />
        )}

        {currentLevel !== 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  handleSelectQuarter(modalQuarter);
                }}
                className={`inline-flex items-center gap-1.5 font-semibold transition cursor-pointer ${
                  modalQuarter === 2
                    ? 'text-violet-300 hover:text-violet-200'
                    : 'text-emerald-300 hover:text-emerald-200'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Quarter {modalQuarter} Overview</span>
              </button>
              <span className="text-slate-400">
                Active Term: <strong className="text-slate-200">Quarter {modalQuarter}</strong> · Level {currentLevel}{' '}
                of 3
              </span>
            </div>
            <QuarterTabsBar
              activeQuarter={activeQuarter}
              onSelectQuarter={handleSelectQuarter}
              levelMastery={levelMastery}
              q2LevelMastery={q2LevelMastery}
              compact
            />
          </div>
        )}

        {/* Quarter 1 Levels */}
        {activeQuarter === 1 && currentLevel === 1 && (
          <PlantReproductionLevel
            onAwardPoints={handleAwardPoints}
            onCompleteQuiz={handleCompleteQuiz}
            onNarrate={handleNarrate}
            onInspectHotspot={handleInspectHotspot}
            onSimulationComplete={handleSimulationComplete}
          />
        )}

        {activeQuarter === 1 && currentLevel === 2 && (
          <GeneticsInheritanceLevel
            onAwardPoints={handleAwardPoints}
            onCompleteQuiz={handleCompleteQuiz}
            onNarrate={handleNarrate}
            onInspectHotspot={handleInspectHotspot}
            onSimulationComplete={handleSimulationComplete}
          />
        )}

        {activeQuarter === 1 && currentLevel === 3 && (
          <AnimalReproductionLevel
            onAwardPoints={handleAwardPoints}
            onCompleteQuiz={handleCompleteQuiz}
            onNarrate={handleNarrate}
            onInspectHotspot={handleInspectHotspot}
            onSimulationComplete={handleSimulationComplete}
          />
        )}

        {/* Quarter 2 Levels */}
        {activeQuarter === 2 && currentLevel === 1 && (
          <ChemicalReactionsLevel
            onAwardPoints={handleAwardPoints}
            onCompleteQuiz={handleCompleteQ2Quiz}
            onNarrate={handleNarrate}
            onSimulationComplete={handleSimulationComplete}
          />
        )}

        {activeQuarter === 2 && currentLevel === 2 && (
          <ChemicalEquationsLevel
            onAwardPoints={handleAwardPoints}
            onCompleteQuiz={handleCompleteQ2Quiz}
            onNarrate={handleNarrate}
            onSimulationComplete={handleSimulationComplete}
          />
        )}

        {activeQuarter === 2 && currentLevel === 3 && (
          <ThermalEnergyLevel
            onAwardPoints={handleAwardPoints}
            onCompleteQuiz={handleCompleteQ2Quiz}
            onNarrate={handleNarrate}
            onSimulationComplete={handleSimulationComplete}
          />
        )}
      </main>

      {/* Spoken Narration Subtitle Bar */}
      <NarrationSubtitles
        subtitleText={subtitleText}
        onClose={() => setSubtitleText(null)}
        onReplayAudio={() => {
          if (subtitleText) soundFx.speak(subtitleText);
        }}
      />

      {/* Quarter-Aware Science Field Notebook Modal */}
      <FieldNotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        unlockedNotesCount={8}
        quarter={modalQuarter}
      />

      {/* Official Mastery Certificate & Diploma Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={studentName}
        onUpdateStudentName={setStudentName}
        totalPoints={totalPoints}
        levelMastery={levelMastery}
        levelScores={levelScores}
        unlockedBadges={unlockedBadges}
      />

      {/* Quarter 1 Master Curriculum Quiz Modal (96 Qs — Quarter 1 Only) */}
      {activeQuarter === 1 && (
        <MasterQuizModal
          key="master-quiz-q1"
          isOpen={isMasterQuizOpen}
          onClose={() => setIsMasterQuizOpen(false)}
          onAwardPoints={handleAwardPoints}
          onNarrate={handleNarrate}
          quarter={1}
        />
      )}
    </div>
  );
}
