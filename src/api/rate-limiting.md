# Rate Limiting

Bagisto APIs implement rate limiting to ensure fair usage and protect infrastructure from abuse. This guide explains how rate limiting works and how to handle rate limit responses.

## Overview

Rate limiting protects the API from excessive requests by restricting the number of API calls a client can make in a given time window. Each Storefront API Key has its own rate limit quota.

**Default Limits:**
- **Public APIs (Shop)**: 100 requests per minute per API key
- **Customer APIs**: 100 requests per minute per API key
- **Admin APIs**: Configurable (higher limits for admin operations)

## Rate Limit Headers

Every API response includes rate limit information in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1767967200
```

| Header | Description | Type | Example |
|--------|-------------|------|---------|
| `X-RateLimit-Limit` | Maximum requests allowed in the current window | integer | `100` |
| `X-RateLimit-Remaining` | Number of requests remaining in current window | integer | `95` |
| `X-RateLimit-Reset` | Unix timestamp when the rate limit window resets | integer | `1767967200` |

## Rate Limit Window

Rate limits are calculated on a **per-minute basis**:

- The window resets every 60 seconds
- `X-RateLimit-Reset` shows when the current window expires (Unix timestamp)
- After the reset time, your request quota is refreshed

**Example Timeline:**

```
Time: 13:00:00 UTC
Requests made: 5
Remaining: 95
Reset at: 13:01:00 UTC (Unix: 1767967200)

Time: 13:00:30 UTC (30 seconds later)
Requests made: 15 (total: 20)
Remaining: 80
Reset at: 13:01:00 UTC (Unix: 1767967200)

Time: 13:01:00 UTC (reset)
Requests made: 0
Remaining: 100 (quota refreshed!)
Reset at: 13:02:00 UTC (Unix: 1767967200 + 60)
```

## Handling Rate Limit Exceeded

When you exceed the rate limit, you'll receive a **429 Too Many Requests** response:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1767967200
Retry-After: 52
```

**Response Body:**

```json
{
  "message": "Rate limit exceeded",
  "error": "rate_limit_exceeded",
  "retry_after": 52
}
```

| Field | Description | Example |
|-------|-------------|---------|
| `message` | Human-readable error message | `Rate limit exceeded` |
| `error` | Machine-readable error code | `rate_limit_exceeded` |
| `retry_after` | Seconds to wait before retrying | `52` |

## Configuring Rate Limits

### Per-API Key Configuration

Set custom rate limits when creating a Storefront API Key:

```bash
# Create key with custom rate limit (requests per minute)
php artisan bagisto-api:generate-key --name="Mobile App" --rate-limit=500

# Output:
# ✓ API key generated successfully!
# Key: sk_live_xxxxxxxxxxxxx
# Name: Mobile App
# Rate Limit: 500 requests/minute
# Status: Active
```

### Environment Configuration

Set the default rate limit in your `.env` file:

```bash
# .env

# Default rate limit for all new API keys (requests per minute)
BAGISTO_API_RATE_LIMIT=100

# Or configure per API type:
BAGISTO_API_RATE_LIMIT_PUBLIC=100
BAGISTO_API_RATE_LIMIT_CUSTOMER=100
BAGISTO_API_RATE_LIMIT_ADMIN=500
```

### Configuration File

Configure rate limiting in `config/bagisto-api.php`:

```php
return [
    'rate_limit' => [
        // Default rate limit for new keys (requests per minute)
        'default' => env('BAGISTO_API_RATE_LIMIT', 100),
        
        // Per API type limits
        'shop' => env('BAGISTO_API_RATE_LIMIT_PUBLIC', 100),
        'customer' => env('BAGISTO_API_RATE_LIMIT_CUSTOMER', 100),
        'admin' => env('BAGISTO_API_RATE_LIMIT_ADMIN', 500),
        
        // Window duration (in seconds)
        'window' => 60,
        
        // Enable rate limiting
        'enabled' => true,
    ],
];
```

## Checking Current Rate Limit

Use the rate limit headers to monitor your quota:

