# Shop API Resources

The Shop API provides comprehensive endpoints for customer-facing e-commerce operations. This resource covers product browsing, catalog management, and basic shop information.

## Authentication

All Shop API endpoints require the `X-STOREFRONT-KEY` header for authentication.

### Getting Your Storefront Key

To use the Shop APIs, you need a Storefront Key. Generate one using the Artisan command:

```bash
php artisan bagisto-api:generate-key --name="Web Storefront"
```

This will output a key in the format: `pk_storefront_xxxxx`

### Headers Required

All requests must include:
```
X-STOREFRONT-KEY: pk_storefront_xxxxx
Content-Type: application/json
```

### Rate Limiting

- **Default limit**: 100 requests per minute per key
- **Response headers**: Each response includes rate limit information
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Remaining requests this minute
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

### Error Responses

**401 - Missing Key**
```json
{
  "message": "X-STOREFRONT-KEY header is required",
  "error": "missing_key"
}
```

**403 - Invalid Key**
```json
{
  "message": "Invalid storefront key",
  "error": "invalid_key"
}
```

**429 - Rate Limit Exceeded**
```json
{
  "message": "Rate limit exceeded",
  "error": "rate_limit_exceeded",
  "retry_after": 35
}
```

## Products

### List Products

Retrieve a paginated collection of products.

**Endpoint:**
```
GET /api/shop/products
```

**Headers:**
```
X-STOREFRONT-KEY: pk_storefront_xxxxx
Content-Type: application/json
```

**Parameters:**
- `page`: Page number (default: 1)
- `itemsPerPage`: Items per page (default: 30, max: 100)
- `name`: Filter by product name
- `status`: Filter by status (true/false)

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/products?page=1&itemsPerPage=10" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxx"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/products?page=1&itemsPerPage=10', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-STOREFRONT-KEY': 'pk_storefront_xxxxx'
  }
});

const data = await response.json();
console.log(data);
```

== Python

```python
import requests

response = requests.get(
    'https://your-domain.com/api/shop/products',
    params={'page': 1, 'itemsPerPage': 10},
    headers={
        'Content-Type': 'application/json',
        'X-STOREFRONT-KEY': 'pk_storefront_xxxxx'
    }
)

data = response.json()
print(data)
```

== PHP

```php
<?php
$client = new GuzzleHttp\Client();

$response = $client->request('GET', 'https://your-domain.com/api/shop/products', [
    'query' => [
        'page' => 1,
        'itemsPerPage' => 10
    ],
    'headers' => [
        'Content-Type' => 'application/json',
        'X-STOREFRONT-KEY' => 'pk_storefront_xxxxx'
    ]
]);

$data = json_decode($response->getBody(), true);
print_r($data);
```

:::

**Response (200 OK):**

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
      "sku": "SKU-001",
      "name": "Premium Wireless Headphones",
      "price": "199.99",
      "status": true,
      "url_key": "premium-wireless-headphones"
    }
  ],
  "hydra:totalItems": 150,
  "hydra:view": {
    "hydra:first": "/api/shop/products?page=1",
    "hydra:next": "/api/shop/products?page=2",
    "hydra:last": "/api/shop/products?page=8"
  }
}
```

### Get Product Details

Retrieve comprehensive information about a specific product.

**Endpoint:**
```
GET /api/shop/products/{id}
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/products/1" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const productId = 1;
const response = await fetch(`https://your-domain.com/api/shop/products/${productId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const product = await response.json();
console.log(product);
```

== Python

```python
import requests

product_id = 1
response = requests.get(
    f'https://your-domain.com/api/shop/products/{product_id}',
    headers={'Content-Type': 'application/json'}
)

product = response.json()
print(product)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/shop/products/1",
  "@type": "Product",
  "id": 1,
  "sku": "SKU-001",
  "name": "Premium Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "short_description": "Best in class wireless audio",
  "price": "199.99",
  "cost": "100.00",
  "status": true,
  "type": "simple",
  "weight": "0.25",
  "url_key": "premium-wireless-headphones"
}
```

### Create Product

Create a new product in the catalog (admin only).

**Endpoint:**
```
POST /api/shop/products
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "sku": "NEW-PRODUCT-001",
    "name": "New Product",
    "description": "Product description",
    "price": "99.99",
    "cost": "50.00",
    "status": true
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
  },
  body: JSON.stringify({
    sku: 'NEW-PRODUCT-001',
    name: 'New Product',
    description: 'Product description',
    price: '99.99',
    cost: '50.00',
    status: true
  })
});

const product = await response.json();
console.log(product);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/shop/products',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
    },
    json={
        'sku': 'NEW-PRODUCT-001',
        'name': 'New Product',
        'description': 'Product description',
        'price': '99.99',
        'cost': '50.00',
        'status': True
    }
)

product = response.json()
print(product)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/shop/products/100",
  "@type": "Product",
  "id": 100,
  "sku": "NEW-PRODUCT-001",
  "name": "New Product",
  "price": "99.99",
  "status": true
}
```

### Update Product

Modify an existing product (admin only).

**Endpoint:**
```
PATCH /api/shop/products/{id}
```

:::tabs

== cURL

```bash
curl -X PATCH "https://your-domain.com/api/shop/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Updated Product Name",
    "price": "249.99"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/products/1', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
  },
  body: JSON.stringify({
    name: 'Updated Product Name',
    price: '249.99'
  })
});

const product = await response.json();
console.log(product);
```

== Python

```python
import requests

response = requests.patch(
    'https://your-domain.com/api/shop/products/1',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
    },
    json={
        'name': 'Updated Product Name',
        'price': '249.99'
    }
)

product = response.json()
print(product)
```

:::

## Categories

### List Categories

Retrieve all product categories.

**Endpoint:**
```
GET /api/shop/categories
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/categories" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/categories', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const categories = await response.json();
console.log(categories);
```

== Python

```python
import requests

response = requests.get(
    'https://your-domain.com/api/shop/categories',
    headers={'Content-Type': 'application/json'}
)

categories = response.json()
print(categories)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Category",
  "@id": "/api/shop/categories",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/categories/1",
      "@type": "Category",
      "id": 1,
      "name": "Electronics",
      "status": true,
      "url_key": "electronics"
    }
  ],
  "hydra:totalItems": 8
}
```

## Attributes

### List Attributes

Retrieve all product attributes.

**Endpoint:**
```
GET /api/shop/attributes
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/attributes" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/attributes', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const attributes = await response.json();
console.log(attributes);
```

== Python

```python
import requests

response = requests.get(
    'https://your-domain.com/api/shop/attributes',
    headers={'Content-Type': 'application/json'}
)

attributes = response.json()
print(attributes)
```

:::

## Attribute Options

### List Attribute Options

Retrieve options for attributes.

**Endpoint:**
```
GET /api/shop/attribute-options
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/attribute-options" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/attribute-options', {
  method: 'GET'
});

const options = await response.json();
console.log(options);
```

:::

## Channels

### List Channels

Retrieve all available channels.

**Endpoint:**
```
GET /api/shop/channels
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/channels" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/channels');
const channels = await response.json();
console.log(channels);
```

:::

## Countries & States

### List Countries

Retrieve all available countries.

**Endpoint:**
```
GET /api/shop/countries
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/countries" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/countries');
const countries = await response.json();
console.log(countries);
```

:::

### List Country States

Retrieve states for a specific country.

**Endpoint:**
```
GET /api/shop/countries/{country_id}/states
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/countries/1/states" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const countryId = 1;
const response = await fetch(`https://your-domain.com/api/shop/countries/${countryId}/states`);
const states = await response.json();
console.log(states);
```

:::

## Locales

### List Locales

Retrieve all available locales.

**Endpoint:**
```
GET /api/shop/locales
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/shop/locales" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/locales');
const locales = await response.json();
console.log(locales);
```

:::

## Related Resources

- [Cart & Checkout](/api/rest-api/cart-checkout)
- [Customer Management](/api/rest-api/customers)
- [Product Management](/api/rest-api/products)
- [Best Practices](/api/rest-api/best-practices)

## Products

The Product resource represents items in your store catalog.

### List Products

Retrieve a collection of products with optional filtering and pagination.

**Endpoint:**
```
GET /api/shop/products
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `itemsPerPage`: Items per page (default: 30, max: 100)
- `name`: Filter by product name
- `status`: Filter by status (true/false)
- `order[name]`: Sort by name (asc/desc)
- `order[price]`: Sort by price (asc/desc)

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/products?page=1&itemsPerPage=10" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
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
      "name": "Premium Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": "199.99",
      "status": true,
      "url_key": "premium-wireless-headphones",
      "short_description": "Best in class wireless audio"
    }
  ],
  "hydra:totalItems": 150,
  "hydra:view": {
    "@id": "/api/shop/products?page=1&itemsPerPage=10",
    "@type": "hydra:PartialCollectionView",
    "hydra:first": "/api/shop/products?page=1&itemsPerPage=10",
    "hydra:next": "/api/shop/products?page=2&itemsPerPage=10",
    "hydra:last": "/api/shop/products?page=15&itemsPerPage=10"
  }
}
```

### Get Product Details

Retrieve detailed information about a specific product.

**Endpoint:**
```
GET /api/shop/products/{id}
```

**Path Parameters:**
- `id`: Product ID (required)

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/products/1" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/shop/products/1",
  "@type": "Product",
  "id": 1,
  "name": "Premium Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": "199.99",
  "status": true,
  "url_key": "premium-wireless-headphones",
  "short_description": "Best in class wireless audio",
  "attribute_family_id": 1,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T15:45:00Z"
}
```

