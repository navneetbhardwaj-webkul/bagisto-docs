# Cart & Checkout

Complete guide to shopping cart management and checkout operations using the REST API. This section covers cart creation, item management, address handling, and order placement.

## Cart Token Management

### Create Cart Token

Create a new guest shopping cart with a unique token.

**Endpoint:**
```
POST /api/cart_tokens
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/cart_tokens" \
  -H "Content-Type: application/json" \
  -d '{}'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/cart_tokens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});

const cart = await response.json();
console.log(cart.id); // Use this token for subsequent requests
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/cart_tokens',
    headers={'Content-Type': 'application/json'},
    json={}
)

cart = response.json()
print(cart['id'])  # Use this token for subsequent requests
```

== PHP

```php
<?php
$client = new GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/api/cart_tokens', [
    'headers' => [
        'Content-Type' => 'application/json'
    ],
    'json' => []
]);

$cart = json_decode($response->getBody(), true);
echo $cart['id']; // Use this token for subsequent requests
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/CartToken",
  "@id": "/api/cart_tokens/550e8400-e29b-41d4-a716-446655440000",
  "@type": "CartToken",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "token": "550e8400-e29b-41d4-a716-446655440000",
  "is_active": true,
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Get Cart Token

Retrieve cart details by token.

**Endpoint:**
```
GET /api/cart_tokens/{id}
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/cart_tokens/550e8400-e29b-41d4-a716-446655440000" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/CartToken",
  "@id": "/api/cart_tokens/550e8400-e29b-41d4-a716-446655440000",
  "@type": "CartToken",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "token": "550e8400-e29b-41d4-a716-446655440000",
  "is_active": true,
  "created_at": "2024-01-20T10:30:00Z"
}
```

### List Cart Tokens

Retrieve all cart tokens (customer view shows only their carts).

**Endpoint:**
```
GET /api/cart_tokens
```

**Request:**
```bash
curl -X GET "https://your-domain.com/api/cart_tokens" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/CartToken",
  "@id": "/api/cart_tokens",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/cart_tokens/550e8400-e29b-41d4-a716-446655440000",
      "@type": "CartToken",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "is_active": true,
      "created_at": "2024-01-20T10:30:00Z"
    }
  ],
  "hydra:totalItems": 1
}
```

## Add Product to Cart

### Add Single Product

Add a product to the shopping cart.

**Endpoint:**
```
POST /api/shop/add-product-in-cart
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/add-product-in-cart" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "product_id": 5,
    "quantity": 2,
    "options": {
      "size": "large",
      "color": "red"
    }
  }'
```

== Node.js

```javascript
const cartToken = '550e8400-e29b-41d4-a716-446655440000';

const response = await fetch('https://your-domain.com/api/shop/add-product-in-cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Cart-Token': cartToken
  },
  body: JSON.stringify({
    cart_id: cartToken,
    product_id: 5,
    quantity: 2,
    options: {
      size: 'large',
      color: 'red'
    }
  })
});

const result = await response.json();
console.log(result);
```

== Python

```python
import requests

cart_token = '550e8400-e29b-41d4-a716-446655440000'

response = requests.post(
    'https://your-domain.com/api/shop/add-product-in-cart',
    headers={
        'Content-Type': 'application/json',
        'X-Cart-Token': cart_token
    },
    json={
        'cart_id': cart_token,
        'product_id': 5,
        'quantity': 2,
        'options': {
            'size': 'large',
            'color': 'red'
        }
    }
)

result = response.json()
print(result)
```

== PHP

```php
<?php
$cartToken = '550e8400-e29b-41d4-a716-446655440000';

$client = new GuzzleHttp\Client();

$response = $client->request('POST', 'https://your-domain.com/api/shop/add-product-in-cart', [
    'headers' => [
        'Content-Type' => 'application/json',
        'X-Cart-Token' => $cartToken
    ],
    'json' => [
        'cart_id' => $cartToken,
        'product_id' => 5,
        'quantity' => 2,
        'options' => [
            'size' => 'large',
            'color' => 'red'
        ]
    ]
]);

$result = json_decode($response->getBody(), true);
print_r($result);
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/AddProductInCart",
  "@id": "/api/shop/add-product-in-cart",
  "@type": "AddProductInCart",
  "message": "Product added to cart successfully",
  "cart": {
    "@id": "/api/cart_tokens/550e8400-e29b-41d4-a716-446655440000",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "items": [
      {
        "id": 1,
        "product_id": 5,
        "quantity": 2,
        "price": "49.99",
        "total": "99.98"
      }
    ],
    "subtotal": "99.98",
    "total": "99.98"
  }
}
```

### Batch Add Products

Add multiple products in a single request.

**Request:**
```bash
curl -X POST "https://your-domain.com/api/shop/add-product-in-cart" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "items": [
      {
        "product_id": 5,
        "quantity": 2,
        "options": {"size": "large"}
      },
      {
        "product_id": 7,
        "quantity": 1,
        "options": {"color": "blue"}
      }
    ]
  }'
```

## Update Cart Item

### Update Item Quantity

Update the quantity of an item in the cart.

**Endpoint:**
```
POST /api/update_cart_items
PATCH /api/update_cart_items
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "item_id": 1,
  "quantity": 5
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/update_cart_items" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "item_id": 1,
    "quantity": 5
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/UpdateCartItem",
  "@type": "UpdateCartItem",
  "message": "Cart item updated successfully",
  "cart": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "items": [
      {
        "id": 1,
        "product_id": 5,
        "quantity": 5,
        "price": "49.99",
        "total": "249.95"
      }
    ],
    "subtotal": "249.95",
    "total": "249.95"
  }
}
```

## Remove Cart Item

### Remove Single Item

Remove a specific item from the cart.

**Endpoint:**
```
POST /api/shop/remove-cart-item
DELETE /api/remove_cart_items/{id}
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "item_id": 1
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/shop/remove-cart-item" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "item_id": 1
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/RemoveCartItem",
  "@type": "RemoveCartItem",
  "message": "Item removed from cart successfully",
  "cart": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "items": [],
    "subtotal": "0.00",
    "total": "0.00"
  }
}
```

### Remove Multiple Items

Remove multiple items from cart at once.

**Endpoint:**
```
POST /api/remove_cart_items
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/remove_cart_items" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "item_ids": [1, 2, 3]
  }'
```

## Get Cart Details

### Read Cart

Retrieve current cart details.

**Endpoint:**
```
POST /api/read_carts
GET /api/read_carts/{id}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/read_carts" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/ReadCart",
  "@id": "/api/read_carts/550e8400-e29b-41d4-a716-446655440000",
  "@type": "ReadCart",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "items": [
    {
      "id": 1,
      "product": {
        "@id": "/api/shop/products/5",
        "id": 5,
        "name": "Premium Wireless Headphones",
        "price": "199.99"
      },
      "quantity": 2,
      "price": "199.99",
      "total": "399.98"
    }
  ],
  "subtotal": "399.98",
  "tax": "31.99",
  "shipping": "10.00",
  "discount": "0.00",
  "total": "441.97",
  "is_guest": true
}
```

## Coupon Management

### Apply Coupon

Apply a discount coupon code to the cart.

**Endpoint:**
```
POST /api/shop/apply-coupon
PATCH /api/shop/apply-coupon
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "coupon_code": "SAVE20"
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/shop/apply-coupon" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "coupon_code": "SAVE20"
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/ApplyCoupon",
  "@type": "ApplyCoupon",
  "message": "Coupon applied successfully",
  "discount": "80.00",
  "cart": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "subtotal": "399.98",
    "discount": "80.00",
    "tax": "25.59",
    "total": "345.57"
  }
}
```

### Remove Coupon

Remove an applied coupon code from the cart.

**Endpoint:**
```
POST /api/remove_coupons
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/remove_coupons" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/RemoveCoupon",
  "@type": "RemoveCoupon",
  "message": "Coupon removed successfully",
  "cart": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "subtotal": "399.98",
    "discount": "0.00",
    "tax": "31.99",
    "total": "441.97"
  }
}
```

## Shipping & Tax Estimation

### Estimate Shipping

Estimate shipping cost and tax for a given address.

**Endpoint:**
```
POST /api/estimate_shippings
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "address": {
    "country_id": 1,
    "state_id": 5,
    "postcode": "10001"
  }
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/estimate_shippings" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "address": {
      "country_id": 1,
      "state_id": 5,
      "postcode": "10001"
    }
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/EstimateShipping",
  "@type": "EstimateShipping",
  "shipping_methods": [
    {
      "id": 1,
      "code": "flatrate",
      "title": "Flat Rate",
      "price": "10.00",
      "description": "Standard Shipping"
    },
    {
      "id": 2,
      "code": "freeshipping",
      "title": "Free Shipping",
      "price": "0.00",
      "description": "Free Shipping"
    }
  ],
  "tax": "31.99",
  "total_with_shipping": "441.97"
}
```

## Checkout Address

### Save Billing Address

Save or update billing address during checkout.

**Endpoint:**
```
POST /api/checkout_addresses
PATCH /api/checkout_addresses/{id}
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "address_type": "billing",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "US",
  "postcode": "10001",
  "company": "Acme Inc"
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/checkout_addresses" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "address_type": "billing",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "US",
    "postcode": "10001",
    "company": "Acme Inc"
  }'
```

**Response (201 Created):**
```json
{
  "@context": "/api/contexts/CheckoutAddress",
  "@id": "/api/checkout_addresses/1",
  "@type": "CheckoutAddress",
  "id": 1,
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "address_type": "billing",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "US",
  "postcode": "10001"
}
```

### Save Shipping Address

Save shipping address for order delivery.

**Endpoint:**
```
POST /api/checkout_addresses
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/checkout_addresses" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "address_type": "shipping",
    "first_name": "John",
    "last_name": "Doe",
    "address": "456 Oak St",
    "city": "Boston",
    "state": "MA",
    "country": "US",
    "postcode": "02101"
  }'
```

## Checkout Shipping Method

### Set Shipping Method

Select a shipping method for the order.

**Endpoint:**
```
POST /api/checkout_shipping_methods
PATCH /api/checkout_shipping_methods/{id}
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "shipping_method_code": "flatrate",
  "shipping_method_title": "Flat Rate"
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/checkout_shipping_methods" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "shipping_method_code": "flatrate",
    "shipping_method_title": "Flat Rate"
  }'
```

**Response (201 Created):**
```json
{
  "@context": "/api/contexts/CheckoutShippingMethod",
  "@id": "/api/checkout_shipping_methods/1",
  "@type": "CheckoutShippingMethod",
  "id": 1,
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "shipping_method_code": "flatrate",
  "shipping_method_title": "Flat Rate",
  "shipping_price": "10.00"
}
```

## Create Order

### Place Order

Finalize the checkout and create an order.

**Endpoint:**
```
POST /api/checkout_orders
```

**Request Body:**
```json
{
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "payment_method": "paypal",
  "billing_address_id": 1,
  "shipping_address_id": 2,
  "shipping_method": "flatrate"
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/checkout_orders" \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "cart_id": "550e8400-e29b-41d4-a716-446655440000",
    "payment_method": "paypal",
    "billing_address_id": 1,
    "shipping_address_id": 2,
    "shipping_method": "flatrate"
  }'
```

**Response (201 Created):**
```json
{
  "@context": "/api/contexts/CheckoutOrder",
  "@id": "/api/checkout_orders/1",
  "@type": "CheckoutOrder",
  "id": 1,
  "order_number": "100000001",
  "cart_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pending",
  "subtotal": "399.98",
  "tax": "31.99",
  "shipping": "10.00",
  "discount": "0.00",
  "total": "441.97",
  "payment_method": "paypal",
  "items": [
    {
      "id": 1,
      "product_id": 5,
      "quantity": 2,
      "price": "199.99",
      "total": "399.98"
    }
  ],
  "created_at": "2024-01-20T10:30:00Z"
}
```

## Merge Cart

### Merge Guest Cart to Customer Cart

After a guest user logs in, merge their guest cart items into their customer account.

**Endpoint:**
```
POST /api/merge_carts
```

**Request Body:**
```json
{
  "guest_cart_token": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Request:**
```bash
curl -X POST "https://your-domain.com/api/merge_carts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -d '{
    "guest_cart_token": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Response (200 OK):**
```json
{
  "@context": "/api/contexts/MergeCart",
  "@type": "MergeCart",
  "message": "Carts merged successfully",
  "merged_items": 3,
  "customer_cart": {
    "id": "customer-cart-id",
    "items_count": 5,
    "total": "899.99"
  }
}
```

## Related Resources

- [Shop Resources](/api/rest-api/shop-resources)
- [Customer Management](/api/rest-api/customers)
- [Best Practices](/api/rest-api/best-practices)
