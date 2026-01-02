---
outline: false
examples:
  - id: register-customer
    title: Customer Registration
    description: Create a new customer account.
    request: |
      POST /api/customers
      Content-Type: application/json

      {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "password": "SecurePassword123!",
        "password_confirmation": "SecurePassword123!",
        "phone": "1234567890"
      }
    response: |
      {
        "@context": "/api/contexts/Customer",
        "@id": "/api/customers/10",
        "@type": "Customer",
        "id": 10,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "status": 1,
        "created_at": "2024-01-20T10:30:00Z"
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
      POST /api/customers
      Content-Type: application/json

      {
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane@example.com",
        "password": "SecurePass456!",
        "password_confirmation": "SecurePass456!",
        "phone": "9876543210",
        "is_subscribed_to_newsletter": true
      }
    response: |
      {
        "@context": "/api/contexts/Customer",
        "@id": "/api/customers/11",
        "@type": "Customer",
        "id": 11,
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane@example.com",
        "phone": "9876543210",
        "is_subscribed_to_newsletter": true,
        "status": 1,
        "created_at": "2024-01-20T10:35:00Z"
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
POST /api/customers
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |

## Request Body

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "password_confirmation": "SecurePassword123!",
  "phone": "1234567890",
  "is_subscribed_to_newsletter": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `first_name` | string | Yes | Customer first name |
| `last_name` | string | Yes | Customer last name |
| `email` | string | Yes | Unique email address |
| `password` | string | Yes | Password (min 8 chars, mixed case, numbers, special) |
| `password_confirmation` | string | Yes | Password confirmation (must match) |
| `phone` | string | No | Phone number |
| `is_subscribed_to_newsletter` | boolean | No | Newsletter subscription (default: false) |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Customer ID |
| `first_name` | string | Customer first name |
| `last_name` | string | Customer last name |
| `email` | string | Customer email |
| `phone` | string | Customer phone |
| `status` | integer | Account status (1=active, 0=inactive) |
| `is_subscribed_to_newsletter` | boolean | Newsletter subscription status |
| `created_at` | string | Creation timestamp |

## Usage Examples

:::examples-selector

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
