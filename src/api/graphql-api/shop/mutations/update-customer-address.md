---
outline: false
examples:
  - id: update-customer-address
    title: Update Customer Address
    description: Update an existing customer address.
    query: |
      mutation updateCustomerAddress($input: UpdateCustomerAddressInput!) {
        updateCustomerAddress(input: $input) {
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
            updatedAt
          }
          message
          success
        }
      }
    variables: |
      {
        "input": {
          "id": "5",
          "firstName": "Jane",
          "lastName": "Doe",
          "address": "456 Oak Avenue",
          "city": "Los Angeles",
          "state": "CA",
          "country": "US",
          "zipCode": "90001",
          "phone": "+1-555-0102"
        }
      }
    response: |
      {
        "data": {
          "updateCustomerAddress": {
            "address": {
              "id": "5",
              "firstName": "Jane",
              "lastName": "Doe",
              "address": "456 Oak Avenue",
              "city": "Los Angeles",
              "state": "CA",
              "country": "US",
              "zipCode": "90001",
              "phone": "+1-555-0102",
              "isDefault": false,
              "updatedAt": "2024-01-15T13:00:00Z"
            },
            "message": "Address updated successfully",
            "success": true
          }
        }
      }
---

# Update Customer Address

Update an existing customer address.

## Authentication

This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | String | ✅ Yes | Address ID to update |
| `firstName` | String | ❌ No | First name |
| `lastName` | String | ❌ No | Last name |
| `address` | String | ❌ No | Street address |
| `city` | String | ❌ No | City |
| `state` | String | ❌ No | State/Province |
| `country` | String | ❌ No | Country code |
| `zipCode` | String | ❌ No | Postal/Zip code |
| `phone` | String | ❌ No | Phone number |
| `isDefault` | Boolean | ❌ No | Set as default address |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `address` | Address | Updated address object |
| `message` | String | Success or error message |
| `success` | Boolean | Update success status |

## Validation Rules

- Address ID must be valid and belong to the customer
- All required fields must be provided if being updated
- Valid country code must be provided if country is being changed
- Phone number should be in valid format if provided

## Error Responses

```json
{
  "errors": {
    "id": ["Address not found."],
    "country": ["Invalid country code."]
  }
}
```

## Related Documentation

- [Create Customer Address](/api/graphql/shop/mutations/create-customer-address)
- [Delete Customer Address](/api/graphql/shop/mutations/delete-customer-address)
- [Get Customer Addresses](/api/graphql/shop/queries/get-customer-addresses)
