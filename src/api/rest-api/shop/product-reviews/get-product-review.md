---
outline: false
examples:
  - id: get-product-review
    title: Get Single Product Review
    description: Retrieve detailed information for a specific product review.
    request: |
      GET /api/shop/products/1/reviews/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "productId": 1,
          "title": "Excellent product!",
          "comment": "Very satisfied with this purchase. Great quality and fast delivery.",
          "rating": 5,
          "authorName": "John Doe",
          "authorEmail": "john@example.com",
          "status": "approved",
          "helpful": 24,
          "unhelpful": 2,
          "createdAt": "2024-01-15T10:30:00Z",
          "updatedAt": "2024-01-16T14:20:00Z"
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Review with specified ID does not exist
        solution: Verify the review ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Product Review

Retrieve detailed information for a specific product review.

## Endpoint

```
GET /api/shop/products/{productId}/reviews/{reviewId}
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
| `reviewId` | integer | Yes | Review ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID |
| `productId` | integer | Product ID reviewed |
| `title` | string | Review title |
| `comment` | string | Full review text |
| `rating` | integer | Rating (1-5 stars) |
| `authorName` | string | Reviewer name |
| `authorEmail` | string | Reviewer email |
| `customerId` | integer | Customer ID (if customer review) |
| `status` | string | Review status (approved, pending, rejected) |
| `helpful` | integer | Number of helpful votes |
| `unhelpful` | integer | Number of unhelpful votes |
| `createdAt` | string | Creation date |
| `updatedAt` | string | Last update date |

## Use Cases

- Display individual review details
- Show review with full context
- Build review reply/discussion features
- Load specific review for editing/flagging
- Create featured review sections

## Related Resources

- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
- [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review)
