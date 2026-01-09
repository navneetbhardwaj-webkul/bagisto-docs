# AttributeOption GraphQL API Guide

## Overview

The AttributeOption GraphQL API provides two primary ways to query attribute options:

1. **Nested Query** - Access options as a subresource of an Attribute
2. **Direct Query** - Query options directly with a required attribute ID parameter

Both methods support **cursor-based pagination** for efficient data retrieval.

---

## Table of Contents

- [Authentication](#authentication)
- [Nested Query (via Attribute)](#nested-query-via-attribute)
- [Direct Query (attributeOptions)](#direct-query-attributeoptions)
- [Fields & Responses](#fields--responses)
- [Pagination](#pagination)
- [Error Handling](#error-handling)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

---

## Authentication

All AttributeOption GraphQL queries require **authentication**.

### Bearer Token

Include your authentication token in the `Authorization` header:

```bash
curl -X POST "http://your-api.com/api/graphql" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"..."}'
```

### GraphQL Query

```graphql
query {
  attribute(id: "/api/admin/attributes/23") {
    id
    code
  }
}
```

---

## Nested Query (via Attribute)

Access attribute options as a subresource of the Attribute resource.

### Query Structure

```graphql
query {
  attribute(id: "ATTRIBUTE_ID") {
    id
    code
    options(first: LIMIT, after: "CURSOR", last: LIMIT, before: "CURSOR") {
      edges {
        node {
          # fields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | ✅ Yes | Attribute ID in format `/api/admin/attributes/{id}` |
| `first` | Int | ❌ No | Number of items to retrieve (forward pagination) |
| `last` | Int | ❌ No | Number of items to retrieve (backward pagination) |
| `after` | String | ❌ No | Cursor for forward pagination |
| `before` | String | ❌ No | Cursor for backward pagination |

### Basic Example

```graphql
query {
  attribute(id: "/api/admin/attributes/23") {
    id
    code
    options(first: 5) {
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

**Response:**

```json
{
  "data": {
    "attribute": {
      "id": "/api/admin/attributes/23",
      "code": "color",
      "options": {
        "edges": [
          {
            "node": {
              "id": "/api/admin/attribute-options/1",
              "adminName": "Red",
              "sortOrder": 0,
              "swatchValue": "#e10e0e"
            },
            "cursor": "MA=="
          },
          {
            "node": {
              "id": "/api/admin/attribute-options/2",
              "adminName": "Green",
              "sortOrder": 1,
              "swatchValue": "#155616"
            },
            "cursor": "MQ=="
          }
        ],
        "pageInfo": {
          "hasNextPage": true,
          "endCursor": "MQ=="
        }
      }
    }
  }
}
```

### With Translations

Query translations for each option:

```graphql
query {
  attribute(id: "/api/admin/attributes/23") {
    code
    options(first: 3) {
      edges {
        node {
          id
          adminName
          translation {
            id
            locale
            label
          }
          translations(first: 3) {
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
}
```

**Response:**

```json
{
  "data": {
    "attribute": {
      "code": "color",
      "options": {
        "edges": [
          {
            "node": {
              "id": "/api/admin/attribute-options/1",
              "adminName": "Red",
              "translation": {
                "id": "/api/attribute_option_translations/1",
                "locale": "en",
                "label": "Red"
              },
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
}
```

---

## Direct Query (attributeOptions)

Query attribute options directly using the `attributeId` parameter.

### Query Structure

```graphql
query {
  attributeOptions(
    attributeId: ATTRIBUTE_ID
    first: LIMIT
    after: "CURSOR"
    last: LIMIT
    before: "CURSOR"
  ) {
    edges {
      node {
        # fields
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `attributeId` | Int | ✅ **Yes** | Numeric attribute ID (e.g., `23`) |
| `first` | Int | ❌ No | Number of items to retrieve (forward pagination) |
| `last` | Int | ❌ No | Number of items to retrieve (backward pagination) |
| `after` | String | ❌ No | Cursor for forward pagination |
| `before` | String | ❌ No | Cursor for backward pagination |

### Basic Example

```graphql
query {
  attributeOptions(attributeId: 23, first: 10) {
    edges {
      node {
        id
        _id
        adminName
        sortOrder
        swatchValue
        swatchValueUrl
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

**Response:**

```json
{
  "data": {
    "attributeOptions": {
      "edges": [
        {
          "node": {
            "id": "/api/admin/attribute-options/1",
            "_id": 1,
            "adminName": "Red",
            "sortOrder": 0,
            "swatchValue": "#e10e0e",
            "swatchValueUrl": null
          },
          "cursor": "MA=="
        },
        {
          "node": {
            "id": "/api/admin/attribute-options/2",
            "_id": 2,
            "adminName": "Green",
            "sortOrder": 1,
            "swatchValue": "#155616",
            "swatchValueUrl": null
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
```

### With All Fields

```graphql
query {
  attributeOptions(attributeId: 23, first: 5) {
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
          locale
          label
        }
        translations(first: 2) {
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
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

## Fields & Responses

### AttributeOption Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier in format `/api/admin/attribute-options/{id}` |
| `_id` | Int | Numeric ID (alias for `id`) |
| `adminName` | String | Admin-facing name (e.g., "Red", "Small") |
| `sortOrder` | Int | Display sort order (0, 1, 2, ...) |
| `swatchValue` | String | Swatch color value (hex code) or text representation |
| `swatchValueUrl` | String | URL to swatch image file (nullable) |
| `translation` | Object | Single translation for default/current locale |
| `translations` | Connection | Collection of all translations with pagination |

### Translation Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Translation ID in format `/api/attribute_option_translations/{id}` |
| `_id` | Int | Numeric translation ID |
| `locale` | String | Language locale code (e.g., "en", "ar", "fr") |
| `label` | String | Translated label for the option |

### PageInfo Fields

| Field | Type | Description |
|-------|------|-------------|
| `hasNextPage` | Boolean | Whether more items exist forward |
| `hasPreviousPage` | Boolean | Whether more items exist backward |
| `startCursor` | String | Cursor for the first item |
| `endCursor` | String | Cursor for the last item |

---

## Pagination

### Forward Pagination (Limit & Offset)

Use `first` to limit results and `after` to continue from a cursor:

```graphql
query {
  attributeOptions(attributeId: 23, first: 2) {
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

To get the next page, use the `endCursor` as the `after` parameter:

```graphql
query {
  attributeOptions(attributeId: 23, first: 2, after: "MQ==") {
    edges {
      node {
        id
        adminName
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Backward Pagination

Use `last` to retrieve the last N items and `before` to go backward:

```graphql
query {
  attributeOptions(attributeId: 23, last: 3) {
    edges {
      node {
        id
        adminName
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
  }
}
```

---

## Error Handling

### Missing Required attributeId

**Query:**
```graphql
query {
  attributeOptions(first: 10) {
    edges {
      node {
        id
      }
    }
  }
}
```

**Error Response:**
```json
{
  "errors": [
    {
      "message": "Field \"attributeOptions\" argument \"attributeId\" of type \"Int!\" is required but not provided.",
      "locations": [
        {
          "line": 1,
          "column": 9
        }
      ]
    }
  ]
}
```

### Invalid Attribute ID Type

**Query:**
```graphql
query {
  attributeOptions(attributeId: "not-a-number", first: 10) {
    edges {
      node {
        id
      }
    }
  }
}
```

**Error Response:**
```json
{
  "errors": [
    {
      "message": "Variable \"$attributeId\" got invalid value \"not-a-number\"; Int cannot represent non-integer value: \"not-a-number\""
    }
  ]
}
```

### Attribute Not Found

If the attribute ID doesn't exist, an empty result is returned:

```json
{
  "data": {
    "attributeOptions": {
      "edges": [],
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": null,
        "endCursor": null
      }
    }
  }
}
```

---

## Complete Examples

### Example 1: Fetch Color Attribute with All Options

```graphql
query GetColorAttribute {
  attribute(id: "/api/admin/attributes/23") {
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
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
```

### Example 2: Paginate Through All Options

```graphql
query GetOptionsPage($attributeId: Int!, $cursor: String) {
  attributeOptions(attributeId: $attributeId, first: 10, after: $cursor) {
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
    }
  }
}
```

**Variables:**
```json
{
  "attributeId": 23,
  "cursor": null
}
```

### Example 3: Fetch With Translated Labels

```graphql
query GetTranslatedOptions {
  attributeOptions(attributeId: 23, first: 5) {
    edges {
      node {
        id
        adminName
        translations(first: 5) {
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

### Example 4: Multi-language Support

```graphql
query GetOptionsInMultipleLanguages {
  attribute(id: "/api/admin/attributes/23") {
    code
    options(first: 10) {
      edges {
        node {
          adminName
          translation {
            locale
            label
          }
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

### Example 5: Using Variables in Queries

```graphql
query GetAttributeOptions($attrId: Int!, $limit: Int!) {
  attributeOptions(attributeId: $attrId, first: $limit) {
    edges {
      node {
        id
        _id
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
      hasPreviousPage
      startCursor
    }
  }
}
```

**Variables:**
```json
{
  "attrId": 23,
  "limit": 5
}
```

---

## Best Practices

### 1. Use Specific Fields

Only request fields you need:

```graphql
# ✅ Good - Only fetch needed fields
query {
  attributeOptions(attributeId: 23, first: 10) {
    edges {
      node {
        id
        adminName
      }
    }
  }
}

# ❌ Avoid - Fetching everything
query {
  attributeOptions(attributeId: 23, first: 10) {
    edges {
      node {
        id
        adminName
        sortOrder
        swatchValue
        swatchValueUrl
        translation { id locale label }
        translations { edges { node { id locale label } } }
      }
    }
  }
}
```

### 2. Set Reasonable Pagination Limits

```graphql
# ✅ Good - Reasonable limit
query {
  attributeOptions(attributeId: 23, first: 20) {
    edges {
      node { id adminName }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

# ❌ Avoid - Too large limit
query {
  attributeOptions(attributeId: 23, first: 10000) {
    ...
  }
}
```

### 3. Use Query Variables

```graphql
# ✅ Good - Using variables
query GetOptions($id: Int!) {
  attributeOptions(attributeId: $id, first: 10) {
    ...
  }
}

# ❌ Avoid - Hardcoding values
query {
  attributeOptions(attributeId: 23, first: 10) {
    ...
  }
}
```

### 4. Handle Pagination Properly

```graphql
# ✅ Good - Always check hasNextPage
query {
  attributeOptions(attributeId: 23, first: 10) {
    edges {
      node { id adminName }
    }
    pageInfo {
      hasNextPage      # Use this to determine if more pages exist
      endCursor        # Use this for the next request
    }
  }
}
```

### 5. Cache Cursors

Store cursors from responses for pagination rather than computing them:

```javascript
// ✅ Good
const response = await fetch('/api/graphql', {
  method: 'POST',
  body: JSON.stringify({
    query: `query { attributeOptions(attributeId: 23, first: 10) { ... } }`
  })
});

const nextCursor = response.data.attributeOptions.pageInfo.endCursor;

// Use nextCursor in next request
const nextPage = await fetch('/api/graphql', {
  method: 'POST',
  body: JSON.stringify({
    query: `query { attributeOptions(attributeId: 23, first: 10, after: "${nextCursor}") { ... } }`
  })
});
```

---

## FAQ

**Q: What's the difference between nested and direct queries?**

A: 
- **Nested Query**: Get options as part of an attribute. Useful when you already have the attribute ID.
- **Direct Query**: Get options directly with just the attribute ID. More efficient when you only need options.

**Q: Can I use both `first` and `last` together?**

A: No. Use either `first` (forward pagination) or `last` (backward pagination), not both.

**Q: How do I get all options for an attribute?**

A: Use pagination with `first` and the `hasNextPage` field:
```graphql
query {
  attributeOptions(attributeId: 23, first: 100) {
    edges { node { id adminName } }
    pageInfo { hasNextPage endCursor }
  }
}
```

Then if `hasNextPage` is true, fetch the next page using `after: "endCursor"`.

**Q: Why does `totalCount` show 0?**

A: This is a known limitation with API Platform's relationship pagination. Use `hasNextPage` instead to determine if more results exist.

---

## Related Topics

- [Pagination Guide](/api/graphql/pagination) - Comprehensive cursor pagination documentation
- [Authentication](/api/graphql/authentication) - Secure your API requests
- [Best Practices](/api/graphql/best-practices) - API performance and security guidelines
- [GraphQL Overview](/api/graphql) - GraphQL API introduction

---

**Next Steps:**
- 📚 [Shop API Reference](/api/graphql/shop-api) - Customer-facing attribute operations
- 🔑 [Admin API Reference](/api/graphql/admin-api) - Administrative attribute management
