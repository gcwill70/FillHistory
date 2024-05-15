import { Store } from "redux";
import { FavoriteItem, FavoritesQuery } from "./favorites.types";

export default class FavoritesApi {
  public store?: Store;

  async init(store: Store) {
    this.store = store;
  }

  async search(query: FavoritesQuery): Promise<FavoriteItem[]> {
    let filteredFavorites: FavoriteItem[] = this.store?.getState().favorites.items;

    if (query.text) {
      const searchText = query.text.toLowerCase();
      filteredFavorites = filteredFavorites.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchText) ||
          item.url?.toLowerCase().includes(searchText)
      );
    }
    if (query.maxResults) {
      filteredFavorites = filteredFavorites.slice(0, query.maxResults);
    }
    if (query.startTime) {
      filteredFavorites = filteredFavorites.filter(
        (item) =>
          item.lastVisitTime && item.lastVisitTime >= (query.startTime ?? 0)
      );
    }
    if (query.endTime) {
      filteredFavorites = filteredFavorites.filter(
        (item) =>
          item.lastVisitTime &&
          item.lastVisitTime <= (query.endTime ?? Date.now())
      );
    }

    return filteredFavorites;
  }
}
