/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Level 3: Animal Reproduction, Behavior, and Survival
 */

import { Hotspot, QuizQuestion } from './plantData.js';

export const ANIMAL_INFOGRAPHIC_URL = '/assets/aistudio/Animal_Reproduction_and_Growth_Infographic_23a0eaba.png';

export const ANIMAL_HOTSPOTS: Hotspot[] = [
  {
    id: 'modes-repro',
    x: 25,
    y: 12,
    title: 'Modes of Reproduction: Sexual, Asexual & Dual',
    category: 'reproduction',
    shortText: 'Mammalian sexual diversity, hydra asexual budding, and anemone dual strategies.',
    detail: 'Sexual reproduction blends parental chromosomes to produce diverse offspring capable of adapting to shifting ecosystems. Asexual reproduction enables rapid population increase when mates are scarce. Notably, aggregating sea anemones utilize dual strategies: asexual longitudinal fission builds dense clone colonies on rocks, while seasonal broadcast spawning releases eggs and sperm for genetic mixing and oceanic dispersal.',
    scientificFact: 'Aggregating anemone clones live in tightly defended territorial colonies, stinging non-clone neighbors that encroach on their space.'
  },
  {
    id: 'courtship-selection',
    x: 75,
    y: 16,
    title: 'Courtship Behaviors & Mate Selection',
    category: 'adaptation',
    shortText: 'Elaborate displays, woven nests, nuptial gifts, and antler combat signal fitness.',
    detail: 'Courtship displays allow females to assess male genetic fitness and resource availability. Weaver birds construct intricate woven nests; peacocks display heavy iridescent eye-spotted trains; kingfishers present freshly captured fish as nuptial gifts; and male elk clash antlers to establish dominance and mating rights.',
    scientificFact: 'Growing and brandishing a massive peacock train or elk antlers requires immense metabolic energy, signaling to females that the male possesses robust immune resistance and superior foraging ability.'
  },
  {
    id: 'guppy-experiment',
    x: 75,
    y: 28,
    title: 'Guppy Mate-Preference Laboratory Experiment',
    category: 'adaptation',
    shortText: 'Controlled testing of female choice based on male tail size and coloration.',
    detail: 'In controlled lab experiments with female guppies: Trial 1 showed 78% preferred large-tailed males over small-tailed males (22%). Trial 2 showed 76% preferred large-tailed males over medium-tailed males (24%). Trial 3 showed 75% preferred medium-tailed males over small-tailed males (25%). Female choice heavily favors larger, more vibrant ornamentation.',
    scientificFact: 'Trade-off principle: While large vibrant tails attract mates, they make males easier targets for aquatic predators in wild murky streams.'
  },
  {
    id: 'parental-tactics',
    x: 25,
    y: 62,
    title: 'Parenting & Offspring Survival Tactics',
    category: 'adaptation',
    shortText: 'Emperor penguin incubation, octopus maternal sacrifice, and killdeer broken-wing displays.',
    detail: 'Parental investment dramatically boosts offspring survival: Male emperor penguins fast for up to 60-80 days on sea ice cradling a single egg on their feet during winter blizzards. Female octopuses guard and aerate eggs for months without feeding, sacrificing their lives. Killdeer plovers feign a broken wing to lead predators away from ground nests.',
    scientificFact: 'Distraction displays are perilous: the parent risks being captured by the predator to lure it away from their defenseless chicks.'
  },
  {
    id: 'innate-instincts',
    x: 25,
    y: 92,
    title: 'Innate Behaviors in Young Animals',
    category: 'adaptation',
    shortText: 'Hardwired instincts: Gosling imprinting, chick begging calls, and fawn freezing.',
    detail: 'Young animals are born with innate behaviors that do not require learning: newly hatched geese imprint on the first moving figure to stay close for protection; baby cardinals emit urgent begging calls and expose bright red gapes to stimulate parental feeding; young blackbuck antelopes freeze motionless in tall grass to avoid detection by predators.',
    scientificFact: 'Imprinting occurs during a sensitive critical period shortly after hatching and establishes lifelong social recognition.'
  },
  {
    id: 'genetics-vs-environment',
    x: 75,
    y: 72,
    title: 'Dual Drivers of Growth: Genetics vs. Environment',
    category: 'adaptation',
    shortText: 'Genetics dictates potential ceiling; environment determines actual realization.',
    detail: 'Inherited traits supply genetic capabilities (e.g., greyhound sprinting speed, poodle curly coat). However, environmental stressors—including nutritional deficits, drought, parasite loads, infectious diseases, and temperature extremes—can severely impair growth even in organisms with elite pedigrees.',
    scientificFact: 'In Angus cattle, calves carrying high-yield growth genetics will fail to achieve target weight or milk production if subjected to heat stress or poor pasture forage.'
  }
];

