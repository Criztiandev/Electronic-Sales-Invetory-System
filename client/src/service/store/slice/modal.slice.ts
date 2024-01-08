import { createSlice } from "@reduxjs/toolkit";
import modalReducer from "../reducer/modal.reducer";

interface ModalBaseState {
  name: string;
  active: boolean;
}

export interface ModalState {
  [key: string]: ModalBaseState;
}

const initialState: ModalState = {};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState: modalReducer.toggleModal,
    deleteModalInstnace: modalReducer.deleteModalInstance,
  },
});

export const { setModalState, deleteModalInstnace } = modalSlice.actions;
export default modalSlice.reducer;
