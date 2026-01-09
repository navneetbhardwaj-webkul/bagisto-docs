# Admin API Reference

The Bagisto Admin API provides comprehensive administrative endpoints for managing your e-commerce platform. All Admin API operations require authenticated admin access.

## Overview

The Admin API allows administrators to:
- Manage products, categories, and inventory
- Handle customer accounts and addresses
- Manage orders, shipments, and invoices
- Configure system settings
- Manage promotions and discounts
- View reports and analytics

::: warning Authentication Required
All Admin API requests require a valid admin token obtained via the `adminLogin` mutation.
:::

## Authentication

### Admin Login

```graphql
mutation {
  adminLogin(input: {
    email: "admin@example.com"
    password: "AdminPassword123!"
  }) {
    accessToken
    refreshToken
    admin {
      id
      name
      email
      role
      permissions {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "adminLogin": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "refresh_token_string",
      "admin": {
        "id": "1",
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin"
      }
    }
  }
}
```

### Admin Logout

```graphql
mutation {
  adminLogout(input: {}) {
    status
    message
  }
}
```

Use the `accessToken` in the Authorization header for all subsequent requests:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Products

Manage product catalog including creation, updates, and deletion.

### Create Product

```graphql
mutation {
  createProduct(input: {
    name: "New Product"
    sku: "SKU-123"
    type: "simple"
    attributeFamily: "default"
    description: "Product description"
    shortDescription: "Short desc"
    weight: 1.5
    status: true
    channel: "default"
    prices: [
      {
        channel: "default"
        price: 99.99
        cost: 50.00
        specialPrice: 79.99
        specialPriceFrom: "2024-01-01"
        specialPriceTo: "2024-12-31"
      }
    ]
    images: [
      {
        type: "image"
        path: "/path/to/image.jpg"
      }
    ]
    attributes: [
      {
        code: "color"
        value: "red"
      }
    ]
  }) {
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

### Get All Products

```graphql
query {
  products(
    channel: "default"
    first: 50
    filters: {
      status: [1]
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        sku
        type
        status
        description
        price
        cost
        weight
        quantity
        createdAt
        updatedAt
      }
    }
  }
}
```

### Get Product by ID

```graphql
query {
  adminProduct(id: "1") {
    id
    name
    sku
    type
    description
    shortDescription
    weight
    status
    quantity
    price
    cost
    attributeFamily {
      id
      code
    }
    attributes {
      edges {
        node {
          id
          code
          label
          value
        }
      }
    }
    images {
      edges {
        node {
          id
          type
          url
          path
        }
      }
    }
    inventories {
      edges {
        node {
          id
          warehouseId
          quantity
          reservedQuantity
        }
      }
    }
    prices {
      edges {
        node {
          id
          channel
          price
          cost
          specialPrice
          specialPriceFrom
          specialPriceTo
        }
      }
    }
  }
}
```

### Update Product

```graphql
mutation {
  updateProduct(input: {
    id: "1"
    name: "Updated Product Name"
    description: "Updated description"
    price: 119.99
    cost: 60.00
    status: true
    weight: 2.0
    attributes: [
      {
        code: "color"
        value: "blue"
      }
    ]
  }) {
    product {
      id
      name
      price
      updatedAt
    }
  }
}
```

### Update Product Prices

```graphql
mutation {
  updateProductPrices(input: {
    productId: "1"
    prices: [
      {
        channel: "default"
        price: 129.99
        cost: 70.00
        specialPrice: 99.99
        specialPriceFrom: "2024-02-01"
        specialPriceTo: "2024-02-28"
      }
    ]
  }) {
    product {
      id
      prices {
        edges {
          node {
            channel
            price
            specialPrice
          }
        }
      }
    }
  }
}
```

### Delete Product

```graphql
mutation {
  deleteProduct(input: {
    id: "1"
  }) {
    status
    message
  }
}
```

### Bulk Update Products

```graphql
mutation {
  bulkUpdateProducts(input: {
    productIds: ["1", "2", "3"]
    updates: {
      status: true
      weight: 1.5
    }
  }) {
    status
    message
    updatedCount
  }
}
```

### Add Product Image

```graphql
mutation {
  addProductImage(input: {
    productId: "1"
    type: "image"
    path: "/path/to/new-image.jpg"
    altText: "Product alt text"
  }) {
    image {
      id
      type
      url
      path
    }
  }
}
```

### Delete Product Image

```graphql
mutation {
  deleteProductImage(input: {
    productId: "1"
    imageId: "1"
  }) {
    status
    message
  }
}
```

## Categories

Manage product categories.

### Create Category

```graphql
mutation {
  createCategory(input: {
    parentId: 1
    name: "New Category"
    slug: "new-category"
    description: "Category description"
    imageUrl: "https://example.com/image.jpg"
    bannerUrl: "https://example.com/banner.jpg"
    metaTitle: "New Category - Meta Title"
    metaDescription: "Meta description"
    metaKeywords: "keywords"
    status: true
    displayMode: "products_only"
    position: 1
  }) {
    category {
      id
      name
      slug
      status
      createdAt
    }
  }
}
```

### Get All Categories

```graphql
query {
  adminCategories(first: 50) {
    edges {
      node {
        id
        name
        slug
        description
        status
        position
        parentId
        children {
          totalCount
        }
      }
    }
  }
}
```

### Update Category

```graphql
mutation {
  updateCategory(input: {
    id: "2"
    name: "Updated Category"
    description: "Updated description"
    status: true
    position: 2
  }) {
    category {
      id
      name
      status
      updatedAt
    }
  }
}
```

### Delete Category

```graphql
mutation {
  deleteCategory(input: {
    id: "2"
  }) {
    status
    message
  }
}
```

## Inventory Management

Manage stock and warehouse inventory.

### Get Inventory

```graphql
query {
  inventory(productId: "1") {
    id
    productId
    warehouseId
    quantity
    reservedQuantity
    availableQuantity
    warehouse {
      id
      name
      code
    }
  }
}
```

### Update Inventory

```graphql
mutation {
  updateInventory(input: {
    productId: "1"
    warehouseId: "1"
    quantity: 100
  }) {
    inventory {
      id
      quantity
      availableQuantity
      updatedAt
    }
  }
}
```

### Get Warehouses

```graphql
query {
  warehouses(first: 20) {
    edges {
      node {
        id
        name
        code
        address
        city
        state
        country
        zipCode
        phoneNumber
      }
    }
  }
}
```

### Create Warehouse

```graphql
mutation {
  createWarehouse(input: {
    name: "New Warehouse"
    code: "WH-02"
    address: "456 Warehouse Ave"
    city: "Chicago"
    state: "IL"
    country: "US"
    zipCode: "60601"
    phoneNumber: "3125551234"
  }) {
    warehouse {
      id
      name
      code
      createdAt
    }
  }
}
```

## Customer Management

Manage customer accounts and information.

### Get All Customers

```graphql
query {
  adminCustomers(first: 50) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        firstName
        lastName
        email
        gender
        createdAt
        totalOrders
        totalSpent
      }
    }
  }
}
```

### Get Customer Details

```graphql
query {
  adminCustomer(id: "1") {
    id
    firstName
    lastName
    email
    gender
    dateOfBirth
    phone
    status
    createdAt
    addresses {
      edges {
        node {
          id
          firstName
          lastName
          address
          city
          state
          country
          zipCode
          defaultBilling
          defaultShipping
        }
      }
    }
    orders {
      edges {
        node {
          id
          incrementId
          status
          grandTotal
          createdAt
        }
      }
    }
  }
}
```

### Create Customer

```graphql
mutation {
  adminCreateCustomer(input: {
    firstName: "John"
    lastName: "Doe"
    email: "john@example.com"
    password: "SecurePassword123!"
    gender: "Male"
    dateOfBirth: "1990-05-15"
    status: true
  }) {
    customer {
      id
      firstName
      email
      createdAt
    }
  }
}
```

### Update Customer

```graphql
mutation {
  adminUpdateCustomer(input: {
    id: "1"
    firstName: "Jane"
    lastName: "Smith"
    email: "jane@example.com"
    gender: "Female"
    status: true
  }) {
    customer {
      id
      firstName
      email
      updatedAt
    }
  }
}
```

### Delete Customer

```graphql
mutation {
  adminDeleteCustomer(input: {
    id: "1"
  }) {
    status
    message
  }
}
```

### Add Customer Address

```graphql
mutation {
  adminAddCustomerAddress(input: {
    customerId: "1"
    firstName: "John"
    lastName: "Doe"
    address: "123 Main St"
    city: "New York"
    state: "NY"
    country: "US"
    zipCode: "10001"
    phoneNumber: "2125551234"
    defaultBilling: true
    defaultShipping: false
  }) {
    address {
      id
      firstName
      address
      city
      defaultBilling
    }
  }
}
```

## Order Management

Manage customer orders, shipments, and invoices.

### Get All Orders

```graphql
query {
  adminOrders(
    first: 50
    filters: {
      status: ["pending", "processing"]
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        incrementId
        status
        grandTotal
        itemsCount
        customer {
          id
          firstName
          lastName
          email
        }
        createdAt
      }
    }
  }
}
```

### Get Order Details

```graphql
query {
  adminOrder(id: "1") {
    id
    incrementId
    status
    grandTotal
    subtotal
    taxTotal
    shippingTotal
    discountAmount
    couponCode
    customer {
      id
      firstName
      lastName
      email
    }
    billingAddress {
      firstName
      lastName
      address
      city
      state
      country
      zipCode
    }
    shippingAddress {
      firstName
      lastName
      address
      city
      state
      country
      zipCode
    }
    items {
      edges {
        node {
          id
          productId
          productName
          sku
          quantity
          price
          totalPrice
          invoicedQty
          shippedQty
          refundedQty
        }
      }
    }
    shipments {
      edges {
        node {
          id
          status
          carrierTitle
          trackNumber
          createdAt
          items {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
    invoices {
      edges {
        node {
          id
          incrementId
          status
          grandTotal
          createdAt
        }
      }
    }
  }
}
```

### Create Shipment

```graphql
mutation {
  createShipment(input: {
    orderId: "1"
    items: [
      {
        orderItemId: "1"
        quantity: 2
      }
    ]
    carrier: "fedex"
    trackNumber: "123456789"
  }) {
    shipment {
      id
      incrementId
      status
      carrierTitle
      trackNumber
      createdAt
    }
  }
}
```

### Create Invoice

```graphql
mutation {
  createInvoice(input: {
    orderId: "1"
    items: [
      {
        orderItemId: "1"
        quantity: 2
      }
    ]
  }) {
    invoice {
      id
      incrementId
      status
      grandTotal
      createdAt
    }
  }
}
```

### Create Refund

```graphql
mutation {
  createRefund(input: {
    orderId: "1"
    items: [
      {
        orderItemId: "1"
        quantity: 1
      }
    ]
    adjustmentFee: 0
    adjustmentNegativeFee: 0
  }) {
    refund {
      id
      status
      grandTotal
      createdAt
    }
  }
}
```

### Update Order Status

```graphql
mutation {
  updateOrderStatus(input: {
    orderId: "1"
    status: "processing"
  }) {
    order {
      id
      status
      updatedAt
    }
  }
}
```

### Add Order Comment

```graphql
mutation {
  addOrderComment(input: {
    orderId: "1"
    comment: "Order is being processed"
    notifyCustomer: true
  }) {
    comment {
      id
      comment
      createdAt
    }
  }
}
```

## Promotions & Discounts

Manage promotional campaigns and coupon codes.

### Get All Promotions

```graphql
query {
  adminPromotions(first: 50) {
    edges {
      node {
        id
        name
        description
        ruleType
        status
        startDate
        endDate
        priority
      }
    }
  }
}
```

### Create Promotion

```graphql
mutation {
  createPromotion(input: {
    name: "Summer Sale 2024"
    description: "Summer discount promotion"
    ruleType: "cart_rule"
    status: true
    startDate: "2024-06-01"
    endDate: "2024-08-31"
    conditions: [
      {
        attribute: "subtotal"
        operator: "gt"
        value: "100"
      }
    ]
    actions: [
      {
        type: "discount_percentage"
        value: "10"
      }
    ]
    priority: 1
  }) {
    promotion {
      id
      name
      status
      createdAt
    }
  }
}
```

### Get All Coupons

```graphql
query {
  adminCoupons(first: 50) {
    edges {
      node {
        id
        code
        description
        discountType
        discountValue
        usageLimit
        usageCount
        status
        startDate
        endDate
      }
    }
  }
}
```

### Create Coupon

```graphql
mutation {
  createCoupon(input: {
    code: "SAVE20"
    description: "Save 20% on your purchase"
    discountType: "percentage"
    discountValue: "20"
    usageLimit: 100
    usageLimitPerCustomer: 1
    status: true
    startDate: "2024-01-01"
    endDate: "2024-12-31"
    minOrderAmount: "50"
  }) {
    coupon {
      id
      code
      discountValue
      status
      createdAt
    }
  }
}
```

## Attributes & Attribute Families

Manage product attributes and families.

### Get All Attributes

```graphql
query {
  adminAttributes(first: 50) {
    edges {
      node {
        id
        code
        label
        type
        required
        filterable
        configurable
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
```

### Create Attribute

```graphql
mutation {
  createAttribute(input: {
    code: "brand"
    label: "Brand"
    type: "select"
    required: false
    filterable: true
    configurable: false
    options: [
      { label: "Brand A", value: "brand-a" }
      { label: "Brand B", value: "brand-b" }
    ]
  }) {
    attribute {
      id
      code
      label
      type
      createdAt
    }
  }
}
```

### Get Attribute Families

```graphql
query {
  adminAttributeFamilies(first: 50) {
    edges {
      node {
        id
        code
        name
        attributeGroups {
          edges {
            node {
              id
              name
              attributes {
                edges {
                  node {
                    code
                    label
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## System Configuration

Manage system settings and configuration.

### Get Configuration

```graphql
query {
  configuration {
    general {
      storeName
      storeEmail
      taxIdentifier
    }
    catalog {
      productsPerPage
      defaultSort
    }
    checkout {
      guestCheckout
      reviewCheckout
    }
    shipping {
      origin
      freeShippingThreshold
    }
  }
}
```

### Update Configuration

```graphql
mutation {
  updateConfiguration(input: {
    general: {
      storeName: "My Store"
      storeEmail: "store@example.com"
    }
    catalog: {
      productsPerPage: 20
      defaultSort: "name"
    }
  }) {
    status
    message
  }
}
```

## Reports & Analytics

Generate business reports and analytics.

### Get Sales Report

```graphql
query {
  salesReport(
    startDate: "2024-01-01"
    endDate: "2024-12-31"
    granularity: "monthly"
  ) {
    periods {
      date
      orders
      totalRevenue
      avgOrderValue
      itemsSold
    }
  }
}
```

### Get Customer Report

```graphql
query {
  customerReport(
    startDate: "2024-01-01"
    endDate: "2024-12-31"
  ) {
    newCustomers
    returningCustomers
    totalRevenue
    avgCustomerValue
  }
}
```

### Get Product Report

```graphql
query {
  productReport(
    startDate: "2024-01-01"
    endDate: "2024-12-31"
    limit: 10
  ) {
    products {
      productId
      productName
      unitsSold
      totalRevenue
      rating
    }
  }
}
```

## Permission & Role Management

Manage admin roles and permissions.

### Get All Roles

```graphql
query {
  adminRoles(first: 50) {
    edges {
      node {
        id
        name
        description
        permissions {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
}
```

### Create Role

```graphql
mutation {
  createAdminRole(input: {
    name: "Product Manager"
    description: "Can manage products and categories"
    permissions: ["products.view", "products.create", "products.edit"]
  }) {
    role {
      id
      name
      permissions {
        edges {
          node { name }
        }
      }
    }
  }
}
```

### Get Admin Users

```graphql
query {
  adminUsers(first: 50) {
    edges {
      node {
        id
        name
        email
        role {
          name
        }
        status
        createdAt
      }
    }
  }
}
```

### Create Admin User

```graphql
mutation {
  createAdminUser(input: {
    name: "Product Manager"
    email: "pm@example.com"
    password: "SecurePassword123!"
    roleId: "2"
    status: true
  }) {
    admin {
      id
      name
      email
      role { name }
      createdAt
    }
  }
}
```

## Error Handling

### Permission Denied Error

```json
{
  "errors": [
    {
      "message": "Unauthenticated or insufficient permissions",
      "extensions": {
        "category": "authentication"
      }
    }
  ]
}
```

### Validation Error

```json
{
  "errors": [
    {
      "message": "Validation failed",
      "extensions": {
        "validation": {
          "name": ["The name field is required"],
          "sku": ["The SKU must be unique"]
        }
      }
    }
  ]
}
```

---

**💡 Pro Tips:**
- Use bulk operations for better performance
- Cache frequently accessed data like categories and attributes
- Implement proper error handling and retry logic
- Monitor rate limits and implement backoff strategies

**📚 Related Documentation:**
- 🔐 [Authentication](/api/graphql/authentication)
- 🛍️ [Shop API](/api/graphql/shop-api)
- 💡 [Best Practices](/api/graphql/best-practices)
