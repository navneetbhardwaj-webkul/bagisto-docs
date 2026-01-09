---
outline: false
examples:
  - id: delete-customer-address
    title: Delete Customer Address
    description: Delete a customer address.
    query: |
      mutation deleteCustomerAddress($input: DeleteCustomerAddressInput!) {
        deleteCustomerAddress(input: $input) {
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "id": "5"
        }
      }
    response: |
      {
        "data": {
          "deleteCustomerAddress": {
            "message": "Address deleted successfully",
            "success": true
          }
        }
      }
---

# Delete Customer Address

Delete a customer address.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | String | ✅ Yes | Address ID to delete |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Deletion success status |

## Important Notes

- Address must belong to the authenticated customer
- Default address cannot be deleted without setting a new default
- Addresses used in incomplete orders may be archived instead of deleted

## Error Responses

```json
{
  "errors": {
    "id": ["Address not found."],
    "address": ["Cannot delete the default address."]
  }
}
```

## Related Documentation

- [Create Customer Address](/api/graphql/shop/mutations/create-customer-address)
- [Update Customer Address](/api/graphql/shop/mutations/update-customer-address)
- [Get Customer Addresses](/api/graphql/shop/queries/get-customer-addresses)
