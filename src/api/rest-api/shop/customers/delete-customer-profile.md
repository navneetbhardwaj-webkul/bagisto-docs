---
outline: false
examples:
  - id: delete-customer-profile
    title: Delete Customer Profile
    description: Delete the authenticated customer's account.
    request: |
      DELETE /api/shop/customers/profile
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "message": "Account deleted successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 409 Conflict
        cause: Active orders prevent deletion
        solution: Cancel/complete orders before deleting account

---

# Delete Customer Profile

Permanently delete the authenticated customer's account.

## Endpoint

```
DELETE /api/shop/customers/profile
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |

## Important Notes

⚠️ **This action is irreversible**

- Account is permanently deleted
- All personal data is removed
- Order history is preserved (anonymized)
- Wishlist items are deleted
- Reviews are retained without customer info
- Cannot be undone

## Preconditions

- All active orders must be completed/cancelled
- No pending refunds
- Account must be owned by authenticated customer

## Use Cases

- Remove account permanently
- Delete personal information
- Opt out of email marketing
- Account cleanup

## Data Retention

After deletion:
- Account is inaccessible
- Personal information removed
- Orders kept for legal/tax purposes (anonymized)
- Email cannot be reused
- Reviews remain visible (author anonymous)

## Related Resources

- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
- [Update Customer Profile](/api/rest-api/shop/customers/update-customer-profile)
- [Customer Logout](/api/rest-api/shop/customers/customer-logout)
