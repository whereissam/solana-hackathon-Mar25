import { FBXModelData } from './models.d';

export const fbxModels: FBXModelData[] = [
  {
    id: 'model1',
    name: 'Brandenburg Gate Model',
    url: '/models/brandenburg_gate.fbx', // Example path, replace with your actual file
    origin: [13.3777, 52.5163], // Coordinates of Brandenburg Gate
    altitude: 0,
    rotation: [Math.PI / 2, 0, 0], // Example rotation (90 degrees around X-axis)
    scale: 1.0,
    description: 'A 3D model of the Brandenburg Gate.',
  },
  {
    id: 'model2',
    name: 'Fernsehturm Model',
    url: '/models/fernsehturm.fbx', // Example path, replace with your actual file
    origin: [13.4094, 52.5208], // Coordinates of Fernsehturm (TV Tower)
    altitude: 0,
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.5,
    description: 'A 3D model of the Berlin TV Tower.',
  },
  // Add more models as needed
];