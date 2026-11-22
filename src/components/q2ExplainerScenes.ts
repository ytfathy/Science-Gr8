/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Quarter 2 narrated 3D explainer scenes (three.js). Each scene builds its objects into `root`
 * and returns an update(t) function, where t = seconds since the scene started.
 */

import * as THREE from 'three';

export type LessonId = 1 | 2 | 3;
export interface ExplainerScene {
  title: string;
  narration: string;
  build: (root: THREE.Group) => (t: number) => void;
}

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const END = 1e9;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** Smooth 0→1 progress between seconds a and b. */
const prog = (t: number, a: number, b: number) => {
  const x = clamp01((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
/** Reflects x back and forth inside [-h, h] (stateless bouncing). */
export const bounce = (x: number, h: number) => {
  const m = (((x + h) % (4 * h)) + 4 * h) % (4 * h);
  return m < 2 * h ? m - h : 3 * h - m;
};
const seeded = (seed: number) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// Shared geometries/materials survive scene changes; everything else is disposed.
const shared = new Set<object>();
const keep = <T extends object>(o: T) => (shared.add(o), o);
const SPHERE = keep(new THREE.SphereGeometry(1, 32, 16));
const CYL = keep(new THREE.CylinderGeometry(0.08, 0.08, 1, 12));
const BOND_MAT = keep(new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.4 }));
const matCache = new Map<number, THREE.MeshStandardMaterial>();
const mat = (color: number) => {
  let m = matCache.get(color);
  if (!m) matCache.set(color, (m = keep(new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.05 }))));
  return m;
};

export function disposeTree(o: THREE.Object3D) {
  o.traverse((c) => {
    const any = c as THREE.Mesh;
    if (any.geometry && !shared.has(any.geometry)) any.geometry.dispose();
    const ms = Array.isArray(any.material) ? any.material : any.material ? [any.material] : [];
    ms.forEach((m) => {
      if (shared.has(m)) return;
      (m as THREE.SpriteMaterial).map?.dispose();
      m.dispose();
    });
  });
  o.clear();
}

const EL = {
  H: { c: 0xf8fafc, r: 0.26 },
  O: { c: 0xef4444, r: 0.4 },
  C: { c: 0x64748b, r: 0.42 },
  N: { c: 0x3b82f6, r: 0.4 },
  Na: { c: 0xa855f7, r: 0.46 },
} as const;
type El = keyof typeof EL;

const ball = (color: number, r: number, pos = V(), material?: THREE.Material) => {
  const m = new THREE.Mesh(SPHERE, material ?? mat(color));
  m.scale.setScalar(r);
  m.position.copy(pos);
  return m;
};
const atom = (el: El, pos = V()) => ball(EL[el].c, EL[el].r, pos);
const glass = (opacity = 0.15, color = 0xe0f2fe) =>
  new THREE.MeshStandardMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false });

const UP = V(0, 1, 0);
function placeBond(b: THREE.Object3D, a: THREE.Vector3, c: THREE.Vector3) {
  const d = c.clone().sub(a);
  const len = d.length();
  b.position.copy(a).addScaledVector(d, 0.5);
  b.scale.set(1, Math.max(len, 1e-4), 1);
  if (len > 1e-6) b.quaternion.setFromUnitVectors(UP, d.divideScalar(len));
}

function label(text: string, h = 0.42, color = '#f8fafc', pos = V()) {
  if (typeof document === 'undefined') {
    const s = new THREE.Sprite();
    s.position.copy(pos);
    return s;
  }
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d')!;
  const font = 'bold 64px "Segoe UI", system-ui, sans-serif';
  ctx.font = font;
  cv.width = Math.ceil(ctx.measureText(text).width) + 40;
  cv.height = 96;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.85)';
  ctx.shadowBlur = 10;
  ctx.fillText(text, cv.width / 2, 50);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.scale.set((h * cv.width) / 96, h, 1);
  s.position.copy(pos);
  s.renderOrder = 10;
  return s;
}
const setOpacity = (o: THREE.Object3D, a: number) => {
  o.visible = a > 0.01;
  const m = (o as THREE.Mesh).material as THREE.Material | undefined;
  if (m && !shared.has(m)) {
    m.transparent = true;
    m.opacity = a;
  }
};
/** Timed captions: [startSec, endSec, text, color?]. */
function captions(root: THREE.Group, pos: THREE.Vector3, items: [number, number, string, string?][], h = 0.4) {
  const sprites = items.map(([, , text, color]) => root.add(label(text, h, color, pos)).children.at(-1)!);
  return (t: number) => items.forEach(([a, b], i) => setOpacity(sprites[i], Math.min(prog(t, a, a + 0.5), 1 - prog(t, b - 0.5, b))));
}

