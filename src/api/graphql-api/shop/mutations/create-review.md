---
outline: false
examples:
  - id: create-product-review
    title: Create Product Review
    description: Submit a review and rating for a purchased product.
    query: |
      mutation createReview($input: createProductReviewInput!) {
        createProductReview(input: $input) {
          productReview {
            id
            title
            comment
            rating
            name
            status
            createdAt
          }
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "productId": "1",
          "title": "Great product!",
          "comment": "This product exceeded my expectations. Highly recommended!",
          "rating": 5,
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    response: |
      {
        "data": {
          "createProductReview": {
            "productReview": {
              "id": "1",
              "title": "Great product!",
              "comment": "This product exceeded my expectations. Highly recommended!",
              "rating": 5,
              "name": "John Doe",
              "status": "pending",
              "createdAt": "2025-12-19T10:30:00Z"
            },
            "message": "Review submitted successfully",
            "success": true
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify product ID
      - error: INVALID_RATING
        cause: Rating not between 1-5
        solution: Use rating from 1 to 5
      - error: DUPLICATE_REVIEW
        cause: Customer already reviewed this product
        solution: Update existing review instead
---

# Create Review

## About

The `createReview` mutation submits a product review with rating and feedback. Use this mutation to:

- Enable customer product reviews
- Collect customer feedback and ratings
- Build social proof through reviews
- Display customer testimonials
- Improve products based on feedback
- Increase engagement and trust

This mutation validates input, checks for duplicate reviews, and creates review record (possibly pending moderation).

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `input` | `createProductReviewInput!` | Review submission data. |
| `input.productId` | `ID!` | Product being reviewed. |
| `input.title` | `String!` | Review title/summary. |
| `input.comment` | `String!` | Detailed review comment. |
| `input.rating` | `Int!` | Star rating from 1 to 5. |
| `input.name` | `String!` | Reviewer name. |
| `input.email` | `String!` | Reviewer email. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `productReview` | `ProductReview!` | Created review object. |
| `productReview.id` | `ID!` | Review ID. |
| `productReview.title` | `String!` | Review title. |
| `productReview.comment` | `String!` | Review comment. |
| `productReview.rating` | `Int!` | Star rating (1-5). |
| `productReview.name` | `String!` | Reviewer name. |
| `productReview.status` | `String!` | Review status (pending, approved, rejected). |
| `productReview.createdAt` | `DateTime!` | Review submission date. |
| `message` | `String!` | Success message. |
| `success` | `Boolean!` | Indicates successful submission. |
| `errors` | `[ErrorMessage!]` | Validation errors if submission failed. |

