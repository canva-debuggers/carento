import React from "react";
import MapContainer from "./MapContainer";

function VisitedLocations() {
  return (
    <div
      style={{
        borderRadius: "15px",
        height: "100%",
        overflow: "hidden",
        minHeight: "200px",
      }}
    >
      <MapContainer
        center={{
          lat: 22.572645,
          lng: 88.363892,
        }}
      />
    </div>
  );
}

export default VisitedLocations;
