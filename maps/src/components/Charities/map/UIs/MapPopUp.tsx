"use client";

import React, { useEffect, useRef, ReactNode } from 'react';
import mapboxgl from 'mapbox-gl';
import { Charity } from '../../data/data';
import { useMap } from '@/context/map-context';

interface MapPopUpProps {
  charity?: Charity;
  onClose: () => void;
  // Add these new props
  children?: ReactNode;
  latitude?: number;
  longitude?: number;
  offset?: number;
  closeButton?: boolean;
  closeOnClick?: boolean;
  className?: string;
  focusAfterOpen?: boolean;
}

const MapPopUp: React.FC<MapPopUpProps> = ({ 
  charity, 
  onClose,
  children,
  latitude,
  longitude,
  offset = 0,
  closeButton = true,
  closeOnClick = false,
  className = '',
  focusAfterOpen = true
}) => {
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const { map } = useMap();
  
  // Add console logs for debugging
  console.log("MapPopUp rendering with charity:", charity?.name);
  
  useEffect(() => {
    // Only create popup if map exists and either charity or coordinates are provided
    if (!map || (!charity && (latitude === undefined || longitude === undefined))) {
      console.log("Map or location data missing, not creating popup");
      return;
    }
    
    if (charity) {
      console.log("Creating popup for charity:", charity.name);
    } else {
      console.log("Creating popup for coordinates:", latitude, longitude);
    }
    
    // Remove any existing popup first to prevent multiple popups
    if (popupRef.current) {
      console.log("Removing existing popup");
      popupRef.current.remove();
      popupRef.current = null;
    }
    
    // Determine coordinates to use
    const lat = latitude !== undefined ? latitude : (charity?.latitude || 0);
    const lng = longitude !== undefined ? longitude : (charity?.longitude || 0);
    
    // Create the popup with specific options to keep it open
    popupRef.current = new mapboxgl.Popup({
      closeButton,
      closeOnClick, 
      maxWidth: '300px',
      className: `charity-popup-container ${className}`,
      anchor: 'bottom',
      offset,
      focusAfterOpen
    });
    
    if (children) {
      // If children are provided, use them as content
      const container = document.createElement('div');
      
      // Use ReactDOM to render children
      const ReactDOM = require('react-dom');
      ReactDOM.render(children, container);
      
      // Set the content and position
      popupRef.current
        .setLngLat([lng, lat])
        .setDOMContent(container)
        .addTo(map);
    } else if (charity) {
      // Create popup content for charity
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
      
      // Set the content and position
      popupRef.current
        .setLngLat([lng, lat])
        .setDOMContent(popupContent)
        .addTo(map);
      
      // Add event listener for the donate button
      const donateButton = popupContent.querySelector('#donate-button');
      if (donateButton) {
        donateButton.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent event from bubbling up
          console.log("Donate button clicked for:", charity.name);
          alert(`Donating to ${charity.name}`); // Replace with actual donation logic
        });
      }
    }
    
    console.log("Popup added to map");
    
    // Add event listener for popup close button
    const closeHandler = () => {
      console.log("Popup closed via close button");
      if (onClose) onClose();
    };
    
    popupRef.current.on('close', closeHandler);
    
    // Fly to the location with animation - PRESERVING THIS AS REQUESTED
    // Enhance the fly-to animation with more dynamic parameters
    if (charity) {
    map.flyTo({
      center: [charity.longitude, charity.latitude],
      zoom: 15,
      essential: true,
      duration: 1500, // Slightly longer for more dramatic effect
      pitch: 60, // Add some pitch for a 3D effect
      bearing: Math.random() * 60 - 30, // Random slight bearing for variety
      curve: 1.5, // Add a more pronounced curve to the animation
    });
    } else if (latitude !== undefined && longitude !== undefined) {
      map.flyTo({
        center: [lng, lat],
        zoom: 15,
        essential: true,
        duration: 1000
      });
    }
    
    // Prevent map click from interfering with popup
    const mapClickHandler = (e: mapboxgl.MapMouseEvent) => {
      // Prevent map clicks from closing the popup
      e.originalEvent.stopPropagation();
    };
    
    map.on('click', mapClickHandler);
    
    // Cleanup function
    return () => {
      console.log("Cleaning up popup");
      if (popupRef.current) {
        // Remove the event listener before removing the popup
        popupRef.current.off('close', closeHandler);
        popupRef.current.remove();
        popupRef.current = null;
      }
      
      // Remove map click handler
      map.off('click', mapClickHandler);
    };
  }, [map, charity, children, latitude, longitude, offset, closeButton, closeOnClick, className, focusAfterOpen, onClose]);
  
  // This component doesn't render anything directly
  return null;
};

export default MapPopUp;
