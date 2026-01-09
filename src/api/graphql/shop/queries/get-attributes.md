---
outline: false
examples:
  - id: get-attributes-basic
    title: Get Attributes - Basic
    description: Retrieve a paginated list of all product attributes with basic information.
    query: |
      query getAllAttributes($first: Int, $after: String) {
        attributes(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              code
              adminName
              type
              swatchType
              position
              isRequired
              isConfigurable
              options {
                edges {
                  node {
                    id
                    adminName
                    swatchValue
                  }
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "attributes": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attributes/1",
                  "_id": 1,
                  "code": "sku",
                  "adminName": "SKU",
                  "type": "text",
                  "swatchType": null,
                  "position": 1,
                  "isRequired": "1",
                  "isConfigurable": "0",
                  "options": {
                    "edges": [],
                    "totalCount": 0
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/attributes/23",
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "type": "select",
                  "swatchType": "color",
                  "position": 26,
                  "isRequired": "0",
                  "isConfigurable": "1",
                  "options": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/1",
                          "adminName": "Red",
                          "swatchValue": "#e10e0e"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/2",
                          "adminName": "Green",
                          "swatchValue": "#155616"
                        }
                      }
                    ],
                    "totalCount": 12
                  }
                },
                "cursor": "MjI="
              }
            ],
            "pageInfo": {
              "endCursor": "Mjk=",
              "hasNextPage": true
            },
            "totalCount": 38
          }
        }
      }
    commonErrors:
      - error: Argument \"first\" must be between 1 and 100
        cause: Pagination limit exceeds maximum allowed
        solution: Use a value between 1 and 100 for first parameter
      - error: Invalid cursor provided
        cause: Provided cursor is invalid or expired
        solution: Use cursors from the pageInfo section of previous responses

  - id: get-attributes-with-options
    title: Get Attributes with Full Options and Translations
    description: Retrieve attributes with complete option details and multi-locale translations.
    query: |
      query getAllAttributes($first: Int) {
        attributes(first: $first) {
          edges {
            node {
              id
              _id
              code
              adminName
              type
              swatchType
              validation
              regex
              position
              isRequired
              isUnique
              isFilterable
              isComparable
              isConfigurable
              isUserDefined
              isVisibleOnFront
              valuePerLocale
              valuePerChannel
              defaultValue
              enableWysiwyg
              createdAt
              updatedAt
              columnName
              validations
              options {
                edges {
                  node {
                    id
                    _id
                    adminName
                    sortOrder
                    swatchValue
                    swatchValueUrl
                    translation {
                      id
                      _id
                      attributeOptionId
                      locale
                      label
                    }
                    translations {
                      edges {
                        node {
                          id
                          _id
                          attributeOptionId
                          locale
                          label
                        }
                      }
                      pageInfo {
                        endCursor
                        hasNextPage
                      }
                      totalCount
                    }
                  }
                  cursor
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
                totalCount
              }
              translations {
                edges {
                  node {
                    id
                    _id
                    attributeId
                    locale
                    name
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 5
      }
    response: |
      {
        "data": {
          "attributes": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attributes/1",
                  "_id": 1,
                  "code": "sku",
                  "adminName": "SKU",
                  "type": "text",
                  "swatchType": null,
                  "validation": null,
                  "regex": null,
                  "position": 1,
                  "isRequired": "1",
                  "isUnique": "1",
                  "isFilterable": "0",
                  "isComparable": "0",
                  "isConfigurable": "0",
                  "isUserDefined": "0",
                  "isVisibleOnFront": "0",
                  "valuePerLocale": "0",
                  "valuePerChannel": "0",
                  "defaultValue": null,
                  "enableWysiwyg": "0",
                  "createdAt": "2023-11-02T10:30:00+05:30",
                  "updatedAt": "2023-12-06T12:00:00+05:30",
                  "columnName": "text_value",
                  "validations": "{ }",
                  "options": {
                    "edges": [],
                    "pageInfo": {
                      "endCursor": null,
                      "hasNextPage": false
                    },
                    "totalCount": 0
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/attribute_translations/1",
                          "_id": 1,
                          "attributeId": "1",
                          "locale": "en",
                          "name": "SKU"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "hasNextPage": false
                    },
                    "totalCount": 1
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/attributes/23",
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "type": "select",
                  "swatchType": "color",
                  "validation": null,
                  "regex": null,
                  "position": 26,
                  "isRequired": "0",
                  "isUnique": "0",
                  "isFilterable": "1",
                  "isComparable": "0",
                  "isConfigurable": "1",
                  "isUserDefined": "1",
                  "isVisibleOnFront": "0",
                  "valuePerLocale": "0",
                  "valuePerChannel": "0",
                  "defaultValue": null,
                  "enableWysiwyg": "0",
                  "createdAt": "2023-11-02T16:40:10+05:30",
                  "updatedAt": "2023-12-06T12:52:51+05:30",
                  "columnName": "integer_value",
                  "validations": "{ }",
                  "options": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/1",
                          "_id": 1,
                          "adminName": "Red",
                          "sortOrder": 0,
                          "swatchValue": "#e10e0e",
                          "swatchValueUrl": null,
                          "translation": {
                            "id": "/api/attribute_option_translations/1",
                            "_id": 1,
                            "attributeOptionId": "1",
                            "locale": "en",
                            "label": "Red"
                          },
                          "translations": {
                            "edges": [
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/84",
                                  "_id": 84,
                                  "attributeOptionId": "1",
                                  "locale": "ar",
                                  "label": ""
                                }
                              },
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/1",
                                  "_id": 1,
                                  "attributeOptionId": "1",
                                  "locale": "en",
                                  "label": "Red"
                                }
                              }
                            ],
                            "pageInfo": {
                              "endCursor": "MQ==",
                              "hasNextPage": false
                            },
                            "totalCount": 2
                          }
                        },
                        "cursor": "MA=="
                      },
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/2",
                          "_id": 2,
                          "adminName": "Green",
                          "sortOrder": 1,
                          "swatchValue": "#155616",
                          "swatchValueUrl": null,
                          "translation": {
                            "id": "/api/attribute_option_translations/2",
                            "_id": 2,
                            "attributeOptionId": "2",
                            "locale": "en",
                            "label": "Green"
                          },
                          "translations": {
                            "edges": [
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/85",
                                  "_id": 85,
                                  "attributeOptionId": "2",
                                  "locale": "ar",
                                  "label": ""
                                }
                              },
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/2",
                                  "_id": 2,
                                  "attributeOptionId": "2",
                                  "locale": "en",
                                  "label": "Green"
                                }
                              }
                            ],
                            "pageInfo": {
                              "endCursor": "MQ==",
                              "hasNextPage": false
                            },
                            "totalCount": 2
                          }
                        },
                        "cursor": "MQ=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MjE=",
                      "hasNextPage": true
                    },
                    "totalCount": 12
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/attribute_translations/23",
                          "_id": 23,
                          "attributeId": "23",
                          "locale": "en",
                          "name": "Color"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "hasNextPage": false
                    },
                    "totalCount": 1
                  }
                },
                "cursor": "MjI="
              }
            ],
            "pageInfo": {
              "endCursor": "Mjk=",
              "startCursor": "MA==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 38
          }
        }
      }
    commonErrors:
      - error: Argument \"first\" must be between 1 and 100
        cause: Pagination limit exceeds maximum allowed
        solution: Use a value between 1 and 100 for first parameter
      - error: Invalid cursor provided
        cause: Provided cursor is invalid or expired
        solution: Use cursors from the pageInfo section of previous responses

