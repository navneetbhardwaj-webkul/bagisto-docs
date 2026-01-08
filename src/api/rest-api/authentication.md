# API Authentication Guide

Bagisto APIs use different authentication methods depending on what you're building:
- **Public APIs** - Use X-STOREFRONT-KEY for read-only storefront access (products, categories, etc.)
- **Customer APIs** - Use Bearer tokens for customer-specific operations (cart, orders, profile)
- **Admin APIs** - Use Bearer tokens for system management (products, inventory, settings)

---

## 1. Public APIs (Storefront)

Public APIs provide read-only access to storefront data without requiring user authentication. These endpoints use the **X-STOREFRONT-KEY** header to identify your application.

### Authentication Method

**Header:** `X-STOREFRONT-KEY`

```
X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx
```

### Who Can Access

- Mobile apps
- Web frontends
- Third-party integrations
- Public-facing applications
- **No user login required**

### Use Cases

- ✅ Browse products and product details
- ✅ List categories and subcategories
- ✅ Get attributes and attribute options
- ✅ View CMS pages and content
- ✅ Get available locales and countries
- ✅ Retrieve shipping and payment methods

### Example Request

```bash
curl -X GET "https://your-domain.com/api/shop/products" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

### Key Characteristics

- 🔓 Read-only access
- 📊 Highly cacheable
- 🚀 No session required
- ⚡ Fast response times
- 🔄 Rate limited (default: 100 requests/minute)

---

## 2. Customer APIs

Customer APIs provide access to customer-specific data after authentication. These endpoints use **Bearer token authentication** issued during customer login (using Laravel Sanctum).

### Authentication Method

**Header:** `Authorization: Bearer <token>`

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Who Can Access

- Authenticated customers only
- **Requires customer login first**
- Uses Laravel Sanctum guard

### Step 1: Customer Login

```bash
curl -X POST "https://your-domain.com/api/customers/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": {
    "id": 1,
    "email": "customer@example.com",
    "name": "John Doe"
  }
}
```

### Step 2: Make Authenticated Request

Use the token from login response:

```bash
curl -X GET "https://your-domain.com/api/shop/customers/addresses" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Use Cases

- ✅ View customer profile
- ✅ Manage customer addresses
- ✅ Add items to cart
- ✅ Manage wishlist
- ✅ Place orders
- ✅ View order history
- ✅ Create product reviews
- ✅ Manage subscriptions

### Key Characteristics

- 👤 User-specific data
- 🔐 Requires authentication
- 📝 Read and write operations
- ⏱️ Session-based (token expires)
- 🚫 Not cacheable (per-user data)

---

## 3. Admin APIs

Admin APIs provide administrative access to manage products, inventory, customers, and system settings. These endpoints use **Bearer token authentication** issued during admin login (using Laravel Sanctum with admin guard).

### Authentication Method

**Header:** `Authorization: Bearer <token>`

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Who Can Access

- Authenticated admin users only
- **Requires admin login first**
- Uses Laravel Sanctum admin guard
- Subject to role-based permissions

### Step 1: Admin Login

```bash
curl -X POST "https://your-domain.com/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "adminpassword123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Administrator",
    "role": "admin"
  }
}
```

### Step 2: Make Authenticated Request

Use the token from login response:

```bash
curl -X GET "https://your-domain.com/api/admin/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Use Cases

- ✅ Create, read, update, delete products
- ✅ Manage categories and attributes
- ✅ Manage inventory and stock
- ✅ View and manage customers
- ✅ Process orders
- ✅ Generate reports
- ✅ Manage system settings
- ✅ Configure shipping and payment methods

### Key Characteristics

- 🔑 Admin-only access
- 🔐 Requires authentication
- 📝 Full CRUD operations
- ⚙️ System management
- 🚫 Not cacheable
- 🔒 Role-based access control

---

## Authentication Summary Table

| API Type | Who Can Access | Authentication | Header | Use Case |
|----------|----------------|-----------------|--------|----------|
| **Public** | Everyone | Storefront Key | `X-STOREFRONT-KEY: pk_...` | Browse products, categories, CMS |
| **Customer** | Logged-in customers | Bearer Token | `Authorization: Bearer ...` | Cart, orders, profile, addresses |
| **Admin** | Logged-in admins | Bearer Token | `Authorization: Bearer ...` | Product management, inventory, reports |

---

## Authentication Strategy

```
Shop & Customer API requests:
├─ X-STOREFRONT-KEY (ALWAYS required)
│  └─ Identifies your app/client
└─ Additional authentication (based on operation):
   ├─ Public operations: None (X-STOREFRONT-KEY only)
   └─ Customer operations: Bearer token (from customer login)

