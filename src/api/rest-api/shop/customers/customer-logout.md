---
outline: false
examples:
  - id: customer-logout
    title: Customer Logout
    description: End the customer's authenticated session.
    request: |
      POST /api/shop/customers/logout
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "message": "Successfully logged out"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Only authenticated customers can logout
      - error: 400 Bad Request
        cause: Invalid logout request
        solution: Ensure Bearer token is provided

---

# Customer Logout

End the customer's authenticated session and invalidate their token.

## Endpoint

```
POST /api/shop/customers/logout
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{}
```

No body parameters required.

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |

## After Logout

- Token is invalidated
- Cannot use token for further requests
- Customer session is ended
- Must login again to access protected endpoints
- Cart may be cleared (depends on configuration)

## Use Cases

- End customer session
- Log out from dashboard
- Clear authentication token
- Secure session termination
- Multi-session logout

## Important Notes

⚠️ **Token is invalidated immediately after logout**

- Previously working token will return 401
- Cannot be reversed
- Customer must login again
- Cart state depends on configuration

## Security

- Ensures session termination
- Invalidates all tokens for customer
- May clear sensitive data
- Secure way to end session
- Prevents unauthorized access

## Related Resources

- [Customer Login](/api/rest-api/shop/customers/customer-login)
- [Customer Registration](/api/rest-api/shop/customers/customer-registration)
- [Verify Customer Token](/api/rest-api/shop/customers/customer-verify-token)
