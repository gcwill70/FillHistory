export interface SearchQuery {
  /** A free-text query to the history service. Leave empty to retrieve all pages. */
  text: string;
  /** Optional. The maximum number of results to retrieve. Defaults to 100. */
  maxResults?: number | undefined;
  /** Optional. Limit results to those visited after this date, represented in milliseconds since the epoch. */
  startTime?: number | undefined;
  /** Optional. Limit results to those visited before this date, represented in milliseconds since the epoch. */
  endTime?: number | undefined;
}

export interface SearchItem {
  /** Optional. The number of times the user has navigated to this page by typing in the address. */
  typedCount?: number | undefined;
  /** Optional. The title of the page when it was last loaded. */
  title?: string | undefined;
  /** Optional. The URL navigated to by a user. */
  url?: string | undefined;
  /** Optional. When this page was last loaded, represented in milliseconds since the epoch. */
  lastVisitTime?: number | undefined;
  /** Optional. The number of times the user has navigated to this page. */
  visitCount?: number | undefined;
  /** The unique identifier for the item. */
  id: string;
}
