import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core";
import { HistoryItem } from "./model/history_item";
import { activeElement } from "../extension/content/listeners/active-element-listener";
import { historySlice } from "./history-slice";

const historyViewStyle: React.CSSProperties = {
  flex: "1 1 auto",
  overflowY: "auto",
};

const resultsListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: "0",
  margin: "0",
  flex: "1 1 auto",
};

const listItemStyle: React.CSSProperties = {
  padding: "10px",
  cursor: "pointer",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  marginBottom: "5px",
  borderRadius: "3px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  transition: "background-color 0.3s ease, color 0.3s ease",
};

export default function HistoryView() {
  const dispatch = useDispatch();
  const { items, selected } = useSelector((state: RootState) => state.history);
  const listRef = useRef<HTMLUListElement | null>(null);

  const select = (item: HistoryItem) => {
    if (activeElement) {
      const old = activeElement.value;
      const start = activeElement.selectionStart ?? 0;
      const end = activeElement.selectionEnd ?? 0;
      activeElement.value =
        old.substring(0, start) + item.url! + old.substring(end);
    }
    dispatch(historySlice.actions.window(false));
    dispatch(historySlice.actions.reset());
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
    <div style={historyViewStyle}>
      <ul id="results-list" style={resultsListStyle} ref={listRef}>
        {items.map((item: HistoryItem, i: number) => (
          <li
            key={`results-list-${i}`}
            style={{
              ...listItemStyle,
              backgroundColor: selected === i ? "#007bff" : "#f5f5f5",
              color: selected === i ? "white" : "black",
            }}
            onClick={() => select(item)}
          >
            {item.url}
          </li>
        ))}
      </ul>
    </div>
  );
}
