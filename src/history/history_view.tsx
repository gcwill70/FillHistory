import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, historySlice } from "../core";
import { HistoryItem } from "./model/history_item";

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
  const { id } = useSelector((state: RootState) => state.activeElement);

  return (
    <div style={historyViewStlye}>
      <ul id="results-list" style={resultsListStyle}>
        {items.map((item: HistoryItem, i: number) => {
          return (
            <li
              style={listItemStyle}
              key={`results-list-${i}`}
              onClick={() => {
                if (id) {
                  let activeElement = document.getElementById(
                    id
                  ) as HTMLElement;
                  if (activeElement.nodeName === "INPUT") {
                    (activeElement as HTMLInputElement).value = item.url!;
                  } else if (activeElement.nodeName === "TEXTAREA") {
                    (activeElement as HTMLTextAreaElement).value = item.url!;
                  }
                }
                dispatch(historySlice.actions.hideWindow());
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
