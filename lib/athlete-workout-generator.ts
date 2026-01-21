/**
 * Athlete-Intelligent Workout Generator v2.0
 * 
 * Features:
 * - COHERENT SPLIT-BASED PROGRAMMING (not random exercises)
 * - Each day has a clear theme and purpose
 * - Exercise selection matches the day's muscle group focus
 * - Progressive overload and deload weeks
 * - Structured session blueprints (warm-up → main → accessories → core/finisher)
 * - Athlete programming (RPE, tempo, %1RM, coaching cues)
 */

import { Exercise, WorkoutPlan, Workout, WorkoutExercise, WarmupSection, WarmupSet } from '@/types';

// ========================================
// SPLIT LIBRARY - Defines workout structure by goal & frequency
// ========================================

// Session types used by the generator (non-optional subset of Workout['sessionType'])
type SessionType = 'strength' | 'hypertrophy' | 'conditioning' | 'power' | 'speed' | 'recovery' | 'deload';

interface SplitDay {
  theme: string; // e.g., "Push (Chest/Shoulders/Triceps)"
  purpose: string; // 1-2 sentence description
  sessionType: SessionType;
  primaryMuscles: string[]; // Muscles to prioritize for exercise selection
  secondaryMuscles?: string[]; // Optional secondary muscles
  mainLiftPattern?: string[]; // Movement patterns for main lift (e.g., ['push', 'press'])
  accessoryPatterns?: string[]; // Movement patterns for accessories
}

interface WorkoutSplit {
  name: string;
  description: string;
  days: SplitDay[];
}

