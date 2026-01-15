/**
 * Trainer seed data for the Bookings section
 * 10 trainers with diverse specialties, credentials, and pricing
 */

export interface Trainer {
  id: string;
  fullName: string;
  specialty: string;
  credentials: string[];
  rating: number;
  reviewCount: number;
  priceConsultation: number; // in £
  priceSession: number; // in £
  availability: string;
  avatar: string; // gradient or placeholder
  bio: string;
}

export const trainersData: Trainer[] = [
  {
    id: 'trainer-1',
    fullName: 'Marcus Chen',
    specialty: 'Strength & Powerlifting',
    credentials: [
      'NSCA-CSCS Certified',
      'BSc Sports Science',
      '8+ years coaching experience',
      'Former competitive powerlifter',
      'Specialist in Olympic lifts',
      'Injury prevention certified'
    ],
    rating: 4.9,
    reviewCount: 127,
    priceConsultation: 35,
    priceSession: 65,
    availability: 'Next available: Tomorrow 7am',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=FFC300&color=000&size=200',
    bio: 'Specializing in strength development and powerlifting technique for all experience levels.'
  },
  {
    id: 'trainer-2',
    fullName: 'Aisha Patel',
    specialty: 'Bodybuilding & Hypertrophy',
    credentials: [
      'NASM-CPT Certified',
      'Precision Nutrition Level 1',
      '6+ years experience',
      'Competitive bodybuilder (IFBB)',
      'Meal planning specialist',
      'Contest prep coach'
    ],
    rating: 4.8,
    reviewCount: 93,
    priceConsultation: 40,
    priceSession: 75,
    availability: 'Next available: Today 6pm',
    avatar: 'https://ui-avatars.com/api/?name=Aisha+Patel&background=FF9500&color=fff&size=200',
    bio: 'Expert in muscle building, body composition, and competition preparation.'
  },
  {
    id: 'trainer-3',
    fullName: 'Tom Richardson',
    specialty: 'Rehabilitation & Injury Recovery',
    credentials: [
      'CIMSPA Level 4',
      'MSc Sports Therapy',
      '10+ years NHS experience',
      'Lower back pain specialist',
      'Pre/post-surgery rehab',
      'Chronic pain management'
    ],
    rating: 5.0,
    reviewCount: 156,
    priceConsultation: 50,
    priceSession: 95,
    availability: 'Next available: Friday 10am',
    avatar: 'https://ui-avatars.com/api/?name=Tom+Richardson&background=10B981&color=fff&size=200',
    bio: 'Helping clients recover from injuries and return to full fitness safely.'
  },
  {
    id: 'trainer-4',
    fullName: 'Sofia Martinez',
    specialty: 'HIIT & Functional Training',
    credentials: [
      'ACE Certified Trainer',
      'CrossFit Level 2',
      '5+ years coaching',
      'Group fitness specialist',
      'Metabolic conditioning expert',
      'Mobility & flexibility coach'
    ],
    rating: 4.7,
    reviewCount: 82,
    priceConsultation: 30,
    priceSession: 55,
    availability: 'Next available: Tomorrow 5pm',
    avatar: 'https://ui-avatars.com/api/?name=Sofia+Martinez&background=FFC300&color=000&size=200',
    bio: 'High-energy trainer focused on functional fitness and fat loss.'
  },
  {
    id: 'trainer-5',
    fullName: 'James Morrison',
    specialty: 'Nutrition & Weight Loss',
    credentials: [
      'Registered Dietitian (RD)',
      'MSc Clinical Nutrition',
      '7+ years experience',
      'Weight management specialist',
      'Sports nutrition expert',
      'Metabolic health focus'
    ],
    rating: 4.9,
    reviewCount: 164,
    priceConsultation: 45,
    priceSession: 85,
    availability: 'Next available: Wednesday 2pm',
    avatar: 'https://ui-avatars.com/api/?name=James+Morrison&background=FF9500&color=fff&size=200',
    bio: 'Evidence-based nutritional guidance for sustainable weight loss and health.'
  },
  {
    id: 'trainer-6',
    fullName: 'Emily Wong',
    specialty: 'Yoga & Mindfulness',
    credentials: [
      'RYT-500 Yoga Alliance',
      'Meditation teacher',
      '8+ years teaching experience',
      'Trauma-informed yoga certified',
      'Breathwork specialist',
      'Corporate wellness consultant'
    ],
    rating: 4.8,
    reviewCount: 201,
    priceConsultation: 25,
    priceSession: 45,
    availability: 'Next available: Tomorrow 9am',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Wong&background=10B981&color=fff&size=200',
    bio: 'Bringing balance, flexibility, and mindfulness through yoga practice.'
  },
  {
    id: 'trainer-7',
    fullName: 'David Thompson',
    specialty: 'Athletic Performance',
    credentials: [
      'UKSCA Accredited',
      'BSc Exercise Physiology',
      '12+ years experience',
      'Former professional athlete',
      'Speed & agility specialist',
      'Sports-specific conditioning'
    ],
    rating: 4.9,
    reviewCount: 138,
    priceConsultation: 55,
    priceSession: 110,
    availability: 'Next available: Monday 6am',
    avatar: 'https://ui-avatars.com/api/?name=David+Thompson&background=FFC300&color=000&size=200',
    bio: 'Elite athletic training for serious competitors and weekend warriors.'
  },
  {
    id: 'trainer-8',
    fullName: 'Priya Sharma',
    specialty: 'Pre/Postnatal Fitness',
    credentials: [
      'Pre/Postnatal Certified',
      'NASM-CPT',
      '6+ years specializing',
      'Pelvic floor specialist',
      'Diastasis recti expert',
      'Mother of three'
    ],
    rating: 5.0,
    reviewCount: 94,
    priceConsultation: 40,
    priceSession: 70,
    availability: 'Next available: Today 11am',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=FF9500&color=fff&size=200',
    bio: 'Safe, effective fitness for expecting and new mothers.'
  },
  {
    id: 'trainer-9',
    fullName: 'Alex Foster',
    specialty: 'Calisthenics & Bodyweight',
    credentials: [
      'Calisthenics coach',
      'Gymnastics background',
      '5+ years coaching',
      'Handstand specialist',
      'Pull-up progression expert',
      'Mobility & flow training'
    ],
    rating: 4.7,
    reviewCount: 76,
    priceConsultation: 30,
    priceSession: 50,
    availability: 'Next available: Tomorrow 3pm',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Foster&background=10B981&color=fff&size=200',
    bio: 'Master your bodyweight with calisthenics and gymnastics strength.'
  },
  {
    id: 'trainer-10',
    fullName: 'Rachel Bennett',
    specialty: 'Senior Fitness & Longevity',
    credentials: [
      'Senior Fitness Specialist',
      'ACSM Certified',
      '9+ years with 50+ clients',
      'Fall prevention expert',
      'Bone density specialist',
      'Chronic disease management'
    ],
    rating: 5.0,
    reviewCount: 142,
    priceConsultation: 35,
    priceSession: 60,
    availability: 'Next available: Thursday 10am',
    avatar: 'https://ui-avatars.com/api/?name=Rachel+Bennett&background=FFC300&color=000&size=200',
    bio: 'Helping seniors maintain independence and quality of life through movement.'
  },
];

export function getTrainerById(id: string): Trainer | undefined {
  return trainersData.find(trainer => trainer.id === id);
}

export function getTrainersBySpecialty(specialty: string): Trainer[] {
  return trainersData.filter(trainer => 
    trainer.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
}

export function getTopRatedTrainers(limit: number = 5): Trainer[] {
  return [...trainersData]
    .sort((a, b) => {
      // Sort by rating first, then by review count
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, limit);
}
