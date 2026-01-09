# Storefront API Key Management Guide

## Overview

Bagisto uses **API keys** to authenticate requests to your storefront and shop API endpoints. Think of your API key as a secure password that identifies your application to Bagisto.

> **⚡ Quick Fact:** Storefront API keys are used for public API access and read-only operations on product catalogs, categories, and storefront data.

**Header Format:**
```
X-STOREFRONT-KEY: sk_live_xxxxxxxxxxxxx
```

**Quick Example:**
```bash
curl -X GET "https://your-domain.com/api/shop/products" \
  -H "X-STOREFRONT-KEY: sk_live_xxxxxxxxxxxxx"
```

## Key Management Notes

- 🔓 **Public APIs Only** - Storefront keys are intended for public, read-only access
- 👤 **Customer Operations** - Use Bearer tokens (from authentication) for customer-specific operations
- 👨‍💼 **Admin Operations** - Use admin Bearer tokens for administrative operations
- 📊 **Rate Limited** - Each key has configurable rate limits to protect your API

---

## Quick Reference

| Task | Command |
|------|---------|
| Create new key | `php artisan bagisto-api:generate-key --name="My App"` |
| Check key status | `php artisan bagisto-api:key:manage status --key="My App"` |
| Rotate key | `php artisan bagisto-api:key:manage rotate --key="My App"` |
| Deactivate key | `php artisan bagisto-api:key:manage deactivate --key="Old Key"` |
| View all keys | `php artisan bagisto-api:key:manage summary` |
| Run maintenance | `php artisan bagisto-api:key:maintain --all` |

---

## Getting Started (5 Minutes)

### Step 1: Create Your First API Key

Run this command in your terminal:

```bash
php artisan bagisto-api:generate-key --name="My App"
```

**You'll see:**
```
✓ API key generated successfully!
Key: sk_live_xxxxxxxxxxxxx
Name: My App
Rate Limit: 100 requests/minute
Status: Active
```

> **🔐 Important:** Save this key immediately. You won't be able to view it again after closing this terminal.

### Step 2: Store the Key Safely

Add it to your `.env` file:
```bash
# .env file
BAGISTO_API_KEY=sk_live_xxxxxxxxxxxxx
```

Or store it in your secret manager (AWS Secrets Manager, HashiCorp Vault, etc.).

### Step 3: Start Making API Requests

**REST API Example:**
```bash
curl -X GET "https://your-domain.com/api/shop/products" \
  -H "X-STOREFRONT-API: sk_live_xxxxxxxxxxxxx"
```

**GraphQL API Example:**
```bash
curl -X POST "https://your-domain.com/graphql" \
  -H "X-STOREFRONT-API: sk_live_xxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { id name } }"}'
```

**JavaScript/Node.js Example:**
```javascript
const apiKey = process.env.BAGISTO_API_KEY;

const response = await fetch('https://your-domain.com/api/shop/products', {
  method: 'GET',
  headers: {
    'X-STOREFRONT-API': apiKey,
    'Content-Type': 'application/json'
  }
});

const products = await response.json();
```

---

## Complete Command Reference

### Generate API Key

Create new API keys for different environments and applications.

```bash
php artisan bagisto-api:generate-key {--name=} {--rate-limit=100} {--no-activation}
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `--name` | string | required | Descriptive name for your key (e.g., "Mobile App", "Third Party") |
| `--rate-limit` | integer | 100 | Requests allowed per minute |
| `--no-activation` | flag | false | Create key in inactive state (activate later) |

**Examples:**

```bash
# Basic key generation
php artisan bagisto-api:generate-key --name="Mobile App"

# High-traffic application with custom rate limit
php artisan bagisto-api:generate-key --name="Partner API" --rate-limit=500

# Create inactive key (for later activation)
php artisan bagisto-api:generate-key --name="Staging Environment" --no-activation

# Multiple environments
php artisan bagisto-api:generate-key --name="Production" --rate-limit=1000
php artisan bagisto-api:generate-key --name="Development" --rate-limit=200
```

**Response:**
```
✓ API key generated successfully!

Key:           sk_live_xxxxxxxxxxxxx
Name:          Mobile App
Rate Limit:    100 requests/minute
Status:        Active
Created:       2024-01-20 10:30:00
Last Used:     Never
```

**Tips:**
- 🏷️ **Name your keys clearly** — "Mobile App", "Website Frontend", "Partner Integration"
- 📊 **Match rate limits to your needs** — Start with 100, increase as you grow
- 🔄 **Rotate quarterly** — Change keys every 3 months for security
- 🔐 **Never commit to Git** — Use `.env` files with `.gitignore`

---

### Manage API Keys

Monitor, rotate, and control your API keys throughout their lifecycle.

```bash
php artisan bagisto-api:key:manage {action} {--key=} {--reason=} {--days=7} {--unused=90}
```

**Available Actions:**

| Action | Purpose | Example |
|--------|---------|---------|
| `rotate` | Generate new key (old key becomes inactive) | `rotate --key="Mobile App"` |
| `deactivate` | Disable a key immediately | `deactivate --key="Old Key" --reason="Compromised"` |
| `status` | Check key status and usage | `status --key="Mobile App"` |
| `expiring` | List keys expiring soon | `expiring --days=30` |
| `unused` | Find keys not used recently | `unused --days=90` |
| `cleanup` | Remove expired/inactive keys | `cleanup` |
| `summary` | View all keys summary | `summary` |

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `--key` | string | optional | Key ID or name to manage |
| `--reason` | string | optional | Reason for deactivation (logged for audit) |
| `--days` | integer | 7 | Days threshold for "expiring" action |
| `--unused` | integer | 90 | Days threshold for "unused" action |

**Examples:**

```bash
# Rotate a key (security best practice)
php artisan bagisto-api:key:manage rotate --key="Mobile App"

# Deactivate a compromised key
php artisan bagisto-api:key:manage deactivate --key="Old Integration" \
  --reason="Service discontinued - replaced by new key"

# Check key status and usage stats
php artisan bagisto-api:key:manage status --key="Mobile App"

# Find keys expiring within 30 days
php artisan bagisto-api:key:manage expiring --days=30

# Find unused keys (not accessed in 90 days)
php artisan bagisto-api:key:manage unused --days=90

# View summary of all keys
php artisan bagisto-api:key:manage summary

# Clean up old inactive keys
php artisan bagisto-api:key:manage cleanup
```

**Output Examples:**

```
# Status output
Key:              Mobile App
ID:               1
Status:           Active
Created:          2024-01-20 10:30:00
Last Used:        2024-01-25 15:45:30
Total Requests:   15,234
Average RPM:      125
Rate Limit:       100/minute

# Summary output
Total Keys:       8
Active:           5
Inactive:         2
Expired:          1
Last 30 Days:     3 rotations
```

**Security Maintenance Schedule:**

| Frequency | Action | Command |
|-----------|--------|---------|
| **Monthly** | Review unused keys | `php artisan bagisto-api:key:manage unused --days=90` |
| **Monthly** | Check expiring keys | `php artisan bagisto-api:key:manage expiring --days=30` |
| **Quarterly** | Rotate production keys | `php artisan bagisto-api:key:manage rotate --key="Production"` |
| **Immediately** | Deactivate compromised | `php artisan bagisto-api:key:manage deactivate --key="Old Key" --reason="Compromised"` |

---

### Automate Maintenance

Set up automatic cleanup, notifications, and key management.

```bash
php artisan bagisto-api:key:maintain {--cleanup} {--invalidate} {--notify} {--all}
```

**What Each Option Does:**

| Option | What It Does | When to Use |
|--------|-------------|-------------|
| `--cleanup` | Deletes expired and old keys | Scheduled daily maintenance |
| `--invalidate` | Disables deprecated keys | Policy enforcement |
| `--notify` | Sends expiration warnings | Proactive team notifications |
| `--all` | Runs all tasks above | Comprehensive maintenance ✅ |

**Examples:**

```bash
# Clean up expired keys
php artisan bagisto-api:key:maintain --cleanup

# Send expiration notifications
php artisan bagisto-api:key:maintain --notify

# Run complete maintenance (recommended)
php artisan bagisto-api:key:maintain --all

# Schedule in Laravel Task Scheduler (in app/Console/Kernel.php)
$schedule->command('bagisto-api:key:maintain --all')
  ->daily()
  ->at('02:00');
```

**Output:**
```
✓ Maintenance completed successfully

Cleanup:
  - Removed 2 expired keys
  - Freed up space: 4.2 KB

Invalidation:
  - Deactivated 1 deprecated key
  - Audit logged

Notifications:
  - Sent 3 expiration reminders
  - 3 emails queued
