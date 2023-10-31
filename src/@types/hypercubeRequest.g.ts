export type HypercubeGetPagedRequest<T> = {
  page: number;
  pageSize: number;
  limit: number;
  filter?: T;
  sort?: HypercubeGetPagedRequestSort[];
};

export type HypercubeGetPagedRequestSort = {
  fieldName: string;
  direction: 'asc' | 'desc';
};

export type HypercubePagedResult<T> = {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
  results: Array<T>;
};

export type HypercubeErrorDetails = {
  statusCode: number;
  errorCode: string;
  messages: string[];
};
