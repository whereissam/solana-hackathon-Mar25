/**
 * GraphQL Data Integration Example
 * 
 * This component demonstrates how to use the consolidated data structure with GraphQL
 * in a React component.
 */

'use client';

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Charity } from './charities/types';

// GraphQL query using the schema that matches our consolidated data structure
const GET_CHARITIES = gql`
  query GetCharities {
    charities {
      id
      name
      description
      mission
      sector
      website
      address {
        city
        country
        lat
        lng
        postcode
      }
      beneficiaries {
        id
        email
        first_name
        last_name
      }
    }
  }
`;

/**
 * Example component that fetches charity data using GraphQL
 * and displays it using the consolidated data structure
 */
const CharitiesExample: React.FC = () => {
  // Use Apollo Client to fetch data from GraphQL API
  const { loading, error, data } = useQuery(GET_CHARITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Data from GraphQL is structured according to our consolidated data model
  const charities: Charity[] = data.charities;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Charities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {charities.map((charity) => (
          <div key={charity.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{charity.name}</h2>
            
            {charity.mission && (
              <p className="text-gray-600 mt-2">{charity.mission}</p>
            )}
            
            <div className="mt-3">
              <p className="text-sm">
                <span className="font-medium">Location:</span> {charity.address.city}, {charity.address.country}
              </p>
              
              {charity.website && (
                <p className="text-sm mt-1">
                  <span className="font-medium">Website:</span>{' '}
                  <a href={charity.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {charity.website}
                  </a>
                </p>
              )}
            </div>
            
            {charity.beneficiaries && charity.beneficiaries.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium">Beneficiaries</h3>
                <ul className="mt-2 space-y-1">
                  {charity.beneficiaries.map((beneficiary) => (
                    <li key={beneficiary.id} className="text-sm">
                      {beneficiary.first_name} {beneficiary.last_name} ({beneficiary.email})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharitiesExample;