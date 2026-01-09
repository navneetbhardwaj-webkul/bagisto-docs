---
outline: false
examples:
  - id: get-channels-basic
    title: Get Channels - Basic
    description: Retrieve all store channels with basic information.
    query: |
      query getChannels {
        channels {
          edges {
            node {
              id
              _id
              code
              hostname
              timezone
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "channels": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/channels/1",
                  "_id": 1,
                  "code": "default",
                  "hostname": "example.com",
                  "timezone": "UTC"
                }
              },
              {
                "node": {
                  "id": "/api/shop/channels/2",
                  "_id": 2,
                  "code": "mobile",
                  "hostname": "m.example.com",
                  "timezone": "UTC"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MQ=="
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Invalid or missing authentication token
        solution: Provide valid authentication credentials
      - error: NO_CHANNELS
        cause: No channels configured in the system
        solution: Create channels in the admin panel

  - id: get-channels-complete
    title: Get Channels - Complete Details
    description: Retrieve all channels with complete information including logos, themes, and translations.
    query: |
      query getChannels {
        channels {
          edges {
            node {
              id
              _id
              code
              timezone
              theme
              hostname
              logo
              favicon
              isMaintenanceOn
              allowedIps
              createdAt
              updatedAt
              logoUrl
              faviconUrl
              translation {
                id
                _id
                channelId
                locale
                name
                description
                maintenanceModeText
                createdAt
                updatedAt
              }
              translations {
                edges {
                  node {
                    id
                    _id
                    channelId
                    locale
                    name
                    description
                    maintenanceModeText
                    createdAt
                    updatedAt
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
    variables: |
      {}
    response: |
      {
        "data": {
          "channels": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/channels/1",
                  "_id": 1,
                  "code": "default",
                  "timezone": "UTC",
                  "theme": "default-theme",
                  "hostname": "example.com",
                  "logo": "/channels/logo-1.png",
                  "favicon": "/channels/favicon-1.ico",
                  "isMaintenanceOn": false,
                  "allowedIps": "127.0.0.1,192.168.1.1",
                  "createdAt": "2024-01-15T10:30:00Z",
                  "updatedAt": "2024-12-20T14:20:00Z",
                  "logoUrl": "https://example.com/channels/logo-1.png",
                  "faviconUrl": "https://example.com/channels/favicon-1.ico",
                  "translation": {
                    "id": "/api/shop/channel-translations/1",
                    "_id": 1,
                    "channelId": 1,
                    "locale": "en",
                    "name": "Default Store",
                    "description": "Default English store",
                    "maintenanceModeText": "Store is currently under maintenance. Please visit again later.",
                    "createdAt": "2024-01-15T10:30:00Z",
                    "updatedAt": "2024-12-20T14:20:00Z"
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/channel-translations/1",
                          "_id": 1,
                          "channelId": 1,
                          "locale": "en",
                          "name": "Default Store",
                          "description": "Default English store",
                          "maintenanceModeText": "Store is currently under maintenance. Please visit again later.",
                          "createdAt": "2024-01-15T10:30:00Z",
                          "updatedAt": "2024-12-20T14:20:00Z"
                        },
                        "cursor": "MA=="
                      },
                      {
                        "node": {
                          "id": "/api/shop/channel-translations/2",
                          "_id": 2,
                          "channelId": 1,
                          "locale": "ar",
                          "name": "متجر افتراضي",
                          "description": "متجر اللغة العربية الافتراضي",
                          "maintenanceModeText": "المتجر قيد الصيانة حاليا. يرجى زيارتنا لاحقا.",
                          "createdAt": "2024-01-15T10:30:00Z",
                          "updatedAt": "2024-12-20T14:20:00Z"
                        },
                        "cursor": "MQ=="
                      },
                      {
                        "node": {
                          "id": "/api/shop/channel-translations/3",
                          "_id": 3,
                          "channelId": 1,
                          "locale": "fr",
                          "name": "Magasin par défaut",
                          "description": "Magasin français par défaut",
                          "maintenanceModeText": "Le magasin est actuellement en maintenance. Veuillez visiter plus tard.",
                          "createdAt": "2024-01-15T10:30:00Z",
                          "updatedAt": "2024-12-20T14:20:00Z"
                        },
                        "cursor": "Mg=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "Mg==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 3
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/channels/2",
                  "_id": 2,
                  "code": "mobile",
                  "timezone": "US/Eastern",
                  "theme": "mobile-theme",
                  "hostname": "m.example.com",
                  "logo": "/channels/logo-2.png",
                  "favicon": "/channels/favicon-2.ico",
                  "isMaintenanceOn": false,
                  "allowedIps": "127.0.0.1",
                  "createdAt": "2024-02-20T12:00:00Z",
                  "updatedAt": "2024-12-19T10:15:00Z",
                  "logoUrl": "https://example.com/channels/logo-2.png",
                  "faviconUrl": "https://example.com/channels/favicon-2.ico",
                  "translation": {
                    "id": "/api/shop/channel-translations/4",
                    "_id": 4,
                    "channelId": 2,
                    "locale": "en",
                    "name": "Mobile Store",
                    "description": "Mobile version of store",
                    "maintenanceModeText": "Mobile store is under maintenance.",
                    "createdAt": "2024-02-20T12:00:00Z",
                    "updatedAt": "2024-12-19T10:15:00Z"
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/channel-translations/4",
                          "_id": 4,
                          "channelId": 2,
                          "locale": "en",
                          "name": "Mobile Store",
                          "description": "Mobile version of store",
                          "maintenanceModeText": "Mobile store is under maintenance.",
                          "createdAt": "2024-02-20T12:00:00Z",
                          "updatedAt": "2024-12-19T10:15:00Z"
                        },
                        "cursor": "MA=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 1
                  }
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: UNAUTHORIZED
        cause: Invalid or missing authentication token
        solution: Provide valid authentication credentials

  - id: get-channels-with-pagination
    title: Get Channels with Pagination
    description: Retrieve channels using cursor-based pagination for handling large channel lists.
    query: |
      query getChannels($first: Int, $after: String) {
        channels(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              code
              hostname
              translation {
                name
                description
              }
              logoUrl
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
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "channels": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/channels/1",
                  "_id": 1,
                  "code": "default",
                  "hostname": "example.com",
                  "translation": {
                    "name": "Default Store",
                    "description": "Default English store"
                  },
                  "logoUrl": "https://example.com/channels/logo-1.png"
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/channels/2",
                  "_id": 2,
                  "code": "mobile",
                  "hostname": "m.example.com",
                  "translation": {
                    "name": "Mobile Store",
                    "description": "Mobile version of store"
                  },
                  "logoUrl": "https://example.com/channels/logo-2.png"
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor format is invalid
        solution: Use cursor values from previous response

  - id: get-channels-with-translations
    title: Get Channels with All Translations
    description: Retrieve channels with complete translation information for multi-language support.
    query: |
      query getChannels {
        channels {
          edges {
            node {
              id
              _id
              code
              hostname
              timezone
              translations {
                edges {
                  node {
                    id
                    locale
                    name
                    description
                    maintenanceModeText
                  }
                }
                totalCount
              }
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "channels": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/channels/1",
                  "_id": 1,
                  "code": "default",
                  "hostname": "example.com",
                  "timezone": "UTC",
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/channel-translations/1",
                          "locale": "en",
                          "name": "Default Store",
                          "description": "Default English store",
                          "maintenanceModeText": "Store is under maintenance"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/channel-translations/2",
                          "locale": "ar",
                          "name": "متجر افتراضي",
                          "description": "متجر اللغة العربية الافتراضي",
                          "maintenanceModeText": "المتجر قيد الصيانة"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/channel-translations/3",
                          "locale": "fr",
                          "name": "Magasin par défaut",
                          "description": "Magasin français par défaut",
                          "maintenanceModeText": "Le magasin est en maintenance"
                        }
                      }
                    ],
                    "totalCount": 3
                  }
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: Channel has no translations
        solution: Add translations in the admin panel

  - id: get-channels-maintenance-mode
    title: Get Channels with Maintenance Mode Info
    description: Retrieve channels to check maintenance status and display custom maintenance messages.
    query: |
      query getChannels {
        channels {
          edges {
            node {
              id
              _id
              code
              hostname
              isMaintenanceOn
              allowedIps
              translation {
                name
                maintenanceModeText
              }
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "channels": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/channels/1",
                  "_id": 1,
                  "code": "default",
                  "hostname": "example.com",
                  "isMaintenanceOn": false,
                  "allowedIps": "127.0.0.1,192.168.1.1",
                  "translation": {
                    "name": "Default Store",
                    "maintenanceModeText": "Store is currently under maintenance. Please visit again later."
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/channels/2",
                  "_id": 2,
                  "code": "staging",
                  "hostname": "staging.example.com",
                  "isMaintenanceOn": true,
                  "allowedIps": "192.168.1.0/24",
                  "translation": {
                    "name": "Staging Store",
                    "maintenanceModeText": "Staging environment is under maintenance. Authorized personnel only."
                  }
                }
              }
            ],
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: INVALID_IP_FORMAT
        cause: Allowed IPs format is invalid
        solution: Use comma-separated IPs or CIDR notation

---

# Get Channels

## About

The `channels` query retrieves all store channels configured in your Bagisto instance. Use this query to:

- Fetch all available sales channels for your store
- Display channel-specific information and branding
- Get channel translations for multi-language support
- Check maintenance mode status and allowed IPs
- Retrieve channel themes and configuration
- Build channel switcher or store selector features
- Access channel logos and branding assets
- Manage multi-channel deployments

This query returns comprehensive channel information including logos, favicons, themes, translations, and maintenance mode settings.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Number of channels to return (forward pagination). Max: 100. |
| `after` | `String` | Pagination cursor for forward navigation. |
| `last` | `Int` | Number of channels for backward pagination. Max: 100. |
| `before` | `String` | Pagination cursor for backward navigation. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique channel API identifier. |
| `_id` | `Int!` | Numeric channel ID. |
| `code` | `String!` | Unique channel code (e.g., 'default', 'mobile'). |
| `timezone` | `String!` | Channel timezone (e.g., 'UTC', 'US/Eastern'). |
| `theme` | `String` | Theme name assigned to this channel. |
| `hostname` | `String!` | Channel hostname/domain. |
| `logo` | `String` | File path to channel logo. |
| `favicon` | `String` | File path to channel favicon. |
| `isMaintenanceOn` | `Boolean!` | Whether maintenance mode is enabled. |
| `allowedIps` | `String` | Comma-separated IPs allowed during maintenance. |
| `createdAt` | `DateTime!` | Channel creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `logoUrl` | `String` | Full URL to channel logo image. |
| `faviconUrl` | `String` | Full URL to channel favicon image. |
| `translation` | `ChannelTranslation!` | Default locale translation. |
| `translation.id` | `ID!` | Translation identifier. |
| `translation._id` | `Int!` | Numeric translation ID. |
| `translation.channelId` | `Int!` | Associated channel ID. |
| `translation.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translation.name` | `String!` | Channel name in current language. |
| `translation.description` | `String` | Channel description. |
| `translation.maintenanceModeText` | `String` | Custom maintenance mode message. |
| `translation.createdAt` | `DateTime!` | Translation creation timestamp. |
| `translation.updatedAt` | `DateTime!` | Translation update timestamp. |
| `translations` | `ChannelTranslationCollection!` | All available translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.edges.node` | `ChannelTranslation!` | Individual translation. |
| `translations.edges.cursor` | `String!` | Pagination cursor. |
| `translations.pageInfo` | `PageInfo!` | Pagination information. |
| `translations.totalCount` | `Int!` | Total translations for this channel. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | More channels available. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Previous channels available. |
| `pageInfo.startCursor` | `String` | First channel cursor. |
| `pageInfo.endCursor` | `String` | Last channel cursor. |
| `totalCount` | `Int!` | Total channels in system. |

## Use Cases

### 1. Multi-Channel Support
Use the "Complete Details" example to get all channel information for multi-channel deployments.

### 2. Channel Selection
Use the "Basic" example for rendering a channel/store selector in your frontend.

### 3. Maintenance Mode
Use the "Maintenance Mode Info" example to check if a channel is under maintenance and display appropriate messages.

### 4. Multi-Language Support
Use the "With All Translations" example to display channel information in all languages.

### 5. Channel Branding
Use the complete details example to fetch logos and favicons for channel-specific branding.

## Best Practices

1. **Cache Channel List** - Channels change infrequently, cache the entire list
2. **Check Maintenance Mode** - Always verify `isMaintenanceOn` status before redirecting users
3. **Include Translations** - Fetch all translations for multi-language support
4. **Validate Hostname** - Use `hostname` to route requests to correct channel
5. **Use Brand Assets** - Fetch `logoUrl` and `faviconUrl` for consistent branding
6. **Respect Timezones** - Use channel `timezone` for displaying dates and times

## Related Resources

- [Get Channel](/api/graphql/shop/queries/get-channel) - Get single channel by ID
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
