import { createAction } from "@reduxjs/toolkit";
import { NotificationsBody } from "../../../utils/classes/api/notifications-api";
import moment from "moment";

export const tryPostNotifications = createAction<moment.Moment, "POST_NOTIFICATIONS_REQUESTED">("POST_NOTIFICATIONS_REQUESTED");
