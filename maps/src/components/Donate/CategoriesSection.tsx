import React from 'react';
import { categories } from './data/categories';
import { motion } from 'framer-motion';

interface CategoriesSectionProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Choose a Cause
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a category to find charities aligned with causes you're
            passionate about.
          </p>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          <div 
            className="flex-shrink-0 w-48 h-36 rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all cursor-pointer hover:shadow-md hover:transform hover:scale-105 border-2 border-dashed border-gray-300"
            onClick={() => setSelectedCategory(null)}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mb-3">
              <i className="fas fa-globe text-2xl"></i>
            </div>
            <h3 className="font-semibold text-gray-800">All Causes</h3>
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name,
                )
              }
              className={`flex-shrink-0 w-48 h-36 rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all cursor-pointer ${
                selectedCategory === category.name
                  ? "ring-4 ring-purple-400 transform scale-105"
                  : "hover:shadow-md hover:transform hover:scale-105"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-white mb-3 shadow-md`}
              >
                <i className={`fas ${category.icon} text-2xl`}></i>
              </motion.div>
              <h3 className="font-semibold text-gray-800">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;