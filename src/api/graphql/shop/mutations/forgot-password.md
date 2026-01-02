---
outline: false
examples:
  - id: forgot-password
    title: Forgot Password
    description: Request a password reset email for an account.
    query: |
      mutation forgotPassword($input: ForgotPasswordInput!) {
        forgotPassword(input: $input) {
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "email": "john.doe@example.com"
        }
      }
    response: |
      {
        "data": {
          "forgotPassword": {
            "message": "Password reset link sent to your email",
            "success": true
          }
        }
      }
---

# Forgot Password

Request a password reset email for an account.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | String | ✅ Yes | Customer's registered email address |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Request success status |

## Behavior

- Sends a password reset link to the customer's email
- The reset link is valid for a configurable period (typically 24 hours)
- Customer uses the link to set a new password
- Old tokens are invalidated when password is reset

## Error Responses

```json
{
  "errors": {
    "email": ["No account found with this email address."]
  }
}
```

## Email Content

The reset email typically contains:
- A unique password reset link/token
- Expiration time for the token
- Instructions to reset the password
- Security information

## Next Steps

After requesting password reset:
1. Customer receives email with reset link
2. Customer clicks the link
3. Customer enters new password
4. Customer uses [Reset Password](/api/graphql/shop/mutations/reset-password) mutation to confirm

## Related Documentation

- [Reset Password](/api/graphql/shop/mutations/reset-password)
- [Customer Login](/api/graphql/shop/mutations/customer-login)
