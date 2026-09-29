# TDD — LevelYourDraw Web

Ciclo: test en rojo -> implementación mínima -> verde -> refactor.
Correr: `npm test` (vitest). Todo test vive junto al código: `src/**/*.test.ts`.

## Cubierto (18 tests)

- `features/brief/translate.test.ts` (12)
  - Mazos: tamaños 72/150/120/120, ids únicos, es/en no vacíos ni duplicados.
  - Traducción por id: rol/profesión/moods ES<->EN, fallback legacy,
    brief completo, roundtrip.
  - Glosario: cartas semilla con glosa ES+EN, null sin glosa,
    glosa <= 90 caracteres y par completo.
- `features/brief/generator.test.ts` (6)
  - `generate`: 4 datos, 1 profesión, sin repetir en sesión.
  - `regenerateField`: cambia solo ese dato, valor distinto, nuevo id.
  - `commitDraft`: fija lo mostrado; si ya salió muta un dato;
    `resetSession` libera.

## Reglas para ampliar

- Nueva conducta -> test primero en el mismo cambio.
- Nueva carta con glosa -> respeta `{gloss_es, gloss_en}`, <= 90.
- La cobertura de glosas crece por semilla; el test de restricción
  lo valida solo, sin umbral de cobertura (backlog progresivo).

## Backlog de tests (fuera del mínimo)

- `useBriefs` (fijado individual, commit al fijar 4, no-reset, traducir
  draft al cambiar idioma): requiere jsdom + testing-library.
- `DatumCard` (ⓘ despliega glosa, borde rojo al fijar).
