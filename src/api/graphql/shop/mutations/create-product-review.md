---
outline: false
examples:
  - id: create-product-review-basic
    title: Create Product Review - Basic
    description: Create a basic product review with title, comment, and rating.
    query: |
      mutation createProductReview($input: createProductReviewInput!) {
        createProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 357,
          "title": "Excellent quality and very stylish",
          "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
          "rating": 5,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "status": 0
        }
      }
    response: |
      {
        "data": {
          "createProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/92",
              "_id": 92,
              "name": "John Doe",
              "title": "Excellent quality and very stylish",
              "rating": 5,
              "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
              "status": 0,
              "createdAt": "2024-12-26T10:30:45+05:30",
              "updatedAt": "2024-12-26T10:30:45+05:30"
            }
          }
        }
      }
    commonErrors:
      - error: input-required
        cause: Input parameter is missing
        solution: Provide all required input fields (productId, title, comment, rating, name)
      - error: invalid-product-id
        cause: Product ID is invalid or product does not exist
        solution: Use a valid product ID that exists in the system
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5

  - id: create-product-review-with-attachments
    title: Create Product Review - With Image Attachments
    description: Create a product review with Base64-encoded image attachments.
    query: |
      mutation createProductReview($input: createProductReviewInput!) {
        createProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
            attachments
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 357,
          "title": "Great Product with Photos",
          "comment": "Here's the product with photos attached. The quality is excellent as you can see from the images.",
          "rating": 5,
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "status": 0,
          "attachments": "[\"data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==\", \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==\"]"
        }
      }
    response: |
      {
        "data": {
          "createProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/93",
              "_id": 93,
              "name": "Jane Smith",
              "title": "Great Product with Photos",
              "rating": 5,
              "comment": "Here's the product with photos attached. The quality is excellent as you can see from the images.",
              "status": 0,
              "attachments": "[{\"type\":\"image\",\"url\":\"http://example.com/storage/review/93/image1.webp\"},{\"type\":\"image\",\"url\":\"http://example.com/storage/review/93/image2.png\"}]",
              "createdAt": "2024-12-26T11:15:30+05:30",
              "updatedAt": "2024-12-26T11:15:30+05:30"
            }
          }
        }
      }
    commonErrors:
      - error: input-required
        cause: Input parameter is missing
        solution: Provide all required input fields
      - error: invalid-attachment-format
        cause: Attachment format is not valid Base64 encoded data
        solution: Provide attachments as valid Base64-encoded image or video data
      - error: invalid-product-id
        cause: Product ID is invalid or product does not exist
        solution: Use a valid product ID that exists in the system
      - error: attachment-size-exceeded
        cause: Attachment file size exceeds maximum allowed
        solution: Use smaller image or video files

  - id: create-product-review-complete
    title: Create Product Review - Complete with Metadata
    description: Create a product review with all fields including client mutation ID for tracking.
    query: |
      mutation createProductReview($input: createProductReviewInput!) {
        createProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
            attachments
            createdAt
            updatedAt
          }
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "productId": 357,
          "title": "Professional Review with Attachments",
          "comment": "This is a detailed product review with multiple attachments including product photos and a video demonstration. The product quality exceeded my expectations.",
          "rating": 5,
          "name": "Tom Wilson",
          "email": "tom.wilson@example.com",
          "status": 1,
          "clientMutationId": "review-mutation-001",
          "attachments": "[\"data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==\", \"data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKw=\"]"
        }
      }
    response: |
      {
        "data": {
          "createProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/94",
              "_id": 94,
              "name": "Tom Wilson",
              "title": "Professional Review with Attachments",
              "rating": 5,
              "comment": "This is a detailed product review with multiple attachments including product photos and a video demonstration. The product quality exceeded my expectations.",
              "status": 1,
              "attachments": "[{\"type\":\"image\",\"url\":\"http://example.com/storage/review/94/photo1.webp\"},{\"type\":\"video\",\"url\":\"http://example.com/storage/review/94/demo.mp4\"}]",
              "createdAt": "2024-12-26T12:45:20+05:30",
              "updatedAt": "2024-12-26T12:45:20+05:30"
            },
            "clientMutationId": "review-mutation-001"
          }
        }
      }
    commonErrors:
      - error: input-required
        cause: Input parameter is missing
        solution: Provide the input object with all required fields
      - error: invalid-attachment-format
        cause: Attachment is not properly Base64 encoded
        solution: Ensure attachments are valid Base64-encoded data with proper MIME type prefix
      - error: invalid-product-id
        cause: Product ID is invalid or exceeds 32-bit integer range
        solution: Use a valid numeric product ID
      - error: invalid-rating
        cause: Rating is outside valid range
        solution: Use rating value between 1 and 5
      - error: missing-required-field
        cause: Required field is missing (productId, title, comment, rating, name)
        solution: Provide all required input fields

---

# Create Product Review

## About

The `createProductReview` mutation allows customers to submit product reviews with ratings, comments, and media attachments. Use this mutation to:

- Submit product reviews from customers
- Add images and videos as review attachments
- Set review status (pending, approved, rejected)
- Track review submissions with client mutation ID
- Enable customer feedback on products
- Build user-generated content on storefront
- Collect product ratings and reviews

This mutation supports Base64-encoded image and video attachments for rich media reviews.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | `Int!` | ✅ Yes | The ID of the product being reviewed. |
| `title` | `String!` | ✅ Yes | Review title/headline. |
| `comment` | `String!` | ✅ Yes | Review comment/text. |
| `rating` | `Int!` | ✅ Yes | Star rating (1-5). |
| `name` | `String!` | ✅ Yes | Reviewer's name. |
| `email` | `String` | ❌ No | Reviewer's email address. |
| `status` | `Int` | ❌ No | Review status (0 = pending, 1 = approved, 2 = rejected). Default: 0 (pending). |
| `attachments` | `String` | ❌ No | JSON string array of Base64-encoded images/videos. |
| `clientMutationId` | `String` | ❌ No | Optional client mutation tracking ID. |

## Input Fields Details

### productId
- **Type**: Integer (32-bit signed)
- **Required**: Yes
- **Description**: The product ID being reviewed. Must exist in the system.
- **Example**: `357`

### title
- **Type**: String
- **Required**: Yes
- **Description**: Review headline (typically 5-100 characters).
- **Example**: `"Excellent quality and very stylish"`

### comment
- **Type**: String
- **Required**: Yes
- **Description**: Full review text with detailed feedback.
- **Example**: `"Very impressed with the product. Fabric feels premium..."`

### rating
- **Type**: Integer (1-5)
- **Required**: Yes
- **Description**: Star rating (1 = lowest, 5 = highest).
- **Valid Values**: 1, 2, 3, 4, 5

### name
- **Type**: String
- **Required**: Yes
- **Description**: Reviewer's name (how it appears on review).
- **Example**: `"John Doe"`

### email
- **Type**: String
- **Required**: No
- **Description**: Reviewer's email address.
- **Example**: `"john.doe@example.com"`

### status
- **Type**: Integer
- **Required**: No
- **Default**: 0 (Pending)
- **Valid Values**:
  - `0` - Pending approval
  - `1` - Approved and visible
  - `2` - Rejected/hidden
- **Description**: Initial review status.

### attachments
- **Type**: JSON String Array
- **Required**: No
- **Format**: Array of Base64-encoded data URIs
- **Supported MIME Types**:
  - Images: `image/webp`, `image/png`, `image/jpeg`, `image/jpg`, `image/gif`
  - Videos: `video/mp4`, `video/webm`, `video/quicktime`
- **Description**: Media files attached to review (maximum 10 MB per file recommended)
- **Example**:
  ```json
  [
    "data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB...",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB...",
    "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAG..."
  ]
  ```

### clientMutationId
- **Type**: String
- **Required**: No
- **Description**: Optional tracking ID for this mutation request.
- **Example**: `"review-mutation-001"`

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `productReview` | `ProductReview!` | The created product review object. |
| `productReview.id` | `ID!` | Unique review API identifier. |
| `productReview._id` | `Int!` | Numeric review ID. |
| `productReview.name` | `String!` | Reviewer's name. |
| `productReview.title` | `String!` | Review title. |
| `productReview.rating` | `Int!` | Star rating (1-5). |
| `productReview.comment` | `String!` | Review text. |
| `productReview.status` | `Int!` | Review status. |
| `productReview.attachments` | `String` | JSON string of attachment objects with type and URL. |
| `productReview.createdAt` | `DateTime` | Review creation timestamp. |
| `productReview.updatedAt` | `DateTime` | Last update timestamp. |
| `clientMutationId` | `String` | Echoed client mutation ID for tracking. |

## Attachments Format

### Input Format (Creating Review)
- Must be a **JSON string** containing an array
- Each item is a **Base64-encoded data URI**
- Format: `"data:{MIME_TYPE};base64,{BASE64_DATA}"`

**Example Input:**
```json
"[\"data:image/webp;base64,iVBORw0KG...\", \"data:image/png;base64,iVBORw0KG...\"]"
```

### Response Format (Retrieved Review)
- Returned as a **JSON string** containing an array of objects
- Each object has `type` (image/video) and `url` (file URL)

**Example Response:**
```json
"[{\"type\":\"image\",\"url\":\"http://example.com/storage/review/94/photo1.webp\"},{\"type\":\"video\",\"url\":\"http://example.com/storage/review/94/demo.mp4\"}]"
```

## Review Status

| Status | Description | Usage |
|--------|-------------|-------|
| `0` | Pending | Awaiting admin approval before display |
| `1` | Approved | Published on product page |
| `2` | Rejected | Hidden from public view |

## Use Cases

### 1. Customer Review Submission
Use the "Basic" example for customers to submit reviews without attachments.

### 2. Review with Product Photos
Use the "With Image Attachments" example for customers to upload product photos.

### 3. Detailed Review with Multiple Media
Use the "Complete" example for detailed reviews with both images and videos.

### 4. Admin Review Creation
Create reviews with `status: 1` for immediate publication.

## Best Practices

1. **Validate Input** - Ensure all required fields are provided before submission
2. **Optimize Attachments** - Use compressed images (WebP format recommended)
3. **File Size Limits** - Keep individual files under 10 MB
4. **Rating Validation** - Verify rating is between 1 and 5
5. **Content Moderation** - Set status to 0 (pending) by default for customer reviews
6. **Handle Errors** - Provide clear error messages for failed submissions
7. **Duplicate Prevention** - Implement client-side deduplication before submission
8. **Attachment Limits** - Limit number of attachments per review (typically 5-10 maximum)

## Error Scenarios

### Missing Input
When `input` parameter is not provided, GraphQL returns validation error.

### Invalid Product ID
When product ID doesn't exist or is in invalid format.

### Invalid Attachment Format
When Base64 encoding is malformed or MIME type is unsupported.

### Missing Required Fields
When any required field (productId, title, comment, rating, name) is missing.

## Related Resources

- [Get Product Reviews](/api/graphql/shop/queries/get-product-reviews) - Query product reviews
- [Get Product Review](/api/graphql/shop/queries/get-product-review) - Query single review details
- [Get Product](/api/graphql/shop/queries/get-product) - Query product details
- [Mutations Guide](/api/graphql/shop/mutations) - Overview of shop mutations
- [Shop API Overview](/api/graphql/shop-api) - Overview of Shop API resources
