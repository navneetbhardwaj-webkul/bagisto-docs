# Best Practices & Testing Guide

Comprehensive guide for optimizing your Bagisto GraphQL API integration with best practices, performance tips, and testing strategies.

## Performance Optimization

### 1. Query Optimization

#### Only Request Needed Fields

**❌ Bad - Requesting too much data:**
```graphql
query {
  products(first: 100) {
    edges {
      node {
        id
        name
        price
        description
        shortDescription
        weight
        sku
        status
        createdAt
        updatedAt
        images {
          edges {
            node {
              id
              type
              path
              url
              alt
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
      }
    }
  }
}
```

**✅ Good - Request only what you need:**
```graphql
query {
  products(first: 100) {
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

#### Use Pagination

```graphql
query {
  products(first: 20, after: "cursor-from-previous-query") {
    pageInfo {
      hasNextPage
      endCursor
    }
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

**Why:**
- Reduces payload size
- Improves response time
- Decreases memory usage
- Better for mobile devices

#### Use Aliases for Multiple Queries

```graphql
query {
  newProducts: products(
    channel: "default"
    first: 10
    sort: "newest"
  ) {
    edges {
      node {
        id
        name
        price
      }
    }
  }
  
  saleProducts: products(
    channel: "default"
    first: 10
    filters: { onSale: true }
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

### 2. Caching Strategies

#### Client-Side Caching with Apollo

```javascript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://your-domain.com/api/graphql' }),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  }
});
```

#### Cache Key Configuration

```javascript
const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      keyFields: ['id', 'channel'] // Cache per channel
    },
    Customer: {
      keyFields: ['id']
    }
  }
});
```

#### Redis Caching in Backend

```php
// Laravel example
Cache::remember('products:channel:default', 3600, function () {
    return BagitoService::getProducts('default');
});
```

### 3. Connection Pooling

**Node.js/JavaScript:**
```javascript
const http = require('http');
const https = require('https');

const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 50 });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 50 });

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-domain.com/api/graphql',
    fetchOptions: { agent: httpsAgent }
  })
});
```

### 4. Batch Requests

Instead of multiple individual requests:

```graphql
# ❌ Bad - Multiple requests
query {
  product(id: "1") { id name }
}
query {
  product(id: "2") { id name }
}

# ✅ Good - Single batch query
query {
  product1: product(id: "1") { id name }
  product2: product(id: "2") { id name }
  product3: product(id: "3") { id name }
}
```

## Security Best Practices

### 1. Authentication & Authorization

#### Always Validate Tokens Server-Side

```graphql
mutation {
  createVerifyToken(input: { token: userToken }) {
    verifyToken {
      isValid
      message
    }
  }
}
```

#### Use HTTPS Only

```javascript
// ✓ Correct
const API_URL = 'https://your-domain.com/api/graphql';

// ✗ Never use HTTP
const API_URL = 'http://your-domain.com/api/graphql';
```

#### Implement Rate Limiting

```javascript
class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  allow() {
    const now = Date.now();
    this.requests = this.requests.filter(
      time => now - time < this.windowMs
    );

    if (this.requests.length >= this.maxRequests) {
      return false;
    }

    this.requests.push(now);
    return true;
  }
}

const limiter = new RateLimiter(100, 60000);

async function makeRequest(query) {
  if (!limiter.allow()) {
    throw new Error('Rate limit exceeded');
  }
  return fetch('/api/graphql', { body: JSON.stringify({ query }) });
}
```

### 2. Input Validation

Always validate input before sending:

```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password);
}

async function register(email, password) {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  if (!validatePassword(password)) {
    throw new Error('Password must be at least 8 chars with uppercase');
  }

  // Proceed with mutation
}
```

### 3. Secure Token Storage

**❌ Never:**
```javascript
// ✗ Don't store in localStorage (XSS vulnerable)
localStorage.setItem('token', token);

// ✗ Don't log tokens
console.log(token);

// ✗ Don't expose in URLs
window.location = `https://example.com?token=${token}`;
```

**✅ Do:**
```javascript
// ✓ Use httpOnly cookies (set by server)
// Server-side:
res.cookie('token', token, {
  httpOnly: true,
  secure: true, // HTTPS only
  sameSite: 'Strict',
  maxAge: 3600000
});

