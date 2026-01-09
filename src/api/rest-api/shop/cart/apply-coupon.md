---
outline: false
examples:
  - id: apply-coupon
    title: Apply Coupon to Cart
    description: Apply a discount coupon code to the shopping cart.
    request: |
      POST /api/shop/cart/coupon
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "couponCode": "SAVE20"
      }
    response: |
      {
        "data": {
          "couponCode": "SAVE20",
          "discountAmount": 240.00,
          "discountPercentage": 20,
          "subtotal": 1199.98,
          "discount": 240.00,
          "tax": 95.99,
          "total": 1055.97,
          "message": "Coupon applied successfully"
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Coupon code does not exist
        solution: Verify the coupon code
      - error: 422 Validation Error
        cause: Coupon expired or not applicable
        solution: Check coupon validity and conditions
      - error: 400 Bad Request
        cause: Minimum cart value not met
        solution: Add more items to reach minimum

---

# Apply Coupon

Apply a discount coupon code to the shopping cart.

## Endpoint

```
POST /api/shop/cart/coupon
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

```json
{
  "couponCode": "SAVE20"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `couponCode` | string | Yes | Discount coupon code |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `couponCode` | string | Applied coupon code |
| `discountAmount` | decimal | Discount amount in currency |
| `discountPercentage` | decimal | Discount percentage |
| `subtotal` | decimal | Items subtotal |
| `discount` | decimal | Total discount amount |
| `tax` | decimal | Calculated tax |
| `total` | decimal | New cart total after discount |
| `message` | string | Success message |

## Validation

- Coupon code must exist and be active
- Coupon must not be expired
- Cart must meet minimum purchase requirement (if any)
- Coupon may have usage limits or customer restrictions
- Only one coupon per cart (typically)

## Use Cases

- Apply promotional discount codes
- Enable customer discount redemption
- Support seasonal promotions
- Apply gift cards or vouchers
- Implement loyalty program discounts

## Notes

- Discount is calculated in real-time
- Tax may be recalculated based on new total
- Invalid coupons return error without modifying cart
- Coupon can be removed separately

## Related Resources

- [Remove Coupon](/api/rest-api/shop/cart/remove-coupon)
- [Get Cart](/api/rest-api/shop/cart/get-cart)
