# Customer Management

Complete guide to customer operations including registration, authentication, profile management, and address management using the REST API.

## Customer Authentication

### Register New Customer

Create a new customer account.

**Endpoint:**
```
POST /api/customers
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "password_confirmation": "SecurePassword123!",
    "phone": "1234567890",
    "is_subscribed_to_newsletter": true
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    password: 'SecurePassword123!',
    password_confirmation: 'SecurePassword123!',
    phone: '1234567890',
    is_subscribed_to_newsletter: true
  })
});

const customer = await response.json();
console.log(customer);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/customers',
    headers={'Content-Type': 'application/json'},
    json={
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john@example.com',
        'password': 'SecurePassword123!',
        'password_confirmation': 'SecurePassword123!',
        'phone': '1234567890',
        'is_subscribed_to_newsletter': True
    }
)

customer = response.json()
print(customer)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/Customer",
  "@id": "/api/customers/10",
  "@type": "Customer",
  "id": 10,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "is_subscribed_to_newsletter": true,
  "status": 1,
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Customer Login

Authenticate a customer and receive access token.

**Endpoint:**
```
POST /api/customers/login
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/customers/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePassword123!'
  })
});

const data = await response.json();
localStorage.setItem('authToken', data.access_token);
console.log('Logged in:', data.customer);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/customers/login',
    headers={'Content-Type': 'application/json'},
    json={
        'email': 'john@example.com',
        'password': 'SecurePassword123!'
    }
)

data = response.json()
print(f"Token: {data['access_token']}")
print(f"Logged in as: {data['customer']['email']}")
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Customer",
  "@type": "Customer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "customer": {
    "id": 10,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

### Customer Logout

Invalidate the current authentication token.

**Endpoint:**
```
POST /api/customers/logout
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customers/logout" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customers/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
localStorage.removeItem('authToken');
console.log(result.message);
```

== Python

```python
import requests

token = 'YOUR_ACCESS_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customers/logout',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Successfully logged out"
}
```

## Forgot & Reset Password

### Request Password Reset

Request a password reset token for a customer.

**Endpoint:**
```
POST /api/forgot_passwords
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/forgot_passwords" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/forgot_passwords', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/forgot_passwords',
    headers={'Content-Type': 'application/json'},
    json={'email': 'john@example.com'}
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Password reset email sent successfully"
}
```

### Reset Password

Reset customer password with valid token.

**Endpoint:**
```
POST /api/reset_passwords
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/reset_passwords" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "token": "reset-token-from-email",
    "password": "NewPassword123!",
    "password_confirmation": "NewPassword123!"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/reset_passwords', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    token: 'reset-token-from-email',
    password: 'NewPassword123!',
    password_confirmation: 'NewPassword123!'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/reset_passwords',
    headers={'Content-Type': 'application/json'},
    json={
        'email': 'john@example.com',
        'token': 'reset-token-from-email',
        'password': 'NewPassword123!',
        'password_confirmation': 'NewPassword123!'
    }
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Password has been reset successfully"
}
```

## Customer Profile Management

### Get Customer Profile

Retrieve authenticated customer's profile.

**Endpoint:**
```
POST /api/customer_profiles
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customer_profiles" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customer_profiles', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});

const profile = await response.json();
console.log(profile);
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customer_profiles',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={}
)

profile = response.json()
print(profile)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/CustomerProfile",
  "@type": "CustomerProfile",
  "id": 10,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "date_of_birth": "1990-01-15",
  "gender": "M",
  "is_subscribed_to_newsletter": true,
  "created_at": "2024-01-10T10:00:00Z",
  "updated_at": "2024-01-20T10:30:00Z"
}
```

### Update Customer Profile

Update authenticated customer's profile information.

**Endpoint:**
```
POST /api/customer_profile_updates
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customer_profile_updates" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jonathan",
    "phone": "0987654321"
  }'
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customer_profile_updates', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'Jonathan',
    phone: '0987654321'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customer_profile_updates',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'first_name': 'Jonathan',
        'phone': '0987654321'
    }
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/CustomerProfileUpdate",
  "@type": "CustomerProfileUpdate",
  "message": "Customer profile updated successfully",
  "customer": {
    "id": 10,
    "first_name": "Jonathan",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "0987654321"
  }
}
```

### Delete Customer Profile

Delete authenticated customer account.

**Endpoint:**
```
POST /api/customer_profile_deletes
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customer_profile_deletes" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "SecurePassword123!"
  }'
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customer_profile_deletes', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    password: 'SecurePassword123!'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customer_profile_deletes',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={'password': 'SecurePassword123!'}
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/CustomerProfileDelete",
  "@type": "CustomerProfileDelete",
  "message": "Customer account deleted successfully"
}
```

