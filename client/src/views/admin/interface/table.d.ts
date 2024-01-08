/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

export interface TableStructProps<T> {
  base: string;
  name: string;
  columns: ColumnDef<T, any>[];
}
