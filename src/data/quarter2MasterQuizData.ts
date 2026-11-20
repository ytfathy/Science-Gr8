/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Quarter 2 Master Assessment Quiz Bank — Chemical Processes & Equations
 * 100% Source-Extracted from: chemical-processes-grade-6-study-guide_22b91fa8.pdf
 * (10 Pages, 4 Curriculum Modules, 61 Complete Question & Answer Key Exercises)
 */

import { MasterQuestion } from './masterQuizData.js';

export const Q2_MASTER_MODULES = [
  {
    num: 1,
    title: 'Module 1: Lesson 1 — Chemical Reactions',
    pages: 'Pages 2–4',
    sources: 'HMH Unit 4 Lesson 1 (Pages 4–19)',
    questionCount: 17,
  },
  {
    num: 2,
    title: 'Module 2: Lesson 2 — Chemical Equations',
    pages: 'Pages 4–6',
    sources: 'HMH Unit 4 Lesson 2 (Pages 20–39)',
    questionCount: 16,
  },
  {
    num: 3,
    title: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    pages: 'Pages 6–8',
    sources: 'HMH Unit 4 Lesson 3 (Pages 40–59)',
    questionCount: 15,
  },
  {
    num: 4,
    title: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    pages: 'Pages 8–10',
    sources: 'HMH Unit 4 Review & Task (Pages 60–66)',
    questionCount: 13,
  },
];

