export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string; // Hashed password in production
  dateOfBirth: string;
  joinDate: string;
  membershipId: string | null;
  status: 'active' | 'inactive' | 'suspended';
  notes?: string;
  completedSessions: number; // Track completed sessions
}

export interface Membership {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  features: string[];
  status: 'active' | 'inactive';
}

export interface Trainer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface GymClass {
  id: string;
  name: string;
  description: string;
  trainerId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolledMembers: string[]; // member IDs
  waitlist: string[]; // member IDs on waitlist
  checkedInMembers: string[]; // member IDs who checked in
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  totalClasses: number;
  upcomingClasses: number;
  monthlyRevenue: number;
  trainersCount: number;
}

export interface Payment {
  id: string;
  memberId: string;
  membershipId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
}

export interface EmailNotification {
  id: string;
  memberId: string;
  type: 'class_reminder' | 'class_cancelled' | 'payment_receipt' | 'membership_expiring' | 'welcome';
  subject: string;
  body: string;
  sent: boolean;
  sentAt?: string;
  createdAt: string;
}

// Phase 2: AI Workout Engine Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'plyometric' | 'endurance' | 'hybrid';
  muscleGroups: string[]; // e.g., ['chest', 'triceps', 'shoulders']
  equipment: 'bodyweight' | 'dumbbells' | 'barbell' | 'machine' | 'cable' | 'kettlebell' | 'resistance_bands' | 'cardio_machine' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[]; // Step-by-step instructions (numbered, beginner-friendly)
  tips: string[]; // 2-4 coaching cues (form tips, common mistakes to avoid)
  breathing: string; // How to breathe during the movement
  tempo: string; // e.g. "2-1-2" (eccentric-pause-concentric)
  rest: string; // Recommended rest time between sets
  videoUrl?: string; // Optional YouTube embed-safe URL
  imageUrl?: string; // Optional static image
  // Suggested sets/reps for different levels
  recommendedSets: {
    beginner: { sets: number; reps?: string; duration?: string }; // reps as string to support ranges like "8-12"
    intermediate: { sets: number; reps?: string; duration?: string };
    advanced: { sets: number; reps?: string; duration?: string };
  };
  // Cardio-specific fields
  mets?: number; // Metabolic Equivalent of Task (e.g., running at 6mph = 9.8 METs)
  caloriesPerMinute?: number; // Average calories burned per minute (at average intensity)
  supportsDistance?: boolean; // Can track distance (running, cycling, rowing)
  supportsTime?: boolean; // Can track time (all cardio)
  intensityLevels?: {
    low: { mets: number; caloriesPerMinute: number; description: string };
    moderate: { mets: number; caloriesPerMinute: number; description: string };
    high: { mets: number; caloriesPerMinute: number; description: string };
  };
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps?: number; // if null, it's time-based (e.g., planks)
  duration?: number; // in seconds, for time-based exercises
  weight?: number; // in lbs/kg
  restSeconds: number;
  notes?: string;
  order: number;
  // Cardio-specific fields
  distance?: number; // in miles or km for cardio exercises
  distanceUnit?: 'miles' | 'km';
  caloriesBurned?: number; // calculated or tracked calories
  intensity?: 'low' | 'moderate' | 'high'; // cardio intensity level
  // Athlete programming fields
  isMainLift?: boolean; // Flag for primary compound movements
  percent1RM?: number; // % of 1 rep max (40-100)
  rpe?: number; // Rate of Perceived Exertion (1-10)
  rpeRange?: [number, number]; // RPE range like [7, 8]
  tempo?: string; // e.g., "3-1-1-0" (eccentric-bottom-concentric-top)
  coachingCues?: string[]; // Specific cues for this set
  movementPattern?: 'squat' | 'hinge' | 'push' | 'pull' | 'carry' | 'core' | 'isolation';
  // Session role for coherent programming
  sessionRole?: 'warmup' | 'main' | 'secondary' | 'accessory' | 'core' | 'conditioning' | 'finisher';
}

export interface WarmupSection {
  general: string[]; // General warm-up activities
  mobility: string[]; // Mobility/activation drills
  rampSets?: WarmupSet[]; // Progressive warm-up sets for main lift
}

export interface WarmupSet {
  percent1RM: number; // Percentage of 1RM
  reps: number;
  notes?: string; // e.g., "Bar only", "Focus on speed"
}

export interface WorkoutPlan {
  id: string;
  memberId: string;
  name: string;
  description: string;
  goal: 'strength' | 'endurance' | 'weight_loss' | 'muscle_gain' | 'general_fitness' | 'flexibility' | 'athletic_performance';
  duration: number; // in weeks
  frequency: number; // workouts per week
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  createdAt: string;
  startDate: string;
  endDate?: string;
  createdBy?: 'ai' | 'trainer' | 'member';
}

