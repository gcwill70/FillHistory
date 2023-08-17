import { HistoryItem } from "../model/history_item";
import { HistoryQuery } from "../model/history_query";
import HistoryApi from "./history_api";

export default class HistoryApiChrome extends HistoryApi {
  async search(query: HistoryQuery): Promise<HistoryItem[]> {
    const results = await chrome.history.search({ ...query });
    return results.map((item) => ({ ...item } as HistoryItem));
  }
}