// Molecule templates: element + offset. Bonds default to atom 0 → every other atom.
const MOL: Record<string, [El, number, number, number][]> = {
  H2: [['H', -0.37, 0, 0], ['H', 0.37, 0, 0]],
  O2: [['O', -0.5, 0, 0], ['O', 0.5, 0, 0]],
  N2: [['N', -0.45, 0, 0], ['N', 0.45, 0, 0]],
  H2O: [['O', 0, 0, 0], ['H', -0.62, -0.45, 0], ['H', 0.62, -0.45, 0]],
  CO2: [['C', 0, 0, 0], ['O', -0.95, 0, 0], ['O', 0.95, 0, 0]],
  CH4: [['C', 0, 0, 0], ['H', 0.55, 0.55, 0.55], ['H', -0.55, -0.55, 0.55], ['H', -0.55, 0.55, -0.55], ['H', 0.55, -0.55, -0.55]],
  H2O2: [['O', -0.55, 0, 0], ['O', 0.55, 0, 0], ['H', -0.95, 0.55, 0.2], ['H', 0.95, 0.55, -0.2]],
};
const BONDS: Record<string, [number, number][]> = { H2O2: [[0, 1], [0, 2], [1, 3]] };
const bondsOf = (name: string) => BONDS[name] ?? MOL[name].slice(1).map((_, i) => [0, i + 1] as [number, number]);

function mol(name: string, pos = V()) {
  const g = new THREE.Group();
  const atoms = MOL[name].map(([el, x, y, z]) => g.add(atom(el, V(x, y, z))).children.at(-1)!);
  bondsOf(name).forEach(([i, j]) => {
    const b = new THREE.Mesh(CYL, BOND_MAT);
    placeBond(b, atoms[i].position, atoms[j].position);
    g.add(b);
  });
  g.position.copy(pos);
  return g;
}

/**
 * Animates a reaction: reactant bonds fade (~3 s), atoms move to product spots (3.6–6.6 s), product bonds form.
 * Throws if the equation is not balanced (an atom has no partner on the other side).
 */
export function reaction(root: THREE.Group, reactants: [string, THREE.Vector3][], products: [string, THREE.Vector3][]) {
  const expand = (list: [string, THREE.Vector3][]) => {
    const atoms: { el: El; p: THREE.Vector3 }[] = [];
    const bonds: [number, number][] = [];
    for (const [name, c] of list) {
      const base = atoms.length;
      MOL[name].forEach(([el, x, y, z]) => atoms.push({ el, p: V(x, y, z).add(c) }));
      bondsOf(name).forEach(([i, j]) => bonds.push([base + i, base + j]));
    }
    return { atoms, bonds };
  };
  const R = expand(reactants), P = expand(products);
  if (R.atoms.length !== P.atoms.length) throw new Error('Unbalanced reaction: atom counts differ');
  const used = new Set<number>();
  const map: number[] = [];
  const atoms = R.atoms.map((a, ri) => {
    const pi = P.atoms.findIndex((b, k) => !used.has(k) && b.el === a.el);
    if (pi < 0) throw new Error(`Unbalanced reaction: extra ${a.el}`);
    used.add(pi);
    map[pi] = ri;
    return { from: a.p, to: P.atoms[pi].p, mesh: root.add(atom(a.el, a.p)).children.at(-1)! };
  });
  const mkBonds = (pairs: [number, number][]) =>
    pairs.map(([i, j]) => ({ i, j, b: root.add(new THREE.Mesh(CYL, new THREE.MeshStandardMaterial({ color: 0xcbd5e1, transparent: true }))).children.at(-1)! }));
  const before = mkBonds(R.bonds), after = mkBonds(P.bonds.map(([i, j]) => [map[i], map[j]] as [number, number]));
  const flash = new THREE.PointLight(0xfff1a8, 0, 14);
  root.add(flash);
  return (t: number) => {
    const k = prog(t, 3.6, 6.6);
    atoms.forEach((a, n) => {
      a.mesh.position.lerpVectors(a.from, a.to, k);
      a.mesh.position.y += Math.sin(t * 3 + n) * 0.04 * (1 - prog(t, 2.6, 3.6)) * (k === 0 ? 1 : 0);
    });
    const draw = (list: typeof before, o: number) =>
      list.forEach(({ i, j, b }) => {
        setOpacity(b, o);
        placeBond(b, atoms[i].mesh.position, atoms[j].mesh.position);
      });
    draw(before, 1 - prog(t, 2.6, 3.4));
    draw(after, prog(t, 6.3, 7.2));
    flash.intensity = 60 * Math.max(0, 1 - Math.abs(t - 3.1) / 0.6);
  };
}

function wireBox(root: THREE.Group, pos: THREE.Vector3, size: number, color: number) {
  const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)), new THREE.LineBasicMaterial({ color }));
  box.position.copy(pos);
  root.add(box);
}

/** Particles bouncing in a cube; returns update(t) and the particle meshes. */
function particleBox(root: THREE.Group, pos: THREE.Vector3, n: number, speed: number, color: number, seed: number, half = 1.4) {
  const r = seeded(seed);
  wireBox(root, pos, half * 2 + 0.3, 0x475569);
  const ps = Array.from({ length: n }, () => ({
    p0: V(r() * 4 - 2, r() * 4 - 2, r() * 4 - 2),
    v: V(r() - 0.5, r() - 0.5, r() - 0.5).normalize().multiplyScalar(speed),
    m: root.add(ball(color, 0.16, pos, new THREE.MeshStandardMaterial({ color, emissive: 0xffffff, emissiveIntensity: 0 }))).children.at(-1) as THREE.Mesh,
  }));
  const update = (t: number) =>
    ps.forEach(({ p0, v, m }) => m.position.set(pos.x + bounce(p0.x + v.x * t, half), pos.y + bounce(p0.y + v.y * t, half), pos.z + bounce(p0.z + v.z * t, half)));
  return { update, meshes: ps.map((p) => p.m) };
}

