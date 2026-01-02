---
outline: false
examples:
  - id: delete-product-review-basic
    title: Delete Product Review - Basic
    description: Delete a product review by providing its ID in IRI format.
    query: |
      mutation deleteProductReview($input: deleteProductReviewInput!) {
        deleteProductReview(input: $input) {
          productReview {
            id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/reviews/93"
        }
      }
    response: |
      {
        "data": {
          "deleteProductReview": {
            "productReview": {
              "id": "/api/admin/reviews/93"
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
        solution: Use IRI format ID (/api/admin/reviews/{id}) for review deletion
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists

  - id: delete-product-review-with-tracking
    title: Delete Product Review - With Tracking
    description: Delete a product review and track the deletion with client mutation ID.
    query: |
      mutation deleteProductReview($input: deleteProductReviewInput!) {
        deleteProductReview(input: $input) {
          productReview {
            id
          }
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/reviews/92",
          "clientMutationId": "delete-review-mutation-001"
        }
      }
    response: |
      {
        "data": {
          "deleteProductReview": {
            "productReview": {
              "id": "/api/admin/reviews/92"
            },
            "clientMutationId": "delete-review-mutation-001"
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format (e.g., "/api/admin/reviews/93")
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/admin/reviews/93"
        solution: Use IRI format ID (/api/admin/reviews/{id}) for review deletion
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists
      - error: unauthorized
        cause: User does not have permission to delete this review
        solution: Ensure the user has admin privileges or is the review owner

---

# Delete Product Review

## About

The `deleteProductReview` mutation allows deleting product reviews. Use this mutation to:

- Remove inappropriate or spam reviews
- Delete duplicate reviews
- Remove reviews at customer request
- Manage review inventory
- Clean up test/demo reviews
- Enforce moderation policies
- Track deletion operations with audit trail

This mutation requires the review ID in IRI format and is a permanent operation that cannot be undone.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | Review ID in IRI format (e.g., `/api/admin/reviews/93`). Required for identifying which review to delete. |
| `clientMutationId` | `String` | ❌ No | Optional client mutation tracking ID for audit trail. |

## Input Fields Details

### id
- **Type**: ID (IRI Format)
- **Required**: Yes
- **Format**: `/api/admin/reviews/{id}` or `/api/shop/reviews/{id}`
- **Description**: Unique identifier for the review being deleted.
- **Example**: `/api/admin/reviews/93`
- **Note**: Only IRI format is supported; numeric IDs are not accepted.
- **Important**: This operation is permanent and cannot be reversed.

### clientMutationId
- **Type**: String
- **Required**: No
- **Description**: Optional tracking ID for this deletion request. Useful for audit trails and request tracking.
- **Example**: `"delete-review-mutation-001"`
- **Usage**: Echoed back in response for request verification and logging.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `productReview` | `ProductReview!` | The deleted product review object. |
| `productReview.id` | `ID!` | ID of the deleted review (returned as confirmation). |
| `clientMutationId` | `String` | Echoed client mutation ID for tracking and audit purposes. |

## ID Format Requirements

### Valid ID Format (IRI)
```
/api/admin/reviews/93
/api/shop/reviews/92
/api/admin/reviews/100
```

### Invalid Formats (Not Supported)
```
93                    ❌ Numeric ID only
reviews/93            ❌ Partial path
/reviews/93           ❌ Incorrect path
```

## Important Notes

### Permanent Operation
- Deletion is **permanent and irreversible**
- No data recovery possible after deletion
- Consider archiving instead of deleting for sensitive data
- Always confirm before deletion in UI

### Before Deletion
- Verify the correct review ID
- Consider user notification requirements
- Check for related data dependencies
- Log deletion reason for audit trail

### After Deletion
- Review cannot be queried by ID
- Related product review counts update
- Customer notification (if applicable)
- Audit log should record deletion

## Use Cases

### 1. Remove Spam Review
Delete reviews that are spam or off-topic.

### 2. Delete Duplicate Reviews
Remove duplicate reviews from same user.

### 3. User Requested Deletion
Delete reviews at customer's explicit request.

### 4. Violation of Policies
Remove reviews that violate community guidelines.

### 5. Test/Demo Data Cleanup
Delete temporary reviews used for testing.

### 6. Data Correction
Remove incorrectly published reviews.

## Best Practices

1. **Confirm Before Delete** - Always confirm deletion in UI before submitting
2. **Log Deletions** - Use clientMutationId to track deletion operations
3. **Archive First** - Consider archiving sensitive reviews instead of deleting
4. **Audit Trail** - Maintain records of who deleted what and when
5. **User Notification** - Notify customers if their review is deleted
6. **Batch Operations** - For multiple deletions, execute sequentially with tracking
7. **Verify ID** - Double-check IRI format ID before submission
8. **Access Control** - Restrict deletion to authorized users only

## Deletion Workflow

```
1. Fetch review details (verify correct review)
2. Show confirmation dialog to user
3. If confirmed:
   a. Submit deleteProductReview mutation
   b. Track with clientMutationId
   c. Handle success response
   d. Update UI (remove from list)
   e. Log deletion in audit trail
4. If cancelled:
   a. Keep review in system
   b. No action needed
```

## Error Scenarios

### Missing ID
When `id` is not provided, mutation fails with validation error.

### Invalid ID Format
When ID is provided in numeric format instead of IRI format.

### Review Not Found
When provided ID doesn't correspond to existing review (already deleted or invalid).

### Unauthorized Access
When user lacks permissions to delete the review.

### Database Constraint
When review deletion fails due to database constraints or triggers.

## Related Operations

**Before Deleting:**
- [Get Product Review](/api/graphql/shop/queries/get-product-review) - Fetch review details
- [Get Product Reviews](/api/graphql/shop/queries/get-product-reviews) - View all reviews

**Review Management:**
- [Create Product Review](/api/graphql/shop/mutations/create-product-review) - Create new reviews
- [Update Product Review](/api/graphql/shop/mutations/update-product-review) - Modify existing reviews

**Related Resources:**
- [Get Product](/api/graphql/shop/queries/get-product) - Query product details
- [Mutations Guide](/api/graphql/shop/mutations) - Overview of shop mutations
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources

## Audit Trail Example

```
Event: Product Review Deleted
Review ID: /api/admin/reviews/93
Mutation ID: delete-review-mutation-001
User: admin@example.com
Timestamp: 2025-12-26T20:15:30+05:30
Reason: Spam content
Status: Success
```

## Recovery Options

Since deletion is permanent:
- **Database Backup**: Restore from database backup (if available)
- **Archive Strategy**: Use status=2 (rejected) instead of deletion for soft-delete
- **Soft Delete**: Flag review as deleted without removing data
- **Audit Log**: Maintain detailed deletion logs for compliance

## Safety Checklist

Before executing delete mutation:
- ✅ Verified correct review ID in IRI format
- ✅ Confirmed review content requires deletion
- ✅ User authorization verified
- ✅ Reason for deletion documented
- ✅ Audit trail prepared
- ✅ User notification plan confirmed
- ✅ Backup verified (if needed)
- ✅ No critical data dependencies

---

**⚠️ Warning**: This operation is irreversible. Always verify the review ID and ensure proper authorization before executing deletion.
