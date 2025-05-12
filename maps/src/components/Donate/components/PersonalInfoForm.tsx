import React from 'react';
import { pageContent } from '../constants/textContent';

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  onChange
}) => {
  const { fields } = pageContent.sections.personalInfo;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{pageContent.sections.personalInfo.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {pageContent.sections.personalInfo.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">{fields.firstName} *</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">{fields.lastName} *</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">{fields.email} *</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">{fields.phone}</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">{fields.address}</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">{fields.city}</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">{fields.country}</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">{fields.postalCode}</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      
      <div className="form-control mt-4">
        <label className="cursor-pointer label justify-start">
          <input type="checkbox" className="checkbox checkbox-primary mr-2" />
          <span className="label-text">I'd like to receive updates about the impact of my donation</span>
        </label>
      </div>
    </div>
  );
};

export default PersonalInfoForm;