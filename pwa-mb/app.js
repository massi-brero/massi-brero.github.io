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
};

const showLocalNotification = async (title, body, swRegistration) => {
  const options = {
    body,
  };
  swRegistration.showNotification(title, options);
};

const main = () => {
  check();
  const swRegistration = registerServiceWorker();
  const permission = requestNotificationPermission();
  const localNotification = showLocalNotification(
      'Neue Statistiken verfügbar',
      'Bitte aktualisieren Sie die IMVS-Stats App',
      swRegistration);
};

main();
