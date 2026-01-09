---
outline: false
examples:
  - id: get-all-promotions
    title: Get All Promotions
    description: Retrieve all active promotions from the admin panel.
    query: |
      query getPromotions($first: Int, $after: String) {
        promotions(first: $first, after: $after) {
          edges {
            node {
              id
              name
              description
              status
              startDate
              endDate
              discountPercentage
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
          "promotions": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "name": "Summer Sale",
                  "description": "20% off on all products",
                  "status": "active",
                  "startDate": "2025-06-01",
                  "endDate": "2025-08-31",
                  "discountPercentage": 20
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

# Promotions

## About

The `promotions` admin query retrieves promotion and discount rule configurations. Use this query to:

- Display promotion management interfaces
- Build promotion listings and dashboards
- Retrieve active and scheduled promotions
- Analyze promotion performance and ROI
- Export promotion rules for analysis
- Manage promotional calendars
- Monitor discount usage and impact

This query provides complete promotion metadata including conditions, discount amounts, date ranges, and application rules for promotional management and analytics.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Promotions per page (max: 100). Default: 20. |
| `after` | `String` | Pagination cursor for forward pagination. |
| `last` | `Int` | Promotions for backward pagination (max: 100). |
| `before` | `String` | Pagination cursor for backward pagination. |
| `status` | `[PromotionStatus!]` | Filter by: `ACTIVE`, `INACTIVE`, `SCHEDULED`, `EXPIRED`. |
| `sortKey` | `PromotionSortKeys` | Sort by: `ID`, `NAME`, `START_DATE`, `DISCOUNT`. Default: `START_DATE` |
| `type` | `[PromotionType!]` | Filter by type: `CATALOG_RULE`, `CART_RULE`, `COUPON`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[PromotionEdge!]!` | Promotion edges with pagination. |
| `edges.node` | `Promotion!` | Promotion object. |
| `edges.node.id` | `ID!` | Promotion ID. |
| `edges.node.name` | `String!` | Promotion name. |
| `edges.node.description` | `String` | Promotion description. |
| `edges.node.type` | `String!` | Type: `CATALOG_RULE`, `CART_RULE`, `COUPON`. |
| `edges.node.status` | `String!` | Status: `ACTIVE`, `INACTIVE`, `SCHEDULED`, `EXPIRED`. |
| `edges.node.startDate` | `DateTime!` | Promotion start date. |
| `edges.node.endDate` | `DateTime` | Promotion end date. |
| `edges.node.priority` | `Int!` | Execution priority (higher = executed first). |
| `edges.node.discountType` | `String!` | Discount type: `FIXED`, `PERCENTAGE`, `BOGO`. |
| `edges.node.discountAmount` | `Float!` | Discount value. |
| `edges.node.discountPercentage` | `Float` | Percentage discount. |
| `edges.node.conditions` | `[PromotionCondition!]!` | Promotion conditions and rules. |
| `edges.node.appliedProductCount` | `Int!` | Number of products affected. |
| `edges.node.totalRedemptions` | `Int!` | Total times promotion was used. |
| `edges.node.averageDiscount` | `Float!` | Average discount value per transaction. |
| `nodes` | `[Promotion!]!` | Flattened promotion array. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total promotions. |

