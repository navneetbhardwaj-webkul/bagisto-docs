---
outline: false
examples:
  - id: get-customer-addresses
    title: Get Customer Addresses
    description: Retrieve all saved addresses for the authenticated customer.
    query: |
      query getCustomerAddresses($first: Int, $after: String) {
        customerAddresses(first: $first, after: $after) {
          edges {
            node {
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
              addressType
              createdAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "customerAddresses": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "firstName": "John",
                  "lastName": "Doe",
                  "address": "123 Main Street",
                  "city": "New York",
                  "state": "NY",
                  "country": "US",
                  "zipCode": "10001",
                  "phone": "+1-555-0100",
                  "isDefault": true,
                  "addressType": "billing",
                  "createdAt": "2024-01-10T10:00:00Z"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "cursor-value"
            }
          }
        }
      }
---

# Get Customer Addresses

Retrieve all saved addresses for the authenticated customer.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `first` | Int | ❌ No | Number of addresses to fetch (default: 10, max: 100) |
| `after` | String | ❌ No | Cursor for forward pagination |
| `last` | Int | ❌ No | Number of addresses to fetch backward |
| `before` | String | ❌ No | Cursor for backward pagination |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Address ID |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `address` | String | Street address |
| `city` | String | City |
| `state` | String | State/Province |
| `country` | String | Country code |
| `zipCode` | String | Postal/Zip code |
| `phone` | String | Phone number |
| `isDefault` | Boolean | Is default address |
| `addressType` | String | Type (billing/shipping) |
| `createdAt` | DateTime | Creation date |

## Pagination

Uses cursor-based pagination:
- `first` + `after` for forward pagination
- `last` + `before` for backward pagination

## Address Types

| Type | Description |
|------|-------------|
| `billing` | Billing address |
| `shipping` | Shipping address |

## Use Cases

- Display saved addresses
- Pre-fill checkout address selection
- Show address book in account dashboard
- Select billing/shipping address

## Error Responses

```json
{
  "errors": {
    "authentication": ["Unauthorized: Invalid or expired token"]
  }
}
```

## Related Documentation

- [Create Customer Address](/api/graphql/shop/mutations/create-customer-address)
- [Update Customer Address](/api/graphql/shop/mutations/update-customer-address)
- [Delete Customer Address](/api/graphql/shop/mutations/delete-customer-address)
- [Get Addresses](/api/graphql/shop/queries/get-addresses)
