import { Member, Membership, Trainer, GymClass, Payment, EmailNotification } from '@/types';

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

  // Initialize with sample data
  constructor() {
    this.initializeSampleData();
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
}

// Export password utilities
export { hashPassword, verifyPassword };

// Export singleton instance
export const store = new DataStore();
