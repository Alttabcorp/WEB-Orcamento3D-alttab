// Service Worker para Sistema de Orçamentos 3D - ALTTAB Corp
// Versão: 1.0.0

const CACHE_NAME = 'alttab-orcamento3d-v1.0.0';
const STATIC_CACHE_NAME = 'alttab-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'alttab-dynamic-v1.0.0';

// Arquivos essenciais para funcionar offline
const CORE_FILES = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/js/app.js',
  '/js/modules/calculator.js',
  '/js/modules/config.js',
  '/js/modules/pdfGenerator.js',
  '/js/modules/calculadoraInterface.js',
  '/js/modules/interfaceManager.js',
  '/js/utils/formatting.js',
  '/assets/images/logo/logo.png',
  '/assets/icons/icon.jpg',
  '/assets/icons/favicon.ico'
];

// Arquivos externos (CDN) - tentará cache, mas não é crítico
const EXTERNAL_FILES = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Event: Install
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    Promise.all([
      // Cache dos arquivos essenciais
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('📦 Service Worker: Cacheando arquivos essenciais');
        return cache.addAll(CORE_FILES);
      }),
      
      // Tentativa de cache dos arquivos externos
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        console.log('🌐 Service Worker: Tentando cachear recursos externos');
        return Promise.allSettled(
          EXTERNAL_FILES.map(url => 
            cache.add(url).catch(err => 
              console.warn(`⚠️ Não foi possível cachear: ${url}`, err)
            )
          )
        );
      })
    ]).then(() => {
      console.log('✅ Service Worker: Instalação concluída');
      // Força a ativação imediata
      return self.skipWaiting();
    })
  );
});

// Event: Activate
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Ativando...');
  
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Assume controle de todas as abas
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker: Ativação concluída');
    })
  );
});

// Event: Fetch
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições que não são GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Estratégia baseada no tipo de recurso
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
  } else if (isExternalResource(url)) {
    event.respondWith(staleWhileRevalidate(request));
  } else if (isAPICall(url)) {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

// Event: Message (comunicação com a aplicação principal)
self.addEventListener('message', event => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        version: CACHE_NAME,
        status: 'active'
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
      
    case 'UPDATE_CACHE':
      updateCache().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
  }
});

// Estratégia: Cache First
async function cacheFirst(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Só cacheia se a resposta for válida
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Erro na estratégia Cache First:', error);
    
    // Fallback para página offline se disponível
    if (request.destination === 'document') {
      const cache = await caches.open(STATIC_CACHE_NAME);
      return cache.match('/index.html');
    }
    
    throw error;
  }
}

// Estratégia: Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ Rede indisponível, tentando cache:', request.url);
    
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Estratégia: Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Fetch em background para atualizar cache
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.warn('⚠️ Falha ao atualizar cache:', request.url, error);
    return cachedResponse;
  });
  
  // Retorna cache imediatamente se disponível, senão aguarda rede
  return cachedResponse || fetchPromise;
}

// Utilitários de classificação de recursos
function isStaticAsset(url) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff', '.woff2'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext)) ||
         url.pathname.includes('/assets/') ||
         url.pathname === '/' ||
         url.pathname.endsWith('.html');
}

function isExternalResource(url) {
  return url.origin !== self.location.origin;
}

function isAPICall(url) {
  return url.pathname.includes('/api/') ||
         url.pathname.includes('/data/') ||
         url.searchParams.has('api');
}

// Utilitários de gerenciamento de cache
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
}

async function updateCache() {
  const cache = await caches.open(STATIC_CACHE_NAME);
  return cache.addAll(CORE_FILES);
}

// Event: Sync (Background Sync para futuras implementações)
self.addEventListener('sync', event => {
  console.log('🔄 Service Worker: Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implementar sincronização em background se necessário
  console.log('🔄 Executando sincronização em background...');
}

// Event: Push (para futuras notificações)
self.addEventListener('push', event => {
  console.log('📬 Service Worker: Push notification recebida');
  
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nova atualização disponível!',
      icon: '/assets/icons/icon.jpg',
      badge: '/assets/icons/favicon.ico',
      vibrate: [100, 50, 100],
      data: data.data || {},
      actions: [
        {
          action: 'open',
          title: 'Abrir',
          icon: '/assets/icons/icon.jpg'
        },
        {
          action: 'close',
          title: 'Fechar'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(
        data.title || 'ALTTAB Orçamentos 3D',
        options
      )
    );
  }
});

// Event: Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

console.log('🔧 Service Worker: Carregado e pronto!');
