import Head from 'next/head';
import { useState } from 'react';
import { MapProvider } from '@/context/map-context';
import CharityMap from '@/components/Charities/map/CharityMap';
import MapControls from '@/components/Charities/map/UIs/MapControls';
import MapSearch from '@/components/Charities/map/UIs/MapSearch';
import MapStyles from '@/components/Charities/map/UIs/MapStyles';

const MapPage = () => {
  const [selectedCharity, setSelectedCharity] = useState<number | null>(null);
  
  // Handler for charity selection
  const handleCharitySelect = (charityId: number) => {
    setSelectedCharity(prevSelected => 
      prevSelected === charityId ? null : charityId
    );
  };

  return (
    <MapProvider>
      <div className="relative h-screen w-full">
        <Head>
          <title>Unify Compass - Interactive Charity Map</title>
          <meta
            property="og:title"
            content="Unify Compass - Interactive Charity Map"
            key="title"
          />
          <meta
            name="description"
            content="Explore charitable organizations around the world with our interactive map. Find and support causes you care about with Unify Compass."
          />
        </Head>
        
        <MapSearch />
        <CharityMap 
          filteredCharities={[]} 
          selectedCharity={selectedCharity} 
          handleCharitySelect={handleCharitySelect} 
        />
        <MapControls />
        <MapStyles />
      </div>
    </MapProvider>
  );
};

export default MapPage;
