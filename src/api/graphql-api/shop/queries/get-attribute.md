---
outline: false
examples:
  - id: get-attribute-basic
    title: Get Attribute - Basic
    description: Retrieve basic attribute information by ID.
    query: |
      query getAttributeByID($id: ID!){
        attribute(id: $id) {
          id
          _id
          code
          adminName
          type
          swatchType
          validation
          regex
          position
          isRequired
          isUnique
          isFilterable
          isComparable
          isConfigurable
          isUserDefined
          isVisibleOnFront
          valuePerLocale
          valuePerChannel
          defaultValue
          enableWysiwyg
          createdAt
          updatedAt
          columnName
          validations
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
            "_id": 23,
            "code": "color",
            "adminName": "Color",
            "type": "select",
            "swatchType": "color",
            "validation": null,
            "regex": null,
            "position": 26,
            "isRequired": "0",
            "isUnique": "0",
            "isFilterable": "1",
            "isComparable": "0",
            "isConfigurable": "1",
            "isUserDefined": "1",
            "isVisibleOnFront": "0",
            "valuePerLocale": "0",
            "valuePerChannel": "0",
            "defaultValue": null,
            "enableWysiwyg": "0",
            "createdAt": "2023-11-02T16:40:10+05:30",
            "updatedAt": "2023-12-06T12:52:51+05:30",
            "columnName": "integer_value",
            "validations": "{  }"
          }
        }
      }
    commonErrors:
      - error: Variable \"$id\" of required type \"ID!\" was not provided.
        cause: Attribute ID parameter is required
        solution: Provide a valid attribute ID in format /api/shop/attributes/{id}
      - error: Invalid ID format. Expected IRI format like \"/api/shop/attributes/1\" or numeric ID
        cause: Attribute ID is not valid
        solution: Verify the attribute ID is correct format
      - error: Attribute not found
        cause: Attribute ID does not exist
        solution: Verify the attribute ID is correct
       
  - id: get-attribute-with-details
    title: Get Attribute with Full Details
    description: Retrieve attribute with all configuration flags and metadata.
    query: |
      query getAttributeByID($id: ID!){
          attribute(id: $id) {
            id
            _id
            code
            adminName
            type
            swatchType
            validation
            regex
            position
            isRequired
            isUnique
            isFilterable
            isComparable
            isConfigurable
            isUserDefined
            isVisibleOnFront
            valuePerLocale
            valuePerChannel
            defaultValue
            enableWysiwyg
            createdAt
            updatedAt
            columnName
            validations
            options {
              edges {
                node {
                  id
                  _id
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
            translations {
              edges {
                node {
                  id
                  _id
                  attributeId
                  locale
                  name
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
                "_id": 23,
                "code": "color",
                "adminName": "Color",
                "type": "select",
                "swatchType": "color",
                "validation": null,
                "regex": null,
                "position": 26,
                "isRequired": "0",
                "isUnique": "0",
                "isFilterable": "1",
                "isComparable": "0",
                "isConfigurable": "1",
                "isUserDefined": "1",
                "isVisibleOnFront": "0",
                "valuePerLocale": "0",
                "valuePerChannel": "0",
                "defaultValue": null,
                "enableWysiwyg": "0",
                "createdAt": "2023-11-02T16:40:10+05:30",
                "updatedAt": "2023-12-06T12:52:51+05:30",
                "columnName": "integer_value",
                "validations": "{  }",
                "options": {
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
                                    "id": "/api/attribute_option_translations/1",
                                    "_id": 1,
                                    "attributeOptionId": "1",
                                    "locale": "en",
                                    "label": "Red"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/84",
                                                "_id": 84,
                                                "attributeOptionId": "1",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/1",
                                                "_id": 1,
                                                "attributeOptionId": "1",
                                                "locale": "en",
                                                "label": "Red"
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
                                    "id": "/api/attribute_option_translations/2",
                                    "_id": 2,
                                    "attributeOptionId": "2",
                                    "locale": "en",
                                    "label": "Green"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/85",
                                                "_id": 85,
                                                "attributeOptionId": "2",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/2",
                                                "_id": 2,
                                                "attributeOptionId": "2",
                                                "locale": "en",
                                                "label": "Green"
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
                            "cursor": "MQ=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/3",
                                "_id": 3,
                                "adminName": "Yellow",
                                "sortOrder": 2,
                                "swatchValue": "#f6fa00",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/3",
                                    "_id": 3,
                                    "attributeOptionId": "3",
                                    "locale": "en",
                                    "label": "Yellow"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/86",
                                                "_id": 86,
                                                "attributeOptionId": "3",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/3",
                                                "_id": 3,
                                                "attributeOptionId": "3",
                                                "locale": "en",
                                                "label": "Yellow"
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
                            "cursor": "Mg=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/4",
                                "_id": 4,
                                "adminName": "Black",
                                "sortOrder": 3,
                                "swatchValue": "#000000",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/4",
                                    "_id": 4,
                                    "attributeOptionId": "4",
                                    "locale": "en",
                                    "label": "Black"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/87",
                                                "_id": 87,
                                                "attributeOptionId": "4",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/4",
                                                "_id": 4,
                                                "attributeOptionId": "4",
                                                "locale": "en",
                                                "label": "Black"
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
                            "cursor": "Mw=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/5",
                                "_id": 5,
                                "adminName": "White",
                                "sortOrder": 4,
                                "swatchValue": "#ffffff",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/5",
                                    "_id": 5,
                                    "attributeOptionId": "5",
                                    "locale": "en",
                                    "label": "White"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/88",
                                                "_id": 88,
                                                "attributeOptionId": "5",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/5",
                                                "_id": 5,
                                                "attributeOptionId": "5",
                                                "locale": "en",
                                                "label": "White"
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
                            "cursor": "NA=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/39",
                                "_id": 39,
                                "adminName": "Orange",
                                "sortOrder": 5,
                                "swatchValue": "#ff6600",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/39",
                                    "_id": 39,
                                    "attributeOptionId": "39",
                                    "locale": "en",
                                    "label": "Orange"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/89",
                                                "_id": 89,
                                                "attributeOptionId": "39",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/39",
                                                "_id": 39,
                                                "attributeOptionId": "39",
                                                "locale": "en",
                                                "label": "Orange"
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
                            "cursor": "NQ=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/41",
                                "_id": 41,
                                "adminName": "Blue",
                                "sortOrder": 6,
                                "swatchValue": "#0000ff",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/41",
                                    "_id": 41,
                                    "attributeOptionId": "41",
                                    "locale": "en",
                                    "label": "Blue"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/90",
                                                "_id": 90,
                                                "attributeOptionId": "41",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/41",
                                                "_id": 41,
                                                "attributeOptionId": "41",
                                                "locale": "en",
                                                "label": "Blue"
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
                            "cursor": "Ng=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/42",
                                "_id": 42,
                                "adminName": "Pink",
                                "sortOrder": 7,
                                "swatchValue": "#e33d94",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/42",
                                    "_id": 42,
                                    "attributeOptionId": "42",
                                    "locale": "en",
                                    "label": "Pink"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/91",
                                                "_id": 91,
                                                "attributeOptionId": "42",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/42",
                                                "_id": 42,
                                                "attributeOptionId": "42",
                                                "locale": "en",
                                                "label": "Pink"
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
                            "cursor": "Nw=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/43",
                                "_id": 43,
                                "adminName": "Purple",
                                "sortOrder": 8,
                                "swatchValue": "#6611bb",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/43",
                                    "_id": 43,
                                    "attributeOptionId": "43",
                                    "locale": "en",
                                    "label": "Purple"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/92",
                                                "_id": 92,
                                                "attributeOptionId": "43",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/43",
                                                "_id": 43,
                                                "attributeOptionId": "43",
                                                "locale": "en",
                                                "label": "Purple"
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
                            "cursor": "OA=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/46",
                                "_id": 46,
                                "adminName": "Grey",
                                "sortOrder": 9,
                                "swatchValue": "#949494",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/46",
                                    "_id": 46,
                                    "attributeOptionId": "46",
                                    "locale": "en",
                                    "label": "Grey"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/93",
                                                "_id": 93,
                                                "attributeOptionId": "46",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/46",
                                                "_id": 46,
                                                "attributeOptionId": "46",
                                                "locale": "en",
                                                "label": "Grey"
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
                            "cursor": "OQ=="
                        }
                    ],
                    "pageInfo": {
                        "endCursor": "OQ==",
                        "startCursor": "MA==",
                        "hasNextPage": true,
                        "hasPreviousPage": false
                    },
                    "totalCount": 12
                },
                "translations": {
                    "edges": [
                        {
                            "node": {
                                "id": "/api/attribute_translations/52",
                                "_id": 52,
                                "attributeId": "23",
                                "locale": "ar",
                                "name": ""
                            },
                            "cursor": "MA=="
                        },
                        {
                            "node": {
                                "id": "/api/attribute_translations/23",
                                "_id": 23,
                                "attributeId": "23",
                                "locale": "en",
                                "name": "Color"
                            },
                            "cursor": "MQ=="
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
            }
        }
    commonErrors:
      - error: INVALID_FIELD
        cause: Requested field does not exist
        solution: Check available attribute fields in schema
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
