import { HistoryItem, HistoryQuery } from "./history.types";
import HistoryApi from "./history_api";

export default class HistoryApiChrome extends HistoryApi {
  async search(query: HistoryQuery): Promise<HistoryItem[]> {
    const results = await chrome.history.search({ ...query });
    return results.map((item) => ({ ...item }));
  }
}
