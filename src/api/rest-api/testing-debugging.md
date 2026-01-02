# Testing & Debugging REST APIs

This guide covers how to test and debug Bagisto REST API endpoints using various tools and methods.

## API Configuration

The documentation uses centralized API configuration. Update these URLs in `.vitepress/theme/config/api.config.ts`:

```typescript
// REST API Base URL
export const REST_API_URL = 'http://127.0.0.1:8001'

// GraphQL API Base URL
export const GRAPHQL_API_URL = 'http://127.0.0.1:8000'
```

Replace with your actual Bagisto instance URLs, and all documentation examples will automatically use the updated URLs.

## Interactive Testing Tools

### 1. Swagger UI (Built-in)

The fastest way to test REST APIs! Bagisto includes Swagger UI for interactive API documentation.

**Access Swagger UI:**
```
http://your-domain.com/api/docs
```

**Features:**
- ✅ Try API requests directly from the browser
- ✅ Automatic token/authentication handling
- ✅ Request and response inspection
- ✅ Full endpoint documentation
- ✅ Real-time error messages

**Steps to Test:**
1. Navigate to `/api/docs`
2. Click "Authorize" button (top right)
3. Enter your Bearer token or credentials
4. Click any endpoint to expand it
5. Click "Try it out" button
6. Modify parameters as needed
7. Click "Execute" to send the request
8. View response in the UI

### 2. ReDoc Alternative

Alternative API documentation viewer:

```
http://your-domain.com/api/docs.html
```

**Best for:**
- Reading comprehensive endpoint documentation
- Understanding request/response schemas
- Offline documentation reference

### 3. GraphQL Playground (Same Instance)

If GraphQL is enabled on the same instance:

```
http://your-domain.com/graphql
```

**Note:** GraphQL and REST APIs are complementary - use GraphQL for complex queries and mutations, REST APIs for simple CRUD operations.

## Testing with cURL

The most reliable method for API testing and CI/CD pipelines.

### Basic GET Request

```bash
curl -X GET 'http://127.0.0.1:8001/api/shop/locales/1' \
  -H 'Accept: application/json'
```

### GET with Authentication

```bash
curl -X GET 'http://127.0.0.1:8001/api/customer_profiles' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

### POST Request with Body

```bash
curl -X POST 'http://127.0.0.1:8001/api/shop/customers/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

### With Custom Headers

```bash
curl -X POST 'http://127.0.0.1:8001/api/shop/add-product-in-cart' \
  -H 'Content-Type: application/json' \
  -H 'X-Cart-Token: YOUR_CART_TOKEN' \
  -H 'Accept-Language: en_US' \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Extracting Token from Response

```bash
# Login and extract token
TOKEN=$(curl -s -X POST 'http://127.0.0.1:8001/api/shop/customers/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

echo "Token: $TOKEN"

# Use token in subsequent request
curl -X GET 'http://127.0.0.1:8001/api/customer_profiles' \
  -H 'Authorization: Bearer '$TOKEN \
  -H 'Accept: application/json'
```

### Viewing Response Headers

```bash
# Show response headers along with body
curl -i -X GET 'http://127.0.0.1:8001/api/shop/products' \
  -H 'Accept: application/json'
```

### Pretty-Print JSON Response

```bash
# Install jq: apt-get install jq (Linux) or brew install jq (Mac)
curl -s -X GET 'http://127.0.0.1:8001/api/shop/products' \
  -H 'Accept: application/json' | jq
```

## Postman Collection

[Download Postman Collection](https://postman.bagisto.com/bagisto-api.json)

### Setting Up Postman

1. **Import Collection:**
   - Open Postman
   - Click "Import" button
   - Paste collection URL or upload JSON file
   - Click "Import"

2. **Configure Environment Variables:**
   - Click "Environments" (left sidebar)
   - Click "Create"
   - Add variables:
     ```
     base_url: http://127.0.0.1:8001
     access_token: YOUR_TOKEN_HERE
     cart_token: YOUR_CART_TOKEN_HERE
     ```

3. **Run Tests:**
   - Select environment from dropdown
   - Click any request
   - Click "Send"
   - View response in "Body" tab

4. **Using Variables in Requests:**
   ```
   {{base_url}}/api/shop/products
   Authorization: Bearer {{access_token}}
   X-Cart-Token: {{cart_token}}
   ```

## Insomnia Client

Similar to Postman with a cleaner interface:

1. **Create New Request:**
   - Click "+" button
   - Select HTTP method (GET, POST, etc.)
   - Enter URL: `http://127.0.0.1:8001/api/shop/locales/1`

2. **Add Headers:**
   - Click "Header" tab
   - Add: `Accept: application/json`
   - Add: `Authorization: Bearer TOKEN`

3. **Add Body (for POST/PATCH):**
   - Click "Body" tab
   - Select "JSON" format
   - Paste JSON payload

4. **Send Request:**
   - Click "Send" button
   - View response below

## JavaScript/Fetch Testing

Use browser console or Node.js to test:

### Basic Fetch

```javascript
// Simple GET request
fetch('http://127.0.0.1:8001/api/shop/locales/1', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### With Authentication

```javascript
const token = 'YOUR_ACCESS_TOKEN';

fetch('http://127.0.0.1:8001/api/customer_profiles', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  return response.json();
})
.then(data => console.log('Data:', data))
.catch(error => console.error('Error:', error));
```

### POST Request

```javascript
const payload = {
  email: 'customer@example.com',
  password: 'password123'
};

