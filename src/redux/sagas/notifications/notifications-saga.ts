import { SagaIterator } from "redux-saga";
import { call, takeLatest } from "redux-saga/effects";
import { tryPostNotifications } from "./notifications-actions";
import NotificationsApi, { NotificationsBody } from "../../../utils/classes/api/notifications-api";
import { setupPushSubscription } from "../../../utils/service-workers/setup-push-notifications";

function* postNotifications(action: ReturnType<typeof tryPostNotifications>): SagaIterator {
  try {
    const subscription: PushSubscription = yield call(setupPushSubscription);

    yield call(NotificationsApi.postNotifications, {
      notificationTime: action.payload.toISOString(),
      subscription,
    } as NotificationsBody);
  } catch (e: unknown) {
    console.error(e);
  }
}

function* notificationsSaga(): SagaIterator {
  yield takeLatest(tryPostNotifications.type, postNotifications);
}

export default notificationsSaga;
