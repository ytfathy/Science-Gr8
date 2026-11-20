/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  solvePunnettSquare,
  simulateLitters,
  evaluateGermination,
  calculateLivestockGrowth,
  verifyDispersalMatch,
  evaluateMastery,
  evaluateMasterAnswer,
} from './rules.js';
import {
  calculateDensity,
  compareSubstanceSamples,
  parseChemicalFormula,
  evaluateChemicalEquationBalance,
  simulateReactionRate,
  evaluateTurtleEggWarmer,
} from './chemistryRules.js';
import {
  QUARTERS_DATA,
  isValidQuarterId,
  parseQuarterParam,
  getQuarterById,
  getQuarterProgressSummary,
} from '../data/quartersData.js';
import {
  Q2_MASTER_MODULES,
  Q2_MASTER_QUIZ_QUESTIONS,
} from '../data/quarter2MasterQuizData.js';
import { Q2_L2_HW1_QUESTIONS } from '../data/chemistryData.js';

test('solvePunnettSquare correctly calculates 1:2:1 genotype and 3:1 phenotype for heterozygous cross Ss x Ss', () => {
  const result = solvePunnettSquare('Ss', 'Ss');
  assert.equal(result.genotypeCounts.SS, 1);
  assert.equal(result.genotypeCounts.Ss, 2);
  assert.equal(result.genotypeCounts.ss, 1);
  assert.equal(result.phenotypeCounts.short, 3);
  assert.equal(result.phenotypeCounts.long, 1);
  assert.equal(result.genotypeRatio, '1 SS : 2 Ss : 1 ss');
  assert.equal(result.phenotypeRatio, '3 Short : 1 Long');
});

test('solvePunnettSquare correctly calculates test cross for homozygous recessive ss x homozygous dominant SS', () => {
  const result = solvePunnettSquare('SS', 'ss');
  assert.equal(result.genotypeCounts.SS, 0);
  assert.equal(result.genotypeCounts.Ss, 4);
  assert.equal(result.genotypeCounts.ss, 0);
  assert.equal(result.phenotypeCounts.short, 4);
  assert.equal(result.phenotypeCounts.long, 0);
});

test('simulateLitters produces valid counts and ratios with deterministic random mock', () => {
  let count = 0;
  const mockRng = () => {
    count++;
    return count % 2 === 0 ? 0.8 : 0.2;
  };

  const sim = simulateLitters('Ss', 'Ss', 4, mockRng);
  assert.equal(sim.kittens.length, 4);
  assert.equal(sim.shortCount + sim.longCount, 4);
});

test('evaluateGermination distinguishes germination conditions from seedling growth conditions', () => {
  const noWater = evaluateGermination(false, true, 22, true, true);
  assert.equal(noWater.willGerminate, false);
  assert.equal(noWater.stage, 'dormant');

  const freezing = evaluateGermination(true, true, 2, true, true);
  assert.equal(freezing.willGerminate, false);
  assert.equal(freezing.stage, 'dormant');

  const boiling = evaluateGermination(true, true, 55, true, true);
  assert.equal(boiling.willGerminate, false);
  assert.equal(boiling.stage, 'failed');

  const darkOnly = evaluateGermination(true, true, 22, false, false);
  assert.equal(darkOnly.willGerminate, true);
  assert.equal(darkOnly.canSustainGrowth, false);
  assert.equal(darkOnly.stage, 'sprouted');

  const optimal = evaluateGermination(true, true, 22, true, true);
  assert.equal(optimal.willGerminate, true);
  assert.equal(optimal.canSustainGrowth, true);
  assert.equal(optimal.stage, 'growing_seedling');
});

