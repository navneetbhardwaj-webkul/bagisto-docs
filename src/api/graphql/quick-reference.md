# GraphQL API Quick Reference

## Shop API Quick Links

### Products
- **List Products** - `GET /graphql` with `query GetProducts`
- **Search Products** - Filter with search parameter
- **Get Product Details** - By ID, SKU, or URL
- [Full Products Documentation](/api/graphql/shop/products)

### Cart Operations
- **Create Cart** - Guest or authenticated
- **Add to Cart** - With variant selection
- **Update Quantity** - Modify cart items
- **Apply Coupon** - Discount codes
- [Full Cart Documentation](/api/graphql/shop/cart)

### Customers
- **Register** - New customer account
- **Login** - Authenticate with email/password
- **Manage Profile** - Update customer info
- **Manage Addresses** - Add/update shipping addresses
- [Full Customer Documentation](/api/graphql/shop/customers)

### Checkout Flow
1. Add items to cart
2. Save billing address
3. Estimate shipping
4. Select shipping method
5. Choose payment method
6. Create order
- [Full Checkout Documentation](/api/graphql/shop/checkout)

### Orders & Tracking
- **Get My Orders** - List customer orders
- **Order Details** - Complete order info
- **Track Shipment** - Real-time tracking
- [Full Orders Documentation](/api/graphql/shop/orders)

### Reviews
- **Get Reviews** - List product reviews
- **Submit Review** - Create review with rating
- [Full Reviews Documentation](/api/graphql/shop/reviews)

---

## Admin API Quick Links

### Product Management
- **Create Product** - New simple or configurable products
- **Update Product** - Modify product details
- **Delete Product** - Remove products
- **Bulk Operations** - Update multiple products
- **Manage Images** - Add/remove product images
- [Full Products Documentation](/api/graphql/admin/products)

### Order Management
- **List Orders** - With filters and pagination
- **Order Details** - Full order information
- **Create Shipment** - Ship order items
- **Create Invoice** - Generate invoices
- **Create Refund** - Process refunds
- **Add Comments** - Track order notes
- [Full Orders Documentation](/api/graphql/admin/orders)

### Inventory Management
- **Update Stock** - Warehouse inventory levels
- **Adjust Inventory** - Add/subtract stock
- **Transfer Stock** - Move between warehouses
- **Warehouse Management** - Create/update warehouses
- **Inventory History** - Track changes
- [Full Inventory Documentation](/api/graphql/admin/inventory)

### Promotions & Discounts
- **Create Coupons** - Discount codes
- **Cart Rules** - Condition-based discounts
- **Assign Products** - Coupon product scope
- **Track Usage** - Coupon analytics
- [Full Promotions Documentation](/api/graphql/admin/promotions)

### Attributes & Categories
- **Create Attributes** - Product attributes with options
- **Manage Attributes** - Update and delete
- **Attribute Sets** - Group related attributes
- **Category Management** - Create/update categories
- **Assign Products** - Link to categories
- [Full Attributes Documentation](/api/graphql/admin/attributes)
- [Full Categories Documentation](/api/graphql/admin/categories)

### Analytics & Reports
- **Sales Reports** - Revenue, orders, refunds
- **Product Reports** - Units sold, revenue
- **Customer Reports** - Customer metrics
- **Inventory Reports** - Stock analysis
- **Export Data** - CSV/JSON exports
- **Scheduled Reports** - Automated delivery
- [Full Reports Documentation](/api/graphql/admin/reports)

---

## Authentication Methods

### Guest Token (Shop API)
```graphql
mutation {
  generateGuestToken {
    token
  }
}
```

### Customer Login (Shop API)
```graphql
mutation {
  customerLogin(email: "user@example.com", password: "password") {
    accessToken
    customer { id email }
  }
}
```

### Admin Login (Admin API)
```graphql
mutation {
  adminLogin(email: "admin@example.com", password: "password") {
    accessToken
    admin { id name }
  }
}
```

---

## Common Query Patterns

### Paginated Results
```graphql
query {
  products(first: 20, after: "cursor") {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node { id name }
    }
  }
}
```

### Filtered Results
```graphql
query {
  products(
    filters: {
      status: "active"
      priceFrom: 10
      priceTo: 100
    }
  ) {
    edges { node { id } }
  }
}
```

### Nested Relations
```graphql
query {
  product(id: "1") {
    id
    name
    images { edges { node { url } } }
    attributes { edges { node { code value } } }
  }
}
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Successful query/mutation |
| 400 | Bad request - invalid syntax |
| 401 | Unauthorized - invalid/missing token |
| 403 | Forbidden - insufficient permissions |
| 404 | Not found - resource doesn't exist |
| 429 | Rate limited - too many requests |
| 500 | Server error |

---

## Error Handling

### Sample Error Response
```json
{
  "errors": [
    {
      "message": "Product not found",
      "extensions": {
        "code": "PRODUCT_NOT_FOUND",
        "category": "NOT_FOUND"
      }
    }
  ]
}
```

### Common Error Codes
- `PRODUCT_NOT_FOUND` - Product doesn't exist
- `INVALID_INPUT` - Invalid query parameters
- `AUTHENTICATION_ERROR` - Invalid credentials
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

## Useful Resources

- [GraphQL Playground Guide](/api/graphql/playground) - Interactive testing
- [Integration Guides](/api/graphql/integrations) - Language examples
- [Best Practices](/api/graphql/best-practices) - Production tips
- [Full API Overview](/api/graphql/index) - All resources

---

**Need Help?**
- Check [Best Practices](/api/graphql/best-practices) for common issues
- Review [Integration Guides](/api/graphql/integrations) for code examples
- Visit [Bagisto Forums](https://forums.bagisto.com/) for community support
