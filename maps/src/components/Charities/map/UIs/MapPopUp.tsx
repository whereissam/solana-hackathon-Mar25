"use client";

import React, { useEffect, useRef, ReactNode, useState } from 'react';
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
  onDonateClick?: (charity: Charity) => void;
}

const MapPopUp: React.FC<MapPopUpProps> = ({ 
  charity, 
  onClose,
  onDonateClick,
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
  const beneficiaryPopupRef = useRef<mapboxgl.Popup | null>(null);
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
          
          // Remove existing beneficiary popup if it exists
          if (beneficiaryPopupRef.current) {
            beneficiaryPopupRef.current.remove();
          }

          // Create beneficiary popup
          beneficiaryPopupRef.current = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            maxWidth: '300px',
            className: 'beneficiary-popup-container',
            anchor: 'bottom',
            offset: 15
          });

          // Create beneficiary popup content
          const beneficiaryContent = document.createElement('div');
          beneficiaryContent.className = 'beneficiary-popup';
          
          // Mock beneficiary data with random names
          const mockBeneficiaries = [
            { id: "1", first_name: "Luna", last_name: "Smith", email: "luna.smith@email.com" },
            { id: "2", first_name: "Max", last_name: "Johnson", email: "max.johnson@email.com" },
            { id: "3", first_name: "Bella", last_name: "Williams", email: "bella.williams@email.com" },
            { id: "4", first_name: "Charlie", last_name: "Brown", email: "charlie.brown@email.com" },
            { id: "5", first_name: "Oliver", last_name: "Davis", email: "oliver.davis@email.com" }
          ];

          beneficiaryContent.innerHTML = `
            <div class="p-4 max-w-4xl">
              <div class="font-bold text-xl mb-4">Select Beneficiary</div>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                ${mockBeneficiaries.map(beneficiary => `
                  <div class="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105">
                    <div class="relative h-40 overflow-hidden">
                      <img 
                        src="/images/beneficiary/beneficiary-${beneficiary.id}.jpg" 
                        alt="${beneficiary.first_name} ${beneficiary.last_name}"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="p-3">
                      <div class="font-medium text-base mb-1">
                        ${beneficiary.first_name} ${beneficiary.last_name}
                      </div>
                      <div class="text-xs text-gray-600 mb-2">
                        ${beneficiary.email}
                      </div>
                      <button 
                        class="bg-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors w-full"
                        data-beneficiary-id="${beneficiary.id}"
                      >
                        Donate to ${beneficiary.first_name}
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;

          // Update popup options for better grid display
          beneficiaryPopupRef.current = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            maxWidth: '800px',
            className: 'beneficiary-popup-container',
            anchor: 'center',
            offset: 15
          });

          // Set content and position for beneficiary popup
          beneficiaryPopupRef.current
            .setLngLat([lng, lat])
            .setDOMContent(beneficiaryContent)
            .addTo(map);

          // Add click handlers for beneficiary buttons
          const beneficiaryButtons = beneficiaryContent.querySelectorAll('button[data-beneficiary-id]');
          beneficiaryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              e.stopPropagation();
              const beneficiaryId = (button as HTMLElement).dataset.beneficiaryId;
              if (onDonateClick && charity) {
                const selectedBeneficiary = mockBeneficiaries.find(b => b.id === beneficiaryId);
                if (selectedBeneficiary) {
                  onDonateClick({
                    ...charity,
                    selectedBeneficiaryId: selectedBeneficiary.id
                  });
                }
              }
              // Close both popups
              if (beneficiaryPopupRef.current) beneficiaryPopupRef.current.remove();
              if (popupRef.current) popupRef.current.remove();
            });
          });
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
        popupRef.current.off('close', closeHandler);
        popupRef.current.remove();
        popupRef.current = null;
      }
      if (beneficiaryPopupRef.current) {
        beneficiaryPopupRef.current.remove();
        beneficiaryPopupRef.current = null;
      }
      
      map.off('click', mapClickHandler);
    };
  }, [map, charity, children, latitude, longitude, offset, closeButton, closeOnClick, className, focusAfterOpen, onClose, onDonateClick]);
  
  return null;
};

export default MapPopUp;
