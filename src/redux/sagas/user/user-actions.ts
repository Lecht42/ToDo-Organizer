import { createAction } from "@reduxjs/toolkit";
import { PutUserBody } from "../../../utils/classes/api/user-api";

export const tryFetchUserState = createAction<string, "FETCH_USER_STATE_REQUESTED">("FETCH_USER_STATE_REQUESTED");
export const tryPutUserState = createAction<PutUserBody, "PUT_USER_STATE_REQUESTED">("PUT_USER_STATE_REQUESTED");