// Client-side cookie will be sent automatically
fetch('/api/graphql', {
  credentials: 'include' // Send cookies
});
```

### 4. Error Handling (Don't Expose Sensitive Data)

**❌ Bad:**
```javascript
catch (error) {
  console.error('Database error:', error); // Could expose DB details
  return { error: error.message }; // Expose internals to client
}
```

**✅ Good:**
```javascript
catch (error) {
  console.error('Error:', error); // Log internally
  return { error: 'An error occurred' }; // Generic message to client
}
```

## Error Handling

### Common GraphQL Errors

```javascript
async function handleGraphQLResponse(response) {
  const result = await response.json();
  
  // Check for HTTP errors
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  
  // Check for GraphQL errors
  if (result.errors) {
    result.errors.forEach(error => {
      switch (error.extensions?.category) {
        case 'authentication':
          // Handle auth errors - refresh token
          refreshToken();
          break;
        case 'validation':
          // Handle validation errors
          displayValidationErrors(error.extensions.validation);
          break;
        case 'rate_limit':
          // Handle rate limiting
          console.error('Rate limited');
          break;
        default:
          console.error(error.message);
      }
    });
    throw new Error(result.errors[0].message);
  }
  
  return result.data;
}
```

### Retry Logic with Exponential Backoff

```javascript
async function fetchWithRetry(query, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        body: JSON.stringify({ query })
      });
      
      if (response.status === 429) {
        // Rate limited - retry with backoff
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Testing

### Unit Tests with Jest

```javascript
// products.test.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';

describe('Product Queries', () => {
  let client;

  beforeEach(() => {
    client = new ApolloClient({
      link: new SchemaLink({ schema }),
      cache: new InMemoryCache()
    });
  });

  test('should fetch products', async () => {
    const query = gql`
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
    `;

    const result = await client.query({ query });

    expect(result.data).toBeDefined();
    expect(result.data.products.edges).toHaveLength(10);
    expect(result.data.products.edges[0].node).toHaveProperty('id');
    expect(result.data.products.edges[0].node).toHaveProperty('name');
    expect(result.data.products.edges[0].node).toHaveProperty('price');
  });

  test('should handle authentication errors', async () => {
    const mutation = gql`
      mutation {
        createLogin(input: {
          email: "invalid@example.com"
          password: "wrongpassword"
        }) {
          accessToken
        }
      }
    `;

    expect(async () => {
      await client.mutate({ mutation });
    }).rejects.toThrow();
  });
});
```

### Integration Testing with Postman

Create a Postman collection with tests:

```javascript
// Test script
pm.test('Response status is 200', function () {
    pm.response.to.have.status(200);
});

pm.test('Response has no errors', function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.errors).to.be.undefined;
});

pm.test('Products are returned', function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.products.edges.length).to.be.above(0);
});
```

### E2E Testing with Cypress

```javascript
// cypress/integration/checkout.spec.js
describe('Checkout Flow', () => {
  it('should complete checkout', () => {
    cy.visit('/shop');
    
    cy.contains('Add to Cart').first().click();
    cy.get('[data-cy=cart-count]').should('contain', '1');
    
    cy.visit('/cart');
    cy.get('[data-cy=checkout-btn]').click();
    
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=address-input]').type('123 Main St');
    cy.get('[data-cy=submit-btn]').click();
    
    cy.url().should('include', '/order-confirmation');
  });
});
```

### Load Testing with Artillery

```yaml
# load-test.yml
config:
  target: 'https://your-domain.com/api/graphql'
  phases:
    - duration: 60
      arrivalRate: 10
      name: 'Warm up'
    - duration: 120
      arrivalRate: 50
      name: 'Ramp up load'
    - duration: 60
      arrivalRate: 100
      name: 'Spike'

scenarios:
  - name: 'Get Products'
    flow:
      - post:
          url: '/'
          json:
            query: 'query { products(first: 20) { edges { node { id name } } } }'
          capture:
            json: '$.data.products.edges[0].node.id'
            as: 'productId'

  - name: 'Add to Cart'
    flow:
      - post:
          url: '/'
          json:
            query: 'mutation { addProductsToCart(input: { cartId: "123" items: [{ productId: "{{ productId }}", quantity: 1 }] }) { cart { id } } }'
```

## Debugging

### Enable Query Debugging

```javascript
const client = new ApolloClient({
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      console.log('GraphQL Query:', operation.operationName);
      console.log('Variables:', operation.variables);
      
      return forward(operation).map(response => {
        console.log('Response:', response);
        return response;
      });
    }),
    new HttpLink({ uri: 'https://your-domain.com/api/graphql' })
  ]),
  cache: new InMemoryCache()
});
```

### Monitor Network Traffic

```bash
# Using Charles Proxy
# Or use browser DevTools Network tab
# GraphQL requests will show full query/mutation in request body
```

### Logging Middleware

```php
// Laravel middleware
class LogGraphQLRequests {
    public function handle($request, Closure $next) {
        if ($request->path() === 'api/graphql') {
            Log::info('GraphQL Query', [
                'body' => $request->getContent(),
                'user' => auth()->id()
            ]);
        }
        
        return $next($request);
    }
}
```

## Performance Monitoring

### Monitor Query Performance

```javascript
async function measureQuery(query) {
  const startTime = performance.now();
  
  const response = await fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query })
  });
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`Query completed in ${duration}ms`);
  
  return response.json();
}
```

### Use APM Tools

- **New Relic** - Application Performance Monitoring
- **Datadog** - Infrastructure monitoring
- **Sentry** - Error tracking
- **GraphQL Apollo Studio** - GraphQL-specific monitoring

## Documentation

### Maintain API Documentation

1. **Use GraphQL Directives**
```graphql
directive @auth(requires: String!) on FIELD_DEFINITION

type Query {
  customer: Customer @auth(requires: "CUSTOMER")
}
```

2. **Document Fields**
```graphql
type Product {
  """
  Unique product identifier
  """
  id: ID!
  
  """
  Product display name (localized)
  """
  name: String!
  
  """
  Product price in store currency
  """
  price: Float!
}
```

3. **Keep Schema Updated**
- Version your API
- Document breaking changes
- Provide migration guides

---

**💡 Key Takeaways:**
- Optimize queries for performance
- Implement proper security measures
- Handle errors gracefully
- Test thoroughly before production
- Monitor performance continuously
- Keep documentation up-to-date

**📚 Related Documentation:**
- 🔐 [Authentication](/api/graphql/authentication)
- 🛍️ [Shop API](/api/graphql/shop-api)
- 👨‍💼 [Admin API](/api/graphql/admin-api)
- 💻 [Integration Guides](/api/graphql/integrations)
