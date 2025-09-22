// RE/MAX NOA Service Worker - Premium PWA
const CACHE_VERSION = 'v1.0.1';
const CACHE_NAME = 'remax-noa-' + CACHE_VERSION;
const STATIC_CACHE = 'remax-noa-static-' + CACHE_VERSION;
const DYNAMIC_CACHE = 'remax-noa-dynamic-' + CACHE_VERSION;
const IMAGE_CACHE = 'remax-noa-images-' + CACHE_VERSION;

// Resources to cache immediately (no bundle.js directo para evitar versiones obsoletas)
const STATIC_RESOURCES = [
  '/',
  '/manifest.json',
  '/assets/REMAX_mastrBalloon_RGB_R.pdf.pdf%20(10%20x%202%20in)%20(1).png',
  '/assets/0122-DSC08806+B.jpg',
  '/assets/0220%20-%20_F6_1138%20B%20(1)%20(1).jpg',
  '/assets/0549%20-%20MAR_6717%20B.jpg',
  '/assets/premiados.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
];

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith('remax-noa-') && 
              !cacheName.includes('v1')
            )
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method === 'GET') {
    // Handle images
    if (request.destination === 'image') {
      event.respondWith(handleImageRequest(request));
    }
    // Handle static assets
    else if (isStaticAsset(request)) {
      event.respondWith(handleStaticAsset(request));
    }
    // Handle navigation requests
    else if (request.mode === 'navigate') {
      event.respondWith(handleNavigation(request));
    }
    // Handle other requests
    else {
      event.respondWith(handleOtherRequests(request));
    }
  }
});

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request, { cacheName: IMAGE_CACHE });
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Image request failed:', error);
    // Return a placeholder image
    return new Response(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#9ca3af" font-size="16">
          Imagen no disponible
        </text>
      </svg>`,
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request, { cacheName: STATIC_CACHE });
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Static asset request failed:', error);
    return caches.match('/');
  }
}

// Handle navigation with network-first strategy
async function handleNavigation(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Navigation request failed:', error);
    const cachedResponse = await caches.match('/');
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback offline page
    return new Response(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sin conexión - RE/MAX NOA</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex; align-items: center; justify-content: center; min-height: 100vh;
            background: linear-gradient(135deg, #1e293b 0%, #2563eb 50%, #e11d48 100%);
            color: white; text-align: center; margin: 0; padding: 20px;
          }
          .offline-container { max-width: 400px; }
          .offline-icon { font-size: 4rem; margin-bottom: 1rem; }
          h1 { font-size: 2rem; margin-bottom: 1rem; font-weight: 800; }
          p { font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9; }
          button { 
            background: rgba(255,255,255,0.2); color: white; border: 2px solid white;
            padding: 12px 24px; border-radius: 25px; font-size: 1rem; font-weight: 600;
            cursor: pointer; transition: all 0.3s ease;
          }
          button:hover { background: rgba(255,255,255,0.3); transform: translateY(-2px); }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <div class="offline-icon">📱</div>
          <h1>Sin conexión</h1>
          <p>No hay conexión a internet disponible. Algunos contenidos pueden no estar actualizados.</p>
          <button onclick="window.location.reload()">Reintentar</button>
        </div>
      </body>
      </html>
    `, { 
      headers: { 'Content-Type': 'text/html' },
      status: 200
    });
  }
}

// Handle other requests with network-first strategy
async function handleOtherRequests(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Other request failed:', error);
    const cachedResponse = await caches.match(request, { cacheName: DYNAMIC_CACHE });
    return cachedResponse || new Response('Service unavailable', { status: 503 });
  }
}

// Check if request is for static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/assets/') || 
         url.pathname.includes('/bundle.js') ||
         url.pathname.includes('/manifest.json') ||
         url.hostname === 'fonts.googleapis.com' ||
         url.hostname === 'fonts.gstatic.com';
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form submissions when online
async function syncContactForm() {
  try {
    // Get stored form submissions from IndexedDB
    const db = await openDB();
    const transaction = db.transaction(['contact-forms'], 'readonly');
    const store = transaction.objectStore('contact-forms');
    const submissions = await store.getAll();
    
    // Send each submission
    for (const submission of submissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission.data)
        });
        
        if (response.ok) {
          // Remove from IndexedDB after successful sync
          const deleteTransaction = db.transaction(['contact-forms'], 'readwrite');
          const deleteStore = deleteTransaction.objectStore('contact-forms');
          await deleteStore.delete(submission.id);
        }
      } catch (error) {
        console.log('Failed to sync submission:', error);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// IndexedDB helper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('remax-noa-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('contact-forms')) {
        db.createObjectStore('contact-forms', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Push notification event
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: '/assets/icon-192x192.png',
    badge: '/assets/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver más',
        icon: '/assets/action-explore.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/assets/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('RE/MAX NOA', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message event for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'content-sync') {
    event.waitUntil(updateContent());
  }
});

// Update content in background
async function updateContent() {
  try {
    // Update critical resources
    const cache = await caches.open(DYNAMIC_CACHE);
    const responses = await Promise.all([
      fetch('/'),
      fetch('/api/properties'),
      fetch('/api/testimonials')
    ]);
    
    responses.forEach((response, index) => {
      if (response.ok) {
        const urls = ['/', '/api/properties', '/api/testimonials'];
        cache.put(urls[index], response.clone());
      }
    });
  } catch (error) {
    console.log('Content update failed:', error);
  }
}

console.log('RE/MAX NOA Service Worker loaded successfully!');