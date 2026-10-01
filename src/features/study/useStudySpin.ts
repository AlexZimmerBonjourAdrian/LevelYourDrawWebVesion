'use client';

import { useEffect, useState } from 'react';
import {
  loadStudySet, studyForLang, studyTranslateValue, studyLegendFor,
  studyGloss, studyGuide,
  type StudySet, type StudyDraft, type StudyLegendItem, type StudySpinField, type StudyCategory,
} from '@/features/study/study';
import type { BriefLang } from '@/features/brief/types';
import { LoggerService } from '@/services/LoggerService';

const EMPTY: StudyDraft = { v: { estilo: '', artista: '' }, locked: { estilo: false, artista: false } };

export function useStudySpin(lang: BriefLang) {
  const [set, setSet] = useState<StudySet | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [draft, setDraft] = useState<StudyDraft | null>(null);
  const [current, setCurrent] = useState<{ estilo: string; artista: string } | null>(null);

  useEffect(() => {
    loadStudySet().then(setSet).catch((e) => {
      LoggerService.error('Study', 'decks', e);
      setLoadError(e instanceof Error ? e.message : 'ERR-STUDY');
    });
  }, []);

  const buzz = () => { try { navigator.vibrate(10); } catch { /* noop */ } };

  useEffect(() => {
    if (!spinning || !set) return;
    const d = studyForLang(set, lang);
    const r = (a: readonly string[]) => a[Math.floor(Math.random() * a.length)];
    setDraft((prev) => prev ?? EMPTY);
    const id = window.setInterval(() => {
      setDraft((prev) => {
        if (!prev) return prev;
        return {
          v: {
            estilo: prev.locked.estilo ? prev.v.estilo : r(d.estilo),
            artista: prev.locked.artista ? prev.v.artista : r(d.artista),
          },
          locked: prev.locked,
        };
      });
    }, 110);
    return () => window.clearInterval(id);
  }, [spinning, lang, set]);

  const start = () => { if (!set) return; buzz(); setDraft(null); setSpinning(true); };

  const commit = (v: { estilo: string; artista: string }) => {
    setCurrent(v);
    setSpinning(false);
  };

  const stop = () => {
    if (!draft) return;
    buzz();
    commit(draft.v);
    setDraft({ ...draft, locked: { estilo: true, artista: true } });
  };

  const lockField = (f: StudySpinField) => {
    if (!draft) return;
    buzz();
    if (!spinning) {
      setDraft({ ...draft, locked: { ...draft.locked, [f]: false } });
      setSpinning(true);
      return;
    }
    const locked = { ...draft.locked, [f]: true };
    if (locked.estilo && locked.artista) {
      commit(draft.v);
      setDraft({ ...draft, locked });
    } else {
      setDraft({ ...draft, locked });
    }
  };

  const reroll = (f: StudySpinField) => {
    if (!set || spinning || !current) return;
    buzz();
    const d = studyForLang(set, lang);
    const pickOther = (arr: readonly string[], avoid: string) => {
      let v = arr[Math.floor(Math.random() * arr.length)];
      let g = 0;
      while (v === avoid && g++ < 20) v = arr[Math.floor(Math.random() * arr.length)];
      return v;
    };
    setCurrent({
      estilo: f === 'estilo' ? pickOther(d.estilo, current.estilo) : current.estilo,
      artista: f === 'artista' ? pickOther(d.artista, current.artista) : current.artista,
    });
  };

  /** Traduce draft/current cuando el idioma global cambia. Llamar desde el padre. */
  const translateTo = (next: BriefLang, prev: BriefLang) => {
    if (!set || next === prev) return;
    if (current) {
      setCurrent({
        estilo: studyTranslateValue(set, 'estilos', prev, current.estilo),
        artista: studyTranslateValue(set, 'artistas', prev, current.artista),
      });
    }
    setDraft((p) => p ? {
      ...p,
      v: {
        estilo: studyTranslateValue(set, 'estilos', prev, p.v.estilo),
        artista: studyTranslateValue(set, 'artistas', prev, p.v.artista),
      },
    } : p);
  };

  const glossFor = (cat: StudyCategory, value: string): string | null =>
    set ? studyGloss(set, cat, lang, value) : null;
  const guideFor = (cat: StudyCategory, value: string): string | null =>
    set ? studyGuide(set, cat, lang, value) : null;

  const legend: StudyLegendItem[] = !spinning && set
    ? draft
      ? studyLegendFor(set, lang, draft.v)
      : current
        ? studyLegendFor(set, lang, current)
        : []
    : [];

  return {
    ready: !!set, loadError, spinning, draft, current, legend,
    start, stop, lockField, reroll, translateTo, glossFor, guideFor,
  };
}
