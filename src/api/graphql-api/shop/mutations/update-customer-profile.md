---
outline: false
examples:
  - id: update-customer-profile
    title: Update Customer Profile
    description: Update the authenticated customer's profile information.
    query: |
      mutation updateCustomerProfile($input: UpdateCustomerProfileInput!) {
        updateCustomerProfile(input: $input) {
          customer {
            id
            firstName
            lastName
            email
            dateOfBirth
            gender
            updatedAt
          }
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "firstName": "Jane",
          "lastName": "Doe",
          "dateOfBirth": "1990-01-15",
          "gender": "female"
        }
      }
    response: |
      {
        "data": {
          "updateCustomerProfile": {
            "customer": {
              "id": "1",
              "firstName": "Jane",
              "lastName": "Doe",
              "email": "john.doe@example.com",
              "dateOfBirth": "1990-01-15",
              "gender": "female",
              "updatedAt": "2024-01-15T11:45:00Z"
            },
            "message": "Customer profile updated successfully",
            "success": true
          }
        }
      }
---

# Update Customer Profile

Update the authenticated customer's profile information.

## Authentication

This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ❌ No | Customer's first name |
| `lastName` | String | ❌ No | Customer's last name |
| `email` | String | ❌ No | Customer's email address |
| `dateOfBirth` | String | ❌ No | Date of birth (YYYY-MM-DD format) |
| `gender` | String | ❌ No | Gender (male/female/other) |
| `phone` | String | ❌ No | Phone number |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `customer` | Customer | Updated customer object |
| `message` | String | Success or error message |
| `success` | Boolean | Update success status |

## Validation Rules

- First name and last name can contain letters and spaces
- Email must be in valid format and unique (if changed)
- Date of birth must be in YYYY-MM-DD format
- Gender must be one of: male, female, other

## Error Responses

```json
{
  "errors": {
    "email": ["The email has already been taken."],
    "dateOfBirth": ["The date of birth is invalid."]
  }
}
```

## Related Documentation

- [Get Customer Profile](/api/graphql/shop/queries/get-customer-profile)
- [Delete Customer Profile](/api/graphql/shop/mutations/delete-customer-profile)
