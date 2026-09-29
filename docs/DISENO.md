# Reglas de diseno — LevelYourDraw (reutilizable)

Conservado de la purga. Sin APIs oficiales, sin testing.

## Tokens

- Modulo unico `tokens/`: `colors`, `typography`, `spacing`, `borderRadius`, `shadows`.
- Los valores se copian del sistema de diseno, no se redondean a defaults de libreria.

## Componentes

- `Button` (primary/secondary/danger), `Card`, `ListRow`, `StatusChip`, `InputField`, `BottomSheet`, `SegmentedControl`, `DropdownModal`, `PickerFilter`, `InfoMessage`, `LinesCounter`, `CircularButton`.
- Props minimas, estilos por variante, `disabled` real, `activeOpacity` 0.7.

## Interaccion

- Area tactil minima 44x44. Sin excepciones.
- Nada bloqueante sin explicacion: toda espera muestra en que paso esta.
- Sin chrome falso (barra de estado, teclado los pinta el SO).
- Sin emojis en codigo, UI ni mensajes. Iconografia de trazo.

## Datos y errores

- Importes como cadena decimal; calculo de presentacion en enteros de centesimos. Nunca `float`.
- Fechas `dd/mm/aaaa`, hora 24h. Formato unico por modulo.
- Error visible = mensaje textual del servidor + identificador, en monoespaciada. Prohibido el generico.
- Logs de red solo en desarrollo. Nada de datos de usuarios en logs de entrega.

## Navegacion

- Tabs: Inicio / Galeria / Ajustes. Pantallas apiladas sin barra cuando corresponda.
- Una sola puerta de red (cliente unico). Ninguna pantalla llama por su cuenta.

## Texto bilingue

- Toda cadena por clave, nunca literal en pantalla. Expansion ES->EN +-30%: los layouts (cards, chips) no fijan ancho de texto.

