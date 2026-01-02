---
outline: false
examples:
  - id: get-category-by-id-basic
    title: Get Category by ID - Basic
    description: Retrieve basic information for a single category by its ID.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          position
          status
          translation {
            name
            slug
            urlPath
            description
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/1"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/1",
            "_id": 1,
            "position": 1,
            "status": 1,
            "translation": {
              "name": "Electronics",
              "slug": "electronics",
              "urlPath": "electronics",
              "description": "All electronic devices and gadgets"
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Category ID parameter is missing
        solution: Provide the category ID as a required parameter
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/categories/1" or numeric ID
        solution: Use either numeric ID (1) or IRI format (/api/shop/categories/1)
      - error: not-found
        cause: Category with given ID does not exist
        solution: Verify the category ID is correct and the category is active

  - id: get-category-by-numeric-id
    title: Get Category by Numeric ID
    description: Retrieve category using numeric ID format instead of IRI.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
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
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/1",
            "_id": 1,
            "position": 1,
            "status": 1,
            "translation": {
              "name": "Electronics",
              "slug": "electronics",
              "urlPath": "electronics"
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Category ID parameter is missing
        solution: Provide the category ID as a required parameter
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/categories/1" or numeric ID
        solution: Use either numeric ID (1) or IRI format (/api/shop/categories/1)
      - error: not-found
        cause: Category with given ID does not exist
        solution: Verify the category ID is correct and the category is active

  - id: get-category-complete
    title: Get Category - Complete Details
    description: Retrieve complete category information including logos, banners, translations, and children.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
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
              endCursor
              startCursor
              hasPreviousPage
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/1"
      }
    response: |
      {
        "data": {
          "category": {
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
              "metaDescription": "Shop the latest electronics and gadgets at unbeatable prices",
              "metaKeywords": "electronics, gadgets, devices, phones, laptops",
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
                    "metaDescription": "Shop the latest electronics and gadgets at unbeatable prices",
                    "metaKeywords": "electronics, gadgets, devices, phones, laptops",
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
                    "metaDescription": "تسوق أحدث الأجهزة الإلكترونية بأسعار لا تقبل المنافسة",
                    "metaKeywords": "إلكترونيات, أجهزة, هواتف, أجهزة كمبيوتر",
                    "localeId": 2,
                    "locale": "ar"
                  },
                  "cursor": "MQ=="
                },
                {
                  "node": {
                    "id": "/api/shop/category-translations/3",
                    "_id": 3,
                    "categoryId": 1,
                    "name": "Électronique",
                    "slug": "electronique",
                    "urlPath": "electronique",
                    "description": "Tous les appareils et gadgets électroniques",
                    "metaTitle": "Électronique - Meilleures Offres",
                    "metaDescription": "Achetez les derniers appareils électroniques à des prix imbattables",
                    "metaKeywords": "électronique, gadgets, appareils, téléphones, ordinateurs portables",
                    "localeId": 3,
                    "locale": "fr"
                  },
                  "cursor": "Mg=="
                }
              ],
              "pageInfo": {
                "endCursor": "Mg==",
                "startCursor": "MA==",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "totalCount": 3
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
                },
                {
                  "node": {
                    "id": "/api/shop/categories/7",
                    "_id": 7,
                    "position": 3,
                    "logoUrl": "https://example.com/categories/accessories-logo.png",
                    "status": 1,
                    "translation": {
                      "name": "Accessories",
                      "slug": "accessories"
                    }
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "totalCount": 3
              }
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Category ID parameter is missing
        solution: Provide the category ID as a required parameter
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/categories/1" or numeric ID
        solution: Use either numeric ID (1) or IRI format (/api/shop/categories/1)
      - error: not-found
        cause: Category with given ID does not exist
        solution: Verify the category ID is correct and the category is active

  - id: get-category-with-seo
    title: Get Category with SEO Data
    description: Retrieve category with complete SEO metadata for search engine optimization.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          url
          translation {
            name
            slug
            urlPath
            description
            metaTitle
            metaDescription
            metaKeywords
          }
          translations {
            edges {
              node {
                name
                slug
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
    variables: |
      {
        "id": "/api/shop/categories/1"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/1",
            "_id": 1,
            "url": "https://example.com/electronics",
            "translation": {
              "name": "Electronics",
              "slug": "electronics",
              "urlPath": "electronics",
              "description": "All electronic devices and gadgets",
              "metaTitle": "Electronics - Best Deals Online",
              "metaDescription": "Shop the latest electronics and gadgets at unbeatable prices",
              "metaKeywords": "electronics, gadgets, devices, phones, laptops"
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "name": "Electronics",
                    "slug": "electronics",
                    "metaTitle": "Electronics - Best Deals Online",
                    "metaDescription": "Shop the latest electronics and gadgets at unbeatable prices",
                    "metaKeywords": "electronics, gadgets, devices, phones, laptops",
                    "locale": "en"
                  }
                },
                {
                  "node": {
                    "name": "الإلكترونيات",
                    "slug": "electronics-ar",
                    "metaTitle": "الإلكترونيات - أفضل العروض",
                    "metaDescription": "تسوق أحدث الأجهزة الإلكترونية بأسعار لا تقبل المنافسة",
                    "metaKeywords": "إلكترونيات, أجهزة, هواتف",
                    "locale": "ar"
                  }
                }
              ],
              "totalCount": 2
            }
          }
        }
      }
    commonErrors:
      - error: MISSING_SEO_DATA
        cause: Category has no SEO metadata
        solution: Add SEO information in admin panel

  - id: get-category-display-settings
    title: Get Category Display Settings
    description: Retrieve category display configuration including mode, logos, and banners.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
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
          translation {
            name
            slug
            description
          }
          children {
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/1"
      }
    response: |
      {
        "data": {
          "category": {
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
            "_rgt": 10,
            "translation": {
              "name": "Electronics",
              "slug": "electronics",
              "description": "All electronic devices and gadgets"
            },
            "children": {
              "totalCount": 5
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_DISPLAY_MODE
        cause: Display mode value is not supported
        solution: Use products_only, category_and_products, or products_and_description

  - id: get-category-with-children
    title: Get Category with All Children
    description: Retrieve category with complete information about all child categories.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          translation {
            name
            slug
          }
          url
          children {
            edges {
              node {
                id
                _id
                position
                translation {
                  name
                  slug
                }
                logoUrl
                status
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
      }
    variables: |
      {
        "id": "/api/shop/categories/1"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/1",
            "_id": 1,
            "translation": {
              "name": "Electronics",
              "slug": "electronics"
            },
            "url": "https://example.com/electronics",
            "children": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/categories/5",
                    "_id": 5,
                    "position": 1,
                    "translation": {
                      "name": "Mobile Phones",
                      "slug": "mobile-phones"
                    },
                    "logoUrl": "https://example.com/categories/mobiles-logo.png",
                    "status": 1,
                    "children": {
                      "totalCount": 3
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/categories/6",
                    "_id": 6,
                    "position": 2,
                    "translation": {
                      "name": "Laptops",
                      "slug": "laptops"
                    },
                    "logoUrl": "https://example.com/categories/laptops-logo.png",
                    "status": 1,
                    "children": {
                      "totalCount": 2
                    }
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "MQ=="
              },
              "totalCount": 2
            }
          }
        }
      }
    commonErrors:
      - error: NO_CHILDREN
        cause: Category has no child categories
        solution: This is normal for leaf categories

---

# Get Category

## About

The `category` query retrieves detailed information about a single category by its ID. Use this query to:

- Display category detail pages with complete information
- Show category images, descriptions, and SEO metadata
- Retrieve display settings and configuration options
- Build breadcrumb navigation
- Get category hierarchy information
- Access all translations for multi-language support
- Display category children and sub-categories
- Render category-specific layouts and content

This query returns comprehensive category data including logos, banners, all translations, display modes, and child category information.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | Category ID. Supports two formats: numeric ID (e.g., `1`) or IRI format (e.g., `/api/shop/categories/1`). Required. |

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
| `translations.edges.node` | `CategoryTranslation!` | Individual translation. |
| `translations.edges.cursor` | `String!` | Pagination cursor for this translation. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.pageInfo.hasNextPage` | `Boolean!` | More translations available. |
| `translations.pageInfo.hasPreviousPage` | `Boolean!` | Previous translations available. |
| `translations.pageInfo.startCursor` | `String` | First translation cursor. |
| `translations.pageInfo.endCursor` | `String` | Last translation cursor. |
| `translations.totalCount` | `Int!` | Total translations for this category. |
| `createdAt` | `DateTime!` | Category creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `url` | `String` | Full category URL. |
| `children` | `CategoryCollection!` | Child categories. |
| `children.edges` | `[Edge!]!` | Child category edges. |
| `children.edges.node` | `Category!` | Individual child category. |
| `children.pageInfo` | `PageInfo!` | Pagination info for children. |
| `children.totalCount` | `Int!` | Total child categories. |

## Display Modes

| Mode | Description |
|------|-------------|
| `products_only` | Show only products, no category description. |
| `category_and_products` | Show category and products together. |
| `products_and_description` | Show products with category description. |

## Use Cases

### 1. Category Detail Page
Use the "Complete Details" example to display a full category page with all information.

### 2. SEO Optimization
Use the "With SEO Data" example to get all metadata for search engines.

### 3. Category Display Settings
Use the "Display Settings" example to configure how the category should be rendered.

### 4. Category Hierarchy
Use the "With All Children" example to show subcategories.

## Best Practices

1. **Cache Category Data** - Categories change infrequently, cache the response
2. **Include All Translations** - Fetch all translations for multi-language support
3. **Use Correct ID Format** - Use `/api/shop/categories/{id}` format when available
4. **Optimize Field Selection** - Request only fields your UI needs
5. **Include SEO Data** - Always fetch meta tags for optimization
6. **Check Status** - Verify category is active before displaying

## Related Resources

- [Categories](/api/graphql/shop/queries/categories) - Get all categories with pagination
- [Tree Categories](/api/graphql/shop/queries/tree-categories) - Get hierarchical category tree
- [Get Products](/api/graphql/shop/queries/get-products) - Query products within a category
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
