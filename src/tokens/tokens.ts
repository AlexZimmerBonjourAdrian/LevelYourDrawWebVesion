export const colors = {
  bg: '#FAFAF8',
  surface: '#FFFFFF',
  sheet: '#F4F3EF',
  ink: '#111214',
  muted: '#6B6560',
  faint: '#9A9590',
  line: '#E6E2DB',
  accent: '#C0392B',
  accentHover: '#A93226',
} as const;

export const typography = {
  chip: 11,
  footnote: 12,
  secondary: 13,
  body: 15,
  sectionHeader: 18,
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 20, xl: 32 } as const;

export const borderRadius = { md: 10, lg: 14, xl: 20, pill: 999 } as const;

export const TOUCH_MIN = 44;
export const REVEAL_MS = 220;
