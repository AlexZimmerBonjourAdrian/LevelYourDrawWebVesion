# Indice de documentacion — LevelYourDraw

## Reglas de documentacion (de `ENGINEERING.md` y `CONSTITUTION.md`)

1. El documento se corrige ANTES que el codigo ante contradiccion.
2. Todo cambio de comportamiento actualiza `PLAN.md` en el mismo cambio.
3. Un doc describe lo que ES (implementado) o lo que SERA con hito asignado.
   Sin tercer estado: lo no asignado es backlog, no promesa.

## Mapa

- Producto: `USUARIO.md` (perfil y dolor), `CUATRO_DATOS.md` (mecanica),
  `BRIEF.md` (ciclo de vida), `TABS.md` (funciones por tab).
- Diseno: `DISENO.md` (tokens y componentes), `ESTILO.md` (tono visual),
  `SENSACION.md` (como se siente).
- Tecnico: `MANEJO_ERRORES.md` (patron de errores), `EXPO_CONFIG.md`,
  `SECURITY.md`, `ENGINEERING.md`, `CONSTITUTION.md`.
- Proceso: `PLAN.md` (hitos), `CLAUDE.md` (contexto IA).
- Backlog: `PRO.md` (version paga, fuera de las 21 h).
- Entrada: `../README.md` (vision general).

## Como evaluar (checklist)

- [ ] Cada funcion de `TABS.md` existe en codigo o tiene tarea en `PLAN.md`.
- [ ] Cada regla de `CUATRO_DATOS.md`/`BRIEF.md` se cumple en codigo.
- [ ] Cada principio de `ESTILO.md`/`SENSACION.md` es visible en UI.
- [ ] Cifras (combos, listas) coinciden con los JSON reales.
- [ ] Sin terminos gaming ni fiscales en ningun doc.

