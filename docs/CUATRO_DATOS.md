# Los cuatro datos — mecanica central del MVP

El MVP es el generador de cuatro datos. Todo lo demas (PNG, captura,
galeria) existe para servir a esta mecanica.

## Los cuatro datos

1. **Rol** (rol en la historia): peso narrativo o funcion (protagonista,
   deuteragonista, tritagonista, antagonista, mentor...), un sustantivo.
   Ej: Protagonista, Deuteragonista, Mentor. NO es ocupacion ni criatura.
2. **Profesion**: ocupacion concreta, UNA sola en el minimo.
   Ej: Ingeniero informatico, Estudiante universitario. Pluriverbal permitido.
   (Doble profesion `principal / secundaria` = backlog, ver `TABS.md`.)
3. **Mood interno** (como se percibe el): UN adjetivo psicologico. Ej: Atormentado, Resiliente.
4. **Mood externo** (como lo perciben los demas): UN adjetivo psicologico. Ej: Seguro, Amenazante.

La gracia esta en la tension interno/externo: el hueco entre como se ve el
personaje y como lo ve el mundo ES la historia a dibujar
(ej: interno Atormentado + externo Seguro = heroe roto que finge control).

## Reglas

- Rol y profesion nunca se solapan: rol = arquetipo, profesion = oficio.
  Si una carta sirve para ambas listas, va solo a una.
- Moods de una palabra, dibujables: pasan el test "se puede dibujar?".
  Nada abstracto sin lectura visual.
- Segunda profesion opcional = backlog (ver `TABS.md`). El minimo genera una.
- Sin repeticion en sesion (descarte; se resetea al agotar).
- Mazos en `public/data/cuatro_datos.json`: 72 roles, 150 profesiones,
  120 interno, 120 externo = 155,5M de combinaciones por idioma.
- Formato con id estable: `{id, es, en}` + glosa opcional
  `{gloss_es, gloss_en}` (leyenda super breve, max 90 caracteres).
  Cobertura: 232/462 (72 roles + oficios arcaicos + moods ambiguos/cultos
  + 12 dudosos de cierre); resto fuera por regla (se entiende solo).
  la tarjeta muestra ⓘ y la sección Leyenda solo si hay glosa.

## Criterio de leyenda (regla oficial)

Lleva leyenda todo rasgo que un dibujante medio no pueda dibujar sin
dudar; la leyenda responde solo "qué significa ese rasgo en el
personaje", en una línea (cualquiera que la lea dibuja lo mismo).

Test de decisión (una sola sí basta):

1. **¿Es jerga?** Narrativa (Deuteragonista, Heraldo), culta (Pusilánime,
   Abúlico) u oficio arcaico (Boticario, Pregonero, Deshollinador,
   Ventrílocuo, Escriba).
2. **¿Es ambiguo?** Dos lecturas al dibujar (Llano, Gris, Contenido,
   Templado, Natural, Justo).
3. **¿Se confunde con otro?** (Retratista vs Pintor, Dramaturgo vs
   Escritor, Sensible vs Insensible).

Si las tres son no (Granjero, Panadero, Amable) → sin glosa, sin ⓘ.

## Guía de rol (segundo nivel, solo roles)

El rol pide más que una línea: cada rol trae `guide_es/guide_en`
(función narrativa + ejemplo clásico, max 160 caracteres, par completo
o nada). Ej: Deuteragonista → "Segundo peso; refleja o reta al héroe.
Ej: Sancho Panza." Se muestra en cursiva bajo la glosa, en la tarjeta
(ⓘ) y en la Leyenda.

Prohibido en la glosa: instrucciones ("dibújalo con…"), juicios
morales, ejemplos con otras cartas. Par ES+EN completo o nada.
- Traduccion conceptual 1:1, no literal. Listas independientes por idioma.

## Evaluacion de la propuesta

- Rol x profesion evita el cliche ("guerrero elfo"): la originalidad sale
  del cruce, no del talento del usuario.
- Interno/externo es el diferencial real vs generadores random.
- Riesgo: listas rol/profesion que se mezclan; se contiene con la regla de
  no-solapamiento de arriba.
- Riesgo: volumen de contenido como costo S1; contenido con los tamanos
  actuales (suficientes por combinatoria) salvo que el dogfooding pida mas.

## Casos canonicos (rol x profesion son ortogonales)

- Protagonista x Granjero: la historia gira en torno a alguien comun.
- Tritagonista x Directivo: poder alto, peso narrativo bajo.
- Antagonista x Pescador: el mal con oficio humilde, sin uniforme de villano.

Cualquier cruce vale. Si un cruce "no tiene sentido", es un buen brief:
la friccion es el ejercicio.


