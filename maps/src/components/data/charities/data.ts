// Consolidated data from Charities component

// Define interfaces
export interface Address {
  city: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  postcode: string | null;
}

export interface Beneficiary {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Charity {
  id: number;
  name: string;
  category: string;
  rating: number;
  location: string;
  longitude: number;
  latitude: number;
  description: string;
  impact: string;
  certifications: string[];
  imagePath?: string;
  address?: Address;
  beneficiaries?: Beneficiary[];
}

export interface Category {
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { name: "All", icon: "fa-globe", color: "bg-gray-500" },
  { name: "Education", icon: "fa-graduation-cap", color: "bg-blue-500" },
  { name: "Healthcare", icon: "fa-heartbeat", color: "bg-red-500" },
  { name: "Environment", icon: "fa-leaf", color: "bg-green-500" },
  { name: "Animal Welfare", icon: "fa-paw", color: "bg-yellow-500" },
  { name: "Humanitarian Aid", icon: "fa-hands-helping", color: "bg-purple-500" },
  { name: "Children", icon: "fa-child", color: "bg-pink-500" },
  { name: "Arts & Culture", icon: "fa-palette", color: "bg-indigo-500" },
  { name: "Disaster Relief", icon: "fa-house-damage", color: "bg-orange-500" }
];

export const charities: Charity[] = [
  {
    id: 1,
    name: "Berlin Education Initiative",
    category: "Education",
    description: "Providing educational resources to underprivileged communities in Berlin",
    impact: "Reached 5,000+ students in Berlin schools",
    rating: 4.9,
    location: "Kreuzberg, Berlin",
    longitude: 13.4234,
    latitude: 52.4892,
    certifications: ["Verified", "Platinum Transparency"],
    imagePath: "/images/charities/education-1.jpg"
  },
  {
    id: 2,
    name: "Berlin Ocean Conservation Alliance",
    category: "Environment",
    description: "Protecting marine ecosystems and reducing plastic pollution in Berlin's waterways",
    impact: "Removed 250,000 pounds of plastic from Berlin's rivers",
    rating: 4.8,
    location: "Mitte, Berlin",
    longitude: 13.3833,
    latitude: 52.5219,
    certifications: ["Eco-Certified", "Gold Transparency"],
    imagePath: "/images/charities/environment-1.jpg"
  },
  {
    id: 3,
    name: "Berlin Healthcare Access",
    category: "Healthcare",
    description: "Providing affordable healthcare services to underserved communities in Berlin",
    impact: "Served 12,000+ patients annually",
    rating: 4.7,
    location: "Wedding, Berlin",
    longitude: 13.3661,
    latitude: 52.5429,
    certifications: ["Healthcare Excellence", "Silver Transparency"]
  },
  {
    id: 4,
    name: "Berlin Animal Shelter",
    category: "Animal Welfare",
    description: "Rescuing and rehoming abandoned animals in Berlin",
    impact: "Saved 2,000+ animals annually",
    rating: 4.6,
    location: "Lichtenberg, Berlin",
    longitude: 13.4908,
    latitude: 52.5075,
    certifications: ["Animal Care Certified"]
  }
  // Additional charities would be listed here
];