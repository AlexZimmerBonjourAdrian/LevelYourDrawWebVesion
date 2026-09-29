import type { Brief, BriefLang } from './types';

export interface DeckEntry {
  readonly id: string;
  readonly es: string;
  readonly en: string;
  readonly gloss_es?: string;
  readonly gloss_en?: string;
  readonly guide_es?: string;
  readonly guide_en?: string;
}

export type DeckCategory = 'roles' | 'professions' | 'inner' | 'outer';

export interface DeckSet {
  readonly roles: readonly DeckEntry[];
  readonly professions: readonly DeckEntry[];
  readonly inner: readonly DeckEntry[];
  readonly outer: readonly DeckEntry[];
}

/** Vista del mazo en un idioma (lo que consume el generador). */
export function forLang(decks: DeckSet, lang: BriefLang): {
  roles: string[]; professions: string[]; inner: string[]; outer: string[];
} {
  const pick = (cat: DeckCategory) => decks[cat].map((e) => e[lang]);
  return {
    roles: pick('roles'),
    professions: pick('professions'),
    inner: pick('inner'),
    outer: pick('outer'),
  };
}

/** Traduce un valor al idioma destino via id estable; fallback: original. */
export function translateValue(
  decks: DeckSet,
  cat: DeckCategory,
  from: BriefLang,
  value: string,
): string {
  const entry = decks[cat].find((e) => e[from] === value);
  if (!entry) return value;
  const to: BriefLang = from === 'es' ? 'en' : 'es';
  return entry[to];
}

/** Leyenda del rasgo en el idioma dado; null si la carta no trae glosa. */
export function getGloss(
  decks: DeckSet,
  cat: DeckCategory,
  lang: BriefLang,
  value: string,
): string | null {
  if (!value) return null;
  const entry = decks[cat].find((e) => e[lang] === value);
  const gloss = entry ? entry[lang === 'es' ? 'gloss_es' : 'gloss_en'] : undefined;
  return gloss ?? null;
}

/** Guía narrativa del rol; null si no es rol, no trae guía o es desconocido. */
export function getGuide(decks: DeckSet, lang: BriefLang, value: string): string | null {
  if (!value) return null;
  const entry = decks.roles.find((e) => e[lang] === value);
  const guide = entry ? entry[lang === 'es' ? 'guide_es' : 'guide_en'] : undefined;
  return guide ?? null;
}

/** Leyenda del brief: solo los datos con glosa, en orden de tarjeta. */
export interface LegendItem {
  readonly cat: DeckCategory;
  readonly value: string;
  readonly gloss: string;
  readonly guide?: string;
}

export function legendFor(
  decks: DeckSet,
  lang: BriefLang,
  v: { rol: string; prof: string; interno: string; externo: string },
): LegendItem[] {
  const pairs: Array<[DeckCategory, string]> = [
    ['roles', v.rol],
    ['professions', v.prof],
    ['inner', v.interno],
    ['outer', v.externo],
  ];
  const out: LegendItem[] = [];
  for (const [cat, value] of pairs) {
    const gloss = getGloss(decks, cat, lang, value);
    if (!gloss) continue;
    const guide = cat === 'roles' ? getGuide(decks, lang, value) : null;
    out.push(guide ? { cat, value, gloss, guide } : { cat, value, gloss });
  }
  return out;
}

export function translateBrief(decks: DeckSet, b: Brief, to: BriefLang): Brief {
  if (b.lang === to) return b;
  return {
    ...b,
    lang: to,
    rol: translateValue(decks, 'roles', b.lang, b.rol),
    profesiones: b.profesiones.map((p) => translateValue(decks, 'professions', b.lang, p)) as unknown as
      readonly [string] | readonly [string, string],
    interno: translateValue(decks, 'inner', b.lang, b.interno),
    externo: translateValue(decks, 'outer', b.lang, b.externo),
  };
}

export async function loadDeckSet(): Promise<DeckSet> {
  const r = await fetch('/data/cuatro_datos.json');
  if (!r.ok) throw new Error(`ERR-DECKS ${r.status}`);
  return r.json() as Promise<DeckSet>;
}
