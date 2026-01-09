---
outline: false
examples:
  - id: get-customer-addresses
    title: Get Customer Addresses
    description: Retrieve all saved addresses for the authenticated customer.
    request: |
      GET /api/shop/customers/addresses
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "data": {
          "addresses": [
            {
              "id": 1,
              "firstName": "John",
              "lastName": "Doe",
              "address": "123 Main St",
              "city": "New York",
              "state": "NY",
              "country": "US",
              "postcode": "10001",
              "phone": "1234567890",
              "isDefault": true
            },
            {
              "id": 2,
              "firstName": "John",
              "lastName": "Doe",
              "address": "456 Oak Ave",
              "city": "Los Angeles",
              "state": "CA",
              "country": "US",
              "postcode": "90001",
              "phone": "9876543210",
              "isDefault": false
            }
          ]
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token

---

# Get Customer Addresses

Retrieve all saved addresses for the authenticated customer.

## Endpoint

```
GET /api/shop/customers/addresses
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `addresses` | array | List of customer addresses |

## Address Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address ID |
| `firstName` | string | First name |
| `lastName` | string | Last name |
| `address` | string | Street address |
| `city` | string | City |
| `state` | string | State/Province |
| `country` | string | Country code |
| `postcode` | string | Postal code |
| `phone` | string | Phone number |
| `isDefault` | boolean | Is default address |
| `addressType` | string | Type (residential/commercial) |

## Use Cases

- Display saved addresses in checkout
- Allow customer to select address
- Populate address dropdown
- Show customer's address book
- Select shipping address
- Select billing address

## Related Resources

- [Create Customer Address](/api/rest-api/shop/customers/create-customer-address)
- [Update Customer Address](/api/rest-api/shop/customers/update-customer-address)
- [Delete Customer Address](/api/rest-api/shop/customers/delete-customer-address)
