---
outline: false
examples:
  - id: get-categories-basic
    title: Get Categories - Basic
    description: Retrieve categories with pagination using first and after arguments.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
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
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "position": 1,
                  "status": "1",
                  "translation": {
                    "name": "Men",
                    "slug": "men",
                    "urlPath": "men"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/2",
                  "_id": 2,
                  "position": 2,
                  "status": "1",
                  "translation": {
                    "name": "Woman",
                    "slug": "woman",
                    "urlPath": "woman"
                  }
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "Mg=="
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_FIRST_VALUE
        cause: First argument exceeds maximum allowed value or is negative
        solution: Use first value between 1 and 100
      - error: INVALID_CURSOR
        cause: Pagination cursor is invalid
        solution: Use cursor values from previous response

  - id: get-categories-complete
    title: Get Categories - Complete Details
    description: Retrieve categories with all fields including logos, banners, translations, and children.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
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
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
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
              }
            ],
            "pageInfo": {
              "endCursor": "Mg==",
              "startCursor": "MQ==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 8
          }
        }
      }
    commonErrors:
      - error: INVALID_FIRST_VALUE
        cause: First argument value is out of bounds
        solution: Use first value between 1 and 100
      - error: INVALID_CURSOR
        cause: Cursor format is invalid or expired
        solution: Use cursor values from the previous response

  - id: get-categories-with-pagination
    title: Get Categories with Cursor Pagination
    description: Paginate through categories using cursor-based pagination for optimal performance.
    query: |
      query getCategories($first: Int, $after: String, $last: Int, $before: String) {
        categories(first: $first, after: $after, last: $last, before: $before) {
          edges {
            node {
              id
              _id
              position
              translation {
                name
                slug
              }
              status
              children {
                totalCount
              }
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
    variables: |
      {
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/categories/2",
                  "_id": 2,
                  "position": 1,
                  "translation": {
                    "name": "Men",
                    "slug": "men"
                  },
                  "status": "1",
                  "children": {
                    "totalCount": 4
                  }
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/4",
                  "_id": 4,
                  "position": 2,
                  "translation": {
                    "name": "Woman",
                    "slug": "woman"
                  },
                  "status": "1",
                  "children": {
                    "totalCount": 4
                  }
                },
                "cursor": "Mg=="
              }
            ],
            "pageInfo": {
              "endCursor": "Mg==",
              "startCursor": "MQ==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 8
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor is invalid
        solution: Use cursor from previous response pageInfo
      - error: INVALID_PAGINATION_PARAMS
        cause: Using both forward and backward pagination
        solution: Use either (first, after) or (last, before), not both

  - id: get-categories-with-children
    title: Get Categories with Child Categories
    description: Retrieve categories along with their child categories for hierarchical display.
    query: |
      query getCategories($first: Int) {
        categories(first: $first) {
          edges {
            node {
              id
              _id
              position
              translation {
                name
                slug
              }
              children(first: 50) {
                edges {
                  node {
                    id
                    _id
                    position
                    translation {
                      name
                      slug
                    }
                  }
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 5
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/categories/2",
                  "_id": 2,
                  "position": 1,
                  "translation": {
                    "name": "Men",
                    "slug": "men"
                  },
                  "children": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/categories/6",
                          "_id": 6,
                          "position": 1,
                          "translation": {
                            "name": "Formal wear",
                            "slug": "formal-wear-men"
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/7",
                          "_id": 7,
                          "position": 2,
                          "translation": {
                            "name": "Casual wear",
                            "slug": "casual-wear-men"
                          }
                        }
                      }
                    ],
                    "totalCount": 4
                  }
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ=="
            },
            "totalCount": 8
          }
        }
      }
    commonErrors:
      - error: INVALID_FIRST_VALUE
        cause: First value exceeds maximum
        solution: Use value between 1 and 100
---

# Categories

## About

The `categories` query retrieves the complete list of product categories with full details including translations, media assets, and hierarchy information. Use this query to:

- Build category navigation menus and sidebars
- Display breadcrumb paths for product browsing
- Implement category-based product filtering
- Create category landing pages and collections
- Sync category structure with external systems
- Display category metadata (images, descriptions, logos, banners)
- Support multi-language category content
- Show category hierarchy with children counts

This query supports full pagination with cursor-based navigation and includes complete SEO metadata and display settings for each category.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of categories to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Pagination cursor for forward navigation. Use with `first`. |
| `last` | `Int` | ❌ No | Number of categories for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Pagination cursor for backward navigation. Use with `last`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique category API identifier. |
| `_id` | `Int!` | Numeric category ID. |
| `position` | `Int` | Display position among siblings. |
| `logoPath` | `String` | File path to category logo. |
| `logoUrl` | `String` | Full URL to category logo image. |
| `bannerPath` | `String` | File path to category banner. |
| `bannerUrl` | `String` | Full URL to category banner image. |
| `status` | `Int` | Category status (0 = inactive, 1 = active). |
| `displayMode` | `String` | Display mode: `products_only`, `category_and_products`, `products_and_description`. |
| `_lft` | `Int` | Left value for nested set tree structure. |
| `_rgt` | `Int` | Right value for nested set tree structure. |
| `additional` | `String` | Additional metadata (JSON format). |
| `translation` | `CategoryTranslation!` | Default locale translation. |
| `translation.id` | `ID!` | Translation identifier. |
| `translation._id` | `Int!` | Numeric translation ID. |
| `translation.categoryId` | `Int!` | Associated category ID. |
| `translation.name` | `String!` | Category name in current language. |
| `translation.slug` | `String!` | URL slug for the category. |
| `translation.urlPath` | `String!` | Full URL path including hierarchy. |
| `translation.description` | `String` | Category description text. |
| `translation.metaTitle` | `String` | SEO meta title tag. |
| `translation.metaDescription` | `String` | SEO meta description. |
| `translation.metaKeywords` | `String` | SEO keywords. |
| `translation.localeId` | `Int` | Locale identifier. |
| `translation.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translations` | `CategoryTranslationCollection!` | All available translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.totalCount` | `Int!` | Total translations for this category. |
| `createdAt` | `DateTime!` | Category creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `url` | `String` | Full category URL. |
| `children` | `CategoryCollection!` | Child categories. |
| `children.edges` | `[Edge!]!` | Child category edges. |
| `children.totalCount` | `Int!` | Total child categories. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total categories matching filters. |

## Use Cases

### 1. Main Navigation Menu
Use the "Optimized for Navigation" example for rendering dropdown category menus.

### 2. Multi-Language Support
Use the "With All Translations" example to display categories in multiple languages.

### 3. Category Listing Page
Use the "Complete Details" example for full category information with images.

### 4. Pagination
Use the "With Cursor Pagination" example for handling large category lists.

## Best Practices

1. **Request Only Needed Fields** - Minimize data transfer by selecting only required fields
2. **Use Pagination** - Always use pagination for better performance with many categories
3. **Cache Results** - Categories change infrequently, cache the full list
4. **Filter by Status** - Only fetch active categories by default
5. **Include SEO Data** - Always fetch meta tags for search engine optimization
6. **Use Translations** - Fetch translations for multi-language support

## Related Resources

- [Tree Categories](/api/graphql/shop/queries/tree-categories) - Hierarchical category tree for navigation
- [Get Products](/api/graphql/shop/queries/get-products) - Query products within a category
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources


