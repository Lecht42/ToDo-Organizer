const URL = "localhost:3111/notifications";

export interface NotificationsBody {
  subscription: PushSubscription;
  notificationTime: string;
}

class NotificationsApi {
  static async postNotifications(body: NotificationsBody) {
    const url = `${URL}/sendNotification`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to send notification:", errorData);
        return { errorData };
      }

      const data = await res.json();

      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
}

export default NotificationsApi;
