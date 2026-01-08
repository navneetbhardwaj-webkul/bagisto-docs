# Storefront Key Management

Complete guide to managing API keys for the Bagisto Shop API, including generation, rotation, deactivation, and monitoring.

## Overview

Storefront Keys are used to authenticate requests to the Shop API via the `X-STOREFRONT-KEY` header. This guide covers the three main commands for key management:

1. **Generate** - Create new keys
2. **Manage** - Rotate, deactivate, monitor keys
3. **Maintain** - Automated cleanup and notifications

## Command 1: Generate Storefront Key

### Purpose

Create a new API key for shop/storefront API authentication.

### Usage

```bash
php artisan bagisto-api:generate-key --name="Web Storefront"
```

### Options

```bash
--name=VALUE              # Name for the storefront key (required or prompted)
--rate-limit=100         # Rate limit in requests per minute (default: 100)
--no-activation          # Create key in inactive state (not immediately usable)
```

### Examples

#### Basic Usage - Interactive

```bash
php artisan bagisto-api:generate-key
# Prompts: Enter the name for this storefront key
```

#### With Custom Rate Limit

```bash
php artisan bagisto-api:generate-key --name="Mobile App" --rate-limit=200
```

Output:
```
Storefront key generated successfully!

Key Details:
  ID : 5
  Name : Mobile App
  Key : pk_storefront_xxxxxxxxxxxxx
  Rate Limit : 200 requests/minute
  Status : Active

Keep this key secure! It will be used in X-STOREFRONT-KEY header.
Do not share this key publicly or commit it to version control.
```

#### Inactive Key (Activate Later)

```bash
php artisan bagisto-api:generate-key --name="Testing Key" --no-activation
```

This creates a key that won't work until you manually activate it in the database:

```sql
UPDATE storefront_keys SET is_active = 1 WHERE id = 6;
```

### What Gets Created

When you generate a key, the system:
- ✅ Generates a unique key (`pk_storefront_xxxxxxxxxxxxx`)
- ✅ Sets expiration date (12 months from now)
- ✅ Creates database record with rate limit
- ✅ Sets status to active (unless `--no-activation` used)
- ✅ Records creation timestamp

### Key Format

Generated keys follow this pattern:
```
pk_storefront_XXXXXXXXXXXXX

pk_ = prefix (identifies as production key)
storefront_ = identifies as storefront/shop API key
XXXXXXXXXXXXX = random 32-character string
```

### Security Notes

- ⚠️ Keys are displayed **only once** after generation
- ⚠️ Store the key securely (password manager, environment variables)
- ⚠️ Never commit keys to version control
- ⚠️ Never share keys in logs or error messages
- ⚠️ Rotate keys periodically (see rotation below)

---

## Command 2: Manage API Keys

### Purpose

Manage the complete lifecycle of API keys: rotate, deactivate, check status, and monitor compliance.

### Usage

```bash
php artisan bagisto-api:key:manage {action} --key=ID [options]
```

### Available Actions

```bash
rotate       # Rotate a key to a new one
deactivate   # Disable a key (emergency)
cleanup      # Soft-delete expired keys
status       # Check status of a key
expiring     # List keys expiring soon
unused       # List unused keys
summary      # Compliance summary
```

### Action: Rotate Key

**Purpose**: Create a new key and deprecate the old one (with transition period)

```bash
php artisan bagisto-api:key:manage rotate --key=1
```

**What happens:**
1. Old key enters deprecation period (7 days)
2. New key is created and immediately active
3. Both keys work for 7 days (transition period)
4. After 7 days, old key is auto-deactivated

**Output:**
```
✅ Key rotated successfully!
Old Key: Web Storefront
Old Key ID: 1
Deprecation Date: 2026-01-15 16:56:16

New Key: Web Storefront (rotated 2026-01-08)
New Key ID: 4
New Key Value: pk_storefront_PRt2nDbgggSh4klGUqqL42dvjCNqars9
Expires At: 2027-01-08 16:56:16
```

