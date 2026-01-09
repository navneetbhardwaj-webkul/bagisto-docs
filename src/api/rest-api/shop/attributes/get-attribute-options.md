---
outline: false
examples:
  - id: get-attribute-options
    title: Get Attribute Options
    description: Retrieve all available options for a specific attribute.
    request: |
      GET /api/shop/attributes/1/options
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      {
        "data": [
          {
            "id": 1,
            "label": "Red",
            "value": "red",
            "swatchType": "color",
            "swatchValue": "#FF0000"
          },
          {
            "id": 2,
            "label": "Blue",
            "value": "blue",
            "swatchType": "color",
            "swatchValue": "#0000FF"
          },
          {
            "id": 3,
            "label": "Black",
            "value": "black",
            "swatchType": "color",
            "swatchValue": "#000000"
          }
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: Attribute with specified ID does not exist
        solution: Verify the attribute ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Attribute Options

Retrieve all available options for a specific product attribute.

## Endpoint

```
GET /api/shop/attributes/{attributeId}/options
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `attributeId` | integer | Yes | Attribute ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Option ID |
| `label` | string | Option display label |
| `value` | string | Option value |
| `swatchType` | string | Swatch type (color, image, text) |
| `swatchValue` | string | Swatch value (color code, image URL, or text) |
| `sortOrder` | integer | Display order |

## Use Cases

- Populate dropdown/select fields in product configuration
- Display color swatches for color attributes
- Show size options for clothing
- Build variant selection interfaces
- Create attribute-based product filters

## Related Resources

- [Get Attributes](/api/rest-api/shop/attributes/get-attributes)
- [Single Attribute](/api/rest-api/shop/attributes/get-attribute)
