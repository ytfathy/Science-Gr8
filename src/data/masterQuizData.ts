/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Master Biological Reproduction Assessment Quiz Bank
 * Complete Question & Answer Key compiled from Source Documents S1.jpeg – S33.jpeg
 * Source File: biological_reproduction_quiz_qa_c86aff08.pdf (17 Pages, 11 Modules, 96 Questions/Exercises)
 */

export interface MasterQuestion {
  id: string;
  moduleNumber: number;
  moduleTitle: string;
  sourceDoc: string;
  page: number;
  points: number;
  type: 
    | 'multiple_choice'
    | 'true_false'
    | 'fill_blank'
    | 'multiple_select'
    | 'ordering'
    | 'matching'
    | 'multi_yes_no'
    | 'punnett_practice'
    | 'short_answer'
    | 'flowchart'
    | 'crop_engineering';
  question: string;
  options?: string[]; // for multiple choice / fill blank / true false
  correctAnswer: string | string[] | number | number[] | Record<string, string>; // verified answer
  verifiedAnswerKey?: string;
  studentResponse?: string;
  explanation?: string;
  subItems?: { feature: string; description: string; expected: string }[]; // for multi_yes_no
  orderingSteps?: { stepNum: number; text: string }[]; // for sequencing
  matchingPairs?: { term: string; matchLetter: string; definition: string }[]; // for matching
  punnettData?: { squareNum: number; parentCross: string; punnettBox: string; ratio: string };
  imageNote?: string;
}

export const MASTER_MODULES = [
  { num: 1, title: 'Module 1: Asexual vs. Sexual Reproduction Quiz', pages: 'Pages 1–2', sources: 'S1.jpeg – S5.jpeg', questionCount: 10 },
  { num: 2, title: 'Module 2: Biological Reproduction Fundamentals', pages: 'Pages 3–4', sources: 'S6.jpeg – S8.jpeg', questionCount: 10 },
  { num: 3, title: 'Module 3: Genetics & Monohybrid Punnett Squares Practice', pages: 'Page 4', sources: 'S9.jpeg', questionCount: 10 },
  { num: 4, title: 'Module 4: Seed Dispersal & Pollination Assessment', pages: 'Pages 5–6', sources: 'S10.jpeg – S12.jpeg', questionCount: 10 },
  { num: 5, title: 'Module 5: Plant Sexual Reproduction & Seed Formation', pages: 'Pages 6–9', sources: 'S13.jpeg – S18.jpeg', questionCount: 13 },
  { num: 6, title: 'Module 6: Plant Reproduction & Dispersal Mechanisms', pages: 'Pages 9–10', sources: 'S19.jpeg – S22.jpeg', questionCount: 10 },
  { num: 7, title: 'Module 7: Seed Dispersal Mechanisms Essay Worksheet', pages: 'Page 11', sources: 'S23.jpeg', questionCount: 3 },
  { num: 8, title: 'Module 8: Plant Genetics & Seed Dispersal Assessment', pages: 'Pages 11–13', sources: 'S24.jpeg – S26.jpeg', questionCount: 10 },
  { num: 9, title: 'Module 9: Advanced Plant Reproduction & Bonsai Assessment', pages: 'Pages 13–14', sources: 'S27.jpeg – S28.jpeg', questionCount: 3 },
  { num: 10, title: 'Module 10: Hybrid Plants & Selective Breeding Case Study', pages: 'Pages 14–16', sources: 'S29.jpeg – S30.jpeg', questionCount: 7 },
  { num: 11, title: 'Module 11: Animal Reproduction & Behavior Assessment', pages: 'Pages 16–17', sources: 'S31.jpeg – S33.jpeg', questionCount: 10 },
];

