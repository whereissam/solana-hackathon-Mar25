/**
 * CharityMapWithData Component
 * 
 * This component displays charities on a map using the consolidated data structure
 * through GraphQL integration.
 */

import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCharityLocations, CharityLocation } from '@/hooks/useCharityLocations';
import { useMap } from '@/context/map-context';
import { Marker, Popup } from 'mapbox-gl';

interface CharityMapWithDataProps {
  selectedSector?: string;
  selectedCharity: number | null;
  handleCharitySelect: (charityId: number) => void;
}

/**
 * CharityMapWithData component that uses GraphQL to fetch charity location data
 */
const CharityMapWithData: React.FC<CharityMapWithDataProps> = ({ 
  selectedSector,
  selectedCharity, 
  handleCharitySelect 
}) => {
  const { map } = useMap();
  const [markers, setMarkers] = useState<{ [key: number]: Marker }>({});
  const [popup, setPopup] = useState<Popup | null>(null);
  
  // Fetch charity locations using the GraphQL hook
  const { charityLocations, loading, error } = useCharityLocations({
    sector: selectedSector,
  });

  // Create markers for charities
  useEffect(() => {
    if (!map || !charityLocations.length) return;
    
    // Remove existing markers
    Object.values(markers).forEach(marker => marker.remove());
    
    // Create new markers
    const newMarkers: { [key: number]: Marker } = {};
    
    charityLocations.forEach(charity => {
      if (!charity.location.lat || !charity.location.lng) return;
      
      const el = document.createElement('div');
      el.className = 'charity-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = selectedCharity === charity.id ? '#3b82f6' : '#6b7280';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      
      const marker = new Marker(el)
        .setLngLat([charity.location.lng, charity.location.lat])
        .addTo(map);
      
      // Add click event to marker
      el.addEventListener('click', () => {
        handleCharitySelect(charity.id);
      });
      
      newMarkers[charity.id] = marker;
    });
    
    setMarkers(newMarkers);
    
    return () => {
      // Clean up markers when component unmounts
      Object.values(newMarkers).forEach(marker => marker.remove());
    };
  }, [map, charityLocations, selectedCharity, handleCharitySelect]);
  
  // Show popup for selected charity
  useEffect(() => {
    if (!map || !selectedCharity) {
      // Remove popup if no charity is selected
      if (popup) {
        popup.remove();
        setPopup(null);
      }
      return;
    }
    
    const charity = charityLocations.find(c => c.id === selectedCharity);
    if (!charity) return;
    
    // Remove existing popup
    if (popup) {
      popup.remove();
    }
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'charity-popup';
    popupContent.innerHTML = `
      <h3 class="text-lg font-bold">${charity.name}</h3>
      ${charity.description ? `<p class="text-sm mt-1">${charity.description}</p>` : ''}
      ${charity.location.address ? `<p class="text-xs mt-2">${charity.location.address}</p>` : ''}
      ${charity.location.city ? `<p class="text-xs">${charity.location.city}, ${charity.location.country || ''}</p>` : ''}
    `;
    
    // Create and show popup
    const newPopup = new Popup({ closeButton: true, closeOnClick: false })
      .setLngLat([charity.location.lng, charity.location.lat])
      .setDOMContent(popupContent)
      .addTo(map);
    
    setPopup(newPopup);
    
    // Fly to the selected charity
    map.flyTo({
      center: [charity.location.lng, charity.location.lat],
      zoom: 14,
      essential: true
    });
    
    return () => {
      newPopup.remove();
    };
  }, [map, selectedCharity, charityLocations, popup]);
  
  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
        <div className="text-lg font-medium">Loading charity locations...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
        <div className="text-lg font-medium text-red-500">Error loading charity locations</div>
      </div>
    );
  }
  
  return null; // The map is rendered by the MapProvider
};

export default CharityMapWithData;