Admin API requests:
├─ NO X-STOREFRONT-KEY
└─ Authorization: Bearer token (from admin login only)
```

---

## Notes for Developers

### Token Management

- **Shop & Customer APIs**: Always include X-STOREFRONT-KEY header plus Bearer token (if customer operation)
- **Admin APIs**: Only include Bearer token - NO X-STOREFRONT-KEY needed
- **Token Expiration**: Bearer tokens expire after a set period (typically 24 hours). Implement token refresh logic
- **Secure Storage**: Store tokens securely using:
  - **Web**: httpOnly cookies (prevents JavaScript access)
  - **Mobile**: Secure device storage (Keychain for iOS, Keystore for Android)
  - **Never**: localStorage or regular variables in JavaScript

### API Characteristics

| Aspect | Public APIs | Customer APIs | Admin APIs |
|--------|-------------|---------------|-----------|
| **Caching** | ✅ Highly cacheable | ❌ Not cacheable | ❌ Not cacheable |
| **Rate Limiting** | ✅ Per-key limit | ✅ Per-customer limit | ✅ Per-admin limit |
| **Response Times** | ⚡ Fast | 📊 Medium | 📊 Medium |
| **Data Type** | 🌍 Public | 👤 User-specific | ⚙️ System-wide |

### Error Responses

```json
// 401 Unauthorized - Missing or invalid token
{
  "message": "Unauthorized",
  "error": "invalid_token"
}

// 403 Forbidden - Valid token but insufficient permissions
{
  "message": "Forbidden",
  "error": "insufficient_permissions"
}

// 429 Too Many Requests - Rate limit exceeded
{
  "message": "Rate limit exceeded",
  "error": "rate_limit_exceeded",
  "retry_after": 35
}
```

### Best Practices

- ✅ Use HTTPS for all requests
- ✅ Implement exponential backoff for retries on rate limit errors
- ✅ Set appropriate timeouts (5-10 seconds)
- ✅ Log authentication errors for debugging (but never log tokens)
- ✅ Validate token expiration before making requests
- ✅ Handle 401/403 errors by prompting user to re-login
- ❌ Never hardcode tokens in source code
- ❌ Never share tokens in logs or error messages
- ❌ Never commit `.env` files with tokens to version control

---

## Generating Storefront Keys

### Generate via Artisan Command

```bash
php artisan bagisto-api:generate-key --name="Web Storefront"
```

Output:
```
Storefront key generated successfully!
Key: pk_storefront_xxxxxxxxxxxxx
```

### Advanced Options

```bash
# Custom rate limit (requests per minute)
php artisan bagisto-api:generate-key --name="Mobile App" --rate-limit=150

# Inactive key (activate later)
php artisan bagisto-api:generate-key --name="Testing" --no-activation
```

---

## Storefront Key Authentication

### Overview

The Shop API requires a **Storefront Key** header (`X-STOREFRONT-KEY`) for **ALL requests**. This authentication method is used to:
- Identify the client/app making the request
- Track rate limits and usage per client
- Manage API access and permissions

**Important**: X-STOREFRONT-KEY is always required. Additional authentication (Bearer token) is only needed for user-specific operations.

### Required Header

**All Shop API requests must include:**

```
X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx
```

**For user-specific operations, also include:**

```
Authorization: Bearer YOUR_CUSTOMER_TOKEN
```

**For admin operations, also include:**

```
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### Usage Examples

#### cURL - Public Operation

```bash
# Browse products (no user token needed)
curl -X GET "https://your-domain.com/api/shop/products" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

#### cURL - User-Specific Operation

```bash
# Get customer addresses (requires user token)
curl -X GET "https://your-domain.com/api/shop/customers/addresses" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

#### Node.js - Public Operation

```javascript
// Browse products (no user token needed)
const response = await fetch('https://your-domain.com/api/shop/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-STOREFRONT-KEY': 'pk_storefront_xxxxxxxxxxxxx'
  }
});

const data = await response.json();
```

#### Node.js - User-Specific Operation

```javascript
// Get customer addresses (requires user token)
const response = await fetch('https://your-domain.com/api/shop/customers/addresses', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-STOREFRONT-KEY': 'pk_storefront_xxxxxxxxxxxxx',
    'Authorization': `Bearer ${customerToken}`
  }
});

const data = await response.json();
```

#### Python - Public Operation

```python
import requests

# Browse products (no user token needed)
response = requests.get(
    'https://your-domain.com/api/shop/products',
    headers={
        'Content-Type': 'application/json',
        'X-STOREFRONT-KEY': 'pk_storefront_xxxxxxxxxxxxx'
    }
)

data = response.json()
```

