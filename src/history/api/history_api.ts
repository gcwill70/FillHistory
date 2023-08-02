import { HistoryItem } from "../model/history_item";
import { HistoryQuery } from "../model/history_query";

export default interface HistoryApi {
  search(query: HistoryQuery): Promise<HistoryItem[]>;
}
