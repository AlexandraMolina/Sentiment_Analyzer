if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(() => {
      console.log('Service Worker registrado');
    })
    .catch(error => {
      console.log('Error registering Service Worker:', error);
    });
  }
