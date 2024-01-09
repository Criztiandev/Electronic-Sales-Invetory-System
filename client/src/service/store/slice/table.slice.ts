/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import tableReducer from "../reducer/table.reducer";
import { PaginationOption } from "@/interface/api";

export interface TableBaseState {
  payload: Array<any>;
  globalFilter: string;
  columnFilters: any;
  rowSelection: any;
  columnVisibility: any;
  sorting: any;
  pagination: PaginationOption;
}

export interface TableState {
  [key: string]: TableBaseState;
}

const initialState: TableState = {};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableData: tableReducer.handleDataMutation,
    setGlobalFilter: tableReducer.handleGlobalFilter,
    setColumnFilter: tableReducer.handleColumnFilter,
    setRowSelect: tableReducer.handleRowSelect,
    setPagination: tableReducer.handlePagination,
    clearPayload: tableReducer.handleClearPayload,
  },
});

export const {
  setTableData,
  setGlobalFilter,
  setColumnFilter,
  setRowSelect,
  setPagination,
  clearPayload,
} = tableSlice.actions;
export default tableSlice.reducer;
