---
outline: false
examples:
  - id: update-customer-profile
    title: Update Customer Profile
    description: Update the authenticated customer's profile information.
    request: |
      PUT /api/shop/customers/profile
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "gender": "M",
        "dateOfBirth": "1990-01-15"
      }
    response: |
      {
        "data": {
          "customer": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "gender": "M",
            "dateOfBirth": "1990-01-15",
            "updatedAt": "2024-01-15T10:30:00Z"
          }
        },
        "message": "Profile updated successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 422 Unprocessable Entity
        cause: Email already exists
        solution: Use unique email address
      - error: 400 Bad Request
        cause: Invalid data format
        solution: Verify all fields match required format

---

# Update Customer Profile

Update the authenticated customer's profile information.

## Endpoint

```
PUT /api/shop/customers/profile
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
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "gender": "M",
  "dateOfBirth": "1990-01-15"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `firstName` | string | Yes | First name (max 255 chars) |
| `lastName` | string | Yes | Last name (max 255 chars) |
| `email` | string | Yes | Valid email address |
| `phone` | string | No | Phone number |
| `gender` | string | No | Gender (M/F/Other) |
| `dateOfBirth` | string | No | Birth date (YYYY-MM-DD) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `customer` | object | Updated customer profile |
| `message` | string | Success message |

## Validation Rules

- First name: required, max 255 characters
- Last name: required, max 255 characters
- Email: must be unique, valid format
- Phone: optional, valid format
- Date of birth: optional, valid date format

## Use Cases

- Update account information
- Change email address
- Modify personal details
- Update phone number
- Add/change birth date

## Important Notes

- Changing email requires verification
- Some fields may be locked by admin
- Updates reflected immediately
- Original email may be required for verification

## Related Resources

- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
- [Delete Customer Profile](/api/rest-api/shop/customers/delete-customer-profile)
