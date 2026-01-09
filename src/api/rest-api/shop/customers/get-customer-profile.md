---
outline: false
examples:
  - id: get-customer-profile
    title: Get Customer Profile
    description: Retrieve the authenticated customer's profile information.
    request: |
      GET /api/shop/customers/profile
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "data": {
          "customer": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "gender": "M",
            "dateOfBirth": "1990-01-15",
            "status": "active",
            "createdAt": "2023-01-15T10:30:00Z"
          }
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Customer profile not found
        solution: Verify authentication token validity

---

# Get Customer Profile

Retrieve the authenticated customer's profile information.

## Endpoint

```
GET /api/shop/customers/profile
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `customer` | object | Customer profile data |

## Customer Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Customer ID |
| `firstName` | string | First name |
| `lastName` | string | Last name |
| `email` | string | Email address |
| `phone` | string | Phone number |
| `gender` | string | Gender (M/F/Other) |
| `dateOfBirth` | string | Birth date (YYYY-MM-DD) |
| `status` | string | Account status |
| `createdAt` | string | Account creation date |
| `updatedAt` | string | Last update date |

## Use Cases

- Display customer information
- Show account details in dashboard
- Verify customer information
- Pre-fill profile forms
- Display greeting with customer name

## Related Resources

- [Update Customer Profile](/api/rest-api/shop/customers/update-customer-profile)
- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses)
- [Get Customer Orders](/api/rest-api/shop/customers/get-customer-orders)