### Create Product

Create a new product in the catalog.

**Endpoint:**
```
POST /api/shop/products
```

**Request Body:**
```json
{
  "name": "New Smartphone",
  "description": "Latest model smartphone with advanced features",
  "short_description": "Premium smartphone",
  "price": "899.99",
  "status": true,
  "url_key": "new-smartphone"
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/shop/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "New Smartphone",
    "description": "Latest model smartphone",
    "price": "899.99",
    "status": true,
    "url_key": "new-smartphone"
  }'
```

**Response (201 Created):**
```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/shop/products/5",
  "@type": "Product",
  "id": 5,
  "name": "New Smartphone",
  "description": "Latest model smartphone with advanced features",
  "price": "899.99",
  "status": true,
  "url_key": "new-smartphone"
}
```

### Update Product

Update an existing product.

**Endpoint:**
```
PUT /api/shop/products/{id}
PATCH /api/shop/products/{id}
```

**Request:**
```bash
curl -X PATCH "https://your-domain.com/api/shop/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Updated Product Name",
    "price": "249.99"
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/shop/products/1",
  "@type": "Product",
  "id": 1,
  "name": "Updated Product Name",
  "price": "249.99",
  "status": true
}
```

## Categories

The Category resource represents product categories for organizing your catalog.

### List Categories

Retrieve all product categories.

**Endpoint:**
```
GET /api/shop/categories
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/categories" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Category",
  "@id": "/api/shop/categories",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/categories/1",
      "@type": "Category",
      "id": 1,
      "name": "Electronics",
      "description": "Electronic devices and accessories",
      "status": true,
      "url_key": "electronics"
    },
    {
      "@id": "/api/shop/categories/2",
      "@type": "Category",
      "id": 2,
      "name": "Clothing",
      "description": "Fashion and apparel",
      "status": true,
      "url_key": "clothing"
    }
  ],
  "hydra:totalItems": 8
}
```

### Get Category Details

Retrieve detailed information about a specific category.

**Endpoint:**
```
GET /api/shop/categories/{id}
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/categories/1" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Category",
  "@id": "/api/shop/categories/1",
  "@type": "Category",
  "id": 1,
  "name": "Electronics",
  "description": "Electronic devices and accessories",
  "status": true,
  "url_key": "electronics",
  "parent_id": null,
  "created_at": "2024-01-01T10:00:00Z"
}
```

## Attributes

The Attribute resource represents product attributes for filtering and product characteristics.

### List Attributes

Retrieve all product attributes.

**Endpoint:**
```
GET /api/shop/attributes
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/attributes?page=1&itemsPerPage=20" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Attribute",
  "@id": "/api/shop/attributes",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/attributes/1",
      "@type": "Attribute",
      "id": 1,
      "name": "Color",
      "code": "color",
      "type": "select",
      "is_filterable": true,
      "is_searchable": true
    },
    {
      "@id": "/api/shop/attributes/2",
      "@type": "Attribute",
      "id": 2,
      "name": "Size",
      "code": "size",
      "type": "select",
      "is_filterable": true
    }
  ],
  "hydra:totalItems": 12
}
```

### Get Attribute Details

Retrieve a specific attribute with its options.

**Endpoint:**
```
GET /api/shop/attributes/{id}
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/attributes/1" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Attribute",
  "@id": "/api/shop/attributes/1",
  "@type": "Attribute",
  "id": 1,
  "name": "Color",
  "code": "color",
  "type": "select",
  "is_filterable": true,
  "is_searchable": true,
  "is_comparable": false,
  "is_visible_on_front": true
}
```

## Attribute Options

The AttributeOption resource represents available values for attributes.

### List Attribute Options

Retrieve options for all attributes or a specific attribute.

**Endpoint:**
```
GET /api/shop/attribute-options
GET /api/shop/attributes/{attribute_id}/options
```

