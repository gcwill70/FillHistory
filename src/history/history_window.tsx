import { useSelector } from "react-redux";
import { RootState } from "../core";
import HistoryForm from "./history_form";
import HistoryView from "./history_view";

export default function HistoryWindow() {
  const show = useSelector((state: RootState) => state.history.window.show);
  return (
    <div>
      {show && (
        <div>
          <HistoryForm />
          <HistoryView />
        </div>
      )}
    </div>
  );
}
