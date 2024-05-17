import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authStorage from "../../utils/classes/local-storage/auth-storage";
import { AuthState, GoogleAuthResponse } from "../../utils/interfaces/states";

const storageState: AuthState = authStorage.loadState() as AuthState;

export const authInitState = {
  goalLists: [],
};

const initialState: AuthState = storageState || authInitState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGoogleAuth: (state, action: PayloadAction<GoogleAuthResponse>) => {
      state.googleAuth = action.payload;
    },
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
  },
});

export const { setGoogleAuth, setAuthState } = authSlice.actions;

export default authSlice.reducer;
