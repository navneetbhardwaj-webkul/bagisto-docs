---
outline: false
examples:
  - id: tree-categories-basic
    title: Tree Categories - Basic
    description: Retrieve root and child categories with their basic hierarchical structure.
    query: |
      query treeCategories {
        treeCategories(parentId: 1) {
          id
          _id
          position
          status
          translation {
            name
            slug
            urlPath
          }
          children(first: 100) {
            edges {
              node {
                id
                _id
                position
                status
                translation {
                  name
                  slug
                  urlPath
                }
              }
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "treeCategories": [
            {
              "id": "/api/shop/categories/2",
              "_id": 2,
              "position": 1,
              "status": "1",
              "translation": {
                "name": "Men",
                "slug": "men",
                "urlPath": "men"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/6",
                      "_id": 6,
                      "position": 1,
                      "status": "1",
                      "translation": {
                        "name": "Formal wear",
                        "slug": "formal-wear-men",
                        "urlPath": "men/formal-wear-men"
                      }
                    }
                  },
                  {
                    "node": {
                      "id": "/api/shop/categories/7",
                      "_id": 7,
                      "position": 2,
                      "status": "1",
                      "translation": {
                        "name": "Casual wear",
                        "slug": "casual-wear-men",
                        "urlPath": "men/casual-wear-men"
                      }
                    }
                  }
                ]
              }
            },
            {
              "id": "/api/shop/categories/4",
              "_id": 4,
              "position": 2,
              "status": "1",
              "translation": {
                "name": "Woman",
                "slug": "woman",
                "urlPath": "woman"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/15",
                      "_id": 15,
                      "position": 2,
                      "status": "1",
                      "translation": {
                        "name": "Casual Wear",
                        "slug": "casual-wear-female",
                        "urlPath": "woman/casual-wear-female"
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    commonErrors:
      - error: INVALID_PARENT_ID
        cause: Parent category ID format is invalid or does not exist
        solution: Provide a valid parent category ID

  - id: tree-categories-complete
    title: Tree Categories - Complete Details
    description: Retrieve categories with all fields including logos, banners, display mode, and translations.
    query: |
      query treeCategories {
        treeCategories(parentId: 1) {
          id
          _id
          position
          status
          logoPath
          displayMode
          _lft
          _rgt
          additional
          bannerPath
          createdAt
          updatedAt
          url
          logoUrl
          bannerUrl
          translation {
            name
            slug
            urlPath
          }
          children(first: 100) {
            edges {
              node {
                id
                _id
                position
                status
                translation {
                  name
                  slug
                  urlPath
                }
              }
            }
          }
          translations(first: 1) {
            edges {
              node {
                id
                _id
                categoryId
                name
                slug
                urlPath
                description
                metaTitle
                metaDescription
                metaKeywords
                localeId
                locale
              }
              cursor
            }
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            totalCount
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "treeCategories": [
            {
              "id": "/api/shop/categories/2",
              "_id": 2,
              "position": 1,
              "status": "1",
              "logoPath": "category/2/OYsuHioryn5KrOE7p8wQ2hQ3BReXY5CSbDzhvEk8.webp",
              "displayMode": "products_and_description",
              "_lft": "14",
              "_rgt": "23",
              "additional": null,
              "bannerPath": null,
              "createdAt": "2023-11-02T16:41:54+05:30",
              "updatedAt": "2023-11-29T10:56:40+05:30",
              "url": "http://127.0.0.1:8000/men",
              "logoUrl": "http://127.0.0.1:8000/storage/category/2/OYsuHioryn5KrOE7p8wQ2hQ3BReXY5CSbDzhvEk8.webp",
              "bannerUrl": null,
              "translation": {
                "name": "Men",
                "slug": "men",
                "urlPath": "men"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/6",
                      "_id": 6,
                      "position": 1,
                      "status": "1",
                      "translation": {
                        "name": "Formal wear",
                        "slug": "formal-wear-men",
                        "urlPath": "men/formal-wear-men"
                      }
                    }
                  },
                  {
                    "node": {
                      "id": "/api/shop/categories/7",
                      "_id": 7,
                      "position": 2,
                      "status": "1",
                      "translation": {
                        "name": "Casual wear",
                        "slug": "casual-wear-men",
                        "urlPath": "men/casual-wear-men"
                      }
                    }
                  }
                ]
              },
              "translations": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/category_translations/2",
                      "_id": 2,
                      "categoryId": "2",
                      "name": "Men",
                      "slug": "men",
                      "urlPath": "men",
                      "description": "<p>Men</p>",
                      "metaTitle": "",
                      "metaDescription": "",
                      "metaKeywords": "",
                      "localeId": "1",
                      "locale": "en"
                    },
                    "cursor": "MA=="
                  }
                ],
                "pageInfo": {
                  "endCursor": "MA==",
                  "startCursor": "MA==",
                  "hasNextPage": true,
                  "hasPreviousPage": false
                },
                "totalCount": 2
              }
            }
          ]
        }
      }
    commonErrors:
      - error: INVALID_PARENT_ID
        cause: Parent category ID is invalid or does not exist
        solution: Use a valid parent category ID

  - id: tree-categories-with-parent-filter
    title: Tree Categories - Filter by Parent ID
    description: Retrieve categories filtered by a specific parent ID to get a subtree.
    query: |
      query treeCategories {
        treeCategories(parentId: 2) {
          id
          _id
          position
          status
          logoPath
          displayMode
          translation {
            name
            slug
            urlPath
          }
          children(first: 50) {
            edges {
              node {
                id
                _id
                position
                status
                translation {
                  name
                  slug
                  urlPath
                }
              }
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "treeCategories": [
            {
              "id": "/api/shop/categories/6",
              "_id": 6,
              "position": 1,
              "status": "1",
              "logoPath": "category/6/logo.webp",
              "displayMode": "products_and_description",
              "translation": {
                "name": "Formal wear",
                "slug": "formal-wear-men",
                "urlPath": "men/formal-wear-men"
              },
              "children": {
                "edges": []
              }
            },
            {
              "id": "/api/shop/categories/7",
              "_id": 7,
              "position": 2,
              "status": "1",
              "logoPath": "category/7/logo.webp",
              "displayMode": "products_and_description",
              "translation": {
                "name": "Casual wear",
                "slug": "casual-wear-men",
                "urlPath": "men/casual-wear-men"
              },
              "children": {
                "edges": []
              }
            }
          ]
        }
      }
    commonErrors:
      - error: INVALID_PARENT_ID
        cause: Parent category ID is invalid
        solution: Provide a valid parent category ID that exists in the system
---

# Tree Categories

## About

The `treeCategories` query retrieves categories in a hierarchical tree structure, useful for navigation menus and category browsing. This query is essential for:

- Building category navigation menus
- Displaying category hierarchies for storefront
- Managing nested category structures
- Fetching categories with their parent-child relationships
- Building breadcrumb navigation
- Creating category tree widgets

The query returns an array of categories (not a paginated connection) with nested children and translations. Use the `parentId` argument to filter categories by their parent.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `parentId` | `Int` | ✅ Yes | The numeric ID of the parent category to filter by. Specifies which level of the tree to retrieve. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `treeCategories` | `[Category!]!` | Array of category objects matching the parent ID filter. |

## Category Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique identifier in format `/api/shop/categories/{id}` |
| `_id` | `Int!` | Numeric identifier for the category |
| `position` | `Int!` | Display order position of the category |
| `status` | `String!` | Status of the category ("1" for active, "0" for inactive) |
| `logoPath` | `String` | File path to the category logo |
| `displayMode` | `String` | Display mode (e.g., "products_and_description", "products_only") |
| `_lft` | `String` | Left pointer for nested set tree structure |
| `_rgt` | `String` | Right pointer for nested set tree structure |
| `additional` | `Mixed` | Additional category attributes |
| `bannerPath` | `String` | File path to the category banner |
| `createdAt` | `String!` | Creation timestamp (ISO 8601 format) |
| `updatedAt` | `String!` | Last update timestamp (ISO 8601 format) |
| `url` | `String` | Full URL to the category page |
| `logoUrl` | `String` | Full URL to the category logo image |
| `bannerUrl` | `String` | Full URL to the category banner image |
| `translation` | `CategoryTranslation` | Default translation object with name, slug, and urlPath |
| `translations` | `Connection` | Paginated translations for all locales |
| `children` | `Connection` | Paginated child categories with their details |

## Common Use Cases

### Get Root Categories for Main Menu

```graphql
query GetRootCategories {
  treeCategories(parentId: 1) {
    id
    _id
    position
    status
    translation {
      name
      slug
      urlPath
    }
    logoUrl
    children(first: 50) {
      edges {
        node {
          id
          position
          translation {
            name
            slug
          }
        }
      }
    }
  }
}
```

### Get Category Tree with Full Details

```graphql
query GetCategoryTree {
  treeCategories(parentId: 1) {
    id
    _id
    position
    status
    logoPath
    logoUrl
    bannerUrl
    displayMode
    url
    translation {
      name
      slug
      description
    }
    children(first: 100) {
      edges {
        node {
          id
          position
          translation {
            name
            slug
            urlPath
          }
        }
      }
    }
  }
}
```

### Get Specific Subtree by Parent

```graphql
query GetCategorySubtree {
  treeCategories(parentId: 2) {
    id
    position
    translation {
      name
      slug
    }
    children(first: 50) {
      edges {
        node {
          id
          position
          translation {
            name
            slug
            urlPath
          }
        }
      }
    }
  }
}
```

### Get Categories with Translations

```graphql
query GetCategoriesWithTranslations {
  treeCategories(parentId: 1) {
    id
    position
    translation {
      name
      slug
      description
    }
    translations(first: 10) {
      edges {
        node {
          locale
          name
          slug
          description
        }
      }
      totalCount
    }
    children(first: 100) {
      edges {
        node {
          id
          position
          translation {
            name
          }
        }
      }
    }
  }
}
```

## Error Handling

### Invalid Parent ID - Non-integer Value

```json
{
  "errors": [
    {
      "message": "Int cannot represent non-integer value: dffddf"
    }
  ]
}
```

### Invalid Parent ID - String Instead of Integer

```json
{
  "errors": [
    {
      "message": "Int cannot represent non-integer value: \"1111\""
    }
  ]
}
```

### Parent ID Not Found

```json
{
  "data": {
    "treeCategories": []
  }
}
```

## Best Practices

1. **Always Provide parentId** - The parentId parameter is required
2. **Use First for Children Pagination** - Limit child categories with the `first` argument (e.g., `first: 100`)
3. **Request Only Needed Fields** - Reduce payload by selecting specific fields
4. **Cache Navigation Data** - Categories change infrequently; implement caching
5. **Handle Status Filtering** - Filter by status="1" on client side if needed
6. **Use Translation Fields** - Include translation data for multi-language support
7. **Paginate Nested Collections** - Use `first` argument for children and translations
8. **Use Position Field** - Order results by position field for proper display

## Related Resources

- [Get Single Category](/api/graphql/shop/queries/get-category) - Retrieve a single category by ID
- [Get Categories](/api/graphql/shop/queries/categories) - List all categories with pagination
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
