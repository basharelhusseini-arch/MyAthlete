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
  },
  
  // ========================================
  // PLYOMETRIC & EXPLOSIVE EXERCISES
  // ========================================
  {
    id: 'plyo-box-jumps',
    name: 'Box Jumps',
    description: 'Explosive lower body power - jump onto an elevated platform',
    category: 'plyometric',
    muscleGroups: ['quads', 'glutes', 'calves'],
    equipment: 'other',
    difficulty: 'intermediate',
    instructions: [
      'Stand facing a sturdy box or platform (start with 12-24 inches)',
      'Perform a quarter squat and swing arms back',
      'Explode upward, swinging arms forward',
      'Land softly on the box with both feet',
      'Stand up fully, then step down carefully',
      'Reset and repeat - focus on quality over speed'
    ],
    tips: [
      'Land quietly with soft knees',
      'Full hip extension at takeoff',
      'Step down - don\'t jump down',
      'Rest fully between reps for max power'
    ],
    breathing: 'Exhale forcefully on takeoff',
    tempo: 'Explosive',
    rest: '60-90 seconds between sets',
    recommendedSets: {
      beginner: { sets: 3, reps: '5' },
      intermediate: { sets: 4, reps: '6' },
      advanced: { sets: 5, reps: '8' }
    }
  },
  
  {
    id: 'plyo-broad-jumps',
    name: 'Broad Jumps',
    description: 'Horizontal explosive power - jump for maximum distance',
    category: 'plyometric',
    muscleGroups: ['quads', 'glutes', 'hamstrings', 'calves'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Perform a quarter squat and swing arms back',
      'Explode forward, swinging arms aggressively',
      'Drive hips and knees forward',
      'Land softly with knees bent, absorbing force',
      'Stick the landing before next rep'
    ],
    tips: [
      'Focus on distance, not height',
      'Aggressive arm swing',
      'Stick each landing for 2 seconds',
      'Full body explosion'
    ],
    breathing: 'Big breath in, explode on exhale',
    tempo: 'Explosive',
    rest: '45-60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '5' },
      intermediate: { sets: 4, reps: '6' },
      advanced: { sets: 5, reps: '8' }
    }
  },
  
  {
    id: 'plyo-depth-jumps',
    name: 'Depth Jumps',
    description: 'Advanced reactive power - step off box and immediately jump',
    category: 'plyometric',
    muscleGroups: ['quads', 'glutes', 'calves'],
    equipment: 'other',
    difficulty: 'advanced',
    instructions: [
      'Stand on a box (12-18 inches)',
      'Step off (don\'t jump off)',
      'Land on both feet',
      'Immediately explode upward as high as possible',
      'Minimize ground contact time',
      'Land softly and reset'
    ],
    tips: [
      'Minimal ground contact time is key',
      'Don\'t sink into deep squat - be reactive',
      'Start with low boxes',
      'This is advanced - master box jumps first'
    ],
    breathing: 'Quick exhale on rebound',
    tempo: 'Reactive',
    rest: '90-120 seconds (full recovery)',
    recommendedSets: {
      beginner: { sets: 0, reps: '0' },
      intermediate: { sets: 3, reps: '4' },
      advanced: { sets: 4, reps: '5' }
    }
  },
  
  {
    id: 'plyo-bounding',
    name: 'Bounding',
    description: 'Exaggerated running strides for power development',
    category: 'plyometric',
    muscleGroups: ['quads', 'glutes', 'hamstrings', 'calves'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Start with a short jog',
      'Transition to exaggerated running strides',
      'Drive knee high and extend opposite leg fully',
      'Maximize air time and distance per stride',
      'Powerful arm drive opposite to lead leg',
      'Land and immediately drive into next bound'
    ],
    tips: [
      'Exaggerate height and distance',
      'Powerful arm drive',
      'Quick ground contacts',
      'Progress from 20m to 40m'
    ],
    breathing: 'Rhythmic and powerful',
    tempo: 'Explosive',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '20m' },
      intermediate: { sets: 4, reps: '30m' },
      advanced: { sets: 5, reps: '40m' }
    }
  },
  
  {
    id: 'sprint-acceleration-10m',
    name: '10m Acceleration Sprints',
    description: 'Maximum acceleration from standing start',
    category: 'plyometric',
    muscleGroups: ['quads', 'glutes', 'calves'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in athletic stance or sprint start position',
      'Drive hard out of stance - 45-degree body angle',
      'Powerful arm drive',
      'Maximum effort for 10 meters',
      'Decelerate smoothly after mark',
      'Walk back and recover fully'
    ],
    tips: [
      'First 3 steps are critical',
      'Stay low - don\'t pop up too early',
      'Aggressive arm drive',
      'Full recovery between reps (2-3 min)'
    ],
    breathing: 'Hold breath during sprint',
    tempo: 'Maximum effort',
    rest: '2-3 minutes (full recovery)',
    recommendedSets: {
      beginner: { sets: 4, reps: '4' },
      intermediate: { sets: 5, reps: '5' },
      advanced: { sets: 6, reps: '6' }
    }
  },
  
  {
    id: 'sprint-flying-30m',
    name: '30m Flying Sprints',
    description: 'Maximum velocity sprint with running start',
    category: 'plyometric',
    muscleGroups: ['quads', 'glutes', 'hamstrings', 'calves'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Mark 20m build-up zone + 30m sprint zone',
      'Accelerate gradually through build-up zone',
      'Hit maximum speed at spray zone entry',
      'Maintain max velocity through 30m',
      'Decelerate smoothly after',
      'Full recovery walk back'
    ],
    tips: [
      'Gradual build-up - don\'t sprint the build zone',
      'Relaxed at max speed',
      'Upright posture',
      'This is true max velocity work'
    ],
    breathing: 'Relaxed breathing at max speed',
    tempo: 'Maximum velocity',
    rest: '3-4 minutes (complete recovery)',
    recommendedSets: {
      beginner: { sets: 3, reps: '3' },
      intermediate: { sets: 4, reps: '4' },
      advanced: { sets: 5, reps: '5' }
    }
  },
  
  {
    id: 'endurance-zone2-bike',
    name: 'Zone 2 Bike (Aerobic Base)',
    description: 'Low-intensity steady-state cardio for aerobic development',
    category: 'endurance',
    muscleGroups: ['quads', 'glutes', 'calves'],
    equipment: 'cardio_machine',
    difficulty: 'beginner',
    instructions: [
      'Set bike to comfortable resistance',
      'Maintain steady pace - conversational intensity',
      'Target heart rate: 60-70% max HR',
      'Maintain consistent cadence (80-90 RPM)',
      'Focus on nasal breathing if possible',
      'Duration: 20-40 minutes continuous'
    ],
    tips: [
      'Should be able to hold conversation',
      'If breathing hard, slow down',
      'This builds aerobic base',
      'Consistency over intensity'
    ],
    breathing: 'Nasal breathing preferred, smooth rhythm',
    tempo: 'Steady',
    rest: 'N/A',
    recommendedSets: {
      beginner: { sets: 1, duration: '20 minutes' },
      intermediate: { sets: 1, duration: '30 minutes' },
      advanced: { sets: 1, duration: '40 minutes' }
    },
    mets: 5.0,
    caloriesPerMinute: 6,
    supportsTime: true
  },
  
  {
    id: 'endurance-zone2-row',
    name: 'Zone 2 Rowing (Aerobic Base)',
    description: 'Low-intensity rowing for aerobic capacity and recovery',
    category: 'endurance',
    muscleGroups: ['back', 'quads', 'glutes', 'core'],
    equipment: 'cardio_machine',
    difficulty: 'beginner',
    instructions: [
      'Set rower at light resistance',
      'Maintain steady pace - 18-22 strokes/min',
      'Target heart rate: 60-70% max HR',
      'Focus on technique over speed',
      'Smooth drive and recovery',
      'Duration: 20-40 minutes'
    ],
    tips: [
      'Legs drive, arms finish',
      'Conversational pace',
      'Don\'t rush the recovery',
      'Great for active recovery days'
    ],
    breathing: 'Rhythmic - exhale on drive',
    tempo: 'Steady',
    rest: 'N/A',
    recommendedSets: {
      beginner: { sets: 1, duration: '20 minutes' },
      intermediate: { sets: 1, duration: '30 minutes' },
      advanced: { sets: 1, duration: '40 minutes' }
    },
    mets: 5.5,
    caloriesPerMinute: 7,
    supportsTime: true
  },

  // ========================================
  // CABLE EXERCISES - UPPER BODY (CHEST)
  // ========================================
  {
    id: 'cable-chest-press-high',
    name: 'Cable Chest Press (High)',
    description: 'Upper chest press with constant tension from cables',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Set cables to high position on both sides',
      'Grab handles and step forward into staggered stance',
      'Start with hands at shoulder height, elbows slightly bent',
      'Press forward and slightly downward in an arc',
      'Bring handles together in front of your chest',
      'Return with control to starting position'
    ],
    tips: [
      'Keep core braced to prevent arching',
      'Press in a slight downward angle for upper chest',
      'Constant tension builds mind-muscle connection',
      'Don\'t let handles go behind your shoulder line'
    ],
    breathing: 'Exhale as you press forward, inhale as you return',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['upper chest'],
    secondary_muscles: ['front delts', 'triceps'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'endurance', 'general_fitness'],
    recommended_reps: '10-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-chest-press-mid',
    name: 'Cable Chest Press (Mid)',
    description: 'Mid-chest pressing with cables for constant tension',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Set cables to mid-chest height',
      'Grab handles and step forward, staggered stance',
      'Start with hands at chest level, elbows back',
      'Press forward in a straight line',
      'Bring handles together at full extension',
      'Control the return to starting position'
    ],
    tips: [
      'Perfect for mid-chest development',
      'Squeeze chest at full contraction',
      'Keep shoulders back and down',
      'Great machine alternative for hypertrophy'
    ],
    breathing: 'Exhale on press, inhale on return',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 4, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['chest'],
    secondary_muscles: ['triceps', 'front delts'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'endurance', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-chest-press-low',
    name: 'Cable Chest Press (Low)',
    description: 'Lower chest emphasis with upward pressing angle',
    category: 'strength',
    muscleGroups: ['lower chest', 'triceps', 'shoulders'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cables to lowest position',
      'Grab handles and step forward',
      'Start with hands at lower chest, elbows back',
      'Press forward and slightly upward',
      'Squeeze chest at the top',
      'Return with control'
    ],
    tips: [
      'Press upward angle targets lower chest',
      'Keep core tight to avoid hyperextension',
      'Great alternative to decline press',
      'Focus on chest squeeze, not just moving weight'
    ],
    breathing: 'Exhale as you press up, inhale as you return',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '12-15' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['lower chest'],
    secondary_muscles: ['triceps', 'front delts'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '10-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-fly-low-to-high',
    name: 'Single-Arm Cable Fly (Low to High)',
    description: 'Unilateral cable fly emphasizing upper chest',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cable to lowest position',
      'Grab handle with one hand, step forward',
      'Start with arm extended down and back, slight elbow bend',
      'Bring handle up and across your body to opposite shoulder',
      'Squeeze chest at peak contraction',
      'Return with control to starting position'
    ],
    tips: [
      'Excellent for upper chest isolation',
      'Maintain slight elbow bend throughout',
      'Focus on chest doing the work, not arm',
      'Address imbalances with unilateral training'
    ],
    breathing: 'Exhale as you fly up, inhale as you return',
    tempo: '1-2-2',
    rest: '60 seconds between arms',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15 per arm' },
      intermediate: { sets: 3, reps: '12-15 per arm' },
      advanced: { sets: 4, reps: '15-20 per arm' }
    },
    primary_muscles: ['upper chest'],
    secondary_muscles: ['front delts'],
    movement_pattern: 'push',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-fly-high-to-low',
    name: 'Single-Arm Cable Fly (High to Low)',
    description: 'Unilateral cable fly targeting lower chest',
    category: 'strength',
    muscleGroups: ['chest'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cable to highest position',
      'Grab handle, step forward into stance',
      'Start with arm extended high and back',
      'Bring handle down and across body toward opposite hip',
      'Squeeze lower chest at bottom',
      'Control the return'
    ],
    tips: [
      'Targets lower chest fibers',
      'Keep slight bend in elbow constant',
      'Don\'t rotate torso - isolate chest',
      'Great for filling out lower chest'
    ],
    breathing: 'Exhale as you pull down, inhale as you return',
    tempo: '1-2-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15 per arm' },
      intermediate: { sets: 3, reps: '15-20 per arm' },
      advanced: { sets: 4, reps: '15-20 per arm' }
    },
    primary_muscles: ['lower chest'],
    secondary_muscles: ['front delts'],
    movement_pattern: 'push',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-20',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // CABLE EXERCISES - BACK
  // ========================================
  {
    id: 'cable-row-neutral-grip',
    name: 'Cable Row (Neutral Grip)',
    description: 'Seated cable row with neutral handles for back thickness',
    category: 'strength',
    muscleGroups: ['lats', 'rhomboids', 'traps', 'biceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Sit at cable row station with feet braced',
      'Grab V-handle or neutral grip attachment',
      'Sit upright with slight lean back',
      'Pull handle to lower chest/upper abs',
      'Squeeze shoulder blades together',
      'Extend arms with control'
    ],
    tips: [
      'Neutral grip allows heavy loading',
      'Keep torso stable - no rocking',
      'Lead with elbows, not hands',
      'Perfect for building back thickness'
    ],
    breathing: 'Exhale as you row, inhale as you extend',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '10-12' }
    },
    primary_muscles: ['lats', 'rhomboids'],
    secondary_muscles: ['traps', 'biceps', 'rear delts'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-row-wide-grip',
    name: 'Wide-Grip Cable Row',
    description: 'Cable row with wide grip for lat width and upper back',
    category: 'strength',
    muscleGroups: ['lats', 'upper back', 'rear delts'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Attach wide bar to cable row station',
      'Sit with feet braced, grab bar wide (outside shoulders)',
      'Pull bar to upper chest/lower neck area',
      'Keep elbows flared out at 45 degrees',
      'Squeeze upper back and rear delts',
      'Control the extension'
    ],
    tips: [
      'Emphasizes lat width and upper back',
      'Pull to upper chest, not lower abs',
      'Great for V-taper development',
      'Keep chest up throughout'
    ],
    breathing: 'Exhale on pull, inhale on extension',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['lats', 'upper back'],
    secondary_muscles: ['rear delts', 'traps', 'biceps'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'general_fitness', 'athletic_performance'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-row-single-arm',
    name: 'Single-Arm Cable Row',
    description: 'Unilateral cable row for balanced back development',
    category: 'strength',
    muscleGroups: ['lats', 'rhomboids', 'traps'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cable to mid-height, use D-handle',
      'Stand or sit, grab handle with one hand',
      'Row handle to your hip/lower ribs',
      'Keep elbow close to body',
      'Squeeze lat and rotate slightly',
      'Extend with control'
    ],
    tips: [
      'Allows greater range of motion than bilateral',
      'Address left-right imbalances',
      'Can add slight rotation for extra lat engagement',
      'Keep non-working hand on hip or bench for stability'
    ],
    breathing: 'Exhale as you row, inhale as you extend',
    tempo: '1-1-2',
    rest: '60 seconds per arm',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12 per arm' },
      intermediate: { sets: 3, reps: '12-15 per arm' },
      advanced: { sets: 4, reps: '12-15 per arm' }
    },
    primary_muscles: ['lats'],
    secondary_muscles: ['rhomboids', 'traps', 'biceps'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'general_fitness', 'rehab'],
    recommended_reps: '10-15',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-face-pull-rope',
    name: 'Cable Face Pulls (Rope)',
    description: 'Essential rear delt and upper back exercise with external rotation',
    category: 'strength',
    muscleGroups: ['rear delts', 'upper back', 'traps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Set cable to upper chest height, attach rope',
      'Grab rope ends with thumbs toward you',
      'Step back until arms are extended',
      'Pull rope toward your face, split rope as you pull',
      'Aim for your temples, keep elbows high',
      'Externally rotate - thumbs point back behind you',
      'Control the return'
    ],
    tips: [
      'Critical for shoulder health and posture',
      'Focus on external rotation at peak',
      'Keep elbows high throughout',
      'Don\'t use too much weight - this is about activation'
    ],
    breathing: 'Exhale as you pull, inhale as you extend',
    tempo: '1-2-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['rear delts'],
    secondary_muscles: ['upper back', 'traps', 'rotator cuff'],
    movement_pattern: 'pull',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness', 'rehab', 'athletic_performance'],
    recommended_reps: '15-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-rear-delt-fly',
    name: 'Cable Rear Delt Fly',
    description: 'Isolation exercise for rear deltoids using cables',
    category: 'strength',
    muscleGroups: ['rear delts', 'upper back'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cables to shoulder height on both sides',
      'Cross over and grab left handle with right hand, vice versa',
      'Step back, arms crossed in front',
      'Pull handles apart in wide arc, leading with elbows',
      'Squeeze shoulder blades together',
      'Control the return'
    ],
    tips: [
      'Keep slight bend in elbows constant',
      'Don\'t use momentum',
      'Focus on rear delt squeeze',
      'Perfect for shoulder balance and health'
    ],
    breathing: 'Exhale as you fly apart, inhale as you return',
    tempo: '1-2-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['rear delts'],
    secondary_muscles: ['upper back', 'traps'],
    movement_pattern: 'pull',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness', 'rehab'],
    recommended_reps: '12-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // CABLE EXERCISES - SHOULDERS & ARMS
  // ========================================
  {
    id: 'cable-lateral-raise',
    name: 'Single-Arm Cable Lateral Raise',
    description: 'Isolation exercise for side delts with constant tension',
    category: 'strength',
    muscleGroups: ['side delts', 'shoulders'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Set cable to lowest position, attach D-handle',
      'Stand sideways to machine, grab handle with far hand',
      'Let arm hang at your side with slight bend',
      'Raise arm out to side until parallel to floor',
      'Lead with elbow, keep wrist neutral',
      'Lower with control'
    ],
    tips: [
      'Constant tension is superior to dumbbells for hypertrophy',
      'Don\'t swing or use momentum',
      'Keep elbow slightly bent throughout',
      'Focus on deltoid contraction, not just lifting'
    ],
    breathing: 'Exhale as you raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '60 seconds per arm',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15 per arm' },
      intermediate: { sets: 3, reps: '15-20 per arm' },
      advanced: { sets: 4, reps: '15-20 per arm' }
    },
    primary_muscles: ['side delts'],
    secondary_muscles: ['traps'],
    movement_pattern: 'pull',
    plane_of_motion: 'frontal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-20',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-tricep-pushdown-rope',
    name: 'Cable Tricep Pushdown (Rope)',
    description: 'Rope pushdowns for full tricep contraction',
    category: 'strength',
    muscleGroups: ['triceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Attach rope to high cable',
      'Grab rope ends with neutral grip',
      'Pin elbows to sides',
      'Push rope down and pull ends apart at bottom',
      'Squeeze triceps hard',
      'Control the ascent'
    ],
    tips: [
      'Pulling rope apart hits lateral head',
      'Full extension is key',
      'Don\'t use body English',
      'Perfect pump exercise'
    ],
    breathing: 'Exhale on pushdown, inhale on return',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['triceps'],
    secondary_muscles: [],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-overhead-tricep-extension',
    name: 'Cable Overhead Tricep Extension (Rope)',
    description: 'Overhead cable extension for long head of triceps',
    category: 'strength',
    muscleGroups: ['triceps'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Attach rope to low cable, face away from machine',
      'Grab rope overhead with both hands',
      'Step forward into split stance for stability',
      'Start with elbows bent, rope behind head',
      'Extend arms overhead until fully locked out',
      'Control the descent'
    ],
    tips: [
      'Emphasizes long head of triceps',
      'Keep elbows pointed forward, don\'t flare',
      'Lean forward slightly for stability',
      'Great for building tricep peak'
    ],
    breathing: 'Exhale as you extend, inhale as you lower',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['triceps'],
    secondary_muscles: ['shoulders'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '10-15',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'cable-rope-hammer-curl',
    name: 'Cable Rope Hammer Curls',
    description: 'Neutral-grip bicep curls for biceps and brachialis',
    category: 'strength',
    muscleGroups: ['biceps', 'brachialis', 'forearms'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Attach rope to low cable',
      'Grab rope ends with neutral (palms facing) grip',
      'Stand upright, elbows at sides',
      'Curl rope up, keeping palms facing each other',
      'Squeeze at the top',
      'Control the descent'
    ],
    tips: [
      'Builds arm thickness via brachialis',
      'Neutral grip is easier on wrists',
      'Don\'t let elbows drift forward',
      'Can pull rope ends apart at top for extra contraction'
    ],
    breathing: 'Exhale on curl, inhale on lower',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['biceps', 'brachialis'],
    secondary_muscles: ['forearms'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // CABLE EXERCISES - LEGS
  // ========================================
  {
    id: 'cable-pull-through',
    name: 'Cable Pull-Throughs',
    description: 'Hip hinge movement for glutes and hamstrings',
    category: 'strength',
    muscleGroups: ['glutes', 'hamstrings', 'lower back'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cable to lowest position with rope attachment',
      'Face away from machine, grab rope between legs',
      'Walk forward to create tension',
      'Hinge at hips, push butt back',
      'Feel stretch in hamstrings',
      'Drive hips forward explosively to stand',
      'Squeeze glutes hard at top'
    ],
    tips: [
      'This is a hip hinge, not a squat',
      'Perfect deadlift teaching tool',
      'Great for glute activation',
      'Keep back flat throughout'
    ],
    breathing: 'Inhale as you hinge, exhale as you drive hips forward',
    tempo: '2-0-1 (explosive concentric)',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['glutes', 'hamstrings'],
    secondary_muscles: ['lower back', 'core'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'athletic_performance', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-glute-kickback',
    name: 'Cable Glute Kickbacks',
    description: 'Isolation exercise for glutes using cable',
    category: 'strength',
    muscleGroups: ['glutes'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Attach ankle strap to low cable',
      'Strap on one ankle, face machine',
      'Hold cable tower for balance',
      'Kick leg back, squeezing glute',
      'Don\'t arch lower back',
      'Control the return'
    ],
    tips: [
      'Squeeze glute at full extension',
      'Don\'t swing or use momentum',
      'Keep core braced to protect back',
      'Great glute finisher'
    ],
    breathing: 'Exhale as you kick back, inhale as you return',
    tempo: '1-1-2',
    rest: '60 seconds per leg',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20 per leg' },
      intermediate: { sets: 3, reps: '15-20 per leg' },
      advanced: { sets: 4, reps: '20-25 per leg' }
    },
    primary_muscles: ['glutes'],
    secondary_muscles: ['hamstrings'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'endurance', 'general_fitness'],
    recommended_reps: '15-20',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // CABLE EXERCISES - CORE
  // ========================================
  {
    id: 'cable-pallof-press',
    name: 'Pallof Press',
    description: 'Anti-rotation core exercise for stability',
    category: 'strength',
    muscleGroups: ['core', 'obliques', 'abs'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Set cable to chest height with D-handle',
      'Stand sideways to machine',
      'Hold handle at chest with both hands',
      'Step away to create tension',
      'Press handle straight out in front',
      'Resist rotation - keep shoulders square',
      'Pull back to chest'
    ],
    tips: [
      'Core stability exercise - fight the rotation',
      'Keep hips and shoulders square',
      'Don\'t let cable pull you',
      'Essential for functional core strength'
    ],
    breathing: 'Exhale as you press out, inhale as you return',
    tempo: '1-2-1',
    rest: '60 seconds per side',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12 per side' },
      intermediate: { sets: 3, reps: '12-15 per side' },
      advanced: { sets: 4, reps: '15-20 per side' }
    },
    primary_muscles: ['core', 'obliques'],
    secondary_muscles: ['abs', 'shoulders'],
    movement_pattern: 'anti-rotation',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['general_fitness', 'athletic_performance', 'rehab'],
    recommended_reps: '10-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-woodchop-high-to-low',
    name: 'Cable Woodchop (High to Low)',
    description: 'Rotational core exercise from high to low',
    category: 'strength',
    muscleGroups: ['obliques', 'core', 'abs'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cable to highest position',
      'Stand sideways, grab handle with both hands',
      'Start with arms extended high',
      'Rotate and chop down across body toward opposite hip',
      'Pivot on back foot',
      'Control the return'
    ],
    tips: [
      'Rotate from core, not just arms',
      'Keep arms relatively straight',
      'Great for rotational power',
      'Common in athletic training'
    ],
    breathing: 'Exhale as you chop down, inhale as you return',
    tempo: '1-0-2',
    rest: '60 seconds per side',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15 per side' },
      intermediate: { sets: 3, reps: '12-15 per side' },
      advanced: { sets: 4, reps: '15-20 per side' }
    },
    primary_muscles: ['obliques', 'core'],
    secondary_muscles: ['abs', 'shoulders'],
    movement_pattern: 'rotation',
    plane_of_motion: 'transverse',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'general_fitness', 'muscle_gain'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'cable-woodchop-low-to-high',
    name: 'Cable Woodchop (Low to High)',
    description: 'Rotational power from low to high position',
    category: 'strength',
    muscleGroups: ['obliques', 'core', 'abs'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: [
      'Set cable to lowest position',
      'Stand sideways, grab handle with both hands',
      'Start in athletic squat, hands at low cable',
      'Rotate and lift up across body',
      'Extend to high position on opposite side',
      'Control the return'
    ],
    tips: [
      'Add power by incorporating leg drive',
      'Rotate from hips and core',
      'Excellent for athletes',
      'Can be done explosively'
    ],
    breathing: 'Exhale as you lift and rotate, inhale as you return',
    tempo: '1-0-2 (can be explosive)',
    rest: '60 seconds per side',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15 per side' },
      intermediate: { sets: 3, reps: '12-15 per side' },
      advanced: { sets: 4, reps: '15-20 per side' }
    },
    primary_muscles: ['obliques', 'core'],
    secondary_muscles: ['abs', 'shoulders', 'legs'],
    movement_pattern: 'rotation',
    plane_of_motion: 'transverse',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // MACHINE EXERCISES - CHEST
  // ========================================
  {
    id: 'machine-chest-press',
    name: 'Chest Press Machine',
    description: 'Plate-loaded or selectorized chest press for safe pressing',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust seat so handles are at mid-chest height',
      'Sit with back flat against pad',
      'Grab handles with full grip',
      'Press forward until arms are extended',
      'Squeeze chest at full extension',
      'Control the return to starting position'
    ],
    tips: [
      'Perfect for beginners learning pressing pattern',
      'Allows heavy loading safely',
      'Great for hypertrophy work',
      'Can train to failure safely'
    ],
    breathing: 'Exhale as you press, inhale as you return',
    tempo: '1-0-2',
    rest: '75-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '8-12' }
    },
    primary_muscles: ['chest'],
    secondary_muscles: ['triceps', 'front delts'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-incline-press',
    name: 'Incline Press Machine',
    description: 'Machine incline press for upper chest',
    category: 'strength',
    muscleGroups: ['upper chest', 'shoulders', 'triceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust seat for incline angle (30-45 degrees)',
      'Sit with back supported',
      'Grab handles at chest level',
      'Press up and forward',
      'Full extension at top',
      'Control the descent'
    ],
    tips: [
      'Targets upper chest fibers',
      'Safe alternative to barbell incline',
      'Good for high-rep hypertrophy',
      'Adjust seat height for optimal angle'
    ],
    breathing: 'Exhale on press, inhale on return',
    tempo: '1-0-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['upper chest'],
    secondary_muscles: ['front delts', 'triceps'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-pec-deck',
    name: 'Pec Deck Machine (Chest Fly)',
    description: 'Isolation machine for chest with perfect form',
    category: 'strength',
    muscleGroups: ['chest'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust seat so handles are at chest height',
      'Sit with back against pad',
      'Grab handles or place forearms on pads',
      'Bring arms together in front of chest',
      'Squeeze chest hard at contraction',
      'Control the stretch on the way back'
    ],
    tips: [
      'Perfect for isolating chest',
      'Keeps constant tension on pecs',
      'Great for beginners and advanced',
      'Focus on squeeze, not weight'
    ],
    breathing: 'Exhale as you bring arms together, inhale as you open',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['chest'],
    secondary_muscles: [],
    movement_pattern: 'push',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // MACHINE EXERCISES - BACK
  // ========================================
  {
    id: 'machine-seated-row',
    name: 'Seated Row Machine',
    description: 'Horizontal pulling machine for back thickness',
    category: 'strength',
    muscleGroups: ['lats', 'rhomboids', 'traps', 'biceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust chest pad so you can reach handles comfortably',
      'Sit with chest against pad',
      'Grab handles with neutral or overhand grip',
      'Pull handles to your torso',
      'Squeeze shoulder blades together',
      'Control the extension'
    ],
    tips: [
      'Chest pad prevents cheating',
      'Perfect for learning row mechanics',
      'Focus on pulling with back, not arms',
      'Great for hypertrophy'
    ],
    breathing: 'Exhale as you row, inhale as you extend',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['lats', 'rhomboids'],
    secondary_muscles: ['traps', 'biceps', 'rear delts'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-lat-pulldown-wide',
    name: 'Wide-Grip Lat Pulldown Machine',
    description: 'Lat pulldown with wide grip for back width',
    category: 'strength',
    muscleGroups: ['lats', 'upper back', 'biceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit at lat pulldown, secure thighs under pads',
      'Grab bar with wide overhand grip',
      'Pull bar down to upper chest',
      'Drive elbows down and back',
      'Squeeze lats at bottom',
      'Control the ascent'
    ],
    tips: [
      'Builds lat width (V-taper)',
      'Great pull-up progression',
      'Don\'t lean back excessively',
      'Think elbows, not hands'
    ],
    breathing: 'Exhale as you pull down, inhale as you return',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '10-12' }
    },
    primary_muscles: ['lats'],
    secondary_muscles: ['upper back', 'biceps', 'rear delts'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'general_fitness', 'strength'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-assisted-pullup',
    name: 'Assisted Pull-Up Machine',
    description: 'Machine-assisted pull-ups for learning the movement',
    category: 'strength',
    muscleGroups: ['lats', 'biceps', 'upper back'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Set desired assistance weight',
      'Step or kneel on platform',
      'Grab handles with overhand grip',
      'Pull yourself up until chin clears handles',
      'Lower with control',
      'Repeat for reps'
    ],
    tips: [
      'Perfect for building pull-up strength',
      'Reduce assistance over time',
      'Focus on form, not speed',
      'Full range of motion is key'
    ],
    breathing: 'Exhale as you pull up, inhale as you lower',
    tempo: '1-0-2',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 4, reps: '8-10' },
      advanced: { sets: 4, reps: '10-12' }
    },
    primary_muscles: ['lats', 'biceps'],
    secondary_muscles: ['upper back', 'core'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'general_fitness'],
    recommended_reps: '6-10',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-assisted-dip',
    name: 'Assisted Dip Machine',
    description: 'Machine-assisted dips for chest and triceps',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Set assistance weight',
      'Step or kneel on platform',
      'Grab handles, lean forward slightly for chest',
      'Lower until upper arms are parallel to ground',
      'Press back up to starting position',
      'Control the movement'
    ],
    tips: [
      'Learn dip movement safely',
      'Forward lean = chest, upright = triceps',
      'Reduce assistance as you get stronger',
      'Don\'t go too deep if shoulders hurt'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-0-1',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8' },
      intermediate: { sets: 4, reps: '8-10' },
      advanced: { sets: 4, reps: '10-12' }
    },
    primary_muscles: ['chest', 'triceps'],
    secondary_muscles: ['front delts'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '6-10',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'machine-reverse-fly',
    name: 'Reverse Pec Deck (Rear Delt Machine)',
    description: 'Rear delt isolation on machine',
    category: 'strength',
    muscleGroups: ['rear delts', 'upper back'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust seat so handles are at shoulder height',
      'Sit facing the machine (chest against pad)',
      'Grab handles with neutral grip',
      'Pull handles back in wide arc',
      'Squeeze shoulder blades together',
      'Control the return'
    ],
    tips: [
      'Essential for shoulder health',
      'Don\'t use momentum',
      'Focus on rear delt squeeze',
      'Perfect form over heavy weight'
    ],
    breathing: 'Exhale as you fly back, inhale as you return',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['rear delts'],
    secondary_muscles: ['upper back', 'traps'],
    movement_pattern: 'pull',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness', 'rehab'],
    recommended_reps: '15-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // MACHINE EXERCISES - SHOULDERS
  // ========================================
  {
    id: 'machine-shoulder-press',
    name: 'Shoulder Press Machine',
    description: 'Machine overhead press for deltoid development',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust seat so handles are at shoulder height',
      'Sit with back supported',
      'Grab handles with full grip',
      'Press overhead until arms are extended',
      'Lower with control to starting position',
      'Don\'t lock out completely'
    ],
    tips: [
      'Safe way to overhead press heavy',
      'Perfect for beginners',
      'Can train to failure safely',
      'Great for hypertrophy'
    ],
    breathing: 'Exhale as you press, inhale as you lower',
    tempo: '1-0-2',
    rest: '75-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '8-12' }
    },
    primary_muscles: ['shoulders'],
    secondary_muscles: ['triceps', 'upper chest'],
    movement_pattern: 'press',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'machine-lateral-raise',
    name: 'Lateral Raise Machine',
    description: 'Machine lateral raise for side delts',
    category: 'strength',
    muscleGroups: ['side delts'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust seat height appropriately',
      'Sit with back against pad',
      'Place arms under or against pads',
      'Raise arms out to sides until parallel',
      'Control the descent',
      'Don\'t use momentum'
    ],
    tips: [
      'Perfect for isolating side delts',
      'Machine ensures correct path',
      'Great for beginners learning movement',
      'Focus on deltoid contraction'
    ],
    breathing: 'Exhale as you raise, inhale as you lower',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['side delts'],
    secondary_muscles: ['traps'],
    movement_pattern: 'pull',
    plane_of_motion: 'frontal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // MACHINE EXERCISES - LEGS
  // ========================================
  {
    id: 'machine-leg-press-standard',
    name: 'Leg Press (Standard Foot Position)',
    description: 'Machine leg press for overall leg development',
    category: 'strength',
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit in leg press, back and head against pad',
      'Place feet shoulder-width apart, mid-platform',
      'Release safeties',
      'Lower weight until knees are at 90 degrees',
      'Press through heels to extend legs',
      'Don\'t lock out knees completely'
    ],
    tips: [
      'Keep lower back against pad',
      'Don\'t let knees cave inward',
      'Full range of motion',
      'Great for loading legs heavily and safely'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-0-1',
    rest: '90-120 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '8-15' }
    },
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'calves'],
    movement_pattern: 'squat',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'machine-leg-press-high-feet',
    name: 'Leg Press (High Foot Position)',
    description: 'Leg press with high foot placement for glutes and hamstrings',
    category: 'strength',
    muscleGroups: ['glutes', 'hamstrings', 'quads'],
    equipment: 'machine',
    difficulty: 'intermediate',
    instructions: [
      'Sit in leg press',
      'Place feet high on platform, shoulder-width',
      'Release safeties',
      'Lower with control to 90 degrees',
      'Press through heels to extend',
      'Focus on glute and hamstring engagement'
    ],
    tips: [
      'High foot position emphasizes posterior chain',
      'Great for glute development',
      'Keep pressure in heels',
      'Don\'t let lower back round'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-0-1',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['glutes', 'hamstrings'],
    secondary_muscles: ['quads'],
    movement_pattern: 'squat',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'general_fitness', 'athletic_performance'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-hack-squat',
    name: 'Hack Squat Machine',
    description: 'Machine squat for quad development',
    category: 'strength',
    muscleGroups: ['quads', 'glutes'],
    equipment: 'machine',
    difficulty: 'intermediate',
    instructions: [
      'Stand on platform, back against pad',
      'Position shoulders under pads',
      'Feet shoulder-width on platform',
      'Release safeties',
      'Squat down until thighs are parallel',
      'Drive through heels to stand'
    ],
    tips: [
      'Excellent quad builder',
      'Keep back flat against pad',
      'Full range of motion',
      'Safer than barbell squats for some'
    ],
    breathing: 'Inhale as you descend, exhale as you drive up',
    tempo: '2-0-1',
    rest: '90-120 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '8-12' }
    },
    primary_muscles: ['quads'],
    secondary_muscles: ['glutes', 'hamstrings'],
    movement_pattern: 'squat',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'athletic_performance'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'machine-leg-extension',
    name: 'Leg Extension Machine',
    description: 'Isolation exercise for quadriceps',
    category: 'strength',
    muscleGroups: ['quads'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust machine so pad is on lower shins',
      'Sit with back against pad',
      'Grip handles for stability',
      'Extend legs until fully straight',
      'Squeeze quads at the top',
      'Lower with control'
    ],
    tips: [
      'Isolates quads perfectly',
      'Great for rehab and pre-exhaust',
      'Full extension with squeeze',
      'Control the negative'
    ],
    breathing: 'Exhale as you extend, inhale as you lower',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['quads'],
    secondary_muscles: [],
    movement_pattern: 'squat',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness', 'rehab'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'machine-lying-leg-curl',
    name: 'Lying Leg Curl Machine',
    description: 'Hamstring isolation lying face down',
    category: 'strength',
    muscleGroups: ['hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Lie face down on machine',
      'Position pad on back of lower legs/ankles',
      'Grip handles',
      'Curl heels toward glutes',
      'Squeeze hamstrings at top',
      'Lower with control'
    ],
    tips: [
      'Don\'t lift hips off pad',
      'Full contraction at top',
      'Control the descent',
      'Point toes down or flex for variation'
    ],
    breathing: 'Exhale as you curl, inhale as you lower',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['hamstrings'],
    secondary_muscles: [],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-seated-leg-curl',
    name: 'Seated Leg Curl Machine',
    description: 'Hamstring isolation in seated position',
    category: 'strength',
    muscleGroups: ['hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit in machine, back against pad',
      'Position pad on back of lower legs',
      'Secure thigh pad',
      'Curl legs down as far as possible',
      'Squeeze hamstrings',
      'Control the return'
    ],
    tips: [
      'Different stimulus than lying curl',
      'Keep torso stable',
      'Full range of motion',
      'Great for hamstring development'
    ],
    breathing: 'Exhale as you curl, inhale as you extend',
    tempo: '1-1-2',
    rest: '60-75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['hamstrings'],
    secondary_muscles: [],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-hip-abductor',
    name: 'Hip Abduction Machine',
    description: 'Glute medius and outer hip isolation',
    category: 'strength',
    muscleGroups: ['glutes', 'hip abductors'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit in machine with back supported',
      'Place outer thighs against pads',
      'Push legs apart against resistance',
      'Squeeze glutes at full abduction',
      'Control the return'
    ],
    tips: [
      'Strengthens glute medius',
      'Important for hip stability',
      'Don\'t use momentum',
      'Essential for injury prevention'
    ],
    breathing: 'Exhale as you push out, inhale as you return',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '20-25' }
    },
    primary_muscles: ['glutes', 'hip abductors'],
    secondary_muscles: [],
    movement_pattern: 'pull',
    plane_of_motion: 'frontal',
    exercise_type: 'isolation',
    suitable_goals: ['general_fitness', 'rehab', 'athletic_performance'],
    recommended_reps: '15-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-hip-adductor',
    name: 'Hip Adduction Machine',
    description: 'Inner thigh isolation machine',
    category: 'strength',
    muscleGroups: ['adductors', 'inner thighs'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit in machine with back supported',
      'Place inner thighs against pads',
      'Start with legs apart',
      'Squeeze legs together',
      'Hold contraction briefly',
      'Control the opening'
    ],
    tips: [
      'Strengthens inner thighs',
      'Important for hip balance',
      'Don\'t rush the movement',
      'Focus on adductor squeeze'
    ],
    breathing: 'Exhale as you squeeze together, inhale as you open',
    tempo: '1-1-2',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 3, reps: '15-20' },
      advanced: { sets: 4, reps: '20-25' }
    },
    primary_muscles: ['adductors'],
    secondary_muscles: [],
    movement_pattern: 'pull',
    plane_of_motion: 'frontal',
    exercise_type: 'isolation',
    suitable_goals: ['general_fitness', 'rehab'],
    recommended_reps: '15-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'machine-glute-bridge',
    name: 'Glute Bridge Machine',
    description: 'Machine hip thrust for glute development',
    category: 'strength',
    muscleGroups: ['glutes', 'hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Sit in machine, back against pad',
      'Position pad across hips',
      'Plant feet on platform',
      'Drive hips forward against resistance',
      'Squeeze glutes hard at full extension',
      'Control the return'
    ],
    tips: [
      'Best glute isolation machine',
      'Full hip extension',
      'Squeeze glutes, don\'t arch back',
      'Easier to load than barbell hip thrust'
    ],
    breathing: 'Exhale as you thrust forward, inhale as you return',
    tempo: '1-1-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12-15' },
      intermediate: { sets: 4, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['glutes'],
    secondary_muscles: ['hamstrings'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'isolation',
    suitable_goals: ['muscle_gain', 'athletic_performance', 'general_fitness'],
    recommended_reps: '12-15',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // SMITH MACHINE EXERCISES
  // ========================================
  {
    id: 'smith-machine-squat',
    name: 'Smith Machine Squat',
    description: 'Fixed-path squat for controlled quad development',
    category: 'strength',
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Position bar on upper traps',
      'Step under bar, unhook safeties',
      'Feet slightly forward of bar',
      'Squat down to parallel or below',
      'Drive through heels to stand',
      'Re-rack at top'
    ],
    tips: [
      'Fixed path allows different foot positions',
      'Safer for training alone',
      'Can focus purely on legs',
      'Good for learning squat pattern'
    ],
    breathing: 'Inhale as you descend, exhale as you drive up',
    tempo: '2-0-1',
    rest: '90-120 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '8-12' }
    },
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'core'],
    movement_pattern: 'squat',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'smith-machine-rdl',
    name: 'Smith Machine Romanian Deadlift',
    description: 'Fixed-path RDL for hamstrings and glutes',
    category: 'strength',
    muscleGroups: ['hamstrings', 'glutes', 'lower back'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Stand with bar at hip height',
      'Grip bar shoulder-width',
      'Unhook and stand tall',
      'Hinge at hips, push butt back',
      'Lower bar down thighs to mid-shin',
      'Drive hips forward to stand'
    ],
    tips: [
      'Perfect for learning hip hinge',
      'Keep bar close to body',
      'Focus on hamstring stretch',
      'Safer than free weight for beginners'
    ],
    breathing: 'Inhale as you hinge, exhale as you return',
    tempo: '2-1-1',
    rest: '75-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '10-12' }
    },
    primary_muscles: ['hamstrings', 'glutes'],
    secondary_muscles: ['lower back', 'core'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'general_fitness', 'strength'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'smith-machine-incline-press',
    name: 'Smith Machine Incline Press',
    description: 'Fixed-path incline press for upper chest',
    category: 'strength',
    muscleGroups: ['upper chest', 'shoulders', 'triceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Set bench to 30-45 degree incline under Smith machine',
      'Position so bar path is over upper chest',
      'Grip bar slightly wider than shoulders',
      'Unhook and lower to upper chest',
      'Press bar up until arms extended',
      'Re-hook at top'
    ],
    tips: [
      'Safe for training without spotter',
      'Can go heavy safely',
      'Focus on upper chest contraction',
      'Adjust bench position for optimal path'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-0-1',
    rest: '75-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '8-10' },
      advanced: { sets: 4, reps: '8-12' }
    },
    primary_muscles: ['upper chest'],
    secondary_muscles: ['front delts', 'triceps'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '8-10',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // KETTLEBELL EXERCISES - POWER/ATHLETIC
  // ========================================
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swings',
    description: 'Explosive hip hinge for power and conditioning',
    category: 'hybrid',
    muscleGroups: ['glutes', 'hamstrings', 'core', 'shoulders'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet shoulder-width, KB between feet',
      'Hinge at hips, grab KB with both hands',
      'Hike KB back between legs',
      'Explosively drive hips forward',
      'KB swings to shoulder height (arms relaxed)',
      'Let KB fall back between legs and repeat'
    ],
    tips: [
      'Power comes from hip drive, not arms',
      'Keep back flat throughout',
      'Explosive hip snap',
      'Perfect for conditioning and power'
    ],
    breathing: 'Exhale forcefully on hip drive',
    tempo: 'Explosive',
    rest: '60-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '15-20' },
      intermediate: { sets: 4, reps: '15-20' },
      advanced: { sets: 5, reps: '20-25' }
    },
    primary_muscles: ['glutes', 'hamstrings'],
    secondary_muscles: ['core', 'shoulders', 'back'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'fat_loss', 'endurance', 'general_fitness'],
    recommended_reps: '15-20',
    recommended_rest_seconds: 60,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'kettlebell-clean',
    name: 'Kettlebell Clean',
    description: 'Explosive lift bringing KB to rack position',
    category: 'strength',
    muscleGroups: ['glutes', 'back', 'shoulders', 'core'],
    equipment: 'kettlebell',
    difficulty: 'advanced',
    instructions: [
      'Start with KB on ground between feet',
      'Hinge and grip KB with one hand',
      'Drive hips explosively',
      'Pull KB up and catch in rack position at shoulder',
      'KB rests on forearm and chest',
      'Lower with control and repeat'
    ],
    tips: [
      'Catch KB softly in rack',
      'Don\'t curl it - drive with hips',
      'Master swing before attempting clean',
      'Great for power development'
    ],
    breathing: 'Exhale on drive, inhale during reset',
    tempo: 'Explosive',
    rest: '90 seconds per arm',
    recommendedSets: {
      beginner: { sets: 0, reps: '0' },
      intermediate: { sets: 3, reps: '6-8 per arm' },
      advanced: { sets: 4, reps: '8-10 per arm' }
    },
    primary_muscles: ['glutes', 'back'],
    secondary_muscles: ['shoulders', 'core', 'traps'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'strength', 'muscle_gain'],
    recommended_reps: '6-10',
    recommended_rest_seconds: 90,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'kettlebell-snatch',
    name: 'Kettlebell Snatch',
    description: 'Explosive full-body lift overhead in one motion',
    category: 'strength',
    muscleGroups: ['full body', 'shoulders', 'glutes', 'core'],
    equipment: 'kettlebell',
    difficulty: 'advanced',
    instructions: [
      'Start with KB on ground',
      'Hinge and grip with one hand',
      'Explosively drive hips and pull KB up',
      'Punch hand through at top to catch overhead',
      'Lock out arm overhead',
      'Lower with control'
    ],
    tips: [
      'Most explosive KB movement',
      'Master clean and swing first',
      'Punch through to avoid banging wrist',
      'Excellent for conditioning and power'
    ],
    breathing: 'Exhale explosively on drive',
    tempo: 'Explosive',
    rest: '90-120 seconds per arm',
    recommendedSets: {
      beginner: { sets: 0, reps: '0' },
      intermediate: { sets: 3, reps: '5-8 per arm' },
      advanced: { sets: 4, reps: '8-10 per arm' }
    },
    primary_muscles: ['glutes', 'shoulders'],
    secondary_muscles: ['back', 'core', 'hamstrings'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'strength', 'endurance'],
    recommended_reps: '5-10',
    recommended_rest_seconds: 90,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'kettlebell-push-press',
    name: 'Kettlebell Push Press',
    description: 'Explosive overhead press using leg drive',
    category: 'strength',
    muscleGroups: ['shoulders', 'legs', 'core'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    instructions: [
      'Start with KB in rack position',
      'Dip knees slightly',
      'Explosively drive through legs',
      'Press KB overhead using momentum',
      'Lock out arm at top',
      'Lower to rack and repeat'
    ],
    tips: [
      'Leg drive initiates the press',
      'Great for building pressing power',
      'Can lift heavier than strict press',
      'Full lockout overhead'
    ],
    breathing: 'Inhale on dip, exhale on press',
    tempo: 'Explosive',
    rest: '75 seconds per arm',
    recommendedSets: {
      beginner: { sets: 3, reps: '6-8 per arm' },
      intermediate: { sets: 3, reps: '8-10 per arm' },
      advanced: { sets: 4, reps: '10-12 per arm' }
    },
    primary_muscles: ['shoulders'],
    secondary_muscles: ['triceps', 'legs', 'core'],
    movement_pattern: 'press',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'athletic_performance', 'muscle_gain'],
    recommended_reps: '6-10',
    recommended_rest_seconds: 75,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  // ========================================
  // KETTLEBELL EXERCISES - STRENGTH
  // ========================================
  {
    id: 'kettlebell-goblet-squat',
    name: 'Goblet Squat',
    description: 'Front-loaded squat teaching perfect form',
    category: 'strength',
    muscleGroups: ['quads', 'glutes', 'core'],
    equipment: 'kettlebell',
    difficulty: 'beginner',
    instructions: [
      'Hold KB at chest, cupped under bell',
      'Stand with feet shoulder-width',
      'Squat down, elbows tracking inside knees',
      'Go to full depth if mobility allows',
      'Drive through heels to stand',
      'Keep chest up and core braced'
    ],
    tips: [
      'Perfect squat teaching tool',
      'KB at chest keeps torso upright',
      'Use elbows to push knees out',
      'Great for mobility and strength'
    ],
    breathing: 'Inhale as you descend, exhale as you stand',
    tempo: '2-0-1',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '12-15' },
      advanced: { sets: 4, reps: '15-20' }
    },
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['core', 'hamstrings'],
    movement_pattern: 'squat',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'general_fitness'],
    recommended_reps: '10-15',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-front-rack-split-squat',
    name: 'Front Rack Kettlebell Split Squat',
    description: 'Single-leg squat with KB in rack position',
    category: 'strength',
    muscleGroups: ['quads', 'glutes'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    instructions: [
      'Hold KB in rack position (one or both hands)',
      'Step into split stance',
      'Lower back knee toward ground',
      'Keep front shin vertical',
      'Drive through front heel to stand',
      'Complete reps, then switch legs'
    ],
    tips: [
      'Front load challenges core stability',
      'Great for single-leg strength',
      'Keep torso upright',
      'Address imbalances'
    ],
    breathing: 'Inhale as you lower, exhale as you drive up',
    tempo: '2-0-1',
    rest: '60 seconds per leg',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10 per leg' },
      intermediate: { sets: 3, reps: '10-12 per leg' },
      advanced: { sets: 4, reps: '12-15 per leg' }
    },
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'core'],
    movement_pattern: 'lunge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain', 'athletic_performance'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  {
    id: 'kettlebell-deadlift',
    name: 'Kettlebell Deadlift',
    description: 'Hip hinge pattern with KB for posterior chain',
    category: 'strength',
    muscleGroups: ['glutes', 'hamstrings', 'lower back'],
    equipment: 'kettlebell',
    difficulty: 'beginner',
    instructions: [
      'Stand with KB between feet',
      'Hinge at hips, grip KB with both hands',
      'Keep back flat, chest up',
      'Drive through heels and extend hips to stand',
      'Squeeze glutes at top',
      'Lower with control'
    ],
    tips: [
      'Perfect deadlift teaching tool',
      'Keep KB close to body',
      'Drive with hips, not back',
      'Great for learning hinge pattern'
    ],
    breathing: 'Inhale before lift, exhale at lockout',
    tempo: '1-0-2',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['glutes', 'hamstrings'],
    secondary_muscles: ['lower back', 'traps', 'core'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'general_fitness', 'muscle_gain'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-single-leg-rdl',
    name: 'Single-Leg KB Romanian Deadlift',
    description: 'Unilateral hip hinge for balance and hamstrings',
    category: 'strength',
    muscleGroups: ['hamstrings', 'glutes', 'core'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    instructions: [
      'Hold KB in one hand',
      'Stand on opposite leg',
      'Hinge at hip, extending free leg behind',
      'Lower KB toward ground',
      'Keep back flat, hips square',
      'Return to standing using glutes and hamstrings'
    ],
    tips: [
      'Excellent for balance and unilateral strength',
      'Keep hips square - don\'t rotate',
      'Focus on hamstring stretch',
      'Touch toe to ground if needed for balance'
    ],
    breathing: 'Inhale as you hinge, exhale as you return',
    tempo: '2-1-1',
    rest: '60 seconds per leg',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10 per leg' },
      intermediate: { sets: 3, reps: '10-12 per leg' },
      advanced: { sets: 4, reps: '12-15 per leg' }
    },
    primary_muscles: ['hamstrings', 'glutes'],
    secondary_muscles: ['core', 'lower back'],
    movement_pattern: 'hinge',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'athletic_performance', 'general_fitness'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-floor-press',
    name: 'Kettlebell Floor Press',
    description: 'Horizontal press from floor with KB',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    instructions: [
      'Lie on floor with knees bent',
      'Hold KB(s) in rack or press position',
      'Lower KB until triceps touch floor',
      'Pause briefly',
      'Press KB back up to start',
      'Keep wrist straight'
    ],
    tips: [
      'Great for lockout strength',
      'Shoulder-friendly pressing',
      'Can use one or two KBs',
      'Floor prevents over-stretching'
    ],
    breathing: 'Inhale as you lower, exhale as you press',
    tempo: '2-1-1',
    rest: '75 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['chest', 'triceps'],
    secondary_muscles: ['shoulders'],
    movement_pattern: 'push',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'muscle_gain'],
    recommended_reps: '8-12',
    recommended_rest_seconds: 75,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-row',
    name: 'Kettlebell Row',
    description: 'Unilateral row with KB for back thickness',
    category: 'strength',
    muscleGroups: ['lats', 'rhomboids', 'biceps'],
    equipment: 'kettlebell',
    difficulty: 'beginner',
    instructions: [
      'Place one hand and knee on bench',
      'Hold KB in opposite hand',
      'Row KB to hip, leading with elbow',
      'Squeeze lat at top',
      'Lower with control',
      'Keep back flat'
    ],
    tips: [
      'Don\'t rotate torso',
      'Pull with back, not arm',
      'KB handle allows natural grip angle',
      'Great alternative to dumbbell rows'
    ],
    breathing: 'Exhale as you row, inhale as you lower',
    tempo: '1-1-2',
    rest: '60 seconds per arm',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12 per arm' },
      intermediate: { sets: 3, reps: '12-15 per arm' },
      advanced: { sets: 4, reps: '12-15 per arm' }
    },
    primary_muscles: ['lats'],
    secondary_muscles: ['rhomboids', 'biceps', 'rear delts'],
    movement_pattern: 'pull',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['muscle_gain', 'strength', 'general_fitness'],
    recommended_reps: '10-15',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  // ========================================
  // KETTLEBELL EXERCISES - CARRIES & CONDITIONING
  // ========================================
  {
    id: 'kettlebell-farmers-walk',
    name: 'Kettlebell Farmer\'s Walk',
    description: 'Loaded carry for grip and full-body strength',
    category: 'hybrid',
    muscleGroups: ['grip', 'traps', 'core', 'legs'],
    equipment: 'kettlebell',
    difficulty: 'beginner',
    instructions: [
      'Pick up KB in each hand',
      'Stand tall with shoulders back',
      'Walk forward with controlled steps',
      'Keep core braced',
      'Don\'t let torso lean',
      'Walk for distance or time'
    ],
    tips: [
      'Builds real-world strength',
      'Great for grip and core',
      'Keep shoulders packed',
      'Can use heavy weight'
    ],
    breathing: 'Breathe normally, don\'t hold breath',
    tempo: 'Steady walk',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, duration: '30 seconds' },
      intermediate: { sets: 4, duration: '45 seconds' },
      advanced: { sets: 4, duration: '60 seconds' }
    },
    primary_muscles: ['grip', 'traps'],
    secondary_muscles: ['core', 'legs', 'shoulders'],
    movement_pattern: 'carry',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['strength', 'general_fitness', 'athletic_performance'],
    recommended_reps: '30-60s',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-suitcase-carry',
    name: 'Kettlebell Suitcase Carry',
    description: 'Single-arm carry for anti-lateral flexion core strength',
    category: 'hybrid',
    muscleGroups: ['core', 'obliques', 'grip'],
    equipment: 'kettlebell',
    difficulty: 'beginner',
    instructions: [
      'Pick up KB in one hand',
      'Stand tall, don\'t lean',
      'Walk forward maintaining upright posture',
      'Resist lateral bending',
      'Core works to keep you straight',
      'Switch hands and repeat'
    ],
    tips: [
      'Anti-lateral flexion core exercise',
      'Fight the weight pulling you sideways',
      'Great for core stability',
      'Can use heavy weight'
    ],
    breathing: 'Breathe normally throughout',
    tempo: 'Steady walk',
    rest: '60 seconds per side',
    recommendedSets: {
      beginner: { sets: 3, duration: '30 seconds per side' },
      intermediate: { sets: 3, duration: '45 seconds per side' },
      advanced: { sets: 4, duration: '60 seconds per side' }
    },
    primary_muscles: ['core', 'obliques'],
    secondary_muscles: ['grip', 'shoulders', 'traps'],
    movement_pattern: 'carry',
    plane_of_motion: 'frontal',
    exercise_type: 'isolation',
    suitable_goals: ['general_fitness', 'athletic_performance', 'rehab'],
    recommended_reps: '30-60s',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-rack-carry',
    name: 'Kettlebell Front Rack Carry',
    description: 'KB held in rack position during walk',
    category: 'hybrid',
    muscleGroups: ['core', 'shoulders', 'legs'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    instructions: [
      'Clean KB to rack position',
      'KB rests on forearm and chest',
      'Walk forward maintaining upright posture',
      'Keep elbow close to ribs',
      'Core engaged throughout',
      'Switch arms and repeat'
    ],
    tips: [
      'Challenges posture and core',
      'Great for rack position practice',
      'Keeps shoulder packed',
      'Can use two KBs (double rack)'
    ],
    breathing: 'Breathe normally, steady rhythm',
    tempo: 'Steady walk',
    rest: '60 seconds per side',
    recommendedSets: {
      beginner: { sets: 3, duration: '30 seconds per side' },
      intermediate: { sets: 3, duration: '45 seconds per side' },
      advanced: { sets: 4, duration: '60 seconds per side' }
    },
    primary_muscles: ['core', 'shoulders'],
    secondary_muscles: ['legs', 'upper back'],
    movement_pattern: 'carry',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'general_fitness', 'strength'],
    recommended_reps: '30-60s',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-thruster',
    name: 'Kettlebell Thrusters',
    description: 'Squat to overhead press for conditioning',
    category: 'hybrid',
    muscleGroups: ['legs', 'shoulders', 'core'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    instructions: [
      'Hold KB in goblet or rack position',
      'Squat down to full depth',
      'Drive up explosively',
      'Use momentum to press KB overhead',
      'Lock out at top',
      'Lower to starting position and repeat'
    ],
    tips: [
      'Fluid movement - squat flows into press',
      'Great for conditioning',
      'Use lighter weight than squats or presses alone',
      'Breathe at top of each rep'
    ],
    breathing: 'Inhale on squat, exhale on press',
    tempo: 'Fluid and continuous',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '8-10' },
      intermediate: { sets: 4, reps: '10-12' },
      advanced: { sets: 4, reps: '12-15' }
    },
    primary_muscles: ['quads', 'shoulders'],
    secondary_muscles: ['glutes', 'core', 'triceps'],
    movement_pattern: 'squat',
    plane_of_motion: 'sagittal',
    exercise_type: 'compound',
    suitable_goals: ['fat_loss', 'endurance', 'athletic_performance'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 90,
    is_unilateral: false,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'moderate'
  },

  // ========================================
  // KETTLEBELL EXERCISES - CORE
  // ========================================
  {
    id: 'kettlebell-turkish-getup',
    name: 'Turkish Get-Up',
    description: 'Complex full-body movement from ground to standing',
    category: 'strength',
    muscleGroups: ['core', 'shoulders', 'full body'],
    equipment: 'kettlebell',
    difficulty: 'advanced',
    instructions: [
      'Lie on back, press KB overhead with one arm',
      'Bend same-side knee, foot flat',
      'Roll up onto opposite elbow',
      'Push up to hand',
      'Lift hips into bridge',
      'Sweep leg under and kneel',
      'Stand up keeping KB overhead',
      'Reverse sequence to return to ground'
    ],
    tips: [
      'Complex movement - learn with no weight first',
      'Keep eyes on KB throughout',
      'Builds shoulder stability and coordination',
      'Take your time, focus on control'
    ],
    breathing: 'Breathe at each position',
    tempo: 'Slow and controlled',
    rest: '90-120 seconds per side',
    recommendedSets: {
      beginner: { sets: 2, reps: '2-3 per side' },
      intermediate: { sets: 3, reps: '3-5 per side' },
      advanced: { sets: 3, reps: '5-8 per side' }
    },
    primary_muscles: ['core', 'shoulders'],
    secondary_muscles: ['full body'],
    movement_pattern: 'anti-rotation',
    plane_of_motion: 'transverse',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'general_fitness', 'rehab'],
    recommended_reps: '3-5',
    recommended_rest_seconds: 90,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-windmill',
    name: 'Kettlebell Windmill',
    description: 'Mobility and stability exercise for obliques and shoulders',
    category: 'flexibility',
    muscleGroups: ['obliques', 'shoulders', 'hamstrings'],
    equipment: 'kettlebell',
    difficulty: 'advanced',
    instructions: [
      'Press KB overhead with one arm',
      'Feet wide, toes pointed at angle',
      'Keep eyes on KB',
      'Hinge at hip, reach down with free hand',
      'Touch floor while keeping KB overhead',
      'Return to standing position'
    ],
    tips: [
      'Advanced movement requiring mobility',
      'Keep arm locked overhead',
      'Great for shoulder health',
      'Master with bodyweight first'
    ],
    breathing: 'Breathe throughout movement',
    tempo: 'Slow and controlled',
    rest: '60 seconds per side',
    recommendedSets: {
      beginner: { sets: 0, reps: '0' },
      intermediate: { sets: 2, reps: '5-8 per side' },
      advanced: { sets: 3, reps: '8-10 per side' }
    },
    primary_muscles: ['obliques', 'shoulders'],
    secondary_muscles: ['hamstrings', 'core'],
    movement_pattern: 'hinge',
    plane_of_motion: 'transverse',
    exercise_type: 'compound',
    suitable_goals: ['athletic_performance', 'general_fitness', 'rehab'],
    recommended_reps: '5-8',
    recommended_rest_seconds: 60,
    is_unilateral: true,
    is_beginner_friendly: false,
    requires_spotter: false,
    joint_stress_level: 'low'
  },

  {
    id: 'kettlebell-halo',
    name: 'Kettlebell Halo',
    description: 'Shoulder mobility exercise circling KB around head',
    category: 'flexibility',
    muscleGroups: ['shoulders', 'core'],
    equipment: 'kettlebell',
    difficulty: 'beginner',
    instructions: [
      'Hold KB upside down by horns at chest',
      'Circle KB around your head',
      'Keep core tight, don\'t arch back',
      'Pass KB hand-to-hand behind head',
      'Complete full circle',
      'Reverse direction'
    ],
    tips: [
      'Great warm-up for shoulders',
      'Builds shoulder mobility and stability',
      'Use light weight',
      'Keep core engaged to protect back'
    ],
    breathing: 'Breathe normally throughout',
    tempo: 'Slow and controlled',
    rest: '30 seconds',
    recommendedSets: {
      beginner: { sets: 2, reps: '8-10 each direction' },
      intermediate: { sets: 3, reps: '10-12 each direction' },
      advanced: { sets: 3, reps: '12-15 each direction' }
    },
    primary_muscles: ['shoulders'],
    secondary_muscles: ['core', 'triceps'],
    movement_pattern: 'rotation',
    plane_of_motion: 'transverse',
    exercise_type: 'isolation',
    suitable_goals: ['general_fitness', 'rehab', 'athletic_performance'],
    recommended_reps: '10-12',
    recommended_rest_seconds: 30,
    is_unilateral: false,
    is_beginner_friendly: true,
    requires_spotter: false,
    joint_stress_level: 'low'
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

// ========================================
// NEW: INTELLIGENT EXERCISE SELECTION HELPERS
// ========================================

// Get exercises by primary muscle (using new metadata)
export function getExercisesByPrimaryMuscle(muscle: string): Exercise[] {
  return exercisesDatabase.filter(ex => 
    ex.primary_muscles?.includes(muscle) || 
    (!ex.primary_muscles && ex.muscleGroups.includes(muscle))
  );
}

// Get exercises by movement pattern
export function getExercisesByMovementPattern(pattern: NonNullable<Exercise['movement_pattern']>): Exercise[] {
  return exercisesDatabase.filter(ex => ex.movement_pattern === pattern);
}

// Get exercises by goal
export function getExercisesByGoal(goal: string): Exercise[] {
  return exercisesDatabase.filter(ex => 
    ex.suitable_goals?.includes(goal as any) || 
    !ex.suitable_goals // Include exercises without goal specification as universally suitable
  );
}

// Get exercises by exercise type
export function getExercisesByType(type: 'compound' | 'isolation'): Exercise[] {
  return exercisesDatabase.filter(ex => ex.exercise_type === type);
}

// Get beginner-friendly exercises
export function getBeginnerFriendlyExercises(): Exercise[] {
  return exercisesDatabase.filter(ex => 
    ex.is_beginner_friendly === true || 
    ex.difficulty === 'beginner'
  );
}

// Get low joint-stress exercises (for rehab/injury management)
export function getLowJointStressExercises(): Exercise[] {
  return exercisesDatabase.filter(ex => 
    ex.joint_stress_level === 'low' || 
    !ex.joint_stress_level
  );
}

// Get unilateral exercises (for addressing imbalances)
export function getUnilateralExercises(): Exercise[] {
  return exercisesDatabase.filter(ex => ex.is_unilateral === true);
}

// INTELLIGENT EXERCISE SELECTOR with multiple criteria
export interface ExerciseSelectionCriteria {
  equipment?: Exercise['equipment'][];
  primaryMuscles?: string[];
  movementPattern?: NonNullable<Exercise['movement_pattern']>[];
  goal?: string;
  difficulty?: Exercise['difficulty'][];
  exerciseType?: ('compound' | 'isolation')[];
  isUnilateral?: boolean;
  isBeginnerFriendly?: boolean;
  lowJointStress?: boolean;
  excludeIds?: string[];
}

export function selectExercises(criteria: ExerciseSelectionCriteria): Exercise[] {
  return exercisesDatabase.filter(exercise => {
    // Equipment filter
    if (criteria.equipment && criteria.equipment.length > 0) {
      if (!criteria.equipment.includes(exercise.equipment)) return false;
    }

    // Primary muscles filter (check new metadata first, fallback to muscleGroups)
    if (criteria.primaryMuscles && criteria.primaryMuscles.length > 0) {
      const hasMatch = criteria.primaryMuscles.some(muscle =>
        exercise.primary_muscles?.includes(muscle) ||
        exercise.muscleGroups.includes(muscle)
      );
      if (!hasMatch) return false;
    }

    // Movement pattern filter
    if (criteria.movementPattern && criteria.movementPattern.length > 0) {
      if (!exercise.movement_pattern || !criteria.movementPattern.includes(exercise.movement_pattern)) {
        return false;
      }
    }

    // Goal filter
    if (criteria.goal) {
      if (exercise.suitable_goals && !exercise.suitable_goals.includes(criteria.goal as any)) {
        return false;
      }
    }

    // Difficulty filter
    if (criteria.difficulty && criteria.difficulty.length > 0) {
      if (!criteria.difficulty.includes(exercise.difficulty)) return false;
    }

    // Exercise type filter
    if (criteria.exerciseType && criteria.exerciseType.length > 0) {
      if (!exercise.exercise_type || !criteria.exerciseType.includes(exercise.exercise_type)) {
        return false;
      }
    }

    // Unilateral filter
    if (criteria.isUnilateral !== undefined) {
      if (exercise.is_unilateral !== criteria.isUnilateral) return false;
    }

    // Beginner-friendly filter
    if (criteria.isBeginnerFriendly === true) {
      if (!exercise.is_beginner_friendly && exercise.difficulty !== 'beginner') {
        return false;
      }
    }

    // Low joint stress filter
    if (criteria.lowJointStress === true) {
      if (exercise.joint_stress_level && exercise.joint_stress_level !== 'low') {
        return false;
      }
    }

    // Exclude specific exercises
    if (criteria.excludeIds && criteria.excludeIds.includes(exercise.id)) {
      return false;
    }

    return true;
  });
}

// SMART SELECTOR: Balance push/pull ratios
export function getBalancedPushPullExercises(options: {
  count: number;
  equipment?: Exercise['equipment'][];
  difficulty?: Exercise['difficulty'];
  goal?: string;
}): { push: Exercise[]; pull: Exercise[] } {
  const pushCount = Math.ceil(options.count / 2);
  const pullCount = Math.floor(options.count / 2);

  const pushExercises = selectExercises({
    movementPattern: ['push', 'press'],
    equipment: options.equipment,
    difficulty: options.difficulty ? [options.difficulty] : undefined,
    goal: options.goal
  }).slice(0, pushCount);

  const pullExercises = selectExercises({
    movementPattern: ['pull'],
    equipment: options.equipment,
    difficulty: options.difficulty ? [options.difficulty] : undefined,
    goal: options.goal
  }).slice(0, pullCount);

  return { push: pushExercises, pull: pullExercises };
}

// CABLE/MACHINE SELECTOR for hypertrophy blocks
export function getMachineAndCableExercises(options: {
  primaryMuscles: string[];
  count: number;
  difficulty?: Exercise['difficulty'];
}): Exercise[] {
  return selectExercises({
    equipment: ['cable', 'machine'],
    primaryMuscles: options.primaryMuscles,
    difficulty: options.difficulty ? [options.difficulty] : undefined,
    goal: 'muscle_gain'
  }).slice(0, options.count);
}

// KETTLEBELL SELECTOR for athletic/conditioning work
export function getKettlebellExercises(options: {
  goal: 'athletic_performance' | 'endurance' | 'fat_loss';
  count: number;
  difficulty?: Exercise['difficulty'];
}): Exercise[] {
  return selectExercises({
    equipment: ['kettlebell'],
    goal: options.goal,
    difficulty: options.difficulty ? [options.difficulty] : undefined
  }).slice(0, options.count);
}