**Request:**
```bash
# All attribute options
curl -X GET "https://your-domain.com/api/shop/attribute-options" \
  -H "Content-Type: application/json"

# Options for specific attribute
curl -X GET "https://your-domain.com/api/shop/attributes/1/options" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/AttributeOption",
  "@id": "/api/shop/attribute-options",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/attribute-options/1",
      "@type": "AttributeOption",
      "id": 1,
      "attribute_id": 1,
      "label": "Red",
      "code": "red",
      "position": 1
    },
    {
      "@id": "/api/shop/attribute-options/2",
      "@type": "AttributeOption",
      "id": 2,
      "attribute_id": 1,
      "label": "Blue",
      "code": "blue",
      "position": 2
    }
  ],
  "hydra:totalItems": 5
}
```

## Channels

The Channel resource represents different sales channels (e.g., desktop, mobile).

### List Channels

Retrieve all available channels.

**Endpoint:**
```
GET /api/shop/channels
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/channels" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Channel",
  "@id": "/api/shop/channels",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/channels/1",
      "@type": "Channel",
      "id": 1,
      "name": "Default Channel",
      "code": "default",
      "description": "Default sales channel",
      "is_active": true,
      "base_currency_code": "USD"
    }
  ],
  "hydra:totalItems": 1
}
```

### Get Channel Details

Retrieve specific channel configuration.

**Endpoint:**
```
GET /api/shop/channels/{id}
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/channels/1" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Channel",
  "@id": "/api/shop/channels/1",
  "@type": "Channel",
  "id": 1,
  "name": "Default Channel",
  "code": "default",
  "description": "Default sales channel",
  "is_active": true,
  "base_currency_code": "USD",
  "base_url": "https://your-domain.com",
  "hostname": "your-domain.com"
}
```

## Countries & States

The Country resource represents available countries for shipping and billing.

### List Countries

Retrieve all available countries.

**Endpoint:**
```
GET /api/shop/countries
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/countries" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Country",
  "@id": "/api/shop/countries",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/countries/1",
      "@type": "Country",
      "id": 1,
      "name": "United States",
      "code": "US"
    },
    {
      "@id": "/api/shop/countries/2",
      "@type": "Country",
      "id": 2,
      "name": "Canada",
      "code": "CA"
    }
  ],
  "hydra:totalItems": 195
}
```

### Get Country Details

Retrieve a specific country.

**Endpoint:**
```
GET /api/shop/countries/{id}
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/countries/1" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Country",
  "@id": "/api/shop/countries/1",
  "@type": "Country",
  "id": 1,
  "name": "United States",
  "code": "US"
}
```

### List Country States

Retrieve states for a specific country.

**Endpoint:**
```
GET /api/shop/country-states
GET /api/shop/countries/{country_id}/states
```

**Request:**
```bash
# All country states
curl -X GET "https://your-domain.com/api/shop/country-states" \
  -H "Content-Type: application/json"

# States for specific country
curl -X GET "https://your-domain.com/api/shop/countries/1/states" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/CountryState",
  "@id": "/api/shop/country-states",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/country-states/1",
      "@type": "CountryState",
      "id": 1,
      "country_id": 1,
      "name": "California",
      "code": "CA"
    },
    {
      "@id": "/api/shop/country-states/2",
      "@type": "CountryState",
      "id": 2,
      "country_id": 1,
      "name": "Texas",
      "code": "TX"
    }
  ],
  "hydra:totalItems": 50
}
```

## Locales

The Locale resource represents available languages and locales.

### List Locales

Retrieve all available locales.

**Endpoint:**
```
GET /api/shop/locales
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/shop/locales" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/Locale",
  "@id": "/api/shop/locales",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/shop/locales/1",
      "@type": "Locale",
      "id": 1,
      "name": "English",
      "code": "en",
      "language": "English",
      "script": "Latn"
    },
    {
      "@id": "/api/shop/locales/2",
      "@type": "Locale",
      "id": 2,
      "name": "French",
      "code": "fr",
      "language": "French",
      "script": "Latn"
    }
  ],
  "hydra:totalItems": 10
}
```

## Error Handling

### 404 Not Found

```json
{
  "@context": "/api/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "An error occurred",
  "hydra:description": "Not Found",
  "status": 404
}
```

### 400 Bad Request

```json
{
  "@context": "/api/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "An error occurred",
  "hydra:description": "Invalid request",
  "status": 400
}
```

## Related Resources

- [Cart & Checkout](/api/rest-api/cart-checkout)
- [Customer Management](/api/rest-api/customers)
- [Product Management](/api/rest-api/products)
- [Best Practices](/api/rest-api/best-practices)
