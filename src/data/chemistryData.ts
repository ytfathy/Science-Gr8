/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Quarter 2 Curriculum Data: Chemical Processes and Equations
 * Source: chemical-processes-grade-6-study-guide_22b91fa8.pdf &
 *         Chemical_Processes_and_Equations__Tracing_Matter_and_Energy_8d18b79b.mp4
 */

export const Q2_VIDEO_URL =
  '/assets/aistudio/Chemical_Processes_and_Equations__Tracing_Matter_and_Energy_8d18b79b.mp4';

export interface Q2VideoChapter {
  label: string;
  timeSeconds: number;
  timeDisplay: string;
  lessonRef: 1 | 2 | 3;
}

export const Q2_VIDEO_CHAPTERS: Q2VideoChapter[] = [
  { label: 'Physical vs. Chemical Changes & Signs', timeSeconds: 0, timeDisplay: '0:00', lessonRef: 1 },
  { label: 'Chemical Equations, Subscripts & Coefficients', timeSeconds: 114, timeDisplay: '1:54', lessonRef: 2 },
  { label: 'Conservation of Matter (CH₄ & Propane)', timeSeconds: 181, timeDisplay: '3:01', lessonRef: 2 },
  { label: 'Exothermic vs. Endothermic & Thermite System', timeSeconds: 268, timeDisplay: '4:28', lessonRef: 3 },
];

export interface Q2NotebookEntry {
  id: string;
  level: number;
  category: 'Safety' | 'Reactions' | 'Equations' | 'Thermal' | 'Glossary';
  title: string;
  keyTakeaway: string;
  scientificConcept: string;
  sourceReference: string;
  icon: string;
}

