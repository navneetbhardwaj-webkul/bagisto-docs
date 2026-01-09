# Integration Guides

Real-world examples and step-by-step guides for integrating Bagisto APIs into your application architecture. Choose the integration pattern that best fits your use case.

## Common Integration Patterns

### 1. Headless Commerce (React/Vue Frontend)

Build a modern storefront using your preferred frontend framework.

**Architecture:**
```
Frontend (React/Vue/Next.js)
    ↓
Bagisto GraphQL API
    ↓
Bagisto Backend
```

**Steps:**

1. **Install Apollo Client (React example)**
   ```bash
   npm install @apollo/client graphql
   ```

2. **Setup Apollo Client**
   ```javascript
   import ApolloClient from '@apollo/client';
   import { createHttpLink } from '@apollo/client';

   const httpLink = createHttpLink({
     uri: 'https://your-domain.com/graphql',
     credentials: 'include',
   });

   const client = new ApolloClient({
     link: httpLink,
     cache: new InMemoryCache(),
   });
   ```

3. **Fetch Products**
   ```javascript
   import { gql, useQuery } from '@apollo/client';

   const GET_PRODUCTS = gql`
     query {
       products(first: 10) {
         edges {
           node {
             id
             name
             price
             image
           }
         }
       }
     }
   `;

   function ProductList() {
     const { loading, error, data } = useQuery(GET_PRODUCTS);
     
     if (loading) return <div>Loading...</div>;
     if (error) return <div>Error: {error.message}</div>;

     return (
       <div>
         {data.products.edges.map(({ node }) => (
           <div key={node.id}>
             <h3>{node.name}</h3>
             <p>${node.price}</p>
           </div>
         ))}
       </div>
     );
   }
   ```

**Best Practices:**
- Cache responses for better performance
- Use lazy loading for images
- Implement error boundaries
- Use real-time subscriptions for inventory updates

---

### 2. Mobile App Integration (React Native/Flutter)

Connect your mobile app to Bagisto APIs.

**Architecture:**
```
Mobile App (React Native/Flutter)
    ↓
REST or GraphQL API
    ↓
Bagisto Backend
```

**REST API Example (React Native):**

```javascript
// Auth Service
class AuthService {
  async login(email, password) {
    const response = await fetch('https://your-domain.com/api/shop/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-STOREFRONT-KEY': process.env.STOREFRONT_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Store token securely
      await AsyncStorage.setItem('auth_token', data.token);
      return data;
    }
    throw new Error(data.message);
  }

  async getProfile() {
    const token = await AsyncStorage.getItem('auth_token');
    
    const response = await fetch('https://your-domain.com/api/shop/customers', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-STOREFRONT-KEY': process.env.STOREFRONT_KEY,
      },
    });

    return response.json();
  }
}
```

