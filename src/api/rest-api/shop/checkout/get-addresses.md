---
outline: false
examples:
  - id: get-checkout-addresses
    title: Get Checkout Addresses
    description: Retrieve available addresses for checkout.
    request: |
      GET /api/shop/checkout/addresses
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "data": {
          "addresses": [
            {
              "id": 1,
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
          ],
          "defaultShippingId": 1,
          "defaultBillingId": 1
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Customer has no saved addresses
        solution: Add new address first

---

# Get Checkout Addresses

Retrieve customer's saved addresses for use in checkout (shipping and billing).

## Endpoint

```
GET /api/shop/checkout/addresses
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `addresses` | array | List of customer addresses |
| `defaultShippingId` | integer | ID of default shipping address |
| `defaultBillingId` | integer | ID of default billing address |

## Address Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address ID |
| `firstName` | string | First name |
| `lastName` | string | Last name |
| `email` | string | Email address |
| `address` | string | Street address |
| `city` | string | City |
| `state` | string | State/Province |
| `country` | string | Country code |
| `postcode` | string | Postal code |
| `phone` | string | Phone number |

## Use Cases

- Populate shipping address dropdown
- Populate billing address dropdown
- Show saved addresses in checkout
- Allow address selection during checkout
- Set default addresses

## Related Resources

- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address)
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address)
- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods)
