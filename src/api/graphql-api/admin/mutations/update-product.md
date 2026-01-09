---
outline: false
examples:
  - id: update-product-price
    title: Update Product Price
    description: Update the price of an existing product.
    query: |
      mutation updateProduct($id: ID!, $input: UpdateProductInput!) {
        updateProduct(id: $id, input: $input) {
          product {
            id
            name
            sku
            price
            status
          }
          message
        }
      }
    variables: |
      {
        "id": "1",
        "input": {
          "price": 129.99
        }
      }
    response: |
      {
        "data": {
          "updateProduct": {
            "product": {
              "id": "1",
              "name": "Product Name",
              "sku": "PROD-001",
              "price": 129.99,
              "status": "active"
            },
            "message": "Product updated successfully"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify product ID
      - error: INVALID_INPUT
        cause: Invalid input data provided
        solution: Check input format and values
---

# Update Product

## About

The `updateProduct` mutation modifies an existing product's information. Use this mutation to:

- Update product prices and costs
- Modify product descriptions and details
- Change product status or visibility
- Update inventory settings
- Modify product attributes
- Update category assignments
- Sync product changes from external systems

This mutation validates all product data and applies updates while maintaining inventory and category relationships.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | The product ID to update. |
| `input` | `UpdateProductInput!` | Product data fields to update. |
| `input.name` | `String` | Updated product name. |
| `input.price` | `Float` | Updated base price. |
| `input.cost` | `Float` | Updated cost of goods. |
| `input.status` | `String` | New product status. |
| `input.description` | `String` | Updated full description. |
| `input.shortDescription` | `String` | Updated brief summary. |
| `input.weight` | `Float` | Updated product weight. |
| `input.categories` | `[ID!]` | Updated category assignments. |
| `input.attributes` | `[AttributeInput!]` | Updated attribute values. |
| `input.images` | `[ImageInput!]` | Updated product images. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `product` | `Product!` | The updated product object. |
| `product.id` | `ID!` | Product ID. |
| `product.name` | `String!` | Product name. |
| `product.sku` | `String!` | Product SKU (immutable). |
| `product.price` | `Float!` | Updated price. |
| `product.status` | `String!` | Current status. |
| `product.updatedAt` | `DateTime!` | Update timestamp. |
| `message` | `String!` | Success message. |
| `success` | `Boolean!` | Indicates successful update. |
| `errors` | `[ErrorMessage!]` | Validation errors if update failed. |

