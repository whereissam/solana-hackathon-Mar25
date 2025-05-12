export interface Charity {
  id: number;
  name: string;
  category: string;
  description: string;
  impact: string;
  rating: number;
  certifications: string[];
  location: string;      // Add this
  longitude: number;     // Add this
  latitude: number;      // Add this
  imagePrompt?: string;
  imagePath?: string;
}
export const charities = [
  {
    id: 1,
    name: "Global Education Initiative",
    category: "Education",
    description:
      "Providing educational resources to underprivileged communities worldwide",
    impact: "Reached 50,000+ students in 25 countries",
    rating: 4.9,
    certifications: ["501(c)(3)", "Platinum Transparency"],
    imagePrompt:
      "Professional education charity logo with open book and globe symbol on clean white background, modern minimalist design with blue color scheme, representing global learning and knowledge sharing",
  },
  {
    id: 2,
    name: "Ocean Conservation Alliance",
    category: "Environment",
    description:
      "Protecting marine ecosystems and reducing ocean plastic pollution",
    impact: "Removed 2.5M pounds of plastic from oceans",
    rating: 4.8,
    certifications: ["501(c)(3)", "Gold Transparency"],
    imagePath: "/images/charities/environment-1.jpg",  },
  {
    id: 3,
    name: "Medical Relief International",
    category: "Healthcare",
    description:
      "Providing emergency medical care and supplies to crisis zones",
    impact: "Served 120,000+ patients in 15 countries",
    rating: 4.7,
    certifications: ["501(c)(3)", "Platinum Transparency"],
    imagePath: "/images/charities/healthcare-1.jpg",  },
  {
    id: 4,
    name: "Wildlife Protection Fund",
    category: "Animal Welfare",
    description: "Preserving endangered species and their natural habitats",
    impact: "Protected 500,000+ acres of critical habitat",
    rating: 4.8,
    certifications: ["501(c)(3)", "Gold Transparency"],
    imagePath: "/images/charities/animalWelfare-1.jpg", },
  {
    id: 5,
    name: "Hunger Relief Network",
    category: "Humanitarian Aid",
    description:
      "Fighting food insecurity through meal programs and food banks",
    impact: "Provided 8M+ meals to families in need",
    rating: 4.9,
    certifications: ["501(c)(3)", "Platinum Transparency"],
    imagePath: "/images/charities/disasterRelief-2.jpg", },
  {
    id: 6,
    name: "Children's Future Foundation",
    category: "Children",
    description:
      "Supporting vulnerable children through education and healthcare",
    impact: "Helped 75,000+ children access education",
    rating: 4.8,
    certifications: ["501(c)(3)", "Gold Transparency"],
    imagePath: "/images/charities/children.jpg", },
];