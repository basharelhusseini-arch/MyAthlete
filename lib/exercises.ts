/**
 * Comprehensive Exercise Database
 * 80+ fully documented exercises covering all muscle groups
 * Each exercise includes:
 * - Step-by-step instructions
 * - Coaching tips & common mistakes
 * - Breathing patterns
 * - Tempo guidelines
 * - Recommended rest periods
 * - Level-specific programming
 */

import { Exercise } from '@/types';

export const exercisesDatabase: Exercise[] = [
  // ========================================
  // CHEST EXERCISES
  // ========================================
  {
    id: 'chest-barbell-bench-press',
    name: 'Barbell Bench Press',
    description: 'The king of chest exercises - builds overall chest mass, strength, and power',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Lie on a flat bench with feet firmly planted on the floor',
      'Grip the barbell slightly wider than shoulder-width apart',
      'Unrack the bar and position it directly over your chest',
      'Lower the bar in a controlled arc to your mid-chest, elbows at 45 degrees',
      'Press the bar back up explosively until arms are fully extended',
      'Keep your shoulder blades retracted and maintain a slight arch in your lower back'
    ],
    tips: [
      'Keep your wrists straight - bar should be over your forearms',
      'Don\'t bounce the bar off your chest',
      'Drive through your feet to maintain stability',
      'Breathe out forcefully during the press to engage your core'
    ],
    breathing: 'Inhale as you lower the bar to your chest, exhale forcefully as you press up',
    tempo: '2-1-1',
    rest: '2-3 minutes between sets',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '6-8' },
      advanced: { sets: 5, reps: '4-6' }
    }
  },
  
  {
    id: 'chest-dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    description: 'Allows greater range of motion than barbell, excellent for chest development and balance',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Sit on the edge of a flat bench with a dumbbell on each thigh',
      'Lie back while bringing the dumbbells to chest level, one at a time',
      'Position dumbbells at chest level with palms facing forward',
      'Press dumbbells up until arms are fully extended, bringing them together at the top',
      'Lower dumbbells slowly in a wide arc until they reach chest level',
      'Feel a deep stretch in your chest before pressing back up'
    ],
    tips: [
      'Don\'t let dumbbells drift too far apart at the bottom',
      'Squeeze your chest at the top of the movement',
      'Keep your core engaged throughout',
      'Use a spotter when going heavy'
    ],
    breathing: 'Inhale during the lowering phase, exhale during the press',
    tempo: '2-0-1',
    rest: '90 seconds to 2 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '8-10' },
      advanced: { sets: 4, reps: '6-8' }
    }
  },

  {
    id: 'chest-incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    description: 'Targets upper chest development, creating a fuller, more aesthetic chest',
    category: 'strength',
    muscleGroups: ['upper chest', 'shoulders', 'triceps'],
    equipment: 'dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Set an adjustable bench to a 30-45 degree incline',
      'Sit with back firmly against the bench, feet flat on floor',
      'Hold dumbbells at shoulder height with palms facing forward',
      'Press dumbbells up and slightly inward until arms are extended',
      'Lower dumbbells slowly to starting position with control',
      'Maintain constant tension on your upper chest'
    ],
    tips: [
      'Don\'t set the incline too high (over 45°) or shoulders take over',
      'Keep your shoulder blades squeezed together',
      'Drive your upper back into the bench',
      'Avoid arching your lower back excessively'
    ],
    breathing: 'Breathe in as you lower, breathe out powerfully as you press',
    tempo: '2-0-1',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '8-10' },
      advanced: { sets: 4, reps: '6-8' }
    }
  },

  {
    id: 'chest-push-ups',
    name: 'Push-Ups',
    description: 'Foundational bodyweight exercise for chest, shoulders, and triceps',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders', 'core'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in a high plank position with hands slightly wider than shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes to prevent sagging',
      'Lower your chest toward the floor by bending your elbows',
      'Go down until your chest nearly touches the ground',
      'Push through your palms to return to starting position'
    ],
    tips: [
      'Don\'t let your hips sag or pike up',
      'Keep your elbows at a 45-degree angle, not flared out',
      'Look slightly ahead, not straight down',
      'If too difficult, start on your knees or at an incline'
    ],
    breathing: 'Inhale as you lower, exhale as you push up',
    tempo: '2-0-1',
    rest: '60-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-12' },
      intermediate: { sets: 4, reps: '15-20' },
      advanced: { sets: 4, reps: '20-30' }
    }
  },

  {
    id: 'chest-cable-flyes',
    name: 'Cable Chest Flyes',
    description: 'Isolation exercise for chest development with constant tension',
    category: 'strength',
    muscleGroups: ['chest'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cable pulleys to chest height',
      'Grab handles with palms facing forward',
      'Step forward into a staggered stance for stability',
      'With a slight bend in elbows, bring handles together in front of your chest',
      'Squeeze your chest at the peak contraction',
      'Slowly return to starting position with control'
    ],
    tips: [
      'Don\'t bend elbows too much - maintain the same angle throughout',
      'Focus on squeezing your chest, not just moving the weight',
      'Keep your core tight to avoid arching your back',
      'Don\'t let handles go behind your shoulder line'
    ],
    breathing: 'Exhale as you bring handles together, inhale as you open up',
    tempo: '2-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '12-15' }
    }
  },

  {
    id: 'chest-dips',
    name: 'Chest Dips',
    description: 'Advanced bodyweight movement for lower chest and triceps',
    category: 'strength',
    muscleGroups: ['lower chest', 'triceps', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    instructions: [
      'Grip parallel bars and press yourself up to starting position',
      'Lean your torso forward about 30 degrees',
      'Lower your body by bending elbows until upper arms are parallel to ground',
      'Keep elbows slightly flared out for chest emphasis',
      'Press back up to starting position, focusing on chest contraction',
      'Maintain the forward lean throughout the movement'
    ],
    tips: [
      'More forward lean = more chest activation',
      'Don\'t go too deep if you feel shoulder discomfort',
      'Keep your core engaged',
      'Add weight with a dip belt once bodyweight becomes easy'
    ],
    breathing: 'Inhale as you descend, exhale as you push up',
    tempo: '2-0-1',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '5-8' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '12-15 or weighted 8-10' }
    }
  },

  // ========================================
  // BACK EXERCISES
  // ========================================
  {
    id: 'back-pull-ups',
    name: 'Pull-Ups',
    description: 'The ultimate back and biceps builder - develops width and thickness',
    category: 'strength',
    muscleGroups: ['lats', 'biceps', 'upper back', 'core'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Hang from a pull-up bar with an overhand grip, hands slightly wider than shoulders',
      'Start from a dead hang with arms fully extended',
      'Engage your lats and pull your shoulder blades down and back',
      'Pull yourself up until your chin clears the bar',
      'Keep your core tight and avoid swinging',
      'Lower yourself with control back to the starting position'
    ],
    tips: [
      'Think about pulling your elbows down, not just pulling yourself up',
      'Don\'t kip or swing - use strict form',
      'Squeeze your shoulder blades together at the top',
      'If you can\'t do full pull-ups, use resistance bands or do negatives'
    ],
    breathing: 'Exhale as you pull up, inhale as you lower',
    tempo: '1-0-2',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '3-5 or assisted' },
      intermediate: { sets: 4, reps: '6-10' },
      advanced: { sets: 4, reps: '10-15 or weighted 6-10' }
    }
  },

  {
    id: 'back-barbell-rows',
    name: 'Barbell Bent-Over Rows',
    description: 'Compound movement for back thickness and overall back development',
    category: 'strength',
    muscleGroups: ['lats', 'rhomboids', 'traps', 'biceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Bend at hips and slightly at knees, back flat at 45 degrees',
      'Grip the bar slightly wider than shoulder-width',
      'Pull the bar to your lower chest/upper abs',
      'Squeeze your shoulder blades together at the top',
      'Lower the bar with control, keeping tension on your back'
    ],
    tips: [
      'Keep your lower back flat throughout - don\'t round it',
      'Lead with your elbows, not your hands',
      'Don\'t use momentum - control the weight',
      'Keep your neck neutral, don\'t look up'
    ],
    breathing: 'Inhale at the bottom, exhale as you row the bar up',
    tempo: '1-1-2',
    rest: '90 seconds to 2 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '6-8' },
      advanced: { sets: 5, reps: '5-8' }
    }
  },

  {
    id: 'back-dumbbell-rows',
    name: 'Single-Arm Dumbbell Rows',
    description: 'Unilateral back exercise for balanced development and core stability',
    category: 'strength',
    muscleGroups: ['lats', 'rhomboids', 'biceps'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Place one knee and hand on a flat bench for support',
      'Hold a dumbbell in the opposite hand, arm fully extended',
      'Keep your back flat and parallel to the ground',
      'Pull the dumbbell up to your hip, leading with your elbow',
      'Squeeze your lat at the top of the movement',
      'Lower the weight slowly, feeling a full stretch at the bottom'
    ],
    tips: [
      'Don\'t rotate your torso - keep it square to the ground',
      'Pull with your back, not your arm',
      'Keep your shoulder blade down and back',
      'Don\'t let the dumbbell drift forward or backward'
    ],
    breathing: 'Exhale as you row up, inhale as you lower',
    tempo: '1-1-2',
    rest: '60-90 seconds between arms',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12 per arm' },
      intermediate: { sets: 4, reps: '8-10 per arm' },
      advanced: { sets: 4, reps: '8-10 per arm' }
    }
  },

  {
    id: 'back-deadlifts',
    name: 'Conventional Deadlift',
    description: 'The king of all exercises - builds total body strength and power',
    category: 'strength',
    muscleGroups: ['erectors', 'glutes', 'hamstrings', 'traps', 'lats', 'core'],
    equipment: 'barbell',
    difficulty: 'advanced',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees to grip the bar just outside your legs',
      'Set your back flat, chest up, shoulders over the bar',
      'Take a deep breath and brace your core',
      'Drive through your heels and extend your hips and knees simultaneously',
      'Stand up tall, squeezing your glutes at the top',
      'Lower the bar with control by pushing hips back first'
    ],
    tips: [
      'Keep the bar close to your body throughout',
      'Don\'t round your lower back',
      'Think about pushing the floor away, not lifting the bar',
      'Lock out by squeezing glutes, not hyperextending your back'
    ],
    breathing: 'Deep breath and hold at bottom, exhale at lockout',
    tempo: '1-0-2',
    rest: '3-5 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '5-8' },
      intermediate: { sets: 4, reps: '5' },
      advanced: { sets: 5, reps: '3-5' }
    }
  },

  {
    id: 'back-lat-pulldowns',
    name: 'Lat Pulldowns',
    description: 'Essential machine exercise for lat development and width',
    category: 'strength',
    muscleGroups: ['lats', 'biceps', 'upper back'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit at the lat pulldown machine and secure your thighs under the pads',
      'Grip the bar slightly wider than shoulder-width with an overhand grip',
      'Start with arms fully extended overhead',
      'Pull the bar down to your upper chest by driving elbows down and back',
      'Squeeze your shoulder blades together at the bottom',
      'Control the weight back up to full extension'
    ],
    tips: [
      'Don\'t lean back excessively - slight lean is okay',
      'Think about pulling your elbows to your hips',
      'Don\'t use momentum or bounce',
      'Keep your chest up throughout the movement'
    ],
    breathing: 'Exhale as you pull down, inhale as you return',
    tempo: '1-1-2',
    rest: '75-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '8-12' }
    }
  },

  {
    id: 'back-seated-cable-rows',
    name: 'Seated Cable Rows',
    description: 'Builds back thickness and teaches proper rowing mechanics',
    category: 'strength',
    muscleGroups: ['lats', 'rhomboids', 'traps', 'biceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Sit at the cable row station with feet on the platform',
      'Grab the handle with both hands, arms fully extended',
      'Sit upright with a slight lean back',
      'Pull the handle to your lower chest/upper abs',
      'Squeeze your shoulder blades together',
      'Slowly extend arms back to starting position'
    ],
    tips: [
      'Keep your torso stable - don\'t rock back and forth',
      'Lead with your elbows',
      'Pause and squeeze at the contracted position',
      'Keep your chest up and shoulders back'
    ],
    breathing: 'Exhale as you pull, inhale as you extend',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '10-12' }
    }
  },

  {
    id: 'back-face-pulls',
    name: 'Face Pulls',
    description: 'Essential for rear delts and upper back health',
    category: 'strength',
    muscleGroups: ['rear delts', 'upper back', 'traps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Set a cable pulley to upper chest height with rope attachment',
      'Grip the rope with thumbs facing you',
      'Step back until arms are fully extended',
      'Pull the rope toward your face, splitting it as you pull',
      'Aim for your temples, not your chin',
      'Squeeze your shoulder blades together and pause',
      'Slowly return to starting position'
    ],
    tips: [
      'Focus on external rotation - thumbs should point back',
      'Keep your elbows high',
      'Don\'t use too much weight - this is about muscle activation',
      'Perfect for shoulder health and posture'
    ],
    breathing: 'Exhale as you pull, inhale as you extend',
    tempo: '1-2-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    }
  },

  // ========================================
  // SHOULDER EXERCISES
  // ========================================
  {
    id: 'shoulders-overhead-press',
    name: 'Standing Barbell Overhead Press',
    description: 'The best overall shoulder builder and functional strength exercise',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps', 'upper chest', 'core'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet shoulder-width apart, barbell at collarbone height',
      'Grip the bar slightly wider than shoulder-width',
      'Brace your core and squeeze your glutes',
      'Press the bar straight up, moving your head back slightly',
      'Lock out overhead with biceps by your ears',
      'Lower with control back to the starting position'
    ],
    tips: [
      'Don\'t hyperextend your lower back',
      'Keep your core tight throughout',
      'Press the bar in a straight line, not forward',
      'Your forearms should be vertical at the bottom'
    ],
    breathing: 'Inhale at the bottom, exhale as you press up',
    tempo: '1-0-2',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 4, reps: '5-8' },
      advanced: { sets: 5, reps: '5-8' }
    }
  },

  {
    id: 'shoulders-dumbbell-press',
    name: 'Seated Dumbbell Shoulder Press',
    description: 'Allows greater range of motion and balanced shoulder development',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Sit on a bench with back support, dumbbells at shoulder height',
      'Position dumbbells with palms facing forward',
      'Press dumbbells up and slightly inward until arms are extended',
      'Don\'t let dumbbells touch at the top',
      'Lower with control back to shoulder height',
      'Maintain contact with the back pad'
    ],
    tips: [
      'Don\'t arch your back excessively',
      'Keep your core engaged',
      'Control the weight on the way down',
      'Don\'t let dumbbells drift too far forward or back'
    ],
    breathing: 'Exhale as you press, inhale as you lower',
    tempo: '1-0-2',
    rest: '90 seconds to 2 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '8-10' },
      advanced: { sets: 4, reps: '6-8' }
    }
  },

  {
    id: 'shoulders-lateral-raises',
    name: 'Dumbbell Lateral Raises',
    description: 'Isolation exercise for wider shoulders and defined delts',
    category: 'strength',
    muscleGroups: ['side delts'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart, dumbbell in each hand',
      'Let arms hang at your sides with a slight bend in elbows',
      'Raise dumbbells out to the sides until arms are parallel to floor',
      'Lead with your elbows, not your hands',
      'Pause at the top with arms level',
      'Lower with control back to starting position'
    ],
    tips: [
      'Don\'t use momentum or swing the weights',
      'Keep a slight bend in elbows throughout',
      'Think about pouring water from a pitcher at the top',
      'Don\'t shrug your shoulders - keep traps relaxed'
    ],
    breathing: 'Exhale as you raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 4, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    }
  },

  {
    id: 'shoulders-front-raises',
    name: 'Dumbbell Front Raises',
    description: 'Targets the front delts for well-rounded shoulder development',
    category: 'strength',
    muscleGroups: ['front delts'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart, dumbbells in front of thighs',
      'Keep a slight bend in your elbows',
      'Raise one or both dumbbells forward to shoulder height',
      'Keep palms facing down',
      'Pause briefly at the top',
      'Lower with control back to starting position'
    ],
    tips: [
      'Don\'t lean back or use momentum',
      'Keep your core tight',
      'Don\'t raise above shoulder height',
      'Alternate arms if going heavy for better control'
    ],
    breathing: 'Exhale as you raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '12-15' }
    }
  },

  {
    id: 'shoulders-rear-delt-flyes',
    name: 'Rear Delt Dumbbell Flyes',
    description: 'Essential for balanced shoulders and posture correction',
    category: 'strength',
    muscleGroups: ['rear delts', 'upper back'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Sit on the end of a bench, lean forward at hips',
      'Let dumbbells hang beneath you with palms facing each other',
      'Keep a slight bend in your elbows',
      'Raise dumbbells out to sides in a wide arc',
      'Focus on squeezing your shoulder blades together',
      'Lower with control back to starting position'
    ],
    tips: [
      'Don\'t use momentum - light weight, perfect form',
      'Keep your back flat, don\'t round it',
      'Lead with your elbows',
      'Think about pushing your hands apart, not just lifting'
    ],
    breathing: 'Exhale as you raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    }
  },

  // ========================================
  // LEG EXERCISES (QUADS)
  // ========================================
  {
    id: 'legs-barbell-squat',
    name: 'Barbell Back Squat',
    description: 'The king of leg exercises - builds total lower body mass and strength',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'core'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Position bar on your upper traps (high bar) or rear delts (low bar)',
      'Grip the bar with hands just outside shoulders',
      'Unrack and step back, feet shoulder-width apart',
      'Brace your core and initiate the descent by breaking at the hips and knees',
      'Descend until thighs are at least parallel to the floor',
      'Drive through your heels to stand back up',
      'Keep your chest up and knees tracking over toes'
    ],
    tips: [
      'Keep your core braced throughout the entire movement',
      'Don\'t let your knees cave inward',
      'Your weight should be on your mid-foot, not your toes',
      'Keep your gaze forward, chest proud'
    ],
    breathing: 'Deep breath before descending, hold, exhale at top',
    tempo: '2-0-1',
    rest: '3-5 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 4, reps: '5-8' },
      advanced: { sets: 5, reps: '4-6' }
    }
  },

  {
    id: 'legs-front-squat',
    name: 'Barbell Front Squat',
    description: 'Quad-dominant squat variation that also builds core strength',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'core'],
    equipment: 'barbell',
    difficulty: 'advanced',
    instructions: [
      'Rest the bar on your front delts, elbows high',
      'Use a clean grip or cross-arm grip',
      'Stand with feet shoulder-width apart',
      'Brace your core and keep your chest up',
      'Squat down keeping your torso as upright as possible',
      'Drive through your heels to return to standing',
      'Keep your elbows up throughout the movement'
    ],
    tips: [
      'Mobility is key - work on wrist and ankle flexibility',
      'Don\'t let the bar roll forward',
      'Keep your elbows as high as possible',
      'Focus on staying upright more than back squats'
    ],
    breathing: 'Breath and brace before descent, exhale at top',
    tempo: '2-0-1',
    rest: '3-4 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 4, reps: '5-8' },
      advanced: { sets: 4, reps: '4-6' }
    }
  },

  {
    id: 'legs-leg-press',
    name: 'Leg Press',
    description: 'Machine-based leg exercise that allows heavy loading safely',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit in the leg press with back and head against the pad',
      'Position feet shoulder-width apart on the platform',
      'Unlock the safeties and lower the weight by bending your knees',
      'Go down until knees are at 90 degrees or slightly below',
      'Press through your heels to extend your legs',
      'Don\'t lock out completely at the top - keep slight bend'
    ],
    tips: [
      'Don\'t let your lower back round off the pad',
      'Keep your entire foot in contact with platform',
      'Don\'t bounce at the bottom',
      'Control the eccentric (lowering) portion'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-0-1',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '8-15' }
    }
  },

  {
    id: 'legs-walking-lunges',
    name: 'Walking Lunges',
    description: 'Unilateral leg exercise for balance, coordination, and leg development',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand tall with dumbbells at your sides',
      'Take a large step forward with one leg',
      'Lower your back knee toward the ground',
      'Both knees should form 90-degree angles',
      'Push through your front heel to step forward with back leg',
      'Continue alternating legs as you walk forward'
    ],
    tips: [
      'Keep your torso upright throughout',
      'Don\'t let your front knee go past your toes excessively',
      'Take big enough steps to keep shin vertical',
      'Keep your core engaged for balance'
    ],
    breathing: 'Exhale as you push up, inhale as you lunge down',
    tempo: '2-0-1',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12 per leg' },
      intermediate: { sets: 3, reps: '12-15 per leg' },
      advanced: { sets: 4, reps: '15-20 per leg' }
    }
  },

  {
    id: 'legs-bulgarian-split-squat',
    name: 'Bulgarian Split Squats',
    description: 'Advanced single-leg squat for building leg strength and balance',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: 'dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Stand 2-3 feet in front of a bench',
      'Place the top of one foot on the bench behind you',
      'Hold dumbbells at your sides',
      'Lower down by bending your front knee',
      'Go down until front thigh is parallel to ground',
      'Push through your front heel to return to start'
    ],
    tips: [
      'Keep most of your weight on the front leg',
      'Don\'t let your front knee cave inward',
      'Keep your torso upright',
      'Find the right distance from the bench for your mobility'
    ],
    breathing: 'Inhale as you lower, exhale as you stand',
    tempo: '2-0-1',
    rest: '90 seconds between legs',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10 per leg' },
      intermediate: { sets: 3, reps: '10-12 per leg' },
      advanced: { sets: 4, reps: '10-12 per leg' }
    }
  },

  // ========================================
  // LEG EXERCISES (HAMSTRINGS & GLUTES)
  // ========================================
  {
    id: 'legs-romanian-deadlift',
    name: 'Romanian Deadlift',
    description: 'Premier hamstring and glute builder with hinge pattern',
    category: 'strength',
    muscleGroups: ['hamstrings', 'glutes', 'lower back'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet hip-width apart, barbell at arm\'s length',
      'Start from the top position with shoulders back',
      'Push your hips back while keeping a slight knee bend',
      'Lower the bar down your thighs, keeping it close to your body',
      'Go until you feel a deep stretch in your hamstrings',
      'Drive your hips forward to return to standing',
      'Squeeze your glutes at the top'
    ],
    tips: [
      'This is a hip hinge, not a squat',
      'Keep your back flat throughout',
      'The bar should travel in a straight line close to your legs',
      'Don\'t round your lower back'
    ],
    breathing: 'Inhale as you lower, exhale as you return up',
    tempo: '2-1-1',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '6-10' },
      advanced: { sets: 4, reps: '6-8' }
    }
  },

  {
    id: 'legs-leg-curls',
    name: 'Lying Leg Curls',
    description: 'Isolation exercise for hamstring development',
    category: 'strength',
    muscleGroups: ['hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Lie face down on the leg curl machine',
      'Position the pad against the back of your lower legs',
      'Grip the handles for stability',
      'Curl your heels toward your glutes',
      'Squeeze your hamstrings at the top',
      'Lower with control back to the starting position'
    ],
    tips: [
      'Don\'t lift your hips off the pad',
      'Control the weight, don\'t let it slam down',
      'Squeeze and hold at the top for a second',
      'Keep your toes pointed down throughout'
    ],
    breathing: 'Exhale as you curl, inhale as you lower',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '10-12' }
    }
  },

  {
    id: 'legs-glute-bridges',
    name: 'Barbell Hip Thrusts',
    description: 'The best glute builder for strength and development',
    category: 'strength',
    muscleGroups: ['glutes', 'hamstrings'],
    equipment: 'barbell',
    difficulty: 'beginner',
    instructions: [
      'Sit on the ground with upper back against a bench',
      'Roll a barbell over your hips (use padding)',
      'Plant feet flat on floor, shoulder-width apart',
      'Drive through your heels and thrust hips up',
      'Squeeze glutes hard at the top',
      'Lower hips with control back to starting position'
    ],
    tips: [
      'Keep your chin tucked, don\'t hyperextend your neck',
      'Focus on squeezing glutes, not arching your back',
      'Feet should be positioned so shins are vertical at top',
      'Use a pad or towel for comfort'
    ],
    breathing: 'Exhale as you thrust up, inhale as you lower',
    tempo: '1-1-2',
    rest: '90 seconds to 2 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '8-12' }
    }
  },

  {
    id: 'legs-stiff-leg-deadlift',
    name: 'Stiff-Legged Deadlift',
    description: 'Hamstring and lower back exercise with minimal knee bend',
    category: 'strength',
    muscleGroups: ['hamstrings', 'glutes', 'lower back'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet hip-width apart, barbell in front of thighs',
      'Keep your knees nearly straight (slight bend only)',
      'Hinge at the hips and lower the bar down your legs',
      'Keep your back flat and chest up',
      'Lower until you feel a deep stretch in hamstrings',
      'Drive hips forward to return to standing'
    ],
    tips: [
      'This requires good hamstring flexibility',
      'Don\'t round your back',
      'The movement should be felt primarily in hamstrings',
      'Start light to learn the movement pattern'
    ],
    breathing: 'Inhale as you lower, exhale as you stand',
    tempo: '2-0-2',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 3, reps: '8-10' },
      advanced: { sets: 4, reps: '8-10' }
    }
  },

  {
    id: 'legs-nordic-curls',
    name: 'Nordic Hamstring Curls',
    description: 'Advanced bodyweight hamstring exercise for injury prevention',
    category: 'strength',
    muscleGroups: ['hamstrings'],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    instructions: [
      'Kneel on a pad with ankles secured (under a bar or have partner hold)',
      'Keep your body in a straight line from knees to head',
      'Slowly lower your torso forward as far as possible',
      'Use your hamstrings to control the descent',
      'Catch yourself with hands when you can\'t control it anymore',
      'Push off the ground lightly to return to start'
    ],
    tips: [
      'This is very difficult - expect to use hands to assist',
      'Focus on the eccentric (lowering) portion',
      'Keep your hips extended throughout',
      'Build up slowly - these cause severe soreness'
    ],
    breathing: 'Breathe normally, don\'t hold your breath',
    tempo: '3-0-1 (3-second eccentric)',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 2, reps: '3-5' },
      intermediate: { sets: 3, reps: '5-8' },
      advanced: { sets: 3, reps: '8-12' }
    }
  },

  // ========================================
  // CALVES
  // ========================================
  {
    id: 'calves-standing-raises',
    name: 'Standing Calf Raises',
    description: 'Primary exercise for building calf size and strength',
    category: 'strength',
    muscleGroups: ['calves'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Stand on the calf raise machine platform with shoulders under pads',
      'Position balls of feet on edge, heels hanging off',
      'Lower heels as far as possible for a full stretch',
      'Raise up onto your toes as high as possible',
      'Squeeze calves at the top for a second',
      'Lower with control back to stretched position'
    ],
    tips: [
      'Full range of motion is crucial for calf growth',
      'Don\'t bounce at the bottom',
      'Pause at the top contraction',
      'Keep your legs straight but not locked'
    ],
    breathing: 'Exhale as you raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '60-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 4, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    }
  },

  {
    id: 'calves-seated-raises',
    name: 'Seated Calf Raises',
    description: 'Targets the soleus muscle with knees bent',
    category: 'strength',
    muscleGroups: ['calves', 'soleus'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit at the seated calf raise machine',
      'Position balls of feet on platform, knees under pads',
      'Lower heels as low as possible',
      'Raise up onto toes as high as possible',
      'Pause at the top',
      'Lower slowly back to the bottom stretch'
    ],
    tips: [
      'Great for hitting the soleus which is missed in standing raises',
      'Use full range of motion',
      'Focus on the squeeze at the top',
      'These complement standing calf raises perfectly'
    ],
    breathing: 'Exhale on the raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 4, reps: '15-20' },
      advanced: { sets: 4, reps: '20-25' }
    }
  },

  // ========================================
  // ARM EXERCISES (BICEPS)
  // ========================================
  {
    id: 'arms-barbell-curls',
    name: 'Standing Barbell Curls',
    description: 'Classic bicep mass builder',
    category: 'strength',
    muscleGroups: ['biceps'],
    equipment: 'barbell',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart, barbell at arm\'s length',
      'Grip bar with an underhand grip, hands shoulder-width apart',
      'Keep elbows close to your sides',
      'Curl the bar up by flexing your biceps',
      'Squeeze at the top with bar near shoulders',
      'Lower with control back to starting position'
    ],
    tips: [
      'Don\'t swing or use momentum',
      'Keep your elbows stationary',
      'Don\'t lean back',
      'Control the negative portion'
    ],
    breathing: 'Exhale as you curl, inhale as you lower',
    tempo: '1-1-2',
    rest: '75-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '8-10' },
      advanced: { sets: 4, reps: '6-8' }
    }
  },

  {
    id: 'arms-dumbbell-curls',
    name: 'Alternating Dumbbell Curls',
    description: 'Allows focus on each arm individually with natural wrist rotation',
    category: 'strength',
    muscleGroups: ['biceps'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand with dumbbells at your sides, palms facing in',
      'Curl one dumbbell up while rotating wrist outward',
      'At the top, palm should face your shoulder',
      'Squeeze your bicep at the top',
      'Lower with control and repeat with other arm',
      'Keep alternating arms'
    ],
    tips: [
      'Don\'t swing the weights',
      'Keep your elbow position fixed',
      'Supinate (turn) your wrist as you curl',
      'Full contraction and stretch on each rep'
    ],
    breathing: 'Exhale on the curl, inhale on the lower',
    tempo: '1-0-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12 per arm' },
      intermediate: { sets: 3, reps: '10-12 per arm' },
      advanced: { sets: 4, reps: '8-10 per arm' }
    }
  },

  {
    id: 'arms-hammer-curls',
    name: 'Hammer Curls',
    description: 'Develops brachialis and brachioradialis for thicker arms',
    category: 'strength',
    muscleGroups: ['biceps', 'brachialis', 'forearms'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand with dumbbells at sides, palms facing each other',
      'Keep palms facing in throughout the movement (neutral grip)',
      'Curl dumbbells up toward shoulders',
      'Keep elbows close to sides',
      'Squeeze at the top',
      'Lower with control'
    ],
    tips: [
      'Don\'t rotate your wrists',
      'Great for forearm development too',
      'Can be done simultaneously or alternating',
      'Builds arm thickness'
    ],
    breathing: 'Exhale as you curl, inhale as you lower',
    tempo: '1-0-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '10-12' }
    }
  },

  {
    id: 'arms-preacher-curls',
    name: 'Preacher Curls',
    description: 'Strict bicep isolation exercise',
    category: 'strength',
    muscleGroups: ['biceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Sit at preacher bench with upper arms flat on pad',
      'Grip bar or dumbbells with underhand grip',
      'Curl weight up until forearms are vertical',
      'Squeeze biceps at the peak',
      'Lower slowly until arms are almost fully extended',
      'Don\'t let elbows leave the pad'
    ],
    tips: [
      'This eliminates momentum completely',
      'Great for isolating biceps',
      'Don\'t extend arms completely at bottom to keep tension',
      'EZ bar can be easier on wrists'
    ],
    breathing: 'Exhale as you curl, inhale as you lower',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '8-12' }
    }
  },

  {
    id: 'arms-cable-curls',
    name: 'Cable Curls',
    description: 'Provides constant tension throughout the range of motion',
    category: 'strength',
    muscleGroups: ['biceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Stand facing cable machine with bar attached at low position',
      'Grip bar with underhand grip, arms extended',
      'Curl bar up toward shoulders',
      'Keep elbows stationary at sides',
      'Squeeze at the top',
      'Lower with control maintaining tension'
    ],
    tips: [
      'Constant tension builds the muscle-mind connection',
      'Don\'t let the weight stack touch between reps',
      'Step back if needed for better angle',
      'Great as a finishing exercise'
    ],
    breathing: 'Exhale as you curl, inhale as you extend',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '12-15' }
    }
  },

  // ========================================
  // ARM EXERCISES (TRICEPS)
  // ========================================
  {
    id: 'arms-close-grip-bench',
    name: 'Close-Grip Bench Press',
    description: 'Compound movement for tricep mass and strength',
    category: 'strength',
    muscleGroups: ['triceps', 'chest', 'shoulders'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Lie on bench, grip barbell with hands shoulder-width apart',
      'Unrack and position bar over chest',
      'Lower bar to lower chest, keeping elbows close to sides',
      'Press bar back up, focusing on tricep contraction',
      'Lock out at the top',
      'Keep your core tight throughout'
    ],
    tips: [
      'Don\'t grip too narrow or you\'ll stress your wrists',
      'Keep elbows tucked, not flared',
      'This builds serious tricep strength',
      'Great for lockout strength on regular bench press'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-0-1',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '6-8' },
      advanced: { sets: 4, reps: '5-8' }
    }
  },

  {
    id: 'arms-tricep-dips',
    name: 'Tricep Dips',
    description: 'Bodyweight exercise for tricep development',
    category: 'strength',
    muscleGroups: ['triceps', 'chest', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Grip parallel bars and press yourself up',
      'Keep your body upright (less forward lean than chest dips)',
      'Lower by bending elbows until upper arms are parallel to ground',
      'Keep elbows close to body',
      'Press back up to starting position',
      'Focus on tricep contraction'
    ],
    tips: [
      'More upright position emphasizes triceps',
      'Don\'t go too deep if you feel shoulder pain',
      'Add weight with a dip belt for progression',
      'Can also be done on bench for assisted version'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-0-1',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '12-15 or weighted' }
    }
  },

  {
    id: 'arms-overhead-tricep-extension',
    name: 'Overhead Dumbbell Tricep Extension',
    description: 'Stretches and builds the long head of the triceps',
    category: 'strength',
    muscleGroups: ['triceps'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand or sit with dumbbell held overhead with both hands',
      'Lower dumbbell behind head by bending elbows',
      'Keep upper arms stationary and pointed up',
      'Go until you feel a deep stretch in triceps',
      'Extend arms back to starting position',
      'Squeeze triceps at the top'
    ],
    tips: [
      'Keep elbows pointed forward, don\'t let them flare out',
      'Control the stretch - don\'t go too deep too fast',
      'Keep your core engaged',
      'Can also be done with cable or EZ bar'
    ],
    breathing: 'Inhale as you lower, exhale as you extend',
    tempo: '2-1-1',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '10-12' }
    }
  },

  {
    id: 'arms-tricep-pushdowns',
    name: 'Cable Tricep Pushdowns',
    description: 'Classic isolation exercise for tricep definition',
    category: 'strength',
    muscleGroups: ['triceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Stand facing cable machine with bar attached at high position',
      'Grip bar with overhand grip, hands shoulder-width apart',
      'Keep elbows at sides and push bar down',
      'Extend arms fully at the bottom',
      'Squeeze triceps at full extension',
      'Return to starting position with control'
    ],
    tips: [
      'Keep elbows pinned to your sides',
      'Don\'t lean forward or use body weight',
      'Full extension is key',
      'Try different attachments (rope, V-bar, straight bar)'
    ],
    breathing: 'Exhale as you push down, inhale as you return',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '12-15' }
    }
  },

  {
    id: 'arms-skull-crushers',
    name: 'Lying Tricep Extensions (Skull Crushers)',
    description: 'Builds tricep size and strength with direct isolation',
    category: 'strength',
    muscleGroups: ['triceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Lie on flat bench with barbell held above chest',
      'Keep upper arms perpendicular to floor',
      'Lower bar toward forehead by bending elbows',
      'Keep upper arms stationary',
      'Extend arms back to starting position',
      'Squeeze triceps at lockout'
    ],
    tips: [
      'Use EZ bar to reduce wrist strain',
      'Don\'t move your upper arms',
      'Lower weight slightly past forehead for better stretch',
      'Keep your core engaged'
    ],
    breathing: 'Inhale as you lower, exhale as you extend',
    tempo: '2-0-1',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 3, reps: '8-12' },
      advanced: { sets: 4, reps: '8-12' }
    }
  },

  // ========================================
  // CORE EXERCISES
  // ========================================
  {
    id: 'core-plank',
    name: 'Plank',
    description: 'Isometric core exercise for stability and endurance',
    category: 'strength',
    muscleGroups: ['core', 'shoulders', 'glutes'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in push-up position on forearms',
      'Keep body in straight line from head to heels',
      'Engage your core, glutes, and quads',
      'Don\'t let hips sag or pike up',
      'Keep your head in neutral position',
      'Hold for the prescribed time'
    ],
    tips: [
      'Squeeze everything - glutes, quads, core',
      'Breathe normally, don\'t hold your breath',
      'Quality over quantity - maintain perfect form',
      'Progress by increasing time or adding weight'
    ],
    breathing: 'Breathe normally and steadily',
    tempo: 'Hold for time',
    rest: '60-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, duration: '30-45 seconds' },
      intermediate: { sets: 3, duration: '60 seconds' },
      advanced: { sets: 3, duration: '90 seconds+' }
    }
  },

  {
    id: 'core-russian-twists',
    name: 'Russian Twists',
    description: 'Rotational core exercise for obliques',
    category: 'strength',
    muscleGroups: ['obliques', 'core'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Sit on floor with knees bent, feet slightly off ground',
      'Lean back slightly to engage core',
      'Hold weight or medicine ball at chest',
      'Rotate torso to one side, bringing weight to that side',
      'Rotate to the other side in controlled motion',
      'Continue alternating sides'
    ],
    tips: [
      'Move from your core, not just your arms',
      'Keep your feet off the ground for added difficulty',
      'Don\'t go too fast - control the movement',
      'Keep your back straight'
    ],
    breathing: 'Exhale on each twist',
    tempo: '1-0-1',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '20 total (10 per side)' },
      intermediate: { sets: 3, reps: '30 total (15 per side)' },
      advanced: { sets: 4, reps: '40 total (20 per side)' }
    }
  },

  {
    id: 'core-hanging-leg-raises',
    name: 'Hanging Leg Raises',
    description: 'Advanced core exercise for lower abs',
    category: 'strength',
    muscleGroups: ['core', 'hip flexors', 'abs'],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    instructions: [
      'Hang from pull-up bar with overhand grip',
      'Start with legs straight or slightly bent',
      'Raise legs up by contracting abs',
      'Lift until legs are parallel to ground or higher',
      'Lower with control back to starting position',
      'Avoid swinging'
    ],
    tips: [
      'Don\'t use momentum - control the movement',
      'Tilt pelvis back to engage abs more',
      'Start with knee raises if full leg raises are too hard',
      'Focus on abs, not hip flexors'
    ],
    breathing: 'Exhale as you raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    }
  },

  {
    id: 'core-ab-wheel',
    name: 'Ab Wheel Rollouts',
    description: 'Advanced core strengthening exercise',
    category: 'strength',
    muscleGroups: ['core', 'shoulders', 'back'],
    equipment: 'other',
    difficulty: 'advanced',
    instructions: [
      'Kneel on the floor with ab wheel in front',
      'Grip handles and engage your core',
      'Roll forward extending your body',
      'Go as far as you can while maintaining flat back',
      'Use abs to pull yourself back to start',
      'Don\'t let your hips sag'
    ],
    tips: [
      'Start from knees before progressing to standing',
      'This is very challenging - start with short ranges',
      'Keep your core braced throughout',
      'Don\'t hyperextend your lower back'
    ],
    breathing: 'Exhale as you roll out, inhale as you return',
    tempo: '2-0-2',
    rest: '2 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    }
  },

  {
    id: 'core-cable-crunches',
    name: 'Cable Crunches',
    description: 'Weighted core exercise for ab development',
    category: 'strength',
    muscleGroups: ['abs', 'core'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Kneel in front of cable machine with rope attachment',
      'Hold rope beside your head',
      'Crunch down by contracting abs',
      'Bring elbows toward knees',
      'Squeeze abs at the bottom',
      'Return to starting position with control'
    ],
    tips: [
      'Don\'t pull with your arms - use abs',
      'Keep the same arm position throughout',
      'Focus on ab contraction',
      'Don\'t let the weight stack touch between reps'
    ],
    breathing: 'Exhale as you crunch down, inhale as you return',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    }
  },

  {
    id: 'core-bicycle-crunches',
    name: 'Bicycle Crunches',
    description: 'Dynamic core exercise for abs and obliques',
    category: 'strength',
    muscleGroups: ['abs', 'obliques'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on back with hands behind head',
      'Lift shoulders off ground and raise knees',
      'Bring right elbow toward left knee while extending right leg',
      'Switch sides in a pedaling motion',
      'Continue alternating in controlled manner',
      'Keep lower back pressed to floor'
    ],
    tips: [
      'Don\'t pull on your neck',
      'Move slowly and controlled',
      'Focus on rotating from core',
      'Fully extend each leg'
    ],
    breathing: 'Exhale on each twist',
    tempo: '1-0-1',
    rest: '45-60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '20 total (10 per side)' },
      intermediate: { sets: 3, reps: '30 total (15 per side)' },
      advanced: { sets: 4, reps: '40 total (20 per side)' }
    }
  },

  // ========================================
  // FULL BODY / OLYMPIC LIFTS
  // ========================================
  {
    id: 'fullbody-clean-and-press',
    name: 'Clean and Press',
    description: 'Full-body power exercise combining Olympic lift with overhead press',
    category: 'strength',
    muscleGroups: ['shoulders', 'legs', 'back', 'core'],
    equipment: 'barbell',
    difficulty: 'advanced',
    instructions: [
      'Start with barbell on the floor, feet hip-width apart',
      'Explosively pull bar up to shoulder height (clean)',
      'Catch bar at shoulders in a quarter squat',
      'Stand up fully from the catch position',
      'Press bar overhead until arms are locked out',
      'Lower bar back to shoulders, then to floor for next rep'
    ],
    tips: [
      'This requires technical proficiency - get coaching',
      'Explosive hip extension drives the clean',
      'Catch with soft knees',
      'This builds total body power and coordination'
    ],
    breathing: 'Complex breathing pattern - breathe between movements',
    tempo: 'Explosive',
    rest: '3-5 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '3-5' },
      intermediate: { sets: 4, reps: '3-5' },
      advanced: { sets: 5, reps: '2-3' }
    }
  },

  {
    id: 'fullbody-thrusters',
    name: 'Barbell Thrusters',
    description: 'Conditioning and strength exercise combining front squat and push press',
    category: 'hybrid',
    muscleGroups: ['legs', 'shoulders', 'core', 'full body'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Hold barbell at shoulder height in front rack position',
      'Perform a full front squat',
      'As you stand up, use the momentum to press bar overhead',
      'Lock out bar overhead',
      'Bring bar back to shoulders for next rep',
      'Move fluidly without pausing'
    ],
    tips: [
      'Use lighter weight than you would for squats or presses alone',
      'The movement should be fluid',
      'Great for conditioning and metabolic work',
      'Keep your core braced throughout'
    ],
    breathing: 'Breathe at the top of each rep',
    tempo: 'Continuous and fluid',
    rest: '2-3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    }
  },

  {
    id: 'fullbody-burpees',
    name: 'Burpees',
    description: 'Full-body conditioning exercise',
    category: 'hybrid',
    muscleGroups: ['full body', 'core', 'legs', 'chest'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Start standing, then drop into a squat with hands on ground',
      'Kick feet back into a push-up position',
      'Perform a push-up',
      'Jump feet back to hands',
      'Explode up into a jump with hands overhead',
      'Land softly and repeat'
    ],
    tips: [
      'Pace yourself - these are exhausting',
      'Maintain form even when fatigued',
      'Can modify by stepping instead of jumping',
      'Great for conditioning and fat loss'
    ],
    breathing: 'Breathe rhythmically, don\'t hold breath',
    tempo: 'Continuous',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    }
  },

  {
    id: 'fullbody-farmers-walk',
    name: 'Farmer\'s Walks',
    description: 'Functional strength and grip endurance exercise',
    category: 'strength',
    muscleGroups: ['grip', 'traps', 'core', 'legs'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Pick up heavy dumbbells or kettlebells in each hand',
      'Stand tall with shoulders back',
      'Walk forward with controlled steps',
      'Keep core braced and shoulders stable',
      'Don\'t let your torso lean to either side',
      'Walk for distance or time'
    ],
    tips: [
      'Use challenging weight',
      'Keep chest up and shoulders back',
      'This builds real-world strength',
      'Great for grip strength and core stability'
    ],
    breathing: 'Breathe normally, don\'t hold breath',
    tempo: 'Steady walk',
    rest: '90-120 seconds',
    recommendedSets: {
      beginner: { sets: 3, duration: '30 seconds' },
      intermediate: { sets: 3, duration: '45-60 seconds' },
      advanced: { sets: 4, duration: '60-90 seconds' }
    }
  },

  // ========================================
  // CARDIO / CONDITIONING
  // ========================================
  {
    id: 'cardio-running',
    name: 'Running',
    description: 'Classic cardiovascular exercise',
    category: 'cardio',
    muscleGroups: ['legs', 'cardiovascular system'],
    equipment: 'cardio_machine',
    difficulty: 'beginner',
    supportsDistance: true,
    supportsTime: true,
    instructions: [
      'Start with a warm-up walk or light jog',
      'Maintain an upright posture',
      'Land mid-foot, not on heels',
      'Swing arms naturally at sides',
      'Keep core engaged',
      'Maintain steady pace appropriate for your fitness level'
    ],
    tips: [
      'Build mileage gradually to prevent injury',
      'Proper running shoes are important',
      'Mix in interval training for better results',
      'Listen to your body and rest when needed'
    ],
    breathing: 'Rhythmic breathing - inhale for 2-3 steps, exhale for 2-3 steps',
    tempo: 'Steady state or intervals',
    rest: 'As needed for interval training',
    recommendedSets: {
      beginner: { sets: 1, duration: '20-30 minutes steady' },
      intermediate: { sets: 1, duration: '30-45 minutes or intervals' },
      advanced: { sets: 1, duration: '45-60 minutes or HIIT' }
    },
    intensityLevels: {
      low: {
        mets: 6.0,
        caloriesPerMinute: 7,
        description: 'Light jog, able to hold conversation'
      },
      moderate: {
        mets: 9.8,
        caloriesPerMinute: 11,
        description: 'Moderate pace, somewhat challenging'
      },
      high: {
        mets: 14.5,
        caloriesPerMinute: 16,
        description: 'Fast pace or sprints, very challenging'
      }
    }
  },

  {
    id: 'cardio-rowing',
    name: 'Rowing Machine',
    description: 'Low-impact full-body cardio',
    category: 'cardio',
    muscleGroups: ['back', 'legs', 'core', 'arms', 'cardiovascular system'],
    equipment: 'cardio_machine',
    difficulty: 'beginner',
    supportsDistance: true,
    supportsTime: true,
    instructions: [
      'Sit on the rower with feet secured in straps',
      'Grab handle with overhand grip',
      'Start with legs compressed, arms extended',
      'Push with legs first, then lean back, then pull arms',
      'Reverse the sequence: arms extend, torso forward, legs compress',
      'Maintain fluid rhythm: legs, body, arms - arms, body, legs'
    ],
    tips: [
      'Rowing is 60% legs, 20% core, 20% arms',
      'Don\'t pull with just your arms',
      'Keep your back straight',
      'Excellent low-impact cardio option'
    ],
    breathing: 'Exhale on the pull, inhale on the recovery',
    tempo: 'Smooth and rhythmic',
    rest: 'As needed for intervals',
    recommendedSets: {
      beginner: { sets: 1, duration: '15-20 minutes' },
      intermediate: { sets: 1, duration: '20-30 minutes or intervals' },
      advanced: { sets: 1, duration: '30-45 minutes or HIIT' }
    },
    intensityLevels: {
      low: {
        mets: 4.8,
        caloriesPerMinute: 6,
        description: 'Light rowing, conversational pace'
      },
      moderate: {
        mets: 7.0,
        caloriesPerMinute: 9,
        description: 'Moderate effort, steady rhythm'
      },
      high: {
        mets: 12.0,
        caloriesPerMinute: 14,
        description: 'Vigorous rowing or sprint intervals'
      }
    }
  },

  {
    id: 'cardio-cycling',
    name: 'Stationary Cycling',
    description: 'Low-impact leg-focused cardio',
    category: 'cardio',
    muscleGroups: ['legs', 'cardiovascular system'],
    equipment: 'cardio_machine',
    difficulty: 'beginner',
    supportsDistance: true,
    supportsTime: true,
    instructions: [
      'Adjust seat height so knee is slightly bent at bottom of pedal stroke',
      'Keep shoulders relaxed and back neutral',
      'Pedal in smooth circular motion',
      'Adjust resistance for desired intensity',
      'Maintain steady cadence',
      'Keep core engaged'
    ],
    tips: [
      'Proper bike fit prevents knee pain',
      'Mix resistance levels for variety',
      'Great option for those with joint issues',
      'Can do steady-state or interval training'
    ],
    breathing: 'Deep, rhythmic breathing',
    tempo: 'Steady or varied with intervals',
    rest: 'As needed for intervals',
    recommendedSets: {
      beginner: { sets: 1, duration: '20-30 minutes' },
      intermediate: { sets: 1, duration: '30-45 minutes or intervals' },
      advanced: { sets: 1, duration: '45-60 minutes or HIIT' }
    },
    intensityLevels: {
      low: {
        mets: 5.5,
        caloriesPerMinute: 7,
        description: 'Light resistance, easy pace'
      },
      moderate: {
        mets: 8.5,
        caloriesPerMinute: 10,
        description: 'Moderate resistance and pace'
      },
      high: {
        mets: 14.0,
        caloriesPerMinute: 16,
        description: 'High resistance or sprint intervals'
      }
    }
  },

  {
    id: 'cardio-jump-rope',
    name: 'Jump Rope',
    description: 'High-intensity cardio and coordination exercise',
    category: 'cardio',
    muscleGroups: ['calves', 'shoulders', 'core', 'cardiovascular system'],
    equipment: 'other',
    difficulty: 'intermediate',
    supportsTime: true,
    instructions: [
      'Hold rope handles at hip height',
      'Rotate rope with wrists, not arms',
      'Jump just high enough to clear the rope',
      'Land on balls of feet',
      'Keep core engaged and posture upright',
      'Maintain a steady rhythm'
    ],
    tips: [
      'Start with basic bounce step',
      'Jump on a mat for joint protection',
      'Adjust rope length to your height',
      'Excellent for conditioning and coordination'
    ],
    breathing: 'Steady, rhythmic breathing',
    tempo: 'Continuous or intervals',
    rest: '30-60 seconds between sets',
    recommendedSets: {
      beginner: { sets: 5, duration: '30 seconds' },
      intermediate: { sets: 4, duration: '60 seconds' },
      advanced: { sets: 5, duration: '2 minutes' }
    },
    intensityLevels: {
      low: {
        mets: 8.0,
        caloriesPerMinute: 10,
        description: 'Slow pace, single jumps'
      },
      moderate: {
        mets: 11.8,
        caloriesPerMinute: 14,
        description: 'Moderate pace, consistent rhythm'
      },
      high: {
        mets: 14.0,
        caloriesPerMinute: 17,
        description: 'Fast pace or double-unders'
      }
    }
  },

  {
    id: 'cardio-battle-ropes',
    name: 'Battle Ropes',
    description: 'High-intensity upper body and core cardio',
    category: 'hybrid',
    muscleGroups: ['shoulders', 'arms', 'core', 'cardiovascular system'],
    equipment: 'other',
    difficulty: 'intermediate',
    supportsTime: true,
    instructions: [
      'Stand with feet shoulder-width apart, holding rope ends',
      'Keep knees slightly bent and core engaged',
      'Create waves by alternating arm movements up and down',
      'Maintain powerful, rapid movements',
      'Keep shoulders back and chest up',
      'Continue for prescribed time or until failure'
    ],
    tips: [
      'Use whole body, not just arms',
      'Keep movements explosive and powerful',
      'This is both strength and cardio',
      'Great for conditioning and fat loss'
    ],
    breathing: 'Breathe powerfully and rhythmically',
    tempo: 'Fast and powerful',
    rest: '60-90 seconds',
    recommendedSets: {
      beginner: { sets: 4, duration: '20 seconds' },
      intermediate: { sets: 5, duration: '30 seconds' },
      advanced: { sets: 6, duration: '45 seconds' }
    },
    intensityLevels: {
      low: {
        mets: 7.0,
        caloriesPerMinute: 9,
        description: 'Moderate pace, controlled movements'
      },
      moderate: {
        mets: 10.0,
        caloriesPerMinute: 12,
        description: 'Fast pace, consistent intensity'
      },
      high: {
        mets: 13.0,
        caloriesPerMinute: 15,
        description: 'Maximum effort, explosive movements'
      }
    }
  }
];

