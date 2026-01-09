---
outline: false
examples:
  - id: customer-logout
    title: Customer Logout
    description: Logout a customer and invalidate their authentication tokens.
    query: |
      mutation customerLogout {
        customerLogout {
          message
          success
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerLogout": {
            "message": "Customer logged out successfully",
            "success": true
          }
        }
      }
---

# Customer Logout

Logout a customer and invalidate their authentication tokens.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Logout success status |

## Behavior

- Invalidates the current access token
- Invalidates the refresh token
- Clears any session-related data
- Customer will need to login again for future requests

## Error Responses

```json
{
  "errors": {
    "authentication": ["Unauthorized: Invalid or expired token"]
  }
}
```

## Related Documentation

- [Customer Login](/api/graphql/shop/mutations/customer-login)
- [Authentication Guide](/api/graphql/authentication)