test('calculateLivestockGrowth demonstrates environmental bottleneck on high-yield genetics', () => {
  const optimalGrowth = calculateLivestockGrowth('high_yield', {
    feedQuality: 100,
    waterAccess: 100,
    temperatureC: 18,
    diseaseControl: 100,
  });
  assert.equal(optimalGrowth.actualWeightKg, 620);
  assert.equal(optimalGrowth.limitingFactor, 'Optimal Conditions');

  const droughtGrowth = calculateLivestockGrowth('high_yield', {
    feedQuality: 80,
    waterAccess: 15,
    temperatureC: 35,
    diseaseControl: 90,
  });
  assert.ok(droughtGrowth.actualWeightKg < 300);
  assert.equal(droughtGrowth.limitingFactor, 'Water Deficit');
});

test('verifyDispersalMatch validates correct natural vectors', () => {
  assert.equal(verifyDispersalMatch('milkweed', 'wind'), true);
  assert.equal(verifyDispersalMatch('coconut', 'water'), true);
  assert.equal(verifyDispersalMatch('berries', 'animal_ingestion'), true);
  assert.equal(verifyDispersalMatch('burdock_cocklebur', 'animal_hitchhiking'), true);
  assert.equal(verifyDispersalMatch('acorn', 'animal_cache'), true);
  assert.equal(verifyDispersalMatch('acorn', 'wind'), false);
});

test('evaluateMastery properly enforces 80% passing threshold and distinction', () => {
  assert.equal(evaluateMastery(7, 10).passed, false);
  assert.equal(evaluateMastery(8, 10).passed, true);
  assert.equal(evaluateMastery(10, 10).passed, true);
  assert.equal(evaluateMastery(10, 10).percentage, 100);
  assert.equal(evaluateMastery(10, 10).gradeLabel, 'Mastery with Distinction');
});

test('evaluateMasterAnswer validates multiple question formats from the uploaded PDF', () => {
  const mcValid = evaluateMasterAnswer('multiple_choice', 'Asexual reproduction', 'Asexual reproduction', 10);
  assert.equal(mcValid.isCorrect, true);
  assert.equal(mcValid.scoreAwarded, 10);

  const mcWrong = evaluateMasterAnswer('multiple_choice', 'Asexual reproduction', 'Sexual reproduction', 10);
  assert.equal(mcWrong.isCorrect, false);
  assert.equal(mcWrong.scoreAwarded, 0);

  const msValid = evaluateMasterAnswer(
    'multiple_select',
    ['Bonsai trees need light, water, and nutrients.', 'Bonsai trees can reproduce sexually and asexually.'],
    ['Bonsai trees can reproduce sexually and asexually.', 'Bonsai trees need light, water, and nutrients.'],
    20
  );
  assert.equal(msValid.isCorrect, true);
  assert.equal(msValid.scoreAwarded, 20);

  const yesNo = evaluateMasterAnswer(
    'multi_yes_no',
    { hooks: 'YES', flower: 'NO', barbs: 'YES', fruits: 'NO' },
    { hooks: 'YES', flower: 'NO', barbs: 'YES', fruits: 'NO' },
    20
  );
  assert.equal(yesNo.isCorrect, true);
  assert.equal(yesNo.scoreAwarded, 20);

  const orderValid = evaluateMasterAnswer('ordering', [1, 2, 3, 4], [1, 2, 3, 4], 40);
  assert.equal(orderValid.isCorrect, true);
  assert.equal(orderValid.scoreAwarded, 40);

  const orderWrong = evaluateMasterAnswer('ordering', [1, 2, 3, 4], [2, 1, 3, 4], 40);
  assert.equal(orderWrong.isCorrect, false);
});

test('QUARTERS_DATA defines Quarters 1–2 as active and Quarters 3–4 as Coming Soon', () => {
  assert.deepEqual(
    QUARTERS_DATA.map((q) => q.label),
    ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']
  );
  assert.equal(getQuarterById(1).status, 'active');
  assert.equal(getQuarterById(2).status, 'active');
  assert.equal(getQuarterById(2).title, 'Chemical Processes & Equations');
  assert.equal(getQuarterById(3).status, 'coming_soon');
  assert.equal(getQuarterById(3).title, 'Coming Soon');
  assert.equal(getQuarterById(4).status, 'coming_soon');
  assert.equal(getQuarterById(4).title, 'Coming Soon');
});

