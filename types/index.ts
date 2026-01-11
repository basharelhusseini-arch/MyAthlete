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
