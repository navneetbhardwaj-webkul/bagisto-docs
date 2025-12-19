---
outline: false
examples:
  - id: get-sales-report
    title: Get Sales Report
    description: Retrieve sales statistics and report data.
    query: |
      query getSalesReport($startDate: String, $endDate: String) {
        salesReport(startDate: $startDate, endDate: $endDate) {
          totalSales
          totalOrders
          totalCustomers
          averageOrderValue
        }
      }
    variables: |
      {
        "startDate": "2025-01-01",
        "endDate": "2025-12-31"
      }
    response: |
      {
        "data": {
          "salesReport": {
            "totalSales": 50000.00,
            "totalOrders": 250,
            "totalCustomers": 150,
            "averageOrderValue": 200.00
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Admin authentication required
        solution: Provide valid admin credentials
      - error: INVALID_DATE_RANGE
        cause: Invalid date format or range
        solution: Use ISO 8601 date format (YYYY-MM-DD)
---

# Reports

## About

The `reports` admin query retrieves business analytics and reporting data. Use this query to:

- Display sales dashboards and KPI metrics
- Generate revenue and order reports
- Analyze customer acquisition and behavior
- Track product performance metrics
- Monitor payment and shipping methods
- Generate time-based sales trends
- Export report data for analysis
- Build custom analytics dashboards

This query provides aggregated business metrics needed for financial reporting, performance analysis, and business intelligence.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `startDate` | `DateTime` | Report start date (inclusive). Format: ISO 8601. |
| `endDate` | `DateTime` | Report end date (inclusive). Format: ISO 8601. |
| `granularity` | `String` | Report granularity: `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`. Default: `DAILY` |
| `reportType` | `[ReportType!]` | Types: `SALES`, `CUSTOMERS`, `PRODUCTS`, `PAYMENTS`, `SHIPPING`. |
| `groupBy` | `String` | Group results by: `DAY`, `WEEK`, `MONTH`, `CATEGORY`, `PRODUCT`, `PAYMENT_METHOD`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `totalSales` | `Float!` | Total revenue for the period. |
| `totalOrders` | `Int!` | Total orders placed. |
| `totalCustomers` | `Int!` | Total unique customers. |
| `averageOrderValue` | `Float!` | Average order value (total sales / total orders). |
| `newCustomers` | `Int!` | New customers acquired in period. |
| `repeatCustomers` | `Int!` | Returning customers. |
| `repeatOrderRate` | `Float!` | Percentage of repeat orders. |
| `topProducts` | `[ProductMetric!]!` | Best-selling products. |
| `topProducts.productId` | `ID!` | Product ID. |
| `topProducts.productName` | `String!` | Product name. |
| `topProducts.unitsSold` | `Int!` | Quantity sold. |
| `topProducts.revenue` | `Float!` | Revenue from product. |
| `topCategories` | `[CategoryMetric!]!` | Revenue by category. |
| `paymentMethods` | `[PaymentMetric!]!` | Revenue by payment method. |
| `shippingMethods` | `[ShippingMetric!]!` | Shipping method usage. |
| `trends` | `[TrendData!]!` | Time-series trend data. |
| `trends.date` | `DateTime!` | Data point date. |
| `trends.sales` | `Float!` | Sales for this period. |
| `trends.orders` | `Int!` | Orders for this period. |
| `trends.customers` | `Int!` | Customers for this period. |
| `currencyCode` | `String!` | Currency of monetary amounts. |
| `generatedAt` | `DateTime!` | Report generation timestamp. |

