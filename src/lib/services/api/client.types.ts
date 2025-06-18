export type PaginatedResponse<T = unknown> = {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type QueryParams = {
  search?: string;
  page?: number;
  limit?: number;
  sorts?: {
    id: string;
    desc?: boolean;
  }[];
};