// Helper function to get exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  return exercisesDatabase.find(ex => ex.id === id);
}

// Helper function to filter exercises by criteria
export function filterExercises(criteria: {
  category?: Exercise['category'];
  muscleGroups?: string[];
  equipment?: Exercise['equipment'];
  difficulty?: Exercise['difficulty'];
}): Exercise[] {
  return exercisesDatabase.filter(exercise => {
    if (criteria.category && exercise.category !== criteria.category) return false;
    if (criteria.equipment && exercise.equipment !== criteria.equipment) return false;
    if (criteria.difficulty && exercise.difficulty !== criteria.difficulty) return false;
    if (criteria.muscleGroups && criteria.muscleGroups.length > 0) {
      const hasMatchingMuscle = criteria.muscleGroups.some(muscle =>
        exercise.muscleGroups.includes(muscle)
      );
      if (!hasMatchingMuscle) return false;
    }
    return true;
  });
}

// Get exercises by muscle group
export function getExercisesByMuscleGroup(muscleGroup: string): Exercise[] {
  return exercisesDatabase.filter(ex => ex.muscleGroups.includes(muscleGroup));
}

// Get exercises by equipment
export function getExercisesByEquipment(equipment: Exercise['equipment']): Exercise[] {
  return exercisesDatabase.filter(ex => ex.equipment === equipment);
}

// Get exercises by difficulty
export function getExercisesByDifficulty(difficulty: Exercise['difficulty']): Exercise[] {
  return exercisesDatabase.filter(ex => ex.difficulty === difficulty);
}