export const Q2_MASTER_QUIZ_QUESTIONS: MasterQuestion[] = [
  // =========================================================================
  // MODULE 1: LESSON 1 — CHEMICAL REACTIONS (PAGES 2–4) — 17 QUESTIONS
  // =========================================================================
  {
    id: 'q2m1_q01',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Unit Starter Q2',
    page: 2,
    points: 20,
    type: 'multiple_select',
    question: 'Unit Starter Q2 (Camping Scene Changes): Which TWO of these changes are chemical reactions?',
    options: [
      '(A) Changing leaves',
      '(B) Chopping wood',
      '(C) Burning firewood',
      '(D) Boiling water',
    ],
    correctAnswer: ['(A) Changing leaves', '(C) Burning firewood'],
    explanation:
      'Changing leaf colors involves chlorophyll breakdown and pigment synthesis (chemical reaction). Burning firewood involves combustion with oxygen to produce ash, water vapor, and CO₂. Chopping wood and boiling water are physical changes.',
  },
  {
    id: 'q2m1_q02',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 1 Q1',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'Iron pyrite is commonly called "fool\'s gold" because it looks like real gold, but is not. How can you distinguish real gold from iron pyrite?',
    options: [
      'Measure multiple characteristic properties: gold has higher density (~19.3 vs ~5.0 g/cm³), is soft/malleable, and leaves a yellow-gold streak',
      'Compare only their yellow metallic color and surface luster',
      'Break both pieces in half to see which weighs more overall',
      'Place both in water to see which one dissolves completely',
    ],
    correctAnswer:
      'Measure multiple characteristic properties: gold has higher density (~19.3 vs ~5.0 g/cm³), is soft/malleable, and leaves a yellow-gold streak',
    explanation:
      'While both share a yellow metallic luster, real gold has much higher density (~19.3 g/cm³ vs. ~5.0 g/cm³ for pyrite), is soft and malleable (pyrite is brittle and hard), and leaves a yellow-gold streak (pyrite leaves a greenish-black streak).',
  },
  {
    id: 'q2m1_q03',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 1 Q2',
    page: 2,
    points: 10,
    type: 'true_false',
    question: 'Sample A and Sample B Solubility: When tested in water, Sample A completely dissolved while Sample B did not dissolve. True or False: Sample A and Sample B are the same substance.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation:
      'No, Sample A and Sample B are different substances. Solubility is a characteristic physical property, so different solubilities prove they are different substances.',
  },
  {
    id: 'q2m1_q04',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 1 Q3',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'Two nails were left outside in the rain. Nail 1 rusted into reddish iron oxide while Nail 2 did not react or rust at all. Are the two nails made of the same substance?',
    options: [
      'No — reactivity with water and oxygen is a chemical property, proving they are composed of different materials',
      'Yes — both nails are metal, so rusting is only a physical difference',
      'Yes — Nail 2 simply received less rain than Nail 1',
      'Cannot be determined because reactivity is not a property of matter',
    ],
    correctAnswer:
      'No — reactivity with water and oxygen is a chemical property, proving they are composed of different materials',
    explanation:
      'Nail 1 reacted with water and oxygen to form rust (iron oxide, a new substance). Nail 2 did not react under identical conditions, confirming different chemical reactivity and composition.',
  },
  {
    id: 'q2m1_q05',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 1 Q4–Q7',
    page: 3,
    points: 15,
    type: 'multiple_choice',
    question: 'Do the Math: Sample A has mass 5.5 g and volume 5.5 mL (freezes at 0 °C). Sample B has mass 10.4 g and volume 7.0 mL (freezes at 75 °C). Both are colorless, odorless, and boil at 100 °C. What are their densities and are they the same substance?',
    options: [
      'Sample A = 1.0 g/mL; Sample B ≈ 1.49 g/mL — They are DIFFERENT substances',
      'Sample A = 1.0 g/mL; Sample B ≈ 1.49 g/mL — They are the SAME substance',
      'Sample A = 5.5 g/mL; Sample B = 10.4 g/mL — They are DIFFERENT substances',
      'Sample A = 0.67 g/mL; Sample B = 1.0 g/mL — They are the SAME substance',
    ],
    correctAnswer: 'Sample A = 1.0 g/mL; Sample B ≈ 1.49 g/mL — They are DIFFERENT substances',
    explanation:
      'Density = mass / volume: 5.5/5.5 = 1.0 g/mL and 10.4/7.0 ≈ 1.49 g/mL. Despite matching color, odor, and boiling point, their different freezing points and densities prove they are different substances.',
  },
  {
    id: 'q2m1_q06',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 2 Q9',
    page: 3,
    points: 20,
    type: 'multi_yes_no',
    question: 'Sawing Wood Physical Change: Compare the cut wood to the original piece of wood. Mark YES if the property stays the SAME, or NO if it is DIFFERENT:',
    subItems: [
      { feature: 'Size and shape', description: 'Geometry of the cut wood vs. original wood', expected: 'NO' },
      { feature: 'Substance', description: 'Cellulose/lignin wood material itself', expected: 'YES' },
      { feature: 'Particles', description: 'Underlying wood molecules and atoms', expected: 'YES' },
      { feature: 'Chemical identity', description: 'Identity of the substance after sawing', expected: 'YES' },
    ],
    correctAnswer: {
      'Size and shape': 'NO',
      Substance: 'YES',
      Particles: 'YES',
      'Chemical identity': 'YES',
    },
    explanation:
      'Cutting or sawing wood is a physical change: size and shape are DIFFERENT, while the substance, particles, and chemical identity remain the SAME.',
  },
  {
    id: 'q2m1_q07',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 2 Q10',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'Why doesn\'t a change in a physical property change the identity of a substance?',
    options: [
      'Because the particles (molecules/atoms) and their internal bonds remain unchanged',
      'Because physical changes permanently create new atoms',
      'Because thermal energy cannot enter a substance during physical changes',
      'Because physical changes only occur in gases',
    ],
    correctAnswer: 'Because the particles (molecules/atoms) and their internal bonds remain unchanged',
    explanation:
      'A physical change only alters particle spacing, motion, or physical arrangement—not internal chemical bonds (e.g., crumpling aluminum foil leaves every particle pure metallic aluminum).',
  },
  {
    id: 'q2m1_q08',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 2 Q11–Q12',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'When baking soda (sodium bicarbonate) and vinegar (acetic acid) are mixed, what forms and does a reaction take place?',
    options: [
      'Carbon dioxide gas (CO₂), water, and sodium acetate form; a chemical reaction takes place',
      'Only dissolved baking soda forms; it is a physical change',
      'Oxygen gas boils out of the vinegar without changing either substance',
      'No new substances form because bubbles only indicate boiling',
    ],
    correctAnswer: 'Carbon dioxide gas (CO₂), water, and sodium acetate form; a chemical reaction takes place',
    explanation:
      'Mixing solid sodium bicarbonate with liquid acetic acid produces vigorous bubbling as CO₂ gas, liquid water, and sodium acetate are formed.',
  },
  {
    id: 'q2m1_q09',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 2 Q13',
    page: 3,
    points: 20,
    type: 'matching',
    question: 'Classifying Common Everyday Changes: Match each everyday occurrence to Chemical Reaction (A) or Physical Change (B):',
    matchingPairs: [
      { term: 'Rusting bicycle', matchLetter: 'A', definition: 'Chemical reaction (iron forms iron oxide)' },
      { term: 'Effervescent tablet fizzing in water', matchLetter: 'A', definition: 'Chemical reaction (new gas produced)' },
      { term: 'Breaking glass', matchLetter: 'B', definition: 'Physical change (size/shape altered only)' },
      { term: 'Rotting forest log', matchLetter: 'A', definition: 'Chemical reaction (decomposition into new substances)' },
    ],
    correctAnswer: {
      'Rusting bicycle': 'A',
      'Effervescent tablet fizzing in water': 'A',
      'Breaking glass': 'B',
      'Rotting forest log': 'A',
    },
    explanation:
      'Rusting, fizzing effervescent tablets, and rotting logs produce new substances (chemical reactions); breaking glass alters form without changing composition (physical change).',
  },
  {
    id: 'q2m1_q10',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 2 Q14–Q15',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'A weathered metal bucket shows broken-off parts (A), dents/bends (B), and dark reddish color changes (D). Which change resulted from a chemical reaction?',
    options: [
      'D — dark reddish color change caused by rust (iron oxide) forming with oxygen and moisture',
      'A — broken-off parts caused by mechanical force',
      'B — dents and bends in the metal rim',
      'All three (A, B, and D) are chemical reactions',
    ],
    correctAnswer:
      'D — dark reddish color change caused by rust (iron oxide) forming with oxygen and moisture',
    explanation:
      'Breaking and denting are mechanical physical changes. The dark reddish rust (iron oxide) forms when iron chemically reacts with atmospheric oxygen and moisture.',
  },
  {
    id: 'q2m1_q11',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 2 Q16',
    page: 3,
    points: 20,
    type: 'multiple_select',
    question: 'Engineer It (Water Pipe Delivery Materials): Which criteria must engineers prioritize when selecting materials for municipal drinking water pipes?',
    options: [
      'Non-reactivity and corrosion resistance with water and chlorine',
      'Non-toxicity (no leaching of lead or toxins)',
      'Mechanical pressure tolerance, long-term durability, and cost',
      'High flammability and rapid rusting with oxygen',
    ],
    correctAnswer: [
      'Non-reactivity and corrosion resistance with water and chlorine',
      'Non-toxicity (no leaching of lead or toxins)',
      'Mechanical pressure tolerance, long-term durability, and cost',
    ],
    explanation:
      'Municipal pipes must resist corrosion/chemical reaction with water and chlorine, avoid toxic leaching, withstand pressure, and stay durable and cost-effective for decades.',
  },
  {
    id: 'q2m1_q12',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Hands-On Lab: Mix It Up!',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'Hands-On Lab (Mix It Up!): Bag 1 contained baking soda + powdered sugar. Bag 2 contained baking soda + calcium chloride + water. In which bag did a chemical reaction occur?',
    options: [
      'Bag 2 only — it produced fizzing gas, exothermic heat, and a milky white precipitate',
      'Bag 1 only — the two white powders reacted immediately',
      'Both Bag 1 and Bag 2 underwent chemical reactions',
      'Neither bag underwent a chemical reaction',
    ],
    correctAnswer:
      'Bag 2 only — it produced fizzing gas, exothermic heat, and a milky white precipitate',
    explanation:
      'Bag 1 showed no temperature change, bubbling, or new substances (physical mixture). Bag 2 fizzed vigorously, released heat, and formed a white calcium carbonate precipitate.',
  },
  {
    id: 'q2m1_q13',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 3 Q17–Q19',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'When evaluating signs of chemical reactions, what distinguishes "may indicate" from "definite evidence"?',
    options: [
      'Bubbles, color change, or warming MAY indicate a reaction; DEFINITE evidence requires confirming a new substance with different properties',
      'Melting or dissolving is definite evidence of a chemical reaction',
      'Any bubble formation is always definite proof of a chemical reaction',
      'Color changes never occur during physical mixing',
    ],
    correctAnswer:
      'Bubbles, color change, or warming MAY indicate a reaction; DEFINITE evidence requires confirming a new substance with different properties',
    explanation:
      'Melting/dissolving do not indicate a reaction. Bubbles/color/temperature changes may indicate one (or just boiling/dye). Definite proof requires verifying new chemical identities.',
  },
  {
    id: 'q2m1_q14',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Exploration 3 Q20',
    page: 3,
    points: 15,
    type: 'matching',
    question: 'Candle Wick Burning vs. Wax Melting: Match each observation in a burning candle to its correct classification:',
    matchingPairs: [
      { term: 'Wick burning', matchLetter: 'A', definition: 'Chemical reaction (combustion into CO₂ & soot)' },
      { term: 'Wax melting', matchLetter: 'B', definition: 'Physical change (solid-to-liquid phase change)' },
      { term: 'Light and heat generation', matchLetter: 'C', definition: 'Indicates an exothermic chemical reaction' },
    ],
    correctAnswer: {
      'Wick burning': 'A',
      'Wax melting': 'B',
      'Light and heat generation': 'C',
    },
    explanation:
      'The wick combusts with oxygen (chemical), solid wax melts into liquid wax (physical), and emitted light/heat indicates exothermic combustion.',
  },
  {
    id: 'q2m1_q15',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Take It Further: Airbags',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'Chemistry & Engineering (Automobile Airbags): How does an airbag inflate in milliseconds upon crash-sensor activation?',
    options: [
      'Solid sodium azide (NaN₃) rapidly decomposes into a massive volume of non-toxic nitrogen gas (N₂)',
      'Liquid water inside the steering wheel freezes and expands',
      'Compressed air is slowly pumped in over 5 seconds',
      'Baking soda and vinegar mix inside the dashboard',
    ],
    correctAnswer:
      'Solid sodium azide (NaN₃) rapidly decomposes into a massive volume of non-toxic nitrogen gas (N₂)',
    explanation:
      'Rapid production of a huge volume of nitrogen gas from a small mass of solid NaN₃ proves a chemical reaction, meeting design criteria for <50 ms deployment, non-toxicity, and shelf stability.',
  },
  {
    id: 'q2m1_q16',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Lesson 1 Phenomenon',
    page: 4,
    points: 20,
    type: 'short_answer',
    question: 'Driving Question (Burning Match Phenomenon): What patterns can you observe to decide if the matter in a match changed while it burned? State your claim, evidence, and reasoning.',
    correctAnswer:
      'Claim: The matter in the match underwent a chemical reaction, forming new substances. Evidence: Black charred carbon color change, smoke/gas release, distinct pungent odor, and light/thermal energy emitted. Reasoning: Wood and match-head chemicals reacted with oxygen to form new substances with different properties.',
    verifiedAnswerKey:
      'Claim: Chemical reaction formed new substances. Evidence: Color change to black char, smoke/gases, pungent odor, light and heat. Reasoning: Original wood/head substances reacted with atmospheric O₂ to create new substances.',
    explanation:
      'Multiple observable signs plus permanent property transformation (wood → black charred carbon and gases) confirm combustion is a chemical reaction.',
  },
  {
    id: 'q2m1_q17',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Lesson 1 — Chemical Reactions',
    sourceDoc: 'Lesson 1 Checkpoints Q3–Q7',
    page: 4,
    points: 15,
    type: 'multiple_choice',
    question: 'Lesson 1 Checkpoints: Which everyday example is a chemical change (Q5), and what does vigorous bubbling of one metal in acid while another does not bubble prove (Q7)?',
    options: [
      'An apple turning brown is a chemical change; the two metal samples are different substances',
      'Ice melting is a chemical change; the two metal samples are identical',
      'Wood floating in water is a chemical change; both metals have equal reactivity',
      'Cutting an apple is a chemical change; acid does not test chemical properties',
    ],
    correctAnswer:
      'An apple turning brown is a chemical change; the two metal samples are different substances',
    explanation:
      'Apple browning is enzymatic oxidation (chemical). Different bubbling reactivity in acid confirms the two metal samples have different chemical properties and are different substances.',
  },

  // =========================================================================
  // MODULE 2: LESSON 2 — CHEMICAL EQUATIONS (PAGES 4–6) — 16 QUESTIONS
  // =========================================================================
  {
    id: 'q2m2_q01',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 1 Q1',
    page: 4,
    points: 10,
    type: 'multiple_choice',
    question: 'Toy Block Coding Analogy: How do the codes R₂, BR₂, and YR₄ describe connected toy blocks?',
    options: [
      'Letters represent block color (Red, Blue, Yellow), and subscripts indicate how many blocks of that color are attached',
      'Letters represent block weight, and subscripts represent temperature',
      'BR₂ means 2 blue blocks attached to 1 red block',
      'Subscripts can be freely changed without changing which block assembly is described',
    ],
    correctAnswer:
      'Letters represent block color (Red, Blue, Yellow), and subscripts indicate how many blocks of that color are attached',
    explanation:
      'R₂ = 2 red; BR₂ = 1 blue + 2 red; YR₄ = 1 yellow + 4 red. This mirrors how chemical symbols and subscripts describe molecular composition.',
  },
  {
    id: 'q2m2_q02',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 1 Q2',
    page: 4,
    points: 10,
    type: 'multiple_choice',
    question: 'How does the chemical formula H₂O describe a single model of a water molecule?',
    options: [
      'H represents hydrogen with subscript 2 (two H atoms), and O represents one oxygen atom (fixed 2:1 ratio)',
      'It represents 1 hydrogen atom and 2 oxygen atoms',
      'It represents 2 separate oxygen molecules bonded to hydrogen',
      'It means 2 complete molecules of HO',
    ],
    correctAnswer:
      'H represents hydrogen with subscript 2 (two H atoms), and O represents one oxygen atom (fixed 2:1 ratio)',
    explanation:
      'When no subscript follows an element symbol (O), exactly 1 atom is present. H₂O specifies 2 hydrogen atoms bonded to 1 oxygen atom.',
  },
  {
    id: 'q2m2_q03',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 1 Q3',
    page: 4,
    points: 20,
    type: 'matching',
    question: 'Sulfuric Acid & Word Bank Formulas: Match each chemical formula to its exact atom composition:',
    matchingPairs: [
      { term: 'H₂SO₄ (Sulfuric acid)', matchLetter: 'A', definition: '2 H, 1 S, 4 O atoms' },
      { term: 'NH₃ (Ammonia)', matchLetter: 'B', definition: '1 N, 3 H atoms' },
      { term: 'CO₂ (Carbon dioxide)', matchLetter: 'C', definition: '1 C, 2 O atoms' },
      { term: 'O₂ (Oxygen gas)', matchLetter: 'D', definition: '2 O atoms' },
    ],
    correctAnswer: {
      'H₂SO₄ (Sulfuric acid)': 'A',
      'NH₃ (Ammonia)': 'B',
      'CO₂ (Carbon dioxide)': 'C',
      'O₂ (Oxygen gas)': 'D',
    },
    explanation:
      'Subscripts define the exact number of atoms of each respective element in each molecule.',
  },
  {
    id: 'q2m2_q04',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 1 Q4',
    page: 4,
    points: 15,
    type: 'multiple_choice',
    question: 'Atom Counting with Parentheses: How many atoms of each element are in the compound (CH₃)₂N?',
    options: [
      'Carbon (C) = 2; Hydrogen (H) = 6; Nitrogen (N) = 1 (Total: 9 atoms)',
      'Carbon (C) = 1; Hydrogen (H) = 6; Nitrogen (N) = 1 (Total: 8 atoms)',
      'Carbon (C) = 2; Hydrogen (H) = 5; Nitrogen (N) = 2 (Total: 9 atoms)',
      'Carbon (C) = 2; Hydrogen (H) = 3; Nitrogen (N) = 1 (Total: 6 atoms)',
    ],
    correctAnswer: 'Carbon (C) = 2; Hydrogen (H) = 6; Nitrogen (N) = 1 (Total: 9 atoms)',
    explanation:
      'The subscript 2 outside parentheses multiplies everything inside: 2 × 1 C = 2 C and 2 × 3 H = 6 H. Nitrogen sits outside with no subscript, so 1 N.',
  },
  {
    id: 'q2m2_q05',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 1 Q5',
    page: 4,
    points: 10,
    type: 'fill_blank',
    question: 'Missing Subscript in Phosphoric Acid Model (H₃PO?): The model shows 3 hydrogen, 1 phosphorus, and 4 oxygen atoms. Choose the complete formula:',
    options: ['H₃PO₄', 'H₃PO₃', 'H₄PO₃', 'H₃P₄O'],
    correctAnswer: 'H₃PO₄',
    explanation:
      'The missing subscript on oxygen is 4, giving H₃PO₄ (3 H, 1 P, 4 O).',
  },
  {
    id: 'q2m2_q06',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 1 Q6',
    page: 5,
    points: 15,
    type: 'multiple_choice',
    question: 'Mineral Formula Decomposition: How many oxygen atoms are in Grossular Ca₃Al₂(SiO₄)₃ and in Malachite Cu₂CO₃(OH)₂?',
    options: [
      'Grossular has 12 O atoms; Malachite has 5 O atoms',
      'Grossular has 7 O atoms; Malachite has 4 O atoms',
      'Grossular has 12 O atoms; Malachite has 6 O atoms',
      'Grossular has 4 O atoms; Malachite has 3 O atoms',
    ],
    correctAnswer: 'Grossular has 12 O atoms; Malachite has 5 O atoms',
    explanation:
      'In Grossular, (SiO₄)₃ gives 3 × 4 = 12 O atoms. In Malachite, CO₃ gives 3 O and (OH)₂ gives 2 O, for 3 + 2 = 5 O atoms total.',
  },
  {
    id: 'q2m2_q07',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 2 Q7–Q8',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'Robot Model Analogy: How are changes happening when toy robots are taken apart and rebuilt similar to a chemical reaction?',
    options: [
      'Existing parts detach and reassemble into new robots without creating or destroying any parts',
      'Old robot pieces vanish permanently and brand-new pieces appear from nothing',
      'Robots change color only without detaching any connections',
      'Total mass of the robot parts decreases after reassembly',
    ],
    correctAnswer:
      'Existing parts detach and reassemble into new robots without creating or destroying any parts',
    explanation:
      'In chemical reactions, reactant bonds break and the exact same constituent atoms regroup into new product molecules without gaining or losing matter.',
  },
  {
    id: 'q2m2_q08',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 2 Q9',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'In the chemical equation H₂ + Cl₂ → 2HCl, what does the large number 2 on the right side represent?',
    options: [
      'A coefficient indicating that TWO separate molecules of hydrogen chloride (HCl) are formed',
      'A subscript showing that only hydrogen has 2 atoms while chlorine has 1',
      'The temperature needed for the reaction to begin',
      'Two extra chlorine atoms created during the reaction',
    ],
    correctAnswer:
      'A coefficient indicating that TWO separate molecules of hydrogen chloride (HCl) are formed',
    explanation:
      'A coefficient applies to the entire compound that follows it, multiplying both H and Cl by 2 (2 H atoms and 2 Cl atoms total).',
  },
  {
    id: 'q2m2_q09',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 2 Q10',
    page: 5,
    points: 15,
    type: 'multiple_choice',
    question: 'True Statements Regarding All Chemical Equations: Complete the three blanks — (1) A chemical ___ shows both reactants and products; (2) The same number of ___ are always present on both sides; (3) The arrow points to the ___.',
    options: [
      '(1) EQUATION; (2) ATOMS; (3) PRODUCTS',
      '(1) FORMULA; (2) MOLECULES; (3) REACTANTS',
      '(1) SUBSCRIPT; (2) COEFFICIENTS; (3) REACTANTS',
      '(1) EQUATION; (2) COMPOUNDS; (3) SUBSCRIPTS',
    ],
    correctAnswer: '(1) EQUATION; (2) ATOMS; (3) PRODUCTS',
    explanation:
      'Every balanced chemical equation shows reactants on the left, an arrow pointing to products on the right, and identical atom counts on both sides.',
  },
  {
    id: 'q2m2_q10',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 2 Q11–Q12',
    page: 5,
    points: 20,
    type: 'matching',
    question: 'Language SmArts (Matching Written Descriptions to Balanced Equations): Match each reaction description to its balanced chemical equation:',
    matchingPairs: [
      { term: 'Sodium sulfide + hydrochloric acid', matchLetter: 'A', definition: 'Na₂S + 2HCl → 2NaCl + H₂S' },
      { term: 'Zinc + hydrochloric acid', matchLetter: 'B', definition: 'Zn + 2HCl → ZnCl₂ + H₂' },
      { term: 'Carbonic acid breakdown', matchLetter: 'C', definition: 'H₂CO₃ → H₂O + CO₂' },
      { term: 'Iron rusting (iron + oxygen)', matchLetter: 'D', definition: '4Fe + 3O₂ → 2Fe₂O₃' },
    ],
    correctAnswer: {
      'Sodium sulfide + hydrochloric acid': 'A',
      'Zinc + hydrochloric acid': 'B',
      'Carbonic acid breakdown': 'C',
      'Iron rusting (iron + oxygen)': 'D',
    },
    explanation:
      'Each written description matches its exact balanced chemical equation conserving every element across reactants and products.',
  },
  {
    id: 'q2m2_q11',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Hands-On Lab: Bottle Investigation',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'In the Baking Soda & Vinegar Bottle Lab (NaHCO₃ + C₂H₄O₂ → NaC₂H₃O₂ + H₂O + CO₂), what happened to the reactant atoms (1 Na, 5 H, 3 C, 5 O)?',
    options: [
      'They rearranged into sodium acetate, water, and carbon dioxide gas with zero atoms lost',
      'The carbon and oxygen atoms were destroyed to create foaming',
      'Only the vinegar atoms changed while baking soda stayed unchanged',
      'New carbon atoms were created from the heat of the room',
    ],
    correctAnswer:
      'They rearranged into sodium acetate, water, and carbon dioxide gas with zero atoms lost',
    explanation:
      'Rapid foaming/bubbling and CO₂ gas evolution prove a chemical reaction in which every reactant atom (1 Na, 5 H, 3 C, 5 O) regroups into the products.',
  },
  {
    id: 'q2m2_q12',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 3 Q13–Q14',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'Hydrogen Peroxide Decomposition & Packaging: What balanced equation models hydrogen peroxide breakdown, and why is it sold in dark brown/amber bottles?',
    options: [
      '2H₂O₂ → 2H₂O + O₂; opaque dark amber bottles block ultraviolet light that accelerates decomposition',
      'H₂O₂ → H₂ + O₂; clear glass bottles let sunlight keep it fresh',
      '2H₂O₂ → 2H₂O + 2O₂; dark bottles keep it frozen',
      'H₂O + O₂ → H₂O₂; amber bottles trap extra oxygen gas from air',
    ],
    correctAnswer:
      '2H₂O₂ → 2H₂O + O₂; opaque dark amber bottles block ultraviolet light that accelerates decomposition',
    explanation:
      'UV light speeds up hydrogen peroxide breakdown (2H₂O₂ → 2H₂O + O₂), so engineers use opaque brown/amber containers to block UV radiation.',
  },
  {
    id: 'q2m2_q13',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 3 Q15–Q20',
    page: 5,
    points: 15,
    type: 'multiple_choice',
    question: 'Methane Combustion Atom Balance (CH₄ + 2O₂ → CO₂ + 2H₂O): What are the exact atom counts on BOTH the reactant side and the product side?',
    options: [
      'C = 1, H = 4, O = 4 on both sides',
      'C = 1, H = 4, O = 2 on both sides',
      'C = 2, H = 4, O = 4 on both sides',
      'C = 1, H = 2, O = 3 on both sides',
    ],
    correctAnswer: 'C = 1, H = 4, O = 4 on both sides',
    explanation:
      'Reactants: 1 C, 4 H, and 2×2 = 4 O. Products: 1 C (in CO₂), 2×2 = 4 H (in 2H₂O), and 2 O (in CO₂) + 2 O (in 2H₂O) = 4 O.',
  },
  {
    id: 'q2m2_q14',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 3 Q21',
    page: 5,
    points: 20,
    type: 'multi_yes_no',
    question: 'Do the Math (Balanced vs. Not Balanced): Mark YES if the equation is BALANCED, or NO if it is NOT BALANCED:',
    subItems: [
      { feature: '(1) C₂H₆ + 5O₂ → 2CO₂ + 3H₂O', description: 'Compare O atoms: 10 left vs. 7 right', expected: 'NO' },
      { feature: '(2) 3CO + Fe₂O₃ → 2Fe + 3CO₂', description: '3 C, 2 Fe, 6 O on both sides', expected: 'YES' },
      { feature: '(3) H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O', description: '4 H, 1 S, 6 O, 2 Na on both sides', expected: 'YES' },
      { feature: '(4) 2AgNO₃ + CaCl₂ → 2AgCl + Ca(NO₃)₂', description: '2 Ag, 2 N, 6 O, 1 Ca, 2 Cl on both sides', expected: 'YES' },
    ],
    correctAnswer: {
      '(1) C₂H₆ + 5O₂ → 2CO₂ + 3H₂O': 'NO',
      '(2) 3CO + Fe₂O₃ → 2Fe + 3CO₂': 'YES',
      '(3) H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O': 'YES',
      '(4) 2AgNO₃ + CaCl₂ → 2AgCl + Ca(NO₃)₂': 'YES',
    },
    explanation:
      'Equation (1) has 10 O atoms on the left vs. only 7 O atoms on the right (NOT BALANCED). Equations (2), (3), and (4) have equal atom counts on both sides.',
  },
  {
    id: 'q2m2_q15',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Exploration 3 Q22–Q23 & Take It Further',
    page: 6,
    points: 15,
    type: 'multiple_choice',
    question: 'Which pair of chemical equations is correctly balanced using coefficients only?',
    options: [
      'Pb(NO₃)₂ + 2NaI → PbI₂ + 2NaNO₃  AND  4Al + 3O₂ → 2Al₂O₃',
      'Pb(NO₃)₂ + NaI → PbI₂ + NaNO₃  AND  Al + O₂ → Al₂O₃',
      'Pb(NO₃)₂ + 2NaI → PbI₂ + NaNO₃  AND  2Al + 3O₂ → 2Al₂O₃',
      'Pb(NO₃)₂ + NaI₂ → PbI₂ + Na(NO₃)₂  AND  2Al + O₃ → Al₂O₃',
    ],
    correctAnswer: 'Pb(NO₃)₂ + 2NaI → PbI₂ + 2NaNO₃  AND  4Al + 3O₂ → 2Al₂O₃',
    explanation:
      'Adding coefficient 2 balances Pb(NO₃)₂ + 2NaI → PbI₂ + 2NaNO₃ (1 Pb, 2 N, 6 O, 2 Na, 2 I). For aluminum oxide, 4Al + 3O₂ → 2Al₂O₃ balances 4 Al and 6 O.',
  },
  {
    id: 'q2m2_q16',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Lesson 2 — Chemical Equations',
    sourceDoc: 'Lesson 2 Phenomenon & Checkpoints Q3–Q7',
    page: 6,
    points: 15,
    type: 'multiple_choice',
    question: 'Lesson 2 Checkpoints: Why does mass remain 55 g in a sealed flask (Phenomenon), and how many oxygen atoms are in 2Fe(OH)₃ (Q7)?',
    options: [
      'All atoms including CO₂ gas stay contained in the closed system; 2Fe(OH)₃ contains 6 oxygen atoms',
      'The balloon creates extra mass; 2Fe(OH)₃ contains 3 oxygen atoms',
      'Mass only stays constant in open systems; 2Fe(OH)₃ contains 2 oxygen atoms',
      'No gas is produced by baking soda and vinegar; 2Fe(OH)₃ contains 5 oxygen atoms',
    ],
    correctAnswer:
      'All atoms including CO₂ gas stay contained in the closed system; 2Fe(OH)₃ contains 6 oxygen atoms',
    explanation:
      'A sealed balloon traps CO₂ gas so total mass remains 55 g. In 2Fe(OH)₃, subscript 3 gives 3 O per unit and coefficient 2 multiplies by 2: 2 × 3 = 6 oxygen atoms.',
  },

  // =========================================================================
  // MODULE 3: LESSON 3 — THERMAL ENERGY & CHEMICAL PROCESSES (PAGES 6–8) — 15 Qs
  // =========================================================================
  {
    id: 'q2m3_q01',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 1 Q1',
    page: 6,
    points: 10,
    type: 'multiple_choice',
    question: 'Glowing hot steel parts cool quickly and stop glowing. What happens to the thermal energy as the steel cools?',
    options: [
      'Thermal energy transfers from the hot steel into the cooler surrounding air via conduction, convection, and radiation',
      'Cold energy flows from the room air into the steel until the energy disappears',
      'The thermal energy is permanently destroyed as the metal darkens',
      'The kinetic energy of the iron atoms increases as the steel cools',
    ],
    correctAnswer:
      'Thermal energy transfers from the hot steel into the cooler surrounding air via conduction, convection, and radiation',
    explanation:
      'As thermal energy leaves the hot steel into cooler air, the kinetic energy of its iron atoms decreases until the metal reaches ambient room temperature.',
  },
  {
    id: 'q2m3_q02',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 1 Q2',
    page: 6,
    points: 10,
    type: 'multiple_choice',
    question: 'A 490 °C piece of metal is submerged in 24 °C water. In which direction does thermal energy flow?',
    options: [
      'Strictly from the 490 °C metal into the 24 °C water (warmer to cooler) until thermal equilibrium is reached',
      'From the 24 °C water into the 490 °C metal until the metal freezes',
      'Equally in both directions from the very first instant',
      'Thermal energy does not transfer between solids and liquids',
    ],
    correctAnswer:
      'Strictly from the 490 °C metal into the 24 °C water (warmer to cooler) until thermal equilibrium is reached',
    explanation:
      'Heat transfers spontaneously down the temperature gradient from higher temperature matter to lower temperature matter until equilibrium.',
  },
  {
    id: 'q2m3_q03',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 1 Q3',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'Why do the contents of an insulated ice chest stay cold even though the outside air is warm?',
    options: [
      '(D) The ice chest slows the flow of thermal energy from the warm environment to the ice and drinks',
      '(A) The foam walls generate coldness inside the cooler',
      '(B) The cooler destroys heat before it touches the ice',
      '(C) The ice chest increases conduction from the outside air',
    ],
    correctAnswer:
      '(D) The ice chest slows the flow of thermal energy from the warm environment to the ice and drinks',
    explanation:
      'Insulating foam walls drastically reduce conduction, convection, and radiation from the warm outside air into the cooler.',
  },
  {
    id: 'q2m3_q04',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 1 Q4',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'Why do objects in the cold vacuum of space NOT cool as quickly as expected?',
    options: [
      '(B) There is no matter in space to transfer thermal energy to by conduction or convection',
      '(A) Space is actually hotter than Earth\'s atmosphere everywhere',
      '(C) Electromagnetic radiation is blocked in a vacuum',
      '(D) Metal objects cannot lose thermal energy in zero gravity',
    ],
    correctAnswer:
      '(B) There is no matter in space to transfer thermal energy to by conduction or convection',
    explanation:
      'Conduction and convection require physical matter particles. In a vacuum, heat can only escape via radiation, which is slower at moderate temperatures.',
  },
  {
    id: 'q2m3_q05',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 1 Q5',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'Ice cubes sit on a room-temperature (~20 °C) tabletop in room air. Which way should thermal energy flow arrows point?',
    options: [
      'Inward from the warmer surrounding air and tabletop into the 0 °C ice cubes',
      'Outward from the 0 °C ice cubes into the warmer tabletop',
      'Only upward from the tabletop while air transfers no energy',
      'No arrows, because melting does not involve energy transfer',
    ],
    correctAnswer: 'Inward from the warmer surrounding air and tabletop into the 0 °C ice cubes',
    explanation:
      'Because the room air and tabletop (~20 °C) are warmer than the ice (0 °C), thermal energy flows inward into the ice cubes, causing them to melt.',
  },
  {
    id: 'q2m3_q06',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 2 Q6',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'When the metal tab is clicked in a reusable sodium acetate hand warmer, crystals form and temperature rises to 50.1 °C. Which energy transformation occurs?',
    options: [
      '(A) Chemical potential energy is transformed into thermal energy',
      '(B) Thermal energy is transformed into gravitational potential energy',
      '(C) Nuclear energy is converted into sound energy',
      '(D) Thermal energy is absorbed from the hand to freeze the pouch',
    ],
    correctAnswer: '(A) Chemical potential energy is transformed into thermal energy',
    explanation:
      'Crystallization of supersaturated sodium acetate is an exothermic process that releases stored chemical potential energy as heat.',
  },
  {
    id: 'q2m3_q07',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 2 Q7',
    page: 7,
    points: 15,
    type: 'matching',
    question: 'Exothermic vs. Endothermic Matching: Match each process and temperature change to its thermal classification:',
    matchingPairs: [
      { term: 'Iron rusting (20.6 °C → 26.5 °C)', matchLetter: 'A', definition: 'RELEASES thermal energy (Exothermic)' },
      { term: 'Rock salt dissolving (-0.8 °C → -8.0 °C)', matchLetter: 'B', definition: 'ABSORBS thermal energy (Endothermic)' },
    ],
    correctAnswer: {
      'Iron rusting (20.6 °C → 26.5 °C)': 'A',
      'Rock salt dissolving (-0.8 °C → -8.0 °C)': 'B',
    },
    explanation:
      'Rusting releases heat into the surroundings (raising temp = exothermic); dissolving rock salt absorbs ambient heat (lowering temp = endothermic).',
  },
  {
    id: 'q2m3_q08',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 2 Q8–Q10',
    page: 7,
    points: 15,
    type: 'multiple_choice',
    question: 'Do the Math (Combustion Energy): Hydrogen = 286 kJ/unit, Ethanol = 1,371 kJ/unit, Propane = 2,219 kJ/unit. Which releases the most energy per single unit, AND which releases more energy per second: 6 units H₂/s or 1 unit ethanol/s?',
    options: [
      'Propane releases most per unit (2,219 kJ); 6 units H₂/s (1,716 kJ/s) releases more per second than 1 unit ethanol/s (1,371 kJ/s)',
      'Hydrogen releases most per unit; 1 unit ethanol/s releases more per second',
      'Ethanol releases most per unit; both release equal energy per second',
      'Propane releases most per unit; 1 unit ethanol/s (1,371 kJ/s) exceeds 6 units H₂/s',
    ],
    correctAnswer:
      'Propane releases most per unit (2,219 kJ); 6 units H₂/s (1,716 kJ/s) releases more per second than 1 unit ethanol/s (1,371 kJ/s)',
    explanation:
      '6 × 286 kJ = 1,716 kJ/s vs. 1 × 1,371 kJ = 1,371 kJ/s. Energy release rate depends on both reactant identity and mass combusted per second.',
  },
  {
    id: 'q2m3_q09',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 2 Q11',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'How does increasing the reaction rate affect the thermal energy of a reacting system?',
    options: [
      '(C) It increases the rate at which energy is transformed, but NOT the total amount of energy of the system',
      '(A) It increases the total amount of chemical energy stored in the reactants',
      '(B) It decreases the total energy released by the reaction',
      '(D) It prevents thermal energy from moving into the surroundings',
    ],
    correctAnswer:
      '(C) It increases the rate at which energy is transformed, but NOT the total amount of energy of the system',
    explanation:
      'Reaction rate dictates how fast chemical energy converts into thermal energy per second; total energy yield is bounded by the total quantity of reactants.',
  },
  {
    id: 'q2m3_q10',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 2 Q12–Q13',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'When ammonium chloride dissolves in water, temperature drops (endothermic). How can the dissolution rate be increased?',
    options: [
      'Crush the crystals into powder (increase surface area) and stir vigorously',
      'Freeze the water first and avoid stirring',
      'Use one single large crystal lump instead of smaller particles',
      'Seal the container in a dark room',
    ],
    correctAnswer: 'Crush the crystals into powder (increase surface area) and stir vigorously',
    explanation:
      'Dissolving ammonium chloride converts absorbed thermal energy into chemical energy; increasing surface area and stirring increases particle collision frequency.',
  },
  {
    id: 'q2m3_q11',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Hands-On Lab: Reaction to the Rescue',
    page: 7,
    points: 15,
    type: 'multiple_choice',
    question: 'Hands-On Lab (Reaction to the Rescue): Four pairs were tested (100 mL liquid + 10 g solid): (1) Vinegar + Steel Wool, (2) Vinegar + Baking Soda, (3) Water + CaCl₂, (4) Water + NH₄Cl. Which pair is optimal for a portable chemical cold pack?',
    options: [
      'Pair 4 (Water + Ammonium Chloride) — absorbs heat strongly without producing dangerous CO₂ gas pressure',
      'Pair 2 (Vinegar + Baking Soda) — produces huge volumes of CO₂ gas to inflate the pouch',
      'Pair 3 (Water + CaCl₂) — releases intense heat',
      'Pair 1 (Vinegar + Steel Wool) — releases heat slowly',
    ],
    correctAnswer:
      'Pair 4 (Water + Ammonium Chloride) — absorbs heat strongly without producing dangerous CO₂ gas pressure',
    explanation:
      'Pairs 1 and 3 are exothermic. Pair 2 is endothermic but produces large volumes of CO₂ gas (rupture risk). Pair 4 cools strongly with no gas pressure.',
  },
  {
    id: 'q2m3_q12',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Exploration 3 Q14–Q18',
    page: 7,
    points: 20,
    type: 'multiple_select',
    question: 'Cold Pack Packaging & Disaster Relief Meal Warmer Engineering: Select ALL valid engineering criteria/constraints from Exploration 3:',
    options: [
      'Cold pack container must be flexible (contour to joints), watertight, and keep water/solid separate until squeezed',
      'Disaster meal warmer criteria: heat meals >60 °C in under 10 minutes, compact and lightweight',
      'Disaster meal warmer constraints: non-toxic reactants, no open flame, low cost (e.g., Flameless Ration Heater)',
      'Cold pack container should build up maximum explosive gas pressure',
    ],
    correctAnswer: [
      'Cold pack container must be flexible (contour to joints), watertight, and keep water/solid separate until squeezed',
      'Disaster meal warmer criteria: heat meals >60 °C in under 10 minutes, compact and lightweight',
      'Disaster meal warmer constraints: non-toxic reactants, no open flame, low cost (e.g., Flameless Ration Heater)',
    ],
    explanation:
      'Cold packs require flexible, watertight, on-demand activation pouches. Flameless Ration Heaters use exothermic magnesium-iron oxidation to safely heat meals >60 °C without flame.',
  },
  {
    id: 'q2m3_q13',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Take It Further: Haber-Bosch',
    page: 8,
    points: 10,
    type: 'multiple_choice',
    question: 'Industrial Scaling (Haber-Bosch Ammonia Synthesis: N₂ + 3H₂ → 2NH₃): Why was thermal energy release a major engineering problem, and how did Carl Bosch solve it?',
    options: [
      'Massive exothermic heat build-up threatened reactor rupture; Bosch designed high-strength alloy reactors with cooling water jackets',
      'The reaction froze the pipes; Bosch added electric heaters',
      'No energy was released, so Bosch added salt catalysts to start it',
      'Ammonia could only be produced in open wooden barrels',
    ],
    correctAnswer:
      'Massive exothermic heat build-up threatened reactor rupture; Bosch designed high-strength alloy reactors with cooling water jackets',
    explanation:
      'Cooling water jackets safely absorbed and carried away excess exothermic thermal energy, maintaining optimal reaction temperatures without catastrophic failure.',
  },
  {
    id: 'q2m3_q14',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Lesson 3 Phenomenon',
    page: 8,
    points: 20,
    type: 'short_answer',
    question: 'Driving Question (Emergency Cold Pack for an Athlete): How can defining systems and using an engineering design process help develop a solution to cool a sports injury?',
    correctAnswer:
      'Claim: An engineered chemical cold pack absorbs thermal energy from the injured tissue system via conduction. Defining the ankle and cold pack as interacting systems guides selection of a safe endothermic process (ammonium chloride + water) that draws heat out of swollen tissue to reduce swelling.',
    verifiedAnswerKey:
      'Define injured ankle and cold pack as interacting systems; select safe endothermic chemical process (NH₄Cl + water) that absorbs thermal energy from warmer tissue via conduction to reduce swelling.',
    explanation:
      'Thermal energy flows from the warmer injured ankle into the cooler endothermic pack via conduction, meeting safety, flexibility, and cooling criteria.',
  },
  {
    id: 'q2m3_q15',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Lesson 3 — Thermal Energy & Chemical Processes',
    sourceDoc: 'Lesson 3 Checkpoints Q3–Q7',
    page: 8,
    points: 15,
    type: 'multiple_choice',
    question: 'Lesson 3 Checkpoints: If 3 g of endothermic Process G drops temperature by 4 °C, what does doubling the reactant mass to 6 g match (Q4), and how does a sleeping bag keep a camper warm (Q5)?',
    options: [
      'Process H (−7.0 °C, nearly double cooling); sleeping bag slows thermal energy transfer from body to cold air',
      'Temperature rises by +4 °C; sleeping bag generates its own exothermic heat',
      'Temperature drop stays exactly 4 °C; sleeping bag speeds up convection',
      'Process becomes exothermic; sleeping bag blocks radiation only',
    ],
    correctAnswer:
      'Process H (−7.0 °C, nearly double cooling); sleeping bag slows thermal energy transfer from body to cold air',
    explanation:
      'Doubling endothermic reactant mass doubles thermal energy absorbed (~7–8 °C drop = Process H). Insulation slows conductive/convective heat loss from the body to cold air.',
  },

  // =========================================================================
  // MODULE 4: UNIT 4 REVIEW & PERFORMANCE TASK (PAGES 8–10) — 13 QUESTIONS
  // =========================================================================
  {
    id: 'q2m4_q01',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Unit 4 Connections',
    page: 8,
    points: 15,
    type: 'multiple_choice',
    question: 'Thermite Reaction State & NASA Nanosensors: In Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (temperatures >2,500 °C; Fe melting point = 1,538 °C, boiling point = 2,862 °C), what physical state is the produced iron, and what material does Dr. Mahmooda Sultana use at NASA?',
    options: [
      'Liquid (molten state) iron; single-atom-thick carbon sheets (graphene) and nanocrystal nanosensors',
      'Solid iron powder; liquid mercury thermometers',
      'Gaseous iron vapor; solid copper coils',
      'Frozen iron crystals; plastic polymer lenses',
    ],
    correctAnswer:
      'Liquid (molten state) iron; single-atom-thick carbon sheets (graphene) and nanocrystal nanosensors',
    explanation:
      '2,500 °C exceeds iron\'s melting point (1,538 °C) while staying below its boiling point (2,862 °C), yielding molten liquid iron. Dr. Sultana builds graphene nanosensors at NASA.',
  },
  {
    id: 'q2m4_q02',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q1',
    page: 8,
    points: 15,
    type: 'multi_yes_no',
    question: 'Review Q1 (Fried vs. Whisked Eggs): Mark YES if the image represents a CHEMICAL REACTION, or NO if it does NOT:',
    subItems: [
      { feature: 'Fried eggs', description: 'Heat denatures egg proteins and forms new chemical bonds', expected: 'YES' },
      { feature: 'Whisked raw eggs', description: 'Beating and mixing liquid egg in a bowl', expected: 'NO' },
    ],
    correctAnswer: {
      'Fried eggs': 'YES',
      'Whisked raw eggs': 'NO',
    },
    explanation:
      'Frying chemically denatures proteins and permanently alters color, texture, and taste (chemical reaction). Whisking is strictly a physical change.',
  },
  {
    id: 'q2m4_q03',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q2',
    page: 8,
    points: 20,
    type: 'multiple_select',
    question: 'Review Q2 (Temperature & Egg Reaction Rates): Which statements are TRUE about the reaction rates of cooked eggs? (Select all that apply)',
    options: [
      '(B) Increasing temperature causes the reaction to occur more quickly',
      '(C) At higher temperatures, particles have more kinetic energy and move faster',
      '(A) Lowering temperature speeds up protein cooking',
      '(D) Temperature has zero effect on molecular collision speed',
    ],
    correctAnswer: [
      '(B) Increasing temperature causes the reaction to occur more quickly',
      '(C) At higher temperatures, particles have more kinetic energy and move faster',
    ],
    explanation:
      'Higher thermal energy raises average kinetic energy of protein molecules, creating more frequent and forceful collisions that accelerate cooking.',
  },
  {
    id: 'q2m4_q04',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q3',
    page: 8,
    points: 10,
    type: 'multiple_choice',
    question: 'Review Q3: Other than frying an egg, what is another way an egg can undergo a chemical change?',
    options: [
      '(C) Boiling in hot water',
      '(A) Scrambling raw in a bowl',
      '(B) Mixing two eggs in a bowl',
      '(D) Dropping an egg on the floor',
    ],
    correctAnswer: '(C) Boiling in hot water',
    explanation:
      'Boiling transfers thermal energy to cook and chemically denature the egg proteins. Scrambling raw, mixing, or dropping are strictly physical changes.',
  },
  {
    id: 'q2m4_q05',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q4',
    page: 8,
    points: 10,
    type: 'multiple_choice',
    question: 'Review Q4 (Effervescent Tablet Graph): Reaction times were Cold (18 °C) = 71 s, Warm (34 °C) = 31.5 s, Hot (68 °C) = 21 s. Why does increasing water temperature increase reaction rate?',
    options: [
      '(B) Faster moving particles will come into contact with each other more frequently',
      '(A) Hot water creates extra tablet atoms during the reaction',
      '(C) Cold water destroys the carbon dioxide inside the tablet',
      '(D) Higher temperature slows down water molecules so they stay near the tablet longer',
    ],
    correctAnswer: '(B) Faster moving particles will come into contact with each other more frequently',
    explanation:
      'Higher temperature imparts greater kinetic energy to water molecules, causing more frequent collisions per second with the solid tablet.',
  },
  {
    id: 'q2m4_q06',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q5',
    page: 9,
    points: 20,
    type: 'matching',
    question: 'Review Q5 (Comprehensive Changes Matrix): Match each type of change to how it affects atoms and chemical properties:',
    matchingPairs: [
      { term: 'Physical Changes', matchLetter: 'A', definition: 'Internal atomic arrangement and chemical properties remain unchanged' },
      { term: 'Chemical Reactions', matchLetter: 'B', definition: 'Bonds break and atoms regroup into new products with new properties' },
      { term: 'Changes in Energy', matchLetter: 'C', definition: 'Energy is absorbed (endothermic) or released (exothermic) during bond/phase shifts' },
    ],
    correctAnswer: {
      'Physical Changes': 'A',
      'Chemical Reactions': 'B',
      'Changes in Energy': 'C',
    },
    explanation:
      'Physical changes preserve atomic identity; chemical reactions rearrange atoms into new substances; energy changes govern thermal absorption or release.',
  },
  {
    id: 'q2m4_q07',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q6',
    page: 9,
    points: 15,
    type: 'multiple_choice',
    question: 'Review Q6 (Propane Grill Combustion: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O): Identify the reactants, products, and total atom counts on each side:',
    options: [
      'Reactants: C₃H₈ + 5O₂; Products: 3CO₂ + 4H₂O; Atoms: C = 3, H = 8, O = 10 on both sides',
      'Reactants: 3CO₂ + 4H₂O; Products: C₃H₈ + 5O₂; Atoms: C = 3, H = 8, O = 10',
      'Reactants: C₃H₈ + 5O₂; Products: 3CO₂ + 4H₂O; Atoms: C = 3, H = 8, O = 6',
      'Reactants: C₃H₈ + O₂; Products: CO₂ + H₂O; Atoms: C = 1, H = 2, O = 3',
    ],
    correctAnswer:
      'Reactants: C₃H₈ + 5O₂; Products: 3CO₂ + 4H₂O; Atoms: C = 3, H = 8, O = 10 on both sides',
    explanation:
      'Reactants have 3 C, 8 H, and 5×2 = 10 O. Products have 3 C (in 3CO₂), 4×2 = 8 H (in 4H₂O), and 6 O + 4 O = 10 O. Matter is conserved.',
  },
  {
    id: 'q2m4_q08',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q7',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'Review Q7: What is an indicator that food on a barbecue grill is undergoing a chemical reaction?',
    options: [
      'Browning/charring of the surface, distinct cooking aromas (odor change), and permanent texture hardening',
      'The food simply moving from one side of the grate to the other',
      'Ice cubes melting inside a nearby cooler',
      'Cutting vegetables into smaller slices before grilling',
    ],
    correctAnswer:
      'Browning/charring of the surface, distinct cooking aromas (odor change), and permanent texture hardening',
    explanation:
      'Thermal energy drives Maillard browning reactions between amino acids and sugars, producing new flavor, aroma, and color compounds.',
  },
  {
    id: 'q2m4_q09',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q8–Q9',
    page: 9,
    points: 15,
    type: 'multiple_choice',
    question: 'Review Q8–Q9: How does thermal energy flow on a grill, and what are three ways to increase the cooking reaction rate?',
    options: [
      'From hot grill/flames to cooler food via conduction & radiation; increase grill temp, cut food smaller (surface area), close lid (trap convection)',
      'From food to flames; lower grill temp, keep food in large blocks, leave lid open',
      'Only by conduction; freeze food first and increase distance from flames',
      'Thermal energy does not affect cooking reaction rates',
    ],
    correctAnswer:
      'From hot grill/flames to cooler food via conduction & radiation; increase grill temp, cut food smaller (surface area), close lid (trap convection)',
    explanation:
      'Higher heat increases particle kinetic energy, cutting food increases exposed surface area, and closing the lid traps convective heat.',
  },
  {
    id: 'q2m4_q10',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q10–Q11',
    page: 9,
    points: 15,
    type: 'multiple_choice',
    question: 'Review Q10–Q11: What balanced chemical equation represents iron (Fe) and oxygen gas (O₂) reacting to form rust (iron (III) oxide, Fe₂O₃)?',
    options: [
      '4Fe + 3O₂ → 2Fe₂O₃ (Four solid iron atoms react with three O₂ molecules to form two Fe₂O₃ units)',
      '2Fe + O₂ → Fe₂O₃',
      'Fe + O₃ → FeO₃',
      '4Fe + 2O₂ → 2Fe₂O₃',
    ],
    correctAnswer:
      '4Fe + 3O₂ → 2Fe₂O₃ (Four solid iron atoms react with three O₂ molecules to form two Fe₂O₃ units)',
    explanation:
      'Both sides have exactly 4 iron atoms and 6 oxygen atoms (3 × 2 = 2 × 3), conserving matter as iron and oxygen regroup into an Fe₂O₃ ionic lattice.',
  },
  {
    id: 'q2m4_q11',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q12',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'Review Q12 (Thermodynamics of Rusting): Iron rusting is a slow exothermic reaction. What does that mean about its energy transfer?',
    options: [
      'Stored chemical energy transforms into thermal energy and dissipates gradually into the air over days or weeks',
      'It absorbs thermal energy from the air and freezes the bicycle chain',
      'It releases zero thermal energy unless set on fire',
      'It creates new energy out of atmospheric oxygen',
    ],
    correctAnswer:
      'Stored chemical energy transforms into thermal energy and dissipates gradually into the air over days or weeks',
    explanation:
      'Because rusting is slow, its exothermic thermal release is gradual and hard to feel without sensitive instruments.',
  },
  {
    id: 'q2m4_q12',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Review Q13',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'Review Q13 (Salt as a Catalyst): Salt can act as a catalyst for iron oxide formation. What happens if a bicycle chain is exposed to salt water?',
    options: [
      'The bike rusts significantly faster because dissolved salt (NaCl) creates an electrolyte solution that speeds electron transfer',
      'Salt completely prevents rusting by coating the iron',
      'Salt turns the iron into aluminum oxide',
      'Salt slows down oxidation so the chain lasts twice as long',
    ],
    correctAnswer:
      'The bike rusts significantly faster because dissolved salt (NaCl) creates an electrolyte solution that speeds electron transfer',
    explanation:
      'A catalyst accelerates a chemical reaction without being consumed; dissolved NaCl dramatically speeds up iron oxidation.',
  },
  {
    id: 'q2m4_q13',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Unit 4 Review & Sea Turtle Eggs Performance Task',
    sourceDoc: 'Performance Task (Pages 9–10)',
    page: 10,
    points: 20,
    type: 'multiple_choice',
    question: 'Performance Task (Save the Sea Turtle Eggs!): To transport endangered eggs for ≥30 min safely between 27 °C and 33 °C (never >35 °C), which chemical warmer system wins and why?',
    options: [
      'Option B (Fine Iron Powder + Salt + Water) — catalyzed exothermic oxidation sustains gentle 28–32 °C warmth for 45–90 min with flexible sand/flannel buffering',
      'Option A (Ammonium Nitrate + Water) — endothermic dissolution cools eggs to ~12 °C',
      'Option C (Sodium Acetate + Metal Disc) — spikes to 54 °C and turns rock-hard within 20 min',
      'Both Option A and Option C meet all temperature and duration criteria',
    ],
    correctAnswer:
      'Option B (Fine Iron Powder + Salt + Water) — catalyzed exothermic oxidation sustains gentle 28–32 °C warmth for 45–90 min with flexible sand/flannel buffering',
    explanation:
      'Option A chills embryos (~12 °C, REJECT); Option C spikes to 54 °C and hardens (UNSUITABLE); Option B maintains 28–32 °C steadily for 45–90 min safely inside an insulated polystyrene transport box.',
  },
];
