// Sanity checks for the Quarter 2 lesson quizzes. Run with: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Q2_LEVEL_1_QUIZ, Q2_LEVEL_2_QUIZ, Q2_LEVEL_3_QUIZ } from '../src/data/chemistryData.ts';

test('every Q2 quiz question has a unique id, distinct options and a valid answer', () => {
  const all = [...Q2_LEVEL_1_QUIZ, ...Q2_LEVEL_2_QUIZ, ...Q2_LEVEL_3_QUIZ];
  assert.equal(new Set(all.map((q) => q.id)).size, all.length, 'duplicate question id');
  for (const q of all) {
    assert.ok(q.options.length >= 2, q.id);
    assert.equal(new Set(q.options).size, q.options.length, `${q.id}: duplicate option`);
    assert.ok(Number.isInteger(q.correctAnswer) && q.correctAnswer >= 0 && q.correctAnswer < q.options.length, q.id);
    assert.ok(q.question.trim() && q.explanation.trim(), q.id);
  }
});

test('classwork sets were added to lessons 1 and 2', () => {
  assert.equal(Q2_LEVEL_1_QUIZ.length, 25);
  assert.equal(Q2_LEVEL_2_QUIZ.length, 15);
});
