import { Store } from "redux";
import FavoritesApi from "../favorites/favorites_api";
import HistoryApi from "../history/history_api";
import { remove } from "../utils/array";
import { SearchItem, SearchQuery, SearchResult, SortGroup } from "./search.types";

export default class SearchApi {
  historyApi?: HistoryApi;
  favoritesApi?: FavoritesApi;
  public store?: Store;

  async init(store: Store) {
    this.store = store;
    this.favoritesApi?.init(store);
  }

  constructor(historyApi?: HistoryApi, favoritesApi?: FavoritesApi) {
    this.historyApi = historyApi;
    this.favoritesApi = favoritesApi;
  }

  async search(query: SearchQuery): Promise<SearchResult> {
    // search resources
    const favoritesPromise = this.favoritesApi?.search(query) ?? Promise.resolve([]);
    const historyPromise = this.historyApi?.search(query) ?? Promise.resolve([]);
    const [favoritesData, historyData] = await Promise.all([favoritesPromise, historyPromise]);
    // convert into SearchItem array
    const favorites = favoritesData.map<SearchItem>((x) => ({ ...x, favorited: true }));
    const history = historyData.map<SearchItem>((x) => ({ ...x, favorited: favorites.some((y) => x.url === y.url) }));
    return { favorites, history };
  }

  async sort(items: SearchItem[]): Promise<SearchItem[]> {
    // group by domain
    const groups: SortGroup[] = [];
    for (const item of items) {
      if (item.url) {
        const count = item.visitCount ?? 0;
        const domain = new URL(item.url).hostname;
        const existing = groups.find((d) => d.domain === domain);
        if (existing) {
          existing.items.push(item);
          existing.count += count;
        } else {
          groups.push({ domain, items: [item], count: count });
        }
      }
    }
    // sort domains by visit count
    groups.sort((a, b) => b.count - a.count);
    // select best candidates from each domain
    const best: SearchItem[] = [];
    for (const { items: _items, count: count } of groups) {
      this.select(this.selectShortest, best, _items, items);
      this.select(this.selectMostVisited, best, _items, items);
      this.select(this.selectMostRecent, best, _items, items);
    }

    return [...best, ...items];
  }

  select(
    selector: (prev: SearchItem, curr: SearchItem) => SearchItem,
    selected: SearchItem[],
    subarray: SearchItem[],
    array: SearchItem[]
  ) {
    try {
      const item = subarray.reduce(selector);
      remove(subarray, item);
      remove(array, item);
      selected.push(item);
    } catch (e) {
    }
  }

  selectShortest(prev: SearchItem, curr: SearchItem): SearchItem {
    return (prev.url?.length || 0) > (curr.url?.length || 0) ? curr : prev;
  }

  selectMostVisited(prev: SearchItem, curr: SearchItem): SearchItem {
    prev.visitCount ??= 0;
    curr.visitCount ??= 0;
    return curr.visitCount > prev.visitCount ? curr : prev;
  }

  selectMostRecent(prev: SearchItem, curr: SearchItem): SearchItem {
    prev.lastVisitTime ??= Number.MAX_SAFE_INTEGER;
    curr.lastVisitTime ??= Number.MAX_SAFE_INTEGER;
    return curr.lastVisitTime < prev.lastVisitTime ? curr : prev;
  }
}
