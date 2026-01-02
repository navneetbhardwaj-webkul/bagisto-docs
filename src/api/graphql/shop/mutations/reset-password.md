---
outline: false
examples:
  - id: reset-password
    title: Reset Password
    description: Reset the customer's password using a reset token.
    query: |
      mutation resetPassword($input: ResetPasswordInput!) {
        resetPassword(input: $input) {
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "token": "reset-token-from-email",
          "email": "john.doe@example.com",
          "password": "NewPassword123!",
          "passwordConfirmation": "NewPassword123!"
        }
      }
    response: |
      {
        "data": {
          "resetPassword": {
            "message": "Password reset successfully",
            "success": true
          }
        }
      }
---

# Reset Password

Reset the customer's password using a reset token.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | String | ✅ Yes | Password reset token from email |
| `email` | String | ✅ Yes | Customer's email address |
| `password` | String | ✅ Yes | New password (min. 8 characters) |
| `passwordConfirmation` | String | ✅ Yes | Password confirmation |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Password reset success status |

## Validation Rules

- Token must be valid and not expired
- Email must match the account associated with the token
- New password must be at least 8 characters
- Password and confirmation must match
- Password cannot be the same as the previous password

## Error Responses

```json
{
  "errors": {
    "token": ["The password reset token is invalid or has expired."],
    "email": ["Email does not match the reset token."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

## Security

- Reset tokens expire after a configurable period (typically 24 hours)
- Only one reset token is valid at a time
- Old tokens are invalidated when a new reset is requested
- After successful reset, customer must login with new password

## Next Steps

After password reset:
1. Customer can login with the new password
2. All previous authentication tokens are invalidated
3. Customer must authenticate again

## Related Documentation

- [Forgot Password](/api/graphql/shop/mutations/forgot-password)
- [Customer Login](/api/graphql/shop/mutations/customer-login)