#### Python - User-Specific Operation

```python
import requests

# Get customer addresses (requires user token)
response = requests.get(
    'https://your-domain.com/api/shop/customers/addresses',
    headers={
        'Content-Type': 'application/json',
        'X-STOREFRONT-KEY': 'pk_storefront_xxxxxxxxxxxxx',
        'Authorization': f'Bearer {customer_token}'
    }
)

data = response.json()
```

#### PHP - Public Operation

```php
<?php
$client = new GuzzleHttp\Client();

// Browse products (no user token needed)
$response = $client->request('GET', 'https://your-domain.com/api/shop/products', [
    'headers' => [
        'Content-Type' => 'application/json',
        'X-STOREFRONT-KEY' => 'pk_storefront_xxxxxxxxxxxxx'
    ]
]);

$data = json_decode($response->getBody(), true);
```

#### PHP - User-Specific Operation

```php
<?php
$client = new GuzzleHttp\Client();

// Get customer addresses (requires user token)
$response = $client->request('GET', 'https://your-domain.com/api/shop/customers/addresses', [
    'headers' => [
        'Content-Type' => 'application/json',
        'X-STOREFRONT-KEY' => 'pk_storefront_xxxxxxxxxxxxx',
        'Authorization' => "Bearer {$customerToken}"
    ]
]);

$data = json_decode($response->getBody(), true);
```

### When to Use Bearer Token

**Bearer Token is NOT required for:**
- ✅ Browsing products
- ✅ Listing categories
- ✅ Getting product details
- ✅ Viewing attributes
- ✅ Public shop information

**Bearer Token IS required for:**
- ❌ Customer login/registration
- ❌ Managing customer profile
- ❌ Managing cart (after items added)
- ❌ Placing orders
- ❌ Managing addresses
- ❌ Viewing order history
- ❌ Creating product reviews

### Getting a Bearer Token

A customer must first login to receive a Bearer token:

```bash
curl -X POST "https://your-domain.com/api/customers/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "YOUR_CUSTOMER_TOKEN",
  "customer": {
    "id": 1,
    "email": "customer@example.com",
    "name": "John Doe"
  }
}
```

Use this token in the `Authorization: Bearer` header for user-specific operations.

### Rate Limiting

Each Storefront Key has a rate limit (default: 100 requests/minute):

- **X-RateLimit-Limit**: Total requests allowed
- **X-RateLimit-Remaining**: Remaining requests this minute
- **X-RateLimit-Reset**: Unix timestamp when limit resets

**Rate limit exceeded (429):**
```json
{
  "message": "Rate limit exceeded",
  "error": "rate_limit_exceeded",
  "retry_after": 35
}
```

### Error Responses

**401 - Missing Key:**
```json
{
  "message": "X-STOREFRONT-KEY header is required",
  "error": "missing_key"
}
```

**403 - Invalid Key:**
```json
{
  "message": "Invalid storefront key",
  "error": "invalid_key"
}
```

### Key Management

**View all keys:**
```sql
SELECT id, name, key, rate_limit, is_active FROM storefront_keys;
```

**Update rate limit:**
```sql
UPDATE storefront_keys SET rate_limit = 200 WHERE id = 1;
```

**Deactivate key:**
```sql
UPDATE storefront_keys SET is_active = 0 WHERE id = 1;
```

**Add IP whitelist:**
```sql
UPDATE storefront_keys 
SET allowed_ips = JSON_ARRAY('203.0.113.1', '203.0.113.2')
WHERE id = 1;
```

## Customer Authentication

### Customer Registration

Register a new customer account.

**Endpoint:**
```
POST /api/customers
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "password_confirmation": "SecurePassword123!",
    "phone": "1234567890"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    password: 'SecurePassword123!',
    password_confirmation: 'SecurePassword123!',
    phone: '1234567890'
  })
});

const customer = await response.json();
console.log(customer);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/customers',
    headers={'Content-Type': 'application/json'},
    json={
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john@example.com',
        'password': 'SecurePassword123!',
        'password_confirmation': 'SecurePassword123!',
        'phone': '1234567890'
    }
)

customer = response.json()
print(customer)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/Customer",
  "@id": "/api/customers/10",
  "@type": "Customer",
  "id": 10,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "status": 1,
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Customer Login

Authenticate a customer and receive bearer token.

**Endpoint:**
```
POST /api/customers/login
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/customers/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePassword123!'
  })
});

