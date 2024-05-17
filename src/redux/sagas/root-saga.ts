import { fork } from "redux-saga/effects";
import userStateSaga from "./user/user-saga";
import notificationsSaga from "./notifications/notifications-saga";

function* rootSaga() {
    yield fork(notificationsSaga);
    yield fork(userStateSaga);
}

export default rootSaga;