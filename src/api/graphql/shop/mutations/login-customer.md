---
outline: false
examples:
  - id: customer-login-basic
    title: Customer Login
    description: Authenticate customer with email and password.
    query: |
      mutation createLogin($email: String!, $password: String!) {
        createLogin(input: {email: $email, password: $password}) {
          login {
            id
            email
            firstName
            lastName
            token
            apiToken
            success
            message
          }
        }
      }
    variables: |
      {
        "email": "customer@example.com",
        "password": "SecurePassword123!"
      }
    response: |
      {
        "data": {
          "createLogin": {
            "login": {
              "id": "1",
              "email": "customer@example.com",
              "firstName": "John",
              "lastName": "Doe",
              "token": "eyJpdiI6IjhWM...",
              "apiToken": "abc123xyz789",
              "success": true,
              "message": "Login successful"
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_CREDENTIALS
        cause: Email or password is incorrect
        solution: Verify email and password
      - error: ACCOUNT_INACTIVE
        cause: Customer account is suspended
        solution: Contact support to reactivate
      - error: ACCOUNT_NOT_FOUND
        cause: Email is not registered
        solution: Register new account or verify email
---

# Login Customer

## About

The `loginCustomer` mutation authenticates a customer and generates authentication tokens. Use this mutation to:

- Implement customer login/signin flows
- Generate authentication credentials
- Validate customer credentials
- Enable authenticated API access
- Support session management
- Integrate with external auth systems
- Handle customer access control

This mutation validates credentials, verifies account status, and generates tokens for authenticated requests.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `email` | `String!` | Customer email address registered in system. |
| `password` | `String!` | Customer account password. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `login` | `LoginResponse!` | Login response containing customer data and tokens. |
| `login.id` | `ID!` | Customer ID. |
| `login.email` | `String!` | Customer email. |
| `login.firstName` | `String!` | First name. |
| `login.lastName` | `String!` | Last name. |
| `login.token` | `String!` | Authentication token for API requests. |
| `login.apiToken` | `String!` | API token for programmatic access. |
| `login.success` | `Boolean!` | Login success indicator. |
| `login.message` | `String!` | Success or error message. |
| `errors` | `[ErrorMessage!]` | Authentication errors if login failed. |

