import React from "react";
import { ContactInfoType } from "../About/data/types";

interface ContactInfoProps {
  contactInfo: ContactInfoType;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contactInfo }) => {
  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body p-8">
        <h3 className="card-title text-2xl mb-6">Contact Information</h3>
        <ul className="space-y-4 mb-4">
          <li className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{contactInfo.address}</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">📧</span>
            <a href={`mailto:${contactInfo.email}`} className="link link-primary">
              {contactInfo.email}
            </a>
          </li>
          <li className="flex items-center">
            <span className="mr-2">📞</span>
            <span>{contactInfo.phone}</span>
          </li>
        </ul>
        <div className="mt-6">
          <h4 className="font-bold mb-3">Follow Us:</h4>
          <div className="flex space-x-4">
            {contactInfo.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-base-200 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <span>{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;