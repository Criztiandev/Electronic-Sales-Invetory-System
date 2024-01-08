import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../slice/auth.slice";

interface AuthPayload {
  UID: string | null;
  role: string;
}

const BASE_KEY_UID = import.meta.env.VITE_LOCAL_STORAGE_KEY;
const BASE_KEY_ROLE = import.meta.env.VITE_LOCAL_STORAGE_KEY + "_role";
export default {
  setCredentials: (state: AuthState, action: PayloadAction<AuthPayload>) => {
    state.UID = action.payload.UID;
    state.role = action.payload.role;

    localStorage.setItem(BASE_KEY_UID, JSON.stringify(action.payload.UID));
    localStorage.setItem(BASE_KEY_ROLE, JSON.stringify(action.payload.role));
  },

  revokeCredentials: (state: AuthState) => {
    state.UID = null;
    state.role = null;
    localStorage.removeItem(BASE_KEY_UID);
    localStorage.removeItem(BASE_KEY_ROLE);
  },
};
