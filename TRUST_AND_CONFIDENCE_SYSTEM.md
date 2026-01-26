# Trust & Confidence System - Internal Documentation

## Philosophy: Additive, Never Punitive

The Thrivv Trust & Confidence system is built on a foundational principle: **users are never punished, excluded, or penalized for lacking verification**.

### Core Tenets

1. **Logging is always allowed** - Every user can log data regardless of verification status
2. **No exclusions** - Users never hidden from leaderboards or features
3. **No penalties** - Scores are never reduced based on verification level
4. **Additive confidence** - Verification only adds trust, never removes earned progress
5. **Silent anti-gaming** - Checks operate in background without user friction

---

## Two Independent Scores

### 1. Health Score (0-100)

**What it measures:** Behavioral outcomes ONLY

**Components:**
- Sleep quality/duration: 30%
- Training completion/intensity: 30%
- Nutrition logging/adherence: 25%
- Habit consistency: 15%

**Critical Rules:**
- ✅ Based purely on user behavior
- ✅ Manual logs count fully (no reduction)
- ❌ NEVER affected by confidence level
- ❌ NEVER reduced by lack of wearable
- ❌ NEVER impacted by verification status

**Formula:**
```typescript
healthScore = (sleep * 0.30) + (training * 0.30) + (nutrition * 0.25) + (habits * 0.15)
```

**Example:**
```
User A: Manual logging, no wearable
  Sleep: 80, Training: 70, Nutrition: 90, Habits: 60
  Health Score: 76

User B: Wearable-verified, surveys complete
  Sleep: 80, Training: 70, Nutrition: 90, Habits: 60
  Health Score: 76  (SAME - confidence doesn't reduce)
```

---

### 2. Confidence Score (0-100)

**What it measures:** Data trustworthiness and completeness

**Components:**
- Baseline (everyone): 30 points
- Wearable connected: +25 points
- Consistency checks passed: +10 points
- Survey completions: +10 points
- Long-term consistency: +5 per 30 days (max +25)