export const Q2_NOTEBOOK_ENTRIES: Q2NotebookEntry[] = [
  {
    id: 'q2-note-anchor',
    level: 1,
    category: 'Reactions',
    title: 'Anchor Phenomenon: The Thermite Reaction',
    keyTakeaway: 'Fe₂O₃ + 2Al → 2Fe + Al₂O₃ releases extreme heat (>2,500 °C) and molten liquid iron while total mass stays strictly constant.',
    scientificConcept:
      'Pure iron melts at 1,538 °C and boils at 2,862 °C, so the reaction temperature produces white-hot molten iron. In a sealed closed system (e.g., 213.85 g), heat and light escape, yet net mass change Δm = 0.00 g because all 2 Fe, 3 O, and 2 Al atoms merely rearrange.',
    sourceReference: 'Unit 4 Anchor Phenomenon • Pages 1 & 8',
    icon: '🔥',
  },
  {
    id: 'q2-note-safety-ppe',
    level: 1,
    category: 'Safety',
    title: 'Laboratory Safety Protocols & Wafting',
    keyTakeaway: 'Wear goggles, gloves, and lab apron; never wear contact lenses or open-toed shoes; gently waft fumes rather than inhaling directly.',
    scientificConcept:
      'If chemicals splash on skin, clothing, or eyes, rinse immediately for at least 15 minutes and notify the teacher. Never leave hot plates unattended, use GFI-protected outlets, never handle broken glass bare-handed, and wash hands thoroughly before leaving.',
    sourceReference: 'HMH Hands-On Safety Program • Page 1',
    icon: '🥽',
  },
  {
    id: 'q2-note-properties',
    level: 1,
    category: 'Reactions',
    title: 'Physical vs. Chemical Properties & Changes',
    keyTakeaway: 'Physical changes alter appearance/state without changing substance identity; chemical reactions break and form bonds to create new substances.',
    scientificConcept:
      'Physical properties (density, melting/boiling point, solubility, color, malleability) can be measured without changing identity. Chemical properties (flammability, reactivity with oxygen/water) describe how a substance transforms. Multiple properties must be checked—e.g., Sample A (1.0 g/mL, freezes 0 °C) vs. Sample B (1.49 g/mL, freezes 75 °C).',
    sourceReference: 'Lesson 1 Essentials • Pages 2–3',
    icon: '🧪',
  },
  {
    id: 'q2-note-signs',
    level: 1,
    category: 'Reactions',
    title: 'Five Observable Signs vs. Definite Evidence',
    keyTakeaway: 'Heat/light release, precipitate, color change, gas bubbles, and odor change MAY indicate a reaction; definite proof requires verifying new substance properties.',
    scientificConcept:
      'Boiling water makes bubbles and food coloring changes color without creating new substances. In the Mix It Up! lab, Bag 2 (baking soda + CaCl₂ + water) produced fizzing, exothermic heat, and a white calcium carbonate precipitate. In airbags, solid sodium azide (NaN₃) rapidly decomposes into N₂ gas in <50 ms.',
    sourceReference: 'Lesson 1 Explorations 2–3 • Pages 2–4',
    icon: '🫧',
  },
  {
    id: 'q2-note-formulas',
    level: 2,
    category: 'Equations',
    title: 'Chemical Formulas, Subscripts & Parentheses',
    keyTakeaway: 'Subscripts define molecular identity (never change when balancing); coefficients multiply the entire formula to show how many units react.',
    scientificConcept:
      'No subscript means 1 atom. Parentheses group atoms and outer subscripts multiply everything inside: Al₂(SO₄)₃ has 2 Al, 3 S, 12 O; (CH₃)₂N has 2 C, 6 H, 1 N; and 2Fe(OH)₃ has 2 Fe, 6 O, and 6 H atoms.',
    sourceReference: 'Lesson 2 Exploration 1 • Pages 4–6',
    icon: '⚛️',
  },
  {
    id: 'q2-note-conservation',
    level: 2,
    category: 'Equations',
    title: 'Law of Conservation of Matter & Closed Systems',
    keyTakeaway: 'Matter is neither created nor destroyed; balanced equations have identical atom counts on reactant and product sides.',
    scientificConcept:
      'In a sealed flask with a balloon (closed system), baking soda + vinegar (NaHCO₃ + C₂H₄O₂ → NaC₂H₃O₂ + H₂O + CO₂) stays at 55 g because CO₂ gas is trapped. Removing the balloon (open system) lets CO₂ escape into room air so the balance reading drops.',
    sourceReference: 'Lesson 2 Explorations 2–3 • Pages 4–6',
    icon: '⚖️',
  },
  {
    id: 'q2-note-heat-transfer',
    level: 3,
    category: 'Thermal',
    title: 'Systems & Three Mechanisms of Heat Transfer',
    keyTakeaway: 'Thermal energy flows spontaneously strictly from warmer objects to cooler objects via conduction, convection, or radiation.',
    scientificConcept:
      'Conduction transfers heat via direct particle collisions (solids); convection moves heat via fluid density currents (liquids/gases); radiation transmits infrared electromagnetic waves even through the vacuum of outer space where no matter exists.',
    sourceReference: 'Lesson 3 Exploration 1 • Pages 6–7',
    icon: '🌡️',
  },
  {
    id: 'q2-note-exo-endo',
    level: 3,
    category: 'Thermal',
    title: 'Exothermic vs. Endothermic & Reaction Rates',
    keyTakeaway: 'Exothermic reactions release heat (temp rises); endothermic processes absorb heat (temp drops). Rate depends on concentration, temperature, surface area, and catalysts.',
    scientificConcept:
      'Examples: sodium acetate hand warmers (50.1 °C) and rusting iron (20.6 → 26.5 °C) are exothermic; ammonium chloride cold packs and dissolving rock salt (-0.8 → -8.0 °C) are endothermic. Increasing reaction rate speeds energy transformation per second without changing total energy available.',
    sourceReference: 'Lesson 3 Explorations 2–3 • Pages 6–8',
    icon: '❄️',
  },
  {
    id: 'q2-note-engineering',
    level: 3,
    category: 'Thermal',
    title: 'Thermal Engineering: Cold Packs, Haber-Bosch & Sea Turtle Eggs',
    keyTakeaway: 'Engineers balance criteria (target temp, speed, portability) and constraints (non-toxic, no gas rupture, low cost).',
    scientificConcept:
      'Water + NH₄Cl makes the best portable cold pack (cools strongly with no CO₂ gas buildup). Carl Bosch added cooling water jackets to N₂ + 3H₂ → 2NH₃ reactors. For endangered sea turtle eggs (target 27–33 °C for ≥30 min), fine iron powder + salt + water provides steady, safe 28–32 °C warmth for 45–90 minutes.',
    sourceReference: 'Lesson 3 & Performance Task • Pages 7–10',
    icon: '🐢',
  },
  {
    id: 'q2-note-glossary',
    level: 1,
    category: 'Glossary',
    title: 'Master Scientific Vocabulary (17 Core Terms)',
    keyTakeaway: 'Physical/Chemical Property, Physical Change, Chemical Reaction, Reactants, Products, Precipitate, Formula, Subscript, Coefficient, Conservation of Matter, System, Thermal Energy, Conduction/Convection/Radiation, Exothermic, Endothermic, Reaction Rate Variables.',
    scientificConcept:
      'Precipitate = solid insoluble substance forming from liquid solution (e.g., yellow PbI₂ from clear Pb(NO₃)₂ + 2NaI). System = defined set of interacting parts, matter, and energy studied together. Catalysts accelerate reactions (like salt water accelerating bicycle rusting) without being consumed.',
    sourceReference: 'Master Vocabulary Glossary • Pages 1–2',
    icon: '📘',
  },
];

