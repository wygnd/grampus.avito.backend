export interface IWikiResponse<T = unknown> {
  status: true;
  message: string;
  data: T;
}
