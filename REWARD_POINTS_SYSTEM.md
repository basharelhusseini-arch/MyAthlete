# Reward Points System - Implementation Complete

## Overview
Implemented a fair and motivating reward points system that converts daily Health Score into reward points for unlocking perks.

## Business Rules (Implemented)

### Point Calculation Formula
```
IF healthScore < 50:
    rewardPoints = 0

IF healthScore ≥ 50:
    rewardPoints = 1 + (healthScore - 50) × 0.4
```

### Examples
| Health Score | Reward Points |
|--------------|---------------|
| 0-49         | 0             |
| 50           | 1.00          |
| 60           | 5.00          |
| 70           | 9.00          |
| 80           | 13.00         |
| 90           | 17.00         |
| 100          | 21.00         |
| 110          | 25.00         |

**Linear progression**: Every 10-point increase in health score = 4 additional reward points (between 50-110)

## Implementation

### 1. Helper Function (`lib/reward-points.ts`)
```typescript
export function healthToRewardPoints(healthScore: number): number {
  if (healthScore < 50) return 0;
  const raw = 1 + (healthScore - 50) * 0.4;
  return Math.floor(raw * 100) / 100; // 2 decimals
}
```

### 2. Database Schema (`supabase/migrations/008_add_reward_points.sql`)

**Users Table**:
- Added `reward_points` column (NUMERIC, default 0)
- Indexed for fast queries

**New Table - reward_history**:
```sql
CREATE TABLE reward_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  health_score INT NOT NULL,
  points_earned NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

**Purpose**: Track daily point earnings for:
- Accurate total calculation
- Historical analysis
- Preventing double-counting

### 3. Automatic Point Addition (`app/api/checkin/today/route.ts`)

**Flow**:
1. User completes daily check-in
2. Health score calculated (0-110)
3. Reward points calculated using formula
4. Points added to `reward_history` (upserted for idempotency)
5. User's total `reward_points` recalculated from all history
6. User record updated

**Key Features**:
- ✅ Automatic - no manual point entry needed
- ✅ Idempotent - running check-in multiple times doesn't duplicate points
- ✅ Accurate - total always recalculated from history
- ✅ Persistent - points never lost

### 4. API Endpoint (`app/api/rewards/points/route.ts`)

**GET `/api/rewards/points`**

Returns:
```json
{
  "points": 247.50,
  "tier": "Silver",
  "nextTier": "Gold",
  "pointsToNext": 252.50,
  "tierColor": "from-gray-400 to-gray-600",
  "history": [
    {
      "date": "2026-01-17",
      "health_score": 85,
      "points_earned": 15.00
    }
    // ... last 30 days
  ]
}
```

### 5. Rewards Page (`app/member/rewards/page.tsx`)

**Updated**:
- ❌ Removed incorrect calculation: `points = healthScore * 10`
- ✅ Fetches actual reward points from API
- ✅ Shows correct earning rules
- ✅ Displays real-time point balance

**New UI**:
```
Daily Points Earning:
┌─────────────────────────────────────┐
│ Score 50  →  1 pt                   │
│ Score 110 →  25 pts                 │
│ Below 50  →  0 pts                  │
└─────────────────────────────────────┘
```

## Reward Tiers

| Tier     | Points Required | Perks                          |
|----------|-----------------|--------------------------------|
| Bronze   | 0 - 249         | Basic rewards                  |
| Silver   | 250 - 499       | 10-15% discounts               |
| Gold     | 500 - 999       | 20-25% discounts               |
| Platinum | 1000 - 1499     | Premium rewards + free items   |
| Diamond  | 1500+           | Exclusive access + unlimited   |

## Migration Instructions

### Run Migration
```bash
# Apply the migration (adds reward_points columns)
npx supabase db push

