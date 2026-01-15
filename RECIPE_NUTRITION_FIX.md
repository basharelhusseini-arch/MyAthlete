# Recipe Nutrition Calculation Fix

## Problem Solved
**All 50 recipes had hardcoded `485 calories`** with similar macro patterns, which was not credible and made recipes indistinguishable from a nutrition perspective.

## Solution Implemented

### 1. **Created Comprehensive Nutrition Database** (`lib/nutrition-database.ts`)
- **200+ ingredients** with accurate per-100g nutrition data
- Sources: USDA FoodData Central
- Includes:
  - All proteins (chicken, fish, beef, eggs, tofu, legumes)
  - All carbs (quinoa, rice, pasta, bread, potatoes)
  - All vegetables and fruits
  - Fats, oils, nuts, seeds
  - Cheese, dairy, sauces, condiments
  - Herbs and spices
- **Unit conversion system** to handle g, kg, oz, cups, tbsp, tsp, whole items, etc.
- **Smart matching** with aliases for ingredient variations

### 2. **Built Nutrition Calculator** (`lib/nutrition-calculator.ts`)
- `calculateNutritionFromIngredients()` - computes accurate nutrition from ingredient lists
- Converts all units to grams
- Looks up nutrition data per 100g
- Calculates totals for entire batch
- Divides by servings for per-serving values
- Tracks missing ingredients
- Validates math (protein*4 + carbs*4 + fat*9 ≈ calories)

### 3. **Migrated All 50 Recipes** (`scripts/fix-all-recipe-nutrition.js`)
- Analyzed all recipes in `lib/recipes.ts`
- Computed accurate nutrition from ingredients
- **Replaced all hardcoded values** with calculated ones
- Results show realistic variation:
  - Greek Yogurt Pancakes: 252 cal (was 485) - 2 servings
  - Shrimp Cauliflower Rice: 336 cal (was 485)  
  - Grilled Chicken Quinoa Bowl: 554 cal (was 485)
  - Ribeye Steak: 808 cal (was 485)
  - And 46 more with varied, accurate values

### 4. **Updated Type System** (`types/index.ts`)
- Enhanced `Recipe` interface with:
  - Clear "per serving" documentation on all nutrition fields
  - Optional `totalCalories`, `totalProtein`, `totalCarbs`, `totalFats` for batch
  - Optional `missingNutritionData` flag
  - Clarified that `servings` is the yield count

### 5. **Enhanced UI**
- Updated recipe list pages to show **"Per serving"** explicitly
- Updated detail pages with **"Nutrition Facts (Per Serving)"** headers
- Member portal recipes show "per serving" on calorie display

## Results

### Before
```
All 50 recipes: 485 calories
```

### After
```
Sample of varied, accurate calories:
- 252 cal (Greek Yogurt Protein Pancakes)
- 262 cal (Buffalo Chicken Wraps)  
- 274 cal (Mediterranean Tuna Boats)
- 313 cal (Caprese Portobello)
- 336 cal (Shrimp Cauliflower Rice)
- 358 cal (Black Bean Sweet Potato)
- 401 cal (Lentil Veggie Stew)
- 496 cal (Turkey Meatballs)
- 520 cal (Herb Salmon)
- 554 cal (Chicken Quinoa Bowl)
- 579 cal (Greek Quinoa Salad)
- 625 cal (Egg Avocado Spinach)
- 639 cal (Chickpea Curry)
- 669 cal (Sweet Potato Bowl)
- 729 cal (Pork Chop Green Beans)
- 808 cal (Ribeye Steak)
```

### Verification
✅ **0 instances** of "calories: 485" remaining  
✅ **50/50 recipes** updated with accurate values  
✅ **All tests passing** (3/3)  
✅ **TypeScript compiles** with no errors  
✅ **Realistic variation** across all recipes  

## Technical Details

### Calculation Method
1. Parse ingredient list from each recipe
2. Look up nutrition data for each ingredient (per 100g)
3. Convert ingredient quantity to grams using unit conversion
4. Scale nutrition by (grams / 100)
5. Sum all ingredients to get total batch nutrition
6. Divide by servings to get per-serving values
7. Round appropriately (whole numbers for calories, 1 decimal for macros)

### Example: Grilled Chicken Quinoa Bowl
```javascript
Ingredients:
- 150g chicken breast → 248 cal, 46.5g pro, 0g carb, 5.4g fat
- 100g cooked quinoa → 120 cal, 4.4g pro, 21g carb, 1.9g fat
- 100g broccoli → 35 cal, 2.8g pro, 7g carb, 0.4g fat
- 80g cherry tomatoes → 14 cal, 0.7g pro, 3.1g carb, 0.2g fat
- 15g tahini → 89 cal, 2.6g pro, 3.2g carb, 8.1g fat
- Seasonings & oil → 48 cal, 0g pro, 0.9g carb, 5g fat

Total: 554 cal, 57g pro, 35g carb, 21g fat (1 serving)
Old (hardcoded): 485 cal, 42g pro, 48g carb, 12g fat
Difference: +69 cal (more accurate)
```

## Files Changed

### New Files
- `lib/nutrition-database.ts` (200+ ingredients, unit conversions)
- `lib/nutrition-calculator.ts` (calculation logic)
- `scripts/fix-all-recipe-nutrition.js` (migration script)
- `scripts/calculate-recipe-nutrition.mjs` (test script)
- `scripts/recompute-recipe-nutrition.ts` (analysis script)

### Modified Files
- `lib/recipes.ts` - All 50 recipes updated with accurate nutrition
- `types/index.ts` - Enhanced Recipe interface with nutrition metadata
- `app/recipes/page.tsx` - Added "per serving" label
- `app/recipes/[id]/page.tsx` - Added "Per Serving" to title
- `app/member/recipes/page.tsx` - Added "per serving" label

## Usage

### For Future Recipes
When adding new recipes, use the calculation function:

```typescript
import { calculateNutritionFromIngredients } from '@/lib/nutrition-calculator';

const nutrition = calculateNutritionFromIngredients(
  recipe.ingredients,
  recipe.servings
);

// Use nutrition.calories, nutrition.protein, etc.
```

### Updating Existing Recipes
Run the migration script:
```bash
node scripts/fix-all-recipe-nutrition.js
```

## Testing
- Unit tests verify nutrition calculations are mathematically correct
- Tests ensure displayed totals equal sum of meals
- Tests handle missing ingredients gracefully

## Impact
- ✅ **User Experience**: Recipes now show realistic, varied nutrition
- ✅ **Credibility**: No more "everything is 485 calories" issue
- ✅ **Accuracy**: Based on ingredient composition, not hardcoded guesses
- ✅ **Transparency**: Clear "per serving" labeling
- ✅ **Maintainability**: Easy to update/recalculate if recipes change

---

**Status**: ✅ Complete - All issues resolved  
**Date**: January 15, 2026
