---
outline: false
examples:
  - id: get-locales
    title: Get All Locales
    description: Retrieve all available language locales in the store.
    request: |
      GET /api/shop/locales?page=1
      Accept: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      [
        {
          "id": 1,
          "code": "en",
          "name": "English",
          "direction": "ltr",
          "logoPath": "locales/JuC6oD40TWtf6R2S08kQ95cecRqUKd3UctVivnSt.png",
          "logoUrl": "http://127.0.0.1:8001/storage/locales/JuC6oD40TWtf6R2S08kQ95cecRqUKd3UctVivnSt.png"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid storefront API key in X-STOREFRONT-KEY header
      - error: 400 Bad Request
        cause: Invalid page parameter
        solution: Use valid page numbers starting from 1

---

# Get All Locales

Retrieve all available language locales supported by your store.

## Endpoint

```
GET /api/shop/locales
```

## Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `page` | integer | No | Pagination page number | `1` |
| `per_page` | integer | No | Items per page (max: 100) | `10` |

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
curl -X GET 'http://127.0.0.1:8000/api/shop/locales?page=1' \
  -H 'accept: application/json' \
  -H 'X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy'
```

## JavaScript/Fetch Example

```javascript
fetch('https://your-domain.com/api/shop/locales?page=1', {
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
| `X-RateLimit-Remaining` | Remaining requests in current window (e.g., `95`) |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |
| `X-Built-With` | `Bagisto` |

## Error Responses

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

### 400 Bad Request

```json
{
  "message": "Invalid parameters",
  "errors": {
    "page": [
      "The page parameter must be a valid integer"
    ]
  }
}
```

## Language Codes

Common ISO 639-1 codes:
- `en` - English
- `fr` - French
- `de` - German
- `es` - Spanish
- `it` - Italian
- `pt` - Portuguese
- `ar` - Arabic
- `zh` - Chinese
- `ja` - Japanese

## Text Direction

- `ltr` - Left-to-right (Latin, Cyrillic scripts)
- `rtl` - Right-to-left (Arabic, Hebrew)

## Use Cases

- Build language/locale selector dropdowns
- Support multi-language storefront
- Display locale-specific content
- Set user language preferences
- Load locale-specific product information
- Render RTL layouts for Arabic/Hebrew

## Related Resources

- [Get Single Locale](/api/rest-api/shop/locales/get-single-locale)
