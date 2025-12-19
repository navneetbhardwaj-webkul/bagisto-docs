# Shop API - Checkout

Complete the checkout process and create orders.

## Save Billing Address

Save billing address for checkout.

```graphql
mutation SaveBillingAddress($input: SaveAddressInput!) {
  saveCustomerAddress(input: $input) {
    address {
      id
      firstName
      lastName
      address
      city
      state
      country
      zipCode
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "US",
    "zipCode": "10001"
  }
}
```

## Estimate Shipping

Get available shipping methods and costs.

```graphql
mutation EstimateShipping($input: EstimateShippingInput!) {
  estimateShipping(input: $input) {
    shippingMethods {
      edges {
        node {
          code
          title
          description
          price
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "cartId": "cart-id",
    "country": "US",
    "state": "CA",
    "zipCode": "90210"
  }
}
```

## Set Shipping Method

Select a shipping method for the order.

```graphql
mutation SetShipping($input: ShippingMethodInput!) {
  saveShippingMethod(input: $input) {
    cart {
      id
      shippingTotal
      grandTotal
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "cartId": "cart-id",
    "shippingMethodCode": "flatrate_flatrate"
  }
}
```

## Get Payment Methods

Retrieve available payment methods for the store.

```graphql
query GetPaymentMethods($cartId: String!) {
  paymentMethods(cartId: $cartId) {
    edges {
      node {
        code
        title
        description
        image
      }
    }
  }
}
```

## Set Payment Method

Select a payment method for the order.

```graphql
mutation SetPayment($input: PaymentMethodInput!) {
  savePaymentMethod(input: $input) {
    status
    message
  }
}
```

**Variables:**
```json
{
  "input": {
    "cartId": "cart-id",
    "method": "paypal"
  }
}
```

## Create Order (Authenticated)

Place an order as an authenticated customer.

```graphql
mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    order {
      id
      incrementId
      status
      grandTotal
      createdAt
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "cartId": "cart-id",
    "billingAddressId": "1",
    "shippingAddressId": "1",
    "shippingMethod": "flatrate_flatrate",
    "paymentMethod": "paypal"
  }
}
```

## Create Order (Guest)

Place an order as a guest user.

```graphql
mutation CreateGuestOrder($input: CreateGuestOrderInput!) {
  createGuestOrder(input: $input) {
    order {
      id
      incrementId
      status
      grandTotal
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "cartId": "cart-id",
    "billingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "address": "123 Main St",
      "city": "New York",
      "country": "US",
      "state": "NY",
      "zipCode": "10001"
    },
    "shippingMethod": "flatrate_flatrate",
    "paymentMethod": "paypal"
  }
}
```

## Related Resources
- [Cart](/api/graphql/shop/cart)
- [Orders](/api/graphql/shop/orders)
- [Customers](/api/graphql/shop/customers)
