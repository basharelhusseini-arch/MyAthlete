# Testing Guide - Nutrition Plan Generation Fix

## Quick Test

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Run the automated test:**
   ```bash
   node test-nutrition-fix.js
   ```

3. **Expected result:**
   ```
   ✅ TEST PASSED: Nutrition plan generation ALWAYS succeeds for valid input!
   ```

---

## Manual Testing via UI

### Test Case 1: Standard User (Bug Report Scenario)

1. Navigate to `http://localhost:3000/nutrition/new`
2. Enter the following:
   - **Goal:** Maintenance
   - **Gender:** Male
   - **Age:** 30
   - **Height:** 170 cm
   - **Weight:** 70 kg
   - **Activity Level:** Moderate
   - **Duration:** 7 days
   - **Dietary Restrictions:** None
   - **Preferences:** None

3. Click "Generate Nutrition Plan"

4. **Expected result:**
   - ✅ Plan generates successfully
   - ✅ Redirects to plan details page
   - ✅ Shows 7 days of meals
   - ✅ No error modals

### Test Case 2: Strict Restrictions (Vegan + Gluten-Free)

1. Navigate to `http://localhost:3000/nutrition/new`
2. Enter the following:
   - **Goal:** Weight Loss
   - **Gender:** Female
   - **Age:** 25
   - **Height:** 165 cm
   - **Weight:** 65 kg
   - **Activity Level:** Light
   - **Duration:** 7 days
   - **Dietary Restrictions:** Vegan, Gluten-Free
   - **Preferences:** None

3. Click "Generate Nutrition Plan"

4. **Expected result:**
   - ✅ Plan generates (may use fallback snacks)
   - ✅ Console shows warnings (check browser DevTools)
   - ⚠️ May see: "Day X uses approximate macros"
   - ✅ Still succeeds and redirects

### Test Case 3: High Protein Goal (Muscle Gain)

1. Navigate to `http://localhost:3000/nutrition/new`
2. Enter the following:
   - **Goal:** Muscle Gain
   - **Gender:** Male
   - **Age:** 28
   - **Height:** 180 cm
   - **Weight:** 85 kg
   - **Activity Level:** Active
   - **Duration:** 7 days
   - **Dietary Restrictions:** None
   - **Preferences:** High-Protein

3. Click "Generate Nutrition Plan"

4. **Expected result:**
   - ✅ Plan generates with high protein targets (170g+)
   - ✅ May use degraded tolerance for some days
   - ✅ Successfully creates 7-day plan

### Test Case 4: Invalid Input (Should Fail)

1. Navigate to `http://localhost:3000/nutrition/new`
2. Enter the following:
   - **Height:** 20 cm (invalid)
   - **Weight:** 500 kg (invalid)
   - **Age:** 150 (invalid)

3. Click "Generate Nutrition Plan"

4. **Expected result:**
   - ❌ Clear error message: "Invalid height/weight/age"
   - ❌ Does NOT generate plan (correct behavior)
   - ✅ Error is user-friendly and actionable

---

## API Testing via cURL

### Test 1: Valid Request

```bash
curl -X POST http://localhost:3000/api/nutrition-plans/generate \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": "test-123",
    "goal": "maintenance",
    "gender": "male",
    "age": 30,
    "height": 170,
    "weight": 70,
    "activityLevel": "moderate",
    "duration": 7,
    "dietaryRestrictions": [],
    "preferences": []
  }'
```

**Expected response:**
```json
{
  "success": true,
  "plan": {
    "id": "...",
    "macroTargets": {
      "calories": 2100,
      "protein": 126,
      "carbohydrates": 260,
      "fats": 70
    },
    "mealPlans": [
      { "day": 1, "meals": [...], "totals": {...} },
      { "day": 2, "meals": [...], "totals": {...} },
      ...
    ]
  },
  "warnings": [] // May have warnings
}
```

### Test 2: Strict Restrictions

```bash
curl -X POST http://localhost:3000/api/nutrition-plans/generate \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": "test-123",
    "goal": "weight_loss",
    "gender": "female",
    "age": 25,
    "height": 165,
    "weight": 65,
    "activityLevel": "light",
    "duration": 7,
    "dietaryRestrictions": ["vegan", "gluten-free"],
    "preferences": []
  }'
```

**Expected response:**
```json
{
  "success": true,
  "plan": {...},
  "warnings": [
    "Day 3 uses approximate macros (relaxed match)",
    "Day 5 uses approximate macros (best available match)"
  ]
}
```

### Test 3: Invalid Input

```bash
curl -X POST http://localhost:3000/api/nutrition-plans/generate \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": "test-123",
    "goal": "maintenance",
    "gender": "male",
    "age": 30,
    "height": 20,
    "weight": 70,
    "activityLevel": "moderate",
    "duration": 7
  }'
```

