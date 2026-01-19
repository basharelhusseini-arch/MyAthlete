# Athlete Workout Generator - Quick Reference

## 🎯 What Changed?

Your AI workout generator now creates **athlete-level programs** instead of basic repetitive workouts.

## ✨ Key Improvements

### 1. **Exercise Variety**
- Accessories rotate every workout (only 27% repeats)
- Main lifts (squat/bench/deadlift) repeat for progressive overload
- No more seeing the same 5 exercises every week

### 2. **Proper Warm-ups** 
Every workout starts with:
- 5-8 min general warm-up
- 3-6 min mobility drills  
- Progressive ramp sets (for barbell lifts):
  ```
  Bar × 10 (light)
  40% × 8
  55% × 5
  65% × 3
  75% × 1
  → Then working sets at 80-85%
  ```

### 3. **Smart Programming**
- **Strength focus**: 3-5 sets × 3-5 reps @ 75-85% 1RM
- **Hypertrophy focus**: 3-5 sets × 8-12 reps @ 65-75% 1RM  
- **Athletic performance**: 3-5 sets × 5-8 reps @ 70-80% 1RM
- Auto deload every 4th week (reduced volume/intensity)

### 4. **Intensity Guidance**
Every exercise now shows:
- **%1RM** (percentage of one-rep max) for main lifts
- **RPE** (Rate of Perceived Exertion, 1-10 scale)
- **Tempo** (e.g., "3-0-1-0" = 3s down, 0s pause, 1s up)
- **Rest times** matched to goal

### 5. **Coaching Cues**
Main lifts include focus points from the exercise library:
- "Keep chest up"
- "Drive through heels"
- "Retract scapula"

## 📊 How It Looks in the UI

### Before (Old Generator)
```
Workout 1 - Strength
1. Barbell Squat - 3 sets × 10 reps | Rest: 60s
2. Bench Press - 3 sets × 10 reps | Rest: 60s
3. Deadlift - 3 sets × 10 reps | Rest: 60s
[repeated every week with same exercises]
```

### After (New Generator)
```
Week 1, Day 1 [Strength]

🔥 WARM-UP PROTOCOL
General (5-8 min)
• 5 min light cardio (bike, row, or jog)
• Dynamic stretching (leg swings, arm circles)
• 10 bodyweight squats
• 10 push-ups

Mobility/Activation (3-6 min)
• 10 cat-cow stretches
• 10 hip circles each direction
• 10 shoulder dislocations with band
• 5 deep bodyweight squats with pause

Specific Warm-up Sets
Set 1: Bar × 10 (technique)
Set 2: 40% × 8 (groove)
Set 3: 55% × 5 (speed)
Set 4: 65% × 3 (feel weight)
Set 5: 75% × 1 (final prep)

💪 WORKING SETS
1. Barbell Bench Press ⚡ MAIN LIFT
   4 sets × 5 reps | @ 80% 1RM | RPE 8 | Rest: 4 min
   Tempo: 3-0-1-0
   → Focus: Retract scapula, full ROM

2. Lat Pulldown
   3 sets × 8 reps | RPE 7 | Rest: 60s

3. Dumbbell Row  
   3 sets × 8 reps | RPE 7 | Rest: 60s

4. Leg Press
   3 sets × 8 reps | RPE 7 | Rest: 90s

5. Leg Curl
   3 sets × 8 reps | RPE 7 | Rest: 60s
```

## 🔄 Week-to-Week Variation

### Week 1, Day 1: Bench Focus
- Main: Bench Press @ 80%
- Accessories: Lat Pulldown, DB Row, Leg Press, Leg Curl

### Week 2, Day 1: Squat Focus  
- Main: Back Squat @ 80%
- Accessories: Cable Fly, Tricep Extension, Bicep Curl, Leg Press ← Different!

### Week 3, Day 1: Deadlift Focus
- Main: Deadlift @ 80%
- Accessories: Dumbbell Row, Lat Pulldown, Cable Fly, Leg Curl ← Different again!

### Week 4, Day 1: 🟢 DELOAD
- Main: Bench Press @ 65% ← Lighter
- 3 sets instead of 4 ← Less volume
- RPE 6 instead of 8 ← Easier
- Same accessories but reduced

## 📈 RPE Scale Reference

| RPE | Description | Reps in Reserve |
|-----|-------------|-----------------|
| 6 | Moderate effort | 4+ reps left |
| 7 | Challenging | 3 reps left |
| 8 | Hard | 2 reps left |
| 9 | Very hard | 1 rep left |
| 10 | Max effort | 0 reps left |

## 🎓 Understanding %1RM

If your 1RM bench press is **200 lbs**:
- 40% = 80 lbs (warm-up)
- 55% = 110 lbs (warm-up)
- 65% = 130 lbs (warm-up)
- 75% = 150 lbs (last warm-up)
- 80% = 160 lbs (working sets) ← You'd do 4×5 here

**Don't know your 1RM?** Use RPE instead:
- RPE 8 with 5 reps = roughly 80% 1RM
- RPE 8 with 10 reps = roughly 70% 1RM

## ⚙️ How to Generate

1. Go to **Workouts → Generate New Plan**
2. Select:
   - **Goal**: Strength, Hypertrophy, or Athletic Performance
   - **Difficulty**: Beginner, Intermediate, or Advanced
   - **Duration**: 4+ weeks recommended (for deload cycle)
   - **Frequency**: 3-4× per week optimal
3. Click **Generate**
4. Your plan will include all warm-ups, %1RM, RPE, and varied exercises

## 🧪 Testing the System

Want to verify it works? Run:
```bash
npx tsx scripts/test-workout-variety.ts
```

This validates:
- ✓ Exercise variety (<50% duplicates)
- ✓ All workouts have warm-ups  
- ✓ %1RM values in safe ranges (40-95%)
- ✓ Deload weeks every 4 weeks
- ✓ Main lift rotation

## 💡 Pro Tips

1. **Track your 1RM** - Keep a note of your best lifts so %1RM makes sense
2. **Follow the warm-up** - Don't skip it, especially the ramp sets
3. **Honor deload weeks** - Your body needs recovery every 4th week
4. **Use RPE** - If a set feels easier/harder than prescribed, note it
5. **Swap if needed** - Can't do an accessory? Pick similar movement pattern

## 🚀 What's Next?

Future enhancements planned:
- Exercise swap functionality in UI
- Auto-adjust %1RM based on logged lifts  
- Wave periodization (vary intensity weekly)
- Exercise demo videos
- Progress tracking graphs

---

**Questions?** Check `ATHLETE_WORKOUT_UPGRADE.md` for full technical details.
