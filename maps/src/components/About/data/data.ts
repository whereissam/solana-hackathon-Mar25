import { MissionStatementType, CoreValueType, TeamMemberType } from './types';

export const missionStatement: MissionStatementType = {
  title: "Revolutionizing Charitable Giving with Blockchain",
  description: "Our mission is to leverage blockchain technology to create a more transparent, efficient, and impactful charitable giving ecosystem. We believe in connecting donors directly with beneficiaries, eliminating intermediaries, and ensuring that every contribution makes a real difference.",
  goals: [
    "Increase transparency in charitable donations through blockchain verification",
    "Reduce administrative costs associated with traditional donation methods",
    "Empower donors with real-time tracking of their contributions",
    "Provide a secure and efficient platform for global giving",
    "Build trust in the charitable sector through immutable records"
  ]
};

export const coreValues: CoreValueType[] = [
  {
    icon: "Search",
    title: "Transparency",
    description: "We believe in complete transparency in all charitable transactions, allowing donors to see exactly where their money goes."
  },
  {
    icon: "Shield",
    title: "Security",
    description: "Using blockchain technology, we ensure that all donations are securely processed and recorded on an immutable ledger."
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description: "We continuously explore new technologies and approaches to improve the charitable giving experience."
  },
  {
    icon: "Users",
    title: "Collaboration",
    description: "We work closely with charities, donors, and technology partners to create a more effective giving ecosystem."
  },
  {
    icon: "Globe",
    title: "Global Impact",
    description: "Our platform enables donors to support causes around the world, breaking down geographical barriers to giving."
  },
  {
    icon: "Zap",
    title: "Efficiency",
    description: "We minimize overhead costs and administrative burdens, ensuring more of each donation reaches its intended beneficiaries."
  }
];

export const teamMembers: TeamMemberType[] = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Former nonprofit executive with 15+ years of experience in community development.",
    avatar: "/images/about/sarahj.jpg",
    socialLinks: [
      { icon: "🐦", url: "https://twitter.com/sarahjohnson" },
      { icon: "💼", url: "https://linkedin.com/in/sarahjohnson" }
    ]
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech innovator with background in mapping technologies and social impact platforms.",
    avatar: "/images/about/michael.jpg",
    socialLinks: [
      { icon: "🐦", url: "https://twitter.com/michaelchen" },
      { icon: "💼", url: "https://linkedin.com/in/michaelchen" },
      { icon: "📝", url: "https://github.com/michaelchen" }
    ]
  },
  {
    name: "Aisha Williams",
    role: "Community Director",
    bio: "Community organizer who has built partnerships with over 500 charitable organizations.",
    avatar: "/images/about/aisha.jpg",
    socialLinks: [
      { icon: "🐦", url: "https://twitter.com/aishawilliams" },
      { icon: "💼", url: "https://linkedin.com/in/aishawilliams" }
    ]
  },
  {
    name: "David Rodriguez",
    role: "Head of Partnerships",
    bio: "Former nonprofit fundraiser who specializes in creating sustainable charity partnerships.",
    avatar: "/images/about/davidr.jpg",
    socialLinks: [
      { icon: "📝", url: "https://github.com/davidrodriguez" },
      { icon: "💼", url: "https://linkedin.com/in/davidrodriguez" }
    ]
  },
  {
    name: "Emma Davis",
    role: "Marketing Director",
    bio: "Marketing specialist with experience in nonprofit sector and digital campaigns.",
    avatar: "/images/about/emma.jpg",
    socialLinks: [
      { icon: "🎨", url: "https://dribbble.com/emmadavis" },
      { icon: "💼", url: "https://linkedin.com/in/emmadavis" }
    ]
  },
  {
    name: "Thomas Kim",
    role: "Financial Officer",
    bio: "Financial expert with experience in both traditional finance and cryptocurrency markets.",
    avatar: "/images/about/thomas.jpg",
    socialLinks: [
      { icon: "💼", url: "https://linkedin.com/in/thomaskim" }
    ]
  }
];