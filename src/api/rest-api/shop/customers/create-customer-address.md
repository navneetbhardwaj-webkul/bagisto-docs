---
outline: false
examples:
  - id: create-customer-address
    title: Create Customer Address
    description: Add a new address to the customer's address book.
    request: |
      POST /api/shop/customers/addresses
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "firstName": "Jane",
        "lastName": "Doe",
        "address": "456 Oak Ave",
        "city": "Los Angeles",
        "state": "CA",
        "country": "US",
        "postcode": "90001",
        "phone": "9876543210",
        "isDefault": false
      }
    response: |
      {
        "data": {
          "address": {
            "id": 2,
            "firstName": "Jane",
            "lastName": "Doe",
            "address": "456 Oak Ave",
            "city": "Los Angeles",
            "state": "CA",
            "country": "US",
            "postcode": "90001",
            "phone": "9876543210",
            "isDefault": false
          }
        },
        "message": "Address created successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 422 Unprocessable Entity
        cause: Missing required fields
        solution: Provide all required fields

---

# Create Customer Address

Add a new address to the customer's address book.

## Endpoint

```
POST /api/shop/customers/addresses
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "CA",
  "country": "US",
  "postcode": "90001",
  "phone": "9876543210",
  "isDefault": false
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `firstName` | string | Yes | First name |
| `lastName` | string | Yes | Last name |
| `address` | string | Yes | Street address |
| `city` | string | Yes | City |
| `state` | string | Yes | State/Province |
| `country` | string | Yes | Country code |
| `postcode` | string | Yes | Postal code |
| `phone` | string | No | Phone number |
| `isDefault` | boolean | No | Set as default address |

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `address` | object | Created address details |
| `message` | string | Success message |

## Validation Rules

- All required fields must be provided
- Country/State must be valid
- Phone must be valid format
- Email must be valid if provided
- Maximum 10 addresses per customer

## Use Cases

- Add billing address
- Add shipping address
- Save alternate location
- Store office address
- Store home address

## Related Resources

- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses)
- [Update Customer Address](/api/rest-api/shop/customers/update-customer-address)
- [Delete Customer Address](/api/rest-api/shop/customers/delete-customer-address)
