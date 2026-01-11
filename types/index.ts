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
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'plyometric' | 'endurance';
  muscleGroups: string[]; // e.g., ['chest', 'triceps', 'shoulders']
  equipment: 'bodyweight' | 'dumbbells' | 'barbell' | 'machine' | 'cable' | 'kettlebell' | 'resistance_bands' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
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
