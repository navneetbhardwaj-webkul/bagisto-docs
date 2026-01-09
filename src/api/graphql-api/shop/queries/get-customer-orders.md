---
outline: false
examples:
  - id: get-customer-orders
    title: Get Customer Orders
    description: Retrieve all orders for the authenticated customer.
    query: |
      query getCustomerOrders($first: Int, $after: String) {
        orders(first: $first, after: $after) {
          edges {
            node {
              id
              incrementId
              status
              grandTotal
              subTotal
              taxAmount
              shippingAmount
              discountAmount
              createdAt
              items {
                edges {
                  node {
                    id
                    productId
                    productName
                    quantity
                    price
                  }
                }
              }
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
                  "incrementId": "100000001",
                  "status": "completed",
                  "grandTotal": 299.99,
                  "subTotal": 250.00,
                  "taxAmount": 25.00,
                  "shippingAmount": 10.00,
                  "discountAmount": 0.00,
                  "createdAt": "2024-01-15T10:00:00Z",
                  "items": {
                    "edges": [
                      {
                        "node": {
                          "id": "1",
                          "productId": "1",
                          "productName": "Product Name",
                          "quantity": 2,
                          "price": 125.00
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "cursor-value"
            }
          }
        }
      }
---

# Get Customer Orders

Retrieve all orders for the authenticated customer.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `first` | Int | ❌ No | Number of orders to fetch (default: 10, max: 100) |
| `after` | String | ❌ No | Cursor for forward pagination |
| `last` | Int | ❌ No | Number of orders to fetch backward |
| `before` | String | ❌ No | Cursor for backward pagination |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Order ID |
| `incrementId` | String | Display order number |
| `status` | String | Order status |
| `grandTotal` | Float | Final total including tax and shipping |
| `subTotal` | Float | Subtotal before tax and shipping |
| `taxAmount` | Float | Tax amount |
| `shippingAmount` | Float | Shipping cost |
| `discountAmount` | Float | Discount applied |
| `createdAt` | DateTime | Order creation date |
| `items` | Array | Order items with details |

## Order Status Values

| Status | Description |
|--------|-------------|
| `pending` | Order created, awaiting payment |
| `processing` | Payment confirmed, preparing |
| `shipped` | Order shipped |
| `delivered` | Order delivered |
| `cancelled` | Order cancelled |
| `refunded` | Order refunded |

## Pagination

Uses cursor-based pagination:
- `first` + `after` for forward pagination
- `last` + `before` for backward pagination

## Use Cases

- Display order history
- Show recent orders on dashboard
- Track order status
- Retrieve order details for support

## Error Responses

```json
{
  "errors": {
    "authentication": ["Unauthorized: Invalid or expired token"]
  }
}
```

## Related Documentation

- [Place Order](/api/graphql/shop/mutations/place-order)
- [Get Customer Profile](/api/graphql/shop/queries/get-customer-profile)
