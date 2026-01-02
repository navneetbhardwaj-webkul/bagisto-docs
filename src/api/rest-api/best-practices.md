# REST API Best Practices

This guide provides best practices and recommendations for building robust, scalable, and secure applications using the Bagisto REST API.

## Authentication & Security

### 1. Token Management

**Use Bearer Tokens Securely:**

```javascript
// ✅ GOOD: Store token securely
const token = localStorage.getItem('auth_token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

// ❌ BAD: Don't expose tokens in URLs
const url = `https://your-domain.com/api/customers?token=${token}`;

// ❌ BAD: Don't log sensitive tokens
console.log('Token:', token);
```

### 2. Token Refresh & Expiration

Implement token refresh logic before expiration:

```javascript
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('token');
    this.expiresAt = parseInt(localStorage.getItem('expires_at'));
  }

  async ensureTokenValid() {
    if (Date.now() >= this.expiresAt - 60000) { // 1 min buffer
      await this.refreshToken();
    }
  }

  async refreshToken() {
    const response = await fetch(`${this.baseUrl}/refresh-token`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    const data = await response.json();
    this.token = data.access_token;
    this.expiresAt = Date.now() + (data.expires_in * 1000);
    localStorage.setItem('token', this.token);
    localStorage.setItem('expires_at', this.expiresAt);
  }

  async request(endpoint, options = {}) {
    await this.ensureTokenValid();
    return fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        ...options.headers
      }
    });
  }
}
```

### 3. Cart Token Security

Use unique cart tokens for guest users and include them in headers:

```javascript
// Create guest cart
const cartResponse = await fetch(`${API_URL}/cart_tokens`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});

const { id: cartToken } = await cartResponse.json();

// Store securely (not in localStorage for critical apps)
sessionStorage.setItem('cartToken', cartToken);

// Use in subsequent requests
const addToCart = await fetch(`${API_URL}/shop/add-product-in-cart`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Cart-Token': cartToken
  },
  body: JSON.stringify({ product_id: 1, quantity: 2 })
});
```

## Error Handling

### 1. Comprehensive Error Handling

```javascript
class ApiError extends Error {
  constructor(status, data) {
    super(data?.message || 'API Error');
    this.status = status;
    this.data = data;
    this.violations = data?.violations || [];
  }
}

async function makeRequest(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle API errors
      if (error.status === 401) {
        // Handle unauthorized - redirect to login
        window.location.href = '/login';
      } else if (error.status === 422) {
        // Handle validation errors
        console.error('Validation errors:', error.violations);
      } else if (error.status >= 500) {
        // Handle server errors with retry logic
        console.error('Server error, retry later');
      }
    } else {
      // Handle network errors
      console.error('Network error:', error);
    }
    throw error;
  }
}
```

### 2. Validation Error Handling

```javascript
// Parse validation errors from API response
function parseValidationErrors(violations) {
  const errors = {};
  violations?.forEach(violation => {
    errors[violation.propertyPath] = violation.message;
  });
  return errors;
}

// Usage
try {
  await createCustomer(data);
} catch (error) {
  if (error.status === 422) {
    const errors = parseValidationErrors(error.violations);
    displayValidationErrors(errors);
  }
}
```

## Pagination & Data Loading

### 1. Efficient Pagination

```javascript
// ✅ GOOD: Use pagination for large datasets
async function loadProducts(page = 1, itemsPerPage = 20) {
  const response = await fetch(
    `${API_URL}/shop/products?page=${page}&itemsPerPage=${itemsPerPage}`
  );
  const data = await response.json();
  return {
    items: data['hydra:member'],
    totalItems: data['hydra:totalItems'],
    hasNextPage: !!data['hydra:view']['hydra:next']
  };
}

// ❌ AVOID: Fetching all items at once
async function loadAllProducts() {
  const response = await fetch(`${API_URL}/shop/products`);
  const data = await response.json();
  // This loads all products which can be thousands
}
```

### 2. Lazy Loading with Cursor

```javascript
class PaginationManager {
  constructor(apiUrl, endpoint) {
    this.apiUrl = apiUrl;
    this.endpoint = endpoint;
    this.currentPage = 1;
    this.items = [];
    this.totalItems = 0;
  }

  async loadMore() {
    const response = await fetch(
      `${this.apiUrl}${this.endpoint}?page=${this.currentPage}&itemsPerPage=20`
    );
    const data = await response.json();
    
    this.items = [...this.items, ...data['hydra:member']];
    this.totalItems = data['hydra:totalItems'];
    this.currentPage++;
    
    return this.items;
  }

