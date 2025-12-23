---
outline: false
examples:
  - id: get-attribute-basic
    title: Get Attribute - Basic
    description: Retrieve basic attribute information by ID.
    query: |
      query getAttribute($id: String!) {
        attribute(id: $id) {
          id
          code
          name
          type
        }
      }
    variables: |
      {
        "id": "/api/shop/attributes/23"
      }
    response: |
      {
        "data": {
          "attribute": {
            "id": "/api/shop/attributes/23",
            "code": "color",
            "name": "Color",
            "type": "select"
          }
        }
      }
    commonErrors:
      - error: MISSING_ID
        cause: Attribute ID parameter is required
        solution: Provide a valid attribute ID in format /api/shop/attributes/{id}
      - error: ATTRIBUTE_NOT_FOUND
        cause: Attribute ID does not exist
        solution: Verify the attribute ID is correct

  - id: get-attribute-with-details
    title: Get Attribute with Full Details
    description: Retrieve attribute with all configuration flags and metadata.
    query: |
      query getAttribute($id: String!) {
        attribute(id: $id) {
          id
          code
          name
          type
          sortOrder
          isFilterable
          isSearchable
          isConfigurable
          isVisibleOnFront
          isRequired
          defaultValue
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/shop/attributes/23"
      }
    response: |
      {
        "data": {
          "attribute": {
            "id": "/api/shop/attributes/23",
            "code": "color",
            "name": "Color",
            "type": "select",
            "sortOrder": 1,
            "isFilterable": true,
            "isSearchable": false,
            "isConfigurable": true,
            "isVisibleOnFront": true,
            "isRequired": false,
            "defaultValue": null,
            "createdAt": "2024-01-15T10:30:00Z",
            "updatedAt": "2024-01-20T14:22:00Z"
          }
        }
      }
    commonErrors:
      - error: INVALID_FIELD
        cause: Requested field does not exist
        solution: Check available attribute fields in schema

  - id: get-attribute-with-options
    title: Get Attribute with Options
    description: Retrieve attribute with all available options including translations.
    query: |
      query getAttribute($id: String!, $first: Int) {
        attribute(id: $id) {
          id
          code
          name
          type
          options(first: $first) {
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
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/attributes/23",
        "first": 20
      }
    response: |
      {
        "data": {
          "attribute": {
            "id": "/api/shop/attributes/23",
            "code": "color",
            "name": "Color",
            "type": "select",
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
                  }
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
                  }
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
    commonErrors:
      - error: NO_OPTIONS
        cause: Attribute has no options
        solution: Check if options are configured for this attribute

  - id: get-attribute-with-option-translations
    title: Get Attribute with Multi-language Options
    description: Retrieve attribute options with all available language translations.
    query: |
      query getAttribute($id: String!, $first: Int) {
        attribute(id: $id) {
          id
          code
          name
          type
          options(first: $first) {
            edges {
              node {
                id
                adminName
                sortOrder
                swatchValue
                translations(first: 10) {
                  edges {
                    node {
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
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/attributes/23",
        "first": 10
      }
    response: |
      {
        "data": {
          "attribute": {
            "id": "/api/shop/attributes/23",
            "code": "color",
            "name": "Color",
            "type": "select",
            "options": {
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
                            "locale": "en",
                            "label": "Red"
                          }
                        },
                        {
                          "node": {
                            "locale": "ar",
                            "label": "أحمر"
                          }
                        },
                        {
                          "node": {
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
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "MQ=="
              }
            }
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: No translations available for options
        solution: Ensure translations are configured for this attribute's options

  - id: get-attribute-pagination
    title: Get Attribute with Options Pagination
    description: Retrieve attribute and paginate through large option sets using cursors.
    query: |
      query getAttribute(
        $id: String!
        $first: Int
        $after: String
      ) {
        attribute(id: $id) {
          id
          code
          name
          type
          options(first: $first, after: $after) {
            edges {
              node {
                id
                adminName
                sortOrder
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
      }
    variables: |
      {
        "id": "/api/shop/attributes/23",
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "attribute": {
            "id": "/api/shop/attributes/23",
            "code": "color",
            "name": "Color",
            "type": "select",
            "options": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/attribute-options/1",
                    "adminName": "Red",
                    "sortOrder": 0
                  },
                  "cursor": "MA=="
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-options/2",
                    "adminName": "Green",
                    "sortOrder": 1
                  },
                  "cursor": "MQ=="
                }
              ],
              "pageInfo": {
                "hasNextPage": true,
                "endCursor": "MQ==",
                "hasPreviousPage": false,
                "startCursor": "MA=="
              }
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor is invalid
        solution: Use cursor values from previous response pageInfo

  - id: get-attribute-with-swatches
    title: Get Attribute with Color/Image Swatches
    description: Retrieve attribute with swatch values for color or image display.
    query: |
      query getAttribute($id: String!, $first: Int) {
        attribute(id: $id) {
          id
          code
          name
          type
          options(first: $first) {
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
      }
    variables: |
      {
        "id": "/api/shop/attributes/24",
        "first": 50
      }
    response: |
      {
        "data": {
          "attribute": {
            "id": "/api/shop/attributes/24",
            "code": "pattern",
            "name": "Pattern",
            "type": "select",
            "options": {
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
      }
    commonErrors:
      - error: INVALID_SWATCH_URL
        cause: Swatch image URL is invalid or inaccessible
        solution: Verify swatch image exists at the specified URL
---

# Get Attribute

## About

The `getAttribute` query retrieves a single attribute by ID with support for nested options, translations, and detailed configuration metadata. This query is essential for:

- Building product filter interfaces with attribute options
- Displaying attribute details in admin/management interfaces
- Creating product configuration forms
- Fetching attribute properties and validation rules
- Building faceted navigation systems with swatch support

The query supports nested pagination for options and translations, making it flexible for various UI requirements.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `String!` | ✅ Yes | Attribute ID in format `/api/shop/attributes/{id}` or numeric ID |

**Supported ID Formats:**

```graphql
# Format 1: Full URI
query { attribute(id: "/api/shop/attributes/23") { id } }

# Format 2: Numeric ID
query { attribute(id: "23") { id } }
```

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique attribute identifier in IRI format `/api/shop/attributes/{id}` |
| `code` | `String!` | Unique code identifier (e.g., "color", "size", "brand") |
| `name` | `String!` | Display name of the attribute |
| `type` | `String!` | Attribute type (text, select, date, checkbox, textarea, etc.) |
| `sortOrder` | `Int!` | Display order for sorting |
| `isFilterable` | `Boolean!` | Can be used for product filtering |
| `isSearchable` | `Boolean!` | Can be used in product search |
| `isConfigurable` | `Boolean!` | Can be configured for products |
| `isVisibleOnFront` | `Boolean!` | Visible to frontend customers |
| `isRequired` | `Boolean!` | Required for product assignment |
| `defaultValue` | `String` | Default value (nullable) |
| `createdAt` | `DateTime!` | Creation timestamp (ISO 8601) |
| `updatedAt` | `DateTime!` | Last update timestamp (ISO 8601) |
| `options` | `Connection` | Attribute options with pagination support |

## Attribute Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique identifier in format `/api/shop/attributes/{id}` |
| `code` | `String!` | Unique code identifier for attribute |
| `name` | `String!` | Display name of the attribute |
| `type` | `String!` | Attribute type (text, select, date, etc.) |
| `sortOrder` | `Int!` | Display sort order |
| `isFilterable` | `Boolean!` | Usable for product filtering |
| `isSearchable` | `Boolean!` | Usable for search |
| `isConfigurable` | `Boolean!` | Can be configured for products |
| `isVisibleOnFront` | `Boolean!` | Visible on storefront |
| `isRequired` | `Boolean!` | Required for products |
| `defaultValue` | `String` | Default value if any |
| `createdAt` | `String!` | Creation date |
| `updatedAt` | `String!` | Last update date |
| `options` | `Connection` | Nested attribute options with pagination |

## Common Use Cases

### Get Attribute for Filter UI

```graphql
query GetAttributeFilter($id: String!) {
  attribute(id: $id) {
    id
    code
    name
    isFilterable
    options(first: 100) {
      edges {
        node {
          id
          adminName
          translation {
            label
          }
        }
      }
    }
  }
}
```

### Get Attribute with Option Swatches

```graphql
query GetColorAttribute($id: String!) {
  attribute(id: $id) {
    id
    code
    name
    type
    options(first: 50) {
      edges {
        node {
          id
          adminName
          swatchValue
          translation {
            label
          }
        }
      }
    }
  }
}
```

### Build Product Configuration Form

```graphql
query GetAttributeForForm($id: String!) {
  attribute(id: $id) {
    id
    code
    name
    type
    isRequired
    defaultValue
    options(first: 100) {
      edges {
        node {
          id
          adminName
          sortOrder
          translation {
            label
          }
        }
      }
    }
  }
}
```

### Get Multi-language Attribute

```graphql
query GetMultiLanguageAttribute($id: String!) {
  attribute(id: $id) {
    id
    code
    name
    options(first: 20) {
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
}
```

## Error Handling

### Missing ID Parameter

```json
{
  "errors": [
    {
      "message": "Field \"attribute\" argument \"id\" of type \"String!\" is required but not provided."
    }
  ]
}
```

### Attribute Not Found

```json
{
  "data": {
    "attribute": null
  }
}
```

### Invalid ID Format

```json
{
  "data": {
    "attribute": null
  }
}
```

## Best Practices

1. **Use Variables** - Always use GraphQL variables for dynamic IDs
2. **Request Specific Fields** - Only fetch fields your UI needs
3. **Handle Pagination** - Use `hasNextPage` and `endCursor` for nested options
4. **Cache Results** - Attributes rarely change, implement caching
5. **Limit Option Requests** - Start with reasonable limits (20-50) then load more on demand

## Related Resources

- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Attribute Collection](/api/graphql/shop/queries/get-attributes) - Query multiple attributes
- [Attribute Options API](/api/graphql/shop/queries/get-attribute-options) - Detailed option queries
- [Attributes API](/api/graphql/shop/attribute-options) - Full attributes documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
