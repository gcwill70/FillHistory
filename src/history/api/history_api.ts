import { HistoryItem } from "../model/history_item";
import { HistoryQuery } from "../model/history_query";

export default class HistoryApi {
  search(query: HistoryQuery): Promise<HistoryItem[]> {
    throw new Error("Not implemented");
  }

  async filter(items: HistoryItem[]): Promise<HistoryItem[]> {
    // group by domain
    const domains: Record<string, HistoryItem[]> = {};
    for (const item of items) {
      if (item.url) {
        const url = new URL(item.url);
        const domain = url.hostname;
        console.log(domain)
        if (!domains[domain]) {
          domains[domain] = [];
        }
        domains[domain].push(item);
      }
    }
    // select best candidate from domain
    const filtered: HistoryItem[] = [];
    for (const domain in domains) {
      const _items = domains[domain];
      const selected = _items.reduce(this.selectShortest, _items[0]);
      filtered.push(selected);
    }

    return filtered;
  }

  selectShortest(prev: HistoryItem, curr: HistoryItem): HistoryItem {
    return (prev.url?.length || 0) > (curr.url?.length || 0) ? curr : prev;
  }

  selectMostRecent(prev: HistoryItem, curr: HistoryItem): HistoryItem {
    prev.lastVisitTime ??= Number.MAX_SAFE_INTEGER;
    curr.lastVisitTime ??= Number.MAX_SAFE_INTEGER;
    if (curr.lastVisitTime < prev.lastVisitTime) {
      return curr;
    }
    return prev;
  }
}
