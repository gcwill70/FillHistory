import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeElement } from "../active-element-content/active_element_controller";
import { ContentState } from "../extension/content/store";
import { SearchItem } from "../search/search.types";
import { searchSlice } from "../search/search_slice";
import { SearchItemView } from "./SearchItemView";

export default function SearchView() {
  const dispatch = useDispatch();
  const {
    search: { items, selected },
  } = useSelector(
    (state: ContentState) => state,
    (l, r) =>
      l.search.items.length === r.search.items.length &&
      l.search.selected === r.search.selected &&
      l.favorites.items.length === r.favorites.items.length
  );
  const listRef = useRef<HTMLDivElement | null>(null);

  const select = (item: SearchItem) => {
    if (activeElement) {
      const old = activeElement.value;
      const start = activeElement.selectionStart ?? 0;
      const end = activeElement.selectionEnd ?? 0;
      activeElement.value =
        old.substring(0, start) + item.url! + old.substring(end);
    }
    dispatch(searchSlice.actions.window(false));
    dispatch(searchSlice.actions.reset());
  };

  // handle item selection
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (selected !== undefined) {
          select(items[selected]);
        }
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [dispatch, items, selected]);

  // handle item selection change
  useEffect(() => {
    if (selected !== undefined && listRef.current) {
      const item = listRef.current.children[selected] as HTMLElement;
      if (item) {
        item.scrollIntoView({
          behavior: "auto",
          block: "nearest",
        });
      }
    }
  }, [selected]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      ref={listRef}
    >
      {items.map((item: SearchItem, i: number) => (
        <div key={`search-item-${i}`} style={{ width: "100%" }}>
          <SearchItemView
            item={item}
            selected={selected === i}
            onClick={() => select(item)}
          />
        </div>
      ))}
    </div>
  );
}
