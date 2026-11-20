/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  levelTrigger?: number;
  conditionDescription: string;
}

export const BADGES: Badge[] = [
  {
    id: 'badge-botany',
    name: 'Master Botanist',
    title: 'Plant Kingdom Pioneer',
    description: 'Achieved 80%+ mastery on Level 1: Plant Reproduction, Dispersal & Floral Anatomy.',
    icon: '🌿',
    levelTrigger: 1,
    conditionDescription: 'Pass Level 1 Quiz with 80% or higher'
  },
  {
    id: 'badge-genetics',
    name: 'Genetics Specialist',
    title: 'DNA & Heredity Decoder',
    description: 'Achieved 80%+ mastery on Level 2: DNA Architecture, Punnett Squares & Probability.',
    icon: '🧬',
    levelTrigger: 2,
    conditionDescription: 'Pass Level 2 Quiz with 80% or higher'
  },
  {
    id: 'badge-zoology',
    name: 'Wildlife Ethologist',
    title: 'Animal Behavior & Survival Scholar',
    description: 'Achieved 80%+ mastery on Level 3: Courtship Signals, Parental Care & Growth Dynamics.',
    icon: '🐾',
    levelTrigger: 3,
    conditionDescription: 'Pass Level 3 Quiz with 80% or higher'
  },
  {
    id: 'badge-grandmaster',
    name: 'Grand Science Explorer',
    title: 'Grade 8 Science Champion',
    description: 'Earned mastery across all three levels and unlocked your Official Science Diploma.',
    icon: '🏆',
    conditionDescription: 'Achieve 80%+ on all three Grade 8 Levels'
  },
  {
    id: 'badge-inspector',
    name: 'Keen Eye Investigator',
    title: 'Infographic Field Master',
    description: 'Investigated every interactive hotspot across the biological infographic guides.',
    icon: '🔍',
    conditionDescription: 'Inspect 5 or more infographic hotspots'
  },
  {
    id: 'badge-lab-wizard',
    name: 'Hands-on Experimenter',
    title: 'Virtual Lab Specialist',
    description: 'Conducted the Flower Pollinator, Punnett Square Litter, Guppy Choice, and Cattle Growth simulations.',
    icon: '🧪',
    conditionDescription: 'Complete at least 3 virtual interactive simulations'
  }
];
