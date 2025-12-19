---
outline: false
examples:
  - id: get-all-customers
    title: Get All Customers
    description: Retrieve all customers from the admin panel.
    query: |
      query getCustomers($first: Int, $after: String) {
        customers(first: $first, after: $after) {
          edges {
            node {
              id
              email
              firstName
              lastName
              status
              createdAt
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
          "customers": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "email": "customer@example.com",
                  "firstName": "John",
                  "lastName": "Doe",
                  "status": "active",
                  "createdAt": "2025-01-01T00:00:00Z"
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

# Customers

## About

The `customers` admin query retrieves customer information for administrative purposes. Use this query to:

- Display customer management dashboards
- Build customer lists and search interfaces
- Access customer contact and profile information
- Analyze customer accounts and history
- Filter customers by status or registration date
- Export customer data
- Sync customer information with external systems

This query provides comprehensive customer data including contact info, status, and registration details for administrative management.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Customers per page (max: 100). Default: 20. |
| `after` | `String` | Pagination cursor for forward pagination. |
| `last` | `Int` | Customers for backward pagination (max: 100). |
| `before` | `String` | Pagination cursor for backward pagination. |
| `status` | `[CustomerStatus!]` | Filter: `ACTIVE`, `INACTIVE`, `SUSPENDED`. |
| `sortKey` | `CustomerSortKeys` | Sort by: `ID`, `EMAIL`, `NAME`, `CREATED_AT`. |
| `search` | `String` | Search by email, name, or phone number. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CustomerEdge!]!` | Customer edges with pagination. |
| `edges.node` | `Customer!` | Customer object. |
| `edges.node.id` | `ID!` | Customer ID. |
| `edges.node.email` | `String!` | Email address. |
| `edges.node.firstName` | `String!` | First name. |
| `edges.node.lastName` | `String!` | Last name. |
| `edges.node.status` | `String!` | Account status. |
| `edges.node.phone` | `String` | Phone number. |
| `edges.node.orderCount` | `Int!` | Total orders placed. |
| `edges.node.totalSpent` | `Float!` | Total amount spent. |
| `edges.node.createdAt` | `DateTime!` | Registration date. |
| `edges.node.updatedAt` | `DateTime!` | Last update. |
| `nodes` | `[Customer!]!` | Flattened customer array. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total customers. |

