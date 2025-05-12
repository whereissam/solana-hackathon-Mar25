// Sample data for donation options, charities, and other data used in the Donate component
export const donationOptions = [
  {
    id: 1,
    name: "Basic Support",
    description: "Help provide essential resources",
    amount: 25,
    icon: "hand-holding-heart"
  },
  {
    id: 2,
    name: "Sustainer",
    description: "Support ongoing programs and initiatives",
    amount: 50,
    icon: "seedling"
  },
  {
    id: 3,
    name: "Champion",
    description: "Make a significant impact on our mission",
    amount: 100,
    icon: "star"
  },
  {
    id: 4,
    name: "Visionary",
    description: "Help transform lives and communities",
    amount: 250,
    icon: "lightbulb"
  },
  {
    id: 5,
    name: "Custom Amount",
    description: "Choose your own donation amount",
    amount: 0,
    icon: "edit"
  }
];

export const frequencyOptions = [
  { id: 'one-time', label: 'One Time' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'annually', label: 'Annually' }
];

export const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: 'credit-card',
    description: 'Pay with Visa, Mastercard, or American Express'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal',
    description: 'Fast, secure payment with PayPal'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: 'bitcoin',
    description: 'Donate with Bitcoin, Ethereum, or other cryptocurrencies'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: 'university',
    description: 'Direct bank transfer to our account'
  }
];

export const sampleCharities = [
  {
    id: 1,
    name: "Global Education Initiative",
    description: "Providing educational resources to underserved communities worldwide",
    category: "Education",
    location: "Global",
    impact: "Reached 50,000+ students",
    rating: 4.8,
    imagePath: "/images/charities/education.jpg",
    certifications: ["501(c)(3)", "Transparency Certified"]
  },
  {
    id: 2,
    name: "Clean Water Project",
    description: "Building wells and water purification systems in areas facing water scarcity",
    category: "Environment",
    location: "Africa, Asia",
    impact: "Provided clean water to 100,000+ people",
    rating: 4.9,
    imagePath: "/images/charities/environment.jpg",
    certifications: ["501(c)(3)", "Impact Verified"]
  },
  {
    id: 3,
    name: "Medical Relief International",
    description: "Delivering medical supplies and healthcare to disaster-affected regions",
    category: "Healthcare",
    location: "Global",
    impact: "Served 75,000+ patients",
    rating: 4.7,
    imagePath: "/images/charities/healthcare.jpg",
    certifications: ["501(c)(3)", "Accountability Certified"]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Donor",
    quote: "I've been donating monthly for two years now. The transparency and impact reports make me confident my contributions are making a real difference.",
    avatar: "/images/testimonials/sarah.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Volunteer & Donor",
    quote: "As both a volunteer and donor, I've seen firsthand how efficiently funds are used to create meaningful change in communities.",
    avatar: "/images/testimonials/michael.jpg"
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Corporate Partner",
    quote: "Our company's partnership has been incredibly rewarding. The team is professional, and the impact metrics are impressive.",
    avatar: "/images/testimonials/aisha.jpg"
  }
];