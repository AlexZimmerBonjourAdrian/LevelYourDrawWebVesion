export type BriefLang = 'es' | 'en';

export interface Brief {
  readonly id: string;
  readonly lang: BriefLang;
  readonly rol: string;
  readonly profesiones: readonly [string] | readonly [string, string];
  readonly dominaPrimera: boolean;
  readonly interno: string;
  readonly externo: string;
  readonly createdAt: string;
}

export interface Decks {
  readonly roles: readonly string[];
  readonly professions: readonly string[];
  readonly inner: readonly string[];
  readonly outer: readonly string[];
}