**Expected response:**
```json
{
  "success": false,
  "error": "Invalid height",
  "details": "Height must be between 50cm and 300cm"
}
```

---

## Console Output Validation

When running tests, check browser console (DevTools) for proper logging:

### ✅ Good Logs (Success):
```
✅ Day 1 generated successfully (attempt 1/5)
   Totals: 2150 cal | 160.3g P | 235.1g C | 71.2g F
✅ Day 2 generated successfully (attempt 1/5)
   Totals: 2080 cal | 152.7g P | 228.4g C | 68.9g F
```

### ⚠️ Warning Logs (Still Success):
```
⚠️  Day 3: Relaxing tolerances (attempt 4)
✅ Day 3 generated with relaxed tolerance (attempt 4/5)
   Totals: 2120 cal | 148.2g P | 242.1g C | 73.5g F
⚠️  Meal plan generation warnings: [ "Day 3 uses approximate macros (relaxed match)" ]
```

### ❌ Error Logs (Should NOT see these for valid input):
```
❌ Day X attempt Y failed: ...
❌ Failed to generate Day X after 5 attempts
```

---

## Regression Tests

Ensure these scenarios that previously failed now work:

| Scenario | Old Result | New Result | Status |
|----------|-----------|------------|--------|
| Male, 170cm, 70kg, Moderate | ❌ 500 error | ✅ 7-day plan | ✅ FIXED |
| Vegan + Gluten-Free | ❌ 500 error | ⚠️ 7-day plan with warnings | ✅ FIXED |
| High protein (200g+) | ❌ 500 error | ⚠️ 7-day plan with warnings | ✅ FIXED |
| Very low calorie (1200) | ❌ 500 error | ⚠️ 7-day plan with warnings | ✅ FIXED |
| Invalid height (20cm) | ❌ 500 generic error | ❌ 400 clear error | ✅ IMPROVED |

---

## Performance Checks

Ensure generation is still fast:

| Scenario | Expected Time | Acceptable Range |
|----------|---------------|------------------|
| No restrictions | < 1 second | < 2 seconds |
| Strict restrictions | < 2 seconds | < 5 seconds |
| High retry count | < 3 seconds | < 8 seconds |

**How to measure:**
```javascript
const start = Date.now();
// ... generate plan ...
const duration = Date.now() - start;
console.log(`Generation took ${duration}ms`);
```

---

## Success Criteria

### ✅ All Tests Must Pass:

1. **Automated test passes** (`node test-nutrition-fix.js`)
2. **UI generates plans for all valid inputs** (no 500 errors)
3. **Warnings are non-blocking** (console logs, not alerts)
4. **Invalid inputs show clear errors** (400 status, helpful messages)
5. **Console logs are clean** (no red errors for recoverable states)
6. **7 days always generated** (never partial plans)

### ⚠️ Expected Warnings (OK):

- "Day X uses approximate macros (relaxed/loose match)"
- "Day X uses simplified meal plan (limited recipe availability)"
- "Very limited recipes available - using fallback options"

### ❌ Unacceptable Behaviors (Must Not Occur):

- 500 errors for valid input
- Partial plans (< 7 days)
- Throwing exceptions that reach user
- Alert modals for warnings
- Red console errors for degraded tolerance

---

## Debugging Tips

### If generation still fails:

1. **Check console logs:**
   ```
   Open DevTools → Console tab
   Look for: "⚠️" warnings or "❌" errors
   ```

2. **Verify recipe pool:**
   ```javascript
   // In browser console:
   fetch('/api/recipes').then(r => r.json()).then(data => {
     console.log(`${data.length} recipes available`);
   });
   ```

3. **Test with minimal restrictions:**
   - Start with no dietary restrictions
   - Add restrictions one at a time
   - Identify which restriction causes issues

4. **Check tolerance levels:**
   ```
   Look for logs like:
   "⚠️  Day X: Relaxing tolerances (attempt Y)"
   
   If you see this for ALL days → recipe pool may need expansion
   ```

5. **Verify fallback snacks are loaded:**
   ```javascript
   // Check meal-plan-generator.ts
   console.log(FALLBACK_SNACKS); // Should show 3 snacks
   ```

---

## Contact / Support

If tests fail after applying this fix:

1. **Check the logs:** Look for specific error messages in console
2. **Verify all files were updated:** Compare with `NUTRITION_FIX_SUMMARY.md`
3. **Check Node version:** Ensure Node.js 18+ for Next.js 14
4. **Clear cache:** `rm -rf .next && npm run dev`

---

**Happy Testing! 🧪✅**
