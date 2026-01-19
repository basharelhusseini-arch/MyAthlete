# Workout Persistence Fix

## Problem

Workout plans were being generated successfully, but **workouts were not appearing** in the UI:
- Total Workouts = 0
- Scheduled count = 0  
- No workout cards displayed
- Empty workout list

## Root Cause

**Next.js Hot Module Replacement (HMR) creates separate store instances**

In development mode, Next.js API routes can get different instances of the in-memory `DataStore` class due to hot reloading:

1. `/api/workout-plans/generate` creates a plan and workouts → **Store Instance A**
2. `/api/workout-plans/[id]` tries to fetch the plan → **Store Instance B** (empty!)
3. `/api/workouts?workoutPlanId=X` tries to fetch workouts → **Store Instance B** (no workouts!)

**Result**: Plan exists in one instance, but fetch endpoints see a different empty instance.

### Why This Happened

```typescript
// Before (broken in development)
export const store = new DataStore();
```

Each time a file imports the store during HMR, it could get a **new instance** with empty data.

## Solution

**Use global caching to ensure a single store instance across all API routes**

```typescript
// After (fixed)
const globalForStore = global as unknown as { store: DataStore | undefined };

export const store = globalForStore.store ?? new DataStore();

if (process.env.NODE_ENV !== 'production') {
  globalForStore.store = store;
}
```

### How It Works

1. On first import, creates a new `DataStore` and caches it in `global`
2. On subsequent imports (including HMR), returns the **same cached instance**
3. In production, behaves the same but caching isn't needed (no HMR)

This is the [recommended pattern](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) for singleton instances in Next.js.

## Verification

### Before Fix
```bash
❌ Generation: creates plan in Instance A
❌ Fetch plan: looks in Instance B → 404 Not Found
❌ Fetch workouts: looks in Instance B → [] empty array
```

### After Fix
```bash
✅ Generation: creates plan in global Instance
✅ Fetch plan: looks in global Instance → Plan found!
✅ Fetch workouts: looks in global Instance → 6 workouts found!
```

### Test Results

**Created test**: `scripts/test-api-endpoints.ts`

```
1. POST /api/workout-plans/generate
✓ Plan generated: plan-api-test-123-xxx
  Duration: 2 weeks × 3 days = 6 workouts expected

2. GET /api/workout-plans/[id]
✓ Plan fetched: Strength - Intermediate - 2 Week Program

3. GET /api/workouts?workoutPlanId=[id]
✓ Found 6 workouts

✅ Workouts found:
  1. Week 1, Day 1 (2026-01-19) - 5 exercises - Warmup: Yes
  2. Week 1, Day 2 (2026-01-21) - 5 exercises - Warmup: Yes
  3. Week 1, Day 3 (2026-01-23) - 5 exercises - Warmup: Yes
  4. Week 2, Day 1 (2026-01-26) - 5 exercises - Warmup: Yes
  5. Week 2, Day 2 (2026-01-28) - 5 exercises - Warmup: Yes
  6. Week 2, Day 3 (2026-01-30) - 5 exercises - Warmup: Yes

✨ ALL API TESTS PASSED!
```

## What Was Already Working

The workout generation logic was **already correct**:

✅ `generateAthleteWorkoutPlan()` creates plan + workouts  
✅ Workouts have proper structure (id, planId, name, date, exercises, warmup)  
✅ Workouts are pushed to `this.workouts` array  
✅ Each workout is linked to plan via `workoutPlanId`  
✅ Dates are scheduled correctly  
✅ Status is set to `"scheduled"`  

The **only problem** was the store singleton pattern in development.

## UI Impact

### Before Fix (User Experience)
1. User fills form → clicks "Generate Workout Plan"
2. Success message → redirects to `/workouts/[id]`
3. ❌ **Page loads but shows**:
   - Total Workouts: 0
   - Scheduled: 0
   - Completed: 0
   - "No workouts in this plan" message

### After Fix (User Experience)
1. User fills form → clicks "Generate Workout Plan"
2. Success message → redirects to `/workouts/[id]`
3. ✅ **Page loads showing**:
   - Total Workouts: 6 (or 12, 16, etc.)
   - Scheduled: 6
   - Completed: 0
   - All workout cards with:
     - Warm-up protocol
     - Exercise list with %1RM and RPE
     - Week/day labels
     - Scheduled dates

## Files Changed

1. **lib/store.ts** (lines 1407-1413)
   - Changed: Singleton export pattern
   - Added: Global caching for HMR persistence
   - Impact: Fixes workout retrieval across API routes

2. **scripts/test-api-endpoints.ts** (NEW - 94 lines)
   - Purpose: End-to-end API testing
   - Tests: Generate → Fetch Plan → Fetch Workouts → Delete
   - Validates: Workout persistence through HTTP layer

3. **scripts/test-workouts-persistence.ts** (NEW - 40 lines)
   - Purpose: Direct store testing
   - Tests: In-memory workout persistence
   - Validates: Store logic (separate from API routing)

## Testing

### Quick Test (API)
```bash
npx tsx scripts/test-api-endpoints.ts
```
Should output: "✨ ALL API TESTS PASSED!"

### Direct Store Test
```bash
npx tsx scripts/test-workouts-persistence.ts
```
Should output: "✨ TEST PASSED!"

### Manual UI Test
1. Navigate to `/workouts/new`
2. Fill form:
   - Goal: Strength
   - Difficulty: Intermediate
   - Duration: 4 weeks
   - Frequency: 3x/week
3. Click "Generate Workout Plan"
4. Should see:
   - Total Workouts: 12
   - All 12 workout cards displayed
   - Each with warm-up, exercises, %1RM, RPE

## Production Considerations

### Current Solution (In-Memory Store)
✅ **Good for**:
- Development/testing
- MVP/demo environments
- Single-server deployments

❌ **Limitations**:
- Data lost on server restart
- Won't work with serverless (Vercel/AWS Lambda)
- No horizontal scaling
- No data persistence

### Future Migration to Supabase

When ready for production, the store should be replaced with Supabase:

```typescript
// Future: app/api/workout-plans/generate/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // 1. Insert workout plan
  const { data: plan } = await supabase
    .from('workout_plans')
    .insert({
      member_id: body.memberId,
      name: '...',
      goal: body.goal,
      // ...
    })
    .select()
    .single();
  
  // 2. Generate workouts
  const workouts = generateWorkouts(body, plan.id);
  
  // 3. Bulk insert workouts
  await supabase
    .from('workouts')
    .insert(workouts);
  
  return NextResponse.json(plan);
}
```

**Schema needed**:
```sql
CREATE TABLE workout_plans (...);
CREATE TABLE workouts (
  id UUID PRIMARY KEY,
  plan_id UUID REFERENCES workout_plans(id),
  name TEXT,
  date DATE,
  exercises JSONB,
  warmup JSONB,
  status TEXT,
  ...
);
```

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Root Cause** | Multiple store instances | Single global instance |
| **Total Workouts** | 0 | 6-16 (correct count) |
| **API Response** | Empty array | Full workout list |
| **UI Display** | "No workouts" | All workout cards |
| **Test Coverage** | Manual only | Automated API + store tests |
| **Production Ready** | ❌ No | ⚠️  In-memory only |

---

**Status**: ✅ **FIXED**  
**Verified**: ✅ **All tests passing**  
**Next Step**: Consider Supabase migration for production persistence
