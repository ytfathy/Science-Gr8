/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Handwritten-style one-page summary ("notebook sketch") for each Quarter 2 lesson.
 * Real text (exact and searchable) in handwriting fonts, with pencil doodles wobbled by an SVG filter.
 */

import React from 'react';

type Tint = 'yellow' | 'blue' | 'pink' | 'green';
interface Box {
  title: string;
  lines: string[]; // ==text== is highlighted
  doodle: keyof typeof DOODLES;
  tint: Tint;
}
interface Sheet {
  title: string;
  bigIdea: string;
  boxes: Box[];
  remember: string;
}

const INK = '#1e293b';
const PEN = '#1d4ed8';
const TINTS: Record<Tint, string> = { yellow: '#fef3c7', blue: '#dbeafe', pink: '#fce7f3', green: '#dcfce7' };
const HAND = '"Patrick Hand", "Comic Sans MS", cursive';
const TITLE = '"Caveat", "Patrick Hand", cursive';

// Pencil doodles (viewBox 0 0 80 60). Stroke-only lines + soft fills, wobbled by #q2-wobble.
// No fill here: the wrapping <g fill="none"> is the default, and doodles set their own fills.
const s = { stroke: INK, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const DOODLES = {
  goggles: (
    <>
      <rect x="8" y="18" width="28" height="22" rx="10" fill="#bae6fd" {...s} />
      <rect x="44" y="18" width="28" height="22" rx="10" fill="#bae6fd" {...s} />
      <path d="M36 28 h8 M8 26 q-6 0 -6 6 M72 26 q6 0 6 6" {...s} />
    </>
  ),
  cubes: (
    <>
      <path d="M2 34 h76" stroke="#60a5fa" strokeWidth="2" fill="none" />
      <rect x="10" y="20" width="18" height="18" fill="#fde68a" {...s} />
      <rect x="50" y="38" width="18" height="18" fill="#94a3b8" {...s} />
      <path d="M59 30 v6 M56 33 l3 3 l3 -3" {...s} />
    </>
  ),
  melt: (
    <>
      <rect x="6" y="16" width="22" height="22" rx="3" fill="#e0f2fe" {...s} />
      <path d="M34 28 h12 M42 24 l4 4 l-4 4" {...s} />
      <path d="M62 12 q10 16 0 26 q-10 -10 0 -26z" fill="#93c5fd" {...s} />
      <text x="50" y="56" fontSize="11" fill={INK} fontFamily={HAND}>still H₂O</text>
    </>
  ),
  reaction: (
    <>
      <circle cx="10" cy="22" r="6" fill="#f8fafc" {...s} />
      <circle cx="20" cy="22" r="6" fill="#f8fafc" {...s} />
      <circle cx="12" cy="40" r="8" fill="#fca5a5" {...s} />
      <circle cx="26" cy="40" r="8" fill="#fca5a5" {...s} />
      <path d="M36 31 h12 M44 27 l4 4 l-4 4" {...s} />
      <circle cx="64" cy="30" r="8" fill="#fca5a5" {...s} />
      <circle cx="56" cy="40" r="5" fill="#f8fafc" {...s} />
      <circle cx="72" cy="40" r="5" fill="#f8fafc" {...s} />
    </>
  ),
  beaker: (
    <>
      <path d="M24 6 v20 l-12 26 h56 l-12 -26 v-20" {...s} />
      <path d="M17 40 h46 l4 12 h-54z" fill="#f9a8d4" stroke="none" opacity="0.8" />
      <circle cx="34" cy="34" r="2.5" {...s} />
      <circle cx="44" cy="26" r="2" {...s} />
      <circle cx="40" cy="16" r="1.6" {...s} />
      <path d="M30 50 h3 M42 49 h3 M50 50 h3" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  spark: (
    <>
      <path d="M40 4 l6 18 l18 -6 l-12 14 l14 12 l-18 -2 l-4 18 l-6 -16 l-16 8 l8 -16 l-16 -8 l18 -2z" fill="#fdba74" {...s} />
    </>
  ),
  water: (
    <>
      <circle cx="40" cy="24" r="12" fill="#fca5a5" {...s} />
      <path d="M31 32 l-10 10 M49 32 l10 10" {...s} />
      <circle cx="18" cy="45" r="7" fill="#f8fafc" {...s} />
      <circle cx="62" cy="45" r="7" fill="#f8fafc" {...s} />
      <text x="35" y="28" fontSize="10" fill={INK} fontFamily={HAND}>O</text>
    </>
  ),
  peroxide: (
    <>
      <text x="4" y="26" fontSize="18" fill={INK} fontFamily={HAND}>2H₂O</text>
      <text x="4" y="50" fontSize="18" fill="#b91c1c" fontFamily={HAND}>H₂O₂</text>
      <path d="M52 40 l16 12 M68 40 l-16 12" stroke="#b91c1c" strokeWidth="2.5" fill="none" />
      <path d="M52 16 l6 6 l12 -14" stroke="#15803d" strokeWidth="2.5" fill="none" />
    </>
  ),
  arrow: (
    <>
      <text x="0" y="36" fontSize="14" fill={INK} fontFamily={HAND}>A + B</text>
      <path d="M36 31 h16 M48 26 l5 5 l-5 5" {...s} />
      <text x="58" y="36" fontSize="14" fill={INK} fontFamily={HAND}>C</text>
    </>
  ),
  balance: (
    <>
      <path d="M40 8 v40 M24 54 h32 M12 18 h56" {...s} />
      <path d="M12 18 l-8 16 h16z M68 18 l-8 16 h16z" fill="#fde68a" {...s} />
      <text x="5" y="47" fontSize="10" fill={INK} fontFamily={HAND}>C1 H4 O4</text>
      <text x="51" y="47" fontSize="10" fill={INK} fontFamily={HAND}>C1 H4 O4</text>
    </>
  ),
  flasks: (
    <>
      <path d="M14 10 h10 M16 10 v12 l-10 26 h28 l-10 -26 v-12" {...s} />
      <path d="M12 6 h16" stroke={INK} strokeWidth="4" />
      <path d="M56 10 v12 l-10 26 h28 l-10 -26 v-12" {...s} />
      <circle cx="62" cy="4" r="2" {...s} />
      <circle cx="70" cy="2" r="1.5" {...s} />
      <text x="5" y="58" fontSize="10" fill="#15803d" fontFamily={HAND}>closed</text>
      <text x="50" y="58" fontSize="10" fill="#b91c1c" fontFamily={HAND}>open</text>
    </>
  ),
  particles: (
    <>
      <rect x="4" y="8" width="32" height="40" {...s} />
      <rect x="44" y="8" width="32" height="40" {...s} />
      {[[12, 18], [26, 22], [16, 36], [28, 40]].map(([x, y]) => <circle key={x + y} cx={x} cy={y} r="3" fill="#93c5fd" {...s} />)}
      {[[52, 16], [68, 24], [56, 38], [70, 42]].map(([x, y]) => (
        <g key={x + y}>
          <circle cx={x} cy={y} r="3" fill="#fca5a5" {...s} />
          <path d={`M${x - 9} ${y} h4`} {...s} />
        </g>
      ))}
    </>
  ),
  sun: (
    <>
      <circle cx="22" cy="30" r="11" fill="#fde047" {...s} />
      <path d="M22 12 v-6 M22 48 v6 M4 30 h-3 M40 30 h3 M9 17 l-4 -4 M35 17 l4 -4" {...s} />
      <path d="M44 30 q4 -6 8 0 t8 0 t8 0" {...s} />
      <rect x="70" y="24" width="8" height="12" fill="#fca5a5" {...s} />
    </>
  ),
  exo: (
    <>
      <circle cx="40" cy="30" r="10" fill="#fdba74" {...s} />
      <path d="M52 30 h14 M62 26 l4 4 l-4 4 M28 30 h-14 M18 26 l-4 4 l4 4 M40 18 v-12 M36 10 l4 -4 l4 4 M40 42 v12 M36 50 l4 4 l4 -4" stroke="#dc2626" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  endo: (
    <>
      <circle cx="40" cy="30" r="10" fill="#7dd3fc" {...s} />
      <path d="M66 30 h-14 M56 26 l-4 4 l4 4 M14 30 h14 M24 26 l4 4 l-4 4 M40 4 v12 M36 12 l4 4 l4 -4 M40 56 v-12 M36 48 l4 -4 l4 4" stroke="#2563eb" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  rate: (
    <>
      <path d="M10 50 a30 30 0 0 1 60 0" {...s} />
      <path d="M40 50 l18 -20" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="50" r="3" fill={INK} />
      <text x="6" y="58" fontSize="9" fill={INK} fontFamily={HAND}>slow</text>
      <text x="58" y="58" fontSize="9" fill={INK} fontFamily={HAND}>fast</text>
    </>
  ),
  turtle: (
    <>
      <path d="M8 44 q32 16 64 0" fill="#e7cf9f" {...s} />
      {[22, 34, 46].map((x) => <ellipse key={x} cx={x} cy="38" rx="5" ry="6.5" fill="#fefce8" {...s} />)}
      <rect x="58" y="24" width="7" height="22" rx="3.5" fill="#fff" {...s} />
      <rect x="60" y="30" width="3" height="14" fill="#ef4444" />
      <path d="M54 30 h3 M54 36 h3" stroke="#16a34a" strokeWidth="2" />
    </>
  ),
};

const SHEETS: Record<1 | 2 | 3, Sheet> = {
  1: {
    title: 'Chemical Reactions & Properties of Matter',
    bigIdea: 'Matter can change its form (physical change) or turn into something new (chemical change).',
    remember: 'Physical = same stuff, new look   •   Chemical = brand-new stuff',
    boxes: [
      { title: 'Safety first!', doodle: 'goggles', tint: 'blue', lines: ['Goggles, gloves, lab apron', 'No contact lenses or open-toed shoes', '==Waft== fumes toward you, never sniff'] },
      { title: 'Properties = ID card', doodle: 'cubes', tint: 'yellow', lines: ['==Density = mass ÷ volume== (D = m/V)', 'Melting & boiling point, solubility', 'Same size, different mass → different substance'] },
      { title: 'Physical change', doodle: 'melt', tint: 'green', lines: ['Same substance, new shape or state', 'Melting, freezing, dissolving, cutting', 'Ice → water is ==still H₂O=='] },
      { title: 'Chemical change', doodle: 'reaction', tint: 'pink', lines: ['Bonds break & new bonds form', '==Reactants → Products== (new substance)', '2H₂ + O₂ → 2H₂O'] },
      { title: '5 signs (clues, not proof!)', doodle: 'beaker', tint: 'yellow', lines: ['Gas bubbles • color change • odor change', 'Heat or light • ==precipitate== (new solid)', 'Proof = a new substance with new properties'] },
      { title: 'Reactions in real life', doodle: 'spark', tint: 'pink', lines: ['Thermite: Fe₂O₃ + 2Al → 2Fe + Al₂O₃', 'Over 2,500 °C, yet ==mass stays the same==', 'Airbag: 2NaN₃ → 2Na + 3N₂ in < 50 ms'] },
    ],
  },
  2: {
    title: 'Chemical Equations & Conservation of Matter',
    bigIdea: 'Atoms are never created or destroyed in a reaction. They are only rearranged.',
    remember: 'Balance with COEFFICIENTS, never change SUBSCRIPTS!',
    boxes: [
      { title: 'Reading a formula', doodle: 'water', tint: 'blue', lines: ['H₂O: subscript 2 → ==2 H atoms==, 1 O', 'No subscript means 1 atom', 'Ca(OH)₂ → everything in ( ) × 2 → 1 Ca, 2 O, 2 H'] },
      { title: 'Coefficient vs. subscript', doodle: 'peroxide', tint: 'pink', lines: ['2H₂O = ==2 molecules== (4 H, 2 O)', 'Change a subscript = new substance', 'H₂O₂ is hydrogen peroxide, not water!'] },
      { title: 'Parts of an equation', doodle: 'arrow', tint: 'yellow', lines: ['Reactants (start) → Products (end)', '“+” means “and”', '“→” means ==“yields” / “produces”=='] },
      { title: 'How to balance', doodle: 'balance', tint: 'green', lines: ['1. Count atoms on each side', '2. Add coefficients, then recount', '==CH₄ + 2O₂ → CO₂ + 2H₂O== (C1 H4 O4 = C1 H4 O4)'] },
      { title: 'Closed vs. open system', doodle: 'flasks', tint: 'blue', lines: ['Closed: nothing in or out → ==mass stays the same==', 'Open: gas escapes → mass seems to drop', 'The escaped atoms still exist!'] },
      { title: 'Law of Conservation of Matter', doodle: 'reaction', tint: 'yellow', lines: ['==Mass of reactants = mass of products==', 'Same atoms in = same atoms out', 'A balanced equation proves it'] },
    ],
  },
  3: {
    title: 'Thermal Energy, Reaction Rates & Engineering',
    bigIdea: 'Thermal energy always flows from hot to cold, and reactions can release it or absorb it.',
    remember: 'EXO = heat EXITS (warmer)   •   ENDO = heat ENTERS (colder)',
    boxes: [
      { title: 'Temperature vs. thermal energy', doodle: 'particles', tint: 'blue', lines: ['Temperature = ==average== particle motion', 'Thermal energy = ==total== motion energy', 'Hot particles move faster'] },
      { title: '3 ways heat moves', doodle: 'sun', tint: 'yellow', lines: ['==Conduction==: touching (hot pan handle)', '==Convection==: currents in liquids & gases', '==Radiation==: waves, even through space (Sun)'] },
      { title: 'Exothermic', doodle: 'exo', tint: 'pink', lines: ['Releases heat → surroundings ==warm up==', 'Hand warmer (sodium acetate)', 'Rusting iron, burning fuel'] },
      { title: 'Endothermic', doodle: 'endo', tint: 'blue', lines: ['Absorbs heat → surroundings ==cool down==', 'Instant cold pack: water + NH₄Cl', 'Dissolving rock salt in water'] },
      { title: 'Speed up a reaction', doodle: 'rate', tint: 'green', lines: ['Higher temperature • more surface area', 'Higher concentration • a catalyst', 'Faster = ==same energy, released sooner=='] },
      { title: 'Engineering design', doodle: 'turtle', tint: 'yellow', lines: ['==Criteria== = what it must do (eggs at 27–33 °C)', '==Constraints== = limits (non-toxic, cheap, no gas)', 'Iron powder + salt + water → steady 28–32 °C'] },
    ],
  },
};

/** Renders text with ==highlighted== parts as marker highlights. */
const Ink: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/==(.+?)==/).map((part, i) =>
      i % 2 ? (
        <mark key={i} style={{ background: 'linear-gradient(transparent 45%, #fde047aa 45%)', color: 'inherit', padding: '0 2px' }}>
          {part}
        </mark>
      ) : (
        part
      ),
    )}
  </>
);

export const Q2SummaryInfographic: React.FC<{ lesson: 1 | 2 | 3 }> = ({ lesson }) => {
  const sheet = SHEETS[lesson];
  return (
    <article
      className="relative mx-auto max-w-5xl rounded-2xl shadow-2xl overflow-hidden px-4 py-6 sm:pl-16 sm:pr-10 sm:py-10"
      style={{
        color: INK,
        fontFamily: HAND,
        backgroundColor: '#fdf8ec',
        backgroundImage: 'repeating-linear-gradient(transparent 0 31px, #c9d8ee 31px 32px)',
      }}
      aria-label={`Summary infographic: ${sheet.title}`}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="q2-wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
      </svg>
      {/* Red notebook margin line */}
      <div className="hidden sm:block absolute top-0 bottom-0 left-11 w-[2px] bg-rose-300" aria-hidden="true" />

      <header className="text-center mb-6">
        <p className="text-sm sm:text-base" style={{ color: PEN }}>
          Quarter 2 · Lesson {lesson} · my summary notes ✏️
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: TITLE }}>
          <Ink text={`==${sheet.title}==`} />
        </h2>
        <p className="mt-3 text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: PEN }}>
          Big idea: {sheet.bigIdea}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
        {sheet.boxes.map((b, i) => (
          <section
            key={b.title}
            className="relative p-4 sm:p-5"
            style={{
              background: TINTS[b.tint],
              border: `2.5px solid ${INK}`,
              borderRadius: i % 2 ? '15px 225px 15px 255px / 255px 15px 225px 15px' : '255px 15px 225px 15px / 15px 225px 15px 255px',
              transform: `rotate(${[-0.8, 0.6, 0.4, -0.5, 0.7, -0.6][i % 6]}deg)`,
              boxShadow: '3px 4px 0 rgba(30,41,59,0.18)',
            }}
          >
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold leading-none mb-2" style={{ fontFamily: TITLE }}>
                  {i + 1}. {b.title}
                </h3>
                <ul className="space-y-1 text-base sm:text-lg leading-snug">
                  {b.lines.map((l) => (
                    <li key={l} className="flex gap-2">
                      <span aria-hidden="true" style={{ color: PEN }}>
                        ➜
                      </span>
                      <span>
                        <Ink text={l} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <svg viewBox="0 0 80 60" className="w-24 sm:w-32 shrink-0" style={{ filter: 'url(#q2-wobble)' }} aria-hidden="true">
                <g fill="none">{DOODLES[b.doodle]}</g>
              </svg>
            </div>
          </section>
        ))}
      </div>

      <p
        className="mt-8 mx-auto max-w-3xl text-center text-xl sm:text-2xl font-bold px-4 py-3"
        style={{ fontFamily: TITLE, border: '3px dashed #dc2626', borderRadius: '20px 6px 22px 8px', color: '#b91c1c', background: '#fff7f7' }}
      >
        ★ Remember: {sheet.remember} ★
      </p>
    </article>
  );
};
