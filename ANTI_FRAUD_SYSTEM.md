# Privacy-Safe Anti-Fraud System

A comprehensive, privacy-first fraud detection system built for Thrivv's Next.js 14 + Supabase app.

## 🔒 Privacy Principles

1. **No Raw IP Storage** - Only /24 prefixes stored (e.g., `192.168.1.0/24`)
2. **No Fingerprinting** - Uses first-party httpOnly cookies (device_id), not invasive browser fingerprinting
3. **No Keystroke Content** - Only timing features (dwell, flight), never what you type
4. **Server-Side Only** - All sensitive logic runs server-side with service role access

---

## 📊 Architecture

### Database Tables (Migration 012)

#### `device_registry`
Tracks devices per user via first-party cookies.
- `device_id` (PK): UUID from httpOnly cookie
- `user_id`: Associated user
- `first_seen_at`, `last_seen_at`: Timestamps
- `ua_family`, `os_family`, `browser_family`: Coarse user-agent parsing

#### `risk_events`
Logs security events without sensitive data.
- `user_id`, `device_id`, `event_type`
- `ip_prefix`: Only /24 network (never raw IP)
- `risk_score` (0-100), `action` (allow/step_up/hold/block)
- `reasons`: Array of risk signals (JSON)
- `typing_features`: Timing only, no content (JSON)

#### `risk_user_features`
Precomputed features for fast scoring.
- `account_age_days`
- `device_degree`: # of devices in last 7 days
- `ip_degree`: # of IP prefixes in last 7 days
- `avg_typing_dwell`, `std_typing_dwell`: Typing baseline
- `typing_baseline_count`: Sample size

---

## 🛠️ Implementation

### 1. Device ID (`lib/device.ts`)
First-party httpOnly cookie management:
- `getOrCreateDeviceId()`: Get or create device UUID
- `getIpPrefix()`: Extract /24 IP prefix (privacy-safe)
- `parseUserAgent()`: Coarse UA parsing (browser/OS family only)

### 2. Risk Scoring API (`/api/risk/score`)
**POST** endpoint that:
1. Authenticates user (Supabase session)
2. Gets/creates device_id cookie
3. Extracts coarse signals (IP prefix, UA)
4. Computes risk score (0-100) using:
   - Account age
   - Device sharing (how many users on this device)
   - Velocity (events in last 10 min / 24h)
   - Ring features (device degree, IP degree)
   - Typing anomaly (z-score vs baseline)
5. Returns action: `allow` | `step_up` | `hold` | `block`

**Risk Thresholds:**
- `0-39`: `allow` (proceed normally)
- `40-59`: `step_up` (require re-auth/email verify)
- `60-79`: `hold` (manual review)
- `80-100`: `block` (deny action)

### 3. Typing Features Hook (`hooks/useTypingFeatures.ts`)
Frontend hook to collect **timing-only** features:
- `mean_dwell`: Avg key down → key up time
- `std_dwell`: Standard deviation of dwell
- `mean_flight`: Avg key up → next key down time
- `std_flight`: Standard deviation of flight
- `backspace_ratio`: % of backspaces
- `paste_count`: # of paste events

**Important:** No keystroke content is captured or sent.

### 4. Feature Recomputation Cron (`/api/risk/recompute-features`)
**POST** endpoint (protected by `CRON_SECRET`) that:
- Recomputes `device_degree` and `ip_degree` from last 7 days
- Updates typing baselines from last 50 samples
- Calculates `account_age_days`
- Upserts into `risk_user_features`

**Setup Vercel Cron:**
```json
{
  "crons": [{
    "path": "/api/risk/recompute-features",
    "schedule": "0 2 * * *"
  }]
}
```

### 5. Integration (Rewards Redemption)
`app/member/rewards/page.tsx` now:
- Calls `/api/risk/score` before redemption
- Handles actions:
  - `allow`: Proceeds immediately
  - `step_up`: Shows verification modal
  - `hold`: Notifies user of manual review
  - `block`: Denies with reference ID
- Collects optional typing features for enhanced accuracy

---

## 🚀 Setup Instructions

### 1. Run Database Migration
```bash
# Via Supabase CLI
supabase db push

# Or via SQL Editor (Supabase Dashboard)
# Copy/paste: supabase/migrations/012_risk_fraud_detection.sql
```

### 2. Set Environment Variables
```env
# Vercel Dashboard → Settings → Environment Variables
CRON_SECRET=<random-string-at-least-32-chars>
```

### 3. Configure Vercel Cron (Optional)
Create `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/risk/recompute-features",
    "schedule": "0 2 * * *"
  }]
}
```

### 4. Test Endpoints

