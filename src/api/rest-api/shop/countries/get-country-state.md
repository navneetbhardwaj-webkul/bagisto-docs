---
outline: false
examples:
  - id: get-country-state
    title: Get Single Country State
    description: Retrieve detailed information for a specific state/province.
    request: |
      GET /api/shop/countries/1/states/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "countryId": 1,
          "code": "CA",
          "name": "California",
          "createdAt": "2024-01-01T00:00:00Z"
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: State with specified ID does not exist
        solution: Verify the state ID and country ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Single Country State

Retrieve detailed information for a specific state or province.

## Endpoint

```
GET /api/shop/countries/{countryId}/states/{stateId}
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
| `stateId` | integer | Yes | State/Province ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | State ID |
| `countryId` | integer | Associated country ID |
| `code` | string | State/province code |
| `name` | string | State/province name |
| `createdAt` | string | Creation date |

## Use Cases

- Validate state/province selection
- Get state details for display
- Verify address information
- Load shipping tax rates by state

## Related Resources

- [Get Countries](/api/rest-api/shop/countries/get-countries)
- [Get Country States](/api/rest-api/shop/countries/get-country-states)
