import React from 'react';

interface SocialLink {
  icon: string;
  url: string;
}

interface ContactProps {
  contact?: {
    address?: string;
    email?: string;
    phone?: string;
    socialLinks?: SocialLink[];
  };
}

const AboutContact: React.FC<ContactProps> = ({ contact }) => {
  // Default values if contact is undefined
  const defaultContact = {
    address: "123 Blockchain Way, San Francisco, CA 94105",
    email: "contact@unifygiving.org",
    phone: "+1 (555) 123-4567",
    socialLinks: [
      { icon: "🐦", url: "https://twitter.com/unifygiving" },
      { icon: "💼", url: "https://linkedin.com/company/unifygiving" },
      { icon: "📸", url: "https://instagram.com/unifygiving" }
    ]
  };

  // Use contact if provided, otherwise use default values
  const { address, email, phone, socialLinks } = contact || defaultContact;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our platform or want to learn more about how we can help your organization? Reach out to us!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/about/partner.jpg"
                alt="Contact Us"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt text-purple-600 mr-3"></i>
                  <span>{address}</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope text-purple-600 mr-3"></i>
                  <span>{email}</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone text-purple-600 mr-3"></i>
                  <span>{phone}</span>
                </li>
              </ul>
              
              <div className="flex space-x-4">
                {socialLinks && socialLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <i className={`fab ${index === 0 ? 'fa-twitter' : index === 1 ? 'fa-linkedin' : 'fa-instagram'} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/about/volunteer.jpg"
                alt="Volunteer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Your name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="Your email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    placeholder="Your message" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  ></textarea>
                </div>
                <div className="mt-6">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300 shadow-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;