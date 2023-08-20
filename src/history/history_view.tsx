import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, historySlice } from "../core";
import { HistoryItem } from "./model/history_item";
import { activeElement } from "../extension/content/listeners/active-element-listener";

const historyViewStlye: React.CSSProperties = {
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
  padding: "5px",
  cursor: "pointer",
  backgroundColor: "#f5f5f5",
  marginBottom: "5px",
  borderRadius: "3px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export default function HistoryView() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.history);

  return (
    <div style={historyViewStlye}>
      <ul id="results-list" style={resultsListStyle}>
        {items.map((item: HistoryItem, i: number) => {
          return (
            <li
              style={listItemStyle}
              key={`results-list-${i}`}
              onClick={() => {
                if (activeElement) {
                  const old = activeElement.value;
                  const start = activeElement.selectionStart ?? 0;
                  const end = activeElement.selectionEnd ?? 0;
                  activeElement.value =
                    old.substring(0, start) + item.url! + old.substring(end);
                }
                dispatch(historySlice.actions.windowHide());
              }}
            >
              {item.url}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
