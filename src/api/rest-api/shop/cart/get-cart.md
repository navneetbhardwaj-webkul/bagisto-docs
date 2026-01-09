---
outline: false
examples:
  - id: get-cart
    title: Get Cart
    description: Retrieve the current shopping cart with items.
    request: |
      GET /api/shop/cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "items": [
            {
              "id": 1,
              "productId": 1,
              "productName": "Smartphone",
              "quantity": 2,
              "price": 599.99,
              "subtotal": 1199.98,
              "attributes": {
                "color": "Black"
              }
            }
          ],
          "subtotal": 1199.98,
          "tax": 119.99,
          "shippingCost": 10.00,
          "total": 1329.97,
          "itemCount": 2,
          "couponCode": null
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Cart not found or expired
        solution: Create a new cart first
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Cart

Retrieve the current shopping cart with all items and totals.

## Endpoint

```
GET /api/shop/cart
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart ID |
| `items` | array | Items in cart |
| `subtotal` | decimal | Items subtotal |
| `tax` | decimal | Calculated tax amount |
| `shippingCost` | decimal | Shipping cost |
| `total` | decimal | Grand total |
| `itemCount` | integer | Total items in cart |
| `couponCode` | string | Applied coupon code (if any) |

## Item Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart item ID |
| `productId` | integer | Product ID |
| `productName` | string | Product name |
| `quantity` | integer | Item quantity |
| `price` | decimal | Unit price |
| `subtotal` | decimal | Line item total |
| `attributes` | object | Product attributes (color, size, etc.) |

## Use Cases

- Display shopping cart summary
- Show cart contents to customer
- Calculate cart totals
- Display cart in sidebar/dropdown
- Pre-checkout cart review

## Related Resources

- [Create Cart](/api/rest-api/shop/cart/create-cart)
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart)
- [Update Cart Item](/api/rest-api/shop/cart/update-cart-item)
- [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item)