function thermometer(root: THREE.Group, pos: THREE.Vector3, color: number) {
  const g = new THREE.Group();
  g.position.copy(pos);
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.6, 20, 1, true), glass(0.3, 0xe2e8f0));
  tube.position.y = 1.3;
  const fillGeo = new THREE.CylinderGeometry(0.11, 0.11, 1, 16);
  fillGeo.translate(0, 0.5, 0);
  const fill = new THREE.Mesh(fillGeo, mat(color));
  g.add(tube, ball(color, 0.3), fill);
  root.add(g);
  return (level: number) => (fill.scale.y = Math.max(0.02, level * 2.5));
}

function legend(root: THREE.Group, els: El[], y: number) {
  els.forEach((el, i) => {
    const x = (i - (els.length - 1) / 2) * 2;
    root.add(atom(el, V(x - 0.4, y, 0)), label(el === 'Na' ? 'Na' : el, 0.38, '#cbd5e1', V(x + 0.2, y, 0)));
  });
}

// ---------------- Lesson 1: Chemical Reactions ----------------
const lesson1: ExplainerScene[] = [
  {
    title: 'Properties identify substances',
    narration:
      'Every pure substance has characteristic properties, like density, melting point, boiling point, and solubility. Here are two samples of the same size, but with different masses. The tightly packed, denser sample sinks, while the less dense sample floats. Properties like these help us identify substances.',
    build(root) {
      const water = new THREE.Mesh(new THREE.BoxGeometry(12, 3.2, 4), glass(0.2, 0x38bdf8));
      water.position.y = -1.6;
      root.add(water);
      const cube = (n: number, gap: number, color: number, x: number) => {
        const g = new THREE.Group();
        const s = ((n - 1) * gap) / 2;
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) g.add(ball(color, 0.15, V(i * gap - s, j * gap - s, k * gap - s)));
        g.position.set(x, 1.4, 0);
        root.add(g);
        return g;
      };
      const light = cube(3, 0.5, 0xfbbf24, -3), dense = cube(5, 0.25, 0x94a3b8, 3);
      root.add(label('Same size · different mass', 0.38, '#94a3b8', V(0, 3.3, 0)));
      const cap = captions(root, V(0, -3.6, 0), [[4, END, 'Less dense → floats      More dense → sinks', '#fde68a']]);
      return (t) => {
        light.position.y = 1.4 - prog(t, 1, 3) * 1.2 + Math.sin(t * 2) * 0.05 * prog(t, 2.5, 3.5);
        dense.position.y = 1.4 - prog(t, 1, 4.5) * 3.9;
        light.rotation.y = dense.rotation.y = t * 0.3;
        cap(t);
      };
    },
  },
  {
    title: 'Physical change: same substance',
    narration:
      'In a physical change, the substance stays the same. When ice melts, water molecules break free from their rigid pattern and begin to move around, but every molecule is still H two O. Melting, freezing, boiling, dissolving, and cutting are all physical changes.',
    build(root) {
      const r = seeded(11);
      const ms = [] as { g: THREE.Group; ice: THREE.Vector3; liq: THREE.Vector3; spin: THREE.Vector3 }[];
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          for (let k = 0; k < 2; k++) {
            const ice = V((i - 1) * 1.5, (j - 1) * 1.4 + 0.3, (k - 0.5) * 1.5);
            const g = mol('H2O', ice);
            root.add(g);
            ms.push({ g, ice, liq: V(r() * 9 - 4.5, r() * 2.6 - 1.6, r() * 3 - 1.5), spin: V(r(), r(), r()) });
          }
      const cap = captions(root, V(0, 3.2, 0), [
        [0, 4.5, 'Ice: molecules locked in a pattern', '#bae6fd'],
        [5, END, 'Liquid water: molecules move freely', '#7dd3fc'],
      ]);
      const sub = captions(root, V(0, -3.3, 0), [[8, END, 'Still H₂O → physical change', '#fde68a']]);
      return (t) => {
        const k = prog(t, 4, 8);
        ms.forEach(({ g, ice, liq, spin }, n) => {
          g.position.lerpVectors(ice, liq, k);
          g.position.x += Math.sin(t * (6 - 5 * k) + n) * (0.05 + 0.25 * k);
          g.position.y += Math.cos(t * (5 - 4 * k) + n * 2) * (0.04 + 0.2 * k);
          g.rotation.set(spin.x * t * k, spin.y * t * k + Math.sin(t * 8 + n) * 0.08, spin.z * t * k);
        });
        cap(t);
        sub(t);
      };
    },
  },
  {
    title: 'Chemical change: atoms rearrange',
    narration:
      'In a chemical change, atoms rearrange to form new substances. Here, hydrogen and oxygen molecules collide. Their bonds break, and the same atoms join together in a new way, making water. No atoms are created or destroyed. They are only rearranged.',
    build(root) {
      const rx = reaction(root, [['H2', V(-4.2, 1.1, 0)], ['H2', V(-4.2, -1.1, 0)], ['O2', V(-2, 0, 0)]], [['H2O', V(2.2, 1.1, 0)], ['H2O', V(2.2, -1.1, 0)]]);
      root.add(label('2H₂  +  O₂   →   2H₂O', 0.55, '#f8fafc', V(0, -3, 0)));
      const cap = captions(root, V(0, 3, 0), [
        [0, 2.8, 'Reactants: hydrogen + oxygen', '#c4b5fd'],
        [2.8, 6.4, 'Bonds break… atoms rearrange…', '#fde68a'],
        [6.4, END, 'New bonds form: water (a new substance)', '#86efac'],
      ]);
      return (t) => {
        rx(t);
        cap(t);
      };
    },
  },
  {
    title: 'Evidence of a chemical reaction',
    narration:
      'How can we tell a chemical reaction happened? Look for evidence: gas bubbles forming, an unexpected color change, a temperature change or light given off, or a solid precipitate appearing when two liquids are mixed. These signs suggest that new substances have formed.',
    build(root) {
      const beaker = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 3.2, 40, 1, true), glass(0.18));
      beaker.position.set(1.5, 0, 0);
      const liquidMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 });
      const liquid = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 2.3, 40), liquidMat);
      liquid.position.set(1.5, -0.45, 0);
      root.add(beaker, liquid);
      const r = seeded(5);
      const bubbles = Array.from({ length: 16 }, () => ({ x: 1.5 + (r() - 0.5) * 2.2, z: (r() - 0.5) * 2, o: r(), m: root.add(ball(0xffffff, 0.09, V(), glass(0.7, 0xffffff))).children.at(-1)! }));
      const grains = Array.from({ length: 26 }, () => ({ x: 1.5 + (r() - 0.5) * 2.2, z: (r() - 0.5) * 2, h: 0.6 + r() * 1.2, d: r() * 1.5, m: root.add(ball(0xfde047, 0.1)).children.at(-1)! }));
      const glow = new THREE.PointLight(0xfb923c, 0, 10);
      glow.position.set(1.5, 0, 1.5);
      root.add(glow);
      const blue = new THREE.Color(0x38bdf8), pink = new THREE.Color(0xec4899);
      const list = captions(root, V(-3.4, 1.6, 0), [[0.5, END, '1. Gas bubbles', '#e2e8f0']], 0.42);
      const l2 = captions(root, V(-3.4, 0.7, 0), [[3.5, END, '2. Color change', '#f9a8d4']], 0.42);
      const l3 = captions(root, V(-3.4, -0.2, 0), [[6.5, END, '3. Solid precipitate', '#fde047']], 0.42);
      const l4 = captions(root, V(-3.4, -1.1, 0), [[9.5, END, '4. Temperature / light', '#fdba74']], 0.42);
      return (t) => {
        bubbles.forEach((b) => b.m.position.set(b.x, -1.5 + ((t * 0.7 + b.o) % 1) * 2.2, b.z));
        liquidMat.color.lerpColors(blue, pink, prog(t, 3.5, 6));
        grains.forEach((g) => {
          g.m.visible = t > 6.5;
          g.m.position.set(g.x, -1.5 + g.d * 0.12 + g.h * (1 - prog(t, 6.5 + g.d, 8 + g.d)), g.z);
        });
        glow.intensity = t > 9.5 ? 18 + Math.sin(t * 6) * 8 : 0;
        list(t), l2(t), l3(t), l4(t);
      };
    },
  },
  {
    title: 'Reactions at work: the airbag',
    narration:
      'Chemical reactions can save lives. In a car airbag, a crash sensor triggers sodium azide to decompose. The reaction rapidly produces nitrogen gas, which inflates the bag in less than fifty milliseconds, cushioning the passengers.',
    build(root) {
      const pellet = new THREE.Group();
      const r = seeded(3);
      for (let i = 0; i < 14; i++) pellet.add(atom(i % 3 ? 'N' : 'Na', V((r() - 0.5) * 0.9, (r() - 0.5) * 0.9, (r() - 0.5) * 0.9)));
      root.add(pellet);
      const bag = new THREE.Mesh(SPHERE, glass(0.18, 0xf8fafc));
      root.add(bag);
      const gas = Array.from({ length: 14 }, () => ({ to: V(r() - 0.5, r() - 0.5, r() - 0.5).normalize().multiplyScalar(0.8 + r() * 1.6), g: root.add(mol('N2')).children.at(-1)!, s: V(r(), r(), r()) }));
      const flash = new THREE.PointLight(0xfff7ae, 0, 14);
      root.add(flash);
      root.add(label('2NaN₃  →  2Na  +  3N₂', 0.5, '#f8fafc', V(0, -3.1, 0)));
      const cap = captions(root, V(0, 3.2, 0), [
        [0, 3, 'Crash sensor triggers sodium azide', '#c4b5fd'],
        [3.4, END, 'N₂ gas fills the bag in < 50 ms', '#86efac'],
      ]);
      return (t) => {
        const k = prog(t, 3, 3.4);
        bag.scale.setScalar(0.01 + k * 2.7);
        bag.visible = k > 0;
        pellet.scale.setScalar(1 - 0.6 * k);
        pellet.rotation.y = t * 0.6;
        gas.forEach(({ to, g, s }, n) => {
          g.visible = k > 0;
          g.position.copy(to).multiplyScalar(k).add(V(Math.sin(t * 4 + n) * 0.08 * k, Math.cos(t * 3 + n) * 0.08 * k, 0));
          g.rotation.set(s.x * t * 2, s.y * t * 2, s.z * t);
        });
        flash.intensity = 80 * Math.max(0, 1 - Math.abs(t - 3.1) / 0.4);
        cap(t);
      };
    },
  },
];

