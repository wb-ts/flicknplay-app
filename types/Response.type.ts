export interface MovieDbResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SimpleResponse<T> {
  id: number;
  results: T[];
}
