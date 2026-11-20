/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pure scientific calculations, rules, and game mechanics for Science Explorer: Grade 8
 */

export interface PunnettResult {
  gametesP1: [string, string];
  gametesP2: [string, string];
  cells: string[];
  genotypeCounts: { SS: number; Ss: number; ss: number };
  phenotypeCounts: { short: number; long: number };
  genotypeRatio: string;
  phenotypeRatio: string;
}

/**
 * Calculates a standard monohybrid cross for cat fur length
 * S = dominant (short hair), s = recessive (long hair)
 */
export function solvePunnettSquare(p1: string, p2: string): PunnettResult {
  const g1: [string, string] = [p1[0] || 'S', p1[1] || 's'];
  const g2: [string, string] = [p2[0] || 'S', p2[1] || 's'];

  const cells: string[] = [];
  const counts = { SS: 0, Ss: 0, ss: 0 };
  let short = 0;
  let long = 0;

  for (const a of g1) {
    for (const b of g2) {
      // Standardize allele representation: uppercase first
      const combo = (a === 'S' || b === 'S') 
        ? ((a === 's' || b === 's') ? 'Ss' : 'SS')
        : 'ss';
      
      cells.push(combo);
      if (combo === 'SS') counts.SS++;
      else if (combo === 'Ss') counts.Ss++;
      else counts.ss++;

      if (combo === 'SS' || combo === 'Ss') short++;
      else long++;
    }
  }

  return {
    gametesP1: g1,
    gametesP2: g2,
    cells,
    genotypeCounts: counts,
    phenotypeCounts: { short, long },
    genotypeRatio: `${counts.SS} SS : ${counts.Ss} Ss : ${counts.ss} ss`,
    phenotypeRatio: `${short} Short : ${long} Long`,
  };
}

/**
 * Simulates multiple random offspring litters to demonstrate probability vs reality
 */
export function simulateLitters(
  p1: string,
  p2: string,
  litterSize: number,
  rng: () => number = Math.random
): {
  kittens: { genotype: string; phenotype: 'short' | 'long' }[];
  shortCount: number;
  longCount: number;
  shortPercent: number;
} {
  const g1: [string, string] = [p1[0], p1[1]];
  const g2: [string, string] = [p2[0], p2[1]];

  const kittens: { genotype: string; phenotype: 'short' | 'long' }[] = [];
  let shortCount = 0;
  let longCount = 0;

  for (let i = 0; i < litterSize; i++) {
    const a = rng() < 0.5 ? g1[0] : g1[1];
    const b = rng() < 0.5 ? g2[0] : g2[1];

    const combo = (a === 'S' || b === 'S')
      ? ((a === 's' || b === 's') ? 'Ss' : 'SS')
      : 'ss';

    const phenotype = combo === 'ss' ? 'long' : 'short';
    if (phenotype === 'short') shortCount++;
    else longCount++;

    kittens.push({ genotype: combo, phenotype });
  }

  const shortPercent = litterSize > 0 ? Math.round((shortCount / litterSize) * 100) : 0;

  return {
    kittens,
    shortCount,
    longCount,
    shortPercent,
  };
}

/**
 * Evaluates seed germination vs seedling growth requirements
 * Demonstrates the critical Grade 8 distinction:
 * Germination requires water, oxygen, and suitable temperature.
 * Continued growth requires light, soil nutrients, and space.
 */
export function evaluateGermination(
  hasWater: boolean,
  hasOxygen: boolean,
  temperatureC: number,
  hasLight: boolean,
  hasSoilNutrients: boolean
): {
  willGerminate: boolean;
  canSustainGrowth: boolean;
  stage: 'dormant' | 'swollen' | 'sprouted' | 'growing_seedling' | 'failed';
  message: string;
} {
  if (!hasWater) {
    return {
      willGerminate: false,
      canSustainGrowth: false,
      stage: 'dormant',
      message: 'The seed remains dormant. Water is required for imbibition (swelling) and activating metabolic enzymes.',
    };
  }

  if (temperatureC < 5) {
    return {
      willGerminate: false,
      canSustainGrowth: false,
      stage: 'dormant',
      message: 'Temperature is too low (near freezing). Enzyme activity is too slow for germination.',
    };
  }

  if (temperatureC > 45) {
    return {
      willGerminate: false,
      canSustainGrowth: false,
      stage: 'failed',
      message: 'Temperature is excessively high! Seed enzymes and cellular structures have denatured.',
    };
  }

  if (!hasOxygen) {
    return {
      willGerminate: false,
      canSustainGrowth: false,
      stage: 'swollen',
      message: 'The seed absorbed water and swelled, but oxygen is required for cellular respiration to generate energy to emerge.',
    };
  }

  // At this point, germination conditions are met!
  const willGerminate = true;

  // Once germinated, does it have light and nutrients to grow beyond the stored cotyledon energy?
  if (hasLight && hasSoilNutrients) {
    return {
      willGerminate: true,
      canSustainGrowth: true,
      stage: 'growing_seedling',
      message: 'Success! The seed germinated and now photosynthesizes with light and absorbs soil minerals for healthy, sustained growth.',
    };
  }

  return {
    willGerminate: true,
    canSustainGrowth: false,
    stage: 'sprouted',
    message: 'The radicle (root) and shoot have sprouted! However, without adequate light or soil nutrients, the seedling will eventually exhaust its stored food reserves and become etiolated/stunted.',
  };
}

