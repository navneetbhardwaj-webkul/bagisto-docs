---
outline: false
examples:
  - id: get-attribute
    title: Get Single Attribute
    description: Retrieve detailed information for a specific attribute.
    request: |
      GET /api/shop/attributes/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": {
          "id": 1,
          "code": "color",
          "name": "Color",
          "type": "select",
          "isRequired": false,
          "isVisibleOnFront": true,
          "options": [
            {
              "id": 1,
              "label": "Red",
              "value": "red"
            },
            {
              "id": 2,
              "label": "Blue",
              "value": "blue"
            },
            {
              "id": 3,
              "label": "Black",
              "value": "black"
            }
          ]
        }
      }
    commonErrors:
      - error: 404 Not Found
        cause: Attribute with specified ID does not exist
        solution: Verify the attribute ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Single Attribute

Retrieve detailed information for a specific product attribute including all available options.

## Endpoint

```
GET /api/shop/attributes/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Attribute ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute ID |
| `code` | string | Unique attribute code |
| `name` | string | Attribute display name |
| `type` | string | Attribute type (text, select, multiselect, textarea) |
| `isRequired` | boolean | Whether attribute is required |
| `isVisibleOnFront` | boolean | Visible to customers |
| `options` | array | Available options |

## Option Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Option ID |
| `label` | string | Option display label |
| `value` | string | Option value |

## Use Cases

- Build product configuration forms
- Display attribute details
- Create attribute-based filters
- Load variant options for products
- Show size, color, or other variant choices

## Related Resources

- [Get Attributes](/api/rest-api/shop/attributes/get-attributes)
- [Get Attribute Options](/api/rest-api/shop/attributes/get-attribute-options)
- [Get Products](/api/rest-api/shop/products/get-products)
