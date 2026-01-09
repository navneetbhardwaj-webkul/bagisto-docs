---
outline: false
examples:
  - id: get-locales-basic
    title: Get Locales - Basic
    description: Retrieve all store locales with basic information.
    query: |
      query getLocales {
        locales {
          edges {
            node {
              id
              _id
              code
              name
              direction
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "locales": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/locales/1",
                  "_id": 1,
                  "code": "en",
                  "name": "English",
                  "direction": "ltr"
                }
              },
              {
                "node": {
                  "id": "/api/shop/locales/2",
                  "_id": 2,
                  "code": "ar",
                  "name": "Arabic",
                  "direction": "rtl"
                }
              },
              {
                "node": {
                  "id": "/api/shop/locales/3",
                  "_id": 3,
                  "code": "fr",
                  "name": "French",
                  "direction": "ltr"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "Mw=="
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Invalid or missing authentication token
        solution: Provide valid authentication credentials
      - error: NO_LOCALES
        cause: No locales configured in the system
        solution: Create locales in the admin panel

  - id: get-locales-complete
    title: Get Locales - Complete Details
    description: Retrieve all locales with complete information including logo paths and timestamps.
    query: |
      query getLocales {
        locales {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              direction
              logoPath
              createdAt
              updatedAt
              logoUrl
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
    variables: |
      {}
    response: |
      {
        "data": {
          "locales": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/shop/locales/1",
                  "_id": 1,
                  "code": "en",
                  "name": "English",
                  "direction": "ltr",
                  "logoPath": "/locales/en-logo.png",
                  "createdAt": "2024-01-15T10:30:00Z",
                  "updatedAt": "2024-01-20T14:22:00Z",
                  "logoUrl": "https://example.com/storage/locales/en-logo.png"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/shop/locales/2",
                  "_id": 2,
                  "code": "ar",
                  "name": "Arabic",
                  "direction": "rtl",
                  "logoPath": "/locales/ar-logo.png",
                  "createdAt": "2024-01-15T10:35:00Z",
                  "updatedAt": "2024-01-20T14:25:00Z",
                  "logoUrl": "https://example.com/storage/locales/ar-logo.png"
                }
              },
              {
                "cursor": "Mw==",
                "node": {
                  "id": "/api/shop/locales/3",
                  "_id": 3,
                  "code": "fr",
                  "name": "French",
                  "direction": "ltr",
                  "logoPath": "/locales/fr-logo.png",
                  "createdAt": "2024-01-15T10:40:00Z",
                  "updatedAt": "2024-01-20T14:30:00Z",
                  "logoUrl": "https://example.com/storage/locales/fr-logo.png"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "Mw==",
              "startCursor": "MQ==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 3
          }
        }
      }
    commonErrors:
      - error: INVALID_PAGINATION
        cause: Invalid pagination parameters provided
        solution: Ensure first/last are positive integers and cursors are valid
      - error: INVALID_CURSOR
        cause: Pagination cursor is invalid or expired
        solution: Use cursor values from the previous response

  - id: get-locales-with-pagination
    title: Get Locales with Pagination
    description: Retrieve locales with cursor-based pagination for handling large datasets.
    query: |
      query getLocalesWithPagination($first: Int, $after: String) {
        locales(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              direction
              logoUrl
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
    variables: |
      {
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "locales": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/shop/locales/1",
                  "_id": 1,
                  "code": "en",
                  "name": "English",
                  "direction": "ltr",
                  "logoUrl": "https://example.com/storage/locales/en-logo.png"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/shop/locales/2",
                  "_id": 2,
                  "code": "ar",
                  "name": "Arabic",
                  "direction": "rtl",
                  "logoUrl": "https://example.com/storage/locales/ar-logo.png"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "Mg==",
              "startCursor": "MQ==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: INVALID_FIRST_VALUE
        cause: The first argument exceeds maximum allowed value
        solution: Use first value between 1 and 100
      - error: INVALID_CURSOR
        cause: The provided cursor is invalid
        solution: Use a valid cursor from a previous response
---

# Get Locales

## About

The `getLocales` query retrieves locale information from your store with support for pagination and detailed field access. This query is essential for:

- Displaying available language and locale options
- Building multi-language selector interfaces
- Determining text direction (LTR/RTL) for UI layout
- Retrieving locale-specific logos and branding
- Managing store language configurations
- Building locale management interfaces

The query supports cursor-based pagination and allows you to fetch all locales with full relationship access.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of locales to retrieve from the start (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Cursor to start after for forward pagination. |
| `last` | `Int` | ❌ No | Number of locales to retrieve from the end (backward pagination). Max: 100. |
| `before` | `String` | ❌ No | Cursor to start before for backward pagination. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[LocaleEdge!]!` | Array of locale edges containing locales and cursors. |
| `edges.node` | `Locale!` | The actual locale object with id, code, name, direction, and other fields. |
| `edges.cursor` | `String!` | Pagination cursor for this locale. Use with `after` or `before` arguments. |
| `pageInfo` | `PageInfo!` | Pagination metadata object. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more locales exist after the current page. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether locales exist before the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first locale on the current page. |
| `pageInfo.endCursor` | `String` | Cursor of the last locale on the current page. |
| `totalCount` | `Int!` | Total number of locales available. |

## Locale Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique identifier in format `/api/shop/locales/{id}` |
| `_id` | `Int!` | Numeric identifier for the locale |
| `code` | `String!` | Unique locale code (e.g., "en", "ar", "fr", "de") |
| `name` | `String!` | Display name of the locale (e.g., "English", "Arabic") |
| `direction` | `String!` | Text direction: "ltr" (left-to-right) or "rtl" (right-to-left) |
| `logoPath` | `String` | File path to the locale logo |
| `logoUrl` | `String` | Full URL to the locale logo image |
| `createdAt` | `String!` | Creation timestamp (ISO 8601 format) |
| `updatedAt` | `String!` | Last update timestamp (ISO 8601 format) |

## Common Use Cases

### Display All Available Locales

```graphql
query GetAllLocales {
  locales {
    edges {
      node {
        id
        code
        name
        direction
      }
    }
  }
}
```

### Build Language Selector with Logos

```graphql
query GetLocalesForSelector {
  locales {
    edges {
      node {
        code
        name
        logoUrl
        direction
      }
    }
  }
}
```

### Get Locale with Complete Information

```graphql
query GetLocalesWithDetails {
  locales {
    edges {
      node {
        id
        _id
        code
        name
        direction
        logoPath
        logoUrl
        createdAt
        updatedAt
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
```

### Get Locale Count and Pagination

```graphql
query GetLocalesWithPagination($first: Int!) {
  locales(first: $first) {
    edges {
      cursor
      node {
        id
        code
        name
        direction
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
```

### Build Right-to-Left (RTL) Language List

```graphql
query GetRTLLocales {
  locales {
    edges {
      node {
        code
        name
        direction
        logoUrl
      }
    }
  }
}
```

## Error Handling

### Missing Locales Configuration

```json
{
  "data": {
    "locales": {
      "edges": [],
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": null,
        "endCursor": null
      },
      "totalCount": 0
    }
  }
}
```

### Invalid Pagination Parameters

```json
{
  "errors": [
    {
      "message": "Argument \"first\" must be between 1 and 100"
    }
  ]
}
```

### Invalid Cursor

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

1. **Cache Locales** - Locales change infrequently; implement client-side caching
2. **Use Direction Field** - Always check the `direction` field for proper UI layout
3. **Request Only Needed Fields** - Reduce payload by selecting specific fields
4. **Display Logo URLs** - Use `logoUrl` for locale-specific branding in selectors
5. **Handle RTL/LTR** - Use the direction field to apply appropriate CSS classes
6. **Paginate When Needed** - For systems with many locales, use pagination
7. **Use Variables** - Use GraphQL variables for dynamic locale queries

## Related Resources

- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
- [Authentication Guide](/api/graphql/authentication) - Authentication and authorization
- [Channels API](/api/graphql/shop/queries/get-channels) - Store channel information
