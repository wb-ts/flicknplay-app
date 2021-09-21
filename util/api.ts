import axios from 'axios';
import Config from 'react-native-config';
import {ContentRating} from '../types/ContentRating.type';
import {Media} from '../types/Media.type';
import {MediaDetail} from '../types/MediaDetail.type';
import {MediaType, MediaTypes} from '../types/MediaTypes.enum';
import {Recommendation} from '../types/Recommendations.type';
import {MovieDbResponse, SimpleResponse} from '../types/Response.type';
import {Trending} from '../types/Trending.type';
import {Video} from '../types/Video.type';
import {SearchResult} from './../types/Search.type';

import {Video_new} from '../types/Video_new.type';
import { version } from 'react';


const baseUrl1 = 'https://apis.flicknplay.com';
const baseUrl = 'https://api.themoviedb.org/3';

const apiKey = `?api_key=${Config.MOVIES_DB_API_KEY}`;

export const getImageUrl = (pathSuffix, width: number = 200) =>
  `https://image.tmdb.org/t/p/w${width}/${pathSuffix}`;

  
  
export function getMediaList(): Promise<Video_new[]> {
  
  
  const url = `${baseUrl1}/api/v1/videos`;
  return get<MovieDbResponse<Video_new>>(url).then(({results}) => {
    return results.map((Video_new) => ({
      ...Video_new,
       // mediaType: mediaType || null,
      }));
    });
}

// export function getMediaList(
// ): Promise<Video_new[]> {
//     debugger
//     const url = `${baseUrl1}/api/v1/titles`;
//   // const url = `https://apis.flicknplay.com/api/v1/titles`;
//   return get<MovieDbResponse<Video_new>>(url).then(({results}) => {
//     return results.map((Video_new) => ({
//       ...Video_new,
//       // mediaType: mediaType || null,
//     }));
//   });
//   // console.log(results[0].id + ": id");

// }

// backup
// export function getMediaList(
//   mediaType: MediaType = MediaTypes.MOVIE,
//   id: string = 'popular',
// ): Promise<Media[]> {
//   const url = `${baseUrl}/${mediaType}/${id}${apiKey}&language=en-US`;
//   return get<MovieDbResponse<Media>>(url).then(({results}) => {
//     return results.map((media) => ({
//       ...media,
//       mediaType: mediaType || null,
//     }));
//   });
// }

export function getDetails(item: Media) {
  const isTv = item.mediaType === MediaTypes.TV;
  return Promise.all([
    getBaseDetails(item),
    isTv ? getRating(item) : null,
  ]).then(([details, rating]) => ({...details, rating: rating as string}));
}

export function getBaseDetails(item: Media) {
  const url = `${baseUrl}/${item.mediaType}/${item.id}${apiKey}&language=en-US`;
  return get<MediaDetail>(url);
}

export function getRating(item: Media): Promise<string> {
  const url = `${baseUrl}/${item.mediaType}/${item.id}/content_ratings${apiKey}&language=en-US`;
  return get<SimpleResponse<ContentRating>>(url).then((response) => {
    const value = response?.results
      .filter(({iso_3166_1}) => iso_3166_1 === 'US')
      .map(({rating}) => rating)
      .shift();
    return value || '';
  });
}

export function getRecommendations(item: Media): Promise<Recommendation[]> {
  const url = `${baseUrl}/${item.mediaType}/${item.id}/recommendations${apiKey}&language=en-US`;
  return get<MovieDbResponse<Recommendation>>(url)
    .then(getResults)
    .then((results) =>
      results.map((result) => ({...result, mediaType: item.mediaType})),
    );
}

export function getSearch(query: string): Promise<SearchResult[]> {
  const url = `${baseUrl}/search/multi${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
  return get<MovieDbResponse<SearchResult>>(url)
    .then(getResults)
    .then(appendMediaType);
}

export function getTrending(page: number = 1): Promise<Trending[]> {
  const url = `${baseUrl}/trending/all/day${apiKey}&page=${page}`;
  return get<MovieDbResponse<Trending>>(url)
    .then(getResults)
    .then(appendMediaType);
}

export function getVideos(item: Media): Promise<Video[]> {
  const url = `${baseUrl}/${item.mediaType}/${item.id}/videos${apiKey}&language=en-US`;
  return get<SimpleResponse<Video>>(url).then(getResults);
}
export function getVideos_new(): Promise<Video_new[]> {
  const url = `${baseUrl1}/api/v1/videos`;
  return get<MovieDbResponse<Video_new>>(url).then(({results}) => {
    return results.map((media) => ({
      ...media,
      
    })
    );
  });
}

async function get<T>(url: string): Promise<T> {
  const {data} = await axios.get<T>(url);
  return data;
}

function getResults(response) {
  return response.results;
}

function appendMediaType(results: any[]): any[] {
  return results.map((result) => ({
    ...result,
    mediaType: result.media_type === 'movie' ? MediaTypes.MOVIE : MediaTypes.TV,
  }));
}
