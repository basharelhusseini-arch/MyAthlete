import { Member, Membership, Trainer, GymClass, Payment, EmailNotification, Exercise, WorkoutPlan, Workout, WorkoutProgress, WorkoutTemplate } from '@/types';

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
      // Strength exercises
      {
        id: 'ex1',
        name: 'Push-ups',
        description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps',
        category: 'strength',
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'bodyweight',
        difficulty: 'beginner',
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
        category: 'strength',
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
        equipment: 'bodyweight',
        difficulty: 'beginner',
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower down as if sitting in a chair',
          'Keep knees behind toes and chest up',
          'Return to starting position by driving through heels'
        ],
      },
      {
        id: 'ex3',
        name: 'Dumbbell Bench Press',
        description: 'Upper body strength exercise using dumbbells',
        category: 'strength',
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'dumbbells',
        difficulty: 'intermediate',
        instructions: [
          'Lie on bench with dumbbells at chest level',
          'Press weights up until arms are fully extended',
          'Lower weights slowly back to starting position',
          'Keep core engaged and feet flat on floor'
        ],
      },
      {
        id: 'ex4',
        name: 'Deadlifts',
        description: 'Compound exercise targeting posterior chain',
        category: 'strength',
        muscleGroups: ['hamstrings', 'glutes', 'back'],
        equipment: 'barbell',
        difficulty: 'advanced',
        instructions: [
          'Stand with feet hip-width apart, bar over mid-foot',
          'Hinge at hips and bend knees to grip bar',
          'Keep back straight and chest up',
          'Drive through heels to stand up, extending hips'
        ],
      },
      {
        id: 'ex5',
        name: 'Pull-ups',
        description: 'Upper body pulling exercise',
        category: 'strength',
        muscleGroups: ['back', 'biceps'],
        equipment: 'bodyweight',
        difficulty: 'intermediate',
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
        category: 'strength',
        muscleGroups: ['core', 'shoulders'],
        equipment: 'bodyweight',
        difficulty: 'beginner',
        instructions: [
          'Start in push-up position on forearms',
          'Keep body in straight line from head to heels',
          'Engage core and hold position',
          'Breathe normally throughout'
        ],
      },
      // Cardio exercises
      {
        id: 'ex7',
        name: 'Burpees',
        description: 'Full-body cardio exercise',
        category: 'cardio',
        muscleGroups: ['full body'],
        equipment: 'bodyweight',
        difficulty: 'intermediate',
        instructions: [
          'Start in standing position',
          'Squat down and place hands on floor',
          'Jump feet back into plank position',
          'Jump feet forward and explosively jump up'
        ],
      },
      {
        id: 'ex8',
        name: 'Jumping Jacks',
        description: 'Simple cardio warm-up exercise',
        category: 'cardio',
        muscleGroups: ['full body'],
        equipment: 'bodyweight',
        difficulty: 'beginner',
        instructions: [
          'Start with feet together and arms at sides',
          'Jump while spreading legs and raising arms overhead',
          'Jump back to starting position',
          'Repeat in rhythmic motion'
        ],
      },
      {
        id: 'ex9',
        name: 'Mountain Climbers',
        description: 'Cardio and core exercise',
        category: 'cardio',
        muscleGroups: ['core', 'shoulders', 'legs'],
        equipment: 'bodyweight',
        difficulty: 'beginner',
        instructions: [
          'Start in plank position',
          'Alternately bring knees to chest',
          'Keep hips level and core engaged',
          'Maintain steady pace'
        ],
      },
      // Flexibility exercises
      {
        id: 'ex10',
        name: 'Downward Dog',
        description: 'Yoga pose for flexibility and strength',
        category: 'flexibility',
        muscleGroups: ['hamstrings', 'shoulders', 'core'],
        equipment: 'bodyweight',
        difficulty: 'beginner',
        instructions: [
          'Start on hands and knees',
          'Lift hips up and back',
          'Form inverted V shape with body',
          'Press hands into floor and lengthen spine'
        ],
      },
      {
        id: 'ex11',
        name: 'Lunges',
        description: 'Lower body strength and balance exercise',
        category: 'strength',
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
        equipment: 'bodyweight',
        difficulty: 'beginner',
        instructions: [
          'Step forward with one leg',
          'Lower hips until both knees are at 90 degrees',
          'Push through front heel to return',
          'Alternate legs'
        ],
      },
      {
        id: 'ex12',
        name: 'Overhead Press',
        description: 'Shoulder and upper body strength exercise',
        category: 'strength',
        muscleGroups: ['shoulders', 'triceps', 'core'],
        equipment: 'dumbbells',
        difficulty: 'intermediate',
        instructions: [
          'Stand with feet shoulder-width apart',
          'Hold weights at shoulder height',
          'Press weights overhead until arms fully extended',
          'Lower slowly back to shoulders'
        ],
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
}

// Export password utilities
export { hashPassword, verifyPassword };

// Export singleton instance
export const store = new DataStore();
