# API Configuration Guide

This document explains how to manage API URLs across the entire Bagisto API documentation.

## Overview

All API URLs are now centralized in a single configuration file: `.vitepress/theme/config/api.config.ts`

This means:
- ✅ **One place to update** - Change URLs in one file instead of multiple files
- ✅ **Automatic sync** - All components instantly use the updated URLs
- ✅ **Easy maintenance** - No hardcoded URLs scattered across the codebase
- ✅ **Environment-ready** - Supports different URLs for dev, staging, production

## Configuration File

**Location:** `.vitepress/theme/config/api.config.ts`

```typescript
// REST API Base URL
export const REST_API_URL = 'http://127.0.0.1:8001'

// GraphQL API Base URL
export const GRAPHQL_API_URL = 'http://127.0.0.1:8000'

// GraphQL Endpoint
export const GRAPHQL_ENDPOINT = `${GRAPHQL_API_URL}/api/graphql`

// REST API Docs (Swagger)
export const REST_API_DOCS = `${REST_API_URL}/api/docs`

// GraphQL Playground
export const GRAPHQL_PLAYGROUND = `${GRAPHQL_API_URL}/graphql`
```

## How to Update URLs

### Step 1: Open the Config File
```bash
.vitepress/theme/config/api.config.ts
```

### Step 2: Change the URLs

**For Local Development:**
```typescript
export const REST_API_URL = 'http://localhost:8001'
export const GRAPHQL_API_URL = 'http://localhost:8000'
```

**For Staging:**
```typescript
export const REST_API_URL = 'https://staging-api.bagisto.com'
export const GRAPHQL_API_URL = 'https://staging-graphql.bagisto.com'
```

**For Production:**
```typescript
export const REST_API_URL = 'https://api.bagisto.com'
export const GRAPHQL_API_URL = 'https://graphql.bagisto.com'
```

### Step 3: Save and Build
```bash
npm run docs:build
```

All documentation will automatically use the new URLs!

## Where URLs Are Used

### Vue Components (Auto-Updated)
- `GraphQLExamplesPanel.vue` - Uses `GRAPHQL_ENDPOINT` for GraphiQL links
- `RestExamplesPanel.vue` - Imports `REST_API_URL` (ready for future use)
- `ApiConfigDisplay.vue` - Shows current configuration

### Markdown Examples (Static)
**Note:** Markdown files contain static example code. These should show placeholder URLs that users can understand are examples:

- REST API examples: `http://127.0.0.1:8001` (clearly a local dev example)
- GraphQL examples: `http://127.0.0.1:8000` (clearly a local dev example)

Users understand these are example URLs and will replace them with their own instance.

### Testing & Debugging Guide
Includes instructions to update the API configuration file.

## Using the ApiConfigDisplay Component

The `ApiConfigDisplay.vue` component shows the current configured URLs:

```markdown
:::components-section

<ApiConfigDisplay />

:::
```

Features:
- 📍 Displays both REST and GraphQL URLs
- 📋 Copy buttons to quickly copy URLs to clipboard
- 🔄 Auto-updates when you change the config file
- 🎨 Dark mode support

## Implementation Details

### For TypeScript Components

```typescript
import { REST_API_URL, GRAPHQL_ENDPOINT } from '../config/api.config'

// Use in code
const graphiQLUrl = `${GRAPHQL_ENDPOINT}?query=...`
```

### For Vue Components

```vue
<script setup lang="ts">
import { REST_API_URL } from '../config/api.config'

const apiUrl = REST_API_URL
</script>

<template>
  <span>{{ apiUrl }}</span>
</template>
```

### For Documentation Links

For documentation pages that show API endpoints, use:

```markdown
**REST API:** http://127.0.0.1:8001
**GraphQL:** http://127.0.0.1:8000

Or update in `.vitepress/theme/config/api.config.ts`
```

## Environment Variables (Optional)

If you need environment-specific configurations, you can extend the config file:

```typescript
// .vitepress/theme/config/api.config.ts

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

export const REST_API_URL = isDev 
  ? 'http://127.0.0.1:8001'
  : 'https://api.bagisto.com'

export const GRAPHQL_API_URL = isDev
  ? 'http://127.0.0.1:8000'
  : 'https://graphql.bagisto.com'
```

## Troubleshooting

### URLs Not Updating
1. **Clear cache:** `rm -rf .vitepress/dist`
2. **Rebuild:** `npm run docs:build`
3. **Dev server:** Restart with `npm run docs:dev`

### Import Path Issues
Make sure imports use the correct relative path:
```typescript
// ✅ Correct
import { REST_API_URL } from '../config/api.config'

// ❌ Wrong
import { REST_API_URL } from './api.config'
```

## Next Steps

- ✅ Update URLs in `api.config.ts` for your environment
- ✅ Run `npm run docs:build` to rebuild documentation
- ✅ Test GraphQL links by clicking "Try in GraphiQL" button
- ✅ Verify Swagger UI link in testing guide works

## Questions?

Refer to:
- [Testing & Debugging](/api/rest-api/testing-debugging) - Swagger UI and testing tools
- [Component Examples](/api/rest-api/shop/locales/single) - See URLs in action
- [Best Practices](/api/rest-api/best-practices) - API usage guidelines
