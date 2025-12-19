# Shop API - Cart

Manage shopping cart operations for both guest and authenticated customers.

## Create Guest Cart

Create a new cart for guest users.

```graphql
mutation CreateGuestCart {
  createCartToken(input: {}) {
    cartToken
  }
}
```

## Create Authenticated Cart

Create a cart for logged-in customers.

```graphql
mutation CreateAuthCart {
  createCart(input: {}) {
    cart {
      id
      itemsCount
    }
  }
}
```

## Add Product to Cart

Add one or more products to a cart.

```graphql
mutation AddToCart($cartId: String!, $items: [CartItemInput!]!) {
  addProductsToCart(input: {
    cartId: $cartId
    items: $items
  }) {
    cart {
      id
      itemsCount
      items {
        edges {
          node {
            id
            productId
            quantity
            product {
              name
              price
            }
          }
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "cartId": "your-cart-id",
  "items": [
    {
      "productId": "1",
      "quantity": 2
    }
  ]
}
```

## Update Cart Item

Modify the quantity of a cart item.

```graphql
mutation UpdateCartItem($cartId: String!, $cartItemId: String!, $quantity: Int!) {
  updateCart(input: {
    cartId: $cartId
    items: [
      {
        cartItemId: $cartItemId
        quantity: $quantity
      }
    ]
  }) {
    cart {
      id
      itemsCount
    }
  }
}
```

## Remove Cart Item

Remove an item from the cart.

```graphql
mutation RemoveCartItem($cartId: String!, $cartItemId: String!) {
  removeCartItem(input: {
    cartId: $cartId
    cartItemId: $cartItemId
  }) {
    cart {
      id
      itemsCount
    }
  }
}
```

## Get Cart

Retrieve full cart details.

```graphql
query GetCart($cartId: String!) {
  cart(id: $cartId) {
    id
    itemsCount
    grandTotal
    subtotal
    taxTotal
    shippingTotal
    discountAmount
    items {
      edges {
        node {
          id
          quantity
          price
          product {
            name
          }
        }
      }
    }
  }
}
```

## Apply Coupon

Apply a coupon code to the cart.

```graphql
mutation ApplyCoupon($cartId: String!, $code: String!) {
  applyCoupon(input: {
    cartId: $cartId
    couponCode: $code
  }) {
    cart {
      couponCode
      discountAmount
      grandTotal
    }
  }
}
```

## Remove Coupon

Remove an applied coupon.

```graphql
mutation RemoveCoupon($cartId: String!) {
  removeCoupon(input: {
    cartId: $cartId
  }) {
    cart {
      grandTotal
    }
  }
}
```

## Related Resources
- [Products](/api/graphql/shop/products)
- [Checkout](/api/graphql/shop/checkout)
- [Orders](/api/graphql/shop/orders)
