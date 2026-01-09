# Shop API Reference

The Bagisto Shop API provides all necessary endpoints for customer-facing e-commerce operations including product browsing, shopping cart management, and checkout functionality.

## Overview

The Shop API is designed for:
- **Headless Commerce**: Frontend frameworks (React, Vue, Angular, Next.js)
- **Mobile Applications**: iOS and Android apps
- **Third-party Integrations**: External marketplace apps
- **Progressive Web Apps (PWA)**: Mobile-web hybrids

## Categories

Organize and browse products by category.

### Get Category Tree

Retrieve the hierarchical category structure.

```graphql
query {
  treeCategories(parentId: 1) {
    id
    position
    status
    displayMode
    logoUrl
    bannerUrl
    translation {
      name
      slug
      urlPath
      metaTitle
      metaDescription
      metaKeywords
    }
    children {
      edges {
        node {
          id
          position
          status
          translation { name slug }
          children {
            edges {
              node {
                id
                translation { name slug }
              }
            }
          }
        }
      }
    }
  }
}
```

**Parameters:**
- `parentId`: Parent category ID (default: 1 for root)

**Response Example:**
```json
{
  "data": {
    "treeCategories": {
      "id": "1",
      "position": 0,
      "status": true,
      "translation": {
        "name": "Root",
        "slug": "root",
        "urlPath": ""
      },
      "children": {
        "edges": [
          {
            "node": {
              "id": "2",
              "position": 1,
              "translation": {
                "name": "Electronics",
                "slug": "electronics"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "3",
                      "translation": {
                        "name": "Smartphones",
                        "slug": "smartphones"
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

### Get Products by Category

```graphql
query {
  products(
    channel: "default"
    categoryId: 2
    first: 20
    filters: {
      status: [1]
    }
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        name
        sku
        description
        shortDescription
        price
        productFlat {
          id
          url
          new
          featured
          status
        }
      }
    }
  }
}
```

## Products

Browse, search, and filter products with advanced capabilities.

### Get All Products

```graphql
query {
  products(
    channel: "default"
    first: 50
    after: "cursor"
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        sku
        type
        shortDescription
        description
        price
        cost
        status
        weight
        images {
          edges {
            node {
              id
              type
              path
              url
            }
          }
        }
        videos {
          edges {
            node {
              id
              type
              path
              url
            }
          }
        }
        attributes {
          edges {
            node {
              id
              code
              label
              value
            }
          }
        }
        productFlat {
          id
          url
          metaTitle
          metaDescription
          metaKeywords
          new
          featured
          status
        }
      }
    }
  }
}
```

### Get Product by ID

```graphql
query {
  product(id: "1") {
    id
    name
    sku
    type
    description
    shortDescription
    price
    cost
    weight
    status
    created_at
    updated_at
    images {
      edges {
        node {
          id
          url
          alt
          type
        }
      }
    }
    attributes {
      edges {
        node {
          id
          code
          label
          value
        }
      }
    }
    reviews {
      pageInfo { hasNextPage }
      edges {
        node {
          id
          title
          rating
          comment
          customerName
          createdAt
        }
      }
    }
  }
}
```

### Get Product by SKU

```graphql
query {
  productBySkU(sku: "PROD-001") {
    id
    name
    sku
    description
    price
    availability
    status
  }
}
```

### Get Product by URL Key

```graphql
query {
  productByUrl(url: "awesome-product-name") {
    id
    name
    sku
    description
    price
    productFlat {
      url
      metaTitle
      metaDescription
    }
  }
}
```

### Search Products

```graphql
query {
  products(
    channel: "default"
    search: "laptop"
    first: 20
  ) {
    edges {
      node {
        id
        name
        sku
        price
        description
      }
    }
  }
}
```

### Filter & Sort Products

```graphql
query {
  products(
    channel: "default"
    first: 20
    sort: "name"
    order: "DESC"
    filters: {
      price: { from: 100, to: 500 }
      status: [1]
      brand: ["Apple", "Samsung"]
      rating: { from: 4 }
    }
  ) {
    edges {
      node {
        id
        name
        price
        rating {
          rate
          count
        }
      }
    }
  }
}
```

**Available Sorting Options:**
- `name`: Product name A-Z
- `price`: Price ascending
- `rating`: Customer ratings
- `newest`: Recently added
- `popularity`: Most viewed

**Available Filters:**
- `search`: Text search
- `price`: Price range
- `status`: Product status
- `brand`: Brand filter
- `rating`: Star rating

### Get Configurable Products

For products with multiple variants (e.g., size, color).

```graphql
query {
  product(id: "1") {
    id
    name
    type
    variants {
      edges {
        node {
          id
          sku
          price
          weight
          images {
            edges {
              node { url }
            }
          }
          attributes {
            edges {
              node {
                code
                value
              }
            }
          }
        }
      }
    }
    superAttributes {
      edges {
        node {
          id
          code
          label
          options {
            edges {
              node {
                id
                label
                value
              }
            }
          }
        }
      }
    }
  }
}
```

### Get Product Attributes

```graphql
query {
  attribute(code: "color") {
    id
    code
    label
    type
    options {
      edges {
        node {
          id
          label
          value
          swatchValue
        }
      }
    }
  }
}
```

## Shopping Cart

Manage shopping cart operations for both guest and authenticated customers.

### Create Cart

**For Guest Users:**
```graphql
mutation {
  createCartToken(input: {}) {
    cartToken
  }
}
```

**For Authenticated Customers:**
```graphql
mutation {
  createCart(input: {}) {
    cart {
      id
      itemsCount
      itemsQty
      grandTotal
    }
  }
}
```

### Add Product to Cart

```graphql
mutation {
  addProductsToCart(input: {
    cartId: "your-cart-id"
    items: [
      {
        productId: "1"
        quantity: 2
        superAttributeSelection: {
          color: "red"
          size: "L"
        }
      }
    ]
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
              id
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

### Update Cart Item

```graphql
mutation {
  updateCart(input: {
    cartId: "your-cart-id"
    items: [
      {
        cartItemId: "1"
        quantity: 5
      }
    ]
  }) {
    cart {
      id
      itemsCount
      items {
        edges {
          node {
            id
            quantity
          }
        }
      }
    }
  }
}
```

### Remove Item from Cart

```graphql
mutation {
  removeCartItem(input: {
    cartId: "your-cart-id"
    cartItemId: "1"
  }) {
    cart {
      id
      itemsCount
      items {
        edges {
          node { id }
        }
      }
    }
  }
}
```

### Get Cart

```graphql
query {
  cart(id: "your-cart-id") {
    id
    itemsCount
    itemsQty
    grandTotal
    subtotal
    taxTotal
    shippingTotal
    discountAmount
    couponCode
    items {
      edges {
        node {
          id
          productId
          quantity
          basePrice
          totalPrice
          product {
            id
            name
            sku
            images {
              edges {
                node { url }
              }
            }
          }
        }
      }
    }
    address {
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

### Apply Coupon

```graphql
mutation {
  applyCoupon(input: {
    cartId: "your-cart-id"
    couponCode: "SUMMER2024"
  }) {
    cart {
      id
      couponCode
      discountAmount
      grandTotal
    }
  }
}
```

### Remove Coupon

```graphql
mutation {
  removeCoupon(input: {
    cartId: "your-cart-id"
  }) {
    cart {
      id
      couponCode
      discountAmount
      grandTotal
    }
  }
}
```

### Estimate Shipping

```graphql
mutation {
  estimateShipping(input: {
    cartId: "your-cart-id"
    country: "US"
    state: "CA"
    zipCode: "90210"
  }) {
    shippingMethods {
      edges {
        node {
          id
          code
          title
          description
          price
          basePrice
        }
      }
    }
  }
}
```

### Move to Wishlist

```graphql
mutation {
  moveToWishlist(input: {
    cartId: "your-cart-id"
    cartItemId: "1"
  }) {
    status
    message
  }
}
```

## Checkout

Complete the checkout process and create orders.

### Save Address

```graphql
mutation {
  saveCustomerAddress(input: {
    firstName: "John"
    lastName: "Doe"
    email: "john@example.com"
    address: "123 Main Street"
    city: "New York"
    country: "US"
    state: "NY"
    zipCode: "10001"
    phoneNumber: "2125551234"
    defaultAddress: true
  }) {
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

### Set Shipping Method

```graphql
mutation {
  saveShippingMethod(input: {
    cartId: "your-cart-id"
    shippingMethodCode: "flatrate_flatrate"
  }) {
    cart {
      id
      shippingMethodCode
      shippingTotal
      grandTotal
    }
  }
}
```

### Get Payment Methods

```graphql
query {
  paymentMethods(cartId: "your-cart-id") {
    edges {
      node {
        code
        title
        description
        image
        sortOrder
      }
    }
  }
}
```

### Save Payment Method

```graphql
mutation {
  savePaymentMethod(input: {
    cartId: "your-cart-id"
    method: "paypal"
  }) {
    status
    message
  }
}
```

### Create Order

**For Authenticated Customers:**
```graphql
mutation {
  createOrder(input: {
    cartId: "your-cart-id"
    billingAddressId: "1"
    shippingAddressId: "1"
    shippingMethod: "flatrate_flatrate"
    paymentMethod: "paypal"
  }) {
    order {
      id
      incrementId
      status
      grandTotal
      shippingTotal
      taxTotal
      discountAmount
      createdAt
      items {
        edges {
          node {
            id
            productId
            quantity
            price
          }
        }
      }
    }
  }
}
```

**For Guest Users:**
```graphql
mutation {
  createGuestOrder(input: {
    cartId: "your-cart-id"
    billingAddress: {
      firstName: "John"
      lastName: "Doe"
      email: "john@example.com"
      address: "123 Main Street"
      city: "New York"
      country: "US"
      state: "NY"
      zipCode: "10001"
      phoneNumber: "2125551234"
    }
    shippingMethod: "flatrate_flatrate"
    paymentMethod: "paypal"
  }) {
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

## Customers

Manage customer profiles and accounts.

### Customer Registration

```graphql
mutation {
  createCustomer(input: {
    firstName: "John"
    lastName: "Doe"
    email: "john@example.com"
    password: "SecurePassword123!"
    passwordConfirmation: "SecurePassword123!"
  }) {
    customer {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
}
```

### Customer Login

```graphql
mutation {
  createLogin(input: {
    email: "john@example.com"
    password: "SecurePassword123!"
  }) {
    accessToken
    customer {
      id
      firstName
      lastName
      email
    }
  }
}
```

### Get Customer Profile

```graphql
query {
  customer {
    id
    firstName
    lastName
    email
    gender
    dateOfBirth
    createdAt
    addresses {
      edges {
        node {
          id
          firstName
          lastName
          address
          city
          state
          country
          zipCode
          defaultBilling
          defaultShipping
        }
      }
    }
  }
}
```

### Update Customer Profile

```graphql
mutation {
  updateCustomer(input: {
    firstName: "Jane"
    lastName: "Smith"
    email: "jane@example.com"
    gender: "Female"
    dateOfBirth: "1990-05-15"
  }) {
    customer {
      id
      firstName
      lastName
      email
    }
  }
}
```

### Change Password

```graphql
mutation {
  changeCustomerPassword(input: {
    oldPassword: "OldPassword123!"
    newPassword: "NewPassword456!"
    passwordConfirmation: "NewPassword456!"
  }) {
    status
    message
  }
}
```

### Add Customer Address

```graphql
mutation {
  addCustomerAddress(input: {
    firstName: "John"
    lastName: "Doe"
    address: "456 Oak Avenue"
    city: "Los Angeles"
    state: "CA"
    country: "US"
    zipCode: "90001"
    phoneNumber: "2105551234"
    defaultBilling: false
    defaultShipping: true
  }) {
    address {
      id
      firstName
      address
      city
      defaultShipping
    }
  }
}
```

### Update Customer Address

```graphql
mutation {
  updateCustomerAddress(input: {
    addressId: "1"
    firstName: "Jane"
    lastName: "Smith"
    address: "789 Pine Road"
    city: "San Francisco"
    state: "CA"
    country: "US"
    zipCode: "94102"
  }) {
    address {
      id
      firstName
      address
      city
    }
  }
}
```

### Delete Customer Address

```graphql
mutation {
  deleteCustomerAddress(input: {
    addressId: "1"
  }) {
    status
    message
  }
}
```

### Forgot Password

```graphql
mutation {
  forgotPassword(input: {
    email: "john@example.com"
  }) {
    status
    message
  }
}
```

### Reset Password

```graphql
mutation {
  resetPassword(input: {
    token: "reset-token-from-email"
    email: "john@example.com"
    password: "NewPassword123!"
    passwordConfirmation: "NewPassword123!"
  }) {
    status
    message
  }
}
```

### Customer Logout

```graphql
mutation {
  createLogout(input: {}) {
    status
    message
  }
}
```

## Orders

Retrieve order information and history.

### Get Customer Orders

```graphql
query {
  customerOrders(first: 20) {
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
        shippingMethod
        paymentMethod
        items {
          edges {
            node {
              id
              productId
              quantity
              price
              productName
            }
          }
        }
      }
    }
  }
}
```

### Get Order Details

```graphql
query {
  order(id: "1") {
    id
    incrementId
    status
    grandTotal
    subtotal
    taxTotal
    shippingTotal
    discountAmount
    couponCode
    createdAt
    billingAddress {
      firstName
      lastName
      address
      city
      state
      country
      zipCode
    }
    shippingAddress {
      firstName
      lastName
      address
      city
      state
      country
      zipCode
    }
    items {
      edges {
        node {
          id
          productId
          productName
          sku
          quantity
          price
          totalPrice
        }
      }
    }
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
                id
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

## Reviews

Browse and manage product reviews.

### Get Product Reviews

```graphql
query {
  reviews(productId: "1", first: 20) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        rating
        comment
        customerName
        email
        status
        createdAt
        productId
      }
    }
  }
}
```

### Create Product Review

```graphql
mutation {
  createReview(input: {
    productId: "1"
    title: "Great Product!"
    rating: 5
    comment: "Excellent quality and fast shipping."
    name: "John Doe"
    email: "john@example.com"
  }) {
    review {
      id
      title
      rating
      comment
      status
      createdAt
    }
  }
}
```

## Wishlist

Manage customer wishlists.

### Add to Wishlist

```graphql
mutation {
  addToWishlist(input: {
    productId: "1"
  }) {
    status
    message
    wishlist {
      id
      items {
        edges {
          node {
            id
            productId
            product {
              id
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

### Get Wishlist

```graphql
query {
  wishlist {
    id
    items {
      edges {
        node {
          id
          productId
          addedAt
          product {
            id
            name
            sku
            price
            images {
              edges {
                node { url }
              }
            }
          }
        }
      }
    }
  }
}
```

### Remove from Wishlist

```graphql
mutation {
  removeFromWishlist(input: {
    wishlistItemId: "1"
  }) {
    status
    message
  }
}
```

## Utilities

### Get Countries and States

```graphql
query {
  countries {
    edges {
      node {
        id
        code
        name
        states {
          edges {
            node {
              id
              code
              defaultName
            }
          }
        }
      }
    }
  }
}
```

### Get Default Channel

```graphql
query {
  channel(code: "default") {
    id
    code
    name
    currencyCode
    localeCode
    rootCategoryId
  }
}
```

### Get Available Locales

```graphql
query {
  locales {
    edges {
      node {
        id
        code
        name
      }
    }
  }
}
```

---

**💡 Pro Tips:**
- Use pagination for large result sets
- Cache category trees for faster navigation
- Implement optimistic UI updates for cart changes
- Load high-resolution product images only when needed

**📚 Related Documentation:**
- 🔐 [Authentication](/api/graphql/authentication)
- 💻 [Integration Guides](/api/graphql/integrations)
- 🎯 [Best Practices](/api/graphql/best-practices)
