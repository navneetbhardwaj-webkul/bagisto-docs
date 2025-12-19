---
outline: false
examples:
  - id: register-customer-basic
    title: Register New Customer
    description: Create a new customer account with email and password.
    query: |
      mutation registerCustomer($input: createCustomerInput!) {
        createCustomer(input: $input) {
          customer {
            id
            email
            firstName
            lastName
            status
            token
            apiToken
          }
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "email": "newcustomer@example.com",
          "password": "SecurePassword123!",
          "firstName": "John",
          "lastName": "Doe",
          "phone": "123-456-7890"
        }
      }
    response: |
      {
        "data": {
          "createCustomer": {
            "customer": {
              "id": "1",
              "email": "newcustomer@example.com",
              "firstName": "John",
              "lastName": "Doe",
              "status": "active",
              "token": "eyJpdiI6IjhWM...",
              "apiToken": "abc123xyz789"
            },
            "message": "Customer registered successfully",
            "success": true
          }
        }
      }
    commonErrors:
      - error: EMAIL_ALREADY_EXISTS
        cause: Email address already registered
        solution: Use different email or login instead
      - error: INVALID_PASSWORD
        cause: Password doesn't meet requirements
        solution: Use stronger password (8+ chars, mix of types)
      - error: INVALID_EMAIL
        cause: Email format is invalid
        solution: Provide valid email address
---

# Register Customer

## About

The `registerCustomer` mutation creates a new customer account. Use this mutation to:

- Implement customer registration/signup flows
- Create new user accounts programmatically
- Enable self-service customer registration
- Integrate with external registration systems
- Collect customer information during signup
- Generate authentication tokens
- Set up customer profiles

This mutation validates input, checks for duplicate emails, and generates authentication credentials for immediate use.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `input` | `createCustomerInput!` | Customer registration data. |
| `input.email` | `String!` | Unique customer email address. |
| `input.password` | `String!` | Account password (minimum 8 characters recommended). |
| `input.firstName` | `String!` | Customer first name. |
| `input.lastName` | `String!` | Customer last name. |
| `input.phone` | `String` | Customer phone number. |
| `input.gender` | `String` | Gender: `male`, `female`, `other`. |
| `input.dateOfBirth` | `Date` | Customer birth date (YYYY-MM-DD). |
| `input.subscribeToNewsletter` | `Boolean` | Opt-in to marketing emails. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `customer` | `Customer!` | Newly created customer object. |
| `customer.id` | `ID!` | Customer ID. |
| `customer.email` | `String!` | Customer email. |
| `customer.firstName` | `String!` | First name. |
| `customer.lastName` | `String!` | Last name. |
| `customer.token` | `String!` | Authentication token for use in requests. |
| `customer.apiToken` | `String!` | API token for programmatic access. |
| `customer.status` | `String!` | Account status (active, inactive). |
| `message` | `String!` | Success message. |
| `success` | `Boolean!` | Indicates successful registration. |
| `errors` | `[ErrorMessage!]` | Validation errors if registration failed. |

