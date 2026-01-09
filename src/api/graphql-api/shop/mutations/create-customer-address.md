---
outline: false
examples:
  - id: create-customer-address
    title: Create Customer Address
    description: Create a new address for the authenticated customer.
    query: |
      mutation createCustomerAddress($input: CreateCustomerAddressInput!) {
        createCustomerAddress(input: $input) {
          address {
            id
            firstName
            lastName
            address
            city
            state
            country
            zipCode
            phone
            isDefault
            createdAt
          }
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "firstName": "John",
          "lastName": "Doe",
          "address": "123 Main Street",
          "city": "New York",
          "state": "NY",
          "country": "US",
          "zipCode": "10001",
          "phone": "+1-555-0100",
          "isDefault": false
        }
      }
    response: |
      {
        "data": {
          "createCustomerAddress": {
            "address": {
              "id": "5",
              "firstName": "John",
              "lastName": "Doe",
              "address": "123 Main Street",
              "city": "New York",
              "state": "NY",
              "country": "US",
              "zipCode": "10001",
              "phone": "+1-555-0100",
              "isDefault": false,
              "createdAt": "2024-01-15T12:00:00Z"
            },
            "message": "Address created successfully",
            "success": true
          }
        }
      }
---

# Create Customer Address

Create a new address for the authenticated customer.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ✅ Yes | First name |
| `lastName` | String | ✅ Yes | Last name |
| `address` | String | ✅ Yes | Street address |
| `city` | String | ✅ Yes | City |
| `state` | String | ✅ Yes | State/Province |
| `country` | String | ✅ Yes | Country code (ISO 3166-1 alpha-2) |
| `zipCode` | String | ✅ Yes | Postal/Zip code |
| `phone` | String | ❌ No | Phone number |
| `isDefault` | Boolean | ❌ No | Set as default address |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `address` | Address | Created address object |
| `message` | String | Success or error message |
| `success` | Boolean | Creation success status |

## Validation Rules

- First name and last name required
- Complete address required
- Valid country code must be provided
- Zip code format depends on country
- Phone number should be in valid format

## Error Responses

```json
{
  "errors": {
    "address": ["The address field is required."],
    "country": ["Invalid country code."]
  }
}
```

## Related Documentation

- [Get Customer Addresses](/api/graphql/shop/queries/get-customer-addresses)
- [Update Customer Address](/api/graphql/shop/mutations/update-customer-address)
- [Delete Customer Address](/api/graphql/shop/mutations/delete-customer-address)
