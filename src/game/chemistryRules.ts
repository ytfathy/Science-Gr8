/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Pure scientific calculations & simulation engines for Quarter 2:
 * Chemical Processes and Equations (Tracing Matter and Energy)
 */

export interface SubstanceSampleResult {
  densityGPerMl: number;
  matchesReferenceWater: boolean;
}

/**
 * Calculates density (mass / volume) rounded to 2 decimal places.
 */
export function calculateDensity(massG: number, volumeMl: number): number {
  if (volumeMl <= 0) return 0;
  return Math.round((massG / volumeMl) * 100) / 100;
}

/**
 * Compares two samples across multiple characteristic physical properties.
 */
export function compareSubstanceSamples(
  sampleA: { massG: number; volumeMl: number; freezingPointC: number; boilingPointC: number },
  sampleB: { massG: number; volumeMl: number; freezingPointC: number; boilingPointC: number }
): {
  densityA: number;
  densityB: number;
  areSameSubstance: boolean;
  reason: string;
} {
  const densityA = calculateDensity(sampleA.massG, sampleA.volumeMl);
  const densityB = calculateDensity(sampleB.massG, sampleB.volumeMl);

  const sameDensity = Math.abs(densityA - densityB) <= 0.05;
  const sameFreezing = sampleA.freezingPointC === sampleB.freezingPointC;
  const sameBoiling = sampleA.boilingPointC === sampleB.boilingPointC;
  const areSameSubstance = sameDensity && sameFreezing && sameBoiling;

  if (areSameSubstance) {
    return {
      densityA,
      densityB,
      areSameSubstance: true,
      reason: 'All measured characteristic properties (density, freezing point, and boiling point) match closely.',
    };
  }

  const diffs: string[] = [];
  if (!sameDensity) diffs.push(`density (${densityA} g/mL vs. ${densityB} g/mL)`);
  if (!sameFreezing) diffs.push(`freezing point (${sampleA.freezingPointC} °C vs. ${sampleB.freezingPointC} °C)`);
  if (!sameBoiling) diffs.push(`boiling point (${sampleA.boilingPointC} °C vs. ${sampleB.boilingPointC} °C)`);

  return {
    densityA,
    densityB,
    areSameSubstance: false,
    reason: `They are DIFFERENT substances because their ${diffs.join(' and ')} differ.`,
  };
}

/**
 * Parses a chemical formula (with optional leading coefficient and parentheses)
 * into an exact element -> atom count map.
 * Examples:
 *  - "H2O" -> { H: 2, O: 1 }
 *  - "(CH3)2N" -> { C: 2, H: 6, N: 1 }
 *  - "Al2(SO4)3" -> { Al: 2, S: 3, O: 12 }
 *  - "2Fe(OH)3" -> { Fe: 2, O: 6, H: 6 }
 *  - "Cu2CO3(OH)2" -> { Cu: 2, C: 1, O: 5, H: 2 }
 */
export function parseChemicalFormula(rawFormula: string): Record<string, number> {
  const trimmed = rawFormula.trim();
  if (!trimmed) return {};

  // Extract optional leading coefficient
  const coeffMatch = trimmed.match(/^(\d+)(.*)$/);
  const leadingCoeff = coeffMatch ? parseInt(coeffMatch[1], 10) : 1;
  const body = coeffMatch ? coeffMatch[2].trim() : trimmed;

  const stack: Record<string, number>[] = [{}];
  let i = 0;

  while (i < body.length) {
    const ch = body[i];

    if (ch === '(') {
      stack.push({});
      i++;
    } else if (ch === ')') {
      i++;
      let numStr = '';
      while (i < body.length && /\d/.test(body[i])) {
        numStr += body[i++];
      }
      const mult = numStr ? parseInt(numStr, 10) : 1;
      const group = stack.pop() || {};
      const top = stack[stack.length - 1];
      for (const [el, cnt] of Object.entries(group)) {
        top[el] = (top[el] || 0) + cnt * mult;
      }
    } else if (/[A-Z]/.test(ch)) {
      let symbol = ch;
      i++;
      while (i < body.length && /[a-z]/.test(body[i])) {
        symbol += body[i++];
      }
      let numStr = '';
      while (i < body.length && /\d/.test(body[i])) {
        numStr += body[i++];
      }
      const count = numStr ? parseInt(numStr, 10) : 1;
      const top = stack[stack.length - 1];
      top[symbol] = (top[symbol] || 0) + count;
    } else {
      i++;
    }
  }

  const baseCounts = stack[0] || {};
  const finalCounts: Record<string, number> = {};
  for (const [el, cnt] of Object.entries(baseCounts)) {
    finalCounts[el] = cnt * leadingCoeff;
  }
  return finalCounts;
}

export interface EquationSpecies {
  formula: string;
  name: string;
}

export interface EquationBalanceResult {
  reactantCounts: Record<string, number>;
  productCounts: Record<string, number>;
  elements: string[];
  isBalanced: boolean;
  elementStatus: { element: string; reactants: number; products: number; balanced: boolean }[];
}

/**
 * Evaluates atom conservation across reactants and products given user-selected coefficients.
 */
