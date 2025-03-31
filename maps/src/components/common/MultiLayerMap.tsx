"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";

const { BaseLayer, Overlay } = LayersControl;

const MultiLayerMap = () => {
  const center: LatLngTuple = [51.505, -0.09]; // Must be exactly [latitude, longitude]

  // Polygon Coordinates
  const polygonCoords: Array<[number, number]> = [
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
  ];

  return (
    <MapContainer center={center} zoom={13} style={{ height: "600px", width: "100%" }}>
      <LayersControl position="topright">
        {/* Base Layers */}
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
        </BaseLayer>
        <BaseLayer name="Satellite">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenTopoMap contributors'
          />
        </BaseLayer>
        <BaseLayer name="Google Hybrid">
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            attribution='&copy; Google'
          />
        </BaseLayer>

        {/* Overlay Layers */}
        <Overlay checked name="Marker">
          <Marker position={center}>
            <Popup>Hello from London!</Popup>
          </Marker>
        </Overlay>
        <Overlay name="Circle">
          <Circle center={[51.508, -0.11]} radius={500} color="red" fillOpacity={0.5}>
            <Popup>I am a circle!</Popup>
          </Circle>
        </Overlay>
        <Overlay name="Polygon">
          <Polygon positions={polygonCoords} color="blue">
            <Popup>Custom polygon area</Popup>
          </Polygon>
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default MultiLayerMap;
