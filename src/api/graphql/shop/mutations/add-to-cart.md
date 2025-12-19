---
outline: false
examples:
  - id: add-simple-product-to-cart
    title: Add Simple Product to Cart
    description: Add a simple product with quantity to the shopping cart.
    query: |
      mutation addProductToCart($cart_id: String!, $product_id: ID!, $quantity: Int!) {
        addProductToCart(input: {cart_id: $cart_id, product_id: $product_id, quantity: $quantity}) {
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
        "product_id": "1",
        "quantity": 1
      }
    response: |
      {
        "data": {
          "addProductToCart": {
            "cart": {
              "id": "1",
              "items": [
                {
                  "id": "1",
                  "product": {
                    "id": "1",
                    "name": "Product Name"
                  },
                  "quantity": 1,
                  "price": 99.99
                }
              ]
            },
            "message": "Product added to cart successfully"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify product ID
      - error: OUT_OF_STOCK
        cause: Product quantity not available
        solution: Reduce quantity or choose different product
---

# Add to Cart

## About

The `addProductToCart` mutation adds a product to a customer's shopping cart. Use this mutation to:

- Add products from product detail pages to cart
- Implement "Add to Cart" buttons and flows
- Add products programmatically from search results
- Handle quantity selection and variant options
- Update cart inventory reservations
- Track product additions for analytics

This mutation validates product availability, applies applicable pricing rules, and updates the cart total. It handles both simple products and configurable products with variants.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `cart_id` | `String!` | Cart token from `createCart` mutation. Identifies which cart to add to. |
| `product_id` | `ID!` | The product to add. Use product ID from product queries. |
| `quantity` | `Int!` | Number of units to add (must be >= 1). |
| `variant_id` | `ID` | For configurable products, the specific variant to add. |
| `options` | `[CartItemOption!]` | Product-specific options (colors, sizes, custom text). |
| `custom_attributes` | `[CustomAttribute!]` | Custom product attributes and their selected values. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `cart` | `Cart!` | Updated cart with the new item added. |
| `cartItem` | `CartItem!` | The newly added cart line item. |
| `cartItem.id` | `String!` | Unique cart item identifier. |
| `cartItem.product` | `Product!` | Product information. |
| `cartItem.quantity` | `Int!` | Quantity added. |
| `cartItem.price` | `Float!` | Unit price at time of addition. |
| `cartItem.lineTotal` | `Float!` | Total for this line item. |
| `message` | `String!` | Success message or error description. |
| `success` | `Boolean!` | Indicates successful addition. |
| `errors` | `[ErrorMessage!]` | Validation errors (insufficient stock, invalid options, etc.). |

