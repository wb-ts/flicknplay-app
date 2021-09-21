import {Media} from './Media.type';

export interface Recommendation extends Media {
  first_air_date: string;
  name: string;
  networks: Network[];
  origin_country: string[];
  original_name: string;
}

interface Network {
  id: number;
  logo: Logo;
  name: string;
  origin_country: string;
}

interface Logo {
  path: string;
  aspect_ratio: number;
}
