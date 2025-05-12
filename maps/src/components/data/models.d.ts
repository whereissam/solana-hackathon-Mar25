export interface FBXModelData {
  id: string | number;
  name: string;
  url: string; // Path to the .fbx file (e.g., '/models/my_object.fbx')
  origin: [number, number]; // [longitude, latitude]
  altitude?: number;
  rotation?: [number, number, number]; // [x, y, z] in radians
  scale?: number | { x: number; y: number; z: number };
  description?: string;
}