/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationOption } from "@/interface/api";
import { TableBaseState, TableState } from "../slice/table.slice";
import { PayloadAction } from "@reduxjs/toolkit";

interface ModifiedPayload {
  id: string;
  data: any;
}

interface PaginationPayload {
  id: string;
  data: PaginationOption;
}

const handleAction = (
  state: TableState,
  action: PayloadAction<ModifiedPayload>,
  property: keyof TableBaseState
) => {
  const id = action.payload?.id;
  state[id] = { ...state[id], [property]: action.payload.data };
};

export default {
  handleDataMutation: (
    state: TableState,
    action: PayloadAction<ModifiedPayload>
  ) => {
    handleAction(state, action, "payload");
  },

  handleGlobalFilter: (
    state: TableState,
    action: PayloadAction<ModifiedPayload>
  ) => {
    const id = action.payload.id;
    state[id] = { ...state[id], globalFilter: action.payload.data };
  },

  handleColumnFilter: (
    state: TableState,
    action: PayloadAction<ModifiedPayload>
  ) => {
    const id = action.payload.id;
    state[id] = { ...state[id], columnFilters: action.payload.data };
  },

  handleRowSelect: (
    state: TableState,
    action: PayloadAction<ModifiedPayload>
  ) => {
    const id = action.payload.id;
    state[id] = { ...state[id], rowSelection: action.payload.data };
  },

  handlePagination: (
    state: TableState,
    action: PayloadAction<PaginationPayload>
  ) => {
    const id = action.payload.id;
    state[id] = { ...state[id], pagination: action.payload.data };
  },
};
