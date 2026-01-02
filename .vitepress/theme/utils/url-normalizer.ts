/**
 * URL Normalization Utilities
 * 
 * Replaces hardcoded example URLs with actual configured API URLs
 */

import { REST_API_URL, GRAPHQL_API_URL } from '../config/api.config'

/**
 * Normalize REST API URLs in code
 * Replaces common hardcoded local URLs with configured REST_API_URL
 */
export function normalizeRestUrl(code: string): string {
  if (!code) return code
  
  // Replace common hardcoded REST API URLs with configured URL
  return code
    .replace(/http:\/\/127\.0\.0\.1:8001/g, REST_API_URL)
    .replace(/http:\/\/localhost:8001/g, REST_API_URL)
    .replace(/https:\/\/your-domain\.com/g, REST_API_URL)
    .replace(/https:\/\/api\.example\.com/g, REST_API_URL)
}

/**
 * Normalize GraphQL API URLs in code
 * Replaces common hardcoded local URLs with configured GRAPHQL_API_URL
 */
export function normalizeGraphQLUrl(code: string): string {
  if (!code) return code
  
  // Replace common hardcoded GraphQL URLs with configured URL
  return code
    .replace(/http:\/\/127\.0\.0\.1:8000/g, GRAPHQL_API_URL)
    .replace(/http:\/\/localhost:8000/g, GRAPHQL_API_URL)
    .replace(/https:\/\/your-domain\.com/g, GRAPHQL_API_URL)
    .replace(/https:\/\/graphql\.example\.com/g, GRAPHQL_API_URL)
}

/**
 * Normalize storage/asset URLs (usually served from same domain as REST API)
 */
export function normalizeStorageUrl(code: string, apiUrl: string = REST_API_URL): string {
  if (!code) return code
  
  // Extract base domain from API URL
  const baseDomain = apiUrl.replace(/\/api.*$/, '')
  
  // Replace storage URLs
  return code
    .replace(/http:\/\/127\.0\.0\.1:8000\/storage/g, `${baseDomain}/storage`)
    .replace(/http:\/\/localhost:8000\/storage/g, `${baseDomain}/storage`)
    .replace(/https:\/\/your-domain\.com\/storage/g, `${baseDomain}/storage`)
}

/**
 * Normalize all URLs in code (REST, GraphQL, and storage)
 */
export function normalizeAllUrls(code: string, type: 'rest' | 'graphql' = 'rest'): string {
  let normalized = code
  
  if (type === 'rest') {
    normalized = normalizeRestUrl(normalized)
    normalized = normalizeStorageUrl(normalized)
  } else if (type === 'graphql') {
    normalized = normalizeGraphQLUrl(normalized)
    normalized = normalizeStorageUrl(normalized, GRAPHQL_API_URL)
  }
  
  return normalized
}