test('quarter validation and URL param parsing accept 1-4 and reject invalid values', () => {
  assert.equal(isValidQuarterId(1), true);
  assert.equal(isValidQuarterId(4), true);
  assert.equal(isValidQuarterId(5), false);
  assert.equal(parseQuarterParam('2'), 2);
  assert.equal(parseQuarterParam('4'), 4);
  assert.equal(parseQuarterParam('0'), null);
  assert.equal(parseQuarterParam('abc'), null);
});

test('getQuarterProgressSummary computes Quarter 1 and Quarter 2 mastery and Coming Soon for Quarters 3-4', () => {
  const q1 = getQuarterProgressSummary(1, { 1: true, 2: false, 3: true }, { 1: true });
  assert.equal(q1.completed, 2);
  assert.equal(q1.total, 3);
  assert.equal(q1.label, '2 of 3 Lessons Mastered');

  const q2 = getQuarterProgressSummary(2, { 1: true, 2: true, 3: true }, { 1: true, 2: false, 3: false });
  assert.equal(q2.completed, 1);
  assert.equal(q2.total, 3);
  assert.equal(q2.label, '1 of 3 Lessons Mastered');

  const q3 = getQuarterProgressSummary(3, { 1: true }, { 1: true });
  assert.equal(q3.completed, 0);
  assert.equal(q3.total, 0);
  assert.equal(q3.label, 'Coming Soon');
});

// =========================================================================
// QUARTER 2 CHEMISTRY ENGINE & QUIZ BANK UNIT TESTS
// =========================================================================

test('calculateDensity and compareSubstanceSamples match PDF Exploration 1 Q4–Q7 values', () => {
  assert.equal(calculateDensity(5.5, 5.5), 1.0);
  assert.equal(calculateDensity(10.4, 7.0), 1.49);
  assert.equal(calculateDensity(10, 0), 0);

  const cmp = compareSubstanceSamples(
    { massG: 5.5, volumeMl: 5.5, freezingPointC: 0, boilingPointC: 100 },
    { massG: 10.4, volumeMl: 7.0, freezingPointC: 75, boilingPointC: 100 }
  );
  assert.equal(cmp.densityA, 1.0);
  assert.equal(cmp.densityB, 1.49);
  assert.equal(cmp.areSameSubstance, false);
});

test('parseChemicalFormula accurately counts atoms with parentheses and leading coefficients', () => {
  assert.deepEqual(parseChemicalFormula('H2O'), { H: 2, O: 1 });
  assert.deepEqual(parseChemicalFormula('(CH3)2N'), { C: 2, H: 6, N: 1 });
  assert.deepEqual(parseChemicalFormula('Al2(SO4)3'), { Al: 2, S: 3, O: 12 });
  assert.deepEqual(parseChemicalFormula('2Fe(OH)3'), { Fe: 2, O: 6, H: 6 });
  assert.deepEqual(parseChemicalFormula('Cu2CO3(OH)2'), { Cu: 2, C: 1, O: 5, H: 2 });
  assert.deepEqual(parseChemicalFormula('Ca3Al2(SiO4)3'), { Ca: 3, Al: 2, Si: 3, O: 12 });
});

test('evaluateChemicalEquationBalance detects balanced vs unbalanced equations', () => {
  const methaneBalanced = evaluateChemicalEquationBalance(
    [
      { formula: 'CH4', name: 'Methane' },
      { formula: 'O2', name: 'Oxygen' },
    ],
    [
      { formula: 'CO2', name: 'CO2' },
      { formula: 'H2O', name: 'Water' },
    ],
    [1, 2],
    [1, 2]
  );
  assert.equal(methaneBalanced.isBalanced, true);
  assert.deepEqual(methaneBalanced.reactantCounts, { C: 1, H: 4, O: 4 });

  const ethaneUnbalanced = evaluateChemicalEquationBalance(
    [
      { formula: 'C2H6', name: 'Ethane' },
      { formula: 'O2', name: 'Oxygen' },
    ],
    [
      { formula: 'CO2', name: 'CO2' },
      { formula: 'H2O', name: 'Water' },
    ],
    [1, 5],
    [2, 3]
  );
  assert.equal(ethaneUnbalanced.isBalanced, false);
});

