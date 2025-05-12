import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// If you also need to load GLTF models, uncomment the line below
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Import your model data
import { fbxModels } from '@/components/data/models'; // Adjust path if necessary

export interface ModelData { // This interface is already in your file, ensure it matches or adapt fbxModels
  id: string | number; // Unique identifier for the model
  url: string; // URL to the .fbx (or .gltf) file
  origin: [number, number]; // [longitude, latitude]
  altitude?: number; // Optional altitude in meters
  rotation?: [number, number, number]; // Optional rotation [x, y, z] in radians
  scale?: number | { x: number; y: number; z: number }; // Optional uniform scale or per-axis
  // type?: 'fbx' | 'gltf'; // Optional: if you need to support multiple model types
}

interface MapWithModelsProps {
  models: ModelData[]; // This will now use the structure from fbxModels
  mapCenter?: [number, number]; // Optional: map center. Defaults to first model's origin.
  mapZoom?: number; // Optional: initial map zoom level.
  mapboxAccessToken: string; // Your Mapbox access token
}

const MapWithModels: React.FC<MapWithModelsProps> = ({
  models, // This prop will be populated by fbxModels
  mapCenter,
  mapZoom,
  mapboxAccessToken,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const threeSceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!models || models.length === 0) { // models will come from the fbxModels import
      console.warn('MapWithModels: No models provided.');
      return;
    }
    if (!mapboxAccessToken) {
      console.error('MapWithModels: Mapbox access token is required.');
      return;
    }

    mapboxgl.accessToken = mapboxAccessToken;

    const initialCenter = mapCenter || models[0].origin;
    const initialZoom = mapZoom || 15;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/light-v11', // Or your preferred style
      zoom: initialZoom,
      center: initialCenter,
      pitch: 60,
      antialias: true,
    });
    mapRef.current = map;

    // Use the first model's origin as the reference point for the Three.js scene's transformation.
    // This point on the map will correspond to the (0,0,0) origin of the Three.js scene.
    const sceneMapOrigin = models[0].origin;
    const sceneMapAltitude = models[0].altitude || 0;
    const sceneGlobalRotation = [Math.PI / 2, 0, 0]; // Default global X-axis rotation for the scene

    const sceneOriginMercator = mapboxgl.MercatorCoordinate.fromLngLat(
      sceneMapOrigin,
      sceneMapAltitude
    );

    // This transform defines how the Three.js scene aligns with the map:
    // - translateX/Y/Z: The Mercator coordinates of the Three.js scene's origin on the map.
    // - rotateX/Y/Z: Global rotation applied to the entire Three.js scene.
    // - scale: Conversion factor from Three.js units (assumed to be meters) to Mercator units at the scene's origin latitude.
    const sceneTransform = {
      translateX: sceneOriginMercator.x,
      translateY: sceneOriginMercator.y,
      translateZ: sceneOriginMercator.z,
      rotateX: sceneGlobalRotation[0],
      rotateY: sceneGlobalRotation[1],
      rotateZ: sceneGlobalRotation[2],
      scale: sceneOriginMercator.meterInMercatorCoordinateUnits(),
    };

    const createCustomLayer = (currentMap: mapboxgl.Map) => {
      const threeCamera = new THREE.Camera(); // Define camera here
      const threeScene = new THREE.Scene(); // Define scene here
      threeSceneRef.current = threeScene;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      threeScene.add(ambientLight);
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(0, -70, 100).normalize();
      threeScene.add(directionalLight1);
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight2.position.set(0, 70, 100).normalize();
      threeScene.add(directionalLight2);

      // Load each model
      models.forEach((modelData) => {
        // const loader = modelData.type === 'gltf' ? new GLTFLoader() : new FBXLoader();
        const loader = new FBXLoader(); // Assuming FBX for now
        loader.load(
          modelData.url,
          (object3D) => { // FBXLoader returns a THREE.Group
            // Calculate the model's specific Mercator coordinates
            const modelMercator = mapboxgl.MercatorCoordinate.fromLngLat(
              modelData.origin,
              modelData.altitude || 0
            );

            // Position the model within the Three.js scene.
            // The position is set in Mercator units relative to the scene's origin on the map.
            // This relative Mercator position will be correctly scaled by sceneTransform.scale in the render matrix.
            object3D.position.set(
              modelMercator.x - sceneTransform.translateX,
              modelMercator.y - sceneTransform.translateY,
              modelMercator.z - sceneTransform.translateZ
            );

            if (modelData.rotation) {
              object3D.rotation.set(
                modelData.rotation[0],
                modelData.rotation[1],
                modelData.rotation[2]
              );
            }

            const modelScale = modelData.scale || 1.0;
            if (typeof modelScale === 'number') {
              object3D.scale.set(modelScale, modelScale, modelScale);
            } else {
              object3D.scale.set(modelScale.x, modelScale.y, modelScale.z);
            }
            
            threeScene.add(object3D);
            if (currentMap) currentMap.triggerRepaint();
          },
          undefined, // onProgress callback
          (error) => {
            console.error(`Error loading FBX model ${modelData.id} from ${modelData.url}:`, error);
          }
        );
      });

      const renderer = new THREE.WebGLRenderer({
        canvas: currentMap.getCanvas(),
        context: (currentMap.painter.context as any).gl, // Cast to any to access 'gl'
        antialias: true,
      });
      renderer.autoClear = false;

      return {
        id: 'multi-3d-model-custom-layer',
        type: 'custom' as const,
        renderingMode: '3d' as const,
        onAdd: () => {},
        render: (gl: WebGLRenderingContext, matrix: number[]) => {
          const rotationXMat = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), sceneTransform.rotateX);
          const rotationYMat = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), sceneTransform.rotateY);
          const rotationZMat = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), sceneTransform.rotateZ);

          const mapboxMatrix = new THREE.Matrix4().fromArray(matrix);
          const modelTransformMatrix = new THREE.Matrix4()
            .makeTranslation(sceneTransform.translateX, sceneTransform.translateY, sceneTransform.translateZ)
            .scale(new THREE.Vector3(sceneTransform.scale, -sceneTransform.scale, sceneTransform.scale))
            .multiply(rotationXMat)
            .multiply(rotationYMat)
            .multiply(rotationZMat);

          threeCamera.projectionMatrix = mapboxMatrix.multiply(modelTransformMatrix);
          renderer.resetState();
          renderer.render(threeScene, threeCamera);
          if (currentMap) currentMap.triggerRepaint();
        },
      };
    };

    map.on('style.load', () => {
      if (mapRef.current) { // Ensure map still exists
        const customLayer = createCustomLayer(mapRef.current);
        mapRef.current.addLayer(customLayer, 'waterway-label'); // Add before labels for better visibility
      }
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      threeSceneRef.current = null;
    };
  }, [models, mapCenter, mapZoom, mapboxAccessToken]); // Ensure 'models' is in dependency array if it can change

  return (
    <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default MapWithModels;