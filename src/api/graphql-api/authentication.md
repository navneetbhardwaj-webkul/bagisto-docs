# Authentication Guide

Bagisto GraphQL API supports multiple authentication methods to handle different use cases - from guest checkouts to admin operations.

## Authentication Methods Overview

| Method | Use Case | Token Type | Expiration |
|--------|----------|-----------|-----------|
| Guest Cart | Unauthenticated users | UUID Token | Session-based |
| Customer Token | Registered customers | JWT/Bearer Token | Configurable |
| Admin Token | Administrator operations | JWT/Bearer Token | Configurable |

## 1. Guest Checkout Authentication

Perfect for unauthenticated users who want to browse and checkout without creating an account.

### Create Guest Cart Token

```graphql
mutation {
  createCartToken(input: {}) {
    cartToken
  }
}
```

**Response:**
```json
{
  "data": {
    "createCartToken": {
      "cartToken": "550e8400-e29b-41d4-a716-446655440000"
    }
  }
}
```

### Using Guest Token

Pass the token as a Bearer token in the `Authorization` header for all subsequent requests:

```bash
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "query": "query { cart { items { edges { node { id } } } } }"
  }'
```

### Guest Cart Workflow

```graphql
# 1. Create cart token
mutation {
  createCartToken(input: {}) {
    cartToken
  }
}

# 2. Add product to guest cart
mutation {
  addProductsToCart(input: {
    cartId: "your-cart-id"
    items: [
      { productId: "1", quantity: 2 }
    ]
  }) {
    cart {
      id
      items {
        edges {
          node {
            id
            product { name price }
          }
        }
      }
    }
  }
}

# 3. Proceed to checkout
mutation {
  createGuestOrder(input: {
    cartId: "your-cart-id"
    billingAddress: {
      firstName: "John"
      lastName: "Doe"
      email: "john@example.com"
      address: "123 Main St"
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
    }
  }
}
```

## 2. Customer Authentication

For registered users, provide a secure login/logout flow.

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
      email
      createdAt
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "createCustomer": {
      "customer": {
        "id": "1",
        "firstName": "John",
        "email": "john@example.com",
        "createdAt": "2024-12-19T10:30:00Z"
      }
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

**Response:**
```json
{
  "data": {
    "createLogin": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "customer": {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      }
    }
  }
}
```

### Using Customer Token

Include the access token in the `Authorization` header:

```bash
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "query": "query { customer { id firstName email } }"
  }'
```

### Verify Token

Check if a token is still valid:

```graphql
mutation {
  createVerifyToken(input: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }) {
    verifyToken {
      isValid
      message
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "createVerifyToken": {
      "verifyToken": {
        "isValid": true,
        "message": "Token is valid"
      }
    }
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

**Response:**
```json
{
  "data": {
    "createLogout": {
      "status": "success",
      "message": "Logout successful"
    }
  }
}
```

### Authenticated Customer Workflow

```graphql
# 1. Register/Login
mutation {
  createLogin(input: {
    email: "john@example.com"
    password: "SecurePassword123!"
  }) {
    accessToken
  }
}

# 2. Get customer profile (requires token)
query {
  customer {
    id
    firstName
    email
    addresses {
      edges {
        node {
          id
          firstName
          address
          city
        }
      }
    }
  }
}

# 3. Create authenticated cart
mutation {
  createCart(input: {}) {
    cart {
      id
    }
  }
}

# 4. Manage cart and checkout with customer info
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
    }
  }
}

# 5. Logout
mutation {
  createLogout(input: {}) {
    status
  }
}
```

## 3. Admin Authentication

For administrative operations and management tasks.

### Admin Login

```graphql
mutation {
  adminLogin(input: {
    email: "admin@example.com"
    password: "AdminPassword123!"
  }) {
    accessToken
    admin {
      id
      name
      email
      role
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "adminLogin": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "admin": {
        "id": "1",
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin"
      }
    }
  }
}
```

### Using Admin Token

```bash
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "query": "query { products { edges { node { id name sku } } } }"
  }'
