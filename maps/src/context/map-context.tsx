import React, { createContext, useContext, useState, ReactNode } from "react";
import mapboxgl from "mapbox-gl";

interface MapContextType {
  map: mapboxgl.Map | null; // Allow map to be null initially
  setMap: (map: mapboxgl.Map | null) => void; // Function to update the map instance in the context
}

export const MapContext = createContext<MapContextType | null>(null);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider. Ensure the component is wrapped in <MapProvider> and that MapProvider is correctly set up.");
  }
  return context;
}

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};