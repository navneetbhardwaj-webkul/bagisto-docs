---
outline: false
examples:
  - id: get-payment-methods
    title: Get Available Payment Methods
    description: Retrieve available payment methods for checkout.
    request: |
      GET /api/shop/checkout/payment-methods
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "card",
            "name": "Credit/Debit Card",
            "description": "Pay with credit or debit card",
            "isActive": true,
            "instructions": ""
          },
          {
            "id": 2,
            "code": "paypal",
            "name": "PayPal",
            "description": "Pay securely with PayPal",
            "isActive": true,
            "instructions": "You will be redirected to PayPal"
          },
          {
            "id": 3,
            "code": "bank_transfer",
            "name": "Bank Transfer",
            "description": "Direct bank transfer",
            "isActive": true,
            "instructions": "Bank details will be provided after order"
          }
        ]
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Payment Methods

Retrieve available payment methods for checkout.

## Endpoint

```
GET /api/shop/checkout/payment-methods
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Payment method ID |
| `code` | string | Payment method code |
| `name` | string | Display name |
| `description` | string | Method description |
| `isActive` | boolean | Method active status |
| `instructions` | string | Payment instructions or notes |
| `icon` | string | Method icon URL |
| `additionalData` | object | Additional configuration (if any) |

## Use Cases

- Display payment options during checkout
- Allow customer to select payment method
- Show payment instructions
- Validate payment method availability
- Implement payment gateway integration

## Common Payment Methods

- Credit/Debit Card (Stripe, Square, etc.)
- PayPal
- Bank Transfer
- Cash on Delivery
- Wallet/Gift Card
- Buy Now Pay Later (Klarna, Afterpay)

## Notes

- Methods availability depends on store configuration
- Some methods may have requirements or restrictions
- Instructions help guide customer through payment
- Payment processing happens after order placement

## Related Resources

- [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method)
- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods)
- [Place Order](/api/rest-api/shop/checkout/place-order)
