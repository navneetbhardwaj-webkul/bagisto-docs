---
outline: false
examples:
  - id: delete-customer-address
    title: Delete Customer Address
    description: Remove an address from the customer's address book.
    request: |
      DELETE /api/shop/customers/addresses/1
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "message": "Address deleted successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Address does not exist
        solution: Verify the address ID
      - error: 403 Forbidden
        cause: Address belongs to different customer
        solution: Only delete your own addresses

---

# Delete Customer Address

Remove an address from the customer's address book.

## Endpoint

```
DELETE /api/shop/customers/addresses/{addressId}
```

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `addressId` | integer | Yes | Address ID to delete |

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

⚠️ **Address deletion effects**

- Address is permanently removed
- Cannot be recovered
- If default address, another is set as default
- Does not affect past orders

## Preconditions

- Address must belong to authenticated customer
- Customer can delete own addresses only
- At least one address may be required

## Use Cases

- Remove old addresses
- Clean up address book
- Delete alternate locations
- Remove incorrect address

## Related Resources

- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses)
- [Create Customer Address](/api/rest-api/shop/customers/create-customer-address)
- [Update Customer Address](/api/rest-api/shop/customers/update-customer-address)
