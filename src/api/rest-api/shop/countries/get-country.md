---
outline: false
examples:
  - id: get-country
    title: Get Single Country
    description: Retrieve details for a specific country with its states.
    request: |
      GET /api/shop/countries/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "code": "US",
          "name": "United States",
          "createdAt": "2024-01-01T00:00:00Z",
          "states": [
            {
              "id": 1,
              "code": "CA",
              "name": "California"
            },
            {
              "id": 2,
              "code": "NY",
              "name": "New York"
            }
          ]
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Country with specified ID does not exist
        solution: Verify the country ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Single Country

Retrieve detailed information for a specific country including all its states/provinces.

## Endpoint

```
GET /api/shop/countries/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Country ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Country ID |
| `code` | string | ISO 2-letter country code |
| `name` | string | Country name |
| `createdAt` | string | Creation date |
| `states` | array | States/provinces within country |

## State Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | State ID |
| `code` | string | State/province code |
| `name` | string | State/province name |

## Use Cases

- Load states/provinces for selected country
- Display country information
- Validate shipping addresses
- Populate address forms with state options

## Related Resources

- [Get Countries](/api/rest-api/shop/countries/get-countries)
- [Get Country States](/api/rest-api/shop/countries/get-country-states)
