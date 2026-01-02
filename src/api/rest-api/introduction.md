# REST API - Introduction

Welcome to the Bagisto REST API documentation! This guide will help you build modern, efficient e-commerce applications using our comprehensive REST API platform built with **API Platform** and **Laravel**.

## Endpoints and Requests

All Bagisto REST API endpoints follow this pattern:

```
https://{your-domain.com}/api/{resource}
```

API endpoints are organized by resource type. You'll need to use different endpoints depending on your app's requirements.

### Common Endpoint Patterns

| Pattern | Example | Purpose |
|---------|---------|---------|
| `GET /api/{resource}` | `GET /api/shop/products` | List resources with pagination |
| `GET /api/{resource}/{id}` | `GET /api/shop/products/1` | Retrieve a specific resource |
| `POST /api/{resource}` | `POST /api/customers` | Create a new resource |
| `PATCH /api/{resource}/{id}` | `PATCH /api/shop/products/1` | Update a resource |
| `DELETE /api/{resource}/{id}` | `DELETE /api/customer_addresses/5` | Delete a resource |

## What is REST API?

REST (Representational State Transfer) is an architectural style for building web services using HTTP. It provides a simple, stateless interface for building client-server applications with standard HTTP methods (GET, POST, PATCH, DELETE).

**Key Benefits for Bagisto:**
- 🎯 **Standard HTTP Methods** - Familiar REST conventions for all developers
- ⚡ **Efficient Data Transfer** - Optimized payloads with selective field inclusion
- 📱 **Mobile Optimized** - Perfect for native mobile app integrations
- 🔒 **Secure Authentication** - Token-based authentication with Laravel Sanctum
- 📚 **Well-Documented** - Comprehensive OpenAPI/Swagger documentation
- 🛠️ **Developer Friendly** - Consistent API design across all resources

## Architecture Overview

Bagisto's REST API is built using the **API Platform** framework with **Laravel**, providing two distinct API layers:

### 🛍️ Shop API (Frontend)
The public-facing API for customer-facing operations:
- Product browsing and catalog management
- Shopping cart management
- Customer registration and authentication
- Order placement and management
- Address and customer profile management
- Reviews and ratings
- Wishlist and product reviews

### 👨‍💼 Admin API (Backend)
The administrative API for management operations:
- Product and category management
- Customer administration
- Order management and fulfillment
- Inventory management
- System configuration
- Reports and analytics

## Quick Start

### 1. Installation

#### Automatic Setup (Recommended)

Update your `composer.json` to automatically run setup commands after installation:

```json
{
  "scripts": {
    "post-install-cmd": [
      "php artisan api-platform:install",
      "php artisan migrate"
    ],
    "post-update-cmd": [
      "php artisan migrate"
    ]
  },
  "require": {
    "api-platform/laravel": "v4.1.25",
    "api-platform/graphql": "v4.2.3"
  }
}
```

Then simply run:
```bash
composer install
```

#### Manual Setup

If you prefer manual setup, run these commands in order:

```bash
# Install the API Platform Laravel package
composer require api-platform/laravel:v4.1.25

# Install the API Platform GraphQL package
composer require api-platform/graphql:v4.2.3

# Run the API Platform installation
php artisan api-platform:install

# Run migrations
php artisan migrate
```

### 2. Environment Configuration

Update your `.env` file:

```properties
# API Base URL
API_URL=https://your-domain.com/api

# Laravel Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=your-domain.com
SESSION_DOMAIN=your-domain.com
```

### 3. Access the API Documentation

**OpenAPI/Swagger Documentation:**
```
https://your-domain.com/api/docs
```

**ReDoc Alternative:**
```
https://your-domain.com/api/docs.html
```

## API Endpoints Structure

Bagisto REST API follows a hierarchical endpoint structure:

| Category | Base Path | Purpose |
|----------|-----------|---------|
| Shop API | `/api/shop/` | Customer-facing operations |
| Cart Operations | `/api/` | Cart token and checkout management |
| Customer Operations | `/api/` | Customer profiles and addresses |
| Admin API | `/api/admin/` | Administrative operations |

## REST API HTTP Methods

| Method | Purpose | Use Case |
|--------|---------|----------|
| `GET` | Retrieve resources | Fetch single or collection of resources |
| `POST` | Create resource | Create new resource or perform mutations |
| `PATCH` | Partial update | Update specific fields of a resource |
| `DELETE` | Remove resource | Delete a resource |
| `PUT` | Full replace | Replace entire resource |