export interface Q2QuizItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const Q2_LEVEL_1_QUIZ: Q2QuizItem[] = [
  {
    id: 'q2l1_q1',
    question: 'Which two changes from a camping scene are chemical reactions?',
    options: [
      'Changing autumn leaves and burning firewood',
      'Chopping wood and boiling water',
      'Boiling water and changing autumn leaves',
      'Chopping wood and burning firewood',
    ],
    correctAnswer: 0,
    explanation:
      'Changing leaves (pigment/chlorophyll chemistry) and burning firewood (combustion into ash, CO₂, and H₂O) create new substances. Chopping wood and boiling water are physical changes.',
  },
  {
    id: 'q2l1_q2',
    question: 'Sample A (5.5 g, 5.5 mL) and Sample B (10.4 g, 7.0 mL) are both colorless, odorless, and boil at 100 °C, but freeze at 0 °C and 75 °C. What can you conclude?',
    options: [
      'They are different substances because their densities (1.0 vs. 1.49 g/mL) and freezing points differ',
      'They are the same substance because they share color, odor, and boiling point',
      'Sample B is simply a larger amount of Sample A',
      'Density cannot be used to distinguish liquid substances',
    ],
    correctAnswer: 0,
    explanation:
      'Scientists must examine multiple characteristic properties. Different densities (1.0 g/mL vs. ~1.49 g/mL) and freezing points (0 °C vs. 75 °C) prove they are different substances.',
  },
  {
    id: 'q2l1_q3',
    question: 'In the Mix It Up! lab, Bag 1 mixed baking soda and powdered sugar, while Bag 2 mixed baking soda, calcium chloride, and water. Which observation confirmed a chemical reaction in Bag 2?',
    options: [
      'Vigorous gas fizzing, exothermic temperature rise, and a milky white precipitate',
      'The two powders remained separate solids with no temperature change',
      'The water simply dissolved the sugar without bubbling',
      'Both bags showed identical physical mixtures',
    ],
    correctAnswer: 0,
    explanation:
      'Bag 1 was only a physical mixture. Bag 2 produced CO₂ gas bubbles, released thermal energy, and formed an insoluble white calcium carbonate precipitate.',
  },
  {
    id: 'q2l1_q4',
    question: 'Which of the following gives DEFINITE evidence that a chemical reaction has occurred?',
    options: [
      'Testing properties before and after to verify a new substance with different characteristic properties formed',
      'Observing bubbles forming in a heated liquid',
      'Seeing a liquid change color after adding dye',
      'Watching a solid melt into a liquid',
    ],
    correctAnswer: 0,
    explanation:
      'Bubbles (boiling water) or color changes (mixing dye) only MAY indicate a reaction. Definite evidence requires verifying new substances with different physical/chemical properties.',
  },
  {
    id: 'q2l1_q5',
    question: 'In a burning candle, how are the wick burning and the wax melting classified?',
    options: [
      'Wick burning is a chemical reaction; wax melting is a physical change',
      'Both wick burning and wax melting are physical changes',
      'Wick burning is a physical change; wax melting is a chemical reaction',
      'Neither change involves thermal energy',
    ],
    correctAnswer: 0,
    explanation:
      'The wick undergoes exothermic combustion into CO₂ and soot (chemical reaction), while solid wax absorbs heat to become liquid wax (phase/physical change).',
  },
];