```

**Recommended Scheduler Setup:**

Add this to your `app/Console/Kernel.php` to automate key management:

```php
protected function schedule(Schedule $schedule)
{
    // Daily maintenance: cleanup, invalidate, notify
    $schedule->command('bagisto-api:key:maintain --all')
        ->daily()
        ->at('02:00')           // 2 AM UTC
        ->onOneServer();

    // Weekly check for expiring keys
    $schedule->command('bagisto-api:key:manage expiring --days=30')
        ->weeklyOn(1, '09:00'); // Every Monday at 9 AM

    // Monthly review of unused keys
    $schedule->command('bagisto-api:key:manage unused --days=90')
        ->monthlyOn(1, '10:00'); // 1st of month at 10 AM
}
```

> **Note:** Make sure your Laravel scheduler is running with `php artisan schedule:work` (development) or set up a cron job (production).

---

## Security Best Practices

### ✅ Do This

- **Store in `.env`** — Keep keys out of your codebase
  ```bash
  BAGISTO_API_KEY=sk_live_xxxxxxxxxxxxx
  ```

- **Use environment-specific keys** — Different keys for dev/staging/production
  ```bash
  BAGISTO_API_KEY_DEV=sk_test_xxxxxxx
  BAGISTO_API_KEY_PROD=sk_live_yyyyyyy
  ```

- **Access via config** — Use Laravel's config system
  ```php
  $apiKey = config('services.bagisto.api_key');
  ```

- **Rotate quarterly** — Change keys every 3 months
  ```bash
  php artisan bagisto-api:key:manage rotate --key="Production"
  ```

- **Use secret managers** — AWS Secrets Manager, HashiCorp Vault, etc.

- **Monitor usage** — Check for unusual activity
  ```bash
  php artisan bagisto-api:key:manage status --key="Production"
  ```

### ❌ Don't Do This

- ⛔ **Hardcode keys in source files**
- ⛔ **Log API keys in error messages**
- ⛔ **Share keys via email or chat**
- ⛔ **Commit `.env` to Git**
- ⛔ **Use the same key for multiple environments**
- ⛔ **Ignore expired or unused keys**

---

## Troubleshooting

### "Invalid API Key" Error

**Problem:** Your API request is being rejected.

**Solution:**
```bash
# 1. Check if key exists and is active
php artisan bagisto-api:key:manage status --key="Your Key Name"

# 2. Verify the key hasn't expired
# Look for Status: Active in the output

# 3. Make sure you're using the correct header
# Should be: X-STOREFRONT-API: sk_live_xxxxxxxxxxxxx
```

### "Rate Limit Exceeded" Error

**Problem:** You're hitting too many requests per minute.

**Quick Fix:**
```bash
# Rotate the key with a higher rate limit
php artisan bagisto-api:key:manage rotate --key="Your Key" \
  --rate-limit=500
```

**Better Solution:**
- Implement request queuing in your application
- Add delays between burst requests
- Contact Bagisto support for enterprise limits

### Lost or Exposed Key

**Problem:** You've lost your key or think it's been compromised.

**Immediate Action:**
```bash
# Deactivate the compromised key immediately
php artisan bagisto-api:key:manage deactivate --key="My App" \
  --reason="Suspected compromise - exposed in logs"
```

**Next Steps:**
```bash
# Create a new key to replace it
php artisan bagisto-api:generate-key --name="My App (New)"

# Save the new key safely
# Update your .env or secret manager
# Test that new key works
# Monitor old key for unauthorized use
```

### Key Not Appearing in Summary

**Problem:** You created a key but it doesn't show up.

**Solution:**
```bash
# Check if it was created in inactive state
php artisan bagisto-api:key:manage unused --days=1

# Verify with the full summary
php artisan bagisto-api:key:manage summary

# If using --no-activation flag, key needs to be activated
php artisan bagisto-api:key:manage status --key="Your Key"
```

### Requests Working Locally But Not in Production

**Problem:** API works in development but fails in production.

**Check These:**

1. **Different keys?** — Make sure you're using the production key
   ```bash
   echo $BAGISTO_API_KEY  # Check what's loaded
   ```

2. **Environment variables?** — Verify `.env` is loaded
   ```php
   dd(config('services.bagisto.api_key')); // Should not be null
   ```

3. **Network issues?** — Check firewall/security groups
   ```bash
   curl -I https://your-domain.com/api/shop/products
   ```

4. **Expired key?** — Check expiration date
   ```bash
   php artisan bagisto-api:key:manage status --key="Production"
   ```

## Understanding Rate Limits

Each API key has a configured rate limit. For detailed information about rate limiting, see the [Rate Limiting Guide](./rate-limiting).

**Quick Summary:**
- Default limit: 100 requests per minute
- Custom limits: Set when creating or updating keys
- Monitor with response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Rate limit exceeded: 429 status with `retry_after` field

```bash
# Check rate limit for your key
curl -X GET 'https://your-domain.com/api/shop/products' \
  -H 'X-STOREFRONT-KEY: pk_storefront_xxxxx' \
  -i  # Shows response headers including rate limit info
```

## What's Next?

- 📊 [Rate Limiting Guide](./rate-limiting) - Understand and handle rate limits
- 🔐 [Authentication Guide](./authentication) - Learn about API authentication
- 🔗 [REST API Guide](./rest-api/introduction.html) - Explore REST API endpoints
- ⚡ [GraphQL API Guide](./graphql-api/introduction.html) - Discover GraphQL capabilities
- 🚀 [Integration Guides](./integrations) - Real-world integration examples