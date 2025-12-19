# Interactive Playground Guide

Test and explore the Bagisto GraphQL API using our interactive playgrounds. No authentication required to explore the schema!

## GraphiQL Playground

The primary interactive query editor for testing GraphQL queries and mutations.

### Access the Playground

Visit one of these URLs:

🌐 **Live Demo:**
```
https://demo.bagisto.com/api/graphiql
```

**Local Development:**
```
https://your-local-domain.com/api/graphiql
```

### Features

✅ **Auto-complete** - Full schema introspection with code completion
✅ **Documentation** - Built-in schema documentation explorer
✅ **Query History** - Access your previous queries
✅ **Variables** - Test with different variable values
✅ **Query Prettifier** - Auto-format your queries
✅ **Error Highlighting** - Real-time validation

### Interface Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ GraphiQL Playground                                             │
├──────────────────┬──────────────────────┬──────────────────────┤
│                  │                      │                      │
│  QUERY EDITOR    │   VARIABLES PANEL    │  RESULT / DOCS       │
│                  │                      │                      │
│  • Write queries │  • Set variables     │  • View responses    │
│  • Auto-complete │  • Format JSON       │  • See errors        │
│  • Shortcuts     │  • Validation        │  • Browse schema     │
│                  │                      │                      │
└──────────────────┴──────────────────────┴──────────────────────┘
```

## Quick Start Queries

Copy-paste these queries directly into GraphiQL:

### 1. Get Products

```graphql
query GetProducts {
  products(channel: "default", first: 10) {
    pageInfo {
      hasNextPage
      endCursor
    }
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

**Test it:**
1. Open https://demo.bagisto.com/api/graphiql
2. Paste the query above
3. Click **Play** button (▶)
4. See results on the right

### 2. Search Products

```graphql
query SearchProducts($search: String!) {
  products(channel: "default", search: $search, first: 20) {
    edges {
      node {
        id
        name
        price
        productFlat {
          url
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "search": "laptop"
}
```

### 3. Get Product Details

```graphql
query GetProduct($id: String!) {
  product(id: $id) {
    id
    name
    sku
    type
    description
    price
    weight
    status
    images {
      edges {
        node {
          id
          url
          alt
        }
      }
    }
    attributes {
      edges {
        node {
          code
          label
          value
        }
      }
    }
    reviews(first: 5) {
      edges {
        node {
          id
          rating
          title
          comment
          customerName
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

### 4. Get Categories

```graphql
query GetCategories {
  treeCategories(parentId: 1) {
    id
    translation {
      name
      slug
    }
    children {
      edges {
        node {
          id
          translation {
            name
            slug
          }
          children {
            edges {
              node {
                id
                translation {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### 5. Create Guest Cart

```graphql
mutation CreateGuestCart {
  createCartToken(input: {}) {
    cartToken
  }
}
```

**After running:**
1. Copy the `cartToken` value
2. Store for later use in cart operations

### 6. Add to Cart (Guest)

```graphql
mutation AddToCart($cartId: String!, $productId: String!) {
  addProductsToCart(input: {
    cartId: $cartId
    items: [
      { productId: $productId, quantity: 1 }
    ]
  }) {
    cart {
      id
      itemsCount
      grandTotal
      items {
        edges {
          node {
            id
            product {
              name
              price
            }
            quantity
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
  "cartId": "replace-with-your-cart-id",
  "productId": "1"
}
```

### 7. Customer Login

```graphql
mutation LoginCustomer($email: String!, $password: String!) {
  createLogin(input: {
    email: $email
    password: $password
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

**Variables:**
```json
{
  "email": "customer@example.com",
  "password": "password123"
}
```

**After running:**
1. Copy the `accessToken` value
2. Add to request headers (see below)

### 8. Get Customer Profile (Requires Auth)

```graphql
query GetProfile {
  customer {
    id
    firstName
    lastName
    email
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

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### 9. Get Customer Orders

```graphql
query GetOrders {
  customerOrders(first: 20) {
    edges {
      node {
        id
        incrementId
        status
        grandTotal
        createdAt
        items {
          edges {
            node {
              productName
              quantity
              price
            }
          }
        }
      }
    }
  }
}
```

### 10. Create Product Review

```graphql
mutation CreateReview($productId: String!, $title: String!, $rating: Int!, $comment: String!, $name: String!, $email: String!) {
  createReview(input: {
    productId: $productId
    title: $title
    rating: $rating
    comment: $comment
    name: $name
    email: $email
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

**Variables:**
```json
{
  "productId": "1",
  "title": "Excellent Product",
  "rating": 5,
  "comment": "Great quality and fast shipping!",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Using Variables in Queries

Variables make queries reusable and flexible.

### Example: Filter Products with Variables

**Query:**
```graphql
query GetFilteredProducts(
  $channel: String!
  $first: Int!
  $search: String
  $category: Int
) {
  products(
    channel: $channel
    first: $first
    search: $search
    categoryId: $category
  ) {
    edges {
      node {
        id
        name
        price
      }
    }
  }
}
```

**Variables:**
```json
{
  "channel": "default",
  "first": 20,
  "search": "laptop",
  "category": 2
}
```

## Headers for Authentication

### Setting Headers in GraphiQL

1. Click **HTTP Headers** at the bottom
2. Add headers as JSON:

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN",
  "Content-Type": "application/json",
  "Accept-Language": "en_US"
}
```

### Common Headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Authorization` | Customer/Admin token | `Bearer eyJhbGc...` |
| `X-Cart-Token` | Guest cart token | `550e8400-e29b...` |
| `Content-Type` | Request format | `application/json` |
| `Accept-Language` | Locale | `en_US` or `fr_FR` |

## Schema Explorer

GraphiQL includes a powerful schema browser on the right sidebar.

### How to Use

1. Click **Docs** tab (top right)
2. Search for a type, query, or mutation
3. Click to view details
4. See field documentation and arguments

### Common Query Types to Explore

- **Query** - Read operations
  - `products` - Get products
  - `customer` - Get customer profile
  - `cart` - Get cart details

- **Mutation** - Write operations
  - `createLogin` - Customer login
  - `addProductsToCart` - Add to cart
  - `createOrder` - Create order

## Troubleshooting Common Issues

### Query Returns `null`

**Problem:**
```graphql
query {
  product(id: "999") {
    name
  }
}

# Returns: { "data": { "product": null } }
```

**Solution:**
- Check the ID exists
- Verify correct ID format
- Check status/channel filters

### Authentication Error

**Problem:**
```json
{
  "errors": [
    {
      "message": "Unauthenticated"
    }
  ]
}
```

**Solution:**
1. Get valid token via `createLogin` mutation
2. Add token to headers
3. Verify token hasn't expired

### Validation Error

**Problem:**
```json
{
  "errors": [
    {
      "extensions": {
        "validation": {
          "email": ["The email field is invalid"]
        }
      }
    }
  ]
}
```

**Solution:**
- Check input format
- Verify all required fields provided
- See error details in extensions

### Rate Limit Error

**Problem:**
```json
{
  "errors": [
    {
      "message": "Too many requests"
    }
  ]
}
```

**Solution:**
- Wait before making new requests
- Reduce request frequency
- Implement exponential backoff

## Exporting Queries

### Copy cURL Command

1. Right-click query result
2. Select "Copy as cURL"
3. Use in terminal:

```bash
curl 'https://your-domain.com/api/graphql' \
  -H 'content-type: application/json' \
  --data-raw '{"query":"query { ... }"}'
```

### Export to Postman

1. Get query text
2. Create Postman request with:
   - **Method:** POST
   - **URL:** `https://your-domain.com/api/graphql`
   - **Body:** GraphQL query

## Performance Tips

### Write Efficient Queries

**❌ Slow - Too many fields:**
```graphql
query {
  products(first: 1000) {
    edges {
      node {
        id
        name
        description
        attributes {
          edges {
            node { id code value }
          }
        }
        # ... 20+ more fields
      }
    }
  }
}
```

**✅ Fast - Only needed fields:**
```graphql
query {
  products(first: 20) {
    edges {
      node {
        id
        name
        price
      }
    }
  }
}
```

### Use Pagination

Always use pagination with `first` or `last`:

```graphql
query {
  products(first: 20, after: "cursor") {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node { id name }
    }
  }
}
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` / `Cmd+Enter` | Execute query |
| `Ctrl+Shift+P` | Prettify query |
| `Ctrl+Space` | Auto-complete |
| `Ctrl+F` | Find in query |

## External Resources

### Postman Collection

Download the full Postman collection with pre-built requests:

📥 [Download Bagisto GraphQL Postman Collection](../../Bagisto%20Graphql%20API%20Platform.postman_collection.json)

**Steps:**
1. Download collection file
2. Import into Postman
3. Set environment variables
4. Execute pre-built requests

### Apollo Sandbox

Alternative GraphQL playground (similar interface to GraphiQL):

```
https://demo.bagisto.com/api/sandbox
```

## Real-World Examples

### Complete Checkout Flow

1. **Create Cart**
```graphql
mutation {
  createCartToken(input: {}) {
    cartToken
  }
}
```

2. **Add Product**
```graphql
mutation {
  addProductsToCart(input: {
    cartId: "CART_ID_FROM_STEP_1"
    items: [{ productId: "1", quantity: 2 }]
  }) {
    cart { id }
  }
}
```

3. **Estimate Shipping**
```graphql
mutation {
  estimateShipping(input: {
    cartId: "CART_ID"
    country: "US"
    state: "CA"
    zipCode: "90210"
  }) {
    shippingMethods {
      edges {
        node { code title price }
      }
    }
  }
}
```

4. **Create Order**
```graphql
mutation {
  createGuestOrder(input: {
    cartId: "CART_ID"
    billingAddress: {
      firstName: "John"
      lastName: "Doe"
      email: "john@example.com"
      address: "123 Main St"
      city: "New York"
      country: "US"
      state: "NY"
      zipCode: "10001"
    }
    shippingMethod: "flatrate_flatrate"
    paymentMethod: "paypal"
  }) {
    order { id incrementId }
  }
}
```

---

**Get Started:**
1. 🌐 Open [GraphiQL Playground](https://demo.bagisto.com/api/graphiql)
2. 📋 Try one of the queries above
3. 💡 Explore the schema using Docs
4. 🚀 Build your application!

**Need Help?**
- 📚 [Authentication Guide](/api/graphql/authentication)
- 🛍️ [Shop API Reference](/api/graphql/shop-api)
- 💻 [Integration Guides](/api/graphql/integrations)
- 💬 [Community Forum](https://forums.bagisto.com)
