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

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
  };
  swRegistration.showNotification(title, options);
};

const main = async () => {
  check();
  const swRegistration = await registerServiceWorker();
  const permission = await requestNotificationPermission();
  showLocalNotification(
      'Neue Statistiken verfügbar',
      'Bitte aktualisieren Sie die IMVS-Stats App',
      swRegistration);
};

main();
