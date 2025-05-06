// Example component showing how to use the consolidated data structure

import React from 'react';

// Old imports (before consolidation)
// import { teamData } from '../About/data/data';
// import { charities, categories } from '../Charities/data/data';
// import { contactInfo, faqs } from '../Contact/data/data';
// import { dashboardStats } from '../Dashboard/data/data';
// import { donationOptions } from '../Donate/data/data';

// New imports (after consolidation)
import { teamData, valuesData } from './about/data';
import { charities, categories } from './charities/data';
import { contactInfo, faqs } from './contact/data';
import { dashboardStats, quickActions } from './dashboard/data';
import { donationOptions, paymentMethods } from './donate/data';

const DataUsageExample: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Usage Example</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About Data</h2>
        <div className="grid grid-cols-2 gap-4">
          {teamData.slice(0, 2).map((member) => (
            <div key={member.id} className="border p-3 rounded">
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Charity Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 4).map((category) => (
            <span 
              key={category.name} 
              className={`px-3 py-1 rounded-full text-sm ${category.color} text-white`}
            >
              {category.name}
            </span>
          ))}
        </div>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <div className="border p-3 rounded">
          <p>{contactInfo.email}</p>
          <p>{contactInfo.phone}</p>
        </div>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dashboard Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          {dashboardStats.slice(0, 2).map((stat) => (
            <div key={stat.id} className="border p-3 rounded">
              <h3 className="font-medium">{stat.title}</h3>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Donation Options</h2>
        <div className="grid grid-cols-2 gap-4">
          {donationOptions.slice(0, 2).map((option) => (
            <div key={option.id} className="border p-3 rounded">
              <h3 className="font-medium">{option.name}</h3>
              <p className="text-lg font-bold">${option.amount}</p>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DataUsageExample;