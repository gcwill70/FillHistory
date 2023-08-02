export interface HistoryItem {
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
