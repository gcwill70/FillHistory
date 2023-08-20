import { useDispatch, useSelector } from "react-redux";
import { RootState, historySlice } from "../core";
import HistoryForm from "./history_form";
import HistoryView from "./history_view";

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "9999",
};

const windowStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "80%",
  maxWidth: "800px",
  height: "600px",
  overflowY: "auto",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

export default function HistoryWindow() {
  const show = useSelector((state: RootState) => state.history.window.show);
  const dispatch = useDispatch();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is the overlay itself (not its children)
    if (e.target === e.currentTarget) {
      // Dispatch an action to hide the HistoryWindow
      dispatch(historySlice.actions.windowHide());
    }
  };

  return (
    <div>
      {show && (
        <div style={overlayStyle} onClick={handleOverlayClick}>
          <div style={windowStyle}>
            <div style={containerStyle}>
              <HistoryForm />
              <HistoryView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
