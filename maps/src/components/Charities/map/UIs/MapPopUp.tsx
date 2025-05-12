"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Charity } from '../../data/data';
import { useMap } from '@/context/map-context';

interface MapPopUpProps {
  charity: Charity | undefined;
  onClose: () => void;
}

const MapPopUp: React.FC<MapPopUpProps> = ({ charity, onClose }) => {
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const { map } = useMap();
  
  // Add console logs for debugging
  console.log("MapPopUp rendering with charity:", charity?.name);
  
  useEffect(() => {
    // Only create popup if map and charity exist
    if (!map || !charity) {
      console.log("Map or charity missing, not creating popup");
      return;
    }
    
    console.log("Creating popup for charity:", charity.name);
    
    // Remove any existing popup first to prevent multiple popups
    if (popupRef.current) {
      console.log("Removing existing popup");
      popupRef.current.remove();
      popupRef.current = null;
    }
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'charity-popup';
    popupContent.innerHTML = `
      <div class="p-3 max-w-xs">
        <div class="font-bold text-lg mb-2">${charity.name}</div>
        <div class="text-sm mb-2">${charity.description}</div>
        <div class="flex items-center mb-2">
          <div class="flex">
            ${Array.from({ length: 5 }).map((_, i) => 
              `<span class="text-${i < Math.floor(charity.rating) ? 'yellow' : 'gray'}-500 mr-0.5">★</span>`
            ).join('')}
          </div>
          <span class="text-sm text-gray-600 ml-1">${charity.rating}</span>
        </div>
        <div class="text-xs text-gray-500 mb-2">
          <i class="fas fa-map-marker-alt mr-1"></i>
          ${charity.location}
        </div>
        <div class="text-xs font-medium text-purple-600">
          ${charity.impact}
        </div>
        <div class="mt-3">
          <button id="donate-button" class="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors w-full">
            Donate Now
          </button>
        </div>
      </div>
    `;
    
    // Create the popup with specific options to keep it open
    popupRef.current = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false, // Critical: prevent closing when clicking elsewhere
      maxWidth: '300px',
      className: 'charity-popup-container',
      anchor: 'bottom', // Position the popup above the marker
      offset: [0, -10] // Offset to position it nicely above the marker
    });
    
    // Set the content and position
    popupRef.current
      .setLngLat([charity.longitude, charity.latitude])
      .setDOMContent(popupContent)
      .addTo(map);
    
    console.log("Popup added to map");
    
    // Add event listener for popup close button
    const closeHandler = () => {
      console.log("Popup closed via close button");
      if (onClose) onClose();
    };
    
    popupRef.current.on('close', closeHandler);
    
    // Add event listener for the donate button
    const donateButton = popupContent.querySelector('#donate-button');
    if (donateButton) {
      donateButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        console.log("Donate button clicked for:", charity.name);
        alert(`Donating to ${charity.name}`); // Replace with actual donation logic
      });
    }
    
    // Fly to the charity location with animation
    map.flyTo({
      center: [charity.longitude, charity.latitude],
      zoom: 15,
      essential: true, // This animation is considered essential
      duration: 1000 // Duration in milliseconds
    });
    
    // Prevent map click from interfering with popup
    const mapClickHandler = (e: mapboxgl.MapMouseEvent) => {
      // Prevent map clicks from closing the popup
      e.originalEvent.stopPropagation();
    };
    
    map.on('click', mapClickHandler);
    
    // Cleanup function
    return () => {
      console.log("Cleaning up popup for:", charity?.name);
      if (popupRef.current) {
        // Remove the event listener before removing the popup
        popupRef.current.off('close', closeHandler);
        popupRef.current.remove();
        popupRef.current = null;
      }
      
      // Remove map click handler
      map.off('click', mapClickHandler);
    };
  }, [map, charity, onClose]);
  
  // This component doesn't render anything directly
  return null;
};

export default MapPopUp;
