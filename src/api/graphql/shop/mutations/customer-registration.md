---
outline: false
examples:
  - id: customer-registration
    title: Customer Registration
    description: Register a new customer account with email and password.
    query: |
      mutation registerCustomer($input: RegisterCustomerInput!) {
        registerCustomer(input: $input) {
          customer {
            id
            firstName
            lastName
            email
            createdAt
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
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@example.com",
          "password": "SecurePassword123!",
          "passwordConfirmation": "SecurePassword123!"
        }
      }
    response: |
      {
        "data": {
          "registerCustomer": {
            "customer": {
              "id": "1",
              "firstName": "John",
              "lastName": "Doe",
              "email": "john.doe@example.com",
              "createdAt": "2024-01-15T10:30:00Z"
            },
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "message": "Customer registered successfully",
            "success": true
          }
        }
      }
---

# Customer Registration

Register a new customer account with Bagisto.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ✅ Yes | Customer's first name |
| `lastName` | String | ✅ Yes | Customer's last name |
| `email` | String | ✅ Yes | Customer's email address (must be unique) |
| `password` | String | ✅ Yes | Password for the account (min. 8 characters) |
| `passwordConfirmation` | String | ✅ Yes | Password confirmation (must match password) |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `customer` | Customer | The created customer object |
| `accessToken` | String | JWT token for API authentication |
| `refreshToken` | String | Token to refresh access token |
| `message` | String | Success or error message |
| `success` | Boolean | Registration success status |

## Validation Rules

- Email must be in valid format and unique
- Password must be at least 8 characters
- Password and password confirmation must match
- First name and last name are required
- Email cannot already exist in the system

## Error Responses

```json
{
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

## Related Documentation

- [Customer Login](/api/graphql/shop/mutations/customer-login)
- [Update Customer Profile](/api/graphql/shop/mutations/update-customer-profile)
- [Authentication Guide](/api/graphql/authentication)
