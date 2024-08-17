// import React from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// function MapContainer({ center }) {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE",
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);
//     map.setZoom(5);
//     map.panTo(center);

//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{
//         disableDefaultUI: true,
//         styles: mapStyles,
//       }}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default MapContainer;

import React from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
  Pin,
} from "@vis.gl/react-google-maps";
import { mapStyles } from "./mapStyles";
import pin from "../assets/pin.png";

function MapContainer({ center }) {
  return (
    <APIProvider apiKey={"AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE"}>
      <Map
        defaultCenter={center}
        defaultZoom={15}
        styles={mapStyles}
        scaleControl={false}
        zoomControl={false}
        controlled={false}
        scaleControlOptions={false}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
        // mapId={"3b9b3d5b0f9d5f0a"}
      >
        <Marker position={center} icon={pin} animation={"BOUNCE"} />
      </Map>
    </APIProvider>
  );
}

export default MapContainer;
