---
outline: false
examples:
  - id: get-product-reviews-basic
    title: Get Product Reviews - Basic
    description: Retrieve product reviews with basic fields and pagination.
    query: |
      query productReviews($first: Int, $after: String) {
        productReviews(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              name
              title
              rating
              comment
              status
              createdAt
              updatedAt
              productId
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "productReviews": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/reviews/1",
                  "_id": 1,
                  "name": "Tom Smith",
                  "title": "Incredible Product!",
                  "rating": 5,
                  "comment": "This jacket is incredibly warm and comfortable. I love wearing it on cold days or when I'm going for a hike. It's also very stylish and looks great with a pair of jeans or chinos.",
                  "status": 0,
                  "createdAt": "2023-11-16T12:23:20+05:30",
                  "updatedAt": "2023-12-01T10:44:45+05:30",
                  "productId": 357
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/2",
                  "_id": 2,
                  "name": "Thomas Freeman",
                  "title": "High Quality & Affordable",
                  "rating": 5,
                  "comment": "I can't believe how affordable this jacket is for the quality. It's well-made and looks great. I've already gotten so many compliments on it.",
                  "status": 0,
                  "createdAt": "2023-11-16T12:30:54+05:30",
                  "updatedAt": "2023-11-16T12:31:09+05:30",
                  "productId": 357
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/3",
                  "_id": 3,
                  "name": "Emma Wilson",
                  "title": "Perfect Winter Essential",
                  "rating": 4,
                  "comment": "Great quality and very comfortable. Highly recommend for anyone looking for a warm jacket.",
                  "status": 0,
                  "createdAt": "2023-11-18T08:15:30+05:30",
                  "updatedAt": "2023-11-18T08:15:30+05:30",
                  "productId": 357
                },
                "cursor": "Mg=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "Mg=="
            },
            "totalCount": 45
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-product-id
        cause: Product ID is not a valid integer
        solution: Use a valid numeric product ID
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5

  - id: get-product-reviews-filtered
    title: Get Product Reviews - Filtered by Product
    description: Retrieve product reviews filtered by product ID with optional status and rating filters.
    query: |
      query productReviews($productId: Int, $status: Int, $rating: Int, $first: Int, $after: String) {
        productReviews(productId: $productId, status: $status, rating: $rating, first: $first, after: $after) {
          edges {
            node {
              id
              _id
              name
              title
              rating
              comment
              status
              createdAt
              updatedAt
              productId
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
            startCursor
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "productId": 357,
        "status": 0,
        "rating": 5,
        "first": 10
      }
    response: |
      {
        "data": {
          "productReviews": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/reviews/1",
                  "_id": 1,
                  "name": "Tom Smith",
                  "title": "Incredible Product!",
                  "rating": 5,
                  "comment": "This jacket is incredibly warm and comfortable. I love wearing it on cold days or when I'm going for a hike. It's also very stylish and looks great with a pair of jeans or chinos.",
                  "status": 0,
                  "createdAt": "2023-11-16T12:23:20+05:30",
                  "updatedAt": "2023-12-01T10:44:45+05:30",
                  "productId": 357
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/2",
                  "_id": 2,
                  "name": "Thomas Freeman",
                  "title": "High Quality & Affordable",
                  "rating": 5,
                  "comment": "I can't believe how affordable this jacket is for the quality. It's well-made and looks great. I've already gotten so many compliments on it.",
                  "status": 0,
                  "createdAt": "2023-11-16T12:30:54+05:30",
                  "updatedAt": "2023-11-16T12:31:09+05:30",
                  "productId": 357
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/8",
                  "_id": 8,
                  "name": "Sarah Johnson",
                  "title": "Excellent Value",
                  "rating": 5,
                  "comment": "Outstanding quality for the price. Very satisfied with my purchase. Would buy again!",
                  "status": 0,
                  "createdAt": "2023-12-02T14:45:20+05:30",
                  "updatedAt": "2023-12-02T14:45:20+05:30",
                  "productId": 357
                },
                "cursor": "Mw=="
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "Mw==",
              "startCursor": "MA==",
              "hasPreviousPage": false
            },
            "totalCount": 3
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments or exceeding maximum limit
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-product-id
        cause: Product ID is not a valid integer
        solution: Use a valid numeric product ID
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5
      - error: invalid-status
        cause: Status value is not valid
        solution: Use status 0 (pending), 1 (approved), or 2 (rejected)

  - id: get-product-reviews-complete
    title: Get Product Reviews - Complete Details
    description: Retrieve all product reviews with complete pagination information and all filters applied.
    query: |
      query productReviews($productId: Int, $status: Int, $rating: Int, $first: Int, $after: String, $last: Int, $before: String) {
        productReviews(productId: $productId, status: $status, rating: $rating, first: $first, after: $after, last: $last, before: $before) {
          edges {
            node {
              id
              _id
              name
              title
              rating
              comment
              status
              createdAt
              updatedAt
              productId
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 5
      }
    response: |
      {
        "data": {
          "productReviews": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/reviews/1",
                  "_id": 1,
                  "name": "Tom Smith",
                  "title": "Incredible Product!",
                  "rating": 5,
                  "comment": "This jacket is incredibly warm and comfortable. I love wearing it on cold days or when I'm going for a hike. It's also very stylish and looks great with a pair of jeans or chinos.",
                  "status": 0,
                  "createdAt": "2023-11-16T12:23:20+05:30",
                  "updatedAt": "2023-12-01T10:44:45+05:30",
                  "productId": 357
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/2",
                  "_id": 2,
                  "name": "Thomas Freeman",
                  "title": "High Quality & Affordable",
                  "rating": 5,
                  "comment": "I can't believe how affordable this jacket is for the quality. It's well-made and looks great. I've already gotten so many compliments on it.",
                  "status": 0,
                  "createdAt": "2023-11-16T12:30:54+05:30",
                  "updatedAt": "2023-11-16T12:31:09+05:30",
                  "productId": 357
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/3",
                  "_id": 3,
                  "name": "Emma Wilson",
                  "title": "Perfect Winter Essential",
                  "rating": 4,
                  "comment": "Great quality and very comfortable. Highly recommend for anyone looking for a warm jacket.",
                  "status": 0,
                  "createdAt": "2023-11-18T08:15:30+05:30",
                  "updatedAt": "2023-11-18T08:15:30+05:30",
                  "productId": 357
                },
                "cursor": "Mg=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/4",
                  "_id": 4,
                  "name": "James Brown",
                  "title": "Good Value",
                  "rating": 4,
                  "comment": "Nice jacket, good quality. Would recommend to friends and family.",
                  "status": 0,
                  "createdAt": "2023-11-20T16:30:15+05:30",
                  "updatedAt": "2023-11-20T16:30:15+05:30",
                  "productId": 357
                },
                "cursor": "Mw=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/5",
                  "_id": 5,
                  "name": "Lisa Anderson",
                  "title": "Excellent Quality",
                  "rating": 5,
                  "comment": "Best jacket I've ever owned. Highly recommended for anyone looking for quality and style.",
                  "status": 0,
                  "createdAt": "2023-11-22T09:45:22+05:30",
                  "updatedAt": "2023-11-22T09:45:22+05:30",
                  "productId": 357
                },
                "cursor": "NA=="
              }
            ],
            "pageInfo": {
              "endCursor": "NA==",
              "startCursor": "MA==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 45
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments or exceeding maximum limit
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-product-id
        cause: Product ID is not a valid integer
        solution: Use a valid numeric product ID
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5
      - error: invalid-status
        cause: Status value is not valid
        solution: Use status 0 (pending), 1 (approved), or 2 (rejected)

---

# Product Reviews

## About

The `productReviews` query retrieves a collection of product reviews with filtering and pagination support. Use this query to:

- Display product reviews on product detail pages
- Show review statistics and ratings
- Filter reviews by product, status, and rating
- Build review listing pages with pagination
- Display customer feedback and testimonials
- Calculate average ratings and review counts
- Show pending reviews in admin dashboard
- Implement review sorting and filtering

This query supports full pagination with cursor-based navigation and flexible filtering options for various use cases.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | `Int` | ❌ No | Filter reviews by product ID. |
| `status` | `Int` | ❌ No | Filter by review status (0 = pending, 1 = approved, 2 = rejected). |
| `rating` | `Int` | ❌ No | Filter by rating value (1-5 stars). |
| `first` | `Int` | ❌ No | Number of results to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Pagination cursor for forward navigation. Use with `first`. |
| `last` | `Int` | ❌ No | Number of results for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Pagination cursor for backward navigation. Use with `last`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique review API identifier. |
| `_id` | `Int!` | Numeric review ID. |
| `name` | `String!` | Customer name who wrote the review. |
| `title` | `String!` | Review title/headline. |
| `rating` | `Int!` | Star rating (1-5). |
| `comment` | `String!` | Review comment/text. |
| `status` | `Int!` | Review status (0 = pending, 1 = approved, 2 = rejected). |
| `createdAt` | `DateTime!` | Review creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `productId` | `Int!` | Associated product ID. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total reviews matching filters. |

## Review Status

| Status | Description |
|--------|-------------|
| `0` | Pending - Awaiting approval |
| `1` | Approved - Published on storefront |
| `2` | Rejected - Not published |

## Use Cases

### 1. Product Reviews Page
Use the "Filtered by Product" example to display all approved reviews for a specific product.

### 2. Admin Review Management
Use the "Complete Details" example with `status: 0` to show pending reviews requiring approval.

### 3. High-Rated Reviews
Use the "Filtered by Product" example with `rating: 5` to highlight 5-star reviews.

### 4. Customer Testimonials
Filter by approved status and high rating to display customer testimonials.

### 5. Review Analytics
Use pagination to fetch all reviews for a product and calculate statistics.

## Best Practices

1. **Filter by Status** - Always filter by `status: 1` to show only approved reviews to customers
2. **Show Ratings** - Display the rating prominently alongside the review
3. **Use Pagination** - Always implement pagination for better performance
4. **Cache Results** - Cache reviews for better performance as they change infrequently
5. **Sort Reviews** - Display most recent or highest-rated reviews first
6. **Prevent Spam** - Only show approved reviews to maintain quality
7. **Display Author Info** - Show customer name to build trust and authenticity

## Related Resources

- [Get Single Product Review](/api/graphql/shop/queries/get-product-review) - Query individual review details
- [Create Product Review](/api/graphql/shop/mutations/create-product-review) - Submit new product review
- [Get Product](/api/graphql/shop/queries/get-product) - Query product details
- [Pagination Guide](/api/graphql/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
