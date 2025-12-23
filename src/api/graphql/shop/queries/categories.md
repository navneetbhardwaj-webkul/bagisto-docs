---
outline: false
examples:
  - id: get-categories-basic
    title: Get Categories - Basic
    description: Retrieve all categories with basic information and pagination.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              name
              slug
              description
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
                  "name": "Electronics",
                  "slug": "electronics",
                  "description": "Electronic products and gadgets"
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/2",
                  "_id": 2,
                  "name": "Fashion",
                  "slug": "fashion",
                  "description": "Clothing and fashion items"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ=="
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_PAGINATION
        cause: Invalid first or after parameter
        solution: Use valid pagination values
      - error: UNAUTHORIZED
        cause: Invalid or missing authentication token
        solution: Provide valid authentication credentials

  - id: get-categories-complete
    title: Get Categories - Complete Details
    description: Retrieve all categories with complete details including logos, banners, translations, and children.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              position
              logoPath
              logoUrl
              status
              displayMode
              _lft
              _rgt
              additional
              bannerPath
              bannerUrl
              translation {
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
              translations {
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
              createdAt
              updatedAt
              url
              children {
                edges {
                  node {
                    id
                    _id
                    position
                    logoUrl
                    status
                    translation {
                      name
                      slug
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                }
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
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "position": 1,
                  "logoPath": "/categories/electronics-logo.png",
                  "logoUrl": "https://example.com/categories/electronics-logo.png",
                  "status": 1,
                  "displayMode": "products_and_description",
                  "_lft": 1,
                  "_rgt": 10,
                  "additional": "{}",
                  "bannerPath": "/categories/electronics-banner.jpg",
                  "bannerUrl": "https://example.com/categories/electronics-banner.jpg",
                  "translation": {
                    "id": "/api/shop/category-translations/1",
                    "_id": 1,
                    "categoryId": 1,
                    "name": "Electronics",
                    "slug": "electronics",
                    "urlPath": "electronics",
                    "description": "All electronic devices and gadgets",
                    "metaTitle": "Electronics - Best Deals Online",
                    "metaDescription": "Shop the latest electronics and gadgets",
                    "metaKeywords": "electronics, gadgets, devices",
                    "localeId": 1,
                    "locale": "en"
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/category-translations/1",
                          "_id": 1,
                          "categoryId": 1,
                          "name": "Electronics",
                          "slug": "electronics",
                          "urlPath": "electronics",
                          "description": "All electronic devices and gadgets",
                          "metaTitle": "Electronics - Best Deals Online",
                          "metaDescription": "Shop the latest electronics and gadgets",
                          "metaKeywords": "electronics, gadgets, devices",
                          "localeId": 1,
                          "locale": "en"
                        },
                        "cursor": "MA=="
                      },
                      {
                        "node": {
                          "id": "/api/shop/category-translations/2",
                          "_id": 2,
                          "categoryId": 1,
                          "name": "الإلكترونيات",
                          "slug": "electronics-ar",
                          "urlPath": "electronics-ar",
                          "description": "جميع الأجهزة الإلكترونية والغجزم",
                          "metaTitle": "الإلكترونيات - أفضل العروض",
                          "metaDescription": "تسوق أحدث الأجهزة الإلكترونية",
                          "metaKeywords": "إلكترونيات, أجهزة",
                          "localeId": 2,
                          "locale": "ar"
                        },
                        "cursor": "MQ=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  },
                  "createdAt": "2024-01-15T10:30:00Z",
                  "updatedAt": "2024-12-20T14:20:00Z",
                  "url": "https://example.com/electronics",
                  "children": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/categories/5",
                          "_id": 5,
                          "position": 1,
                          "logoUrl": "https://example.com/categories/mobiles-logo.png",
                          "status": 1,
                          "translation": {
                            "name": "Mobile Phones",
                            "slug": "mobile-phones"
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/6",
                          "_id": 6,
                          "position": 2,
                          "logoUrl": "https://example.com/categories/laptops-logo.png",
                          "status": 1,
                          "translation": {
                            "name": "Laptops",
                            "slug": "laptops"
                          }
                        }
                      }
                    ],
                    "pageInfo": {
                      "hasNextPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "MA=="
              }
            ],
            "pageInfo": {
              "endCursor": "MA==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: INVALID_PAGINATION
        cause: Invalid first or after parameter
        solution: Use valid pagination values
      - error: UNAUTHORIZED
        cause: Invalid or missing authentication token
        solution: Provide valid authentication credentials

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
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "position": 1,
                  "translation": {
                    "name": "Electronics",
                    "slug": "electronics"
                  },
                  "status": 1,
                  "children": {
                    "totalCount": 5
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/2",
                  "_id": 2,
                  "position": 2,
                  "translation": {
                    "name": "Fashion",
                    "slug": "fashion"
                  },
                  "status": 1,
                  "children": {
                    "totalCount": 3
                  }
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MA==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 15
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

  - id: get-categories-with-translations
    title: Get Categories with All Translations
    description: Retrieve categories with complete translation information for multi-language support.
    query: |
      query getCategories($first: Int) {
        categories(first: $first) {
          edges {
            node {
              id
              _id
              translation {
                id
                categoryId
                name
                slug
                urlPath
                description
                metaTitle
                metaDescription
                metaKeywords
                locale
              }
              translations {
                edges {
                  node {
                    id
                    categoryId
                    name
                    slug
                    urlPath
                    description
                    metaTitle
                    metaDescription
                    metaKeywords
                    locale
                  }
                }
                totalCount
              }
            }
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
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "translation": {
                    "id": "/api/shop/category-translations/1",
                    "categoryId": 1,
                    "name": "Electronics",
                    "slug": "electronics",
                    "urlPath": "electronics",
                    "description": "Electronic products",
                    "metaTitle": "Electronics",
                    "metaDescription": "Shop electronics",
                    "metaKeywords": "electronics",
                    "locale": "en"
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/category-translations/1",
                          "categoryId": 1,
                          "name": "Electronics",
                          "slug": "electronics",
                          "urlPath": "electronics",
                          "description": "Electronic products",
                          "metaTitle": "Electronics",
                          "metaDescription": "Shop electronics",
                          "metaKeywords": "electronics",
                          "locale": "en"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/category-translations/2",
                          "categoryId": 1,
                          "name": "Électronique",
                          "slug": "electronique",
                          "urlPath": "electronique",
                          "description": "Produits électroniques",
                          "metaTitle": "Électronique",
                          "metaDescription": "Acheter des électroniques",
                          "metaKeywords": "électronique",
                          "locale": "fr"
                        }
                      }
                    ],
                    "totalCount": 2
                  }
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: Category has no translations
        solution: Check if translations are configured

  - id: get-categories-optimized
    title: Get Categories - Optimized for Navigation
    description: Query optimized for rendering category navigation with minimal data transfer.
    query: |
      query getCategories($first: Int) {
        categories(first: $first) {
          edges {
            node {
              id
              _id
              position
              logoUrl
              bannerUrl
              status
              displayMode
              url
              translation {
                name
                slug
                metaTitle
                metaDescription
              }
              children {
                totalCount
              }
            }
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
        "first": 20
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
                  "logoUrl": "https://example.com/categories/electronics-logo.png",
                  "bannerUrl": "https://example.com/categories/electronics-banner.jpg",
                  "status": 1,
                  "displayMode": "products_and_description",
                  "url": "https://example.com/electronics",
                  "translation": {
                    "name": "Electronics",
                    "slug": "electronics",
                    "metaTitle": "Electronics - Best Deals",
                    "metaDescription": "Shop the latest electronics"
                  },
                  "children": {
                    "totalCount": 5
                  }
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: NO_CATEGORIES
        cause: No categories available
        solution: Create categories in admin panel

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

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Number of categories to return (forward pagination). Max: 100. |
| `after` | `String` | Pagination cursor for forward navigation. |
| `last` | `Int` | Number of categories for backward pagination. Max: 100. |
| `before` | `String` | Pagination cursor for backward navigation. |
| `parent_id` | `ID` | Filter by parent category ID. Returns only direct children. |
| `status` | `Int` | Filter by status: `0` (inactive), `1` (active). Default: active only. |
| `include_inactive` | `Boolean` | Include inactive categories. Default: `false` |

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


