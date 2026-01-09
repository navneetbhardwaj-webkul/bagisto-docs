---
outline: false
examples:
  - id: get-theme-customizations-basic
    title: Get Theme Customizations - Basic
    description: Retrieve theme customizations with basic fields and pagination.
    query: |
      query themeCustomizations($first: Int, $after: String) {
        themeCustomizations(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              type
              name
              status
              themeCode
              sortOrder
              translation {
                locale
                options
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
          "themeCustomizations": {
            "edges": [
              {
                "node": {
                  "id": "/api/theme_customizations/1",
                  "_id": 1,
                  "type": "image_carousel",
                  "name": "Image Carousel",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 1
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/theme_customizations/2",
                  "_id": 2,
                  "type": "static_content",
                  "name": "Offer Information",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 2
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ=="
            },
            "totalCount": 10
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-type-filter
        cause: Invalid type filter value
        solution: Use valid type values like footer_links, image_carousel, product_carousel, etc.

  - id: get-theme-customizations-with-type-filter
    title: Get Theme Customizations - Filtered by Type
    description: Retrieve theme customizations filtered by a specific type with translations.
    query: |
      query themeCustomizations($type: String) {
        themeCustomizations(type: $type) {
          edges {
            node {
              id
              _id
              type
              name
              status
              themeCode
              sortOrder
              translation {
                id
                _id
                themeCustomizationId
                locale
                options
              }
              translations {
                edges {
                  node {
                    id
                    _id
                    themeCustomizationId
                    locale
                    options
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
        "type": "footer_links"
      }
    response: |
      {
        "data": {
          "themeCustomizations": {
            "edges": [
              {
                "node": {
                  "id": "/api/theme_customizations/11",
                  "_id": 11,
                  "type": "footer_links",
                  "name": "Footer Links",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 11,
                  "translation": {
                    "id": "/api/shop/theme_customization_translations/49",
                    "_id": 49,
                    "themeCustomizationId": "11",
                    "locale": "en",
                    "options": "{\"column_1\": [{\"url\": \"/page/about-us\", \"title\": \"About Us\", \"sort_order\": 1}, {\"url\": \"/contact-us\", \"title\": \"Contact Us\", \"sort_order\": 2}], \"column_2\": [{\"url\": \"/page/privacy-policy\", \"title\": \"Privacy Policy\", \"sort_order\": 1}]}"
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/theme_customization_translations/49",
                          "_id": 49,
                          "themeCustomizationId": "11",
                          "locale": "en",
                          "options": "{\"column_1\": [{\"url\": \"/page/about-us\", \"title\": \"About Us\", \"sort_order\": 1}, {\"url\": \"/contact-us\", \"title\": \"Contact Us\", \"sort_order\": 2}], \"column_2\": [{\"url\": \"/page/privacy-policy\", \"title\": \"Privacy Policy\", \"sort_order\": 1}]}"
                        },
                        "cursor": "MA=="
                      },
                      {
                        "node": {
                          "id": "/api/shop/theme_customization_translations/61",
                          "_id": 61,
                          "themeCustomizationId": "11",
                          "locale": "ar",
                          "options": "{\"column_1\": [{\"url\": \"/page/about-us\", \"title\": \"معلومات عنا\", \"sort_order\": 1}, {\"url\": \"/contact-us\", \"title\": \"اتصل بنا\", \"sort_order\": 2}], \"column_2\": [{\"url\": \"/page/privacy-policy\", \"title\": \"سياسة الخصوصية\", \"sort_order\": 1}]}"
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
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-type-filter
        cause: Invalid type filter value
        solution: Use valid type values like footer_links, image_carousel, product_carousel, etc.

  - id: get-theme-customizations-complete
    title: Get Theme Customizations - Complete Details
    description: Retrieve all theme customizations with complete fields including timestamps and all translations.
    query: |
      query themeCustomizations($first: Int, $after: String, $last: Int, $before: String, $type: String) {
        themeCustomizations(first: $first, after: $after, last: $last, before: $before, type: $type) {
          edges {
            node {
              id
              _id
              themeCode
              type
              name
              sortOrder
              status
              channelId
              createdAt
              updatedAt
              translation {
                id
                _id
                themeCustomizationId
                locale
                options
              }
              translations {
                edges {
                  cursor
                  node {
                    id
                    _id
                    themeCustomizationId
                    locale
                    options
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
        "first": 3
      }
    response: |
      {
        "data": {
          "themeCustomizations": {
            "edges": [
              {
                "node": {
                  "id": "/api/theme_customizations/1",
                  "_id": 1,
                  "themeCode": "default",
                  "type": "image_carousel",
                  "name": "Image Carousel",
                  "sortOrder": 1,
                  "status": "1",
                  "channelId": "1",
                  "createdAt": "2024-06-19T17:03:35+05:30",
                  "updatedAt": "2025-11-14T00:25:18+05:30",
                  "translation": {
                    "id": "/api/shop/theme_customization_translations/49",
                    "_id": 49,
                    "themeCustomizationId": "1",
                    "locale": "en",
                    "options": "{\"images\": [{\"link\": \"/search?new=1\", \"image\": \"storage/theme/1/H65GRYoNfWrHLqKv06szKiZVn1jLymYXaw4NGI82.webp\", \"title\": \"Get Ready For New Collection\"}]}"
                  },
                  "translations": {
                    "edges": [
                      {
                        "cursor": "MA==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/49",
                          "_id": 49,
                          "themeCustomizationId": "1",
                          "locale": "en",
                          "options": "{\"images\": [{\"link\": \"/search?new=1\", \"image\": \"storage/theme/1/H65GRYoNfWrHLqKv06szKiZVn1jLymYXaw4NGI82.webp\", \"title\": \"Get Ready For New Collection\"}]}"
                        }
                      },
                      {
                        "cursor": "MQ==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/61",
                          "_id": 61,
                          "themeCustomizationId": "1",
                          "locale": "ar",
                          "options": "{\"images\": [{\"link\": \"\", \"image\": \"storage/theme/1/tvdjNA4y0cqRhDXzXe8L2vUapXkpmETdIStPHTLt.webp\", \"title\": \"استعد للمجموعة الجديدة\"}]}"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/theme_customizations/2",
                  "_id": 2,
                  "themeCode": "default",
                  "type": "static_content",
                  "name": "Offer Information",
                  "sortOrder": 2,
                  "status": "1",
                  "channelId": "1",
                  "createdAt": "2024-06-19T17:03:35+05:30",
                  "updatedAt": "2024-06-19T17:03:35+05:30",
                  "translation": {
                    "id": "/api/shop/theme_customization_translations/50",
                    "_id": 50,
                    "themeCustomizationId": "2",
                    "locale": "en",
                    "options": "{\"css\": \".home-offer h1 {display: block;}\", \"html\": \"<div class=\\\"home-offer\\\"><h1>Get UPTO 40% OFF</h1></div>\"}"
                  },
                  "translations": {
                    "edges": [
                      {
                        "cursor": "MA==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/50",
                          "_id": 50,
                          "themeCustomizationId": "2",
                          "locale": "en",
                          "options": "{\"css\": \".home-offer h1 {display: block;}\", \"html\": \"<div class=\\\"home-offer\\\"><h1>Get UPTO 40% OFF</h1></div>\"}"
                        }
                      },
                      {
                        "cursor": "MQ==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/62",
                          "_id": 62,
                          "themeCustomizationId": "2",
                          "locale": "ar",
                          "options": "{\"css\": \".home-offer h1 {display: block;}\", \"html\": \"<div class=\\\"home-offer\\\"><h1>احصل على خصم يصل إلى 40%</h1></div>\"}"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/theme_customizations/3",
                  "_id": 3,
                  "themeCode": "default",
                  "type": "category_carousel",
                  "name": "Categories Collections",
                  "sortOrder": 3,
                  "status": "1",
                  "channelId": "1",
                  "createdAt": "2024-06-19T17:03:35+05:30",
                  "updatedAt": "2024-06-19T17:03:35+05:30",
                  "translation": {
                    "id": "/api/shop/theme_customization_translations/51",
                    "_id": 51,
                    "themeCustomizationId": "3",
                    "locale": "en",
                    "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": 10, \"parent_id\": 1}}"
                  },
                  "translations": {
                    "edges": [
                      {
                        "cursor": "MA==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/51",
                          "_id": 51,
                          "themeCustomizationId": "3",
                          "locale": "en",
                          "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": 10, \"parent_id\": 1}}"
                        }
                      },
                      {
                        "cursor": "MQ==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/63",
                          "_id": 63,
                          "themeCustomizationId": "3",
                          "locale": "ar",
                          "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": 10, \"parent_id\": 1}}"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "Mg=="
              }
            ],
            "pageInfo": {
              "endCursor": "Mg==",
              "startCursor": "MA==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 10
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments or exceeding maximum limit
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-type-filter
        cause: Invalid type filter value
        solution: Use valid type values like footer_links, image_carousel, product_carousel, category_carousel, static_content, etc.

---

# Theme Customizations

## About

The `themeCustomizations` query retrieves configurable theme data for the storefront. Use this query to:

- Fetch home page sliders and carousels
- Display footer links and static content sections
- Retrieve category and product carousel configurations
- Get theme-specific customization options
- Access multi-language translations for theme content
- Implement dynamic theme content based on type filters
- Display theme customizations with complete metadata

This query supports pagination with cursor-based navigation and type-based filtering for retrieving specific customization categories.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of results to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Pagination cursor for forward navigation. Use with `first`. |
| `last` | `Int` | ❌ No | Number of results for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Pagination cursor for backward navigation. Use with `last`. |
| `type` | `String` | ❌ No | Filter by customization type (e.g., `footer_links`, `image_carousel`, `product_carousel`, `category_carousel`, `static_content`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique theme customization API identifier. |
| `_id` | `Int!` | Numeric customization ID. |
| `themeCode` | `String!` | Theme code/identifier (e.g., 'default'). |
| `type` | `String!` | Customization type (e.g., 'footer_links', 'image_carousel', 'product_carousel', 'category_carousel', 'static_content'). |
| `name` | `String!` | Human-readable name of the customization. |
| `sortOrder` | `Int` | Sort order for display. |
| `status` | `String` | Status flag (0 = inactive, 1 = active). |
| `channelId` | `String` | Associated channel ID. |
| `createdAt` | `DateTime!` | Customization creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `translation` | `ThemeCustomizationTranslation!` | Default locale translation. |
| `translation.id` | `ID!` | Translation identifier. |
| `translation._id` | `Int!` | Numeric translation ID. |
| `translation.themeCustomizationId` | `String!` | Associated customization ID. |
| `translation.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translation.options` | `String!` | JSON-formatted options/configuration for this translation. |
| `translations` | `ThemeCustomizationTranslationCollection!` | All available translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.totalCount` | `Int!` | Total translations for this customization. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total customizations matching filters. |

## Common Customization Types

| Type | Description | Usage |
|------|-------------|-------|
| `image_carousel` | Image slider/carousel on home page | Homepage promotions and banners |
| `product_carousel` | Product carousel display | Featured, new, or special products |
| `category_carousel` | Category carousel display | Category promotions |
| `static_content` | HTML/CSS static sections | Custom HTML blocks |
| `footer_links` | Footer navigation links | Footer menu items |
| `services_content` | Services information | Additional service blocks |

## Use Cases

### 1. Home Page Sliders
Use the "Filtered by Type" example with `type: "image_carousel"` to fetch home page sliders.

### 2. Footer Links
Use the "Filtered by Type" example with `type: "footer_links"` to display footer links.

### 3. Product Carousels
Use the "Filtered by Type" example with `type: "product_carousel"` to display featured products.

### 4. Multi-Language Support
Use the "Complete Details" example to get all translations for any customization type.

### 5. Paginated List
Use the "Basic" example with pagination arguments to load customizations progressively.

## Best Practices

1. **Use Type Filters** - Always filter by type when you only need specific customizations
2. **Paginate Results** - Use pagination for better performance with large datasets
3. **Request Only Needed Fields** - Minimize data transfer by selecting only required fields
4. **Cache Translations** - Theme customizations change infrequently, cache the full response
5. **Parse JSON Options** - The `options` field contains JSON; parse it in your application
6. **Check Status** - Verify status is active before displaying in frontend

## Related Resources

- [Get Category](/api/graphql/shop/queries/get-category) - Query individual category details
- [Get Categories](/api/graphql/shop/queries/categories) - Query paginated categories
- [Get Products](/api/graphql/shop/queries/get-products) - Query products for carousels
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
