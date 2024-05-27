import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { tryFetchUserState, tryPutUserState } from "./user-actions";
import UserApi, { PutUserBody } from "../../../utils/classes/api/user-api";
import { setGoalsState } from "../../reducers/goals-slice";
import { setPointsState } from "../../reducers/points-slice";
import { setSettingsState } from "../../reducers/settings-slice";

function* fetchUserState(action: ReturnType<typeof tryFetchUserState>): SagaIterator {
  try {
    if(!action.payload) throw new Error("User id is undefined");

    const res: PutUserBody = (yield call(UserApi.getUserState, action.payload)).data;

    yield put(setSettingsState(res.settings));
    yield put(setPointsState(res.points));
    yield put(setGoalsState(res.goals));

    yield put({ type: "SAVE_STATE" });
  } catch (e: unknown) {
    console.error("Fetch from server failed, loading from localStorage");
    yield put({ type: "LOAD_STATE" });
  }
}

function* putUserState(action: ReturnType<typeof tryPutUserState>): SagaIterator {
  try {
    yield call(UserApi.putUserState, action.payload);
    yield put({ type: "SAVE_STATE" });
  } catch (e: unknown) {
    yield put({ type: "USER_STATE_PUT_FAILED", error: e });
  }
}

export default function* userStorageStateSaga(): SagaIterator {
  yield takeLatest(tryFetchUserState.type, fetchUserState);
  yield takeLatest(tryPutUserState.type, putUserState);
}