**Use cases:**
- Periodic key rotation (recommended quarterly)
- Security breach (old key compromised)
- Updating applications gradually

### Action: Deactivate Key

**Purpose**: Immediately disable a key (emergency only)

```bash
php artisan bagisto-api:key:manage deactivate --key=2 --reason="Compromised"
```

**Prompt:**
```
Are you sure you want to deactivate key: Test Storefront Key? (yes/no) [no]:
```

**Options:**
```bash
--key=ID              # Key ID to deactivate (required)
--reason=TEXT         # Reason for deactivation (logged for audit)
```

**Output:**
```
✅ Key deactivated successfully!
```

**After deactivation:**
- Key is immediately invalid
- All requests using this key return 403 Forbidden
- Perfect for emergency situations
- Can be reactivated later if needed

### Action: Check Key Status

**Purpose**: View detailed status of a specific key

```bash
php artisan bagisto-api:key:manage status --key=1
```

**Output:**
```
Key Status: Web Storefront

Active: ✅ Yes
Usable: ✅ Yes
Expired: ✅ No
Deprecated: ✅ No

Expires At: 2027-01-08 16:55:45
Days Until Expiry: 364 days
Last Used: 2026-01-08 14:23:12

Keys Rotated From This: 2
```

**Status meanings:**
- **Active**: Can be used for API requests
- **Usable**: Not in deprecation period (can use it)
- **Expired**: Past expiration date (invalid)
- **Deprecated**: In transition period (still works but will expire soon)

### Action: List Expiring Keys

**Purpose**: Find keys expiring soon

```bash
# Keys expiring in next 7 days
php artisan bagisto-api:key:manage expiring --days=7

# Keys expiring in next 30 days
php artisan bagisto-api:key:manage expiring --days=30
```

**Options:**
```bash
--days=N    # Number of days to look ahead (default: 7)
```

**Output:**
```
Keys expiring in the next 7 days:

• Web Storefront (ID: 1)
  Expires: 2026-01-15 (7 days left)
  
• Mobile App (ID: 5)
  Expires: 2026-01-12 (4 days left)
```

**Use cases:**
- Plan for key rotation
- Schedule maintenance windows
- Automated alerts (can trigger notifications)

### Action: List Unused Keys

**Purpose**: Find keys that haven't been used recently

```bash
# Keys unused for 90 days
php artisan bagisto-api:key:manage unused --unused=90

# Keys unused for 30 days
php artisan bagisto-api:key:manage unused --unused=30
```

**Options:**
```bash
--unused=N    # Number of days of inactivity (default: 90)
```

**Output:**
```
Unused keys (> 90 days):

• Testing Key (ID: 3)
  Last Used: 2025-10-10
  
• Old Mobile Key (ID: 4)
  Last Used: Never
```

**Use cases:**
- Find abandoned keys to deactivate
- Clean up test keys
- Improve security by removing unused access

### Action: Compliance Summary

**Purpose**: Overview of key rotation policy compliance

```bash
php artisan bagisto-api:key:manage summary
```

**Output:**
```
API Key Rotation Policy Compliance Summary

Total Keys: 5
Valid Keys: 4
Expired Keys: 0
Deprecated Keys: 1
Keys Expiring Soon (7 days): 2
Unused Keys (90 days): 1
Recently Rotated (30 days): 3
```

**Use cases:**
- Audit and compliance reporting
- Dashboard metrics
- Executive summaries

### Action: Cleanup Expired Keys

**Purpose**: Soft-delete keys past their expiration date

```bash
php artisan bagisto-api:key:manage cleanup
```

**Confirmation:**
```
This will soft-delete all expired keys. Continue? (yes/no) [no]:
```

**Output:**
```
✅ Cleaned up 2 expired keys
```

**What happens:**
- Expired keys are soft-deleted (recoverable)
- API requests using expired keys return 401
- Maintains audit trail for compliance

