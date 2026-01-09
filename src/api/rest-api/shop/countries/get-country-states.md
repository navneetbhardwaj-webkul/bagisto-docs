---
outline: false
examples:
  - id: get-country-states
    title: Get Country States
    description: Retrieve all states/provinces for a specific country.
    request: |
      GET /api/shop/countries/1/states
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "countryId": 1,
            "code": "CA",
            "name": "California"
          },
          {
            "id": 2,
            "countryId": 1,
            "code": "NY",
            "name": "New York"
          },
          {
            "id": 3,
            "countryId": 1,
            "code": "TX",
            "name": "Texas"
          }
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: Country with specified ID does not exist
        solution: Verify the country ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Country States

Retrieve all states or provinces for a specific country.

## Endpoint

```
GET /api/shop/countries/{countryId}/states
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `countryId` | integer | Yes | Country ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | State ID |
| `countryId` | integer | Associated country ID |
| `code` | string | State/province code |
| `name` | string | State/province name |

## Use Cases

- Populate state/province selector dropdowns
- Load states when country is selected in forms
- Validate shipping/billing addresses
- Display state information

## Related Resources

- [Get Countries](/api/rest-api/shop/countries/get-countries)
- [Single Country](/api/rest-api/shop/countries/get-country)
- [Single Country State](/api/rest-api/shop/countries/get-country-state)
