# Integration Guides

Complete integration examples for popular programming languages and frameworks to get started with Bagisto GraphQL API.

## JavaScript / Node.js

### Using Fetch API

```javascript
// Simple GraphQL query
async function getProducts() {
  const query = `
    query {
      products(channel: "default", first: 10) {
        edges {
          node {
            id
            name
            price
            description
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
  return data.data.products;
}

// With authentication
async function getCustomerProfile(token) {
  const query = `
    query {
      customer {
        id
        firstName
        lastName
        email
        addresses {
          edges {
            node {
              id
              address
              city
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://your-domain.com/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  return data.data.customer;
}
```

### Using Apollo Client (React)

```bash
npm install @apollo/client graphql
```

```javascript
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-domain.com/api/graphql',
    credentials: 'include', // Include cookies for session
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  cache: new InMemoryCache()
});

// Query products
const PRODUCTS_QUERY = gql`
  query GetProducts($first: Int!, $channel: String!) {
    products(channel: $channel, first: $first) {
      edges {
        node {
          id
          name
          price
          images {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const { data, loading, error } = await client.query({
  query: PRODUCTS_QUERY,
  variables: { first: 20, channel: 'default' }
});
```

### React Component Example

```javascript
import { useQuery, useMutation, gql } from '@apollo/client';

const PRODUCTS_QUERY = gql`
  query {
    products(channel: "default", first: 20) {
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
`;

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($cartId: String!, $productId: String!, $quantity: Int!) {
    addProductsToCart(input: {
      cartId: $cartId
      items: [{ productId: $productId, quantity: $quantity }]
    }) {
      cart {
        id
        itemsCount
      }
    }
  }
`;

export function ProductList() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);
  const [addToCart] = useMutation(ADD_TO_CART_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.products.edges.map(({ node: product }) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart({
            variables: {
              cartId: 'your-cart-id',
              productId: product.id,
              quantity: 1
            }
          })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Using GraphQL Request

```bash
npm install graphql-request
```

```javascript
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://your-domain.com/api/graphql', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const query = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      price
      description
      images {
        edges {
          node {
            url
          }
        }
      }
    }
  }
`;

const variables = { id: '1' };
const data = await client.request(query, variables);
```

### Next.js Integration

```typescript
// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: 'https://your-domain.com/api/graphql',
    credentials: 'include'
  }),
  cache: new InMemoryCache()
});

export default client;
```

```typescript
// pages/products.tsx
import { useQuery, gql } from '@apollo/client';

const PRODUCTS_QUERY = gql`...`;

export default function ProductsPage() {
  const { data, loading } = useQuery(PRODUCTS_QUERY);
  // Render component
}
```

## Python

### Using Requests + JSON

```python
import requests
import json

API_URL = "https://your-domain.com/api/graphql"

def get_products():
    query = """
    query {
      products(channel: "default", first: 10) {
        edges {
          node {
            id
            name
            price
            description
          }
        }
      }
    }
    """
    
    response = requests.post(
        API_URL,
        json={'query': query}
    )
    
    data = response.json()
    return data['data']['products']

# With authentication
def get_customer_profile(token):
    query = """
    query {
      customer {
        id
        firstName
        lastName
        email
      }
    }
    """
    
    headers = {
        'Authorization': f'Bearer {token}'
    }
    
    response = requests.post(
        API_URL,
        json={'query': query},
        headers=headers
    )
    
    data = response.json()
    return data['data']['customer']

# Usage
if __name__ == '__main__':
    products = get_products()
    print(json.dumps(products, indent=2))
```

### Using Gql Library

```bash
pip install gql
```

```python
from gql import Client, gql
from gql.transport.requests import RequestsHTTPTransport

# Create transport
transport = RequestsHTTPTransport(
    url="https://your-domain.com/api/graphql",
    verify=True,
    retries=3,
)

# Create client
client = Client(transport=transport, fetch_schema_from_transport=True)

# Execute query
query = gql("""
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
""")

result = client.execute(query)
print(result)
```

### Using Strawberry / GraphQL-Core

```bash
pip install strawberry-graphql httpx
```

```python
import httpx
from typing import Optional

class BagitoGraphQLClient:
    def __init__(self, url: str, token: Optional[str] = None):
        self.url = url
        self.token = token
    
    async def execute(self, query: str, variables: dict = None):
        headers = {
            'Content-Type': 'application/json',
        }
        
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        
        payload = {
            'query': query,
            'variables': variables or {}
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.url,
                json=payload,
                headers=headers
            )
            return response.json()

# Usage
async def main():
    client = BagitoGraphQLClient('https://your-domain.com/api/graphql')
    
    query = """
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
    """
    
    result = await client.execute(query)
    print(result)
```

### Django Integration

```python
# settings.py
GRAPHENE = {
    'SCHEMA': 'myapp.schema.schema',
    'MIDDLEWARE': [
        'graphene_django.debug.DjangoDebugMiddleware',
    ]
}

# views.py
from django.http import JsonResponse
import requests

def sync_bagisto_products(request):
    query = """
    query {
      products(channel: "default", first: 100) {
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
    """
    
    response = requests.post(
        'https://your-domain.com/api/graphql',
        json={'query': query}
    )
    
    products = response.json()['data']['products']
    # Sync to Django database
    return JsonResponse({'status': 'synced', 'count': len(products['edges'])})
```

## PHP

### Using cURL

```php
<?php

class BagitoGraphQL {
    private $url;
    private $token;
    
    public function __construct($url, $token = null) {
        $this->url = $url;
        $this->token = $token;
    }
    
    public function query($query, $variables = []) {
        $payload = [
            'query' => $query,
            'variables' => $variables
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $headers = ['Content-Type: application/json'];
        if ($this->token) {
            $headers[] = 'Authorization: Bearer ' . $this->token;
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        $result = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($result, true);
    }
    
    public function getProducts() {
        $query = '
        query {
            products(channel: "default", first: 10) {
                edges {
                    node {
                        id
                        name
                        price
                        description
                    }
                }
            }
        }
        ';
        
        return $this->query($query);
    }
    
    public function getCustomerProfile() {
        $query = '
        query {
            customer {
                id
                firstName
                lastName
                email
            }
        }
        ';
        
        return $this->query($query);
    }
}

// Usage
$client = new BagitoGraphQL('https://your-domain.com/api/graphql');
$products = $client->getProducts();
print_r($products);
?>
```

### Using Laravel HTTP Client

```php
<?php

use Illuminate\Support\Facades\Http;

class BagitoService {
    protected $apiUrl = 'https://your-domain.com/api/graphql';
    
    public function getProducts() {
        $query = '
        query {
            products(channel: "default", first: 20) {
                edges {
                    node {
                        id
                        name
                        price
                        description
                    }
                }
            }
        }
        ';
        
        $response = Http::post($this->apiUrl, [
            'query' => $query
        ]);
        
        return $response->json()['data']['products'];
    }
    
    public function login($email, $password) {
        $mutation = "
        mutation {
            createLogin(input: {
                email: \"$email\"
                password: \"$password\"
            }) {
                accessToken
                customer {
                    id
                    email
                }
            }
        }
        ";
        
        $response = Http::post($this->apiUrl, [
            'query' => $mutation
        ]);
        
        return $response->json()['data']['createLogin'];
    }
    
    public function getCustomerOrders($token) {
        $query = '
        query {
            customerOrders(first: 20) {
                edges {
                    node {
                        id
                        incrementId
                        status
                        grandTotal
                    }
                }
            }
        }
        ';
        
        $response = Http::withToken($token)
            ->post($this->apiUrl, ['query' => $query]);
        
        return $response->json()['data']['customerOrders'];
    }
}

// Usage in controller
Route::get('/products', function () {
    $bagitoService = new BagitoService();
    $products = $bagitoService->getProducts();
    return response()->json($products);
});
?>
```

### Using Guzzle

```php
<?php

use GuzzleHttp\Client;

class BagitoGraphQLClient {
    private $client;
    private $token;
    
    public function __construct($url, $token = null) {
        $this->client = new Client([
            'base_uri' => $url,
            'timeout' => 30.0,
        ]);
        $this->token = $token;
    }
    
    public function query($query, $variables = []) {
        $options = [
            'json' => [
                'query' => $query,
                'variables' => $variables
            ]
        ];
        
        if ($this->token) {
            $options['headers'] = [
                'Authorization' => 'Bearer ' . $this->token
            ];
        }
        
        try {
            $response = $this->client->post('', $options);
            return json_decode($response->getBody(), true);
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}

// Usage
$client = new BagitoGraphQLClient('https://your-domain.com/api/graphql');
$result = $client->query('query { products(channel: "default", first: 10) { ... } }');
?>
```

## Ruby

### Using Net::HTTP

```ruby
require 'net/http'
require 'json'
require 'uri'

class BagitoClient
  def initialize(url, token = nil)
    @url = url
    @token = token
    @uri = URI(@url)
  end
  
  def query(query_string, variables = {})
    http = Net::HTTP.new(@uri.host, @uri.port)
    http.use_ssl = true if @uri.scheme == 'https'
    
    request = Net::HTTP::Post.new(@uri.path)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{@token}" if @token
    
    payload = {
      query: query_string,
      variables: variables
    }
    
    request.body = payload.to_json
    
    response = http.request(request)
    JSON.parse(response.body)
  end
  
  def get_products
    query('
      query {
        products(channel: "default", first: 10) {
          edges {
            node {
              id
              name
              price
              description
            }
          }
        }
      }
    ')
  end
  
  def login(email, password)
    query("
      mutation {
        createLogin(input: {
          email: \"#{email}\"
          password: \"#{password}\"
        }) {
          accessToken
          customer {
            id
            email
          }
        }
      }
    ")
  end
end

# Usage
client = BagitoClient.new('https://your-domain.com/api/graphql')
products = client.get_products
puts products
```

### Using GraphQL-Client Gem

```bash
gem 'graphql-client'
```

```ruby
require 'graphql/client'
require 'graphql/client/http'

# Create HTTP adapter
HTTP = GraphQL::Client::HTTP.new('https://your-domain.com/api/graphql')

# Create client
Schema = GraphQL::Client.load_schema(HTTP)
Client = GraphQL::Client.new(schema: Schema, execute_document_directly: true)

# Define query
ProductsQuery = Client.parse <<-'GRAPHQL'
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
GRAPHQL

# Execute query
result = Client.query(ProductsQuery)
puts result.data.products
```

### Rails Integration

```ruby
# app/services/bagisto_service.rb
class BagitoService
  API_URL = 'https://your-domain.com/api/graphql'
  
  def self.get_products(channel = 'default')
    query = %{
      query {
        products(channel: "#{channel}", first: 20) {
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
    }
    
    response = execute_query(query)
    response['data']['products']
  end
  
  def self.create_order(customer_token, cart_id, address_id)
    mutation = %{
      mutation {
        createOrder(input: {
          cartId: "#{cart_id}"
          billingAddressId: "#{address_id}"
          shippingAddressId: "#{address_id}"
          shippingMethod: "flatrate_flatrate"
          paymentMethod: "paypal"
        }) {
          order {
            id
            incrementId
            status
            grandTotal
          }
        }
      }
    }
    
    response = execute_query(mutation, customer_token)
    response['data']['createOrder']
  end
  
  private
  
  def self.execute_query(query, token = nil)
    headers = { 'Content-Type' => 'application/json' }
    headers['Authorization'] = "Bearer #{token}" if token
    
    response = HTTParty.post(API_URL, body: { query: query }.to_json, headers: headers)
    response.parsed_response
  end
end

# Usage in controller
class ProductsController < ApplicationController
  def index
    @products = BagitoService.get_products
  end
end
```

## Go

### Using GraphQL-Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type GraphQLRequest struct {
    Query     string                 `json:"query"`
    Variables map[string]interface{} `json:"variables"`
}

type Product struct {
    ID          string `json:"id"`
    Name        string `json:"name"`
    Price       string `json:"price"`
    Description string `json:"description"`
}

type ProductsResponse struct {
    Data struct {
        Products struct {
            Edges []struct {
                Node Product `json:"node"`
            } `json:"edges"`
        } `json:"products"`
    } `json:"data"`
}

func GetProducts() ([]Product, error) {
    query := `
    query {
        products(channel: "default", first: 10) {
            edges {
                node {
                    id
                    name
                    price
                    description
                }
            }
        }
    }
    `
    
    req := GraphQLRequest{
        Query: query,
    }
    
    jsonBody, _ := json.Marshal(req)
    body := bytes.NewReader(jsonBody)
    
    resp, err := http.Post(
        "https://your-domain.com/api/graphql",
        "application/json",
        body,
    )
    
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    respBody, _ := io.ReadAll(resp.Body)
    
    var result ProductsResponse
    json.Unmarshal(respBody, &result)
    
    var products []Product
    for _, edge := range result.Data.Products.Edges {
        products = append(products, edge.Node)
    }
    
    return products, nil
}

func main() {
    products, err := GetProducts()
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    for _, product := range products {
        fmt.Printf("Product: %s - $%s\n", product.Name, product.Price)
    }
}
```

## Java

### Using OkHttp

```java
import okhttp3.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class BagitoGraphQLClient {
    private final String apiUrl;
    private final String token;
    private final OkHttpClient client;
    
    public BagitoGraphQLClient(String apiUrl, String token) {
        this.apiUrl = apiUrl;
        this.token = token;
        this.client = new OkHttpClient();
    }
    
    public String query(String graphqlQuery) throws Exception {
        JsonObject json = new JsonObject();
        json.addProperty("query", graphqlQuery);
        
        RequestBody body = RequestBody.create(
            json.toString(),
            MediaType.parse("application/json")
        );
        
        Request.Builder requestBuilder = new Request.Builder()
            .url(apiUrl)
            .post(body)
            .addHeader("Content-Type", "application/json");
        
        if (token != null && !token.isEmpty()) {
            requestBuilder.addHeader("Authorization", "Bearer " + token);
        }
        
        Request request = requestBuilder.build();
        Response response = client.newCall(request).execute();
        
        return response.body().string();
    }
    
    public static void main(String[] args) throws Exception {
        String query = "query { products(channel: \"default\", first: 10) { edges { node { id name price } } } }";
        
        BagitoGraphQLClient client = new BagitoGraphQLClient(
            "https://your-domain.com/api/graphql",
            null
        );
        
        String result = client.query(query);
        System.out.println(result);
    }
}
```

## cURL

Simple command-line testing:

```bash
# Get products
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { products(channel: \"default\", first: 10) { edges { node { id name price } } } }"
  }'

# With authentication
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "query": "query { customer { id firstName email } }"
  }'

# Customer login
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createLogin(input: { email: \"user@example.com\", password: \"password\" }) { accessToken } }"
  }'
```

## Best Practices Across All Languages

1. **Error Handling**
   ```javascript
   // Always check for errors in response
   if (response.errors) {
     response.errors.forEach(error => {
       console.error('Error:', error.message);
     });
   }
   ```

2. **Token Management**
   - Store tokens securely
   - Implement token refresh logic
   - Handle token expiration gracefully

3. **Caching**
   - Cache frequently accessed data
   - Implement cache invalidation strategies

4. **Rate Limiting**
   - Implement backoff and retry logic
   - Monitor rate limit headers

5. **Testing**
   - Use the GraphiQL playground for testing
   - Write unit tests for API calls

---

**Ready to integrate?** Choose your language above and start building!

📚 **Related Documentation:**
- 🔐 [Authentication Guide](/api/graphql/authentication)
- 🛍️ [Shop API Reference](/api/graphql/shop-api)
- 👨‍💼 [Admin API Reference](/api/graphql/admin-api)
