import { PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../slice/modal.slice";

export default {
  toggleModal: (state: ModalState, action: PayloadAction<string>) => {
    const id = action.payload;
    state[id] = { ...state[id], active: !state[id]?.active };
  },

  deleteModalInstance: (state: ModalState, action: PayloadAction<string>) => {
    const id = action.payload;
    delete state[id];
  },
};