**GraphQL Example (Apollo Client):**

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('auth_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'X-STOREFRONT-KEY': process.env.STOREFRONT_KEY,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'https://your-domain.com/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

**Best Practices:**
- Store tokens securely using device secure storage
- Implement token refresh mechanism
- Handle offline state gracefully
- Optimize images for mobile networks

---

### 3. Third-Party Integration

Integrate Bagisto with external services (ERP, CRM, Payment Gateway).

**Architecture:**
```
External Service (Shopify, WooCommerce, etc.)
    ↓
REST API (for webhook handling)
    ↓
Bagisto Backend
```

**Webhook Handler Example:**

```php
// routes/api.php
Route::post('/webhooks/product-sync', 'WebhookController@productSync');

// App/Http/Controllers/WebhookController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function productSync(Request $request)
    {
        $externalProduct = $request->validate([
            'id' => 'required|string',
            'name' => 'required|string',
            'sku' => 'required|string',
            'price' => 'required|numeric',
        ]);

        // Create or update product in Bagisto
        $product = Product::updateOrCreate(
            ['sku' => $externalProduct['sku']],
            [
                'name' => $externalProduct['name'],
                'price' => $externalProduct['price'],
            ]
        );

        return response()->json(['success' => true, 'id' => $product->id]);
    }
}
```

**Sync Products Periodically:**

```php
// Console/Commands/SyncExternalProducts.php
namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncExternalProducts extends Command
{
    protected $signature = 'products:sync-external';

    public function handle()
    {
        $externalAPI = 'https://external-service.com/api/products';
        
        $response = Http::get($externalAPI, [
            'api_key' => config('services.external.key'),
        ]);

        foreach ($response->json('products') as $product) {
            Product::updateOrCreate(
                ['external_id' => $product['id']],
                [
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'sku' => $product['sku'],
                ]
            );
        }

        $this->info('Products synced successfully');
    }
}

// Schedule in app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    $schedule->command('products:sync-external')->hourly();
}
```

**Best Practices:**
- Implement retry logic for failed requests
- Log all sync operations for audit trail
- Handle duplicate data gracefully
- Use batch operations for bulk updates

---

### 4. Admin Dashboard Integration

Build a custom admin dashboard for inventory and order management.

**Architecture:**
```
Custom Admin Dashboard (Vue/React)
    ↓
Admin API (REST/GraphQL)
    ↓
Bagisto Backend (with Admin Auth)
```

**Vue.js Dashboard Example:**

```javascript
// Dashboard.vue
<template>
  <div class="dashboard">
    <div class="stats">
      <div class="stat-card">
        <h3>Total Orders</h3>
        <p>{{ orders.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Low Stock Products</h3>
        <p>{{ lowStockProducts.length }}</p>
      </div>
    </div>
    
    <div class="recent-orders">
      <h2>Recent Orders</h2>
      <table>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customer_name }}</td>
          <td>{{ order.total }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      lowStockProducts: [],
    };
  },

  mounted() {
    this.fetchOrders();
    this.fetchLowStockProducts();
  },

  methods: {
    async fetchOrders() {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(
          'https://your-domain.com/api/admin/orders',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        this.orders = response.data.data;
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    },

    async fetchLowStockProducts() {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(
          'https://your-domain.com/api/admin/products?filter[stock_lt]=10',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        this.lowStockProducts = response.data.data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },
  },
};
</script>
```

**Best Practices:**
- Implement role-based access control
- Cache frequently accessed data
- Use websockets for real-time updates
- Validate all user input server-side

---

## Quick Decision Guide

| Use Case | Recommended API | Why |
|----------|-----------------|-----|
| **Frontend Website** | GraphQL | Flexible data fetching, reduce overfetching |
| **Mobile App** | REST or GraphQL | Simpler than REST, smaller payloads |
| **Third-Party Sync** | REST | Standard HTTP methods, easier webhooks |
| **Admin Dashboard** | GraphQL or REST | Both work, GraphQL is faster for complex queries |
| **IoT Devices** | REST | Lightweight, minimal dependencies |

---

## Error Handling

Always implement proper error handling in your integrations:

**REST API Error Handling:**
```javascript
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API Error');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    // Implement retry logic or user notification
    throw error;
  }
}
```

**GraphQL Error Handling:**
```javascript
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`GraphQL Error: ${message}`, { locations, path });
    });
  }
  
  if (networkError) {
    console.error('Network Error:', networkError);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

---

## Performance Optimization

### Caching Strategy

```javascript
// REST API with caching
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function cachedFetch(url) {
  const cached = cache.get(url);
  
  if (cached && Date.now() - cached.time < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, time: Date.now() });
  
  return data;
}
```

### Pagination

```graphql
# Efficient pagination with cursors
query {
  products(first: 20, after: "cursor-value") {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
      }
    }
  }
}
```

---

## Security Best Practices

1. **Never expose API keys in client code**
   ```javascript
   // ❌ Bad
   const KEY = 'sk_live_xxxxx'; // Visible in browser
   
   // ✅ Good
   const KEY = process.env.REACT_APP_API_KEY; // From .env file
   ```

2. **Always use HTTPS**
   - All API requests must use `https://`
   - Never send sensitive data over HTTP

3. **Validate tokens**
   ```javascript
   // Check token expiration before use
   if (token && !isTokenExpired(token)) {
     // Make API call
   }
   ```

4. **Implement rate limiting awareness**
   - Respect rate limit headers from API
   - Implement exponential backoff for retries

---

## What's Next?

- 🔐 [Authentication Guide](./authentication) - Learn detailed auth methods
- 🔗 [REST API Reference](./rest-api/introduction.html) - REST API documentation
- ⚡ [GraphQL API Reference](./graphql-api/introduction.html) - GraphQL documentation
- 🔑 [API Key Management](./storefront-api-key-management-guide) - Manage your API keys

## Support & Resources

- 🌐 [GitHub Repository](https://github.com/bagisto/bagisto-api)
- 💬 [Community Forum](https://forums.bagisto.com)
- 🐛 [Issue Tracker](https://github.com/bagisto/bagisto-api/issues)
- 📧 [Contact Support](https://bagisto.com/en/contacts/)
