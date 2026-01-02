---
outline: false
examples:
  - id: add-simple-product-to-cart
    title: Add Simple Product to Cart
    description: Add a simple product with quantity to the shopping cart.
    request: |
      POST /api/cart_items
      X-Cart-Token: xyz-token-123
      Content-Type: application/json

      {
        "product_id": 1,
        "quantity": 2
      }
    response: |
      {
        "@context": "/api/contexts/CartItem",
        "@id": "/api/cart_items/1",
        "@type": "CartItem",
        "id": 1,
        "cart_token": "xyz-token-123",
        "product_id": 1,
        "product_name": "Premium T-Shirt",
        "sku": "TSHIRT-001",
        "quantity": 2,
        "price": 29.99,
        "subtotal": 59.98,
        "created_at": "2024-01-20T10:30:00Z"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Product does not exist
        solution: Verify product_id is valid
      - error: 400 Out of Stock
        cause: Requested quantity exceeds stock
        solution: Reduce quantity or select different product
      - error: 400 Invalid Quantity
        cause: Quantity is 0 or negative
        solution: Provide quantity greater than 0

  - id: add-configurable-product-to-cart
    title: Add Configurable Product to Cart
    description: Add a configurable product with selected variants to cart.
    request: |
      POST /api/cart_items
      X-Cart-Token: xyz-token-123
      Content-Type: application/json

      {
        "product_id": 5,
        "quantity": 1,
        "variants": {
          "color": "Blue",
          "size": "M"
        }
      }
    response: |
      {
        "@context": "/api/contexts/CartItem",
        "@id": "/api/cart_items/2",
        "@type": "CartItem",
        "id": 2,
        "cart_token": "xyz-token-123",
        "product_id": 5,
        "product_name": "Configurable T-Shirt",
        "sku": "TSHIRT-BLU-M",
        "quantity": 1,
        "price": 34.99,
        "subtotal": 34.99,
        "variants": {
          "color": "Blue",
          "size": "M"
        },
        "created_at": "2024-01-20T10:35:00Z"
      }
    commonErrors:
      - error: 400 Invalid Variant
        cause: Selected variant combination not available
        solution: Choose valid attribute values
      - error: 404 Not Found
        cause: Cart token does not exist
        solution: Create a new cart first
---

# Add Product to Cart

Add a product to the shopping cart with support for simple and configurable products with variants.

## Endpoint

```
POST /api/cart_items
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-Cart-Token` | Yes | Cart token from cart creation |
| `Content-Type` | Yes | application/json |
| `Authorization` | No | Bearer token (only for customer carts) |

## Request Body

```json
{
  "product_id": 1,
  "quantity": 2,
  "variants": {
    "color": "Blue",
    "size": "M"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `product_id` | integer | Yes | Product ID to add |
| `quantity` | integer | Yes | Quantity (minimum 1) |
| `variants` | object | No | Variant selections for configurable products |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart item ID |
| `cart_token` | string | Associated cart token |
| `product_id` | integer | Product ID |
| `product_name` | string | Product name |
| `quantity` | integer | Item quantity |
| `price` | number | Unit price |
| `subtotal` | number | Total for this item (price × quantity) |
| `variants` | object | Selected variants (if configurable) |
| `created_at` | string | Creation timestamp |

## Usage Examples

:::examples-selector

## Related Resources

- [Create Cart](/api/rest-api/shop/mutations/create-cart)
- [Update Cart Item](/api/rest-api/shop/mutations/update-cart-item)
- [Remove Cart Item](/api/rest-api/shop/mutations/remove-cart-item)
- [Get Cart Details](/api/rest-api/shop/queries/get-cart)
