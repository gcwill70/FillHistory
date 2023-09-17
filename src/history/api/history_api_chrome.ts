import { SearchItem } from "../../search/model/search_item";
import { SearchQuery } from "../../search/model/search_query";
import HistoryApi from "./history_api";

export default class HistoryApiChrome extends HistoryApi {
  async search(query: SearchQuery): Promise<SearchItem[]> {
    const results = await chrome.history.search({ ...query });
    return results.map((item) => ({ ...item }));
  }
}
