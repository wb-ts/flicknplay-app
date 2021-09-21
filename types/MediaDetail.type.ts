import {MediaTypes} from './MediaTypes.enum';

interface MediaDetailBase {
  backdrop_path: string;
  genres: Genre[];
  homepage: string;
  id: number;
  name: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[] | ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends MediaDetailBase {
  mediaType: MediaTypes.MOVIE;
  adult: boolean;
  budget: number;
  belongs_to_collection: BelongsToCollection;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  video: boolean;
}

export interface TvDetail extends MediaDetailBase {
  mediaType: MediaTypes.TV;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  next_episode_to_air: NextEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  type: string;
  rating: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

interface NextEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path?: any;
  vote_average: number;
  vote_count: number;
}

interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path?: any;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

export type MediaDetail = MovieDetail | TvDetail;
