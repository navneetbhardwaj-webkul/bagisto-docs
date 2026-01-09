# GraphQL API

Bagisto's GraphQL API delivers a modern, flexible approach to e-commerce data access. Built on Laravel Lighthouse, it provides efficient querying capabilities perfect for headless commerce, mobile apps, and modern frontend frameworks.

## 🚀 Quick Navigation

Choose your next step:

| Documentation | Description |
|---|---|
| 📖 [Introduction](/api/graphql/introduction) | Get started with GraphQL basics and API overview |
| 🔐 [Authentication](/api/graphql/authentication) | Learn all authentication methods and token management |
| 🛍️ [Shop API](/api/graphql/shop-api) | Customer-facing e-commerce operations reference |
| 👨‍💼 [Admin API](/api/graphql/admin-api) | Administrative operations and management reference |
| 🎮 [Playground Guide](/api/graphql/playground) | Interactive testing with sample queries |
| 💻 [Integration Guides](/api/graphql/integrations) | Code examples for multiple programming languages |
| 💡 [Best Practices](/api/graphql/best-practices) | Performance, security, and testing best practices |

## 🌐 Live Playground

Test queries instantly without any setup:

🎮 **[GraphQL Playground](https://demo.bagisto.com/api/graphiql)** - Interactive query builder with schema explorer

## Key Features

✨ **Developer Friendly**
- Interactive GraphiQL playground
- Auto-complete and schema documentation
- Copy as cURL functionality
- Real-time error reporting

🚀 **High Performance**
- Request only the data you need
- Cursor-based pagination
- Query optimization tools
- Caching support

🔒 **Secure**
- Multiple authentication methods
- Guest checkout support
- Token-based security
- Rate limiting

📱 **Mobile Ready**
- Optimized for low bandwidth
- Small payload sizes
- Perfect for native apps

## What Can You Build?

- 🛒 Headless storefronts and e-commerce sites
- 📱 Mobile apps (iOS & Android)
- 🔄 Third-party integrations and marketplaces
- 📊 Analytics dashboards
- ⚡ Progressive Web Apps (PWA)
- 🤖 AI-powered shopping assistants

## Quick Start

### 1. Choose Your Path

**For Building Customer-Facing Apps:**
- Start with [Shop API Reference](/api/graphql/shop-api)
- Learn [Authentication Methods](/api/graphql/authentication)

**For Admin Dashboards:**
- Start with [Admin API Reference](/api/graphql/admin-api)
- Review [Permission Requirements](/api/graphql/admin-api#permission--role-management)

**For Your Programming Language:**
- Find your language in [Integration Guides](/api/graphql/integrations)
- Copy-paste code examples and adapt

### 2. Test in Playground

- Visit [GraphQL Playground](https://demo.bagisto.com/api/graphiql)
- Try [Sample Queries](/api/graphql/playground#quick-start-queries)
- Explore the [Schema](/api/graphql/playground#schema-explorer)

### 3. Implement in Your App

- Follow the [Authentication Guide](/api/graphql/authentication)
- Use examples from [Integration Guides](/api/graphql/integrations)
- Apply [Best Practices](/api/graphql/best-practices)

## Documentation Structure

### Core Documentation
1. **[Introduction](/api/graphql/introduction)** - GraphQL fundamentals, setup, and endpoints
2. **[Authentication](/api/graphql/authentication)** - All auth methods (guest, customer, admin)
3. **[Shop API](/api/graphql/shop-api)** - Complete Shop API with all queries and mutations

### Advanced Documentation
4. **[Admin API](/api/graphql/admin-api)** - Admin operations for management tasks
5. **[Playground Guide](/api/graphql/playground)** - Interactive testing with sample queries
6. **[Integration Guides](/api/graphql/integrations)** - Code examples for:
   - JavaScript / Node.js / React / Next.js
   - Python / Django
   - PHP / Laravel
   - Ruby / Rails
   - Go
   - Java

### Best Practices
7. **[Best Practices](/api/graphql/best-practices)** - Performance optimization, security, testing, debugging

## Common Use Cases

### Building a Headless Storefront
```
1. Get Products → [Shop API - Products](/api/graphql/shop-api#products)
2. Manage Cart → [Shop API - Shopping Cart](/api/graphql/shop-api#shopping-cart)
3. Checkout → [Shop API - Checkout](/api/graphql/shop-api#checkout)
4. Learn Auth → [Authentication Guide](/api/graphql/authentication)
```

### Building a Mobile App
```
1. Learn Guest Auth → [Authentication - Guest](/api/graphql/authentication#1-guest-checkout-authentication)
2. Browse Products → [Shop API - Products](/api/graphql/shop-api#products)
3. Integrate Language → [Integration Guides](/api/graphql/integrations)
4. Apply Best Practices → [Best Practices](/api/graphql/best-practices)
```

### Building an Admin Dashboard
```
1. Admin Login → [Authentication - Admin](/api/graphql/authentication#3-admin-authentication)
2. Manage Data → [Admin API Reference](/api/graphql/admin-api)
3. Optimize Performance → [Best Practices - Performance](/api/graphql/best-practices#performance-optimization)
4. Implement Testing → [Best Practices - Testing](/api/graphql/best-practices#testing)
```

### Building a Third-Party Integration
```
1. Choose Auth Method → [Authentication Guide](/api/graphql/authentication)
2. Decide Shop or Admin → [Shop API](/api/graphql/shop-api) or [Admin API](/api/graphql/admin-api)
3. Select Language → [Integration Guides](/api/graphql/integrations)
4. Handle Errors → [Best Practices - Error Handling](/api/graphql/best-practices#error-handling)
```

## API Endpoints

| Endpoint | Purpose | Authentication |
|----------|---------|-----------------|
| `/api/graphql` | Main GraphQL API | Optional (Shop) / Required (Admin) |
| `/api/graphiql` | GraphiQL Playground | None |
| `/api/sandbox` | Apollo Sandbox UI | None |

## Popular Queries

### Get Products
```graphql
query {
  products(channel: "default", first: 10) {
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

[See more Shop API queries →](/api/graphql/shop-api#products)

### Customer Login
```graphql
mutation {
  createLogin(input: {
    email: "user@example.com"
    password: "password"
  }) {
    accessToken
  }
}
```

[See more Auth examples →](/api/graphql/authentication#2-customer-authentication)

### Create Order
```graphql
mutation {
  createOrder(input: {
    cartId: "CART_ID"
    billingAddressId: "ADDRESS_ID"
    shippingMethod: "flatrate_flatrate"
    paymentMethod: "paypal"
  }) {
    order {
      id
      incrementId
    }
  }
}
```

[See complete checkout flow →](/api/graphql/shop-api#checkout)

## Getting Help

| Resource | Purpose |
|----------|---------|
| 🎮 [Live Playground](https://demo.bagisto.com/api/graphiql) | Test queries instantly |
| 📚 [Documentation](/api/graphql/introduction) | Comprehensive guides |
| 💬 [Community Forum](https://forums.bagisto.com) | Ask questions |
| 🐛 [Issue Tracker](https://github.com/bagisto/bagisto/issues) | Report bugs |
| 📧 [Contact Support](https://bagisto.com/en/contacts/) | Enterprise support |

---

**Start Building Today!**

👉 **New to GraphQL?** Start with [Introduction](/api/graphql/introduction)

👉 **Ready to code?** Choose your language in [Integration Guides](/api/graphql/integrations)

👉 **Want to test?** Visit [GraphQL Playground](https://demo.bagisto.com/api/graphiql)