**Critical Rules:**
- ✅ Purely additive (starts at 30, only goes up)
- ✅ Informational only (doesn't gate features)
- ✅ Shows path to improvement
- ❌ NEVER reduces Health Score
- ❌ NEVER blocks user actions

**Formula:**
```typescript
confidenceScore = min(
  30 + // baseline
  (hasWearable ? 25 : 0) +
  (consistencyPasses >= 3 ? 10 : 0) +
  (surveys >= 1 ? 10 : 0) +
  min(floor(daysActive / 30) * 5, 25), // long-term
  100
)
```

**Confidence Levels:**
- **Low (0-49):** Manual logging - all data is valuable
- **Medium (50-74):** Partially verified or consistent manual
- **High (75-100):** Wearable-verified + consistent

---

## Verification Methods

### 1. Wearable (Highest Confidence)
- **Source:** Automatic sync from devices (WHOOP, Garmin, Apple Watch, etc.)
- **Multiplier:** 1.15 (+15% boost)
- **Confidence:** High
- **Notes:** Optional, never required

### 2. Manual (Baseline)
- **Source:** User self-reports
- **Multiplier:** 1.0 (baseline, no penalty)
- **Confidence:** Low/Medium depending on consistency
- **Notes:** Always allowed, fully counted

### 3. Consistency Check (Background)
- **Source:** Silent validation algorithms
- **Multiplier:** 1.05 (+5% boost)
- **Confidence:** Medium
- **Notes:** Automatic, user doesn't see checks

### 4. Survey (Optional)
- **Source:** User answers verification questions
- **Multiplier:** 1.05 (+5% boost)
- **Confidence:** Medium
- **Notes:** Max 2 per month, always skippable

---

## Verification Multipliers (Positive-Only)

Multipliers apply to **individual data points**, NOT overall scores.

**Range:** 1.0 to 1.25 (baseline to max boost)

**Examples:**
```
Manual sleep log: 7 hours × 1.0 = 7 hours (counts fully)
Wearable sleep: 7 hours × 1.15 = 8.05 hours equivalent (15% boost)
Wearable + Survey: 7 hours × 1.25 = 8.75 hours equivalent (max boost)
```

**Critical:** No multiplier < 1.0 exists. Failed checks = 1.0 (baseline).

---

## Consistency Checks (Silent Validation)

### Purpose
Detect implausible data patterns without user punishment.

### How It Works
1. **Background job** runs daily (cron at 2 AM)
2. **Validates** recent logs against plausibility rules
3. **Outcomes:**
   - **Pass:** User gets +10 confidence bonus (after 3 passes/30 days)
   - **Flag:** No bonus, no penalty, silent log for review
   - **Fail:** No bonus, no penalty, silent log

### Validation Rules

**Sleep:**
- Min: 3 hours (hard floor)
- Max: 14 hours (hard ceiling)
- Reasonable: 5-10 hours (outside = flag)

**Workouts:**
- Min duration: 5 minutes
- Max duration: 300 minutes (flags if over)
- Max per day: 4 workouts (flags if over)

**Nutrition:**
- Min calories: 15 kcal/kg bodyweight
- Max calories: 60 kcal/kg bodyweight
- Flags if outside range, never blocks

**Metric Changes:**
- Max weight change: 2 kg/week (flags if over)
- Max sleep shift: 4 hours from baseline (flags if over)

### User Impact
**Visible:** None (checks are silent)
**Invisible:** Confidence score may not increase if flagged
**Never:** Scores reduced, features blocked, data rejected

---

## Leaderboard Behavior

### Principle: Everyone Shows

**Sorting:** By Health Score (descending)

**Display:**
```
Rank | Name    | Health Score | Confidence Badge
-----|---------|--------------|------------------
1    | Alice   | 92           | 🛡️ High (85)
2    | Bob     | 88           | 🛡️ Medium (62)
3    | Charlie | 86           | 🛡️ Standard (35)
```

**Confidence Badge:**
- **High:** Gold shield, "Highly Verified"
- **Medium:** Blue shield, "Verified"
- **Low:** Gray shield, "Standard"

**Filtering (Optional User Preference):**
- User can choose: "Show high-confidence first"
- But ALL users always show (no exclusions)

**NO Rank-Based Rules:**
- Top 10 users are NOT targeted for extra verification
- Last-place users are NOT flagged automatically
- Leaderboard position does NOT trigger surveys

---

## Survey System

### Eligibility (NOT Rank-Based)

**When triggered:**
- Random selection (10% of active users weekly)
- Weighted by recent activity (not score)
- At least 7 days since last survey
- Max 2 surveys per month

**When NOT triggered:**
- High leaderboard rank (we don't target top performers)
- Low leaderboard rank (we don't suspect bottom performers)
- Recent survey completion
- Inactive users

### Survey Questions (Simple, Non-Invasive)

**Example for Sleep:**
1. "How accurate do you feel your logged data is?" (1-5 scale)
2. "Did you sleep through the night without major interruptions?" (Yes/No)

**Example for Workout:**
1. "How accurate do you feel your logged data is?" (1-5 scale)
2. "Did you complete all planned sets/reps?" (Yes/No)

**Always skippable** - users can dismiss without penalty.

---

## Anti-Gaming Protections

### What We Detect (Silently)

1. **Impossible patterns:** Sleep > 14 hours, workouts > 5 hours
2. **Sudden changes:** Weight loss of 5kg in a week
3. **Suspicious consistency:** Exact same values every day
4. **Copy-paste behavior:** Identical logs across multiple days

### What We DO

1. **Flag for review** (internal only)
2. **Don't give confidence boost** (no penalty, just no bonus)
3. **Log pattern** for analysis

### What We DON'T Do

1. ❌ Block user from logging
2. ❌ Reduce their Health Score
3. ❌ Hide from leaderboard
4. ❌ Send accusatory messages
5. ❌ Require verification to continue
6. ❌ Penalize based on leaderboard rank

---

## Wearable Opt-In Funnel

### Onboarding Flow

**Step 1: Goal Selection**
- User selects primary health goal
- No mention of verification yet

**Step 2: Wearable Survey**
- "Do you use a fitness wearable?"
  - **Yes** → Select device type → Connect CTA
  - **No** → "Interested in being provided one?" (Yes/Maybe/No)

**Step 3: Profile Created**
- User proceeds to platform regardless of answers

### Lead Capture (For "Yes" Responses)

Users who want wearables provided are stored in `wearable_interest_leads` table:
- User ID
- Preferred device (if specified)
- Country (for shipping logistics)
- Consent for contact (GDPR compliant)

**Use Cases:**
- Partnership programs (wearable companies)
- Lending library for users
- Discounted device offers
- Research studies

---

## Database Schema

### `user_health_profile`
```sql
- user_id (PK)
- goal (fat_loss | maintenance | muscle_gain | performance | general)
- has_wearable (boolean)
- wearable_type (whoop | garmin | apple_watch | fitbit | oura | other)
- wants_wearable_provided (yes | no | maybe)
- country
- created_at, updated_at
```

### `verification_events`
```sql
- id (PK)
- user_id
- entity_type (sleep | workout | meal | habit)
- entity_id (reference to specific log)
- method (wearable | manual | survey | consistency_check)
- status (verified | flagged | skipped)
- confidence (low | medium | high)
- multiplier (1.0 to 1.25, positive only)
- metadata (JSON for check details)
- created_at
```

### `wearable_interest_leads`
```sql
- id (PK)
- user_id
- wearable_preference
- country
- consent (boolean, GDPR)
- status (new | contacted | fulfilled | declined)
- created_at
```

---

## API Endpoints

### Profile Management
- `GET /api/health/profile` - Get user profile
- `POST /api/health/profile` - Create/update profile

### Confidence Scoring
- `GET /api/health/confidence-score` - Calculate confidence score

### Verification
- `POST /api/verification/event` - Create verification event
- `GET /api/verification/event` - Get verification history

### Wearable Leads
- `POST /api/wearable/interest` - Submit interest
- `GET /api/wearable/interest` - Check interest status

### Background Jobs
- `POST /api/consistency-check` - Run consistency validation (CRON)

---

## Implementation Checklist

### Database
- [x] Run migration: `supabase/migrations/013_trust_verification_system.sql`
- [x] Verify RLS policies are enabled
- [x] Test confidence score SQL function

### Backend
- [x] Implement scoring constants (`lib/trust-scoring.ts`)
- [x] Create API routes (profile, confidence, verification, leads)
- [x] Set up consistency check cron job
- [x] Configure `CRON_SECRET` in environment

### Frontend
- [x] Build onboarding modal (`components/OnboardingModal.tsx`)
- [x] Add confidence badges (`components/ConfidenceBadge.tsx`)
- [x] Update leaderboard with confidence display
- [x] Create settings page for preferences

### Testing
- [x] Unit tests for scoring logic (`__tests__/trust-scoring.test.ts`)
- [x] Verify no paths reduce Health Score
- [x] Confirm multipliers are positive-only

### Documentation
- [x] Internal trust system explanation (this file)
- [x] User-facing help text (in UI components)

---

## User-Facing Copy Guidelines

### Tone: Supportive, Never Accusatory

**Good:**
- "Wearables improve accuracy but are optional"
- "All logging methods are valuable"
- "Confidence shows data completeness"

**Bad:**
- "Verify your data or risk being flagged"
- "Unverified users may be excluded"
- "Your score is low because you don't have a wearable"

### Key Messages

1. **Health Score = Behavior** - "Reflects what you do, not how you log it"
2. **Confidence = Completeness** - "Shows how complete your data is, never reduces your score"
3. **Wearables = Optional** - "Improve accuracy but aren't required"
4. **Everyone Counts** - "Manual logging is fully valued"

---

## Monitoring & Analytics

### Metrics to Track

**Confidence Distribution:**
```sql
SELECT 
  confidence_level,
  COUNT(*) as user_count
FROM (
  SELECT 
    user_id,
    CASE 
      WHEN get_user_confidence_score(user_id) >= 75 THEN 'high'
      WHEN get_user_confidence_score(user_id) >= 50 THEN 'medium'
      ELSE 'low'
    END as confidence_level
  FROM user_health_profile
) subquery
GROUP BY confidence_level;
```

**Wearable Adoption:**
```sql
SELECT 
  has_wearable,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM user_health_profile
GROUP BY has_wearable;
```

**Verification Event Volume:**
```sql
SELECT 
  method,
  status,
  COUNT(*) as count
FROM verification_events
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY method, status
ORDER BY count DESC;
```

---

## Troubleshooting

### Issue: Users complaining about "low confidence"

**Response:**
- Explain confidence is informational only
- Show that Health Score is unaffected
- Offer path to improvement (wearable, consistency)
- Emphasize manual logging is fully valued

### Issue: Consistency checks flagging legitimate data

**Action:**
1. Review flagged patterns in `verification_events`
2. Adjust thresholds in `lib/trust-scoring.ts` if needed
3. Never penalize - flags are silent

### Issue: Users requesting wearables not contacted

**Action:**
1. Query `wearable_interest_leads` table
2. Filter by `status = 'new'`
3. Export for partnership program outreach

---

## Future Enhancements

### Phase 2 (Optional)
- [ ] ML model to detect gaming patterns
- [ ] Automated survey generation based on anomalies
- [ ] Wearable device lending program
- [ ] Confidence-based rewards (small, additive bonuses)

### Phase 3 (Advanced)
- [ ] Graph analysis (user → device → IP networks)
- [ ] Behavioral biometrics (typing patterns, navigation)
- [ ] Third-party data enrichment (fitness APIs)
- [ ] Admin dashboard for review queue

---

## Success Metrics

1. **No user complaints about exclusion** - Users never feel punished
2. **Wearable adoption increases** - More users connect devices voluntarily
3. **Confidence distribution improves** - More users reach medium/high
4. **Gaming attempts decline** - Silent protections work
5. **Leaderboard trust increases** - Community believes in fairness

---

## Contact

For questions about the Trust & Confidence system:
- Technical: See `lib/trust-scoring.ts`
- Database: See `supabase/migrations/013_trust_verification_system.sql`
- Frontend: See `components/OnboardingModal.tsx`
- Tests: See `__tests__/trust-scoring.test.ts`

**Remember:** When in doubt, err on the side of inclusion. The system should feel invisible to honest users.
