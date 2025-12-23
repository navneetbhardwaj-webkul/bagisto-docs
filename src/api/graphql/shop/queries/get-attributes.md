---
outline: false
examples:
  - id: get-attributes-basic
    title: Get Attributes - Basic
    description: Retrieve a list of attributes with pagination.
    query: |
      query getAttributes($first: Int) {
        attributes(first: $first) {
          edges {
            node {
              id
              code
              name
              type
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
        "first": 10
      }
    response: |
      {
        "data": {
          "attributes": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attributes/1",
                  "code": "brand",
                  "name": "Brand",
                  "type": "text"
                }
              },
              {
                "node": {
                  "id": "/api/shop/attributes/23",
                  "code": "color",
                  "name": "Color",
                  "type": "select"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ=="
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_PAGINATION
        cause: Invalid pagination parameters
        solution: Ensure first/last are positive integers
      - error: INVALID_CURSOR
        cause: Pagination cursor is invalid
        solution: Use cursor values from previous response

  - id: get-attributes-with-details
    title: Get Attributes with Full Details
    description: Retrieve attributes with complete field information including flags.
    query: |
      query getAttributesDetail($first: Int) {
        attributes(first: $first) {
          edges {
            node {
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
              createdAt
              updatedAt
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
        "first": 10
      }
    response: |
      {
        "data": {
          "attributes": {
            "edges": [
              {
                "node": {
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
                  "createdAt": "2024-01-15T10:30:00Z",
                  "updatedAt": "2024-01-20T14:22:00Z"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ=="
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_FIELD
        cause: Requested field does not exist
        solution: Check available attribute fields in schema

  - id: get-filterable-attributes
    title: Get Filterable Attributes
    description: Retrieve only attributes that can be used for filtering.
    query: |
      query getFilterableAttributes($first: Int) {
        attributes(first: $first) {
          edges {
            node {
              id
              code
              name
              type
              isFilterable
              options(first: 50) {
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
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "first": 20
      }
    response: |
      {
        "data": {
          "attributes": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attributes/23",
                  "code": "color",
                  "name": "Color",
                  "type": "select",
                  "isFilterable": true,
                  "options": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/1",
                          "adminName": "Red",
                          "translation": {
                            "label": "Red"
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/2",
                          "adminName": "Green",
                          "translation": {
                            "label": "Green"
                          }
                        }
                      }
                    ]
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
    commonErrors:
      - error: NO_FILTERABLE_ATTRIBUTES
        cause: No filterable attributes found
        solution: Configure attributes to be filterable in admin
---

# Get Attributes

## About

The `getAttributes` query retrieves attribute information from your store with support for pagination and detailed field access. This query is essential for:

- Building faceted navigation and filters
- Displaying product attribute information
- Creating attribute management interfaces
- Understanding available product properties
- Building product configuration systems

The query supports cursor-based pagination and allows you to fetch individual attributes or collections with full relationship access to attribute options.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of attributes to retrieve from the start (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Cursor to start after for forward pagination. |
| `last` | `Int` | ❌ No | Number of attributes to retrieve from the end (backward pagination). Max: 100. |
| `before` | `String` | ❌ No | Cursor to start before for backward pagination. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[AttributeEdge!]!` | Array of attribute edges containing attributes and cursors. |
| `edges.node` | `Attribute!` | The actual attribute object with id, code, name, type, and other fields. |
| `edges.cursor` | `String!` | Pagination cursor for this attribute. Use with `after` or `before` arguments. |
| `pageInfo` | `PageInfo!` | Pagination metadata object. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more attributes exist after the current page. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether attributes exist before the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first attribute on the current page. |
| `pageInfo.endCursor` | `String` | Cursor of the last attribute on the current page. |

## Attribute Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique identifier in format `/api/shop/attributes/{id}` |
| `code` | `String!` | Unique code identifier (e.g., "color", "size", "brand") |
| `name` | `String!` | Display name of the attribute |
| `type` | `String!` | Attribute type (text, select, date, checkbox, etc.) |
| `sortOrder` | `Int!` | Display order for the attribute |
| `isFilterable` | `Boolean!` | Can be used for product filtering |
| `isSearchable` | `Boolean!` | Can be used in search |
| `isConfigurable` | `Boolean!` | Can be configured for products |
| `isVisibleOnFront` | `Boolean!` | Visible to frontend customers |
| `isRequired` | `Boolean!` | Required for product assignment |
| `createdAt` | `String!` | Creation timestamp (ISO 8601) |
| `updatedAt` | `String!` | Last update timestamp (ISO 8601) |
| `options` | `Connection` | Attribute options with pagination support |

## Common Use Cases

### Display All Attributes for Filtering

```graphql
query GetAllAttributes($first: Int!) {
  attributes(first: $first) {
    edges {
      node {
        id
        code
        name
        type
        isFilterable
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Get Attribute with All Options

```graphql
query GetAttributeOptions($id: String!, $optionsLimit: Int!) {
  attribute(id: $id) {
    id
    code
    name
    type
    options(first: $optionsLimit) {
      edges {
        node {
          id
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
}
```

### Build Faceted Navigation

```graphql
query GetFacetedAttributes($first: Int!) {
  attributes(first: $first) {
    edges {
      node {
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
  }
}
```

### Get Searchable Attributes

```graphql
query GetSearchableAttributes($first: Int!) {
  attributes(first: $first) {
    edges {
      node {
        id
        code
        name
        type
        isSearchable
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

## Error Handling

### Missing Attribute ID for Single Query

```json
{
  "errors": [
    {
      "message": "Field \"attribute\" argument \"id\" of type \"String!\" is required but not provided."
    }
  ]
}
```

### Non-existent Attribute

```json
{
  "data": {
    "attribute": null
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

1. **Request Only Needed Fields** - Reduce payload by selecting specific fields
2. **Use Reasonable Pagination Size** - Request 10-50 attributes per page
3. **Cache Results** - Attributes change infrequently, implement client-side caching
4. **Include Options When Needed** - Only fetch nested options if required
5. **Use Variables** - Use GraphQL variables for dynamic queries

## Related Resources

- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Attribute Options API](/api/graphql/shop/queries/get-attribute-options) - Query attribute options
- [Attributes API](/api/graphql/shop/attribute-options) - Detailed attributes documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
