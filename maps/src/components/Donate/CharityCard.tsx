import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Charity {
  id: number;
  name: string;
  category: string;
  rating: number;
  location: string;
  longitude: number;
  latitude: number;
  description: string;
  impact: string;
  certifications: string[];
  imagePath?: string;
}

interface CharityCardProps {
  charity: Charity;
  selectedCharity: string | null;
  handleCharitySelect: (name: string) => void;
}

const CharityCard: React.FC<CharityCardProps> = ({ 
  charity, 
  selectedCharity, 
  handleCharitySelect 
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
        selectedCharity === charity.name
          ? "ring-4 ring-purple-400"
          : "hover:shadow-md"
      }`}
    >
      <div className="h-48 overflow-hidden relative">
        <Image
          src={`/images/charities/charity${charity.id}.jpg`}
          alt={charity.name}
          className="object-cover object-center"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={charity.id <= 3}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">
            {charity.name}
          </h3>
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
            {charity.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{charity.description}</p>
        <div className="flex items-center mb-4">
          <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mr-2">
            <i className="fas fa-check-circle mr-1"></i> Verified
          </div>
          <div className="flex items-center text-amber-500">
            <span className="mr-1">{charity.rating}</span>
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fas fa-star text-xs ${i < Math.floor(charity.rating) ? 'text-amber-500' : 'text-gray-300'}`}
              ></i>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="text-sm text-gray-600 mb-2">
            <i className="fas fa-chart-line text-green-600 mr-2"></i>
            <span className="font-medium">Impact:</span>{" "}
            {charity.impact}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
            <div 
              className="bg-purple-600 h-1.5 rounded-full" 
              style={{ width: `${Math.min(100, charity.rating * 20)}%` }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {charity.certifications.map((cert, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleCharitySelect(charity.name)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 flex-grow !rounded-button whitespace-nowrap cursor-pointer"
          >
            <i className="fas fa-heart mr-2"></i>
            Donate Now
          </button>
          <Link href={`/charity/${charity.id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg font-medium transition duration-300 flex items-center justify-center">
            <i className="fas fa-info-circle"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;