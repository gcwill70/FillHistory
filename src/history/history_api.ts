import { HistoryItem, HistoryQuery } from "./history.types";

export default class HistoryApi {
  search(query: HistoryQuery): Promise<HistoryItem[]> {
    throw new Error("Not implemented");
  }
}