export interface CourtshipCase {
  id: string;
  animal: string;
  behaviorType: 'gift' | 'structure' | 'display' | 'combat' | 'vocal';
  title: string;
  summary: string;
  survivalBenefit: string;
  icon: string;
}

export const COURTSHIP_CASES: CourtshipCase[] = [
  {
    id: 'peacock',
    animal: 'Peacock (Pavo cristatus)',
    behaviorType: 'display',
    title: 'Iridescent Feather Train Display',
    summary: 'The male spreads a fan of over 150 iridescent feathers covered with structural ocelli ("eye-spots"), vibrating them to produce a low-frequency hum.',
    survivalBenefit: 'Eye-spots signal vigor, nutritional health, and resistance to blood parasites, guiding female mate choice toward high-quality genes.',
    icon: '🦚'
  },
  {
    id: 'weaver_bird',
    animal: 'Village Weaver Bird (Ploceus cucullatus)',
    behaviorType: 'structure',
    title: 'Intricate Woven Grass Nests',
    summary: 'Males weave hollow teardrop-shaped nests suspended from tree branches using hundreds of interlocking grass strips, flapping their wings to invite female inspections.',
    survivalBenefit: 'Demonstrates construction craftsmanship and provides safe, predator-resistant shelter for incubating eggs and feeding chicks.',
    icon: '🪺'
  },
  {
    id: 'kingfisher',
    animal: 'Common Kingfisher (Alcedo atthis)',
    behaviorType: 'gift',
    title: 'Nuptial Fish Gift Offering',
    summary: 'The male dives into waterways to catch a fresh fish, landing beside the female and offering it head-first directly into her beak.',
    survivalBenefit: 'Proves the male is a skilled fisherman capable of catching enough prey to provision both the mother and a future brood of hungry chicks.',
    icon: '🐟'
  },
  {
    id: 'elk',
    animal: 'Bull Elk (Cervus canadensis)',
    behaviorType: 'combat',
    title: 'Antler Clashing & Loud Bugling',
    summary: 'Bull elk emit echoing high-pitched bugles to challenge rivals and lock massive bone antlers in tests of brute pushing strength.',
    survivalBenefit: 'Dominant winners secure mating rights over a harem of females, ensuring that only the strongest, healthiest bulls pass on their physical traits.',
    icon: '🦌'
  },
  {
    id: 'tree_frog',
    animal: 'Grey Tree Frog (Hyla versicolor)',
    behaviorType: 'vocal',
    title: 'Rhythmic Resonant Vocalizations',
    summary: 'Males inflate vocal sacs at water bodies to produce pulsed trills; females choose males that produce longer, more frequent call pulses.',
    survivalBenefit: 'Long trill durations require high respiratory endurance and caloric energy, reliably indicating strong metabolic stamina.',
    icon: '🐸'
  }
];

export const GUPPY_TRIALS = [
  {
    condition: 1,
    title: 'Trial 1: Large Tail vs. Small Tail',
    maleA: 'Large-Tailed Male',
    maleB: 'Small-Tailed Male',
    percentA: 78,
    percentB: 22,
    observation: 'Female guppies overwhelmingly swam toward and courted with the large-tailed male (78% vs 22%).'
  },
  {
    condition: 2,
    title: 'Trial 2: Large Tail vs. Medium Tail',
    maleA: 'Large-Tailed Male',
    maleB: 'Medium-Tailed Male',
    percentA: 76,
    percentB: 24,
    observation: 'Even when compared against an intermediate male, the large-tailed male secured 76% of female courtship approaches.'
  },
  {
    condition: 3,
    title: 'Trial 3: Medium Tail vs. Small Tail',
    maleA: 'Medium-Tailed Male',
    maleB: 'Small-Tailed Male',
    percentA: 75,
    percentB: 25,
    observation: 'When large males were absent, females decisively preferred medium-tailed males (75%) over small-tailed counterparts (25%).'
  }
];

