# REST API - Introduction

Welcome to the Bagisto REST API documentation! This guide will help you build modern, efficient e-commerce applications using our comprehensive REST API platform built with **API Platform** and **Laravel**.

## Endpoints and Requests

All Bagisto REST API endpoints follow this pattern:

```
https://{your-domain.com}/api/{type}/{resource}
```

API endpoints are organized by resource type. You'll need to use different endpoints depending on your app's requirements.

### Common Endpoint Patterns

| Pattern | Example | Purpose |
|---------|---------|---------|
| `GET /api/{type}/{resource}` | `GET /api/shop/products` | List resources with pagination |
| `GET /api/{type}/{resource}/{id}` | `GET /api/shop/products/1` | Retrieve a specific resource |
| `POST /api/{type}/{resource}` | `POST /api/shop/customers` | Create a new resource |
| `PATCH /api/{type}/{resource}/{id}` | `PATCH /api/admin/products/1` | Update a resource |
| `DELETE /api/{type}/{resource}/{id}` | `DELETE /api/admin/products/5` | Delete a resource |

## What is REST API?

REST (Representational State Transfer) is an architectural style for building web services using HTTP. It provides a simple, stateless interface for building client-server applications with standard HTTP methods (GET, POST, PATCH, DELETE).

**Key Benefits for Bagisto:**
- 🎯 **Standard HTTP Methods** - Familiar REST conventions for all developers
- ⚡ **Efficient Data Transfer** - Optimized payloads with selective field inclusion
- 📱 **Mobile Optimized** - Perfect for native mobile app integrations
- 🔒 **Secure Authentication** - Token-based authentication with Laravel Sanctum
- 📚 **Well-Documented** - Comprehensive OpenAPI/Swagger documentation
- � **Consistent API Design** - Uniform patterns across all resources

## Architecture Overview

Bagisto's REST API is built using the **API Platform** framework with **Laravel**, providing two distinct API layers:

### 🛍️ Shop API (Frontend)
The public-facing API for customer-facing operations:
- Product browsing and catalog management
- Shopping cart management
- Customer registration and authentication
- Order placement and management
- Address and customer profile management
- Reviews and ratings
- Wishlist and product reviews

### 👨‍💼 Admin API (Backend)
The administrative API for management operations:
- Product and category management
- Customer administration
- Order management and fulfillment
- Inventory management
- System configuration
- Reports and analytics

## Quick Start

### 1. Installation
See the [Installation Guide](/api/installation).**

### 2. Enable Swagger UI 

- By default swagger UI is enabled but you can enable / disable using the file
config/api-platform.conf

### 3. Access Swagger UI
 - [Shop API Swagger](https://api-demo.bagisto.com/api/shop)
 - [Admin API Swagger](https://api-demo.bagisto.com/api/admin)


## API Endpoints Structure

Bagisto REST API follows a hierarchical endpoint structure:

| Category | Base Path | Purpose |
|----------|-----------|---------|
| Shop API | `/api/shop/` | Customer-facing operations |
| Admin API | `/api/admin/` | Administrative operations |

## REST API HTTP Methods

| Method | Purpose | Use Case |
|--------|---------|----------|
| `GET` | Retrieve resources | Fetch single or collection of resources |
| `POST` | Create resource | Create new resource or perform mutations |
| `PUT` | Full replace | Replace entire resource |
| `DELETE` | Remove resource | Delete a resource |


## Common Headers

| Header | Purpose | Example |
| Header | Purpose | Example |
|--------|---------|---------|
| `Authorization` | Bearer token for authentication | `Bearer eyJhbGc...` |
| `Content-Type` | Request payload format | `application/json` |
| `Accept` | Expected response format | `application/json` |
| `X-STOREFRONT-KEY` | Storefront API key (Shop API) | `550e8400-e29b-...` |

## What's Next?

- 🛍️ [Shop API Resources](/api/rest-api/shop-resources) - Complete shop operations guide
- 👨‍💼 [Cart & Checkout](/api/rest-api/cart-checkout) - Shopping cart and order management
- 👤 [Customer Management](/api/rest-api/customers) - Customer profiles and addresses
- 📦 [Product Management](/api/rest-api/products) - Product operations and details
- 🔐 [Authentication Guide](/api/rest-api/authentication) - Detailed auth methods
- 💡 [Best Practices](/api/rest-api/best-practices) - Performance and security tips

## Support & Resources

- 🌐 [Interactive Swagger UI](https://api-demo.bagisto.com/api)
- 📖 [OpenAPI Schema](https://api-demo.bagisto.com/api/docs.json)
- 💬 [Community Forum](https://forums.bagisto.com)
- 🐛 [Issue Tracker](https://github.com/bagisto/bagisto-api/issues)
- 📧 [Contact Support](https://bagisto.com/en/contacts/)

---