  hasMore() {
    return this.items.length < this.totalItems;
  }
}
```

## Request Optimization

### 1. Batch Operations

```javascript
// ✅ GOOD: Batch add multiple items
async function addMultipleItemsToCart(cartId, items) {
  const response = await fetch(`${API_URL}/shop/add-product-in-cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Cart-Token': cartId
    },
    body: JSON.stringify({ items })
  });
  return response.json();
}

// ❌ AVOID: Multiple requests for same operation
async function addItemsOneByOne(cartId, items) {
  for (const item of items) {
    await fetch(`${API_URL}/shop/add-product-in-cart`, {
      method: 'POST',
      body: JSON.stringify(item)
    });
  }
}
```

### 2. Request Debouncing

```javascript
// Debounce search requests
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage: debounce API calls when typing in search
const debouncedSearch = debounce(async (query) => {
  const products = await searchProducts(query);
  displayResults(products);
}, 500);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### 3. Request Caching

```javascript
class ApiCache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

// Usage
const apiCache = new ApiCache();

async function getProduct(id) {
  const cacheKey = `product_${id}`;
  
  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached) return cached;

  // Fetch from API
  const response = await fetch(`${API_URL}/shop/products/${id}`);
  const product = await response.json();
  
  // Store in cache
  apiCache.set(cacheKey, product);
  
  return product;
}
```

## Performance

### 1. Connection Pooling

```javascript
// Reuse HTTP connections for better performance
const client = {
  baseUrl: 'https://your-domain.com/api',
  headers: {
    'Content-Type': 'application/json'
  },

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: { ...this.headers, ...options.headers }
    });
    return response.json();
  }
};

// Use the same client for all requests
```

### 2. Gzip Compression

```javascript
// Accept compressed responses
const response = await fetch(url, {
  headers: {
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json'
  }
});
```

## Data Validation

### 1. Client-Side Validation Before API Call

```javascript
const schema = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 8,
    requiresUppercase: true
  }
};

function validateCustomer(data) {
  const errors = {};

  if (!schema.email.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (data.password.length < schema.password.minLength) {
    errors.password = 'Password must be at least 8 characters';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Validate before sending to API
const { isValid, errors } = validateCustomer(formData);
if (!isValid) {
  displayErrors(errors);
  return;
}

// Send to API only if valid
await createCustomer(formData);
```

## Rate Limiting Handling

### 1. Respect Rate Limits

```javascript
class RateLimitedApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = [];
    this.processing = false;
    this.requestsPerSecond = 10;
  }

  async request(endpoint, options) {
    return new Promise((resolve, reject) => {
      this.queue.push({ endpoint, options, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const { endpoint, options, resolve, reject } = this.queue.shift();
      
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, options);
        
        // Check rate limit headers
        const remaining = response.headers.get('X-RateLimit-Remaining');
        if (remaining === '0') {
          const reset = response.headers.get('X-RateLimit-Reset');
          const wait = reset * 1000 - Date.now();
          await new Promise(r => setTimeout(r, wait));
        }
        
        resolve(await response.json());
      } catch (error) {
        reject(error);
      }
      
      // Throttle requests
      await new Promise(r => setTimeout(r, 1000 / this.requestsPerSecond));
    }
    
    this.processing = false;
  }
}
```

## Webhook Integration

### 1. Verify Webhook Signature

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return hash === signature;
}

// Express example
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-bagisto-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process webhook
  processEvent(req.body);
  res.json({ success: true });
});
```

## Logging & Monitoring

### 1. Structured Logging

```javascript
class Logger {
  log(level, message, context = {}) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context
    }));
  }

  debug(message, context) {
    this.log('DEBUG', message, context);
  }

  info(message, context) {
    this.log('INFO', message, context);
  }

  error(message, error, context) {
    this.log('ERROR', message, {
      error: error.message,
      stack: error.stack,
      ...context
    });
  }
}

const logger = new Logger();

// Usage
logger.info('Product fetched', { productId: 1, duration: 150 });
logger.error('Failed to create order', error, { cartId: '...' });
```

## Summary of Best Practices

| Practice | Benefit |
|----------|---------|
| Use pagination | Reduce memory usage, improve performance |
| Cache API responses | Decrease latency, reduce API calls |
| Batch operations | Reduce number of requests |
| Handle errors properly | Better user experience, easier debugging |
| Validate input client-side | Catch errors before API call |
| Use secure token storage | Prevent security vulnerabilities |
| Respect rate limits | Avoid service disruptions |
| Log structured data | Easier debugging and monitoring |
| Use HTTPS | Protect data in transit |
| Implement retry logic | Handle transient failures |

## Related Resources

- [REST API Introduction](/api/rest-api/introduction)
- [Shop Resources](/api/rest-api/shop-resources)
- [Cart & Checkout](/api/rest-api/cart-checkout)
- [Customer Management](/api/rest-api/customers)
- [Product Management](/api/rest-api/products)
