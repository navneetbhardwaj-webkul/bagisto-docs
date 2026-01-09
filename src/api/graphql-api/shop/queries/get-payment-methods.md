---
outline: false
examples:
  - id: get-payment-methods
    title: Get Payment Methods
    description: Retrieve available payment methods for checkout.
    query: |
      query getPaymentMethods {
        paymentMethods {
          edges {
            node {
              id
              code
              title
              description
              isActive
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "paymentMethods": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "code": "paypal",
                  "title": "PayPal",
                  "description": "Pay safely with PayPal",
                  "isActive": true
                }
              },
              {
                "node": {
                  "id": "2",
                  "code": "stripe",
                  "title": "Stripe",
                  "description": "Credit card payment via Stripe",
                  "isActive": true
                }
              },
              {
                "node": {
                  "id": "3",
                  "code": "cash_on_delivery",
                  "title": "Cash on Delivery",
                  "description": "Pay when you receive your order",
                  "isActive": true
                }
              }
            ]
          }
        }
      }
---

# Get Payment Methods

Retrieve available payment methods for checkout.

## Arguments

This query has no required arguments.

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Payment method ID |
| `code` | String | Payment method code (for setting) |
| `title` | String | Display name |
| `description` | String | Method description |
| `isActive` | Boolean | Is method enabled |

## Common Methods

| Code | Title | Description |
|------|-------|-------------|
| `paypal` | PayPal | PayPal online payment |
| `stripe` | Stripe | Credit/debit card via Stripe |
| `cash_on_delivery` | Cash on Delivery | Pay when item is delivered |
| `bank_transfer` | Bank Transfer | Manual bank transfer |
| `credit_card` | Credit Card | Direct credit card payment |

## Method Availability

Available payment methods depend on:
- Store configuration
- Customer country
- Cart total
- Order fulfillment location

## Use Cases

- Display payment options during checkout
- Show available methods based on customer
- Check if method is active
- Build payment selection UI

## Error Responses

```json
{
  "errors": {
    "general": ["No payment methods available."]
  }
}
```

## Related Documentation

- [Set Payment Method](/api/graphql/shop/mutations/set-payment-method)
- [Place Order](/api/graphql/shop/mutations/place-order)
- [Checkout Flow](/api/graphql/shop/checkout)
