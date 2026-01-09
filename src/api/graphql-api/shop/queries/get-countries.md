---
outline: false
examples:
  - id: get-countries-basic
    title: Get Countries - Basic
    description: Retrieve all available countries with basic information.
    query: |
      query countries {
        countries {
          edges {
            node {
              id
              _id
              code
              name
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
      {}
    response: |
      {
        "data": {
          "countries": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/countries/1",
                  "_id": 1,
                  "code": "US",
                  "name": "United States"
                }
              },
              {
                "node": {
                  "id": "/api/shop/countries/2",
                  "_id": 2,
                  "code": "GB",
                  "name": "United Kingdom"
                }
              },
              {
                "node": {
                  "id": "/api/shop/countries/3",
                  "_id": 3,
                  "code": "AE",
                  "name": "United Arab Emirates"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "Mg=="
            },
            "totalCount": 250
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Invalid or missing authentication token
        solution: Provide valid authentication credentials
      - error: NO_COUNTRIES
        cause: No countries configured in the system
        solution: Configure countries in the admin panel

  - id: get-countries-with-states
    title: Get Countries with States
    description: Retrieve all countries with their associated states/provinces and translations.
    query: |
      query countries {
        countries {
          edges {
            node {
              id
              _id
              code
              name
              states {
                edges {
                  node {
                    id
                    _id
                    code
                    defaultName
                    countryId
                    countryCode
                    translation {
                      id
                      locale
                      defaultName
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
                totalCount
              }
              translations {
                edges {
                  node {
                    id
                    locale
                    name
                  }
                }
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
      {}
    response: |
      {
        "data": {
          "countries": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/countries/1",
                  "_id": 1,
                  "code": "US",
                  "name": "United States",
                  "states": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-states/1",
                          "_id": 1,
                          "code": "AL",
                          "defaultName": "Alabama",
                          "countryId": 1,
                          "countryCode": "US",
                          "translation": {
                            "id": "/api/shop/country-state-translations/1",
                            "locale": "en",
                            "defaultName": "Alabama"
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-states/2",
                          "_id": 2,
                          "code": "AK",
                          "defaultName": "Alaska",
                          "countryId": 1,
                          "countryCode": "US",
                          "translation": {
                            "id": "/api/shop/country-state-translations/2",
                            "locale": "en",
                            "defaultName": "Alaska"
                          }
                        }
                      }
                    ],
                    "pageInfo": {
                      "hasNextPage": true,
                      "endCursor": "MQ=="
                    },
                    "totalCount": 50
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-translations/1",
                          "locale": "en",
                          "name": "United States"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-translations/2",
                          "locale": "ar",
                          "name": "الولايات المتحدة الأمريكية"
                        }
                      }
                    ],
                    "totalCount": 2
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/countries/2",
                  "_id": 2,
                  "code": "GB",
                  "name": "United Kingdom",
                  "states": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-states/51",
                          "_id": 51,
                          "code": "ENG",
                          "defaultName": "England",
                          "countryId": 2,
                          "countryCode": "GB",
                          "translation": {
                            "id": "/api/shop/country-state-translations/51",
                            "locale": "en",
                            "defaultName": "England"
                          }
                        }
                      }
                    ],
                    "pageInfo": {
                      "hasNextPage": false,
                      "endCursor": "NTA=="
                    },
                    "totalCount": 4
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-translations/3",
                          "locale": "en",
                          "name": "United Kingdom"
                        }
                      }
                    ],
                    "totalCount": 1
                  }
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ=="
            },
            "totalCount": 250
          }
        }
      }
    commonErrors:
      - error: NO_STATES
        cause: Country has no states configured
        solution: Add states for the country in admin panel

  - id: get-countries-with-pagination
    title: Get Countries with Pagination
    description: Paginate through countries using cursor-based pagination.
    query: |
      query countries($first: Int, $after: String) {
        countries(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              code
              name
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
          "countries": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/countries/1",
                  "_id": 1,
                  "code": "US",
                  "name": "United States"
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/countries/2",
                  "_id": 2,
                  "code": "GB",
                  "name": "United Kingdom"
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/countries/3",
                  "_id": 3,
                  "code": "AE",
                  "name": "United Arab Emirates"
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
            "totalCount": 250
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor format is invalid
        solution: Use cursor values from previous response

  - id: get-countries-with-translations
    title: Get Countries with All Translations
    description: Retrieve countries with complete translation information for multi-language support.
    query: |
      query countries {
        countries {
          edges {
            node {
              id
              _id
              code
              translations {
                edges {
                  node {
                    id
                    locale
                    name
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
      {}
    response: |
      {
        "data": {
          "countries": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/countries/1",
                  "_id": 1,
                  "code": "US",
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-translations/1",
                          "locale": "en",
                          "name": "United States"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-translations/2",
                          "locale": "ar",
                          "name": "الولايات المتحدة الأمريكية"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-translations/3",
                          "locale": "fr",
                          "name": "États-Unis"
                        }
                      }
                    ],
                    "totalCount": 3
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/countries/2",
                  "_id": 2,
                  "code": "GB",
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-translations/4",
                          "locale": "en",
                          "name": "United Kingdom"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-translations/5",
                          "locale": "ar",
                          "name": "المملكة المتحدة"
                        }
                      }
                    ],
                    "totalCount": 2
                  }
                }
              }
            ],
            "totalCount": 250
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: Country has no translations configured
        solution: Add translations in the admin panel

  - id: get-countries-for-address-form
    title: Get Countries for Address Form
    description: Retrieve countries with their states optimized for checkout address forms.
    query: |
      query countries {
        countries {
          edges {
            node {
              id
              _id
              code
              name
              states {
                edges {
                  node {
                    id
                    _id
                    code
                    defaultName
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
      {}
    response: |
      {
        "data": {
          "countries": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/countries/1",
                  "_id": 1,
                  "code": "US",
                  "name": "United States",
                  "states": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-states/1",
                          "_id": 1,
                          "code": "AL",
                          "defaultName": "Alabama"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-states/2",
                          "_id": 2,
                          "code": "AK",
                          "defaultName": "Alaska"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-states/3",
                          "_id": 3,
                          "code": "AZ",
                          "defaultName": "Arizona"
                        }
                      }
                    ],
                    "totalCount": 50
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/countries/2",
                  "_id": 2,
                  "code": "GB",
                  "name": "United Kingdom",
                  "states": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/country-states/51",
                          "_id": 51,
                          "code": "ENG",
                          "defaultName": "England"
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
            "totalCount": 250
          }
        }
      }
    commonErrors:
      - error: EMPTY_COUNTRIES_LIST
        cause: No countries are available
        solution: Ensure countries are configured in admin panel

---

# Get Countries

## About

The `countries` query retrieves all available countries and their states/provinces configured in your Bagisto store. Use this query to:

- Build country/region selector dropdowns for addresses
- Display available shipping destinations
- Create address form fields with country and state options
- Implement multi-language country names and state names
- Display shipping country restrictions
- Build geographic-based features and configurations
- Populate checkout address forms with country and state data
- Support currency and language selection based on country

This query returns comprehensive country data including all states, translations for countries and states, and pagination support for large country lists.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Number of countries to return (forward pagination). Max: 100. |
| `after` | `String` | Pagination cursor for forward navigation. |
| `last` | `Int` | Number of countries for backward pagination. Max: 100. |
| `before` | `String` | Pagination cursor for backward navigation. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique country API identifier. |
| `_id` | `Int!` | Numeric country ID. |
| `code` | `String!` | ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB', 'AE'). |
| `name` | `String!` | Country name in default language. |
| `states` | `CountryStateCollection!` | States/provinces for this country. |
| `states.edges` | `[Edge!]!` | State edges with cursors. |
| `states.edges.node` | `CountryState!` | Individual state information. |
| `states.edges.node.id` | `ID!` | State API identifier. |
| `states.edges.node._id` | `Int!` | Numeric state ID. |
| `states.edges.node.code` | `String` | State code (e.g., 'CA' for California). |
| `states.edges.node.defaultName` | `String!` | State name in default language. |
| `states.edges.node.countryId` | `Int!` | Associated country ID. |
| `states.edges.node.countryCode` | `String!` | Associated country code. |
| `states.edges.node.translation` | `CountryStateTranslation!` | State translation in current locale. |
| `states.edges.node.translation.id` | `ID!` | Translation identifier. |
| `states.edges.node.translation._id` | `Int!` | Numeric translation ID. |
| `states.edges.node.translation.countryStateId` | `Int!` | Associated state ID. |
| `states.edges.node.translation.locale` | `String!` | Language locale code. |
| `states.edges.node.translation.defaultName` | `String!` | State name in locale language. |
| `states.edges.node.translations` | `StateTranslationCollection!` | All state translations. |
| `states.edges.node.translations.edges` | `[Edge!]!` | Translation edges. |
| `states.edges.node.translations.edges.node.id` | `ID!` | Translation ID. |
| `states.edges.node.translations.edges.node.locale` | `String!` | Locale code. |
| `states.edges.node.translations.edges.node.defaultName` | `String!` | Translated state name. |
| `states.pageInfo` | `PageInfo!` | Pagination info for states. |
| `states.pageInfo.hasNextPage` | `Boolean!` | More states available. |
| `states.pageInfo.hasPreviousPage` | `Boolean!` | Previous states available. |
| `states.pageInfo.startCursor` | `String` | First state cursor. |
| `states.pageInfo.endCursor` | `String` | Last state cursor. |
| `states.totalCount` | `Int!` | Total states for this country. |
| `translations` | `CountryTranslationCollection!` | All country translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.edges.node` | `CountryTranslation!` | Individual translation. |
| `translations.edges.node.id` | `ID!` | Translation identifier. |
| `translations.edges.node._id` | `Int!` | Numeric translation ID. |
| `translations.edges.node.countryId` | `Int!` | Associated country ID. |
| `translations.edges.node.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translations.edges.node.name` | `String!` | Country name in locale language. |
| `translations.edges.cursor` | `String!` | Pagination cursor for this translation. |
| `translations.pageInfo` | `PageInfo!` | Pagination information for translations. |
| `translations.totalCount` | `Int!` | Total translations for this country. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | More countries available. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Previous countries available. |
| `pageInfo.startCursor` | `String` | First country cursor. |
| `pageInfo.endCursor` | `String` | Last country cursor. |
| `totalCount` | `Int!` | Total countries in system. |

## Use Cases

### 1. Address Form
Use the "For Address Form" example to populate country and state dropdowns in checkout forms.

### 2. Multi-Language Support
Use the "With All Translations" example to display country names in all supported languages.

### 3. Shipping Configuration
Use the "Basic" example to get all available shipping destinations.

### 4. Pagination
Use the "With Pagination" example to handle large country lists efficiently.

### 5. Complete Data
Use the "With States" example to get all country and state information at once.

## Best Practices

1. **Cache Countries Data** - Countries rarely change, cache the entire list
2. **Load Countries on App Init** - Fetch and store countries when application starts
3. **Support State Selection** - Always fetch states for proper address forms
4. **Use Translations** - Fetch translations for all supported languages
5. **Optimize Field Selection** - Request only fields needed for your use case
6. **Pagination for Mobile** - Use pagination on mobile to reduce data transfer
7. **Sort by Frequency** - Display most-used countries first in UI

## State Availability

Some countries may have states configured, while others may not:
- **Countries with states**: US (50+), Canada, India, etc.
- **Countries without states**: Many smaller countries return empty states collection
- Always check `totalCount` to determine if states are available

## Related Resources

- [Get Country](/api/graphql/shop/queries/get-country) - Get single country by code
- [Country States](/api/graphql/shop/queries/get-country-states) - Get states for specific country
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
