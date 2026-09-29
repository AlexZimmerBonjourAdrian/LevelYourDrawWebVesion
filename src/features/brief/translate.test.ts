import { describe, it, expect } from 'vitest';
import rawDecks from '../../../public/data/cuatro_datos.json';
import { translateBrief, translateValue, type DeckSet } from '@/features/brief/i18n';
import type { Brief } from '@/features/brief/types';

const decks = rawDecks as DeckSet;
const CATS = ['roles', 'professions', 'inner', 'outer'] as const;

describe('mazos bilingües con id estable', () => {
  it('tienen los tamaños documentados', () => {
    expect(decks.roles).toHaveLength(72);
    expect(decks.professions).toHaveLength(150);
    expect(decks.inner).toHaveLength(120);
    expect(decks.outer).toHaveLength(120);
  });

  it('cada entrada tiene id único y texto es/en no vacío', () => {
    for (const c of CATS) {
      const ids = decks[c].map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const e of decks[c]) {
        expect(e.id.trim().length).toBeGreaterThan(0);
        expect(e.es.trim().length).toBeGreaterThan(0);
        expect(e.en.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('sin textos duplicados dentro del mismo idioma', () => {
    for (const c of CATS) {
      for (const lang of ['es', 'en'] as const) {
        const texts = decks[c].map((e) => e[lang]);
        expect(new Set(texts).size).toBe(texts.length);
      }
    }
  });
});

describe('translateValue', () => {
  it('traduce rol ES->EN por id', () => {
    expect(translateValue(decks, 'roles', 'es', 'Protagonista')).toBe('Protagonist');
    expect(translateValue(decks, 'roles', 'es', 'Deuteragonista')).toBe('Deuteragonist');
  });

  it('traduce profesión EN->ES por id', () => {
    expect(translateValue(decks, 'professions', 'en', 'Software engineer')).toBe('Ingeniero informático');
  });

  it('traduce moods psicológicos', () => {
    expect(translateValue(decks, 'inner', 'es', 'Atormentado')).toBe('Tormented');
    expect(translateValue(decks, 'outer', 'es', 'Seguro')).toBe('Confident');
  });

  it('valor desconocido se conserva (fallback legacy)', () => {
    expect(translateValue(decks, 'roles', 'es', 'Inexistente')).toBe('Inexistente');
  });
});

describe('translateBrief', () => {
  const brief: Brief = {
    id: 'abc123',
    lang: 'es',
    rol: 'Protagonista',
    profesiones: ['Granjero'],
    dominaPrimera: false,
    interno: 'Atormentado',
    externo: 'Seguro',
    createdAt: '2026-09-29T00:00:00.000Z',
  };

  it('traduce los 4 datos y cambia lang, conserva id', () => {
    const en = translateBrief(decks, brief, 'en');
    expect(en).toEqual({
      ...brief,
      lang: 'en',
      rol: 'Protagonist',
      profesiones: ['Farmer'],
      interno: 'Tormented',
      externo: 'Confident',
    });
  });

  it('roundtrip EN->ES recupera el original', () => {
    const en = translateBrief(decks, brief, 'en');
    expect(translateBrief(decks, en, 'es')).toEqual(brief);
  });
});

describe('glosario (leyenda por rasgo)', () => {
  const SEEDED = ['abulico', 'pusilanime', 'deuteragonista', 'histrionico', 'discolo', 'falso-protagonista'];

  it('las cartas semilla traen glosa en ambos idiomas', async () => {
    const { getGloss } = await import('@/features/brief/i18n');
    const cats = { abulico: 'inner', pusilanime: 'inner', deuteragonista: 'roles', histrionico: 'outer', discolo: 'outer', 'falso-protagonista': 'roles' } as const;
    for (const id of SEEDED) {
      const cat = cats[id as keyof typeof cats];
      const entry = decks[cat].find((e) => e.id === id)!;
      expect(getGloss(decks, cat, 'es', entry.es)).toBe(entry.gloss_es);
      expect(getGloss(decks, cat, 'en', entry.en)).toBe(entry.gloss_en);
    }
  });

  it('sin glosa o valor desconocido devuelve null', async () => {
    const { getGloss } = await import('@/features/brief/i18n');
    expect(getGloss(decks, 'professions', 'es', 'Granjero')).toBeNull();
    expect(getGloss(decks, 'roles', 'es', 'Inexistente')).toBeNull();
  });

  it('toda glosa presente es super breve (<=90) y existe en ambos idiomas', () => {
    for (const c of CATS) {
      for (const e of decks[c]) {
        if (e.gloss_es !== undefined || e.gloss_en !== undefined) {
          expect(e.gloss_es?.length ?? 0).toBeGreaterThan(0);
          expect(e.gloss_en?.length ?? 0).toBeGreaterThan(0);
          expect(e.gloss_es!.length).toBeLessThanOrEqual(90);
          expect(e.gloss_en!.length).toBeLessThanOrEqual(90);
        }
      }
    }
  });
});

describe('legendFor (leyenda bajo el botón)', () => {
  it('lista solo los datos con glosa, en orden rol/prof/interno/externo', async () => {
    const { legendFor } = await import('@/features/brief/i18n');
    const legend = legendFor(decks, 'es', {
      rol: 'Protagonista',
      prof: 'Granjero',
      interno: 'Atormentado',
      externo: 'Seguro',
    });
    expect(legend).toEqual([
      { cat: 'roles', value: 'Protagonista', gloss: 'Eje de la historia; todo pasa por él.', guide: 'Carga el arco y cambia al final. Ej: Don Quijote.' },
      { cat: 'inner', value: 'Atormentado', gloss: 'Consumido por su dolor.' },
      { cat: 'outer', value: 'Seguro', gloss: 'Que transmite control total.' },
    ]);
  });

  it('usa la glosa del idioma activo', async () => {
    const { legendFor } = await import('@/features/brief/i18n');
    const legend = legendFor(decks, 'en', {
      rol: 'Protagonist',
      prof: 'Farmer',
      interno: 'Tormented',
      externo: 'Confident',
    });
    expect(legend).toEqual([
      { cat: 'roles', value: 'Protagonist', gloss: "Story's axis; all passes through them.", guide: 'Carries the arc and changes. E.g.: Don Quixote.' },
      { cat: 'inner', value: 'Tormented', gloss: 'Consumed by pain.' },
      { cat: 'outer', value: 'Confident', gloss: 'Projecting total control.' },
    ]);
  });

  it('vacía si ningún dato trae glosa o son desconocidos', async () => {
    const { legendFor } = await import('@/features/brief/i18n');
    expect(legendFor(decks, 'es', { rol: 'Inexistente', prof: 'Granjero', interno: 'Sereno', externo: 'Amable' })).toEqual([]);
    expect(legendFor(decks, 'es', { rol: '', prof: '', interno: '', externo: '' })).toEqual([]);
  });
});

describe('guía de rol (entender la función narrativa)', () => {
  it('devuelve la guía del rol en el idioma pedido', async () => {
    const { getGuide } = await import('@/features/brief/i18n');
    expect(getGuide(decks, 'es', 'Deuteragonista')).toBe('Segundo peso; refleja o reta al héroe. Ej: Sancho Panza.');
    expect(getGuide(decks, 'en', 'Protagonist')).toBe('Carries the arc and changes. E.g.: Don Quixote.');
  });

  it('null si no es rol, no trae guía o es desconocido', async () => {
    const { getGuide } = await import('@/features/brief/i18n');
    expect(getGuide(decks, 'es', 'Granjero')).toBeNull();
    expect(getGuide(decks, 'es', 'Atormentado')).toBeNull();
    expect(getGuide(decks, 'es', 'Inexistente')).toBeNull();
  });

  it('toda guía presente es par ES+EN y <=160 caracteres', () => {
    for (const e of decks.roles) {
      if (e.guide_es !== undefined || e.guide_en !== undefined) {
        expect(e.guide_es?.length ?? 0).toBeGreaterThan(0);
        expect(e.guide_en?.length ?? 0).toBeGreaterThan(0);
        expect(e.guide_es!.length).toBeLessThanOrEqual(160);
        expect(e.guide_en!.length).toBeLessThanOrEqual(160);
      }
    }
  });

  it('legendFor incluye la guía del rol', async () => {
    const { legendFor } = await import('@/features/brief/i18n');
    const legend = legendFor(decks, 'es', { rol: 'Mentor', prof: 'Granjero', interno: 'Sereno', externo: 'Amable' });
    expect(legend).toEqual([
      { cat: 'roles', value: 'Mentor', gloss: 'Guía que enseña al héroe.', guide: 'Enseña y suele partir. Ej: el maestro anciano.' },
    ]);
  });
});
