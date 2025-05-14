import { ContactInfoType, ContactHeroType, FAQType } from './types';

export const contactInfo: ContactInfoType = {
  address: "123 Charity Lane, San Francisco, CA 94105",
  email: "contact@unifygiving.org",
  phone: "+1 (555) 123-4567",
  socialLinks: [
    {
      icon: "📱",
      url: "https://twitter.com/unifygiving"
    },
    {
      icon: "📘",
      url: "https://facebook.com/unifygiving"
    },
    {
      icon: "📸",
      url: "https://instagram.com/unifygiving"
    },
    {
      icon: "📌",
      url: "https://linkedin.com/company/unifygiving"
    }
  ]
};

export const contactHero: ContactHeroType = {
  title: "Contact Us",
  subtitle: "We'd love to hear from you. Reach out with any questions or feedback.",
  backgroundImage: "/images/contactHero.jpg"
};

export const faqs: FAQType[] = [
  {
    question: "How do I find charities in my area?",
    answer: "You can use our search feature and filter by location to find charities in your area. Our interactive map also allows you to visually browse organizations near you."
  },
  {
    question: "How can I volunteer through UnifyGiving?",
    answer: "Browse volunteer opportunities on our platform, create an account, and apply directly through our site. You can filter by cause, skills required, and time commitment to find the perfect match."
  },
  {
    question: "Is my donation secure and tax-deductible?",
    answer: "Yes, all donations made through UnifyGiving are secure and encrypted. All registered charities on our platform are verified 501(c)(3) organizations, making your donations tax-deductible."
  },
  {
    question: "How can my organization join UnifyGiving?",
    answer: "Organizations can apply to join our platform by completing the registration form in the Partners section. Our team will review your application and reach out within 3-5 business days."
  },
  {
    question: "Do you offer corporate partnership programs?",
    answer: "Yes, we offer various corporate partnership programs including employee volunteer matching, donation matching, and custom cause marketing campaigns. Contact our partnerships team for more information."
  }
];