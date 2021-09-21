import {Media} from './Media.type';

export interface SearchResult extends Media {
  first_air_date?: string;
  gender?: number;
  known_for_department?: string;
  known_for?: KnownFor[];
  media_type: string;
  name?: string;
  origin_country?: any[];
  original_name?: string;
  profile_path?: string;
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
