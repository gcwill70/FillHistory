import { SearchItem } from "../search/search.types";

export interface SearchItemViewProps {
  item: SearchItem;
  selected?: boolean;
  onClick?: () => void;
}

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

export const SearchItemView = (props: SearchItemViewProps) => {
  return (
    <li
      style={{
        ...listItemStyle,
        backgroundColor: props.selected ? "#007bff" : "#f5f5f5",
        color: props.selected ? "white" : "black",
      }}
      onClick={() => props.onClick?.()}
    >
      {props.item.url}
    </li>
  );
};
