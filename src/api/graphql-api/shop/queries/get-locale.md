---
outline: false
examples:
  - id: get-locale-basic
    title: Get Single Locale - Basic
    description: Retrieve a single locale by ID with basic information.
    query: |
      query getSingleLocale($id: ID!) {
        locale(id: $id) {
          id
          _id
          code
          name
          direction
        }
      }
    variables: |
      {
        "id": "/api/shop/locales/1"
      }
    response: |
      {
        "data": {
          "locale": {
            "id": "/api/shop/locales/1",
            "_id": 1,
            "code": "en",
            "name": "English",
            "direction": "ltr"
          }
        }
      }
    commonErrors:
      - error: Variable "$id" of required type "ID!" was not provided.
        cause: Locale ID parameter is required
        solution: Provide a valid locale ID in format /api/locales/{id} or numeric ID
      - error: Invalid ID format. Expected IRI format like "/api/shop/locales/1" or numeric ID
        cause: Locale ID is not in valid format
        solution: Verify the locale ID is in correct format, use "/api/locales/1" or "1"
      - error: Locale not found
        cause: Locale ID does not exist in the system
        solution: Verify the locale ID is correct and exists

  - id: get-locale-complete
    title: Get Single Locale - Complete Details
    description: Retrieve a single locale with all fields including logos, paths, and timestamps.
    query: |
      query getSingleLocale($id: ID!) {
        locale(id: $id) {
          id
          _id
          code
          name
          direction
          logoPath
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/shop/locales/1"
      }
    response: |
      {
        "data": {
          "locale": {
            "id": "/api/shop/locales/1",
            "_id": 1,
            "code": "en",
            "name": "English",
            "direction": "ltr",
            "logoPath": "locales/en.png",
            "createdAt": null,
            "updatedAt": null
          }
        }
      }
    commonErrors:
      - error: Locale not found
        cause: The provided locale ID does not exist
        solution: Use a valid locale ID from the get-locales query
      - error: Invalid ID format. Expected IRI format like "/api/shop/locales/1" or numeric ID
        cause: Invalid ID format provided
        solution: Provide valid locale ID in format /api/locales/1 or numeric ID like "1"

  - id: get-locale-by-code
    title: Get Single Locale - Using Numeric ID
    description: Retrieve a single locale by its numeric ID instead of IRI format.
    query: |
      query getSingleLocale($id: ID!) {
        locale(id: $id) {
          id
          _id
          code
          name
          direction
          logoPath
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "locale": {
            "id": "/api/shop/locales/1",
            "_id": 1,
            "code": "en",
            "name": "English",
            "direction": "ltr",
            "logoPath": "locales/en.png",
            "createdAt": null,
            "updatedAt": null
          }
        }
      }
    commonErrors:
      - error: Invalid ID format. Expected IRI format like "/api/shop/locales/1" or numeric ID
        cause: ID format is not recognized
        solution: Use either numeric ID like "1" or IRI format like /api/locales/1

  - id: get-locale-rtl
    title: Get RTL Locale Details
    description: Retrieve a right-to-left locale with full details for UI configuration.
    query: |
      query getSingleLocale($id: ID!) {
        locale(id: $id) {
          id
          _id
          code
          name
          direction
          logoPath
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/shop/locales/2"
      }
    response: |
      {
        "data": {
          "locale": {
            "id": "/api/shop/locales/2",
            "_id": 2,
            "code": "ar",
            "name": "Arabic",
            "direction": "rtl",
            "logoPath": "locales/ar.png",
            "createdAt": null,
            "updatedAt": null
          }
        }
      }
    commonErrors:
      - error: Locale not found
        cause: The provided locale ID does not exist
        solution: Use a valid locale ID from the get-locales query
---

# Get Single Locale

## About

The `locale` query retrieves a single locale by ID with support for detailed field access. This query is essential for:

- Fetching specific locale details for UI configuration
- Checking text direction (LTR/RTL) for layout adjustments
- Retrieving locale-specific branding and logos
- Validating locale existence before operations
- Building locale detail pages
- Configuring locale-specific settings

The query allows you to fetch a specific locale with all its properties and relationships.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The unique identifier of the locale. Can be either numeric ID or IRI format (`/api/shop/locales/{id}`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `locale` | `Locale` | The requested locale object, or null if not found. |

## Locale Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique identifier in format `/api/shop/locales/{id}` |
| `_id` | `Int!` | Numeric identifier for the locale |
| `code` | `String!` | Unique locale code (e.g., "en", "ar", "fr", "de") |
| `name` | `String!` | Display name of the locale (e.g., "English", "Arabic") |
| `direction` | `String!` | Text direction: "ltr" (left-to-right) or "rtl" (right-to-left) |
| `logoPath` | `String` | File path to the locale logo (e.g., "locales/en.png") |
| `createdAt` | `String` | Creation timestamp (ISO 8601 format) or null if not available |
| `updatedAt` | `String` | Last update timestamp (ISO 8601 format) or null if not available |

## Common Use Cases

### Get Locale Details by IRI ID

```graphql
query GetLocaleByIRI($id: ID!) {
  locale(id: $id) {
    id
    _id
    code
    name
    direction
    logoPath
  }
}
```

Variables:
```json
{
  "id": "/api/shop/locales/1"
}
```

### Get Locale with Logo and Timestamps

```graphql
query GetLocaleDetails($id: ID!) {
  locale(id: $id) {
    id
    code
    name
    direction
    logoPath
    createdAt
    updatedAt
  }
}
```

### Check If Locale is RTL

```graphql
query GetLocaleDirection($id: ID!) {
  locale(id: $id) {
    code
    name
    direction
  }
}
```

### Validate Locale Existence

```graphql
query ValidateLocale($id: ID!) {
  locale(id: $id) {
    id
    code
  }
}
```

## Error Handling

### Locale Not Found

```json
{
  "data": {
    "locale": null
  }
}
```

### Missing Required ID Parameter

```json
{
  "errors": [
    {
      "message": "Field \"locale\" argument \"id\" of type \"ID!\" is required but not provided."
    }
  ]
}
```

### Invalid ID Format

```json
{
  "errors": [
    {
      "message": "Invalid ID format. Expected IRI format like \"/api/shop/locales/1\" or numeric ID"
    }
  ]
}
```

## Best Practices

1. **Always Provide ID** - The ID parameter is required for this query
2. **Check for Null** - Handle the case when locale is not found (returns null)
3. **Use Direction Field** - Always check the `direction` field for proper UI layout
4. **Cache Results** - Locales change infrequently; implement caching
5. **Validate Before Using** - Verify locale exists before using in operations
6. **Use Variables** - Use GraphQL variables for dynamic locale queries
7. **Request Needed Fields** - Only request fields you'll actually use
8. **Handle RTL Properly** - Apply appropriate CSS classes based on direction

## Related Resources

- [Get Locales](/api/graphql/shop/queries/get-locales) - Retrieve all locales with pagination
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
- [Authentication Guide](/api/graphql/authentication) - Authentication and authorization
