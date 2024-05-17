import { REACT_APP_VAPID_PUBLIC_KEY } from "../../credintials/credintials";

export const setupPushSubscription = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const registration = await navigator.serviceWorker.register("/service-worker.js");

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(REACT_APP_VAPID_PUBLIC_KEY),
    });

    return subscription;
  } else {
    throw new Error("Push messaging is not supported");
  }
};

function urlBase64ToUint8Array(base64String: string | any[] | undefined) {
  if (!base64String) throw new Error("base64String is undefined");
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