---

## Command 3: Automatic Maintenance

### Purpose

Scheduled command that runs automatically to maintain API key health:
- Clean up expired keys
- Auto-deactivate deprecated keys
- Send expiration notifications

### Usage

**Run manually:**
```bash
php artisan bagisto-api:key:maintain
```

**Schedule for automatic execution:**

Edit `app/Console/Kernel.php`:

```php
protected function schedule(Schedule $schedule)
{
    // Run key maintenance daily at 2 AM
    $schedule->command('bagisto-api:key:maintain')->dailyAt('02:00');
}
```

### Options

```bash
--cleanup      # Only clean up expired keys
--invalidate   # Only invalidate deprecated keys
--notify       # Only send notifications
--all          # Perform all tasks (default if no option)
```

### Examples

#### Run All Tasks

```bash
php artisan bagisto-api:key:maintain
```

Or explicitly:

```bash
php artisan bagisto-api:key:maintain --all
```

**Output:**
```
🔄 Starting API Key Maintenance...

🧹 Cleaning up expired keys...
   ✅ Cleaned up 2 expired keys

⚠️ Invalidating deprecated keys...
   ✅ Invalidated 1 deprecated key

📧 Sending expiration notifications...
   ✅ Sent 3 expiration notifications

✅ API Key Maintenance Complete
```

#### Cleanup Only

```bash
php artisan bagisto-api:key:maintain --cleanup
```

#### Notifications Only

```bash
php artisan bagisto-api:key:maintain --notify
```

### What It Does

#### 1. Cleanup Expired Keys

- Finds all keys with `expires_at < now()`
- Soft-deletes them (sets `deleted_at` timestamp)
- Prevents their use in API requests
- Maintains audit trail

```
Before cleanup:
- Key 1: expires_at = 2025-12-01, deleted_at = NULL ❌

After cleanup:
- Key 1: expires_at = 2025-12-01, deleted_at = 2026-01-08 ✓
```

#### 2. Invalidate Deprecated Keys

- Finds keys in deprecation period (past `deprecation_date`)
- Auto-deactivates them (`is_active = 0`)
- Logs the action
- Notifies on next run

```
Before invalidation:
- Key 1: deprecation_date = 2026-01-15, is_active = 1 (still usable)

After deprecation period:
- Key 1: deprecation_date = 2026-01-15, is_active = 0 (invalid)
```

#### 3. Send Notifications

Sends alerts for keys expiring:
- In **7 days** (urgent)
- In **30 days** (warning)

**Notification schedule:**
```
Day 1: Key rotated
  └─ 7-day deprecation period starts
  
Day 23: First warning email
  └─ "Key expires in 30 days - plan rotation"
  
Day 30: Second warning email
  └─ "Key expires in 7 days - rotate now!"
  
Day 37: Key auto-deactivated
  └─ Must use new key
```

---

## Complete Key Lifecycle Example

### Timeline

```
Day 1: Generate Key
  Command: php artisan bagisto-api:generate-key --name="Web App"
  Result:
    - Key: pk_storefront_xxxxx
    - Status: ACTIVE
    - Expires: +12 months

Day 355: Automatic Notification
  Maintenance runs daily at 2 AM
  Result: "Key expires in 10 days" email sent

Day 365: Rotate Key
  Command: php artisan bagisto-api:key:manage rotate --key=1
  Result:
    - Old Key: DEPRECATED (7-day transition)
    - New Key: ACTIVE (expires +12 months)
    - Both keys work for next 7 days

Day 365-372: Transition Period
  Old Key: Still usable (backward compatibility)
  New Key: Should use this going forward
  Action: Update all clients to use new key

Day 372: Auto-Deactivation
  Maintenance runs
  Result: Old key is auto-deactivated
  - Old Key: INVALID
  - New Key: VALID

Day 730: New Key Expires
  Notification: "Key expires in 30 days"
  Action: Rotate to another new key
  Repeat cycle...
```

