---
outline: false
examples:
  - id: customer-login
    title: Customer Login
    description: Authenticate a customer with email and password.
    query: |
      mutation customerLogin($input: createCustomerLoginInput!) {
        createCustomerLogin(input: $input) {
          customerLogin {
            id
            _id
            apiToken
            token
            message
            success
          }
        }
      }
    variables: |
      {
        "input": {
          "email": "john.doe@example.com",
          "password": "SecurePass@123"
        }
      }
    response: |
      {
        "data": {
          "createCustomerLogin": {
            "customerLogin": {
              "id": "1",
              "_id": 1,
              "apiToken": "k0qai81TSMEKjzvjTfVozwu1cJiZFocQWa0TSDyHzULF5Wml4fTPpbRUg400BAMMZcqKucoGWkOD30F4",
              "token": "1|uBBNWI06iuca83vMidTSaNTvjrxqM9Si9EJB0iPo5ccb21c1",
              "message": "You have logged in successfully",
              "success": true
            }
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
| `id` | String | API customer resource ID |
| `_id` | Integer | Customer database ID |
| `apiToken` | String | API authentication token |
| `token` | String | Customer session token |
| `message` | String | Success or error message |
| `success` | Boolean | Login success status |

## Token Usage

Once logged in, use the `apiToken` or `token` in the `Authorization` header for authenticated requests:

```
Authorization: Bearer <token>
```

## Error Responses

**Invalid Email or Password (200):**
```json
{
  "data": {
    "createCustomerLogin": {
      "customerLogin": {
        "id": "0",
        "_id": 0,
        "apiToken": "",
        "token": "",
        "message": "Invalid email or password",
        "success": false
      }
    }
  }
}
```

**Account Suspended (200):**
```json
{
  "data": {
    "createCustomerLogin": {
      "customerLogin": {
        "id": "0",
        "_id": 0,
        "apiToken": "",
        "token": "",
        "message": "Your account has been suspended",
        "success": false
      }
    }
  }
}
```

**Missing Fields (400):**
```json
{
  "errors": [
    {
      "message": "The email field is required."
    }
  ]
}
```

## Token Details

- `apiToken`: Long-lived API authentication token
- `token`: Session token for immediate use
- Both tokens can be used in the `Authorization: Bearer` header
- Tokens expire after a configurable period (typically 24 hours)

## Related Documentation

- [Customer Registration](/api/graphql/shop/mutations/customer-registration)
- [Customer Logout](/api/graphql/shop/mutations/customer-logout)
- [Authentication Guide](/api/graphql/authentication)
