import React, { useState } from 'react';
import { Charity } from './data/data';

interface CharityListProps {
  filteredCharities: Charity[];
}

const CharityList: React.FC<CharityListProps> = ({ filteredCharities }) => {
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  
  const handleCharitySelect = (charityId: string) => {
    setSelectedCharity(selectedCharity === charityId ? null : charityId);
  };
  return (
    <div className="py-8 font-sans bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCharities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <h5 className="mb-3 text-xl font-medium text-gray-700">No charities found matching your criteria</h5>
            <p className="mb-6 text-gray-600 text-sm">Try adjusting your filters or search terms</p>
            <button className="btn bg-purple-600 hover:bg-purple-700 text-white btn-sm text-xs rounded-lg" onClick={() => window.location.reload()}>Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCharities.map((charity) => (
              <div 
                key={charity.id} 
                className={`card bg-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 overflow-hidden flex flex-col rounded-lg border ${selectedCharity === charity.id ? 'border-purple-500' : 'border-gray-100'}`}
                onClick={() => handleCharitySelect(charity.id)}
              >
                <figure className="relative">
                  <img 
                    src={charity.imagePath || `/images/charities/${charity.category.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                    alt={charity.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `/images/charities/${charity.category.toLowerCase().replace(/\s+/g, '-')}-1.jpg`;
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-md shadow-sm">
                    <span className="text-xs font-medium">{charity.category}</span>
                  </div>
                  {selectedCharity === charity.id && (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white p-1 rounded-full">
                      <i className="fas fa-check text-xs"></i>
                    </div>
                  )}
                </figure>
                <div className="card-body p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="card-title text-base font-semibold text-gray-800 line-clamp-2">{charity.name}</h2>
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i key={star} className={`${star <= Math.floor(charity.rating) ? 'fas' : 'far'} fa-star text-xs mr-0.5`}></i>
                        ))}
                      </div>
                      <span className="ml-1 text-xs font-medium text-gray-700">{charity.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{charity.description}</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-map-marker-alt text-xs"></i>
                      </div>
                      <span className="text-gray-700 text-sm">{charity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                      <span className="text-gray-700 text-sm">{charity.impact}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {charity.certifications.map((cert, index) => (
                      <span key={index} className="badge badge-outline bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200">{cert}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto bg-gray-50 border-t border-gray-100 p-4">
                  <div className="flex justify-between items-center">
                    <button className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white text-sm px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                      Donate Now
                    </button>
                    <div className="flex space-x-2">
                      <button className="btn btn-outline btn-sm btn-square hover:bg-gray-200 transition-colors duration-300 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center">
                        <i className="far fa-heart text-purple-600"></i>
                      </button>
                      <button className="btn btn-outline btn-sm btn-square hover:bg-gray-200 transition-colors duration-300 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center">
                        <i className="fas fa-share-alt text-purple-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredCharities.length > 0 && (
          <div className="flex justify-center mt-8">
            <button className="btn btn-outline border-2 border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 px-6 py-2 rounded-lg font-medium transition-colors duration-300">
              <i className="fas fa-plus-circle mr-2"></i>
              Load More Charities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharityList;