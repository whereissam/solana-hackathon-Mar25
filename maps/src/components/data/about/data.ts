// Consolidated data from About component

import { TeamMember, Value } from './types';

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'Jane Smith',
    role: 'Founder & CEO',
    bio: 'Jane has over 15 years of experience in nonprofit management and is passionate about connecting donors with impactful causes.',
    image: '/images/team/jane-smith.jpg',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    role: 'CTO',
    bio: 'Michael brings 10+ years of tech leadership to Unify Giving, focusing on creating accessible digital platforms for charitable giving.',
    image: '/images/team/michael-johnson.jpg',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'Director of Partnerships',
    bio: 'Sarah works directly with charitable organizations to ensure their needs are represented accurately on our platform.',
    image: '/images/team/sarah-williams.jpg',
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Lead Developer',
    bio: 'David is responsible for the technical infrastructure of Unify Giving, with expertise in mapping technologies and data visualization.',
    image: '/images/team/david-chen.jpg',
  },
];

export const valuesData: Value[] = [
  {
    id: 1,
    title: 'Transparency',
    description: 'We believe in complete transparency in how charitable organizations operate and use donations.',
    icon: 'Eye',
  },
  {
    id: 2,
    title: 'Accessibility',
    description: 'Making charitable giving accessible to everyone through intuitive technology and clear information.',
    icon: 'Users',
  },
  {
    id: 3,
    title: 'Impact',
    description: 'Focusing on measurable impact and connecting donors with causes that create meaningful change.',
    icon: 'Target',
  },
  {
    id: 4,
    title: 'Community',
    description: 'Building a global community of givers and organizations working together for positive change.',
    icon: 'Globe',
  },
];

export const missionStatement = {
  heading: 'Our Mission',
  content: 'Unify Giving aims to revolutionize charitable giving by connecting donors with causes through interactive mapping technology. We believe in making philanthropy more accessible, transparent, and impactful for everyone.',
  vision: 'A world where giving is simple, transparent, and connected, allowing everyone to contribute to causes they care about regardless of location or resources.',
};

export const contactInfo = {
  email: 'info@unifygiving.org',
  phone: '+1 (555) 123-4567',
  address: '123 Charity Lane, Giving City, GC 12345',
  socialMedia: {
    twitter: 'https://twitter.com/unifygiving',
    facebook: 'https://facebook.com/unifygiving',
    instagram: 'https://instagram.com/unifygiving',
    linkedin: 'https://linkedin.com/company/unifygiving',
  },
};