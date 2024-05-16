import { MouseEvent, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteItem } from "../favorites/favorites.types";
import { favoritesSlice } from "../favorites/favorites_slice";
import { SearchItem } from "../search/search.types";

export interface SearchItemViewProps {
  item: SearchItem;
  selected?: boolean;
  onClick?: () => void;
}

export const SearchItemView = (props: SearchItemViewProps) => {
  const favorites = useSelector(
    (state: any) => state.favorites.items,
    (left, right) => left.length === right.length
  );
  const dispatch = useDispatch();

  const favorited = useMemo(
    () => favorites.some((x: SearchItem) => x.url === props.item.url),
    [favorites]
  );

  const [hovered, setHovered] = useState(false);

  const handleFavorite = (e: MouseEvent<any>) => {
    e.preventDefault();
    const _item: FavoriteItem = { ...props.item };
    if (favorited) {
      dispatch(favoritesSlice.actions.remove(_item));
    } else {
      dispatch(favoritesSlice.actions.add(_item));
    }
  };

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
        backgroundColor: props.selected ? "#007bff" : "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <FaStar
        size={30}
        style={{
          color: favorited || hovered ? "#edeb6f" : "#e3e2de",
          transition: "color 0.3s ease",
        }}
        onClick={handleFavorite}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div style={{ flex: "1 1 auto" }} onClick={() => props.onClick?.()}>
        <h4 style={{ margin: "0", color: props.selected ? "white" : "black" }}>
          {props.item.url}
        </h4>
        <h5 style={{ margin: "0", color: props.selected ? "#e3e2de" : "gray" }}>
          {props.item.title}
        </h5>
      </div>
    </div>
  );
};
