---
outline: false
examples:
  - id: remove-cart-item-simple
    title: Remove Item from Cart
    description: Remove a specific item from the shopping cart.
    query: |
      mutation removeCartItem($cart_id: String!, $item_id: ID!) {
        removeCartItem(input: {cart_id: $cart_id, item_id: $item_id}) {
          cart {
            id
            items {
              id
              product {
                id
                name
              }
              quantity
            }
          }
          message
        }
      }
    variables: |
      {
        "cart_id": "eyJpdiI6IjhWM...",
        "item_id": "1"
      }
    response: |
      {
        "data": {
          "removeCartItem": {
            "cart": {
              "id": "1",
              "items": []
            },
            "message": "Item removed from cart successfully"
          }
        }
      }
    commonErrors:
      - error: ITEM_NOT_FOUND
        cause: Cart item ID does not exist
        solution: Verify item ID in cart
      - error: CART_NOT_FOUND
        cause: Cart session is invalid
        solution: Create a new cart and try again
---

# Remove Cart Item

## About

The `removeCartItem` mutation deletes a product from a customer's shopping cart. Use this mutation to:

- Remove items from the cart page UI
- Delete products from mini cart displays
- Clear unwanted items from ongoing checkout
- Manage cart contents programmatically
- Restore inventory reservations
- Update cart totals and pricing

This mutation removes the line item completely, updates inventory, and recalculates cart totals, discounts, and taxes.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `cart_id` | `String!` | Cart token identifying which cart to modify. |
| `item_id` | `ID!` | The cart line item ID to remove (from cart items). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `cart` | `Cart!` | Updated cart after item removal. |
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates successful removal. |
| `removedItem` | `CartItem!` | The item that was removed. |
| `cart.items` | `[CartItem!]!` | Remaining cart items. |
| `cart.itemsCount` | `Int!` | Updated item count. |
| `cart.subTotal` | `Float!` | Recalculated subtotal. |
| `cart.total` | `Float!` | Recalculated grand total. |
| `errors` | `[ErrorMessage!]` | Errors if removal failed. |

