import { fork } from "redux-saga/effects";
import userStorageStateSaga from "./user/user-saga";

function* rootSaga() {
    yield fork(userStorageStateSaga);
}

export default rootSaga;