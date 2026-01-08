---
outline: false
examples:
  - id: customer-registration
    title: Customer Registration
    description: Register a new customer account with complete profile information.
    query: |
      mutation registerCustomer($input: createCustomerInput!) {
        createCustomer(input: $input) {
          customer {
            id
            _id
            apiToken
            channelId
            customerGroupId
            dateOfBirth
            email
            gender
            isSuspended
            isVerified
            name
            firstName
            lastName
            rememberToken
            subscribedToNewsLetter
            status
            token
            phone
          }
        }
      }
    variables: |
      {
        "input": {
          "firstName": "John",
          "lastName": "Doe",
          "gender": "Male",
          "dateOfBirth": "01/15/1990",
          "phone": "555-0123",
          "status": "1",
          "isVerified": "1",
          "isSuspended": "0",
          "email": "john.doe@example.com",
          "password": "SecurePass@123",
          "confirmPassword": "SecurePass@123",
          "subscribedToNewsLetter": true
        }
      }
    response: |
      {
        "data": {
          "createCustomer": {
            "customer": {
              "id": "/api/shop/customers/1",
              "_id": 1,
              "apiToken": "k0qai81TSMEKjzvjTfVozwu1cJiZFocQWa0TSDyHzULF5Wml4fTPpbRUg400BAMMZcqKucoGWkOD30F4",
              "channelId": null,
              "customerGroupId": null,
              "dateOfBirth": "1990-01-15",
              "email": "john.doe@example.com",
              "gender": "Male",
              "isSuspended": "0",
              "isVerified": "1",
              "name": "John Doe",
              "firstName": "John",
              "lastName": "Doe",
              "rememberToken": null,
              "subscribedToNewsLetter": true,
              "status": "1",
              "token": "32455ec9739651500c4bb56632349de2",
              "phone": "555-0123"
            }
          }
        }
      }
---

# Customer Registration

Register a new customer account with Bagisto.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ✅ Yes | Customer's first name |
| `lastName` | String | ✅ Yes | Customer's last name |
| `email` | String | ✅ Yes | Customer's email address (must be unique) |
| `password` | String | ✅ Yes | Password for the account (min. 8 characters) |
| `confirmPassword` | String | ✅ Yes | Password confirmation (must match password) |
| `gender` | String | ❌ No | Customer's gender (Male/Female) |
| `dateOfBirth` | String | ❌ No | Date of birth (format: MM/DD/YYYY) |
| `phone` | String | ❌ No | Phone number |
| `status` | String | ❌ No | Customer status (1 = active, 0 = inactive) |
| `isVerified` | String | ❌ No | Email verification status (1 = verified, 0 = not verified) |
| `isSuspended` | String | ❌ No | Suspension status (1 = suspended, 0 = active) |
| `subscribedToNewsLetter` | Boolean | ❌ No | Newsletter subscription preference |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | API customer resource ID |
| `_id` | Integer | Customer database ID |
| `apiToken` | String | API authentication token |
| `token` | String | Customer token for authentication |
| `email` | String | Customer's email address |
| `firstName` | String | Customer's first name |
| `lastName` | String | Customer's last name |
| `name` | String | Full customer name |
| `gender` | String | Customer's gender |
| `dateOfBirth` | String | Customer's date of birth (YYYY-MM-DD) |
| `phone` | String | Customer's phone number |
| `status` | String | Customer account status |
| `isVerified` | String | Email verification status |
| `isSuspended` | String | Account suspension status |
| `subscribedToNewsLetter` | Boolean | Newsletter subscription status |
| `channelId` | Mixed | Channel ID (if applicable) |
| `customerGroupId` | Mixed | Customer group ID (if applicable) |
| `rememberToken` | Mixed | Remember token for persistent login |

## Validation Rules

- Email must be in valid format and unique
- Password must be at least 8 characters
- Password and password confirmation must match
- First name and last name are required
- Email cannot already exist in the system

## Error Responses

**Email Already Exists (400):**
```json
{
  "errors": [
    {
      "message": "The email has already been taken. The phone has already been taken."
    }
  ]
}
```

**Invalid Email Format (400):**
```json
{
  "errors": [
    {
      "message": "The email field must be a valid email address."
    }
  ]
}
```

**Phone Already Taken (400):**
```json
{
  "errors": [
    {
      "message": "The phone has already been taken."
    }
  ]
}
```

**Password Confirmation Mismatch (400):**
```json
{
  "errors": [
    {
      "message": "The password field confirmation does not match."
    }
  ]
}
```

**Validation Error (400):**
```json
{
  "errors": [
    {
      "message": "The password must be at least 8 characters."
    }
  ]
}
```

**Required Field Error (400):**
```json
{
  "errors": [
    {
      "message": "The email field is required."
    }
  ]
}
```

## Related Documentation

- [Customer Login](/api/graphql/shop/mutations/customer-login)
- [Update Customer Profile](/api/graphql/shop/mutations/update-customer-profile)
- [Authentication Guide](/api/graphql/authentication)
