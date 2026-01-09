---
outline: false
examples:
  - id: forgot-password
    title: Forgot Password
    description: Request a password reset email.
    request: |
      POST /api/shop/customers/forgot-password
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "email": "john@example.com"
      }
    response: |
      {
        "message": "Reset password link has been sent to your email"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Email address not found
        solution: Verify the email is associated with an account
      - error: 400 Bad Request
        cause: Invalid email format
        solution: Provide valid email address

---

# Forgot Password

Request a password reset email. A reset link will be sent to the customer's email address.

## Endpoint

```
POST /api/shop/customers/forgot-password
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
  "email": "john@example.com"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address associated with account |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |

## Email Contents

The reset email will contain:
- Reset link with token
- Link expiration information
- Instructions for password reset
- Security information

## Reset Link

The email includes a link in format:
```
https://yourstore.com/reset-password?token=xxxxx
```

## Token Validity

- Reset token valid for 24 hours
- Can be used only once
- Token is invalidated after successful reset
- Requesting new reset invalidates previous token

## Use Cases

- Customer forgot their password
- Locked out of account
- Need to reset forgotten password
- Regain access to account
- Security password change

## Important Notes

- No authentication required
- Email must exist in system
- Token is sent via email
- User must click link in email
- Token expires after 24 hours

## Security

- Token-based reset (not SMS)
- Email verification required
- One-time use tokens
- Prevents unauthorized access
- Rate limiting (optional)

## Related Resources

- [Reset Password](/api/rest-api/shop/customers/reset-password)
- [Customer Login](/api/rest-api/shop/customers/customer-login)
- [Customer Registration](/api/rest-api/shop/customers/customer-registration)
