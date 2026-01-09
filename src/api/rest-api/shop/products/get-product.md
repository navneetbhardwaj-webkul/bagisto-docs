---
outline: false
examples:
  - id: get-product
    title: Get Single Product
    description: Retrieve detailed information for a specific product.
    request: |
      GET /api/shop/products/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "name": "Premium Smartphone",
          "slug": "premium-smartphone",
          "sku": "PHONE-PREMIUM-001",
          "price": 899.99,
          "specialPrice": 749.99,
          "type": "simple",
          "weight": 0.18,
          "description": "Latest flagship smartphone",
          "shortDescription": "High-performance mobile device",
          "imageUrl": "https://example.com/phone.jpg",
          "images": [
            "https://example.com/phone-1.jpg",
            "https://example.com/phone-2.jpg"
          ],
          "rating": 4.5,
          "reviews": 120,
          "inStock": true,
          "quantity": 50,
          "attributes": [
            {
              "name": "Color",
              "value": "Black"
            },
            {
              "name": "Storage",
              "value": "256GB"
            }
          ]
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Product with specified ID does not exist
        solution: Verify the product ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Product

Retrieve detailed information for a specific product by ID.

## Endpoint

```
GET /api/shop/products/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Product ID |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `includeRelated` | boolean | No | Include related products |
| `includeReviews` | boolean | No | Include product reviews |
| `locale` | string | No | Language locale |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Product ID |
| `name` | string | Product name |
| `slug` | string | URL-friendly product identifier |
| `sku` | string | Stock keeping unit |
| `price` | decimal | Product price |
| `specialPrice` | decimal | Sale/discount price |
| `type` | string | Product type (simple, configurable, bundle) |
| `weight` | decimal | Product weight |
| `description` | string | Full product description |
| `shortDescription` | string | Brief product description |
| `imageUrl` | string | Main product image URL |
| `images` | array | Additional product images |
| `rating` | decimal | Average rating (0-5) |
| `reviews` | integer | Number of reviews |
| `inStock` | boolean | Stock availability |
| `quantity` | integer | Available quantity |
| `attributes` | array | Product attributes |
| `createdAt` | string | Creation date |
| `updatedAt` | string | Last update date |

## Attributes Structure

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Attribute name |
| `value` | string | Attribute value |
| `type` | string | Attribute type (text, select, multiselect) |

## Use Cases

- Display product detail pages
- Show product information in modals/overlays
- Build product comparisons
- Create product recommendations
- Fetch product data for checkout

## Related Resources

- [Get Products](/api/rest-api/shop/products/get-products)
- [Search Product](/api/rest-api/shop/products/search-product)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
