export const pageContent = {
  title: "Make a Donation",
  subtitle: "Your generosity helps us make a difference. Choose your preferred payment method below.",
  
  sections: {
    donationAmount: {
      title: "Choose Donation Amount",
      customLabel: "Custom Amount"
    },
    
    donationFrequency: {
      title: "Donation Frequency",
      description: "Choose how often you'd like to donate"
    },
    
    paymentMethod: {
      title: "Payment Method",
      description: "Select your preferred way to donate"
    },
    
    personalInfo: {
      title: "Your Information",
      description: "We need your details for the donation receipt",
      fields: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number (Optional)",
        address: "Address (Optional)",
        city: "City (Optional)",
        country: "Country (Optional)",
        postalCode: "Postal Code (Optional)"
      }
    },
    
    taxDeduction: {
      title: "Tax Deduction Information",
      description: "Your donation may be tax-deductible. We'll send a receipt to your email."
    }
  },
  
  buttons: {
    donate: "Complete Donation",
    back: "Back",
    next: "Next",
    cancel: "Cancel"
  },
  
  confirmation: {
    title: "Thank You for Your Donation!",
    message: "Your generosity makes our work possible. A receipt has been sent to your email.",
    shareMessage: "Share your support with others:",
    donateAgain: "Make Another Donation"
  },
  
  impactStatements: [
    "Your donation helps provide education to children in need",
    "Your support brings clean water to communities facing scarcity",
    "Your generosity helps deliver medical care to underserved regions",
    "Your contribution supports sustainable development initiatives"
  ]
};

export const faqContent = {
  title: "Frequently Asked Questions",
  questions: [
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, all donations are tax-deductible to the extent allowed by law. You will receive a receipt for your records."
    },
    {
      question: "How is my donation used?",
      answer: "Your donation directly supports our programs and initiatives. We maintain a commitment to transparency, with at least 85% of donations going directly to program costs."
    },
    {
      question: "Can I make a recurring donation?",
      answer: "Yes, you can set up monthly, quarterly, or annual recurring donations to provide sustained support for our work."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use industry-standard encryption and security protocols to protect your personal and payment information."
    }
  ]
};