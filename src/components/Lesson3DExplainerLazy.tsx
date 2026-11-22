import React, { Suspense, lazy } from 'react';
import type { LessonId } from './q2ExplainerScenes.js';

// three.js is large, so it loads only when a 3D lesson is shown.
const Impl = lazy(() => import('./Lesson3DExplainer.js'));

export const Lesson3DExplainer: React.FC<{ lesson: LessonId }> = ({ lesson }) => (
  <Suspense
    fallback={
      <div className="w-full aspect-video rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-sm text-slate-400">
        Loading 3D lesson…
      </div>
    }
  >
    <Impl lesson={lesson} />
  </Suspense>
);
