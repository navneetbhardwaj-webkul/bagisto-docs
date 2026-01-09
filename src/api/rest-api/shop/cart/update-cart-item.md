---
outline: false
examples:
  - id: update-cart-item
    title: Update Cart Item
    description: Update quantity or attributes of an item in cart.
    request: |
      PUT /api/shop/cart/items/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "quantity": 5,
        "attributes": {
          "color": "Red",
          "size": "Medium"
        }
      }
    response: |
      {
        "data": {
          "id": 1,
          "productId": 1,
          "productName": "Smartphone",
          "quantity": 5,
          "price": 599.99,
          "subtotal": 2999.95,
          "attributes": {
            "color": "Red",
            "size": "Medium"
          }
        },
        "message": "Cart item updated successfully",
        "cartTotal": 2999.95
      }
    commonErrors:
      - error: 404 Not Found
        cause: Cart item does not exist
        solution: Verify the cart item ID
      - error: 422 Validation Error
        cause: Quantity exceeds available stock
        solution: Reduce quantity

---

# Update Cart Item

Update the quantity or attributes of an item in the shopping cart.

## Endpoint

```
PUT /api/shop/cart/items/{itemId}
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

## Request Body

```json
{
  "quantity": 5,
  "attributes": {
    "color": "Red",
    "size": "Medium"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `quantity` | integer | No | New quantity |
| `attributes` | object | No | Updated attributes |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart item ID |
| `productId` | integer | Product ID |
| `productName` | string | Product name |
| `quantity` | integer | Updated quantity |
| `price` | decimal | Unit price |
| `subtotal` | decimal | Updated line total |
| `attributes` | object | Updated attributes |

## Response Metadata

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |
| `cartTotal` | decimal | Updated cart total |

## Validation

- Quantity must be at least 1
- Quantity cannot exceed available stock
- Attributes must be valid for the product

## Use Cases

- Change quantity in cart view
- Update product variations (size, color)
- Modify options before checkout
- Adjust selections on cart page

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart)
- [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item)
