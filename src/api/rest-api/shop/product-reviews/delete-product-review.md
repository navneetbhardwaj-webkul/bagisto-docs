---
outline: false
examples:
  - id: delete-product-review
    title: Delete Product Review
    description: Delete an existing product review.
    request: |
      DELETE /api/shop/products/1/reviews/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "message": "Review deleted successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Not authenticated or not review author
        solution: Ensure you own the review and provide valid token
      - error: 403 Forbidden
        cause: User is not the review author
        solution: Only review author can delete their review
      - error: 404 Not Found
        cause: Review does not exist
        solution: Verify the review ID

---

# Delete Product Review

Delete an existing product review. Only the review author can delete their own review.

## Endpoint

```
DELETE /api/shop/products/{productId}/reviews/{reviewId}
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
| `reviewId` | integer | Yes | Review ID to delete |

## Response (204 No Content)

```
No response body
```

## Alternative Response (200 OK)

```json
{
  "message": "Review deleted successfully"
}
```

## Use Cases

- Allow customers to remove their reviews
- Delete inappropriate or accidental reviews
- Clean up old reviews
- Remove reviews if product opinion changes

## Permissions

- Only review author can delete their review
- Admin users can delete any review
- Deletion is permanent

## Related Resources

- [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
- [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review)
