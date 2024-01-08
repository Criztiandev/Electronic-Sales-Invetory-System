import { PaginationOption } from "../interfaces/validation.js";

export const validatePaginationOptions = (
  queryParams: any
): PaginationOption => {
  const { size = 10, index = 0, filter } = queryParams;
  return { size: parseInt(size), index: parseInt(index), filter };
};
