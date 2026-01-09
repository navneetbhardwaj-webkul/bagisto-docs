---
outline: false
examples:
  - id: place-order
    title: Place Order
    description: Create an order from the cart.
    request: |
      POST /api/shop/checkout/order
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "shippingMethodCode": "flatrate_flatrate",
        "paymentMethod": "paypal"
      }
    response: |
      {
        "data": {
          "order": {
            "id": 12345,
            "incrementId": "#000012345",
            "status": "pending",
            "grandTotal": 1329.97,
            "itemsCount": 2,
            "createdAt": "2024-01-15T10:30:00Z"
          },
          "redirect": "https://checkout.paypal.com/..."
        },
        "message": "Order placed successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 400 Bad Request
        cause: Missing required checkout details
        solution: Ensure shipping address, method, and payment method are set
      - error: 409 Conflict
        cause: Cart is empty
        solution: Add items to cart first
      - error: 422 Unprocessable Entity
        cause: Inventory not available
        solution: Verify product stock

---

# Place Order

Create an order from the shopping cart. This completes the checkout process.

## Endpoint

```
POST /api/shop/checkout/order
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "shippingMethodCode": "flatrate_flatrate",
  "paymentMethod": "paypal"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `shippingMethodCode` | string | Yes | Code of selected shipping method |
| `paymentMethod` | string | Yes | Selected payment method |

## Response Fields (200-201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `order` | object | Created order details |
| `redirect` | string | Payment redirect URL (if needed) |
| `message` | string | Success message |

## Order Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Order ID |
| `incrementId` | string | Order increment ID |
| `status` | string | Order status |
| `grandTotal` | decimal | Total amount |
| `itemsCount` | integer | Number of items |
| `createdAt` | string | Creation timestamp |
| `invoiceUrl` | string | Invoice download URL |

## Order Status Values

- `pending` - Awaiting payment confirmation
- `processing` - Payment confirmed, preparing shipment
- `shipped` - Order shipped
- `delivered` - Order delivered
- `canceled` - Order canceled
- `failed` - Payment failed

## Pre-requisites

All of these must be completed before placing order:
1. Cart must have items
2. Shipping address must be set
3. Shipping method must be selected
4. Billing address must be set
5. Payment method must be selected
6. All items in stock

## After Order Placement

- Cart is automatically cleared
- Customer receives confirmation email
- Order status can be tracked
- Invoice becomes available
- Payment processing may redirect customer

## Validation Rules

- Cart cannot be empty
- All addresses must be complete
- Inventory must be available for all items
- Shipping method must match location
- Payment method must be valid

## Use Cases

- Complete customer checkout
- Create order for in-store pickup
- Process cash on delivery
- Execute payment gateway transaction
- Generate order confirmation and invoice

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address)
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address)
- [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method)
- [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method)
- [Get Customer Orders](/api/rest-api/shop/customers/get-customer-orders)