---

## Best Practices

### Key Generation

```bash
# ✅ DO: Create with descriptive name
php artisan bagisto-api:generate-key --name="Production Web Storefront"

# ❌ DON'T: Generic names
php artisan bagisto-api:generate-key --name="Key 1"
```

### Rotation Schedule

```bash
# ✅ DO: Rotate quarterly
Day 1:   Generate key
Day 90:  Rotate to new key
Day 180: Rotate to new key
Day 270: Rotate to new key
Day 365: Rotate to new key

# ❌ DON'T: Never rotate
# Security risk, no access control
```

### Rate Limiting

```bash
# ✅ DO: Set appropriate limits
php artisan bagisto-api:generate-key --name="Mobile" --rate-limit=150
php artisan bagisto-api:generate-key --name="Web" --rate-limit=100

# ❌ DON'T: Unlimited rate limits
# Allows DDoS attacks
```

### Monitoring

```bash
# ✅ DO: Regular checks
php artisan bagisto-api:key:manage summary        # Weekly
php artisan bagisto-api:key:manage expiring --days=30  # Monthly
php artisan bagisto-api:key:manage unused --unused=90  # Monthly

# Schedule automatic maintenance
# in app/Console/Kernel.php
$schedule->command('bagisto-api:key:maintain')->dailyAt('02:00');
```

### Emergency Situations

```bash
# ✅ DO: Immediate deactivation if compromised
php artisan bagisto-api:key:manage deactivate --key=ID --reason="Compromised"

# Then: Rotate to new key
php artisan bagisto-api:key:manage rotate --key=NEW_KEY_ID

# ❌ DON'T: Wait for expiration
# Security breach needs immediate action
```

---

## Database Queries

### View All Active Keys

```sql
SELECT id, name, key, rate_limit, is_active, expires_at, last_used_at 
FROM storefront_keys 
WHERE is_active = 1 AND deleted_at IS NULL;
```

### Find Keys Expiring Soon

```sql
SELECT * FROM storefront_keys 
WHERE expires_at BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)
AND deleted_at IS NULL;
```

### Find Unused Keys

```sql
SELECT * FROM storefront_keys 
WHERE last_used_at IS NULL 
OR last_used_at < DATE_SUB(NOW(), INTERVAL 90 DAY)
AND deleted_at IS NULL;
```

### View Rotation History

```sql
SELECT id, name, key, created_at, rotated_from_id, deprecation_date
FROM storefront_keys 
WHERE rotated_from_id IS NOT NULL
ORDER BY created_at DESC;
```

---

## Troubleshooting

### Key Won't Activate

**Problem**: Created with `--no-activation` but forgot to activate

**Solution**:
```sql
UPDATE storefront_keys SET is_active = 1 WHERE id = YOUR_KEY_ID;
```

### Key Expired Unexpectedly

**Problem**: Key shows as expired but should still be valid

**Check**:
```bash
php artisan bagisto-api:key:manage status --key=ID
```

**Verify expiration date**:
```sql
SELECT id, name, expires_at, is_active, deleted_at 
FROM storefront_keys WHERE id = YOUR_KEY_ID;
```

### Rotation Failed

**Problem**: Can't rotate a key

**Check if key is valid**:
```bash
php artisan bagisto-api:key:manage status --key=ID
```

**Requires**:
- Key must be active
- Key must not already be expired
- Must have valid rate limit set

### Lost Key Value

**Problem**: Didn't save the key when it was generated

**Solution**: Generate a new key
```bash
php artisan bagisto-api:generate-key --name="Replacement"
```

**Cannot recover lost keys** - Generate new ones only.

---

## Related Documentation

- [Authentication](./authentication.md) - How to use keys in API requests
- [Shop Resources](./shop-resources.md) - Shop API endpoints
- [Best Practices](./best-practices.md) - API usage guidelines
