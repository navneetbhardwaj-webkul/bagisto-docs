---
outline: false
examples:
  - id: create-cart-simple
    title: Create Simple Cart
    description: Create a new shopping cart session.
    query: |
      mutation createCart {
        createCartToken {
          token
          message
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createCartToken": {
            "token": "eyJpdiI6IjhWM...",
            "message": "Cart created successfully"
          }
        }
      }
    commonErrors:
      - error: CART_CREATION_FAILED
        cause: Unable to create cart session
        solution: Try again or check server logs
---

# Create Cart

## About

The `createCart` mutation creates a new shopping cart session for a customer. Use this mutation to:

- Initialize a new shopping cart for checkout flows
- Generate a unique cart token for session tracking
- Start the shopping and checkout process
- Create guest carts without customer authentication
- Reset or recover abandoned carts
- Manage multiple concurrent cart sessions

This mutation returns a unique cart token that identifies the cart session. This token must be used in subsequent cart operations (add items, update, checkout).

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `customerId` | `ID` | Optional customer ID for authenticated carts. If omitted, creates a guest cart. |
| `currencyCode` | `String` | ISO 4217 currency code (e.g., USD, EUR). Default: store default currency. |
| `countryCode` | `String` | ISO 3166-1 country code for shipping/tax calculations. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `token` | `String!` | Unique cart session token. Use this in all subsequent cart operations. |
| `cartId` | `String!` | Unique cart identifier. |
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates if cart creation was successful. |
| `cart` | `Cart` | The newly created cart object. |
| `cart.id` | `String!` | Cart identifier. |
| `cart.total` | `Float!` | Current cart total. |
| `cart.itemsCount` | `Int!` | Number of items in cart (typically 0 for new carts). |
| `errors` | `[ErrorMessage!]` | Array of validation or processing errors if applicable. |