# Or via Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Paste contents of 008_add_reward_points.sql
# 3. Run
```

### Backfill Existing Users (Optional)
If you have existing health_scores and want to retroactively award points:

```sql
-- Calculate and add historical reward points
WITH daily_points AS (
  SELECT 
    user_id,
    date,
    score,
    CASE 
      WHEN score < 50 THEN 0
      ELSE ROUND((1 + (score - 50) * 0.4)::numeric, 2)
    END AS points_earned
  FROM health_scores
)
INSERT INTO reward_history (user_id, date, health_score, points_earned)
SELECT user_id, date, score, points_earned
FROM daily_points
ON CONFLICT (user_id, date) DO NOTHING;

-- Update user totals
UPDATE users
SET reward_points = (
  SELECT COALESCE(SUM(points_earned), 0)
  FROM reward_history
  WHERE reward_history.user_id = users.id
);
```

## Testing

### Test Cases

1. **Below Threshold**
   - Health Score: 30
   - Expected: 0 points
   - ✅ Pass

2. **At Threshold**
   - Health Score: 50
   - Expected: 1.00 points
   - ✅ Pass

3. **Mid-Range**
   - Health Score: 80
   - Expected: 13.00 points
   - ✅ Pass

4. **Maximum**
   - Health Score: 110
   - Expected: 25.00 points
   - ✅ Pass

5. **Idempotency**
   - Submit same day check-in twice
   - Expected: Points only counted once
   - ✅ Pass

### Manual Testing
```bash
# 1. Complete a check-in with high health score (e.g., 100)
POST /api/checkin/today
{
  "didWorkout": true,
  "calories": 2200,
  "sleepHours": 8,
  "habits": { "sauna": true, "meditation": true }
}

# Expected response includes:
{
  "rewardPoints": {
    "earned": 21.00,
    "total": 21.00
  }
}

# 2. Check rewards page
# Should show: 21 points available

# 3. Complete check-in next day with score 50
# Should add 1 point → total = 22 points
```

## Files Changed

1. ✅ `lib/reward-points.ts` (NEW) - Core calculation logic
2. ✅ `supabase/migrations/008_add_reward_points.sql` (NEW) - Database schema
3. ✅ `app/api/checkin/today/route.ts` (UPDATED) - Auto-add points
4. ✅ `app/api/rewards/points/route.ts` (NEW) - Fetch points API
5. ✅ `app/member/rewards/page.tsx` (UPDATED) - Display correct points

## Benefits

### For Users
- ✅ **Fair**: Points scale proportionally with effort
- ✅ **Motivating**: Clear threshold (50) encourages consistency
- ✅ **Transparent**: Formula is simple and predictable
- ✅ **Achievable**: 25 points/day max is realistic

### For Business
- ✅ **Balanced**: Not too generous, not too stingy
- ✅ **Encourages engagement**: Must maintain health score above 50
- ✅ **Trackable**: Full history of all point earnings
- ✅ **Flexible**: Easy to adjust formula if needed

## Formula Justification

**Why this formula?**
1. **Threshold at 50**: Filters out low-effort days
2. **Max at 25 points**: Keeps reward costs manageable
3. **Linear progression**: Simple, predictable, fair
4. **Slope of 0.4**: Sweet spot between generous and sustainable

**Alternative formulas considered**:
- Exponential: Too complex, rewards spike at high scores
- Step-based: Less smooth, feels arbitrary
- Higher threshold: Too demotivating for beginners

## Future Enhancements

**Possible additions**:
1. ✨ Bonus points for streaks (e.g., 7-day streak = +50 points)
2. ✨ Weekly/monthly bonus multipliers
3. ✨ Achievement-based bonuses (first 90+ score, etc.)
4. ✨ Seasonal events with double points
5. ✨ Social features (earn points for referring friends)

---

**Status**: ✅ COMPLETE - Reward points system is live and functional!
**Last Updated**: 2026-01-17
**Formula**: `rewardPoints = max(0, 1 + (healthScore - 50) × 0.4)`