export const LEVEL_3_QUIZ: QuizQuestion[] = [
  {
    id: 'a1',
    type: 'multiple_choice',
    question: 'How do aggregating sea anemones uniquely combine both asexual and sexual reproduction?',
    options: [
      'They only lay eggs on land after metamorphosis',
      'They reproduce asexually by splitting (fission) to form dense rock colonies, and sexually by broadcast spawning to disperse diverse larvae',
      'They produce seeds during winter and flowers during spring',
      'They are strictly asexual clones and cannot produce gametes'
    ],
    correctAnswer: 1,
    explanation: 'Aggregating sea anemones employ dual reproductive strategies: longitudinal fission (asexual cloning) allows rapid colonization of rocky shoreline surfaces, while broadcast spawning of eggs and sperm (sexual reproduction) disperses genetically diverse larvae on ocean currents.',
    misconceptionAlert: 'Many marine invertebrates are not limited to just one mode of reproduction; they switch between asexual cloning and sexual spawning based on ecological needs.'
  },
  {
    id: 'a2',
    type: 'multiple_choice',
    question: 'In the controlled guppy mate-preference experiments, what pattern did female guppies consistently demonstrate across all three trials?',
    options: [
      'They always chose males with the smallest, drab tails to avoid predator detection',
      'They showed a strong statistical preference (75%–78%) for males with larger, more vibrant tails',
      'They chose randomly with 50% split in every trial',
      'They only courted males when freshwater temperatures were near freezing'
    ],
    correctAnswer: 1,
    explanation: 'Across all three controlled experimental conditions, female guppies showed a clear preference (75% to 78%) for males displaying larger tails, which reliably correlate with health, vigor, and genetic fitness.',
    misconceptionAlert: 'Always evaluate scientific data in context: while large tails enhance mating success in safe conditions, they increase vulnerability to predators in murky, predator-rich rivers.'
  },
  {
    id: 'a3',
    type: 'multiple_choice',
    question: 'Why does an adult killdeer bird feign a "broken wing" by dragging its wing on the ground when a predator approaches?',
    options: [
      'It broke its bone while flying and cannot fly away',
      'It performs a distraction display to lure the predator away from its camouflaged ground nest and defenseless chicks',
      'It is signaling other killdeer birds to attack the predator',
      'It is warming up its flight muscles for hunting'
    ],
    correctAnswer: 1,
    explanation: 'The broken-wing display is an evolutionary distraction behavior. The parent pretends to be an easy, injured target, drawing the predator\'s attention away from its eggs or ground chicks, before flying away at the last second.',
    misconceptionAlert: 'The parent bird is not actually injured; it is putting its own life at risk to protect its genetic investment in its offspring.'
  },
  {
    id: 'a4',
    type: 'multiple_choice',
    question: 'Which of the following is an example of an innate (instinctive) behavior in newly born or hatched animals?',
    options: [
      'A lion cub mastering complex cooperative hunting techniques after two years of practice',
      'A dog learning to sit on command when offered a biscuit',
      'Gosling chicks imprinting on the first moving parent figure and following closely',
      'A parrot repeating English words taught by its trainer'
    ],
    correctAnswer: 2,
    explanation: 'Imprinting in goslings, begging vocalizations in nestling songbirds, and freezing in newborn antelopes are innate behaviors programmed into the nervous system by genetics, requiring no prior experience or training.',
    misconceptionAlert: 'Learned behaviors (like hunting or tricks) require observation, practice, and experience; innate behaviors are present at birth or hatching.'
  },
  {
    id: 'a5',
    type: 'multiple_choice',
    question: 'What extreme reproductive sacrifice does a female giant Pacific octopus make to ensure the survival of her thousands of eggs?',
    options: [
      'She carries them inside a pouch like a kangaroo for three years',
      'She guards, grooms, and aerates the eggs in a cave for months without eating, dying of starvation after they hatch',
      'She deposits them on dry sandy beaches and swims away immediately',
      'She feeds her own limbs to predatory moray eels to distract them'
    ],
    correctAnswer: 1,
    explanation: 'The female octopus exhibits semelparity (single reproductive event): she ceaselessly aerates and sweeps silt off her eggs in a den for months, never leaving to feed, and dies as her young emerge into the water column.',
    misconceptionAlert: 'Maternal care strategies range widely in nature—from zero parental care in sea turtles to total self-sacrificing dedication in octopuses and emperor penguins.'
  },
  {
    id: 'a6',
    type: 'multiple_choice',
    question: 'A farmer breeds an Angus calf possessing elite high-yield growth genetics. Under which conditions will the calf still fail to reach its genetic weight and milk potential?',
    options: [
      'If it is provided with clean water and nutrient-dense grass pasture',
      'If it experiences severe drought, high heat stress, and heavy parasite infection',
      'If it is vaccinated against common bovine bacterial illnesses',
      'If it is kept in well-ventilated, shaded pastures'
    ],
    correctAnswer: 1,
    explanation: 'An organism\'s phenotype is the combined result of genetics AND environment. Favorable genes define the maximum growth ceiling, but environmental deficits (starvation, dehydration, heat stress, parasites) act as severe limiting bottlenecks.',
    misconceptionAlert: 'Genetics is not destiny alone! Even an animal with champion genes cannot grow properly without adequate nutrition, water, and disease prevention.'
  },
  {
    id: 'a7',
    type: 'multiple_choice',
    question: 'Why do male weaver birds weave complex hanging nests before mating?',
    options: [
      'To sleep during the day and avoid bats',
      'Females inspect the architectural quality, strength, and fresh green materials to assess male craftsmanship and suitability',
      'To catch flying insects in the woven holes',
      'To hide food stolen from nearby farmers'
    ],
    correctAnswer: 1,
    explanation: 'Weaver bird nests serve as courtship signals. Females inspect the sturdiness and freshness of the weave; if unsatisfied, she rejects the nest, prompting the male to dismantle it and weave a new one.',
    misconceptionAlert: 'Courtship is not just about physical body colors; behavioral artifacts like bower structures and woven nests communicate male fitness.'
  },
  {
    id: 'a8',
    type: 'multiple_choice',
    question: 'How do male emperor penguins protect their single egg during the brutal Antarctic winter blizzards (-40°C)?',
    options: [
      'They bury the egg under 5 feet of snow',
      'They cradle the egg on top of their feet tucked under a warm vascularized abdominal brood pouch for up to 60-80 days without feeding',
      'They leave the egg with the mother who remains at the colony all winter',
      'They migrate to tropical islands until the egg hatches'
    ],
    correctAnswer: 1,
    explanation: 'The male emperor penguin balances the fragile egg on top of his feet, sheltering it beneath a thick brood pouch while huddling in synchronized groups during bitter sub-zero blizzards while the mother feeds at sea.',
    misconceptionAlert: 'In emperor penguins, the male—not the female—performs the heroic marathon winter egg incubation.'
  },
  {
    id: 'a9',
    type: 'true_false',
    question: 'True or False: A courtship behavior observed in one species (such as peacock feather vibrating) applies as a universal rule to all animals.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'False. Courtship behaviors are diverse adaptations tailored to each species\' unique sensory biology and ecological niche (e.g., frogs use sound, moths use pheromones, fireflies use bioluminescence, and spiders use silk-wrapped gifts).',
    misconceptionAlert: 'Never generalize a specific animal\'s courtship or parenting adaptation as an absolute biological rule for all fauna.'
  },
  {
    id: 'a10',
    type: 'multiple_choice',
    question: 'In biology, what does "epizoochory" or hitchhiking refer to in terms of animal-plant interactions?',
    options: [
      'Animals consuming nectar and inadvertently pollinating flowers',
      'Seeds possessing specialized hooks, spines, or sticky mucilage that latch onto animal fur or feathers for dispersal',
      'Animals building underground burrows in plant root systems',
      'Parasites that infect both plants and animals simultaneously'
    ],
    correctAnswer: 1,
    explanation: 'Epizoochory is seed dispersal by external animal transport. Plants like burdock, cocklebur, and beggarticks produce hooked burs that hitchhike on passing mammals and birds, dropping off miles away.',
    misconceptionAlert: 'Unlike endozoochory (ingestion and excretion of fruits), epizoochory requires no nutritional reward for the animal; the plant hitches a free ride!'
  }
];