**Test Risk Scoring:**
```bash
curl -X POST https://thrivv.dev/api/risk/score \
  -H "Content-Type: application/json" \
  -H "x-user-id: your-user-id" \
  -d '{
    "eventType": "reward_redeem",
    "typingFeatures": {
      "mean_dwell": 150,
      "std_dwell": 50,
      "mean_flight": 200,
      "std_flight": 75,
      "backspace_ratio": 0.1,
      "paste_count": 0,
      "sample_size": 20
    }
  }'
```

**Test Feature Recomputation:**
```bash
curl -X POST https://thrivv.dev/api/risk/recompute-features \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 📈 Risk Signals

### Signal 1: Account Age
- < 1 day: +30 points (new_account)
- < 7 days: +15 points (young_account)

### Signal 2: Device Sharing
- > 3 users: +25 points (device_shared)
- > 1 user: +10 points (device_multi_user)

### Signal 3: Velocity (10 min)
- > 5 events: +40 points (high_velocity)
- > 2 events: +20 points (elevated_velocity)

### Signal 4: Velocity (24h)
- > 20 events: +30 points (daily_limit_exceeded)
- > 10 events: +15 points (high_daily_activity)

### Signal 5: Ring Features
- > 5 devices (7d): +20 points (many_devices)
- > 10 IPs (7d): +15 points (many_ips)

### Signal 6: Typing Anomaly
- z-score > 3: +25 points (typing_anomaly)
- z-score > 2: +10 points (typing_variation)

---

## 🔍 Monitoring

### View Recent Events
```sql
SELECT 
  user_id,
  event_type,
  risk_score,
  action,
  reasons,
  created_at
FROM risk_events
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Check High-Risk Users
```sql
SELECT 
  user_id,
  COUNT(*) as event_count,
  AVG(risk_score) as avg_risk,
  MAX(risk_score) as max_risk
FROM risk_events
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY user_id
HAVING AVG(risk_score) > 50
ORDER BY avg_risk DESC;
```

### Device Sharing Report
```sql
SELECT 
  device_id,
  COUNT(DISTINCT user_id) as user_count,
  ARRAY_AGG(DISTINCT user_id) as users
FROM device_registry
WHERE last_seen_at > NOW() - INTERVAL '7 days'
GROUP BY device_id
HAVING COUNT(DISTINCT user_id) > 1
ORDER BY user_count DESC;
```

---

## 🎯 Best Practices

### When to Use Risk Scoring
✅ **Always check for:**
- Reward redemptions
- Payment processing
- High-value transactions
- Account changes (email, password)
- Bulk actions

❌ **Don't check for:**
- Page views
- Search queries
- Low-risk reads (viewing content)

### Typing Features
✅ **Collect on:**
- Email inputs
- Search boxes
- Form fields (non-sensitive)

❌ **Never collect on:**
- Password fields
- Credit card inputs
- SSN or sensitive data

### Thresholds (Tune Based on Data)
Start conservative, adjust based on false positives:
- `allow < 40`: Most legitimate users
- `step_up 40-59`: Minor friction for suspicious behavior
- `hold 60-79`: Manual review queue
- `block 80+`: High-confidence fraud

---

## 🚨 Incident Response

### User Reports False Positive
1. Query `risk_events` for that user/device
2. Check `reasons` array to see what triggered it
3. Adjust thresholds or whitelist if legitimate
4. Reset typing baseline if needed

### Detected Fraud Bypassing System
1. Review `risk_events` for the user
2. Check which signals were weak
3. Add new signals or increase weights
4. Run `/api/risk/recompute-features` to update baselines

---

## 🔐 Security Considerations

1. **Never log PII** - No emails, names, or raw IPs in risk_events
2. **Service role only** - RLS policies deny client access to fraud tables
3. **Rate limit** - Add rate limiting to `/api/risk/score` (10 req/min per user)
4. **Audit logs** - All risk decisions are logged with timestamp and reasons
5. **GDPR compliance** - User can request deletion of their risk_events/device_registry

---

## 📊 Future Enhancements

### Phase 2 (Optional)
- [ ] IP reputation check (3rd-party API)
- [ ] Device fingerprinting (with user consent)
- [ ] ML model training on risk_events data
- [ ] Graph analysis (user → device → IP networks)
- [ ] Behavioral biometrics (mouse movement patterns)

### Phase 3 (Advanced)
- [ ] Real-time alerts (Slack/email on high-risk events)
- [ ] Admin dashboard for manual review queue
- [ ] A/B testing different thresholds
- [ ] User trust score (long-term reputation)

---

## 📚 Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [GDPR Compliance for Fraud Detection](https://gdpr.eu/fraud-detection/)
- [Typing Biometrics Research](https://en.wikipedia.org/wiki/Keystroke_dynamics)

---

**Built with privacy in mind. Questions? Check the source code or open an issue.**