const WORKOUT_SPLITS: Record<string, Record<number, WorkoutSplit>> = {
  // STRENGTH TRAINING SPLITS
  strength: {
    3: {
      name: 'Push / Pull / Legs',
      description: 'Classic 3-day split focusing on compound strength',
      days: [
        {
          theme: 'Push (Chest/Shoulders/Triceps)',
          purpose: 'Build pressing strength and upper body power with compound movements.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'shoulders', 'triceps'],
          mainLiftPattern: ['bench', 'press', 'push'],
          accessoryPatterns: ['press', 'push', 'raise', 'extension']
        },
        {
          theme: 'Pull (Back/Biceps)',
          purpose: 'Develop pulling strength and back thickness with heavy rows and pull-ups.',
          sessionType: 'strength',
          primaryMuscles: ['back', 'biceps', 'lats'],
          secondaryMuscles: ['rear delts', 'traps'],
          mainLiftPattern: ['deadlift', 'row', 'pull'],
          accessoryPatterns: ['row', 'pull', 'curl', 'shrug']
        },
        {
          theme: 'Legs (Quads/Glutes/Hamstrings)',
          purpose: 'Build lower body strength and power with squats and hip-dominant movements.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'hamstrings'],
          secondaryMuscles: ['calves', 'core'],
          mainLiftPattern: ['squat', 'lunge'],
          accessoryPatterns: ['squat', 'lunge', 'leg press', 'leg curl', 'calf']
        }
      ]
    },
    4: {
      name: 'Upper / Lower Split',
      description: '4-day split alternating upper and lower body',
      days: [
        {
          theme: 'Upper Strength (Chest/Back Focus)',
          purpose: 'Heavy compound pressing and pulling for upper body strength.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'back', 'shoulders'],
          secondaryMuscles: ['biceps', 'triceps'],
          mainLiftPattern: ['bench', 'press', 'row'],
          accessoryPatterns: ['press', 'row', 'pull', 'push']
        },
        {
          theme: 'Lower Strength (Squat Focus)',
          purpose: 'Build leg strength with heavy squatting and quad-dominant movements.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes'],
          secondaryMuscles: ['hamstrings', 'calves'],
          mainLiftPattern: ['squat'],
          accessoryPatterns: ['squat', 'lunge', 'leg press']
        },
        {
          theme: 'Upper Hypertrophy (Shoulders/Arms)',
          purpose: 'Volume work for upper body muscle growth and accessory strength.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['shoulders', 'biceps', 'triceps'],
          secondaryMuscles: ['chest', 'back'],
          mainLiftPattern: ['press', 'row'],
          accessoryPatterns: ['press', 'raise', 'curl', 'extension', 'pull']
        },
        {
          theme: 'Lower Strength (Hinge Focus)',
          purpose: 'Develop posterior chain power with deadlifts and hip-dominant movements.',
          sessionType: 'strength',
          primaryMuscles: ['hamstrings', 'glutes', 'back'],
          secondaryMuscles: ['quads', 'core'],
          mainLiftPattern: ['deadlift', 'rdl'],
          accessoryPatterns: ['deadlift', 'rdl', 'good morning', 'leg curl']
        }
      ]
    },
    5: {
      name: 'Push / Pull / Legs / Upper / Lower',
      description: '5-day split with extra volume and variety',
      days: [
        {
          theme: 'Push (Chest Focus)',
          purpose: 'Heavy pressing for chest strength and power.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'shoulders', 'triceps'],
          mainLiftPattern: ['bench', 'press'],
          accessoryPatterns: ['press', 'push', 'fly', 'extension']
        },
        {
          theme: 'Pull (Back Focus)',
          purpose: 'Build back thickness and pulling strength.',
          sessionType: 'strength',
          primaryMuscles: ['back', 'lats', 'biceps'],
          mainLiftPattern: ['deadlift', 'row', 'pull'],
          accessoryPatterns: ['row', 'pull', 'curl']
        },
        {
          theme: 'Legs (Squat Focus)',
          purpose: 'Quad-dominant leg strength.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes'],
          mainLiftPattern: ['squat'],
          accessoryPatterns: ['squat', 'lunge', 'leg press']
        },
        {
          theme: 'Upper (Shoulders/Arms)',
          purpose: 'Upper body volume and accessory work.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['shoulders', 'biceps', 'triceps'],
          mainLiftPattern: ['press'],
          accessoryPatterns: ['press', 'raise', 'curl', 'extension']
        },
        {
          theme: 'Lower (Hinge Focus)',
          purpose: 'Posterior chain strength and power.',
          sessionType: 'strength',
          primaryMuscles: ['hamstrings', 'glutes', 'back'],
          mainLiftPattern: ['deadlift', 'rdl'],
          accessoryPatterns: ['deadlift', 'rdl', 'leg curl']
        }
      ]
    }
  },

  // HYPERTROPHY (MUSCLE GAIN) SPLITS
  muscle_gain: {
    3: {
      name: 'Push / Pull / Legs (Volume)',
      description: '3-day hypertrophy split with higher volume',
      days: [
        {
          theme: 'Push (Chest/Shoulders/Triceps)',
          purpose: 'Build upper body pressing muscles with moderate weight and high volume.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['chest', 'shoulders', 'triceps'],
          mainLiftPattern: ['bench', 'press'],
          accessoryPatterns: ['press', 'fly', 'raise', 'extension']
        },
        {
          theme: 'Pull (Back/Biceps/Rear Delts)',
          purpose: 'Develop back width and thickness with rowing and pulling variations.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['back', 'biceps', 'lats'],
          secondaryMuscles: ['rear delts', 'traps'],
          mainLiftPattern: ['row', 'pull', 'deadlift'],
          accessoryPatterns: ['row', 'pull', 'curl', 'shrug', 'raise']
        },
        {
          theme: 'Legs (Quads/Glutes/Hamstrings/Calves)',
          purpose: 'Complete lower body development with squat and hinge movements.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['quads', 'glutes', 'hamstrings', 'calves'],
          mainLiftPattern: ['squat', 'leg press'],
          accessoryPatterns: ['squat', 'lunge', 'leg curl', 'leg extension', 'calf']
        }
      ]
    },
    4: {
      name: 'Upper / Lower (High Volume)',
      description: '4-day split with extra volume for muscle growth',
      days: [
        {
          theme: 'Upper A (Chest/Back Focus)',
          purpose: 'High-volume pressing and rowing for upper body mass.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['chest', 'back'],
          secondaryMuscles: ['shoulders', 'biceps', 'triceps'],
          mainLiftPattern: ['bench', 'row'],
          accessoryPatterns: ['press', 'row', 'fly', 'pull']
        },
        {
          theme: 'Lower A (Quad Focus)',
          purpose: 'Quad-dominant leg training for size and definition.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['quads', 'glutes'],
          secondaryMuscles: ['hamstrings', 'calves'],
          mainLiftPattern: ['squat', 'leg press'],
          accessoryPatterns: ['squat', 'lunge', 'leg extension']
        },
        {
          theme: 'Upper B (Shoulders/Arms)',
          purpose: 'Shoulder and arm hypertrophy with isolation work.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['shoulders', 'biceps', 'triceps'],
          secondaryMuscles: ['chest', 'back'],
          mainLiftPattern: ['press', 'row'],
          accessoryPatterns: ['press', 'raise', 'curl', 'extension', 'pull']
        },
        {
          theme: 'Lower B (Hamstring/Glute Focus)',
          purpose: 'Posterior chain development for balanced leg growth.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['hamstrings', 'glutes'],
          secondaryMuscles: ['quads', 'calves', 'back'],
          mainLiftPattern: ['deadlift', 'rdl'],
          accessoryPatterns: ['rdl', 'leg curl', 'good morning', 'lunge']
        }
      ]
    },
    5: {
      name: 'Push / Pull / Legs / Upper / Lower (Bodybuilding)',
      description: '5-day bodybuilding split for maximum muscle growth',
      days: [
        {
          theme: 'Push A (Chest Focus)',
          purpose: 'Chest hypertrophy with pressing and fly variations.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['chest', 'shoulders', 'triceps'],
          mainLiftPattern: ['bench', 'press'],
          accessoryPatterns: ['press', 'fly', 'extension']
        },
        {
          theme: 'Pull A (Back Width)',
          purpose: 'Lat development with vertical pulling movements.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['lats', 'back', 'biceps'],
          mainLiftPattern: ['pull', 'row'],
          accessoryPatterns: ['pull', 'pulldown', 'curl']
        },
        {
          theme: 'Legs A (Quad Focus)',
          purpose: 'Quad-dominant leg hypertrophy.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['quads', 'glutes'],
          mainLiftPattern: ['squat', 'leg press'],
          accessoryPatterns: ['squat', 'lunge', 'leg extension']
        },
        {
          theme: 'Push B (Shoulders/Triceps)',
          purpose: 'Shoulder and tricep isolation for arm development.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['shoulders', 'triceps'],
          mainLiftPattern: ['press'],
          accessoryPatterns: ['press', 'raise', 'extension']
        },
        {
          theme: 'Pull B (Back Thickness)',
          purpose: 'Back thickness with rowing variations and deadlifts.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['back', 'traps', 'biceps'],
          mainLiftPattern: ['deadlift', 'row'],
          accessoryPatterns: ['row', 'shrug', 'curl']
        }
      ]
    }
  },

  // ATHLETIC PERFORMANCE SPLITS (Speed/Strength/Recovery)
  athletic_performance: {
    3: {
      name: 'Speed / Strength / Recovery',
      description: 'Athletic development with speed, power, and recovery work',
      days: [
        {
          theme: 'Speed & Plyometrics',
          purpose: 'Develop speed, acceleration, and explosive power with sprint work and plyometrics.',
          sessionType: 'speed',
          primaryMuscles: ['quads', 'glutes', 'calves'],
          mainLiftPattern: ['jump', 'sprint', 'explosive'],
          accessoryPatterns: ['jump', 'explosive', 'unilateral']
        },
        {
          theme: 'Strength & Power',
          purpose: 'Build strength and power with heavy compound lifts and explosive training.',
          sessionType: 'power',
          primaryMuscles: ['quads', 'glutes', 'back', 'chest'],
          mainLiftPattern: ['squat', 'deadlift', 'press'],
          accessoryPatterns: ['explosive', 'power', 'unilateral']
        },
        {
          theme: 'Recovery & Mobility',
          purpose: 'Active recovery, mobility work, and aerobic base development for tissue health and readiness.',
          sessionType: 'recovery',
          primaryMuscles: ['core'],
          mainLiftPattern: ['mobility', 'stability'],
          accessoryPatterns: ['mobility', 'stability', 'core', 'stretch']
        }
      ]
    },
    4: {
      name: 'Speed / Lower Strength / Upper Power / Recovery',
      description: '4-day athletic split with dedicated speed and recovery days',
      days: [
        {
          theme: 'Speed & Acceleration',
          purpose: 'Sprint mechanics, acceleration, and linear speed development.',
          sessionType: 'speed',
          primaryMuscles: ['quads', 'glutes', 'calves'],
          mainLiftPattern: ['sprint', 'explosive'],
          accessoryPatterns: ['jump', 'explosive', 'sprint']
        },
        {
          theme: 'Lower Body Strength',
          purpose: 'Maximal lower body strength with heavy squats and hinges.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'hamstrings'],
          mainLiftPattern: ['squat', 'deadlift'],
          accessoryPatterns: ['squat', 'lunge', 'unilateral']
        },
        {
          theme: 'Upper Body Power',
          purpose: 'Upper body strength and power for athletic performance.',
          sessionType: 'power',
          primaryMuscles: ['chest', 'back', 'shoulders'],
          mainLiftPattern: ['bench', 'row', 'press'],
          accessoryPatterns: ['press', 'row', 'pull', 'explosive']
        },
        {
          theme: 'Recovery & Conditioning',
          purpose: 'Zone 2 conditioning, mobility, and recovery work to build aerobic base.',
          sessionType: 'recovery',
          primaryMuscles: ['core'],
          mainLiftPattern: ['cardio', 'mobility'],
          accessoryPatterns: ['mobility', 'core', 'stability']
        }
      ]
    },
    5: {
      name: 'Speed / Power / Strength Lower / Strength Upper / Recovery',
      description: '5-day elite athletic program',
      days: [
        {
          theme: 'Speed & Agility',
          purpose: 'Maximum velocity sprinting and change-of-direction work.',
          sessionType: 'speed',
          primaryMuscles: ['quads', 'glutes', 'calves'],
          mainLiftPattern: ['sprint', 'explosive'],
          accessoryPatterns: ['jump', 'explosive']
        },
        {
          theme: 'Power & Plyometrics',
          purpose: 'Explosive power development with Olympic lifts and jumps.',
          sessionType: 'power',
          primaryMuscles: ['quads', 'glutes', 'back'],
          mainLiftPattern: ['clean', 'snatch', 'jump'],
          accessoryPatterns: ['explosive', 'jump', 'power']
        },
        {
          theme: 'Lower Body Strength',
          purpose: 'Maximal lower body strength development.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'hamstrings'],
          mainLiftPattern: ['squat', 'deadlift'],
          accessoryPatterns: ['squat', 'lunge', 'rdl']
        },
        {
          theme: 'Upper Body Strength',
          purpose: 'Upper body strength and stability for athletic movements.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'back', 'shoulders'],
          mainLiftPattern: ['bench', 'row', 'press'],
          accessoryPatterns: ['press', 'row', 'pull']
        },
        {
          theme: 'Recovery & Aerobic Base',
          purpose: 'Active recovery, aerobic conditioning, and mobility.',
          sessionType: 'recovery',
          primaryMuscles: ['core'],
          mainLiftPattern: ['cardio', 'mobility'],
          accessoryPatterns: ['mobility', 'core']
        }
      ]
    }
  },

  // CONDITIONING / FAT LOSS SPLITS
  weight_loss: {
    3: {
      name: 'Strength / Conditioning / Hybrid',
      description: 'Mixed strength and conditioning for fat loss',
      days: [
        {
          theme: 'Full Body Strength',
          purpose: 'Maintain muscle mass with compound strength training.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'chest', 'back'],
          mainLiftPattern: ['squat', 'press', 'row'],
          accessoryPatterns: ['push', 'pull', 'squat']
        },
        {
          theme: 'Conditioning & Circuits',
          purpose: 'High-calorie burn with circuit training and intervals.',
          sessionType: 'conditioning',
          primaryMuscles: ['full body'],
          mainLiftPattern: ['cardio', 'circuit'],
          accessoryPatterns: ['cardio', 'bodyweight', 'circuit']
        },
        {
          theme: 'Upper/Lower Hybrid',
          purpose: 'Combined strength and cardio for total-body conditioning.',
          sessionType: 'conditioning',
          primaryMuscles: ['chest', 'back', 'legs'],
          mainLiftPattern: ['press', 'row', 'squat'],
          accessoryPatterns: ['press', 'row', 'cardio']
        }
      ]
    },
    4: {
      name: 'Upper / Lower / Conditioning x2',
      description: '2 strength days + 2 conditioning days',
      days: [
        {
          theme: 'Upper Body Strength',
          purpose: 'Preserve upper body muscle during fat loss.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'back', 'shoulders'],
          mainLiftPattern: ['press', 'row'],
          accessoryPatterns: ['press', 'row', 'pull']
        },
        {
          theme: 'Conditioning & Cardio',
          purpose: 'High-intensity intervals for maximum calorie burn.',
          sessionType: 'conditioning',
          primaryMuscles: ['full body'],
          mainLiftPattern: ['cardio', 'circuit'],
          accessoryPatterns: ['cardio', 'bodyweight']
        },
        {
          theme: 'Lower Body Strength',
          purpose: 'Maintain leg muscle and strength during cut.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'hamstrings'],
          mainLiftPattern: ['squat', 'deadlift'],
          accessoryPatterns: ['squat', 'lunge', 'leg press']
        },
        {
          theme: 'Metabolic Conditioning',
          purpose: 'Full-body circuits for fat loss and conditioning.',
          sessionType: 'conditioning',
          primaryMuscles: ['full body'],
          mainLiftPattern: ['circuit', 'cardio'],
          accessoryPatterns: ['cardio', 'bodyweight', 'circuit']
        }
      ]
    },
    5: {
      name: 'PPL + Conditioning x2',
      description: '3 strength days + 2 dedicated cardio days',
      days: [
        {
          theme: 'Push (Chest/Shoulders/Triceps)',
          purpose: 'Upper body push strength to maintain muscle.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'shoulders', 'triceps'],
          mainLiftPattern: ['press', 'bench'],
          accessoryPatterns: ['press', 'push', 'extension']
        },
        {
          theme: 'HIIT Conditioning',
          purpose: 'High-intensity interval training for fat burning.',
          sessionType: 'conditioning',
          primaryMuscles: ['full body'],
          mainLiftPattern: ['cardio', 'circuit'],
          accessoryPatterns: ['cardio', 'bodyweight']
        },
        {
          theme: 'Pull (Back/Biceps)',
          purpose: 'Upper body pull strength.',
          sessionType: 'strength',
          primaryMuscles: ['back', 'biceps'],
          mainLiftPattern: ['row', 'pull'],
          accessoryPatterns: ['row', 'pull', 'curl']
        },
        {
          theme: 'Legs (Full Lower)',
          purpose: 'Complete lower body strength work.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'hamstrings'],
          mainLiftPattern: ['squat', 'deadlift'],
          accessoryPatterns: ['squat', 'lunge', 'leg curl']
        },
        {
          theme: 'Steady-State Cardio',
          purpose: 'Low-intensity steady cardio for additional calorie burn.',
          sessionType: 'conditioning',
          primaryMuscles: ['full body'],
          mainLiftPattern: ['cardio'],
          accessoryPatterns: ['cardio', 'core']
        }
      ]
    }
  },

  // GENERAL FITNESS & FLEXIBILITY (use strength splits as base)
  general_fitness: {
    3: {
      name: 'Full Body x3',
      description: 'Balanced full-body training for general health',
      days: [
        {
          theme: 'Full Body A (Push Focus)',
          purpose: 'Total body workout with emphasis on pushing movements.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'quads', 'shoulders'],
          mainLiftPattern: ['press', 'squat'],
          accessoryPatterns: ['press', 'squat', 'push']
        },
        {
          theme: 'Full Body B (Pull Focus)',
          purpose: 'Total body workout with emphasis on pulling movements.',
          sessionType: 'strength',
          primaryMuscles: ['back', 'hamstrings', 'biceps'],
          mainLiftPattern: ['row', 'deadlift'],
          accessoryPatterns: ['row', 'pull', 'hinge']
        },
        {
          theme: 'Full Body C (Legs & Core)',
          purpose: 'Lower body and core strength for functional fitness.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'core'],
          mainLiftPattern: ['squat', 'lunge'],
          accessoryPatterns: ['squat', 'lunge', 'core']
        }
      ]
    },
    4: {
      name: 'Upper / Lower x2',
      description: 'Simple upper/lower split for general fitness',
      days: [
        {
          theme: 'Upper Body A',
          purpose: 'Upper body strength and conditioning.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'back', 'shoulders'],
          mainLiftPattern: ['press', 'row'],
          accessoryPatterns: ['press', 'row', 'pull']
        },
        {
          theme: 'Lower Body A',
          purpose: 'Lower body strength and functional movement.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'hamstrings'],
          mainLiftPattern: ['squat'],
          accessoryPatterns: ['squat', 'lunge', 'leg curl']
        },
        {
          theme: 'Upper Body B',
          purpose: 'Upper body volume and accessory work.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['shoulders', 'biceps', 'triceps'],
          mainLiftPattern: ['press'],
          accessoryPatterns: ['press', 'curl', 'extension']
        },
        {
          theme: 'Lower Body B',
          purpose: 'Lower body power and posterior chain.',
          sessionType: 'strength',
          primaryMuscles: ['hamstrings', 'glutes'],
          mainLiftPattern: ['deadlift', 'rdl'],
          accessoryPatterns: ['rdl', 'leg curl', 'lunge']
        }
      ]
    },
    5: {
      name: 'PPL Split (Balanced)',
      description: 'Classic push/pull/legs for general development',
      days: [
        {
          theme: 'Push (Chest/Shoulders/Triceps)',
          purpose: 'Upper body pushing strength.',
          sessionType: 'strength',
          primaryMuscles: ['chest', 'shoulders', 'triceps'],
          mainLiftPattern: ['press', 'bench'],
          accessoryPatterns: ['press', 'push', 'extension']
        },
        {
          theme: 'Pull (Back/Biceps)',
          purpose: 'Upper body pulling strength.',
          sessionType: 'strength',
          primaryMuscles: ['back', 'biceps', 'lats'],
          mainLiftPattern: ['row', 'pull', 'deadlift'],
          accessoryPatterns: ['row', 'pull', 'curl']
        },
        {
          theme: 'Legs (Full Lower)',
          purpose: 'Complete lower body strength.',
          sessionType: 'strength',
          primaryMuscles: ['quads', 'glutes', 'hamstrings'],
          mainLiftPattern: ['squat'],
          accessoryPatterns: ['squat', 'lunge', 'leg press']
        },
        {
          theme: 'Upper Body (Hypertrophy)',
          purpose: 'Volume work for upper body muscle.',
          sessionType: 'hypertrophy',
          primaryMuscles: ['chest', 'back', 'shoulders'],
          mainLiftPattern: ['press', 'row'],
          accessoryPatterns: ['press', 'row', 'fly']
        },
        {
          theme: 'Lower Body (Posterior Chain)',
          purpose: 'Hip-dominant leg training.',
          sessionType: 'strength',
          primaryMuscles: ['hamstrings', 'glutes'],
          mainLiftPattern: ['deadlift', 'rdl'],
          accessoryPatterns: ['rdl', 'leg curl', 'good morning']
        }
      ]
    }
  },

  // ENDURANCE & FLEXIBILITY use conditioning splits
  endurance: {
    3: { name: 'Endurance Base', description: 'Cardio-focused training', days: [] }, // Will use conditioning logic
    4: { name: 'Endurance Base', description: 'Cardio-focused training', days: [] },
    5: { name: 'Endurance Base', description: 'Cardio-focused training', days: [] }
  },
  flexibility: {
    3: { name: 'Mobility & Flexibility', description: 'Flexibility-focused training', days: [] },
    4: { name: 'Mobility & Flexibility', description: 'Flexibility-focused training', days: [] },
    5: { name: 'Mobility & Flexibility', description: 'Flexibility-focused training', days: [] }
  }
};