export interface Workout {
  id: string;
  workoutPlanId: string;
  memberId: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
  duration?: number; // actual duration in minutes
  status: 'scheduled' | 'in_progress' | 'completed' | 'skipped';
  notes?: string;
  rating?: number; // 1-5 stars
  completedAt?: string;
  warmup?: WarmupSection; // Warm-up protocol
  weekNumber?: number; // Week in the program (for progression tracking)
  sessionType?: 'strength' | 'hypertrophy' | 'conditioning' | 'power' | 'deload' | 'speed' | 'recovery'; // Session focus
  // Split-based programming fields
  dayTheme?: string; // e.g., "Push (Chest/Shoulders/Triceps)", "Speed & Plyo", "Recovery & Mobility"
  purpose?: string; // 1-2 sentence description of the day's training focus
}

export interface WorkoutProgress {
  id: string;
  workoutId: string;
  memberId: string;
  exerciseId: string;
  setsCompleted: number;
  repsCompleted?: number[];
  weightUsed?: number[];
  durationCompleted?: number;
  restTimeActual?: number;
  notes?: string;
  completedAt: string;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  goal: 'strength' | 'endurance' | 'weight_loss' | 'muscle_gain' | 'general_fitness' | 'flexibility' | 'athletic_performance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: WorkoutExercise[];
  estimatedDuration: number; // in minutes
  tags: string[];
  createdBy?: 'system' | 'trainer';
}

// Phase 3: AI Nutrition Planner Types
export interface MacroTargets {
  calories: number;
  protein: number; // in grams
  carbohydrates: number; // in grams
  fats: number; // in grams
}

export interface Ingredient {
  item: string; // Canonical field from recipes.ts
  quantity: number; // Canonical field from recipes.ts
  unit: string; // e.g., 'g', 'ml', 'cup', 'tbsp'
  // Backwards compatibility fields
  name?: string; // Mapped from item
  amount?: number; // Mapped from quantity
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageId: string; // Unsplash photo ID for stable images
  calories: number; // Per serving (computed from ingredients)
  protein_g: number; // Per serving - Canonical field from recipes.ts
  carbs_g: number; // Per serving - Canonical field from recipes.ts
  fat_g: number; // Per serving - Canonical field from recipes.ts
  prepMinutes: number; // Canonical field from recipes.ts
  cookMinutes: number; // Canonical field from recipes.ts
  servings: number; // Number of servings this recipe yields
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[]; // e.g., ['high-protein', 'low-carb', 'vegetarian', 'meal-prep']
  fiber?: number; // Optional fiber content in grams per serving
  // Optional: Nutrition metadata
  totalCalories?: number; // Total for entire batch (calories * servings)
  totalProtein?: number; // Total for entire batch
  totalCarbs?: number; // Total for entire batch
  totalFats?: number; // Total for entire batch
  missingNutritionData?: boolean; // Flag if some ingredients lack nutrition data
  // Backwards compatibility fields (mapped from canonical fields)
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  protein?: number; // Mapped from protein_g
  carbohydrates?: number; // Mapped from carbs_g
  fats?: number; // Mapped from fat_g
}

export interface Meal {
  id: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId?: string;
  recipe?: Recipe;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  time?: string; // e.g., '08:00' for breakfast time
  notes?: string;
}

export interface DailyMealPlanSummary {
  day: number; // 1-7
  label: string; // e.g., "Day 1"
  meals: {
    recipe_id: string;
    recipe_name: string;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    servings: number;
    meal_slot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  }[];
  totals: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
  };
}

export interface NutritionPlan {
  id: string;
  memberId: string;
  name: string;
  description: string;
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'performance' | 'general_health';
  macroTargets: MacroTargets;
  duration: number; // in days
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  createdAt: string;
  startDate: string;
  endDate?: string;
  createdBy?: 'ai' | 'trainer' | 'member';
  dietaryRestrictions?: string[]; // e.g., 'vegetarian', 'vegan', 'gluten-free', 'dairy-free'
  preferences?: string[]; // e.g., 'low-carb', 'high-protein', 'mediterranean'
  meals?: Meal[]; // Optional: array of meals for the plan (flattened from daily meal plans)
  mealPlans?: DailyMealPlanSummary[]; // 7-day structured meal plans
}

export interface DailyMealPlan {
  id: string;
  nutritionPlanId: string;
  memberId: string;
  date: string;
  meals: Meal[];
  totalCalories: number; // Computed total (sum of meals) - source of truth for UI
  totalProtein: number; // Computed total (sum of meals)
  totalCarbohydrates: number; // Computed total (sum of meals)
  totalFats: number; // Computed total (sum of meals)
  targetCalories?: number; // Optional: goal calories for this day
  targetProtein?: number; // Optional: goal protein for this day
  targetCarbohydrates?: number; // Optional: goal carbs for this day
  targetFats?: number; // Optional: goal fats for this day
  status: 'planned' | 'completed';
  notes?: string;
}