## Customer Addresses

### List Customer Addresses

Retrieve all addresses for authenticated customer.

**Endpoint:**
```
GET /api/customer-addresses-filter
```

:::tabs

== cURL

```bash
curl -X GET "https://your-domain.com/api/customer-addresses-filter" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customer-addresses-filter', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const addresses = await response.json();
console.log(addresses);
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.get(
    'https://your-domain.com/api/customer-addresses-filter',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

addresses = response.json()
print(addresses)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/GetCustomerAddresses",
  "@id": "/api/customer-addresses-filter",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/customer_addresses/15",
      "@type": "CustomerAddress",
      "id": 15,
      "customer_id": 10,
      "first_name": "John",
      "last_name": "Doe",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "country": "US",
      "postcode": "10001",
      "phone": "1234567890",
      "is_default": true
    }
  ],
  "hydra:totalItems": 2
}
```

### Create Customer Address

Add a new address to customer account.

**Endpoint:**
```
POST /api/customer_addresses
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/customer_addresses" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "US",
    "postcode": "10001",
    "phone": "1234567890",
    "is_default": false
  }'
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customer_addresses', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    country: 'US',
    postcode: '10001',
    phone: '1234567890',
    is_default: false
  })
});

const address = await response.json();
console.log(address);
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.post(
    'https://your-domain.com/api/customer_addresses',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'first_name': 'John',
        'last_name': 'Doe',
        'address': '123 Main St',
        'city': 'New York',
        'state': 'NY',
        'country': 'US',
        'postcode': '10001',
        'phone': '1234567890',
        'is_default': False
    }
)

address = response.json()
print(address)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/CustomerAddress",
  "@id": "/api/customer_addresses/16",
  "@type": "CustomerAddress",
  "id": 16,
  "customer_id": 10,
  "first_name": "John",
  "last_name": "Doe",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "US",
  "postcode": "10001",
  "phone": "1234567890",
  "is_default": false,
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Update Customer Address

Modify an existing customer address.

**Endpoint:**
```
PATCH /api/customer_addresses/{id}
```

:::tabs

== cURL

```bash
curl -X PATCH "https://your-domain.com/api/customer_addresses/16" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Boston",
    "state": "MA"
  }'
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customer_addresses/16', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    city: 'Boston',
    state: 'MA'
  })
});

const address = await response.json();
console.log(address);
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.patch(
    'https://your-domain.com/api/customer_addresses/16',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'city': 'Boston',
        'state': 'MA'
    }
)

address = response.json()
print(address)
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/CustomerAddress",
  "@id": "/api/customer_addresses/16",
  "@type": "CustomerAddress",
  "id": 16,
  "customer_id": 10,
  "city": "Boston",
  "state": "MA",
  "is_default": false
}
```

### Delete Customer Address

Remove an address from customer account.

**Endpoint:**
```
DELETE /api/customer_addresses/{id}
```

:::tabs

== cURL

```bash
curl -X DELETE "https://your-domain.com/api/customer_addresses/16" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/customer_addresses/16', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

console.log('Address deleted');
```

== Python

```python
import requests

token = 'YOUR_CUSTOMER_TOKEN'

response = requests.delete(
    'https://your-domain.com/api/customer_addresses/16',
    headers={'Authorization': f'Bearer {token}'}
)

print('Address deleted')
```

:::

**Response (204 No Content):**

```
[Empty response body]
```

## Newsletter Subscription

### Subscribe to Newsletter

Subscribe an email to newsletter.

**Endpoint:**
```
POST /api/newsletter_subscriptions
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/newsletter_subscriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/newsletter_subscriptions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'subscriber@example.com'
  })
});

const subscription = await response.json();
console.log(subscription);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/newsletter_subscriptions',
    headers={'Content-Type': 'application/json'},
    json={'email': 'subscriber@example.com'}
)

subscription = response.json()
print(subscription)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/NewsletterSubscription",
  "@id": "/api/newsletter_subscriptions/1",
  "@type": "NewsletterSubscription",
  "id": 1,
  "email": "subscriber@example.com",
  "is_subscribed": true,
  "created_at": "2024-01-20T10:30:00Z"
}
```

## Related Resources

- [Cart & Checkout](/api/rest-api/cart-checkout)
- [Shop Resources](/api/rest-api/shop-resources)
- [Best Practices](/api/rest-api/best-practices)
