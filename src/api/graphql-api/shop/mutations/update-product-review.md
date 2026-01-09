---
outline: false
examples:
  - id: update-product-review-basic
    title: Update Product Review - Basic
    description: Update basic product review information like title and comment.
    query: |
      mutation updateProductReview($input: updateProductReviewInput!) {
        updateProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/reviews/93",
          "title": "Updated: Excellent quality and very stylish",
          "comment": "After using this for a few weeks, I can confirm it's one of the best purchases. Very durable and comfortable."
        }
      }
    response: |
      {
        "data": {
          "updateProductReview": {
            "productReview": {
              "id": "/api/admin/reviews/93",
              "_id": 93,
              "name": "John Doe",
              "title": "Updated: Excellent quality and very stylish",
              "rating": 5,
              "comment": "After using this for a few weeks, I can confirm it's one of the best purchases. Very durable and comfortable.",
              "status": 0,
              "createdAt": "2025-12-26T19:31:55+05:30",
              "updatedAt": "2025-12-26T20:04:32+05:30"
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format (e.g., "/api/admin/reviews/93")
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/admin/reviews/93"
        solution: Use IRI format ID (/api/admin/reviews/{id}) for review updates
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists

  - id: update-product-review-status
    title: Update Product Review - Change Status
    description: Update product review status (pending, approved, or rejected).
    query: |
      mutation updateProductReview($input: updateProductReviewInput!) {
        updateProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/reviews/92",
          "status": 1
        }
      }
    response: |
      {
        "data": {
          "updateProductReview": {
            "productReview": {
              "id": "/api/admin/reviews/92",
              "_id": 92,
              "name": "Jane Smith",
              "title": "Great Product with Excellent Service",
              "rating": 5,
              "comment": "Received the product on time. Packaging was excellent. Product quality is top-notch. Highly satisfied!",
              "status": 1,
              "createdAt": "2025-12-24T10:15:20+05:30",
              "updatedAt": "2025-12-26T14:30:45+05:30"
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format
      - error: invalid-id-format
        cause: Invalid ID format
        solution: Use IRI format ID (/api/admin/reviews/{id})
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct
      - error: invalid-status
        cause: Status value is not valid
        solution: Use status 0 (pending), 1 (approved), or 2 (rejected)

  - id: update-product-review-complete
    title: Update Product Review - Complete Details
    description: Update all product review fields including rating, comment, and status with tracking.
    query: |
      mutation updateProductReview($input: updateProductReviewInput!) {
        updateProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
            createdAt
            updatedAt
          }
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/reviews/93",
          "productId": 357,
          "title": "Excellent quality and very stylish",
          "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
          "rating": 5,
          "name": "John Doe",
          "status": 1,
          "clientMutationId": "demo-review-update-001"
        }
      }
    response: |
      {
        "data": {
          "updateProductReview": {
            "productReview": {
              "id": "/api/admin/reviews/93",
              "_id": 93,
              "name": "John Doe",
              "title": "Excellent quality and very stylish",
              "rating": 5,
              "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
              "status": 1,
              "createdAt": "2025-12-26T19:31:55+05:30",
              "updatedAt": "2025-12-26T20:04:32+05:30"
            },
            "clientMutationId": "demo-review-update-001"
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format (e.g., "/api/admin/reviews/93")
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/admin/reviews/93"
        solution: Use IRI format ID (/api/admin/reviews/{id}) for review updates
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists
      - error: invalid-product-id
        cause: Product ID is invalid or product does not exist
        solution: Use a valid product ID that exists in the system
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5
      - error: invalid-status
        cause: Status value is not valid
        solution: Use status 0 (pending), 1 (approved), or 2 (rejected)

---

# Update Product Review

## About

The `updateProductReview` mutation allows updating existing product reviews. Use this mutation to:

- Update review title and comment
- Change review rating
- Modify reviewer information
- Update review status (pending, approved, rejected)
- Correct review mistakes
- Approve or reject pending reviews
- Track review updates with client mutation ID

This mutation requires the review ID in IRI format and returns the updated review with current timestamps.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | Review ID in IRI format (e.g., `/api/admin/reviews/93`). Required for identifying which review to update. |
| `productId` | `Int` | ❌ No | The ID of the product being reviewed. |
| `title` | `String` | ❌ No | Review title/headline. |
| `comment` | `String` | ❌ No | Review comment/text. |
| `rating` | `Int` | ❌ No | Star rating (1-5). |
| `name` | `String` | ❌ No | Reviewer's name. |
| `status` | `Int` | ❌ No | Review status (0 = pending, 1 = approved, 2 = rejected). |
| `clientMutationId` | `String` | ❌ No | Optional client mutation tracking ID. |

## Input Fields Details

### id
- **Type**: ID (IRI Format)
- **Required**: Yes
- **Format**: `/api/admin/reviews/{id}` or `/api/shop/reviews/{id}`
- **Description**: Unique identifier for the review being updated.
- **Example**: `/api/admin/reviews/93`
- **Note**: Only IRI format is supported for review updates; numeric IDs are not accepted.

### productId
- **Type**: Integer
- **Required**: No
- **Description**: The product ID associated with this review.
- **Example**: `357`
- **Note**: Typically not changed during review update.

### title
- **Type**: String
- **Required**: No
- **Description**: Review headline. Leave empty to keep current value.
- **Example**: `"Excellent quality and very stylish"`

### comment
- **Type**: String
- **Required**: No
- **Description**: Full review text with detailed feedback. Leave empty to keep current value.
- **Example**: `"Very impressed with the product..."`

### rating
- **Type**: Integer (1-5)
- **Required**: No
- **Description**: Star rating. Leave empty to keep current value.
- **Valid Values**: 1, 2, 3, 4, 5

### name
- **Type**: String
- **Required**: No
- **Description**: Reviewer's name as displayed on review.
- **Example**: `"John Doe"`

### status
- **Type**: Integer
- **Required**: No
- **Valid Values**:
  - `0` - Pending approval
  - `1` - Approved and visible
  - `2` - Rejected/hidden
- **Description**: Current review status.
- **Example**: `1`

### clientMutationId
- **Type**: String
- **Required**: No
- **Description**: Optional tracking ID for this mutation request.
- **Example**: `"demo-review-update-001"`

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `productReview` | `ProductReview!` | The updated product review object. |
| `productReview.id` | `ID!` | Unique review API identifier. |
| `productReview._id` | `Int!` | Numeric review ID. |
| `productReview.name` | `String!` | Reviewer's name. |
| `productReview.title` | `String!` | Review title. |
| `productReview.rating` | `Int!` | Star rating (1-5). |
| `productReview.comment` | `String!` | Review text. |
| `productReview.status` | `Int!` | Review status. |
| `productReview.createdAt` | `DateTime!` | Original creation timestamp (unchanged). |
| `productReview.updatedAt` | `DateTime!` | Updated timestamp (reflects latest change). |
| `clientMutationId` | `String` | Echoed client mutation ID for tracking. |

## Review Status

| Status | Description | Usage |
|--------|-------------|-------|
| `0` | Pending | Awaiting admin approval before display |
| `1` | Approved | Published on product page |
| `2` | Rejected | Hidden from public view |

## ID Format Requirements

### Valid ID Format (IRI)
```
/api/admin/reviews/93
/api/shop/reviews/92
```

### Invalid Formats (Not Supported)
```
93                    ❌ Numeric ID only
reviews/93            ❌ Partial path
/reviews/93           ❌ Incorrect path
```

## Update Behavior

- **Partial Updates**: You can update only specific fields; omitted fields keep their current values
- **Timestamps**: `createdAt` remains unchanged; `updatedAt` updates to current time
- **Required ID**: The review ID must always be provided in IRI format
- **Status Changes**: Can change review status from any state to any other state

## Use Cases

### 1. Approve Pending Review
Use the "Change Status" example to approve a pending review for display on product page.

### 2. Correct Review Mistake
Use the "Basic" example to fix typos or clarifications in review text.

### 3. Update Review Rating
Update the rating if customer changed their assessment after further use.

### 4. Reject Inappropriate Review
Change status to 2 (rejected) to hide inappropriate content.

### 5. Complete Admin Review Update
Use the "Complete" example for comprehensive review updates by admin staff.

## Best Practices

1. **Always Use IRI Format** - Always provide review ID in IRI format (`/api/admin/reviews/{id}`)
2. **Validate Before Update** - Fetch current review data before making changes
3. **Track Changes** - Use clientMutationId for audit trail and tracking
4. **Partial Updates** - Update only necessary fields to preserve existing data
5. **Status Management** - Only approve genuine, quality reviews
6. **Audit Trail** - Log who made changes and when using timestamps
7. **Moderation** - Review text for appropriate content before approval
8. **Notify Users** - Consider notifying customers when review status changes

## Common Update Scenarios

### Approve Review from Pending
Set `status: 1` to make pending review visible to customers.

### Reject Inappropriate Review
Set `status: 2` to hide review with offensive content.

### Update Customer Feedback
Modify `comment` field if customer requests clarification or updates.

### Correct Reviewer Name
Update `name` field if incorrect information was initially submitted.

### Change Rating
Modify `rating` if customer reassesses product after extended use.

## Error Scenarios

### Missing ID
When `id` is not provided, mutation fails with validation error.

### Invalid ID Format
When ID is provided in numeric format instead of IRI format.

### Review Not Found
When provided ID doesn't correspond to existing review.

### Invalid Status Value
When status is outside the valid range (0, 1, 2).

### Invalid Rating Value
When rating is outside the valid range (1-5).

## Related Resources

- [Create Product Review](/api/graphql/shop/mutations/create-product-review) - Create new product reviews
- [Get Product Reviews](/api/graphql/shop/queries/get-product-reviews) - Query product reviews
- [Get Product Review](/api/graphql/shop/queries/get-product-review) - Query single review details
- [Get Product](/api/graphql/shop/queries/get-product) - Query product details
- [Mutations Guide](/api/graphql/shop/mutations) - Overview of shop mutations
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