fetch('http://127.0.0.1:8001/api/shop/customers/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
  console.log('Login Response:', data);
  // Extract and store token
  const token = data.access_token;
  localStorage.setItem('token', token);
})
.catch(error => console.error('Error:', error));
```

### Error Handling

```javascript
async function testAPI(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    // Check if response is ok
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`HTTP ${response.status}: ${error.hydra:description || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    return null;
  }
}

// Usage
testAPI('http://127.0.0.1:8001/api/shop/products')
  .then(data => console.log(data));
```

## Browser Network Inspector

Built-in browser tools for API debugging:

### Chrome/Firefox/Edge DevTools

1. **Open DevTools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)

2. **Go to Network Tab:**
   - Click "Network" tab
   - Perform API action in your app
   - Find the API request in the list

3. **Inspect Request:**
   - Click on the request
   - View:
     - **Headers**: Request headers and cookies
     - **Request Body**: POST/PATCH data sent
     - **Response**: JSON response from API
     - **Cookies**: Authentication tokens
     - **Timing**: Performance metrics

4. **Copy as cURL:**
   - Right-click on request
   - Select "Copy" > "Copy as cURL"
   - Paste in terminal to reproduce issue

## Debugging Checklist

When an API request fails, check these items:

### ✅ Authentication Issues
```bash
# Verify token is valid
curl -X GET 'http://127.0.0.1:8001/api/customer_profiles' \
  -H 'Authorization: Bearer YOUR_TOKEN'

# Check token expiration
curl -X POST 'http://127.0.0.1:8001/api/shop/refresh-token' \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

### ✅ CORS Issues
```bash
# Check if CORS headers are present
curl -i -X OPTIONS 'http://127.0.0.1:8001/api/shop/products' \
  -H 'Origin: http://localhost:3000'

# Response should include:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
```

### ✅ Content-Type Issues
```bash
# Always include Content-Type for POST/PATCH
curl -X POST 'http://127.0.0.1:8001/api/shop/customers/login' \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"pass"}'
```

### ✅ Invalid Payload
```bash
# Validate JSON before sending
echo '{"email":"user@example.com","password":"pass"}' | jq .

# Check for missing required fields
curl -X POST 'http://127.0.0.1:8001/api/shop/customers' \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com"}' # Missing password
```

### ✅ Rate Limiting
```bash
# Check rate limit headers
curl -i -X GET 'http://127.0.0.1:8001/api/shop/products' \
  -H 'Accept: application/json'

# Response headers:
# X-RateLimit-Limit: 1000
# X-RateLimit-Remaining: 999
# X-RateLimit-Reset: 1702000000

# If limit exceeded: wait until Reset time
```

### ✅ Timeout Issues
```bash
# Increase timeout for slow requests
curl --max-time 30 -X GET 'http://127.0.0.1:8001/api/shop/products?itemsPerPage=1000'

