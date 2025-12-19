# Shop API - Products

The Products API allows you to retrieve, create, update, and manage product information in your Bagisto store.

## Overview

Products are the core of your e-commerce store. The Products API provides comprehensive endpoints to manage product data including pricing, attributes, images, and inventory.

## Base Resource Object

```json
{
  "id": "1",
  "name": "Awesome Product",
  "sku": "PROD-001",
  "type": "simple",
  "description": "Product description",
  "shortDescription": "Short desc",
  "price": 99.99,
  "cost": 50.00,
  "weight": 1.5,
  "status": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Get All Products

Retrieve a list of all products in your store with pagination support.

```graphql
query GetProducts(
  $channel: String!
  $first: Int!
  $after: String
  $search: String
  $sort: String
) {
  products(
    channel: $channel
    first: $first
    after: $after
    search: $search
    sort: $sort
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        name
        sku
        price
        status
        createdAt
      }
    }
  }
}
```

**Variables:**
```json
{
  "channel": "default",
  "first": 20,
  "sort": "name"
}
```

**Response:**
```json
{
  "data": {
    "products": {
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "cursor-value"
      },
      "edges": [
        {
          "node": {
            "id": "1",
            "name": "Product 1",
            "sku": "PROD-001",
            "price": "99.99",
            "status": true
          }
        }
      ]
    }
  }
}
```

## Get Product by ID

Retrieve detailed information about a specific product.

```graphql
query GetProduct($id: String!) {
  product(id: $id) {
    id
    name
    sku
    type
    description
    shortDescription
    price
    cost
    weight
    status
    images {
      edges {
        node {
          id
          url
          alt
          type
        }
      }
    }
    attributes {
      edges {
        node {
          code
          label
          value
        }
      }
    }
    reviews {
      edges {
        node {
          id
          rating
          title
          comment
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "id": "1"
}
```

## Get Product by SKU

Retrieve a product using its SKU.

```graphql
query GetProductBySku($sku: String!) {
  productBySkU(sku: $sku) {
    id
    name
    sku
    price
    description
  }
}
```

**Variables:**
```json
{
  "sku": "PROD-001"
}
```

## Get Product by URL Key

Retrieve a product using its URL slug.

```graphql
query GetProductByUrl($url: String!) {
  productByUrl(url: $url) {
    id
    name
    sku
    price
    productFlat {
      url
      metaTitle
      metaDescription
    }
  }
}
```

**Variables:**
```json
{
  "url": "awesome-product-name"
}
```

## Search Products

Search for products using text search.

```graphql
query SearchProducts($search: String!, $channel: String!) {
  products(
    channel: $channel
    search: $search
    first: 20
  ) {
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
```

**Variables:**
```json
{
  "search": "laptop",
  "channel": "default"
}
```

## Filter Products

Filter products by various attributes.

```graphql
query FilterProducts(
  $channel: String!
  $filters: ProductFilterInput
) {
  products(
    channel: $channel
    first: 20
    filters: $filters
  ) {
    edges {
      node {
        id
        name
        price
      }
    }
  }
}
```

**Variables:**
```json
{
  "channel": "default",
  "filters": {
    "price": {
      "from": 100,
      "to": 500
    },
    "status": [1],
    "brand": ["Apple", "Samsung"]
  }
}
```

## Sort Products

Sort products by name, price, rating, or date.

```graphql
query SortProducts(
  $channel: String!
  $sort: String!
  $order: String!
) {
  products(
    channel: $channel
    sort: $sort
    order: $order
    first: 20
  ) {
    edges {
      node {
        id
        name
        price
      }
    }
  }
}
```

**Variables:**
```json
{
  "channel": "default",
  "sort": "price",
  "order": "ASC"
}
```

## Get Configurable Product

Retrieve a configurable product with its variants and super attributes.

```graphql
query GetConfigurable($id: String!) {
  product(id: $id) {
    id
    name
    type
    variants {
      edges {
        node {
          id
          sku
          price
          attributes {
            edges {
              node {
                code
                value
              }
            }
          }
        }
      }
    }
    superAttributes {
      edges {
        node {
          id
          code
          label
          options {
            edges {
              node {
                id
                label
                value
              }
            }
          }
        }
      }
    }
  }
}
```

## Create Product

Create a new product in your store.

```graphql
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    product {
      id
      name
      sku
      status
      createdAt
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "name": "New Product",
    "sku": "PROD-NEW-001",
    "type": "simple",
    "description": "Product description",
    "price": 99.99,
    "status": true
  }
}
```

## Update Product

Update an existing product.

```graphql
mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    product {
      id
      name
      price
      updatedAt
    }
  }
}
```

**Variables:**
```json
{
  "id": "1",
  "input": {
    "name": "Updated Product Name",
    "price": 119.99,
    "status": true
  }
}
```

## Delete Product

Delete a product from your store.

```graphql
mutation DeleteProduct($id: String!) {
  deleteProduct(id: $id) {
    status
    message
  }
}
```

**Variables:**
```json
{
  "id": "1"
}
```

## Add Product Image

Add an image to a product.

```graphql
mutation AddProductImage($input: AddProductImageInput!) {
  addProductImage(input: $input) {
    image {
      id
      url
      type
    }
  }
}
```

## Delete Product Image

Remove an image from a product.

```graphql
mutation DeleteProductImage($input: DeleteProductImageInput!) {
  deleteProductImage(input: $input) {
    status
    message
  }
}
```

## Bulk Update Products

Update multiple products at once.

```graphql
mutation BulkUpdate($productIds: [String!]!, $updates: BulkUpdateInput!) {
  bulkUpdateProducts(
    productIds: $productIds
    updates: $updates
  ) {
    status
    updatedCount
  }
}
```

**Variables:**
```json
{
  "productIds": ["1", "2", "3"],
  "updates": {
    "status": true,
    "weight": 1.5
  }
}
```

---

**Related Resources:**
- [Categories](/api/graphql/shop/categories)
- [Reviews](/api/graphql/shop/reviews)
- [Cart](/api/graphql/shop/cart)