/**
 * Livestock growth simulator: Genetics sets the maximum potential,
 * while environmental factors (nutrition, water, climate, parasites) dictate actual realization.
 */
export function calculateLivestockGrowth(
  genetics: 'standard' | 'high_yield',
  env: {
    feedQuality: number; // 0 to 100
    waterAccess: number; // 0 to 100
    temperatureC: number; // Ideal: 15-22 C
    diseaseControl: number; // 0 to 100
  }
): {
  maxPotentialKg: number;
  actualWeightKg: number;
  healthPercent: number;
  limitingFactor: string;
  milkYieldLiters: number;
} {
  const maxPotentialKg = genetics === 'high_yield' ? 620 : 500;
  const maxMilkPotential = genetics === 'high_yield' ? 38 : 24;

  // Temp stress penalty: comfort zone is 12-24°C
  let tempFactor = 1.0;
  if (env.temperatureC > 24) {
    tempFactor = Math.max(0.4, 1.0 - (env.temperatureC - 24) * 0.035);
  } else if (env.temperatureC < 5) {
    tempFactor = Math.max(0.6, 1.0 - (5 - env.temperatureC) * 0.025);
  }

  const feedFactor = Math.max(0.2, env.feedQuality / 100);
  const waterFactor = Math.max(0.1, env.waterAccess / 100);
  const healthFactor = Math.max(0.3, env.diseaseControl / 100);

  // Environmental bottleneck (Liebig's Law of the Minimum)
  const envFactors = [
    { name: 'Water Deficit', factor: waterFactor },
    { name: 'Poor Nutrition / Feed', factor: feedFactor },
    { name: 'Heat/Cold Stress', factor: tempFactor },
    { name: 'Parasites / Infections', factor: healthFactor },
  ];

  envFactors.sort((a, b) => a.factor - b.factor);
  const limiting = envFactors[0];

  // Overall environmental modifier
  const envScore = (feedFactor * 0.35 + waterFactor * 0.35 + tempFactor * 0.15 + healthFactor * 0.15);
  // Bottleneck penalty
  const finalRealization = Math.min(envScore, limiting.factor * 1.15);

  const actualWeightKg = Math.round(maxPotentialKg * Math.min(1.0, finalRealization));
  const milkYieldLiters = Math.round(maxMilkPotential * Math.min(1.0, finalRealization) * 10) / 10;
  const healthPercent = Math.round(Math.min(100, (feedFactor * 0.3 + waterFactor * 0.3 + tempFactor * 0.2 + healthFactor * 0.2) * 100));

  let limitingFactor = 'Optimal Conditions';
  if (limiting.factor < 0.85) {
    limitingFactor = limiting.name;
  }

  return {
    maxPotentialKg,
    actualWeightKg,
    healthPercent,
    limitingFactor,
    milkYieldLiters,
  };
}

/**
 * Evaluates seed dispersal vector matching
 */
export function verifyDispersalMatch(seedType: string, vector: string): boolean {
  const correctMappings: Record<string, string[]> = {
    milkweed: ['wind'],
    dandelion: ['wind'],
    coconut: ['water'],
    water_lily: ['water'],
    berries: ['animal_ingestion'],
    cherries: ['animal_ingestion'],
    burdock_cocklebur: ['animal_hitchhiking'],
    acorn: ['animal_cache'],
    fern_spores: ['water_moisture', 'wind_moist'],
  };

  const allowed = correctMappings[seedType] || [];
  return allowed.includes(vector);
}

/**
 * Level mastery calculation with 80% passing threshold
 */
export function evaluateMastery(score: number, totalQuestions: number): {
  percentage: number;
  passed: boolean;
  gradeLabel: string;
  message: string;
} {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 80;

  let gradeLabel = 'Needs Review';
  let message = 'Keep exploring the interactive guides and try again to reach the 80% mastery target!';

  if (percentage === 100) {
    gradeLabel = 'Mastery with Distinction';
    message = 'Outstanding! You answered every question correctly and mastered this biological branch!';
  } else if (percentage >= 90) {
    gradeLabel = 'Advanced Mastery';
    message = 'Excellent scientific understanding! You have demonstrated high mastery of the key concepts.';
  } else if (passed) {
    gradeLabel = 'Standard Mastery Achieved';
    message = 'Great job! You achieved the 80% mastery benchmark and earned your field certification badge.';
  }

  return {
    percentage,
    passed,
    gradeLabel,
    message,
  };
}