export interface ShoppingList {
  id: string;
  nutritionPlanId?: string;
  memberId: string;
  items: ShoppingListItem[];
  createdAt: string;
  completed?: boolean;
}

export interface ShoppingListItem {
  ingredient: string;
  amount: number;
  unit: string;
  category?: string; // e.g., 'produce', 'dairy', 'meat', 'pantry'
  checked: boolean;
}

// Phase 4: Habit Tracking & Whoop Integration
export interface Habit {
  id: string;
  memberId: string;
  name: string;
  description?: string;
  category: 'health' | 'fitness' | 'nutrition' | 'recovery' | 'sleep' | 'productivity' | 'other';
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount?: number; // For weekly habits, target per week
  color?: string; // Hex color for UI
  icon?: string; // Icon name
  createdAt: string;
  status: 'active' | 'archived' | 'paused';
}

export interface HabitEntry {
  id: string;
  habitId: string;
  memberId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  value?: number; // For quantitative habits (e.g., 8 hours of sleep, 2L water)
  unit?: string; // Unit for value (e.g., 'hours', 'liters', 'steps')
  notes?: string;
  completedAt?: string;
}

export interface HabitStreak {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
}

// Whoop Integration Types
export interface WhoopConnection {
  id: string;
  memberId: string;
  whoopUserId?: string;
  accessToken?: string; // Encrypted in production
  refreshToken?: string; // Encrypted in production
  connected: boolean;
  connectedAt?: string;
  lastSyncedAt?: string;
  expiresAt?: string;
}

export interface WhoopData {
  id: string;
  memberId: string;
  date: string; // YYYY-MM-DD
  recovery?: number; // 0-100
  strain?: number; // 0-21
  sleep?: {
    totalSleep: number; // minutes
    remSleep: number; // minutes
    deepSleep: number; // minutes
    lightSleep: number; // minutes
    sleepScore?: number; // 0-100
    sleepEfficiency?: number; // percentage
  };
  heartRate?: {
    resting?: number;
    max?: number;
    avg?: number;
  };
  workouts?: Array<{
    name: string;
    startTime: string;
    endTime: string;
    strain: number;
    calories: number;
    avgHeartRate: number;
    maxHeartRate: number;
  }>;
  syncedAt: string;
}

// ============================================================
// TRUST & VERIFICATION SYSTEM
// Philosophy: Additive confidence, never punitive
// ============================================================

export type HealthGoal = 'fat_loss' | 'maintenance' | 'muscle_gain' | 'performance' | 'general';
export type WearableType = 'whoop' | 'garmin' | 'apple_watch' | 'fitbit' | 'oura' | 'other' | null;
export type WearableInterest = 'yes' | 'no' | 'maybe';

export interface UserHealthProfile {
  user_id: string;
  goal: HealthGoal;
  has_wearable: boolean;
  wearable_type: WearableType;
  wants_wearable_provided: WearableInterest | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}

export type VerificationMethod = 'wearable' | 'manual' | 'survey' | 'consistency_check';
export type VerificationStatus = 'none' | 'verified' | 'flagged' | 'skipped';
export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type EntityType = 'sleep' | 'workout' | 'meal' | 'habit' | 'health_score';

export interface VerificationEvent {
  id: string;
  user_id: string;
  entity_type: EntityType;
  entity_id: string | null;
  method: VerificationMethod;
  status: VerificationStatus;
  confidence: ConfidenceLevel;
  multiplier: number; // 1.0 to 1.25 (positive only)
  metadata?: Record<string, any>;
  created_at: string;
}

export interface WearableInterestLead {
  id: string;
  user_id: string;
  wearable_preference: string | null;
  country: string | null;
  consent: boolean;
  notes: string | null;
  status: 'new' | 'contacted' | 'fulfilled' | 'declined';
  created_at: string;
}

export interface ConfidenceScore {
  score: number; // 0-100
  breakdown: {
    baseline: number; // 30
    wearable: number; // 0 or 25
    consistency: number; // 0 or 10
    surveys: number; // 0 or 10
    longTerm: number; // 0-25 (5 per 30 days)
  };
  level: ConfidenceLevel;
}

export interface HealthScoreWithConfidence {
  health_score: number; // 0-100 (behavior only)
  confidence_score: number; // 0-100 (data trust)
  confidence_level: ConfidenceLevel;
  has_wearable: boolean;
  verification_count: number;
}
