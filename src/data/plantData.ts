/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Level 1: Plant Reproduction, Dispersal, and Survival
 */

export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  category: 'reproduction' | 'flower' | 'dispersal' | 'germination' | 'adaptation';
  shortText: string;
  detail: string;
  scientificFact: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'matching' | 'scenario' | 'sequencing';
  question: string;
  options?: string[];
  correctAnswer: number | string | string[];
  explanation: string;
  misconceptionAlert?: string;
  hint?: string;
}

export const PLANT_INFOGRAPHIC_URL = '/assets/aistudio/Botanical_Guide_to_Plant_Reproduction_Infographic_6c1a228e.png';

export const PLANT_HOTSPOTS: Hotspot[] = [
  {
    id: 'sexual-repro',
    x: 32,
    y: 14,
    title: 'Sexual Reproduction & Genetic Diversity',
    category: 'reproduction',
    shortText: 'Two parent plants combine gametes to produce genetically distinct offspring.',
    detail: 'In sexual reproduction, pollen (male gamete) fertilizes an ovule (female gamete). Because each parent contributes unique genetic information, offspring have varied traits. This genetic diversity gives populations a survival advantage when environmental conditions change.',
    scientificFact: 'Genetic variation is the primary raw material for natural selection and species adaptation.'
  },
  {
    id: 'flower-anatomy',
    x: 80,
    y: 19,
    title: 'Specialized Flower Anatomy',
    category: 'flower',
    shortText: 'Male stamen and female pistil housed within protective petals and sepals.',
    detail: 'The male structure is the Stamen (consisting of the pollen-producing Anther and stalk-like Filament). The female structure is the Pistil or Carpel (consisting of the sticky Stigma, neck Style, and Ovary with Ovules). Sepals protect the young bud, while petals attract pollinators.',
    scientificFact: 'Important distinction: "Pollen" is not the name of the organ; it is produced within the anthers of the stamen.'
  },
  {
    id: 'spores-vs-seeds',
    x: 38,
    y: 36,
    title: 'Seedless Plants: Spores & Water',
    category: 'reproduction',
    shortText: 'Ferns and mosses reproduce via microscopic spores requiring damp environments.',
    detail: 'Unlike seed plants that enclose an embryo with its own food reserve inside a tough seed coat, seedless plants (such as ferns) produce single-celled spores. Their flagellated sperm require a thin film of water to swim and fertilize female cells.',
    scientificFact: 'Fern spores can survive dry periods, but actual fertilization cannot occur without liquid water.'
  },
  {
    id: 'asexual-repro',
    x: 20,
    y: 48,
    title: 'Asexual Reproduction: Genetic Clones',
    category: 'reproduction',
    shortText: 'A single parent produces genetically identical offspring through vegetative propagation.',
    detail: 'Asexual reproduction requires only one parent and involves mitosis without gamete fusion. Offspring are genetic clones. Key natural examples include potato tubers (eyes sprout stems), spider plant runners/plantlets, and trembling aspen root sucker networks.',
    scientificFact: 'Trembling aspen groves often share one massive interconnected underground root system spanning miles.'
  },
  {
    id: 'bee-pollinators',
    x: 74,
    y: 41,
    title: 'Bee Pollinators & Crop Economics',
    category: 'flower',
    shortText: 'Honeybees and wild bees drive cross-pollination for essential fruits and vegetables.',
    detail: 'Insect pollinators transfer pollen from anthers to stigmas. In the United States alone, honeybees contribute over $15 Billion annually in crop value, pollinating apples, almonds, cucumbers, blueberries, and melons.',
    scientificFact: 'Colony collapse can be triggered by interacting stressors: Varroa mite parasites, bacterial diseases, habitat loss, and harsh weather.'
  },
  {
    id: 'dispersal-vectors',
    x: 26,
    y: 65,
    title: 'Seed Dispersal Vectors',
    category: 'dispersal',
    shortText: 'Moving seeds away from the parent plant reduces resource competition.',
    detail: 'Seed dispersal prevents crowding under the parent plant and colonizes new territories. Vectors include: Wind (milkweed plumes, dandelion pappus), Water (buoyant coconuts), Animal Ingestion (tasty berries passing through gut), Hitchhiking (burdock hooks clinging to fur), and Animal Caches (unretrieved buried acorns).',
    scientificFact: 'Squirrels fail to recover an estimated 30% to 50% of cached acorns, planting entire oak forests.'
  },
  {
    id: 'germination-cues',
    x: 78,
    y: 74,
    title: 'Germination vs. Growth Requirements',
    category: 'germination',
    shortText: 'Germination requires water, oxygen, and temperature; growth needs light and soil nutrients.',
    detail: 'To germinate, a dormant seed relies on stored cotyledon energy and only needs water (imbibition/swelling), oxygen (cellular respiration), and suitable temperature. However, once the shoot emerges, it requires sunlight (photosynthesis), space, and soil minerals (nitrogen, phosphorus) for sustained growth.',
    scientificFact: 'Most seeds can germinate in total darkness underground because they do not rely on photosynthesis until green leaves emerge.'
  },
  {
    id: 'environmental-adaptation',
    x: 70,
    y: 91,
    title: 'Environmental Stress & Adaptability',
    category: 'adaptation',
    shortText: 'Dandelions and cacti showcase evolutionary adaptations to challenging habitats.',
    detail: 'Different species evolve distinct tolerances: Ferns thrive in moist, shaded forest floors; Cacti store water in thick stems with spines to minimize transpiration in arid deserts; Dandelions thrive in disturbed soils with deep taproots and high-efficiency windborne parachutes.',
    scientificFact: 'Dandelion seeds can travel over 5 miles on gentle convective thermal air currents.'
  }
];

