export enum MediaTypes {
  ALL = 'all',
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person',
}

export type MediaType = MediaTypes.MOVIE | MediaTypes.TV | MediaTypes.ALL;
