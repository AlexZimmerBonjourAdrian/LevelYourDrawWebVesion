import type { BriefLang } from '@/features/brief/types';

export interface StudyEntry {
  readonly id: string;
  readonly es: string;
  readonly en: string;
  readonly gloss_es?: string;
  readonly gloss_en?: string;
  readonly guide_es?: string;
  readonly guide_en?: string;
}

export type StudyCategory = 'estilos' | 'artistas';

export interface StudySet {
  readonly estilos: readonly StudyEntry[];
  readonly artistas: readonly StudyEntry[];
}

export interface StudySpinValue {
  estilo: string;
  artista: string;
}

export type StudySpinField = 'estilo' | 'artista';

export interface StudyDraft {
  v: StudySpinValue;
  locked: Record<StudySpinField, boolean>;
}

export function studyForLang(set: StudySet, lang: BriefLang): Record<StudySpinField, string[]> {
  return {
    estilo: set.estilos.map((e) => e[lang]),
    artista: set.artistas.map((e) => e[lang]),
  };
}

export function studyTranslateValue(set: StudySet, cat: StudyCategory, from: BriefLang, value: string): string {
  const entry = set[cat].find((e) => e[from] === value);
  if (!entry) return value;
  return entry[from === 'es' ? 'en' : 'es'];
}

export function studyGloss(set: StudySet, cat: StudyCategory, lang: BriefLang, value: string): string | null {
  if (!value) return null;
  const entry = set[cat].find((e) => e[lang] === value);
  return entry?.[lang === 'es' ? 'gloss_es' : 'gloss_en'] ?? null;
}

export function studyGuide(set: StudySet, cat: StudyCategory, lang: BriefLang, value: string): string | null {
  if (!value) return null;
  const entry = set[cat].find((e) => e[lang] === value);
  return entry?.[lang === 'es' ? 'guide_es' : 'guide_en'] ?? null;
}

export interface StudyLegendItem {
  readonly cat: StudyCategory;
  readonly value: string;
  readonly gloss: string;
  readonly guide?: string;
}

export function studyLegendFor(set: StudySet, lang: BriefLang, v: StudySpinValue): StudyLegendItem[] {
  const pairs: Array<[StudyCategory, string]> = [
    ['estilos', v.estilo],
    ['artistas', v.artista],
  ];
  const out: StudyLegendItem[] = [];
  for (const [cat, value] of pairs) {
    const gloss = studyGloss(set, cat, lang, value);
    if (!gloss) continue;
    const guide = studyGuide(set, cat, lang, value);
    out.push(guide ? { cat, value, gloss, guide } : { cat, value, gloss });
  }
  return out;
}

export async function loadStudySet(): Promise<StudySet> {
  const r = await fetch('/data/estilos_referencia.json');
  if (!r.ok) throw new Error(`ERR-STUDY ${r.status}`);
  return r.json() as Promise<StudySet>;
}