export const FLOWER_PARTS = [
  {
    id: 'petal',
    name: 'Petals (Corolla)',
    system: 'Attraction & Protection',
    function: 'Brightly colored, scented leaves that attract specific animal pollinators like bees, butterflies, and hummingbirds while shielding inner organs.',
    color: '#EC4899',
    magnifiedInfo: 'Petal surfaces often feature microscopic UV reflective patterns ("nectar guides") invisible to humans but shining brightly to bees.'
  },
  {
    id: 'sepal',
    name: 'Sepals (Calyx)',
    system: 'Bud Protection',
    function: 'Green leaf-like structures at the base that encase and protect the delicate flower bud before it blooms.',
    color: '#16A34A',
    magnifiedInfo: 'Sepals close tightly around the young bud to defend developing reproductive tissues from rain, desiccating winds, and herbivorous insects.'
  },
  {
    id: 'anther',
    name: 'Anther (Male)',
    system: 'Male Organ (Stamen)',
    function: 'Pollen sacs at the tip of the filament where microspores undergo meiosis to produce male pollen grains.',
    color: '#F59E0B',
    magnifiedInfo: 'When mature, anther sacs split open (dehiscence) to coat visiting pollinators with microscopic pollen grains.'
  },
  {
    id: 'filament',
    name: 'Filament (Male)',
    system: 'Male Organ (Stamen)',
    function: 'Slender stalk that elevates the anther into optimal position for wind dispersal or contact with visiting pollinators.',
    color: '#D97706',
    magnifiedInfo: 'Together, the anther and filament form the complete male organ known as the STAMEN.'
  },
  {
    id: 'stigma',
    name: 'Stigma (Female)',
    system: 'Female Organ (Pistil / Carpel)',
    function: 'Sticky or feathery landing pad at the top of the style that captures and holds compatible pollen grains.',
    color: '#8B5CF6',
    magnifiedInfo: 'The stigma secretes a sugary, sticky exudate that hydrates pollen grains and triggers germination of the pollen tube.'
  },
  {
    id: 'style',
    name: 'Style (Female)',
    system: 'Female Organ (Pistil / Carpel)',
    function: 'Long, narrow neck connecting the stigma to the ovary; guides the growing pollen tube down toward the ovules.',
    color: '#A855F7',
    magnifiedInfo: 'Pollen tubes digest their way through style tissue using specialized enzymes to reach the ovarian chamber.'
  },
  {
    id: 'ovary',
    name: 'Ovary (Female)',
    system: 'Female Organ (Pistil / Carpel)',
    function: 'Swollen base of the carpel housing one or more ovules. After fertilization, the ovary wall ripens into the fruit.',
    color: '#9333EA',
    magnifiedInfo: 'In typical flowering plants, eating an apple or peach means you are consuming the swollen, matured ovary tissue!'
  },
  {
    id: 'ovule',
    name: 'Ovules (Female)',
    system: 'Female Organ (Pistil / Carpel)',
    function: 'Egg-containing structures nestled inside the ovary. Upon fertilization by sperm nuclei, each ovule matures into a seed.',
    color: '#C084FC',
    magnifiedInfo: 'An ovule consists of protective integuments, a food supply, and the female gametophyte containing the egg cell.'
  },
  {
    id: 'receptacle',
    name: 'Receptacle',
    system: 'Support Base',
    function: 'Thickened, expanded upper apex of the flower stalk where sepals, petals, stamens, and pistils are firmly anchored.',
    color: '#65A30D',
    magnifiedInfo: 'In some fruits like strawberries, the fleshy edible red portion is actually an enlarged receptacle, not the ovary!'
  },
  {
    id: 'pedicel',
    name: 'Pedicel',
    system: 'Stem Connection',
    function: 'The botanical flower stalk that supports the flower and supplies water and nutrients via vascular bundles.',
    color: '#4D7C0F',
    magnifiedInfo: 'Connects the individual flower to the main branch or inflorescence axis.'
  }
];

