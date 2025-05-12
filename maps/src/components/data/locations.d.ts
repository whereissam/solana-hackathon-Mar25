export interface LocationData {
  id: number | string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  description?: string;
  category?: string; // e.g., 'Landmark', 'Park', 'Museum'
}