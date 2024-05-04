import { SearchItem, SearchQuery } from "../search/search.types";
import HistoryApi from "./history_api";

export default class HistoryApiChrome extends HistoryApi {
  async search(query: SearchQuery): Promise<SearchItem[]> {
    const results = await chrome.history.search({ ...query });
    return results.map((item) => ({ ...item }));
  }
}
