---
outline: false
examples:
  - id: list-products-paginated
    title: List Products with Pagination
    description: Retrieve paginated list of all products from the catalog.
    request: |
      GET /api/products?page=1&limit=10
    headers:
      Content-Type: application/json
    response: |
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
            "sku": "TSHIRT-001",
            "price": 29.99,
            "status": 1,
            "type": "simple"
          }
        ],
        "hydra:totalItems": 45,
        "hydra:view": {
          "@id": "/api/products?page=1",
          "hydra:first": "/api/products?page=1",
          "hydra:last": "/api/products?page=5",
          "hydra:next": "/api/products?page=2"
        }
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Invalid page or limit parameter
        solution: Ensure page and limit are positive integers
      - error: 404 Not Found
        cause: Page number exceeds available pages
        solution: Reduce page number to valid range

  - id: list-products-by-category
    title: List Products by Category
    description: Retrieve products filtered by specific category.
    request: |
      GET /api/products?category_id=3&page=1&limit=10
    headers:
      Content-Type: application/json
    response: |
      {
        "@context": "/api/contexts/Product",
        "@type": "hydra:Collection",
        "hydra:member": [
          {
            "@id": "/api/products/1",
            "@type": "Product",
            "id": 1,
            "name": "Blue T-Shirt",
            "category_id": 3,
            "price": 29.99
          }
        ],
        "hydra:totalItems": 12
      }
    commonErrors:
      - error: 404 Not Found
        cause: Category does not exist
        solution: Verify category_id exists

  - id: search-products
    title: Search Products
    description: Search products by keyword.
    request: |
      GET /api/products?search=shirt&page=1&limit=10
    headers:
      Content-Type: application/json
    response: |
      {
        "@context": "/api/contexts/Product",
        "@type": "hydra:Collection",
        "hydra:member": [
          {
            "@id": "/api/products/1",
            "@type": "Product",
            "id": 1,
            "name": "Premium T-Shirt",
            "sku": "TSHIRT-001",
            "price": 29.99
          }
        ],
        "hydra:totalItems": 5
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Search term is empty
        solution: Provide a valid search term

  - id: list-products-sorted
    title: List Products - Sorted
    description: Retrieve products sorted by specific field.
    request: |
      GET /api/products?sort=price&order=asc&page=1&limit=10
    headers:
      Content-Type: application/json
    response: |
      {
        "@context": "/api/contexts/Product",
        "@type": "hydra:Collection",
        "hydra:member": [
          {
            "@id": "/api/products/5",
            "@type": "Product",
            "id": 5,
            "name": "Budget T-Shirt",
            "price": 9.99
          }
        ],
        "hydra:totalItems": 45
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Invalid sort field
        solution: Use valid fields like id, name, price, created_at
---

# List Products

Retrieve a paginated list of products from your store catalog with support for filtering, searching, and sorting.

## Endpoint

```
GET /api/products
```

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Results per page (default: 15, max: 100) |
| `sort` | string | Sort field (id, name, price, created_at) |
| `order` | string | Sort order (asc, desc) |
| `search` | string | Search term for product name/SKU |
| `category_id` | integer | Filter by category ID |
| `status` | integer | Filter by status (1=active, 0=inactive) |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Product ID |
| `name` | string | Product name |
| `slug` | string | URL-friendly slug |
| `sku` | string | Product SKU code |
| `price` | number | Product price |
| `status` | integer | Active status |
| `type` | string | Product type (simple, configurable, bundle) |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Usage Examples

:::examples-selector

## Related Resources

- [Get Product Details](/api/rest-api/shop/queries/get-product)
- [Create Product](/api/rest-api/shop/mutations/create-product)
- [Update Product](/api/rest-api/shop/mutations/update-product)
- [Shop Resources](/api/rest-api/introduction#shop-resources)
