---
outline: false
examples:
  - id: get-shipping-methods
    title: Get Shipping Methods
    description: Retrieve available shipping methods for checkout.
    query: |
      query getShippingMethods($cartId: String!) {
        shippingMethods(cartId: $cartId) {
          edges {
            node {
              id
              code
              title
              description
              price
              basePrice
            }
          }
        }
      }
    variables: |
      {
        "cartId": "cart-123"
      }
    response: |
      {
        "data": {
          "shippingMethods": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "code": "flatrate_flatrate",
                  "title": "Flat Rate",
                  "description": "Fixed shipping cost",
                  "price": 10.00,
                  "basePrice": 10.00
                }
              },
              {
                "node": {
                  "id": "2",
                  "code": "free_shipping",
                  "title": "Free Shipping",
                  "description": "Free shipping for orders",
                  "price": 0.00,
                  "basePrice": 0.00
                }
              }
            ]
          }
        }
      }
---

# Get Shipping Methods

Retrieve available shipping methods for a cart during checkout.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cartId` | String | ✅ Yes | Cart ID |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Shipping method ID |
| `code` | String | Shipping method code (for setting) |
| `title` | String | Display name |
| `description` | String | Method description |
| `price` | Float | Shipping cost |
| `basePrice` | Float | Base price before discounts |

## Prerequisites

- Cart must exist
- Shipping address must be set
- Available methods depend on:
  - Cart items
  - Shipping address
  - Store configuration

## Common Methods

| Code | Title | Description |
|------|-------|-------------|
| `flatrate_flatrate` | Flat Rate | Fixed shipping cost |
| `free_shipping` | Free Shipping | No shipping charge |
| `table_rates` | Table Rates | Dynamic rates based on cart |

## Use Cases

- Display shipping options during checkout
- Calculate total with shipping
- Allow customer selection
- Show shipping cost estimates

## Error Responses

```json
{
  "errors": {
    "cartId": ["Cart not found."],
    "shippingAddress": ["Shipping address must be set first."]
  }
}
```

## Related Documentation

- [Get Cart](/api/graphql/shop/queries/get-cart)
- [Set Shipping Address](/api/graphql/shop/mutations/set-shipping-address)
- [Set Shipping Method](/api/graphql/shop/mutations/set-shipping-method)
