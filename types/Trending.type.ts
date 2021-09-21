import {Media} from './Media.type';

export interface Trending extends Media {
  first_air_date?: string;
  media_type: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}
