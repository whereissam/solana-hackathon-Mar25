"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Container } from '@mui/material';
import FilterSection from './list/FilterSection';
import CharityList from './list/CharityList';
import CharityMap from './map/CharityMap';
import { MapProvider } from '@/context/map-context';
// Import these components only if they exist
// If they don't exist, you'll need to create them or remove the imports
import { charities, categories } from './data/data';

// Define the Charity interface to fix the implicit 'any' type
interface Charity {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  rating: number;
  impact: string;
  certifications: string[];
  // Add other properties as needed
}

const Charities: React.FC = () => {
  // State management
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number>(25);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [selectedCharity, setSelectedCharity] = useState<number | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  // Handle dropdown visibility with useCallback for better performance
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const elements = [
      { button: 'profileIcon', dropdown: 'profileDropdown', setter: setShowProfileMenu },
      { button: 'ratingFilterButton', dropdown: 'ratingDropdown' },
      { button: 'categoryFilterButton', dropdown: 'categoryDropdown' },
      { button: 'distanceFilterButton', dropdown: 'distanceDropdown' }
    ];

    elements.forEach(({ button, dropdown, setter }) => {
      const buttonEl = document.getElementById(button);
      const dropdownEl = document.getElementById(dropdown);
      
      if (buttonEl && dropdownEl && 
          !buttonEl.contains(event.target as Node) && 
          !dropdownEl.contains(event.target as Node)) {
        if (setter) {
          setter(false);
        } else {
          dropdownEl.style.display = 'none';
        }
      }
    });
  }, []);

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Filter charities with useMemo for performance optimization
  const filteredCharities = useMemo(() => {
    return charities.filter((charity: Charity) => {
      // Filter by search query
      const matchesSearch = !searchQuery || 
        ['name', 'description', 'location'].some(field => 
          charity[field as keyof Charity].toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      // Filter by category
      const matchesCategory = !selectedCategory || 
                             selectedCategory === "All" || 
                             charity.category === selectedCategory;
      
      // Filter by rating
      const matchesRating = !selectedRating || charity.rating >= selectedRating;
      
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [searchQuery, selectedCategory, selectedRating]);

  // Handle charity selection with useCallback
  const handleCharitySelect = useCallback((charityId: number) => {
    setSelectedCharity(prevSelected => prevSelected === charityId ? null : charityId);
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedDistance(25);
  }, []);

  return (
    <Box className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">      
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Page Header */}
        <Box sx={{ bgcolor: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', py: 4, px: 3 }}>
          <Container maxWidth="lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Charities</h1>
            <p className="text-lg text-gray-600">
              Find and support trusted organizations making a difference around the world.
            </p>
          </Container>
        </Box>

        <FilterSection 
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDistance={selectedDistance}
          setSelectedDistance={setSelectedDistance}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          categories={categories}
          resetFilters={resetFilters}
        />

        {viewMode === 'map' ? (
          <MapProvider> {/* Add MapProvider here */}
            <CharityMap 
              filteredCharities={filteredCharities} 
              selectedCharity={selectedCharity} 
              handleCharitySelect={handleCharitySelect} 
            />
          </MapProvider>
        ) : (
          <CharityList filteredCharities={filteredCharities} />
        )}

        {/* Remove or comment out these components if they don't exist */}
        {/*
        <FeaturedCategories
          categories={categories}
          filteredCharities={filteredCharities} 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <Newsletter />
        */}
      </Box>
    </Box>
  );
};

// Change the export to match the component name
export default Charities;