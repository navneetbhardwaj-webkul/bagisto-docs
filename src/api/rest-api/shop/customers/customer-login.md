---
outline: false
examples:
  - id: customer-login
    title: Customer Login
    description: Authenticate customer with email and password to get access token.
    request: |
      POST /api/shop/customers/login
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "email": "john@example.com",
        "password": "Password123!"
      }
    response: |
      {
        "message": "Logged in successfully",
        "data": {
          "customer": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "status": 1
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid email or password
        solution: Verify credentials and try again
      - error: 400 Bad Request
        cause: Missing email or password
        solution: Provide both email and password
      - error: 403 Forbidden
        cause: Account is suspended
        solution: Contact support to reactivate account

---

# Customer Login

Authenticate a customer with email and password to get authentication token for subsequent requests.


## Endpoint

```
POST /api/shop/customers/login
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

## Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Customer email address |
| `password` | string | Yes | Customer password |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |
| `data` | object | Response data |
| `customer` | object | Customer information |
| `token` | string | Bearer token for authentication |

## Customer Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Customer ID |
| `firstName` | string | Customer first name |
| `lastName` | string | Customer last name |
| `email` | string | Customer email |
| `phone` | string | Customer phone |
| `status` | integer | Account status (1=active) |

## Token Usage

After login, use the returned token in subsequent requests:

```bash
Authorization: Bearer {token}
```

## Session Management

- Token is valid for specified duration (typically 7 days)
- Use [Verify Token](/api/rest-api/shop/customers/customer-verify-token) to check validity
- Use [Customer Logout](/api/rest-api/shop/customers/customer-logout) to end session

## Use Cases

- Authenticate customer on storefront
- Get authentication token for API calls
- Enable customer account access
- Retrieve customer details on login
- Start customer session

## Related Resources

- [Customer Registration](/api/rest-api/shop/customers/customer-registration)
- [Verify Customer Token](/api/rest-api/shop/customers/customer-verify-token)
- [Customer Logout](/api/rest-api/shop/customers/customer-logout)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
