---
outline: false
examples:
  - id: get-attributes
    title: Get All Attributes
    description: Retrieve paginated list of product attributes.
    request: |
      GET /api/shop/attributes
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "color",
            "name": "Color",
            "type": "select",
            "options": [
              {"id": 1, "label": "Red"},
              {"id": 2, "label": "Blue"},
              {"id": 3, "label": "Black"}
            ]
          },
          {
            "id": 2,
            "code": "size",
            "name": "Size",
            "type": "select",
            "options": [
              {"id": 4, "label": "Small"},
              {"id": 5, "label": "Medium"},
              {"id": 6, "label": "Large"}
            ]
          }
        ],
        "pagination": {
          "total": 2,
          "perPage": 10,
          "currentPage": 1
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Attributes

Retrieve a paginated list of product attributes with their options.

## Endpoint

```
GET /api/shop/attributes
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Attributes per page |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute ID |
| `code` | string | Unique attribute code |
| `name` | string | Attribute display name |
| `type` | string | Attribute type (text, select, multiselect, textarea) |
| `options` | array | Available options (for select/multiselect) |

## Option Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Option ID |
| `label` | string | Option display label |
| `value` | string | Option value |

## Use Cases

- Load product filter options
- Build product configuration pages
- Display attribute filters on category pages
- Get available sizes, colors, variants
- Create product search filters

## Related Resources

- [Single Attribute](/api/rest-api/shop/attributes/get-attribute)
- [Get Attribute Options](/api/rest-api/shop/attributes/get-attribute-options)
