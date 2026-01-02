---
outline: false
examples:
  - id: get-product-by-id
    title: Get Product Details
    description: Retrieve detailed information for a specific product.
    request: |
      GET /api/products/1
    headers:
      Content-Type: application/json
    response: |
      {
        "@context": "/api/contexts/Product",
        "@id": "/api/products/1",
        "@type": "Product",
        "id": 1,
        "name": "Premium T-Shirt",
        "slug": "premium-t-shirt",
        "description": "Crafted from 100% organic cotton with premium finish.",
        "short_description": "High quality cotton t-shirt",
        "sku": "TSHIRT-001",
        "price": 29.99,
        "original_price": 39.99,
        "cost": 10.00,
        "weight": 0.5,
        "status": 1,
        "type": "simple",
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
    commonErrors:
      - error: 404 Not Found
        cause: Product with specified ID does not exist
        solution: Verify the product ID and try again
      - error: 410 Gone
        cause: Product has been permanently deleted
        solution: Use a valid product ID

  - id: get-product-by-slug
    title: Get Product by Slug
    description: Retrieve product details using URL slug instead of ID.
    request: |
      GET /api/products/premium-t-shirt
    headers:
      Content-Type: application/json
    response: |
      {
        "@context": "/api/contexts/Product",
        "@id": "/api/products/1",
        "@type": "Product",
        "id": 1,
        "name": "Premium T-Shirt",
        "slug": "premium-t-shirt",
        "sku": "TSHIRT-001",
        "price": 29.99,
        "status": 1
      }
    commonErrors:
      - error: 404 Not Found
        cause: Product slug does not exist
        solution: Verify the slug and try again
---

# Get Product Details

Retrieve detailed information for a specific product including images, attributes, categories, and pricing.

## Endpoint

```
GET /api/products/{id|slug}
```

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Product ID |
| `slug` | string | URL-friendly product slug |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Product ID |
| `name` | string | Product name |
| `slug` | string | URL-friendly slug |
| `description` | string | Full product description |
| `short_description` | string | Short product description |
| `sku` | string | Stock keeping unit |
| `price` | number | Selling price |
| `original_price` | number | Original price before discount |
| `cost` | number | Product cost |
| `weight` | number | Product weight |
| `status` | integer | Active status (1=active, 0=inactive) |
| `type` | string | Product type (simple, configurable, bundle) |
| `images` | array | Product images with URLs |
| `attributes` | array | Product attributes with values |
| `categories` | array | Associated categories |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Usage Examples

:::examples-selector

## Related Resources

- [List Products](/api/rest-api/shop/queries/get-products)
- [Update Product](/api/rest-api/shop/mutations/update-product)
- [Delete Product](/api/rest-api/shop/mutations/delete-product)
