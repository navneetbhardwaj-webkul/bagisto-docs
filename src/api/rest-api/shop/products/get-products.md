---
outline: false
examples:
  - id: get-products
    title: Get All Products
    description: Retrieve paginated list of products with filters.
    request: |
      GET /api/shop/products
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "name": "Smartphone",
            "slug": "smartphone",
            "sku": "PHONE-001",
            "price": 599.99,
            "type": "simple",
            "imageUrl": "https://example.com/phone.jpg",
            "rating": 4.5,
            "reviews": 120
          },
          {
            "id": 2,
            "name": "Laptop",
            "slug": "laptop",
            "sku": "LAPTOP-001",
            "price": 1299.99,
            "type": "simple",
            "imageUrl": "https://example.com/laptop.jpg",
            "rating": 4.8,
            "reviews": 95
          }
        ],
        "pagination": {
          "total": 150,
          "perPage": 10,
          "currentPage": 1,
          "lastPage": 15
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key
      - error: 422 Invalid Filter
        cause: Invalid filter or sort parameter
        solution: Use valid filter names and values

---

# Get Products

Retrieve a paginated list of products with filtering, sorting, and pagination options.

## Endpoint

```
GET /api/shop/products
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page (max: 100) |
| `sort` | string | name | Sort by (name, price, rating, newest) |
| `direction` | string | asc | Sort direction (asc, desc) |
| `category` | integer | - | Filter by category ID |
| `minPrice` | decimal | - | Minimum price filter |
| `maxPrice` | decimal | - | Maximum price filter |
| `search` | string | - | Search query |
| `status` | integer | 1 | Product status (1=active, 0=inactive) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Product ID |
| `name` | string | Product name |
| `slug` | string | URL-friendly product identifier |
| `sku` | string | Stock keeping unit |
| `price` | decimal | Product price |
| `specialPrice` | decimal | Sale price (if applicable) |
| `type` | string | Product type (simple, configurable, bundle) |
| `imageUrl` | string | Main product image URL |
| `rating` | decimal | Average rating (0-5) |
| `reviews` | integer | Number of reviews |
| `inStock` | boolean | Stock availability |
| `description` | string | Short product description |

## Pagination Response

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total products matching filters |
| `perPage` | integer | Items per page |
| `currentPage` | integer | Current page |
| `lastPage` | integer | Last page number |

## Use Cases

- Display product listings on category pages
- Implement product search functionality
- Build product filtering and sorting
- Create product carousels
- Load products for comparison

## Related Resources

- [Get Product](/api/rest-api/shop/products/get-product)
- [Search Product](/api/rest-api/shop/products/search-product)
- [Get Categories](/api/rest-api/shop/categories/get-categories)
