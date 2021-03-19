const PUBLIC_VAPID_KEY =
  'BIXZvADhnUQv4aDfYFTLmuaPjzTuoV5tvS5V-Qe7T3kuyvFXNgRXYdfXemnK8QArgG3N4QGKaVWwD4hd35pzwpA';
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const subscription = async () => {
  // Service Worker
  console.log('Registering a Service worker');
  const register = await navigator.serviceWorker.register('/serviceworker.js', {
    scope: '/',
  });
  console.log('New Service Worker');
  const convertedvapidkey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
  // Listen Push Notifications
  console.log('Listening Push Notifications');
  const subscripcion = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedvapidkey,
  });

  console.log(subscripcion);

  // Send Notification
  await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(subscripcion),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Suscrito!');
};

// UI
const form = document.querySelector('#myform');
const message = document.querySelector('#message');
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({ message: message.value }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  form.reset();
});

// Service Worker Support
if ('serviceWorker' in navigator) {
  subscription().catch(err => console.log(err));
}
