# Product Management

Complete guide to product operations including CRUD operations, images, videos, reviews, bundles, and variants using the REST API.

## Products

### List All Products

Retrieve paginated list of products.

**Endpoint:**
```
GET /api/products
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 15)
- `sort` - Sort field (default: id)
- `order` - Sort order (asc/desc)
- `search` - Search term
- `category_id` - Filter by category

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/products?page=1&limit=10" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const params = new URLSearchParams({
  page: 1,
  limit: 10
});

const response = await fetch(`https://your-domain.com/api/products?${params}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const products = await response.json();
console.log(products);
```

== Python

```python
import requests

params = {
    'page': 1,
    'limit': 10
}

response = requests.get(
    'https://your-domain.com/api/products',
    headers={'Content-Type': 'application/json'},
    params=params
)

products = response.json()
print(products)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/products",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/products/1",
      "@type": "Product",
      "id": 1,
      "name": "Premium T-Shirt",
      "slug": "premium-t-shirt",
      "description": "High quality cotton t-shirt",
      "short_description": "Premium quality tee",
      "sku": "TSHIRT-001",
      "price": 29.99,
      "cost": 10.00,
      "weight": 0.5,
      "status": 1,
      "visibility": "visible",
      "type": "simple",
      "url_key": "premium-t-shirt",
      "meta_title": "Premium T-Shirt",
      "meta_description": "Best quality t-shirt",
      "created_at": "2024-01-10T10:00:00Z"
    }
  ],
  "hydra:view": {
    "@id": "/api/products?page=1",
    "@type": "hydra:PartialCollectionView",
    "hydra:first": "/api/products?page=1",
    "hydra:last": "/api/products?page=5",
    "hydra:next": "/api/products?page=2"
  },
  "hydra:totalItems": 45
}
```

### Get Product Details

Retrieve detailed information for a specific product.

**Endpoint:**
```
GET /api/products/{id}
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/products/1" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/products/1', {
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

response = requests.get(
    'https://your-domain.com/api/products/1',
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
  "@id": "/api/products/1",
  "@type": "Product",
  "id": 1,
  "name": "Premium T-Shirt",
  "slug": "premium-t-shirt",
  "description": "Crafted from 100% organic cotton, this premium t-shirt offers comfort and style.",
  "short_description": "High quality cotton t-shirt",
  "sku": "TSHIRT-001",
  "price": 29.99,
  "original_price": 39.99,
  "cost": 10.00,
  "weight": 0.5,
  "status": 1,
  "visibility": "visible",
  "type": "simple",
  "url_key": "premium-t-shirt",
  "images": [
    {
      "id": 10,
      "url": "https://cdn.example.com/products/tshirt-1.jpg",
      "alt": "Front view",
      "position": 0
    }
  ],
  "attributes": [
    {
      "id": 1,
      "code": "color",
      "label": "Color",
      "value": "Blue"
    },
    {
      "id": 2,
      "code": "size",
      "label": "Size",
      "value": "M"
    }
  ],
  "categories": [
    {
      "id": 3,
      "name": "Clothing",
      "slug": "clothing"
    }
  ],
  "created_at": "2024-01-10T10:00:00Z",
  "updated_at": "2024-01-20T10:00:00Z"
}
```

### Create Product

Create a new product in the catalog.

**Endpoint:**
```
POST /api/products
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/products" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "slug": "new-product",
    "type": "simple",
    "sku": "PROD-001",
    "description": "Product description",
    "short_description": "Short desc",
    "price": 49.99,
    "cost": 20.00,
    "weight": 1.0,
    "status": 1,
    "visibility": "visible"
  }'
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/products', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Product',
    slug: 'new-product',
    type: 'simple',
    sku: 'PROD-001',
    description: 'Product description',
    short_description: 'Short desc',
    price: 49.99,
    cost: 20.00,
    weight: 1.0,
    status: 1,
    visibility: 'visible'
  })
});

