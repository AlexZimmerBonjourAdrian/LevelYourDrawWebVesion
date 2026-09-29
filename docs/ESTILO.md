# Estilo visual — LevelYourDraw

Tono: calma de cuaderno de bocetos, no arcade. Comodo y vistoso.

## Tokens (ver implementacion en `tokens/`)

- Grises calidos 50-800 para texto y fondos; primario reservado a acciones
  (Nuevo brief, guardar). Semanticos solo para estados reales.
- Tipografia: una familia, 5 tamanos (chip, footnote, secondary, body,
  sectionHeader). Titulos por peso, no por tamano gigante.
- Espaciado generoso: cards con padding lg, gap 12 entre bloques.
- Radios grandes (xl) en sheets, plenos en chips.

## Composicion de pantallas

- Inicio: toggle idioma arriba, card protagonista al centro, un solo boton
  primario abajo. Nada mas. Una pantalla = una accion.
- Galeria: lista cronologica inversa, mini-card por brief (fecha + rol).
- Captura: visor grande, controles minimos (disparar, elegir brief, confirmar).
- Ajustes: lista simple, sin secciones anidadas.

## Prohibido (ver `SENSACION.md`)

Gaming (puntos, rachas, confeti), spinners mudos, chrome falso, emojis en UI.
