# Shop API - Customers

Manage customer accounts, authentication, and profiles.

## Customer Registration

Create a new customer account.

```graphql
mutation Register($input: CreateCustomerInput!) {
  createCustomer(input: $input) {
    customer {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "passwordConfirmation": "SecurePassword123!"
  }
}
```

## Customer Login

Authenticate a customer and receive an access token.

```graphql
mutation Login($email: String!, $password: String!) {
  createLogin(input: {
    email: $email
    password: $password
  }) {
    accessToken
    customer {
      id
      firstName
      lastName
      email
    }
  }
}
```

**Variables:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

## Get Customer Profile

Retrieve the current customer's profile information.

```graphql
query GetProfile {
  customer {
    id
    firstName
    lastName
    email
    gender
    dateOfBirth
    addresses {
      edges {
        node {
          id
          firstName
          lastName
          address
          city
          state
          country
        }
      }
    }
  }
}
```

## Update Customer Profile

Update customer profile information.

```graphql
mutation UpdateProfile($input: UpdateCustomerInput!) {
  updateCustomer(input: $input) {
    customer {
      id
      firstName
      lastName
      email
    }
  }
}
```

## Change Password

Update customer password.

```graphql
mutation ChangePassword($input: ChangePasswordInput!) {
  changeCustomerPassword(input: $input) {
    status
    message
  }
}
```

## Add Address

Add a new address to customer account.

```graphql
mutation AddAddress($input: AddAddressInput!) {
  addCustomerAddress(input: $input) {
    address {
      id
      firstName
      lastName
      address
      city
      state
      country
      zipCode
    }
  }
}
```

## Update Address

Update an existing customer address.

```graphql
mutation UpdateAddress($input: UpdateAddressInput!) {
  updateCustomerAddress(input: $input) {
    address {
      id
      firstName
      address
      city
    }
  }
}
```

## Delete Address

Remove an address from customer account.

```graphql
mutation DeleteAddress($addressId: String!) {
  deleteCustomerAddress(input: {
    addressId: $addressId
  }) {
    status
  }
}
```

## Forgot Password

Request password reset email.

```graphql
mutation ForgotPassword($email: String!) {
  forgotPassword(input: {
    email: $email
  }) {
    status
    message
  }
}
```

## Reset Password

Reset password using token from email.

```graphql
mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    status
    message
  }
}
```

## Customer Logout

Logout the current customer.

```graphql
mutation Logout {
  createLogout(input: {}) {
    status
  }
}
```

## Related Resources
- [Orders](/api/graphql/shop/orders)
- [Cart](/api/graphql/shop/cart)
- [Addresses](/api/graphql/shop/customers#add-address)
