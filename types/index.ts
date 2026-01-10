export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  membershipId: string | null;
  status: 'active' | 'inactive' | 'suspended';
  notes?: string;
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
