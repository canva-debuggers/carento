import React, { useCallback, useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { mapStyles } from "./mapStyles";
import pin from "../assets/pin.png";
import carPin from "../assets/carPin.png";

function MapContainer({ center, zoom, markersLocations = [] }) {
  const map = useMap();
  const [loaded, setLoaded] = useState(false);

  const fitBounds = useCallback(() => {
    if (map && markersLocations.length) {
      const bounds = map?.getBounds();
      if (!bounds) return;
      markersLocations.forEach((marker) => bounds?.extend(marker));
      bounds?.extend(center); // Include the center point in the bounds
      map?.fitBounds(bounds);
    }
  }, [markersLocations, map, center]);

  useEffect(() => {
    fitBounds();
  }, [markersLocations, map, loaded]);
  useEffect(() => {
    fitBounds();
  }, []);

  useEffect(() => {
    if (map) {
      map.addListener("tilesloaded", () => {
        setLoaded(true);
      });
    }
  }, [map]);

  return (
    <Map
      defaultCenter={center}
      defaultZoom={zoom || 15}
      styles={mapStyles}
      scaleControl={false}
      zoomControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      mapTypeControl={false}
    >
      <Marker position={center} icon={pin} animation={"BOUNCE"} />
      {markersLocations.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          icon={carPin}
          clickable={true}
          onClick={() => {
            map.panTo(marker);
          }}
        />
      ))}
    </Map>
  );
}

export default MapContainer;
