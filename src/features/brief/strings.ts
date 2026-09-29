export const STR = {
  es: {
    brand: 'LevelYourDraw',
    new: 'Nuevo brief', stop: 'Detener',
    lockHint: 'Toca una tarjeta para fijarla', unlockHint: 'Toca para soltar y seguir girando',
    empty: 'Pulsa Nuevo brief para empezar.',
    tapToChange: 'Toca un dato para cambiar solo ese',
    legendTitle: 'Leyenda',
    glossWhat: 'Qué significa',
    legend: 'Leyenda',
    lang: 'Idioma del mazo',
    rol: 'Rol', prof: 'Profesión', inner: 'Mood interno', outer: 'Mood externo',
    changeRol: 'Cambiar rol', changeProf: 'Cambiar profesión',
    changeInner: 'Cambiar mood interno', changeOuter: 'Cambiar mood externo',
  },
  en: {
    brand: 'LevelYourDraw',
    new: 'New brief', stop: 'Stop',
    lockHint: 'Tap a card to lock it', unlockHint: 'Tap to release and keep spinning',
    empty: 'Press New brief to start.',
    tapToChange: 'Tap a datum to reroll just that one',
    legendTitle: 'Legend',
    glossWhat: 'What it means',
    legend: 'Legend',
    lang: 'Deck language',
    rol: 'Role', prof: 'Profession', inner: 'Inner mood', outer: 'Outer mood',
    changeRol: 'Reroll role', changeProf: 'Reroll profession',
    changeInner: 'Reroll inner mood', changeOuter: 'Reroll outer mood',
  },
} as const;

export type UiLang = keyof typeof STR;
