---
outline: false
examples:
  - id: get-all-admin-products
    title: Get All Products (Admin)
    description: Retrieve all products from the admin panel with pagination.
    query: |
      query getProducts($first: Int, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              name
              sku
              type
              status
              price
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
          "products": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "name": "Product Name",
                  "sku": "PROD-001",
                  "type": "simple",
                  "status": "active",
                  "price": 99.99
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "YXJyYXljb25uZWN0aW9uOjEw"
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Admin authentication required
        solution: Provide valid admin credentials
---

# Products

## About

The `products` admin query retrieves a comprehensive list of all products in your store with full administrative details. Use this query to:

- Display product management tables and listings
- Build product inventory dashboards
- Export product data for external systems
- Filter and search products by various criteria
- Manage product catalogs programmatically
- Sync product data with inventory systems
- Generate product reports

This query returns all product metadata including pricing, inventory, status, and administrative flags needed for store management.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Number of products per page (max: 250). Default: 20. |
| `after` | `String` | Cursor for forward pagination. |
| `last` | `Int` | Number of products for backward pagination (max: 250). |
| `before` | `String` | Cursor for backward pagination. |
| `status` | `[ProductStatus!]` | Filter by status: `ACTIVE`, `INACTIVE`, `DRAFT`. |
| `type` | `[ProductType!]` | Filter by product type: `simple`, `configurable`, `grouped`, `bundle`. |
| `sortKey` | `ProductSortKeys` | Sort by: `ID`, `TITLE`, `CREATED_AT`, `UPDATED_AT`. Default: `ID` |
| `reverse` | `Boolean` | Reverse sort order. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ProductEdge!]!` | Array of product edges with pagination cursors. |
| `edges.node` | `Product!` | Complete product object. |
| `edges.node.id` | `ID!` | Product ID. |
| `edges.node.name` | `String!` | Product name. |
| `edges.node.sku` | `String!` | Product SKU. |
| `edges.node.type` | `String!` | Product type. |
| `edges.node.status` | `String!` | Status (ACTIVE, INACTIVE, DRAFT). |
| `edges.node.price` | `Float!` | Base product price. |
| `edges.node.cost` | `Float` | Cost of goods (for margin calculations). |
| `edges.node.inventory` | `InventoryInfo!` | Stock levels and status. |
| `edges.node.createdAt` | `DateTime!` | Creation timestamp. |
| `edges.node.updatedAt` | `DateTime!` | Last modification timestamp. |
| `nodes` | `[Product!]!` | Flattened product array. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total products in store. |

