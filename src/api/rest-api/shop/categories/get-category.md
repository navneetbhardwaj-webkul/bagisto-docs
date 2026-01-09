---
outline: false
examples:
  - id: get-category
    title: Get Single Category
    description: Retrieve detailed information for a specific category.
    request: |
      GET /api/shop/categories/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "name": "Electronics",
          "slug": "electronics",
          "description": "Electronic products and devices",
          "imageUrl": "https://example.com/electronics.jpg",
          "productCount": 45,
          "parentId": null,
          "position": 1,
          "createdAt": "2024-01-01T00:00:00Z",
          "updatedAt": "2024-01-15T00:00:00Z",
          "children": [
            {
              "id": 2,
              "name": "Smartphones",
              "slug": "smartphones"
            }
          ]
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Category with specified ID does not exist
        solution: Verify the category ID and try again
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid X-STOREFRONT-KEY header

---

# Get Category

Retrieve detailed information for a specific product category by ID.

## Endpoint

```
GET /api/shop/categories/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Category ID |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `locale` | string | No | Language locale (default: en) |
| `channel` | string | No | Channel identifier |
| `includeChildren` | boolean | No | Include child categories (default: true) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category ID |
| `name` | string | Category name |
| `slug` | string | URL-friendly category identifier |
| `description` | string | Category description |
| `imageUrl` | string | Category image URL |
| `productCount` | integer | Number of products in category |
| `parentId` | integer | Parent category ID (null if root) |
| `position` | integer | Display order |
| `createdAt` | string | Category creation date (ISO 8601) |
| `updatedAt` | string | Last update date (ISO 8601) |
| `children` | array | Child categories (if includeChildren=true) |

## Child Category Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Child category ID |
| `name` | string | Child category name |
| `slug` | string | Child category slug |
| `productCount` | integer | Products in child category |

## Use Cases

- Display category details and metadata
- Build category pages with product listings
- Show category breadcrumbs
- Fetch subcategories for navigation

## Related Resources

- [Get Categories](/api/rest-api/shop/categories/get-categories)
- [Get Category Tree](/api/rest-api/shop/categories/get-category-tree)
- [Get Products](/api/rest-api/shop/products/get-products)
