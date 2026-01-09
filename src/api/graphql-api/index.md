# GraphQL API Overview

Welcome to the Bagisto GraphQL API documentation. This comprehensive guide covers all available endpoints for both customer-facing (Shop) and administrative (Admin) operations.

## API Tiers

Bagisto provides two distinct API tiers to serve different use cases:

### 🛍️ Shop API

The Shop API is designed for customer-facing applications like mobile apps, storefronts, and third-party integrations. It provides read and write access to:

- **Products** - Browse and search products, manage variants
- **Categories** - Navigate category hierarchies
- **Cart** - Create and manage shopping carts
- **Customers** - Customer authentication and profile management
- **Orders** - Order retrieval and tracking
- **Checkout** - Complete checkout workflow
- **Reviews** - Product reviews and ratings

[Explore Shop API →](/api/graphql)

### 🔧 Admin API

The Admin API is for administrative and management applications. Full control over:

- **Products** - Complete product management with bulk operations
- **Categories** - Category hierarchy and product assignment
- **Orders** - Order fulfillment, shipments, invoices, and refunds
- **Customers** - Customer administration and management
- **Inventory** - Stock management across warehouses
- **Promotions** - Coupons, discounts, and cart rules
- **Attributes** - Product attributes and attribute sets
- **Reports** - Sales, product, customer, and inventory analytics

[Explore Admin API →](/api/graphql)

## Getting Started

### 1. Authentication

Choose the appropriate authentication method for your use case:

- **Guest Access** - For unauthenticated Shop API operations
- **Customer Authentication** - For authenticated customer operations
- **Admin Authentication** - For Admin API operations

[Learn about Authentication →](/api/graphql/authentication)

### 2. Cursor Pagination

Bagisto GraphQL API uses cursor-based pagination for efficient collection queries. This method is ideal for handling large datasets and provides a better user experience for infinite scrolling.

#### Pagination Parameters

- **`first`** - Number of items to retrieve from the start (positive integer)
- **`after`** - Cursor to start retrieving items after (used for forward pagination)
- **`last`** - Number of items to retrieve from the end (positive integer)
- **`before`** - Cursor to start retrieving items before (used for backward pagination)
- **`totalItems`** - Total count of items in the collection (returned in response)

#### Example: Get First 10 Products

```graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        name
        price
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalItems
  }
}
```

#### Example: Get Next Page

```graphql
query {
  products(first: 10, after: "cursor_from_previous_response") {
    edges {
      node {
        id
        name
        price
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalItems
  }
}
```

#### Example: Get Last 10 Products

```graphql
query {
  products(last: 10) {
    edges {
      node {
        id
        name
        price
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
    totalItems
  }
}
```

#### Example: Get Previous Page

```graphql
query {
  products(last: 10, before: "cursor_from_response") {
    edges {
      node {
        id
        name
        price
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
    totalItems
  }
}
```

[Learn more about Pagination →](/api/graphql/pagination)

### 3. Exploring the API

Use the interactive GraphQL Playground to test queries and mutations:

- Write and test queries in real-time
- Explore the schema with built-in documentation
- Get instant feedback on syntax errors
- View response examples

[Start with Playground Guide →](/api/graphql/playground)

### 4. Integration

Integrate Bagisto with your applications using one of these languages:

- **JavaScript/TypeScript** - React, Vue, Next.js, etc.
- **Python** - Django, Flask, FastAPI
- **PHP** - Laravel, WordPress, etc.
- **Ruby** - Rails and other frameworks
- **Go** - Go applications and services
- **Java** - Spring Boot, Maven projects

[View Integration Guides →](/api/graphql/integrations)

## Shop API Resources

| Resource | Description | Key Operations |
|----------|-------------|-----------------|
| [Products](/api/graphql/shop/products) | Browse and search products | Get products, Search, Filter, Sort |
| [Categories](/api/graphql/shop/categories) | Navigate category tree | Get categories, Get products by category |
| [Attribute Options](/api/graphql/shop/attribute-options) | Product attribute values | Get options, Translations, Swatches |
| [Cart](/api/graphql/shop/cart) | Manage shopping cart | Create, Add items, Update, Apply coupons |
| [Customers](/api/graphql/shop/customers) | Customer authentication | Register, Login, Profile, Addresses |
| [Orders](/api/graphql/shop/orders) | View and track orders | Get orders, Track shipments |
| [Checkout](/api/graphql/shop/checkout) | Complete purchase flow | Billing address, Shipping, Payment |
| [Reviews](/api/graphql/shop/reviews) | Product reviews | Get reviews, Create review |

## Admin API Resources

| Resource | Description | Key Operations |
|----------|-------------|-----------------|
| [Products](/api/graphql/admin/products) | Full product management | Create, Update, Delete, Bulk operations |
| [Categories](/api/graphql/admin/categories) | Category management | Create, Update, Assign products |
| [Orders](/api/graphql/admin/orders) | Order fulfillment | Shipments, Invoices, Refunds, Comments |
| [Customers](/api/graphql/admin/customers) | Customer administration | Create, Update, Manage addresses |
| [Inventory](/api/graphql/admin/inventory) | Stock management | Update stock, Warehouses, Transfers |
| [Promotions](/api/graphql/admin/promotions) | Promotions & discounts | Coupons, Cart rules, Discounts |
| [Attributes](/api/graphql/admin/attributes) | Product attributes | Create attributes, Options, Sets |
| [Reports](/api/graphql/admin/reports) | Business analytics | Sales, Products, Customers, Inventory |

## Best Practices

Follow these recommendations for production deployments:

- **Performance** - Use pagination, selective field queries
- **Security** - Implement rate limiting, validate inputs
- **Caching** - Cache frequently accessed data
- **Error Handling** - Gracefully handle errors and edge cases
- **Monitoring** - Track API usage and performance

[Read Full Best Practices Guide →](/api/graphql/best-practices)

## Rate Limiting

API endpoints are rate-limited to ensure fair usage:

- **Standard Limits** - 1000 requests per hour per IP
- **Burst Limits** - 100 requests per minute
- **Webhook Delivery** - 10 retries with exponential backoff

Response headers indicate current rate limit status:
- `X-Rate-Limit-Limit` - Total requests allowed
- `X-Rate-Limit-Remaining` - Requests remaining
- `X-Rate-Limit-Reset` - Unix timestamp when limit resets

## Support & Resources

- **Documentation** - [API docs](/)
- **GraphQL Schema** - Available in Playground
- **Community** - [Bagisto Forums](https://forums.bagisto.com/)
- **GitHub** - [Bagisto Repository](https://github.com/bagisto/bagisto)

## Version Info

- **API Version** - 1.0
- **GraphQL Spec** - June 2018
- **Last Updated** - Dec 2025

---

**Ready to get started?** Choose your starting point:

- [Authentication Setup](/api/graphql/authentication) - Configure authentication
- [Shop API](/api/graphql/shop/products) - Browse customer APIs
- [Admin API](/api/graphql/admin/products) - Explore management APIs
- [Playground](/api/graphql/playground) - Test APIs interactively
