---
outline: false
examples:
  - id: get-single-locale
    title: Get Single Locale
    description: Retrieve detailed information for a specific language locale.
    request: |
      GET /api/shop/locales/1
      Accept: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "id": 1,
        "code": "en",
        "name": "English",
        "direction": "ltr",
        "logoPath": "locales/JuC6oD40TWtf6R2S08kQ95cecRqUKd3UctVivnSt.png",
        "logoUrl": "http://127.0.0.1:8001/storage/locales/JuC6oD40TWtf6R2S08kQ95cecRqUKd3UctVivnSt.png"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Locale with specified ID does not exist
        solution: Verify the locale ID and try again
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid storefront API key in X-STOREFRONT-KEY header

---

# Get Single Locale

Retrieve detailed information for a specific language locale.

## Endpoint

```
GET /api/shop/locales/{id}
```

## Path Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `id` | string/integer | **Yes** | Locale identifier | `1` |

## Request Headers

| Header | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| `X-STOREFRONT-KEY` | string | **Yes** | Storefront API key for authentication | `pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy` |
| `Accept` | string | No | Response format | `application/json` |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Locale ID |
| `code` | string | Language code (ISO 639-1, e.g., en, fr, ar) |
| `name` | string | English locale name |
| `direction` | string | Text direction (ltr=left-to-right, rtl=right-to-left) |
| `logoPath` | string | Logo path in storage |
| `logoUrl` | string | Full URL to locale logo |

## cURL Example

```bash
curl -X GET 'http://127.0.0.1:8000/api/shop/locales/1' \
  -H 'accept: application/json' \
  -H 'X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy'
```

## JavaScript/Fetch Example

```javascript
fetch('https://your-domain.com/api/shop/locales/1', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'X-STOREFRONT-KEY': 'pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Response Headers

| Header | Description |
|--------|-------------|
| `Content-Type` | `application/json; charset=utf-8` |
| `X-RateLimit-Limit` | Maximum requests allowed per minute (e.g., `100`) |
| `X-RateLimit-Remaining` | Remaining requests in current window (e.g., `94`) |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |
| `X-Built-With` | `Bagisto` |
| `Cache-Control` | `no-cache,private` |

## Error Responses

### 404 Not Found

```json
{
  "message": "Locale not found",
  "errors": {
    "id": [
      "The specified locale does not exist"
    ]
  }
}
```

### 401 Unauthorized

```json
{
  "message": "Unauthorized",
  "errors": {
    "X-STOREFRONT-KEY": [
      "The X-STOREFRONT-KEY header is missing or invalid"
    ]
  }
}
```

## Text Direction

- `ltr` - Left-to-right (Latin, Cyrillic scripts)
- `rtl` - Right-to-left (Arabic, Hebrew)

## Use Cases

- Get locale details for content rendering
- Validate locale codes
- Display locale information
- Set up locale-specific formatters
- Configure RTL layout
- Fetch native language name

## Common Locale IDs

- `1` - English (en)
- `2` - French (fr)
- `3` - Arabic (ar)
- Check [Get All Locales](/api/rest-api/shop/locales/get-locales) for complete list

## Related Resources

- [Get All Locales](/api/rest-api/shop/locales/get-locales)
