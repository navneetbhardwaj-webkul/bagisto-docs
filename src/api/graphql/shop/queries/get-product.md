---
outline: false
examples:
  - id: get-product-by-id
    title: Get Product by ID
    description: Retrieve product information using the product ID.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
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
            "name": "Product Name",
            "sku": "PROD-001",
            "urlKey": "product-name",
            "price": 99.99
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: INVALID_ID
        cause: Invalid ID format
        solution: Use valid numeric or string ID
  - id: get-product-by-sku
    title: Get Product by SKU
    description: Retrieve product using the product SKU (Stock Keeping Unit).
    query: |
      query getProduct($sku: String!) {
        product(sku: $sku) {
          id
          name
          sku
          urlKey
          price
        }
      }
    variables: |
      {
        "sku": "PROD-001"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "1",
            "name": "Product Name",
            "sku": "PROD-001",
            "urlKey": "product-name",
            "price": 99.99
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: SKU does not exist
        solution: Check product SKU spelling
  - id: get-product-with-variants
    title: Get Product with Variants
    description: Retrieve product including variant options.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          variants {
            id
            name
            sku
            price
            attributes {
              code
              value
            }
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
            "name": "T-Shirt",
            "sku": "TSHIRT-001",
            "urlKey": "t-shirt",
            "price": 29.99,
            "variants": [
              {
                "id": "1-s",
                "name": "Small",
                "sku": "TSHIRT-001-S",
                "price": 29.99,
                "attributes": [
                  {
                    "code": "size",
                    "value": "S"
                  }
                ]
              }
            ]
          }
        }
      }
    commonErrors:
      - error: NO_VARIANTS
        cause: Product has no variants
        solution: Use simple product query
---

# Get Product

## About

The `getProduct` query retrieves a single product by its unique identifier, SKU, or URL key. Use this query to:

- Fetch individual products for detail pages
- Look up products by different identifier types (ID, SKU, URL)
- Display product information in components and pages
- Retrieve minimal product data for lists and previews
- Build product-specific API integrations

This query supports multiple lookup methods (ID, SKU, or URL key) and can optionally include variant information, making it flexible for various use cases.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID` | Product's unique system identifier. Use this for direct lookups. |
| `sku` | `String` | Stock Keeping Unit. Alternative identifier for product lookup. |
| `urlKey` | `String` | URL-friendly product slug. Alternative lookup method. |
| `include_variants` | `Boolean` | Include product variants (colors, sizes, options). Default: `false` |
| `include_images` | `Boolean` | Include product images. Default: `false` |
| `include_attributes` | `Boolean` | Include custom product attributes. Default: `true` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique product identifier. |
| `name` | `String!` | Product name. |
| `sku` | `String!` | Stock Keeping Unit for inventory tracking. |
| `urlKey` | `String!` | URL-friendly product slug for SEO. |
| `type` | `String!` | Product type (simple, configurable, grouped, bundle). |
| `description` | `String` | Full product description. |
| `shortDescription` | `String` | Brief product summary. |
| `price` | `Float!` | Base product price. |
| `specialPrice` | `Float` | Promotional price if active. |
| `taxClass` | `String` | Tax classification for the product. |
| `variants` | `[ProductVariant!]` | Product variants when `include_variants: true`. |
| `images` | `[ProductImage!]` | Product images when `include_images: true`. |
| `attributes` | `[ProductAttribute!]` | Custom attributes and their values. |
| `inventory` | `InventoryInfo!` | Current stock levels and status. |
| `categories` | `[Category!]!` | Categories this product belongs to. |
| `tags` | `[String!]` | Product tags and labels. |
| `status` | `String!` | Product status (active, draft, inactive). |
| `visibility` | `String!` | Visibility status (visible, not visible, search only). |
| `createdAt` | `DateTime!` | Product creation date. |
| `updatedAt` | `DateTime!` | Last modification date. |

