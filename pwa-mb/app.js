const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker Support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

const registerServiceWorker = () => {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
};

const requestNotificationPermission = async () => {
  const permission = window.Notification.requestPermission();
  log(permission);
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }

  return permission;
};

const main = () => {
  check();
  registerServiceWorker();
  const permission = requestNotificationPermission();
};

main();
