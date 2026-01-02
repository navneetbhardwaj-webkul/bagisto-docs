---
outline: false
examples:
  - id: customer-login
    title: Customer Login
    description: Authenticate a customer with email and password.
    query: |
      mutation customerLogin($input: CustomerLoginInput!) {
        customerLogin(input: $input) {
          customer {
            id
            firstName
            lastName
            email
          }
          accessToken
          refreshToken
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "email": "john.doe@example.com",
          "password": "SecurePassword123!"
        }
      }
    response: |
      {
        "data": {
          "customerLogin": {
            "customer": {
              "id": "1",
              "firstName": "John",
              "lastName": "Doe",
              "email": "john.doe@example.com"
            },
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "message": "Customer logged in successfully",
            "success": true
          }
        }
      }
---

# Customer Login

Authenticate a customer account with email and password.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | String | ✅ Yes | Customer's email address |
| `password` | String | ✅ Yes | Customer's password |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `customer` | Customer | The authenticated customer object |
| `accessToken` | String | JWT token for API authentication |
| `refreshToken` | String | Token to refresh access token |
| `message` | String | Success or error message |
| `success` | Boolean | Login success status |

## Token Usage

Once logged in, use the `accessToken` in the `Authorization` header for authenticated requests:

```
Authorization: Bearer <accessToken>
```

## Error Responses

```json
{
  "errors": {
    "email": ["These credentials do not match our records."]
  }
}
```

## Token Expiration

- `accessToken` expires after a configurable period (typically 1 hour)
- Use `refreshToken` to obtain a new `accessToken` without re-authenticating

## Related Documentation

- [Customer Registration](/api/graphql/shop/mutations/customer-registration)
- [Customer Logout](/api/graphql/shop/mutations/customer-logout)
- [Authentication Guide](/api/graphql/authentication)
