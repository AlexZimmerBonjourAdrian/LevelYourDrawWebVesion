import { describe, it, expect } from 'vitest';
import { BriefGenerator } from '@/features/brief/generator';
import { forLang, type DeckSet } from '@/features/brief/i18n';
import rawDecks from '../../../public/data/cuatro_datos.json';
import type { Brief } from '@/features/brief/types';

const set = rawDecks as DeckSet;
const decks = { es: forLang(set, 'es'), en: forLang(set, 'en') };
const key = (b: Pick<Brief, 'rol' | 'profesiones' | 'interno' | 'externo'>) =>
  [b.rol, ...b.profesiones, b.interno, b.externo].join('|');

describe('BriefGenerator.generate', () => {
  it('devuelve los 4 datos no vacíos, 1 profesión, lang e id', () => {
    const g = new BriefGenerator(decks);
    const b = g.generate('es');
    expect(b.lang).toBe('es');
    expect(b.rol.length).toBeGreaterThan(0);
    expect(b.profesiones).toHaveLength(1);
    expect(b.dominaPrimera).toBe(false);
    expect(b.interno.length).toBeGreaterThan(0);
    expect(b.externo.length).toBeGreaterThan(0);
    expect(b.id.length).toBeGreaterThan(0);
  });

  it('no repite combinación en sesión', () => {
    const g = new BriefGenerator(decks);
    const seen = new Set<string>();
    for (let i = 0; i < 50; i++) {
      const k = key(g.generate('en'));
      expect(seen.has(k)).toBe(false);
      seen.add(k);
    }
  });
});

describe('BriefGenerator.regenerateField', () => {
  it('cambia solo ese dato y a un valor distinto', () => {
    const g = new BriefGenerator(decks);
    const b = g.generate('es');
    const r = g.regenerateField(b, 'rol');
    expect(r.rol).not.toBe(b.rol);
    expect(r.profesiones[0]).toBe(b.profesiones[0]);
    expect(r.interno).toBe(b.interno);
    expect(r.externo).toBe(b.externo);
    expect(r.id).not.toBe(b.id);
  });
});

describe('BriefGenerator.commitDraft', () => {
  it('fija los valores mostrados si no salieron', () => {
    const g = new BriefGenerator(decks);
    const b = g.commitDraft('es', { rol: 'Mentor', prof: 'Mago', interno: 'Sereno', externo: 'Seguro' });
    expect(b.rol).toBe('Mentor');
    expect(b.profesiones).toEqual(['Mago']);
    expect(b.interno).toBe('Sereno');
    expect(b.externo).toBe('Seguro');
  });

  it('si lo mostrado ya salió, muta un dato (no duplica)', () => {
    const g = new BriefGenerator(decks);
    const first = g.commitDraft('es', { rol: 'Mentor', prof: 'Mago', interno: 'Sereno', externo: 'Seguro' });
    const second = g.commitDraft('es', { rol: 'Mentor', prof: 'Mago', interno: 'Sereno', externo: 'Seguro' });
    expect(key(second)).not.toBe(key(first));
  });

  it('resetSession permite volver a salir', () => {
    const g = new BriefGenerator(decks);
    const v = { rol: 'Mentor', prof: 'Mago', interno: 'Sereno', externo: 'Seguro' };
    g.commitDraft('es', v);
    g.resetSession();
    expect(key(g.commitDraft('es', v))).toBe(key({ ...v, profesiones: [v.prof] }));
  });
});
