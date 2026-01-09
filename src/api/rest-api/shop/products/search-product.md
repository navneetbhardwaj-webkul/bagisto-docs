---
outline: false
examples:
  - id: search-product
    title: Search Products
    description: Search products using keyword and get matching results.
    request: |
      GET /api/shop/products/search?q=smartphone&limit=20
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "name": "Premium Smartphone",
            "slug": "premium-smartphone",
            "sku": "PHONE-PREMIUM-001",
            "price": 899.99,
            "imageUrl": "https://example.com/phone.jpg",
            "rating": 4.5
          },
          {
            "id": 2,
            "name": "Budget Smartphone",
            "slug": "budget-smartphone",
            "sku": "PHONE-BUDGET-001",
            "price": 299.99,
            "imageUrl": "https://example.com/phone-budget.jpg",
            "rating": 4.2
          }
        ],
        "total": 2,
        "query": "smartphone"
      }
    commonErrors:
      - error: 422 Validation Error
        cause: Search query is empty or too short
        solution: Provide search query with at least 2 characters
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Search Product

Search for products using keywords and filters.

## Endpoint

```
GET /api/shop/products/search
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query (min 2 characters) |
| `limit` | integer | No | Maximum results (default: 20, max: 100) |
| `page` | integer | No | Page number (default: 1) |
| `category` | integer | No | Filter by category ID |
| `minPrice` | decimal | No | Minimum price filter |
| `maxPrice` | decimal | No | Maximum price filter |
| `sort` | string | No | Sort by (relevance, price, rating, newest) |
| `direction` | string | No | Sort direction (asc, desc) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Product ID |
| `name` | string | Product name |
| `slug` | string | URL-friendly product identifier |
| `sku` | string | Stock keeping unit |
| `price` | decimal | Product price |
| `specialPrice` | decimal | Sale price (if applicable) |
| `imageUrl` | string | Product image URL |
| `rating` | decimal | Average rating |
| `reviews` | integer | Number of reviews |
| `inStock` | boolean | Stock availability |

## Metadata Response

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total matching results |
| `query` | string | Search query used |
| `highlightedResults` | integer | Number of highlighted/featured results |

## Search Features

- Full-text product name and description search
- Category filtering
- Price range filtering
- Rating-based sorting
- Relevance ranking
- Autocomplete suggestions support

## Use Cases

- Implement product search functionality
- Build search result pages
- Create product finding features
- Support search suggestions/autocomplete
- Filter search results by attributes

## Related Resources

- [Get Products](/api/rest-api/shop/products/get-products)
- [Get Product](/api/rest-api/shop/products/get-product)
- [Get Categories](/api/rest-api/shop/categories/get-categories)
