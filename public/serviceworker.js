console.log('service worker');
// El server worker eschucha

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log(data);
  console.log('Notification Received');
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: '/favicon.ico',
    image: '',
  });
});