/**
 * Validates and grades student responses across all question formats from the uploaded PDF:
 * multiple_choice, true_false, fill_blank, multiple_select, ordering, matching, multi_yes_no,
 * punnett_practice, short_answer, flowchart, and crop_engineering.
 */
export function evaluateMasterAnswer(
  qType: string,
  correctAnswer: unknown,
  studentAnswer: unknown,
  points: number
): { isCorrect: boolean; scoreAwarded: number; feedback: string } {
  if (studentAnswer === undefined || studentAnswer === null || studentAnswer === '') {
    return { isCorrect: false, scoreAwarded: 0, feedback: 'Unanswered' };
  }

  // Multiple Choice, True/False, Fill Blank, Flowchart, Crop Engineering, Punnett Practice
  if (
    qType === 'multiple_choice' ||
    qType === 'true_false' ||
    qType === 'fill_blank' ||
    qType === 'flowchart' ||
    qType === 'crop_engineering' ||
    qType === 'punnett_practice'
  ) {
    const isCorrect = String(studentAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();
    return {
      isCorrect,
      scoreAwarded: isCorrect ? points : 0,
      feedback: isCorrect ? 'Correct!' : 'Incorrect',
    };
  }

  // Multiple Select
  if (qType === 'multiple_select') {
    if (!Array.isArray(studentAnswer) || !Array.isArray(correctAnswer)) {
      return { isCorrect: false, scoreAwarded: 0, feedback: 'Incorrect format' };
    }
    const setA = new Set(studentAnswer.map((s) => String(s).trim().toLowerCase()));
    const setB = new Set(correctAnswer.map((s) => String(s).trim().toLowerCase()));
    const isCorrect = setA.size === setB.size && [...setA].every((item) => setB.has(item));
    return {
      isCorrect,
      scoreAwarded: isCorrect ? points : 0,
      feedback: isCorrect ? 'All correct options selected!' : 'Incorrect selection',
    };
  }

  // Multi-Yes/No
  if (qType === 'multi_yes_no') {
    if (typeof studentAnswer !== 'object' || typeof correctAnswer !== 'object') {
      return { isCorrect: false, scoreAwarded: 0, feedback: 'Incomplete' };
    }
    const studentObj = studentAnswer as Record<string, string>;
    const correctObj = correctAnswer as Record<string, string>;
    const keys = Object.keys(correctObj);
    let matched = 0;
    keys.forEach((k) => {
      if (String(studentObj[k]).toUpperCase() === String(correctObj[k]).toUpperCase()) {
        matched++;
      }
    });
    const isCorrect = matched === keys.length;
    const partialScore = Math.round((matched / keys.length) * points);
    return {
      isCorrect,
      scoreAwarded: partialScore,
      feedback: `${matched} of ${keys.length} items classified correctly`,
    };
  }

  // Matching
  if (qType === 'matching') {
    if (typeof studentAnswer !== 'object' || typeof correctAnswer !== 'object') {
      return { isCorrect: false, scoreAwarded: 0, feedback: 'Incomplete' };
    }
    const studentObj = studentAnswer as Record<string, string>;
    const correctObj = correctAnswer as Record<string, string>;
    const keys = Object.keys(correctObj);
    let matched = 0;
    keys.forEach((k) => {
      if (String(studentObj[k]).trim().toUpperCase() === String(correctObj[k]).trim().toUpperCase()) {
        matched++;
      }
    });
    const isCorrect = matched === keys.length;
    const partialScore = Math.round((matched / keys.length) * points);
    return {
      isCorrect,
      scoreAwarded: partialScore,
      feedback: `${matched} of ${keys.length} terms matched correctly`,
    };
  }

  // Ordering / Sequencing
  if (qType === 'ordering') {
    if (!Array.isArray(studentAnswer) || !Array.isArray(correctAnswer)) {
      return { isCorrect: false, scoreAwarded: 0, feedback: 'Incomplete sequence' };
    }
    const isCorrect = studentAnswer.length === correctAnswer.length &&
      studentAnswer.every((val, idx) => Number(val) === Number(correctAnswer[idx]));
    return {
      isCorrect,
      scoreAwarded: isCorrect ? points : 0,
      feedback: isCorrect ? 'Sequence is completely accurate!' : 'Sequence is out of order',
    };
  }

  // Short Answer / Essay (verified keywords or student review)
  if (qType === 'short_answer') {
    const text = String(studentAnswer).trim().toLowerCase();
    const minLengthMet = text.length >= 10;
    // Award points if student provided a thoughtful response
    return {
      isCorrect: minLengthMet,
      scoreAwarded: minLengthMet ? points : 0,
      feedback: minLengthMet ? 'Response recorded. Compare with verified answer key below.' : 'Response too short',
    };
  }

  return { isCorrect: false, scoreAwarded: 0, feedback: 'Unknown format' };
}

