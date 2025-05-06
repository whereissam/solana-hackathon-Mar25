import React, { useEffect, useRef, useState } from 'react';
import { Charity } from './data/data';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const [mapLoaded, setMapLoaded] = useState(false);
  const [category, setCategory] = useState('All');
  const [distance, setDistance] = useState(25); // in km
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Define allowed zoom levels
  const allowedZooms = [9, 11, 13, 15, 17];

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
      if (mapContainerRef.current) {
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    }, 100);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('mapbox-gl').then((module) => {
        mapboxgl = module.default;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
        
        if (mapContainerRef.current && !mapLoaded) {
          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [13.4050, 52.52], // Berlin [lng, lat]
            zoom: 9,
            minZoom: 9,
            maxZoom: 17,
            pitch: 45,
            bearing: -17.6,
            maxBounds: berlinBounds, // Prevent panning/zooming out of Berlin
          });

          // Add navigation controls
          map.addControl(new mapboxgl.NavigationControl());
          
          // Add fullscreen control
          map.addControl(new mapboxgl.FullscreenControl({
            container: mapContainerRef.current
          }));

          let isZooming = false;

          // Snap zoom to allowed levels
          map.on('zoomend', () => {
            if (isZooming) return; // Skip if we're already handling a zoom
            
            const currentZoom = map.getZoom();
            // Find the closest allowed zoom level
            const closest = allowedZooms.reduce((prev, curr) =>
              Math.abs(curr - currentZoom) < Math.abs(prev - currentZoom) ? curr : prev
            );
            
            if (currentZoom !== closest) {
              isZooming = true;
              map.zoomTo(closest, { duration: 0 });
              setTimeout(() => { isZooming = false; }, 50); // Reset after a short delay
            }
          });

          // Add 3D buildings layer after the map style has loaded
          map.on('style.load', () => {
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

          // Add charity markers
          filteredCharities.forEach((charity) => {
            if (charity.longitude && charity.latitude) {
              const el = document.createElement('div');
              el.className = 'charity-marker';
              el.style.width = '28px';
              el.style.height = '28px';
              el.style.background = selectedCharity === charity.id ? '#7c3aed' : '#f59e42';
              el.style.borderRadius = '50%';
              el.style.border = '2px solid white';
              el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
              el.style.display = 'flex';
              el.style.alignItems = 'center';
              el.style.justifyContent = 'center';
              el.style.cursor = 'pointer';
              el.innerHTML = `<i class="fas fa-hand-holding-heart" style="color:white;font-size:16px;"></i>`;
              el.onclick = () => handleCharitySelect(charity.id);

              new mapboxgl.Marker(el)
                .setLngLat([charity.longitude, charity.latitude])
                .addTo(map);
            }
          });

          setMapLoaded(true);

          return () => {
            map.remove();
            setMapLoaded(false);
          };
        }
      });
    }
  }, [mapLoaded, filteredCharities, selectedCharity, handleCharitySelect]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dropdown Filters - DaisyUI and Tailwind */}
        <div className="flex flex-wrap gap-4 mb-6">
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
        <div className={`flex ${isFullScreen ? 'h-[calc(100vh-10rem)]' : 'h-[600px]'} rounded-xl overflow-hidden shadow-lg`}>
          {/* Map Container */}
          <div ref={mapContainerRef} className="flex-grow relative" />
          
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