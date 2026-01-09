---
outline: false
examples:
  - id: get-theme-customizations
    title: Get All Theme Customizations
    description: Retrieve all storefront theme customization sections with pagination.
    request: |
      GET /api/shop/theme-customizations?page=1
      Accept: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      [
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
            "options": "{\"images\": [{\"link\": \"\", \"image\": \"storage/theme/1/0ZStp7YsEtaXVlrqbBLcGB7qkp4XxUZEzyejgbaz.webp\", \"title\": \"Get Ready For New Collection\"}]}"
          },
          "translations": [
            {
              "id": 1,
              "themeCustomizationId": 1,
              "locale": "en",
              "options": "{\"images\": [{\"link\": \"\", \"image\": \"storage/theme/1/0ZStp7YsEtaXVlrqbBLcGB7qkp4XxUZEzyejgbaz.webp\", \"title\": \"Get Ready For New Collection\"}]}"
            }
          ]
        },
        {
          "id": 2,
          "themeCode": "default",
          "type": "static_content",
          "name": "Offer Information",
          "sortOrder": 2,
          "status": 1,
          "channelId": 1,
          "createdAt": "2026-01-07T17:20:26+05:30",
          "updatedAt": "2026-01-07T17:20:26+05:30",
          "code": "default",
          "translation": {
            "id": 2,
            "themeCustomizationId": 2,
            "locale": "en",
            "options": "{\"css\": \".home-offer h1 {display: block;}\", \"html\": \"<div class=\\\"home-offer\\\"><h1>Get UPTO 40% OFF</h1></div>\"}"
          },
          "translations": [
            {
              "id": 2,
              "themeCustomizationId": 2,
              "locale": "en",
              "options": "{\"css\": \".home-offer h1 {display: block;}\", \"html\": \"<div class=\\\"home-offer\\\"><h1>Get UPTO 40% OFF</h1></div>\"}"
            }
          ]
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid storefront API key in X-STOREFRONT-KEY header
      - error: 400 Bad Request
        cause: Invalid page parameter
        solution: Use valid page numbers starting from 1

  - id: get-theme-customizations-by-type
    title: Get Theme Customizations by Type
    description: Filter theme customizations by type (e.g., image_carousel).
    request: |
      GET /api/shop/theme-customizations?page=1&type=image_carousel
      Accept: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      [
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
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid or missing X-STOREFRONT-KEY
        solution: Provide valid storefront API key in X-STOREFRONT-KEY header
      - error: 400 Bad Request
        cause: Invalid type parameter
        solution: Use valid customization types (image_carousel, static_content, etc.)

---

# Get Theme Customizations

Retrieve all storefront theme customization sections including sliders, static content, and other theme elements.

## Endpoint

```
GET /api/shop/theme-customizations
```

## Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `page` | integer | No | Pagination page number | `1` |
| `per_page` | integer | No | Items per page (max: 100) | `10` |
| `type` | string | No | Filter by customization type | `image_carousel` |

## Request Headers

| Header | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| `X-STOREFRONT-KEY` | string | **Yes** | Storefront API key for authentication | `pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy` |
| `Accept` | string | No | Response format | `application/json` |

## Response Fields (200 OK)

The response is an array of theme customization objects with the following structure:

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
