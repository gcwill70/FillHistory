import { remove } from "../utils";
import { SearchItem } from "../search/model/search_item";
import { SearchQuery } from "../search/model/search_query";

export default class HistoryApi {
  search(query: SearchQuery): Promise<SearchItem[]> {
    throw new Error("Not implemented");
  }

  async filter(items: SearchItem[]): Promise<SearchItem[]> {
    // group by domain
    const domains: {
      domain: string;
      count: number;
      items: SearchItem[];
    }[] = [];
    for (const item of items) {
      if (item.url) {
        const count = item.visitCount ?? 0;
        const domain = new URL(item.url).hostname;
        const existing = domains.find((d) => d.domain === domain);
        if (existing) {
          existing.items.push(item);
          existing.count += count;
        } else {
          domains.push({ domain, items: [item], count: count });
        }
      }
    }
    // sort domains by visit count
    domains.sort((a, b) => b.count - a.count);
    // select best candidates from each domain
    const best: SearchItem[] = [];
    for (const { items: _items, count: count } of domains) {
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
