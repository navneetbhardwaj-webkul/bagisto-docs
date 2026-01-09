---
outline: false
examples:
  - id: update-customer-address
    title: Update Customer Address
    description: Update an existing customer address.
    request: |
      PUT /api/shop/customers/addresses/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "firstName": "Jane",
        "lastName": "Doe",
        "address": "789 Pine Rd",
        "city": "Los Angeles",
        "state": "CA",
        "country": "US",
        "postcode": "90002",
        "phone": "9876543210"
      }
    response: |
      {
        "data": {
          "address": {
            "id": 1,
            "firstName": "Jane",
            "lastName": "Doe",
            "address": "789 Pine Rd",
            "city": "Los Angeles",
            "state": "CA",
            "country": "US",
            "postcode": "90002",
            "phone": "9876543210"
          }
        },
        "message": "Address updated successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Address does not exist
        solution: Verify the address ID
      - error: 403 Forbidden
        cause: Address belongs to different customer
        solution: Only update your own addresses

---

# Update Customer Address

Update an existing address in the customer's address book.

## Endpoint

```
PUT /api/shop/customers/addresses/{addressId}
```

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `addressId` | integer | Yes | Address ID to update |

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
  "address": "789 Pine Rd",
  "city": "Los Angeles",
  "state": "CA",
  "country": "US",
  "postcode": "90002",
  "phone": "9876543210"
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

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `address` | object | Updated address details |
| `message` | string | Success message |

## Validation Rules

- Address must belong to customer
- All required fields must be provided
- Country/State must be valid
- Cannot update other customer's addresses

## Use Cases

- Correct address information
- Update phone number
- Change city/state
- Modify street address
- Update postal code

## Related Resources

- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses)
- [Create Customer Address](/api/rest-api/shop/customers/create-customer-address)
- [Delete Customer Address](/api/rest-api/shop/customers/delete-customer-address)
