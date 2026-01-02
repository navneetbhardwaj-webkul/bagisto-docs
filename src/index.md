---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Bagisto API Documentation"
  text: "REST & GraphQL API."
  tagline: "Explore Bagisto’s API reference"
  actions:
    - theme: brand
      text: Get Started →
      link: /api/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/bagisto/bagisto-api
  image:
    src: /logo-large.png
    alt: Bagisto

features:
  - title: REST API
    details: Explore powerful REST endpoints for managing products, orders, customers, and more. Easy to integrate with any application.
    icon: 🔗
    link: /api/rest-api
  - title: GraphQL API
    details: Query exactly the data you need with our flexible GraphQL API. Perfect for modern frontend applications and mobile apps.
    icon: ⚙️
    link: /api/graphql/introduction
  - title: Authentication
    details: Secure your API requests with token-based authentication and understand OAuth 2.0 integration methods.
    icon: 🔐
    link: /api/graphql/authentication
  - title: Shop API
    details: Access product catalogs, manage shopping carts, process checkouts, and handle customer accounts through powerful shop endpoints.
    icon: 🛒
    link: /api/graphql/introduction
  - title: Admin API
    details: Manage products, orders, customers, and business operations with comprehensive admin API endpoints.
    icon: 📊
    link: /api/graphql/admin-coming-soon
  - title: Integration Guides
    details: Best practices and examples for integrating Bagisto APIs with your application architecture.
    icon: 📚
    link: /api/graphql/integrations
---
