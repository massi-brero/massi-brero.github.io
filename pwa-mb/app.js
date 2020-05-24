const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker Support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

const registerServiceWorker = async () => {
  return await navigator.serviceWorker.register("./service-worker.js");
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }

  return permission;
};

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: "vibration-sample",
  };

  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification(title, options).then((NotificationEvent) => {
      console.log(NotificationEvent);
    });
  });
};

const main = async () => {
  check();
  const swRegistration = await registerServiceWorker();
};

const startNotifications = async () => {
  const permission = await requestNotificationPermission();
  if (permission === "granted") {
    showLocalNotification(
      "Neue Statistiken verfügbar",
      "Bitte aktualisieren Sie die IMVS-Stats App"
    );
  }
};

main().then(() => {
  console.log("application started");
});
