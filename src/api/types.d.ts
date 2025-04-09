export type HttpResponseType<T = any> = {
  data?: T;
  message: string;
  succflag: number;
};
