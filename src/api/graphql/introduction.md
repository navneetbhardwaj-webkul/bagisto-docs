# GraphQL API - Introduction

Welcome to the Bagisto GraphQL API documentation! This guide will help you build modern, efficient e-commerce applications using our comprehensive GraphQL platform.

## What is GraphQL?

GraphQL is a query language and runtime that allows clients to request exactly the data they need—nothing more, nothing less. It provides a strongly typed schema and enables developers to build flexible, efficient APIs.

**Key Benefits for Bagisto:**
- 🎯 **Precise Data Fetching** - Request only the fields you need
- ⚡ **Reduced Bandwidth** - Smaller payloads improve performance
- 📱 **Mobile Optimized** - Perfect for bandwidth-constrained environments
- 🔄 **Single Endpoint** - All operations through one `/api/graphql` endpoint
- 📚 **Self-Documenting** - Schema includes inline documentation
- 🛠️ **Developer Friendly** - Interactive playground included

## Architecture Overview

Bagisto's GraphQL API is built on **API Platform for Laravel**, a powerful framework that provides robust GraphQL support out of the box. This architecture enables a modern, type-safe API layer with minimal configuration.

Bagisto's GraphQL API is built using the **Platforma API Laravel plugin** with **Bagisto's GraphQL plugin**, providing two distinct API layers:

### 🛍️ Shop API (Frontend)
The public-facing API for customer-facing operations:
- Product browsing and search
- Customer authentication and profile management
- Shopping cart management
- Checkout and order placement
- Reviews and ratings
- Wishlist management

### 👨‍💼 Admin API (Backend)
The administrative API for management operations:
- Product and category management
- Customer administration
- Order management and fulfillment
- System configuration
- Reports and analytics

## Quick Start
 
### Access the Playground

Two ways to explore the API:

**Interactive GraphQL Playground:**
```
https://your-domain.com/api/graphql
```

## API Endpoints

| Endpoint | Purpose | Authentication |
|----------|---------|-----------------|
| `/api/graphql` | Main GraphQL endpoint | Optional (Shop APIs) / Required (Admin APIs) |

## Authentication Methods

### Guest Checkout
Perfect for unauthenticated users:

```graphql
mutation {
  createCartToken(input: {}) {
    cartToken
  }
}
```

Use the `cartToken` in subsequent requests via the `X-Cart-Token` header.

### Customer Authentication

```graphql
mutation {
  createLogin(input: {
    email: "customer@example.com"
    password: "password123"
  }) {
    accessToken
    customer {
      id
      firstName
      email
    }
  }
}
```

Use the `accessToken` in the `Authorization: Bearer TOKEN` header.

### Token Verification

```graphql
mutation {
  createVerifyToken(input: {
    token: "your-token-here"
  }) {
    verifyToken {
      isValid
      message
    }
  }
}
```

## Making Your First Request

### Using cURL

```bash
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { products(first: 10) { edges { node { id name } } } }"
  }'
```

### Using JavaScript/Fetch

```javascript
const query = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          name
          price
        }
      }
    }
  }
`;

const response = await fetch('https://your-domain.com/api/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query })
});

const data = await response.json();
console.log(data);
```

### Using Python

```python
import requests

query = """
  query {
    products(first: 10) {
      edges {
        node {
          id
          name
          price
        }
      }
    }
  }
"""

response = requests.post(
    'https://your-domain.com/api/graphql',
    json={'query': query}
)

data = response.json()
print(data)
```

## Response Format

All GraphQL responses follow a consistent format:

```json
{
  "data": {
    "products": {
      "edges": [
        {
          "node": {
            "id": "1",
            "name": "Product Name",
            "price": "99.99"
          }
        }
      ]
    }
  }
}
```

### Error Responses

```json
{
  "errors": [
    {
      "message": "Validation failed",
      "extensions": {
        "validation": {
          "email": ["The email field is invalid"]
        }
      }
    }
  ],
  "data": null
}
```

## Common Headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Authorization` | Authentication token | `Bearer eyJhbGc...` |
| `X-Cart-Token` | Guest cart token | `550e8400-e29b...` |
| `Content-Type` | Request format | `application/json` |
| `Accept-Language` | Locale/Language | `en_US` or `fr_FR` |

<!-- ## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Guest Requests**: 100 requests per minute per IP
- **Authenticated Requests**: 1000 requests per minute per customer
- **Admin Requests**: 500 requests per minute per admin user

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1702000000
``` -->

## Pagination

Bagisto uses cursor-based pagination for efficient data retrieval:

```graphql
query {
  products(first: 20, after: "cursor-value") {
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
      }
    }
  }
}
```

Parameters:
- `first`: Number of items to return (max: 100)
- `after`: Cursor to start from
- `last`: Number of items from end
- `before`: Cursor to end at

## What's Next?

- 📚 [Shop API Reference](/api/graphql/shop-api) - Complete shop operations guide
- 🔑 [Admin API Reference](/api/graphql/admin-api) - Admin operations guide
- 🔐 [Authentication Guide](/api/graphql/authentication) - Detailed auth methods
- 🧪 [Integration Guides](/api/graphql/integrations) - Code examples for your stack
- 💡 [Best Practices](/api/graphql/best-practices) - Performance and security tips

## Support & Resources

- 🌐 [Interactive Playground](https://demo.bagisto.com/api/graphiql)
- 📖 [Schema Documentation](https://demo.bagisto.com/api/graphiql)
- 💬 [Community Forum](https://forums.bagisto.com)
- 🐛 [Issue Tracker](https://github.com/bagisto/bagisto/issues)
- 📧 [Contact Support](https://bagisto.com/en/contacts/)
---