export const DISPERSAL_ITEMS = [
  {
    id: 'milkweed',
    name: 'Milkweed Seed',
    vector: 'wind',
    vectorLabel: 'Wind Dispersal',
    imageHint: 'Silky hair tufts / parachute',
    description: 'Equipped with a lightweight silky tuft (coma) that catches gentle air currents and floats for miles.'
  },
  {
    id: 'coconut',
    name: 'Coconut Fruit',
    vector: 'water',
    vectorLabel: 'Water Dispersal',
    imageHint: 'Fibrous buoyant husk',
    description: 'Surrounded by a thick fibrous waterproof husk (mesocarp) that traps air, allowing it to float across ocean currents.'
  },
  {
    id: 'berries',
    name: 'Fleshy Berries',
    vector: 'animal_ingestion',
    vectorLabel: 'Animal Ingestion',
    imageHint: 'Sweet, colorful flesh',
    description: 'Eaten by birds and mammals; seeds survive the digestive tract unharmed and are deposited with natural fertilizer.'
  },
  {
    id: 'burdock_cocklebur',
    name: 'Cocklebur / Burdock',
    vector: 'animal_hitchhiking',
    vectorLabel: 'Animal Hitchhiking',
    imageHint: 'Sharp microscopic hooks',
    description: 'Covered with tiny stiff hooks that cling securely to mammal fur or bird feathers as animals brush past.'
  },
  {
    id: 'acorn',
    name: 'Oak Acorn',
    vector: 'animal_cache',
    vectorLabel: 'Animal Cache (Buried)',
    imageHint: 'Nut hidden underground',
    description: 'Squirrels and jays bury large stores of acorns for winter; forgotten caches readily germinate into seedlings.'
  },
  {
    id: 'fern_spores',
    name: 'Fern Spores',
    vector: 'water_moisture',
    vectorLabel: 'Water & Moisture Dependent',
    imageHint: 'Microscopic single cells',
    description: 'Seedless spores are blown by wind but require moist soil and water films for flagellated sperm to complete fertilization.'
  }
];