export function evaluateChemicalEquationBalance(
  reactants: EquationSpecies[],
  products: EquationSpecies[],
  reactantCoeffs: number[],
  productCoeffs: number[]
): EquationBalanceResult {
  const reactantCounts: Record<string, number> = {};
  const productCounts: Record<string, number> = {};

  reactants.forEach((sp, idx) => {
    const coeff = Math.max(1, Math.floor(reactantCoeffs[idx] ?? 1));
    const parsed = parseChemicalFormula(sp.formula);
    for (const [el, cnt] of Object.entries(parsed)) {
      reactantCounts[el] = (reactantCounts[el] || 0) + cnt * coeff;
    }
  });

  products.forEach((sp, idx) => {
    const coeff = Math.max(1, Math.floor(productCoeffs[idx] ?? 1));
    const parsed = parseChemicalFormula(sp.formula);
    for (const [el, cnt] of Object.entries(parsed)) {
      productCounts[el] = (productCounts[el] || 0) + cnt * coeff;
    }
  });

  const elements = Array.from(
    new Set([...Object.keys(reactantCounts), ...Object.keys(productCounts)])
  );

  const elementStatus = elements.map((el) => {
    const r = reactantCounts[el] || 0;
    const p = productCounts[el] || 0;
    return { element: el, reactants: r, products: p, balanced: r === p && r > 0 };
  });

  const isBalanced = elementStatus.length > 0 && elementStatus.every((s) => s.balanced);

  return {
    reactantCounts,
    productCounts,
    elements,
    isBalanced,
    elementStatus,
  };
}

/**
 * Models reaction time (in seconds) for an effervescent tablet based on PDF data
 * (Cold 18°C = 71s, Warm 34°C = 31.5s, Hot 68°C = 21s) plus surface area, concentration, and catalyst.
 */
export function simulateReactionRate(params: {
  temperatureC: number; // 18 to 68
  surfaceArea: 'whole' | 'crushed';
  concentration: 'low' | 'medium' | 'high';
  hasCatalyst: boolean;
}): {
  estimatedSeconds: number;
  collisionIndex: number; // 0-100
  summary: string;
} {
  // Interpolate base time from source graph anchors: (18°C -> 71s), (34°C -> 31.5s), (68°C -> 21s)
  const temp = Math.max(18, Math.min(68, params.temperatureC));
  let baseSeconds: number;
  if (temp <= 34) {
    const t = (temp - 18) / (34 - 18);
    baseSeconds = 71 - t * (71 - 31.5);
  } else {
    const t = (temp - 34) / (68 - 34);
    baseSeconds = 31.5 - t * (31.5 - 21);
  }

  let multiplier = 1.0;
  if (params.surfaceArea === 'crushed') multiplier *= 0.62;
  if (params.concentration === 'low') multiplier *= 1.3;
  if (params.concentration === 'high') multiplier *= 0.72;
  if (params.hasCatalyst) multiplier *= 0.68;

  const estimatedSeconds = Math.max(5, Math.round(baseSeconds * multiplier * 10) / 10);
  const collisionIndex = Math.min(100, Math.max(15, Math.round((71 / estimatedSeconds) * 28)));

  let summary = 'Higher temperature, greater surface area, higher concentration, and catalysts increase particle collision frequency and speed up the reaction rate—without changing the total energy stored in the reactants.';
  if (temp >= 60) {
    summary = 'Hot water gives particles high kinetic energy so they collide rapidly and forcefully (matching the 68 °C = 21 s benchmark).';
  } else if (temp <= 20) {
    summary = 'Cold water lowers particle kinetic energy, leading to slower, less frequent collisions (matching the 18 °C = 71 s benchmark).';
  }

  return {
    estimatedSeconds,
    collisionIndex,
    summary,
  };
}

export type TurtleWarmerOptionId = 'ammonium_nitrate' | 'iron_powder_salt' | 'sodium_acetate';

/**
 * Evaluates the three candidate chemical systems from the Unit 4 Performance Task:
 * Save the Sea Turtle Eggs! (Target: 27–33 °C steadily for >= 30 min, max <= 35 °C)
 */
export function evaluateTurtleEggWarmer(optionId: TurtleWarmerOptionId): {
  optionId: TurtleWarmerOptionId;
  name: string;
  reactionType: 'Endothermic dissolution' | 'Exothermic catalyzed oxidation' | 'Exothermic crystallization';
  peakTempC: number;
  durationMin: number;
  meetsCriteria: boolean;
  verdict: 'RECOMMENDED (WINNER)' | 'POOR (REJECT)' | 'UNSUITABLE';
  explanation: string;
} {
  switch (optionId) {
    case 'ammonium_nitrate':
      return {
        optionId,
        name: 'Option A: Ammonium Nitrate + Water',
        reactionType: 'Endothermic dissolution',
        peakTempC: 12,
        durationMin: 20,
        meetsCriteria: false,
        verdict: 'POOR (REJECT)',
        explanation:
          'Absorbs thermal energy and cools down to ~10–15 °C, which would chill and kill the sea turtle embryos.',
      };
    case 'sodium_acetate':
      return {
        optionId,
        name: 'Option C: Sodium Acetate + Metal Disc',
        reactionType: 'Exothermic crystallization',
        peakTempC: 54,
        durationMin: 20,
        meetsCriteria: false,
        verdict: 'UNSUITABLE',
        explanation:
          'Triggers a rapid, lethal temperature spike up to 50–54 °C (exceeding the 35 °C limit), turns rock-hard, and cools too quickly after 15–20 minutes.',
      };
    case 'iron_powder_salt':
      return {
        optionId,
        name: 'Option B: Fine Iron Powder + Salt + Water',
        reactionType: 'Exothermic catalyzed oxidation',
        peakTempC: 31,
        durationMin: 75,
        meetsCriteria: true,
        verdict: 'RECOMMENDED (WINNER)',
        explanation:
          'Salt catalyzes slow, controlled iron oxidation, releasing steady mild warmth (28–32 °C) for 45–90 minutes with zero toxic fumes and flexible cushioning.',
      };
  }
}
