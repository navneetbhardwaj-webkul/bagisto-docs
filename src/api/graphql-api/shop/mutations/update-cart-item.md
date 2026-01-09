---
outline: false
examples:
  - id: update-cart-item-quantity
    title: Update Cart Item Quantity
    description: Modify the quantity of an item in the shopping cart.
    query: |
      mutation updateCartItem($cart_id: String!, $item_id: ID!, $quantity: Int!) {
        updateCartItem(input: {cart_id: $cart_id, item_id: $item_id, quantity: $quantity}) {
          cart {
            id
            items {
              id
              product {
                id
                name
              }
              quantity
              price
            }
          }
          message
        }
      }
    variables: |
      {
        "cart_id": "eyJpdiI6IjhWM...",
        "item_id": "1",
        "quantity": 5
      }
    response: |
      {
        "data": {
          "updateCartItem": {
            "cart": {
              "id": "1",
              "items": [
                {
                  "id": "1",
                  "product": {
                    "id": "1",
                    "name": "Product Name"
                  },
                  "quantity": 5,
                  "price": 99.99
                }
              ]
            },
            "message": "Item quantity updated successfully"
          }
        }
      }
    commonErrors:
      - error: ITEM_NOT_FOUND
        cause: Cart item ID does not exist
        solution: Verify item ID
      - error: INVALID_QUANTITY
        cause: Quantity is invalid or exceeds stock
        solution: Use valid quantity
---

# Update Cart Item

## About

The `updateCartItem` mutation modifies the quantity or options of an existing cart item. Use this mutation to:

- Update product quantities in the shopping cart
- Adjust cart items from the cart page
- Modify product options or variants after adding
- Handle quantity increase/decrease operations
- Validate inventory availability for new quantities
- Recalculate cart totals and discounts

This mutation validates the new quantity against available inventory and updates cart totals including any applicable discounts and taxes.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `cart_id` | `String!` | Cart token identifying which cart to update. |
| `item_id` | `ID!` | The cart line item ID to update (from cart items list). |
| `quantity` | `Int` | New quantity. Use 0 to effectively remove item. Min: 1. |
| `options` | `[CartItemOption!]` | Updated product options if changing variants/options. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `cart` | `Cart!` | Updated cart with modified item. |
| `cartItem` | `CartItem!` | The updated cart line item. |
| `cartItem.id` | `String!` | Cart item identifier. |
| `cartItem.product` | `Product!` | Product information. |
| `cartItem.quantity` | `Int!` | Updated quantity. |
| `cartItem.lineTotal` | `Float!` | Recalculated line total. |
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates successful update. |
| `cart.subTotal` | `Float!` | Updated cart subtotal. |
| `cart.total` | `Float!` | Updated cart grand total. |
| `errors` | `[ErrorMessage!]` | Validation errors if quantity unavailable. |

