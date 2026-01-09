---
outline: false
examples:
  - id: get-attribute-options-basic
    title: Get Attribute Options - Basic
    description: Retrieve basic attribute options with pagination.
    query: |
      query getAttributeOptions($attributeId: Int!, $first: Int) {
        attributeOptions(attributeId: $attributeId, first: $first) {
          edges {
            node {
              id
              _id
              adminName
              sortOrder
              swatchValue
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "attributeId": 23,
        "first": 10
      }
    response: |
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
                  "swatchValue": "#e10e0e"
                }
              },
              {
                "node": {
                  "id": "/api/shop/attribute-options/2",
                  "_id": 2,
                  "adminName": "Green",
                  "sortOrder": 1,
                  "swatchValue": "#155616"
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
    commonErrors:
      - error: MISSING_ATTRIBUTE_ID
        cause: attributeId parameter is required but not provided
        solution: Provide a valid attributeId parameter
      - error: INVALID_ATTRIBUTE_ID
        cause: Attribute ID is not a valid integer
        solution: Ensure attributeId is a numeric value

  - id: get-attribute-options-with-translations
    title: Get Attribute Options with Translations
    description: Retrieve attribute options with all available translations for multi-language support.
    query: |
      query getAttributeOptionsWithTranslations($attributeId: Int!, $first: Int) {
        attributeOptions(attributeId: $attributeId, first: $first) {
          edges {
            node {
              id
              adminName
              sortOrder
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
    variables: |
      {
        "attributeId": 23,
        "first": 5
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attribute-options/1",
                  "adminName": "Red",
                  "sortOrder": 0,
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
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: Attribute option has no translations
        solution: Check if translations are configured for this option

  - id: get-attribute-options-with-swatches
    title: Get Attribute Options with Swatches
    description: Retrieve attribute options with color or image swatch information.
    query: |
      query getSwatchOptions($attributeId: Int!, $first: Int) {
        attributeOptions(attributeId: $attributeId, first: $first) {
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
    variables: |
      {
        "attributeId": 24,
        "first": 20
      }
    response: |
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
    commonErrors:
      - error: INVALID_SWATCH_URL
        cause: Swatch image URL is invalid
        solution: Verify the swatch image exists and URL is correct

  - id: get-options-by-attribute-id
    title: Get Options By Attribute ID
    description: Retrieve all attribute options for a specific attribute with complete details including translations and swatches.
    query: |
      query getAttributeOptionsByAttributeID ($id: Int!) {
        attributeOptions(attributeId: $id) {
          edges {
            node {
              id
              _id
              attributeId
              adminName
              sortOrder
              swatchValue
              swatchValueUrl
              translation {
                id
                _id
                attributeOptionId
                locale
                label
              }
              translations {
                edges {
                  node {
                    id
                    _id
                    attributeOptionId
                    locale
                    label
                  }
                }
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "id": 23
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attribute-options/1",
                  "_id": 1,
                  "attributeId": 23,
                  "adminName": "Red",
                  "sortOrder": 0,
                  "swatchValue": "#e10e0e",
                  "swatchValueUrl": null,
                  "translation": {
                    "id": "/api/shop/attribute-option-translations/1",
                    "_id": 1,
                    "attributeOptionId": 1,
                    "locale": "en",
                    "label": "Red"
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attribute-option-translations/1",
                          "_id": 1,
                          "attributeOptionId": 1,
                          "locale": "en",
                          "label": "Red"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/attribute-option-translations/2",
                          "_id": 2,
                          "attributeOptionId": 1,
                          "locale": "ar",
                          "label": "أحمر"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "MA=="
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 5
          }
        }
      }
    commonErrors:
      - error: INVALID_ATTRIBUTE_ID
        cause: Provided attribute ID is invalid
        solution: Ensure the attribute ID is a valid integer
      - error: ATTRIBUTE_NOT_FOUND
        cause: Attribute with given ID does not exist
        solution: Verify the attribute ID exists in the system

  - id: get-attribute-option-by-id
    title: Get Single Attribute Option Detail by Option ID
    description: Retrieve complete details of a single attribute option including all translations and swatch information.
    query: |
      query getAttributeOptionByID ($id: ID!) {
        attributeOption (id: $id) {
          id
          _id
          attributeId
          adminName
          sortOrder
          swatchValue
          swatchValueUrl
          translation {
            id
            _id
            attributeOptionId
            locale
            label
          }
          translations {
            edges {
              node {
                id
                _id
                attributeOptionId
                locale
                label
              }
            }
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/attribute-options/1"
      }
    response: |
      {
        "data": {
          "attributeOption": {
            "id": "/api/shop/attribute-options/1",
            "_id": 1,
            "attributeId": 23,
            "adminName": "Red",
            "sortOrder": 0,
            "swatchValue": "#e10e0e",
            "swatchValueUrl": null,
            "translation": {
              "id": "/api/shop/attribute-option-translations/1",
              "_id": 1,
              "attributeOptionId": 1,
              "locale": "en",
              "label": "Red"
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/attribute-option-translations/1",
                    "_id": 1,
                    "attributeOptionId": 1,
                    "locale": "en",
                    "label": "Red"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-option-translations/2",
                    "_id": 2,
                    "attributeOptionId": 1,
                    "locale": "ar",
                    "label": "أحمر"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-option-translations/3",
                    "_id": 3,
                    "attributeOptionId": 1,
                    "locale": "fr",
                    "label": "Rouge"
                  }
                }
              ],
              "pageInfo": {
                "endCursor": "Mw==",
                "startCursor": "MA==",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: OPTION_NOT_FOUND
        cause: Attribute option with given ID does not exist
        solution: Verify the option ID is correct
      - error: INVALID_OPTION_ID
        cause: Option ID format is invalid
        solution: Use a valid option ID from the system

  - id: get-attribute-options-pagination
    title: Get Attribute Options - Pagination
    description: Paginate through large sets of attribute options using cursors.
    query: |
      query getAttributeOptionsPaginated(
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
    variables: |
      {
        "attributeId": 23,
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "attributeOptions": {
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
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor format is invalid
        solution: Use cursor values returned from previous requests

  - id: get-attribute-options-via-attribute
    title: Get Attribute Options via Attribute
    description: Retrieve attribute options as a nested resource within an attribute query.
    query: |
      query getAttribute($attributeId: String!, $first: Int) {
        attribute(id: $attributeId) {
          id
          code
          name
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
              cursor
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
        "attributeId": "/api/shop/attributes/23",
        "first": 10
      }
    response: |
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
    commonErrors:
      - error: ATTRIBUTE_NOT_FOUND
        cause: Attribute ID does not exist
        solution: Verify the attribute ID is correct

  - id: get-color-options-for-display
    title: Get Color Options for Display
    description: Get color attribute options optimized for product display with minimal fields.
    query: |
      query getColorOptions($attributeId: Int!) {
        attributeOptions(attributeId: $attributeId, first: 50) {
          edges {
            node {
              adminName
              swatchValue
              translation {
                label
              }
            }
          }
        }
      }
    variables: |
      {
        "attributeId": 23
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "adminName": "Red",
                  "swatchValue": "#e10e0e",
                  "translation": {
                    "label": "Red"
                  }
                }
              },
              {
                "node": {
                  "adminName": "Green",
                  "swatchValue": "#155616",
                  "translation": {
                    "label": "Green"
                  }
                }
              },
              {
                "node": {
                  "adminName": "Blue",
                  "swatchValue": "#0000ff",
                  "translation": {
                    "label": "Blue"
                  }
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: ATTRIBUTE_NOT_FOUND
        cause: Color attribute does not exist
        solution: Ensure color attribute ID is configured correctly
---

# Get Attribute Options

## About

The `getAttributeOptions` query retrieves attribute options (values) for a specific attribute. This query is essential for:

- Building product filter and search interfaces
- Displaying color swatches and size options
- Creating configurable product selectors
- Building faceted navigation systems
- Multi-language product attribute support

The query supports cursor-based pagination and optional translation fetching, making it ideal for displaying product attribute values in various UI contexts.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `attributeId` | `Int!` | ✅ Yes | The numeric ID of the attribute. Required to specify which attribute's options to retrieve. |
| `first` | `Int` | ❌ No | Number of options to retrieve from the start (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Cursor to start after for forward pagination. |
| `last` | `Int` | ❌ No | Number of options to retrieve from the end (backward pagination). Max: 100. |
| `before` | `String` | ❌ No | Cursor to start before for backward pagination. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[AttributeOptionEdge!]!` | Array of attribute option edges containing options and cursors. |
| `edges.node` | `AttributeOption!` | The actual attribute option object with id, name, swatch, and translations. |
| `edges.cursor` | `String!` | Pagination cursor for this option. Use with `after` or `before` arguments. |
| `pageInfo` | `PageInfo!` | Pagination metadata object. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more options exist after the current page. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether options exist before the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first option on the current page. |
| `pageInfo.endCursor` | `String` | Cursor of the last option on the current page. |

## AttributeOption Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique option identifier in format `/api/shop/attribute-options/{id}`. |
| `_id` | `Int!` | Numeric ID of the option. |
| `adminName` | `String!` | Admin-facing name (e.g., "Red", "Large", "Cotton"). |
| `sortOrder` | `Int!` | Display order of the option (0, 1, 2, ...). |
| `swatchValue` | `String` | Swatch value - hex color code for color attributes or text representation. |
| `swatchValueUrl` | `String` | URL to swatch image file for image-based swatches. |
| `translation` | `OptionTranslation` | Single translation for the default/current locale. |
| `translations` | `[OptionTranslation!]` | Collection of all translations for multi-language support. |

## Translation Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Translation ID in format `/api/attribute_option_translations/{id}`. |
| `_id` | `Int!` | Numeric translation ID. |
| `locale` | `String!` | Language locale code (e.g., "en", "ar", "fr", "de"). |
| `label` | `String!` | Translated label for the option in the specified locale. |

## Common Use Cases

### Display Color Picker in Product Page

```graphql
query ColorPicker($attributeId: Int!) {
  attributeOptions(attributeId: $attributeId, first: 50) {
    edges {
      node {
        adminName
        swatchValue
        translation { label }
      }
    }
  }
}
```

### Build Size Selector with Sorting

```graphql
query SizeSelector($attributeId: Int!) {
  attributeOptions(attributeId: $attributeId, first: 100) {
    edges {
      node {
        adminName
        sortOrder
        translation { label }
      }
    }
  }
}
```

### Multi-language Attribute Support

```graphql
query MultiLanguageOptions($attributeId: Int!) {
  attributeOptions(attributeId: $attributeId, first: 20) {
    edges {
      node {
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

## Best Practices

1. **Always Include Required attributeId** - This parameter is mandatory
2. **Use Appropriate Pagination Size** - Request 10-50 options per page
3. **Cache Results** - Attribute options change infrequently, cache them
4. **Request Translations When Needed** - Only fetch translations if supporting multiple languages
5. **Optimize Field Selection** - Request only fields your UI actually needs

## Related Resources

- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Attribute Options API](/api/graphql/shop/attribute-options) - Detailed API documentation
- [Products API](/api/graphql/shop/queries/get-products) - Related product queries
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
