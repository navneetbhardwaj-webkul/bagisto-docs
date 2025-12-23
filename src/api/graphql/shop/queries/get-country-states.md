---
outline: false
examples:
  - id: get-country-states-basic
    title: Get Country States - Basic
    description: Retrieve all states for a specific country with basic information.
    query: |
      query getCountryStates($countryId: Int!) {
        countryStates(countryId: $countryId) {
          edges {
            node {
              id
              _id
              code
              defaultName
              countryId
              countryCode
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "countryId": 1
      }
    response: |
      {
        "data": {
          "countryStates": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/country-states/1",
                  "_id": 1,
                  "code": "AL",
                  "defaultName": "Alabama",
                  "countryId": 1,
                  "countryCode": "US"
                }
              },
              {
                "node": {
                  "id": "/api/shop/country-states/2",
                  "_id": 2,
                  "code": "AK",
                  "defaultName": "Alaska",
                  "countryId": 1,
                  "countryCode": "US"
                }
              },
              {
                "node": {
                  "id": "/api/shop/country-states/3",
                  "_id": 3,
                  "code": "AZ",
                  "defaultName": "Arizona",
                  "countryId": 1,
                  "countryCode": "US"
                }
              }
            ],
            "totalCount": 50
          }
        }
      }
    commonErrors:
      - error: INVALID_COUNTRY_ID
        cause: Country ID is invalid or does not exist
        solution: Provide a valid country ID
      - error: NO_STATES
        cause: Country has no states configured
        solution: This is normal for countries without states

  - id: get-country-states-with-translations
    title: Get Country States with Translations
    description: Retrieve all states for a country with complete translation information.
    query: |
      query getCountryStates($countryId: Int!) {
        countryStates(countryId: $countryId) {
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
                totalCount
              }
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "countryId": 1
      }
    response: |
      {
        "data": {
          "countryStates": {
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
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-state-translations/3",
                          "locale": "fr",
                          "defaultName": "Alabama"
                        }
                      }
                    ],
                    "totalCount": 3
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
                          "id": "/api/shop/country-state-translations/4",
                          "locale": "en",
                          "defaultName": "Alaska"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/country-state-translations/5",
                          "locale": "ar",
                          "defaultName": "ألاسكا"
                        }
                      }
                    ],
                    "totalCount": 2
                  }
                }
              }
            ],
            "totalCount": 50
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: States have no translations configured
        solution: Add translations in the admin panel

  - id: get-country-states-with-pagination
    title: Get Country States with Pagination
    description: Retrieve states with pagination for countries with many states.
    query: |
      query getCountryStates($countryId: Int!, $first: Int, $after: String) {
        countryStates(countryId: $countryId, first: $first, after: $after) {
          edges {
            node {
              id
              _id
              code
              defaultName
              countryId
              countryCode
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
        "countryId": 1,
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "countryStates": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/country-states/1",
                  "_id": 1,
                  "code": "AL",
                  "defaultName": "Alabama",
                  "countryId": 1,
                  "countryCode": "US"
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/country-states/2",
                  "_id": 2,
                  "code": "AK",
                  "defaultName": "Alaska",
                  "countryId": 1,
                  "countryCode": "US"
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
            "totalCount": 50
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor format is invalid
        solution: Use cursor values from previous response

  - id: get-country-states-for-dropdown
    title: Get Country States for Dropdown Form
    description: Query optimized for populating state dropdown in address forms.
    query: |
      query getCountryStates($countryId: Int!) {
        countryStates(countryId: $countryId) {
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
    variables: |
      {
        "countryId": 106
      }
    response: |
      {
        "data": {
          "countryStates": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/country-states/750",
                  "_id": 750,
                  "code": "AD",
                  "defaultName": "Abu Dhabi"
                }
              },
              {
                "node": {
                  "id": "/api/shop/country-states/751",
                  "_id": 751,
                  "code": "AJ",
                  "defaultName": "Ajman"
                }
              },
              {
                "node": {
                  "id": "/api/shop/country-states/752",
                  "_id": 752,
                  "code": "DU",
                  "defaultName": "Dubai"
                }
              }
            ],
            "totalCount": 7
          }
        }
      }
    commonErrors:
      - error: EMPTY_STATES_LIST
        cause: Country has no states
        solution: Some countries do not have state divisions

---

# Get Country States

## About

The `countryStates` query retrieves all states/provinces for a specific country. Use this query to:

- Populate state/province dropdowns in address forms
- Display available states for a selected country
- Get state translations for multi-language support
- Build location-based features and configurations
- Retrieve state codes and names for validation
- Support dynamic form field population
- Display state-specific shipping and tax information

This query returns all states for a given country with optional translations and pagination support.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `countryId` | `Int!` | Numeric country ID to fetch states for. |
| `first` | `Int` | Number of states to return (forward pagination). Max: 100. |
| `after` | `String` | Pagination cursor for forward navigation. |
| `last` | `Int` | Number of states for backward pagination. Max: 100. |
| `before` | `String` | Pagination cursor for backward navigation. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique state API identifier. |
| `_id` | `Int!` | Numeric state ID. |
| `code` | `String` | State code (e.g., 'CA' for California, 'ON' for Ontario). |
| `defaultName` | `String!` | State name in default language. |
| `countryId` | `Int!` | Associated country ID. |
| `countryCode` | `String!` | Associated country code. |
| `translations` | `StateTranslationCollection!` | All state translations. |
| `translations.edges` | `[Edge!]!` | Translation edges. |
| `translations.edges.node` | `StateTranslation!` | Individual translation. |
| `translations.edges.node.id` | `ID!` | Translation ID. |
| `translations.edges.node.locale` | `String!` | Language locale code. |
| `translations.edges.node.defaultName` | `String!` | Translated state name. |
| `translations.totalCount` | `Int!` | Total translations for this state. |
| `edges` | `[Edge!]!` | State edges with cursors. |
| `edges.node` | `CountryState!` | Individual state. |
| `edges.cursor` | `String!` | Pagination cursor. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | More states available. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Previous states available. |
| `pageInfo.startCursor` | `String` | First state cursor. |
| `pageInfo.endCursor` | `String` | Last state cursor. |
| `totalCount` | `Int!` | Total states for this country. |

## Use Cases

### 1. Address Form State Dropdown
Use the "For Dropdown Form" example to populate state dropdown when user selects a country.

### 2. Multi-Language Support
Use the "With Translations" example to display state names in user's language.

### 3. Large State Lists
Use the "With Pagination" example for countries with many states (e.g., US with 50 states).

## Best Practices

1. **Fetch on Country Selection** - Load states dynamically when user selects a country
2. **Cache Per Country** - Cache states for each country to reduce API calls
3. **Include Translations** - Always fetch translations for multi-language forms
4. **Handle Empty States** - Some countries have no states, handle gracefully
5. **Use State Code** - Store state code, not just name, for consistency
6. **Sort Alphabetically** - Present states in alphabetical order in dropdowns
7. **Minimize Fields** - Request only code and name for dropdown optimization

## State Codes

Common state code formats:
- **US States**: 2-letter codes (AL, AK, AZ)
- **Canadian Provinces**: 2-letter codes (ON, BC, QC)
- **European Regions**: Various formats
- **Other Countries**: May vary by country

## Related Resources

- [Countries](/api/graphql/shop/queries/get-countries) - Get all countries with pagination
- [Country](/api/graphql/shop/queries/get-country) - Get single country with states
- [Country State](/api/graphql/shop/queries/get-country-state) - Get single state by ID
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
