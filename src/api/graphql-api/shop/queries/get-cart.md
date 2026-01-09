---
outline: false
examples:
  - id: get-cart-details
    title: Get Cart Details
    description: Retrieve the current shopping cart with all items.
    query: |
      query getCart($cartId: String!) {
        cart(id: $cartId) {
          id
          total
          itemsCount
          items {
            id
            product {
              id
              name
              sku
            }
            quantity
            price
          }
        }
      }
    variables: |
      {
        "cartId": "eyJpdiI6IjhWM..."
      }
    response: |
      {
        "data": {
          "cart": {
            "id": "1",
            "total": 299.97,
            "itemsCount": 2,
            "items": [
              {
                "id": "1",
                "product": {
                  "id": "1",
                  "name": "Product Name",
                  "sku": "PROD-001"
                },
                "quantity": 1,
                "price": 99.99
              }
            ]
          }
        }
      }
    commonErrors:
      - error: CART_NOT_FOUND
        cause: Cart ID is invalid or expired
        solution: Create a new cart or check the cart token
      - error: INVALID_CART_ID
        cause: Invalid cart ID format
        solution: Provide valid cart ID
---

# Get Cart

## About

The `getCart` query retrieves the contents and summary information for a customer's shopping cart. Use this query to:

- Display cart previews in sidebars and mini carts
- Render the full shopping cart page
- Calculate cart totals with applied discounts and taxes
- Show line item details and product information
- Track cart state throughout the checkout process
- Sync cart data with external inventory systems

This query returns complete cart information including all items, quantities, prices, and applicable discounts/taxes needed for checkout and order processing.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `String!` | The cart ID or token obtained from `createCart` mutation. |
| `include_discounts` | `Boolean` | Include applied discount information. Default: `true` |
| `include_taxes` | `Boolean` | Include calculated tax information. Default: `true` |
| `include_shipping` | `Boolean` | Include available shipping methods and costs. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique cart identifier/token. |
| `items` | `[CartItem!]!` | Array of products in the cart. |
| `items.id` | `String!` | Unique cart line item ID. |
| `items.product` | `Product!` | Product object with id, name, sku. |
| `items.quantity` | `Int!` | Number of items ordered. |
| `items.price` | `Float!` | Unit price at time of adding to cart. |
| `items.lineTotal` | `Float!` | Total for line item (price × quantity). |
| `itemsCount` | `Int!` | Total number of line items in cart. |
| `itemsQuantity` | `Int!` | Total quantity of all items. |
| `subTotal` | `Float!` | Cart subtotal before discounts and taxes. |
| `discountAmount` | `Float` | Total discount applied to cart. |
| `taxAmount` | `Float!` | Calculated tax on cart. |
| `shippingAmount` | `Float!` | Selected shipping cost. |
| `total` | `Float!` | Grand total (subtotal + tax + shipping - discounts). |
| `appliedCoupons` | `[CouponCode!]` | Active coupon codes applied to cart. |
| `shippingMethods` | `[ShippingMethod!]` | Available shipping options and costs. |
| `currency` | `String!` | Cart currency code (e.g., USD, EUR). |
| `createdAt` | `DateTime!` | Cart creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |

