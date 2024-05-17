import { createAction } from "@reduxjs/toolkit";
import { PutUserBody } from "../../../utils/classes/api/user-api";

export const tryFetchUserState = createAction<string, "POST_NOTIFICATIONS_REQUESTED">("POST_NOTIFICATIONS_REQUESTED");
export const tryPutUserState = createAction<PutUserBody, "PUT_USER_STATE_REQUESTED">("PUT_USER_STATE_REQUESTED");