export const Q2_LEVEL_2_QUIZ: Q2QuizItem[] = [
  {
    id: 'q2l2_q1',
    question: 'How many atoms of each element are in the compound (CH₃)₂N?',
    options: [
      '2 Carbon, 6 Hydrogen, 1 Nitrogen (9 total atoms)',
      '1 Carbon, 6 Hydrogen, 1 Nitrogen (8 total atoms)',
      '2 Carbon, 3 Hydrogen, 2 Nitrogen (7 total atoms)',
      '1 Carbon, 5 Hydrogen, 1 Nitrogen (7 total atoms)',
    ],
    correctAnswer: 0,
    explanation:
      'The subscript 2 outside the parentheses multiplies everything inside: 2 × 1 C = 2 C and 2 × 3 H = 6 H, plus 1 N outside = 9 total atoms.',
  },
  {
    id: 'q2l2_q2',
    question: 'How many total oxygen atoms are represented by 2Fe(OH)₃?',
    options: ['6 oxygen atoms', '3 oxygen atoms', '2 oxygen atoms', '5 oxygen atoms'],
    correctAnswer: 0,
    explanation:
      'The subscript 3 multiplies the (OH) group to give 3 oxygen atoms per unit, and the leading coefficient 2 multiplies the entire formula: 2 × 3 = 6 oxygen atoms.',
  },
  {
    id: 'q2l2_q3',
    question: 'What is the Golden Rule when balancing a chemical equation?',
    options: [
      'Only adjust coefficients; never change, add, or remove subscripts',
      'Change subscripts first until both sides match',
      'Remove extra atoms from the products side',
      'Always place a coefficient of 2 in front of every reactant',
    ],
    correctAnswer: 0,
    explanation:
      'Subscripts define the chemical identity of each substance. Coefficients scale the number of molecules without altering identity.',
  },
  {
    id: 'q2l2_q4',
    question: 'Which of the following chemical equations is NOT balanced?',
    options: [
      'C₂H₆ + 5O₂ → 2CO₂ + 3H₂O',
      '3CO + Fe₂O₃ → 2Fe + 3CO₂',
      'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
      '2AgNO₃ + CaCl₂ → 2AgCl + Ca(NO₃)₂',
    ],
    correctAnswer: 0,
    explanation:
      'In C₂H₆ + 5O₂ → 2CO₂ + 3H₂O, the left side has 10 oxygen atoms (5 × 2) while the right side has only 7 oxygen atoms (4 + 3).',
  },
  {
    id: 'q2l2_q5',
    question: 'When baking soda and vinegar react inside a flask sealed with a balloon, total mass stays at 55 g. Why does the balance reading drop after removing the balloon?',
    options: [
      'Carbon dioxide gas (CO₂) escapes into the open room air once the closed system is opened',
      'Atoms are destroyed when exposed to air',
      'Liquid water instantly disappears without changing state',
      'The Law of Conservation of Matter does not apply to gases',
    ],
    correctAnswer: 0,
    explanation:
      'All atoms are conserved. In a closed system the CO₂ gas is trapped and weighed; in an open system the gas diffuses into the room, lowering the balance reading.',
  },
];