export const MASTER_QUIZ_QUESTIONS: MasterQuestion[] = [
  // ==========================================
  // MODULE 1: ASEXUAL VS. SEXUAL REPRODUCTION QUIZ (PAGES 1-2)
  // ==========================================
  {
    id: 'm1_q01',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 1,
    points: 10,
    type: 'multiple_choice',
    question: 'Asexual reproduction typically results in:',
    options: [
      'High genetic diversity',
      'Slow reproduction rate',
      'Offspring with traits from two parents',
      'Genetically identical offspring'
    ],
    correctAnswer: 'Genetically identical offspring',
    explanation: 'Asexual reproduction involves one parent producing offspring through mitosis or binary fission without gamete fusion, creating genetic clones.'
  },
  {
    id: 'm1_q02',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 1,
    points: 10,
    type: 'multiple_choice',
    question: 'What is the type of reproduction in which offspring are identical to the parent?',
    options: [
      'Asexual reproduction',
      'Sexual reproduction',
      'None of the above',
      'All of the above'
    ],
    correctAnswer: 'Asexual reproduction',
    explanation: 'In asexual reproduction, 100% of the genetic material is transmitted from a single parent to offspring.'
  },
  {
    id: 'm1_q03',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 1,
    points: 10,
    type: 'multiple_choice',
    question: 'Which of these organisms commonly reproduce asexually?',
    options: [
      'Humans',
      'Amoeba',
      'Birds',
      'Dogs'
    ],
    correctAnswer: 'Amoeba',
    explanation: 'Amoebas are single-celled protozoans that reproduce asexually via binary fission.'
  },
  {
    id: 'm1_q04',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 1,
    points: 10,
    type: 'multiple_choice',
    question: 'What is the primary advantage of sexual reproduction?',
    options: [
      'It requires less energy',
      'It produces many offspring quickly',
      'It allows genetic variation',
      'It happens without gametes'
    ],
    correctAnswer: 'It allows genetic variation',
    explanation: 'Sexual reproduction combines chromosomes from two parents, creating genetic variation that allows populations to adapt to shifting environments and pathogens.'
  },
  {
    id: 'm1_q05',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'In which form of reproduction do offspring inherit genes from both parents?',
    options: [
      'Asexual',
      'Budding',
      'Sexual',
      'Binary fission'
    ],
    correctAnswer: 'Sexual',
    explanation: 'Sexual reproduction blends maternal and paternal genes (50% from egg, 50% from sperm).'
  },
  {
    id: 'm1_q06',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'Which of the following is an example of asexual reproduction in plants?',
    options: [
      'Fertilization of ovules',
      'Pollination by insects',
      'Growing new plants from cuttings',
      'Formation of seeds'
    ],
    correctAnswer: 'Growing new plants from cuttings',
    explanation: 'Taking stem or root cuttings is a form of vegetative asexual propagation that produces exact genetic clones.'
  },
  {
    id: 'm1_q07',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'Which of the following is true about asexual reproduction?',
    options: [
      'It increases genetic variation',
      'It is slower than sexual reproduction',
      'It requires two parents',
      'It can occur through binary fission'
    ],
    correctAnswer: 'It can occur through binary fission',
    explanation: 'Binary fission is a major mechanism of asexual reproduction in bacteria and single-celled organisms.'
  },
  {
    id: 'm1_q08',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'Which process is NOT a type of asexual reproduction?',
    options: [
      'Binary fission',
      'Budding',
      'Fragmentation',
      'Fertilization'
    ],
    correctAnswer: 'Fertilization',
    explanation: 'Fertilization is the fusion of male and female gametes, which is the hallmark of sexual reproduction.'
  },
  {
    id: 'm1_q09',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'What is the main disadvantage of sexual reproduction compared to asexual reproduction?',
    options: [
      'It produces identical offspring',
      'It requires more time and energy',
      'It does not involve gametes',
      'It leads to fewer genetic differences'
    ],
    correctAnswer: 'It requires more time and energy',
    explanation: 'Finding mates, producing specialized gametes, courtship displays, and gestation demand significant time and metabolic energy.'
  },
  {
    id: 'm1_q10',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Asexual vs. Sexual Reproduction Quiz',
    sourceDoc: 'S1.jpeg – S5.jpeg',
    page: 2,
    points: 10,
    type: 'multiple_choice',
    question: 'What is an offspring?',
    options: [
      'A type of gamete',
      'The product of fertilization only in plants',
      'A new organism produced by a parent or parents',
      'A cell that carries genetic material'
    ],
    correctAnswer: 'A new organism produced by a parent or parents',
    explanation: 'An offspring is the biological progeny or daughter organism produced via either asexual or sexual reproduction.'
  },

  // ==========================================
  // MODULE 2: BIOLOGICAL REPRODUCTION FUNDAMENTALS (PAGES 3-4)
  // ==========================================
  {
    id: 'm2_q01',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'In _______ a single individual is the parent. The parent passes copies of its genetic material to its offspring.',
    options: [
      'Asexual reproduction',
      'Sexual reproduction'
    ],
    correctAnswer: 'Asexual reproduction',
    explanation: 'A single individual is the parent in asexual reproduction.'
  },
  {
    id: 'm2_q02',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'Most unicellular organisms reproduce sexually.',
    options: [
      'The whole statement is true.',
      'Some of the statement is false.'
    ],
    correctAnswer: 'Some of the statement is false.',
    explanation: 'Unicellular organisms primarily reproduce asexually (e.g., binary fission, budding).'
  },
  {
    id: 'm2_q03',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 3,
    points: 10,
    type: 'short_answer',
    question: 'What is reproduction?',
    correctAnswer: 'Reproduction is the biological process of creating new offspring to ensure the continuation of a species.',
    verifiedAnswerKey: 'Reproduction is the biological process of creating new offspring to ensure the continuation of a species.',
    studentResponse: '"Reproduction is the biological process of creating new offspring to ensure the continuation of a species."',
    explanation: 'Reproduction is fundamental to all biological life to prevent species extinction.'
  },
  {
    id: 'm2_q04',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'Most multicellular organisms reproduce sexually.',
    options: [
      'The whole statement is true.',
      'Some of the statement is false.'
    ],
    correctAnswer: 'The whole statement is true.',
    explanation: 'The vast majority of complex multicellular plants and animals reproduce sexually.'
  },
  {
    id: 'm2_q05',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'Number of parent(s) involved in the production of each bacterium:',
    options: [
      'One parent (Binary fission)',
      'Two parents',
      'None of the above'
    ],
    correctAnswer: 'One parent (Binary fission)',
    explanation: 'Bacteria reproduce through binary fission involving a single parent cell dividing.'
  },
  {
    id: 'm2_q06',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 3,
    points: 10,
    type: 'multiple_choice',
    question: 'Inheritance is the passing of genes from offspring to parents.',
    options: [
      'The whole statement is true.',
      'Some of the statement is false.'
    ],
    correctAnswer: 'Some of the statement is false.',
    explanation: 'Inheritance is the passing of genes from PARENTS to OFFSPRING, not the other way around.'
  },
  {
    id: 'm2_q07',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 4,
    points: 10,
    type: 'multiple_choice',
    question: 'In sexual reproduction, the offspring are genetically _______ to the parent unless mutation occurs.',
    options: [
      'Identical',
      'Different'
    ],
    correctAnswer: 'Different',
    explanation: 'Offspring from sexual reproduction inherit unique combinations of alleles and are genetically different from either parent.'
  },
  {
    id: 'm2_q08',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 4,
    points: 10,
    type: 'multiple_choice',
    question: 'DNA is organized into structures called _______.',
    options: [
      'Chromosome',
      'Allele',
      'Nucleus'
    ],
    correctAnswer: 'Chromosome',
    explanation: 'Long strands of DNA are packaged with histone proteins into chromosomes.'
  },
  {
    id: 'm2_q09',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 4,
    points: 10,
    type: 'multiple_choice',
    question: 'Sexual reproduction usually takes _______ time and produces _______ offspring than asexual reproduction.',
    options: [
      'More - more',
      'Less - fewer',
      'More - fewer',
      'Less - more'
    ],
    correctAnswer: 'More - fewer',
    explanation: 'Sexual reproduction requires more time to locate mates and typically yields fewer offspring compared to rapid asexual fission.'
  },
  {
    id: 'm2_q10',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Biological Reproduction Fundamentals',
    sourceDoc: 'S6.jpeg – S8.jpeg',
    page: 4,
    points: 10,
    type: 'multiple_choice',
    question: 'Humans have _______ pairs of chromosomes.',
    options: [
      '11',
      '46',
      '23',
      '19'
    ],
    correctAnswer: '23',
    explanation: 'Humans have 23 homologous pairs (46 individual) chromosomes in diploid cells.'
  },

  // ==========================================
  // MODULE 3: GENETICS & MONOHYBRID PUNNETT SQUARES PRACTICE (PAGE 4)
  // ==========================================
  {
    id: 'm3_q01',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #1 Cross: A a × A A. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 1,
      parentCross: 'A a × A A',
      punnettBox: 'Top: AA, Aa | Bottom: AA, Aa',
      ratio: '50% AA (Homozygous Dominant), 50% Aa (Heterozygous)'
    },
    options: [
      '50% AA (Homozygous Dominant), 50% Aa (Heterozygous)',
      '100% AA',
      '25% AA, 50% Aa, 25% aa',
      '50% Aa, 50% aa'
    ],
    correctAnswer: '50% AA (Homozygous Dominant), 50% Aa (Heterozygous)',
    explanation: 'Crossing heterozygous Aa with homozygous dominant AA produces 2 AA and 2 Aa offspring (50% AA, 50% Aa).'
  },
  {
    id: 'm3_q02',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #2 Cross: T T × T T. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 2,
      parentCross: 'T T × T T',
      punnettBox: 'Top: TT, TT | Bottom: TT, TT',
      ratio: '100% TT (Homozygous Dominant)'
    },
    options: [
      '100% TT (Homozygous Dominant)',
      '50% TT, 50% Tt',
      '75% TT, 25% tt',
      '100% Tt (Heterozygous)'
    ],
    correctAnswer: '100% TT (Homozygous Dominant)',
    explanation: 'Both parents can only contribute dominant T alleles, resulting in 100% TT.'
  },
  {
    id: 'm3_q03',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #3 Cross: B B × b b. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 3,
      parentCross: 'B B × b b',
      punnettBox: 'Top: Bb, Bb | Bottom: Bb, Bb',
      ratio: '100% Bb (Heterozygous)'
    },
    options: [
      '100% Bb (Heterozygous)',
      '50% BB, 50% bb',
      '25% BB, 50% Bb, 25% bb',
      '100% BB'
    ],
    correctAnswer: '100% Bb (Heterozygous)',
    explanation: 'Parent 1 gives B, Parent 2 gives b. All 4 cells are Bb (100% heterozygous).'
  },
  {
    id: 'm3_q04',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #4 Cross: f f × f f. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 4,
      parentCross: 'f f × f f',
      punnettBox: 'Top: ff, ff | Bottom: ff, ff',
      ratio: '100% ff (Homozygous Recessive)'
    },
    options: [
      '100% ff (Homozygous Recessive)',
      '50% Ff, 50% ff',
      '100% Ff',
      '25% FF, 50% Ff, 25% ff'
    ],
    correctAnswer: '100% ff (Homozygous Recessive)',
    explanation: 'Both parents contribute recessive f alleles, yielding 100% homozygous recessive ff.'
  },
  {
    id: 'm3_q05',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #5 Cross: E e × E e. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 5,
      parentCross: 'E e × E e',
      punnettBox: 'Top: EE, Ee | Bottom: Ee, ee',
      ratio: '25% EE, 50% Ee, 25% ee'
    },
    options: [
      '25% EE, 50% Ee, 25% ee',
      '50% EE, 50% ee',
      '75% Ee, 25% ee',
      '100% Ee'
    ],
    correctAnswer: '25% EE, 50% Ee, 25% ee',
    explanation: 'Heterozygous monohybrid cross produces the classic 1 EE : 2 Ee : 1 ee genotypic ratio.'
  },
  {
    id: 'm3_q06',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #6 Cross: D d × D d. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 6,
      parentCross: 'D d × D d',
      punnettBox: 'Top: DD, Dd | Bottom: Dd, dd',
      ratio: '25% DD, 50% Dd, 25% dd'
    },
    options: [
      '25% DD, 50% Dd, 25% dd',
      '50% DD, 50% dd',
      '100% Dd',
      '75% DD, 25% dd'
    ],
    correctAnswer: '25% DD, 50% Dd, 25% dd',
    explanation: 'Standard Dd x Dd cross yields 1 DD : 2 Dd : 1 dd (25% DD, 50% Dd, 25% dd).'
  },
  {
    id: 'm3_q07',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #7 Cross: R r × R r. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 7,
      parentCross: 'R r × R r',
      punnettBox: 'Top: RR, Rr | Bottom: Rr, rr',
      ratio: '25% RR, 50% Rr, 25% rr'
    },
    options: [
      '25% RR, 50% Rr, 25% rr',
      '50% RR, 50% rr',
      '100% Rr',
      '75% RR, 25% Rr'
    ],
    correctAnswer: '25% RR, 50% Rr, 25% rr',
    explanation: 'Yields 25% RR, 50% Rr, and 25% rr.'
  },
  {
    id: 'm3_q08',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #8 Cross: D d × d d. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 8,
      parentCross: 'D d × d d',
      punnettBox: 'Top: Dd, Dd | Bottom: dd, dd',
      ratio: '50% Dd, 50% dd'
    },
    options: [
      '50% Dd, 50% dd',
      '25% DD, 50% Dd, 25% dd',
      '100% Dd',
      '75% Dd, 25% dd'
    ],
    correctAnswer: '50% Dd, 50% dd',
    explanation: 'Test cross between heterozygous Dd and homozygous recessive dd produces 2 Dd and 2 dd (50% Dd, 50% dd).'
  },
  {
    id: 'm3_q09',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #9 Cross: N n × n n. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 9,
      parentCross: 'N n × n n',
      punnettBox: 'Top: Nn, Nn | Bottom: nn, nn',
      ratio: '50% Nn, 50% nn'
    },
    options: [
      '50% Nn, 50% nn',
      '100% Nn',
      '25% NN, 50% Nn, 25% nn',
      '75% Nn, 25% nn'
    ],
    correctAnswer: '50% Nn, 50% nn',
    explanation: 'Yields 50% heterozygous Nn and 50% homozygous recessive nn.'
  },
  {
    id: 'm3_q10',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Genetics & Monohybrid Punnett Squares Practice',
    sourceDoc: 'S9.jpeg',
    page: 4,
    points: 10,
    type: 'punnett_practice',
    question: 'Square #10 Cross: B B × b b. What are the Punnett box results and offspring genotypic ratios?',
    punnettData: {
      squareNum: 10,
      parentCross: 'B B × b b',
      punnettBox: 'Top: Bb, Bb | Bottom: Bb, Bb',
      ratio: '100% Bb (Heterozygous)'
    },
    options: [
      '100% Bb (Heterozygous)',
      '50% BB, 50% bb',
      '25% BB, 50% Bb, 25% bb',
      '100% BB'
    ],
    correctAnswer: '100% Bb (Heterozygous)',
    explanation: 'Homozygous dominant BB x homozygous recessive bb guarantees 100% heterozygous Bb offspring.'
  },

  // ==========================================
  // MODULE 4: SEED DISPERSAL & POLLINATION ASSESSMENT (PAGES 5-6)
  // ==========================================
  {
    id: 'm4_q01',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'Look at the photo (Coconut on ocean beach) and decide whether it is dispersed by:',
    imageNote: 'Photo: Coconut on ocean beach',
    options: [
      'A. water',
      'B. wind',
      'C. animal',
      'D. Pollinator'
    ],
    correctAnswer: 'A. water',
    explanation: 'Coconuts float across ocean waters to establish on new shores.'
  },
  {
    id: 'm4_q02',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'Many flowers contain ......., a sugar-rich liquid that provides energy and nutrients to animals:',
    options: [
      'A. Fats',
      'B. Nectar',
      'C. Honey',
      'D. Salt'
    ],
    correctAnswer: 'B. Nectar',
    explanation: 'Nectar is a sugary fluid secreted by flowers to attract pollinators.'
  },
  {
    id: 'm4_q03',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'Look at the photo (Burdock burrs with hooks) and decide whether it is dispersed by:',
    imageNote: 'Photo: Burdock burrs with sharp hooks',
    options: [
      'A. water',
      'B. animal',
      'C. Pollinator',
      'D. wind'
    ],
    correctAnswer: 'B. animal',
    explanation: 'Burdock burrs hook onto animal fur to travel to new locations.'
  },
  {
    id: 'm4_q04',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: '.......... play an important role in cross-pollination of plants.',
    options: [
      'A. Animal pollinators',
      'B. Leaves',
      'C. Roots',
      'D. Stems'
    ],
    correctAnswer: 'A. Animal pollinators',
    explanation: 'Animal pollinators (insects, birds, bats) actively move pollen between different plant blossoms.'
  },
  {
    id: 'm4_q05',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 5,
    points: 10,
    type: 'multiple_choice',
    question: 'The sperm of seed plants is carried in pollen.',
    options: [
      'T. The whole statement is true.',
      'F. Some of the statement is false.'
    ],
    correctAnswer: 'T. The whole statement is true.',
    explanation: 'Pollen grains contain the male gametophytes that produce sperm cells.'
  },
  {
    id: 'm4_q06',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 6,
    points: 10,
    type: 'multiple_choice',
    question: 'Heliconia nectar is stored in flowers deep within long, thin leaf structures called bracts. Based on the structure of the heliconia, which pollinator is likely to have a role in pollinating it?',
    options: [
      'A. Wind',
      'B. Humming bird',
      'C. A long-nosed bat'
    ],
    correctAnswer: 'B. Humming bird',
    explanation: 'Hummingbirds have long curved beaks adapted to reach deep into narrow heliconia bracts.'
  },
  {
    id: 'm4_q07',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 6,
    points: 10,
    type: 'multiple_choice',
    question: 'Look at the photo (Milkweed seed with silky fibers) and decide whether it is dispersed by:',
    imageNote: 'Photo: Milkweed seed with silky coma fibers',
    options: [
      'A. wind',
      'B. water',
      'C. Pollinator',
      'D. animal'
    ],
    correctAnswer: 'A. wind',
    explanation: 'Silky fibers act like parachutes to carry milkweed seeds on wind currents.'
  },
  {
    id: 'm4_q08',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 6,
    points: 10,
    type: 'multiple_choice',
    question: 'Fruit and flowers are examples of plant reproductive structures.',
    options: [
      'T. The whole statement is true.',
      'F. Some of the statement is false.'
    ],
    correctAnswer: 'T. The whole statement is true.',
    explanation: 'Flowers facilitate pollination and fertilization, and fruits develop from the ovary to protect and disperse seeds.'
  },
  {
    id: 'm4_q09',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 6,
    points: 20,
    type: 'multi_yes_no',
    question: 'The seeds have ......., ......., or sticky mucus that allow them to attach to animals. Select Yes or No for each feature:',
    subItems: [
      { feature: 'hooks', description: 'Attaches to fur', expected: 'YES' },
      { feature: 'flower', description: 'Reproductive organ, not dispersal feature', expected: 'NO' },
      { feature: 'barbs', description: 'Cling to fur/feathers', expected: 'YES' },
      { feature: 'fruits', description: 'Eaten for internal digestion, not hitchhiking', expected: 'NO' },
    ],
    correctAnswer: { hooks: 'YES', flower: 'NO', barbs: 'YES', fruits: 'NO' },
    explanation: 'Hooks and barbs enable external attachment (hitchhiking) onto fur and feathers.'
  },
  {
    id: 'm4_q10',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Seed Dispersal & Pollination Assessment',
    sourceDoc: 'S10.jpeg – S12.jpeg',
    page: 6,
    points: 10,
    type: 'multiple_choice',
    question: 'Different species have the same ways of reproducing.',
    options: [
      'T. The whole statement is true.',
      'F. Some of the statement is false.'
    ],
    correctAnswer: 'F. Some of the statement is false.',
    explanation: 'Different plant and animal species possess vastly diverse sexual and asexual reproductive strategies.'
  },

  // ==========================================
  // MODULE 5: PLANT SEXUAL REPRODUCTION & SEED FORMATION (PAGES 6-9)
  // ==========================================
  {
    id: 'm5_q01',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'What structure encloses and protects the seeds of most nonflowering seed plants, such as conifers?',
    options: [
      'A fleshy sweet fruit',
      'A protective woody cone',
      'Bright flower petals',
      'An underground stem tuber'
    ],
    correctAnswer: 'A protective woody cone',
    explanation: 'Conifers (gymnosperms) bear seeds openly on the scales of protective woody female cones.'
  },
  {
    id: 'm5_q02',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'Where are pollen sacs located on a male conifer cone?',
    options: [
      'Underneath spider plantlets',
      'Inside the internal fruit chamber',
      'On the individual scales of male cones'
    ],
    correctAnswer: 'On the individual scales of male cones',
    explanation: 'Male cones carry pollen-producing microsporangia on the underside of their small scales.'
  },
  {
    id: 'm5_q03',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'In seed-bearing plants, inside which specialized structure do egg cells develop?',
    options: [
      'Microscopic pollen granule',
      'An embryo stem',
      'A male pollen sac',
      'An ovule housed on a cone scale or flower organ'
    ],
    correctAnswer: 'An ovule housed on a cone scale or flower organ',
    explanation: 'Egg cells develop within the ovules of flowering plants or female cone scales.'
  },
  {
    id: 'm5_q04',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'After a pollen granule fertilizes an egg inside an ovule, what do the fertilized egg and the ovule transform into?',
    options: [
      'The fertilized egg becomes pollen, and the ovule transforms into a fruit.',
      'The fertilized egg develops into an embryo, and the ovule forms a seed with a protective coat.',
      'The fertilized egg becomes a cone scale, and the ovule forms a root stem.',
      'The fertilized egg turns into a flower petal, and the ovule becomes a potato eye.'
    ],
    correctAnswer: 'The fertilized egg develops into an embryo, and the ovule forms a seed with a protective coat.',
    explanation: 'The fertilized zygote divides into the embryo, and the outer layers of the ovule form the protective seed coat.'
  },
  {
    id: 'm5_q05',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 7,
    points: 10,
    type: 'multiple_choice',
    question: 'Why is seed dispersal (distribution away from the parent plant by wind, water, or animals) critical for plant species survival?',
    options: [
      'It allows the protected embryo to establish and grow in new locations without competing with the parent.',
      'It prevents fine dust pollen from entering the ovule opening.',
      'It forces nonflowering conifers to evolve into flowering fruit trees.',
      'It stops fertilized eggs from transforming into active plant embryos.'
    ],
    correctAnswer: 'It allows the protected embryo to establish and grow in new locations without competing with the parent.',
    explanation: 'Dispersal spreads seeds across distances so seedlings do not compete with the parent for sunlight, water, and soil minerals.'
  },
  {
    id: 'm5_q06',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 7,
    points: 5,
    type: 'multiple_choice',
    question: 'Which sequence accurately traces the progression of plant sexual reproduction from fertilization to seed creation?',
    options: [
      'Embryo forms   Pollen granule carries sperm   Ovule opening   Seed coat forms.',
      'Pollen enters ovule opening   Egg is fertilized   Embryo forms   Protective seed coat forms.',
      'Ovule releases pollen into air   Sperm creates fruit   Cone breaks apart into an egg cell.',
      'Seed breaks into pollen sacs   Male cone forms embryo   Wind fertilizes fruit chamber.'
    ],
    correctAnswer: 'Pollen enters ovule opening   Egg is fertilized   Embryo forms   Protective seed coat forms.',
    explanation: 'Pollen tube delivers sperm into ovule opening -> Egg is fertilized -> Embryo develops -> Seed coat forms.'
  },
  {
    id: 'm5_q07',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 8,
    points: 5,
    type: 'multiple_choice',
    question: 'Which of the following statements about pollination is true?',
    options: [
      'Cross-pollination occurs between flowers of the same plant.',
      'Self-pollination occurs between flowers of different plants.',
      'Cross-pollination occurs between flowers of different plants that are of different species.',
      'Cross-pollination occurs between flowers of different plants that are of the same species.'
    ],
    correctAnswer: 'Cross-pollination occurs between flowers of different plants that are of the same species.',
    explanation: 'Cross-pollination requires transfer of pollen between separate individuals of the same biological species.'
  },
  {
    id: 'm5_q08',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 8,
    points: 10,
    type: 'multiple_select',
    question: 'Which of the following sentences describe the ways plants spread their seeds? Choose the TWO that apply.',
    options: [
      'Bees, attracted by brightly colored flowers, pick up and move seeds to new locations.',
      'Flowers are picked and moved to new locations where their seeds can grow.',
      'Seeds are carried away from the parent plant by wind or water.',
      'Animals, attracted by scent, eat and then disperse seeds in new locations through their droppings.'
    ],
    correctAnswer: [
      'Seeds are carried away from the parent plant by wind or water.',
      'Animals, attracted by scent, eat and then disperse seeds in new locations through their droppings.'
    ],
    explanation: 'Bees move pollen (not seeds). Seeds are dispersed by wind, water, or ingested fruits deposited in animal droppings.'
  },
  {
    id: 'm5_q09',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 8,
    points: 5,
    type: 'multiple_choice',
    question: 'After fertilization, the ovules will develop into:',
    options: [
      'Seeds',
      'Fruits'
    ],
    correctAnswer: 'Seeds',
    explanation: 'Ovules develop into seeds, while the surrounding ovary develops into the fruit.'
  },
  {
    id: 'm5_q10',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 8,
    points: 5,
    type: 'multiple_choice',
    question: 'The transfer of pollen from male reproductive structures to female reproductive structures in plants is called:',
    options: [
      'Pollination',
      'Fertilization',
      'Asexual reproduction',
      'Gametophyte'
    ],
    correctAnswer: 'Pollination',
    explanation: 'Pollination is the mechanical transfer of pollen from anther to stigma.'
  },
  {
    id: 'm5_q11',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 8,
    points: 5,
    type: 'multiple_choice',
    question: 'The ripened ovary and other structures of an angiosperm that enclose one or more seeds:',
    options: [
      'Stamen',
      'Fruit',
      'Cone',
      'Petals'
    ],
    correctAnswer: 'Fruit',
    explanation: 'A botanical fruit is defined as the ripened ovary enclosing seeds.'
  },
  {
    id: 'm5_q12',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 8,
    points: 5,
    type: 'multiple_choice',
    question: 'Pine trees have female cones that carry the ovule and male cones that release pollen. The pollination between pine trees is an example of:',
    options: [
      'Sexual reproduction',
      'Asexual reproduction'
    ],
    correctAnswer: 'Sexual reproduction',
    explanation: 'Male and female cones exchange gametes, which is sexual reproduction.'
  },
  {
    id: 'm5_q13',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Plant Sexual Reproduction & Seed Formation',
    sourceDoc: 'S13.jpeg – S18.jpeg',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'A plant has adapted to have bright red, tube-shaped flowers with sugary nectar. Hummingbirds visit them for nectar. Why does the plant need to attract hummingbirds?',
    options: [
      'Hummingbirds help the flower survive by providing defense against flower-eating insects.',
      'Hummingbirds help the flowers grow by eating the nectar to make space for pollen.',
      'Hummingbirds help the flowers reproduce by transferring pollen from one flower to another.',
      'Hummingbirds help the flowers bloom by removing the nectar.'
    ],
    correctAnswer: 'Hummingbirds help the flowers reproduce by transferring pollen from one flower to another.',
    explanation: 'Hummingbirds act as specialized pollinators, picking up pollen while drinking nectar and transferring it to other blossoms.'
  },

  // ==========================================
  // MODULE 6: PLANT REPRODUCTION & DISPERSAL MECHANISMS (PAGES 9-10)
  // ==========================================
  {
    id: 'm6_q01',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'How do some seeds attach to animals for dispersal?',
    options: [
      'By glowing at night',
      'By producing nectar',
      'By using hooks, barbs, or sticky mucus',
      'By growing roots on animal fur'
    ],
    correctAnswer: 'By using hooks, barbs, or sticky mucus',
    explanation: 'Physical hooks, barbs, or sticky coatings latch onto fur or feathers.'
  },
  {
    id: 'm6_q02',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'Which of the following is a way animals help in seed dispersal?',
    options: [
      'Seeds dissolve in water when eaten by animals',
      'Seeds are carried in the animal\'s digestive system and later deposited',
      'Seeds change color to attract animals',
      'Seeds grow inside the animal\'s body'
    ],
    correctAnswer: 'Seeds are carried in the animal\'s digestive system and later deposited',
    explanation: 'Frugivorous animals digest pulp while tough seeds pass through unharmed and are excreted in fertile droppings.'
  },
  {
    id: 'm6_q03',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'Pollination occurs when:',
    options: [
      'The seeds fall far from the parent plant',
      'Pollen reaches the egg of a plant',
      'Animals bury the plant\'s seeds',
      'Plants produce nectar for animals'
    ],
    correctAnswer: 'Pollen reaches the egg of a plant',
    explanation: 'Pollination delivers the pollen grain containing sperm to the receptive female reproductive organ.'
  },
  {
    id: 'm6_q04',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 9,
    points: 10,
    type: 'multiple_choice',
    question: 'What might happen if a squirrel buries acorns but does not return to eat them?',
    options: [
      'The acorns disappear',
      'The acorns dry out and die',
      'The acorns may germinate and grow into new trees',
      'The acorns attract other animals to eat them'
    ],
    correctAnswer: 'The acorns may germinate and grow into new trees',
    explanation: 'Unretrieved buried acorns remain protected in moist soil and readily germinate into oak seedlings.'
  },
  {
    id: 'm6_q05',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 10,
    points: 10,
    type: 'multiple_choice',
    question: 'Why do many flowers produce nectar?',
    options: [
      'To provide energy for seed growth',
      'To water their seeds',
      'To help seeds stick to animals',
      'To attract animals for pollination'
    ],
    correctAnswer: 'To attract animals for pollination',
    explanation: 'Nectar acts as a caloric food reward enticing animal pollinators to visit flowers.'
  },
  {
    id: 'm6_q06',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 10,
    points: 10,
    type: 'multiple_choice',
    question: 'What is the difference between self-pollination and cross-pollination?',
    options: [
      'Self-pollination happens in animals, cross-pollination happens in plants.',
      'Self-pollination transfers pollen to the same plant\'s egg, while cross-pollination transfers pollen to another plant\'s egg.',
      'Self-pollination happens in water, cross-pollination happens on land.',
      'Self-pollination only occurs in fruit trees, cross-pollination in flowers.'
    ],
    correctAnswer: 'Self-pollination transfers pollen to the same plant\'s egg, while cross-pollination transfers pollen to another plant\'s egg.',
    explanation: 'Self-pollination involves flowers on the same individual plant, whereas cross-pollination involves pollen moving to a genetically distinct plant.'
  },
  {
    id: 'm6_q07',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 10,
    points: 10,
    type: 'multiple_choice',
    question: 'What role do animal pollinators (like insects, birds, or mammals) play in plant reproduction?',
    options: [
      'They destroy pollen',
      'They stop cross-pollination',
      'They carry pollen from one flower to another',
      'They replace seeds with nectar'
    ],
    correctAnswer: 'They carry pollen from one flower to another',
    explanation: 'Animal vectors transport pollen grains between blossoms.'
  },
  {
    id: 'm6_q08',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 10,
    points: 10,
    type: 'multiple_choice',
    question: 'Which adaptation helps a hawk moth pollinate flowers?',
    options: [
      'A long feeding organ called a proboscis',
      'Strong legs for digging',
      'Hooks on its wings',
      'Sharp teeth for chewing pollen'
    ],
    correctAnswer: 'A long feeding organ called a proboscis',
    explanation: 'A long proboscis uncoils to access nectar deep inside tube-shaped evening flowers.'
  },
  {
    id: 'm6_q09',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 10,
    points: 10,
    type: 'multiple_choice',
    question: 'Why is seed dispersal important for plants?',
    options: [
      'It helps seeds stay close to the parent plant',
      'It allows seeds to grow in new places, reducing competition',
      'It makes seeds heavier and stronger',
      'It prevents animals from eating the seeds'
    ],
    correctAnswer: 'It allows seeds to grow in new places, reducing competition',
    explanation: 'Dispersal avoids parent-seedling overcrowding and opens new geographical niches.'
  },
  {
    id: 'm6_q10',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Plant Reproduction & Dispersal Mechanisms',
    sourceDoc: 'S19.jpeg – S22.jpeg',
    page: 10,
    points: 10,
    type: 'multiple_choice',
    question: 'Which of the following is an example of wind or water assisting plant reproduction / dispersal?',
    options: [
      'A bee carrying pollen between flowers',
      'A squirrel burying acorns',
      'Seeds floating downstream in a river',
      'A moth using its proboscis to collect nectar'
    ],
    correctAnswer: 'Seeds floating downstream in a river',
    explanation: 'Water hydrochory carries buoyant seeds downstream.'
  },

  // ==========================================
  // MODULE 7: SEED DISPERSAL MECHANISMS ESSAY WORKSHEET (PAGE 11)
  // ==========================================
  {
    id: 'm7_q01',
    moduleNumber: 7,
    moduleTitle: 'Module 7: Seed Dispersal Mechanisms Essay Worksheet',
    sourceDoc: 'S23.jpeg',
    page: 11,
    points: 30,
    type: 'short_answer',
    question: 'Internal Digestion (Fruit Consumption): How do fleshy, sweet fruits benefit both the animal eater (e.g., birds, mammals) and the plant parent?',
    correctAnswer: 'Animals are attracted to the tasty fruits of flowering plants. When an animal eats a fruit, the seeds pass through its digestive system unharmed and are deposited far away from the parent plant, providing nutrients for the animal and seed dispersal for the plant.',
    verifiedAnswerKey: 'Animals are attracted to the tasty fruits of flowering plants. When an animal eats a fruit, the seeds pass through its digestive system unharmed and are deposited far away from the parent plant, providing nutrients for the animal and seed dispersal for the plant.',
    studentResponse: '"Animals are attracted to the tasty fruits of some flowering plants. When an animal eats a fruit, the seeds pass through the animal\'s digestive system. The seeds are then deposited away from the parent plant as the animal travels."',
    explanation: 'Mutualism: Animal receives nutrition; plant achieves seed dispersal with natural fertilizer.'
  },
  {
    id: 'm7_q02',
    moduleNumber: 7,
    moduleTitle: 'Module 7: Seed Dispersal Mechanisms Essay Worksheet',
    sourceDoc: 'S23.jpeg',
    page: 11,
    points: 30,
    type: 'short_answer',
    question: 'External Hitchhiking (Hooks/Barbs): How do structures like burdock burs exploit animal movement without providing a food reward?',
    correctAnswer: 'Burdock burs feature sharp hooks or barbs that attach securely to animal fur or feathers as animals brush past. The seeds hitchhike on the moving animal until they fall off in a new location.',
    verifiedAnswerKey: 'Burdock burs feature sharp hooks or barbs that attach securely to animal fur or feathers as animals brush past. The seeds hitchhike on the moving animal until they fall off in a new location.',
    studentResponse: '"By hitching a ride in their fur with their claws"',
    explanation: 'Epizoochory: Seeds hitch a free ride on animal coats without expending sugar rewards.'
  },
  {
    id: 'm7_q03',
    moduleNumber: 7,
    moduleTitle: 'Module 7: Seed Dispersal Mechanisms Essay Worksheet',
    sourceDoc: 'S23.jpeg',
    page: 11,
    points: 40,
    type: 'short_answer',
    question: 'Seed Caching / Burying (Squirrels & Acorns): Explain how a squirrel burying oak tree acorns acts as a seed dispersal mechanism, specifically addressing what happens to unretrieved acorns?',
    correctAnswer: 'Squirrels bury acorns in soil for winter food storage. When squirrels forget or fail to retrieve buried acorns, those acorns remain in optimal fertile soil away from the parent oak tree, germinating and growing into new oak trees.',
    verifiedAnswerKey: 'Squirrels bury acorns in soil for winter food storage. When squirrels forget or fail to retrieve buried acorns, those acorns remain in optimal fertile soil away from the parent oak tree, germinating and growing into new oak trees.',
    studentResponse: '"Becuase when it forgots it allows it to germenaite where he bt"',
    explanation: 'Unretrieved caches act as deliberate planting in fertile soil.'
  },

  // ==========================================
  // MODULE 8: PLANT GENETICS & SEED DISPERSAL ASSESSMENT (PAGES 11-13)
  // ==========================================
  {
    id: 'm8_q01',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 12,
    points: 10,
    type: 'multiple_choice',
    question: 'What are genetic factors responsible for in plants?',
    options: [
      'The color of the leaves',
      'The traits passed from parents to offspring',
      'The height of the plant',
      'The amount of water a plant needs'
    ],
    correctAnswer: 'The traits passed from parents to offspring',
    explanation: 'Genetic factors are the hereditary DNA instructions transmitting traits across generations.'
  },
  {
    id: 'm8_q02',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 12,
    points: 10,
    type: 'multiple_choice',
    question: 'What can different forms of the same gene affect in plants?',
    options: [
      'The plant\'s color',
      'The plant\'s flowering time',
      'The plant\'s growth rate',
      'The plant\'s root length'
    ],
    correctAnswer: 'The plant\'s growth rate',
    explanation: 'Allelic variations regulate metabolic enzymes that directly influence growth rate.'
  },
  {
    id: 'm8_q03',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 12,
    points: 10,
    type: 'multiple_choice',
    question: 'How do animals contribute to the dispersal of seeds from flowering plants?',
    options: [
      'By carrying seeds on their fur or feet',
      'By eating the seeds and digesting them completely',
      'By planting seeds in the ground',
      'By watering the seeds'
    ],
    correctAnswer: 'By carrying seeds on their fur or feet',
    explanation: 'Seeds hitchhike on animal fur or feet.'
  },
  {
    id: 'm8_q04',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 12,
    points: 10,
    type: 'multiple_choice',
    question: 'Genetic factors are the traits parents pass on to offspring during reproduction. What do a plant\'s genes affect?',
    options: [
      'Its color',
      'Its location',
      'Its traits',
      'Its age'
    ],
    correctAnswer: 'Its traits',
    explanation: 'Genes code for proteins that manifest as inherited physical traits.'
  },
  {
    id: 'm8_q05',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 12,
    points: 10,
    type: 'multiple_choice',
    question: 'Which feature helps seeds attach to animals for dispersal?',
    options: [
      'Smooth surface',
      'Bright colors',
      'Sweet scent',
      'Hooks, barbs, or sticky mucus'
    ],
    correctAnswer: 'Hooks, barbs, or sticky mucus',
    explanation: 'Hooks, barbs, and sticky secretions latch onto fur.'
  },
  {
    id: 'm8_q06',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 12,
    points: 10,
    type: 'multiple_choice',
    question: 'What happens to seeds after they pass through an animal\'s digestive system?',
    options: [
      'They grow inside the animal',
      'They become inedible',
      'They are destroyed',
      'They are deposited away from the parent plant'
    ],
    correctAnswer: 'They are deposited away from the parent plant',
    explanation: 'Seeds are excreted in droppings far from the parent plant.'
  },
  {
    id: 'm8_q07',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 13,
    points: 10,
    type: 'multiple_choice',
    question: 'How does self-pollination differ from cross-pollination?',
    options: [
      'Cross-pollination does not involve pollen transfer.',
      'Self-pollination involves pollen from one plant to another.',
      'Self-pollination involves pollen transfer within the same plant.',
      'Cross-pollination occurs only in non-flowering plants.'
    ],
    correctAnswer: 'Self-pollination involves pollen transfer within the same plant.',
    explanation: 'Self-pollination occurs within the same flower or between flowers on the same individual plant.'
  },
  {
    id: 'm8_q08',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 13,
    points: 10,
    type: 'multiple_choice',
    question: 'What is the main benefit for plants when animals visit flowers?',
    options: [
      'Animals provide shade to the plants',
      'Animals protect the plants from predators',
      'Animals help in the process of photosynthesis',
      'Animals carry away pollen to other flowers'
    ],
    correctAnswer: 'Animals carry away pollen to other flowers',
    explanation: 'Animals facilitate cross-pollination by transporting pollen grains.'
  },
  {
    id: 'm8_q09',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 13,
    points: 10,
    type: 'multiple_choice',
    question: 'What is the function of nectar in flowers?',
    options: [
      'To provide energy and nutrients to animals.',
      'To help in the process of photosynthesis.',
      'To protect the plant from diseases.',
      'To store water for the plant.'
    ],
    correctAnswer: 'To provide energy and nutrients to animals.',
    explanation: 'Nectar provides a nutritional reward that attracts animal pollinators.'
  },
  {
    id: 'm8_q10',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Plant Genetics & Seed Dispersal Assessment',
    sourceDoc: 'S24.jpeg – S26.jpeg',
    page: 13,
    points: 10,
    type: 'multiple_choice',
    question: 'Which of the following is a characteristic of cross-pollination?',
    options: [
      'Pollen is transferred within the same plant.',
      'Pollen is transferred to a different plant.',
      'Pollen is not involved in the process.',
      'Pollen is used for plant defense.'
    ],
    correctAnswer: 'Pollen is transferred to a different plant.',
    explanation: 'Cross-pollination requires transfer of pollen to a different plant of the same species.'
  },

  // ==========================================
  // MODULE 9: ADVANCED PLANT REPRODUCTION & BONSAI ASSESSMENT (PAGES 13-14)
  // ==========================================
  {
    id: 'm9_q02',
    moduleNumber: 9,
    moduleTitle: 'Module 9: Advanced Plant Reproduction & Bonsai Assessment',
    sourceDoc: 'S27.jpeg – S28.jpeg',
    page: 13,
    points: 20,
    type: 'multiple_choice',
    question: 'How do you think this flower (Ophrys Orchid) contributes to the reproductive success of the plant?',
    imageNote: 'Visual: Ophrys Orchid mimicking female bee appearance and pheromones',
    options: [
      'The flower\'s color and nectar attract bees.',
      'The flower scares away birds looking for a meal.',
      'The petals convert sunlight to food.'
    ],
    correctAnswer: 'The flower\'s color and nectar attract bees.',
    explanation: 'The flower mimics the color, shape, and scent of female bees to attract male bees for pollination.'
  },
  {
    id: 'm9_q03',
    moduleNumber: 9,
    moduleTitle: 'Module 9: Advanced Plant Reproduction & Bonsai Assessment',
    sourceDoc: 'S27.jpeg – S28.jpeg',
    page: 14,
    points: 40,
    type: 'ordering',
    question: 'Number the statements in order to describe how a pollinator aids in the pollination of a flowering plant:',
    orderingSteps: [
      { stepNum: 1, text: 'The pollinator feeds on nectar, and the flower\'s pollen attaches to its body.' },
      { stepNum: 2, text: 'The pollinator flies to another flower where the pollen rubs off on the flower\'s stigma.' },
      { stepNum: 3, text: 'The sperm within the pollen fertilizes the eggs.' },
      { stepNum: 4, text: 'The ovules develop into seeds.' },
    ],
    correctAnswer: [1, 2, 3, 4],
    explanation: 'Pollinator feeds & collects pollen -> Flies & rubs onto stigma -> Sperm fertilizes eggs -> Ovules develop into seeds.'
  },
  {
    id: 'm9_q04',
    moduleNumber: 9,
    moduleTitle: 'Module 9: Advanced Plant Reproduction & Bonsai Assessment',
    sourceDoc: 'S27.jpeg – S28.jpeg',
    page: 14,
    points: 20,
    type: 'multiple_select',
    question: 'Bonsai trees are plants that growers have \'trained\' to be small by trimming and shaping. They can be grown from seeds or cuttings. Which statements are true about bonsai trees? Select all that apply.',
    options: [
      'Bonsai trees do not need light, water, or nutrients.',
      'Bonsai trees need light, water, and nutrients.',
      'Bonsai trees can reproduce sexually and asexually.',
      'Bonsai trees can reproduce sexually but not asexually.'
    ],
    correctAnswer: [
      'Bonsai trees need light, water, and nutrients.',
      'Bonsai trees can reproduce sexually and asexually.'
    ],
    explanation: 'Bonsai trees are normal trees trained through pruning; they have full physiological requirements (light, water, nutrients) and reproduce both sexually (seeds/cones) and asexually (cuttings).'
  },

  // ==========================================
  // MODULE 10: HYBRID PLANTS & SELECTIVE BREEDING CASE STUDY (PAGES 14-16)
  // ==========================================
  {
    id: 'm10_part1',
    moduleNumber: 10,
    moduleTitle: 'Module 10: Hybrid Plants & Selective Breeding Case Study',
    sourceDoc: 'S29.jpeg – S30.jpeg',
    page: 14,
    points: 20,
    type: 'matching',
    question: 'Part 1: Vocabulary Matching — Match each term to its verified scientific definition:',
    matchingPairs: [
      { term: '1. Hybrid Plant', matchLetter: 'C', definition: 'Offspring produced by crossing two different parent varieties.' },
      { term: '2. Cross-Pollination', matchLetter: 'A', definition: 'Transfer of pollen from one plant variety to another.' },
      { term: '3. Selective Breeding', matchLetter: 'B', definition: 'Selecting specific parents to produce desired offspring traits.' },
      { term: '4. Genetic Trait', matchLetter: 'D', definition: 'Characteristic passed down through DNA from parents.' }
    ],
    correctAnswer: {
      'Hybrid Plant': 'C',
      'Cross-Pollination': 'A',
      'Selective Breeding': 'B',
      'Genetic Trait': 'D'
    },
    explanation: '1-C (Hybrid), 2-A (Cross-Pollination), 3-B (Selective Breeding), 4-D (Genetic Trait).'
  },
  {
    id: 'm10_part2_q1',
    moduleNumber: 10,
    moduleTitle: 'Module 10: Hybrid Plants & Selective Breeding Case Study',
    sourceDoc: 'S29.jpeg – S30.jpeg',
    page: 14,
    points: 15,
    type: 'short_answer',
    question: 'Part 2 — Question 1: Hybrid Breeding Goal: A plant breeder crosses a Sun Gold tomato (sweet orange cherry, cold-tolerant, thin skin) with a Juliet tomato (sweet red grape, disease resistant, firmer flesh). What specific combination of traits does the breeder hope the new hybrid plant will inherit?',
    correctAnswer: 'The breeder hopes to produce a hybrid inheriting Cold Tolerance and Early Yield from Sun Gold, combined with Disease Resistance and Firmer Flesh from Juliet.',
    verifiedAnswerKey: 'The breeder hopes to produce a hybrid inheriting Cold Tolerance and Early Yield from Sun Gold, combined with Disease Resistance and Firmer Flesh from Juliet.',
    studentResponse: '"It will get half of traits from each parents"',
    explanation: 'Selective hybridization aims to combine the favorable traits of both parental lines.'
  },
  {
    id: 'm10_part2_q2',
    moduleNumber: 10,
    moduleTitle: 'Module 10: Hybrid Plants & Selective Breeding Case Study',
    sourceDoc: 'S29.jpeg – S30.jpeg',
    page: 15,
    points: 15,
    type: 'flowchart',
    question: 'Part 2 — Question 2: Hybrid Trait Flowchart: Review the parent lines: Parent 1 (Sun Gold: Cold Tolerant, Thin Skin) and Parent 2 (Juliet: Disease Resistance, Firmer Flesh). What are the target traits for the new hybrid?',
    options: [
      '1. Cold Resistance, 2. Disease Resistance / Firmer Flesh',
      '1. Thin Skin, 2. Disease Susceptibility',
      '1. No Resistance, 2. Bitter Flavor',
      '1. Fast Rotting, 2. Cold Sensitive'
    ],
    correctAnswer: '1. Cold Resistance, 2. Disease Resistance / Firmer Flesh',
    explanation: 'Target Hybrid Plant combines Cold Resistance from Sun Gold and Disease Resistance / Firmer Flesh from Juliet.'
  },
  {
    id: 'm10_part3_q3',
    moduleNumber: 10,
    moduleTitle: 'Module 10: Hybrid Plants & Selective Breeding Case Study',
    sourceDoc: 'S29.jpeg – S30.jpeg',
    page: 15,
    points: 20,
    type: 'short_answer',
    question: 'Part 3 — Question 3: Pollinator Attraction & Genetic Factors:\nScenario: A plant breeder produces a new hybrid tomato with large, delicious fruit. However, field tests show that insect pollinators completely ignore the hybrid plant\'s flowers.\na) What genetic factors might cause pollinators to ignore the hybrid?\nb) How will a lack of pollinator visits affect the hybrid\'s natural reproduction?',
    correctAnswer: 'a) Genetic Causes: Unattractive flower color, dull petals, lack of sweet scent, altered petal shape, or insufficient nectar production. b) Reproductive Impact: Without insect pollinators, cross-pollination cannot occur naturally, preventing fertilization and natural seed creation.',
    verifiedAnswerKey: 'a) Genetic Causes: Unattractive flower color, dull petals, lack of sweet scent, altered petal shape, or insufficient nectar production. b) Reproductive Impact: Without insect pollinators, cross-pollination cannot occur naturally, preventing fertilization and natural seed creation.',
    studentResponse: '"a) The color might not be colorful or not enough nectar to attract the pollinator. b) The flower will not be able to help in reproducing the same species."',
    explanation: 'Floral morphology, scent, and nectar genes are critical for attracting pollinators; without them, natural fertilization fails.'
  },
  {
    id: 'm10_part3_q4',
    moduleNumber: 10,
    moduleTitle: 'Module 10: Hybrid Plants & Selective Breeding Case Study',
    sourceDoc: 'S29.jpeg – S30.jpeg',
    page: 15,
    points: 10,
    type: 'multiple_choice',
    question: 'Part 3 — Question 4: Trait Inheritance & Probability: When two hybrid tomato plants reproduce together, their offspring do NOT all look identical to the hybrid parents. Why?',
    options: [
      'Hybrid offspring receive DNA from only one parent plant.',
      'Alleles combine in random combinations during fertilization, resulting in different genetic variations.',
      'Hybrid plants lose all their genetic traits when exposed to sunlight.',
      'Environmental factors completely overwrite genetic instructions in offspring.'
    ],
    correctAnswer: 'Alleles combine in random combinations during fertilization, resulting in different genetic variations.',
    explanation: 'Hybrids are heterozygous; segregation and independent assortment during gamete formation yield diverse combinations in the F2 generation.'
  },
  {
    id: 'm10_part4_crop',
    moduleNumber: 10,
    moduleTitle: 'Module 10: Hybrid Plants & Selective Breeding Case Study',
    sourceDoc: 'S29.jpeg – S30.jpeg',
    page: 15,
    points: 15,
    type: 'crop_engineering',
    question: 'Part 4: Engineer Your Own Hybrid Crop! Review the student worksheet selection:\n• Crop Type: Tomato\n• Parent 1: Sun Gold Tomato (Fast Growth)\n• Parent 2: Heirloom Tomato (Cold Resistance)\n• Name of Variety: Heirloom Gold Tomato\nWhat is the primary advantage for farmers?',
    options: [
      'Grows fast, easy to cultivate, and highly cold resistant.',
      'Requires zero water and grows in the dark.',
      'Eliminates all animal pests permanently.',
      'Produces fruit with no seeds.'
    ],
    correctAnswer: 'Grows fast, easy to cultivate, and highly cold resistant.',
    explanation: 'Combines the rapid growth of Sun Gold with the cold hardiness of the Heirloom parent.'
  },
  {
    id: 'm10_part4_q5',
    moduleNumber: 10,
    moduleTitle: 'Module 10: Hybrid Plants & Selective Breeding Case Study',
    sourceDoc: 'S29.jpeg – S30.jpeg',
    page: 16,
    points: 20,
    type: 'short_answer',
    question: 'Part 4 — Question 5: Environmental vs. Genetic Reflection: Even if your new hybrid plant has superior genetic traits for high yield and sweetness, how could environmental factors (such as severe drought, poor soil, or unseasonal frost) still prevent it from growing successfully?',
    correctAnswer: 'Genetics define a plant\'s potential, but environmental conditions dictate actual survival. Infertile soil lacks essential nutrients (nitrogen, phosphorus), severe drought deprives plants of water for photosynthesis, and unseasonal frost can damage plant cells, halting growth regardless of superior genetic resistance.',
    verifiedAnswerKey: 'Genetics define a plant\'s potential, but environmental conditions dictate actual survival. Infertile soil lacks essential nutrients (nitrogen, phosphorus), severe drought deprives plants of water for photosynthesis, and unseasonal frost can damage plant cells, halting growth regardless of superior genetic resistance.',
    studentResponse: '"If the hybrid has for example cold resistance, it doesn\'t help in how fertile the soil is. Environmental may also stop the plant growing."',
    explanation: 'Phenotype = Genotype + Environment. Environmental shortages act as bottlenecks.'
  },

  // ==========================================
  // MODULE 11: ANIMAL REPRODUCTION & BEHAVIOR ASSESSMENT (PAGES 16-17)
  // ==========================================
  {
    id: 'm11_q01',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 16,
    points: 10,
    type: 'multiple_choice',
    question: 'Under what conditions might animals reproduce asexually?',
    options: [
      'When there is a high level of competition',
      'When there is a shortage of food',
      'When conditions are favorable for rapid reproduction',
      'When there is a lack of water'
    ],
    correctAnswer: 'When conditions are favorable for rapid reproduction',
    explanation: 'Asexual reproduction enables rapid exploitation of favorable, resource-rich habitats without waiting to find mates.'
  },
  {
    id: 'm11_q02',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 16,
    points: 10,
    type: 'multiple_choice',
    question: 'What is asexual reproduction?',
    options: [
      'A type of reproduction that involves genetic variation',
      'A type of reproduction involving only one parent',
      'A type of reproduction involving two parents',
      'A type of reproduction that requires a mate'
    ],
    correctAnswer: 'A type of reproduction involving only one parent',
    explanation: 'Asexual reproduction involves a single parent passing genetic copies.'
  },
  {
    id: 'm11_q03',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 16,
    points: 10,
    type: 'multiple_choice',
    question: 'What role do environmental conditions play in the type of reproduction used by some animals?',
    options: [
      'They only affect sexual reproduction',
      'They have no effect',
      'They may affect whether animals reproduce asexually or sexually',
      'They determine the availability of mates'
    ],
    correctAnswer: 'They may affect whether animals reproduce asexually or sexually',
    explanation: 'In organisms like aphids, daphnia, or sea anemones, environmental cues (temperature, food) trigger switching between asexual and sexual phases.'
  },
  {
    id: 'm11_q04',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 16,
    points: 10,
    type: 'multiple_choice',
    question: 'How does asexual reproduction contribute to the survival of a species in certain conditions?',
    options: [
      'By requiring more resources',
      'By increasing genetic diversity',
      'By allowing reproduction without mates',
      'By slowing down reproduction'
    ],
    correctAnswer: 'By allowing reproduction without mates',
    explanation: 'Allows isolated individuals to colonize and maintain populations when mates are absent.'
  },
  {
    id: 'm11_q05',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 17,
    points: 10,
    type: 'multiple_choice',
    question: 'Which bird uses colorful feathers and elaborate dance to attract mates?',
    options: [
      'Owl',
      'Peacock',
      'Chicken'
    ],
    correctAnswer: 'Peacock',
    explanation: 'Male peacocks display brilliant iridescent eye-spot feathers and dance to attract peahens.'
  },
  {
    id: 'm11_q06',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 17,
    points: 10,
    type: 'multiple_choice',
    question: 'Why do male bowerbirds build elaborate structures decorated with objects?',
    options: [
      'To show off their wealth',
      'To impress potential mates',
      'To hide from predators'
    ],
    correctAnswer: 'To impress potential mates',
    explanation: 'Bowerbird structures and colorful ornaments serve as behavioral courtship displays to impress females.'
  },
  {
    id: 'm11_q07',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 17,
    points: 10,
    type: 'multiple_choice',
    question: 'What happens to the genetic material during asexual reproduction?',
    options: [
      'It is mixed with another organism\'s genes',
      'It remains unchanged and identical to the parent',
      'It is reduced by half',
      'It is completely altered'
    ],
    correctAnswer: 'It remains unchanged and identical to the parent',
    explanation: 'Genetic material is copied exactly without meiotic reduction or recombination.'
  },
  {
    id: 'm11_q08',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 17,
    points: 10,
    type: 'multiple_choice',
    question: 'How do male fiddler crabs use their large claws to increase their reproductive success?',
    options: [
      'To dig burrows for shelter',
      'To fight off predators',
      'To move and attract females'
    ],
    correctAnswer: 'To move and attract females',
    explanation: 'The oversized claw is waved in synchronized courtship displays to signal females.'
  },
  {
    id: 'm11_q09',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 17,
    points: 10,
    type: 'multiple_choice',
    question: 'Courtship behaviors are:',
    options: [
      'How animals protect their young',
      'Special behaviors that help organisms find a mate',
      'How animals migrate',
      'How animals grow'
    ],
    correctAnswer: 'Special behaviors that help organisms find a mate',
    explanation: 'Courtship behaviors are reproductive adaptations facilitating mate recognition and selection.'
  },
  {
    id: 'm11_q10',
    moduleNumber: 11,
    moduleTitle: 'Module 11: Animal Reproduction & Behavior Assessment',
    sourceDoc: 'S31.jpeg – S33.jpeg',
    page: 17,
    points: 10,
    type: 'multiple_select',
    question: 'Multiple factors influence the reproductive success of an animal. Select all that apply.',
    options: [
      'Genetics',
      'Weather conditions',
      'Availability of food',
      'Protection from predators'
    ],
    correctAnswer: [
      'Genetics',
      'Weather conditions',
      'Availability of food',
      'Protection from predators'
    ],
    explanation: 'All four biological and environmental factors significantly influence animal reproductive success.'
  }
];
