---
outline: false
examples:
  - id: get-categories
    title: Get All Categories
    description: Retrieve paginated list of all product categories.
    request: |
      GET /api/shop/categories
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "name": "Electronics",
            "slug": "electronics",
            "description": "Electronic products and devices",
            "imageUrl": "https://example.com/electronics.jpg",
            "productCount": 45
          },
          {
            "id": 2,
            "name": "Fashion",
            "slug": "fashion",
            "description": "Clothing and accessories",
            "productCount": 120
          }
        ],
        "pagination": {
          "total": 25,
          "perPage": 10,
          "currentPage": 1,
          "lastPage": 3
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid X-STOREFRONT-KEY header
      - error: 422 Invalid Page
        cause: Page number exceeds total pages
        solution: Use valid page number within range

---

# Get Categories

Retrieve a paginated list of all product categories available in your store.

## Endpoint

```
GET /api/shop/categories
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number for pagination |
| `limit` | integer | 10 | Number of items per page |
| `sort` | string | name | Field to sort by (name, position, created_at) |
| `locale` | string | en | Language locale |
| `channel` | string | default | Channel identifier |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category ID |
| `name` | string | Category name |
| `slug` | string | URL-friendly category identifier |
| `description` | string | Category description |
| `imageUrl` | string | Category image URL |
| `productCount` | integer | Number of products in category |
| `parentId` | integer | Parent category ID |
| `position` | integer | Display order |
| `createdAt` | string | Category creation date |

## Pagination Response

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total number of categories |
| `perPage` | integer | Items per page |
| `currentPage` | integer | Current page number |
| `lastPage` | integer | Last page number |

## Use Cases

- Display category listings in sidebar or header
- Load categories for product filtering
- Build category management interfaces
- Create breadcrumb navigation

## Related Resources

- [Get Category Tree](/api/rest-api/shop/categories/get-category-tree)
- [Get Category](/api/rest-api/shop/categories/get-category)
- [Get Products](/api/rest-api/shop/products/get-products)