export const Q2_LEVEL_3_QUIZ: Q2QuizItem[] = [
  {
    id: 'q2l3_q1',
    question: 'Why do hot objects in the cold vacuum of outer space NOT cool down as rapidly as expected?',
    options: [
      'There is no matter in space for conduction or convection, so heat can only escape via radiation',
      'Radiation cannot travel through empty space',
      'Thermal energy flows from colder regions to warmer regions in space',
      'Space traps heat through air convection currents',
    ],
    correctAnswer: 0,
    explanation:
      'Conduction and convection require physical matter particles. Only electromagnetic radiation can transfer thermal energy through a vacuum.',
  },
  {
    id: 'q2l3_q2',
    question: 'When a metal tab is clicked in a reusable sodium acetate hand warmer, crystals form and temperature rises to 50.1 °C. Which energy transformation occurs?',
    options: [
      'Chemical potential energy is transformed into thermal energy (exothermic)',
      'Thermal energy is absorbed and destroyed (endothermic)',
      'Light energy is converted into sound energy',
      'Thermal energy flows spontaneously from cooler hands into the hotter pack',
    ],
    correctAnswer: 0,
    explanation:
      'Crystallization of supersaturated sodium acetate is an exothermic process that converts stored chemical potential energy into thermal energy.',
  },
  {
    id: 'q2l3_q3',
    question: 'How does increasing a chemical reaction rate affect the thermal energy of a reacting system?',
    options: [
      'It increases the rate at which energy is transformed per second, but NOT the total amount of energy',
      'It doubles the total amount of chemical energy stored in the reactants',
      'It stops thermal energy from leaving the system',
      'It converts an exothermic reaction into an endothermic reaction',
    ],
    correctAnswer: 0,
    explanation:
      'Reaction rate controls how quickly chemical energy converts into thermal energy per second; total energy yield is bounded by the amount of reactants.',
  },
  {
    id: 'q2l3_q4',
    question: 'In the Reaction to the Rescue lab, why is Water + Ammonium Chloride (NH₄Cl) better for a portable cold pack than Vinegar + Baking Soda?',
    options: [
      'Water + NH₄Cl absorbs heat strongly without producing large volumes of CO₂ gas that could rupture the pouch',
      'Vinegar + baking soda is strongly exothermic and causes burns',
      'Water + NH₄Cl releases intense heat for 90 minutes',
      'Ammonium chloride produces more CO₂ gas for inflation',
    ],
    correctAnswer: 0,
    explanation:
      'Both are endothermic, but vinegar + baking soda generates high CO₂ gas pressure (rupture hazard), whereas water + NH₄Cl cools safely with no gas buildup.',
  },
  {
    id: 'q2l3_q5',
    question: 'In the Save the Sea Turtle Eggs! performance task (target 27–33 °C for ≥30 min), which candidate system is the optimal engineered solution?',
    options: [
      'Fine iron powder + salt + water (steady 28–32 °C catalyzed exothermic oxidation for 45–90 min)',
      'Ammonium nitrate + water (endothermic cooling down to ~12 °C)',
      'Sodium acetate + metal disc (spikes to 54 °C and turns rock-hard)',
      'Open flame propane burner under the transport box',
    ],
    correctAnswer: 0,
    explanation:
      'Iron powder + salt + water stays safely within the 27–33 °C zone for 45–90 minutes with flexible cushioning and no toxic fumes, whereas ammonium nitrate chills eggs and sodium acetate overheats them to 54 °C.',
  },
];

export interface BalancingChallenge {
  id: string;
  title: string;
  context: string;
  reactants: { formula: string; name: string }[];
  products: { formula: string; name: string }[];
  solutionReactants: number[];
  solutionProducts: number[];
  pdfReference: string;
}

