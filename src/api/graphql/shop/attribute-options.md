# Shop API - Attribute Options

Retrieve attribute options for products in your Bagisto store, including color swatches, size options, and other product variants.

## Overview

Attribute options represent the values available for product attributes (e.g., "Red", "Large", "Cotton"). The Attribute Options API allows you to fetch these values with support for multi-language translations and swatch information.

## Base Resource Object

```json
{
  "id": "/api/shop/attribute-options/1",
  "_id": 1,
  "adminName": "Red",
  "sortOrder": 0,
  "swatchValue": "#e10e0e",
  "swatchValueUrl": null,
  "translation": {
    "id": "/api/attribute_option_translations/1",
    "locale": "en",
    "label": "Red"
  }
}
```

## Get Attribute Options

Retrieve all options for a specific attribute with pagination support.

### Query

```graphql
query GetAttributeOptions(
  $attributeId: Int!
  $first: Int
  $after: String
) {
  attributeOptions(
    attributeId: $attributeId
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        _id
        adminName
        sortOrder
        swatchValue
        swatchValueUrl
        translation {
          locale
          label
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
  }
}
```

### Variables

```json
{
  "attributeId": 23,
  "first": 10
}
```

### Response

```json
{
  "data": {
    "attributeOptions": {
      "edges": [
        {
          "node": {
            "id": "/api/shop/attribute-options/1",
            "_id": 1,
            "adminName": "Red",
            "sortOrder": 0,
            "swatchValue": "#e10e0e",
            "swatchValueUrl": null,
            "translation": {
              "locale": "en",
              "label": "Red"
            }
          },
          "cursor": "MA=="
        },
        {
          "node": {
            "id": "/api/shop/attribute-options/2",
            "_id": 2,
            "adminName": "Green",
            "sortOrder": 1,
            "swatchValue": "#155616",
            "swatchValueUrl": null,
            "translation": {
              "locale": "en",
              "label": "Green"
            }
          },
          "cursor": "MQ=="
        }
      ],
      "pageInfo": {
        "hasNextPage": false,
        "endCursor": "MQ==",
        "hasPreviousPage": false,
        "startCursor": "MA=="
      }
    }
  }
}
```

## Get Attribute Options with Translations

Retrieve attribute options with all available translations.

### Query

```graphql
query GetAttributeOptionsWithTranslations(
  $attributeId: Int!
  $first: Int
) {
  attributeOptions(
    attributeId: $attributeId
    first: $first
  ) {
    edges {
      node {
        id
        adminName
        sortOrder
        swatchValue
        translations(first: 10) {
          edges {
            node {
              id
              locale
              label
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    }
  }
}
```

### Variables

```json
{
  "attributeId": 23,
  "first": 5
}
```

### Response

```json
{
  "data": {
    "attributeOptions": {
      "edges": [
        {
          "node": {
            "id": "/api/shop/attribute-options/1",
            "adminName": "Red",
            "sortOrder": 0,
            "swatchValue": "#e10e0e",
            "translations": {
              "edges": [
                {
                  "node": {
                    "id": "/api/attribute_option_translations/1",
                    "locale": "en",
                    "label": "Red"
                  }
                },
                {
                  "node": {
                    "id": "/api/attribute_option_translations/84",
                    "locale": "ar",
                    "label": "أحمر"
                  }
                },
                {
                  "node": {
                    "id": "/api/attribute_option_translations/167",
                    "locale": "fr",
                    "label": "Rouge"
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": false
              }
            }
          }
        }
      ]
    }
  }
}
```

## Get Attribute Options with Swatch Images

Retrieve color or image swatches for attribute options.

### Query

```graphql
query GetSwatchOptions(
  $attributeId: Int!
  $first: Int
) {
  attributeOptions(
    attributeId: $attributeId
    first: $first
  ) {
    edges {
      node {
        id
        adminName
        swatchValue
        swatchValueUrl
        translation {
          locale
          label
        }
      }
    }
  }
}
```

### Variables

```json
{
  "attributeId": 24,
  "first": 20
}
```

### Response

```json
{
  "data": {
    "attributeOptions": {
      "edges": [
        {
          "node": {
            "id": "/api/shop/attribute-options/10",
            "adminName": "Pattern1",
            "swatchValue": null,
            "swatchValueUrl": "https://example.com/swatches/pattern1.png",
            "translation": {
              "locale": "en",
              "label": "Pattern 1"
            }
          }
        },
        {
          "node": {
            "id": "/api/shop/attribute-options/11",
            "adminName": "Pattern2",
            "swatchValue": null,
            "swatchValueUrl": "https://example.com/swatches/pattern2.png",
            "translation": {
              "locale": "en",
              "label": "Pattern 2"
            }
          }
        }
      ]
    }
  }
}
```

## Get Attribute Options via Attribute

Retrieve options as a nested resource within an attribute query.

### Query

