import { createSlice } from "@reduxjs/toolkit";
import authReducer from "../reducer/auth.reducer";

export interface AuthState {
  UID: string | null;
  role: string | null;
}
const BASE_KEY_ID = import.meta.env.VITE_LOCAL_STORAGE_KEY;
const BASE_KEY_ROLE = import.meta.env.VITE_LOCAL_STORAGE_KEY + "_role";

const storedID = localStorage.getItem(BASE_KEY_ID);
const storedRole = localStorage.getItem(BASE_KEY_ROLE);

const initialState: AuthState = {
  UID: storedID ? JSON.parse(storedID) : null,
  role: storedRole ? JSON.parse(storedRole) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: authReducer.setCredentials,
    clearCredentials: authReducer.revokeCredentials,
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
