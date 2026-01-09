---
outline: false
examples:
  - id: get-countries
    title: Get All Countries
    description: Retrieve list of all available countries.
    request: |
      GET /api/shop/countries
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "US",
            "name": "United States",
            "states": [
              {"code": "CA", "name": "California"},
              {"code": "NY", "name": "New York"}
            ]
          },
          {
            "id": 2,
            "code": "CA",
            "name": "Canada",
            "states": [
              {"code": "ON", "name": "Ontario"},
              {"code": "BC", "name": "British Columbia"}
            ]
          }
        ]
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Countries

Retrieve a list of all available countries and their states/provinces.

## Endpoint

```
GET /api/shop/countries
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `includeStates` | boolean | No | Include state/province information (default: true) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Country ID |
| `code` | string | ISO 2-letter country code |
| `name` | string | Country name |
| `states` | array | States/provinces within country |

## State Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | State/province code |
| `name` | string | State/province name |

## Use Cases

- Build country selector dropdowns
- Populate country list in shipping/billing forms
- Load state/province options based on country selection
- Validate shipping addresses
- Display available shipping destinations

## Related Resources

- [Single Country](/api/rest-api/shop/countries/get-country)
- [Get Country States](/api/rest-api/shop/countries/get-country-states)
