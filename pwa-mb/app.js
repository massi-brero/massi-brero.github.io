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

const main = () => {
  check();
  registerServiceWorker();
};

main();
