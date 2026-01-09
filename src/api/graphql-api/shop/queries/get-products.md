---
outline: false
examples:
  - id: get-products-sorted-az
    title: Get Products Sorted A-Z
    description: Fetch products sorted by title in ascending order.
    query: |
      query getProductsSorted {
        products(reverse: false, sortKey: "TITLE", first: 10) {
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
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "name": "Product A",
                  "sku": "SKU001",
                  "price": 29.99
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: INVALID_SORT_KEY
        cause: Sort key not supported
        solution: Use valid sort keys like TITLE, PRICE, CREATED_AT

  - id: get-products-sorted-za
    title: Get Products Sorted Z-A
    description: Fetch products sorted by title in descending order.
    query: |
      query getProductsSorted {
        products(reverse: true, sortKey: "TITLE", first: 10) {
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
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "10",
                  "name": "Zebra Product",
                  "sku": "SKU010",
                  "price": 99.99
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: INVALID_REVERSE_PARAM
        cause: Reverse parameter invalid
        solution: Use true or false

  - id: get-products-newest-first
    title: Get Products - Newest First
    description: Fetch newest products first sorted by creation date.
    query: |
      query getProductsSorted {
        products(reverse: true, sortKey: "CREATED_AT", first: 10) {
          edges {
            node {
              id
              name
              sku
              price
              createdAt
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "100",
                  "name": "Newest Product",
                  "sku": "SKU100",
                  "price": 49.99,
                  "createdAt": "2024-01-20T10:00:00Z"
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: NO_PRODUCTS
        cause: No products available
        solution: Add products to your store

  - id: get-products-oldest-first
    title: Get Products - Oldest First
    description: Fetch oldest products first sorted by creation date.
    query: |
      query getProductsSorted {
        products(reverse: false, sortKey: "CREATED_AT", first: 10) {
          edges {
            node {
              id
              name
              sku
              price
              createdAt
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "name": "First Product",
                  "sku": "SKU001",
                  "price": 29.99,
                  "createdAt": "2023-01-01T08:00:00Z"
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: INVALID_DATE_FORMAT
        cause: Date format is invalid
        solution: Use ISO 8601 date format

  - id: get-products-cheapest-first
    title: Get Products - Cheapest First
    description: Fetch products sorted by price in ascending order.
    query: |
      query getProductsSorted {
        products(reverse: false, sortKey: "PRICE", first: 10) {
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
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "5",
                  "name": "Budget Product",
                  "sku": "SKU005",
                  "price": 9.99
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: INVALID_PRICE
        cause: Price format is invalid
        solution: Ensure prices are positive numbers

  - id: get-products-expensive-first
    title: Get Products - Most Expensive First
    description: Fetch products sorted by price in descending order.
    query: |
      query getProductsSorted {
        products(reverse: true, sortKey: "PRICE", first: 10) {
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
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "50",
                  "name": "Premium Product",
                  "sku": "SKU050",
                  "price": 999.99
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: PRICE_OUT_OF_RANGE
        cause: Price exceeds acceptable range
        solution: Check product pricing configuration
---

# Get Products

## About

The `getProducts` query retrieves a paginated list of products from your store with support for advanced sorting and filtering. This query is essential for:

- Building product catalog browsing interfaces
- Implementing product search, sorting, and filtering experiences
- Creating product recommendation systems
- Syncing product data with external systems

The query supports cursor-based pagination to efficiently handle large product catalogs and includes metadata for:

- Basic product information (name, SKU, description, vendor)
- Pricing and inventory details
- Product images and media
- Categories, tags, and custom attributes
- Publication and availability status
- Created and updated timestamps

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | The number of products to return per page (max: 250). Used for forward pagination. |
| `after` | `String` | The cursor of the product to start after. Used with `first` for pagination. |
| `last` | `Int` | The number of products to return in reverse (max: 250). Used for backward pagination. |
| `before` | `String` | The cursor to start before. Used with `last` for reverse pagination. |
| `sortKey` | `ProductSortKeys` | Field to sort by: `TITLE`, `PRICE`, `CREATED_AT`, `UPDATED_AT`. Default: `TITLE` |
| `reverse` | `Boolean` | Reverse the sort order. Default: `false` |
| `query` | `String` | Search query string for filtering products. Supports advanced search syntax. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ProductEdge!]!` | Array of edges containing products and cursors. Each edge represents a connection between nodes. |
| `edges.node` | `Product!` | The actual product object containing id, name, sku, price, and other product fields. |
| `edges.cursor` | `String!` | Pagination cursor for this product. Use with `after` or `before` arguments. |
| `nodes` | `[Product!]!` | Flattened array of products without edge information. |
| `pageInfo` | `PageInfo!` | Pagination metadata object. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether there are more products after the current page. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether there are products before the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first product on the current page. |
| `pageInfo.endCursor` | `String` | Cursor of the last product on the current page. |
| `totalCount` | `Int!` | Total number of products matching the query criteria. |

