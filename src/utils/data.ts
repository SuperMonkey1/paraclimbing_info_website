import { EventProps } from '../components/EventCard';

// Event data for the website
export const events: EventProps[] = [
  {
    id: 'event1',
    title: 'Paraclimbing Introduction Day',
    date: 'April 15, 2025',
    location: 'Brussels Climbing Center',
    description: 'Join us for a day of introduction to paraclimbing. All abilities welcome!',
    imageUrl: '/assets/events/intro-day.jpg',
  },
  {
    id: 'event2',
    title: 'Belgian Paraclimbing Championships',
    date: 'May 20-21, 2025',
    location: 'Antwerp Climbing Arena',
    description: 'The annual Belgian Paraclimbing Championships featuring categories for all disabilities.',
    imageUrl: '/assets/events/championships.jpg',
  },
  {
    id: 'event3',
    title: 'Paraclimbing Training Workshop',
    date: 'June 10, 2025',
    location: 'Ghent Climbing Gym',
    description: 'A specialized workshop for paraclimbers looking to improve their techniques.',
    imageUrl: '/assets/events/workshop.jpg',
  },
  {
    id: 'event4',
    title: 'Adaptive Climbing Equipment Demo',
    date: 'July 5, 2025',
    location: 'Liège Climbing Center',
    description: 'Experience and learn about the latest adaptive climbing equipment and how it can assist various disabilities.',
    imageUrl: '/assets/events/equipment-demo.jpg',
  },
  {
    id: 'event5',
    title: 'Outdoor Paraclimbing Trip',
    date: 'August 15-16, 2025',
    location: 'Freyr, Dinant',
    description: 'A weekend outdoor climbing trip for experienced paraclimbers in the beautiful cliffs of Freyr.',
    imageUrl: '/assets/events/outdoor-trip.jpg',
  },
  {
    id: 'event6',
    title: 'Paraclimbing Coaching Certification',
    date: 'September 25-26, 2025',
    location: 'Brussels Climbing Center',
    description: 'Training program for climbing coaches who want to specialize in working with paraclimbers.',
    imageUrl: '/assets/events/coaching-cert.jpg',
  },
  {
    id: 'event7',
    title: 'Family Climbing Day',
    date: 'October 10, 2025',
    location: 'Namur Climbing Gym',
    description: 'A special day for paraclimbers and their families to climb together in a supportive environment.',
    imageUrl: '/assets/events/family-day.jpg',
  },
  {
    id: 'event8',
    title: 'Paraclimbing Social Meet',
    date: 'November 15, 2025',
    location: 'Charleroi Climb Center',
    description: 'A casual social climbing session for the paraclimbing community to connect and climb together.',
    imageUrl: '/assets/events/social-meet.jpg',
  },
  {
    id: 'event9',
    title: 'End of Year Celebration',
    date: 'December 18, 2025',
    location: 'Brussels Event Hall',
    description: 'Celebrating the achievements of Belgian paraclimbers throughout the year with awards and recognition.',
    imageUrl: '/assets/events/year-end.jpg',
  },
];

// FAQ data
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is paraclimbing?",
    answer: "Paraclimbing is a form of sport climbing adapted for people with physical disabilities. It encompasses various climbing styles and techniques modified to accommodate different types of disabilities."
  },
  {
    question: "Do I need prior climbing experience to join?",
    answer: "No, we welcome climbers of all experience levels, including complete beginners. Our introductory sessions are specifically designed to help newcomers get started safely."
  },
  {
    question: "What types of disabilities are accommodated in paraclimbing?",
    answer: "Paraclimbing accommodates a wide range of disabilities including visual impairments, amputations, mobility impairments, neurological conditions, and more. We work with each individual to find adaptive techniques that work for them."
  },
  {
    question: "How much does it cost to participate?",
    answer: "Costs vary depending on the specific program or event. We strive to keep costs low and offer financial assistance for those who need it. Contact us for details about specific programs."
  },
  {
    question: "I don't have a disability. Can I still get involved?",
    answer: "Absolutely! We welcome volunteers without disabilities who want to support our mission. You can volunteer as a climbing assistant, event helper, or in other roles."
  },
  {
    question: "Is specialized equipment required?",
    answer: "Depending on the disability, specialized adaptive equipment might be used. However, for most introductory sessions, we provide all necessary equipment."
  },
  {
    question: "Are there competitions for paraclimbers?",
    answer: "Yes, there are various competitions at local, national, and international levels for paraclimbers. Paraclimbing Belgium supports athletes who wish to compete."
  },
];

// Volunteer opportunity data
export interface VolunteerOpportunity {
  title: string;
  description: string;
  commitment: string;
  requirements: string;
}

export const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    title: 'Event Assistant',
    description: 'Help organize and run paraclimbing events and competitions',
    commitment: '1-2 days per event',
    requirements: 'No climbing experience required, enthusiasm and reliability essential',
  },
  {
    title: 'Climbing Assistant',
    description: 'Assist during paraclimbing sessions, helping with belaying and general support',
    commitment: '2-3 hours weekly or bi-weekly',
    requirements: 'Basic climbing and belaying knowledge required, training provided',
  },
  {
    title: 'Adaptive Equipment Specialist',
    description: 'Help maintain, set up, and develop adaptive climbing equipment',
    commitment: 'Flexible, project-based',
    requirements: 'Technical skills and climbing knowledge preferred',
  },
  {
    title: 'Outreach Volunteer',
    description: 'Represent Paraclimbing Belgium at events and help with promotional activities',
    commitment: 'As needed for specific events',
    requirements: 'Good communication skills and passion for paraclimbing',
  },
];

// Paraclimbing category data
export interface ParaclimbingCategory {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const paraclimbingCategories: ParaclimbingCategory[] = [
  {
    id: 'visual',
    title: 'Visual Impairment (B)',
    description: 'Categories for climbers with visual impairments, ranging from partial to complete vision loss.',
    image: '/assets/categories/visual.jpg',
  },
  {
    id: 'amputee',
    title: 'Amputees (AL, AU)',
    description: 'Categories for climbers with lower limb (AL) or upper limb (AU) amputations.',
    image: '/assets/categories/amputee.jpg',
  },
  {
    id: 'limited-range',
    title: 'Limited Range of Movement (RP)',
    description: 'For climbers with conditions that limit range of movement or power.',
    image: '/assets/categories/limited-range.jpg',
  },
  {
    id: 'neurological',
    title: 'Neurological/Physical Disability (AU, AL, RP)',
    description: 'Categories for various neurological conditions affecting climbing ability.',
    image: '/assets/categories/neurological.jpg',
  },
];

// Donation options
export interface DonationOption {
  id: string;
  amount: string;
  description: string;
  icon: string;
}

export const donationOptions: DonationOption[] = [
  {
    id: 'donation1',
    amount: '€20',
    description: 'Helps provide adaptive climbing equipment for one session',
    icon: '🧗',
  },
  {
    id: 'donation2',
    amount: '€50',
    description: 'Sponsors a beginner paraclimber for their first month',
    icon: '🏆',
  },
  {
    id: 'donation3',
    amount: '€100',
    description: 'Contributes to coach training for paraclimbing specialization',
    icon: '👨‍🏫',
  },
  {
    id: 'donation4',
    amount: '€250',
    description: 'Helps send an athlete to an international competition',
    icon: '✈️',
  },
  {
    id: 'donation5',
    amount: 'Custom',
    description: 'Choose your own amount to support our programs',
    icon: '❤️',
  },
];
