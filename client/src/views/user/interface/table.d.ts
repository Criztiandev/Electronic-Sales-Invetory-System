/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

interface BaseTableProps<T> {
  base: string;
  name: string;
  invalidateKey: QueryKey;
  columns: ColumnDef<T, any>[];
}
