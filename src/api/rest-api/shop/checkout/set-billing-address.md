---
outline: false
examples:
  - id: set-billing-address
    title: Set Billing Address
    description: Set the billing address for checkout.
    request: |
      POST /api/shop/checkout/billing-address
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "addressId": 1,
        "useShippingAddress": false
      }
    response: |
      {
        "data": {
          "billingAddress": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "country": "US",
            "postcode": "10001",
            "phone": "1234567890"
          }
        },
        "message": "Billing address set successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Address does not exist
        solution: Verify the address ID

---

# Set Billing Address

Set or update the billing address for the checkout process.

## Endpoint

```
POST /api/shop/checkout/billing-address
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

**Option 1: Use Saved Address**
```json
{
  "addressId": 1
}
```

**Option 2: Same as Shipping Address**
```json
{
  "useShippingAddress": true
}
```

**Option 3: New Address**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "CA",
  "country": "US",
  "postcode": "90001",
  "phone": "9876543210"
}
```

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `billingAddress` | object | Confirmed billing address |
| `message` | string | Success message |

## Billing Address Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address ID |
| `firstName` | string | First name |
| `lastName` | string | Last name |
| `email` | string | Email |
| `address` | string | Street address |
| `city` | string | City |
| `state` | string | State/Province |
| `country` | string | Country code |
| `postcode` | string | Postal code |
| `phone` | string | Phone number |

## Use Cases

- Set billing destination
- Use different address for billing
- Validate billing address
- Create customer invoice address
- Proceed to order placement

## Related Resources

- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address)
- [Get Checkout Addresses](/api/rest-api/shop/checkout/get-addresses)
- [Create Order](/api/rest-api/shop/checkout/place-order)
