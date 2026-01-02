---
outline: false
examples:
  - id: create-cart-token
    title: Create Cart Token (Guest)
    description: Generate a new shopping cart token for guest users.
    request: |
      POST /api/carts
      Content-Type: application/json

      {}
    response: |
      {
        "@context": "/api/contexts/Cart",
        "@id": "/api/carts/xyz-token-123",
        "@type": "Cart",
        "token": "xyz-token-123",
        "items": [],
        "total": 0,
        "item_count": 0,
        "created_at": "2024-01-20T10:30:00Z"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Invalid request format
        solution: Ensure request body is valid JSON
      - error: 500 Internal Server Error
        cause: Server error creating cart
        solution: Retry the request or contact support

  - id: create-customer-cart
    title: Create Cart for Authenticated Customer
    description: Generate a shopping cart token for authenticated customer.
    request: |
      POST /api/carts
      Authorization: Bearer YOUR_CUSTOMER_TOKEN
      Content-Type: application/json

      {}
    response: |
      {
        "@context": "/api/contexts/Cart",
        "@id": "/api/carts/cust-token-456",
        "@type": "Cart",
        "token": "cust-token-456",
        "customer_id": 10,
        "items": [],
        "total": 0,
        "item_count": 0,
        "created_at": "2024-01-20T10:30:00Z"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid or expired authentication token
        solution: Provide a valid customer access token
      - error: 403 Forbidden
        cause: Customer account is disabled
        solution: Contact support to reactivate account
---

# Create Cart

Create a new shopping cart session for customers or guests. A cart token is required for adding products and managing the shopping experience.

## Endpoint

```
POST /api/carts
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | No | Bearer token for authenticated customers (optional) |
| `Content-Type` | Yes | application/json |

## Request Body

Empty JSON object:

```json
{}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `token` | string | Unique cart token for session |
| `customer_id` | integer | Customer ID (only if authenticated) |
| `items` | array | Array of cart items (empty on creation) |
| `total` | number | Cart total amount |
| `item_count` | integer | Number of items in cart |
| `created_at` | string | Creation timestamp |

## Usage Examples

:::examples-selector

## Notes

- Cart tokens are valid for 30 days of inactivity
- Include the cart token in `X-Cart-Token` header for subsequent cart operations
- Guest and customer carts are created with different token prefixes

## Related Resources

- [Add Product to Cart](/api/rest-api/shop/mutations/add-to-cart)
- [Get Cart Details](/api/rest-api/shop/queries/get-cart)
- [Remove Cart Item](/api/rest-api/shop/mutations/remove-cart-item)
