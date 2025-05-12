// Types for Contact component data

export interface ContactInfoType {
  address: string;
  email: string;
  phone: string;
  socialLinks: {
    icon: string;
    url: string;
  }[];
}

export interface ContactHeroType {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface FAQType {
  question: string;
  answer: string;
}