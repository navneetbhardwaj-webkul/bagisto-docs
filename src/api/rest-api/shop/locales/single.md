---
outline: false
examples:
  - id: get-locale-basic
    title: Get Single Locale - English
    description: Retrieve a single locale by ID with basic information.
    curl: |
      curl -X 'GET' \
        'http://127.0.0.1:8001/api/shop/locales/1' \
        -H 'accept: application/json'
    headers: |
      Content-Type: application/json
      Accept: application/json
    response: |
      {
        "id": 1,
        "code": "en",
        "name": "English",
        "direction": "ltr",
        "logoPath": "locales/en.png",
        "logoUrl": "http://127.0.0.1:8000/storage/locales/en.png"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Locale ID does not exist
        solution: Provide a valid locale ID that exists in the system

  - id: get-locale-complete
    title: Get Single Locale - With Timestamps
    description: Retrieve a single locale with all fields including timestamps.
    curl: |
      curl -X 'GET' \
        'http://127.0.0.1:8001/api/shop/locales/2' \
        -H 'accept: application/json'
    headers: |
      Content-Type: application/json
      Accept: application/json
    response: |
      {
        "id": 2,
        "code": "ar",
        "name": "Arabic",
        "direction": "rtl",
        "logoPath": "locales/ar.png",
        "logoUrl": "http://127.0.0.1:8000/storage/locales/ar.png",
        "createdAt": "2023-11-20T18:15:58+05:30",
        "updatedAt": "2023-11-20T18:15:58+05:30"
      }
    commonErrors:
      - error: 404 Not Found
        cause: The provided locale ID does not exist
        solution: Use a valid locale ID from the list locales endpoint

  - id: get-locale-rtl
    title: Get RTL Locale Details
    description: Retrieve a right-to-left locale with full details for UI configuration.
    curl: |
      curl -X 'GET' \
        'http://127.0.0.1:8001/api/shop/locales/2' \
        -H 'accept: application/json'
    headers: |
      Content-Type: application/json
      Accept: application/json
    response: |
      {
        "id": 2,
        "code": "ar",
        "name": "Arabic",
        "direction": "rtl",
        "logoPath": "locales/ar.png",
        "logoUrl": "http://127.0.0.1:8000/storage/locales/ar.png",
        "createdAt": "2023-11-20T18:15:58+05:30",
        "updatedAt": "2023-11-20T18:15:58+05:30"
      }
    commonErrors:
      - error: 404 Not Found
        cause: The provided locale ID does not exist
        solution: Verify the locale ID is correct

  - id: get-locale-node-js
    title: Get Locale - Node.js
    description: Retrieve a locale using Node.js fetch API.
    curl: |
      curl -X 'GET' \
        'http://127.0.0.1:8001/api/shop/locales/1' \
        -H 'accept: application/json'
    headers: |
      Content-Type: application/json
      Accept: application/json
    response: |
      {
        "id": 1,
        "code": "en",
        "name": "English",
        "direction": "ltr",
        "logoPath": "locales/en.png",
        "logoUrl": "http://127.0.0.1:8000/storage/locales/en.png"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Locale not found
        solution: Verify locale ID exists
---

# Get Single Locale

## About

Retrieves a single locale resource by ID with complete locale information. This endpoint is essential for:

- Fetching specific locale details for UI configuration
- Checking text direction (LTR/RTL) for layout adjustments
- Retrieving locale-specific branding logos and URLs
- Validating locale existence before operations
- Building locale detail pages and selectors
- Configuring locale-specific settings in the storefront

The endpoint returns a single locale object with all properties including timestamps and asset URLs.

## Endpoint

```
GET /api/shop/locales/{id}
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ Yes | The unique identifier of the locale |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `Accept` | string | Response format (application/json) |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier for the locale |
| `code` | string | Unique locale code (e.g., "en", "ar", "fr", "de") |
| `name` | string | Display name of the locale (e.g., "English", "Arabic") |
| `direction` | string | Text direction: "ltr" (left-to-right) or "rtl" (right-to-left) |
| `logoPath` | string | File path to the locale logo (e.g., "locales/en.png") |
| `logoUrl` | string | Full URL to the locale logo asset |
| `createdAt` | string | Creation timestamp (ISO 8601 format) |
| `updatedAt` | string | Last update timestamp (ISO 8601 format) |

## Common Use Cases

### Get Locale Details by ID

```bash
GET /api/shop/locales/1
```

Response:
```json
{
  "id": 1,
  "code": "en",
  "name": "English",
  "direction": "ltr",
  "logoPath": "locales/en.png",
  "logoUrl": "http://127.0.0.1:8000/storage/locales/en.png"
}
```

### Get Locale with Logo URL for Display

```bash
GET /api/shop/locales/1
```

Use the `logoUrl` field to display the locale flag or logo:
```json
{
  "id": 1,
  "code": "en",
  "name": "English",
  "logoUrl": "http://127.0.0.1:8000/storage/locales/en.png"
}
```

### Check If Locale is RTL

```bash
GET /api/shop/locales/2
```

Response with `direction` field to determine RTL layout:
```json
{
  "id": 2,
  "code": "ar",
  "name": "Arabic",
  "direction": "rtl",
  "logoUrl": "http://127.0.0.1:8000/storage/locales/ar.png"
}
```

### Get Complete Locale Information

```bash
GET /api/shop/locales/1
```

Full response including timestamps:
```json
{
  "id": 1,
  "code": "en",
  "name": "English",
  "direction": "ltr",
  "logoPath": "locales/en.png",
  "logoUrl": "http://127.0.0.1:8000/storage/locales/en.png",
  "createdAt": "2023-11-20T18:15:58+05:30",
  "updatedAt": "2023-11-20T18:15:58+05:30"
}
```

## Error Handling

### Locale Not Found

```
Status Code: 404
```

```json
{
  "message": "Locale not found"
}
```

### Invalid Locale ID

```
Status Code: 400
```

```json
{
  "message": "Invalid locale identifier"
}
```

## Best Practices

1. **Always Provide ID** - The ID parameter is required for this endpoint
2. **Handle 404 Errors** - Handle the case when locale is not found
3. **Use Direction Field** - Always check the `direction` field for proper UI layout
4. **Cache Results** - Locales change infrequently; implement caching strategy
5. **Use Logo URLs** - Display locale logos/flags for better UX using the `logoUrl` field
6. **Validate Before Using** - Verify locale exists before using in operations
7. **Handle RTL Properly** - Apply appropriate CSS classes based on direction value
8. **Request Only Needed Data** - Filter response fields if API supports sparse fieldsets

## Related Resources

- [List Locales](/api/rest-api/shop/queries/get-locales) - Retrieve all locales with pagination
- [Pagination Guide](/api/rest-api/introduction#pagination) - Pagination and filtering documentation
- [Shop Resources](/api/rest-api/introduction#shop-resources) - Overview of Shop API resources
- [Authentication Guide](/api/rest-api/authentication) - Authentication and authorization
