---
outline: false
examples:
  - id: get-channel-by-id-basic
    title: Get Channel by ID - Basic
    description: Retrieve basic information for a single channel by its ID.
    query: |
      query getChannelByID($id: ID!) {
        channel(id: $id) {
          id
          _id
          code
          hostname
          timezone
        }
      }
    variables: |
      {
        "id": "/api/shop/channels/1"
      }
    response: |
      {
        "data": {
          "channel": {
            "id": "/api/shop/channels/1",
            "_id": 1,
            "code": "default",
            "hostname": "example.com",
            "timezone": "UTC"
          }
        }
      }
    commonErrors:
      - error: CHANNEL_NOT_FOUND
        cause: Channel with given ID does not exist
        solution: Verify the channel ID is correct
      - error: INVALID_ID_FORMAT
        cause: Invalid channel ID format
        solution: Use a valid channel ID like /api/shop/channels/1

  - id: get-channel-complete
    title: Get Channel - Complete Details
    description: Retrieve complete channel information including logos, themes, and all translations.
    query: |
      query getChannelByID($id: ID!) {
        channel(id: $id) {
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
      }
    variables: |
      {
        "id": "/api/shop/channels/1"
      }
    response: |
      {
        "data": {
          "channel": {
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
              "description": "Default English store for all customers",
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
                    "description": "Default English store for all customers",
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
                    "description": "متجر اللغة العربية الافتراضي لجميع العملاء",
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
                    "description": "Magasin français par défaut pour tous les clients",
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
          }
        }
      }
    commonErrors:
      - error: CHANNEL_NOT_FOUND
        cause: Channel with given ID does not exist
        solution: Verify the channel ID and check if it's active
      - error: UNAUTHORIZED
        cause: User is not authenticated
        solution: Provide valid authentication credentials

  - id: get-channel-with-branding
    title: Get Channel with Branding Assets
    description: Retrieve channel branding information including logos, favicons, and theme configuration.
    query: |
      query getChannelByID($id: ID!) {
        channel(id: $id) {
          id
          _id
          code
          hostname
          theme
          logo
          favicon
          logoUrl
          faviconUrl
          translation {
            name
            description
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/channels/1"
      }
    response: |
      {
        "data": {
          "channel": {
            "id": "/api/shop/channels/1",
            "_id": 1,
            "code": "default",
            "hostname": "example.com",
            "theme": "default-theme",
            "logo": "/channels/logo-1.png",
            "favicon": "/channels/favicon-1.ico",
            "logoUrl": "https://example.com/channels/logo-1.png",
            "faviconUrl": "https://example.com/channels/favicon-1.ico",
            "translation": {
              "name": "Default Store",
              "description": "Default English store for all customers"
            }
          }
        }
      }
    commonErrors:
      - error: MISSING_BRANDING_ASSETS
        cause: Channel logo or favicon is not configured
        solution: Upload branding assets in admin panel

  - id: get-channel-maintenance-details
    title: Get Channel Maintenance Mode Details
    description: Retrieve channel maintenance mode status and configuration with custom messages.
    query: |
      query getChannelByID($id: ID!) {
        channel(id: $id) {
          id
          _id
          code
          hostname
          isMaintenanceOn
          allowedIps
          translation {
            locale
            name
            maintenanceModeText
          }
          translations {
            edges {
              node {
                locale
                maintenanceModeText
              }
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/channels/1"
      }
    response: |
      {
        "data": {
          "channel": {
            "id": "/api/shop/channels/1",
            "_id": 1,
            "code": "default",
            "hostname": "example.com",
            "isMaintenanceOn": true,
            "allowedIps": "127.0.0.1,192.168.1.0/24,10.0.0.0/8",
            "translation": {
              "locale": "en",
              "name": "Default Store",
              "maintenanceModeText": "Our store is currently under maintenance. We will be back online shortly. Thank you for your patience!"
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "locale": "en",
                    "maintenanceModeText": "Our store is currently under maintenance. We will be back online shortly. Thank you for your patience!"
                  }
                },
                {
                  "node": {
                    "locale": "ar",
                    "maintenanceModeText": "متجرنا قيد الصيانة حاليا. سنعود للعمل قريبا. شكرا لصبركم!"
                  }
                },
                {
                  "node": {
                    "locale": "fr",
                    "maintenanceModeText": "Notre magasin est actuellement en maintenance. Nous serons de retour bientôt. Merci de votre patience!"
                  }
                }
              ],
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_IP_FORMAT
        cause: Allowed IPs format is invalid
        solution: Use comma-separated IPs or CIDR notation

  - id: get-channel-with-translations
    title: Get Channel with All Translations
    description: Retrieve channel with complete translation information for all languages.
    query: |
      query getChannelByID($id: ID!) {
        channel(id: $id) {
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
              cursor
            }
            pageInfo {
              hasNextPage
              endCursor
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/channels/1"
      }
    response: |
      {
        "data": {
          "channel": {
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
                    "description": "Default English store for all customers",
                    "maintenanceModeText": "Store is under maintenance"
                  },
                  "cursor": "MA=="
                },
                {
                  "node": {
                    "id": "/api/shop/channel-translations/2",
                    "locale": "ar",
                    "name": "متجر افتراضي",
                    "description": "متجر اللغة العربية الافتراضي",
                    "maintenanceModeText": "المتجر قيد الصيانة"
                  },
                  "cursor": "MQ=="
                },
                {
                  "node": {
                    "id": "/api/shop/channel-translations/3",
                    "locale": "fr",
                    "name": "Magasin par défaut",
                    "description": "Magasin français par défaut",
                    "maintenanceModeText": "Le magasin est en maintenance"
                  },
                  "cursor": "Mg=="
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "Mg=="
              },
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: Channel has no translations configured
        solution: Add translations in the admin panel

---

# Get Channel

## About

The `channel` query retrieves detailed information about a single channel by its ID. Use this query to:

- Display channel-specific information and branding
- Fetch channel configuration for your application
- Get channel translations for multi-language support
- Check maintenance mode status and allowed IPs
- Retrieve channel themes and display settings
- Access channel logos and branding assets
- Build channel-specific pages and configurations
- Handle channel-based routing and localization

This query returns comprehensive channel data including logos, favicons, themes, all translations, and maintenance mode settings.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | Channel ID in format `/api/shop/channels/{id}` or numeric ID. |

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
| `allowedIps` | `String` | Comma-separated IPs allowed during maintenance (CIDR notation supported). |
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
| `translations.edges.cursor` | `String!` | Pagination cursor for this translation. |
| `translations.pageInfo` | `PageInfo!` | Pagination information. |
| `translations.pageInfo.hasNextPage` | `Boolean!` | More translations available. |
| `translations.pageInfo.hasPreviousPage` | `Boolean!` | Previous translations available. |
| `translations.pageInfo.startCursor` | `String` | First translation cursor. |
| `translations.pageInfo.endCursor` | `String` | Last translation cursor. |
| `translations.totalCount` | `Int!` | Total translations for this channel. |

## IP Allowlist Format

The `allowedIps` field supports multiple formats:

| Format | Example | Description |
|--------|---------|-------------|
| Single IP | `192.168.1.1` | Exact IP address |
| Multiple IPs | `192.168.1.1,192.168.1.2` | Comma-separated addresses |
| CIDR Notation | `192.168.1.0/24` | Subnet range |
| Mixed | `127.0.0.1,10.0.0.0/8` | Combination of formats |

## Use Cases

### 1. Channel Detail Page
Use the "Complete Details" example to display full channel information with all metadata.

### 2. Branding Configuration
Use the "With Branding Assets" example to get logos and favicons for dynamic theming.

### 3. Maintenance Mode
Use the "Maintenance Details" example to check if channel is under maintenance and display appropriate messages.

### 4. Multi-Language Support
Use the "With All Translations" example to display channel information in all languages.

### 5. Channel Routing
Use the basic query to get channel hostname and timezone for routing and localization.

## Best Practices

1. **Cache Channel Data** - Channels change infrequently, cache the response per channel
2. **Check Maintenance Mode** - Always verify `isMaintenanceOn` status before displaying content
3. **Include Translations** - Fetch all translations for multi-language support
4. **Validate IP Allowlist** - Verify user IP against `allowedIps` during maintenance
5. **Use Correct ID Format** - Use `/api/shop/channels/{id}` format when available
6. **Apply Theme Dynamically** - Use `theme` field to load theme-specific CSS/configuration
7. **Display Localized Messages** - Use translations for maintenance messages in user's language

## Maintenance Mode Details

During maintenance mode:
- Set `isMaintenanceOn` to `true`
- Configure `allowedIps` to allow specific IP addresses
- Display localized `maintenanceModeText` to users
- Redirect non-allowed users to maintenance page
- Support CIDR notation for flexible IP ranges

## Related Resources

- [Channels](/api/graphql/shop/queries/get-channels) - Get all channels with pagination
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
