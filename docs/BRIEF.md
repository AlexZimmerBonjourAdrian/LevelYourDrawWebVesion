# El brief — ciclo de vida

Unidad minima de la app: 4 datos + idioma + fecha. Inmutable una vez creado
(si se edita, deja de ser el reto que salio).

## Estados

1. **Generado:** sale del mazo (ver `CUATRO_DATOS.md`), sin repetir en sesion.
2. **Mostrado:** card en Inicio con revelado escalonado (ver `SENSACION.md`).
3. **Guardado:** favorito o historial -> vive en Galeria con fecha.
4. **Exportado:** card a PNG transparente (S2).
5. **Integrado:** brief como sticker sobre foto de libreta (S2, Captura).

## Reglas

- Un brief = un reto. No se edita, no se combina, no se versiona.
- El historial de sesion es memoria corta (se pierde al cerrar); Galeria es
  memoria larga (persiste). No mezclarlas.
- Todo brief guarda su idioma de origen, pero al cambiar la app a otro
  idioma el brief visible se traduce al equivalente exacto por id
  (ej: Protagonista <-> Protagonist). Ver `CUATRO_DATOS.md`.
