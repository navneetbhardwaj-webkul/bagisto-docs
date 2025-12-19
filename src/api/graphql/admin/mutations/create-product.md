---
outline: false
examples:
  - id: create-simple-product
    title: Create Simple Product
    description: Create a new simple product with basic information.
    query: |
      mutation createProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
          product {
            id
            name
            sku
            type
            price
            status
          }
          message
        }
      }
    variables: |
      {
        "input": {
          "name": "New Product",
          "sku": "NEW-001",
          "type": "simple",
          "price": 99.99,
          "status": "active"
        }
      }
    response: |
      {
        "data": {
          "createProduct": {
            "product": {
              "id": "1",
              "name": "New Product",
              "sku": "NEW-001",
              "type": "simple",
              "price": 99.99,
              "status": "active"
            },
            "message": "Product created successfully"
          }
        }
      }
    commonErrors:
      - error: SKU_ALREADY_EXISTS
        cause: Product with this SKU already exists
        solution: Use a unique SKU
      - error: INVALID_INPUT
        cause: Required fields are missing
        solution: Provide all required fields
---

# Create Product

## About

The `createProduct` mutation creates a new product in your store catalog. Use this mutation to:

- Add new products programmatically
- Build product creation workflows
- Integrate external catalog feeds
- Automate product onboarding
- Create products from bulk imports
- Add products via API integrations
- Manage product data synchronization

This mutation validates all product data, creates inventory records, and applies category/attribute assignments.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `input` | `CreateProductInput!` | Product data object containing all product details. |
| `input.name` | `String!` | Product name/title. |
| `input.sku` | `String!` | Unique product SKU for inventory tracking. |
| `input.type` | `String!` | Product type: `simple`, `configurable`, `grouped`, `bundle`. |
| `input.price` | `Float!` | Base product price. |
| `input.cost` | `Float` | Cost of goods for margin calculations. |
| `input.status` | `String` | Initial status: `active`, `inactive`, `draft`. Default: `active` |
| `input.description` | `String` | Full product description. |
| `input.shortDescription` | `String` | Brief product summary. |
| `input.weight` | `Float` | Product weight. |
| `input.categories` | `[ID!]` | Category IDs to assign product to. |
| `input.attributes` | `[AttributeInput!]` | Custom product attributes and values. |
| `input.images` | `[ImageInput!]` | Product images. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `product` | `Product!` | The newly created product object. |
| `product.id` | `ID!` | New product ID. |
| `product.name` | `String!` | Product name. |
| `product.sku` | `String!` | Product SKU. |
| `product.type` | `String!` | Product type. |
| `product.price` | `Float!` | Product price. |
| `product.status` | `String!` | Product status. |
| `message` | `String!` | Success message. |
| `success` | `Boolean!` | Indicates successful creation. |
| `errors` | `[ErrorMessage!]` | Validation errors if creation failed. |

