/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Level 2: DNA, Genes, Inheritance, and Genetic Diversity
 */

import { Hotspot, QuizQuestion } from './plantData.js';

export const GENETICS_INFOGRAPHIC_URL = '/assets/aistudio/Guide_to_Genetics_and_Inheritance_Infographic_4291fda0.png';

export const GENETICS_HOTSPOTS: Hotspot[] = [
  {
    id: 'two-paths',
    x: 48,
    y: 18,
    title: 'Two Paths to Reproduction',
    category: 'reproduction',
    shortText: 'Asexual cloning vs. sexual recombination of maternal and paternal DNA.',
    detail: 'Asexual reproduction (binary fission in bacteria, budding in hydras, fragmentation in corals) passes exact copies of genetic material to offspring. Sexual reproduction combines 50% maternal and 50% paternal genetic material, yielding unique offspring with high population diversity.',
    scientificFact: 'While asexual reproduction enables rapid colonization in stable habitats, sexual genetic diversity shields populations from catastrophic disease.'
  },
  {
    id: 'architecture-heredity',
    x: 26,
    y: 49,
    title: 'The Architecture of Heredity',
    category: 'adaptation',
    shortText: 'From cell nucleus down to chromosomes, DNA double helix, and coding genes.',
    detail: 'Inside eukaryotic cells, the nucleus holds chromatin tightly packaged into chromosomes. DNA (deoxyribonucleic acid) is shaped like a twisted ladder (double helix). Specific sequences of DNA called genes code for proteins that determine physical structure and physiological function.',
    scientificFact: 'If stretched out in a single line, the DNA in one human cell would measure roughly 2 meters (6 feet) long!'
  },
  {
    id: 'dominant-recessive',
    x: 77,
    y: 48,
    title: 'Mechanics of Dominant & Recessive Traits',
    category: 'adaptation',
    shortText: 'Genotype (underlying alleles) dictates Phenotype (observable trait).',
    detail: 'An organism inherits two alleles for each gene (one from each parent). Dominant alleles (uppercase, e.g., S for short fur) mask the presence of recessive alleles (lowercase, e.g., s for long fur). Genotypes SS (homozygous dominant) and Ss (heterozygous carrier) both display short fur, while only ss (homozygous recessive) produces long fur.',
    scientificFact: 'Educational note: This single-gene fur length model is a simplified Mendelian demonstration; real mammalian coats involve complex polygenic interactions.'
  },
  {
    id: 'punnett-probability',
    x: 75,
    y: 74,
    title: 'Predicting Genetic Probability',
    category: 'adaptation',
    shortText: 'Punnett squares calculate mathematical odds, not guaranteed outcomes.',
    detail: 'When crossing two heterozygous parents (Ss × Ss), the expected genotypic ratio is 1 SS : 2 Ss : 1 ss (25% SS, 50% Ss, 25% ss), resulting in a classic 3:1 phenotypic ratio (75% short hair, 25% long hair). Crucially, this reflects probability per fertilization event—not a guaranteed count in small litters!',
    scientificFact: 'Each offspring is an independent statistical event, just like separate flips of a coin.'
  },
  {
    id: 'trillions-combinations',
    x: 80,
    y: 92,
    title: 'Trillions of Combinations & Sibling Diversity',
    category: 'adaptation',
    shortText: 'Independent assortment and random fertilization ensure no two siblings are identical.',
    detail: 'During meiosis, homologous chromosome pairs align and separate randomly (independent assortment). Domestic cats have 19 chromosome pairs, creating 2^19 (>524,000) possible egg or sperm combinations per parent. Combining two parents yields hundreds of billions of possible permutations per kitten!',
    scientificFact: 'Identical twins originate from a single fertilized zygote that splits, yet even they develop unique fingerprints and epigenetic variations.'
  }
];

export interface ZoomStage {
  id: string;
  level: number;
  name: string;
  scaleLabel: string;
  title: string;
  description: string;
  structures: string[];
  scientificDetail: string;
}

