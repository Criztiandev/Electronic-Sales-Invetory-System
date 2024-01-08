import * as z from "zod";

export const DateRangePickerSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});
