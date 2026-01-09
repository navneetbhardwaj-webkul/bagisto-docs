---
outline: false
examples:
  - id: delete-customer-profile
    title: Delete Customer Account
    description: Permanently delete the authenticated customer's account.
    query: |
      mutation deleteCustomerProfile($input: DeleteCustomerProfileInput!) {
        deleteCustomerProfile(input: $input) {
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "password": "SecurePassword123!"
        }
      }
    response: |
      {
        "data": {
          "deleteCustomerProfile": {
            "message": "Customer account deleted successfully",
            "success": true
          }
        }
      }
---

# Delete Customer Account

Permanently delete the authenticated customer's account and all associated data.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `password` | String | ✅ Yes | Customer's password for verification |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Deletion success status |

## Important Notes

⚠️ **This action is permanent and cannot be undone**

When a customer account is deleted:
- All personal information is removed
- Order history is archived (for legal compliance)
- Wishlist items are removed
- Addresses are deleted
- Authentication tokens are invalidated

## Error Responses

```json
{
  "errors": {
    "password": ["The provided password is incorrect."],
    "authentication": ["Unauthorized: Invalid or expired token"]
  }
}
```

## Related Documentation

- [Update Customer Profile](/api/graphql/shop/mutations/update-customer-profile)
- [Customer Logout](/api/graphql/shop/mutations/customer-logout)
