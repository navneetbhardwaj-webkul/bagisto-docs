/**
 * API Configuration
 * 
 * Update these URLs to match your Bagisto instance.
 * This single file is used across all components and examples.
 */

// REST API Base URL
// REST API Base URL
export const REST_API_URL = import.meta.env.VITE_REST_API_URL

// GraphQL API Base URL
export const GRAPHQL_API_URL = import.meta.env.VITE_GRAPHQL_API_URL

// GraphQL Endpoint
export const GRAPHQL_ENDPOINT = `${GRAPHQL_API_URL}/api/graphql`

// REST API Docs (Swagger)
export const REST_API_DOCS = `${REST_API_URL}/api/docs`

// GraphQL Playground
export const GRAPHQL_PLAYGROUND = `${GRAPHQL_API_URL}/graphql`

// Exported configuration object for convenience
export const API_CONFIG = {
  rest: {
    baseUrl: REST_API_URL,
    docs: REST_API_DOCS,
  },
  graphql: {
    baseUrl: GRAPHQL_API_URL,
    endpoint: GRAPHQL_ENDPOINT,
    playground: GRAPHQL_PLAYGROUND,
  },
} as const

export default API_CONFIG
