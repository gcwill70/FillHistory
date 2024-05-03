export type Message = {
  type: string;
  payload: any;
};

export type MessageMeta = {
  external?: boolean;
}