export const ZOOM_STAGES: ZoomStage[] = [
  {
    id: 'organism',
    level: 1,
    name: 'Organism',
    scaleLabel: 'Macroscopic (~45 cm)',
    title: 'Whole Living Organism (Domestic Cat)',
    description: 'An individual multicellular mammal exhibiting observable physical traits (phenotypes) like coat length, eye color, and agility.',
    structures: ['Body systems', 'Tissues', 'Trillions of cells'],
    scientificDetail: 'An adult cat is composed of approximately 10 to 30 trillion eukaryotic cells operating in synchronized coordination.'
  },
  {
    id: 'cell',
    level: 2,
    name: 'Cell',
    scaleLabel: 'Microscopic (~20 µm)',
    title: 'Eukaryotic Animal Cell',
    description: 'The fundamental structural and functional unit of life, bounded by a flexible plasma membrane and filled with cytoplasm.',
    structures: ['Plasma membrane', 'Mitochondria', 'Cytoplasm', 'Nucleus'],
    scientificDetail: 'Animal cells are eukaryotic, meaning their genetic blueprint is safely isolated inside a membrane-bound nucleus.'
  },
  {
    id: 'nucleus',
    level: 3,
    name: 'Nucleus',
    scaleLabel: 'Sub-cellular (~6 µm)',
    title: 'Cell Nucleus: Command Center',
    description: 'The spherical control organelle enclosed by a double nuclear membrane with nuclear pores that regulate messenger RNA export.',
    structures: ['Nuclear envelope', 'Nucleolus', 'Nuclear pores', 'Chromatin'],
    scientificDetail: 'Nearly all genomic DNA in eukaryotic organisms resides inside the nucleus, protected from metabolic reactive oxygen species.'
  },
  {
    id: 'chromosome',
    level: 4,
    name: 'Chromosome',
    scaleLabel: 'Nanoscale (~1 µm)',
    title: 'Condensed Chromosomes (19 Pairs in Cats)',
    description: 'Tightly wound packages of DNA spooled around histone proteins, visible during cell division as X-shaped sister chromatids.',
    structures: ['Centromere', 'Sister chromatids', 'Histone protein spools', 'Telomeres'],
    scientificDetail: 'Cats possess 38 chromosomes (19 homologous pairs), while humans have 46 chromosomes (23 homologous pairs).'
  },
  {
    id: 'dna',
    level: 5,
    name: 'DNA Double Helix',
    scaleLabel: 'Molecular (~2 nm width)',
    title: 'Deoxyribonucleic Acid (DNA)',
    description: 'A double-stranded helical polymer composed of sugar-phosphate backbones and complementary nitrogenous base pairs: Adenine pairs with Thymine (A-T), and Cytosine pairs with Guanine (C-G).',
    structures: ['Sugar-phosphate backbone', 'Hydrogen bonds', 'Base pairs (A, T, C, G)'],
    scientificDetail: 'Watson, Crick, Franklin, and Wilkins elucidated this double helix architecture in 1953, revealing the chemical basis of heredity.'
  },
  {
    id: 'gene',
    level: 6,
    name: 'Gene & Protein',
    scaleLabel: 'Genetic Code (~1,000 base pairs)',
    title: 'Gene: Recipe for Functional Proteins',
    description: 'A specific sequence of nucleotide bases along a chromosome that provides instructions for synthesizing functional proteins (e.g., keratin for fur fibers).',
    structures: ['Promoter region', 'Exons / Codons', 'Messenger RNA (mRNA)', 'Synthesized Protein'],
    scientificDetail: 'The sequence of DNA bases is transcribed into mRNA and translated into chains of amino acids, which fold into 3D proteins that determine physical traits.'
  }
];

