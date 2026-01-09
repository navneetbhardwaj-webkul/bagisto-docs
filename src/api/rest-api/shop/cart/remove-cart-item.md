---
outline: false
examples:
  - id: remove-cart-item
    title: Remove Item from Cart
    description: Remove a product from the shopping cart.
    request: |
      DELETE /api/shop/cart/items/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "message": "Item removed from cart successfully",
        "cartTotal": 0
      }
    commonErrors:
      - error: 404 Not Found
        cause: Cart item does not exist
        solution: Verify the cart item ID
      - error: 400 Bad Request
        cause: Cannot remove last item
        solution: Leave item in cart or create new cart

---

# Remove Cart Item

Remove a product item from the shopping cart.

## Endpoint

```
DELETE /api/shop/cart/items/{itemId}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `itemId` | integer | Yes | Cart item ID |

## Response (200 OK)

```json
{
  "message": "Item removed from cart successfully",
  "cartTotal": 2999.95
}
```

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |
| `cartTotal` | decimal | Updated cart total |

## Alternative Response (204 No Content)

No response body returned.

## Use Cases

- Remove unwanted items from cart
- Delete items from cart view
- Clear items before re-ordering
- Remove items from review cart

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart)
- [Update Cart Item](/api/rest-api/shop/cart/update-cart-item)
