---
outline: false
examples:
  - id: apply-coupon-to-cart
    title: Apply Coupon Code to Cart
    description: Apply a valid coupon code to reduce cart total.
    query: |
      mutation applyCoupon($cartId: String!, $couponCode: String!) {
        applyCoupon(input: {cartId: $cartId, couponCode: $couponCode}) {
          cart {
            id
            subTotal
            discountAmount
            total
            appliedCoupons {
              code
              description
              discountAmount
            }
          }
          message
          success
        }
      }
    variables: |
      {
        "cartId": "eyJpdiI6IjhWM...",
        "couponCode": "SAVE20"
      }
    response: |
      {
        "data": {
          "applyCoupon": {
            "cart": {
              "id": "1",
              "subTotal": 100.00,
              "discountAmount": 20.00,
              "total": 80.00,
              "appliedCoupons": [
                {
                  "code": "SAVE20",
                  "description": "20% off your order",
                  "discountAmount": 20.00
                }
              ]
            },
            "message": "Coupon applied successfully",
            "success": true
          }
        }
      }
    commonErrors:
      - error: INVALID_COUPON
        cause: Coupon code does not exist
        solution: Verify coupon code spelling
      - error: COUPON_EXPIRED
        cause: Coupon validity period has ended
        solution: Use an active coupon
      - error: MINIMUM_ORDER_NOT_MET
        cause: Cart total doesn't meet minimum requirement
        solution: Add more items to cart
---

# Apply Coupon

## About

The `applyCoupon` mutation applies a promotional coupon code to a shopping cart. Use this mutation to:

- Apply discount codes to reduce cart total
- Enable promo/coupon code functionality
- Implement "Apply Coupon" features on cart page
- Validate coupon eligibility
- Display discount calculations
- Support promotional campaigns

This mutation validates coupon code, checks eligibility conditions, and recalculates cart totals with applied discount.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `cartId` | `String!` | Cart token identifying which cart to apply coupon to. |
| `couponCode` | `String!` | Promotional coupon code to apply. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `cart` | `Cart!` | Updated cart with coupon applied. |
| `cart.appliedCoupons` | `[CouponCode!]` | Array of active coupon codes on cart. |
| `cart.discountAmount` | `Float` | Total discount from all applied coupons. |
| `cart.total` | `Float!` | Recalculated cart total with discount. |
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates successful coupon application. |
| `errors` | `[ErrorMessage!]` | Validation errors if application failed. |

