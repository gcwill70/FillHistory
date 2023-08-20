import { remove } from "../../utils";
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
        domains[domain] ??= [];
        domains[domain].push(item);
      }
    }
    // select best candidates from domain
    const best: HistoryItem[] = [];
    for (const domain in domains) {
      let _items = domains[domain];
      this.select(this.selectShortest, best, _items, items);
      this.select(this.selectMostVisited, best, _items, items);
      this.select(this.selectMostRecent, best, _items, items);
    }

    return [...best, ...items];
  }

  select(
    selector: (prev: HistoryItem, curr: HistoryItem) => HistoryItem,
    selected: HistoryItem[],
    subarray: HistoryItem[],
    array: HistoryItem[]
  ) {
    try {
      const item = subarray.reduce(selector);
      remove(subarray, item);
      remove(array, item);
      selected.push(item);
    } catch (e) {
      console.error(e);
    }
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
