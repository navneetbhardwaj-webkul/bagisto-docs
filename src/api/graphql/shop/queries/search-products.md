---
outline: false
examples:
  - id: search-products-with-filter
    title: Search Products with Search and Filter
    description: Search products by query term with sorting and filtering options.
    query: |
      query getProductsSearchFilter($query: String, $sortKey: String, $reverse: Boolean, $first: Int) {
        products(query: $query, sortKey: $sortKey, reverse: $reverse, first: $first) {
          edges {
            node {
              id
              name
              sku
              price
            }
          }
        }
      }
    variables: |
      {
        "query": "shirt",
        "sortKey": "TITLE",
        "reverse": false,
        "first": 10
      }
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "name": "Cotton Shirt",
                  "sku": "SHIRT-001",
                  "price": 29.99
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: INVALID_QUERY
        cause: Search query is empty or malformed
        solution: Provide valid search term
      - error: NO_RESULTS
        cause: No products match search criteria
        solution: Try different keywords
---

# Search Products

## About

The `searchProducts` query enables advanced product search with support for text queries, filtering, and sorting. Use this query to:

- Implement full-text product search functionality
- Build auto-complete and suggestion interfaces
- Filter products by multiple criteria (price range, categories, attributes)
- Sort search results by relevance, price, date, or custom fields
- Implement faceted search interfaces
- Create advanced query-based product discovery

The search supports Bagisto's advanced search syntax for building complex, multi-criteria queries. It efficiently ranks results by relevance while maintaining performance across large product catalogs.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `query` | `String` | Search term or advanced query string. Searches product name, description, SKU, and other fields. |
| `first` | `Int` | Maximum number of results per page (default: 20, max: 250). |
| `after` | `String` | Cursor for pagination. Returns results after this cursor. |
| `last` | `Int` | Maximum results for backward pagination (max: 250). |
| `before` | `String` | Cursor for backward pagination. |
| `sortKey` | `ProductSortKeys` | Sort results by: `RELEVANCE`, `TITLE`, `PRICE`, `CREATED_AT`, `POPULARITY`. Default: `RELEVANCE` |
| `reverse` | `Boolean` | Reverse sort order. Default: `false` |
| `filters` | `ProductFilterInput` | Advanced filters for price range, categories, tags, and custom attributes. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ProductEdge!]!` | Search result edges containing product nodes and pagination cursors. |
| `edges.node` | `Product!` | Product object with all searchable fields (name, description, SKU, tags). |
| `edges.node.score` | `Float` | Relevance score of the product match (0-1). Higher scores indicate better matches. |
| `edges.cursor` | `String!` | Pagination cursor for this result. |
| `nodes` | `[Product!]!` | Simplified array of products without edge wrapping. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean!` | True if more results available after current page. |
| `pageInfo.endCursor` | `String` | Cursor of last result on page. |
| `facets` | `[SearchFacet!]` | Available facets for filtering (categories, price ranges, attributes). |
| `facets.name` | `String!` | Facet name (e.g., "category", "price_range"). |
| `facets.values` | `[FacetValue!]!` | Available values and counts for this facet. |
| `totalCount` | `Int!` | Total matching products across all pages. |

