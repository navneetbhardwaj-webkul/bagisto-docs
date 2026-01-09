# Setup & Configuration

Get the Bagisto API up and running in just a few minutes. Choose the installation method that works best for your setup.

## Prerequisites

Before installing, ensure you have:

- **Bagisto v2.0 or higher** installed
- **PHP 8.2+**
- **Composer 2.0+**
- **Laravel 11.x**
- **MySQL 8.0+**

## Installation Methods

### Method 1: Quick Start (Composer Installation – Recommended)

The fastest way to get started:

```bash
# 1. Install the Bagisto API package
composer require bagisto/bagisto-api

# 2. Run the installer
php artisan bagisto-api:install

# 3. Run database migrations
php artisan migrate

# 4. Clear and rebuild caches
php artisan optimize:clear
php artisan optimize

# 5. Create your first API key
php artisan bagisto-api:generate-key --name="Default Store"
```

Your APIs are now ready! Access them at:
- **REST API Docs**: `https://your-domain.com/api/docs`
- **GraphQL Playground**: `https://your-domain.com/graphql`
 
### Method 2: Manual Installation

Use this method if you need more control over the setup.

#### Step 1: Download and Extract

1. Download the BagistoApi package from [GitHub](https://github.com/bagisto/bagisto-api)
2. Extract it to: `packages/Webkul/BagistApi/`

#### Step 2: Register Service Provider

Edit `bootstrap/providers.php`:

```php
<?php

return [
    // ...existing providers...
    Webkul\BagistApi\Providers\BagistApiServiceProvider::class,
    // ...rest of providers...
];
```

#### Step 3: Update Autoloading

Edit `composer.json` and update the `autoload` section:

```json
{
  "autoload": {
    "psr-4": {
      "Webkul\\BagistApi\\": "packages/Webkul/BagistApi/src",
    }
  }
}
```

#### Step 4: Install Dependencies

```bash
# Install required packages
composer require api-platform/laravel:^4.1
composer require api-platform/graphql:^4.2
```

#### Step 5: Run the installation
php artisan bagisto-api:install

#### Step 6: Run database migrations
php artisan migrate

#### Step 7: Clear caches
php artisan optimize:clear
php artisan optimize

#### Step 8: Create your first API key
php artisan bagisto-api:generate-key --name="Default Store"
 

### Access Points

Once verified, access the APIs at:

- **REST API Documentation**: `https://your-domain.com/api`
- **REST API (Shop)**: `https://your-domain.com/api/shop/*`
- **REST API (Admin)**: `https://your-domain.com/api/admin/*`
- **GraphQL Endpoint**: `https://your-domain.com/graphql`
- **GraphQL Playground**: `https://your-domain.com/graphqli`

## Troubleshooting

### Provider Not Found

**Error**: `Class 'Webkul\BagistApi\Providers\BagistApiServiceProvider' not found`

**Solution**:
```bash
composer dump-autoload
php artisan cache:clear
php artisan config:clear
```

### 404 Errors on API Endpoints

**Error**: API endpoints return 404 Not Found

**Solutions**:
1. Ensure routes are published: `php artisan vendor:publish --tag=routes`
2. Clear route cache: `php artisan route:clear`
3. Check `.htaccess` file is present in your web root
4. Verify `APP_URL` in `.env` matches your domain

### Permission Denied Errors

**Error**: `Permission denied` on file operations

**Solution**:
```bash
# Set proper permissions
chmod -R 775 storage bootstrap/cache
chmod -R 755 public

# If using Docker/VM
chown -R www-data:www-data storage bootstrap
```

### Database Connection Errors

**Error**: `SQLSTATE[HY000]: General error: 1030 Got error`

**Solutions**:
1. Verify database credentials in `.env`
2. Run migrations: `php artisan migrate`
3. Check database encoding: `utf8mb4`
4. Ensure sufficient disk space

### Rate Limiting Issues

**Error**: `429 Too Many Requests`

**Solutions**:
1. Check rate limit configuration: `php artisan config:show bagisto-api`
2. Update rate limit in `.env`: `BAGISTO_API_RATE_LIMIT=200`
3. Clear rate limit cache: `php artisan cache:forget rate_limit`

### CORS Errors in Browser

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Verify CORS is configured in `config/cors.php`
2. Check `FRONTEND_URL` environment variable
3. Ensure `supports_credentials` is set properly
4. Clear browser cache

## Performance Optimization

Ensure the application is running in a production environment and that APP_DEBUG is set to false.

```bash
# Clear cached configuration and other optimized files
php artisan optimize:clear

# Rebuild and optimize caches
php artisan optimize
```

## What's Next?

Ready to start using the APIs?

- 🔐 [Authentication Guide](./authentication) - Learn about authentication methods
- 🔗 [REST API Guide](./rest-api/introduction.html) - Explore REST API endpoints
- ⚡ [GraphQL API Guide](./graphql-api/introduction.html) - Discover GraphQL capabilities
- 🔑 [API Key Management](./storefront-api-key-management-guide) - Generate and manage API keys