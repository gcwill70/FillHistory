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
    // select best candidates from domain
    const filtered: HistoryItem[] = [];
    for (const domain in domains) {
      let _items = domains[domain];
      let selected: HistoryItem[] = [];
      selected.push(_items.reduce(this.selectShortest));
      selected.push(_items.reduce(this.selectMostVisited));
      selected.push(_items.reduce(this.selectMostRecent));
      filtered.push(...selected);
    }
    return filtered;
  }

  selectShortest(prev: HistoryItem, curr: HistoryItem): HistoryItem {
    return (prev.url?.length || 0) > (curr.url?.length || 0) ? curr : prev;
  }

  selectMostVisited(prev: HistoryItem, curr: HistoryItem): HistoryItem {
    prev.visitCount ??= 0;
    curr.visitCount ??= 0;
    return curr.visitCount > prev.visitCount ? curr : prev;
  }

  selectMostRecent(prev: HistoryItem, curr: HistoryItem): HistoryItem {
    prev.lastVisitTime ??= Number.MAX_SAFE_INTEGER;
    curr.lastVisitTime ??= Number.MAX_SAFE_INTEGER;
    return curr.lastVisitTime < prev.lastVisitTime ? curr : prev;
  }
}
