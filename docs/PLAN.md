# PLAN — LevelYourDraw Web

Generador web de briefs de 4 datos contra el bloqueo creativo. Bilingue ES/EN desde el dia uno. Sin backend, sin cuentas, sin nube.

**Actualizacion:** 2026-09-29 (re-enfoque web: base Next.js purgada de JustReadPDF, solo lo basico).

## Reglas

- Hito = unidad minima demostrable. Estados: `pendiente` -> `en implementacion` -> `en revision` -> `validado`.
- Quien mueve una tarea actualiza este archivo en el mismo cambio.
- Todo hito demuestra offline (localStorage + JSON estaticos).

## Alcance basico (sin PWA, sin compartir, sin captura, sin export PNG)

Fuera de esta fase por decision: instalable PWA, hoja de compartir/Web Share, modo captura con foto, exportar PNG. No son deuda, son backlog.

## Hitos

### S1 · Generador minimo (web) — `en revision`

- [x] Mazos `public/data/cuatro_datos.json` (72/150/120/120, 155,5M combos,
  entradas `{id, es, en}`)
- [x] Auditoría de roles: 29 guías reescritas con ángulo complementario
  (glosa = qué es, guía = qué hace en la historia). 25/25 verde.
- [x] TDD (`docs/TDD.md`, `npm test` verde 25/25): `translate.test.ts` (mazos,
  traducción por id, glosario, `legendFor`, guía de rol) + `generator.test.ts`
  (generate, recambio, commit, reset). Backlog: tests de hook y UI.
- [x] `src/features/brief/generator.ts`: descarte por sesion, 1 profesion,
  giro slot por tarjeta con fijado individual, commit sin repetir,
  recambio por dato, toggle ES/EN (brief conserva su idioma)
- [x] UI minima: 4 cards + Nuevo/Detener, modo oscuro fijo, sin historial,
  sin galeria, sin ajustes, sin compartir
- [x] Refactor: `page.tsx` compone; estado en `useBriefs.ts`;
  card en `DatumCard.tsx`; copia en `strings.ts`; tema en `tokens/themes.ts`
- [x] Inicio: grilla 2x2, giro 420ms + fade escalonado, nota de dominancia, vibracion 10ms on/off
- [x] Historial de sesion (memoria corta, tap recupera) + favoritos a Galeria (localStorage)
- [x] Galeria: lista con fecha, eliminar con confirmacion, sin editar
- [x] Ajustes: idioma por defecto, vibracion on/off, pie de version
- [x] Refactor arquitectura: `page.tsx` solo compone; estado en
  `features/brief/useBriefs.ts`; UI en `DatumCard`; copia en `features/brief/strings.ts`;
  tema en `tokens/themes.ts`. Sin cambio de comportamiento.
- [x] Minimo: purgados `ProfessionCard, HistoryList, GalleryList, PrefsPanel,
  Header/Footer, StorageService, SearchService`, doble profesion e historial.
  Moods 100% adjetivos psicologicos (ej: interno Atormentado, externo Seguro).
- [ ] Validar: 7 dias de dogfooding sin repetir en sesion

Demostrable: generar briefs ES/EN sin repetir en sesion, guardar y recuperar favoritos.

## Backlog (ver `PRO.md`)

Captura, export PNG, compartir, PWA, customizacion de mazos. Solo despues de validar el basico a 30 dias.

## Fuera de alcance

- Backend/cuentas/nube, PWA/instalable, compartir, captura, export PNG.
- Suite de testing automatizado en este ciclo (dogfooding como QA).
- Pagos, multiusuario.
