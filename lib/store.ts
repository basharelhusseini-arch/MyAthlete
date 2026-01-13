import { Member, Membership, Trainer, GymClass, Payment, EmailNotification, Exercise, WorkoutPlan, Workout, WorkoutExercise, WorkoutProgress, WorkoutTemplate, Recipe, NutritionPlan, DailyMealPlan, MacroTargets, ShoppingList, Meal, Habit, HabitEntry, WhoopConnection, WhoopData } from '@/types';

// Simple password hashing (in production, use bcrypt)
// This function must work in both build-time and runtime environments
function hashPassword(password: string): string {
  // Simple hash for demo - in production use bcrypt
  // Using a simple encoding that works everywhere (no Buffer dependency)
  // This is just for demo purposes - use proper bcrypt in production
  let hash = '';
  for (let i = 0; i < password.length; i++) {
    const charCode = password.charCodeAt(i);
    hash += String.fromCharCode(charCode + (i % 10) + 1);
  }
  return hash.split('').reverse().join('') + password.length.toString();
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// In-memory data store (can be replaced with a real database later)
class DataStore {
  private members: Member[] = [];
  private memberships: Membership[] = [];
  private trainers: Trainer[] = [];
  private classes: GymClass[] = [];
  private payments: Payment[] = [];
  private notifications: EmailNotification[] = [];
  
  // Phase 2: Workout Engine
  private exercises: Exercise[] = [];
  private workoutPlans: WorkoutPlan[] = [];
  private workouts: Workout[] = [];
  private workoutProgress: WorkoutProgress[] = [];
  private workoutTemplates: WorkoutTemplate[] = [];

  // Phase 3: Nutrition Planner
  private recipes: Recipe[] = [];
  private nutritionPlans: NutritionPlan[] = [];
  private dailyMealPlans: DailyMealPlan[] = [];
  private shoppingLists: ShoppingList[] = [];

  // Phase 4: Habit Tracking & Whoop Integration
  private habits: Habit[] = [];
  private habitEntries: HabitEntry[] = [];
  private whoopConnections: WhoopConnection[] = [];
  private whoopData: WhoopData[] = [];

  // Initialize with sample data
  constructor() {
    // Lazy initialization to avoid build-time issues
    if (typeof window === 'undefined') {
      // Server-side: initialize immediately
      this.initializeSampleData();
    } else {
      // Client-side: should not happen, but safe guard
    this.initializeSampleData();
    }
  }

  private initializeSampleData() {
    // Sample memberships
    this.memberships = [
      {
        id: '1',
        name: 'Basic Plan',
        description: 'Access to gym facilities',
        price: 49.99,
        duration: 30,
        features: ['Gym Access', 'Locker Room'],
        status: 'active',
      },
      {
        id: '2',
        name: 'Premium Plan',
        description: 'Full access + classes',
        price: 79.99,
        duration: 30,
        features: ['Gym Access', 'All Classes', 'Personal Training Session', 'Locker Room'],
        status: 'active',
      },
      {
        id: '3',
        name: 'Elite Plan',
        description: 'Premium + extras',
        price: 129.99,
        duration: 30,
        features: ['Gym Access', 'All Classes', 'Unlimited Personal Training', 'Nutrition Planning', 'VIP Locker'],
        status: 'active',
      },
    ];

    // Sample trainers
    this.trainers = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@gym.com',
        phone: '555-0101',
        specialization: 'Strength Training',
        hireDate: '2023-01-15',
        status: 'active',
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@gym.com',
        phone: '555-0102',
        specialization: 'Yoga & Pilates',
        hireDate: '2023-02-20',
        status: 'active',
      },
      {
        id: '3',
        firstName: 'Mike',
        lastName: 'Davis',
        email: 'mike.davis@gym.com',
        phone: '555-0103',
        specialization: 'Cardio & HIIT',
        hireDate: '2023-03-10',
        status: 'active',
      },
    ];

    // Sample members (default password: "password123")
    this.members = [
      {
        id: '1',
        firstName: 'Alice',
        lastName: 'Williams',
        email: 'alice.williams@email.com',
        phone: '555-1001',
        password: hashPassword('password123'),
        dateOfBirth: '1990-05-15',
        joinDate: '2024-01-10',
        membershipId: '2',
        status: 'active',
        notes: 'Prefers morning workouts',
        completedSessions: 12,
      },
      {
        id: '2',
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@email.com',
        phone: '555-1002',
        password: hashPassword('password123'),
        dateOfBirth: '1985-08-22',
        joinDate: '2024-01-15',
        membershipId: '1',
        status: 'active',
        completedSessions: 8,
      },
      {
        id: '3',
        firstName: 'Carol',
        lastName: 'Miller',
        email: 'carol.miller@email.com',
        phone: '555-1003',
        password: hashPassword('password123'),
        dateOfBirth: '1992-11-30',
        joinDate: '2023-12-05',
        membershipId: '3',
        status: 'active',
        notes: 'Personal training client',
        completedSessions: 25,
      },
    ];

    // Sample classes
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.classes = [
      {
        id: '1',
        name: 'Morning Yoga',
        description: 'Relaxing yoga session to start your day',
        trainerId: '2',
        date: tomorrow.toISOString().split('T')[0],
        startTime: '07:00',
        endTime: '08:00',
        capacity: 20,
        enrolledMembers: ['1', '3'],
        waitlist: [],
        checkedInMembers: [],
        status: 'scheduled',
      },
      {
        id: '2',
        name: 'HIIT Bootcamp',
        description: 'High-intensity interval training',
        trainerId: '3',
        date: tomorrow.toISOString().split('T')[0],
        startTime: '18:00',
        endTime: '19:00',
        capacity: 15,
        enrolledMembers: ['2'],
        waitlist: [],
        checkedInMembers: [],
        status: 'scheduled',
      },
    ];

    // Phase 2: Sample exercises
    this.exercises = [
      // ========== STRENGTH EXERCISES - BODYWEIGHT ==========
      {
        id: 'ex1',
        name: 'Push-ups',
        description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps',
        category: 'strength' as const,
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Start in plank position with hands slightly wider than shoulders',
          'Lower body until chest nearly touches floor',
          'Push back up to starting position',
          'Keep core engaged throughout movement'
        ],
      },
      {
        id: 'ex2',
        name: 'Squats',
        description: 'Fundamental lower body exercise for legs and glutes',
        category: 'strength' as const,
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower down as if sitting in a chair',
          'Keep knees behind toes and chest up',
          'Return to starting position by driving through heels'
        ],
      },
      {
        id: 'ex5',
        name: 'Pull-ups',
        description: 'Upper body pulling exercise',
        category: 'strength' as const,
        muscleGroups: ['back', 'biceps'],
        equipment: 'bodyweight' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Hang from bar with palms facing away',
          'Pull body up until chin clears bar',
          'Lower slowly to full arm extension',
          'Keep core engaged throughout'
        ],
      },
      {
        id: 'ex6',
        name: 'Plank',
        description: 'Core strengthening isometric exercise',
        category: 'strength' as const,
        muscleGroups: ['core', 'shoulders'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Start in push-up position on forearms',
          'Keep body in straight line from head to heels',
          'Engage core and hold position',
          'Breathe normally throughout'
        ],
      },
      {
        id: 'ex11',
        name: 'Lunges',
        description: 'Lower body strength and balance exercise',
        category: 'strength' as const,
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Step forward with one leg',
          'Lower hips until both knees are at 90 degrees',
          'Push through front heel to return',
          'Alternate legs'
        ],
      },
      {
        id: 'ex13',
        name: 'Dips',
        description: 'Bodyweight exercise for triceps and chest',
        category: 'strength' as const,
        muscleGroups: ['triceps', 'chest', 'shoulders'],
        equipment: 'bodyweight' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Grip parallel bars and lift yourself up',
          'Lower body by bending elbows',
          'Lean forward slightly for chest emphasis',
          'Push back up to starting position'
        ],
      },
      {
        id: 'ex14',
        name: 'Diamond Push-ups',
        description: 'Advanced push-up variation targeting triceps',
        category: 'strength' as const,
        muscleGroups: ['triceps', 'chest', 'shoulders'],
        equipment: 'bodyweight' as const,
        difficulty: 'advanced' as const,
        instructions: [
          'Form diamond shape with hands under chest',
          'Lower body keeping elbows close to sides',
          'Push back up maintaining form',
          'Keep core tight throughout'
        ],
      },
      
      // ========== STRENGTH EXERCISES - DUMBBELLS ==========
      {
        id: 'ex3',
        name: 'Dumbbell Bench Press',
        description: 'Upper body strength exercise using dumbbells',
        category: 'strength' as const,
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'dumbbells' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Lie on bench with dumbbells at chest level',
          'Press weights up until arms are fully extended',
          'Lower weights slowly back to starting position',
          'Keep core engaged and feet flat on floor'
        ],
      },
      {
        id: 'ex12',
        name: 'Dumbbell Overhead Press',
        description: 'Shoulder and upper body strength exercise',
        category: 'strength' as const,
        muscleGroups: ['shoulders', 'triceps', 'core'],
        equipment: 'dumbbells' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Stand with feet shoulder-width apart',
          'Hold weights at shoulder height',
          'Press weights overhead until arms fully extended',
          'Lower slowly back to shoulders'
        ],
      },
      {
        id: 'ex15',
        name: 'Dumbbell Rows',
        description: 'Back and bicep exercise',
        category: 'strength' as const,
        muscleGroups: ['back', 'biceps', 'rear delts'],
        equipment: 'dumbbells' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Bend forward at hips with slight knee bend',
          'Hold dumbbells with arms extended',
          'Pull weights to sides of torso',
          'Lower with control'
        ],
      },
      {
        id: 'ex16',
        name: 'Dumbbell Bicep Curls',
        description: 'Isolation exercise for biceps',
        category: 'strength' as const,
        muscleGroups: ['biceps'],
        equipment: 'dumbbells' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Stand with dumbbells at sides',
          'Curl weights up keeping elbows stationary',
          'Squeeze biceps at top',
          'Lower slowly to starting position'
        ],
      },
      {
        id: 'ex17',
        name: 'Dumbbell Goblet Squats',
        description: 'Lower body exercise with dumbbell',
        category: 'strength' as const,
        muscleGroups: ['quadriceps', 'glutes', 'core'],
        equipment: 'dumbbells' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Hold dumbbell vertically at chest',
          'Squat down keeping chest up',
          'Drive through heels to stand',
          'Keep core engaged'
        ],
      },
      {
        id: 'ex18',
        name: 'Dumbbell Romanian Deadlifts',
        description: 'Hamstring and glute focused exercise',
        category: 'strength' as const,
        muscleGroups: ['hamstrings', 'glutes', 'lower back'],
        equipment: 'dumbbells' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Hold dumbbells in front of thighs',
          'Hinge at hips pushing butt back',
          'Lower weights along legs',
          'Return to standing by squeezing glutes'
        ],
      },
      
      // ========== STRENGTH EXERCISES - BARBELL ==========
      {
        id: 'ex4',
        name: 'Barbell Deadlifts',
        description: 'Compound exercise targeting posterior chain',
        category: 'strength' as const,
        muscleGroups: ['hamstrings', 'glutes', 'back'],
        equipment: 'barbell' as const,
        difficulty: 'advanced' as const,
        instructions: [
          'Stand with feet hip-width apart, bar over mid-foot',
          'Hinge at hips and bend knees to grip bar',
          'Keep back straight and chest up',
          'Drive through heels to stand up, extending hips'
        ],
      },
      {
        id: 'ex19',
        name: 'Barbell Squats',
        description: 'King of leg exercises',
        category: 'strength' as const,
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'core'],
        equipment: 'barbell' as const,
        difficulty: 'advanced' as const,
        instructions: [
          'Position bar across upper back',
          'Feet shoulder-width apart',
          'Descend by breaking at hips and knees',
          'Drive up through heels'
        ],
      },
      {
        id: 'ex20',
        name: 'Barbell Bench Press',
        description: 'Classic chest building exercise',
        category: 'strength' as const,
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'barbell' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Lie on bench, grip bar slightly wider than shoulders',
          'Unrack and lower bar to chest',
          'Press bar up in slight arc',
          'Lock out arms at top'
        ],
      },
      {
        id: 'ex21',
        name: 'Barbell Overhead Press',
        description: 'Military press for shoulders',
        category: 'strength' as const,
        muscleGroups: ['shoulders', 'triceps', 'core'],
        equipment: 'barbell' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Start with bar at collarbone',
          'Press bar overhead',
          'Lock out arms fully',
          'Lower with control'
        ],
      },
      {
        id: 'ex22',
        name: 'Barbell Bent-Over Rows',
        description: 'Back thickness builder',
        category: 'strength' as const,
        muscleGroups: ['back', 'biceps', 'rear delts'],
        equipment: 'barbell' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Bend forward at hips, knees slightly bent',
          'Pull bar to lower chest/upper abdomen',
          'Squeeze shoulder blades together',
          'Lower with control'
        ],
      },
      
      // ========== STRENGTH EXERCISES - MACHINES ==========
      {
        id: 'ex23',
        name: 'Leg Press',
        description: 'Machine-based leg exercise',
        category: 'strength' as const,
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
        equipment: 'machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Sit in machine with feet on platform',
          'Lower platform by bending knees',
          'Push through heels to extend legs',
          'Do not lock knees at top'
        ],
      },
      {
        id: 'ex24',
        name: 'Lat Pulldown',
        description: 'Back width builder',
        category: 'strength' as const,
        muscleGroups: ['back', 'biceps'],
        equipment: 'machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Grip bar wider than shoulder width',
          'Pull bar down to upper chest',
          'Squeeze shoulder blades together',
          'Control the weight back up'
        ],
      },
      {
        id: 'ex25',
        name: 'Chest Press Machine',
        description: 'Chest building machine exercise',
        category: 'strength' as const,
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Adjust seat height appropriately',
          'Press handles forward',
          'Squeeze chest at full extension',
          'Return to starting position with control'
        ],
      },
      {
        id: 'ex26',
        name: 'Leg Curl',
        description: 'Hamstring isolation',
        category: 'strength' as const,
        muscleGroups: ['hamstrings'],
        equipment: 'machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Lie face down on machine',
          'Curl legs up toward glutes',
          'Squeeze hamstrings at top',
          'Lower slowly'
        ],
      },
      {
        id: 'ex27',
        name: 'Leg Extension',
        description: 'Quadriceps isolation',
        category: 'strength' as const,
        muscleGroups: ['quadriceps'],
        equipment: 'machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Sit in machine with pad on lower shin',
          'Extend legs fully',
          'Squeeze quads at top',
          'Lower with control'
        ],
      },
      {
        id: 'ex28',
        name: 'Seated Cable Row',
        description: 'Back thickness exercise',
        category: 'strength' as const,
        muscleGroups: ['back', 'biceps'],
        equipment: 'cable' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Sit at cable row station',
          'Pull handle to torso',
          'Squeeze shoulder blades',
          'Extend arms to starting position'
        ],
      },
      
      // ========== STRENGTH EXERCISES - CABLE ==========
      {
        id: 'ex29',
        name: 'Cable Chest Flyes',
        description: 'Chest isolation with cables',
        category: 'strength' as const,
        muscleGroups: ['chest'],
        equipment: 'cable' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Stand between cables set at chest height',
          'Bring handles together in front of chest',
          'Squeeze chest',
          'Return to starting position with control'
        ],
      },
      {
        id: 'ex30',
        name: 'Cable Tricep Pushdowns',
        description: 'Triceps isolation',
        category: 'strength' as const,
        muscleGroups: ['triceps'],
        equipment: 'cable' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Stand facing cable with bar attachment',
          'Push bar down extending arms',
          'Keep elbows locked at sides',
          'Return to starting position'
        ],
      },
      {
        id: 'ex31',
        name: 'Cable Bicep Curls',
        description: 'Biceps isolation with constant tension',
        category: 'strength' as const,
        muscleGroups: ['biceps'],
        equipment: 'cable' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Stand facing low cable',
          'Curl handle up keeping elbows stationary',
          'Squeeze biceps at top',
          'Lower with control'
        ],
      },
      {
        id: 'ex32',
        name: 'Cable Face Pulls',
        description: 'Rear delt and upper back exercise',
        category: 'strength' as const,
        muscleGroups: ['rear delts', 'upper back'],
        equipment: 'cable' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Set cable at face height',
          'Pull rope toward face',
          'Separate hands at face level',
          'Squeeze shoulder blades'
        ],
      },
      
      // ========== CARDIO EXERCISES - MACHINES ==========
      {
        id: 'ex33',
        name: 'Treadmill Running',
        description: 'Classic cardio running on treadmill',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'cardiovascular'],
        equipment: 'cardio_machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Start with warm-up walk',
          'Gradually increase speed',
          'Maintain good running form',
          'Cool down with walking'
        ],
        mets: 8.0,
        caloriesPerMinute: 11.5,
        supportsDistance: true,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 5.0, caloriesPerMinute: 7, description: 'Light jog (4-5 mph)' },
          moderate: { mets: 8.0, caloriesPerMinute: 11.5, description: 'Moderate run (6-7 mph)' },
          high: { mets: 11.5, caloriesPerMinute: 16, description: 'Fast run (8+ mph)' }
        }
      },
      {
        id: 'ex34',
        name: 'Treadmill Walking',
        description: 'Low-impact cardio walking',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'cardiovascular'],
        equipment: 'cardio_machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Start at comfortable pace',
          'Maintain upright posture',
          'Swing arms naturally',
          'Adjust incline for more intensity'
        ],
        mets: 3.5,
        caloriesPerMinute: 5,
        supportsDistance: true,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 2.5, caloriesPerMinute: 3.5, description: 'Slow walk (2 mph)' },
          moderate: { mets: 3.5, caloriesPerMinute: 5, description: 'Brisk walk (3.5 mph)' },
          high: { mets: 5.0, caloriesPerMinute: 7, description: 'Power walk (4.5 mph)' }
        }
      },
      {
        id: 'ex35',
        name: 'Stationary Bike',
        description: 'Cycling on stationary bike',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'cardiovascular'],
        equipment: 'cardio_machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Adjust seat height properly',
          'Start with light resistance',
          'Maintain steady cadence',
          'Gradually increase intensity'
        ],
        mets: 7.0,
        caloriesPerMinute: 10,
        supportsDistance: true,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 4.0, caloriesPerMinute: 6, description: 'Light effort' },
          moderate: { mets: 7.0, caloriesPerMinute: 10, description: 'Moderate effort' },
          high: { mets: 10.0, caloriesPerMinute: 14, description: 'Vigorous effort' }
        }
      },
      {
        id: 'ex36',
        name: 'Rowing Machine',
        description: 'Full-body cardio on rowing ergometer',
        category: 'cardio' as const,
        muscleGroups: ['back', 'legs', 'arms', 'cardiovascular'],
        equipment: 'cardio_machine' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Secure feet in foot straps',
          'Drive with legs, then pull with arms',
          'Lean back slightly at finish',
          'Return with control'
        ],
        mets: 7.0,
        caloriesPerMinute: 10,
        supportsDistance: true,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 4.8, caloriesPerMinute: 7, description: 'Light rowing' },
          moderate: { mets: 7.0, caloriesPerMinute: 10, description: 'Moderate rowing' },
          high: { mets: 12.0, caloriesPerMinute: 17, description: 'Vigorous rowing' }
        }
      },
      {
        id: 'ex37',
        name: 'Elliptical',
        description: 'Low-impact cardio machine',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'cardiovascular'],
        equipment: 'cardio_machine' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Step onto pedals',
          'Hold handlebars',
          'Push and pull in smooth motion',
          'Maintain steady pace'
        ],
        mets: 5.0,
        caloriesPerMinute: 7,
        supportsDistance: true,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 4.0, caloriesPerMinute: 6, description: 'Light effort' },
          moderate: { mets: 5.0, caloriesPerMinute: 7, description: 'Moderate effort' },
          high: { mets: 8.0, caloriesPerMinute: 11, description: 'High effort' }
        }
      },
      {
        id: 'ex38',
        name: 'Stairmaster/StairClimber',
        description: 'Stair climbing machine',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'glutes', 'cardiovascular'],
        equipment: 'cardio_machine' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Step onto moving stairs',
          'Maintain upright posture',
          'Use handrails for balance only',
          'Keep consistent pace'
        ],
        mets: 8.0,
        caloriesPerMinute: 11.5,
        supportsDistance: false,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 5.0, caloriesPerMinute: 7, description: 'Slow pace' },
          moderate: { mets: 8.0, caloriesPerMinute: 11.5, description: 'Moderate pace' },
          high: { mets: 11.0, caloriesPerMinute: 15.5, description: 'Fast pace' }
        }
      },
      {
        id: 'ex39',
        name: 'Assault Bike',
        description: 'High-intensity air bike',
        category: 'cardio' as const,
        muscleGroups: ['full body', 'cardiovascular'],
        equipment: 'cardio_machine' as const,
        difficulty: 'advanced' as const,
        instructions: [
          'Sit on bike with hands on handles',
          'Push and pull handles while pedaling',
          'Increase intensity with speed',
          'Maintain breathing rhythm'
        ],
        mets: 10.0,
        caloriesPerMinute: 14,
        supportsDistance: true,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 6.0, caloriesPerMinute: 8.5, description: 'Steady pace' },
          moderate: { mets: 10.0, caloriesPerMinute: 14, description: 'Moderate intensity' },
          high: { mets: 14.0, caloriesPerMinute: 20, description: 'Sprint effort' }
        }
      },
      
      // ========== CARDIO EXERCISES - BODYWEIGHT ==========
      {
        id: 'ex7',
        name: 'Burpees',
        description: 'Full-body explosive cardio exercise',
        category: 'hybrid' as const,
        muscleGroups: ['full body'],
        equipment: 'bodyweight' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Start in standing position',
          'Squat down and place hands on floor',
          'Jump feet back into plank position',
          'Jump feet forward and explosively jump up'
        ],
        mets: 8.0,
        caloriesPerMinute: 11.5,
        supportsDistance: false,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 6.0, caloriesPerMinute: 8.5, description: 'Step back version' },
          moderate: { mets: 8.0, caloriesPerMinute: 11.5, description: 'Standard burpees' },
          high: { mets: 12.0, caloriesPerMinute: 17, description: 'Burpees with push-up' }
        }
      },
      {
        id: 'ex8',
        name: 'Jumping Jacks',
        description: 'Simple cardio warm-up exercise',
        category: 'cardio' as const,
        muscleGroups: ['full body'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Start with feet together and arms at sides',
          'Jump while spreading legs and raising arms overhead',
          'Jump back to starting position',
          'Repeat in rhythmic motion'
        ],
        mets: 4.5,
        caloriesPerMinute: 6.5,
        supportsDistance: false,
        supportsTime: true
      },
      {
        id: 'ex9',
        name: 'Mountain Climbers',
        description: 'Cardio and core exercise',
        category: 'hybrid' as const,
        muscleGroups: ['core', 'shoulders', 'legs'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Start in plank position',
          'Alternately bring knees to chest',
          'Keep hips level and core engaged',
          'Maintain steady pace'
        ],
        mets: 6.0,
        caloriesPerMinute: 8.5,
        supportsDistance: false,
        supportsTime: true
      },
      {
        id: 'ex40',
        name: 'High Knees',
        description: 'Running in place with high knee lift',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'cardiovascular'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Run in place lifting knees to waist height',
          'Pump arms vigorously',
          'Maintain fast pace',
          'Land on balls of feet'
        ],
        mets: 7.0,
        caloriesPerMinute: 10,
        supportsDistance: false,
        supportsTime: true
      },
      {
        id: 'ex41',
        name: 'Jump Rope',
        description: 'Classic cardio with rope',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'shoulders', 'cardiovascular'],
        equipment: 'other' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Hold rope handles at hip height',
          'Swing rope overhead',
          'Jump as rope passes under feet',
          'Maintain steady rhythm'
        ],
        mets: 9.0,
        caloriesPerMinute: 13,
        supportsDistance: false,
        supportsTime: true,
        intensityLevels: {
          low: { mets: 6.0, caloriesPerMinute: 8.5, description: 'Slow pace' },
          moderate: { mets: 9.0, caloriesPerMinute: 13, description: 'Moderate pace' },
          high: { mets: 12.0, caloriesPerMinute: 17, description: 'Fast pace/double-unders' }
        }
      },
      {
        id: 'ex42',
        name: 'Box Jumps',
        description: 'Explosive plyometric exercise',
        category: 'hybrid' as const,
        muscleGroups: ['legs', 'glutes', 'cardiovascular'],
        equipment: 'other' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Stand facing box or platform',
          'Swing arms and explosively jump onto box',
          'Land softly in squat position',
          'Step down and repeat'
        ],
        mets: 8.0,
        caloriesPerMinute: 11.5,
        supportsDistance: false,
        supportsTime: true
      },
      
      // ========== HIIT EXERCISES ==========
      {
        id: 'ex43',
        name: 'HIIT Sprints',
        description: 'High-intensity interval sprints',
        category: 'cardio' as const,
        muscleGroups: ['legs', 'cardiovascular'],
        equipment: 'bodyweight' as const,
        difficulty: 'advanced' as const,
        instructions: [
          'Sprint at maximum effort for 20-30 seconds',
          'Rest or walk for 30-90 seconds',
          'Repeat for desired number of intervals',
          'Cool down with light walking'
        ],
        mets: 13.0,
        caloriesPerMinute: 18,
        supportsDistance: true,
        supportsTime: true
      },
      {
        id: 'ex44',
        name: 'Battle Ropes',
        description: 'Upper body cardio with ropes',
        category: 'hybrid' as const,
        muscleGroups: ['arms', 'shoulders', 'core', 'cardiovascular'],
        equipment: 'other' as const,
        difficulty: 'intermediate' as const,
        instructions: [
          'Hold rope ends in each hand',
          'Create waves by moving arms up and down',
          'Alternate or simultaneous arm movements',
          'Maintain intensity for timed intervals'
        ],
        mets: 8.0,
        caloriesPerMinute: 11.5,
        supportsDistance: false,
        supportsTime: true
      },
      
      // ========== FLEXIBILITY/STRETCHING ==========
      {
        id: 'ex10',
        name: 'Downward Dog',
        description: 'Yoga pose for flexibility and strength',
        category: 'flexibility' as const,
        muscleGroups: ['hamstrings', 'shoulders', 'core'],
        equipment: 'bodyweight' as const,
        difficulty: 'beginner' as const,
        instructions: [
          'Start on hands and knees',
          'Lift hips up and back',
          'Form inverted V shape with body',
          'Press hands into floor and lengthen spine'
        ],
      },
    ];

    // Phase 3: Sample recipes (45 total recipes)
    this.recipes = [
      {
        id: 'r1',
        name: 'Grilled Chicken Breast',
        description: 'Simple high-protein grilled chicken',
        instructions: [
          'Season chicken breast with salt and pepper',
          'Preheat grill to medium-high heat',
          'Grill chicken for 6-7 minutes per side',
          'Let rest for 5 minutes before serving'
        ],
        ingredients: [
          { name: 'Chicken breast', amount: 200, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Salt', amount: 0.5, unit: 'tsp' },
          { name: 'Pepper', amount: 0.25, unit: 'tsp' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 15,
        calories: 330,
        protein: 54,
        carbohydrates: 0,
        fats: 12,
        tags: ['high-protein', 'low-carb', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1588347818036-8fc90d4e2f6c?w=800&h=600&fit=crop'
      },
      {
        id: 'r2',
        name: 'Overnight Oats',
        description: 'Healthy breakfast with oats, fruits, and protein',
        instructions: [
          'Mix oats, milk, and Greek yogurt in a jar',
          'Add honey and chia seeds',
          'Stir in berries',
          'Refrigerate overnight and enjoy in the morning'
        ],
        ingredients: [
          { name: 'Rolled oats', amount: 50, unit: 'g' },
          { name: 'Greek yogurt', amount: 100, unit: 'g' },
          { name: 'Almond milk', amount: 120, unit: 'ml' },
          { name: 'Honey', amount: 1, unit: 'tbsp' },
          { name: 'Chia seeds', amount: 1, unit: 'tbsp' },
          { name: 'Mixed berries', amount: 50, unit: 'g' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 350,
        protein: 20,
        carbohydrates: 45,
        fats: 10,
        fiber: 8,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'meal-prep']
      },
      {
        id: 'r3',
        name: 'Salmon with Vegetables',
        description: 'Baked salmon with roasted vegetables',
        instructions: [
          'Preheat oven to 400°F',
          'Season salmon with lemon, dill, salt, and pepper',
          'Toss vegetables with olive oil',
          'Bake salmon and vegetables for 15-20 minutes'
        ],
        ingredients: [
          { name: 'Salmon fillet', amount: 150, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Sweet potato', amount: 150, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 20,
        calories: 450,
        protein: 38,
        carbohydrates: 35,
        fats: 18,
        tags: ['high-protein', 'omega-3', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop'
      },
      {
        id: 'r4',
        name: 'Protein Smoothie',
        description: 'Quick and nutritious protein smoothie',
        instructions: [
          'Add banana, protein powder, and milk to blender',
          'Add spinach and peanut butter',
          'Blend until smooth',
          'Serve immediately'
        ],
        ingredients: [
          { name: 'Banana', amount: 1, unit: 'medium' },
          { name: 'Protein powder', amount: 30, unit: 'g' },
          { name: 'Almond milk', amount: 250, unit: 'ml' },
          { name: 'Spinach', amount: 30, unit: 'g' },
          { name: 'Peanut butter', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 380,
        protein: 35,
        carbohydrates: 35,
        fats: 12,
        tags: ['quick', 'high-protein', 'vegetarian', 'smoothie'],
        imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&h=600&fit=crop'
      },
      {
        id: 'r5',
        name: 'Quinoa Salad',
        description: 'Fresh and nutritious quinoa salad',
        instructions: [
          'Cook quinoa according to package directions',
          'Let quinoa cool to room temperature',
          'Mix with vegetables and chickpeas',
          'Toss with olive oil and lemon dressing'
        ],
        ingredients: [
          { name: 'Quinoa', amount: 100, unit: 'g' },
          { name: 'Chickpeas', amount: 100, unit: 'g' },
          { name: 'Cucumber', amount: 100, unit: 'g' },
          { name: 'Tomato', amount: 100, unit: 'g' },
          { name: 'Red onion', amount: 30, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Lemon juice', amount: 1, unit: 'tbsp' }
        ],
        servings: 2,
        prepTime: 15,
        cookTime: 15,
        calories: 320,
        protein: 12,
        carbohydrates: 50,
        fats: 8,
        fiber: 6,
        tags: ['vegetarian', 'vegan', 'high-fiber', 'meal-prep'],
        imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop'
      },
      {
        id: 'r6',
        name: 'Greek Yogurt Bowl',
        description: 'Protein-rich Greek yogurt with toppings',
        instructions: [
          'Scoop Greek yogurt into a bowl',
          'Top with granola and fresh berries',
          'Drizzle with honey',
          'Add nuts for extra protein'
        ],
        ingredients: [
          { name: 'Greek yogurt', amount: 200, unit: 'g' },
          { name: 'Granola', amount: 30, unit: 'g' },
          { name: 'Mixed berries', amount: 50, unit: 'g' },
          { name: 'Honey', amount: 1, unit: 'tbsp' },
          { name: 'Almonds', amount: 15, unit: 'g' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 320,
        protein: 25,
        carbohydrates: 35,
        fats: 10,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'quick'],
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop'
      },
      {
        id: 'r7',
        name: 'Greek Yogurt Parfait',
        description: 'Layered yogurt parfait with berries and granola',
        instructions: [
          'Layer Greek yogurt in a glass or bowl',
          'Add mixed berries (blueberries, strawberries, raspberries)',
          'Sprinkle with granola',
          'Drizzle with honey and repeat layers',
          'Top with fresh mint'
        ],
        ingredients: [
          { name: 'Greek yogurt', amount: 200, unit: 'g' },
          { name: 'Mixed berries', amount: 100, unit: 'g' },
          { name: 'Granola', amount: 30, unit: 'g' },
          { name: 'Honey', amount: 1, unit: 'tbsp' },
          { name: 'Mint leaves', amount: 2, unit: 'leaves' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 320,
        protein: 22,
        carbohydrates: 42,
        fats: 8,
        fiber: 6,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'quick'],
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop'
      },
      {
        id: 'r8',
        name: 'Turkey and Avocado Wrap',
        description: 'Protein-packed wrap with lean turkey and avocado',
        instructions: [
          'Lay out whole wheat tortilla',
          'Spread mashed avocado on tortilla',
          'Add sliced turkey breast',
          'Add lettuce, tomato, and red onion',
          'Roll tightly and cut in half'
        ],
        ingredients: [
          { name: 'Whole wheat tortilla', amount: 1, unit: 'large' },
          { name: 'Turkey breast', amount: 100, unit: 'g' },
          { name: 'Avocado', amount: 0.5, unit: 'medium' },
          { name: 'Lettuce', amount: 30, unit: 'g' },
          { name: 'Tomato', amount: 0.5, unit: 'medium' },
          { name: 'Red onion', amount: 10, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 0,
        calories: 380,
        protein: 28,
        carbohydrates: 35,
        fats: 16,
        fiber: 8,
        tags: ['lunch', 'high-protein', 'quick', 'meal-prep'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
      },
      {
        id: 'r9',
        name: 'Quinoa Buddha Bowl',
        description: 'Nutritious bowl with quinoa, vegetables, and tahini dressing',
        instructions: [
          'Cook quinoa according to package instructions',
          'Roast sweet potato and broccoli at 400°F for 20 minutes',
          'Roast chickpeas with olive oil and spices',
          'Assemble bowl with quinoa, roasted vegetables, and chickpeas',
          'Drizzle with tahini dressing'
        ],
        ingredients: [
          { name: 'Quinoa', amount: 80, unit: 'g' },
          { name: 'Sweet potato', amount: 150, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Chickpeas', amount: 100, unit: 'g' },
          { name: 'Tahini', amount: 2, unit: 'tbsp' },
          { name: 'Lemon juice', amount: 1, unit: 'tbsp' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 25,
        calories: 520,
        protein: 22,
        carbohydrates: 68,
        fats: 18,
        fiber: 12,
        tags: ['dinner', 'vegetarian', 'high-protein', 'gluten-free', 'vegan'],
        imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop'
      },
      {
        id: 'r10',
        name: 'Grilled Chicken with Vegetables',
        description: 'Lean grilled chicken with seasonal vegetables',
        instructions: [
          'Season chicken breast with herbs and spices',
          'Grill chicken for 6-7 minutes per side',
          'Steam or roast mixed vegetables',
          'Serve with a side of brown rice or quinoa',
          'Drizzle with lemon juice before serving'
        ],
        ingredients: [
          { name: 'Chicken breast', amount: 150, unit: 'g' },
          { name: 'Asparagus', amount: 100, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Zucchini', amount: 100, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' },
          { name: 'Brown rice', amount: 100, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 20,
        calories: 480,
        protein: 45,
        carbohydrates: 42,
        fats: 12,
        fiber: 6,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
      },
      {
        id: 'r11',
        name: 'Egg White Omelette',
        description: 'Protein-rich omelette with vegetables',
        instructions: [
          'Whisk egg whites until frothy',
          'Heat non-stick pan with cooking spray',
          'Pour egg whites into pan',
          'Add diced vegetables (mushrooms, spinach, tomatoes)',
          'Cook until set, fold in half, and serve'
        ],
        ingredients: [
          { name: 'Egg whites', amount: 6, unit: 'large' },
          { name: 'Mushrooms', amount: 50, unit: 'g' },
          { name: 'Spinach', amount: 30, unit: 'g' },
          { name: 'Cherry tomatoes', amount: 50, unit: 'g' },
          { name: 'Feta cheese', amount: 30, unit: 'g' },
          { name: 'Olive oil', amount: 0.5, unit: 'tsp' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 8,
        calories: 220,
        protein: 28,
        carbohydrates: 8,
        fats: 8,
        tags: ['breakfast', 'high-protein', 'low-carb', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=600&fit=crop'
      },
      {
        id: 'r12',
        name: 'Tuna Salad Lettuce Wraps',
        description: 'Light and protein-packed tuna salad in lettuce wraps',
        instructions: [
          'Drain canned tuna and flake with fork',
          'Mix tuna with Greek yogurt, celery, and red onion',
          'Season with lemon juice, salt, and pepper',
          'Spoon mixture into large lettuce leaves',
          'Garnish with fresh dill'
        ],
        ingredients: [
          { name: 'Canned tuna (in water)', amount: 120, unit: 'g' },
          { name: 'Greek yogurt', amount: 60, unit: 'g' },
          { name: 'Celery', amount: 30, unit: 'g' },
          { name: 'Red onion', amount: 15, unit: 'g' },
          { name: 'Lemon juice', amount: 1, unit: 'tbsp' },
          { name: 'Lettuce leaves', amount: 4, unit: 'large' },
          { name: 'Dill', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 0,
        calories: 240,
        protein: 35,
        carbohydrates: 10,
        fats: 6,
        tags: ['lunch', 'high-protein', 'low-carb', 'gluten-free', 'quick'],
        imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&h=600&fit=crop'
      },
      {
        id: 'r13',
        name: 'Baked Cod with Roasted Vegetables',
        description: 'Light and flaky cod with colorful roasted vegetables',
        instructions: [
          'Preheat oven to 400°F',
          'Season cod fillets with lemon, herbs, and olive oil',
          'Toss vegetables (carrots, bell peppers, zucchini) with olive oil',
          'Bake cod and vegetables for 15-18 minutes',
          'Serve with a squeeze of lemon'
        ],
        ingredients: [
          { name: 'Cod fillet', amount: 150, unit: 'g' },
          { name: 'Carrots', amount: 100, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Zucchini', amount: 100, unit: 'g' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' },
          { name: 'Fresh herbs', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 18,
        calories: 320,
        protein: 32,
        carbohydrates: 18,
        fats: 14,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free', 'omega-3'],
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop'
      },
      {
        id: 'r14',
        name: 'Protein Pancakes',
        description: 'Fluffy high-protein pancakes for breakfast',
        instructions: [
          'Mix protein powder, oats, eggs, and banana',
          'Blend until smooth',
          'Heat non-stick pan over medium heat',
          'Pour batter to form pancakes',
          'Flip when bubbles form, cook until golden',
          'Serve with berries and Greek yogurt'
        ],
        ingredients: [
          { name: 'Protein powder', amount: 30, unit: 'g' },
          { name: 'Oats', amount: 40, unit: 'g' },
          { name: 'Eggs', amount: 2, unit: 'large' },
          { name: 'Banana', amount: 0.5, unit: 'medium' },
          { name: 'Greek yogurt', amount: 60, unit: 'g' },
          { name: 'Berries', amount: 50, unit: 'g' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 10,
        calories: 420,
        protein: 38,
        carbohydrates: 42,
        fats: 12,
        fiber: 6,
        tags: ['breakfast', 'high-protein', 'vegetarian'],
        imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop'
      },
      {
        id: 'r15',
        name: 'Chicken and Brown Rice Bowl',
        description: 'Balanced meal with lean protein and complex carbs',
        instructions: [
          'Cook brown rice according to package directions',
          'Season and grill chicken breast until cooked through',
          'Steam broccoli and carrots',
          'Assemble bowl with rice, chicken, and vegetables',
          'Drizzle with low-sodium soy sauce or teriyaki'
        ],
        ingredients: [
          { name: 'Chicken breast', amount: 150, unit: 'g' },
          { name: 'Brown rice', amount: 120, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Carrots', amount: 80, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Soy sauce', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 25,
        calories: 520,
        protein: 48,
        carbohydrates: 55,
        fats: 12,
        fiber: 6,
        tags: ['dinner', 'high-protein', 'meal-prep', 'gluten-free']
      },
      {
        id: 'r16',
        name: 'Avocado Toast with Eggs',
        description: 'Nutritious breakfast with healthy fats and protein',
        instructions: [
          'Toast whole grain bread',
          'Mash avocado with lemon juice and salt',
          'Spread avocado on toast',
          'Top with poached or fried eggs',
          'Garnish with red pepper flakes and fresh herbs'
        ],
        ingredients: [
          { name: 'Whole grain bread', amount: 2, unit: 'slices' },
          { name: 'Avocado', amount: 0.5, unit: 'medium' },
          { name: 'Eggs', amount: 2, unit: 'large' },
          { name: 'Lemon juice', amount: 1, unit: 'tsp' },
          { name: 'Red pepper flakes', amount: 0.25, unit: 'tsp' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 8,
        calories: 420,
        protein: 20,
        carbohydrates: 32,
        fats: 24,
        fiber: 12,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'quick']
      },
      {
        id: 'r17',
        name: 'Mediterranean Quinoa Bowl',
        description: 'Fresh and flavorful Mediterranean-inspired bowl',
        instructions: [
          'Cook quinoa and let cool',
          'Dice cucumber, tomatoes, and red onion',
          'Mix quinoa with vegetables and chickpeas',
          'Add feta cheese and olives',
          'Drizzle with olive oil and lemon dressing'
        ],
        ingredients: [
          { name: 'Quinoa', amount: 100, unit: 'g' },
          { name: 'Chickpeas', amount: 100, unit: 'g' },
          { name: 'Cucumber', amount: 100, unit: 'g' },
          { name: 'Cherry tomatoes', amount: 100, unit: 'g' },
          { name: 'Feta cheese', amount: 50, unit: 'g' },
          { name: 'Kalamata olives', amount: 30, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Lemon juice', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 15,
        calories: 480,
        protein: 20,
        carbohydrates: 58,
        fats: 18,
        fiber: 10,
        tags: ['lunch', 'vegetarian', 'high-fiber', 'gluten-free', 'meal-prep']
      },
      {
        id: 'r18',
        name: 'Lean Beef Stir Fry',
        description: 'High-protein stir fry with lean beef and vegetables',
        instructions: [
          'Slice beef into thin strips and marinate',
          'Heat wok or large pan over high heat',
          'Stir-fry beef until browned, remove',
          'Stir-fry vegetables until crisp-tender',
          'Return beef to pan, add sauce, and toss'
        ],
        ingredients: [
          { name: 'Lean beef sirloin', amount: 150, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Snow peas', amount: 80, unit: 'g' },
          { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
          { name: 'Ginger', amount: 1, unit: 'tsp' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Sesame oil', amount: 1, unit: 'tsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 12,
        calories: 380,
        protein: 42,
        carbohydrates: 18,
        fats: 14,
        fiber: 5,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free']
      },
      {
        id: 'r19',
        name: 'Chia Seed Pudding',
        description: 'Protein-rich pudding perfect for breakfast or snack',
        instructions: [
          'Mix chia seeds with almond milk and vanilla',
          'Add protein powder and sweetener',
          'Stir well and let sit for 5 minutes',
          'Refrigerate overnight or at least 4 hours',
          'Top with berries and nuts before serving'
        ],
        ingredients: [
          { name: 'Chia seeds', amount: 30, unit: 'g' },
          { name: 'Almond milk', amount: 200, unit: 'ml' },
          { name: 'Protein powder', amount: 25, unit: 'g' },
          { name: 'Vanilla extract', amount: 0.5, unit: 'tsp' },
          { name: 'Honey', amount: 1, unit: 'tbsp' },
          { name: 'Mixed berries', amount: 50, unit: 'g' },
          { name: 'Almonds', amount: 15, unit: 'g' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 320,
        protein: 28,
        carbohydrates: 28,
        fats: 12,
        fiber: 14,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'vegan', 'meal-prep']
      },
      {
        id: 'r20',
        name: 'Turkey Meatballs with Zucchini Noodles',
        description: 'Low-carb meal with lean turkey and vegetable noodles',
        instructions: [
          'Mix ground turkey with herbs and form into meatballs',
          'Bake meatballs at 400°F for 15-18 minutes',
          'Spiralize zucchini into noodles',
          'Sauté zucchini noodles briefly',
          'Serve meatballs over zucchini noodles with marinara'
        ],
        ingredients: [
          { name: 'Ground turkey', amount: 150, unit: 'g' },
          { name: 'Zucchini', amount: 200, unit: 'g' },
          { name: 'Egg', amount: 1, unit: 'large' },
          { name: 'Breadcrumbs', amount: 15, unit: 'g' },
          { name: 'Marinara sauce', amount: 100, unit: 'ml' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 20,
        calories: 380,
        protein: 38,
        carbohydrates: 18,
        fats: 18,
        fiber: 4,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free']
      },
      {
        id: 'r21',
        name: 'Black Bean and Sweet Potato Bowl',
        description: 'Plant-based protein bowl with complex carbs',
        instructions: [
          'Roast sweet potato cubes at 400°F for 20 minutes',
          'Heat black beans with spices',
          'Prepare brown rice',
          'Assemble bowl with rice, beans, and sweet potato',
          'Top with avocado, salsa, and cilantro'
        ],
        ingredients: [
          { name: 'Black beans', amount: 150, unit: 'g' },
          { name: 'Sweet potato', amount: 200, unit: 'g' },
          { name: 'Brown rice', amount: 100, unit: 'g' },
          { name: 'Avocado', amount: 0.25, unit: 'medium' },
          { name: 'Salsa', amount: 50, unit: 'g' },
          { name: 'Cilantro', amount: 1, unit: 'tbsp' },
          { name: 'Lime juice', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 25,
        calories: 480,
        protein: 18,
        carbohydrates: 85,
        fats: 10,
        fiber: 18,
        tags: ['dinner', 'vegetarian', 'vegan', 'high-fiber', 'gluten-free']
      },
      {
        id: 'r22',
        name: 'Cottage Cheese Bowl',
        description: 'High-protein breakfast or snack option',
        instructions: [
          'Scoop cottage cheese into a bowl',
          'Top with fresh berries and sliced banana',
          'Add granola for crunch',
          'Drizzle with honey',
          'Sprinkle with chia seeds'
        ],
        ingredients: [
          { name: 'Cottage cheese', amount: 200, unit: 'g' },
          { name: 'Mixed berries', amount: 80, unit: 'g' },
          { name: 'Banana', amount: 0.5, unit: 'medium' },
          { name: 'Granola', amount: 25, unit: 'g' },
          { name: 'Honey', amount: 1, unit: 'tbsp' },
          { name: 'Chia seeds', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 320,
        protein: 28,
        carbohydrates: 38,
        fats: 8,
        fiber: 6,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'quick']
      },
      {
        id: 'r23',
        name: 'Shrimp Scampi with Zucchini',
        description: 'Light and protein-rich seafood dish',
        instructions: [
          'Sauté shrimp in olive oil until pink',
          'Add garlic and white wine',
          'Spiralize zucchini into noodles',
          'Toss zucchini with shrimp and sauce',
          'Garnish with parsley and lemon'
        ],
        ingredients: [
          { name: 'Shrimp', amount: 150, unit: 'g' },
          { name: 'Zucchini', amount: 200, unit: 'g' },
          { name: 'Garlic', amount: 3, unit: 'cloves' },
          { name: 'White wine', amount: 50, unit: 'ml' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' },
          { name: 'Parsley', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 12,
        calories: 280,
        protein: 32,
        carbohydrates: 12,
        fats: 12,
        fiber: 3,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free', 'omega-3']
      },
      {
        id: 'r24',
        name: 'Lentil Curry',
        description: 'Hearty plant-based curry with lentils and vegetables',
        instructions: [
          'Sauté onions and garlic until fragrant',
          'Add curry spices and cook for 1 minute',
          'Add lentils, coconut milk, and vegetables',
          'Simmer until lentils are tender',
          'Serve over brown rice or quinoa'
        ],
        ingredients: [
          { name: 'Red lentils', amount: 100, unit: 'g' },
          { name: 'Coconut milk', amount: 100, unit: 'ml' },
          { name: 'Onion', amount: 50, unit: 'g' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Curry powder', amount: 1, unit: 'tbsp' },
          { name: 'Tomatoes', amount: 100, unit: 'g' },
          { name: 'Spinach', amount: 50, unit: 'g' },
          { name: 'Brown rice', amount: 100, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 25,
        calories: 420,
        protein: 22,
        carbohydrates: 65,
        fats: 10,
        fiber: 16,
        tags: ['dinner', 'vegetarian', 'vegan', 'high-fiber', 'gluten-free']
      },
      {
        id: 'r25',
        name: 'Steel Cut Oats with Berries',
        description: 'Hearty breakfast with complex carbs and antioxidants',
        instructions: [
          'Cook steel cut oats according to package directions',
          'Top with fresh mixed berries',
          'Add Greek yogurt for extra protein',
          'Drizzle with honey or maple syrup',
          'Sprinkle with nuts or seeds'
        ],
        ingredients: [
          { name: 'Steel cut oats', amount: 50, unit: 'g' },
          { name: 'Almond milk', amount: 150, unit: 'ml' },
          { name: 'Greek yogurt', amount: 60, unit: 'g' },
          { name: 'Mixed berries', amount: 80, unit: 'g' },
          { name: 'Honey', amount: 1, unit: 'tbsp' },
          { name: 'Almonds', amount: 15, unit: 'g' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 20,
        calories: 380,
        protein: 18,
        carbohydrates: 58,
        fats: 10,
        fiber: 8,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'high-fiber', 'meal-prep']
      },
      {
        id: 'r26',
        name: 'Baked Chicken Thighs with Vegetables',
        description: 'Flavorful one-pan meal with dark meat and roasted vegetables',
        instructions: [
          'Season chicken thighs with herbs and spices',
          'Toss vegetables with olive oil and seasonings',
          'Arrange chicken and vegetables on baking sheet',
          'Bake at 425°F for 25-30 minutes',
          'Serve hot with lemon wedges'
        ],
        ingredients: [
          { name: 'Chicken thighs', amount: 150, unit: 'g' },
          { name: 'Brussels sprouts', amount: 150, unit: 'g' },
          { name: 'Carrots', amount: 100, unit: 'g' },
          { name: 'Red potatoes', amount: 100, unit: 'g' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' },
          { name: 'Fresh herbs', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 30,
        calories: 480,
        protein: 38,
        carbohydrates: 32,
        fats: 22,
        fiber: 8,
        tags: ['dinner', 'high-protein', 'gluten-free', 'meal-prep']
      },
      {
        id: 'r27',
        name: 'Green Smoothie Bowl',
        description: 'Nutrient-dense smoothie bowl packed with greens and fruits',
        instructions: [
          'Blend spinach, banana, and frozen mango',
          'Add protein powder and almond milk',
          'Blend until smooth and thick',
          'Pour into bowl and top with granola',
          'Add fresh berries, coconut, and seeds'
        ],
        ingredients: [
          { name: 'Spinach', amount: 50, unit: 'g' },
          { name: 'Banana', amount: 1, unit: 'medium' },
          { name: 'Frozen mango', amount: 100, unit: 'g' },
          { name: 'Protein powder', amount: 25, unit: 'g' },
          { name: 'Almond milk', amount: 150, unit: 'ml' },
          { name: 'Granola', amount: 30, unit: 'g' },
          { name: 'Berries', amount: 50, unit: 'g' },
          { name: 'Coconut flakes', amount: 10, unit: 'g' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 380,
        protein: 30,
        carbohydrates: 52,
        fats: 10,
        fiber: 10,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'vegan', 'quick']
      },
      {
        id: 'r28',
        name: 'Tofu Stir Fry',
        description: 'Plant-based protein stir fry with vegetables',
        instructions: [
          'Press and cube tofu, marinate in soy sauce',
          'Pan-fry tofu until golden and crispy',
          'Stir-fry vegetables until crisp-tender',
          'Add tofu back to pan with sauce',
          'Serve over brown rice or quinoa'
        ],
        ingredients: [
          { name: 'Firm tofu', amount: 200, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Carrots', amount: 80, unit: 'g' },
          { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
          { name: 'Ginger', amount: 1, unit: 'tsp' },
          { name: 'Sesame oil', amount: 1, unit: 'tsp' },
          { name: 'Brown rice', amount: 100, unit: 'g' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 15,
        calories: 420,
        protein: 24,
        carbohydrates: 55,
        fats: 14,
        fiber: 8,
        tags: ['dinner', 'vegetarian', 'vegan', 'high-protein', 'gluten-free']
      },
      {
        id: 'r29',
        name: 'Whole Wheat Pasta with Turkey and Vegetables',
        description: 'Healthy pasta dish with lean turkey and colorful vegetables',
        instructions: [
          'Cook whole wheat pasta according to package directions',
          'Sauté ground turkey until browned',
          'Add diced bell peppers, zucchini, and tomatoes',
          'Season with Italian herbs and garlic',
          'Toss pasta with turkey and vegetables',
          'Top with fresh basil and Parmesan'
        ],
        ingredients: [
          { name: 'Whole wheat pasta', amount: 80, unit: 'g' },
          { name: 'Ground turkey', amount: 120, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Zucchini', amount: 100, unit: 'g' },
          { name: 'Cherry tomatoes', amount: 100, unit: 'g' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Fresh basil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 20,
        calories: 480,
        protein: 38,
        carbohydrates: 58,
        fats: 14,
        fiber: 8,
        tags: ['dinner', 'high-protein', 'high-fiber', 'meal-prep'],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
      },
      {
        id: 'r30',
        name: 'Chickpea Pasta with Marinara and Spinach',
        description: 'High-protein pasta made from chickpeas with vegetables',
        instructions: [
          'Cook chickpea pasta according to package directions',
          'Heat marinara sauce in a pan',
          'Add fresh spinach and let wilt',
          'Toss pasta with sauce and spinach',
          'Top with nutritional yeast or Parmesan',
          'Garnish with fresh basil'
        ],
        ingredients: [
          { name: 'Chickpea pasta', amount: 80, unit: 'g' },
          { name: 'Marinara sauce', amount: 150, unit: 'ml' },
          { name: 'Fresh spinach', amount: 100, unit: 'g' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Fresh basil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 12,
        calories: 420,
        protein: 28,
        carbohydrates: 62,
        fats: 12,
        fiber: 12,
        tags: ['dinner', 'high-protein', 'vegetarian', 'gluten-free', 'high-fiber'],
        imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop'
      },
      {
        id: 'r31',
        name: 'Zucchini Noodles with Chicken and Pesto',
        description: 'Low-carb pasta alternative with lean protein',
        instructions: [
          'Spiralize zucchini into noodles',
          'Season and grill chicken breast, slice',
          'Sauté zucchini noodles briefly until tender',
          'Toss with homemade or store-bought pesto',
          'Top with sliced chicken and cherry tomatoes',
          'Garnish with pine nuts and basil'
        ],
        ingredients: [
          { name: 'Zucchini', amount: 300, unit: 'g' },
          { name: 'Chicken breast', amount: 150, unit: 'g' },
          { name: 'Pesto', amount: 2, unit: 'tbsp' },
          { name: 'Cherry tomatoes', amount: 80, unit: 'g' },
          { name: 'Pine nuts', amount: 10, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 15,
        calories: 380,
        protein: 42,
        carbohydrates: 12,
        fats: 18,
        fiber: 4,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop'
      },
      {
        id: 'r32',
        name: 'Lentil Pasta with Turkey Meatballs',
        description: 'High-protein pasta with lean turkey meatballs',
        instructions: [
          'Cook lentil pasta according to package directions',
          'Mix ground turkey with herbs and form meatballs',
          'Bake meatballs at 400°F for 15-18 minutes',
          'Heat marinara sauce',
          'Toss pasta with sauce and meatballs',
          'Top with fresh basil and Parmesan'
        ],
        ingredients: [
          { name: 'Lentil pasta', amount: 80, unit: 'g' },
          { name: 'Ground turkey', amount: 120, unit: 'g' },
          { name: 'Egg', amount: 1, unit: 'large' },
          { name: 'Breadcrumbs', amount: 15, unit: 'g' },
          { name: 'Marinara sauce', amount: 150, unit: 'ml' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Fresh basil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 20,
        calories: 480,
        protein: 42,
        carbohydrates: 52,
        fats: 14,
        fiber: 10,
        tags: ['dinner', 'high-protein', 'high-fiber', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop'
      },
      {
        id: 'r33',
        name: 'Brown Rice Pasta with Shrimp and Vegetables',
        description: 'Gluten-free pasta with lean seafood and vegetables',
        instructions: [
          'Cook brown rice pasta according to package directions',
          'Sauté shrimp until pink and cooked through',
          'Add bell peppers, broccoli, and snap peas',
          'Toss with garlic, olive oil, and lemon',
          'Combine pasta with shrimp and vegetables',
          'Garnish with parsley and lemon zest'
        ],
        ingredients: [
          { name: 'Brown rice pasta', amount: 80, unit: 'g' },
          { name: 'Shrimp', amount: 150, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Snap peas', amount: 80, unit: 'g' },
          { name: 'Garlic', amount: 3, unit: 'cloves' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' },
          { name: 'Parsley', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 15,
        calories: 420,
        protein: 36,
        carbohydrates: 55,
        fats: 10,
        fiber: 6,
        tags: ['dinner', 'high-protein', 'gluten-free', 'omega-3'],
        imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop'
      },
      {
        id: 'r34',
        name: 'Quinoa Pasta with Chicken and Broccoli',
        description: 'Protein-rich pasta with lean chicken and vegetables',
        instructions: [
          'Cook quinoa pasta according to package directions',
          'Season and cook chicken breast, slice',
          'Steam broccoli until tender-crisp',
          'Sauté garlic in olive oil',
          'Toss pasta with chicken, broccoli, and garlic',
          'Season with herbs and Parmesan cheese'
        ],
        ingredients: [
          { name: 'Quinoa pasta', amount: 80, unit: 'g' },
          { name: 'Chicken breast', amount: 150, unit: 'g' },
          { name: 'Broccoli', amount: 150, unit: 'g' },
          { name: 'Garlic', amount: 3, unit: 'cloves' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Italian herbs', amount: 1, unit: 'tsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 18,
        calories: 480,
        protein: 48,
        carbohydrates: 52,
        fats: 14,
        fiber: 6,
        tags: ['dinner', 'high-protein', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
      },
      {
        id: 'r35',
        name: 'Whole Grain Spaghetti with Turkey Bolognese',
        description: 'Healthy twist on classic spaghetti with lean ground turkey',
        instructions: [
          'Cook whole grain spaghetti according to package directions',
          'Sauté ground turkey until browned',
          'Add diced onions, carrots, and celery',
          'Add crushed tomatoes and simmer',
          'Season with Italian herbs and garlic',
          'Serve pasta with bolognese sauce and Parmesan'
        ],
        ingredients: [
          { name: 'Whole grain spaghetti', amount: 80, unit: 'g' },
          { name: 'Ground turkey', amount: 120, unit: 'g' },
          { name: 'Onion', amount: 50, unit: 'g' },
          { name: 'Carrots', amount: 50, unit: 'g' },
          { name: 'Celery', amount: 30, unit: 'g' },
          { name: 'Crushed tomatoes', amount: 200, unit: 'ml' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 25,
        calories: 480,
        protein: 36,
        carbohydrates: 62,
        fats: 12,
        fiber: 10,
        tags: ['dinner', 'high-protein', 'high-fiber', 'meal-prep'],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
      },
      {
        id: 'r36',
        name: 'Edamame Pasta with Vegetables and Tofu',
        description: 'Plant-based high-protein pasta with vegetables',
        instructions: [
          'Cook edamame pasta according to package directions',
          'Cube and pan-fry tofu until golden',
          'Sauté mixed vegetables (broccoli, bell peppers, mushrooms)',
          'Toss pasta with vegetables and tofu',
          'Add soy sauce, ginger, and sesame oil',
          'Garnish with green onions and sesame seeds'
        ],
        ingredients: [
          { name: 'Edamame pasta', amount: 80, unit: 'g' },
          { name: 'Firm tofu', amount: 150, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Mushrooms', amount: 80, unit: 'g' },
          { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
          { name: 'Ginger', amount: 1, unit: 'tsp' },
          { name: 'Sesame oil', amount: 1, unit: 'tsp' },
          { name: 'Green onions', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 15,
        calories: 440,
        protein: 38,
        carbohydrates: 48,
        fats: 12,
        fiber: 14,
        tags: ['dinner', 'high-protein', 'vegetarian', 'vegan', 'gluten-free', 'high-fiber'],
        imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop'
      },
      {
        id: 'r37',
        name: 'Spaghetti Squash with Turkey Meatballs',
        description: 'Low-carb pasta alternative with lean meatballs',
        instructions: [
          'Bake spaghetti squash at 400°F for 40-45 minutes',
          'Scrape out squash strands with fork',
          'Mix ground turkey with herbs and form meatballs',
          'Bake meatballs at 400°F for 15-18 minutes',
          'Heat marinara sauce',
          'Serve squash with meatballs and sauce',
          'Top with fresh basil and Parmesan'
        ],
        ingredients: [
          { name: 'Spaghetti squash', amount: 300, unit: 'g' },
          { name: 'Ground turkey', amount: 120, unit: 'g' },
          { name: 'Egg', amount: 1, unit: 'large' },
          { name: 'Breadcrumbs', amount: 15, unit: 'g' },
          { name: 'Marinara sauce', amount: 150, unit: 'ml' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Fresh basil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 45,
        calories: 320,
        protein: 32,
        carbohydrates: 22,
        fats: 12,
        fiber: 6,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop'
      },
      {
        id: 'r38',
        name: 'Black Bean Pasta with Vegetables',
        description: 'High-fiber pasta made from black beans with mixed vegetables',
        instructions: [
          'Cook black bean pasta according to package directions',
          'Sauté bell peppers, zucchini, and mushrooms',
          'Add cherry tomatoes and let burst',
          'Toss pasta with vegetables',
          'Season with garlic, olive oil, and herbs',
          'Top with feta cheese and fresh basil'
        ],
        ingredients: [
          { name: 'Black bean pasta', amount: 80, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Zucchini', amount: 100, unit: 'g' },
          { name: 'Mushrooms', amount: 80, unit: 'g' },
          { name: 'Cherry tomatoes', amount: 100, unit: 'g' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Feta cheese', amount: 30, unit: 'g' },
          { name: 'Fresh basil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 15,
        calories: 420,
        protein: 28,
        carbohydrates: 58,
        fats: 14,
        fiber: 16,
        tags: ['dinner', 'high-protein', 'vegetarian', 'gluten-free', 'high-fiber'],
        imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop'
      },
      {
        id: 'r39',
        name: 'Whole Wheat Penne with Salmon and Asparagus',
        description: 'Healthy pasta with omega-3 rich salmon and vegetables',
        instructions: [
          'Cook whole wheat penne according to package directions',
          'Season and bake salmon at 400°F for 12-15 minutes',
          'Sauté asparagus until tender-crisp',
          'Toss pasta with olive oil, lemon, and herbs',
          'Flake salmon and combine with pasta and asparagus',
          'Garnish with lemon zest and dill'
        ],
        ingredients: [
          { name: 'Whole wheat penne', amount: 80, unit: 'g' },
          { name: 'Salmon fillet', amount: 150, unit: 'g' },
          { name: 'Asparagus', amount: 150, unit: 'g' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Fresh dill', amount: 1, unit: 'tbsp' },
          { name: 'Garlic', amount: 2, unit: 'cloves' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 18,
        calories: 520,
        protein: 42,
        carbohydrates: 58,
        fats: 16,
        fiber: 8,
        tags: ['dinner', 'high-protein', 'omega-3', 'high-fiber'],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
      },
      {
        id: 'r40',
        name: 'Red Lentil Pasta with Chicken and Vegetables',
        description: 'High-protein pasta with lean chicken and colorful vegetables',
        instructions: [
          'Cook red lentil pasta according to package directions',
          'Season and cook chicken breast, slice',
          'Sauté bell peppers, broccoli, and carrots',
          'Toss pasta with chicken and vegetables',
          'Add garlic, olive oil, and Italian herbs',
          'Top with Parmesan cheese and fresh parsley'
        ],
        ingredients: [
          { name: 'Red lentil pasta', amount: 80, unit: 'g' },
          { name: 'Chicken breast', amount: 150, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Carrots', amount: 80, unit: 'g' },
          { name: 'Garlic', amount: 3, unit: 'cloves' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Fresh parsley', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 20,
        calories: 480,
        protein: 46,
        carbohydrates: 52,
        fats: 14,
        fiber: 10,
        tags: ['dinner', 'high-protein', 'gluten-free', 'high-fiber'],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
      },
      {
        id: 'r41',
        name: 'Chicken and Vegetable Skewers',
        description: 'Grilled chicken and vegetables on skewers',
        instructions: [
          'Cut chicken breast into cubes and marinate',
          'Cut bell peppers, zucchini, and onions into chunks',
          'Thread chicken and vegetables onto skewers',
          'Grill for 10-12 minutes, turning occasionally',
          'Serve with quinoa or brown rice',
          'Drizzle with lemon and herbs'
        ],
        ingredients: [
          { name: 'Chicken breast', amount: 150, unit: 'g' },
          { name: 'Bell peppers', amount: 100, unit: 'g' },
          { name: 'Zucchini', amount: 100, unit: 'g' },
          { name: 'Red onion', amount: 50, unit: 'g' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' },
          { name: 'Lemon', amount: 0.5, unit: 'piece' },
          { name: 'Herbs', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 12,
        calories: 320,
        protein: 38,
        carbohydrates: 18,
        fats: 12,
        fiber: 4,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
      },
      {
        id: 'r42',
        name: 'Mushroom and Spinach Frittata',
        description: 'Protein-rich egg dish with vegetables',
        instructions: [
          'Sauté mushrooms and spinach until tender',
          'Whisk eggs with milk and seasonings',
          'Pour eggs over vegetables in oven-safe pan',
          'Bake at 375°F for 15-18 minutes',
          'Top with feta cheese and fresh herbs',
          'Serve warm or at room temperature'
        ],
        ingredients: [
          { name: 'Eggs', amount: 4, unit: 'large' },
          { name: 'Mushrooms', amount: 100, unit: 'g' },
          { name: 'Spinach', amount: 80, unit: 'g' },
          { name: 'Feta cheese', amount: 40, unit: 'g' },
          { name: 'Milk', amount: 30, unit: 'ml' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' },
          { name: 'Fresh herbs', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 18,
        calories: 380,
        protein: 28,
        carbohydrates: 12,
        fats: 24,
        fiber: 3,
        tags: ['breakfast', 'high-protein', 'vegetarian', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=600&fit=crop'
      },
      {
        id: 'r43',
        name: 'Stuffed Bell Peppers with Turkey and Quinoa',
        description: 'Lean protein and whole grains in bell peppers',
        instructions: [
          'Cook quinoa according to package directions',
          'Sauté ground turkey until browned',
          'Mix turkey with quinoa, vegetables, and seasonings',
          'Stuff bell peppers with mixture',
          'Bake at 375°F for 25-30 minutes',
          'Top with cheese and fresh herbs'
        ],
        ingredients: [
          { name: 'Bell peppers', amount: 2, unit: 'large' },
          { name: 'Ground turkey', amount: 120, unit: 'g' },
          { name: 'Quinoa', amount: 60, unit: 'g' },
          { name: 'Onion', amount: 50, unit: 'g' },
          { name: 'Tomatoes', amount: 100, unit: 'g' },
          { name: 'Cheese', amount: 30, unit: 'g' },
          { name: 'Olive oil', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 35,
        calories: 420,
        protein: 32,
        carbohydrates: 42,
        fats: 14,
        fiber: 8,
        tags: ['dinner', 'high-protein', 'gluten-free', 'meal-prep'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
      },
      {
        id: 'r44',
        name: 'Cauliflower Rice Bowl with Chicken',
        description: 'Low-carb rice alternative with lean protein',
        instructions: [
          'Pulse cauliflower in food processor to create rice',
          'Sauté cauliflower rice until tender',
          'Season and cook chicken breast, slice',
          'Sauté vegetables (broccoli, carrots, snap peas)',
          'Assemble bowl with cauliflower rice, chicken, and vegetables',
          'Drizzle with low-sodium soy sauce or teriyaki'
        ],
        ingredients: [
          { name: 'Cauliflower', amount: 300, unit: 'g' },
          { name: 'Chicken breast', amount: 150, unit: 'g' },
          { name: 'Broccoli', amount: 100, unit: 'g' },
          { name: 'Carrots', amount: 80, unit: 'g' },
          { name: 'Snap peas', amount: 80, unit: 'g' },
          { name: 'Soy sauce', amount: 1, unit: 'tbsp' },
          { name: 'Olive oil', amount: 2, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 20,
        calories: 320,
        protein: 42,
        carbohydrates: 22,
        fats: 10,
        fiber: 8,
        tags: ['dinner', 'high-protein', 'low-carb', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
      },
      {
        id: 'r45',
        name: 'Acai Bowl',
        description: 'Antioxidant-rich breakfast bowl with fruits and toppings',
        instructions: [
          'Blend frozen acai with banana and almond milk',
          'Pour into bowl and top with granola',
          'Add fresh berries, banana slices, and coconut',
          'Drizzle with honey or agave',
          'Sprinkle with chia seeds and nuts'
        ],
        ingredients: [
          { name: 'Frozen acai', amount: 100, unit: 'g' },
          { name: 'Banana', amount: 1, unit: 'medium' },
          { name: 'Almond milk', amount: 100, unit: 'ml' },
          { name: 'Granola', amount: 30, unit: 'g' },
          { name: 'Mixed berries', amount: 80, unit: 'g' },
          { name: 'Coconut flakes', amount: 15, unit: 'g' },
          { name: 'Chia seeds', amount: 1, unit: 'tbsp' },
          { name: 'Honey', amount: 1, unit: 'tbsp' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 0,
        calories: 360,
        protein: 8,
        carbohydrates: 68,
        fats: 10,
        fiber: 12,
        tags: ['breakfast', 'vegetarian', 'vegan', 'high-fiber', 'quick'],
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop'
      },
      {
        id: 'r46',
        name: 'Grilled Ribeye Steak',
        description: 'Juicy ribeye steak with herb butter',
        instructions: [
          'Remove steak from fridge 30 minutes before cooking',
          'Season generously with salt and pepper',
          'Heat grill or cast iron pan to high heat',
          'Sear steak 4-5 minutes per side for medium-rare',
          'Let rest 5 minutes, top with herb butter'
        ],
        ingredients: [
          { name: 'Ribeye steak', amount: 250, unit: 'g' },
          { name: 'Salt', amount: 1, unit: 'tsp' },
          { name: 'Black pepper', amount: 0.5, unit: 'tsp' },
          { name: 'Butter', amount: 20, unit: 'g' },
          { name: 'Fresh herbs', amount: 10, unit: 'g' }
        ],
        servings: 1,
        prepTime: 5,
        cookTime: 12,
        calories: 580,
        protein: 52,
        carbohydrates: 1,
        fats: 40,
        fiber: 0,
        tags: ['high-protein', 'low-carb', 'keto', 'gluten-free', 'dinner'],
        imageUrl: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=800&h=600&fit=crop'
      },
      {
        id: 'r47',
        name: 'Classic Beef Burger',
        description: 'Homemade beef burger with lean ground beef',
        instructions: [
          'Form ground beef into patties, season with salt and pepper',
          'Grill or pan-fry patties 4-5 minutes per side',
          'Toast burger buns on the grill',
          'Assemble with lettuce, tomato, onion, and pickles',
          'Add your favorite condiments'
        ],
        ingredients: [
          { name: 'Ground beef (90% lean)', amount: 150, unit: 'g' },
          { name: 'Whole wheat bun', amount: 1, unit: 'piece' },
          { name: 'Lettuce', amount: 30, unit: 'g' },
          { name: 'Tomato', amount: 50, unit: 'g' },
          { name: 'Onion', amount: 30, unit: 'g' },
          { name: 'Pickles', amount: 20, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 10,
        calories: 450,
        protein: 38,
        carbohydrates: 32,
        fats: 18,
        fiber: 5,
        tags: ['high-protein', 'lunch', 'dinner'],
        imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop'
      },
      {
        id: 'r48',
        name: 'Beef Tacos',
        description: 'Seasoned ground beef tacos with fresh toppings',
        instructions: [
          'Brown ground beef in a pan over medium heat',
          'Add taco seasoning and water, simmer 5 minutes',
          'Warm taco shells according to package',
          'Fill shells with beef, lettuce, tomatoes, cheese',
          'Top with salsa and sour cream'
        ],
        ingredients: [
          { name: 'Ground beef (90% lean)', amount: 120, unit: 'g' },
          { name: 'Taco shells', amount: 3, unit: 'pieces' },
          { name: 'Taco seasoning', amount: 1, unit: 'tbsp' },
          { name: 'Shredded lettuce', amount: 40, unit: 'g' },
          { name: 'Diced tomatoes', amount: 50, unit: 'g' },
          { name: 'Cheddar cheese', amount: 30, unit: 'g' },
          { name: 'Salsa', amount: 30, unit: 'g' },
          { name: 'Sour cream', amount: 20, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 12,
        calories: 520,
        protein: 35,
        carbohydrates: 38,
        fats: 24,
        fiber: 5,
        tags: ['high-protein', 'dinner', 'quick'],
        imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=600&fit=crop'
      },
      {
        id: 'r49',
        name: 'Spaghetti Bolognese',
        description: 'Classic Italian pasta with rich beef sauce',
        instructions: [
          'Brown ground beef with diced onions and garlic',
          'Add crushed tomatoes, tomato paste, Italian herbs',
          'Simmer sauce for 20 minutes, stirring occasionally',
          'Cook spaghetti according to package directions',
          'Serve sauce over pasta, garnish with parmesan'
        ],
        ingredients: [
          { name: 'Ground beef (85% lean)', amount: 150, unit: 'g' },
          { name: 'Whole wheat spaghetti', amount: 100, unit: 'g' },
          { name: 'Crushed tomatoes', amount: 200, unit: 'g' },
          { name: 'Onion', amount: 50, unit: 'g' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Tomato paste', amount: 2, unit: 'tbsp' },
          { name: 'Italian herbs', amount: 1, unit: 'tsp' },
          { name: 'Parmesan cheese', amount: 15, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 25,
        calories: 580,
        protein: 42,
        carbohydrates: 62,
        fats: 18,
        fiber: 8,
        tags: ['high-protein', 'dinner', 'comfort-food'],
        imageUrl: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&h=600&fit=crop'
      },
      {
        id: 'r50',
        name: 'Beef Stir-Fry',
        description: 'Quick Asian-style beef with vegetables',
        instructions: [
          'Slice beef thinly against the grain',
          'Marinate beef in soy sauce and ginger for 10 minutes',
          'Stir-fry beef in hot wok until browned, remove',
          'Stir-fry vegetables until tender-crisp',
          'Add beef back, toss with sauce, serve over rice'
        ],
        ingredients: [
          { name: 'Sirloin steak', amount: 180, unit: 'g' },
          { name: 'Mixed vegetables', amount: 200, unit: 'g' },
          { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
          { name: 'Ginger', amount: 1, unit: 'tsp' },
          { name: 'Garlic', amount: 2, unit: 'cloves' },
          { name: 'Sesame oil', amount: 1, unit: 'tbsp' },
          { name: 'White rice', amount: 150, unit: 'g' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 10,
        calories: 520,
        protein: 45,
        carbohydrates: 48,
        fats: 14,
        fiber: 4,
        tags: ['high-protein', 'dinner', 'quick', 'asian'],
        imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
      },
      {
        id: 'r51',
        name: 'Italian Beef Meatballs',
        description: 'Tender beef meatballs in marinara sauce',
        instructions: [
          'Mix ground beef with breadcrumbs, egg, parmesan, herbs',
          'Form into 8-10 meatballs',
          'Brown meatballs in oven at 400°F for 15 minutes',
          'Simmer in marinara sauce for 10 minutes',
          'Serve with pasta or as a sub sandwich'
        ],
        ingredients: [
          { name: 'Ground beef (85% lean)', amount: 180, unit: 'g' },
          { name: 'Breadcrumbs', amount: 30, unit: 'g' },
          { name: 'Egg', amount: 1, unit: 'piece' },
          { name: 'Parmesan cheese', amount: 20, unit: 'g' },
          { name: 'Italian herbs', amount: 1, unit: 'tsp' },
          { name: 'Marinara sauce', amount: 150, unit: 'g' },
          { name: 'Garlic', amount: 2, unit: 'cloves' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 25,
        calories: 480,
        protein: 45,
        carbohydrates: 22,
        fats: 24,
        fiber: 3,
        tags: ['high-protein', 'dinner', 'italian', 'comfort-food'],
        imageUrl: 'https://images.unsplash.com/photo-1623001171243-da4be6c72c44?w=800&h=600&fit=crop'
      },
      {
        id: 'r52',
        name: 'Beef Chili',
        description: 'Hearty beef chili with beans and spices',
        instructions: [
          'Brown ground beef with onions and garlic',
          'Add diced tomatoes, kidney beans, and spices',
          'Simmer for 30 minutes, stirring occasionally',
          'Adjust seasoning with salt and chili powder',
          'Top with cheese, sour cream, and green onions'
        ],
        ingredients: [
          { name: 'Ground beef (85% lean)', amount: 150, unit: 'g' },
          { name: 'Kidney beans', amount: 100, unit: 'g' },
          { name: 'Diced tomatoes', amount: 200, unit: 'g' },
          { name: 'Onion', amount: 60, unit: 'g' },
          { name: 'Garlic', amount: 3, unit: 'cloves' },
          { name: 'Chili powder', amount: 2, unit: 'tbsp' },
          { name: 'Cumin', amount: 1, unit: 'tsp' },
          { name: 'Cheddar cheese', amount: 30, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 35,
        calories: 520,
        protein: 44,
        carbohydrates: 38,
        fats: 22,
        fiber: 12,
        tags: ['high-protein', 'high-fiber', 'dinner', 'comfort-food'],
        imageUrl: 'https://images.unsplash.com/photo-1596897554601-0ef37e8565eb?w=800&h=600&fit=crop'
      },
      {
        id: 'r53',
        name: 'Korean Beef Bowl',
        description: 'Sweet and savory Korean-style beef with rice',
        instructions: [
          'Cook ground beef until browned, drain excess fat',
          'Mix soy sauce, brown sugar, sesame oil, ginger, garlic',
          'Add sauce to beef, simmer until thickened',
          'Serve over white rice with sesame seeds',
          'Garnish with green onions and sriracha'
        ],
        ingredients: [
          { name: 'Ground beef (90% lean)', amount: 160, unit: 'g' },
          { name: 'White rice', amount: 150, unit: 'g' },
          { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
          { name: 'Brown sugar', amount: 2, unit: 'tbsp' },
          { name: 'Sesame oil', amount: 1, unit: 'tbsp' },
          { name: 'Ginger', amount: 1, unit: 'tsp' },
          { name: 'Garlic', amount: 3, unit: 'cloves' },
          { name: 'Green onions', amount: 20, unit: 'g' }
        ],
        servings: 1,
        prepTime: 10,
        cookTime: 15,
        calories: 560,
        protein: 42,
        carbohydrates: 58,
        fats: 16,
        fiber: 2,
        tags: ['high-protein', 'dinner', 'asian', 'quick'],
        imageUrl: 'https://images.unsplash.com/photo-1630409346693-4844baf6d7e1?w=800&h=600&fit=crop'
      },
      {
        id: 'r54',
        name: 'Beef and Broccoli',
        description: 'Classic Chinese takeout made healthier at home',
        instructions: [
          'Slice beef thinly, marinate in soy sauce and cornstarch',
          'Blanch broccoli florets until bright green',
          'Stir-fry beef in hot wok until seared, remove',
          'Make sauce with soy sauce, oyster sauce, garlic',
          'Combine beef, broccoli, and sauce, serve over rice'
        ],
        ingredients: [
          { name: 'Flank steak', amount: 200, unit: 'g' },
          { name: 'Broccoli', amount: 200, unit: 'g' },
          { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
          { name: 'Oyster sauce', amount: 2, unit: 'tbsp' },
          { name: 'Garlic', amount: 3, unit: 'cloves' },
          { name: 'Cornstarch', amount: 1, unit: 'tbsp' },
          { name: 'Vegetable oil', amount: 2, unit: 'tbsp' },
          { name: 'White rice', amount: 150, unit: 'g' }
        ],
        servings: 1,
        prepTime: 15,
        cookTime: 12,
        calories: 540,
        protein: 48,
        carbohydrates: 52,
        fats: 14,
        fiber: 6,
        tags: ['high-protein', 'dinner', 'asian'],
        imageUrl: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&h=600&fit=crop'
      },
      {
        id: 'r55',
        name: 'Beef Cottage Pie',
        description: 'Comforting beef mince topped with mashed potatoes',
        instructions: [
          'Brown ground beef with onions, carrots, and peas',
          'Add beef broth and tomato paste, simmer until thick',
          'Transfer to baking dish',
          'Top with creamy mashed potatoes',
          'Bake at 375°F for 25 minutes until golden'
        ],
        ingredients: [
          { name: 'Ground beef (85% lean)', amount: 180, unit: 'g' },
          { name: 'Potatoes', amount: 250, unit: 'g' },
          { name: 'Carrots', amount: 60, unit: 'g' },
          { name: 'Peas', amount: 50, unit: 'g' },
          { name: 'Onion', amount: 60, unit: 'g' },
          { name: 'Beef broth', amount: 150, unit: 'ml' },
          { name: 'Tomato paste', amount: 2, unit: 'tbsp' },
          { name: 'Butter', amount: 20, unit: 'g' },
          { name: 'Milk', amount: 50, unit: 'ml' }
        ],
        servings: 1,
        prepTime: 20,
        cookTime: 40,
        calories: 620,
        protein: 46,
        carbohydrates: 58,
        fats: 22,
        fiber: 8,
        tags: ['high-protein', 'dinner', 'comfort-food', 'british'],
        imageUrl: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800&h=600&fit=crop'
      },
    ];
  }

  // Member methods
  getAllMembers(): Member[] {
    return this.members;
  }

  getMember(id: string): Member | undefined {
    return this.members.find(m => m.id === id);
  }

  addMember(member: Omit<Member, 'id'>): Member {
    const newMember: Member = {
      ...member,
      id: Date.now().toString(),
    };
    this.members.push(newMember);
    return newMember;
  }

  updateMember(id: string, updates: Partial<Member>): Member | null {
    const index = this.members.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.members[index] = { ...this.members[index], ...updates };
    return this.members[index];
  }

  deleteMember(id: string): boolean {
    const index = this.members.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.members.splice(index, 1);
    return true;
  }

  // Membership methods
  getAllMemberships(): Membership[] {
    return this.memberships;
  }

  getMembership(id: string): Membership | undefined {
    return this.memberships.find(m => m.id === id);
  }

  addMembership(membership: Omit<Membership, 'id'>): Membership {
    const newMembership: Membership = {
      ...membership,
      id: Date.now().toString(),
    };
    this.memberships.push(newMembership);
    return newMembership;
  }

  updateMembership(id: string, updates: Partial<Membership>): Membership | null {
    const index = this.memberships.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.memberships[index] = { ...this.memberships[index], ...updates };
    return this.memberships[index];
  }

  deleteMembership(id: string): boolean {
    const index = this.memberships.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.memberships.splice(index, 1);
    return true;
  }

  // Trainer methods
  getAllTrainers(): Trainer[] {
    return this.trainers;
  }

  getTrainer(id: string): Trainer | undefined {
    return this.trainers.find(t => t.id === id);
  }

  addTrainer(trainer: Omit<Trainer, 'id'>): Trainer {
    const newTrainer: Trainer = {
      ...trainer,
      id: Date.now().toString(),
    };
    this.trainers.push(newTrainer);
    return newTrainer;
  }

  updateTrainer(id: string, updates: Partial<Trainer>): Trainer | null {
    const index = this.trainers.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.trainers[index] = { ...this.trainers[index], ...updates };
    return this.trainers[index];
  }

  deleteTrainer(id: string): boolean {
    const index = this.trainers.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.trainers.splice(index, 1);
    return true;
  }

  // Class methods
  getAllClasses(): GymClass[] {
    return this.classes;
  }

  getClass(id: string): GymClass | undefined {
    return this.classes.find(c => c.id === id);
  }

  addClass(gymClass: Omit<GymClass, 'id'>): GymClass {
    const newClass: GymClass = {
      ...gymClass,
      id: Date.now().toString(),
    };
    this.classes.push(newClass);
    return newClass;
  }

  updateClass(id: string, updates: Partial<GymClass>): GymClass | null {
    const index = this.classes.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.classes[index] = { ...this.classes[index], ...updates };
    return this.classes[index];
  }

  deleteClass(id: string): boolean {
    const index = this.classes.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.classes.splice(index, 1);
    return true;
  }

  // Authentication methods
  authenticateMember(email: string, password: string): Member | null {
    const member = this.members.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (!member || !member.password) return null;
    if (!verifyPassword(password, member.password)) return null;
    if (member.status !== 'active') return null;
    return member;
  }

  // Session tracking methods
  incrementMemberSessions(memberId: string): boolean {
    const member = this.getMember(memberId);
    if (!member) return false;
    member.completedSessions = (member.completedSessions || 0) + 1;
    return true;
  }

  getMemberSessions(memberId: string): number {
    const member = this.getMember(memberId);
    return member?.completedSessions || 0;
  }

  // Check-in methods
  checkInMember(classId: string, memberId: string): boolean {
    const gymClass = this.getClass(classId);
    if (!gymClass) return false;
    if (!gymClass.enrolledMembers.includes(memberId)) return false;
    if (gymClass.checkedInMembers.includes(memberId)) return false;
    
    gymClass.checkedInMembers.push(memberId);
    
    // Increment session count when checking in
    this.incrementMemberSessions(memberId);
    
    return true;
  }

  // Waitlist methods
  addToWaitlist(classId: string, memberId: string): boolean {
    const gymClass = this.getClass(classId);
    if (!gymClass) return false;
    if (gymClass.enrolledMembers.includes(memberId)) return false;
    if (gymClass.waitlist.includes(memberId)) return false;
    
    gymClass.waitlist.push(memberId);
    return true;
  }

  removeFromWaitlist(classId: string, memberId: string): boolean {
    const gymClass = this.getClass(classId);
    if (!gymClass) return false;
    const index = gymClass.waitlist.indexOf(memberId);
    if (index === -1) return false;
    gymClass.waitlist.splice(index, 1);
    return true;
  }

  // When a spot opens, move first waitlist member to enrolled
  processWaitlist(classId: string): boolean {
    const gymClass = this.getClass(classId);
    if (!gymClass) return false;
    if (gymClass.enrolledMembers.length >= gymClass.capacity) return false;
    if (gymClass.waitlist.length === 0) return false;
    
    const memberId = gymClass.waitlist.shift();
    if (memberId) {
      gymClass.enrolledMembers.push(memberId);
      // Send notification (in production)
      this.createNotification(memberId, 'class_reminder', 
        'Class Spot Available', 
        `A spot has opened in ${gymClass.name}. You've been automatically enrolled.`);
      return true;
    }
    return false;
  }

  // Payment methods
  createPayment(payment: Omit<Payment, 'id' | 'createdAt'>): Payment {
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  getMemberPayments(memberId: string): Payment[] {
    return this.payments.filter(p => p.memberId === memberId);
  }

  updatePaymentStatus(paymentId: string, status: Payment['status'], transactionId?: string): Payment | null {
    const payment = this.payments.find(p => p.id === paymentId);
    if (!payment) return null;
    payment.status = status;
    if (transactionId) payment.transactionId = transactionId;
    return payment;
  }

  // Email notification methods
  createNotification(memberId: string, type: EmailNotification['type'], subject: string, body: string): EmailNotification {
    const notification: EmailNotification = {
      id: Date.now().toString(),
      memberId,
      type,
      subject,
      body,
      sent: false,
      createdAt: new Date().toISOString(),
    };
    this.notifications.push(notification);
    // In production, send email here
    return notification;
  }

  getMemberNotifications(memberId: string): EmailNotification[] {
    return this.notifications
      .filter(n => n.memberId === memberId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  markNotificationSent(notificationId: string): boolean {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (!notification) return false;
    notification.sent = true;
    notification.sentAt = new Date().toISOString();
    return true;
  }

  // Phase 2: Exercise methods
  getAllExercises(): Exercise[] {
    return this.exercises;
  }

  getExercise(id: string): Exercise | undefined {
    return this.exercises.find(e => e.id === id);
  }

  addExercise(exercise: Omit<Exercise, 'id'>): Exercise {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
    };
    this.exercises.push(newExercise);
    return newExercise;
  }

  updateExercise(id: string, updates: Partial<Exercise>): Exercise | null {
    const index = this.exercises.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.exercises[index] = { ...this.exercises[index], ...updates };
    return this.exercises[index];
  }

  deleteExercise(id: string): boolean {
    const index = this.exercises.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.exercises.splice(index, 1);
    return true;
  }

  // Phase 2: Workout Plan methods
  getAllWorkoutPlans(): WorkoutPlan[] {
    return this.workoutPlans;
  }

  getWorkoutPlan(id: string): WorkoutPlan | undefined {
    return this.workoutPlans.find(p => p.id === id);
  }

  getMemberWorkoutPlans(memberId: string): WorkoutPlan[] {
    return this.workoutPlans.filter(p => p.memberId === memberId);
  }

  addWorkoutPlan(plan: Omit<WorkoutPlan, 'id' | 'createdAt'>): WorkoutPlan {
    const newPlan: WorkoutPlan = {
      ...plan,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.workoutPlans.push(newPlan);
    return newPlan;
  }

  updateWorkoutPlan(id: string, updates: Partial<WorkoutPlan>): WorkoutPlan | null {
    const index = this.workoutPlans.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.workoutPlans[index] = { ...this.workoutPlans[index], ...updates };
    return this.workoutPlans[index];
  }

  deleteWorkoutPlan(id: string): boolean {
    const index = this.workoutPlans.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.workoutPlans.splice(index, 1);
    // Also delete associated workouts
    this.workouts = this.workouts.filter(w => w.workoutPlanId !== id);
    return true;
  }

  // Phase 2: Workout methods
  getAllWorkouts(): Workout[] {
    return this.workouts;
  }

  getWorkout(id: string): Workout | undefined {
    return this.workouts.find(w => w.id === id);
  }

  getMemberWorkouts(memberId: string): Workout[] {
    return this.workouts.filter(w => w.memberId === memberId);
  }

  getWorkoutPlanWorkouts(workoutPlanId: string): Workout[] {
    return this.workouts.filter(w => w.workoutPlanId === workoutPlanId);
  }

  addWorkout(workout: Omit<Workout, 'id'>): Workout {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
    };
    this.workouts.push(newWorkout);
    return newWorkout;
  }

  updateWorkout(id: string, updates: Partial<Workout>): Workout | null {
    const index = this.workouts.findIndex(w => w.id === id);
    if (index === -1) return null;
    this.workouts[index] = { ...this.workouts[index], ...updates };
    return this.workouts[index];
  }

  deleteWorkout(id: string): boolean {
    const index = this.workouts.findIndex(w => w.id === id);
    if (index === -1) return false;
    this.workouts.splice(index, 1);
    // Also delete associated progress
    this.workoutProgress = this.workoutProgress.filter(p => p.workoutId !== id);
    return true;
  }

  // Phase 2: Workout Progress methods
  getWorkoutProgress(workoutId: string): WorkoutProgress[] {
    return this.workoutProgress.filter(p => p.workoutId === workoutId);
  }

  getMemberWorkoutProgress(memberId: string): WorkoutProgress[] {
    return this.workoutProgress.filter(p => p.memberId === memberId);
  }

  addWorkoutProgress(progress: Omit<WorkoutProgress, 'id' | 'completedAt'>): WorkoutProgress {
    const newProgress: WorkoutProgress = {
      ...progress,
      id: Date.now().toString(),
      completedAt: new Date().toISOString(),
    };
    this.workoutProgress.push(newProgress);
    return newProgress;
  }

  // Phase 2: Workout Template methods
  getAllWorkoutTemplates(): WorkoutTemplate[] {
    return this.workoutTemplates;
  }

  getWorkoutTemplate(id: string): WorkoutTemplate | undefined {
    return this.workoutTemplates.find(t => t.id === id);
  }

  addWorkoutTemplate(template: Omit<WorkoutTemplate, 'id'>): WorkoutTemplate {
    const newTemplate: WorkoutTemplate = {
      ...template,
      id: Date.now().toString(),
    };
    this.workoutTemplates.push(newTemplate);
    return newTemplate;
  }

  updateWorkoutTemplate(id: string, updates: Partial<WorkoutTemplate>): WorkoutTemplate | null {
    const index = this.workoutTemplates.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.workoutTemplates[index] = { ...this.workoutTemplates[index], ...updates };
    return this.workoutTemplates[index];
  }

  deleteWorkoutTemplate(id: string): boolean {
    const index = this.workoutTemplates.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.workoutTemplates.splice(index, 1);
    return true;
  }

  // Phase 2: AI Workout Generation (rule-based implementation - can integrate AI later)
  generateWorkoutPlan(params: {
    memberId: string;
    goal: WorkoutPlan['goal'];
    difficulty: WorkoutPlan['difficulty'];
    duration: number;
    frequency: number;
    equipment?: string[];
    limitations?: string[];
  }): WorkoutPlan {
    // Create workout plan
    const plan = this.addWorkoutPlan({
      memberId: params.memberId,
      name: `${params.goal.charAt(0).toUpperCase() + params.goal.slice(1).replace('_', ' ')} Workout Plan - ${params.difficulty.charAt(0).toUpperCase() + params.difficulty.slice(1)}`,
      description: `Personalized ${params.goal.replace('_', ' ')} workout plan for ${params.difficulty} level. ${params.limitations ? `Limitations: ${params.limitations}.` : ''}`,
      goal: params.goal,
      duration: params.duration,
      frequency: params.frequency,
      difficulty: params.difficulty,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      createdBy: 'ai',
    });

    // Rule-based exercise selection based on goal and difficulty
    const availableExercises = this.exercises.filter(ex => {
      // Filter by equipment if specified
      if (params.equipment && params.equipment.length > 0) {
        if (!params.equipment.includes(ex.equipment)) return false;
      }
      // Filter by difficulty
      if (params.difficulty === 'beginner' && ex.difficulty !== 'beginner') return false;
      if (params.difficulty === 'intermediate' && ex.difficulty === 'advanced') return false;
      return true;
    });

    // Select exercises based on goal
    let selectedExercises: Exercise[] = [];
    
    if (params.goal === 'strength' || params.goal === 'muscle_gain') {
      selectedExercises = availableExercises.filter(ex => 
        ex.category === 'strength'
      ).slice(0, 6);
    } else if (params.goal === 'weight_loss' || params.goal === 'endurance') {
      selectedExercises = [
        ...availableExercises.filter(ex => ex.category === 'cardio').slice(0, 3),
        ...availableExercises.filter(ex => ex.category === 'strength').slice(0, 3),
      ];
    } else if (params.goal === 'flexibility') {
      selectedExercises = availableExercises.filter(ex => 
        ex.category === 'flexibility' || ex.category === 'strength'
      ).slice(0, 5);
    } else {
      // general_fitness or athletic_performance
      selectedExercises = [
        ...availableExercises.filter(ex => ex.category === 'strength').slice(0, 4),
        ...availableExercises.filter(ex => ex.category === 'cardio').slice(0, 2),
      ];
    }

    // Ensure we have at least some exercises
    if (selectedExercises.length === 0) {
      selectedExercises = availableExercises.slice(0, 5);
    }

    // Generate workouts for the plan duration
    const startDate = new Date(plan.startDate);
    const totalWorkouts = params.duration * params.frequency;
    const daysBetweenWorkouts = Math.floor(7 / params.frequency);

    for (let i = 0; i < totalWorkouts; i++) {
      const workoutDate = new Date(startDate);
      workoutDate.setDate(startDate.getDate() + (i * daysBetweenWorkouts));

      // Create workout exercises with appropriate reps/sets based on difficulty
      const workoutExercises: WorkoutExercise[] = selectedExercises.map((ex, index) => {
        let sets = 3;
        let reps: number | undefined = 10;
        let restSeconds = 60;
        let duration: number | undefined;

        if (params.difficulty === 'beginner') {
          sets = 2;
          reps = 8;
          restSeconds = 90;
        } else if (params.difficulty === 'intermediate') {
          sets = 3;
          reps = 10;
          restSeconds = 60;
        } else {
          sets = 4;
          reps = 12;
          restSeconds = 45;
        }

        // Time-based exercises (like planks)
        if (ex.name.toLowerCase().includes('plank') || ex.name.toLowerCase().includes('hold')) {
          reps = undefined;
          duration = params.difficulty === 'beginner' ? 30 : params.difficulty === 'intermediate' ? 45 : 60;
        }

        return {
          exerciseId: ex.id,
          sets,
          reps,
          duration,
          restSeconds,
          order: index + 1,
        };
      });

      const workoutName = `Workout ${i + 1} - ${params.goal.replace('_', ' ')}`;
      
      // Estimate workout duration (simplified calculation)
      const avgSets = params.difficulty === 'beginner' ? 2 : params.difficulty === 'intermediate' ? 3 : 4;
      const avgRest = params.difficulty === 'beginner' ? 90 : params.difficulty === 'intermediate' ? 60 : 45;
      const estimatedDuration = Math.ceil(workoutExercises.length * avgSets * (avgRest / 60 + 0.5));
      
      this.addWorkout({
        workoutPlanId: plan.id,
        memberId: params.memberId,
        name: workoutName,
        date: workoutDate.toISOString().split('T')[0],
        exercises: workoutExercises,
        status: 'scheduled',
        duration: estimatedDuration,
      });
    }

    return plan;
  }

  // Phase 3: Recipe methods
  getAllRecipes(): Recipe[] {
    // Verify all recipes are loaded
    if (this.recipes.length !== 45) {
      console.warn(`Expected 45 recipes but found ${this.recipes.length}`);
    }
    return this.recipes;
  }

  getRecipe(id: string): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Recipe {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  updateRecipe(id: string, updates: Partial<Recipe>): Recipe | null {
    const index = this.recipes.findIndex(r => r.id === id);
    if (index === -1) return null;
    this.recipes[index] = { ...this.recipes[index], ...updates };
    return this.recipes[index];
  }

  deleteRecipe(id: string): boolean {
    const index = this.recipes.findIndex(r => r.id === id);
    if (index === -1) return false;
    this.recipes.splice(index, 1);
    return true;
  }

  // Phase 3: Nutrition Plan methods
  getAllNutritionPlans(): NutritionPlan[] {
    return this.nutritionPlans;
  }

  getNutritionPlan(id: string): NutritionPlan | undefined {
    return this.nutritionPlans.find(p => p.id === id);
  }

  getMemberNutritionPlans(memberId: string): NutritionPlan[] {
    return this.nutritionPlans.filter(p => p.memberId === memberId);
  }

  addNutritionPlan(plan: Omit<NutritionPlan, 'id' | 'createdAt'>): NutritionPlan {
    const newPlan: NutritionPlan = {
      ...plan,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.nutritionPlans.push(newPlan);
    return newPlan;
  }

  updateNutritionPlan(id: string, updates: Partial<NutritionPlan>): NutritionPlan | null {
    const index = this.nutritionPlans.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.nutritionPlans[index] = { ...this.nutritionPlans[index], ...updates };
    return this.nutritionPlans[index];
  }

  deleteNutritionPlan(id: string): boolean {
    const index = this.nutritionPlans.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.nutritionPlans.splice(index, 1);
    // Also delete associated daily meal plans
    this.dailyMealPlans = this.dailyMealPlans.filter(mp => mp.nutritionPlanId !== id);
    return true;
  }

  // Phase 3: Daily Meal Plan methods
  getDailyMealPlans(nutritionPlanId: string): DailyMealPlan[] {
    return this.dailyMealPlans.filter(mp => mp.nutritionPlanId === nutritionPlanId);
  }

  getMemberDailyMealPlans(memberId: string): DailyMealPlan[] {
    return this.dailyMealPlans.filter(mp => mp.memberId === memberId);
  }

  addDailyMealPlan(mealPlan: Omit<DailyMealPlan, 'id'>): DailyMealPlan {
    const newMealPlan: DailyMealPlan = {
      ...mealPlan,
      id: Date.now().toString(),
    };
    this.dailyMealPlans.push(newMealPlan);
    return newMealPlan;
  }

  updateDailyMealPlan(id: string, updates: Partial<DailyMealPlan>): DailyMealPlan | null {
    const index = this.dailyMealPlans.findIndex(mp => mp.id === id);
    if (index === -1) return null;
    this.dailyMealPlans[index] = { ...this.dailyMealPlans[index], ...updates };
    return this.dailyMealPlans[index];
  }

  // Phase 3: Macro Calculator (Mifflin-St Jeor formula)
  calculateMacros(params: {
    gender: 'male' | 'female';
    age: number;
    height: number; // in cm
    weight: number; // in kg
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'performance' | 'general_health';
  }): MacroTargets {
    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number;
    if (params.gender === 'male') {
      bmr = 10 * params.weight + 6.25 * params.height - 5 * params.age + 5;
    } else {
      bmr = 10 * params.weight + 6.25 * params.height - 5 * params.age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[params.activityLevel];

    // Adjust calories based on goal
    let targetCalories: number;
    switch (params.goal) {
      case 'weight_loss':
        targetCalories = tdee * 0.85; // 15% deficit
        break;
      case 'muscle_gain':
        targetCalories = tdee * 1.15; // 15% surplus
        break;
      case 'performance':
        targetCalories = tdee * 1.1; // 10% surplus
        break;
      default:
        targetCalories = tdee; // maintenance
    }

    // Calculate macros
    // Protein: 2.2g per kg body weight (for muscle gain) or 1.6g (for weight loss)
    const proteinGrams = params.goal === 'muscle_gain' 
      ? Math.round(params.weight * 2.2) 
      : Math.round(params.weight * 1.6);
    const proteinCalories = proteinGrams * 4;

    // Fats: 25-30% of calories
    const fatPercentage = 0.275; // 27.5%
    const fatCalories = Math.round(targetCalories * fatPercentage);
    const fatGrams = Math.round(fatCalories / 9);

    // Carbohydrates: remaining calories
    const carbCalories = Math.round(targetCalories - proteinCalories - fatCalories);
    const carbGrams = Math.round(carbCalories / 4);

    return {
      calories: Math.round(targetCalories),
      protein: proteinGrams,
      carbohydrates: carbGrams,
      fats: fatGrams,
    };
  }

  // Phase 3: Generate Nutrition Plan (rule-based - can integrate AI later)
  generateNutritionPlan(params: {
    memberId: string;
    goal: NutritionPlan['goal'];
    gender: 'male' | 'female';
    age: number;
    height: number;
    weight: number;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    duration: number;
    dietaryRestrictions?: string[];
    preferences?: string[];
  }): NutritionPlan {
    // Calculate macro targets
    const macroTargets = this.calculateMacros({
      gender: params.gender,
      age: params.age,
      height: params.height,
      weight: params.weight,
      activityLevel: params.activityLevel,
      goal: params.goal,
    });

    // Create nutrition plan
    const plan = this.addNutritionPlan({
      memberId: params.memberId,
      name: `${params.goal.charAt(0).toUpperCase() + params.goal.slice(1).replace('_', ' ')} Nutrition Plan`,
      description: `Personalized ${params.goal.replace('_', ' ')} nutrition plan with ${macroTargets.calories} calories/day. ${params.dietaryRestrictions?.length ? `Restrictions: ${params.dietaryRestrictions.join(', ')}.` : ''}`,
      goal: params.goal,
      macroTargets,
      duration: params.duration,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      createdBy: 'ai',
      dietaryRestrictions: params.dietaryRestrictions,
      preferences: params.preferences,
    });

    // Generate daily meal plans for the duration
    const startDate = new Date(plan.startDate);
    for (let i = 0; i < params.duration; i++) {
      const mealPlanDate = new Date(startDate);
      mealPlanDate.setDate(startDate.getDate() + i);

      // Create meals based on goal and available recipes
      const availableRecipes = this.recipes.filter(r => {
        // Filter by dietary restrictions
        if (params.dietaryRestrictions) {
          if (params.dietaryRestrictions.includes('vegetarian') && !r.tags.includes('vegetarian') && !r.tags.includes('vegan')) return false;
          if (params.dietaryRestrictions.includes('vegan') && !r.tags.includes('vegan')) return false;
        }
        return true;
      });

      // Select recipes for the day (simplified - in production, use AI to balance macros)
      const breakfast = availableRecipes.find(r => r.tags.includes('breakfast')) || availableRecipes[1];
      const lunch = availableRecipes.find(r => !r.tags.includes('breakfast') && !r.tags.includes('smoothie')) || availableRecipes[2];
      const dinner = availableRecipes.find(r => !r.tags.includes('breakfast') && !r.tags.includes('smoothie')) || availableRecipes[0];
      const snack = availableRecipes.find(r => r.tags.includes('smoothie') || r.tags.includes('quick')) || availableRecipes[3];

      const meals: Meal[] = [];
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;

      if (breakfast) {
        meals.push({
          id: `meal-${i}-breakfast`,
          name: breakfast.name,
          mealType: 'breakfast' as const,
          recipeId: breakfast.id,
          calories: breakfast.calories,
          protein: breakfast.protein,
          carbohydrates: breakfast.carbohydrates,
          fats: breakfast.fats,
          time: '08:00',
        });
        totalCalories += breakfast.calories;
        totalProtein += breakfast.protein;
        totalCarbs += breakfast.carbohydrates;
        totalFats += breakfast.fats;
      }

      if (lunch) {
        meals.push({
          id: `meal-${i}-lunch`,
          name: lunch.name,
          mealType: 'lunch' as const,
          recipeId: lunch.id,
          calories: lunch.calories,
          protein: lunch.protein,
          carbohydrates: lunch.carbohydrates,
          fats: lunch.fats,
          time: '13:00',
        });
        totalCalories += lunch.calories;
        totalProtein += lunch.protein;
        totalCarbs += lunch.carbohydrates;
        totalFats += lunch.fats;
      }

      if (dinner) {
        meals.push({
          id: `meal-${i}-dinner`,
          name: dinner.name,
          mealType: 'dinner' as const,
          recipeId: dinner.id,
          calories: dinner.calories,
          protein: dinner.protein,
          carbohydrates: dinner.carbohydrates,
          fats: dinner.fats,
          time: '19:00',
        });
        totalCalories += dinner.calories;
        totalProtein += dinner.protein;
        totalCarbs += dinner.carbohydrates;
        totalFats += dinner.fats;
      }

      if (snack && totalCalories < macroTargets.calories * 0.9) {
        meals.push({
          id: `meal-${i}-snack`,
          name: snack.name,
          mealType: 'snack' as const,
          recipeId: snack.id,
          calories: snack.calories,
          protein: snack.protein,
          carbohydrates: snack.carbohydrates,
          fats: snack.fats,
          time: '16:00',
        });
        totalCalories += snack.calories;
        totalProtein += snack.protein;
        totalCarbs += snack.carbohydrates;
        totalFats += snack.fats;
      }

      this.addDailyMealPlan({
        nutritionPlanId: plan.id,
        memberId: params.memberId,
        date: mealPlanDate.toISOString().split('T')[0],
        meals: meals,
        totalCalories,
        totalProtein,
        totalCarbohydrates: totalCarbs,
        totalFats,
        status: 'planned',
      });
    }
    
    return plan;
  }

  // Phase 4: Habit methods
  getAllHabits(): Habit[] {
    return this.habits;
  }

  getMemberHabits(memberId: string): Habit[] {
    return this.habits.filter(h => h.memberId === memberId && h.status === 'active');
  }

  getHabit(id: string): Habit | undefined {
    return this.habits.find(h => h.id === id);
  }

  addHabit(habit: Omit<Habit, 'id' | 'createdAt'>): Habit {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.habits.push(newHabit);
    return newHabit;
  }

  updateHabit(id: string, updates: Partial<Habit>): Habit | null {
    const index = this.habits.findIndex(h => h.id === id);
    if (index === -1) return null;
    this.habits[index] = { ...this.habits[index], ...updates };
    return this.habits[index];
  }

  deleteHabit(id: string): boolean {
    const index = this.habits.findIndex(h => h.id === id);
    if (index === -1) return false;
    this.habits.splice(index, 1);
    // Also delete associated entries
    this.habitEntries = this.habitEntries.filter(e => e.habitId !== id);
    return true;
  }

  // Phase 4: Habit Entry methods
  getHabitEntries(habitId: string): HabitEntry[] {
    return this.habitEntries.filter(e => e.habitId === habitId);
  }

  getMemberHabitEntries(memberId: string): HabitEntry[] {
    return this.habitEntries.filter(e => e.memberId === memberId);
  }

  getHabitEntryByDate(habitId: string, date: string): HabitEntry | undefined {
    return this.habitEntries.find(e => e.habitId === habitId && e.date === date);
  }

  addHabitEntry(entry: Omit<HabitEntry, 'id'>): HabitEntry {
    const newEntry: HabitEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    this.habitEntries.push(newEntry);
    return newEntry;
  }

  updateHabitEntry(id: string, updates: Partial<HabitEntry>): HabitEntry | null {
    const index = this.habitEntries.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.habitEntries[index] = { ...this.habitEntries[index], ...updates };
    return this.habitEntries[index];
  }

  // Phase 4: Whoop Connection methods
  getWhoopConnection(memberId: string): WhoopConnection | undefined {
    return this.whoopConnections.find(c => c.memberId === memberId);
  }

  addWhoopConnection(connection: Omit<WhoopConnection, 'id'>): WhoopConnection {
    const newConnection: WhoopConnection = {
      ...connection,
      id: Date.now().toString(),
    };
    // Remove existing connection for this member
    this.whoopConnections = this.whoopConnections.filter(c => c.memberId !== connection.memberId);
    this.whoopConnections.push(newConnection);
    return newConnection;
  }

  updateWhoopConnection(memberId: string, updates: Partial<WhoopConnection>): WhoopConnection | null {
    const connection = this.whoopConnections.find(c => c.memberId === memberId);
    if (!connection) return null;
    const index = this.whoopConnections.indexOf(connection);
    this.whoopConnections[index] = { ...connection, ...updates };
    return this.whoopConnections[index];
  }

  deleteWhoopConnection(memberId: string): boolean {
    const index = this.whoopConnections.findIndex(c => c.memberId === memberId);
    if (index === -1) return false;
    this.whoopConnections.splice(index, 1);
    // Also delete associated data
    this.whoopData = this.whoopData.filter(d => d.memberId !== memberId);
    return true;
  }

  // Phase 4: Whoop Data methods
  getWhoopData(memberId: string, startDate?: string, endDate?: string): WhoopData[] {
    let data = this.whoopData.filter(d => d.memberId === memberId);
    if (startDate) {
      data = data.filter(d => d.date >= startDate);
    }
    if (endDate) {
      data = data.filter(d => d.date <= endDate);
    }
    return data.sort((a, b) => b.date.localeCompare(a.date));
  }

  addWhoopData(data: Omit<WhoopData, 'id'>): WhoopData {
    const newData: WhoopData = {
      ...data,
      id: Date.now().toString(),
    };
    // Remove existing data for same date
    this.whoopData = this.whoopData.filter(d => !(d.memberId === data.memberId && d.date === data.date));
    this.whoopData.push(newData);
    return newData;
  }

  // Health Score Calculation Methods
  calculateHealthScore(memberId: string): {
    total: number;
    workoutScore: number;
    dietScore: number;
    habitScore: number;
    sleepScore: number;
    workoutCount: number;
    workoutIntensity: number;
    dietQuality: number;
    habitCompletion: number;
    sleepQuality: number;
  } {
    // Get member workouts from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const memberWorkouts = this.workouts.filter(w => 
      w.memberId === memberId && 
      new Date(w.date) >= thirtyDaysAgo &&
      w.status === 'completed'
    );

    // Calculate workout score (0-30 points, 30% of total)
    const workoutCount = memberWorkouts.length;
    const targetWorkouts = 12; // 3 per week * 4 weeks
    const workoutFrequencyScore = Math.min(15, (workoutCount / targetWorkouts) * 15);
    
    // Calculate workout intensity (average duration and exercise count)
    let totalIntensity = 0;
    let avgIntensity = 0;
    if (memberWorkouts.length > 0) {
      const intensities = memberWorkouts.map(w => {
        const exerciseCount = w.exercises.length;
        const duration = w.duration || 30; // default 30 min
        return (exerciseCount * 10) + (duration / 60 * 20); // max 100 per workout
      });
      totalIntensity = intensities.reduce((sum, i) => sum + i, 0);
      avgIntensity = totalIntensity / memberWorkouts.length;
    }
    const workoutIntensityScore = Math.min(15, (avgIntensity / 100) * 15);
    const workoutScore = workoutFrequencyScore + workoutIntensityScore;
    const workoutIntensity = avgIntensity;

    // Calculate diet score (0-30 points, 30% of total)
    const nutritionPlans = this.getMemberNutritionPlans(memberId);
    const activePlan = nutritionPlans.find(p => p.status === 'active');
    let dietScore = 0;
    let dietQuality = 0;
    
    if (activePlan) {
      const dailyPlans = this.getDailyMealPlans(activePlan.id);
      const recentPlans = dailyPlans.filter(dp => 
        new Date(dp.date) >= thirtyDaysAgo
      );
      
      if (recentPlans.length > 0) {
        // Calculate adherence to macro targets
        const adherenceScores = recentPlans.map(dp => {
          const proteinDiff = Math.abs(dp.totalProtein - activePlan.macroTargets.protein) / activePlan.macroTargets.protein;
          const carbDiff = Math.abs(dp.totalCarbohydrates - activePlan.macroTargets.carbohydrates) / activePlan.macroTargets.carbohydrates;
          const fatDiff = Math.abs(dp.totalFats - activePlan.macroTargets.fats) / activePlan.macroTargets.fats;
          const avgDiff = (proteinDiff + carbDiff + fatDiff) / 3;
          return Math.max(0, 100 - (avgDiff * 100));
        });
        dietQuality = adherenceScores.reduce((sum, s) => sum + s, 0) / adherenceScores.length;
        dietScore = (dietQuality / 100) * 30;
      }
    } else {
      // No active plan, give baseline score
      dietScore = 6;
      dietQuality = 20;
    }

    // Calculate habit score (0-15 points, 15% of total)
    const memberHabits = this.getMemberHabits(memberId);
    let habitScore = 0;
    let habitCompletion = 0;
    
    if (memberHabits.length > 0) {
      const habitEntries = this.getMemberHabitEntries(memberId);
      const recentEntries = habitEntries.filter(e => 
        new Date(e.date) >= thirtyDaysAgo
      );
      
      // Calculate completion rate
      const totalPossibleEntries = memberHabits.length * 30; // 30 days
      const completedEntries = recentEntries.filter(e => e.completed).length;
      habitCompletion = totalPossibleEntries > 0 
        ? (completedEntries / totalPossibleEntries) * 100 
        : 0;
      habitScore = (habitCompletion / 100) * 15;
    } else {
      habitScore = 3;
      habitCompletion = 20;
    }

    // Calculate sleep score (0-25 points, 25% of total) from Whoop data
    const whoopConnection = this.getWhoopConnection(memberId);
    let sleepScore = 0;
    let sleepQuality = 0;
    
    if (whoopConnection && whoopConnection.connected) {
      const whoopData = this.getWhoopData(memberId, thirtyDaysAgo.toISOString().split('T')[0]);
      const recentSleepData = whoopData.filter(d => d.sleep);
      
      if (recentSleepData.length > 0) {
        const sleepScores = recentSleepData.map(d => {
          if (d.sleep?.sleepScore) {
            return d.sleep.sleepScore;
          }
          // Calculate from sleep efficiency and duration
          const efficiency = d.sleep?.sleepEfficiency ?? 85;
          const totalSleep = d.sleep?.totalSleep ?? 0;
          const targetSleep = 8 * 60; // 8 hours in minutes
          const durationScore = Math.min(100, (totalSleep / targetSleep) * 100);
          return (efficiency * 0.6) + (durationScore * 0.4);
        });
        sleepQuality = sleepScores.reduce((sum, s) => sum + s, 0) / sleepScores.length;
        sleepScore = (sleepQuality / 100) * 25;
      } else {
        sleepScore = 5;
        sleepQuality = 20;
      }
    } else {
      // No Whoop connection, give baseline score
      sleepScore = 5;
      sleepQuality = 20;
    }

    // Total score (0-100)
    const total = Math.round(workoutScore + dietScore + habitScore + sleepScore);

    return {
      total,
      workoutScore,
      dietScore,
      habitScore,
      sleepScore,
      workoutCount,
      workoutIntensity,
      dietQuality,
      habitCompletion,
      sleepQuality,
    };
  }

  getFriendsHealthScores(memberId: string): Array<{ id: string; name: string; score: number }> {
    // Get all active members (as "friends" for comparison)
    const allMembers = this.getAllMembers().filter(m => m.status === 'active');
    
    const friendsScores = allMembers.map(member => {
      const healthScore = this.calculateHealthScore(member.id);
      return {
        id: member.id,
        name: `${member.firstName} ${member.lastName}`,
        score: healthScore.total,
      };
    });

    // Sort by score descending
    return friendsScores.sort((a, b) => b.score - a.score);
  }
}

// Export password utilities
export { hashPassword, verifyPassword };

// Export singleton instance
export const store = new DataStore();
