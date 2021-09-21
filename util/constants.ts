import {ListOption} from '../types/ListOption.type';
import {MediaTypes} from '../types/MediaTypes.enum';

export const homeLists: ListOption[] = [
  {
    mediaType: MediaTypes.MOVIE,
    id: 'popular',
    title: 'Popular Movies',
  },
  {
    mediaType: MediaTypes.TV,
    id: 'popular',
    title: 'Popular TV Shows',
  },
  {
    mediaType: MediaTypes.MOVIE,
    id: 'now_playing',
    title: 'Latest Movies',
  },
  {
    mediaType: MediaTypes.TV,
    id: 'on_the_air',
    title: 'Latest TV Shows',
  },
  {
    mediaType: MediaTypes.MOVIE,
    id: 'upcoming',
    title: 'Upcoming Movies',
  },
  {
    mediaType: MediaTypes.TV,
    id: 'airing_today',
    title: 'New Episodes',
  },
];
