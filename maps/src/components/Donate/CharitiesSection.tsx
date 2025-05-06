import React from 'react';
import { charities } from './data/charities';
import CharityCard from './CharityCard';

interface CharitiesSectionProps {
  selectedCategory: string | null;
  selectedCharity: string | null;
  handleCharitySelect: (name: string) => void;
}

const CharitiesSection: React.FC<CharitiesSectionProps> = ({ 
  selectedCategory, 
  selectedCharity, 
  handleCharitySelect 
}) => {
  const filteredCharities = selectedCategory
    ? charities.filter((charity) => charity.category === selectedCategory)
    : charities;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Organizations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover trusted charities making a significant impact in their
            fields.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCharities.map((charity) => (
            <CharityCard 
              key={charity.id}
              charity={charity}
              selectedCharity={selectedCharity}
              handleCharitySelect={handleCharitySelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharitiesSection;