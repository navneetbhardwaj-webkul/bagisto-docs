# Cursor Pagination Guide

Bagisto GraphQL API uses cursor-based pagination for efficiently handling large datasets. This guide explains how to implement pagination in your applications.

## Why Cursor Pagination?

Cursor-based pagination offers several advantages over offset-based pagination:

- **Consistency** - Eliminates issues with data changing between requests
- **Performance** - Efficient for large datasets
- **Infinite Scrolling** - Perfect for mobile apps and dynamic feeds
- **Predictability** - Cursors remain valid even if data is added/removed

## Pagination Parameters

### `first`
Retrieves the first N items from the collection.

```graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

### `after`
Returns items after a specific cursor. Used for forward pagination (next page).

```graphql
query {
  products(first: 10, after: "cursor_value") {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

### `last`
Retrieves the last N items from the collection.

```graphql
query {
  products(last: 10) {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

### `before`
Returns items before a specific cursor. Used for backward pagination (previous page).

```graphql
query {
  products(last: 10, before: "cursor_value") {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

### `totalItems`
Returns the total count of items in the collection.

```graphql
query {
  products(first: 10) {
    totalItems
    edges {
      node {
        id
        name
      }
    }
  }
}
```

## Response Structure

Paginated responses have a standard structure:

```json
{
  "data": {
    "products": {
      "edges": [
        {
          "node": {
            "id": "1",
            "name": "Product Name"
          },
          "cursor": "Y3Vyc29yOjE="
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "Y3Vyc29yOjE=",
        "endCursor": "Y3Vyc29yOjEw"
      },
      "totalItems": 150
    }
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `edges` | Array | Collection of items with their cursors |
| `node` | Object | The actual item data |
| `cursor` | String | Encoded cursor for this item |
| `pageInfo` | Object | Pagination metadata |
| `hasNextPage` | Boolean | Whether more items exist after current page |
| `hasPreviousPage` | Boolean | Whether items exist before current page |
| `startCursor` | String | Cursor of first item in current page |
| `endCursor` | String | Cursor of last item in current page |
| `totalItems` | Integer | Total number of items in collection |

## Common Pagination Patterns

### Forward Pagination (Next Page)

Load initial page:
```graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        name
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

Load next page using the `endCursor`:
```graphql
query {
  products(first: 10, after: "Y3Vyc29yOjEw") {
    edges {
      node {
        id
        name
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

### Backward Pagination (Previous Page)

Load previous page using `before` and `last`:
```graphql
query {
  products(last: 10, before: "Y3Vyc29yOjEw") {
    edges {
      node {
        id
        name
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

### Infinite Scrolling

Implement infinite scrolling for dynamic feeds:

```javascript
let hasMore = true;
let endCursor = null;

async function loadMore() {
  const query = `
    query {
      products(first: 20, ${endCursor ? `after: "${endCursor}"` : ''}) {
        edges {
          node {
            id
            name
            price
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const { data } = await response.json();
  const { edges, pageInfo } = data.products;

  // Add items to DOM
  edges.forEach(({ node }) => {
    appendProductToUI(node);
  });

  // Update pagination state
  hasMore = pageInfo.hasNextPage;
  endCursor = pageInfo.endCursor;
}

// Call loadMore() when user scrolls to bottom
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMore) {
    loadMore();
  }
});
```

### Search with Pagination

Combine search filters with pagination:

```graphql
query {
  products(
    first: 20
    filter: {
      search: "laptop"
      minPrice: 500
      maxPrice: 2000
    }
  ) {
    edges {
      node {
        id
        name
        price
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalItems
  }
}
```

### Get Total Count

Get pagination metadata including total items:

```graphql
query {
  products(first: 1) {
    totalItems
    pageInfo {
      hasNextPage
    }
  }
}
```

## Pagination with Multiple Collections

When working with nested collections, apply pagination at each level:

```graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        name
        reviews(first: 5) {
          edges {
            node {
              id
              title
              rating
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
    }
  }
}
```

## Best Practices

### 1. **Choose Appropriate Page Size**
```graphql
# Good - reasonable page size
query {
  products(first: 20) { ... }
}

# Avoid - too small, excessive requests
query {
  products(first: 1) { ... }
}

# Avoid - too large, performance issues
query {
  products(first: 1000) { ... }
}
```

### 2. **Always Check hasNextPage**
```javascript
if (pageInfo.hasNextPage) {
  // Load more button or trigger
}
```

### 3. **Store Cursors for Navigation**
```javascript
// Store cursor for next/previous navigation
const nextCursor = pageInfo.endCursor;
const prevCursor = pageInfo.startCursor;
```

### 4. **Handle Empty Results**
```javascript
if (edges.length === 0) {
  displayEmptyState();
} else {
  renderItems(edges);
}
```

### 5. **Implement Loading States**
```javascript
let isLoading = false;

async function loadMore() {
  if (isLoading) return;
  isLoading = true;
  
  try {
    // Fetch data
  } finally {
    isLoading = false;
  }
}
```

## Performance Considerations

### Selective Field Queries
Request only needed fields:

```graphql
# Good - specific fields
query {
  products(first: 20) {
    edges {
      node {
        id
        name
        price
      }
    }
  }
}

# Avoid - unnecessary fields
query {
  products(first: 20) {
    edges {
      node {
        __typename
        id
        name
        price
        description
        longDescription
        images { ... }
        relatedProducts { ... }
        variants { ... }
      }
    }
  }
}
```

### Caching with Pagination
Implement client-side caching:

```javascript
const cache = new Map();

async function getProducts(first, after) {
  const key = `products:${first}:${after || 'start'}`;
  
  if (cache.has(key)) {
    return cache.get(key);
  }

  const data = await fetchProducts(first, after);
  cache.set(key, data);
  return data;
}
```

## Error Handling

Handle pagination errors gracefully:

```javascript
async function getPagedProducts(cursor) {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify({ query: paginationQuery(cursor) })
    });

    const { data, errors } = await response.json();

    if (errors) {
      console.error('GraphQL Error:', errors);
      // Handle error - reset pagination or show message
      return null;
    }

    return data.products;

  } catch (error) {
    console.error('Network Error:', error);
    // Handle network error
    return null;
  }
}
```

## Collection-Specific Pagination

Different collections support pagination. Here are common examples:

### Products
```graphql
query {
  products(first: 20) { ... }
}
```

### Categories
```graphql
query {
  categories(first: 20) { ... }
}
```

### Orders
```graphql
query {
  orders(first: 20) { ... }
}
```

### Reviews
```graphql
query {
  productReviews(first: 20) { ... }
}
```

### Customers (Admin API)
```graphql
query {
  customers(first: 20) { ... }
}
```

## Migration from Offset Pagination

If migrating from offset-based pagination:

### Before (Offset)
```graphql
query {
  products(limit: 20, offset: 0) {
    items { ... }
    total
  }
}
```

### After (Cursor)
```graphql
query {
  products(first: 20) {
    edges {
      node { ... }
      cursor
    }
    totalItems
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

## Troubleshooting

### Cursor Expired
**Issue:** `"Invalid cursor"` error

**Solution:** Re-fetch from the beginning with fresh cursors
```javascript
// Reset to first page
endCursor = null;
await loadMore();
```

### Inconsistent Results
**Issue:** Items missing or duplicated between pages

**Solution:** Use consistent sorting with pagination:
```graphql
query {
  products(first: 20, sort: { field: "createdAt", direction: "DESC" }) {
    ...
  }
}
```

### Performance Issues
**Issue:** Pagination queries are slow

**Solution:** 
- Reduce page size
- Use specific field queries
- Add proper indexes on sorted fields
- Implement caching

---

**Related Topics:**
- [Best Practices](/api/graphql/best-practices) - General API best practices
- [Performance](/getting-started/performance) - Optimize API performance
- [Authentication](/api/graphql/authentication) - Secure your requests