// ---------------- Lesson 2: Chemical Equations ----------------
const lesson2: ExplainerScene[] = [
  {
    title: 'Formulas and subscripts',
    narration:
      'A chemical formula tells us which elements are in a substance and how many atoms of each. In H two O, the subscript two means two hydrogen atoms bonded to one oxygen atom. In C O two, one carbon atom is bonded to two oxygen atoms.',
    build(root) {
      const w = mol('H2O', V(-3, 0.6, 0)), c = mol('CO2', V(3, 0.6, 0));
      root.add(w, c);
      root.add(label('H₂O', 0.7, '#f8fafc', V(-3, 2.3, 0)), label('CO₂', 0.7, '#f8fafc', V(3, 2.3, 0)));
      const cap = captions(root, V(-3, -1.2, 0), [[2, END, '2 H  +  1 O', '#fde68a']]);
      const cap2 = captions(root, V(3, -1.2, 0), [[5, END, '1 C  +  2 O', '#fde68a']]);
      legend(root, ['H', 'O', 'C'], -3);
      return (t) => {
        w.rotation.y = c.rotation.y = t * 0.6;
        cap(t), cap2(t);
      };
    },
  },
  {
    title: 'Coefficients vs. subscripts',
    narration:
      'A coefficient in front of a formula counts whole molecules. Two H two O means two water molecules. But changing a subscript changes the substance itself. H two O two is hydrogen peroxide, not water. So when we balance equations, we change coefficients only, never subscripts.',
    build(root) {
      const a = mol('H2O', V(-4.2, 0.4, 0)), b = mol('H2O', V(-2.4, 0.4, 0));
      const water = mol('H2O', V(3, 0.4, 0)), peroxide = mol('H2O2', V(3, 0.4, 0));
      root.add(a, b, water, peroxide);
      root.add(label('2H₂O = two water molecules', 0.42, '#86efac', V(-3.3, 2.2, 0)));
      const cap = captions(root, V(3, 2.2, 0), [
        [0, 5, 'H₂O (water)', '#7dd3fc'],
        [5.5, END, 'H₂O₂ = hydrogen peroxide!', '#fca5a5'],
      ]);
      const sub = captions(root, V(0, -2.6, 0), [[8, END, 'Balance with coefficients, never subscripts', '#fde68a']]);
      return (t) => {
        const k = prog(t, 4.5, 6);
        a.rotation.y = b.rotation.y = water.rotation.y = peroxide.rotation.y = t * 0.6;
        water.scale.setScalar(Math.max(0.001, 1 - k));
        peroxide.scale.setScalar(Math.max(0.001, k));
        cap(t), sub(t);
      };
    },
  },
  {
    title: 'Balancing methane combustion',
    narration:
      'Let’s balance the burning of methane. One methane molecule reacts with two oxygen molecules. The atoms rearrange into one carbon dioxide molecule and two water molecules. C H four plus two O two yields C O two plus two H two O.',
    build(root) {
      const rx = reaction(
        root,
        [['CH4', V(-4.4, 0, 0)], ['O2', V(-2, 1.3, 0)], ['O2', V(-2, -1.3, 0)]],
        [['CO2', V(2.6, 1.3, 0)], ['H2O', V(1.8, -1.2, 0)], ['H2O', V(3.8, -1.2, 0)]],
      );
      root.add(label('CH₄  +  2O₂   →   CO₂  +  2H₂O', 0.52, '#f8fafc', V(0, -3, 0)));
      const cap = captions(root, V(0, 3, 0), [
        [0, 3, 'Reactants: methane + oxygen', '#c4b5fd'],
        [3, 6.4, 'Atoms rearrange', '#fde68a'],
        [6.4, END, 'Products: carbon dioxide + water', '#86efac'],
      ]);
      return (t) => {
        rx(t);
        cap(t);
      };
    },
  },
  {
    title: 'Counting atoms: conservation',
    narration:
      'Now count the atoms on each side. The reactants have one carbon, four hydrogen, and four oxygen atoms. The products have exactly the same. A balanced equation shows the law of conservation of matter: atoms are rearranged, never created or destroyed, so mass is conserved.',
    build(root) {
      const cols: [El, number][] = [['C', 1], ['H', 4], ['O', 4]];
      const drops: { m: THREE.Object3D; y: number; at: number }[] = [];
      [-1, 1].forEach((side) =>
        cols.forEach(([el, n], c) => {
          const x = side * 3.4 + (c - 1) * 1.1;
          for (let i = 0; i < n; i++) drops.push({ m: root.add(atom(el)).children.at(-1)!, y: -1.6 + i * 0.85, at: 0.5 + c * 1.2 + i * 0.25 + (side > 0 ? 0.3 : 0) });
          drops.slice(-n).forEach((d) => (d.m.position.x = x));
          root.add(label(`${el} ${n}`, 0.4, '#cbd5e1', V(x, -2.5, 0)));
        }),
      );
      root.add(label('Reactants', 0.5, '#c4b5fd', V(-3.4, 2.6, 0)), label('Products', 0.5, '#86efac', V(3.4, 2.6, 0)), label('=', 0.9, '#f8fafc', V(0, 0, 0)));
      const cap = captions(root, V(0, -3.4, 0), [[6, END, 'Same atoms in = same atoms out → mass conserved', '#fde68a']]);
      return (t) => {
        drops.forEach((d) => {
          d.m.position.y = d.y + 5 * (1 - prog(t, d.at, d.at + 0.6));
          d.m.visible = t > d.at;
        });
        cap(t);
      };
    },
  },
  {
    title: 'Closed vs. open systems',
    narration:
      'In a closed system, no matter can enter or leave, so the total mass stays the same. In an open system, gas can escape into the air, so the measured mass seems to decrease. But the atoms still exist. They simply left the container.',
    build(root) {
      const flask = (x: number, closed: boolean) => {
        const f = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 2.4, 32, 1, true), glass(0.2));
        f.position.set(x, 0.3, 0);
        const scale = new THREE.Mesh(new THREE.BoxGeometry(3, 0.4, 2), mat(0x334155));
        scale.position.set(x, -1.1, 0);
        root.add(f, scale);
        if (closed) {
          const lid = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.15, 32), mat(0x94a3b8));
          lid.position.set(x, 1.55, 0);
          root.add(lid);
        }
      };
      flask(-3, true);
      flask(3, false);
      const r = seeded(9);
      const gas = (x: number, open: boolean) =>
        Array.from({ length: 12 }, (_, i) => ({ x, open, i, p0: V(r() * 4, r() * 4, r() * 4), v: V(r() - 0.5, r() - 0.5, r() - 0.5).multiplyScalar(2.2), m: root.add(mol('CO2')).children.at(-1)! }));
      const all = [...gas(-3, false), ...gas(3, true)];
      all.forEach((g) => g.m.scale.setScalar(0.35));
      root.add(label('Closed system', 0.46, '#86efac', V(-3, 2.6, 0)), label('Open system', 0.46, '#fca5a5', V(3, 2.6, 0)));
      root.add(label('120.0 g', 0.42, '#86efac', V(-3, -1.8, 0)));
      const readout = captions(root, V(3, -1.8, 0), [
        [0, 4, '120.0 g', '#fca5a5'],
        [4, 7, '119.3 g', '#fca5a5'],
        [7, END, '118.6 g', '#fca5a5'],
      ], 0.42);
      return (t) => {
        all.forEach(({ x, open, i, p0, v, m }) => {
          const esc = open && i % 2 === 0 ? prog(t, 3 + i * 0.4, 6 + i * 0.4) : 0;
          m.position.set(x + bounce(p0.x + v.x * t, 0.8) + esc * (i - 6) * 0.3, 0.3 + bounce(p0.y + v.y * t, 1) + esc * 3.5, bounce(p0.z + v.z * t, 0.8));
          m.visible = esc < 0.98;
          m.rotation.y = t + i;
        });
        readout(t);
      };
    },
  },
];

