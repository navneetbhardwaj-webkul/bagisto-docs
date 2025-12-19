---
outline: false
examples:
  - id: get-all-admin-categories
    title: Get All Categories (Admin)
    description: Retrieve all categories from the admin panel.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
              id
              name
              slug
              description
              status
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
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "name": "Electronics",
                  "slug": "electronics",
                  "description": "Electronic products",
                  "status": "active"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": null
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Admin authentication required
        solution: Provide valid admin credentials
---

# Categories

## About

The `categories` admin query retrieves the complete category structure for administrative management. Use this query to:

- Display category management interfaces
- Build category trees and hierarchies
- Filter and search categories
- Manage category metadata and SEO
- Export category structure
- Sync categories with external systems
- Generate category reports

This query provides full administrative details including parent relationships, product counts, and publishing status.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Categories per page (max: 100). Default: 20. |
| `after` | `String` | Pagination cursor for forward pagination. |
| `last` | `Int` | Categories for backward pagination (max: 100). |
| `before` | `String` | Pagination cursor for backward pagination. |
| `status` | `[CategoryStatus!]` | Filter by: `ACTIVE`, `INACTIVE`. |
| `parent_id` | `ID` | Show only children of this parent category. |
| `sortKey` | `CategorySortKeys` | Sort by: `ID`, `NAME`, `POSITION`. Default: `POSITION` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CategoryEdge!]!` | Category edges with pagination cursors. |
| `edges.node` | `Category!` | Category object. |
| `edges.node.id` | `ID!` | Category ID. |
| `edges.node.name` | `String!` | Category name. |
| `edges.node.slug` | `String!` | URL-friendly slug. |
| `edges.node.description` | `String` | Category description. |
| `edges.node.status` | `String!` | Status (ACTIVE, INACTIVE). |
| `edges.node.parentId` | `ID` | Parent category ID. |
| `edges.node.position` | `Int!` | Sort position. |
| `edges.node.childCount` | `Int!` | Number of child categories. |
| `edges.node.productCount` | `Int!` | Number of products. |
| `edges.node.createdAt` | `DateTime!` | Creation timestamp. |
| `nodes` | `[Category!]!` | Flattened category array. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total categories. |

