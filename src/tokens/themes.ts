export type ThemeName = 'dark' | 'light';

export interface ThemeClasses {
  readonly page: string;
  readonly bar: string;
  readonly faint: string;
  readonly muted: string;
  readonly card: string;
  readonly chip: string;
  readonly value: string;
  readonly input: string;
  readonly activeSeg: string;
}

export const THEMES: Record<ThemeName, ThemeClasses> = {
  dark: {
    page: 'bg-[#141210] text-[#F2EDE6]',
    bar: 'bg-[#141210] border-[#2E2A26]',
    faint: 'text-[#6E675F]',
    muted: 'text-[#A8A099]',
    card: 'bg-[#1E1B18] border-[#2E2A26]',
    chip: 'border-[#2E2A26] text-[#A8A099]',
    value: 'text-[#F2EDE6]',
    input: 'bg-[#1E1B18] border-[#2E2A26] text-[#A8A099]',
    activeSeg: 'bg-[#F2EDE6] text-[#141210]',
  },
  light: {
    page: 'bg-[#FAFAF8] text-[#111214]',
    bar: 'bg-[#FAFAF8] border-[#E6E2DB]',
    faint: 'text-[#9A9590]',
    muted: 'text-[#6B6560]',
    card: 'bg-white border-[#E6E2DB]',
    chip: 'border-[#E6E2DB] text-[#6B6560]',
    value: 'text-[#111214]',
    input: 'bg-white border-[#E6E2DB] text-[#6B6560]',
    activeSeg: 'bg-[#111214] text-white',
  },
};