export const LEVEL_2_QUIZ: QuizQuestion[] = [
  {
    id: 'g1',
    type: 'multiple_choice',
    question: 'What is the correct order of genetic structures from largest/most macroscopic to smallest/molecular?',
    options: [
      'Organism → Cell → Nucleus → Chromosome → DNA → Gene',
      'Gene → DNA → Chromosome → Nucleus → Cell → Organism',
      'Cell → Organism → DNA → Chromosome → Gene → Nucleus',
      'Chromosome → Nucleus → Organism → Cell → Gene → DNA'
    ],
    correctAnswer: 0,
    explanation: 'A living organism contains billions of cells. Each eukaryotic cell has a nucleus holding chromosomes, which are made of tightly coiled DNA molecules containing functional segments called genes.',
    misconceptionAlert: 'A gene is not larger than a chromosome! A gene is a specific localized segment on a much longer chromosome.'
  },
  {
    id: 'g2',
    type: 'multiple_choice',
    question: 'In genetics, what is the clear distinction between "Genotype" and "Phenotype"?',
    options: [
      'Genotype is the physical appearance, while phenotype is the DNA sequence',
      'Genotype is the underlying combination of inherited alleles, while phenotype is the observable physical trait',
      'Genotype only occurs in plants, while phenotype only occurs in animals',
      'Genotype changes every day with weather, while phenotype never changes'
    ],
    correctAnswer: 1,
    explanation: 'Genotype refers to the specific genetic makeup or allele combinations (e.g., SS, Ss, ss), whereas phenotype is the physical manifestation or observable characteristic (e.g., short fur vs long fur).',
    misconceptionAlert: 'Two organisms can share the exact same phenotype (e.g., short fur) while having different genotypes (SS vs Ss) because dominant alleles mask recessive ones.'
  },
  {
    id: 'g3',
    type: 'multiple_choice',
    question: 'In the simplified cat fur-length model, S represents the dominant short-hair allele and s represents the recessive long-hair allele. Which genotype produces long hair?',
    options: [
      'SS',
      'Ss',
      'ss',
      'Both SS and Ss'
    ],
    correctAnswer: 2,
    explanation: 'Because the long-hair allele (s) is recessive, it is masked whenever a dominant allele (S) is present. An individual must inherit two copies of the recessive allele (ss, homozygous recessive) to express long fur.',
    misconceptionAlert: 'A heterozygous cat (Ss) carries the long-hair allele in its DNA, but its visible phenotype is short hair because the dominant S allele is expressed.'
  },
  {
    id: 'g4',
    type: 'multiple_choice',
    question: 'When crossing two heterozygous cats (Ss × Ss), what is the expected genotypic ratio among the offspring?',
    options: [
      '4 SS : 0 Ss : 0 ss',
      '1 SS : 2 Ss : 1 ss',
      '3 SS : 1 ss',
      '2 SS : 2 ss'
    ],
    correctAnswer: 1,
    explanation: 'Crossing Ss × Ss produces four possible gamete pairings: SS (25%), Ss (25%), sS / Ss (25%), and ss (25%). Combining the two heterozygous boxes yields 1 SS : 2 Ss : 1 ss (25% homozygous dominant, 50% heterozygous, 25% homozygous recessive).',
    misconceptionAlert: 'Do not confuse genotypic ratio (1:2:1) with phenotypic ratio (3:1)! Both SS and Ss show short hair, so 1+2 = 3 show the dominant trait.'
  },
  {
    id: 'g5',
    type: 'multiple_choice',
    question: 'A cross between two heterozygous short-haired cats predicts a 3:1 phenotypic ratio (75% short hair, 25% long hair). If the mother gives birth to a litter of 4 kittens, must there be exactly 3 short-haired and 1 long-haired kitten?',
    options: [
      'Yes, Punnett squares guarantee the exact physical outcome of every litter',
      'No, the Punnett square represents mathematical probability for each independent birth, not a guaranteed quota',
      'Yes, but only if all 4 kittens are female',
      'No, because cats cannot inherit recessive alleles'
    ],
    correctAnswer: 1,
    explanation: 'A Punnett square calculates probability per offspring (75% chance short, 25% chance long). Each fertilization is an independent event, so a litter of 4 could statistically have 4 short kittens, 2 short and 2 long, or even 4 long kittens.',
    misconceptionAlert: 'This is the gambler\'s fallacy in biology: previous offspring do not influence the probability of future offspring. The ratio is an average over large sample sizes.'
  },
  {
    id: 'g6',
    type: 'multiple_choice',
    question: 'Which method of reproduction produces offspring that are exact genetic clones of the single parent?',
    options: [
      'Cross-pollination in fruit trees',
      'Binary fission in bacteria and budding in hydra',
      'Fertilization between two heterozygous cats',
      'Independent assortment during meiosis'
    ],
    correctAnswer: 1,
    explanation: 'Binary fission and budding are forms of asexual reproduction where a single parent replicates its DNA and divides, producing offspring that are genetic clones (identical barring random mutations).',
    misconceptionAlert: 'Sexual reproduction always creates unique combinations because it blends chromosomes from two separate parents.'
  },
  {
    id: 'g7',
    type: 'multiple_choice',
    question: 'Why do non-identical brothers and sisters from the same biological parents look different from each other?',
    options: [
      'Each parent passes completely random artificial traits learned during their lifetime',
      'Independent assortment of homologous chromosomes and random fertilization create billions of unique genetic combinations',
      'DNA only duplicates once in a family\'s lifetime',
      'One sibling receives all the DNA while the others receive none'
    ],
    correctAnswer: 1,
    explanation: 'During meiosis, chromosome pairs align independently, creating hundreds of thousands of different gametes in each parent. Random fertilization of an egg by a sperm yields trillions of possible genetic permutations between siblings.',
    misconceptionAlert: 'Siblings share on average 50% of their DNA, but the specific combination of alleles they inherit varies with every single conception.'
  },
  {
    id: 'g8',
    type: 'true_false',
    question: 'True or False: Identical twins or cloned animals will always have 100% identical personalities, behaviors, and health throughout life.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'False. Even when organisms share identical DNA sequences, environmental influences, nutritional differences, stress, developmental events, and epigenetic gene modifications cause noticeable differences in appearance and behavior.',
    misconceptionAlert: 'Phenotype is always the product of GENETICS interacting with the ENVIRONMENT (Phenotype = Genotype + Environment).'
  },
  {
    id: 'g9',
    type: 'multiple_choice',
    question: 'What is the primary role of genes in cellular biology?',
    options: [
      'They produce water to hydrate the cell cytoplasm',
      'They provide the sequence instructions for assembling proteins that determine physical structure and function',
      'They directly generate sunlight for photosynthesis in animal cells',
      'They act as physical shields that block all viruses'
    ],
    correctAnswer: 1,
    explanation: 'Genes contain coded sequences of nucleotides that are transcribed into messenger RNA and translated by ribosomes into proteins (such as enzymes, structural fibers, and signaling molecules) that shape traits.',
    misconceptionAlert: 'Genes do not directly build organs; they code for the proteins and regulatory RNAs that perform structural and catalytic duties in cells.'
  },
  {
    id: 'g10',
    type: 'multiple_choice',
    question: 'Gregor Mendel famously discovered the fundamental laws of inheritance by studying traits in which organism?',
    options: [
      'Fruit flies (Drosophila melanogaster)',
      'Garden pea plants (Pisum sativum)',
      'Domestic short-haired cats',
      'Bacteria (Escherichia coli)'
    ],
    correctAnswer: 1,
    explanation: 'Gregor Mendel, an Austrian monk, conducted controlled cross-breeding experiments with garden pea plants in the 1850s-1860s, tracking traits like flower color (purple vs white) and seed shape to deduce dominant and recessive inheritance.',
    misconceptionAlert: 'Although we use cats as a modern relatable model for fur length, Mendel established the core 3:1 ratio using purple and white pea flowers!'
  }
];
