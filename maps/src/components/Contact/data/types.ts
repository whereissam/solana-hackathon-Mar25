export interface FAQType {
  question: string;
  answer: string;
}

export interface ContactInfoType {
  address: string;
  email: string;
  phone: string;
  socialLinks: SocialLinkType[];
}

export interface SocialLinkType {
  icon: string;
  url: string;
  platform: string;
}

export interface ContactHeroType {
  title: string;
  subtitle: string;
  backgroundImage: string;
}