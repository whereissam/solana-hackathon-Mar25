import { LocationData } from './locations.d';

export const berlinLocations: LocationData[] = [
  {
    id: 1,
    name: 'Brandenburg Gate',
    coordinates: [13.3777, 52.5163], // [lng, lat]
    description: 'An 18th-century neoclassical monument in Berlin.',
    category: 'Landmark',
  },
  {
    id: 2,
    name: 'Reichstag Building',
    coordinates: [13.3761, 52.5186],
    description: 'The historic edifice housing the German Parliament.',
    category: 'Government',
  },
  {
    id: 3,
    name: 'Museum Island',
    coordinates: [13.3975, 52.5199],
    description: 'A complex of five internationally renowned museums.',
    category: 'Museum',
  },
  {
    id: 4,
    name: 'Tiergarten',
    coordinates: [13.35 Tiergarten, 52.514 Tiergarten], // Approximate center
    description: 'Berlin\'s most popular inner-city park.',
    category: 'Park',
  },
  {
    id: 5,
    name: 'East Side Gallery',
    coordinates: [13.4391, 52.5050],
    description: 'A permanent open-air gallery on the longest surviving section of the Berlin Wall.',
    category: 'Historic Site',
  },
];