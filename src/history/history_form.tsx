import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { historySlice } from "../core/store/slices/history-slice";

export default function HistoryForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(historySlice.actions.queryStart({ text }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="history-form-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search history"
      />
      <button type="submit">Search</button>
    </form>
  );
}
