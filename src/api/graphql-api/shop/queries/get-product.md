---
outline: false
examples:
  - id: get-product-basic
    title: Get Product - Basic Details
    description: Retrieve basic product information by ID including name, SKU, price, and descriptions.
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
          specialPrice
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
            "shortDescription": "Premium wireless headphones",
            "price": 199.99,
            "specialPrice": 149.99
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists in the system
      - error: INVALID_ID
        cause: Invalid ID format provided
        solution: Use valid product ID from the catalog

  - id: get-product-full
    title: Get Product - Complete Details with Relations
    description: Retrieve comprehensive product information including images, attributes, variants, and categories with proper edges/nodes structure.
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
          specialPrice
          images {
            edges {
              node {
                id
                _id
                type
                path
                productId
                position
                publicPath
              }
            }
          }
          attributeValues {
            edges {
              node {
                id
                _id
                locale
                channel
                value
                attribute {
                  id
                  _id
                  code
                  adminName
                }
              }
            }
          }
          variants {
            edges {
              node {
                id
                name
                sku
                price
              }
            }
          }
          categories {
            edges {
              node {
                id
              }
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
            "name": "Premium Wireless Headphones",
            "sku": "HEADPHONES-001",
            "urlKey": "premium-wireless-headphones",
            "description": "High-quality wireless headphones with active noise cancellation and 30-hour battery life",
            "shortDescription": "Premium wireless headphones",
            "price": 199.99,
            "specialPrice": 149.99,
            "images": {
              "edges": [
                {
                  "node": {
                    "id": "1",
                    "_id": "1",
                    "type": "image",
                    "path": "headphones/HEADPHONES-001/image1.jpg",
                    "productId": "1",
                    "position": 1,
                    "publicPath": "storage/headphones/HEADPHONES-001/image1.jpg"
                  }
                },
                {
                  "node": {
                    "id": "2",
                    "_id": "2",
                    "type": "image",
                    "path": "headphones/HEADPHONES-001/image2.jpg",
                    "productId": "1",
                    "position": 2,
                    "publicPath": "storage/headphones/HEADPHONES-001/image2.jpg"
                  }
                }
              ]
            },
            "attributeValues": {
              "edges": [
                {
                  "node": {
                    "id": "1",
                    "_id": "1",
                    "locale": "en",
                    "channel": "default",
                    "value": "Black",
                    "attribute": {
                      "id": "2",
                      "_id": "2",
                      "code": "color",
                      "adminName": "Color"
                    }
                  }
                },
                {
                  "node": {
                    "id": "2",
                    "_id": "2",
                    "locale": "en",
                    "channel": "default",
                    "value": "Premium Audio",
                    "attribute": {
                      "id": "3",
                      "_id": "3",
                      "code": "brand",
                      "adminName": "Brand"
                    }
                  }
                }
              ]
            },
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "1",
                    "name": "Black",
                    "sku": "HEADPHONES-001-BK",
                    "price": 199.99
                  }
                },
                {
                  "node": {
                    "id": "2",
                    "name": "White",
                    "sku": "HEADPHONES-001-WH",
                    "price": 199.99
                  }
                }
              ]
            },
            "categories": {
              "edges": [
                {
                  "node": {
                    "id": "5"
                  }
                },
                {
                  "node": {
                    "id": "8"
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product with specified ID does not exist
        solution: Verify the product ID and ensure it's published
      - error: INSUFFICIENT_PERMISSIONS
        cause: Product is not visible in current channel/locale
        solution: Check product visibility settings in admin panel

---

# Get Product

## Overview

The `product` GraphQL query retrieves a single product by its ID. This query allows you to fetch detailed product information including:

- Basic product details (name, SKU, descriptions, pricing)
- Product images with metadata (path, position, public URL)
- Attribute values with nested attribute information
- Product variants with individual SKUs and prices
- Related categories
- Pricing information including special/discounted prices

Use this query to build product detail pages, shopping cart displays, or product management features.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | The unique identifier of the product to retrieve |

## Return Fields

### Root Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique product identifier |
| `name` | `String!` | Product name/title |
| `sku` | `String!` | Stock Keeping Unit |
| `urlKey` | `String!` | URL-friendly product slug |
| `description` | `String` | Full product description |
| `shortDescription` | `String` | Brief product summary |
| `price` | `Float!` | Base product price |
| `specialPrice` | `Float` | Promotional/sale price (if applicable) |

### Nested Fields

**Images:**
| Field | Type | Description |
|-------|------|-------------|
| `images.edges[].node.id` | `ID!` | Image identifier |
| `images.edges[].node._id` | `String` | Internal image ID |
| `images.edges[].node.type` | `String` | Image type (image, thumbnail, etc.) |
| `images.edges[].node.path` | `String` | Relative image path |
| `images.edges[].node.productId` | `ID` | Associated product ID |
| `images.edges[].node.position` | `Int` | Image display order |
| `images.edges[].node.publicPath` | `String` | Public/storage URL path |

**Attributes:**
| Field | Type | Description |
|-------|------|-------------|
| `attributeValues.edges[].node.id` | `ID!` | Attribute value identifier |
| `attributeValues.edges[].node._id` | `String` | Internal attribute value ID |
| `attributeValues.edges[].node.locale` | `String` | Locale/language code |
| `attributeValues.edges[].node.channel` | `String` | Sales channel identifier |
| `attributeValues.edges[].node.value` | `String` | Attribute value content |
| `attributeValues.edges[].node.attribute.id` | `ID!` | Attribute identifier |
| `attributeValues.edges[].node.attribute.code` | `String` | Attribute code (color, brand, etc.) |
| `attributeValues.edges[].node.attribute.adminName` | `String` | Attribute display name in admin |

**Variants:**
| Field | Type | Description |
|-------|------|-------------|
| `variants.edges[].node.id` | `ID!` | Variant identifier |
| `variants.edges[].node.name` | `String!` | Variant name |
| `variants.edges[].node.sku` | `String!` | Variant SKU |
| `variants.edges[].node.price` | `Float!` | Variant price |

**Categories:**
| Field | Type | Description |
|-------|------|-------------|
| `categories.edges[].node.id` | `ID!` | Category identifier |

## Common Errors

| Error Code | Status | Cause | Solution |
|------------|--------|-------|----------|
| `PRODUCT_NOT_FOUND` | 404 | Product ID does not exist | Verify the product ID exists and is published |
| `INVALID_ID` | 400 | Invalid ID format | Use a valid product ID from the system |
| `INSUFFICIENT_PERMISSIONS` | 403 | Product not visible in current context | Check product visibility settings in admin panel |

## Rate Limiting

This query is subject to Bagisto rate limiting. Standard limits:

- **Public API**: 100 requests per minute
- **Headers returned**: 
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