// ========================================
// SESSION BLUEPRINTS - Structure for each workout type
// ========================================

interface ExerciseRole {
  role: WorkoutExercise['sessionRole'];
  count: number; // How many exercises
  sets: number;
  reps: number | [number, number];
  restSeconds: number;
  percent1RM?: number;
  rpe?: number;
}

// Goal-specific session blueprints (ensures 5-8 exercises per workout, ~60 min)
const SESSION_BLUEPRINTS: Record<SessionType, ExerciseRole[]> = {
  // STRENGTH: Heavy compounds, long rest, muscle-group focused (6 exercises, ~60 min)
  strength: [
    { role: 'main', count: 1, sets: 4, reps: 5, restSeconds: 240, percent1RM: 80, rpe: 8 },        // ~12 min
    { role: 'secondary', count: 1, sets: 3, reps: 6, restSeconds: 180, percent1RM: 75, rpe: 7 },  // ~10 min
    { role: 'accessory', count: 3, sets: 3, reps: [8, 10], restSeconds: 90, rpe: 7 },             // ~20 min
    { role: 'core', count: 1, sets: 3, reps: [12, 15], restSeconds: 60, rpe: 7 }                  // ~5 min
  ], // Total: 6 exercises, ~47 min + 12 min warm-up = ~59 min
  
  // HYPERTROPHY: Moderate weight, higher volume, pump focus (7 exercises, ~60 min)
  hypertrophy: [
    { role: 'main', count: 1, sets: 4, reps: [8, 10], restSeconds: 120, percent1RM: 70, rpe: 8 }, // ~10 min
    { role: 'secondary', count: 1, sets: 4, reps: [10, 12], restSeconds: 90, rpe: 7 },            // ~8 min
    { role: 'accessory', count: 4, sets: 3, reps: [12, 15], restSeconds: 60, rpe: 7 },            // ~20 min
    { role: 'core', count: 1, sets: 3, reps: [15, 20], restSeconds: 45, rpe: 7 }                  // ~4 min
  ], // Total: 7 exercises, ~42 min + 12 min warm-up = ~54 min
  
  // POWER: Explosive work, full recovery (5 exercises, ~60 min)
  power: [
    { role: 'main', count: 1, sets: 5, reps: [3, 5], restSeconds: 240, percent1RM: 75, rpe: 8 },  // ~15 min
    { role: 'secondary', count: 1, sets: 4, reps: 6, restSeconds: 180, percent1RM: 70, rpe: 7 },  // ~10 min
    { role: 'accessory', count: 2, sets: 3, reps: 8, restSeconds: 120, rpe: 7 },                  // ~12 min
    { role: 'core', count: 1, sets: 3, reps: [10, 12], restSeconds: 60, rpe: 7 }                  // ~5 min
  ], // Total: 5 exercises, ~42 min + 12 min warm-up = ~54 min
  
  // CONDITIONING: Circuits, intervals, high-rep (6-7 exercises, ~60 min)
  conditioning: [
    { role: 'main', count: 1, sets: 4, reps: 15, restSeconds: 60, rpe: 8 },                       // ~8 min (cardio)
    { role: 'secondary', count: 1, sets: 3, reps: 12, restSeconds: 60, rpe: 7 },                  // ~6 min
    { role: 'accessory', count: 4, sets: 3, reps: 15, restSeconds: 45, rpe: 7 },                  // ~18 min
    { role: 'finisher', count: 1, sets: 3, reps: [20, 30], restSeconds: 30, rpe: 9 }              // ~4 min
  ], // Total: 7 exercises, ~36 min + 10 min warm-up = ~46 min
  
  // SPEED: Sprint drills, plyos, explosive (6-7 exercises, ~60 min)
  speed: [
    { role: 'main', count: 2, sets: 6, reps: 6, restSeconds: 240, rpe: 9 },                       // ~20 min (sprint work)
    { role: 'secondary', count: 2, sets: 3, reps: 6, restSeconds: 180, rpe: 8 },                  // ~12 min (plyos)
    { role: 'accessory', count: 2, sets: 3, reps: 8, restSeconds: 90, rpe: 6 },                   // ~10 min (unilateral)
    { role: 'core', count: 1, sets: 3, reps: [12, 15], restSeconds: 60, rpe: 6 }                  // ~5 min
  ], // Total: 7 exercises, ~47 min + 10 min warm-up = ~57 min
  
  // RECOVERY: Mobility, Z2 cardio, stability (6 exercises, ~60 min)
  recovery: [
    { role: 'main', count: 1, sets: 1, reps: [25, 35], restSeconds: 0, rpe: 5 },                  // ~30 min (Z2 cardio)
    { role: 'accessory', count: 4, sets: 2, reps: [10, 12], restSeconds: 45, rpe: 5 },            // ~12 min (mobility/stability)
    { role: 'core', count: 1, sets: 3, reps: [12, 15], restSeconds: 30, rpe: 5 }                  // ~4 min
  ], // Total: 6 exercises, ~46 min + 10 min warm-up = ~56 min
  
  // DELOAD: Reduced volume/intensity (5 exercises, ~45 min)
  deload: [
    { role: 'main', count: 1, sets: 2, reps: 5, restSeconds: 180, percent1RM: 65, rpe: 6 },       // ~8 min
    { role: 'secondary', count: 1, sets: 2, reps: 8, restSeconds: 120, rpe: 6 },                  // ~6 min
    { role: 'accessory', count: 2, sets: 2, reps: 10, restSeconds: 90, rpe: 6 },                  // ~8 min
    { role: 'core', count: 1, sets: 2, reps: 12, restSeconds: 60, rpe: 5 }                        // ~3 min
  ] // Total: 5 exercises, ~25 min + 10 min warm-up = ~35 min (intentionally short for recovery)
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Generate warm-up section with progressive ramp sets
 */
export function generateWarmup(mainExercise: Exercise, sessionType: SessionType): WarmupSection {
  const isBarbell = mainExercise.equipment === 'barbell';
  const isMainLift = ['bench', 'squat', 'deadlift', 'press'].some(pattern => 
    mainExercise.name.toLowerCase().includes(pattern)
  );
  
  const warmup: WarmupSection = {
    general: [
      '5 min light cardio (bike, row, or jog)',
      'Dynamic stretching (leg swings, arm circles)',
      '10 bodyweight squats',
      '10 push-ups or incline push-ups',
    ],
    mobility: [
      '10 cat-cow stretches',
      '10 hip circles each direction',
      '10 shoulder dislocations with band or dowel',
      '5 deep bodyweight squats with 2-sec pause',
    ],
  };
  
  // Add specific warm-up for athletic sessions
  if (sessionType === 'speed') {
    warmup.general = [
      '5 min light jog or bike',
      'Dynamic warm-up: high knees × 20m, butt kicks × 20m, A-skips × 20m',
      'Sprint mechanics drills: wall drives (2×10 each leg), falling starts (3 reps)',
      '3-4 progressive build-ups: 50m @ 50%, 60%, 70%, 80%',
    ];
    warmup.mobility = [
      'Leg swings: 10 forward/back + 10 lateral (each leg)',
      'Walking lunges with rotation: 10 reps',
      'Ankle mobility: 10 circles + 10 dorsiflexion pumps (each)',
      'Hip flexor march: 2×10 each leg',
    ];
  }
  
  if (sessionType === 'recovery') {
    warmup.general = [
      '3-5 min easy movement (walking, light bike)',
      'Gentle joint rotations',
    ];
    warmup.mobility = [
      '90/90 hip stretch: 30 sec each side',
      'Cat-cow: 10 reps',
      'Child\'s pose: 30 sec',
      'Thread the needle: 30 sec each side',
    ];
  }
  
  // Add ramp sets for barbell main lifts in strength/power sessions
  if (isBarbell && isMainLift && (sessionType === 'strength' || sessionType === 'power' || sessionType === 'hypertrophy')) {
    warmup.rampSets = [
      { percent1RM: 0, reps: 10, notes: 'Bar only - focus on technique' },
      { percent1RM: 40, reps: 8, notes: 'Light - establish groove' },
      { percent1RM: 55, reps: 5, notes: 'Moderate - speed work' },
      { percent1RM: 70, reps: 3, notes: 'Heavy - feel the weight' },
      { percent1RM: 80, reps: 1, notes: 'Very heavy - final prep set' },
    ];
  }
  
  return warmup;
}

/**
 * Filter exercises by muscle groups and patterns
 */
function filterExercisesByMuscles(
  exercises: Exercise[],
  primaryMuscles: string[],
  secondaryMuscles: string[] = [],
  patterns?: string[]
): Exercise[] {
  return exercises.filter(ex => {
    // Check if exercise targets primary muscles
    const matchesPrimary = ex.muscleGroups.some(mg => 
      primaryMuscles.some(pm => mg.toLowerCase().includes(pm.toLowerCase()) || pm.toLowerCase().includes(mg.toLowerCase()))
    );
    
    // Check if exercise targets secondary muscles
    const matchesSecondary = secondaryMuscles.length === 0 || ex.muscleGroups.some(mg =>
      secondaryMuscles.some(sm => mg.toLowerCase().includes(sm.toLowerCase()) || sm.toLowerCase().includes(mg.toLowerCase()))
    );
    
    // Check if exercise name matches patterns
    const matchesPattern = !patterns || patterns.some(pattern =>
      ex.name.toLowerCase().includes(pattern.toLowerCase())
    );
    
    return (matchesPrimary || matchesSecondary) && matchesPattern;
  });
}

/**
 * Select exercises for a workout based on the session blueprint and day theme
 */
function selectExercisesForSession(
  splitDay: SplitDay,
  blueprint: ExerciseRole[],
  availableExercises: Exercise[],
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  weekNumber: number
): WorkoutExercise[] {
  const workoutExercises: WorkoutExercise[] = [];
  let order = 1;
  
  // Track used exercises to avoid duplicates within the workout
  const usedExerciseIds = new Set<string>();
  
  for (const roleSpec of blueprint) {
    // Filter exercises by role and session type
    let candidateExercises: Exercise[] = [];
    
    if (roleSpec.role === 'main' || roleSpec.role === 'secondary') {
      // SPEED DAYS: Select cardio/plyometric exercises for main/secondary
      if (splitDay.sessionType === 'speed') {
        if (roleSpec.role === 'main') {
          // Main = cardio/sprint work
          candidateExercises = availableExercises.filter(ex =>
            ex.category === 'cardio' || ex.category === 'endurance'
          );
        } else {
          // Secondary = plyometric work
          candidateExercises = availableExercises.filter(ex =>
            ex.category === 'plyometric' || ex.category === 'cardio'
          );
        }
        
        // Fallback: use any cardio/plyo/explosive
        if (candidateExercises.length === 0) {
          candidateExercises = availableExercises.filter(ex =>
            ex.category === 'cardio' || ex.category === 'plyometric' || 
            ex.category === 'endurance' || ex.name.toLowerCase().includes('jump')
          );
        }
      }
      // RECOVERY DAYS: Select cardio for main, mobility for secondary
      else if (splitDay.sessionType === 'recovery') {
        if (roleSpec.role === 'main') {
          // Main = steady-state cardio
          candidateExercises = availableExercises.filter(ex =>
            ex.category === 'cardio' || ex.category === 'endurance'
          );
        } else {
          // Secondary = flexibility/balance
          candidateExercises = availableExercises.filter(ex =>
            ex.category === 'flexibility' || ex.category === 'balance'
          );
        }
      }
      // CONDITIONING DAYS: Mix of cardio and strength
      else if (splitDay.sessionType === 'conditioning') {
        candidateExercises = availableExercises.filter(ex =>
          ex.category === 'cardio' || ex.category === 'endurance' || 
          ex.category === 'plyometric' || ex.category === 'strength'
        );
      }
      // STRENGTH/HYPERTROPHY/POWER: Standard muscle-group filtering
      else {
        candidateExercises = filterExercisesByMuscles(
          availableExercises.filter(ex => 
            ex.category === 'strength' && 
            (difficulty !== 'beginner' || ex.difficulty !== 'advanced')
          ),
          splitDay.primaryMuscles,
          splitDay.secondaryMuscles,
          roleSpec.role === 'main' ? splitDay.mainLiftPattern : splitDay.accessoryPatterns
        );
        
        // Fallback if no exercises match
        if (candidateExercises.length === 0) {
          candidateExercises = availableExercises.filter(ex => 
            ex.category === 'strength' &&
            ex.muscleGroups.some(mg => splitDay.primaryMuscles.includes(mg))
          );
        }
      }
    } else if (roleSpec.role === 'accessory') {
      // SPEED/RECOVERY: Light unilateral or mobility work
      if (splitDay.sessionType === 'speed' || splitDay.sessionType === 'recovery') {
        candidateExercises = availableExercises.filter(ex =>
          (ex.name.toLowerCase().includes('single') || 
           ex.name.toLowerCase().includes('unilateral') ||
           ex.category === 'balance' ||
           ex.category === 'flexibility') &&
          ex.muscleGroups.some(mg => splitDay.primaryMuscles.includes(mg))
        );
        
        // Fallback: any bodyweight or light exercise
        if (candidateExercises.length === 0) {
          candidateExercises = availableExercises.filter(ex =>
            ex.equipment === 'bodyweight' &&
            ex.muscleGroups.some(mg => splitDay.primaryMuscles.includes(mg))
          );
        }
      }
      // CONDITIONING: High-rep bodyweight or light exercises
      else if (splitDay.sessionType === 'conditioning') {
        candidateExercises = availableExercises.filter(ex =>
          (ex.equipment === 'bodyweight' || ex.equipment === 'dumbbells') &&
          ex.muscleGroups.some(mg => splitDay.primaryMuscles.includes(mg))
        );
      }
      // STANDARD: Target day's muscles
      else {
        candidateExercises = filterExercisesByMuscles(
          availableExercises,
          splitDay.primaryMuscles,
          splitDay.secondaryMuscles,
          splitDay.accessoryPatterns
        );
      }
    } else if (roleSpec.role === 'core') {
      // Core exercises
      candidateExercises = availableExercises.filter(ex =>
        ex.muscleGroups.includes('core') || ex.muscleGroups.includes('abs')
      );
    } else if (roleSpec.role === 'conditioning' || roleSpec.role === 'finisher') {
      // Conditioning/finisher exercises
      candidateExercises = availableExercises.filter(ex =>
        ex.category === 'cardio' || ex.category === 'endurance' || ex.category === 'plyometric'
      );
    }
    
    // Select required number of exercises for this role
    for (let i = 0; i < roleSpec.count && candidateExercises.length > 0; i++) {
      // Filter out already-used exercises
      const available = candidateExercises.filter(ex => !usedExerciseIds.has(ex.id));
      if (available.length === 0) break;
      
      // Select exercise (rotate to add variety across weeks)
      const selectionIndex = (weekNumber + i) % available.length;
      const selectedExercise = available[selectionIndex];
      usedExerciseIds.add(selectedExercise.id);
      
      // Determine reps
      const reps = Array.isArray(roleSpec.reps) ? roleSpec.reps[0] : roleSpec.reps;
      
      // Build workout exercise
      const workoutExercise: WorkoutExercise = {
        exerciseId: selectedExercise.id,
        sets: roleSpec.sets,
        reps,
        restSeconds: roleSpec.restSeconds,
        order: order++,
        sessionRole: roleSpec.role,
        isMainLift: roleSpec.role === 'main',
        rpe: roleSpec.rpe,
      };
      
      // Add %1RM for barbell compound lifts
      if (roleSpec.percent1RM && selectedExercise.equipment === 'barbell') {
        workoutExercise.percent1RM = roleSpec.percent1RM;
      }
      
      // Add tempo for main lifts
      if (roleSpec.role === 'main' || roleSpec.role === 'secondary') {
        workoutExercise.tempo = splitDay.sessionType === 'hypertrophy' ? '3-0-1-0' : '2-0-1-0';
      }
      
      // Add coaching cues
      if (selectedExercise.tips && selectedExercise.tips.length > 0) {
        workoutExercise.coachingCues = selectedExercise.tips.slice(0, 2);
      }
      
      workoutExercises.push(workoutExercise);
    }
  }
  
  // VALIDATION: Ensure minimum 5 exercises per workout (excluding deload)
  const MIN_EXERCISES = splitDay.sessionType === 'deload' ? 4 : 5;
  const MAX_EXERCISES = 8;
  
  if (workoutExercises.length < MIN_EXERCISES) {
    console.warn(`⚠️ Only ${workoutExercises.length} exercises generated, adding more accessories (target: ${MIN_EXERCISES})`);
    
    // Add more accessories to reach minimum
    const needed = MIN_EXERCISES - workoutExercises.length;
    const accessoryCandidates = availableExercises.filter(ex =>
      !usedExerciseIds.has(ex.id) &&
      (ex.muscleGroups.some(mg => splitDay.primaryMuscles.includes(mg)) || ex.muscleGroups.includes('core'))
    );
    
    for (let i = 0; i < needed && i < accessoryCandidates.length; i++) {
      const ex = accessoryCandidates[i];
      workoutExercises.push({
        exerciseId: ex.id,
        sets: 3,
        reps: splitDay.sessionType === 'conditioning' ? 15 : 12,
        restSeconds: 60,
        order: workoutExercises.length + 1,
        sessionRole: 'accessory',
        rpe: 7,
      });
      usedExerciseIds.add(ex.id);
    }
  }
  
  return workoutExercises;
}

// ========================================
// MAIN GENERATOR FUNCTION
// ========================================

/**
 * Generate coherent split-based workout plan
 */
export function generateAthleteWorkoutPlan(
  params: {
    memberId: string;
    goal: WorkoutPlan['goal'];
    difficulty: WorkoutPlan['difficulty'];
    duration: number; // weeks
    frequency: number; // days per week
    equipment?: string[];
    limitations?: string[];
  },
  allExercises: Exercise[]
): { plan: WorkoutPlan; workouts: Workout[] } {
  // ========================================
  // VALIDATE AND SANITIZE INPUTS
  // ========================================
  const duration = typeof params.duration === 'number' && params.duration > 0 ? params.duration : 4;
  const frequency = typeof params.frequency === 'number' && params.frequency > 0 ? params.frequency : 3;
  
  console.log('='.repeat(60));
  console.log('🏋️ WORKOUT PLAN GENERATION STARTED');
  console.log('='.repeat(60));
  console.log('Input parameters:', {
    memberId: params.memberId,
    goal: params.goal,
    difficulty: params.difficulty,
    duration: `${duration} weeks (input: ${params.duration})`,
    frequency: `${frequency}x/week (input: ${params.frequency})`,
    equipment: params.equipment || 'none specified',
    limitations: params.limitations || 'none',
    expectedWorkouts: duration * frequency
  });
  
  // FALLBACK LADDER: Start strict, relax if needed
  let availableExercises: Exercise[] = [];
  let equipmentFilterApplied = 'strict';
  
  // ATTEMPT 1: Strict equipment filter
  if (params.equipment && params.equipment.length > 0) {
    availableExercises = allExercises.filter(ex => {
      if (!params.equipment!.includes(ex.equipment)) return false;
      if (params.difficulty === 'beginner' && ex.difficulty === 'advanced') return false;
      return true;
    });
    console.log(`Equipment filter (strict): ${availableExercises.length} exercises`);
  } else {
    // No equipment filter specified, use all
    availableExercises = allExercises.filter(ex => {
      if (params.difficulty === 'beginner' && ex.difficulty === 'advanced') return false;
      return true;
    });
  }
  
  // ATTEMPT 2: If too few exercises, add bodyweight + dumbbells (fallback)
  if (availableExercises.length < 20 && params.equipment && params.equipment.length > 0) {
    console.warn(`⚠️ Only ${availableExercises.length} exercises found with strict filter. Adding bodyweight + dumbbells as fallback.`);
    availableExercises = allExercises.filter(ex => {
      const isSelected = params.equipment!.includes(ex.equipment);
      const isBodyweight = ex.equipment === 'bodyweight';
      const isDumbbell = ex.equipment === 'dumbbells';
      if (!isSelected && !isBodyweight && !isDumbbell) return false;
      if (params.difficulty === 'beginner' && ex.difficulty === 'advanced') return false;
      return true;
    });
    equipmentFilterApplied = 'relaxed (added bodyweight + dumbbells)';
    console.log(`Equipment filter (relaxed): ${availableExercises.length} exercises`);
  }
  
  // ATTEMPT 3: If STILL too few, ignore equipment filter entirely (emergency fallback)
  if (availableExercises.length < 15) {
    console.warn(`⚠️ Still only ${availableExercises.length} exercises. Using ALL equipment types.`);
    availableExercises = allExercises.filter(ex => {
      if (params.difficulty === 'beginner' && ex.difficulty === 'advanced') return false;
      return true;
    });
    equipmentFilterApplied = 'none (using all equipment)';
    console.log(`Equipment filter (none): ${availableExercises.length} exercises`);
  }
  
  // ABSOLUTE SAFETY: Use ALL exercises if still empty (should never happen)
  if (availableExercises.length === 0) {
    console.error('❌ CRITICAL: No exercises available even after all fallbacks! Using full database.');
    availableExercises = [...allExercises];
    equipmentFilterApplied = 'EMERGENCY - using full database';
  }
  
  console.log(`✅ Final exercise pool: ${availableExercises.length} exercises (filter: ${equipmentFilterApplied})`);
  
  // Validate we have enough exercises
  if (availableExercises.length === 0) {
    throw new Error('FATAL: Exercise database is empty. Cannot generate workout plan.');
  }
  
  // Get the appropriate split for goal and frequency
  const split = WORKOUT_SPLITS[params.goal]?.[frequency] || 
                WORKOUT_SPLITS.general_fitness[frequency] ||
                WORKOUT_SPLITS.general_fitness[3];
  
  if (!split.days || split.days.length === 0) {
    console.error('❌ No split defined for this goal/frequency combination');
    return {
      plan: {
        id: `plan-${params.memberId}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        memberId: params.memberId,
        name: 'Invalid Split',
        description: 'Could not generate a split for this combination',
        goal: params.goal,
        duration: duration,
        frequency: frequency,
        difficulty: params.difficulty,
        status: 'active',
        createdAt: new Date().toISOString(),
        startDate: new Date().toISOString().split('T')[0],
        createdBy: 'ai',
      },
      workouts: []
    };
  }
  
  // Generate workouts
  const workouts: Workout[] = [];
  const startDate = new Date();
  const totalWorkouts = duration * frequency;
  
  for (let i = 0; i < totalWorkouts; i++) {
    const weekNum = Math.floor(i / frequency) + 1;
    const dayInWeek = i % frequency;
    const isDeloadWeek = weekNum % 4 === 0 && weekNum > 0;
    
    // Calculate workout date
    const workoutDate = new Date(startDate);
    workoutDate.setDate(startDate.getDate() + Math.floor(i * (7 / frequency)));
    
    // Get the split day (cycle through the split)
    const splitDay = split.days[dayInWeek % split.days.length];
    
    // Get session blueprint (use deload blueprint if it's a deload week)
    const sessionType = isDeloadWeek ? 'deload' : splitDay.sessionType;
    const blueprint = SESSION_BLUEPRINTS[sessionType] || SESSION_BLUEPRINTS.strength;
    
    // Select exercises for this session
    const exercises = selectExercisesForSession(
      splitDay,
      blueprint,
      availableExercises,
      params.difficulty,
      weekNum
    );
    
    // Generate warm-up (if there's a main lift)
    const mainExercise = exercises.find(ex => ex.sessionRole === 'main');
    const mainExerciseData = mainExercise ? availableExercises.find(ex => ex.id === mainExercise.exerciseId) : undefined;
    const warmup = mainExerciseData ? generateWarmup(mainExerciseData, sessionType) : undefined;
    
    // Create workout
    const workout: Workout = {
      id: `workout-${params.memberId}-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 9)}`,
      workoutPlanId: 'plan-placeholder', // Will be set later
      memberId: params.memberId,
      name: `Week ${weekNum}, Day ${dayInWeek + 1}${isDeloadWeek ? ' (Deload)' : ''}`,
      date: workoutDate.toISOString().split('T')[0],
      exercises,
      status: 'scheduled',
      warmup,
      weekNumber: weekNum,
      sessionType,
      dayTheme: splitDay.theme,
      purpose: splitDay.purpose,
      duration: 60,
    };
    
    workouts.push(workout);
  }
  
  // Create plan
  const plan: WorkoutPlan = {
    id: `plan-${params.memberId}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    memberId: params.memberId,
    name: `${split.name} - ${duration} Week Program`,
    description: `${split.description}. Each workout follows a structured split with clear muscle group focus and progressive overload.`,
    goal: params.goal,
    duration: duration,
    frequency: frequency,
    difficulty: params.difficulty,
    status: 'active',
    createdAt: new Date().toISOString(),
    startDate: startDate.toISOString().split('T')[0],
    createdBy: 'ai',
  };
  
  // Update workouts with correct plan ID
  workouts.forEach(w => w.workoutPlanId = plan.id);
  
  // ========================================
  // VALIDATION: ENSURE WE NEVER RETURN 0 WORKOUTS
  // ========================================
  const expectedWorkouts = duration * frequency;
  
  if (workouts.length === 0) {
    console.error('❌ CRITICAL: Generated 0 workouts! This should never happen.');
    console.error('Debug info:', {
      goal: params.goal,
      difficulty: params.difficulty,
      duration: duration,
      frequency: frequency,
      equipment: params.equipment,
      splitName: split.name,
      splitDays: split.days.length,
      availableExercises: availableExercises.length,
      expectedWorkouts
    });
    throw new Error(`FATAL: Generated 0 workouts (expected ${expectedWorkouts}). Check split configuration and exercise pool.`);
  }
  
  if (workouts.length !== expectedWorkouts) {
    console.warn(`⚠️ WARNING: Generated ${workouts.length} workouts but expected ${expectedWorkouts}`);
  }
  
  console.log(`✅ Generated ${split.name} with ${workouts.length}/${expectedWorkouts} workouts`);
  console.log(`Split structure: ${split.days.map(d => d.theme).join(' → ')}`);
  console.log(`Equipment filter: ${equipmentFilterApplied}`);
  
  return { plan, workouts };
}

/**
 * Validate workout coherence (for testing)
 */
export function validateWorkoutCoherence(workouts: Workout[], allExercises: Exercise[]): {
  isValid: boolean;
  coherenceScore: number;
  issues: string[];
} {
  const issues: string[] = [];
  let totalCoherenceScore = 0;
  
  for (const workout of workouts) {
    if (!workout.dayTheme) {
      issues.push(`Workout ${workout.name}: Missing dayTheme`);
      continue;
    }
    
    if (!workout.purpose) {
      issues.push(`Workout ${workout.name}: Missing purpose description`);
    }
    
    // Check if exercises match the day's theme
    const primaryMuscles = workout.dayTheme.match(/\((.*?)\)/)?.[1]?.toLowerCase() || '';
    const muscleList = primaryMuscles.split('/').map(m => m.trim());
    
    let matchingExercises = 0;
    for (const ex of workout.exercises) {
      const exerciseData = allExercises.find(e => e.id === ex.exerciseId);
      if (!exerciseData) continue;
      
      const matches = exerciseData.muscleGroups.some(mg =>
        muscleList.some(muscle => 
          mg.toLowerCase().includes(muscle) || muscle.includes(mg.toLowerCase())
        )
      );
      
      if (matches || ex.sessionRole === 'core' || ex.sessionRole === 'finisher') {
        matchingExercises++;
      }
    }
    
    const coherenceRate = workout.exercises.length > 0 ? matchingExercises / workout.exercises.length : 0;
    totalCoherenceScore += coherenceRate;
    
    if (coherenceRate < 0.7) {
      issues.push(`Workout ${workout.name}: Low coherence (${Math.round(coherenceRate * 100)}% exercises match theme)`);
    }
    
    // Check for warm-ups in strength/power sessions
    if ((workout.sessionType === 'strength' || workout.sessionType === 'power') && !workout.warmup) {
      issues.push(`Workout ${workout.name}: Missing warm-up section`);
    }
  }
  
  const avgCoherence = workouts.length > 0 ? totalCoherenceScore / workouts.length : 0;
  const isValid = avgCoherence >= 0.7 && issues.length < workouts.length * 0.2;
  
  return { isValid, coherenceScore: avgCoherence, issues };
}
