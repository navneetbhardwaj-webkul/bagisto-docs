# Shop API - Products

The Products API allows you to retrieve and query product information from your Bagisto store using flexible sorting, filtering, search, and pagination options.

## Overview

Products are the core of your e-commerce store. This GraphQL API provides comprehensive query capabilities to manage product data including pricing, attributes, images, and filtering with real-world examples.

---

## 1️⃣ Basic Product Listing (Price Ascending)

Retrieve products sorted by price in ascending order with cursor-based pagination.

```graphql
query GetProducts(
  $channel: String!
  $first: Int!
  $after: String
  $search: String
  $sort: String
) {
  products(
    sortKey: $sortKey
    reverse: $reverse
    first: $first
  ) {
    totalCount
    edges {
      cursor
      node {
        id
        name
        sku
        price
        minimumPrice
        type
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Variables:**
```json
{
  "sortKey": "PRICE",
  "reverse": false,
  "first": 20
}
```

---

## 2️⃣ Search Products by Name or SKU

Search for products using text query matching against name and SKU fields.

```graphql
query SearchProducts(
  $query: String!
  $sortKey: String!
  $first: Int!
) {
  products(
    query: $query
    sortKey: $sortKey
    first: $first
  ) {
    edges {
      node {
        id
        name
        sku
      }
    }
  }
}
```

**Variables:**
```json
{
  "query": "shirt",
  "sortKey": "TITLE",
  "first": 20
}
```

---

## 3️⃣ Filter by Category (ID-based)

Filter products by category using numeric category IDs.

> **📌 Note:** Category IDs must be numeric (e.g., `22`, `23`)

```graphql
query FilterByCategory(
  $filter: String!
  $first: Int!
) {
  products(
    filter: $filter
    first: $first
  ) {
    edges {
      node {
        id
        name
        sku
      }
    }
  }
}
```

**Variables:**
```json
{
  "filter": "{\"category_id\":23}",
  "first": 20
}
```

---

## 4️⃣ Filter by Attribute Options (Color & Size)

Filter products by attribute options using their option IDs.

> **📌 Important:** Attribute filters use **option IDs**, not labels
> * Red → `1`, Green → `2`
> * Size S → `6`, M → `7`

```graphql
query FilterByAttributes(
  $filter: String!
  $first: Int!
) {
  products(
    filter: $filter
    first: $first
  ) {
    edges {
      node {
        id
        name
        sku
      }
    }
  }
}
```

**Variables:**
```json
{
  "filter": "{\"color\":\"1,2\",\"size\":\"6,7\"}",
  "first": 20
}
```

---

## 5️⃣ Filter by Price Range

Filter products within a specific price range.

```graphql
query FilterByPriceRange(
  $filter: String!
  $sortKey: String!
  $reverse: Boolean!
  $first: Int!
) {
  products(
    filter: $filter
    sortKey: $sortKey
    reverse: $reverse
    first: $first
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
  "filter": "{\"price_from\":800,\"price_to\":2500}",
  "sortKey": "PRICE",
  "reverse": false,
  "first": 20
}
```

---

## 6️⃣ Combined Filters (Real-World Example)

Apply multiple filters together: search, category, attributes, price range, sorting, and pagination.

```graphql
query FilterProductsCombined(
  $query: String!
  $filter: String!
  $sortKey: String!
  $reverse: Boolean!
  $locale: String!
  $channel: String!
  $first: Int!
) {
  products(
    query: $query
    filter: $filter
    sortKey: $sortKey
    reverse: $reverse
    locale: $locale
    channel: $channel
    first: $first
  ) {
    totalCount
    edges {
      cursor
      node {
        id
        name
        sku
        price
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Variables:**
```json
{
  "query": "tshirt",
  "filter": "{\"category_id\":23,\"color\":\"1\",\"size\":\"7\",\"price_from\":500,\"price_to\":2000}",
  "sortKey": "PRICE",
  "reverse": true,
  "locale": "en",
  "channel": "default",
  "first": 20
}
```

---

## 7️⃣ Pagination – Next Page (Using `after` Cursor)

Navigate to the next page using the cursor-based pagination with the `after` parameter.

```graphql
query GetProductsNextPage(
  $sortKey: String!
  $first: Int!
  $after: String!
) {
  products(
    sortKey: $sortKey
    first: $first
    after: $after
  ) {
    edges {
      cursor
      node {
        id
        name
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Variables:**
```json
{
  "sortKey": "PRICE",
  "first": 20,
  "after": "MTI1"
}
```

---

## 8️⃣ Pagination – Previous Page (Using `before` + `last`)

Navigate to the previous page using the `before` parameter with `last` for reverse pagination.

```graphql
query GetProductsPreviousPage(
  $sortKey: String!
  $last: Int!
  $before: String!
) {
  products(
    sortKey: $sortKey
    last: $last
    before: $before
  ) {
    edges {
      node {
        id
        name
      }
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
  }
}
```

**Variables:**
```json
{
  "sortKey": "PRICE",
  "last": 20,
  "before": "MTQ0"
}
```

---

## 9️⃣ Locale & Channel Specific Products

Query products for a specific locale and sales channel.

```graphql
query GetProductsByLocaleAndChannel(
  $locale: String!
  $channel: String!
  $first: Int!
) {
  products(
    locale: $locale
    channel: $channel
    first: $first
  ) {
    edges {
      node {
        id
        name
        sku
      }
    }
  }
}
```

**Variables:**
```json
{
  "locale": "en",
  "channel": "default",
  "first": 20
}
```

---

## ⚠️ Common Filter Syntax Issues

### ✅ Correct Format (Single-Line JSON String)

```graphql
filter: "{\"color\":\"1,2\",\"size\":\"6\"}"
```

### ❌ Incorrect (Will Throw `Unterminated string` Error)

```graphql
filter: "{
  "color":"1,2"
}"
```

The filter parameter must be passed as a **single-line JSON string** with properly escaped quotes. Multi-line filters will cause parsing errors.

---

## 🧠 Best Practice: Using GraphQL Variables

Use GraphQL variables instead of inline filter strings for better maintainability and error handling.

**Query:**
```graphql
query getProducts($filter: String!) {
  products(filter: $filter, first: 20) {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

**Variables:**
```json
{
  "filter": "{\"category_id\":23,\"color\":\"1\",\"size\":\"6\"}"
}
```

---

## ✅ Quick Reference Summary

* **Attribute filters** use option IDs, not labels
* **Category filter** uses numeric category ID
* **Price filters** use `price_from` and `price_to` parameters
* **Pagination** is cursor-based with `first`, `last`, `after`, and `before`
* **Filter parameter** must be a single-line JSON string with escaped quotes
* **Sort key** options: `PRICE`, `TITLE`, `NEWEST`, `BEST_SELLING`
* **Reverse parameter** controls sort direction (true = descending, false = ascending)

---

**Related Resources:**
- [Categories](/api/graphql/shop/categories)
- [Reviews](/api/graphql/shop/reviews)
- [Cart](/api/graphql/shop/cart)
