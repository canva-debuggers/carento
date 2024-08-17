import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 55.745,
  lng: 108.523,
};
function VisitedLocations() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        styles: mapStyles,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default VisitedLocations;
