---
outline: false
examples:
  - id: customer-verify-token
    title: Verify Email Token
    description: Verify a customer's email using a verification token.
    query: |
      mutation verifyToken($input: VerifyTokenInput!) {
        verifyToken(input: $input) {
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "token": "verification-token-from-email"
        }
      }
    response: |
      {
        "data": {
          "verifyToken": {
            "message": "Email verified successfully",
            "success": true
          }
        }
      }
---

# Verify Customer Token

Verify a customer's email address using a verification token.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | String | ✅ Yes | Email verification token sent to customer |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Verification success status |

## Use Cases

- Email verification during registration
- Email change verification
- Account activation

## Error Responses

```json
{
  "errors": {
    "token": ["The verification token is invalid or has expired."]
  }
}
```

## Token Expiration

Verification tokens typically expire after a configurable period (usually 24-48 hours). If a token expires, the customer should request a new verification email.

## Related Documentation

- [Customer Registration](/api/graphql/shop/mutations/customer-registration)
- [Authentication Guide](/api/graphql/authentication)
