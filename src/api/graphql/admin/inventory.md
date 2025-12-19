---
outline: false
examples:
  - id: get-inventory-levels
    title: Get Inventory Levels
    description: Retrieve inventory information for products.
    query: |
      query getInventory($productId: ID!) {
        inventory(productId: $productId) {
          id
          productId
          sku
          quantity
          status
        }
      }
    variables: |
      {
        "productId": "1"
      }
    response: |
      {
        "data": {
          "inventory": {
            "id": "1",
            "productId": "1",
            "sku": "PROD-001",
            "quantity": 100,
            "status": "in-stock"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify product ID
---

# Inventory

## About

The `inventory` admin query retrieves detailed stock and inventory information for products. Use this query to:

- Check real-time stock levels
- Monitor low inventory alerts
- Track inventory across multiple warehouses/locations
- Build inventory dashboards and reports
- Manage stock and restocking processes
- Sync inventory with fulfillment systems
- Generate stock-out and low-stock reports

This query provides comprehensive inventory data including stock quantities, reorder levels, warehouse locations, and inventory status.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `productId` | `ID!` | Product ID to retrieve inventory for. |
| `warehouseId` | `ID` | Filter by warehouse/location (optional, shows all if omitted). |
| `includeReservations` | `Boolean` | Include reserved quantities from pending orders. Default: `true` |
| `includeHistory` | `Boolean` | Include inventory transaction history. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Inventory record ID. |
| `productId` | `ID!` | Associated product ID. |
| `sku` | `String!` | Product SKU. |
| `quantity` | `Int!` | Current available quantity (quantity - reserved). |
| `totalQuantity` | `Int!` | Total quantity including reserved stock. |
| `reserved` | `Int!` | Quantity reserved by pending orders. |
| `reorderLevel` | `Int` | Threshold for reorder alerts. |
| `status` | `String!` | Stock status: `in-stock`, `low-stock`, `out-of-stock`. |
| `warehouse` | `Warehouse` | Warehouse/location information. |
| `warehouse.id` | `ID!` | Warehouse ID. |
| `warehouse.name` | `String!` | Warehouse name. |
| `warehouse.code` | `String!` | Warehouse code. |
| `lastRestockDate` | `DateTime` | Date of last inventory increase. |
| `lastSaleDate` | `DateTime` | Date of most recent sale. |
| `history` | `[InventoryTransaction!]` | Recent inventory changes (when includeHistory: true). |
| `history.date` | `DateTime!` | Transaction date. |
| `history.type` | `String!` | Type: `purchase`, `sale`, `return`, `adjustment`. |
| `history.quantity` | `Int!` | Quantity changed. |
| `updatedAt` | `DateTime!` | Last update timestamp. |

