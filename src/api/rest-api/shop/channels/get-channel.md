---
outline: false
examples:
  - id: get-channel
    title: Get Single Channel
    description: Retrieve detailed information for a specific channel.
    request: |
      GET /api/shop/channels/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "code": "default",
          "name": "Default Channel",
          "description": "Default website channel",
          "hostname": "example.com",
          "isActive": true,
          "logoUrl": "https://example.com/logo.png",
          "faviconUrl": "https://example.com/favicon.ico",
          "createdAt": "2024-01-01T00:00:00Z",
          "updatedAt": "2024-01-15T00:00:00Z"
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Channel with specified ID does not exist
        solution: Verify the channel ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Single Channel

Retrieve detailed information for a specific store channel.

## Endpoint

```
GET /api/shop/channels/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Channel ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Channel ID |
| `code` | string | Unique channel code |
| `name` | string | Channel display name |
| `description` | string | Channel description |
| `hostname` | string | Channel domain/hostname |
| `isActive` | boolean | Channel active status |
| `logoUrl` | string | Channel logo URL |
| `faviconUrl` | string | Channel favicon URL |
| `createdAt` | string | Creation date |
| `updatedAt` | string | Last update date |

## Use Cases

- Get channel branding information
- Load channel-specific configuration
- Fetch logo and favicon for display
- Support multi-channel storefronts

## Related Resources

- [Get Channels](/api/rest-api/shop/channels/get-channels)
