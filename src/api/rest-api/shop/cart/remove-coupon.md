---
outline: false
examples:
  - id: remove-coupon
    title: Remove Coupon from Cart
    description: Remove a discount coupon code from the shopping cart.
    request: |
      DELETE /api/shop/cart/coupon
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "message": "Coupon removed successfully",
        "cartTotal": 1199.98,
        "tax": 119.99,
        "total": 1319.97
      }
    commonErrors:
      - error: 404 Not Found
        cause: No coupon currently applied
        solution: Apply a coupon first before removing

---

# Remove Coupon

Remove a discount coupon code from the shopping cart.

## Endpoint

```
DELETE /api/shop/cart/coupon
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Response (200 OK)

```json
{
  "message": "Coupon removed successfully",
  "cartTotal": 1199.98,
  "tax": 119.99,
  "total": 1319.97
}
```

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |
| `cartTotal` | decimal | Updated cart subtotal |
| `tax` | decimal | Recalculated tax |
| `total` | decimal | New cart total |

## Alternative Response (204 No Content)

No response body returned.

## Use Cases

- Remove discount coupon from cart
- Switch to different coupon
- Cancel promotional discount
- Clear coupon before re-applying

## Effects

- Discount amount is subtracted from cart
- Cart total is recalculated
- Tax may be recalculated based on new total
- Cart items remain unchanged

## Related Resources

- [Apply Coupon](/api/rest-api/shop/cart/apply-coupon)
- [Get Cart](/api/rest-api/shop/cart/get-cart)
