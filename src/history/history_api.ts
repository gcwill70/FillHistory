import { SearchItem, SearchQuery } from "../search/search.types";

export default class HistoryApi {
  search(query: SearchQuery): Promise<SearchItem[]> {
    throw new Error("Not implemented");
  }
}