const product = await response.json();
console.log(product);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.post(
    'https://your-domain.com/api/products',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'New Product',
        'slug': 'new-product',
        'type': 'simple',
        'sku': 'PROD-001',
        'description': 'Product description',
        'short_description': 'Short desc',
        'price': 49.99,
        'cost': 20.00,
        'weight': 1.0,
        'status': 1,
        'visibility': 'visible'
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
  "@id": "/api/products/50",
  "@type": "Product",
  "id": 50,
  "name": "New Product",
  "slug": "new-product",
  "sku": "PROD-001",
  "price": 49.99,
  "cost": 20.00,
  "status": 1,
  "created_at": "2024-01-20T11:00:00Z"
}
```

### Update Product

Update an existing product.

**Endpoint:**
```
PATCH /api/products/{id}
```

:::tabs

== cURL

```bash
curl -X PATCH "https://your-domain.com/api/products/1" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "price": 34.99
  }'
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/products/1', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Updated Product Name',
    price: 34.99
  })
});

const product = await response.json();
console.log(product);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.patch(
    'https://your-domain.com/api/products/1',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'Updated Product Name',
        'price': 34.99
    }
)

product = response.json()
print(product)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Product",
  "@id": "/api/products/1",
  "@type": "Product",
  "id": 1,
  "name": "Updated Product Name",
  "price": 34.99,
  "updated_at": "2024-01-20T11:30:00Z"
}
```

### Delete Product

Delete a product from the catalog.

**Endpoint:**
```
DELETE /api/products/{id}
```

:::tabs

== cURL

```bash
curl -X DELETE "https://your-domain.com/api/products/1" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/products/1', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

console.log('Product deleted');
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.delete(
    'https://your-domain.com/api/products/1',
    headers={'Authorization': f'Bearer {token}'}
)

print('Product deleted')
```

:::

**Response (204 No Content):**

```
[Empty response body]
```

## Product Images

### Add Product Image

Upload and add an image to a product.

**Endpoint:**
```
POST /api/product_images
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/product_images" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -F "product_id=1" \
  -F "alt=Front view" \
  -F "position=0" \
  -F "image=@/path/to/image.jpg"
```

== Node.js

```javascript
const fs = require('fs');
const FormData = require('form-data');

const token = 'ADMIN_TOKEN';
const form = new FormData();
form.append('product_id', 1);
form.append('alt', 'Front view');
form.append('position', 0);
form.append('image', fs.createReadStream('/path/to/image.jpg'));

const response = await fetch('https://your-domain.com/api/product_images', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    ...form.getHeaders()
  },
  body: form
});

const image = await response.json();
console.log(image);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

with open('/path/to/image.jpg', 'rb') as image_file:
    files = {'image': image_file}
    data = {
        'product_id': 1,
        'alt': 'Front view',
        'position': 0
    }
    
    response = requests.post(
        'https://your-domain.com/api/product_images',
        headers={'Authorization': f'Bearer {token}'},
        files=files,
        data=data
    )

image = response.json()
print(image)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/ProductImage",
  "@id": "/api/product_images/10",
  "@type": "ProductImage",
  "id": 10,
  "product_id": 1,
  "url": "https://cdn.example.com/products/image-10.jpg",
  "alt": "Front view",
  "position": 0,
  "created_at": "2024-01-20T11:45:00Z"
}
```

### Delete Product Image

Remove an image from a product.

**Endpoint:**
```
DELETE /api/product_images/{id}
```

:::tabs

== cURL

```bash
curl -X DELETE "https://your-domain.com/api/product_images/10" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/product_images/10', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

console.log('Image deleted');
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.delete(
    'https://your-domain.com/api/product_images/10',
    headers={'Authorization': f'Bearer {token}'}
)

print('Image deleted')
```

:::

**Response (204 No Content):**

```
[Empty response body]
```

## Product Videos

### Add Product Video

Attach a video to a product.

**Endpoint:**
```
POST /api/product_videos
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/product_videos" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
    "type": "youtube",
    "title": "Product Demo"
  }'
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/product_videos', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    product_id: 1,
    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube',
    title: 'Product Demo'
  })
});

const video = await response.json();
console.log(video);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.post(
    'https://your-domain.com/api/product_videos',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'product_id': 1,
        'url': 'https://youtube.com/watch?v=dQw4w9WgXcQ',
        'type': 'youtube',
        'title': 'Product Demo'
    }
)

video = response.json()
print(video)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/ProductVideo",
  "@id": "/api/product_videos/5",
  "@type": "ProductVideo",
  "id": 5,
  "product_id": 1,
  "url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
  "type": "youtube",
  "title": "Product Demo",
  "created_at": "2024-01-20T11:50:00Z"
}
```

## Product Reviews

### List Product Reviews

Retrieve reviews for a product.

**Endpoint:**
```
GET /api/product_reviews?product_id={product_id}
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/product_reviews?product_id=1" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const params = new URLSearchParams({
  product_id: 1
});

