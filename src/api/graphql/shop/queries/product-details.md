---
outline: false
examples:
  - id: get-product-details-full
    title: Get Full Product Details
    description: Retrieve complete product information including attributes, images, and pricing.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          description
          shortDescription
          price
          images {
            id
            url
            altText
          }
          attributes {
            code
            value
          }
        }
      }
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "1",
            "name": "Premium Wireless Headphones",
            "sku": "HEADPHONES-001",
            "urlKey": "premium-wireless-headphones",
            "description": "High-quality wireless headphones with noise cancellation",
            "shortDescription": "Premium headphones",
            "price": 199.99,
            "images": [
              {
                "id": "1",
                "url": "https://example.com/headphones-1.jpg",
                "altText": "Front view"
              }
            ],
            "attributes": [
              {
                "code": "color",
                "value": "Black"
              }
            ]
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID
---

# Product Details

## About

The `productDetails` query retrieves comprehensive information for a single product, including all attributes, variants, pricing, media, and SEO metadata. Use this query to:

- Display product detail pages with complete information
- Show product images, variants, and specifications
- Render custom attribute values and descriptions
- Display pricing with discounts and promotional information
- Show inventory and availability status
- Render related products and recommendations
- Generate product meta tags for SEO

This query returns all product metadata needed for a complete product page experience, including high-resolution images, detailed descriptions, variant options, and custom attributes.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | The unique product identifier. |
| `sku` | `String` | Alternative to ID - product SKU for lookup. |
| `urlKey` | `String` | URL-friendly product identifier for lookup. |
| `include_variants` | `Boolean` | Include product variant information. Default: `true` |
| `include_images` | `Boolean` | Include product images and galleries. Default: `true` |
| `image_resolution` | `String` | Image quality: `thumbnail`, `medium`, `large`, `original`. Default: `large` |
| `include_recommendations` | `Boolean` | Include related and recommended products. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique product identifier. |
| `name` | `String!` | Product display name. |
| `sku` | `String!` | Stock Keeping Unit identifier. |
| `urlKey` | `String!` | URL-friendly product slug. |
| `type` | `String!` | Product type (simple, configurable, bundle, grouped). |
| `description` | `String` | Full product description with formatting. |
| `shortDescription` | `String` | Brief product summary. |
| `price` | `Float!` | Base product price. |
| `specialPrice` | `Float` | Promotional/discounted price if applicable. |
| `images` | `[ProductImage!]!` | Array of product images with URLs and metadata. |
| `images.url` | `String!` | Image URL. |
| `images.altText` | `String` | Image alt text for accessibility. |
| `images.position` | `Int` | Image order in gallery. |
| `attributes` | `[ProductAttribute!]!` | Custom product attributes and values. |
| `variants` | `[ProductVariant!]!` | Product variants (colors, sizes, etc.). |
| `variants.sku` | `String!` | Variant SKU. |
| `variants.price` | `Float!` | Variant-specific price. |
| `inventory` | `InventoryInfo!` | Stock availability information. |
| `categories` | `[Category!]!` | Product category assignments. |
| `tags` | `[String!]!` | Product tags and labels. |
| `seo` | `ProductSEO!` | SEO metadata. |
| `createdAt` | `DateTime!` | Product creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |

