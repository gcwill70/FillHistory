import { SearchItem } from "../search/search.types";

export interface SearchItemViewProps {
  item: SearchItem;
  selected?: boolean;
  onClick?: () => void;
}

export const SearchItemView = (props: SearchItemViewProps) => {
  return (
    <div
      style={{
        padding: "0.25rem 0.25rem",
        cursor: "pointer",
        border: "1px solid #ddd",
        borderRadius: "3px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        transition: "background-color 0.3s ease, color 0.3s ease",
        backgroundColor: props.selected ? "#007bff" : "#f5f5f5",
      }}
      onClick={() => props.onClick?.()}
    >
      <h5 style={{ margin: "0", color: props.selected ? "white" : "black" }}>
        {props.item.url}
      </h5>
      <h6 style={{ margin: "0", color: props.selected ? "#e3e2de" : "gray" }}>{props.item.title}</h6>
    </div>
  );
};