export const BALANCING_CHALLENGES: BalancingChallenge[] = [
  {
    id: 'eq-methane',
    title: 'Methane Combustion',
    context: 'Natural gas combustion modeled in both the video explainer and Lesson 2 Q19–Q20.',
    reactants: [
      { formula: 'CH4', name: 'Methane' },
      { formula: 'O2', name: 'Oxygen gas' },
    ],
    products: [
      { formula: 'CO2', name: 'Carbon dioxide' },
      { formula: 'H2O', name: 'Water' },
    ],
    solutionReactants: [1, 2],
    solutionProducts: [1, 2],
    pdfReference: 'Page 5 • Exploration 3 Q19–Q20 (1 C, 4 H, 4 O)',
  },
  {
    id: 'eq-thermite',
    title: 'Thermite Anchor Phenomenon',
    context: 'Iron (III) oxide reacts violently with aluminum metal to yield molten iron and aluminum oxide.',
    reactants: [
      { formula: 'Fe2O3', name: 'Iron (III) oxide' },
      { formula: 'Al', name: 'Aluminum' },
    ],
    products: [
      { formula: 'Fe', name: 'Molten Iron' },
      { formula: 'Al2O3', name: 'Aluminum oxide' },
    ],
    solutionReactants: [1, 2],
    solutionProducts: [2, 1],
    pdfReference: 'Pages 1 & 8 • Anchor Phenomenon (2 Fe, 3 O, 2 Al)',
  },
  {
    id: 'eq-propane',
    title: 'Propane Grill Combustion',
    context: 'Propane burning on a barbecue grill from the video challenge and Unit 4 Review Q6.',
    reactants: [
      { formula: 'C3H8', name: 'Propane' },
      { formula: 'O2', name: 'Oxygen gas' },
    ],
    products: [
      { formula: 'CO2', name: 'Carbon dioxide' },
      { formula: 'H2O', name: 'Water' },
    ],
    solutionReactants: [1, 5],
    solutionProducts: [3, 4],
    pdfReference: 'Page 9 • Review Q6 (3 C, 8 H, 10 O)',
  },
  {
    id: 'eq-rust',
    title: 'Iron Rusting (Bicycle Oxidation)',
    context: 'Slow exothermic reaction of iron with atmospheric oxygen from Lesson 2 Q12 and Review Q11.',
    reactants: [
      { formula: 'Fe', name: 'Iron' },
      { formula: 'O2', name: 'Oxygen gas' },
    ],
    products: [{ formula: 'Fe2O3', name: 'Iron (III) oxide (Rust)' }],
    solutionReactants: [4, 3],
    solutionProducts: [2],
    pdfReference: 'Pages 5 & 9 • Q12 & Review Q11 (4 Fe, 6 O)',
  },
  {
    id: 'eq-precipitate',
    title: 'Lead Nitrate + Sodium Iodide Precipitation',
    context: 'Two clear liquids form bright yellow solid lead iodide (PbI₂) precipitate.',
    reactants: [
      { formula: 'Pb(NO3)2', name: 'Lead (II) nitrate' },
      { formula: 'NaI', name: 'Sodium iodide' },
    ],
    products: [
      { formula: 'PbI2', name: 'Lead iodide (yellow solid)' },
      { formula: 'NaNO3', name: 'Sodium nitrate' },
    ],
    solutionReactants: [1, 2],
    solutionProducts: [1, 2],
    pdfReference: 'Page 5 • Exploration 3 Q22–Q23',
  },
];

export const FORMULA_PRESETS = [
  { formula: 'H2O', name: 'Water', note: '2 H, 1 O (Lesson 2 Q2 & W2 HW Q1)' },
  { formula: '3CO2', name: '3 Units Carbon Dioxide', note: '3 C, 6 O (W2 HW1D4U4L2 Q2)' },
  { formula: 'C6H12O6', name: 'Glucose', note: '6 C, 12 H, 6 O (W2 HW1D4U4L2 Q3)' },
  { formula: 'H2SO4', name: 'Sulfuric Acid', note: '2 H, 1 S, 4 O (Lesson 2 Q3)' },
  { formula: '(CH3)2N', name: 'Dimethylamine Group', note: 'Parentheses ×2: 2 C, 6 H, 1 N (Lesson 2 Q4)' },
  { formula: 'Al2(SO4)3', name: 'Aluminum Sulfate', note: '2 Al, 3 S, 12 O (Lesson 2 & W2 HW Q4)' },
  { formula: 'Mg(NO3)2', name: 'Magnesium Nitrate', note: '1 Mg, 2 N, 6 O (W2 HW1D4U4L2 Q5)' },
  { formula: '(NH4)2SO4', name: 'Ammonium Sulfate', note: '2 N, 8 H, 1 S, 4 O (W2 HW1D4U4L2 Q6)' },
  { formula: 'Ca3(PO4)2', name: 'Calcium Phosphate', note: '3 Ca, 2 P, 8 O (W2 HW1D4U4L2 Q7)' },
  { formula: '5CH3COOH', name: '5 Units Acetic Acid', note: '10 C, 20 H, 10 O (W2 HW1D4U4L2 Q8)' },
  { formula: '4K4(Fe(CN)6)', name: '4 Units Potassium Ferrocyanide', note: '16 K, 4 Fe, 24 C, 24 N (W2 HW1D4U4L2 Q9)' },
  { formula: '2Cr2(SO4)3', name: '2 Units Chromium Sulphate', note: '4 Cr, 6 S, 24 O (W2 HW1D4U4L2 Q10)' },
  { formula: 'Ca3Al2(SiO4)3', name: 'Grossular Mineral', note: '3 Ca, 2 Al, 3 Si, 12 O (Lesson 2 Q6)' },
  { formula: 'Cu2CO3(OH)2', name: 'Malachite Mineral', note: '2 Cu, 1 C, 5 O, 2 H (Lesson 2 Q6)' },
  { formula: '2Fe(OH)3', name: '2 Units Iron(III) Hydroxide', note: '2 Fe, 6 O, 6 H (Lesson 2 Checkpoint Q7)' },
];

