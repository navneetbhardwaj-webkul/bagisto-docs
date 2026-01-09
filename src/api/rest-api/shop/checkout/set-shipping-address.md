---
outline: false
examples:
  - id: set-shipping-address
    title: Set Shipping Address
    description: Set the shipping address for checkout.
    request: |
      POST /api/shop/checkout/shipping-address
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "addressId": 1
      }
    response: |
      {
        "data": {
          "shippingAddress": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "country": "US",
            "postcode": "10001",
            "phone": "1234567890"
          },
          "cartTotal": 1319.97
        },
        "message": "Shipping address set successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Address does not exist
        solution: Verify the address ID

---

# Set Shipping Address

Set or update the shipping address for the checkout process.

## Endpoint

```
POST /api/shop/checkout/shipping-address
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

Either use saved address ID or provide new address:

**Option 1: Use Saved Address**
```json
{
  "addressId": 1
}
```

**Option 2: New Address**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "US",
  "postcode": "10001",
  "phone": "1234567890"
}
```

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `shippingAddress` | object | Confirmed shipping address |
| `cartTotal` | decimal | Updated cart total |
| `message` | string | Success message |

## Shipping Address Fields

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

- Set shipping destination
- Calculate shipping costs
- Validate address
- Proceed to shipping method selection
- Update address during checkout

## Effects

- Shipping methods are recalculated
- Shipping cost may change
- Cart total is updated
- Address is locked for shipping

## Related Resources

- [Get Checkout Addresses](/api/rest-api/shop/checkout/get-addresses)
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address)
- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods)
