---
outline: false
examples:
  - id: tree-categories-basic
    title: Get Tree Categories - Basic
    description: Retrieve root categories with their hierarchical structure for navigation menus.
    query: |
      query treeCategories {
        treeCategories {
          id
          _id
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
              "id": "/api/shop/categories/1",
              "_id": 1,
              "position": 1,
              "status": 1,
              "translation": {
                "name": "Electronics",
                "slug": "electronics",
                "urlPath": "electronics"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/5",
                      "_id": 5,
                      "position": 1,
                      "status": 1,
                      "translation": {
                        "name": "Mobile Phones",
                        "slug": "mobile-phones",
                        "urlPath": "electronics/mobile-phones"
                      }
                    }
                  },
                  {
                    "node": {
                      "id": "/api/shop/categories/6",
                      "_id": 6,
                      "position": 2,
                      "status": 1,
                      "translation": {
                        "name": "Laptops",
                        "slug": "laptops",
                        "urlPath": "electronics/laptops"
                      }
                    }
                  }
                ]
              }
            },
            {
              "id": "/api/shop/categories/2",
              "_id": 2,
              "position": 2,
              "status": 1,
              "translation": {
                "name": "Fashion",
                "slug": "fashion",
                "urlPath": "fashion"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/7",
                      "_id": 7,
                      "position": 1,
                      "status": 1,
                      "translation": {
                        "name": "Men Clothing",
                        "slug": "men-clothing",
                        "urlPath": "fashion/men-clothing"
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
      - error: UNAUTHORIZED
        cause: Invalid or missing authentication token
        solution: Provide valid authentication credentials
      - error: INVALID_PARENT_ID
        cause: Parent category ID does not exist
        solution: Verify the parent category ID is valid

  - id: tree-categories-with-parent
    title: Get Tree Categories with Parent ID Filter
    description: Retrieve categories filtered by parent ID to get specific subtrees for navigation.
    query: |
      query treeCategories($parentId: Int!) {
        treeCategories(parentId: $parentId) {
          id
          _id
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
                _id
                position
                translation {
                  name
                  slug
                  urlPath
                }
                children {
                  edges {
                    node {
                      id
                      _id
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
    variables: |
      {
        "parentId": 1
      }
    response: |
      {
        "data": {
          "treeCategories": [
            {
              "id": "/api/shop/categories/1",
              "_id": 1,
              "position": 1,
              "status": 1,
              "translation": {
                "name": "Electronics",
                "slug": "electronics",
                "urlPath": "electronics"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/5",
                      "_id": 5,
                      "position": 1,
                      "translation": {
                        "name": "Mobile Phones",
                        "slug": "mobile-phones",
                        "urlPath": "electronics/mobile-phones"
                      },
                      "children": {
                        "edges": [
                          {
                            "node": {
                              "id": "/api/shop/categories/8",
                              "_id": 8,
                              "translation": {
                                "name": "Smartphones",
                                "slug": "smartphones"
                              }
                            }
                          }
                        ]
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
      - error: PARENT_NOT_FOUND
        cause: Parent category with given ID does not exist
        solution: Verify the parent ID exists in the system

  - id: tree-categories-full-details
    title: Get Tree Categories - Full Details with Translations
    description: Retrieve complete category tree with all details, translations, banners, and logos for full-featured navigation.
    query: |
      query treeCategories {
        treeCategories {
          id
          _id
          position
          logoPath
          logoUrl
          bannerPath
          bannerUrl
          displayMode
          status
          _lft
          _rgt
          createdAt
          updatedAt
          url
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
                locale
              }
            }
            totalCount
          }
          children {
            edges {
              node {
                id
                _id
                position
                logoUrl
                bannerUrl
                status
                translation {
                  name
                  slug
                  description
                }
                translations {
                  totalCount
                }
                children {
                  totalCount
                }
              }
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
              "id": "/api/shop/categories/1",
              "_id": 1,
              "position": 1,
              "logoPath": "/categories/electronics-logo.png",
              "logoUrl": "https://example.com/categories/electronics-logo.png",
              "bannerPath": "/categories/electronics-banner.jpg",
              "bannerUrl": "https://example.com/categories/electronics-banner.jpg",
              "displayMode": "products_and_description",
              "status": 1,
              "_lft": 1,
              "_rgt": 12,
              "createdAt": "2024-01-15T10:30:00Z",
              "updatedAt": "2024-12-20T14:20:00Z",
              "url": "https://example.com/electronics",
              "translation": {
                "id": "/api/shop/category-translations/1",
                "_id": 1,
                "categoryId": 1,
                "name": "Electronics",
                "slug": "electronics",
                "urlPath": "electronics",
                "description": "All electronic devices and gadgets",
                "metaTitle": "Electronics - Best Deals",
                "metaDescription": "Shop the latest electronics",
                "metaKeywords": "electronics, gadgets, devices",
                "locale": "en"
              },
              "translations": {
                "edges": [],
                "totalCount": 3
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/5",
                      "_id": 5,
                      "position": 1,
                      "logoUrl": "https://example.com/categories/mobiles-logo.png",
                      "bannerUrl": "https://example.com/categories/mobiles-banner.jpg",
                      "status": 1,
                      "translation": {
                        "name": "Mobile Phones",
                        "slug": "mobile-phones",
                        "description": "Smartphones and mobile devices"
                      },
                      "translations": {
                        "totalCount": 2
                      },
                      "children": {
                        "totalCount": 3
                      }
                    }
                  }
                ],
                "totalCount": 4
              }
            }
          ]
        }
      }
    commonErrors:
      - error: NO_CATEGORIES
        cause: No categories available in the system
        solution: Create categories in the admin panel

  - id: tree-categories-navigation-menu
    title: Get Tree Categories - Optimized for Navigation Menu
    description: Query optimized for rendering a multi-level dropdown navigation menu with minimal data transfer.
    query: |
      query treeCategories {
        treeCategories {
          _id
          position
          translation {
            name
            slug
          }
          url
          children {
            edges {
              node {
                _id
                position
                translation {
                  name
                  slug
                }
                url
                children {
                  edges {
                    node {
                      _id
                      translation {
                        name
                        slug
                      }
                      url
                    }
                  }
                  totalCount
                }
              }
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
              "_id": 1,
              "position": 1,
              "translation": {
                "name": "Electronics",
                "slug": "electronics"
              },
              "url": "https://example.com/electronics",
              "children": {
                "edges": [
                  {
                    "node": {
                      "_id": 5,
                      "position": 1,
                      "translation": {
                        "name": "Mobile Phones",
                        "slug": "mobile-phones"
                      },
                      "url": "https://example.com/electronics/mobile-phones",
                      "children": {
                        "edges": [
                          {
                            "node": {
                              "_id": 8,
                              "translation": {
                                "name": "Smartphones",
                                "slug": "smartphones"
                              },
                              "url": "https://example.com/electronics/mobile-phones/smartphones"
                            }
                          }
                        ],
                        "totalCount": 1
                      }
                    }
                  }
                ],
                "totalCount": 2
              }
            }
          ]
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: User is not authenticated
        solution: Login with valid credentials

  - id: tree-categories-with-pagination
    title: Get Tree Categories with Paginated Children
    description: Retrieve category tree with paginated children collections for handling large category structures.
    query: |
      query treeCategories($first: Int, $after: String) {
        treeCategories {
          id
          _id
          translation {
            name
            slug
          }
          children(first: $first, after: $after) {
            edges {
              node {
                id
                _id
                translation {
                  name
                  slug
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
      }
    variables: |
      {
        "first": 5,
        "after": null
      }
    response: |
      {
        "data": {
          "treeCategories": [
            {
              "id": "/api/shop/categories/1",
              "_id": 1,
              "translation": {
                "name": "Electronics",
                "slug": "electronics"
              },
              "children": {
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/categories/5",
                      "_id": 5,
                      "translation": {
                        "name": "Mobile Phones",
                        "slug": "mobile-phones"
                      }
                    },
                    "cursor": "MA=="
                  },
                  {
                    "node": {
                      "id": "/api/shop/categories/6",
                      "_id": 6,
                      "translation": {
                        "name": "Laptops",
                        "slug": "laptops"
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
                "totalCount": 12
              }
            }
          ]
        }
      }
    commonErrors:
      - error: INVALID_PAGINATION_CURSOR
        cause: Cursor format is invalid
        solution: Use cursor values from previous response

---

# Tree Categories

## About

The `treeCategories` query retrieves categories in a hierarchical tree structure, perfect for rendering navigation menus, breadcrumbs, and category hierarchies in e-commerce websites. This query supports:

- **Multi-level Category Hierarchies** - Display parent-child category relationships
- **Navigation Menus** - Render dropdown menus with multiple levels
- **Breadcrumb Navigation** - Build breadcrumb trails using the tree structure
- **SEO Metadata** - Include meta tags, descriptions for each category
- **Media Assets** - Fetch logos, banners, and display modes
- **Multi-language Support** - Retrieve translations for all languages
- **Pagination** - Handle large category structures with pagination

This query uses a tree structure with recursive `children` edges, making it ideal for iterating through categories at any depth level.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `parentId` | `Int` | Filter categories by parent ID. Omit for root categories. |
| `status` | `Int` | Filter by status: `0` (inactive), `1` (active). Default: active categories only. |
| `first` | `Int` | Number of children per category node. Default: `20` |
| `after` | `String` | Cursor for pagination of children. Use with `first` for pagination. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique category identifier. |
| `_id` | `Int!` | Numeric category ID. |
| `position` | `Int` | Display position in parent category. |
| `logoPath` | `String` | File path to category logo. |
| `logoUrl` | `String` | Full URL to category logo image. |
| `bannerPath` | `String` | File path to category banner. |
| `bannerUrl` | `String` | Full URL to category banner image. |
| `displayMode` | `String` | Display mode (products_only, category_and_products, products_and_description). |
| `status` | `Int` | Category status (0 = inactive, 1 = active). |
| `_lft` | `Int` | Nested set left value (internal tree structure). |
| `_rgt` | `Int` | Nested set right value (internal tree structure). |
| `additional` | `String` | Additional metadata and settings. |
| `translation` | `CategoryTranslation!` | Default locale category translation. |
| `translation.id` | `ID!` | Translation ID. |
| `translation._id` | `Int!` | Numeric translation ID. |
| `translation.categoryId` | `Int!` | Associated category ID. |
| `translation.name` | `String!` | Category name in current language. |
| `translation.slug` | `String!` | URL slug for the category. |
| `translation.urlPath` | `String!` | Full URL path including parent categories. |
| `translation.description` | `String` | Category description text. |
| `translation.metaTitle` | `String` | SEO meta title tag. |
| `translation.metaDescription` | `String` | SEO meta description. |
| `translation.metaKeywords` | `String` | SEO keywords. |
| `translation.locale` | `String!` | Language locale code. |
| `translations` | `[CategoryTranslation!]!` | All available translations for the category. |
| `children` | `[Category!]!` | Recursive children categories with same structure. |
| `children.edges` | `[Edge!]!` | Category children edges with cursor pagination. |
| `children.pageInfo` | `PageInfo!` | Pagination information for children. |
| `children.totalCount` | `Int!` | Total number of child categories. |
| `createdAt` | `DateTime!` | Category creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `url` | `String` | Full category URL. |

## Use Cases

### 1. Main Navigation Menu
Use the "Navigation Menu Optimized" example to render a dropdown navigation menu with minimal data transfer.

### 2. Category Filter/Browse
Use the "Full Details with Translations" example to display category filters with images and descriptions.

### 3. Breadcrumb Navigation
Use the tree structure to build breadcrumb paths showing the hierarchy from parent to current category.

### 4. Sitemap Generation
Use the complete tree to generate XML sitemaps with all category URLs.

### 5. Mobile Navigation
Use the "Pagination" example to handle large category lists on mobile devices.

## Best Practices

1. **Request Only Needed Fields** - Minimize data transfer by requesting only required fields
2. **Use Pagination for Large Trees** - When categories have many children, use pagination
3. **Cache Category Tree** - Categories rarely change, cache the entire tree structure
4. **Optimize for Frontend Framework** - Use pagination and field selection based on your framework
5. **Handle Deep Nesting** - Use recursive queries carefully to avoid performance issues
6. **Include SEO Metadata** - Always fetch meta tags for SEO optimization
7. **Filter Inactive Categories** - Only show active categories in production

## Performance Tips

- **Limit Recursion Depth** - Avoid fetching too many levels of children at once
- **Use Pagination** - Paginate children for categories with many sub-categories
- **Cache Results** - Store category tree in frontend cache/state management
- **Lazy Load Children** - Load deeper levels only when user interacts with menu
- **Combine with Other Queries** - Fetch category and products in separate requests

## Related Resources

- [Categories Query](/api/graphql/shop/queries/categories) - Get flat category list
- [Get Products](/api/graphql/shop/queries/get-products) - Query products within a category
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
