import React from 'react';
import { Charity } from '../Charities/data/data';
import { motion } from 'framer-motion';

interface CharityOverviewProps {
  charities?: Charity[];
}

const CharityOverview: React.FC<CharityOverviewProps> = ({ charities = [] }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Top Charities</h2>
      </div>
      <div className="p-6">
        <ul className="divide-y divide-gray-200">
          {charities.map((charity, index) => (
            <motion.li 
              key={charity.id} 
              className="py-4 first:pt-0 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">{charity.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {charity.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {charity.category}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-${star <= Math.floor(charity.rating) ? 'yellow' : 'gray'}-500 text-xs`}>★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">{charity.rating}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.div 
        className="p-4 border-t border-gray-200 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button className="text-sm text-primary hover:underline">
          View all charities
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CharityOverview;