```javascript
// JavaScript/Fetch
fetch('https://your-domain.com/api/shop/products', {
  headers: {
    'X-STOREFRONT-KEY': 'pk_storefront_xxxxx'
  }
})
.then(response => {
  const limit = response.headers.get('X-RateLimit-Limit');
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('X-RateLimit-Reset');
  
  console.log(`Limit: ${limit}, Remaining: ${remaining}, Reset: ${reset}`);
  
  return response.json();
})
.catch(error => console.error(error));
```

## Best Practices

### 1. Monitor Rate Limit Headers

Always check the `X-RateLimit-Remaining` header to know when you're approaching the limit:

```javascript
async function makeRequest(url, options) {
  const response = await fetch(url, options);
  
  const limit = parseInt(response.headers.get('X-RateLimit-Limit'));
  const remaining = parseInt(response.headers.get('X-RateLimit-Remaining'));
  
  if (remaining < limit * 0.1) {
    console.warn(`Warning: Only ${remaining} requests remaining`);
  }
  
  return response.json();
}
```

### 2. Implement Exponential Backoff

When rate limited, use exponential backoff before retrying:

```javascript
async function makeRequestWithRetry(url, options, maxRetries = 3) {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 60;
        const delay = Math.pow(2, attempt) * retryAfter * 1000;
        
        console.log(`Rate limited. Retrying after ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        attempt++;
        continue;
      }
      
      return response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }
  
  throw new Error('Max retries exceeded');
}
```

### 3. Batch Requests

Combine multiple operations into batch requests to reduce API calls:

```javascript
// ❌ Bad: Multiple requests
for (let id of productIds) {
  const product = await fetch(`/api/shop/products/${id}`);
}

// ✅ Good: Batch request
const products = await fetch('/api/shop/products?ids=1,2,3,4,5');
```

### 4. Cache Responses

Cache API responses to reduce unnecessary requests:

```javascript
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function cachedFetch(url) {
  const now = Date.now();
  const cached = cache.get(url);
  
  if (cached && now - cached.time < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, time: now });
  
  return data;
}
```

### 5. Queue Requests

Spread requests over time to avoid burst traffic:

```javascript
class RequestQueue {
  constructor(rateLimit = 10) {
    this.queue = [];
    this.processing = false;
    this.requestsPerSecond = rateLimit;
  }

  async add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const { request, resolve, reject } = this.queue.shift();
      
      try {
        const result = await request();
        resolve(result);
      } catch (error) {
        reject(error);
      }
      
      // Delay between requests
      await new Promise(r => setTimeout(r, 1000 / this.requestsPerSecond));
    }
    
    this.processing = false;
  }
}

// Usage
const queue = new RequestQueue(10); // 10 requests per second

queue.add(() => fetch('/api/shop/products/1'));
queue.add(() => fetch('/api/shop/products/2'));
queue.add(() => fetch('/api/shop/products/3'));
```

### 6. Handle Rate Limit Gracefully

Provide user feedback when rate limited:

```javascript
async function makeRequestWithFallback(url, options) {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const data = await response.json();
      const waitTime = data.retry_after;
      
      // Show user message
      console.error(`API temporarily unavailable. Please try again in ${waitTime} seconds`);
      
      // Retry after waiting
      await new Promise(r => setTimeout(r, waitTime * 1000));
      return makeRequestWithFallback(url, options);
    }
    
    return response.json();
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
```

## Monitoring Rate Limit Usage

### Track Usage Over Time

```javascript
class RateLimitMonitor {
  constructor() {
    this.stats = {
      totalRequests: 0,
      rateLimitedRequests: 0,
      averageRemaining: 0
    };
  }

  trackResponse(response) {
    const remaining = parseInt(response.headers.get('X-RateLimit-Remaining'));
    const limit = parseInt(response.headers.get('X-RateLimit-Limit'));
    
    this.stats.totalRequests++;
    
    if (response.status === 429) {
      this.stats.rateLimitedRequests++;
    }
    
    this.stats.averageRemaining = 
      (this.stats.averageRemaining * (this.stats.totalRequests - 1) + remaining) / 
      this.stats.totalRequests;
    
    return {
      limitPercentage: Math.round((remaining / limit) * 100),
      status: remaining < limit * 0.2 ? 'warning' : 'ok'
    };
  }

