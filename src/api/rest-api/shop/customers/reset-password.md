---
outline: false
examples:
  - id: reset-password
    title: Reset Password
    description: Reset the password using the token from the forgot password email.
    request: |
      PUT /api/shop/customers/reset-password
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "email": "john@example.com",
        "password": "newSecurePassword123!",
        "passwordConfirmation": "newSecurePassword123!"
      }
    response: |
      {
        "message": "Password has been successfully reset"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Token is invalid or expired
        solution: Request a new password reset link
      - error: 422 Unprocessable Entity
        cause: Passwords do not match
        solution: Ensure password and confirmation match
      - error: 422 Unprocessable Entity
        cause: Password doesn't meet requirements
        solution: Use stronger password (min 8 chars, special char recommended)

---

# Reset Password

Reset the customer's password using the token received from the forgot password email.

## Endpoint

```
PUT /api/shop/customers/reset-password
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

**Note:** No authentication required for this endpoint

## Request Body

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "john@example.com",
  "password": "newSecurePassword123!",
  "passwordConfirmation": "newSecurePassword123!"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | Reset token from email |
| `email` | string | Yes | Email address |
| `password` | string | Yes | New password |
| `passwordConfirmation` | string | Yes | Confirm new password |

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Special character recommended (!@#$%^&*)
- Cannot be same as old password

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |

## Token Validation

- Token must be from password reset email
- Token expires after 24 hours
- Each token can be used only once
- Token becomes invalid after reset

## After Reset

- New password is active immediately
- Old password no longer works
- Customer must login with new password
- All previous sessions remain active
- May want to logout from other devices

## Use Cases

- Complete forgotten password recovery
- Set new secure password
- Access locked account
- Change compromised password
- Self-service password reset

## Important Notes

- Token must match email address
- Passwords must match exactly
- Token is single-use
- Expired tokens cannot be reused
- Login required after reset

## Security

- Validates token ownership
- Requires email verification
- Password hashed before storage
- One-time use tokens
- Rate limiting recommended

## Related Resources

- [Forgot Password](/api/rest-api/shop/customers/forgot-password)
- [Customer Login](/api/rest-api/shop/customers/customer-login)
- [Update Customer Profile](/api/rest-api/shop/customers/update-customer-profile)
