export interface HistoryQuery {
  /** A free-text query to the history service. Leave empty to retrieve all pages. */
  text: string;
  /** Optional. The maximum number of results to retrieve. Defaults to 100. */
  maxResults?: number | undefined;
  /** Optional. Limit results to those visited after this date, represented in milliseconds since the epoch. */
  startTime?: number | undefined;
  /** Optional. Limit results to those visited before this date, represented in milliseconds since the epoch. */
  endTime?: number | undefined;
}
