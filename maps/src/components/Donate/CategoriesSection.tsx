import React from 'react';
import { categories } from './data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NatureIcon from '@mui/icons-material/Nature';
import PetsIcon from '@mui/icons-material/Pets';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PaletteIcon from '@mui/icons-material/Palette';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PublicIcon from '@mui/icons-material/Public';

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
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose a Cause
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a category to find charities aligned with causes you're
            passionate about.
          </p>
        </div>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          <motion.div 
            className="flex-shrink-0 w-48 h-36 rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all cursor-pointer hover:shadow-md hover:transform hover:scale-105 border-2 border-dashed border-gray-300"
            onClick={() => setSelectedCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mb-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            >
              <PublicIcon className="text-2xl" />
            </motion.div>
            <h3 className="font-semibold text-gray-800">All Causes</h3>
          </motion.div>
          <AnimatePresence>
            {categories.map((category, index) => (
              <motion.div
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
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-3 shadow-md`}
                >
                  {getMuiIcon(category.name)}
                </motion.div>
                <motion.h3 
                  className="font-semibold text-gray-800"
                  whileHover={{ scale: 1.05 }}
                >
                  {category.name}
                </motion.h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const getMuiIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'Animal Welfare': return <PetsIcon className="text-2xl" style={{ color: 'white' }} />;
    case 'Children': return <ChildCareIcon className="text-2xl" style={{ color: 'white' }} />;
    case 'Arts & Culture': return <PaletteIcon className="text-2xl" style={{ color: 'white' }} />;
    case 'Disaster Relief': return <HomeWorkIcon className="text-2xl" style={{ color: 'white' }} />;
    case 'Education': return <SchoolIcon className="text-2xl" />;
    case 'Healthcare': return <FavoriteIcon className="text-2xl" />;
    case 'Environment': return <NatureIcon className="text-2xl" />;
    case 'Humanitarian Aid': return <VolunteerActivismIcon className="text-2xl" />;
    default: return <PublicIcon className="text-2xl" style={{ color: 'white' }} />;
  }
};

export default CategoriesSection;