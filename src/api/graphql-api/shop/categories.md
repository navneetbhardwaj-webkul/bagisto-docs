# Shop API - Categories

Manage and retrieve product categories.

## Get Category Tree

Retrieve the complete hierarchical category structure.

```graphql
query GetCategoryTree($parentId: Int!) {
  treeCategories(parentId: $parentId) {
    id
    position
    status
    translation {
      name
      slug
      urlPath
    }
    children {
      edges {
        node {
          id
          position
          translation {
            name
            slug
          }
          children {
            edges {
              node {
                id
                translation {
                  name
                  slug
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

**Variables:**
```json
{
  "parentId": 1
}
```

## Get Products by Category

Retrieve products from a specific category.

```graphql
query GetCategoryProducts($categoryId: Int!, $first: Int!) {
  products(categoryId: $categoryId, first: $first) {
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

## Related Resources
- [Products](/api/graphql/shop/products)
- [Cart](/api/graphql/shop/cart)