const data = await response.json();
localStorage.setItem('authToken', data.access_token);
console.log('Access Token:', data.access_token);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/customers/login',
    headers={'Content-Type': 'application/json'},
    json={
        'email': 'john@example.com',
        'password': 'SecurePassword123!'
    }
)

data = response.json()
print(f"Token: {data['access_token']}")
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Customer",
  "@type": "Token",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "token_type": "Bearer",
  "expires_in": 86400,
  "customer": {
    "id": 10,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  }
}
```

### Verify Authentication Token

Verify if authentication token is still valid.

**Endpoint:**
```
POST /api/customers/verify_token
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers/verify_token" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customers/verify_token', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
console.log('Token valid:', result.is_valid);
```

== Python

```python
import requests

token = 'YOUR_ACCESS_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customers/verify_token',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

result = response.json()
print(f"Token valid: {result['is_valid']}")
```

:::

**Response (200 OK):**

```json
{
  "@type": "TokenVerification",
  "is_valid": true,
  "customer_id": 10,
  "expires_at": "2024-01-21T10:30:00Z"
}
```

## Admin Authentication

### Admin Login

Authenticate admin user and receive admin token.

**Endpoint:**
```
POST /api/admin/login
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPassword123!"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'AdminPassword123!'
  })
});

const data = await response.json();
localStorage.setItem('adminToken', data.access_token);
console.log('Admin Token:', data.access_token);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/admin/login',
    headers={'Content-Type': 'application/json'},
    json={
        'email': 'admin@example.com',
        'password': 'AdminPassword123!'
    }
)

data = response.json()
print(f"Admin Token: {data['access_token']}")
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Admin",
  "@type": "Token",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "admin": {
    "id": 1,
    "name": "Administrator",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## Cart Token Generation

### Create Cart Token

Generate a guest cart token for unauthenticated users.

**Endpoint:**
```
POST /api/carts
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/carts" \
  -H "Content-Type: application/json" \
  -d '{}'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/carts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});

const cart = await response.json();
localStorage.setItem('cartToken', cart.token);
console.log('Cart Token:', cart.token);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/carts',
    headers={'Content-Type': 'application/json'},
    json={}
)

cart = response.json()
print(f"Cart Token: {cart['token']}")
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/Cart",
  "@id": "/api/carts/xyz-token-123",
  "@type": "Cart",
  "token": "xyz-token-123",
  "items": [],
  "total": 0,
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Refresh Token

Refresh expired authentication token.

**Endpoint:**
```
POST /api/refresh_token
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/refresh_token" \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

== Node.js

```javascript
const refreshToken = localStorage.getItem('refreshToken');

const response = await fetch('https://your-domain.com/api/refresh_token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    refresh_token: refreshToken
  })
});

const data = await response.json();
localStorage.setItem('authToken', data.access_token);
console.log('New Token:', data.access_token);
```

== Python

```python
import requests

refresh_token = 'YOUR_REFRESH_TOKEN'

response = requests.post(
    'https://your-domain.com/api/refresh_token',
    headers={'Content-Type': 'application/json'},
    json={'refresh_token': refresh_token}
)

data = response.json()
print(f"New Token: {data['access_token']}")
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Token",
  "@type": "Token",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.new-token...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

## OAuth2 Authentication

### OAuth2 Authorization

Request OAuth2 authorization code.

**Endpoint:**
```
GET /api/oauth/authorize
```

**Query Parameters:**
- `client_id` - Your OAuth application ID
- `redirect_uri` - Callback URL after authorization
- `response_type` - Always "code"
- `scope` - Requested permissions (optional)
- `state` - CSRF protection token

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=https://yourapp.com/callback&response_type=code&state=random-state"
```

== Node.js

```javascript
const params = new URLSearchParams({
  client_id: 'YOUR_CLIENT_ID',
  redirect_uri: 'https://yourapp.com/callback',
  response_type: 'code',
  state: 'random-state-value'
});

window.location.href = `https://your-domain.com/api/oauth/authorize?${params}`;
```

== Python

```python
import requests
from urllib.parse import urlencode

params = {
    'client_id': 'YOUR_CLIENT_ID',
    'redirect_uri': 'https://yourapp.com/callback',
    'response_type': 'code',
    'state': 'random-state-value'
}

auth_url = f"https://your-domain.com/api/oauth/authorize?{urlencode(params)}"
print(f"Visit: {auth_url}")
```

:::

**Response (302 Redirect):**

```
Location: https://yourapp.com/callback?code=AUTH_CODE&state=random-state-value
```

### OAuth2 Token Exchange

Exchange authorization code for access token.

**Endpoint:**
```
POST /api/oauth/token
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "code": "AUTH_CODE",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uri": "https://yourapp.com/callback"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/oauth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    code: 'AUTH_CODE',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    redirect_uri: 'https://yourapp.com/callback'
  })
});

