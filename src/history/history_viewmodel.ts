import { useState } from "react";
import { HistoryItem } from "./model/history_item";
import HistoryApiChrome from "./api/history_api_chrome";
import { HistoryQuery } from "./model/history_query";

export default function HistoryViewModel() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  const api = new HistoryApiChrome();

  async function getItems(query: HistoryQuery) {
    setItems(await api.search(query));
  }

  return {
    getItems: getItems,
    items: items,
  };
}
