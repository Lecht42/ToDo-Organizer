import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authStorage from "../../utils/classes/local-storage/auth-storage";

export interface GoogleAuthResponse {
  credential: string;
  clientId: string;
}

export interface AuthState {
  googleAuth?: GoogleAuthResponse;
}

const storageState: AuthState = authStorage.loadState() as AuthState;

const initialState: AuthState = storageState || {
  googleAuth: undefined,
};

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
