---
outline: false
examples:
  - id: get-country-by-id-basic
    title: Get Country by ID - Basic
    description: Retrieve basic information for a single country by its ID.
    query: |
      query getSingleCountry($id: ID!) {
        country(id: $id) {
          id
          _id
          code
          name
        }
      }
    variables: |
      {
        "id": "106"
      }
    response: |
      {
        "data": {
          "country": {
            "id": "/api/shop/countries/106",
            "_id": 106,
            "code": "AE",
            "name": "United Arab Emirates"
          }
        }
      }
    commonErrors:
      - error: COUNTRY_NOT_FOUND
        cause: Country with given ID does not exist
        solution: Verify the country ID is correct
      - error: INVALID_ID_FORMAT
        cause: Invalid country ID format
        solution: Use a valid country ID like "106" or "/api/shop/countries/106"

  - id: get-country-with-states
    title: Get Country with States
    description: Retrieve country information with all associated states and translations.
    query: |
      query getSingleCountry($id: ID!) {
        country(id: $id) {
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
                translations {
                  edges {
                    node {
                      id
                      locale
                      defaultName
                    }
                  }
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
        "id": "1"
      }
    response: |
      {
        "data": {
          "country": {
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
                    "translations": {
                      "edges": [
                        {
                          "node": {
                            "id": "/api/shop/country-state-translations/1",
                            "locale": "en",
                            "defaultName": "Alabama"
                          }
                        },
                        {
                          "node": {
                            "id": "/api/shop/country-state-translations/2",
                            "locale": "ar",
                            "defaultName": "ألاباما"
                          }
                        }
                      ]
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
                    "translations": {
                      "edges": [
                        {
                          "node": {
                            "id": "/api/shop/country-state-translations/3",
                            "locale": "en",
                            "defaultName": "Alaska"
                          }
                        }
                      ]
                    }
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": true,
                "endCursor": "MQ=="
              },
              "totalCount": 50
            }
          }
        }
      }
    commonErrors:
      - error: NO_STATES
        cause: Country has no states configured
        solution: Add states for the country in admin panel

  - id: get-country-with-translations
    title: Get Country with Translations
    description: Retrieve country with complete translation information for all languages.
    query: |
      query getSingleCountry($id: ID!) {
        country(id: $id) {
          id
          _id
          code
          name
          translations {
            edges {
              node {
                id
                _id
                locale
                name
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
      }
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "country": {
            "id": "/api/shop/countries/1",
            "_id": 1,
            "code": "US",
            "name": "United States",
            "translations": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/country-translations/1",
                    "_id": 1,
                    "locale": "en",
                    "name": "United States"
                  },
                  "cursor": "MA=="
                },
                {
                  "node": {
                    "id": "/api/shop/country-translations/2",
                    "_id": 2,
                    "locale": "ar",
                    "name": "الولايات المتحدة الأمريكية"
                  },
                  "cursor": "MQ=="
                },
                {
                  "node": {
                    "id": "/api/shop/country-translations/3",
                    "_id": 3,
                    "locale": "fr",
                    "name": "États-Unis"
                  },
                  "cursor": "Mg=="
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "Mg=="
              },
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: Country has no translations configured
        solution: Add translations in the admin panel

  - id: get-country-complete
    title: Get Country - Complete Details
    description: Retrieve complete country information with all states and translations.
    query: |
      query getSingleCountry($id: ID!) {
        country(id: $id) {
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
                translations {
                  edges {
                    node {
                      id
                      locale
                      defaultName
                    }
                  }
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
                _id
                locale
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
      }
    variables: |
      {
        "id": "106"
      }
    response: |
      {
        "data": {
          "country": {
            "id": "/api/shop/countries/106",
            "_id": 106,
            "code": "AE",
            "name": "United Arab Emirates",
            "states": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/country-states/750",
                    "_id": 750,
                    "code": "AD",
                    "defaultName": "Abu Dhabi",
                    "countryId": 106,
                    "countryCode": "AE",
                    "translations": {
                      "edges": [
                        {
                          "node": {
                            "id": "/api/shop/country-state-translations/750",
                            "locale": "en",
                            "defaultName": "Abu Dhabi"
                          }
                        }
                      ]
                    }
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "NzQ5"
              },
              "totalCount": 7
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/country-translations/106",
                    "_id": 106,
                    "locale": "en",
                    "name": "United Arab Emirates"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/country-translations/107",
                    "_id": 107,
                    "locale": "ar",
                    "name": "الإمارات العربية المتحدة"
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "MTA3"
              },
              "totalCount": 2
            }
          }
        }
      }
    commonErrors:
      - error: COUNTRY_NOT_FOUND
        cause: Country with given ID does not exist
        solution: Verify the country ID is correct

---

# Get Country

## About

The `country` query retrieves detailed information about a single country by its ID. Use this query to:

- Display country-specific information and settings
- Fetch all states/provinces for a country
- Get country translations for multi-language support
- Populate address forms with state options for a selected country
- Build country-specific pages and configurations
- Display country-specific shipping rules
- Render localized country and state names

This query returns comprehensive country data including all states with translations and country translations for multiple languages.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | Country ID in format "106" or "/api/shop/countries/106". |

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
| `states.edges.node.translations` | `StateTranslationCollection!` | All state translations. |
| `states.edges.node.translations.edges` | `[Edge!]!` | Translation edges. |
| `states.edges.node.translations.edges.node.id` | `ID!` | Translation ID. |
| `states.edges.node.translations.edges.node.locale` | `String!` | Language locale code. |
| `states.edges.node.translations.edges.node.defaultName` | `String!` | Translated state name. |
| `states.pageInfo` | `PageInfo!` | Pagination info for states. |
| `states.pageInfo.hasNextPage` | `Boolean!` | More states available. |
| `states.pageInfo.endCursor` | `String` | Last state cursor. |
| `states.totalCount` | `Int!` | Total states for this country. |
| `translations` | `CountryTranslationCollection!` | All country translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.edges.node` | `CountryTranslation!` | Individual translation. |
| `translations.edges.node.id` | `ID!` | Translation identifier. |
| `translations.edges.node._id` | `Int!` | Numeric translation ID. |
| `translations.edges.node.locale` | `String!` | Language locale code. |
| `translations.edges.node.name` | `String!` | Country name in locale language. |
| `translations.edges.cursor` | `String!` | Pagination cursor. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.totalCount` | `Int!` | Total translations for this country. |

## Use Cases

### 1. Address Form State Selection
Use the "With States" example to populate state dropdown when user selects a country.

### 2. Multi-Language Display
Use the "With Translations" example to display country name in user's language.

### 3. Country Details Page
Use the "Complete Details" example for a comprehensive country information display.

## Best Practices

1. **Cache Country Data** - Country information rarely changes, cache the response
2. **Load States Dynamically** - Fetch states when user selects a country in forms
3. **Include Translations** - Always fetch translations for multi-language support
4. **Handle No States** - Some countries have no states configured, handle gracefully
5. **Use Correct ID** - Use numeric ID format "106" or full API path

## Related Resources

- [Countries](/api/graphql/shop/queries/get-countries) - Get all countries with pagination
- [Country States](/api/graphql/shop/queries/get-country-states) - Get states for a country
- [Country State](/api/graphql/shop/queries/get-country-state) - Get single state by ID
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
