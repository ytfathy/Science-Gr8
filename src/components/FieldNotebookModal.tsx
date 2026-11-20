/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Search, BookMarked, Sparkles } from 'lucide-react';
import { NOTEBOOK_ENTRIES } from '../data/notebookData.js';
import { Q2_NOTEBOOK_ENTRIES } from '../data/chemistryData.js';
import { soundFx } from '../utils/audio.js';

interface FieldNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedNotesCount: number;
  quarter?: 1 | 2;
}

export const FieldNotebookModal: React.FC<FieldNotebookModalProps> = ({
  isOpen,
  onClose,
  unlockedNotesCount,
  quarter = 1,
}) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFilter('All');
    setSearch('');
  }, [quarter]);

  if (!isOpen) return null;

  const isQuarter2 = quarter === 2;
  const categories = isQuarter2
    ? (['All', 'Safety', 'Reactions', 'Equations', 'Thermal', 'Glossary'] as const)
    : (['All', 'Botany', 'Genetics', 'Zoology'] as const);

  const normalizedEntries = isQuarter2
    ? Q2_NOTEBOOK_ENTRIES.map((note) => ({
        id: note.id,
        level: note.level,
        category: note.category,
        title: note.title,
        keyTakeaway: note.keyTakeaway,
        scientificConcept: note.scientificConcept,
        standardText: note.sourceReference,
        badgeCode: `Unit 4 · L${note.level}`,
        icon: note.icon,
      }))
    : NOTEBOOK_ENTRIES.map((note) => ({
        id: note.id,
        level: note.level,
        category: note.category,
        title: note.title,
        keyTakeaway: note.keyTakeaway,
        scientificConcept: note.scientificConcept,
        standardText: note.grade8Standard,
        badgeCode: note.grade8Standard.split(':')[0],
        icon: note.icon,
      }));

  const totalCount = normalizedEntries.length;
  const displayUnlockedCount = isQuarter2 ? totalCount : unlockedNotesCount;

  const filteredEntries = normalizedEntries.filter((note) => {
    const matchesCategory = filter === 'All' || note.category === filter;
    const q = search.toLowerCase();
    const matchesQuery =
      note.title.toLowerCase().includes(q) ||
      note.keyTakeaway.toLowerCase().includes(q) ||
      note.scientificConcept.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-xl ${
                isQuarter2
                  ? 'bg-violet-500/20 border-violet-500/30'
                  : 'bg-amber-500/20 border-amber-500/30'
              }`}
            >
              {isQuarter2 ? '🧪' : '📖'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  {isQuarter2 ? 'Quarter 2 Field Notebook' : 'Quarter 1 Field Notebook'}
                </h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold tabular-nums ${
                    isQuarter2
                      ? 'bg-violet-400/20 text-violet-300'
                      : 'bg-amber-400/20 text-amber-300'
                  }`}
                >
                  {displayUnlockedCount} / {totalCount} Entries
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isQuarter2
                  ? 'Chemical Processes & Equations — Lab Safety, Reactions, Conservation, Thermal Energy & 17-Term Glossary'
                  : 'Grade 8 Next-Generation Science Standards (NGSS) reference notes & key concepts'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close Notebook"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setFilter(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  filter === cat
                    ? isQuarter2
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts or terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                isQuarter2 ? 'focus:border-violet-500' : 'focus:border-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Notebook Cards Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredEntries.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{note.icon}</span>
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isQuarter2
                          ? 'text-violet-300 bg-violet-950/60 border-violet-800/40'
                          : 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                      }`}
                    >
                      Level {note.level} • {note.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {note.title}
                    </h3>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md shrink-0">
                  {note.badgeCode}
                </div>
              </div>

              {/* Key Takeaway Callout */}
              <div className="bg-amber-500/10 border-l-2 border-amber-400 rounded-r-xl p-3 my-2 text-xs text-amber-200 font-medium">
                <div className="font-bold text-[11px] uppercase tracking-wider text-amber-300 mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Core Takeaway
                </div>
                {note.keyTakeaway}
              </div>

              {/* In-depth Scientific Concept */}
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                {note.scientificConcept}
              </p>

              {/* Curriculum / Source alignment */}
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-800/80">
                <BookMarked className="w-3.5 h-3.5 text-slate-400" />
                <span>{note.standardText}</span>
              </div>
            </div>
          ))}

          {filteredEntries.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">No notes found matching your search.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>
            {isQuarter2
              ? 'Study guide notes aligned with Unit 4: Chemical Processes & Equations.'
              : 'Explore and complete levels to enrich your field research log.'}
          </span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition cursor-pointer"
          >
            Close Notebook
          </button>
        </div>
      </div>
    </div>
  );
};