  getReport() {
    const rateLimitPercentage = 
      Math.round((this.stats.rateLimitedRequests / this.stats.totalRequests) * 100);
    
    return {
      totalRequests: this.stats.totalRequests,
      rateLimitedCount: this.stats.rateLimitedRequests,
      rateLimitPercentage: rateLimitPercentage,
      averageRemaining: Math.round(this.stats.averageRemaining)
    };
  }
}
```

## API Key Management

### View Rate Limit Status

Check your API key's rate limit configuration:

```bash
# Check rate limit for a specific key
php artisan bagisto-api:key:manage status --key="Mobile App"

# Output:
# Key:          Mobile App
# Status:       Active
# Rate Limit:   500 requests/minute
# Total Requests (last 24h): 12,450
# Average RPM:  345
```

### Adjust Rate Limit

Update an API key's rate limit:

```bash
# Increase rate limit for high-traffic app
php artisan bagisto-api:generate-key --name="High Traffic App" --rate-limit=2000
```

### List All Keys with Rate Limits

```bash
# Summary of all keys and their limits
php artisan bagisto-api:key:manage summary

# Output:
# Total Keys: 5
# 
# Key Name            | Status   | Rate Limit | Requests (24h)
# ------------------- | -------- | ---------- | ---------------
# Mobile App          | Active   | 500        | 12,450
# Website             | Active   | 200        | 5,230
# Partner API         | Active   | 1000       | 8,945
# Development         | Inactive | 100        | 0
# Testing             | Active   | 50         | 145
```

## Examples

### cURL

```bash
# Check rate limit headers
curl -X GET 'https://your-domain.com/api/shop/products' \
  -H 'X-STOREFRONT-KEY: pk_storefront_xxxxx' \
  -i  # Include headers in output
```

Response:
```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1767967200
```

### Python

```python
import requests
import time

def make_request_with_rate_limit(url, headers):
    response = requests.get(url, headers=headers)
    
    limit = int(response.headers.get('X-RateLimit-Limit', 100))
    remaining = int(response.headers.get('X-RateLimit-Remaining', 100))
    reset = int(response.headers.get('X-RateLimit-Reset', 0))
    
    print(f"Rate Limit: {remaining}/{limit}")
    
    if response.status_code == 429:
        retry_after = int(response.headers.get('Retry-After', 60))
        print(f"Rate limited. Waiting {retry_after} seconds...")
        time.sleep(retry_after)
        return make_request_with_rate_limit(url, headers)
    
    return response.json()
```

### Node.js

```javascript
const axios = require('axios');

async function makeRequest(url, apiKey) {
  try {
    const response = await axios.get(url, {
      headers: {
        'X-STOREFRONT-KEY': apiKey,
      },
    });

    const limit = response.headers['x-ratelimit-limit'];
    const remaining = response.headers['x-ratelimit-remaining'];
    const reset = response.headers['x-ratelimit-reset'];

    console.log(`Rate Limit: ${remaining}/${limit}`);
    console.log(`Resets at: ${new Date(reset * 1000)}`);

    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      console.error(`Rate limited. Retry after ${retryAfter} seconds`);
      
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      return makeRequest(url, apiKey);
    }

    throw error;
  }
}
```

## Troubleshooting

### Frequently Hitting Rate Limits?

1. **Check your request volume**: Review your API usage patterns
2. **Implement caching**: Cache responses to reduce API calls
3. **Request higher limit**: Contact support for rate limit increase
4. **Batch requests**: Combine multiple operations into single calls
5. **Optimize queries**: Use pagination to fetch data efficiently

### Rate Limit Not Resetting

- Verify your server time is synchronized (use NTP)
- Check if you're sending requests with different API keys
- Verify the `X-RateLimit-Reset` timestamp (Unix format)

### Getting 429 Errors Immediately

- Check if your API key has a very low rate limit
- Verify you're sending the correct `X-STOREFRONT-KEY` header
- Wait until the reset time before retrying

## What's Next?

- 🔐 [Authentication Guide](./authentication) - Learn about API authentication
- 🔗 [REST API Guide](./rest-api/introduction.html) - Explore REST API endpoints
- 🔑 [API Key Management](./storefront-api-key-management-guide) - Manage your API keys
- 💡 [Best Practices](./rest-api/best-practices.html) - Performance and security tips
