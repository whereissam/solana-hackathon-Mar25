/**
 * Map Page with Data Integration
 * 
 * This page displays an interactive map of charities using the consolidated data structure
 * through GraphQL integration.
 */

import Head from 'next/head';
import { useRef, useState } from 'react';
import MapProvider from '@/lib/mapbox/provider';
import CharityMapWithData from '@/components/Charities/CharityMapWithData';
import MapControls from '@/components/Charities/MapControls';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';

const MapPageWithData = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCharity, setSelectedCharity] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | undefined>(undefined);
  
  // Handler for charity selection
  const handleCharitySelect = (charityId: number) => {
    setSelectedCharity(prevSelected => 
      prevSelected === charityId ? null : charityId
    );
  };

  // Handler for sector filter change
  const handleSectorChange = (sector: string | undefined) => {
    setSelectedSector(sector);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <div className="relative h-screen w-full">
        <Head>
          <title>Unify Giving - Interactive Charity Map</title>
          <meta
            property="og:title"
            content="Unify Giving - Interactive Charity Map"
            key="title"
          />
          <meta
            name="description"
            content="Explore charitable organizations around the world with our interactive map. Find and support causes you care about with Unify Giving."
          />
        </Head>
        
        <div ref={mapContainerRef} className="absolute inset-0">
          <MapProvider 
            mapContainerRef={mapContainerRef}
            initialViewState={{
              longitude: 13.4050, // Berlin center
              latitude: 52.52,
              zoom: 11
            }}
          >
            <CharityMapWithData 
              selectedSector={selectedSector}
              selectedCharity={selectedCharity} 
              handleCharitySelect={handleCharitySelect} 
            />
            <MapControls />
          </MapProvider>
        </div>
        
        {/* Sector Filter UI */}
        <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold mb-2">Filter by Sector</h3>
          <select 
            className="w-full p-2 border rounded"
            value={selectedSector || ''}
            onChange={(e) => handleSectorChange(e.target.value || undefined)}
          >
            <option value="">All Sectors</option>
            <option value="charity">Charity</option>
            <option value="ug_partner">UG Partner</option>
            <option value="animals">Animals</option>
          </select>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default MapPageWithData;