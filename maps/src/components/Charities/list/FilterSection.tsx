import React, { useState } from 'react';
import { Box, Container, TextField, Button, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import MapIcon from '@mui/icons-material/Map';
import { Category } from '../data/data';

interface FilterSectionProps {
  viewMode: 'list' | 'map';
  setViewMode: React.Dispatch<React.SetStateAction<'list' | 'map'>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDistance: number;
  setSelectedDistance: React.Dispatch<React.SetStateAction<number>>;
  selectedRating: number | null;
  setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  resetFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDistance,
  setSelectedDistance,
  selectedRating,
  setSelectedRating,
  showAdvancedFilters,
  setShowAdvancedFilters,
  categories
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // closed at start
  const [showDistanceDropdown, setShowDistanceDropdown] = useState(false); // closed at start

  return (
    <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', py: 3, position: 'sticky', top: 0, zIndex: 30 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          {/* View Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 2, md: 0 } }}>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setViewMode('list')}
              startIcon={<ViewListIcon />}
              sx={{ borderRadius: '50px' }}
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'map' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setViewMode('map')}
              startIcon={<MapIcon />}
              sx={{ borderRadius: '50px' }}
            >
              Map View
            </Button>
          </Box>
          
          {/* Search Bar */}
          <TextField
            placeholder="Search charities by name, cause, or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: '100%', md: '33%' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {/* Filter Options */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* Category Filter */}
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => setShowCategoryDropdown((prev) => !prev)}
            >
              <i className="fas fa-tags text-gray-500"></i>
              <span>{selectedCategory || 'All Categories'}</span>
              <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
            </Button>
            {showCategoryDropdown && (
              <Box sx={{
                position: 'absolute',
                left: 0,
                mt: 1,
                width: 224,
                bgcolor: 'white',
                borderRadius: 1,
                boxShadow: 3,
                py: 1,
                zIndex: 40,
                border: '1px solid #e5e7eb'
              }}>
                {categories.map((category) => (
                  <Box
                    key={category.name}
                    onClick={() => {
                      setSelectedCategory(category.name === 'All' ? null : category.name);
                      setShowCategoryDropdown(false);
                    }}
                    sx={{ px: 2, py: 1, '&:hover': { bgcolor: '#f5f3ff' }, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Box className={`w-6 h-6 ${category.color} rounded-full flex items-center justify-center text-white`}>
                      <i className={`fas ${category.icon} text-xs`}></i>
                    </Box>
                    <Typography variant="body2" color="textPrimary">{category.name}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          
          {/* Distance Filter */}
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => setShowDistanceDropdown((prev) => !prev)}
            >
              <i className="fas fa-map-marker-alt text-gray-500"></i>
              <span>Within {selectedDistance} km</span>
              <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
            </Button>
            {showDistanceDropdown && (
              <Box sx={{
                position: 'absolute',
                left: 0,
                mt: 1,
                width: 224,
                bgcolor: 'white',
                borderRadius: 1,
                boxShadow: 3,
                p: 2,
                zIndex: 40,
                border: '1px solid #e5e7eb'
              }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight="medium" color="textPrimary">
                    Distance: {selectedDistance} km
                  </Typography>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={selectedDistance}
                    onChange={(e) => setSelectedDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="textSecondary">5 km</Typography>
                  <Typography variant="caption" color="textSecondary">50 km</Typography>
                  <Typography variant="caption" color="textSecondary">100 km</Typography>
                </Box>
              </Box>
            )}
          </Box>
          
          {/* Rating Filter */}
          <Box sx={{ position: 'relative' }}>
            <Button
              id="ratingFilterButton"
              variant="outlined"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                const dropdown = document.getElementById('ratingDropdown');
                if (dropdown) {
                  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                }
              }}
            >
              <i className="fas fa-star text-amber-500"></i>
              <span>{selectedRating ? `${selectedRating}+ Rating` : 'Any Rating'}</span>
              <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
            </Button>
            <Box
              id="ratingDropdown"
              sx={{
                position: 'absolute',
                left: 0,
                mt: 1,
                width: 192,
                bgcolor: 'white',
                borderRadius: 1,
                boxShadow: 3,
                py: 1,
                zIndex: 40,
                border: '1px solid #e5e7eb',
                display: 'none'
              }}
            >
              <Box
                id="anyRatingOption"
                onClick={() => {
                  setSelectedRating(null);
                  const ratingDropdown = document.getElementById('ratingDropdown');
                  if (ratingDropdown) {
                    ratingDropdown.style.display = 'none';
                  }
                }}
                sx={{ px: 2, py: 1, '&:hover': { bgcolor: '#f5f3ff' }, cursor: 'pointer' }}
              >
                <Typography variant="body2" color="textPrimary">Any Rating</Typography>
              </Box>
              {[4, 4.5, 4.8].map((rating) => (
                <Box
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  sx={{ px: 2, py: 1, '&:hover': { bgcolor: '#f5f3ff' }, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Typography variant="body2" color="textPrimary">{rating}+</Typography>
                  <Box sx={{ display: 'flex', color: '#f59e0b' }}>
                    {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                      <i key={i} className="fas fa-star text-xs"></i>
                    ))}
                    {rating % 1 !== 0 && <i className="fas fa-star-half-alt text-xs"></i>}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          
          {/* Advanced Filters Button */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: showAdvancedFilters ? 'primary.main' : 'inherit'
            }}
          >
            <i className={`fas fa-sliders-h ${showAdvancedFilters ? 'text-purple-600' : 'text-gray-500'}`}></i>
            <span>Advanced Filters</span>
          </Button>
          
          {/* Clear Filters Button */}
          {(selectedCategory || selectedRating || searchQuery) && (
            <Button
              color="primary"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedRating(null);
                setSearchQuery('');
                setSelectedDistance(25);
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <i className="fas fa-times"></i>
              <span>Clear Filters</span>
            </Button>
          )}
        </Box>
        
        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f9fafb', borderRadius: 1, border: '1px solid #e5e7eb' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {/* Certification */}
              <Box>
                <Typography variant="subtitle2" color="textPrimary" sx={{ mb: 1 }}>Certification</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="platinum" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="platinum" className="ml-2 text-gray-700">Platinum Transparency</label>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="gold" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="gold" className="ml-2 text-gray-700">Gold Transparency</label>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="silver" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="silver" className="ml-2 text-gray-700">Silver Transparency</label>
                  </Box>
                </Box>
              </Box>
              
              {/* Organization Size */}
              <Box>
                <Typography variant="subtitle2" color="textPrimary" sx={{ mb: 1 }}>Organization Size</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="small" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="small" className="ml-2 text-gray-700">Small (Under $1M)</label>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="medium" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="medium" className="ml-2 text-gray-700">Medium ($1M - $10M)</label>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="large" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="large" className="ml-2 text-gray-700">Large (Over $10M)</label>
                  </Box>
                </Box>
              </Box>
              
              {/* Tax Deductible */}
              <Box>
                <Typography variant="subtitle2" color="textPrimary" sx={{ mb: 1 }}>Tax Deductible</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="501c3" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="501c3" className="ml-2 text-gray-700">501(c)(3) Organizations</label>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="international" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <label htmlFor="international" className="ml-2 text-gray-700">International Equivalents</label>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" sx={{ borderRadius: '8px' }}>
                Apply Filters
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FilterSection;