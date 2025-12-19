---
outline: false
examples:
  - id: create-order-basic
    title: Create Order from Cart
    description: Convert cart to order with billing and shipping information.
    query: |
      mutation createOrder($input: createOrderInput!) {
        createOrder(input: $input) {
          order {
            id
            orderNumber
            status
            total
            items {
              id
              productName
              quantity
              price
            }
          }
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "cartId": "eyJpdiI6IjhWM...",
          "billingAddress": {
            "firstName": "John",
            "lastName": "Doe",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "postalCode": "10001",
            "country": "US",
            "email": "john@example.com",
            "phone": "123-456-7890"
          },
          "shippingAddress": {
            "firstName": "John",
            "lastName": "Doe",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "postalCode": "10001",
            "country": "US"
          },
          "shippingMethod": "flat_rate",
          "paymentMethod": "cashondelivery"
        }
      }
    response: |
      {
        "data": {
          "createOrder": {
            "order": {
              "id": "1",
              "orderNumber": "100001",
              "status": "pending",
              "total": 99.99,
              "items": [
                {
                  "id": "1",
                  "productName": "Product Name",
                  "quantity": 1,
                  "price": 99.99
                }
              ]
            },
            "message": "Order created successfully",
            "success": true
          }
        }
      }
    commonErrors:
      - error: CART_EMPTY
        cause: Cart has no items
        solution: Add products to cart before checkout
      - error: INVALID_ADDRESS
        cause: Billing or shipping address invalid
        solution: Verify address information
      - error: PAYMENT_FAILED
        cause: Payment processing failed
        solution: Verify payment method details
---

# Create Order

## About

The `createOrder` mutation converts a cart into a finalized order. Use this mutation to:

- Complete checkout process
- Create orders from cart items
- Collect billing and shipping information
- Process payments
- Apply shipping methods
- Finalize customer orders
- Handle order confirmation

This mutation validates cart contents, addresses, payment method, and creates order with appropriate status.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `input` | `createOrderInput!` | Order creation data. |
| `input.cartId` | `String!` | Cart token to convert to order. |
| `input.billingAddress` | `AddressInput!` | Billing address details. |
| `input.shippingAddress` | `AddressInput!` | Shipping address details. |
| `input.shippingMethod` | `String!` | Selected shipping method ID. |
| `input.paymentMethod` | `String!` | Selected payment method. |
| `input.customerNote` | `String` | Optional customer note/message. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `order` | `Order!` | Created order object. |
| `order.id` | `ID!` | Order ID. |
| `order.orderNumber` | `String!` | Order reference number. |
| `order.status` | `String!` | Initial order status. |
| `order.total` | `Float!` | Order grand total. |
| `order.items` | `[OrderItem!]!` | Order line items. |
| `order.createdAt` | `DateTime!` | Order creation timestamp. |
| `message` | `String!` | Success message. |
| `success` | `Boolean!` | Indicates successful order creation. |
| `errors` | `[ErrorMessage!]` | Validation errors if order failed. |