export interface Q2HomeworkQuestion {
  id: string;
  questionNumber: number;
  pdfPage: number;
  assignmentCode: string;
  question: string;
  formula: string;
  targetElement: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

/**
 * 100% Source-Extracted Homework Set: W2 HW1D4U4L2 (Unit 4, Lesson 2)
 * Source PDF: /assets/aistudio/G8_Science_W2_HW1D4U4L2_fa2303d0.pdf (10 Pages, Questions 1–10)
 */
export const Q2_L2_HW1_QUESTIONS: Q2HomeworkQuestion[] = [
  {
    id: 'w2_hw1_u4l2_q01',
    questionNumber: 1,
    pdfPage: 1,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'In the formula H2O, how many hydrogen atoms are present?',
    formula: 'H2O',
    targetElement: 'H',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'The subscript 2 immediately follows H in H₂O, indicating 2 hydrogen atoms per water molecule (and 1 oxygen atom).',
  },
  {
    id: 'w2_hw1_u4l2_q02',
    questionNumber: 2,
    pdfPage: 2,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'Calculate the total number of oxygen atoms in 3 formula units of CO2',
    formula: '3CO2',
    targetElement: 'O',
    options: ['3', '6', '8', '12'],
    correctAnswer: 1,
    explanation: 'One formula unit of CO₂ has 2 oxygen atoms. Multiplying by the coefficient 3 gives 3 × 2 = 6 oxygen atoms total.',
  },
  {
    id: 'w2_hw1_u4l2_q03',
    questionNumber: 3,
    pdfPage: 3,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'The molecular formula of glucose is C6H12O6. How many oxygen atoms are present in one molecule of glucose?',
    formula: 'C6H12O6',
    targetElement: 'O',
    options: ['6', '12', '18', '24'],
    correctAnswer: 0,
    explanation: 'In C₆H₁₂O₆, the subscript attached to O is 6, so one glucose molecule contains 6 oxygen atoms (along with 6 C and 12 H).',
  },
  {
    id: 'w2_hw1_u4l2_q04',
    questionNumber: 4,
    pdfPage: 4,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'In Al2(SO4)3 , how many sulfur atoms are present in one formula unit?',
    formula: 'Al2(SO4)3',
    targetElement: 'S',
    options: ['1', '3', '4', '6'],
    correctAnswer: 1,
    explanation: 'Inside the parentheses (SO₄) there is 1 sulfur atom. The outer subscript 3 multiplies everything inside: 1 × 3 = 3 sulfur atoms.',
  },
  {
    id: 'w2_hw1_u4l2_q05',
    questionNumber: 5,
    pdfPage: 7,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'In Mg(NO3)2 , how many oxygen atoms are present in total?',
    formula: 'Mg(NO3)2',
    targetElement: 'O',
    options: ['2', '3', '6', '8'],
    correctAnswer: 2,
    explanation: 'Each nitrate group (NO₃) has 3 oxygen atoms. Multiplying by the outer subscript 2 gives 3 × 2 = 6 oxygen atoms.',
  },
  {
    id: 'w2_hw1_u4l2_q06',
    questionNumber: 6,
    pdfPage: 6,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'Ammonium sulfate is (NH4)2SO4. How many hydrogen atoms are in one formula unit?',
    formula: '(NH4)2SO4',
    targetElement: 'H',
    options: ['4', '6', '8', '12'],
    correctAnswer: 2,
    explanation: 'Each ammonium group (NH₄) contains 4 hydrogen atoms. The subscript 2 outside the parentheses multiplies that by 2: 4 × 2 = 8 hydrogen atoms.',
  },
  {
    id: 'w2_hw1_u4l2_q07',
    questionNumber: 7,
    pdfPage: 5,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'The formula of calcium phosphate is Ca3(PO4)2 . How many oxygen atoms are present in one formula unit?',
    formula: 'Ca3(PO4)2',
    targetElement: 'O',
    options: ['4', '6', '8', '12'],
    correctAnswer: 2,
    explanation: 'Inside (PO₄) there are 4 oxygen atoms. Multiplying by the subscript 2 outside the parentheses yields 4 × 2 = 8 oxygen atoms.',
  },
  {
    id: 'w2_hw1_u4l2_q08',
    questionNumber: 8,
    pdfPage: 10,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'If you have 5 molecules of CH3COOH , How many hydrogen atoms are present in total?',
    formula: '5CH3COOH',
    targetElement: 'H',
    options: ['5', '10', '20', '30'],
    correctAnswer: 2,
    explanation: 'One molecule of CH₃COOH contains 3 + 1 = 4 hydrogen atoms (notice H appears twice!). Across 5 molecules: 5 × 4 = 20 hydrogen atoms.',
  },
  {
    id: 'w2_hw1_u4l2_q09',
    questionNumber: 9,
    pdfPage: 9,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'Determine the total number of each atom in 4 formula units of K4(Fe(CN)6). How many nitrogen atoms are present?',
    formula: '4K4(Fe(CN)6)',
    targetElement: 'N',
    options: ['6', '12', '24', '48'],
    correctAnswer: 2,
    explanation: 'In one formula unit of K₄(Fe(CN)₆), the (CN)₆ group has 1 × 6 = 6 nitrogen atoms. For 4 formula units: 4 × 6 = 24 nitrogen atoms (and 16 K, 4 Fe, 24 C).',
  },
  {
    id: 'w2_hw1_u4l2_q10',
    questionNumber: 10,
    pdfPage: 8,
    assignmentCode: 'W2 HW1D4U4L2',
    question: 'The formula Cr2(SO4)3 , represents chromium sulphate. How many sulfur atoms are in 2 formula units of this compound?',
    formula: '2Cr2(SO4)3',
    targetElement: 'S',
    options: ['2', '3', '6', '12'],
    correctAnswer: 2,
    explanation: 'One formula unit of Cr₂(SO₄)₃ has 1 × 3 = 3 sulfur atoms. Multiplying by 2 formula units gives 2 × 3 = 6 sulfur atoms.',
  },
];

export interface ColdPackPair {
  id: string;
  label: string;
  reactants: string;
  tempStartC: number;
  tempEndC: number;
  gasProduced: boolean;
  processType: 'Exothermic' | 'Endothermic';
  suitableForColdPack: boolean;
  observation: string;
}

export const COLD_PACK_PAIRS: ColdPackPair[] = [
  {
    id: 'pair1',
    label: 'Pair 1: Vinegar + Steel Wool',
    reactants: '100 mL Vinegar + 10 g Steel Wool',
    tempStartC: 20.6,
    tempEndC: 26.5,
    gasProduced: false,
    processType: 'Exothermic',
    suitableForColdPack: false,
    observation: 'Temperature rose (+5.9 °C) as iron oxidized/rusted—releases heat (exothermic), unsuitable for a cold pack.',
  },
  {
    id: 'pair2',
    label: 'Pair 2: Vinegar + Baking Soda',
    reactants: '100 mL Vinegar + 10 g Baking Soda',
    tempStartC: 21.0,
    tempEndC: 15.8,
    gasProduced: true,
    processType: 'Endothermic',
    suitableForColdPack: false,
    observation: 'Absorbs heat (temp drops), BUT generates large volumes of CO₂ gas that create severe pouch rupture risk.',
  },
  {
    id: 'pair3',
    label: 'Pair 3: Water + Calcium Chloride (CaCl₂)',
    reactants: '100 mL Water + 10 g CaCl₂',
    tempStartC: 21.0,
    tempEndC: 39.4,
    gasProduced: false,
    processType: 'Exothermic',
    suitableForColdPack: false,
    observation: 'Releases significant thermal energy (+18.4 °C)—works for a hot pack, NOT a cold pack.',
  },
  {
    id: 'pair4',
    label: 'Pair 4: Water + Ammonium Chloride (NH₄Cl)',
    reactants: '100 mL Water + 10 g NH₄Cl',
    tempStartC: 21.0,
    tempEndC: 11.2,
    gasProduced: false,
    processType: 'Endothermic',
    suitableForColdPack: true,
    observation: 'OPTIMAL COLD PACK CHOICE: Strongly absorbs thermal energy (−9.8 °C drop) with ZERO dangerous gas pressure!',
  },
];
