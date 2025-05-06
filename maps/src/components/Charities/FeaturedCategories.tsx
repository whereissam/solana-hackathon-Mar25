import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Charity, Category } from './data/data';

interface FeaturedCategoriesProps {
  categories: Category[];
  filteredCharities: Charity[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ 
  categories, 
  filteredCharities, 
  selectedCategory,
  onCategorySelect 
}) => {
  // Count charities by category
  const categoryCounts = categories.reduce((acc, category) => {
    if (category.name !== 'All') {
      acc[category.name] = filteredCharities.filter(charity => charity.category === category.name).length;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <Box sx={{ py: 6, bgcolor: '#f9fafb' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Browse by Category
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Explore charities by cause area to find organizations aligned with the issues you care about most
          </Typography>
        </Box>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className={`card shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer ${selectedCategory === category.name ? 'ring-2 ring-secondary' : ''}`}
              onClick={() => onCategorySelect(category.name)}
            >
              <div className="card-body items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${category.color}`}>
                  <i className={`fas ${category.icon} text-white text-2xl`}></i>
                </div>
                <h2 className="card-title">{category.name}</h2>
                <p className="text-gray-500">
                  {category.name === 'All' 
                    ? filteredCharities.length 
                    : categoryCounts[category.name] || 0} Charities
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default FeaturedCategories;