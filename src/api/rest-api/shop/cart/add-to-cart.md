---
outline: false
examples:
  - id: add-to-cart
    title: Add Item to Cart
    description: Add a product to the shopping cart.
    request: |
      POST /api/shop/cart/items
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "productId": 1,
        "quantity": 2,
        "attributes": {
          "color": "Black",
          "size": "Large"
        }
      }
    response: |
      {
        "data": {
          "id": 1,
          "productId": 1,
          "productName": "Smartphone",
          "quantity": 2,
          "price": 599.99,
          "subtotal": 1199.98,
          "attributes": {
            "color": "Black",
            "size": "Large"
          }
        },
        "message": "Item added to cart successfully",
        "cartTotal": 1199.98
      }
    commonErrors:
      - error: 404 Not Found
        cause: Product does not exist or is out of stock
        solution: Verify product ID and check availability
      - error: 422 Validation Error
        cause: Quantity exceeds available stock
        solution: Reduce quantity or check stock status

---

# Add to Cart

Add a product to the shopping cart with specified quantity and attributes.

## Endpoint

```
POST /api/shop/cart/items
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

```json
{
  "productId": 1,
  "quantity": 2,
  "attributes": {
    "color": "Black",
    "size": "Large"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `productId` | integer | Yes | Product ID to add |
| `quantity` | integer | Yes | Quantity (minimum 1) |
| `attributes` | object | No | Product attributes (color, size, etc.) |

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart item ID |
| `productId` | integer | Product ID |
| `productName` | string | Product name |
| `quantity` | integer | Quantity added |
| `price` | decimal | Unit price |
| `subtotal` | decimal | Line item total |
| `attributes` | object | Selected attributes |

## Response Metadata

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |
| `cartTotal` | decimal | Updated cart total |

## Behavior

- If product already in cart, quantity is increased
- Stock validation performed
- Price calculated at time of addition
- Attributes are validated for configurable products

## Use Cases

- Add product to cart from product page
- Update quantity by adding more
- Support cart on product detail pages
- Build "Quick Add" functionality

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Update Cart Item](/api/rest-api/shop/cart/update-cart-item)
- [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item)
- [Get Product](/api/rest-api/shop/products/get-product)
