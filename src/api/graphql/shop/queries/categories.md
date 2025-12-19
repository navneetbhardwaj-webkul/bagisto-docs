---
outline: false
examples:
  - id: get-categories-list
    title: Get All Categories
    description: Retrieve all product categories with hierarchy information.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
              id
              name
              slug
              description
              image
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
                  "image": "https://example.com/electronics.jpg"
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
      - error: INVALID_PAGINATION
        cause: Invalid first or after parameter
        solution: Use valid pagination values
---

# Categories

## About

The `getCategories` query retrieves the hierarchical structure of product categories in your store. Use this query to:

- Build category navigation menus and sidebars
- Display breadcrumb paths for product browsing
- Implement category-based product filtering
- Create category landing pages and collections
- Sync category structure with external systems
- Display category metadata (images, descriptions, counts)

This query supports full hierarchy navigation including parent-child category relationships, allowing you to build complete category trees. Each category includes SEO metadata, images, and associated product counts.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Number of categories to return per page (max: 100). |
| `after` | `String` | Pagination cursor. Returns categories after this position. |
| `last` | `Int` | Number of categories for backward pagination (max: 100). |
| `before` | `String` | Cursor for backward pagination. |
| `parent_id` | `ID` | Filter categories by parent ID. Returns only child categories. |
| `include_inactive` | `Boolean` | Include inactive/hidden categories. Default: `false` |
| `depth` | `Int` | Maximum hierarchy depth to fetch. Default: unlimited |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CategoryEdge!]!` | Array of category edges with pagination cursors. |
| `edges.node` | `Category!` | Category object containing metadata and hierarchy info. |
| `edges.node.id` | `ID!` | Unique category identifier. |
| `edges.node.name` | `String!` | Category display name. |
| `edges.node.slug` | `String!` | URL-friendly category identifier. |
| `edges.node.description` | `String` | Category description or summary text. |
| `edges.node.image` | `String` | URL to category featured image. |
| `edges.node.parentId` | `ID` | ID of parent category (null for root categories). |
| `edges.node.childCount` | `Int!` | Number of direct child categories. |
| `edges.node.productCount` | `Int!` | Number of products in this category. |
| `edges.node.seo` | `CategorySEO!` | SEO metadata (meta title, description, keywords). |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `totalCount` | `Int!` | Total categories matching filters. |

