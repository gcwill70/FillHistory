export interface SearchQuery {
  text: string;
  maxResults?: number | undefined;
  startTime?: number | undefined;
  endTime?: number | undefined;
}

export interface SearchItem {
  typedCount?: number | undefined;
  title?: string | undefined;
  url?: string | undefined;
  lastVisitTime?: number | undefined;
  visitCount?: number | undefined;
  id: string;
  favorited?: boolean;
}

export interface SearchResult {
  favorites: SearchItem[];
  history: SearchItem[];
}

export interface SortQuery {
  items: SearchItem[];
}

export interface SortGroup {
  domain: string;
  count: number;
  items: SearchItem[];
}

export interface SortResult {
  items: SearchItem[];
}
