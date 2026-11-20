/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NotebookEntry {
  id: string;
  level: number;
  category: 'Botany' | 'Genetics' | 'Zoology';
  title: string;
  keyTakeaway: string;
  scientificConcept: string;
  grade8Standard: string;
  icon: string;
}

export const NOTEBOOK_ENTRIES: NotebookEntry[] = [
  {
    id: 'note-flower',
    level: 1,
    category: 'Botany',
    title: 'Flower Anatomy & Pollination Flow',
    keyTakeaway: 'The stamen (anther + filament) produces male pollen; the pistil (stigma + style + ovary) protects female ovules.',
    scientificConcept: 'Pollination occurs when pollen grains land on the receptive stigma. A pollen tube burrows down the style into the ovary, fertilizing an ovule into a seed, while the ovary wall swells into the fruit.',
    grade8Standard: 'MS-LS1-4: Specialized plant structures affect probability of successful reproduction.',
    icon: '🌸'
  },
  {
    id: 'note-dispersal',
    level: 1,
    category: 'Botany',
    title: 'Seed Dispersal Reduces Parent Competition',
    keyTakeaway: 'Dispersal vectors (wind, water, ingestion, hooks, caches) spread progeny across diverse geographic zones.',
    scientificConcept: 'If seedlings grow directly under the parent tree canopy, they suffer intense light, water, and nutrient competition. Dispersal enhances colony range and species survival.',
    grade8Standard: 'MS-LS1-4: Plant reproductive strategies and dispersal adaptations.',
    icon: '💨'
  },
  {
    id: 'note-germination',
    level: 1,
    category: 'Botany',
    title: 'Germination vs. Growth Requirements',
    keyTakeaway: 'Germination relies on water, oxygen, and temperature; continued growth demands sunlight and soil minerals.',
    scientificConcept: 'Dormant seeds carry endosperm/cotyledon fuel reserves and do not need sunlight underground. However, upon emergence, photosynthesis and root mineral absorption become essential for sustained development.',
    grade8Standard: 'MS-LS1-5: Environmental and genetic factors influencing organism growth.',
    icon: '🌱'
  },
  {
    id: 'note-zoom',
    level: 2,
    category: 'Genetics',
    title: 'Architecture of Heredity: Cell to Gene',
    keyTakeaway: 'Organism → Cell → Nucleus → Chromosome (DNA coiled on histones) → DNA double helix → Genes.',
    scientificConcept: 'Genes are distinct nucleotide sequences along a chromosome that code for amino acid chains, which fold into operational 3D proteins directing cellular structure and biochemistry.',
    grade8Standard: 'MS-LS3-1: Structural changes to genes may affect proteins and result in phenotypic changes.',
    icon: '🔬'
  },
  {
    id: 'note-punnett',
    level: 2,
    category: 'Genetics',
    title: 'Mendelian Genetics: Genotype vs. Phenotype',
    keyTakeaway: 'Genotype is the allele combination (SS, Ss, ss); Phenotype is the observable physical trait (short or long fur).',
    scientificConcept: 'A heterozygous cross (Ss × Ss) yields a 1:2:1 genotypic ratio and a 3:1 phenotypic ratio. A Punnett square models independent probability per fertilization event, not a fixed litter quota.',
    grade8Standard: 'MS-LS3-2: Inherited traits, dominant and recessive alleles, and genetic probability.',
    icon: '🐈'
  },
  {
    id: 'note-courtship',
    level: 3,
    category: 'Zoology',
    title: 'Courtship Signals & Mate Preference',
    keyTakeaway: 'Elaborate feather displays, woven nests, and nuptial gifts signal physical vigor and genetic health.',
    scientificConcept: 'Guppy experiments demonstrate female preference for larger, colorful tails (75%–78% preference). This sexual selection balances against predation risk in wild streams.',
    grade8Standard: 'MS-LS1-4: Characteristic animal behaviors increase probability of successful reproduction.',
    icon: '🦚'
  },
  {
    id: 'note-parenting',
    level: 3,
    category: 'Zoology',
    title: 'Parental Investment & Distraction Displays',
    keyTakeaway: 'Emperor penguin huddles, octopus brooding, and killdeer broken-wing displays maximize chick survival.',
    scientificConcept: 'Parental behaviors require high metabolic investment and risk, but dramatically raise the probability that fragile offspring survive to reproductive maturity.',
    grade8Standard: 'MS-LS1-4: Parental care behaviors that ensure offspring survival.',
    icon: '🐧'
  },
  {
    id: 'note-genetics-env',
    level: 3,
    category: 'Zoology',
    title: 'Genetics vs. Environment in Animal Growth',
    keyTakeaway: 'Genetics sets the upper potential; environmental conditions (nutrition, water, health) dictate actual growth.',
    scientificConcept: 'In livestock, an animal carrying champion high-yield genes cannot achieve target body mass or milk yield if subjected to drought, high ambient heat, or heavy parasite load.',
    grade8Standard: 'MS-LS1-5: Environmental and genetic interactions affecting organism growth and survival.',
    icon: '🐂'
  }
];
