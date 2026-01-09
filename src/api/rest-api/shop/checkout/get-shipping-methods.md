---
outline: false
examples:
  - id: get-shipping-methods
    title: Get Available Shipping Methods
    description: Retrieve available shipping methods for checkout.
    request: |
      GET /api/shop/checkout/shipping-methods
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "country": "US",
        "state": "NY",
        "postcode": "10001"
      }
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "standard",
            "name": "Standard Shipping",
            "description": "Delivery in 5-7 business days",
            "price": 10.00,
            "estimatedDays": 7
          },
          {
            "id": 2,
            "code": "express",
            "name": "Express Shipping",
            "description": "Delivery in 2-3 business days",
            "price": 25.00,
            "estimatedDays": 3
          }
        ]
      }
    commonErrors:
      - error: 422 Validation Error
        cause: Invalid location data
        solution: Provide valid country, state, and postcode
      - error: 400 Bad Request
        cause: No shipping methods available for location
        solution: Check location or contact support

---

# Get Shipping Methods

Retrieve available shipping methods based on address and cart contents.

## Endpoint

```
POST /api/shop/checkout/shipping-methods
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

```json
{
  "country": "US",
  "state": "NY",
  "postcode": "10001"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `country` | string | Yes | Country code (ISO) |
| `state` | string | Yes | State/Province code |
| `postcode` | string | Yes | Postal code |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Shipping method ID |
| `code` | string | Shipping method code |
| `name` | string | Display name |
| `description` | string | Method description |
| `price` | decimal | Shipping cost |
| `estimatedDays` | integer | Estimated delivery days |
| `maxDeliveryDate` | string | Expected delivery date |

## Use Cases

- Display shipping options during checkout
- Calculate shipping cost
- Allow customer to select shipping method
- Show delivery estimates
- Filter methods by location

## Notes

- Methods vary by location and product
- Prices may be calculated dynamically
- Some methods may have weight/dimension limits
- International shipping may have restrictions

## Related Resources

- [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method)
- [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods)
- [Get Checkout Addresses](/api/rest-api/shop/checkout/get-addresses)
