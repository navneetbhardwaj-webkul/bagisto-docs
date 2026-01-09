# Setup & Configuration

Get the Bagisto API up and running in just a few minutes. Choose the installation method that works best for your setup.

## Prerequisites

Before installing, ensure you have:

- **Bagisto v2.0 or higher** installed
- **PHP 8.2+** with extensions: `curl`, `json`, `openssl`, `pdo`, `mbstring`
- **Composer 2.0+**
- **Laravel 11.x**
- **MySQL 8.0+** or **PostgreSQL 12+**
- **Node.js 16+** (optional, for frontend development)

## Quick Start (Recommended)

The fastest way to get started:

```bash
# 1. Install the Bagisto API package
composer require bagisto/bagisto-api

# 2. Run the installation
php artisan bagisto-api:install

# 3. Clear caches
php artisan cache:clear
php artisan config:clear

# 4. Verify installation
php artisan bagisto-api:status
```

Your APIs are now ready! Access them at:
- **REST API Docs**: `https://your-domain.com/api/docs`
- **GraphQL Playground**: `https://your-domain.com/graphql`

## Installation Methods

### Method 1: Composer Installation (Recommended)

```bash
# 1. Install package
composer require bagisto/bagisto-api

# 2. Run the installer
php artisan bagisto-api:install

# 3. Run database migrations
php artisan migrate

# 4. Publish configuration files
php artisan vendor:publish --provider="Webkul\BagistApi\Providers\BagistApiServiceProvider"

# 5. Clear application caches
php artisan cache:clear
php artisan config:clear

# 6. Create your first API key
php artisan bagisto-api:generate-key --name="Default Store"
```

### Method 2: Manual Installation

If you prefer manual setup or need more control:

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
      "Webkul\\": "packages/Webkul/*/src"
    }
  }
}
```

#### Step 4: Install Dependencies

```bash
# Install required packages
composer require api-platform/laravel:^4.1
composer require api-platform/graphql:^4.2
composer require webonyx/graphql-php:^15.0
composer require laravel/sanctum:^4.0

# Refresh autoloader
composer dump-autoload
```

#### Step 5: Publish Configuration

```bash
# Publish config files
php artisan vendor:publish --provider="Webkul\BagistApi\Providers\BagistApiServiceProvider" --tag="config"

# Publish migrations
php artisan vendor:publish --provider="Webkul\BagistApi\Providers\BagistApiServiceProvider" --tag="migrations"
```

#### Step 6: Complete Setup

```bash
# Run migrations
php artisan migrate

# Generate application key (if needed)
php artisan key:generate

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:cache
php artisan view:cache
```

## Configuration

After installation, configure your API settings:

### 1. Environment Variables

Update your `.env` file:

```bash
# API Configuration
BAGISTO_API_ENABLED=true
BAGISTO_API_VERSION=v1
BAGISTO_API_RATE_LIMIT=100

# GraphQL Configuration
GRAPHQL_ENABLED=true
GRAPHQL_PLAYGROUND=true

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=your-domain.com
SESSION_DOMAIN=your-domain.com

# API Keys
API_TOKEN_EXPIRATION=86400
```

### 2. Configuration Files

Configure API settings in `config/bagisto-api.php`:

```php
return [
    'enabled' => env('BAGISTO_API_ENABLED', true),
    
    'version' => env('BAGISTO_API_VERSION', 'v1'),
    
    'rate_limit' => [
        'requests_per_minute' => env('BAGISTO_API_RATE_LIMIT', 100),
    ],
    
    'graphql' => [
        'enabled' => env('GRAPHQL_ENABLED', true),
        'playground' => env('GRAPHQL_PLAYGROUND', true),
    ],
    
    'sanctum' => [
        'expiration' => env('API_TOKEN_EXPIRATION', 86400),
    ],
];
```

### 3. CORS Configuration

If your frontend is on a different domain, configure CORS in `config/cors.php`:

```php
return [
    'paths' => ['api/*', 'graphql'],
    
    'allowed_methods' => ['*'],
    
    'allowed_origins' => [
        env('APP_URL'),
        env('FRONTEND_URL'),
    ],
    
    'allowed_origins_patterns' => [],
    
    'allowed_headers' => ['*'],
    
    'exposed_headers' => [],
    
    'max_age' => 0,
    
    'supports_credentials' => true,
];
```

## Verify Installation

Check that everything is working properly:

```bash
# Check installation status
php artisan bagisto-api:status

# List all API routes
php artisan route:list | grep api

# Test database connection
php artisan tinker
>>> DB::connection()->getPdo()
>>> exit

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### Access Points

Once verified, access the APIs at:

- **REST API Documentation**: `https://your-domain.com/api/docs`
- **REST API (Shop)**: `https://your-domain.com/api/shop/*`
- **REST API (Admin)**: `https://your-domain.com/api/admin/*`
- **GraphQL Endpoint**: `https://your-domain.com/graphql`
- **GraphQL Playground**: `https://your-domain.com/graphql/playground` (if enabled)

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

For production environments:

```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Queue setup (for async operations)
php artisan queue:work --daemon
```

## What's Next?

Ready to start using the APIs?

- 🔐 [Authentication Guide](./authentication) - Learn about authentication methods
- 🔗 [REST API Guide](./rest-api/introduction.html) - Explore REST API endpoints
- ⚡ [GraphQL API Guide](./graphql-api/introduction.html) - Discover GraphQL capabilities
- 🔑 [API Key Management](./storefront-api-key-management-guide) - Generate and manage API keys