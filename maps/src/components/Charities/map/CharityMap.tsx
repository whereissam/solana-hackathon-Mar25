import React, { useEffect, useRef, useState } from 'react';
import { Charity } from '../data/data';
import 'mapbox-gl/dist/mapbox-gl.css';

// Import UI components
import MapControls from './UIs/MapControls';
import MapMarker from './UIs/MapMarker';
import MapPopUp from './UIs/MapPopUp';
import MapSearch from './UIs/MapSearch';
import MapStyles from './UIs/MapStyles';
import { useMap } from '@/context/map-context';

// We'll import mapboxgl dynamically only on the client side
let mapboxgl: any;

interface CharityMapProps {
  filteredCharities: Charity[];
  selectedCharity: number | null;
  handleCharitySelect: (charityId: number) => void;
}

const CharityMap: React.FC<CharityMapProps> = ({ 
  filteredCharities, 
  selectedCharity, 
  handleCharitySelect 
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [category, setCategory] = useState('All');
  const [distance, setDistance] = useState(25); // in km
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { setMap } = useMap(); // Get setMap from the context

  // Define Berlin city bounds (approximate)
  const berlinBounds: [[number, number], [number, number]] = [
    [13.0884, 52.3383], // Southwest corner [lng, lat]
    [13.7611, 52.6755], // Northeast corner [lng, lat]
  ];

  // Toggle full screen
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    
    // Resize the map after state change to ensure proper rendering
    setTimeout(() => {
      if (mapInstance) {
        mapInstance.resize();
      }
      // Also dispatch window resize for other potential listeners
      const event = new Event('resize');
      window.dispatchEvent(event);
    }, 100);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('mapbox-gl').then((module) => {
        mapboxgl = module.default;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
        
        if (mapContainerRef.current && !mapInstance) {
          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [13.4050, 52.52], // Berlin [lng, lat]
            pitch: 45,
            bearing: -17.6,
            maxBounds: berlinBounds,
          });

          // Add navigation controls
          map.addControl(new mapboxgl.NavigationControl());
          
          // Add fullscreen control
          map.addControl(new mapboxgl.FullscreenControl({
            container: mapContainerRef.current
          }));
          
          map.on('load', () => {
            setMapInstance(map);
            setMap(map);
            setMapLoaded(true);

            // Add 3D buildings layer
            map.addLayer(
              {
                id: '3d-buildings',
                source: 'composite',
                'source-layer': 'building',
                filter: ['==', 'extrude', 'true'],
                type: 'fill-extrusion',
                minzoom: 15,
                paint: {
                  'fill-extrusion-color': '#aaa',
                  'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['get', 'height'],
                    0, 0,
                    100, 100
                  ],
                  'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['get', 'min_height'],
                    0, 0,
                    100, 100
                  ],
                  'fill-extrusion-opacity': 0.6
                }
              },
              'waterway-label'
            );
          });

          return () => {
            map.remove();
            setMapInstance(null);
            setMap(null);
            setMapLoaded(false);
          };
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMap]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dropdown Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          {/* Category Dropdown */}
          <select
            className="select select-bordered w-48"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
            <option value="Animal Welfare">Animal Welfare</option>
            <option value="Humanitarian Aid">Humanitarian Aid</option>
            <option value="Children">Children</option>
            <option value="Arts & Culture">Arts & Culture</option>
            <option value="Disaster Relief">Disaster Relief</option>
          </select>
          
          {/* Distance Dropdown */}
          <select
            className="select select-bordered w-40"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          >
            <option value={5}>Within 5 km</option>
            <option value={25}>Within 25 km</option>
            <option value={50}>Within 50 km</option>
            <option value={100}>Within 100 km</option>
          </select>
          
          {/* Full Screen Toggle Button */}
          <button 
            className="btn btn-square btn-outline" 
            onClick={toggleFullScreen}
            aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
          >
            {isFullScreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Map and Sidebar */}
        <div className={`flex ${isFullScreen ? 'fixed inset-0 z-50 top-[6rem]': 'h-[600px]'} rounded-xl overflow-hidden shadow-lg bg-white`}>
          {/* Map Container */}
          <div className="relative w-full h-full">
            <div ref={mapContainerRef} className="w-full h-full relative" />
            
            {/* Map UI Components */}
            {mapInstance && (
              <>
                <MapSearch />
                <MapStyles />
                <MapControls />
                
                {/* Render markers for each charity */}
                {filteredCharities.map((charity) => (
                  <MapMarker
                    key={charity.id}
                    longitude={charity.longitude}
                    latitude={charity.latitude}
                    data={charity}
                    onClick={({data}) => handleCharitySelect(data.id)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedCharity === charity.id ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
                    } border-2 border-purple-600 transition-all duration-200`}>
                      {selectedCharity === charity.id ? '✓' : ''}
                    </div>
                  </MapMarker>
                ))}
                
                {/* MapPopUp for selected charity */}
                {mapLoaded && selectedCharity !== null && (
                  <MapPopUp
                    charity={filteredCharities.find(c => c.id === selectedCharity)}
                    onClose={() => handleCharitySelect(null as any)}
                  />
                )}
              </>
            )}
          </div>
          
          {/* Charity List Sidebar */}
          <div className="w-80 bg-white overflow-y-auto border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="font-bold text-lg mb-1">
                {filteredCharities.length} Charities Found
              </div>
              <div className="text-gray-500 text-sm">
                Click on a charity to view details
              </div>
            </div>
            <ul className="p-0 m-0">
              {filteredCharities.map((charity) => (
                <React.Fragment key={charity.id}>
                  <li
                    className={`cursor-pointer px-4 py-4 flex items-center transition ${
                      selectedCharity === charity.id
                        ? 'bg-purple-100'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCharitySelect(charity.id)}
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center mr-4 flex-shrink-0">
                      <i className={`fas fa-${
                        charity.category === 'Education' ? 'graduation-cap' :
                        charity.category === 'Healthcare' ? 'heartbeat' :
                        charity.category === 'Environment' ? 'leaf' :
                        charity.category === 'Animal Welfare' ? 'paw' :
                        charity.category === 'Humanitarian Aid' ? 'hands-helping' :
                        charity.category === 'Children' ? 'child' :
                        charity.category === 'Arts & Culture' ? 'palette' :
                        charity.category === 'Disaster Relief' ? 'house-damage' :
                        'globe'
                      } text-purple-700 text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-base mb-1">{charity.name}</div>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-${star <= Math.floor(charity.rating) ? 'yellow' : 'gray'}-500 mr-0.5`}>★</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">{charity.rating}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        {charity.location}
                      </div>
                    </div>
                  </li>
                  <hr className="m-0 border-gray-200" />
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityMap;