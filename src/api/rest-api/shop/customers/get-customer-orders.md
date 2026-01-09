---
outline: false
examples:
  - id: get-customer-orders
    title: Get Customer Orders
    description: Retrieve all orders for the authenticated customer.
    request: |
      GET /api/shop/customers/orders?page=1&limit=10&sort=-createdAt
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "data": {
          "orders": [
            {
              "id": 12345,
              "incrementId": "#000012345",
              "status": "processing",
              "grandTotal": 1329.97,
              "itemsCount": 2,
              "createdAt": "2024-01-15T10:30:00Z"
            }
          ],
          "meta": {
            "total": 5,
            "count": 1,
            "perPage": 10,
            "currentPage": 1,
            "lastPage": 1
          }
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token

---

# Get Customer Orders

Retrieve all orders for the authenticated customer with pagination support.

## Endpoint

```
GET /api/shop/customers/orders
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page (max 100) |
| `sort` | string | -createdAt | Sort by field (prefix `-` for descending) |
| `status` | string | - | Filter by status |

## Sort Options

- `createdAt` / `-createdAt` - By creation date
- `updatedAt` / `-updatedAt` - By update date
- `grandTotal` / `-grandTotal` - By total amount

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `orders` | array | List of customer orders |
| `meta` | object | Pagination metadata |

## Order Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Order ID |
| `incrementId` | string | Order increment ID |
| `status` | string | Current status |
| `grandTotal` | decimal | Total amount |
| `itemsCount` | integer | Number of items |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last update timestamp |
| `shippingStatus` | string | Shipping status |

## Order Status Values

- `pending` - Awaiting payment confirmation
- `processing` - Payment confirmed
- `shipped` - Order shipped
- `delivered` - Order delivered
- `canceled` - Order canceled
- `failed` - Payment failed

## Meta Pagination Fields

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total number of orders |
| `count` | integer | Number of orders in this page |
| `perPage` | integer | Items per page |
| `currentPage` | integer | Current page number |
| `lastPage` | integer | Last page number |

## Use Cases

- Display order history
- Show order list in account dashboard
- Track previous orders
- Check order status
- View recent purchases

## Filters

```bash
# Get pending orders
GET /api/shop/customers/orders?status=pending

# Get last 5 orders
GET /api/shop/customers/orders?limit=5

# Get page 2 (10 items per page)
GET /api/shop/customers/orders?page=2&limit=10

# Sort by latest
GET /api/shop/customers/orders?sort=-createdAt
```

## Related Resources

- [Place Order](/api/rest-api/shop/checkout/place-order)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
