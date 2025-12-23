---
outline: false
examples:
  - id: get-country-state-basic
    title: Get Country State - Basic
    description: Retrieve a single state by ID with basic information.
    query: |
      query getCountryState($id: ID!) {
        countryState(id: $id) {
          id
          _id
          code
          defaultName
          countryId
          countryCode
        }
      }
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "countryState": {
            "id": "/api/shop/country-states/1",
            "_id": 1,
            "code": "AL",
            "defaultName": "Alabama",
            "countryId": 1,
            "countryCode": "US"
          }
        }
      }
    commonErrors:
      - error: NOT_FOUND
        cause: State with provided ID does not exist
        solution: Provide a valid state ID
      - error: INVALID_ID_FORMAT
        cause: ID format is invalid
        solution: Use numeric ID or API path format (e.g., "1" or "/api/shop/country-states/1")

  - id: get-country-state-with-translations
    title: Get Country State with Translations
    description: Retrieve a state with complete translation information in multiple languages.
    query: |
      query getCountryState($id: ID!) {
        countryState(id: $id) {
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
    variables: |
      {
        "id": "750"
      }
    response: |
      {
        "data": {
          "countryState": {
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
                    "id": "/api/shop/country-state-translations/750-en",
                    "locale": "en",
                    "defaultName": "Abu Dhabi"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/country-state-translations/750-ar",
                    "locale": "ar",
                    "defaultName": "أبو ظبي"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/country-state-translations/750-fr",
                    "locale": "fr",
                    "defaultName": "Abou Dabi"
                  }
                }
              ],
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: State has no translations configured
        solution: Add translations in the admin panel

  - id: get-country-state-for-address-validation
    title: Get Country State for Address Validation
    description: Query to validate state information when processing customer addresses.
    query: |
      query getCountryState($id: ID!) {
        countryState(id: $id) {
          id
          _id
          code
          defaultName
          countryId
          countryCode
        }
      }
    variables: |
      {
        "id": "/api/shop/country-states/750"
      }
    response: |
      {
        "data": {
          "countryState": {
            "id": "/api/shop/country-states/750",
            "_id": 750,
            "code": "AD",
            "defaultName": "Abu Dhabi",
            "countryId": 106,
            "countryCode": "AE"
          }
        }
      }
    commonErrors:
      - error: INVALID_STATE_FOR_COUNTRY
        cause: State does not belong to the specified country
        solution: Verify state-country relationship before saving address

  - id: get-country-state-complete
    title: Get Country State - Complete Details
    description: Fetch complete state information with all available fields for comprehensive data needs.
    query: |
      query getCountryState($id: ID!) {
        countryState(id: $id) {
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
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "countryState": {
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
                    "id": "/api/shop/country-state-translations/1-en",
                    "locale": "en",
                    "defaultName": "Alabama"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/country-state-translations/1-es",
                    "locale": "es",
                    "defaultName": "Alabama"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/country-state-translations/1-fr",
                    "locale": "fr",
                    "defaultName": "Alabama"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/country-state-translations/1-ar",
                    "locale": "ar",
                    "defaultName": "ألاباما"
                  }
                }
              ],
              "totalCount": 4
            }
          }
        }
      }
    commonErrors:
      - error: STATE_NOT_AVAILABLE
        cause: State exists but is not available for transactions
        solution: Check administrative settings for state

---

# Get Country State

## About

The `countryState` query retrieves detailed information about a single state/province by its ID. Use this query to:

- Fetch specific state information by ID
- Validate state information in address forms
- Get state translations for multi-language displays
- Retrieve complete state details for order processing
- Verify state belongs to correct country
- Display state information in customer dashboards
- Support state-specific business logic
- Process returns and address updates

This query returns comprehensive details about a single state including all translations.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | State ID (numeric or API path format, e.g., "1" or "/api/shop/country-states/1"). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique state API identifier. |
| `_id` | `Int!` | Numeric state ID. |
| `code` | `String!` | State code (e.g., 'CA' for California, 'ON' for Ontario). |
| `defaultName` | `String!` | State name in default language. |
| `countryId` | `Int!` | Associated country ID. |
| `countryCode` | `String!` | Associated country code (e.g., 'US', 'CA'). |
| `translations` | `StateTranslationCollection!` | All state translations. |
| `translations.edges` | `[Edge!]!` | Translation edges. |
| `translations.edges.node` | `StateTranslation!` | Individual translation. |
| `translations.edges.node.id` | `ID!` | Translation ID. |
| `translations.edges.node.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translations.edges.node.defaultName` | `String!` | Translated state name. |
| `translations.totalCount` | `Int!` | Total translations for this state. |

## Use Cases

### 1. Address Validation
Validate that selected state exists and belongs to the correct country.

### 2. Multi-Language Display
Show state name in customer's preferred language.

### 3. Order Processing
Retrieve complete state information for order confirmation and shipping.

### 4. State Information Display
Display state code and name in customer account or dashboard.

### 5. Checkout Confirmation
Confirm state information before finalizing order.

## Best Practices

1. **Include Translations** - Always fetch translations for accurate multi-language support
2. **Validate Country Match** - Ensure state countryId matches selected country
3. **Store State Code** - Use state code for data consistency across systems
4. **Cache by ID** - Cache individual states to reduce API calls
5. **Handle Missing States** - Gracefully handle not found errors
6. **Use Default Name Fallback** - Fall back to defaultName if translation unavailable
7. **Verify Data Format** - Accept both numeric and path-format IDs

## ID Format

The `id` argument accepts either format:

```graphql
# Numeric format
countryState(id: "1")

# API path format
countryState(id: "/api/shop/country-states/1")
```

Both formats return identical results.

## State Code Reference

State codes vary by country:
- **US States**: 2-letter codes (AL, AK, AZ, CA, CO, etc.)
- **Canadian Provinces**: 2-letter codes (ON, BC, QC, AB, etc.)
- **European Regions**: Varies by country
- **Asian States**: Varies by country
- **UAE Emirates**: 2-letter codes (AD, AJ, DU, etc.)

## Related Resources

- [Countries](/api/graphql/shop/queries/get-countries) - Get all countries
- [Country](/api/graphql/shop/queries/get-country) - Get single country with states
- [Country States](/api/graphql/shop/queries/get-country-states) - Get all states for a country
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
