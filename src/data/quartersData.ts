/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Academic Quarter Navigation Data for Grade 8 Science Explorer (Quarters 1–4)
 */

export type QuarterId = 1 | 2 | 3 | 4;

export interface QuarterInfo {
  id: QuarterId;
  label: string;
  shortLabel: string;
  title: string;
  strand?: string;
  description: string;
  status: 'active' | 'coming_soon';
  accent: 'emerald' | 'violet' | 'sky' | 'amber';
}

export const QUARTERS_DATA: QuarterInfo[] = [
  {
    id: 1,
    label: 'Quarter 1',
    shortLabel: 'Q1',
    title: 'Reproduction, Heredity & Growth',
    strand: 'Life Science · 3 Active Labs & 96-Q Quiz',
    description:
      'Complete interactive expeditions covering plant reproduction and dispersal, DNA and Mendelian inheritance, animal courtship and survival behaviors, lesson explanation videos, and the 96-question curriculum quiz.',
    status: 'active',
    accent: 'emerald',
  },
  {
    id: 2,
    label: 'Quarter 2',
    shortLabel: 'Q2',
    title: 'Chemical Processes & Equations',
    strand: 'Physical Science · Unit 4 · 3 Active Labs',
    description:
      'Investigate the Thermite anchor phenomenon, physical vs. chemical changes, chemical formulas and balanced equations, Law of Conservation of Matter, exothermic vs. endothermic thermal systems, lesson video explainer, and interactive lesson assessments.',
    status: 'active',
    accent: 'violet',
  },
  {
    id: 3,
    label: 'Quarter 3',
    shortLabel: 'Q3',
    title: 'Coming Soon',
    description:
      'Quarter 3 lab, field notebook, lessons, and quiz have not been added yet.',
    status: 'coming_soon',
    accent: 'sky',
  },
  {
    id: 4,
    label: 'Quarter 4',
    shortLabel: 'Q4',
    title: 'Coming Soon',
    description:
      'Quarter 4 lab, field notebook, lessons, and quiz have not been added yet.',
    status: 'coming_soon',
    accent: 'amber',
  },
];

export function isValidQuarterId(value: unknown): value is QuarterId {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

export function parseQuarterParam(raw: string | null | undefined): QuarterId | null {
  if (!raw) return null;
  const num = Number(raw);
  return isValidQuarterId(num) ? num : null;
}

export function getQuarterById(id: QuarterId): QuarterInfo {
  return QUARTERS_DATA.find((q) => q.id === id) || QUARTERS_DATA[0];
}

export function getQuarterProgressSummary(
  quarterId: QuarterId,
  levelMastery: Record<number, boolean>,
  q2LevelMastery: Record<number, boolean> = {}
): { completed: number; total: number; label: string } {
  if (quarterId === 1) {
    const masteredCount = [1, 2, 3].filter((lvl) => Boolean(levelMastery[lvl])).length;
    return {
      completed: masteredCount,
      total: 3,
      label: `${masteredCount} of 3 Lessons Mastered`,
    };
  }
  if (quarterId === 2) {
    const masteredCount = [1, 2, 3].filter((lvl) => Boolean(q2LevelMastery[lvl])).length;
    return {
      completed: masteredCount,
      total: 3,
      label: `${masteredCount} of 3 Lessons Mastered`,
    };
  }
  return {
    completed: 0,
    total: 0,
    label: 'Coming Soon',
  };
}