---

# Get Attributes

Retrieve a paginated collection of all product attributes available in the system. This query includes attribute configurations, validation rules, option values with swatches, and translations for multiple locales.

## Query Structure

```graphql
query getAllAttributes {
  attributes {
    edges {
      node {
        id
        _id
        code
        adminName
        type
        swatchType
        validation
        regex
        position
        isRequired
        isUnique
        isFilterable
        isComparable
        isConfigurable
        isUserDefined
        isVisibleOnFront
        valuePerLocale
        valuePerChannel
        defaultValue
        enableWysiwyg
        createdAt
        updatedAt
        columnName
        validations
        options {
          edges {
            node {
              id
              _id
              adminName
              sortOrder
              swatchValue
              swatchValueUrl
              translation {
                id
                _id
                attributeOptionId
                locale
                label
              }
              translations {
                edges {
                  node {
                    id
                    _id
                    attributeOptionId
                    locale
                    label
                  }
                }
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
        translations {
          edges {
            node {
              id
              _id
              attributeId
              locale
              name
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `first` | Int | No | Number of attributes to fetch (default: 10, max: 100) |
| `after` | String | No | Cursor for forward pagination |
| `last` | Int | No | Number of attributes to fetch backward |
| `before` | String | No | Cursor for backward pagination |

## Field Descriptions

### Attribute Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | IRI format ID (`/api/shop/attributes/{id}`) |
| `_id` | Int | Numeric attribute ID |
| `code` | String | Machine-readable attribute code (e.g., "sku", "color", "size") |
| `adminName` | String | Human-readable name shown in admin panel |
| `type` | String | Attribute input type: `text`, `textarea`, `select`, `boolean`, `date`, `price` |
| `swatchType` | String | Visual representation type: `color`, `text`, or null |
| `validation` | String | Validation rule type (e.g., "decimal", "integer") |
| `regex` | String | Regular expression pattern for custom validation |
| `position` | Int | Display position in forms |
| `isRequired` | String | Whether attribute is required ("0" or "1") |
| `isUnique` | String | Whether values must be unique ("0" or "1") |
| `isFilterable` | String | Can be used in layered navigation ("0" or "1") |
| `isComparable` | String | Can be used in product comparison ("0" or "1") |
| `isConfigurable` | String | Can configure variations ("0" or "1") |
| `isUserDefined` | String | Custom attribute vs system ("0" or "1") |
| `isVisibleOnFront` | String | Visible to customers on storefront ("0" or "1") |
| `valuePerLocale` | String | Has locale-specific values ("0" or "1") |
| `valuePerChannel` | String | Has channel-specific values ("0" or "1") |
| `defaultValue` | String | Default value if not specified |
| `enableWysiwyg` | String | Enable WYSIWYG editor for textarea ("0" or "1") |
| `createdAt` | DateTime | ISO 8601 timestamp when attribute was created |
| `updatedAt` | DateTime | ISO 8601 timestamp of last modification |
| `columnName` | String | Database column name (e.g., "text_value", "integer_value") |
| `validations` | String | JSON string with validation rules |
| `options` | Connection | Paginated attribute option values |
| `translations` | Connection | Multi-language names for the attribute |

### Attribute Option Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | IRI format option ID |
| `_id` | Int | Numeric option ID |
| `adminName` | String | Option label in admin |
| `sortOrder` | Int | Display order among options |
| `swatchValue` | String | Color code (for color swatches) or text value |
| `swatchValueUrl` | String | Image URL (for image swatches) |
| `translation` | Object | Default locale translation |
| `translations` | Connection | All locale translations for this option |

### Translation Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | IRI format translation ID |
| `_id` | Int | Numeric translation ID |
| `attributeId` | String | Parent attribute ID |
| `attributeOptionId` | String | Parent option ID (for options) |
| `locale` | String | Locale code (e.g., "en", "ar") |
| `name` | String | Attribute name in locale |
| `label` | String | Option label in locale |

## Response Format

The response follows cursor-based pagination with the following structure:

```json
{
  "data": {
    "attributes": {
      "edges": [
        {
          "node": {
            "id": "/api/shop/attributes/1",
            "_id": 1,
            "code": "sku",
            "adminName": "SKU",
            // ... attribute fields
            "options": {
              "edges": [],
              "pageInfo": { /* pagination */ },
              "totalCount": 0
            },
            "translations": {
              "edges": [ /* translations */ ],
              "pageInfo": { /* pagination */ },
              "totalCount": 1
            }
          },
          "cursor": "MA=="
        }
      ],
      "pageInfo": {
        "endCursor": "Mjk=",
        "startCursor": "MA==",
        "hasNextPage": true,
        "hasPreviousPage": false
      },
      "totalCount": 38
    }
  }
}
```

## Examples

### Example 1: Fetch First 10 Attributes

Retrieve the first 10 attributes with their options and translations:

:::: code-group
::: code-group-item Query

```graphql
query {
  attributes(first: 10) {
    edges {
      node {
        id
        _id
        code
        adminName
        type
        position
        isRequired
        isConfigurable
        options {
          edges {
            node {
              adminName
              swatchValue
            }
          }
          totalCount
        }
        translations {
          edges {
            node {
              locale
              name
            }
          }
          totalCount
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
```

:::
::: code-group-item Response

```json
{
  "data": {
    "attributes": {
      "edges": [
        {
          "node": {
            "id": "/api/shop/attributes/1",
            "_id": 1,
            "code": "sku",
            "adminName": "SKU",
            "type": "text",
            "position": 1,
            "isRequired": "1",
            "isConfigurable": "0",
            "options": {
              "edges": [],
              "totalCount": 0
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "locale": "en",
                    "name": "SKU"
                  }
                }
              ],
              "totalCount": 1
            }
          },
          "cursor": "MA=="
        },
        {
          "node": {
            "id": "/api/shop/attributes/2",
            "_id": 2,
            "code": "name",
            "adminName": "Name",
            "type": "text",
            "position": 3,
            "isRequired": "1",
            "isConfigurable": "0",
            "options": {
              "edges": [],
              "totalCount": 0
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "locale": "en",
                    "name": "Name"
                  }
                }
              ],
              "totalCount": 1
            }
          },
          "cursor": "MQ=="
        },
        {
          "node": {
            "id": "/api/shop/attributes/23",
            "_id": 23,
            "code": "color",
            "adminName": "Color",
            "type": "select",
            "position": 26,
            "isRequired": "0",
            "isConfigurable": "1",
            "options": {
              "edges": [
                {
                  "node": {
                    "adminName": "Red",
                    "swatchValue": "#e10e0e"
                  }
                },
                {
                  "node": {
                    "adminName": "Green",
                    "swatchValue": "#155616"
                  }
                },
                {
                  "node": {
                    "adminName": "Blue",
                    "swatchValue": "#0000ff"
                  }
                }
              ],
              "totalCount": 12
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "locale": "en",
                    "name": "Color"
                  }
                }
              ],
              "totalCount": 2
            }
          },
          "cursor": "MjI="
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "MTM="
      },
      "totalCount": 38
    }
  }
}
```

:::
::::

### Example 2: Fetch Configurable Attributes with Options

Retrieve configurable attributes (used for product variations) with complete option details:

:::: code-group
::: code-group-item Query

```graphql
query {
  attributes(first: 20) {
    edges {
      node {
        id
        _id
        code
        adminName
        type
        swatchType
        isConfigurable
        options {
          edges {
            node {
              id
              _id
              adminName
              sortOrder
              swatchValue
              swatchValueUrl
              translation {
                locale
                label
              }
            }
          }
          totalCount
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
```

:::
::: code-group-item Response

```json
{
  "data": {
    "attributes": {
      "edges": [
        {
          "node": {
            "id": "/api/shop/attributes/23",
            "_id": 23,
            "code": "color",
            "adminName": "Color",
            "type": "select",
            "swatchType": "color",
            "isConfigurable": "1",
            "options": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/attribute-options/1",
                    "_id": 1,
                    "adminName": "Red",
                    "sortOrder": 0,
                    "swatchValue": "#e10e0e",
                    "swatchValueUrl": null,
                    "translation": {
                      "locale": "en",
                      "label": "Red"
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-options/2",
                    "_id": 2,
                    "adminName": "Green",
                    "sortOrder": 1,
                    "swatchValue": "#155616",
                    "swatchValueUrl": null,
                    "translation": {
                      "locale": "en",
                      "label": "Green"
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-options/3",
                    "_id": 3,
                    "adminName": "Yellow",
                    "sortOrder": 2,
                    "swatchValue": "#f6fa00",
                    "swatchValueUrl": null,
                    "translation": {
                      "locale": "en",
                      "label": "Yellow"
                    }
                  }
                }
              ],
              "totalCount": 12
            }
          },
          "cursor": "MjI="
        },
        {
          "node": {
            "id": "/api/shop/attributes/24",
            "_id": 24,
            "code": "size",
            "adminName": "Size",
            "type": "select",
            "swatchType": "text",
            "isConfigurable": "1",
            "options": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/attribute-options/6",
                    "_id": 6,
                    "adminName": "S",
                    "sortOrder": 0,
                    "swatchValue": "S",
                    "swatchValueUrl": null,
                    "translation": {
                      "locale": "en",
                      "label": "S"
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-options/7",
                    "_id": 7,
                    "adminName": "M",
                    "sortOrder": 1,
                    "swatchValue": "M",
                    "swatchValueUrl": null,
                    "translation": {
                      "locale": "en",
                      "label": "M"
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-options/8",
                    "_id": 8,
                    "adminName": "L",
                    "sortOrder": 2,
                    "swatchValue": "L",
                    "swatchValueUrl": null,
                    "translation": {
                      "locale": "en",
                      "label": "L"
                    }
                  }
                }
              ],
              "totalCount": 6
            }
          },
          "cursor": "MjM="
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "MjM="
      },
      "totalCount": 38
    }
  }
}
```

:::
::::

### Example 3: Fetch Attributes with Multi-locale Translations

Retrieve attributes with complete translation information across all locales:

:::: code-group
::: code-group-item Query

```graphql
query {
  attributes(first: 5) {
    edges {
      node {
        id
        code
        adminName
        type
        validations
        translations {
          edges {
            node {
              locale
              name
            }
          }
          totalCount
        }
        options {
          edges {
            node {
              adminName
              translations {
                edges {
                  node {
                    locale
                    label
                  }
                }
                totalCount
              }
            }
          }
          totalCount
        }
      }
    }
    pageInfo {
      totalCount
      hasNextPage
    }
  }
}
```

:::
::: code-group-item Response

```json
{
  "data": {
    "attributes": {
      "edges": [
        {
          "node": {
            "id": "/api/shop/attributes/9",
            "code": "short_description",
            "adminName": "Short Description",
            "type": "textarea",
            "validations": "{ required: true }",
            "translations": {
              "edges": [
                {
                  "node": {
                    "locale": "ar",
                    "name": ""
                  }
                },
                {
                  "node": {
                    "locale": "en",
                    "name": "Short Description"
                  }
                }
              ],
              "totalCount": 2
            },
            "options": {
              "edges": [],
              "totalCount": 0
            }
          }
        },
        {
          "node": {
            "id": "/api/shop/attributes/23",
            "code": "color",
            "adminName": "Color",
            "type": "select",
            "validations": "{  }",
            "translations": {
              "edges": [
                {
                  "node": {
                    "locale": "ar",
                    "name": ""
                  }
                },
                {
                  "node": {
                    "locale": "en",
                    "name": "Color"
                  }
                }
              ],
              "totalCount": 2
            },
            "options": {
              "edges": [
                {
                  "node": {
                    "adminName": "Red",
                    "translations": {
                      "edges": [
                        {
                          "node": {
                            "locale": "ar",
                            "label": ""
                          }
                        },
                        {
                          "node": {
                            "locale": "en",
                            "label": "Red"
                          }
                        }
                      ],
                      "totalCount": 2
                    }
                  }
                }
              ],
              "totalCount": 12
            }
          }
        }
      ],
      "pageInfo": {
        "totalCount": 38,
        "hasNextPage": true
      }
    }
  }
}
```

:::
::::

## Pagination Details

Attributes use cursor-based pagination for efficient data retrieval:

### Pagination Arguments

- **`first`**: Number of records to fetch forward (max: 100)
- **`after`**: Cursor position to start from (from `endCursor` of previous request)
- **`last`**: Number of records to fetch backward (max: 100)
- **`before`**: Cursor position to end at (from `startCursor` of previous request)

### Pagination Example

```graphql
# Get next page of attributes
query {
  attributes(first: 10, after: "Mjk=") {
    edges {
      node {
        id
        code
        adminName
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

## Attribute Types Reference

| Type | Behavior | Examples |
|------|----------|----------|
| `text` | Single-line text input | SKU, Product Number, Name |
| `textarea` | Multi-line text editor | Description, Short Description |
| `select` | Dropdown list with predefined options | Color, Size, Brand |
| `boolean` | Yes/No toggle | Status, Visible Individually, New |
| `date` | Date picker | Special Price From/To |
| `price` | Decimal number for pricing | Price, Cost, Special Price |

## Swatch Types Reference

| Type | Display | Use Cases |
|------|---------|-----------|
| `color` | Color square with hex code | Color attribute visualization |
| `text` | Text label | Size attribute swatches |
| `null` | No visual representation | Regular dropdown options |

## Validation Rules

Boolean fields return string values ("0" or "1"):

| Field | Meaning |
|-------|---------|
| `"0"` | Feature disabled/false |
| `"1"` | Feature enabled/true |

The `validations` field contains JSON with rule definitions, for example:
- `{ required: true }` - Field is mandatory
- `{ decimal: true }` - Must be decimal number
- `{ decimal: true, decimal: true }` - Multiple validation rules

## Common Use Cases

### 1. **Product Creation Form**
Fetch all required attributes with their validation rules to build dynamic product creation forms.

```graphql
query {
  attributes(first: 100) {
    edges {
      node {
        code
        adminName
        type
        isRequired
        position
        validations
      }
    }
  }
}
```

### 2. **Variation Selection**
Get configurable attributes (for product variants) with their options for customer selection.

```graphql
query {
  attributes(first: 100) {
    edges {
      node {
        code
        isConfigurable
        options {
          edges {
            node {
              adminName
              swatchValue
              swatchValueUrl
            }
          }
        }
      }
    }
  }
}
```

### 3. **Layered Navigation**
Retrieve filterable attributes with options to build shopping filters.

```graphql
query {
  attributes(first: 100) {
    edges {
      node {
        code
        isFilterable
        options {
          edges {
            node {
              translation {
                label
              }
            }
          }
          totalCount
        }
      }
    }
  }
}
```

### 4. **Multi-language Store**
Load attributes with complete translations for all supported locales.

```graphql
query {
  attributes(first: 100) {
    edges {
      node {
        code
        translations {
          edges {
            node {
              locale
              name
            }
          }
        }
      }
    }
  }
}
```

## Error Scenarios

### Invalid Pagination Arguments

```json
{
  "errors": [
    {
      "message": "Argument \"first\" on field \"attributes\" must be between 1 and 100",
      "extensions": {
        "code": "GRAPHQL_VALIDATION_FAILED"
      }
    }
  ]
}
```

**Solution**: Ensure `first` and `last` values don't exceed 100.

### Invalid Cursor

```json
{
  "errors": [
    {
      "message": "Invalid cursor provided",
      "extensions": {
        "code": "CURSOR_INVALID"
      }
    }
  ]
}
```

**Solution**: Use cursors obtained from previous pagination responses only.

## Best Practices

1. **Pagination Limit**: Use `first: 50` for balanced performance and response size.

2. **Nested Pagination**: Always paginate nested collections (`options`, `translations`) for large datasets to avoid overwhelming responses.

3. **Swatch Handling**: Check `swatchType` before displaying swatches - use `swatchValue` for colors/text, `swatchValueUrl` for images.

4. **Locale-specific Fields**: For multi-language stores, filter translations by locale code to load only required languages.

5. **Caching**: Cache attribute data with a reasonable TTL (15-60 minutes) as attributes rarely change frequently.

6. **Boolean Field Handling**: Always compare boolean fields as strings ("0" vs "1") rather than truthy/falsy values.

7. **Validation Rules**: Parse `validations` JSON field carefully for form validation on the frontend.

8. **Channel/Locale Values**: When `valuePerChannel` or `valuePerLocale` is "1", expect different values across channels/locales in product data.
