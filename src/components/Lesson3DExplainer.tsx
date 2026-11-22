/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Narrated 3D explainer "video" for a Quarter 2 lesson: three.js scenes + voice narration + subtitles.
 * No autoplay: starts only when the student presses Play. Drag to rotate the 3D view.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { soundFx } from '../utils/audio.js';
import { Q2_EXPLAINERS, disposeTree, type LessonId } from './q2ExplainerScenes.js';

interface Engine {
  root: THREE.Group;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  clock: { start: number; pausedAt: number | null };
  update: (t: number) => void;
}

export default function Lesson3DExplainer({ lesson }: { lesson: LessonId }) {
  const { title, scenes } = Q2_EXPLAINERS[lesson];
  const mountRef = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine | null>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [noWebGL, setNoWebGL] = useState(false);
  const scene = scenes[idx];

  // Renderer lifecycle.
  useEffect(() => {
    const el = mountRef.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      setNoWebGL(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b1120);
    renderer.domElement.className = 'block w-full h-full touch-none';
    el.appendChild(renderer.domElement);
    const world = new THREE.Scene();
    world.add(new THREE.HemisphereLight(0xffffff, 0x334155, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(4, 6, 8);
    world.add(sun);
    const camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 100);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 18;
    const root = new THREE.Group();
    world.add(root);
    const now = performance.now();
    const e: Engine = { root, camera, controls, clock: { start: now, pausedAt: now }, update: () => {} };
    engine.current = e;
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Keep the whole scene in view on narrow (phone) screens.
      camera.position.setLength(camera.aspect < 1.5 ? 10.5 * (1.6 / camera.aspect) ** 0.8 : 10.5);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      e.update(((e.clock.pausedAt ?? performance.now()) - e.clock.start) / 1000);
      controls.update();
      renderer.render(world, camera);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      disposeTree(root);
      renderer.dispose();
      renderer.domElement.remove();
      engine.current = null;
    };
  }, []);

  // Build the current scene and reset the camera.
  useEffect(() => {
    const e = engine.current;
    if (!e) return;
    disposeTree(e.root);
    e.update = scene.build(e.root);
    const aspect = e.camera.aspect;
    e.camera.position.set(0, 1.2, aspect < 1.5 ? 10.5 * (1.6 / aspect) ** 0.8 : 10.5);
    e.controls.target.set(0, 0.2, 0);
    const now = performance.now();
    e.clock.start = now;
    if (e.clock.pausedAt !== null) e.clock.pausedAt = now;
  }, [scene]);

  // Pause freezes the animation clock.
  useEffect(() => {
    const c = engine.current?.clock;
    if (!c) return;
    if (playing && c.pausedAt !== null) {
      c.start += performance.now() - c.pausedAt;
      c.pausedAt = null;
    } else if (!playing && c.pausedAt === null) c.pausedAt = performance.now();
  }, [playing]);

  // Narrate the scene, then move on once narration (or the reading time when voice is off) is done.
  useEffect(() => {
    if (!playing) return;
    const words = scene.narration.split(/\s+/).length;
    const start = performance.now();
    // Reading time is the floor even with voice on: some devices have no voices and end speech instantly.
    const minMs = (words / 2.6) * 1000;
    const maxMs = (words / 1.3) * 1000 + 5000; // speech engines sometimes never fire onend
    let spokenAt: number | null = null;
    let timer: ReturnType<typeof setTimeout>;
    soundFx.speak(scene.narration, () => (spokenAt ??= performance.now()));
    const check = () => {
      const now = performance.now();
      const done = spokenAt !== null && now - spokenAt > 1200 && now - start > minMs;
      if (!done && now - start < maxMs) return void (timer = setTimeout(check, 250));
      if (idx < scenes.length - 1) setIdx(idx + 1);
      else {
        setPlaying(false);
        setEnded(true);
      }
    };
    timer = setTimeout(check, 250);
    return () => {
      clearTimeout(timer);
      soundFx.stopSpeaking();
    };
  }, [playing, scene, idx, scenes.length]);

  const play = () => {
    soundFx.playClick();
    if (ended) {
      setEnded(false);
      setIdx(0);
    }
    setStarted(true);
    setPlaying(true);
  };
  const go = (i: number) => {
    soundFx.playClick();
    setEnded(false);
    setStarted(true);
    setIdx(Math.max(0, Math.min(scenes.length - 1, i)));
  };

  if (noWebGL) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 text-sm text-slate-300">
        <p className="font-bold text-white">{title}</p>
        <p className="text-xs text-amber-300">3D view is not supported on this device. Here is the lesson script:</p>
        {scenes.map((s, i) => (
          <p key={s.title}>
            <span className="font-semibold text-violet-300">{i + 1}. {s.title}: </span>
            {s.narration}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <div ref={mountRef} className="absolute inset-0" />

        <div className="pointer-events-none absolute top-2 left-2 right-2 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded-full bg-violet-600/80 text-white font-bold">3D Lesson</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-200 font-semibold">
            {idx + 1}/{scenes.length} · {scene.title}
          </span>
        </div>

        {(!started || ended) && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/60 text-white cursor-pointer"
          >
            <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-violet-600 shadow-lg shadow-violet-600/40">
              {ended ? <RotateCcw className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
            </span>
            <span className="text-sm sm:text-base font-extrabold">{ended ? 'Watch again' : title}</span>
            <span className="text-[11px] text-slate-300">
              {scenes.length} narrated 3D scenes · drag to rotate
            </span>
          </button>
        )}
      </div>

      {started && (
        <p className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-xs sm:text-sm leading-relaxed text-slate-100">
          {scene.narration}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => go(idx - 1)} disabled={idx === 0} aria-label="Previous scene" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 disabled:opacity-40 cursor-pointer">
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => (playing ? setPlaying(false) : play())}
          aria-label={playing ? 'Pause' : 'Play'}
          className="p-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white cursor-pointer"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button type="button" onClick={() => go(idx + 1)} disabled={idx === scenes.length - 1} aria-label="Next scene" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 disabled:opacity-40 cursor-pointer">
          <SkipForward className="w-4 h-4" />
        </button>
        {scenes.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => go(i)}
            aria-current={i === idx}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer ${
              i === idx ? 'bg-violet-600/25 border-violet-400/70 text-violet-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}
