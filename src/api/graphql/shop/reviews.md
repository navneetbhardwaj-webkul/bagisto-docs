# Shop API - Reviews

Manage and view product reviews and ratings.

## Get Product Reviews

Retrieve all reviews for a specific product.

```graphql
query GetReviews($productId: String!, $first: Int!) {
  reviews(productId: $productId, first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        rating
        comment
        customerName
        email
        status
        createdAt
      }
    }
  }
}
```

**Variables:**
```json
{
  "productId": "1",
  "first": 10
}
```

## Get Single Review

Retrieve details of a specific review.

```graphql
query GetReview($id: String!) {
  review(id: $id) {
    id
    title
    rating
    comment
    customerName
    email
    createdAt
  }
}
```

## Create Product Review

Submit a new product review.

```graphql
mutation CreateReview($input: CreateReviewInput!) {
  createReview(input: $input) {
    review {
      id
      title
      rating
      comment
      status
      createdAt
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "productId": "1",
    "title": "Great Product!",
    "rating": 5,
    "comment": "Excellent quality and fast shipping.",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Related Resources
- [Products](/api/graphql/shop/products)
- [Orders](/api/graphql/shop/orders)
