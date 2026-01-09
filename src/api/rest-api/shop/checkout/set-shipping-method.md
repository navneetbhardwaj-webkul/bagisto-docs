---
outline: false
examples:
  - id: set-shipping-method
    title: Set Shipping Method
    description: Select a shipping method for the order.
    request: |
      POST /api/shop/checkout/shipping-method
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "shippingMethodCode": "flatrate_flatrate",
        "shippingMethod": "flat_rate"
      }
    response: |
      {
        "data": {
          "shippingMethod": {
            "code": "flatrate_flatrate",
            "method": "flat_rate",
            "title": "Flat Rate",
            "price": 10.00
          },
          "cartTotal": 1329.97
        },
        "message": "Shipping method set successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 422 Unprocessable Entity
        cause: Invalid shipping method
        solution: Use method from get-shipping-methods response

---

# Set Shipping Method

Select a shipping method for the order.

## Endpoint

```
POST /api/shop/checkout/shipping-method
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "shippingMethodCode": "flatrate_flatrate",
  "shippingMethod": "flat_rate"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `shippingMethodCode` | string | Yes | Code of the shipping method |
| `shippingMethod` | string | Yes | Shipping method type |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `shippingMethod` | object | Selected shipping method details |
| `cartTotal` | decimal | Updated cart total with shipping |
| `message` | string | Success message |

## Shipping Method Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Shipping method code |
| `method` | string | Shipping method type |
| `title` | string | Display name |
| `price` | decimal | Shipping cost |
| `carrier` | string | Carrier name |

## Use Cases

- Select standard shipping
- Choose express shipping
- Apply overnight delivery
- Calculate final total
- Proceed to payment

## Important Notes

- Must set shipping address first
- Different methods available per location
- Cost varies by location and weight
- Some methods may have time restrictions

## Related Resources

- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods)
- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address)
- [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method)
