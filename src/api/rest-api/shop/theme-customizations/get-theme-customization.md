---
outline: false
examples:
  - id: get-theme-customization
    title: Get Theme Customization (Image Carousel)
    description: Retrieve a specific theme customization by ID showing image carousel details.
    request: |
      GET /api/shop/theme-customizations/1
      Accept: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "id": 1,
        "themeCode": "default",
        "type": "image_carousel",
        "name": "Image Carousel",
        "sortOrder": 1,
        "status": 1,
        "channelId": 1,
        "createdAt": "2026-01-07T17:20:26+05:30",
        "updatedAt": "2026-01-07T17:20:26+05:30",
        "code": "default",
        "translation": {
          "id": 1,
          "themeCustomizationId": 1,
          "locale": "en",
          "options": "{\"images\": [{\"link\": \"\", \"image\": \"storage/theme/1/0ZStp7YsEtaXVlrqbBLcGB7qkp4XxUZEzyejgbaz.webp\", \"title\": \"Get Ready For New Collection\"}, {\"link\": \"\", \"image\": \"storage/theme/1/YmW734hTKgO73RYd5OK8bmuh4yaMj88kdUV0FAvw.webp\", \"title\": \"Get Ready For New Collection\"}]}"
        },
        "translations": [
          {
            "id": 1,
            "themeCustomizationId": 1,
            "locale": "en",
            "options": "{\"images\": [{\"link\": \"\", \"image\": \"storage/theme/1/0ZStp7YsEtaXVlrqbBLcGB7qkp4XxUZEzyejgbaz.webp\", \"title\": \"Get Ready For New Collection\"}, {\"link\": \"\", \"image\": \"storage/theme/1/YmW734hTKgO73RYd5OK8bmuh4yaMj88kdUV0FAvw.webp\", \"title\": \"Get Ready For New Collection\"}]}"
          }
        ]
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid storefront API key in X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: Theme customization with specified ID does not exist
        solution: Verify the theme customization ID exists

---

# Get Theme Customization

Retrieve a specific theme customization section by ID with all its translation data.

## Endpoint

```
GET /api/shop/theme-customizations/{id}
```

## Path Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `id` | integer | **Yes** | Theme customization ID | `1` |

## Request Headers

| Header | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| `X-STOREFRONT-KEY` | string | **Yes** | Storefront API key for authentication | `pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy` |
| `Accept` | string | No | Response format | `application/json` |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Customization section ID |
| `themeCode` | string | Theme code (e.g., "default") |
| `type` | string | Section type (image_carousel, static_content, etc.) |
| `name` | string | Human-readable name |
| `sortOrder` | integer | Display order |
| `status` | integer | Status (1=active, 0=inactive) |
| `channelId` | integer | Associated channel ID |
| `createdAt` | string | ISO 8601 creation timestamp |
| `updatedAt` | string | ISO 8601 update timestamp |
| `code` | string | Unique code identifier |
| `translation` | object | Current locale translation data |
| `translations` | array | All available locale translations |

## Translation Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Translation ID |
| `themeCustomizationId` | integer | Parent customization ID |
| `locale` | string | Language locale (e.g., "en") |
| `options` | string | JSON string with customization options |

## Customization Types

| Type | Description | Options |
|------|-------------|---------|
| `image_carousel` | Image slider/carousel | `images` array with link, image, title |
| `static_content` | HTML/CSS content | `html`, `css` strings |
| `product_section` | Featured products | `products` array |
| `category_section` | Featured categories | `categories` array |

## Options Structure

Depending on the type, the `options` field contains different data (stored as JSON string):

**Image Carousel Options:**
```json
{
  "images": [
    {
      "link": "https://example.com/product",
      "image": "storage/theme/1/image.webp",
      "title": "Get Ready For New Collection"
    }
  ]
}
```

**Static Content Options:**
```json
{
  "css": ".home-offer h1 { display: block; }",
  "html": "<div class=\"home-offer\"><h1>Special Offer</h1></div>"
}
```

## Response Headers

| Header | Description |
|--------|-------------|
| `Content-Type` | `application/json; charset=utf-8` |
| `X-RateLimit-Limit` | Maximum requests allowed per minute |
| `X-RateLimit-Remaining` | Remaining requests in current window |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |
| `X-Built-With` | `Bagisto` |
| `Cache-Control` | `no-cache,private` |

## Error Responses

### 404 Not Found

```json
{
  "message": "Theme customization not found",
  "errors": {
    "id": [
      "The specified theme customization does not exist"
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

## Use Cases

- Load specific theme section configuration
- Fetch carousel images and metadata
- Get HTML/CSS content for theme sections
- Display theme element details
- Manage theme content by section ID
- Update individual theme sections

## Related Resources

- [Get All Theme Customizations](./get-theme-customizations) - List all customizations
- [Get Channels](/api/rest-api/shop/channels/get-channels)
- [Get Locales](/api/rest-api/shop/locales/get-locales)
