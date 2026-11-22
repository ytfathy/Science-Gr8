// Builds every Quarter 2 3D explainer scene headlessly and runs its animation. Run with: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { Q2_EXPLAINERS, bounce, disposeTree, reaction } from '../src/components/q2ExplainerScenes.ts';

test('every lesson has 5 narrated scenes that build and animate without errors', () => {
  for (const [lesson, { scenes }] of Object.entries(Q2_EXPLAINERS)) {
    assert.equal(scenes.length, 5, `lesson ${lesson}`);
    for (const s of scenes) {
      assert.ok(s.narration.split(/\s+/).length > 20, s.title);
      const root = new THREE.Group();
      const update = s.build(root);
      for (const t of [0, 1, 3.1, 5, 7, 12, 40]) update(t);
      root.traverse((o) => assert.ok(Number.isFinite(o.position.x + o.position.y + o.position.z), `${s.title}: NaN position`));
      disposeTree(root);
      assert.equal(root.children.length, 0);
    }
  }
});

test('reaction() refuses an unbalanced equation', () => {
  const V = (x) => new THREE.Vector3(x, 0, 0);
  assert.throws(() => reaction(new THREE.Group(), [['H2', V(0)], ['O2', V(1)]], [['H2O', V(2)]]), /Unbalanced/);
});

test('bounce() keeps particles inside the box', () => {
  for (let x = -20; x <= 20; x += 0.37) assert.ok(Math.abs(bounce(x, 1.4)) <= 1.4 + 1e-9);
  assert.equal(bounce(0.5, 1), 0.5);
  assert.equal(bounce(1.5, 1), 0.5);
});
