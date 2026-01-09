---
outline: false
examples:
  - id: get-category-tree
    title: Get Category Tree
    description: Retrieve hierarchical category structure with parent-child relationships.
    request: |
      GET /api/shop/categories/tree
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
            "children": [
              {
                "id": 2,
                "name": "Smartphones",
                "slug": "smartphones",
                "description": "Mobile phones and accessories",
                "children": []
              },
              {
                "id": 3,
                "name": "Laptops",
                "slug": "laptops",
                "description": "Laptop computers",
                "children": []
              }
            ]
          },
          {
            "id": 4,
            "name": "Fashion",
            "slug": "fashion",
            "description": "Clothing and accessories",
            "children": []
          }
        ]
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid X-STOREFRONT-KEY header
      - error: 500 Server Error
        cause: Database connection issue
        solution: Check server status and retry

---

# Get Category Tree

Retrieve the complete hierarchical structure of product categories with parent-child relationships.

## Endpoint

```
GET /api/shop/categories/tree
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `locale` | string | No | Language locale (e.g., en, fr) |
| `channel` | string | No | Channel ID or code |
| `includeCount` | boolean | No | Include product count per category |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category ID |
| `name` | string | Category name |
| `slug` | string | URL-friendly category identifier |
| `description` | string | Category description |
| `imageUrl` | string | Category image URL |
| `children` | array | Nested child categories |
| `parentId` | integer | Parent category ID |
| `position` | integer | Display order |

## Use Cases

- Build category navigation menus
- Create category filters for product browsing
- Display category hierarchies on frontend
- Cache category structure for performance

## Related Resources

- [Get Categories](/api/rest-api/shop/categories/get-categories)
- [Get Category](/api/rest-api/shop/categories/get-category)
- [Get Products](/api/rest-api/shop/products/get-products)