# Node.js timeout
fetch(url, { signal: AbortSignal.timeout(5000) })
```

## Common Error Responses

### 401 Unauthorized
```json
{
  "@context": "/api/contexts/Error",
  "@type": "Error",
  "hydra:title": "Unauthorized",
  "hydra:description": "Invalid token or missing Authorization header"
}
```
**Solution:** Check token validity, refresh if expired, re-authenticate

### 403 Forbidden
```json
{
  "@context": "/api/contexts/Error",
  "@type": "Error",
  "hydra:title": "Forbidden",
  "hydra:description": "Access denied to this resource"
}
```
**Solution:** User doesn't have permission, check roles and ACL

### 404 Not Found
```json
{
  "@context": "/api/contexts/Error",
  "@type": "Error",
  "hydra:title": "Not Found",
  "hydra:description": "Resource not found"
}
```
**Solution:** Verify endpoint path and resource ID exist

### 422 Unprocessable Entity
```json
{
  "@context": "/api/contexts/ConstraintViolationList",
  "@type": "ConstraintViolationList",
  "hydra:title": "Validation Failed",
  "violations": [
    {
      "propertyPath": "email",
      "message": "This value is not a valid email address."
    }
  ]
}
```
**Solution:** Check request payload validation, ensure required fields are present and valid

### 429 Too Many Requests
```json
{
  "@context": "/api/contexts/Error",
  "@type": "Error",
  "hydra:title": "Rate Limit Exceeded",
  "hydra:description": "Too many requests. Try again later."
}
```
**Solution:** Wait for rate limit reset, implement exponential backoff

## REST vs GraphQL Testing

### When to Use REST APIs
- ✅ Simple CRUD operations (Create, Read, Update, Delete)
- ✅ Fetching single resources by ID
- ✅ Standard HTTP operations
- ✅ File uploads/downloads
- ✅ Mobile apps with limited bandwidth

### When to Use GraphQL
- ✅ Complex nested data queries
- ✅ Multiple resources in single request
- ✅ Client-defined response structure
- ✅ Real-time subscriptions
- ✅ Reducing over-fetching

**Testing both:**
```bash
# REST - Get single locale
curl -X GET 'http://127.0.0.1:8001/api/shop/locales/1'

# GraphQL - Query with flexibility
curl -X POST 'http://127.0.0.1:8001/graphql' \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ locale(id:1) { id code name direction } }"}'
```

## Monitoring API Performance

### Response Time Tracking

```bash
# Measure endpoint response time
time curl -s -X GET 'http://127.0.0.1:8001/api/shop/products?page=1' \
  -H 'Accept: application/json' | jq . > /dev/null

# Output: real 0m0.234s (234ms)
```

### Load Testing with Apache Bench

```bash
# Install: apt-get install apache2-utils

# Test endpoint with 100 requests, 10 concurrent
ab -n 100 -c 10 'http://127.0.0.1:8001/api/shop/products'
```

### Load Testing with wrk

```bash
# Install: apt-get install wrk or brew install wrk

# Test with 4 threads, 100 connections, 30 second duration
wrk -t4 -c100 -d30s 'http://127.0.0.1:8001/api/shop/products'
```

## Automated Testing with Jest

```javascript
describe('REST API - Locales', () => {
  const baseURL = 'http://127.0.0.1:8001';

  test('GET single locale', async () => {
    const response = await fetch(`${baseURL}/api/shop/locales/1`);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.id).toBe(1);
    expect(data).toHaveProperty('code');
    expect(data).toHaveProperty('name');
  });

  test('Invalid locale ID returns 404', async () => {
    const response = await fetch(`${baseURL}/api/shop/locales/9999`);
    expect(response.status).toBe(404);
  });
});
```

## API Documentation Schema

Access the OpenAPI schema for automated tools:

```
http://your-domain.com/api/docs.json
```

This JSON schema can be used with:
- Swagger/OpenAPI tools
- API code generators
- Documentation generators
- API testing frameworks

## Next Steps

- 🧪 [Run tests](https://github.com/bagisto/bagisto#testing)
- 📊 [Monitor performance](/api/rest-api/best-practices#performance)
- 🔒 [Secure your API](/api/rest-api/best-practices#security)
- 📚 [Explore endpoints](/api/rest-api/shop-resources)

## Resources

- 🌐 [Swagger UI](http://demo.bagisto.com/api/docs)
- 📖 [OpenAPI Schema](http://demo.bagisto.com/api/docs.json)
- 🔗 [Postman Collection](https://postman.bagisto.com/bagisto-api.json)
- 💬 [Community Forum](https://forums.bagisto.com)
- 🐛 [Report Issues](https://github.com/bagisto/bagisto/issues)
