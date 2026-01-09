---
outline: false
examples:
  - id: create-cart
    title: Create Cart
    description: Create a new shopping cart.
    request: |
      POST /api/shop/cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "items": [],
          "subtotal": 0,
          "tax": 0,
          "shippingCost": 0,
          "total": 0,
          "itemCount": 0,
          "couponCode": null,
          "createdAt": "2024-01-20T15:30:00Z"
        },
        "message": "Cart created successfully"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Cart already exists
        solution: Use existing cart or clear it first
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Create Cart

Create a new shopping cart. A new cart is typically created at the start of a shopping session.

## Endpoint

```
POST /api/shop/cart
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

Optional. Can be empty `{}` or include initial items:

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "attributes": {
        "color": "Black"
      }
    }
  ]
}
```

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart ID |
| `items` | array | Items in cart (empty if newly created) |
| `subtotal` | decimal | Items subtotal |
| `tax` | decimal | Calculated tax |
| `shippingCost` | decimal | Shipping cost |
| `total` | decimal | Grand total |
| `itemCount` | integer | Total items in cart |
| `couponCode` | string | Applied coupon code (if any) |
| `createdAt` | string | Cart creation timestamp |

## Use Cases

- Create cart at start of shopping session
- Initialize empty cart for customer
- Set up cart for guest checkout
- Prepare cart for adding items

## Notes

- Cart is typically created once per session
- Multiple carts can exist (for different users)
- Empty carts can expire after inactivity
- Cart ID is needed for subsequent operations

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart)
- [Update Cart Item](/api/rest-api/shop/cart/update-cart-item)
- [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item)