const response = await fetch(`https://your-domain.com/api/product_reviews?${params}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const reviews = await response.json();
console.log(reviews);
```

== Python

```python
import requests

params = {'product_id': 1}

response = requests.get(
    'https://your-domain.com/api/product_reviews',
    headers={'Content-Type': 'application/json'},
    params=params
)

reviews = response.json()
print(reviews)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/ProductReview",
  "@id": "/api/product_reviews",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/product_reviews/1",
      "@type": "ProductReview",
      "id": 1,
      "product_id": 1,
      "customer_id": 5,
      "title": "Excellent Quality!",
      "comment": "Best t-shirt I've ever purchased",
      "rating": 5,
      "status": "approved",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "hydra:totalItems": 12
}
```

### Create Product Review

Submit a review for a product.

**Endpoint:**
```
POST /api/product_reviews
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/product_reviews" \
  -H "Authorization: Bearer CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "title": "Great Product",
    "comment": "Very satisfied with this purchase",
    "rating": 5
  }'
```

== Node.js

```javascript
const token = 'CUSTOMER_TOKEN';

const response = await fetch('https://your-domain.com/api/product_reviews', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    product_id: 1,
    title: 'Great Product',
    comment: 'Very satisfied with this purchase',
    rating: 5
  })
});

const review = await response.json();
console.log(review);
```

== Python

```python
import requests

token = 'CUSTOMER_TOKEN'

response = requests.post(
    'https://your-domain.com/api/product_reviews',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'product_id': 1,
        'title': 'Great Product',
        'comment': 'Very satisfied with this purchase',
        'rating': 5
    }
)

review = response.json()
print(review)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/ProductReview",
  "@id": "/api/product_reviews/15",
  "@type": "ProductReview",
  "id": 15,
  "product_id": 1,
  "customer_id": 10,
  "title": "Great Product",
  "comment": "Very satisfied with this purchase",
  "rating": 5,
  "status": "pending",
  "created_at": "2024-01-20T12:00:00Z"
}
```

## Product Bundles

### List Product Bundles

Get bundle products with their children items.

**Endpoint:**
```
GET /api/product_bundles
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/product_bundles?page=1" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/product_bundles?page=1', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const bundles = await response.json();
console.log(bundles);
```

== Python

```python
import requests

response = requests.get(
    'https://your-domain.com/api/product_bundles?page=1',
    headers={'Content-Type': 'application/json'}
)

bundles = response.json()
print(bundles)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/ProductBundle",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/products/20",
      "@type": "Product",
      "id": 20,
      "name": "Premium Bundle",
      "type": "bundle",
      "price": 99.99,
      "bundle_items": [
        {
          "id": 1,
          "product_id": 1,
          "quantity": 2
        },
        {
          "id": 2,
          "product_id": 5,
          "quantity": 1
        }
      ]
    }
  ],
  "hydra:totalItems": 3
}
```

### Create Bundle Product

Create a new bundle product.

**Endpoint:**
```
POST /api/products (with type=bundle)
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/products" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bundle Package",
    "type": "bundle",
    "sku": "BUNDLE-001",
    "price": 99.99,
    "status": 1,
    "bundle_items": [
      {
        "product_id": 1,
        "quantity": 2
      },
      {
        "product_id": 5,
        "quantity": 1
      }
    ]
  }'
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/products', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Bundle Package',
    type: 'bundle',
    sku: 'BUNDLE-001',
    price: 99.99,
    status: 1,
    bundle_items: [
      {
        product_id: 1,
        quantity: 2
      },
      {
        product_id: 5,
        quantity: 1
      }
    ]
  })
});

const bundle = await response.json();
console.log(bundle);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.post(
    'https://your-domain.com/api/products',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'Bundle Package',
        'type': 'bundle',
        'sku': 'BUNDLE-001',
        'price': 99.99,
        'status': 1,
        'bundle_items': [
            {'product_id': 1, 'quantity': 2},
            {'product_id': 5, 'quantity': 1}
        ]
    }
)

bundle = response.json()
print(bundle)
```

:::

**Response (201 Created):**

```json
{
  "@id": "/api/products/20",
  "@type": "Product",
  "id": 20,
  "name": "Bundle Package",
  "type": "bundle",
  "sku": "BUNDLE-001",
  "price": 99.99,
  "bundle_items": [
    {
      "id": 1,
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

## Grouped & Configurable Products

### Create Grouped Product

Create a grouped product linking related products.

**Endpoint:**
```
POST /api/products (with type=grouped)
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/products" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grouped Product Set",
    "type": "grouped",
    "sku": "GROUP-001",
    "status": 1,
    "grouped_products": [1, 2, 3, 4]
  }'
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/products', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Grouped Product Set',
    type: 'grouped',
    sku: 'GROUP-001',
    status: 1,
    grouped_products: [1, 2, 3, 4]
  })
});

