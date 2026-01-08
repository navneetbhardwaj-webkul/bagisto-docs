---
outline: false
examples:
  - id: register-customer
    title: Customer Registration
    description: Create a new customer account with complete profile information.
    request: |
      POST /api/shop/customers
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "phone": "1234567890",
        "gender": "Male",
        "dateOfBirth": "1990-01-15",
        "subscribedToNewsLetter": true
      }
    response: |
      {
        "id": 12,
        "firstName": "John",
        "lastName": "Doe",
        "gender": "Male",
        "dateOfBirth": "1990-01-15",
        "email": "john@example.com",
        "phone": "1234567890",
        "status": 1,
        "apiToken": "LXrSaQRvrKfSNz5CtHr2r2hBZQ7HtWGVKvNoORHOcsmo0aYpSi7MVPk5dOV3Kjcqjr57MSSQ2eM2lcrg",
        "customerGroupId": null,
        "channelId": null,
        "subscribedToNewsLetter": true,
        "isVerified": 0,
        "isSuspended": 0,
        "token": "269336856151628b51b1e3107906a2bf",
        "rememberToken": null,
        "name": "John Doe"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Email already registered
        solution: Use a different email address
      - error: 422 Validation Error
        cause: Password does not meet requirements
        solution: Use password with 8+ characters, mixed case, numbers, special chars

  - id: register-customer-newsletter
    title: Register with Newsletter Subscription
    description: Create new customer and subscribe to newsletter.
    request: |
      POST /api/shop/customers
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane@example.com",
        "password": "SecurePass456!",
        "confirmPassword": "SecurePass456!",
        "phone": "9876543210",
        "gender": "Female",
        "dateOfBirth": "1990-05-20",
        "subscribedToNewsLetter": true
      }
    response: |
      {
        "id": 13,
        "firstName": "Jane",
        "lastName": "Smith",
        "gender": "Female",
        "dateOfBirth": "1990-05-20",
        "email": "jane@example.com",
        "phone": "9876543210",
        "status": 1,
        "apiToken": "aBcDeFgHiJkLmNoPqRsTuVwXyZ1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9",
        "customerGroupId": null,
        "channelId": null,
        "subscribedToNewsLetter": true,
        "isVerified": 0,
        "isSuspended": 0,
        "token": "36d4d8a94f2c94e5c2a1b0d3f9e8a7c6",
        "rememberToken": null,
        "name": "Jane Smith"
      }
    commonErrors:
      - error: 409 Conflict
        cause: Customer email already exists
        solution: Use unique email or reset password instead
---

# Register Customer

Create a new customer account with email, password, and optional profile information.

## Endpoint

```
POST /api/shop/customers
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!",
  "phone": "1234567890",
  "gender": "Male",
  "dateOfBirth": "1990-01-15",
  "subscribedToNewsLetter": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | string | Yes | Customer first name |
| `lastName` | string | Yes | Customer last name |
| `email` | string | Yes | Unique email address |
| `password` | string | Yes | Password (min 8 chars, mixed case, numbers, special) |
| `confirmPassword` | string | Yes | Password confirmation (must match) |
| `phone` | string | No | Phone number |
| `gender` | string | No | Customer gender (Male/Female) |
| `dateOfBirth` | string | No | Date of birth (YYYY-MM-DD) |
| `subscribedToNewsLetter` | boolean | No | Newsletter subscription (default: false) |

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Customer ID |
| `firstName` | string | Customer first name |
| `lastName` | string | Customer last name |
| `email` | string | Customer email |
| `phone` | string | Customer phone |
| `gender` | string | Customer gender |
| `dateOfBirth` | string | Customer date of birth |
| `apiToken` | string | API authentication token |
| `token` | string | Session token |
| `status` | integer | Account status (1=active, 0=inactive) |
| `subscribedToNewsLetter` | boolean | Newsletter subscription status |
| `isVerified` | integer | Email verification status (0=not verified) |
| `isSuspended` | integer | Suspension status (0=active) |
| `name` | string | Full customer name |
| `customerGroupId` | mixed | Customer group ID |
| `channelId` | mixed | Channel ID |
| `rememberToken` | mixed | Remember token |

## Password Requirements

Passwords must contain:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

## Related Resources

- [Customer Login](/api/rest-api/customers/mutations/login-customer)
- [Update Profile](/api/rest-api/customers/mutations/update-profile)
- [Get Profile](/api/rest-api/customers/queries/get-profile)
