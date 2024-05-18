import { AuthState } from "../reducers/auth-slice";
import { RootState } from "../store";

export const selectAuthState = (state: RootState): AuthState => state.auth;

export const selectGoogleUserId = (state: RootState): string | undefined => state.auth.googleAuth?.clientId;
