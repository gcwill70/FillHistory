import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core";
import { premiumSlice } from "./premium_slice";

const layoutStyle: React.CSSProperties = {
  margin: "0px",
  fontSize: "12px",
};

const linkStyle: React.CSSProperties = {
  color: "#0073e6",
  cursor: "pointer",
  textDecoration: "underline",
};

function PremiumCtaView() {
  const paid = useSelector((state: RootState) => state.payment.user.paid);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(premiumSlice.actions.openPage());
  };

  return paid ? (
    <></>
  ) : (
    <div style={layoutStyle}>
      <p>
        Want to save even more keystrokes?{" "}
        <span style={linkStyle} onClick={handleClick}>
          Get Premium!
        </span>
      </p>
    </div>
  );
}

export default PremiumCtaView;
