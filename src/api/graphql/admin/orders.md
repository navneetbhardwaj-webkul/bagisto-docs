---
outline: false
examples:
  - id: get-all-orders
    title: Get All Orders
    description: Retrieve all orders from the admin panel with pagination.
    query: |
      query getOrders($first: Int, $after: String) {
        orders(first: $first, after: $after) {
          edges {
            node {
              id
              orderNumber
              status
              total
              customerEmail
              createdAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "orders": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "orderNumber": "100001",
                  "status": "pending",
                  "total": 199.99,
                  "customerEmail": "customer@example.com",
                  "createdAt": "2025-01-01T12:00:00Z"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "YXJyYXljb25uZWN0aW9uOjEw"
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Admin authentication required
        solution: Provide valid admin credentials
---

# Orders

## About

The `orders` admin query retrieves comprehensive order information for administrative management and fulfillment. Use this query to:

- Display order management dashboards
- Build order lists with filtering and search
- Retrieve order details and history
- Track order status and fulfillment
- Export orders for analysis and reporting
- Sync orders with external fulfillment systems
- Monitor revenue and sales metrics

This query provides complete order metadata including customer info, items, pricing, payment status, and fulfillment details needed for order processing and management.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Orders per page (max: 100). Default: 20. |
| `after` | `String` | Pagination cursor for forward pagination. |
| `last` | `Int` | Orders for backward pagination (max: 100). |
| `before` | `String` | Pagination cursor for backward pagination. |
| `status` | `[OrderStatus!]` | Filter by: `PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`. |
| `sortKey` | `OrderSortKeys` | Sort by: `ID`, `ORDER_NUMBER`, `CREATED_AT`, `TOTAL`. Default: `CREATED_AT` |
| `reverse` | `Boolean` | Reverse sort order. Default: `false` |
| `dateFrom` | `DateTime` | Filter orders created after this date. |
| `dateTo` | `DateTime` | Filter orders created before this date. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[OrderEdge!]!` | Order edges with pagination cursors. |
| `edges.node` | `Order!` | Order object. |
| `edges.node.id` | `ID!` | Order ID. |
| `edges.node.orderNumber` | `String!` | Order number/reference. |
| `edges.node.status` | `String!` | Current order status. |
| `edges.node.customerId` | `ID` | Customer ID. |
| `edges.node.customerEmail` | `String!` | Customer email. |
| `edges.node.items` | `[OrderItem!]!` | Line items in order. |
| `edges.node.subTotal` | `Float!` | Subtotal before tax and shipping. |
| `edges.node.taxAmount` | `Float!` | Tax amount. |
| `edges.node.shippingAmount` | `Float!` | Shipping cost. |
| `edges.node.discountAmount` | `Float` | Discount applied. |
| `edges.node.total` | `Float!` | Order grand total. |
| `edges.node.paymentStatus` | `String!` | Payment status. |
| `edges.node.fulfillmentStatus` | `String!` | Fulfillment status. |
| `edges.node.createdAt` | `DateTime!` | Order creation date. |
| `edges.node.updatedAt` | `DateTime!` | Last update. |
| `nodes` | `[Order!]!` | Flattened order array. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total orders matching filters. |

