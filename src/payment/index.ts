import ExtPay from "extpay";

export * from "./model";
export * from "./payment_controller";
export * from "./payment_view";

export const extpay = ExtPay("fillhistory");