const grouped = await response.json();
console.log(grouped);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.post(
    'https://your-domain.com/api/products',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'Grouped Product Set',
        'type': 'grouped',
        'sku': 'GROUP-001',
        'status': 1,
        'grouped_products': [1, 2, 3, 4]
    }
)

grouped = response.json()
print(grouped)
```

:::

**Response (201 Created):**

```json
{
  "@id": "/api/products/21",
  "@type": "Product",
  "id": 21,
  "name": "Grouped Product Set",
  "type": "grouped",
  "sku": "GROUP-001",
  "grouped_products": [1, 2, 3, 4]
}
```

## Downloadable Products

### Create Downloadable Product

Create a product with downloadable files.

**Endpoint:**
```
POST /api/products (with type=downloadable)
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/products" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "E-Book",
    "type": "downloadable",
    "sku": "EBOOK-001",
    "price": 19.99,
    "status": 1,
    "downloadable_links": [
      {
        "title": "Main PDF",
        "url": "https://cdn.example.com/ebook.pdf"
      }
    ]
  }'
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/products', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'E-Book',
    type: 'downloadable',
    sku: 'EBOOK-001',
    price: 19.99,
    status: 1,
    downloadable_links: [
      {
        title: 'Main PDF',
        url: 'https://cdn.example.com/ebook.pdf'
      }
    ]
  })
});

const product = await response.json();
console.log(product);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.post(
    'https://your-domain.com/api/products',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'E-Book',
        'type': 'downloadable',
        'sku': 'EBOOK-001',
        'price': 19.99,
        'status': 1,
        'downloadable_links': [
            {'title': 'Main PDF', 'url': 'https://cdn.example.com/ebook.pdf'}
        ]
    }
)

product = response.json()
print(product)
```

:::

**Response (201 Created):**

```json
{
  "@id": "/api/products/22",
  "@type": "Product",
  "id": 22,
  "name": "E-Book",
  "type": "downloadable",
  "sku": "EBOOK-001",
  "price": 19.99,
  "downloadable_links": [
    {
      "id": 1,
      "title": "Main PDF",
      "url": "https://cdn.example.com/ebook.pdf"
    }
  ]
}
```

## Product Pricing & Inventory

### Update Product Pricing

Update product pricing information.

**Endpoint:**
```
PATCH /api/products/{id}
```

:::tabs

== cURL

```bash
curl -X PATCH "https://your-domain.com/api/products/1" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 44.99,
    "cost": 15.00,
    "special_price": 39.99
  }'
```

== Node.js

```javascript
const token = 'ADMIN_TOKEN';

const response = await fetch('https://your-domain.com/api/products/1', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    price: 44.99,
    cost: 15.00,
    special_price: 39.99
  })
});

const product = await response.json();
console.log(product);
```

== Python

```python
import requests

token = 'ADMIN_TOKEN'

response = requests.patch(
    'https://your-domain.com/api/products/1',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'price': 44.99,
        'cost': 15.00,
        'special_price': 39.99
    }
)

product = response.json()
print(product)
```

:::

**Response (200 OK):**

```json
{
  "@id": "/api/products/1",
  "@type": "Product",
  "id": 1,
  "price": 44.99,
  "cost": 15.00,
  "special_price": 39.99,
  "updated_at": "2024-01-20T12:15:00Z"
}
```

## Related Resources

- [Shop Resources](/api/rest-api/shop-resources)
- [Customers](/api/rest-api/customers)
- [Best Practices](/api/rest-api/best-practices)