const data = await response.json();
console.log('Access Token:', data.access_token);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/oauth/token',
    headers={'Content-Type': 'application/json'},
    json={
        'grant_type': 'authorization_code',
        'code': 'AUTH_CODE',
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'redirect_uri': 'https://yourapp.com/callback'
    }
)

data = response.json()
print(f"Access Token: {data['access_token']}")
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/OAuthToken",
  "@type": "OAuthToken",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "refresh-token-xyz"
}
```

## Password Management

### Forgot Password

Request password reset for customer account.

**Endpoint:**
```
POST /api/forgot_passwords
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/forgot_passwords" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/forgot_passwords', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/forgot_passwords',
    headers={'Content-Type': 'application/json'},
    json={'email': 'john@example.com'}
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "If that email address is in our database, we will send you an email with password reset instructions."
}
```

### Reset Password

Reset customer password with valid reset token.

**Endpoint:**
```
POST /api/reset_passwords
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/reset_passwords" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "token": "reset-token-from-email",
    "password": "NewPassword123!",
    "password_confirmation": "NewPassword123!"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/reset_passwords', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    token: 'reset-token-from-email',
    password: 'NewPassword123!',
    password_confirmation: 'NewPassword123!'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/reset_passwords',
    headers={'Content-Type': 'application/json'},
    json={
        'email': 'john@example.com',
        'token': 'reset-token-from-email',
        'password': 'NewPassword123!',
        'password_confirmation': 'NewPassword123!'
    }
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Password has been reset successfully"
}
```

### Change Password

Change password for authenticated customer.

**Endpoint:**
```
POST /api/customers/change_password
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers/change_password" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "old_password": "OldPassword123!",
    "new_password": "NewPassword456!",
    "new_password_confirmation": "NewPassword456!"
  }'
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customers/change_password', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    old_password: 'OldPassword123!',
    new_password: 'NewPassword456!',
    new_password_confirmation: 'NewPassword456!'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customers/change_password',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'old_password': 'OldPassword123!',
        'new_password': 'NewPassword456!',
        'new_password_confirmation': 'NewPassword456!'
    }
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Password changed successfully"
}
```

## Token Revocation

### Logout & Revoke Token

Invalidate current authentication token.

**Endpoint:**
```
POST /api/customers/logout
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers/logout" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customers/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

localStorage.removeItem('authToken');
console.log('Logged out successfully');
```

== Python

```python
import requests

token = 'YOUR_ACCESS_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customers/logout',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

print('Logged out successfully')
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Successfully logged out"
}
```

### Admin Logout

Invalidate admin authentication token.

**Endpoint:**
```
POST /api/admin/logout
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/admin/logout" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const token = localStorage.getItem('adminToken');

const response = await fetch('https://your-domain.com/api/admin/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

localStorage.removeItem('adminToken');
console.log('Admin logged out');
```

== Python

```python
import requests

token = 'YOUR_ADMIN_TOKEN'

response = requests.post(
    'https://your-domain.com/api/admin/logout',
    headers={'Authorization': f'Bearer {token}'}
)

print('Admin logged out')
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Successfully logged out"
}
```

## Authentication Headers

### Using Bearer Token

Include bearer token in Authorization header for authenticated requests.

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Using Cart Token

Include cart token in X-Cart-Token header for guest cart operations.

```
X-Cart-Token: YOUR_CART_TOKEN
```

### Using API Key (if available)

Some endpoints may accept API Key authentication.

```
X-API-Key: YOUR_API_KEY
```

## Error Handling

### Authentication Errors

**401 Unauthorized:**

```json
{
  "@context": "/api/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "An error occurred",
  "hydra:description": "Invalid credentials or expired token"
}
```

**403 Forbidden:**

```json
{
  "@context": "/api/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "Access Denied",
  "hydra:description": "Insufficient permissions for this operation"
}
```

## Best Practices

- Store tokens securely (use httpOnly cookies or secure storage)
- Implement token refresh mechanisms before expiration
- Use HTTPS for all authentication requests
- Validate tokens on every request
- Revoke tokens on logout
- Implement rate limiting on authentication endpoints
- Use strong passwords (minimum 8 characters, mixed case, numbers, special characters)

## Related Resources

- [Storefront Key Management](./storefront-key-management.md) - Complete key management guide
- [Customer Management](/api/rest-api/customers)
- [Best Practices](/api/rest-api/best-practices)
- [Shop Resources](/api/rest-api/shop-resources)
