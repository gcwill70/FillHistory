import HistoryApi from "../api/history_api";
import HistoryApiChrome from "../api/history_api_chrome";
import { HistoryItem } from "../model/history_item";
import { HistoryQuery } from "../model/history_query";

export default class HistoryRepo {
  private api: HistoryApi;

  constructor(api: HistoryApiChrome) {
    this.api = api;
  }

  async search(query: HistoryQuery): Promise<HistoryItem[]> {
    try {
      return await this.api.search(query);
    } catch (e) {
      console.error(`Exception thrown in HistoryRepo.search():\n${e}`);
      return [];
    }
  }

  async filter(items: HistoryItem[]): Promise<HistoryItem[]> {
    try {
      return await this.api.filter(items);
    } catch (e) {
      console.error(`Exception thrown in HistoryRepo.filter():\n${e}`);
      return [];
    }
  }
}
