---
outline: false
examples:
  - id: customer-verify-token
    title: Verify Customer Token
    description: Verify if the customer authentication token is still valid.
    request: |
      GET /api/shop/customers/verify-token
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "data": {
          "valid": true,
          "customer": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com"
          }
        },
        "message": "Token is valid"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Token is expired or invalid
        solution: Login again to get new token
      - error: 400 Bad Request
        cause: No token provided
        solution: Include Authorization header with Bearer token

---

# Verify Customer Token

Verify if the customer authentication token is still valid and retrieve customer information.

## Endpoint

```
GET /api/shop/customers/verify-token
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token to verify |

## Response Fields (200 OK - Valid Token)

| Field | Type | Description |
|-------|------|-------------|
| `valid` | boolean | Token validity status |
| `customer` | object | Customer information |
| `message` | string | Success message |

## Customer Fields (if valid)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Customer ID |
| `firstName` | string | First name |
| `lastName` | string | Last name |
| `email` | string | Email address |

## Token States

- **Valid (200)** - Token is active and not expired
- **Invalid (401)** - Token is expired or tampered with
- **Missing (400)** - No token provided

## Use Cases

- Check if user is still logged in
- Validate session before API calls
- Prevent stale token usage
- Auto-logout on token expiry
- Refresh session state

## Token Expiry

- Tokens expire after a set period (typically 7 days)
- Expired tokens return 401 Unauthorized
- Use refresh token to get new token (if available)
- Token becomes invalid after user logout

## Related Resources

- [Customer Login](/api/rest-api/shop/customers/customer-login)
- [Customer Logout](/api/rest-api/shop/customers/customer-logout)
- [Customer Registration](/api/rest-api/shop/customers/customer-registration)
