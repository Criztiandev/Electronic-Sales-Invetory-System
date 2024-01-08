/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryKey } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { HTMLAttributes, InputHTMLAttributes } from "react";

export interface BaseProps extends HTMLAttributes<HTMLElement> {}

// Fields
export interface Fields extends InputHTMLAttributes<HTMLInputElement> {}

// table props
export interface TableProps<T> {
  id: string;
  columns: ColumnDef<T, any>[];
  className?: string;
}

export interface ActionProps<T> {
  id: string | number;
  payload: CellContext<T, any>;
  invalidateKey: QueryKey;
}

export interface ColumnOption<T> {
  id?: string;
  name: keyof T;
  header: string;
  isBadge?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export interface BreadCrumbsItems {
  title: string;
  icon?: JSX.Element;
  path: string;
}
