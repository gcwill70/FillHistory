import HistoryApi from "../api/history_api";
import HistoryApiChrome from "../api/history_api_chrome";
import { SearchItem } from "../../search/model/search_item";
import { SearchQuery } from "../../search/model/search_query";

export default class HistoryRepo {
  private api: HistoryApi;

  constructor(api: HistoryApiChrome) {
    this.api = api;
  }

  async search(query: SearchQuery): Promise<SearchItem[]> {
    try {
      return await this.api.search(query);
    } catch (e) {
      console.error(`Exception thrown in HistoryRepo.search():\n${e}`);
      return [];
    }
  }

  async filter(items: SearchItem[]): Promise<SearchItem[]> {
    try {
      return await this.api.filter(items);
    } catch (e) {
      console.error(`Exception thrown in HistoryRepo.filter():\n${e}`);
      return [];
    }
  }
}
