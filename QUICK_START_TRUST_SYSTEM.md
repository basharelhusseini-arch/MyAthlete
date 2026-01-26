# Trust & Confidence System - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Run Database Migration
```bash
supabase db push
# Or manually: Copy supabase/migrations/013_trust_verification_system.sql to SQL Editor
```

### 2. Set Environment Variable
```bash
# Generate secret
openssl rand -base64 32

# Add to .env.local
CRON_SECRET=<generated-secret>
```

### 3. Deploy
```bash
git add .
git commit -m "Add Trust & Confidence system"
git push origin main
# Vercel auto-deploys
```

### 4. Configure Cron (Vercel Dashboard)
```json
{
  "crons": [{
    "path": "/api/consistency-check",
    "schedule": "0 2 * * *"
  }]
}
```

---

## 📦 What You Got

### Database Tables
- ✅ `user_health_profile` - Goals & wearable preferences
- ✅ `verification_events` - Trust history
- ✅ `wearable_interest_leads` - Users wanting devices

### API Routes
- ✅ `/api/health/profile` - Profile CRUD
- ✅ `/api/health/confidence-score` - Score calculation
- ✅ `/api/verification/event` - Verification logging
- ✅ `/api/wearable/interest` - Lead capture
- ✅ `/api/consistency-check` - Background validation

### UI Components
- ✅ `OnboardingModal` - First-time setup
- ✅ `ConfidenceBadge` - Visual trust indicator
- ✅ `SettingsPage` - User preferences

### Tests
- ✅ 20+ unit tests covering scoring logic
- ✅ All critical principles verified

---

## 🎯 Core Principles (Remember These!)

1. **Health Score (0-100)** = Behavior ONLY
   - Manual logs count fully
   - Never reduced by confidence level

2. **Confidence Score (0-100)** = Data trust
   - Starts at 30 (baseline)
   - Only increases (additive)
   - Never reduces Health Score

3. **Multipliers** = 1.0 to 1.25
   - All positive (no penalties)
   - Apply to individual data points

4. **Leaderboard** = Everyone shows
   - Sorted by Health Score
   - Confidence badge displayed
   - No exclusions

---

## 🚀 Usage Examples

### Show Onboarding Modal
```tsx
import OnboardingModal from '@/components/OnboardingModal';

const [showOnboarding, setShowOnboarding] = useState(false);

// Check if user needs onboarding
useEffect(() => {
  fetch('/api/health/profile', {
    headers: { 'x-user-id': userId }
  })
  .then(r => r.json())
  .then(data => {
    if (!data.exists) setShowOnboarding(true);
  });
}, []);

return (
  <OnboardingModal 
    isOpen={showOnboarding}
    onComplete={() => setShowOnboarding(false)}
    userId={userId}
  />
);
```

### Display Confidence Badge
```tsx
import ConfidenceBadge from '@/components/ConfidenceBadge';

<ConfidenceBadge 
  level="high"
  score={85}
  showScore
/>
```

### Get Confidence Score
```typescript
const response = await fetch('/api/health/confidence-score', {
  headers: { 'x-user-id': userId }
});

const { confidence_score, confidence_level, breakdown } = await response.json();

// Use in UI
console.log(`Confidence: ${confidence_score} (${confidence_level})`);
```

---

## 📊 Monitoring Queries

### Check Confidence Distribution
```sql
SELECT 
  CASE 
    WHEN get_user_confidence_score(user_id) >= 75 THEN 'high'
    WHEN get_user_confidence_score(user_id) >= 50 THEN 'medium'
    ELSE 'low'
  END as level,
  COUNT(*) as users
FROM user_health_profile
GROUP BY level;
```

### View Recent Verifications
```sql
SELECT 
  method,
  status,
  COUNT(*) as count
FROM verification_events
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY method, status;
```

### Find Wearable Leads
```sql
SELECT * 
FROM wearable_interest_leads
WHERE status = 'new'
ORDER BY created_at DESC;
```

---

## 🔧 Common Customizations

### Adjust Confidence Thresholds
Edit `lib/trust-scoring.ts`:
```typescript
export const CONFIDENCE_THRESHOLDS = {
  LOW: 0,      // Change these
  MEDIUM: 50,
  HIGH: 75,
}
```

### Change Consistency Check Schedule
Edit `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/consistency-check",
    "schedule": "0 */6 * * *"  // Every 6 hours instead of daily
  }]
}
```

### Add New Verification Method
1. Add to `types/index.ts`: `VerificationMethod`
2. Add multiplier in `lib/trust-scoring.ts`: `VERIFICATION_MULTIPLIERS`
3. Update `calculateVerificationMultiplier()` function

---

## ✅ Verification Checklist

- [ ] Migration ran successfully
- [ ] `CRON_SECRET` set in environment
- [ ] Onboarding modal appears on first login
- [ ] Confidence badges show on leaderboard
- [ ] Settings page works
- [ ] Consistency check cron runs (check Vercel logs)
- [ ] Unit tests pass (`npm test trust-scoring`)

---

## 📚 Full Documentation

- **Internal Docs:** `TRUST_AND_CONFIDENCE_SYSTEM.md`
- **Implementation:** `TRUST_SYSTEM_IMPLEMENTATION.md`
- **Code Reference:** `lib/trust-scoring.ts`
- **Tests:** `__tests__/trust-scoring.test.ts`

---

## 🆘 Quick Troubleshooting

**Onboarding not showing?**
→ Check user has no profile: `SELECT * FROM user_health_profile WHERE user_id = ?`

**Confidence score always 30?**
→ Check verification events exist: `SELECT * FROM verification_events WHERE user_id = ?`

**Cron not running?**
→ Verify `CRON_SECRET` matches in Vercel settings and check deployment logs

**Tests failing?**
→ Run `npm test -- --watch trust-scoring` to debug

---

**Status:** ✅ Production-Ready

All components tested and follow the core philosophy: **Additive confidence, never punitive.**
