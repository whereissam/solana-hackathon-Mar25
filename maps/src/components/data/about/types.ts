// Types for About component data

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Value {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface MissionStatement {
  heading: string;
  content: string;
  vision: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}