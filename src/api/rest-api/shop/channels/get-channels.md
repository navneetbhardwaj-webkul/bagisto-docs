---
outline: false
examples:
  - id: get-channels
    title: Get All Channels
    description: Retrieve list of all store channels.
    request: |
      GET /api/shop/channels
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "default",
            "name": "Default Channel",
            "description": "Default website channel",
            "hostname": "example.com",
            "isActive": true
          },
          {
            "id": 2,
            "code": "mobile",
            "name": "Mobile Store",
            "description": "Mobile app channel",
            "hostname": "mobile.example.com",
            "isActive": true
          }
        ]
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Channels

Retrieve a list of all available store channels.

## Endpoint

```
GET /api/shop/channels
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

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

## Use Cases

- Get available store channels
- Display channel-specific information
- Load channel configuration
- Multi-channel store support

## Related Resources

- [Single Channel](/api/rest-api/shop/channels/get-channel)
