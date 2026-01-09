---
outline: false
examples:
  - id: update-product-review
    title: Update Product Review
    description: Update an existing product review.
    request: |
      PUT /api/shop/products/1/reviews/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "title": "Great product!",
        "comment": "Updated review - even better than expected",
        "rating": 5
      }
    response: |
      {
        "data": {
          "id": 1,
          "productId": 1,
          "title": "Great product!",
          "comment": "Updated review - even better than expected",
          "rating": 5,
          "authorName": "John Doe",
          "authorEmail": "john@example.com",
          "status": "pending",
          "updatedAt": "2024-01-21T10:15:00Z"
        },
        "message": "Review updated successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Not authenticated or not review author
        solution: Ensure you own the review and provide valid token
      - error: 403 Forbidden
        cause: User is not the review author
        solution: Only review author can update their review
      - error: 404 Not Found
        cause: Review does not exist
        solution: Verify the review ID

---

# Update Product Review

Update an existing product review. Only the review author can update their own review.

## Endpoint

```
PUT /api/shop/products/{productId}/reviews/{reviewId}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (review author required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | integer | Yes | Product ID |
| `reviewId` | integer | Yes | Review ID to update |

## Request Body

```json
{
  "title": "string",
  "comment": "string",
  "rating": "integer (1-5)"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | No | Updated review title |
| `comment` | string | No | Updated review content |
| `rating` | integer | No | Updated rating (1-5) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID |
| `productId` | integer | Product ID |
| `title` | string | Review title |
| `comment` | string | Review content |
| `rating` | integer | Star rating |
| `authorName` | string | Reviewer name |
| `authorEmail` | string | Reviewer email |
| `status` | string | Review status |
| `updatedAt` | string | Last update timestamp |

## Use Cases

- Allow customers to edit their reviews
- Update reviews based on new experience
- Correct mistakes or typos in reviews
- Change ratings if opinion changes

## Permissions

- Only review author can update their review
- Admin users can update any review
- Updated reviews may require re-approval

## Related Resources

- [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
- [Delete Product Review](/api/rest-api/shop/product-reviews/delete-product-review)