```

### Admin Logout

```graphql
mutation {
  adminLogout(input: {}) {
    status
  }
}
```

## Authentication Best Practices

### 🔒 Security Tips

1. **HTTPS Only**: Always use HTTPS in production
   ```
   ✓ https://your-domain.com/api/graphql
   ✗ http://your-domain.com/api/graphql
   ```

2. **Secure Token Storage**
   - **Frontend**: Use httpOnly cookies (JavaScript cannot access)
   - **Mobile**: Use secure device storage
   - **Backend**: Store in secure session or encrypted database

3. **Token Expiration**
   - Set reasonable expiration times (e.g., 24 hours)
   - Implement refresh token mechanism
   - Validate token expiration on each request

4. **Never Log Tokens**
   ```javascript
   // ✗ Bad
   console.log(accessToken);
   localStorage.setItem('token', accessToken);
   
   // ✓ Good
   // Store in httpOnly cookie (server-side)
   // Use secure storage on mobile
   ```

5. **Validate on Server**
   ```graphql
   # Always verify token server-side
   mutation {
     createVerifyToken(input: { token: userToken }) {
       verifyToken { isValid }
     }
   }
   ```

### Handling Expired Tokens

```javascript
async function makeGraphQLRequest(query, token) {
  let response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  if (response.status === 401) {
    // Token expired, refresh or re-authenticate
    token = await refreshToken();
    return makeGraphQLRequest(query, token);
  }

  return response.json();
}
```

### Environment Variables

Store sensitive information securely:

```bash
# .env
GRAPHQL_API_URL=https://your-domain.com/api/graphql
CUSTOMER_TOKEN=your_token_here
ADMIN_TOKEN=admin_token_here
```

```javascript
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_CUSTOMER_TOKEN;
```

## Token Refresh Strategy

Implement a refresh token mechanism for long-lived sessions:

```graphql
# Initial login
mutation {
  createLogin(input: {
    email: "user@example.com"
    password: "password"
  }) {
    accessToken
    refreshToken
  }
}

# When access token expires, use refresh token
mutation {
  refreshToken(input: {
    refreshToken: "refresh_token_here"
  }) {
    accessToken
  }
}
```

## Multi-Channel Authentication

Bagisto supports multiple channels. Include channel information:

```graphql
query {
  channel {
    id
    code
    name
    rootCategoryId
  }
}
```

Use channel-specific queries:

```graphql
query {
  products(channel: "default", first: 10) {
    edges {
      node {
        id
        name
        prices {
          channel
          price
        }
      }
    }
  }
}
```

## Error Handling

### Common Authentication Errors

```json
{
  "errors": [
    {
      "message": "Unauthenticated",
      "extensions": {
        "guard": "api"
      }
    }
  ]
}
```

```json
{
  "errors": [
    {
      "message": "Invalid credentials",
      "extensions": {
        "category": "authentication"
      }
    }
  ]
}
```

### Error Response Handling

```javascript
async function login(email, password) {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `mutation {
        createLogin(input: {email: "${email}", password: "${password}"}) {
          accessToken
        }
      }`
    })
  });

  const result = await response.json();

  if (result.errors) {
    result.errors.forEach(error => {
      console.error('Auth Error:', error.message);
    });
    return null;
  }

  return result.data.createLogin.accessToken;
}
```

## Logout and Cleanup

Always implement proper logout:

```javascript
async function logout() {
  // Clear GraphQL session
  await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: 'mutation { createLogout(input: {}) { status } }'
    })
  });

  // Clear local storage
  localStorage.removeItem('token');
  
  // Redirect to login
  window.location.href = '/login';
}
```

## Multi-Tenant Authentication

For multi-tenant setups:

```graphql
query {
  channel(code: "channel-code") {
    id
    code
    locales
    currencies
  }
}
```

---

**Next Steps:**
- 📚 [Shop API Reference](/api/graphql/shop-api) - Use authentication in shop operations
- 🔑 [Admin API Reference](/api/graphql/admin-api) - Admin authentication flows
- 💡 [Best Practices](/api/graphql/best-practices) - Advanced security topics
