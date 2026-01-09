---
outline: false
examples:
  - id: get-product-reviews
    title: Get Product Reviews
    description: Retrieve paginated list of reviews for a product.
    request: |
      GET /api/shop/products/1/reviews
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "productId": 1,
            "title": "Excellent product!",
            "comment": "Very satisfied with this purchase",
            "rating": 5,
            "authorName": "John Doe",
            "authorEmail": "john@example.com",
            "status": "approved",
            "createdAt": "2024-01-15T10:30:00Z"
          },
          {
            "id": 2,
            "productId": 1,
            "title": "Good but expensive",
            "comment": "Quality is great but price is high",
            "rating": 4,
            "authorName": "Jane Smith",
            "authorEmail": "jane@example.com",
            "status": "approved",
            "createdAt": "2024-01-14T15:20:00Z"
          }
        ],
        "pagination": {
          "total": 2,
          "perPage": 10,
          "currentPage": 1
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Product with specified ID does not exist
        solution: Verify the product ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Product Reviews

Retrieve a paginated list of reviews and ratings for a specific product.

## Endpoint

```
GET /api/shop/products/{productId}/reviews
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | integer | Yes | Product ID |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Reviews per page |
| `sort` | string | latest | Sort by (latest, oldest, helpful, rating) |
| `rating` | integer | - | Filter by rating (1-5) |
| `status` | string | approved | Filter by status (approved, pending, rejected) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID |
| `productId` | integer | Product ID reviewed |
| `title` | string | Review title |
| `comment` | string | Review comment/content |
| `rating` | integer | Rating (1-5 stars) |
| `authorName` | string | Reviewer name |
| `authorEmail` | string | Reviewer email |
| `status` | string | Review status (approved, pending, rejected) |
| `helpful` | integer | Number of helpful votes |
| `unhelpful` | integer | Number of unhelpful votes |
| `createdAt` | string | Review creation date |
| `updatedAt` | string | Last update date |

## Pagination

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total reviews for product |
| `perPage` | integer | Reviews per page |
| `currentPage` | integer | Current page |

## Use Cases

- Display product reviews on detail pages
- Show review ratings and statistics
- Filter reviews by rating
- Load recent reviews
- Build review management interfaces

## Related Resources

- [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
- [Get Product](/api/rest-api/shop/products/get-product)
