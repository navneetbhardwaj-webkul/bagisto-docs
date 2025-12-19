# Shop API - Orders

Retrieve and manage customer orders.

## Get Customer Orders

Retrieve a list of orders for the authenticated customer.

```graphql
query GetCustomerOrders($first: Int!) {
  customerOrders(first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        incrementId
        status
        grandTotal
        itemsCount
        createdAt
      }
    }
  }
}
```

**Variables:**
```json
{
  "first": 20
}
```

## Get Order Details

Retrieve complete details for a specific order.

```graphql
query GetOrder($id: String!) {
  order(id: $id) {
    id
    incrementId
    status
    grandTotal
    subtotal
    taxTotal
    shippingTotal
    discountAmount
    createdAt
    billingAddress {
      firstName
      lastName
      address
      city
      state
      country
    }
    shippingAddress {
      firstName
      lastName
      address
      city
      state
      country
    }
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
    shipments {
      edges {
        node {
          id
          status
          trackNumber
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "id": "1"
}
```

## Track Order

Get shipping and tracking information.

```graphql
query TrackOrder($incrementId: String!) {
  order(incrementId: $incrementId) {
    incrementId
    status
    shipments {
      edges {
        node {
          id
          status
          carrierTitle
          trackNumber
          createdAt
          items {
            edges {
              node {
                quantity
              }
            }
          }
        }
      }
    }
  }
}
```

## Related Resources
- [Customers](/api/graphql/shop/customers)
- [Cart](/api/graphql/shop/cart)
- [Checkout](/api/graphql/shop/checkout)
