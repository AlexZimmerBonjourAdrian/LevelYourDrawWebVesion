import type { Brief, BriefLang, Decks } from './types';

export type BriefField = 'rol' | 'profesion' | 'interno' | 'externo';

export type SpinField = 'rol' | 'prof' | 'interno' | 'externo';

export interface SpinDraft {
  v: { rol: string; prof: string; interno: string; externo: string };
  locked: Record<SpinField, boolean>;
}

function pick<T>(arr: readonly T[], rand: () => number = Math.random): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickOther<T>(arr: readonly T[], avoid: T, rand: () => number = Math.random): T {
  let v = pick(arr, rand);
  let guard = 0;
  while (v === avoid && guard++ < 20) v = pick(arr, rand);
  return v;
}

function keyOf(rol: string, prof: string, interno: string, externo: string): string {
  return [rol, prof, interno, externo].join('|');
}

function newId(rand: () => number = Math.random): string {
  return `${Date.now().toString(36)}-${Math.floor(rand() * 1e6).toString(36)}`;
}

export class BriefGenerator {
  private seen = new Set<string>();

  constructor(private readonly decks: Record<BriefLang, Decks>) {}

  resetSession(): void {
    this.seen.clear();
  }

  generate(lang: BriefLang, rand: () => number = Math.random): Brief {
    const d = this.decks[lang];
    const total = d.roles.length * d.professions.length * d.inner.length * d.outer.length;
    if (this.seen.size >= total) this.seen.clear();

    for (let attempt = 0; attempt < 50; attempt++) {
      const rol = pick(d.roles, rand);
      const prof = pick(d.professions, rand);
      const interno = pick(d.inner, rand);
      const externo = pick(d.outer, rand);
      const key = keyOf(rol, prof, interno, externo);
      if (this.seen.has(key)) continue;
      this.seen.add(key);
      return {
        id: newId(rand),
        lang,
        rol,
        profesiones: [prof],
        dominaPrimera: false,
        interno,
        externo,
        createdAt: new Date().toISOString(),
      };
    }
    this.seen.clear();
    return this.generate(lang, rand);
  }

  commitDraft(
    lang: BriefLang,
    d: SpinDraft['v'],
    rand: () => number = Math.random,
  ): Brief {
    const decks = this.decks[lang];
    let rol = d.rol, prof = d.prof, interno = d.interno, externo = d.externo;
    for (let attempt = 0; attempt < 50; attempt++) {
      const key = keyOf(rol, prof, interno, externo);
      if (!this.seen.has(key)) {
        this.seen.add(key);
        return {
          id: newId(rand),
          lang,
          rol,
          profesiones: [prof],
          dominaPrimera: false,
          interno,
          externo,
          createdAt: new Date().toISOString(),
        };
      }
      const f = Math.floor(rand() * 4);
      if (f === 0) rol = pick(decks.roles, rand);
      else if (f === 1) prof = pick(decks.professions, rand);
      else if (f === 2) interno = pick(decks.inner, rand);
      else externo = pick(decks.outer, rand);
    }
    this.seen.clear();
    return this.generate(lang, rand);
  }

  regenerateField(b: Brief, field: BriefField, rand: () => number = Math.random): Brief {
    const d = this.decks[b.lang];
    let { rol, interno, externo } = b;
    let prof = b.profesiones[0];
    if (field === 'rol') rol = pickOther(d.roles, rol, rand);
    else if (field === 'profesion') prof = pickOther(d.professions, prof, rand);
    else if (field === 'interno') interno = pickOther(d.inner, interno, rand);
    else if (field === 'externo') externo = pickOther(d.outer, externo, rand);
    this.seen.add(keyOf(rol, prof, interno, externo));
    return {
      id: newId(rand),
      lang: b.lang,
      rol,
      profesiones: [prof],
      dominaPrimera: false,
      interno,
      externo,
      createdAt: new Date().toISOString(),
    };
  }
}
