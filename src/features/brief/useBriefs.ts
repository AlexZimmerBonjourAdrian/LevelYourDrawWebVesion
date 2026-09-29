'use client';

import { useEffect, useMemo, useState } from 'react';
import { BriefGenerator, type BriefField, type SpinDraft, type SpinField } from '@/features/brief/generator';
import { loadDeckSet, forLang, translateBrief, translateValue, getGloss, getGuide, legendFor, type DeckSet, type LegendItem } from '@/features/brief/i18n';
import type { Brief, BriefLang } from '@/features/brief/types';
import { LoggerService } from '@/services/LoggerService';

const EMPTY_DRAFT: SpinDraft = {
  v: { rol: '', prof: '', interno: '', externo: '' },
  locked: { rol: false, prof: false, interno: false, externo: false },
};

export function useBriefs() {
  const [deckSet, setDeckSet] = useState<DeckSet | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lang, setLang] = useState<BriefLang>('es');
  const [current, setCurrent] = useState<Brief | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [draft, setDraft] = useState<SpinDraft | null>(null);

  const gen = useMemo(
    () => (deckSet ? new BriefGenerator({ es: forLang(deckSet, 'es'), en: forLang(deckSet, 'en') }) : null),
    [deckSet],
  );

  useEffect(() => {
    loadDeckSet()
      .then(setDeckSet)
      .catch((e) => {
        LoggerService.error('App', 'decks', e);
        setLoadError(e instanceof Error ? e.message : 'ERR-DECKS');
      });
  }, []);

  const buzz = () => {
    try { navigator.vibrate(10); } catch { /* noop */ }
  };

  useEffect(() => {
    if (!spinning || !deckSet) return;
    const d = forLang(deckSet, lang);
    const r = (a: readonly string[]) => a[Math.floor(Math.random() * a.length)];
    setDraft((prev) => prev ?? EMPTY_DRAFT);
    const id = window.setInterval(() => {
      setDraft((prev) => {
        if (!prev) return prev;
        return {
          v: {
            rol: prev.locked.rol ? prev.v.rol : r(d.roles),
            prof: prev.locked.prof ? prev.v.prof : r(d.professions),
            interno: prev.locked.interno ? prev.v.interno : r(d.inner),
            externo: prev.locked.externo ? prev.v.externo : r(d.outer),
          },
          locked: prev.locked,
        };
      });
    }, 110);
    return () => window.clearInterval(id);
  }, [spinning, lang, deckSet]);

  const commitDraftValues = (v: SpinDraft['v']) => {
    if (!gen) return;
    setCurrent(gen.commitDraft(lang, v));
    setSpinning(false);
  };

  const startSpin = () => {
    if (!gen) return;
    buzz();
    setDraft(null);
    setSpinning(true);
  };

  const stopSpin = () => {
    if (!gen || !draft) return;
    buzz();
    commitDraftValues(draft.v);
    setDraft({ ...draft, locked: { rol: true, prof: true, interno: true, externo: true } });
  };

  const lockField = (field: SpinField) => {
    if (!draft) return;
    buzz();
    if (!spinning) {
      setDraft({ ...draft, locked: { ...draft.locked, [field]: false } });
      setSpinning(true);
      return;
    }
    const locked = { ...draft.locked, [field]: true };
    if (locked.rol && locked.prof && locked.interno && locked.externo) {
      commitDraftValues(draft.v);
      setDraft({ ...draft, locked });
    } else {
      setDraft({ ...draft, locked });
    }
  };

  const reroll = (field: BriefField) => {
    if (!gen || !current || spinning) return;
    buzz();
    setCurrent(gen.regenerateField(current, field));
  };

  const glossFor = (
    cat: 'roles' | 'professions' | 'inner' | 'outer',
    value: string,
  ): string | null => (deckSet ? getGloss(deckSet, cat, lang, value) : null);

  const guideFor = (value: string): string | null =>
    deckSet ? getGuide(deckSet, lang, value) : null;

  const switchLang = (l: BriefLang) => {
    if (!deckSet) {
      setSpinning(false);
      setDraft(null);
      setLang(l);
      return;
    }
    if (current) setCurrent(translateBrief(deckSet, current, l));
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            v: {
              rol: translateValue(deckSet, 'roles', lang, prev.v.rol),
              prof: translateValue(deckSet, 'professions', lang, prev.v.prof),
              interno: translateValue(deckSet, 'inner', lang, prev.v.interno),
              externo: translateValue(deckSet, 'outer', lang, prev.v.externo),
            },
          }
        : prev,
    );
    setLang(l);
  };

  const legend: LegendItem[] = !spinning && deckSet
    ? draft
      ? legendFor(deckSet, lang, { rol: draft.v.rol, prof: draft.v.prof, interno: draft.v.interno, externo: draft.v.externo })
      : current
        ? legendFor(deckSet, lang, { rol: current.rol, prof: current.profesiones[0], interno: current.interno, externo: current.externo })
        : []
    : [];

  return {
    decksReady: !!gen,
    loadError,
    lang,
    current,
    spinning,
    draft,
    legend,
    startSpin,
    stopSpin,
    lockField,
    reroll,
    switchLang,
    glossFor,
    guideFor,
  };
}