export const LEVEL_1_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'multiple_choice',
    question: 'What is the primary evolutionary advantage of sexual reproduction compared to asexual reproduction in plants?',
    options: [
      'It produces offspring much faster with zero energy cost',
      'It creates genetic diversity that improves adaptation to changing environments',
      'It guarantees that all offspring are exact genetic clones of the parent',
      'It eliminates the need for water or sunlight during life'
    ],
    correctAnswer: 1,
    explanation: 'Sexual reproduction combines genetic material from two parents (egg and pollen), resulting in genetic variation. This diversity increases the likelihood that some individuals will survive disease or climate shifts.',
    misconceptionAlert: 'Asexual reproduction is faster and requires less energy, but producing identical clones makes the entire population vulnerable to the same disease or environmental stress.'
  },
  {
    id: 'q2',
    type: 'multiple_choice',
    question: 'Which flower structures comprise the entire male reproductive organ (the stamen)?',
    options: [
      'Stigma and Style',
      'Anther and Filament',
      'Petal and Sepal',
      'Ovary and Ovule'
    ],
    correctAnswer: 1,
    explanation: 'The stamen is the complete male reproductive structure, consisting of the pollen-producing Anther mounted atop the stalk-like Filament.',
    misconceptionAlert: 'Do not confuse pollen with the stamen! Pollen grains are the microscopic cells produced inside the anther.'
  },
  {
    id: 'q3',
    type: 'multiple_choice',
    question: 'After successful pollination and fertilization, what do the ovule and ovary typically develop into?',
    options: [
      'The ovule becomes a petal, and the ovary becomes a sepal',
      'The ovule becomes a pollen grain, and the ovary becomes a root',
      'The ovule develops into a seed, and the ovary develops into a fruit',
      'The ovule dissolves, and the ovary becomes a leaf'
    ],
    correctAnswer: 2,
    explanation: 'Fertilized ovules mature into seeds containing the plant embryo and food stores, while the surrounding ovary tissue swells and ripens into a fruit.',
    misconceptionAlert: 'In botany, any structure that develops from the fertilized ovary and encloses seeds is technically a fruit—including tomatoes, cucumbers, and pea pods!'
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    question: 'Which of the following is an example of natural asexual reproduction via vegetative structures?',
    options: [
      'A dandelion seed floating on a breeze to a new lawn',
      'A bumblebee transferring pollen between two apple blossoms',
      'A potato plant producing new shoots and roots from eye buds on its underground tubers',
      'A pine cone dropping fertilized seeds to the forest floor'
    ],
    correctAnswer: 2,
    explanation: 'Potatoes reproduce asexually through specialized underground stem tubers. The "eyes" sprout genetically identical daughter plants without pollination or seeds.',
    misconceptionAlert: 'Potatoes, spider plant runners, and aspen root suckers are vegetative clones; they do not involve meiosis or fertilization.'
  },
  {
    id: 'q5',
    type: 'multiple_choice',
    question: 'A student places a viable seed in moist soil at 22°C in a dark cupboard. Will the seed germinate, and why?',
    options: [
      'No, because seeds cannot germinate without direct sunlight',
      'Yes, because germination requires water, oxygen, and suitable temperature, not light',
      'No, because seeds require bees to pollinate them underground',
      'Yes, but only if soil fertilizer is added immediately'
    ],
    correctAnswer: 1,
    explanation: 'Most seeds do not require light to germinate because the dormant embryo utilizes energy stored within its cotyledons/endosperm. The essential germination cues are water, oxygen, and temperature.',
    misconceptionAlert: 'Do not confuse germination with sustained seedling growth! Once the seedling exhausts its stored food reserves and unfurls green leaves, light becomes mandatory for photosynthesis.'
  },
  {
    id: 'q6',
    type: 'multiple_choice',
    question: 'Why are seedless plants like ferns restricted primarily to moist, damp environments for reproduction?',
    options: [
      'Their seeds are too heavy to blow in the wind',
      'Their flagellated sperm require a film of liquid water to swim to the egg',
      'They do not possess cell walls',
      'Their flowers dry out quickly under direct sunlight'
    ],
    correctAnswer: 1,
    explanation: 'Ferns and mosses lack pollen tubes and seeds; their male gametes are swimming sperm cells that must have a thin layer of external water to swim and fertilize the female gametophyte.',
    misconceptionAlert: 'Ferns produce spores, NOT seeds or flowers. Spores can disperse through dry air, but fertilization itself requires liquid moisture.'
  },
  {
    id: 'q7',
    type: 'multiple_choice',
    question: 'How do burdock and cocklebur seeds successfully disperse away from parent plants?',
    options: [
      'They produce lightweight feathery parachutes that catch thermal air currents',
      'They possess sharp microscopic hooks that attach securely to animal fur and clothing',
      'They explode violently upon contact with raindrops',
      'They float down freshwater streams using buoyant waterproof husks'
    ],
    correctAnswer: 1,
    explanation: 'Cockleburs and burdock heads are covered in recurved hooks that latch onto passing animal fur (epizoochory or "hitchhiking"), carrying the seeds far from the parent.',
    misconceptionAlert: 'This hook-and-loop mechanism in burdock burrs famously inspired the Swiss inventor George de Mestral to create Velcro!'
  },
  {
    id: 'q8',
    type: 'true_false',
    question: 'True or False: In a typical flowering plant, the entire female structure is called pollen.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'False. The female reproductive organ is the pistil (or carpel), consisting of the stigma, style, ovary, and ovules. Pollen is the male gametophyte produced in the anthers.',
    misconceptionAlert: 'Pollen is male, not female, and is produced in the stamen, not the pistil.'
  },
  {
    id: 'q9',
    type: 'multiple_choice',
    question: 'Bee pollinators contribute approximately how much value annually to U.S. agricultural crops?',
    options: [
      '$50 Million',
      '$500 Million',
      '$15 Billion',
      '$250 Billion'
    ],
    correctAnswer: 2,
    explanation: 'According to agricultural research, honeybees and wild bee pollinators contribute approximately $15 Billion annually to U.S. crops, including almonds, apples, berries, and cucumbers.',
    misconceptionAlert: 'Pollinators are vital not just for wild ecosystems, but are indispensable to our human food security and agricultural economy.'
  },
  {
    id: 'q10',
    type: 'multiple_choice',
    question: 'Which set of environmental stressors can trigger severe honeybee colony losses (Colony Collapse)?',
    options: [
      'Varroa parasites, bacterial diseases, destroyed natural habitats, and extreme weather',
      'Excessive nectar intake and too many sunny spring days',
      'Lack of soil nutrients and earthworm competition',
      'Planting too many wildflower meadows'
    ],
    correctAnswer: 0,
    explanation: 'Honeybee colonies face multi-stressor threats: parasitic mites (Varroa destructor), pathogenic bacterial infections, loss of foraging habitat/flowers, and harsh weather events.',
    misconceptionAlert: 'Bee decline is rarely caused by a single isolated factor; interacting stressors weaken the immune system of colonies.'
  }
];
