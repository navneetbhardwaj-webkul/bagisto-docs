---
outline: false
examples:
  - id: create-product-review
    title: Create Product Review
    description: Create a new product review or rating.
    request: |
      POST /api/shop/products/1/reviews
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "title": "Excellent product!",
        "comment": "Very satisfied with this purchase. Great quality and fast delivery.",
        "rating": 5,
        "authorName": "John Doe",
        "authorEmail": "john@example.com"
      }
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
          "status": "pending",
          "createdAt": "2024-01-20T15:30:00Z"
        },
        "message": "Review submitted successfully and is pending approval"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 422 Validation Error
        cause: Rating not between 1-5 or title is empty
        solution: Ensure rating is 1-5 and provide valid title
      - error: 404 Not Found
        cause: Product does not exist
        solution: Verify the product ID

---

# Create Product Review

Submit a new review and rating for a product. Reviews are typically pending approval before being displayed.

## Endpoint

```
POST /api/shop/products/{productId}/reviews
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | integer | Yes | Product ID being reviewed |

## Request Body

```json
{
  "title": "string",
  "comment": "string",
  "rating": "integer (1-5)",
  "authorName": "string",
  "authorEmail": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Review title (max 255 characters) |
| `comment` | string | Yes | Review content/comment (min 10 characters) |
| `rating` | integer | Yes | Rating (1=Poor, 5=Excellent) |
| `authorName` | string | No | Reviewer name (defaults to customer name) |
| `authorEmail` | string | No | Reviewer email (defaults to customer email) |

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID |
| `productId` | integer | Product ID |
| `title` | string | Review title |
| `comment` | string | Review content |
| `rating` | integer | Star rating |
| `authorName` | string | Reviewer name |
| `authorEmail` | string | Reviewer email |
| `status` | string | Review status (pending, approved, rejected) |
| `createdAt` | string | Creation timestamp |

## Use Cases

- Allow customers to submit product reviews
- Collect product feedback and ratings
- Build social proof on product pages
- Moderate reviews before publishing
- Track customer satisfaction

## Rules

- Customer must be authenticated
- One review per customer per product recommended
- Reviews require approval before display
- Minimum comment length: 10 characters
- Rating must be 1-5 stars

## Related Resources

- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews)
- [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review)
- [Delete Product Review](/api/rest-api/shop/product-reviews/delete-product-review)
- [Get Product](/api/rest-api/shop/products/get-product)