// ---------------- Lesson 3: Thermal Energy ----------------
const lesson3: ExplainerScene[] = [
  {
    title: 'Temperature is particle motion',
    narration:
      'Temperature measures the average kinetic energy of particles. In a cold substance, particles move slowly. In a hot substance, they move much faster. Thermal energy is the total kinetic energy of all those moving particles.',
    build(root) {
      const cold = particleBox(root, V(-3, 0.3, 0), 16, 0.5, 0x60a5fa, 1);
      const hot = particleBox(root, V(3, 0.3, 0), 16, 2.6, 0xf87171, 2);
      root.add(label('Cold: slow particles', 0.42, '#93c5fd', V(-3, 2.6, 0)), label('Hot: fast particles', 0.42, '#fca5a5', V(3, 2.6, 0)));
      const cap = captions(root, V(0, -2.4, 0), [[5, END, 'Faster particles = higher temperature', '#fde68a']]);
      return (t) => {
        cold.update(t), hot.update(t), cap(t);
      };
    },
  },
  {
    title: 'Conduction, convection, radiation',
    narration:
      'Thermal energy always moves from hotter objects to colder ones. Conduction passes energy through direct contact between particles. Convection carries energy in moving currents of liquids and gases. Radiation transfers energy as waves, even through empty space.',
    build(root) {
      // Conduction: a rod of particles heated from the left end.
      const rod = Array.from({ length: 8 }, (_, i) => root.add(ball(0x60a5fa, 0.17, V(-6 + i * 0.4, 0, 0), new THREE.MeshStandardMaterial({ color: 0x60a5fa }))).children.at(-1) as THREE.Mesh);
      const flame = new THREE.PointLight(0xf97316, 12, 3);
      flame.position.set(-6.4, -0.4, 0.4);
      root.add(flame, ball(0xf97316, 0.25, V(-6.4, -0.5, 0)));
      // Convection: particles looping, warm side rises.
      const loop = Array.from({ length: 12 }, () => root.add(ball(0x60a5fa, 0.15, V(), new THREE.MeshStandardMaterial({ color: 0x60a5fa }))).children.at(-1) as THREE.Mesh);
      root.add(ball(0xf97316, 0.25, V(0.9, -1.8, 0)));
      // Radiation: a wave from a sun to a target.
      root.add(ball(0xfde047, 0.6, V(2.6, 0, 0), new THREE.MeshStandardMaterial({ color: 0xfde047, emissive: 0xfbbf24, emissiveIntensity: 1 })));
      const targetMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa });
      const target = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), targetMat);
      target.position.set(6, 0, 0);
      const pts = Array.from({ length: 60 }, () => V());
      const wave = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xfde047 }));
      root.add(target, wave);
      root.add(label('Conduction', 0.42, '#f8fafc', V(-4.6, 2.3, 0)), label('Convection', 0.42, '#f8fafc', V(0, 2.3, 0)), label('Radiation', 0.42, '#f8fafc', V(4.3, 2.3, 0)));
      const cap = captions(root, V(0, -3.1, 0), [[1, END, 'Energy flows from hot → cold', '#fde68a']]);
      const blue = new THREE.Color(0x60a5fa), red = new THREE.Color(0xf87171), c = new THREE.Color();
      return (t) => {
        rod.forEach((m, i) => {
          const heat = prog(t, i * 0.7, i * 0.7 + 1.5);
          m.position.y = Math.sin(t * 20 + i) * 0.03 + Math.sin(t * 20 + i) * 0.1 * heat;
          (m.material as THREE.MeshStandardMaterial).color.copy(c.lerpColors(blue, red, heat));
        });
        loop.forEach((m, i) => {
          const a = (t * 0.35 + i / loop.length) * Math.PI * 2;
          m.position.set(Math.cos(a) * 1.1, Math.sin(a) * 1.4, 0);
          (m.material as THREE.MeshStandardMaterial).color.copy(c.lerpColors(blue, red, (Math.cos(a) + 1) / 2));
        });
        const arr = wave.geometry.attributes.position as THREE.BufferAttribute;
        pts.forEach((_, i) => {
          const x = 3.3 + (i / 59) * 2.3;
          arr.setXYZ(i, x, Math.sin(x * 6 - t * 8) * 0.22, 0);
        });
        arr.needsUpdate = true;
        targetMat.color.lerpColors(blue, red, prog(t, 1, 8));
        cap(t);
      };
    },
  },
  {
    title: 'Exothermic vs. endothermic',
    narration:
      'Exothermic reactions release thermal energy, so the surroundings get warmer, like a hand warmer or rusting iron. Endothermic reactions absorb thermal energy from the surroundings, so they get colder, like an ammonium chloride cold pack.',
    build(root) {
      const cone = new THREE.ConeGeometry(0.15, 0.45, 12);
      const side = (x: number, color: number, out: boolean) => {
        const core = new THREE.Group();
        const r = seeded(out ? 4 : 8);
        for (let i = 0; i < 10; i++) core.add(ball(color, 0.22, V((r() - 0.5) * 0.9, (r() - 0.5) * 0.9, (r() - 0.5) * 0.9)));
        core.position.set(x, 0.3, 0);
        root.add(core);
        const arrows = Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const m = new THREE.Mesh(cone, mat(color));
          m.rotation.z = a - Math.PI / 2 + (out ? 0 : Math.PI);
          root.add(m);
          return { a, m };
        });
        return { core, arrows };
      };
      const exo = side(-3.2, 0xfb923c, true), endo = side(3.2, 0x38bdf8, false);
      const tExo = thermometer(root, V(-0.9, -1.6, 0), 0xef4444), tEndo = thermometer(root, V(5.6, -1.6, 0), 0x3b82f6);
      root.add(label('Exothermic: releases energy', 0.4, '#fdba74', V(-3.2, 2.6, 0)), label('Endothermic: absorbs energy', 0.4, '#7dd3fc', V(3.2, 2.6, 0)));
      root.add(label('hand warmer · rusting iron', 0.32, '#cbd5e1', V(-3.2, -2.3, 0)), label('NH₄Cl cold pack', 0.32, '#cbd5e1', V(3.2, -2.3, 0)));
      return (t) => {
        [exo, endo].forEach(({ core, arrows }, s) => {
          core.rotation.y = t * 0.5;
          arrows.forEach(({ a, m }, i) => {
            const f = (t * 0.6 + i * 0.13) % 1;
            const d = s === 0 ? 0.8 + f * 1.3 : 2.1 - f * 1.3;
            m.position.set(core.position.x + Math.cos(a) * d, core.position.y + Math.sin(a) * d, 0);
          });
        });
        tExo(0.3 + 0.6 * prog(t, 1, 9));
        tEndo(0.9 - 0.6 * prog(t, 1, 9));
      };
    },
  },
  {
    title: 'What changes reaction rate?',
    narration:
      'Reaction rate depends on how often particles collide with enough energy. Raising the temperature makes particles move faster and collide more often. Increasing surface area or concentration also speeds things up. A faster rate releases the same total energy, just more quickly.',
    build(root) {
      const cold = particleBox(root, V(-3, 0.3, 0), 14, 0.6, 0x60a5fa, 21);
      const hot = particleBox(root, V(3, 0.3, 0), 14, 2.8, 0xf87171, 22);
      root.add(label('Low temperature: few collisions', 0.38, '#93c5fd', V(-3, 2.6, 0)), label('High temperature: many collisions', 0.38, '#fca5a5', V(3, 2.6, 0)));
      const cap = captions(root, V(0, -2.5, 0), [
        [3, 9, 'More collisions per second → faster reaction', '#fde68a'],
        [9, END, 'Also faster: more surface area, higher concentration', '#fde68a'],
      ]);
      const glowNear = (ms: THREE.Mesh[]) =>
        ms.forEach((m) => {
          const near = ms.some((o) => o !== m && o.position.distanceToSquared(m.position) < 0.16);
          (m.material as THREE.MeshStandardMaterial).emissiveIntensity = near ? 1.2 : 0;
        });
      return (t) => {
        cold.update(t), hot.update(t);
        glowNear(cold.meshes), glowNear(hot.meshes);
        cap(t);
      };
    },
  },
  {
    title: 'Engineering: saving sea turtle eggs',
    narration:
      'Engineers use these ideas to solve real problems. Sea turtle eggs must stay between twenty seven and thirty three degrees Celsius. A mixture of iron powder, salt, and water releases steady, safe warmth for up to ninety minutes. Choosing the right reaction controls how much energy is transferred, and for how long.',
    build(root) {
      const sand = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 40, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0xd6b98c, side: THREE.DoubleSide }),
      );
      sand.position.set(-1.5, 0, 0);
      const surface = new THREE.Mesh(new THREE.CircleGeometry(2.2, 40), mat(0xe7cf9f));
      surface.rotation.x = -Math.PI / 2;
      surface.position.set(-1.5, 0, 0);
      root.add(sand, surface);
      const eggs = [[-2.1, 0], [-1.1, 0.1], [-1.6, 0.8], [-2.4, 0.9], [-0.8, 0.9], [-1.6, -0.7]].map(([x, z]) => {
        const e = ball(0xfefce8, 0.38, V(x, 0.4, z));
        e.scale.set(0.36, 0.44, 0.36);
        return root.add(e).children.at(-1)!;
      });
      const pack = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 1.2), mat(0x475569));
      pack.position.set(2, 0.25, 0);
      root.add(pack, label('Fe + salt + water', 0.32, '#e2e8f0', V(2, 0.9, 0)));
      const heat = Array.from({ length: 10 }, (_, i) => ({ i, m: root.add(ball(0xfb923c, 0.08)).children.at(-1)! }));
      const temp = thermometer(root, V(4.6, -1.8, 0), 0xef4444);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.6, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
      band.position.set(4.6, -1.8 + 1.5 + 0.3, 0);
      root.add(band, label('27–33 °C', 0.32, '#86efac', V(5.6, 0, 0)));
      root.add(label('Goal: eggs at 27–33 °C for 30+ min', 0.42, '#f8fafc', V(0, 2.6, 0)));
      const reading = captions(root, V(4.6, -2.5, 0), [
        [0, 3, '20 °C', '#93c5fd'],
        [3, 6, '25 °C', '#fde68a'],
        [6, END, '30 °C ✓', '#86efac'],
      ], 0.36);
      return (t) => {
        heat.forEach(({ i, m }) => {
          const f = (t * 0.5 + i / heat.length) % 1;
          m.visible = t > 0.8;
          m.position.set(1.4 - f * 2.4, 0.4 + Math.sin(f * Math.PI) * 0.8, ((i % 3) - 1) * 0.4);
        });
        eggs.forEach((e, i) => (e.rotation.z = Math.sin(t * 2 + i) * 0.05));
        temp(0.25 + 0.47 * prog(t, 0.5, 7));
        reading(t);
      };
    },
  },
];

export const Q2_EXPLAINERS: Record<LessonId, { title: string; scenes: ExplainerScene[] }> = {
  1: { title: 'Chemical Reactions: How Matter Changes', scenes: lesson1 },
  2: { title: 'Chemical Equations & Conservation of Matter', scenes: lesson2 },
  3: { title: 'Thermal Energy & Reactions', scenes: lesson3 },
};