```graphql
query GetAttributeWithOptions($attributeId: String!) {
  attribute(id: $attributeId) {
    id
    code
    name
    options(first: 20) {
      edges {
        node {
          id
          adminName
          sortOrder
          swatchValue
          translation {
            locale
            label
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

### Variables

```json
{
  "attributeId": "/api/shop/attributes/23"
}
```

### Response

```json
{
  "data": {
    "attribute": {
      "id": "/api/shop/attributes/23",
      "code": "color",
      "name": "Color",
      "options": {
        "edges": [
          {
            "node": {
              "id": "/api/shop/attribute-options/1",
              "adminName": "Red",
              "sortOrder": 0,
              "swatchValue": "#e10e0e",
              "translation": {
                "locale": "en",
                "label": "Red"
              }
            },
            "cursor": "MA=="
          },
          {
            "node": {
              "id": "/api/shop/attribute-options/2",
              "adminName": "Green",
              "sortOrder": 1,
              "swatchValue": "#155616",
              "translation": {
                "locale": "en",
                "label": "Green"
              }
            },
            "cursor": "MQ=="
          }
        ],
        "pageInfo": {
          "hasNextPage": false,
          "endCursor": "MQ=="
        }
      }
    }
  }
}
```

## Paginate Through Attribute Options

Use cursor-based pagination to navigate through large sets of options.

### First Page

```graphql
query GetFirstPage($attributeId: Int!) {
  attributeOptions(attributeId: $attributeId, first: 10) {
    edges {
      node {
        id
        adminName
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Next Page

```graphql
query GetNextPage(
  $attributeId: Int!
  $cursor: String!
) {
  attributeOptions(
    attributeId: $attributeId
    first: 10
    after: $cursor
  ) {
    edges {
      node {
        id
        adminName
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Variables

```json
{
  "attributeId": 23,
  "cursor": "MQ=="
}
```

## Get All Options for a Product's Attributes

Retrieve all attribute options for a specific product.

### Query

```graphql
query GetProductAttributeOptions($productId: String!) {
  product(id: $productId) {
    id
    name
    attributes {
      edges {
        node {
          id
          code
          label
          attributeId
        }
      }
    }
  }
}
```

### Variables

```json
{
  "productId": "1"
}
```

### Response

```json
{
  "data": {
    "product": {
      "id": "1",
      "name": "Awesome Shirt",
      "attributes": {
        "edges": [
          {
            "node": {
              "id": "/api/shop/attributes/1",
              "code": "color",
              "label": "Color",
              "attributeId": 1
            }
          },
          {
            "node": {
              "id": "/api/shop/attributes/2",
              "code": "size",
              "label": "Size",
              "attributeId": 2
            }
          }
        ]
      }
    }
  }
}
```

## Filter Products by Attribute Option

Search for products that have a specific attribute option.

### Query

```graphql
query GetProductsByAttributeOption(
  $channel: String!
  $filters: ProductFilterInput
  $first: Int
) {
  products(
    channel: $channel
    filter: $filters
    first: $first
  ) {
    edges {
      node {
        id
        name
        sku
        price
        attributes {
          edges {
            node {
              code
              label
              value
            }
          }
        }
      }
    }
  }
}
```

### Variables

```json
{
  "channel": "default",
  "filters": {
    "color": "1"
  },
  "first": 20
}
```

### Response

```json
{
  "data": {
    "products": {
      "edges": [
        {
          "node": {
            "id": "1",
            "name": "Red Shirt",
            "sku": "SHIRT-RED-01",
            "price": "29.99",
            "attributes": {
              "edges": [
                {
                  "node": {
                    "code": "color",
                    "label": "Color",
                    "value": "Red"
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
}
```

## Field Reference

### AttributeOption Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier in format `/api/shop/attribute-options/{id}` |
| `_id` | Int | Numeric ID |
| `adminName` | String | Admin-facing option name (e.g., "Red", "Large") |
| `sortOrder` | Int | Display order of the option |
| `swatchValue` | String | Hex color code (for color attributes) or text value |
| `swatchValueUrl` | String | URL to swatch image file |
| `translation` | Object | Single translation for current locale |
| `translations` | Connection | Collection of all translations with pagination |

### Translation Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Translation ID |
| `locale` | String | Language locale code (e.g., "en", "ar") |
| `label` | String | Translated label for the option |

## Common Use Cases

### Display Color Swatches in Product Listing

```graphql
query GetColorOptions($attributeId: Int!) {
  attributeOptions(attributeId: $attributeId, first: 50) {
    edges {
      node {
        adminName
        swatchValue
        swatchValueUrl
        translation {
          label
        }
      }
    }
  }
}
```

### Build Size Guide with Options

```graphql
query GetSizeOptions($attributeId: Int!) {
  attributeOptions(attributeId: $attributeId, first: 100) {
    edges {
      node {
        adminName
        sortOrder
        translation {
          label
        }
      }
    }
  }
}
```

### Multi-language Product Configuration

```graphql
query GetMultiLanguageOptions($attributeId: Int!) {
  attributeOptions(attributeId: $attributeId, first: 20) {
    edges {
      node {
        id
        adminName
        translations(first: 10) {
          edges {
            node {
              locale
              label
            }
          }
        }
      }
    }
  }
}
```

## Error Handling

### Missing Attribute ID

```json
{
  "errors": [
    {
      "message": "Field \"attributeOptions\" argument \"attributeId\" of type \"Int!\" is required but not provided."
    }
  ]
}
```

### Invalid Pagination Cursor

```json
{
  "errors": [
    {
      "message": "Invalid cursor provided"
    }
  ]
}
```

### Non-existent Attribute

```json
{
  "data": {
    "attributeOptions": {
      "edges": [],
      "pageInfo": {
        "hasNextPage": false,
        "endCursor": null
      }
    }
  }
}
```

## Best Practices

1. **Use Specific Fields** - Only request the fields you need
2. **Implement Pagination** - Always use pagination for large option sets
3. **Cache Results** - Cache attribute options as they change infrequently
4. **Handle Translations** - Always request translations for multi-language support
5. **Optimize Images** - Pre-load swatch images for better UX

## Related Resources

- [Products API](/api/graphql/shop/products) - Product information and management
- [Categories API](/api/graphql/shop/categories) - Product categories
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API