## Authentication Methods

### 1. Bearer Token Authentication

For authenticated customers and admin users:

```bash
curl -X GET https://your-domain.com/api/customer_profiles \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

Get token via login:
```bash
curl -X POST https://your-domain.com/api/shop/customers/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

### 2. Guest Cart Token

For guest users without authentication:

```bash
curl -X POST https://your-domain.com/api/cart_tokens \
  -H "Content-Type: application/json" \
  -d '{}'
```

Response:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "token": "unique-cart-token"
}
```

Use token in subsequent requests:
```bash
curl -X POST https://your-domain.com/api/shop/add-product-in-cart \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

## Making Your First Request

### Using cURL

```bash
# Get list of products
curl -X GET https://your-domain.com/api/shop/products \
  -H "Content-Type: application/json"

# Create a cart (guest)
curl -X POST https://your-domain.com/api/cart_tokens \
  -H "Content-Type: application/json" \
  -d '{}'

# Add product to cart
curl -X POST https://your-domain.com/api/shop/add-product-in-cart \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: YOUR_CART_TOKEN" \
  -d '{
    "productId": 1,
    "quantity": 1
  }'
```

### Using JavaScript/Fetch

```javascript
// Get products
const response = await fetch('https://your-domain.com/api/shop/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const products = await response.json();
console.log(products);

// Add to cart
const cartResponse = await fetch('https://your-domain.com/api/shop/add-product-in-cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Cart-Token': cartToken
  },
  body: JSON.stringify({
    productId: 1,
    quantity: 2
  })
});

const result = await cartResponse.json();
console.log(result);
```

### Using Python

```python
import requests

# Get products
response = requests.get(
    'https://your-domain.com/api/shop/products',
    headers={'Content-Type': 'application/json'}
)

products = response.json()
print(products)

# Add to cart
cart_response = requests.post(
    'https://your-domain.com/api/shop/add-product-in-cart',
    headers={
        'Content-Type': 'application/json',
        'X-Cart-Token': cart_token
    },
    json={
        'productId': 1,
        'quantity': 2
    }
)

result = cart_response.json()
print(result)
```

## Response Format

All REST API responses follow a consistent JSON format:

### Success Response (200 OK)

```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/shop/products/1",
  "@type": "Product",
  "id": 1,
  "name": "Sample Product",
  "description": "Product description",
  "price": 99.99,
  "status": true,
  "url_key": "sample-product"
}
```

### Collection Response (200 OK)

```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/shop/products",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/products/1",
      "@type": "Product",
      "id": 1,
      "name": "Product 1",
      "price": 99.99
    }
  ],
  "hydra:totalItems": 100,
  "hydra:view": {
    "@id": "/api/shop/products?page=1",
    "@type": "hydra:PartialCollectionView",
    "hydra:first": "/api/shop/products?page=1",
    "hydra:next": "/api/shop/products?page=2",
    "hydra:last": "/api/shop/products?page=10"
  }
}
```

### Error Response (4xx, 5xx)

```json
{
  "@context": "/api/contexts/Error",
  "@type": "Error",
  "hydra:title": "An error occurred",
  "hydra:description": "Validation failed",
  "violations": [
    {
      "propertyPath": "email",
      "message": "This value is not a valid email address."
    }
  ]
}
```

## Common Headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Authorization` | Authentication token | `Bearer eyJhbGc...` |
| `X-Cart-Token` | Guest cart token | `550e8400-e29b-...` |
| `Content-Type` | Request format | `application/json` |
| `Accept-Language` | Locale/Language | `en_US` or `fr_FR` |
| `Accept` | Response format | `application/json` |

## Pagination

REST API uses offset-based pagination with customizable page size:

```bash
# Get products with pagination
curl -X GET "https://your-domain.com/api/shop/products?page=1&itemsPerPage=20" \
  -H "Content-Type: application/json"
```

Query Parameters:
- `page`: Page number (starts at 1)
- `itemsPerPage`: Items per page (default: 30, max: 100)
- `order[field]`: Sort by field (asc or desc)

Response includes pagination metadata:
```json
{
  "hydra:totalItems": 500,
  "hydra:view": {
    "hydra:first": "/api/shop/products?page=1",
    "hydra:next": "/api/shop/products?page=2",
    "hydra:last": "/api/shop/products?page=25"
  }
}
```

## Filtering & Search

API Platform supports powerful filtering with multiple operators:

```bash
# Filter by name
https://your-domain.com/api/shop/products?name=sample

# Filter by price range
https://your-domain.com/api/shop/products?price[gte]=10&price[lte]=100

# Filter by status
https://your-domain.com/api/shop/products?status=true

# Combine multiple filters
https://your-domain.com/api/shop/products?name=sample&status=true&price[gte]=50
```

Supported Operators:
- `=` - Exact match (default)
- `[gt]` - Greater than
- `[gte]` - Greater than or equal
- `[lt]` - Less than
- `[lte]` - Less than or equal

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Guest Requests**: 100 requests per minute per IP
- **Authenticated Requests**: 1000 requests per minute per customer
- **Admin Requests**: 500 requests per minute per admin user

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1702000000
```

## Best Practices

### 1. Error Handling

Always check for errors in responses:

```javascript
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error);
  }
} catch (error) {
  console.error('Network Error:', error);
}
```

### 2. Caching

Implement client-side caching for GET requests:

```javascript
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
}
```

### 3. Pagination Optimization

Always use pagination for large datasets:

```bash
# Instead of this (don't fetch all at once):
GET /api/shop/products

# Do this:
GET /api/shop/products?page=1&itemsPerPage=20
```

### 4. Request Optimization

Use sparse fieldsets to reduce payload:

```bash
# Get only needed fields (when supported)
GET /api/shop/products?fields[]=id&fields[]=name&fields[]=price
```

## What's Next?

- 🛍️ [Shop API Resources](/api/rest-api/shop-resources) - Complete shop operations guide
- 👨‍💼 [Cart & Checkout](/api/rest-api/cart-checkout) - Shopping cart and order management
- 👤 [Customer Management](/api/rest-api/customers) - Customer profiles and addresses
- 📦 [Product Management](/api/rest-api/products) - Product operations and details
- 🔐 [Authentication Guide](/api/rest-api/authentication) - Detailed auth methods
- 💡 [Best Practices](/api/rest-api/best-practices) - Performance and security tips

## Support & Resources

- 🌐 [Interactive Swagger UI](https://demo.bagisto.com/api/docs)
- 📖 [OpenAPI Schema](https://demo.bagisto.com/api/docs.json)
- 💬 [Community Forum](https://forums.bagisto.com)
- 🐛 [Issue Tracker](https://github.com/bagisto/bagisto/issues)
- 📧 [Contact Support](https://bagisto.com/en/contacts/)

---

**Ready to build?** Start with [Shop API Resources](/api/rest-api/shop-resources) or jump to [Cart & Checkout](/api/rest-api/cart-checkout) guide.
- Set up Swagger documentation
- Configure authentication routes

## 📖 Documentation Access

Once installed, access the interactive API documentation:

### Admin API Documentation
```
http://localhost/public/api/admin/documentation
```

### Shop API Documentation  
```
http://localhost/public/api/shop/documentation
```

::: info Interactive Testing
Both documentation interfaces include built-in testing tools. You can authenticate and test API endpoints directly from the browser.
:::

## 🔐 Authentication

The REST API uses Laravel Sanctum for secure token-based authentication:

### Getting an Access Token

1. **Admin Authentication**: Use admin credentials to get admin-level access
2. **Customer Authentication**: Use customer credentials for shop-level access

### Using Tokens

Include the token in your requests:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -H "Accept: application/json" \
     http://localhost/public/api/v1/admin/get
```

## 🎯 Common Use Cases

### Mobile App Development
Build native iOS/Android apps with full e-commerce functionality:

```javascript
// Example: Fetch products for mobile app
fetch('/api/v1/products', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(products => {
  // Display products in your mobile app
});
```

### Third-party Integration
Connect external systems with your Bagisto store:

```php
// Example: Sync product from external system
$response = Http::withToken($token)->post("/api/v1/admin/catalog/products/{$productId}", [
    'name'  => 'Product Name',
    'sku'   => 'PROD-001',
    'price' => 99.99
]);
```

## 🔗 Next Steps

- 📚 Explore the [interactive documentation](https://demo.bagisto.com/bagisto-api-demo-common/api/admin/documentation#/)

::: tip Need GraphQL?
For modern frontend development with flexible queries, consider our [GraphQL API](./graphql-api) instead.
:::
