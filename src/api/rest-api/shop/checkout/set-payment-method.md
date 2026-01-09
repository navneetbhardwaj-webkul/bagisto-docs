---
outline: false
examples:
  - id: set-payment-method
    title: Set Payment Method
    description: Select a payment method for the order.
    request: |
      POST /api/shop/checkout/payment-method
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "payment": {
          "method": "paypal"
        }
      }
    response: |
      {
        "data": {
          "paymentMethod": {
            "method": "paypal",
            "title": "PayPal",
            "description": "Pay securely with PayPal"
          }
        },
        "message": "Payment method set successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 422 Unprocessable Entity
        cause: Invalid payment method
        solution: Use method from get-payment-methods response

---

# Set Payment Method

Select a payment method for the order checkout.

## Endpoint

```
POST /api/shop/checkout/payment-method
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
  "payment": {
    "method": "paypal"
  }
}
```

## Payment Method Options

Common payment methods:
- `paypal` - PayPal
- `stripe` - Stripe
- `cod` - Cash on Delivery
- `bank_transfer` - Bank Transfer

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `paymentMethod` | object | Selected payment method details |
| `message` | string | Success message |

## Payment Method Fields

| Field | Type | Description |
|-------|------|-------------|
| `method` | string | Payment method code |
| `title` | string | Display name |
| `description` | string | Method description |
| `instructions` | string | Payment instructions |

## Use Cases

- Select PayPal payment
- Choose credit card
- Use cash on delivery
- Select bank transfer
- Finalize payment details

## Validation Rules

- Payment method must be available
- Must have valid billing address
- Some methods restricted by location
- Payment may require additional setup

## Related Resources

- [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods)
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address)
- [Place Order](/api/rest-api/shop/checkout/place-order)
