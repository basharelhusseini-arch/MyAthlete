# Athlete-Intelligent Workout Generator Upgrade

## Overview
Upgraded the AI workout generator to produce athlete-level programming with variety, progressive overload, warm-ups, and proper intensity guidance.

## Key Features Implemented

### 1. **Exercise Variety & Anti-Repetition**
- Tracks recently used exercises per user (last 3 workouts)
- Weighted random selection penalizes recent exercises:
  - Last workout: 5% chance of repeat
  - Last 3 workouts: 40% chance of repeat
  - Other exercises: 100% chance (full weight)
- Main compound lifts allowed to repeat for progressive overload
- **Result**: Only 27.3% accessory duplication week-to-week (target: <50%)

### 2. **Warm-up Sections**
Every workout includes:
- **General warm-up** (5-8 min): Light cardio, dynamic stretching, bodyweight exercises
- **Mobility/activation** (3-6 min): Movement prep specific to the session
- **Progressive ramp sets** (for main barbell lifts):
  - Bar only × 10 (technique focus)
  - 40% 1RM × 8 (establish groove)
  - 55% 1RM × 5 (speed work)
  - 65% 1RM × 3 (feel the weight)
  - 75% 1RM × 1 (final prep)

### 3. **Program Templates**
Goal-specific programming with proper intensity:

| Goal | Level | Sets | Reps | %1RM | RPE | Rest |
|------|-------|------|------|------|-----|------|
| **Strength** | Beginner | 3 | 5 | 75% | 7 | 3 min |
| | Intermediate | 4 | 5 | 80% | 8 | 4 min |
| | Advanced | 5 | 3-5 | 85% | 9 | 5 min |
| **Hypertrophy** | Beginner | 3 | 8-12 | 65% | 7 | 90s |
| | Intermediate | 4 | 8-12 | 70% | 8 | 60s |
| | Advanced | 5 | 8-12 | 75% | 8 | 60s |
| **Athletic Performance** | Beginner | 3 | 5-8 | 70% | 7 | 2 min |
| | Intermediate | 4 | 5-8 | 75% | 8 | 2 min |
| | Advanced | 5 | 3-6 | 80% | 8 | 3 min |

### 4. **Progressive Overload & Deload**
- **Deload week every 4th week**:
  - Reduced volume: -1 set per exercise
  - Reduced intensity: -15% from working weight
  - Lower RPE: 6 instead of 7-9
- Main lifts rotate but allow repeats for progression
- Accessories vary to avoid adaptation/boredom

### 5. **Intensity Markers**
Every working set includes:
- **%1RM** for barbell movements (40-95% range)
- **RPE** (Rate of Perceived Exertion, 1-10 scale)
- **Tempo** for main lifts (e.g., "3-0-1-0" = 3s eccentric, 0s pause, 1s concentric, 0s top)
- **Rest times** appropriate to goal
- **Coaching cues** from exercise library

### 6. **Movement Pattern Rotation**
Exercises categorized by pattern:
- **Squat**: Back squat, front squat, goblet squat, split squat
- **Hinge**: Deadlift, RDL, trap bar deadlift, good morning
- **Push**: Bench press, incline press, overhead press, dip
- **Pull**: Pull-up, lat pulldown, barbell row, cable row
- **Carry**: Farmer carry, suitcase carry
- **Core**: Plank, dead bug, pallof press, ab wheel

## Technical Changes

### Files Modified

#### 1. **types/index.ts**
Extended `WorkoutExercise` interface:
```typescript
isMainLift?: boolean;
percent1RM?: number;
rpe?: number;
rpeRange?: [number, number];
tempo?: string;
coachingCues?: string[];
movementPattern?: 'squat' | 'hinge' | 'push' | 'pull' | 'carry' | 'core' | 'isolation';
```

Added new interfaces:
```typescript
interface WarmupSection {
  general: string[];
  mobility: string[];
  rampSets?: WarmupSet[];
}

interface WarmupSet {
  percent1RM: number;
  reps: number;
  notes?: string;
}
```

Extended `Workout` interface:
```typescript
warmup?: WarmupSection;
weekNumber?: number;
sessionType?: 'strength' | 'hypertrophy' | 'conditioning' | 'power' | 'deload';
```

