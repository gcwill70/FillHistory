import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchItem } from "../search/search.types";
import { searchSlice } from "../search/search_slice";
import { activeElement } from "../active-element-content/active_element_controller";
import { SearchItemView } from "./SearchItemView";

const resultsListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: "0px",
  margin: "0px",
  flex: "1 1 auto",
  flexDirection: "column",
};

export default function SearchView() {
  const dispatch = useDispatch();
  const { items, selected } = useSelector((state: any) => state.search);
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
    <div style={resultsListStyle} ref={listRef}>
      {items.map((item: SearchItem, i: number) => (
        <div key={`results-list-${i}`}>
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
