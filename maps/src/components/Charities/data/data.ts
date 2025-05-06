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
  },
  {
    id: 5,
    name: "Berlin Children's Fund",
    category: "Children",
    description: "Supporting children's education and welfare in Berlin's disadvantaged neighborhoods",
    impact: "Supported 3,500+ children with resources",
    rating: 4.9,
    location: "Neukölln, Berlin",
    longitude: 13.4416,
    latitude: 52.4767,
    certifications: ["Child Welfare Certified", "Platinum Transparency"]
  },
  {
    id: 6,
    name: "Berlin Arts Foundation",
    category: "Arts & Culture",
    description: "Supporting local artists and cultural events throughout Berlin",
    impact: "Funded 200+ artists and 50+ cultural events",
    rating: 4.5,
    location: "Charlottenburg, Berlin",
    longitude: 13.3017,
    latitude: 52.5033,
    certifications: ["Cultural Heritage Partner"]
  },
  {
    id: 7,
    name: "Berlin Disaster Relief Network",
    category: "Disaster Relief",
    description: "Providing emergency assistance during crises in Berlin",
    impact: "Responded to 35+ emergency situations",
    rating: 4.7,
    location: "Friedrichshain, Berlin",
    longitude: 13.4509,
    latitude: 52.5167,
    certifications: ["Emergency Response Certified"]
  },
  {
    id: 8,
    name: "Berlin Humanitarian Aid Center",
    category: "Humanitarian Aid",
    description: "Providing essential supplies and support to refugees and homeless in Berlin",
    impact: "Assisted 5,000+ individuals in need",
    rating: 4.8,
    location: "Moabit, Berlin",
    longitude: 13.3409,
    latitude: 52.5250,
    certifications: ["Humanitarian Excellence"]
  },
  {
    id: 9,
    name: "Berlin Environmental Coalition",
    category: "Environment",
    description: "Working to create sustainable urban spaces and reduce carbon emissions in Berlin",
    impact: "Created 15+ urban gardens and reduced emissions by 5%",
    rating: 4.6,
    location: "Prenzlauer Berg, Berlin",
    longitude: 13.4099,
    latitude: 52.5429,
    certifications: ["Green Initiative Certified"]
  },
  {
    id: 10,
    name: "Berlin Tech Education",
    category: "Education",
    description: "Teaching coding and digital skills to disadvantaged youth in Berlin",
    impact: "Trained 1,200+ students in tech skills",
    rating: 4.5,
    location: "Schöneberg, Berlin",
    longitude: 13.3500,
    latitude: 52.4800,
    certifications: ["Tech Education Certified"]
  },
  {
    id: 11,
    name: "Berlin Senior Care Services",
    category: "Healthcare",
    description: "Providing companionship and care for elderly residents in Berlin",
    impact: "Supported 800+ seniors with daily assistance",
    rating: 4.8,
    location: "Steglitz, Berlin",
    longitude: 13.3242,
    latitude: 52.4583,
    certifications: ["Elder Care Certified", "Verified"]
  },
  {
    id: 12,
    name: "Berlin STEM Education Fund",
    category: "Education",
    description: "Promoting science, technology, engineering, and math education in Berlin schools",
    impact: "Reached 8,000+ students with STEM programs",
    rating: 4.6,
    location: "Tempelhof, Berlin",
    longitude: 13.3869,
    latitude: 52.4700,
    certifications: ["Education Excellence", "Silver Transparency"]
  },
  {
    id: 13,
    name: "Berlin Food Bank",
    category: "Humanitarian Aid",
    description: "Providing meals to those in need throughout Berlin",
    impact: "Distributed 50,000+ meals monthly",
    rating: 4.9,
    location: "Spandau, Berlin",
    longitude: 13.2088,
    latitude: 52.5344,
    certifications: ["Food Safety Certified", "Platinum Transparency"]
  },
  {
    id: 14,
    name: "Berlin Youth Sports Program",
    category: "Children",
    description: "Making sports accessible to all children in Berlin regardless of background",
    impact: "2,500+ children participating in sports programs",
    rating: 4.7,
    location: "Marzahn, Berlin",
    longitude: 13.5446,
    latitude: 52.5372,
    certifications: ["Youth Development", "Gold Transparency"]
  },
  {
    id: 15,
    name: "Berlin Clean Water Initiative",
    category: "Environment",
    description: "Improving water quality in Berlin's rivers and lakes",
    impact: "Cleaned 5 major waterways in Berlin",
    rating: 4.5,
    location: "Köpenick, Berlin",
    longitude: 13.5775,
    latitude: 52.4300,
    certifications: ["Environmental Impact", "Water Quality Certified"]
  },
  {
    id: 16,
    name: "Berlin Cultural Heritage Preservation",
    category: "Arts & Culture",
    description: "Preserving historical sites and cultural landmarks throughout Berlin",
    impact: "Restored 12 historical buildings and monuments",
    rating: 4.6,
    location: "Tiergarten, Berlin",
    longitude: 13.3500,
    latitude: 52.5100,
    certifications: ["Heritage Preservation", "Historical Society Partner"]
  },
  {
    id: 17,
    name: "Berlin Mental Health Alliance",
    category: "Healthcare",
    description: "Providing mental health services and support to Berlin residents",
    impact: "Helped 3,000+ individuals with mental health services",
    rating: 4.8,
    location: "Wilmersdorf, Berlin",
    longitude: 13.3200,
    latitude: 52.4900,
    certifications: ["Mental Health Excellence", "Verified"]
  }
];