#### 2. **lib/athlete-workout-generator.ts** (NEW)
Core generator with:
- `generateAthleteWorkoutPlan()`: Main generation function
- `generateWarmup()`: Creates progressive warm-up protocol
- `ExerciseTracker` class: Tracks recent exercise usage
- `validateWorkoutVariety()`: Test/validation helper
- Movement pattern detection
- Program templates
- Weighted random selection for variety

#### 3. **lib/store.ts**
Replaced old simple generator with new athlete generator:
```typescript
generateWorkoutPlan(params) {
  const { generateAthleteWorkoutPlan } = require('./athlete-workout-generator');
  const { plan, workouts } = generateAthleteWorkoutPlan(params, this.exercises);
  // Add to store...
}
```

#### 4. **app/workouts/[id]/page.tsx**
Enhanced UI to display:
- **Warm-up section** with collapsible details
- **Week number** and **session type** badges
- **Main lift** badge with red styling
- **%1RM** in blue badge
- **RPE** in purple badge
- **Tempo** with timer icon
- **Coaching cues** in gold-highlighted box

#### 5. **scripts/test-workout-variety.ts** (NEW)
Comprehensive test suite validating:
- Exercise variety (<50% duplicates)
- Warm-up presence (100%)
- %1RM ranges (40-95%)
- Deload weeks (every 4th week)
- Main lift programming
- Volume comparison (regular vs deload)

## Test Results

```
✓ Plan generated successfully
✓ Variety: PASS (27.3% duplicates)
✓ Warm-ups: PASS (12/12 workouts)
✓ %1RM ranges: PASS (65-80% average)
✓ Deload weeks: PASS (Week 4)
✓ Main lifts: PASS (3 different main lifts rotating)

🎉 ALL TESTS PASSED!
```

## Sample Workout Output

### Week 1, Day 1 (Strength Focus)

**Warm-up Protocol**
- General (5-8 min): Light cardio, dynamic stretching, bodyweight squats/push-ups
- Mobility (3-6 min): Cat-cow, hip circles, shoulder dislocations, deep squats
- Ramp Sets:
  1. Bar × 10 (technique)
  2. 40% × 8 (groove)
  3. 55% × 5 (speed)
  4. 65% × 3 (feel weight)
  5. 75% × 1 (final prep)

**Working Sets**
1. **Barbell Bench Press** [MAIN LIFT]
   - 4 sets × 5 reps @ 80% 1RM | RPE 8 | Rest: 4 min
   - Tempo: 3-0-1-0
   - Focus: Retract scapula, full ROM

2. **Lat Pulldown**
   - 3 sets × 8 reps | RPE 7 | Rest: 60s

3. **Dumbbell Row**
   - 3 sets × 8 reps | RPE 7 | Rest: 60s

4. **Leg Press**
   - 3 sets × 8 reps | RPE 7 | Rest: 90s

5. **Leg Curl**
   - 3 sets × 8 reps | RPE 7 | Rest: 60s

**Total Duration**: ~60 min (including warm-up)

## User Benefits

1. **No more boring repetition** - Fresh exercises every week
2. **Professional programming** - Matches what athlete coaches use
3. **Safe progression** - Built-in deloads prevent burnout
4. **Clear guidance** - %1RM and RPE remove guesswork
5. **Proper warm-ups** - Reduces injury risk, improves performance
6. **Sustainable** - Designed for long-term progress, not quick burnout

## Next Steps (Optional Enhancements)

- [ ] Add exercise swap functionality (user can replace exercises)
- [ ] Track actual 1RM values per user
- [ ] Auto-adjust %1RM based on logged performance
- [ ] Add wave periodization (vary intensity weekly)
- [ ] Include conditioning/cardio days for athletic performance
- [ ] Add exercise demo videos
- [ ] Weekly progress photos/notes section

## Migration Notes

- **Backward compatible**: Existing workouts still render correctly
- **No database changes required**: All new fields are optional
- **Existing UI unchanged**: New features show only on newly generated plans
- **No breaking changes**: Old generator logic replaced seamlessly

## How to Test

Run the validation script:
```bash
npx tsx scripts/test-workout-variety.ts
```

Generate a new workout plan from the UI and verify:
1. Warm-up section appears at top
2. Main lift has red "Main Lift" badge
3. %1RM and RPE values shown
4. Week 4 workouts labeled "Deload"
5. Exercises vary between weeks

---

**Implementation Date**: January 19, 2026  
**Status**: ✅ Complete and tested
