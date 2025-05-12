// Type definitions for About section data

export interface SocialLinkType {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfoType {
  address: string;
  email: string;
  phone: string;
  socialLinks: SocialLinkType[];
}

export interface FAQType {
  question: string;
  answer: string;
}

export interface TeamMemberType {
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: SocialLinkType[];
}

export interface MissionStatementType {
  title: string;
  description: string;
  goals: string[];
}

export interface CoreValueType {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLinkType {
  icon: string;
  url: string;
}

export interface TeamMemberType {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socialLinks: SocialLinkType[];
}

export interface ContactInfoType {
  address: string;
  email: string;
  phone: string;
  socialLinks: SocialLinkType[];
}