test('simulateReactionRate matches PDF water temperature anchors and speeds up with catalysts/crushing', () => {
  const cold = simulateReactionRate({
    temperatureC: 18,
    surfaceArea: 'whole',
    concentration: 'medium',
    hasCatalyst: false,
  });
  const warm = simulateReactionRate({
    temperatureC: 34,
    surfaceArea: 'whole',
    concentration: 'medium',
    hasCatalyst: false,
  });
  const hot = simulateReactionRate({
    temperatureC: 68,
    surfaceArea: 'whole',
    concentration: 'medium',
    hasCatalyst: false,
  });
  const boosted = simulateReactionRate({
    temperatureC: 34,
    surfaceArea: 'crushed',
    concentration: 'high',
    hasCatalyst: true,
  });

  assert.equal(cold.estimatedSeconds, 71);
  assert.equal(warm.estimatedSeconds, 31.5);
  assert.equal(hot.estimatedSeconds, 21);
  assert.ok(boosted.estimatedSeconds < warm.estimatedSeconds);
});

test('evaluateTurtleEggWarmer recommends Option B (iron + salt + water) and rejects Options A and C', () => {
  assert.equal(evaluateTurtleEggWarmer('iron_powder_salt').meetsCriteria, true);
  assert.equal(evaluateTurtleEggWarmer('ammonium_nitrate').meetsCriteria, false);
  assert.equal(evaluateTurtleEggWarmer('sodium_acetate').meetsCriteria, false);
});

test('Quarter 2 Master Quiz bank includes all 61 source-extracted questions across 4 modules', () => {
  assert.equal(Q2_MASTER_MODULES.length, 4);
  assert.equal(Q2_MASTER_QUIZ_QUESTIONS.length, 61);
  const moduleSum = Q2_MASTER_MODULES.reduce((sum, m) => sum + m.questionCount, 0);
  assert.equal(moduleSum, 61);
  Q2_MASTER_MODULES.forEach((m) => {
    const actual = Q2_MASTER_QUIZ_QUESTIONS.filter((q) => q.moduleNumber === m.num).length;
    assert.equal(actual, m.questionCount);
  });
});

test('W2 HW1D4U4L2 homework bank contains all 10 Lesson 2 questions with exact verified atom counts', () => {
  assert.equal(Q2_L2_HW1_QUESTIONS.length, 10);

  // Verify nested parentheses & split-hydrogen formulas specifically
  assert.deepEqual(parseChemicalFormula('5CH3COOH'), { C: 10, H: 20, O: 10 });
  assert.deepEqual(parseChemicalFormula('4K4(Fe(CN)6)'), { K: 16, Fe: 4, C: 24, N: 24 });
  assert.deepEqual(parseChemicalFormula('2Cr2(SO4)3'), { Cr: 4, S: 6, O: 24 });

  // Verify every single homework question 1..10 mathematically matches parseChemicalFormula
  Q2_L2_HW1_QUESTIONS.forEach((q, idx) => {
    assert.equal(q.questionNumber, idx + 1);
    assert.equal(q.assignmentCode, 'W2 HW1D4U4L2');
    assert.equal(q.options.length, 4);
    const parsed = parseChemicalFormula(q.formula);
    const expectedCount = String(parsed[q.targetElement]);
    assert.equal(
      q.options[q.correctAnswer],
      expectedCount,
      `Mismatch on ${q.id} (${q.formula} -> ${q.targetElement})`
    );
  });
});
